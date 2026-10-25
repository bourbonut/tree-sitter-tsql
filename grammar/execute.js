const {
  AS,
  AT_KEYWORD,
  CALLER,
  DEFAULT,
  EXECUTE,
  LOCAL_ID,
  LOGIN,
  NULL_,
  OUT,
  OUTPUT,
  STRING,
  USER,
} = require("./lexer.js");

module.exports = {
  // https://msdn.microsoft.com/en-us/library/ms188332.aspx
  execute_statement: $ => (
    seq(EXECUTE, $.execute_body, optional(';')),
  ),

  execute_body_batch: $ => (
    seq($.func_proc_name_server_database_schema, optional(seq($.execute_statement_arg, repeat(seq(',', $.execute_statement_arg),))), optional(';')),
  ),

  //https://docs.microsoft.com/it-it/sql/t-sql/language-elements/execute-transact-optional($.sql)view=sql-server-ver15
  execute_body: $ => choice(
    seq(optional(seq(field("return_status", LOCAL_ID), '='),), choice(seq($.func_proc_name_server_database_schema, $.execute_var_string),), optional($.execute_statement_arg)),
    seq('(', $.execute_var_string, repeat(seq(',', $.execute_var_string),), ')', optional(seq(AS, choice(seq(LOGIN, USER),), '=', STRING),), optional(
      seq(AT_KEYWORD, field("linkedServer", $.id_))
    ),),
    seq(AS, choice(seq(choice(seq(LOGIN, USER),), '=', STRING, CALLER),)),
  ),

  execute_statement_arg: $ => choice(
    seq($.execute_statement_arg_unnamed, repeat(seq(',', $.execute_statement_arg))),        //  Unnamed params can continue unnamed
    seq($.execute_statement_arg_n$.amed, repeat(seq(',', $.execute_statement_arg_named))),  //  Named can only be continued by unnamed
  ),

  execute_statement_arg_named: $ => (
    seq(field("name", LOCAL_ID), '=', field("value", $.execute_parameter)),
  ),

  execute_statement_arg_unnamed: $ => (
    seq(field("value", $.execute_parameter)),
  ),

  execute_parameter: $ => choice(
    $.constant,
    seq(LOCAL_ID, optional(choice(OUTPUT, OUT))),
    $.id_,
    DEFAULT,
    NULL_
  ),

  execute_var_string: $ => choice(
    seq(LOCAL_ID, optional(choice(seq(OUTPUT, OUT),)), optional(seq('+', LOCAL_ID, optional(seq('+', $.execute_var_string),)))),
    seq(STRING, optional(seq('+', LOCAL_ID, optional(seq('+', $.execute_var_string),)))),
  ),
}
