const precedences = require('./grammar/precedences.js');
const built_in_functions = require('./grammar/builtins.js');
const odbc_scalar_functions = require('./grammar/functions/odbc_scalar_functions.js');
const aggregate_window_functions = require('./grammar/functions/aggregate_functions.js');
const analytic_windowed_functions = require('./grammar/functions/analytic_windowed_functions.js');
const bit_manipulation_functions = require('./grammar/functions/bit_manipulation_functions.js');
const collation_functions = require('./grammar/functions/collation_functions.js');
const configuration_functions = require('./grammar/functions/configuration_functions.js');
const conversion_functions = require('./grammar/functions/conversion_functions.js');
const data_type = require('./grammar/data_types.js');

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check


//
// UTILS
//
const parens = (...rule) => seq('(', ...rule, ')');

//
// PARSER https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4
//

module.exports = grammar({
  name: "tsql",

  conflicts: $ => [
    [$.batch]
  ],

  // // For spaces, tabulations and line breaks
  // extras: $ => [
  //   /[\s\uFEFF\xA0]/, // \s couvre [ \t\r\n\f]
  //   $.comment
  // ],

  ...precedences,

  rules: {
    // comment: $ => token(choice(
    //   seq('--', /[^\r\n]*/),
    //   seq('/*', /[^*]*\*+([^/*][^*]*\*+)*/, '/')
    // )),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L35
    tsql_file: $ => choice(
      repeat($.batch)
      ,seq($.execute_body_batch, repeat($.go_statement))
    ),

    batch: $ => choice(
      prec(1,$.go_statement)
      ,seq(optional($.execute_body_batch),choice($.go_statement, repeat1($.sql_clauses)), repeat($.go_statement))
      ,//TODO seq($.batch_level_statement, repeat($.go_statement))
       //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L46-L51
    ),

    //https://learn.microsoft.com/en-us/sql/t-sql/language-elements/sql-server-utilities-statements-go?view=sql-server-ver16
    go_statement: $ => seq(token(/GO/i), optional(field("count", $.integer))),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L3145
    execute_body_batch: $ => prec.left(seq(
      $.func_proc_name_server_database_schema, optional(seq($.execute_statement_arg, repeat(seq(token(','), $.execute_statement_arg)))), optional(SEMI)
    )),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5145
    func_proc_name_server_database_schema: $ => choice(
      seq(optional(field('server', $.id_)), DOT, optional(field('database', $.id_)), DOT, optional(field('schema', $.id_)), DOT, field('procedure', $.id_))
      ,$.func_proc_name_database_schema
    ),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5140
    func_proc_name_database_schema: $ => choice(
      seq(optional(field('database', $.id_)), DOT, optional(field('schema', $.id_)), DOT, field('procedure', $.id_))
      ,$.func_proc_name_schema
    ),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5136
    func_proc_name_schema: $ => prec.right(seq(optional(seq(field('schema',$.id_), DOT)), field('procedure', $.id_))),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L3158
    execute_statement_arg: $ => choice(
      prec.left(seq($.execute_statement_arg_unnamed, repeat(seq(token(','), $.execute_statement_arg))))   //Unnamed params can continue unnamed
      ,prec.left(seq($.execute_statement_arg_named, repeat(seq(token(','), $.execute_statement_arg_named)))) //Named can only be continued by unnamed
    ),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L3163
    execute_statement_arg_named: $ => seq(
      field('name', LOCAL_ID), token('='), field('value', $.execute_parameter)
    ),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L3167
    execute_statement_arg_unnamed : $ => field('value', $.execute_parameter),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L3171
    execute_parameter: $ => choice(
      $.constant
      ,seq($.LOCAL_ID_, optional($.OUTPUT))
      ,$.id_
      ,$.default
      ,$.null_
    ),

    LOCAL_ID_: $ => LOCAL_ID,
    OUTPUT: $ => token(/OUT(PUT)?/i),

    default: $ => token(/DEFAULT/i),
    null_: $ => token(/NULL/i),

    constant: $ => choice(
      STRING
      ,seq(optional(token(/-/)), choice(DECIMAL)) //TODO
      //TODO https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5270
    ),

    //TODO batch_level_statement: $ => 'TODO', //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L46-L51

    sql_clauses: $ => choice(
      seq($.dml_clause, optional(SEMI))
      ,seq($.another_statement, optional(SEMI))
      //TODO https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L53-L61
    ),

    another_statement: $ => choice(
      //TODO https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L350
      $.declare_statement,
      $.execute_statement
    ),

    // https://msdn.microsoft.com/en-us/library/ms188332.aspx
    // https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L3141
    execute_statement: $ => prec.left(seq($.execute, $.execute_body, optional(SEMI))),

    execute: $ => token(/EXEC(UTE)?/i),

    // https://learn.microsoft.com/en-us/sql/t-sql/language-elements/execute-transact-sql?view=sql-server-ver15
    execute_body: $ => prec.left(choice(
      seq(optional(seq(field('return_status',$.LOCAL_ID_), token(/=/)))
        , choice($.func_proc_name_server_database_schema, $.execute_var_string)
        , optional($.execute_statement_arg)
        , optional(seq($.WITH, $.execute_option, repeat(seq(token(','), $.execute_option)))))
      //TODO execute_option https://learn.microsoft.com/en-us/sql/t-sql/language-elements/execute-transact-sql?view=sql-server-ver15

      ,seq(parens(seq($.execute_var_string, repeat(seq(token(','), $.execute_var_string))))
        ,optional(seq($.AS, choice($.LOGIN,$.USER), token('='), $.string_lit))
        ,optional(seq($.AT_KEYWORD, field('linkedServer', $.id_))))
      //TODO AT_DATA_SOURCE https://learn.microsoft.com/en-us/sql/t-sql/language-elements/execute-transact-sql?view=sql-server-ver16&redirectedfrom=MSDN#:~:text=AT%20DATA_SOURCE%20data_source_name%20Applies%20to%3A%20SQL%20Server%202019%20(15.x)%20and%20later
    )),

    WITH: $ => token(/WITH/i),

    execute_option: $ => choice(
      $.RECOMPILE
      ,seq($.RESULT_SETS, choice($.NONE, $.UNDEFINED))
      //TODO Result Sets Definition
      // https://learn.microsoft.com/en-us/sql/t-sql/language-elements/execute-transact-sql?view=sql-server-ver15
    ),

    RESULT_SETS: $ => seq(token(/RESULT/i), token(/SETS/i)),
    NONE: $ => token(/NONE/i),
    UNDEFINED: $ => token(/UNDEFINED/i),

    RECOMPILE: $ => token(/RECOMPILE/i),

    AS: $ => token(/AS/i),
    LOGIN: $ => token(/LOGIN/i),
    USER: $ => token(/USER/i),
    AT_KEYWORD: $ => token(/AT/i),

    // https://learn.microsoft.com/en-us/sql/t-sql/language-elements/execute-transact-sql?view=sql-server-ver15
    // https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L3175-L3178
    execute_var_string: $ => choice(
      seq($.LOCAL_ID_, optional(seq($.PLUS, $.LOCAL_ID_, optional(seq($.PLUS, $.execute_var_string)))))
      ,seq($.string_lit, optional(seq($.PLUS, $.LOCAL_ID_, optional(seq($.PLUS, $.execute_var_string)))))
    ),

    string_lit: $ => token(seq(
      optional('N')
      ,"'" //Opening Single Quote
      ,repeat(choice(
        /[^']/,               // Any character except a single quote
        "''"                  // Escaped single quote (two single quotes)
      ))
      ,"'" //Closing Single Quote

    )),


    PLUS: $ => token(/\+/),

    dml_clause: $ => choice(
      $.select_statement_standalone
      //TODO https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L63-L70
    ),

    select_statement_standalone: $ => seq(
      //TODO with_expression https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L2183
      $.select_statement
    ),

    select_statement: $ => prec.left(seq(
      $.query_expression
      ,optional(SEMI)
      //TODO https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L2186
    )),

    query_expression: $ => seq(
      $.query_specification
      //TODO union all https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L3999
    ),

    query_specification: $ => seq(
      $.select
      ,$.select_list
      ,optional(seq(token(/FROM/i), $.table_sources))
      ,optional($.groupby)
      //TODO https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4010-L4023
    ),

    declare_statement: $ => choice(
      seq(
        token(/DECLARE/i),
        $.declare_local,
        repeat(seq(COMMA, $.declare_local))
      ),

      // seq(
      //   token(/DECLARE/i),
      //   LOCAL_ID,
      //   optional(token(/AS/i)),
      //   $.table_type_definition
      // ),

      // seq(
      //   token(/DECLARE/i),
      //   LOCAL_ID,
      //   optional(token(/AS/i)),
      //   $.xml_type_definition
      // ),
      //
      // seq(
      //   token(/WITH/i),
      //   token(/XMLNAMESPACES/i),
      //   '(',
      //   $.xml_declaration,
      //   repeat(seq($.comma, $.xml_declaration)),
      //   ')'
      // )
    ),

    declare_local: $ => seq(
      LOCAL_ID,
      optional(token(/AS/i)),
      choice(
        $.data_type,
        $.table_name
      ),
      optional(seq(EQUAL, $.expression))
    ),

    select: $ => token(/SELECT/i),
    //https://learn.microsoft.com/en-us/sql/t-sql/queries/select-clause-transact-sql?view=sql-server-ver16&redirectedfrom=MSDN
    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4119
    select_list: $ => seq($.select_list_elem, repeat(seq(token(','), $.select_list_elem))),

    //TODO REDO THIS ONE
    select_list_elem: $ => choice(
      $.asterisk
      ,$.udt_elem
      ,seq($.LOCAL_ID_, choice($.assignment_operator, token('=')), $.expression)
      ,$.expression_elem
      //TODO https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4143-L4148
    ),

    //TODO
    groupby: $ => seq($.groupby_, choice(
      field('groupBys',seq($.group_by_item, repeat(seq(token(','), $.group_by_item))))
    )),

    //TODO
    group_by_item: $ => choice(
      $.expression
    ),

    groupby_: $ => token(/GROUP BY/i),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L6294
    assignment_operator: $ => choice(
       token('+=')
      ,token('-=')
      ,token('*=')
      ,token('/=')
      ,token('%=')
      ,token('&=')
      ,token('^=')
      ,token('|=')
    ),

    asterisk: $ => token(/\*/),

    //https://learn.microsoft.com/en-us/sql/t-sql/queries/select-clause-transact-sql?view=sql-server-ver16
    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4133
    udt_elem: $ => prec.left(choice(
      seq(field('udt_column_name', $.id_), DOT, field('non_static_attr',$.id_), $.udt_method_arguments, optional($.as_column_alias))

      ,seq(field('udt_column_name', $.id_), DOUBLE_COLON, field('non_static_attr',$.id_)
        ,optional($.udt_method_arguments)
        ,optional($.as_column_alias))
    )),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4123
    udt_method_arguments: $ => seq(
      parens($.execute_var_string, repeat(seq(token(','), $.execute_var_string)))
    ),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4138
    expression_elem: $ => prec.right(choice(
      seq(field('leftAlias', $.column_alias), token(/=/), field('leftAssignment', $.expression))
      ,seq(field('expressionAs', $.expression), optional($.as_column_alias))
    )),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4910
    as_column_alias: $ => seq(optional($.as), $.column_alias),
    as: $ => token(/AS/i),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4990
    column_alias: $ => choice(
      $.id_
      ,$.string_lit
    ),

    table_sources: $ => choice(
      $.table_source
      //TODO https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4150-L4153
    ),

    //TODO https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4160C4-L4163
    table_source: $ => seq($.table_source_item),

    table_source_item: $ => choice(
      $.full_table_name
    ),

    //TODO CORPUS
    table_name: $ => prec.right(seq(
      optional(choice(
        seq(field('database', $.id_), DOT, field('schema', $.id_))
        ,seq(field('schema', $.id_), DOT)
      ))
      ,choice(
        field('table', $.id_)
        //TODO blocking_hiearchy
        //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5128
      )
    )),


    full_table_name: $ => prec.right(seq(
      optional(choice(
      //NOTE? whats this dotdot example https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5118
        seq(field('server', $.id_), DOT, field('database', $.id_), DOT, field('schema', $.id_), DOT)
        ,seq(field('database', $.id_), DOT, field('schema', $.id_), DOT)
        ,seq(field('schema', $.id_), DOT)
      ))
      ,field('table', $.id_)
    )),

    //TODO https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5155-L5160
    full_column_name: $ => seq(
      $.id_
    ),

    //TODO CORPUS
    expression: $ => choice(
      $.primitive_expression
      ,$.full_column_name
      ,$.function_call
      //TODO https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L3900-L3917
    ),

    //TODO CORPUS
    function_call: $ => choice(
      $.ranking_windowed_function
      ,$.aggregate_functions
      ,$.analytic_windowed_functions

      ,$.built_in_functions
      //TODO built_in_function ~~200 rules https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4291

      ,choice(
        seq($.scalar_function_name, parens(optional($.expression_list_)))
        ,seq(choice($.binary_checksum_, $.checksum_), parens(choice($.asterisk, $.expression_list_))) //TODO MOVE TO BUILTINS
      )

      ,$.partition_function
      //TODO https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4287
      ,$.hierarchyid_static_method
      //TODO freetext_function
      ,$.odbc_scalar_functions
      ,$.bit_manipulation_functions
      ,$.collation_functions
      ,$.configuration_functions
      ,$.conversion_functions
    ),

    // ...built_in_functions,
    // ...odbc_scalar_functions,
    // ...aggregate_window_functions,
    // ...analytic_windowed_functions,
    // ...bit_manipulation_functions,
    // ...collation_functions,
    // ...configuration_functions,
    // ...conversion_functions,
    // ...data_type,

    //https://learn.microsoft.com/en-us/sql/t-sql/data-types/hierarchyid-data-type-method-reference?view=sql-server-ver16
    hierarchyid_static_method: $ => choice(
      seq($.hierachyid_, DOUBLE_COLON, choice(
        seq($.getroot_, parens())
        ,seq($.parse_, parens(field('input',$.expression)))
        )
      )
      ,seq($.id_, DOT, choice(
        $.getlevel_
        ,$.tostring_
      ), parens())

      ,seq($.id_, DOT, choice(
        $.getancestor_
        ,$.is_descendant_of_
      ), parens($.expression))

      ,seq($.id_, DOT, choice(
        $.get_reparented_value_
        ,$.get_descendant_
      ), parens(seq($.expression, token(','), $.expression)))


    ),

    hierachyid_: $ => token(/HIERARCHYID/i),

    get_descendant_: $ => token(/GetDescendant/i),
    get_reparented_value_: $ => token(/GetReparentedValue/i),
    getancestor_: $ => token(/GETANCESTOR/i),
    is_descendant_of_: $ => token(/IsDescendantOf/i),
    getlevel_: $ => token(/GETLEVEL/i),
    getroot_: $ => token(/GETROOT/i),
    tostring_: $ => token(/ToString/i),


    parse_: $ => token(/PARSE/i),

    // https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4298-L4300
    partition_function: $ => seq(
      optional(seq(field('database', $.id_), DOT)), $.dollar_partition_, DOT, field('func_name', $.id_), parens($.expression)
    ),

    dollar_partition_: $ => token(/\$PARTITION/i),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5198
    scalar_function_name: $ => choice(
      $.func_proc_name_database_schema
      ,$.right_
      ,$.left_
    ),

    right_: $ => token(/RIGHT/i),
    left_: $ => token(/LEFT/i),
    binary_checksum_: $ => token(/BINARY_CHECKSUM/i),
    checksum_: $ => token(/CHECKSUM/i),

    local_id_: $ => LOCAL_ID,
    seperator: $ => choice(
      $.local_id_
      ,$.string_lit
    ),
    //https://msdn.microsoft.com/en-us/library/ms189798.aspx
    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5004
    ranking_windowed_function: $ => choice(
      seq(choice($.rank_, $.dense_rank_, $.row_number_)
        ,token('('), token(')'), $.over_clause)
      ,seq($.ntile_, parens($.expression), $.over_clause)
    ),

    ntile_: $ => token(/NTILE/i),
    rank_: $ => token(/RANK/i),
    dense_rank_: $ => token(/DENSE_RANK/i),
    row_number_: $ => token(/ROW_NUMBER/i),

    //https://msdn.microsoft.com/en-us/library/ms189461.aspx
    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5033
    over_clause: $ => seq(
      token(/OVER/i)
      ,token('(')
        ,optional($.partition_by_clause)
        ,optional($.order_by_clause)
        ,optional($.row_or_range_clause)
      ,token(')')
    ),

    partition_by_clause: $ => seq(token(/PARTITION/i), token(/BY/i), $.expression_list_),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4999
    expression_list_: $ => prec.left(seq($.expression, repeat(seq(token(','), $.expression)))),

    //https://docs.microsoft.com/en-us/sql/t-sql/queries/select-over-clause-transact-sql?view=sql-server-ver16
    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4041
    order_by_clause: $ => seq(
      token(/ORDER/i), token(/BY/i), $.order_by_expression, repeat(seq(token(','), $.order_by_expression))
    ),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4071
    order_by_expression: $ => seq(
      field('order_by', $.expression)
      ,optional($.collation_)
      ,optional(choice(
        field('ascending', $.asc_)
        ,field('descending', $.desc_)
      )),
    ),

    collation_: $ => seq(
      token(/COLLATE/i)
      ,field('collation_name', $.id_)
    ),

    asc_: $ => token(/ASC/i),
    desc_: $ => token(/DESC/i),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5041
    window_frame_extent: $ => choice(
      $.window_frame_preceding
      ,seq(token(/BETWEEN/i), $.window_frame_bound, token(/AND/i), $.window_frame_bound)
    ),

    window_frame_bound: $ => choice(
      $.window_frame_preceding
      ,$.window_frame_following
    ),

    window_frame_following: $ => choice(
      seq(token(/UNBOUNDED/i), token(/FOLLOWING/i))
      ,seq(DECIMAL, token(/FOLLOWING/i))
    ),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5051
    window_frame_preceding: $ => choice(
      seq(token(/UNBOUNDED/i), token(/PRECEDING/i))
      ,seq(DECIMAL, token(/PRECEDING/i))
      ,seq(token(/CURRENT/i), token(/ROW/i))
    ),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5037
    row_or_range_clause: $ => seq(
      choice(token(/ROWS/i), token(/RANGE/i)),
      $.window_frame_extent
    ),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L3927
    primitive_expression: $ => choice(
      $.default
      ,$.null_
      ,$.LOCAL_ID_
      ,$.primitive_constant
    ),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5278
    primitive_constant: $ => choice(
      $.string_lit
      ,$.binary
      ,$.real_
      ,$.decimal_
      ,$.float_
      ,$.money_
      ,$.parameter_
    ),

    binary: $ => token(/0x[0-9A-F]*/),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5283
    money_: $ => seq(field('dollar', token('$')), optional(choice(token('-'),token('+'))), choice($.real_, $.float_)),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L3919-L3921
    parameter_: $ => token('?'),


    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlLexer.g4#L1231
    real_: $ => seq(
      choice(DECIMAL,DEC_DOT_DEC)
      ,token(/E/i)
      ,optional(choice(token('+'),token('-')))
      ,token(/[0-9]+/)),

    placeholder: $ => alias('TODO', $.dummy),

    // ***************************************************************************************************************

    tsql_file: $ => choice(
        seq(repeat($.batch), EOF),
        seq($.execute_body_batch, repeat($.go_statement), EOF),
    ),

    batch: $ => choice(
        $.go_statement,
        seq(optional($.execute_body_batch), choice(seq($.go_statement, repeat1($.sql_clauses))), repeat($.go_statement)),
        seq($.batch_level_statement, repeat($.go_statement)),
    ),

    batch_level_statement: $ => choice(
        $.create_or_alter_function,
        $.create_or_alter_procedure,
        $.create_or_alter_trigger,
        $.create_vie,
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-aggregate-transact-sql
    drop_aggregate: $ => seq(
      DROP, AGGREGATE, optional(seq(IF, EXISTS)), optional(seq(field("schema_name", $.id_), DOT)), field("aggregate_name", $.id_)
    ),

    // https://learn.microsoft.com/en-us/sql/t-sql/statements/alter-xml-schema-collection-transact-optional($.sql)view=sql-server-ver16
    alter_xml_schema_collection: $ => seq(ALTER, XML, SCHEMA, COLLECTION, optional(seq($.id_, '.'),), $.id_, ADD, STRING),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-broker-priority-transact-sql
    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-broker-priority-transact-sql
    create_or_alter_broker_priority: $ => seq(
      choice(CREATE, ALTER), BROKER, PRIORITY, field("ConversationPriorityName", $.id_), FOR, CONVERSATION, SET, LR_BRACKET,
      optional(
        seq(CONTRACT_NAME, EQUAL, choice($.id, ANY), optional(COMMA))
      ),
      optional(
        seq(LOCAL_SERVICE_NAME, EQUAL, choice(seq(optional(DOUBLE_FORWARD_SLASH), $.id_), ANY), optional(COMMA))
      ),
      optional(
        seq(REMOTE_SERVICE_NAME, EQUAL, choice(seq(field("RemoteServiceName", STRING), ANY)), optional(COMMA))
      ),
      optional(
        seq(PRIORITY_LEVEL, EQUAL, choice(seq(field("PriorityValue", DECIMAL), DEFAULT)))
      ),
      RR_BRACKET
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-broker-priority-transact-sql
    drop_broker_priority: $ => seq(DROP, BROKER, PRIORITY, field("ConversationPriorityName", $.id_)),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-certificate-transact-sql
    alter_certificate: $ => seq(
        ALTER, CERTIFICATE, field("certificate_name", $.id_),
        choice(
          seq(REMOVE, PRIVATE_KEY),
          seq(WITH, PRIVATE, KEY, LR_BRACKET, repeat1(
            seq(FILE, EQUAL, STRING, optional(COMMA)),
            seq(DECRYPTION, BY, PASSWORD, EQUAL, STRING, optional(COMMA)),
            seq(ENCRYPTION, BY, PASSWORD, EQUAL, STRING, optional(COMMA)),
          ), RR_BRACKET),
          seq(WITH, ACTIVE, FOR, BEGIN_DIALOG, EQUAL, choice(ON, OFF))
        ),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-column-encryption-key-transact-sql
    alter_column_encryption_key: $ => seq(
      ALTER, COLUMN, ENCRYPTION, KEY, field("column_encryption_key", $.id_), choice(ADD, DROP), VALUE, LR_BRACKET, COLUMN_MASTER_KEY, EQUAL, field("column_master_key_name", $.id_),
      optional(
        seq(COMMA, ALGORITHM, EQUAL, field("algorithm_name", STRING), COMMA, ENCRYPTED_VALUE, EQUAL, BINARY)
      ),
      RR_BRACKET
    ),


    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-column-encryption-key-transact-sql
    create_column_encryption_key: $ => seq(
        CREATE, COLUMN, ENCRYPTION, KEY, field("column_encryption_key", $.id_), WITH, VALUES, repeat1(
          seq(LR_BRACKET, optional(COMMA), COLUMN_MASTER_KEY, EQUAL, field("column_master_key_name", $.id_), COMMA, ALGORITHM, EQUAL, field("algorithm_name", STRING), COMMA, ENCRYPTED_VALUE),
          seq(EQUAL, field("encrypted_value", BINARY), RR_BRACKET, optional(COMMA))
        ),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/disable-trigger-transact-sql
    disable_trigger: $ => seq(
      DISABLE,
      TRIGGER,
      choice(repeat1(seq(optional(COMMA), optional(seq(field("schema_name", $.id_), DOT)), field("trigger_name", $.id_))), ALL),
      ON,
      choice(seq(optional(seq(field("schema_id", $.id_), DOT)), field("object_name", $.id_)), DATABASE, seq(ALL, SERVER))
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/enable-trigger-transact-sql
    enable_trigger: $ => seq(
      ENABLE,
      TRIGGER,
      choice(seq(repeat1(seq(optional(COMMA), optional(seq(field("schema_name", $.id_), DOT)), field("trigger_name", $.id_))), ALL),),
      ON,
      choice(seq(optional(seq(field("schema_id", $.id_), DOT)), field("object_name", $.id_)), DATABASE, seq(ALL, SERVER))
    ),

    lock_table: $ => seq(
      LOCK,
      TABLE,
      $.table_name,
      IN,
      choice(seq(SHARE, EXCLUSIVE)),
      MODE,
      optional(choice(seq(WAIT, field("seconds", DECIMAL), NOWAIT),)),
      optional(';')
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/truncate-table-transact-sql
    truncate_table: $ => seq(
      TRUNCATE,
      TABLE,
      $.table_name,
      optional(seq(
        WITH,
        LR_BRACKET,
        PARTITIONS,
        LR_BRACKET,
        repeat1(seq(optional(COMMA), choice(seq(DECIMAL, DECIMAL, TO, DECIMAL),))),
        RR_BRACKET,
        RR_BRACKET
      )),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-column-master-key-transact-sql
    create_column_master_key: $ => seq(
      CREATE,
      COLUMN,
      MASTER,
      KEY,
      field("key_name", $.id_),
      WITH,
      LR_BRACKET,
      KEY_STORE_PROVIDER_NAME,
      EQUAL,
      field("key_store_provider_name", STRING),
      COMMA,
      KEY_PATH,
      EQUAL,
      field("key_path", STRING),
      RR_BRACKET
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-credential-transact-sql
    alter_credential: $ => seq(
      ALTER,
      CREDENTIAL,
      field("credential_name", $.id_),
      WITH,
      IDENTITY,
      EQUAL,
      field("identity_name", STRING),
      optional(seq(COMMA, SECRET, EQUAL, field("secret", STRING))),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-credential-transact-sql
    create_credential: $ => seq(
      CREATE,
      CREDENTIAL,
      field("credential_name", $.id_),
      WITH,
      IDENTITY,
      EQUAL,
      field("identity_name", STRING),
      optional(seq(COMMA, SECRET, EQUAL, field("secret", STRING))),
      optional(seq(FOR, CRYPTOGRAPHIC, PROVIDER, field("cryptographic_provider_name", $.id_)))
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-cryptographic-provider-transact-sql
    alter_cryptographic_provider: $ => seq(
      ALTER,
      CRYPTOGRAPHIC,
      PROVIDER,
      field("provider_name", $.id_),
      optional(seq(FROM, FILE, EQUAL, field("crypto_provider_ddl_file", STRING))),
      optional(choice(seq(ENABLE, DISABLE)))
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-cryptographic-provider-transact-sql
    create_cryptographic_provider: $ => seq(
      CREATE,
      CRYPTOGRAPHIC,
      PROVIDER,
      field("provider_name", $.id_),
      FROM,
      FILE,
      EQUAL,
      field("path_of_DLL", STRING)
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-message-type-transact-sql
    alter_message_type: $ => seq(
      ALTER,
      MESSAGE,
      TYPE,
      field("message_type_name", $.id_),
      VALIDATION,
      EQUAL,
      choice(NONE, EMPTY, WELL_FORMED_XML, seq(VALID_XML, WITH, SCHEMA, COLLECTION, field("schema_collection_name", $.id_))),
    ),

    audit_class_name: $ => choice(
        OBJECT,
        SCHEMA,
        TABL,
    ),

    audit_securable: $ => seq(optional(seq(optional(seq($.id_, '.'),), $.id_, '.')), $.id_),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-role-transact-sql
    alter_db_role: $ => seq(
      ALTER,
      ROLE,
      field("role_name", $.id_),
      choice(seq(choice(seq(ADD, DROP)), MEMBER, field("database_principal", $.id_)), seq(WITH, NAME, EQUAL, field("new_role_name", $.id_))),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-role-transact-sql
    create_db_role: $ => seq(
      CREATE,
      ROLE,
      field("role_name", $.id_),
      optional(seq(AUTHORIZATION, field("owner_name", $.id_)))
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-route-transact-sql
    create_route: $ => seq(
      CREATE,
      ROUTE,
      field("route_name", $.id_),
      optional(seq(AUTHORIZATION, field("owner_name", $.id_))),
      WITH,
      optional(seq(optional(COMMA), SERVICE_NAME, EQUAL, field("route_service_name", STRING)) ),
      optional(seq(optional(COMMA), BROKER_INSTANCE, EQUAL, field("broker_instance_identifier", STRING))),
      optional(seq(optional(COMMA), LIFETIME, EQUAL, DECIMAL)),
      optional(COMMA),
      ADDRESS,
      EQUAL,
      STRING,
      optional(seq(COMMA, MIRROR_ADDRESS, EQUAL, STRING))
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-rule-transact-sql
    create_rule: $ => seq(
      CREATE,
      RULE,
      optional(seq(field("schema_name", $.id_), DOT)),
      field("rule_name", $.id_),
      AS,
      $.search_condition
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-search-property-list-transact-sql
    create_search_property_list: $ => seq(
      CREATE,
      SEARCH,
      PROPERTY,
      LIST,
      field("new_list_name", $.id_),
      optional(seq(FROM, optional(seq(field("database_name", $.id_), DOT)), field("source_list_name", $.id_))),
      optional(seq(AUTHORIZATION, field("owner_name", $.id_)))
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-security-policy-transact-sql
    create_security_policy: $ => seq(
      CREATE,
      SECURITY,
      POLICY,
      optional(seq(field("schema_name", $.id_), DOT)),
      field("security_policy_name", $.id_),
      repeat1(
        seq(
          optional(COMMA),
          ADD,
          optional(choice(FILTER, BLOCK)),
          PREDICATE,
          field("tvf_schema_name", $.id_),
          DOT,
          field("security_predicate_function_name", $.id_),
          LR_BRACKET,
          repeat1(seq(optional(COMMA), field("column_name_or_arguments", $.id_))),
          RR_BRACKET,
          ON,
          field("table_schema_name", $.id_),
          DOT,
          field("name", $.id_),
          repeat(choice(
            seq(optional(COMMA), AFTER, choice(INSERT, UPDATE)),
            seq(optional(COMMA), BEFORE, choice(seq(UPDATE, DELETE),))
          ))
        ),
      ),
      optional(
        seq(WITH, LR_BRACKET, STATE, EQUAL, choice(ON, OFF), optional(seq(SCHEMABINDING, choice(ON, OFF))), RR_BRACKET),
      ),
      optional(seq(NOT, FOR, REPLICATION)),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-symmetric-key-transact-sql

    alter_symmetric_key: $ => seq(
      ALTER,
      SYMMETRIC,
      KEY,
      field("key_name", $.id_),
      choice(
        seq(
          choice(ADD, DROP),
          ENCRYPTION,
          BY,
          choice(
            seq(CERTIFICATE, field("certificate_name", $.id_)),
            seq(PASSWORD, EQUAL, field("password", STRING)),
            seq(SYMMETRIC, KEY, field("symmetric_key_name", $.id_)),
            seq(ASYMMETRIC, KEY, field("asym_key_name", $.id_))
          ),
        )
      ),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-synonym-transact-sql
    create_synonym: $ => seq(
      CREATE,
      SYNONYM,
      optional(seq(field("schema_name_1", $.id_), DOT)),
      field("synonym_name", $.id_),
      FOR,
      choice(
        seq(
          optional(seq(field("server_name", $.id_), DOT)),
          optional(seq(field("database_name", $.id_), DOT)),
          optional(seq("schema_name_2", $.id_), DOT),
          field("object_name", $.id_)
        ),
        seq(
          optional(seq(field("database_or_schema2", $.id_), DOT)),
          optional(seq(field("schema_id_2_or_object_name", $.id_), DOT)),
        ),
      ),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-workload-group-transact-sql

    alter_workload_group: $ => seq(
      ALTER,
      WORKLOAD,
      GROUP,
      choice(seq(field("workload_group_group_name", $.id_), DEFAULT_DOUBLE_QUOTE)),
      optional(seq(
        WITH,
        LR_BRACKET,
        repeat1(choice(
          seq(IMPORTANCE, EQUAL, choice(LOW, MEDIUM, HIGH)),
          seq(optional(COMMA), REQUEST_MAX_MEMORY_GRANT_PERCENT, EQUAL, field("request_max_memory_grant", DECIMAL)),
          seq(optional(COMMA), REQUEST_MAX_CPU_TIME_SEC, EQUAL, field("request_max_cpu_time_sec", DECIMAL)),
          seq(REQUEST_MEMORY_GRANT_TIMEOUT_SEC, EQUAL, field("request_memory_grant_timeout_sec", DECIMAL)),
          seq(MAX_DOP, EQUAL, field("max_dop", DECIMAL)),
          seq(GROUP_MAX_REQUESTS, EQUAL, field("group_max_requests", DECIMAL))
        )),
        RR_BRACKET
      )),
      optional(seq(
        USING,
        choice(seq(field("workload_group_pool_name", $.id_), DEFAULT_DOUBLE_QUOTE))
      ))
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-workload-group-transact-sql
    create_workload_group: $ => seq(
      CREATE,
      WORKLOAD,
      GROUP,
      field("workload_group_group_name", $.id_),
      optional(seq(
        WITH,
        LR_BRACKET,
        repeat1(choice(
          seq(IMPORTANCE, EQUAL, choice(LOW, MEDIUM, HIGH)),
          seq(optional(COMMA), REQUEST_MAX_MEMORY_GRANT_PERCENT, EQUAL, field("request_max_memory_grant", DECIMAL)),
          seq(optional(COMMA), REQUEST_MAX_CPU_TIME_SEC, EQUAL, field("request_max_cpu_time_sec", DECIMAL)),
          seq(REQUEST_MEMORY_GRANT_TIMEOUT_SEC, EQUAL, field("request_memory_grant_timeout_sec", DECIMAL)),
          seq(MAX_DOP, EQUAL, field("max_dop", DECIMAL)),
          seq(GROUP_MAX_REQUESTS, EQUAL, field("group_max_requests", DECIMAL))
        )),
        RR_BRACKET
      )),
      optional(choice(
        seq(
          USING,
          optional(choice(field("workload_group_pool_name", $.id_), DEFAULT_DOUBLE_QUOTE)),
          optional(choice(seq(optional(COMMA), EXTERNAL, field("external_pool_name", $.id_)), DEFAULT_DOUBLE_QUOTE))
        )
      ))
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-xml-schema-collection-transact-sql
    create_xml_schema_collection: $ => seq(
      CREATE,
      XML,
      SCHEMA,
      COLLECTION,
      optional(seq(field("relational_schema", $.id_), DOT)),
      field("sql_identifier", $.id_),
      AS,
      choice(STRING, $.id_, LOCAL_ID),
    ),

    create_contract: $ => seq(
      CREATE,
      CONTRACT,
      $.contract_name,
      optional(seq(AUTHORIZATION, field("owner_name", $.id_))),
      LR_BRACKET,
      repeat1(choice(seq(
        choice(field("message_type_name", $.id_), DEFAULT),
        SENT,
        BY,
        choice(INITIATOR, TARGET, ANY),
        optional(COMMA)
      ))),
      RR_BRACKET
    ),

    // DML

    time: $ => choice(
      LOCAL_ID,
      $.constant,
    ),

    // https://msdn.microsoft.com/en-us/library/ms177564.aspx
    output_clause: $ => (
            seq(OUTPUT, $.output_dml_list_elem, repeat(seq(',', $.output_dml_list_elem),), optional(choice(
        seq(INTO, (LOCAL_ID, table_name), optional(seq('(', $.column_name_list, ')'),))
        ),)),
    ),

    output_dml_list_elem: $ => (
            seq(choice(seq($.expression, $.asterisk),), optional($.as_column_alias)),
    ),

    // DDL

    // https://msdn.microsoft.com/en-ie/library/ms176061.aspx
    create_database: $ => (
            seq(CREATE, DATABASE, (seq(field("database", $.id_))), optional(seq(CONTAINMENT, '=', choice(seq(NONE, PARTIAL),)),), optional(
        seq(ON, PRIMARY?, $.database_file_spec, repeat(seq(',', $.database_file_spec),))
        ), optional(seq(LOG, ON, $.database_file_spec, repeat(seq(',', $.database_file_spec),))), optional(seq(COLLATE, field("collation_name", $.id_)),), optional(
        seq(WITH, $.create_database_option, repeat(seq(',', $.create_database_option),))
        ),),
    ),

    // https://msdn.microsoft.com/en-us/library/ms187956.aspx
    create_view: $ => (
            seq(choice(seq(CREATE, optional(seq(OR, ALTER),), ALTER),), VIEW, $.simple_name, optional(seq('(', $.column_name_list, ')'),), optional(
        seq(WITH, $.view_attribute, repeat(seq(',', $.view_attribute),))
        ), AS, $.select_statement_standalone, optional(seq(WITH, CHECK, OPTION),), optional(';')),
    ),

    view_attribute: $ => choice(
        ENCRYPTION,
        SCHEMABINDING,
        VIEW_METADAT,
    ),


    switch_partition: $ => (
            seq(optional(seq(PARTITION?, field("source_partition_number_expression", $.expression))), TO, field("target_table", $.table_name), optional(
        seq(PARTITION, field("target_partition_number_expression", $.expression))
        ), optional(seq(WITH, $.low_priority_lock_wait),)),
    ),

    low_priority_lock_wait: $ => (
            seq(WAIT_AT_LOW_PRIORITY, '(', MAX_DURATION, '=', field("max_duration", $.time), MINUTES?, ',', ABORT_AFTER_WAIT, '=', $.abort_after_wait, =, choice(
            NONE,
            SELF,
            BLOCKER
        ), ')'),
    ),

    // https://msdn.microsoft.com/en-us/library/ms174269.aspx
    alter_database: $ => (
            seq(ALTER, DATABASE, choice(seq(field("database", $.id_), CURRENT),), choice(
        seq(MODIFY, NAME, '=', field("new_name", $.id_)),
        seq(COLLATE, field("collation", $.id_)),
        seq(SET, $.database_optionspec, optional(seq(WITH, $.termination),)),
            $.add_or_modify_files,
            $.add_or_modify_filegroup
        ), optional(';')),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-database-transact-sql-file-and-filegroup-optional($.options)view=sql-server-ver15
    add_or_modify_files: $ => choice(
            seq(ADD, FILE, $.filespec, repeat(seq(',', $.filespec),), optional(seq(TO, FILEGROUP, field("filegroup_name", $.id_)))),
        seq(ADD, LOG, FILE, $.filespec, repeat(seq(',', $.filespec),)),
        seq(REMOVE, FILE, field("logical_file_name", $.id_)),
        seq(MODIFY, FILE, $.filespec),
    ),

    filespec: $ => (
            seq('(', NAME, '=', field("name", $.id_or_string), optional(seq(',', NEWNAME, '=', field("new_name", $.id_or_string))), optional(
        seq(',', FILENAME, '=', field("file_name", STRING))
        ), optional(seq(',', SIZE, '=', field("size", $.file_size))), optional(choice(seq(',', MAXSIZE, '=', (seq(field("max_size", $.file_size)),), UNLIMITED),)), optional(
        seq(',', FILEGROWTH, '=', field("growth_increment", $.file_size))
        ), optional(seq(',', OFFLINE),), ')'),
    ),

    add_or_modify_filegroups: $ => choice(
            seq(ADD, FILEGROUP, field("filegroup_name", $.id_), optional(choice(seq(CONTAINS, FILESTREAM, CONTAINS, MEMORY_OPTIMIZED_DATA),))),
        seq(REMOVE, FILEGROUP, field("filegrou_name", $.id_)),
        seq(MODIFY, FILEGROUP, field("filegrou_name", $.id_), choice(
            $.filegroup_updatability_option,
            DEFAULT,
        seq(NAME, '=', field("new_filegroup_name", $.id_)),
            AUTOGROW_SINGLE_FILE,
            AUTOGROW_ALL_FILE
        ),),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-endpoint-transact-sql
    alter_endpoint: $ => (
            seq(ALTER, ENDPOINT, field("endpointname", $.id_), optional(seq(AUTHORIZATION, field("login", $.id_))), optional(
        seq(STATE, EQUAL, $.state, =, choice(seq(STARTED, STOPPED, DISABLED),))
        ), AS, TCP, LR_BRACKET, $.endpoint_listener_clause, RR_BRACKET, choice(
        seq(FOR, TSQL, LR_BRACKET, RR_BRACKET),
        seq(FOR, SERVICE_BROKER, LR_BRACKET, $.endpoint_authentication_clause, (),
        seq(optional(COMMA), $.endpoint_encryption_alogorithm_clause),
        seq()?, (optional(COMMA), MESSAGE_FORWARDING, EQUAL, (ENABLED, DISABLED))?, (),
        seq(optional(COMMA), MESSAGE_FORWARD_SIZE, EQUAL, DECIMAL),
        seq()?, RR_BRACKET),
        seq(FOR, DATABASE_MIRRORING, LR_BRACKET, $.endpoint_authentication_clause, (),
        seq(optional(COMMA), $.endpoint_encryption_alogorithm_clause),
        seq()?, optional(COMMA), ROLE, EQUAL, choice(seq(WITNESS, PARTNER, ALL),), RR_BRACKET)
        ),),
    ),

    termination: $ => choice(
            seq(ROLLBACK, AFTER, field("seconds", DECIMAL)),
        seq(ROLLBACK, IMMEDIATE),
        NO_WAI,
    ),

    create_type: $ => (
            seq(CREATE, TYPE, field("name", $.simple_name), optional(seq(FROM, $.data_type, optional($.null_notnull))), optional(
        seq(AS, TABLE, LR_BRACKET, $.column_def_table_constraints, RR_BRACKET)
        ),),
    ),

    rowset_function_limited: $ => choice(
        $.openquery,
        $.opendatasourc,
    ),

    // https://msdn.microsoft.com/en-us/library/ms188427(v=sql.120).aspx
    openquery: $ => (
            seq(OPENQUERY, '(', field("linked_server", $.id_), ',', field("query", STRING), ')'),
    ),

    // https://msdn.microsoft.com/en-us/library/ms179856.aspx
    opendatasource: $ => (
            seq(OPENDATASOURCE, '(', field("provider", STRING), ',', field("init", STRING), ')', '.', optional(seq(field("database", $.id_))), '.', optional(
        seq(field("scheme", $.id_))
        ), '.', (seq(field("table", $.id_)))),
    ),

    // Other statements.

    execute_clause: $ => (
            seq(EXECUTE, AS, $.clause, =, choice(seq(CALLER, SELF, OWNER, STRING),)),
    ),

    declare_local: $ => (
            seq(LOCAL_ID, AS?, $.data_type, optional(seq('=', $.expression),)),
    ),

    table_type_definition: $ => (
            seq(TABLE, '(', $.column_def_table_constraints, repeat(seq(optional(','), $.table_type_indices),), ')'),
    ),

    table_type_indices: $ => choice(
            seq(choice(seq(choice(seq((PRIMARY, KEY, INDEX, id_), optional(choice(seq(CLUSTERED, NONCLUSTERED),)))), UNIQUE),), '(', $.column_name_list_with_order, ')'),
        seq(CHECK, '(', $.search_condition, ')'),
    ),

    xml_type_definition: $ => (
            seq(XML, '(', optional(choice(seq(CONTENT, DOCUMENT),)), $.xml_schema_collection, ')'),
    ),

    xml_schema_collection: $ => (
            seq(ID, '.', ID),
    ),

    on_partition_or_filegroup: $ => (
            seq(ON, choice(
            (seq(field("partition_scheme_name", $.id_), '(', field("partition_column_name", $.id_), ')'),),
        seq(field("filegroup", $.id_)),
            DEFAULT_DOUBLE_QUOT
        ),),
    ),

    // https://msdn.microsoft.com/en-us/library/ms188066.aspx
    table_constraint: $ => (
            seq(optional(seq(CONSTRAINT, field("constraint", $.id_))), choice(
        seq(((PRIMARY, KEY, UNIQUE), optional($.clustered), '(', $.column_name_list_with_order, ')', primary_key_options)),
        seq((, FOREIGN, KEY, '(', field("fk", $.column_name_list), ')', foreign_key_options)),
        seq((, CONNECTION, '(', $.connection_node, (, ',', $.connection_node)*, ')')),
            (seq(DEFAULT, field("constant_expr", $.expression), FOR, field("column", $.id_), optional(seq(WITH, VALUES),))),
            $.check_constrain
        ),),
    ),

    connection_node: $ => (
            seq(field("from_node_table", $.id_), TO, field("to_node_table", $.id_)),
    ),

    primary_key_options: $ => (
            seq(optional(seq(WITH, FILLFACTOR, '=', DECIMAL),), optional($.alter_table_index_options), optional($.on_partition_or_filegroup)),
    ),

    foreign_key_options: $ => (
            seq(REFERENCES, $.table_name, '(', field("pk", $.column_name_list), ')', repeat(choice(seq($.on_delete, $.on_update),)), optional(
        seq(NOT, FOR, REPLICATION)
        ),),
    ),

    check_constraint: $ => (
            seq(CHECK, optional(seq(NOT, FOR, REPLICATION),), '(', $.search_condition, ')'),
    ),

    on_delete: $ => (
            seq(ON, DELETE, choice(seq(NO, ACTION, CASCADE, SET, NULL$._, SET, DEFAULT),)),
    ),

    on_update: $ => (
            seq(ON, UPDATE, choice(seq(NO, ACTION, CASCADE, SET, NULL$._, SET, DEFAULT),)),
    ),

    alter_table_index_options: $ => (
            seq(WITH, '(', $.alter_table_index_option, repeat(seq(',', $.alter_table_index_option),), ')'),
    ),

    // https://msdn.microsoft.com/en-us/library/ms186869.aspx
    alter_table_index_option: $ => choice(
            seq(PAD_INDEX, '=', $.on_off),
        seq(FILLFACTOR, '=', DECIMAL),
        seq(IGNORE_DUP_KEY, '=', $.on_off),
        seq(STATISTICS_NORECOMPUTE, '=', $.on_off),
        seq(ALLOW_ROW_LOCKS, '=', $.on_off),
        seq(ALLOW_PAGE_LOCKS, '=', $.on_off),
        seq(OPTIMIZE_FOR_SEQUENTIAL_KEY, '=', $.on_off),
        seq(SORT_IN_TEMPDB, '=', $.on_off),
        seq(MAXDOP, '=', field("max_degree_of_parallelism", DECIMAL)),
        seq(DATA_COMPRESSION, '=', choice(seq(NONE, ROW, PAGE, COLUMNSTORE, COLUMNSTORE_ARCHIVE),), optional($.on_partitions)),
        seq(XML_COMPRESSION, '=', $.on_off, optional($.on_partitions)),
        seq(DISTRIBUTION, '=', HASH, '(', $.id_, ')'),
        seq(CLUSTERED, INDEX, '(', $.id_, (ASC, |, DESC)?, repeat(seq(',', $.id_, (#######,))), ')'),
        seq(ONLINE, '=', choice(seq(ON, optional(seq('(', $.low_priority_lock_wait, ')'),), OFF),)),
        seq(RESUMABLE, '=', $.on_off),
        seq(MAX_DURATION, '=', field("times", DECIMAL), MINUTES?),
    ),
  }
});
