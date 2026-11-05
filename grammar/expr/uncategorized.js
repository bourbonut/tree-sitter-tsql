const {
  ALL,
  AND,
  ANY,
  APPLY,
  BETWEEN,
  CONTAINS,
  CROSS,
  DELETED,
  ESCAPE,
  EXCEPT,
  EXISTS,
  FREETEXT,
  IN,
  INSERTED,
  INTERSECT,
  IS,
  LANGUAGE,
  LIKE,
  LOCAL_ID,
  MULT_ASSIGN,
  NOT,
  NULL,
  OR,
  OUTER,
  PROPERTY,
  SOME,
  SQL,
  UNION,
  UNKNOWN,
} = require("./lexer.js");

module.exports = {
  // https://docs.microsoft.com/en-us/sql/t-sql/queries/search-condition-transact-sql
  search_condition: $ => choice(
    seq(NOT*, choice(seq($.predicate, '(', $.search_condition, ')'),)),
    seq($.search_condition, AND, $.search_condition),
    seq($.search_condition, OR, $.search_condition),
  ),

  predicate: $ => choice(
    seq(EXISTS, '(', $.subquery, ')'),
    $.freetext_predicate,
    seq($.expression, $.comparison_operator, $.expression),
    seq($.expression, MULT_ASSIGN, $.expression, ////SQL-82, $.syntax, $.for, $.left, $.outer, joins;, '*='., S$.ee, https:),
    seq($.expression, $.comparison_operator, choice(seq(ALL, SOME, ANY),), '(', $.subquery, ')'),
    seq($.expression, NOT*, BETWEEN, $.expression, AND, $.expression),
    seq($.expression, NOT*, IN, '(', choice(seq($.subquery, $.expression_list_),), ')'),
    seq($.expression, NOT*, LIKE, $.expression, optional(seq(ESCAPE, $.expression),)),
    seq($.expression, IS, $.null_notnull),
  ),

  sql_union: $ => (
    seq(choice(seq(UNION, ALL?, EXCEPT, INTERSECT),), choice(
      seq(field("spec", $.query_specification)),
      #######
    ),),
  ),

  optimize_for_arg: $ => (
    seq(LOCAL_ID, choice(seq(UNKNOWN, '=', choice(seq($.constant, NULL$._),)))),
  ),

  // https://msdn.microsoft.com/en-us/library/ms176104.aspx
  select_list: $ => (
    seq($.selectE$.lement, +=, $.select_list_elem, repeat(seq(',', selectE$.lement, +=, $.select_list_elem),)),
  ),

  udt_method_arguments: $ => (
    seq('(', $.argument, +=, $.execute_var_string, repeat(seq(',', $.argument, +=, $.execute_var_string),), ')'),
  ),

  // https://docs.microsoft.com/ru-ru/sql/t-sql/queries/select-clause-transact-sql
  asterisk: $ => choice(
    seq(optional(seq($.table_name, '.'),), '*'),
    seq(choice(seq(INSERTED, DELETED),), '.repeat(', ')'),
  ),

  schema_declaration: $ => seq(
    field("xml_col", $.column_declaration),
    repeat(seq(',', field("xml_col", $.column_declaration)))
  ),

  apply_: $ => seq(
    field("apply_style", choice(CROSS, OUTER)),
    APPLY,
    field("source", $.table_source_item)
  ),

  derived_table: $ => choice(
    $.subquery,
    seq('(', $.subquery, repeat(seq(UNION, ALL, $.subquery)), ')'),
    $.table_value_constructor,
    seq('(', $.table_value_constructor, ')')
  ),

  freetext_predicate: $ => choice(
    seq(
      CONTAINS,
      '(',
        choice(
          $.full_column_name,
          seq('(', $.full_column_name, repeat(seq(',', $.full_column_name)), ')'),
          '*',
          seq(PROPERTY, '(', $.full_column_name, ',', $.expression, ')')
        ),
        ',',
        $.expression,
        ')'
    ),
    seq(
      FREETEXT,
      '(',
        $.table_name,
        ",",
        choice(
          $.full_column_name,
          seq('(', $.full_column_name, repeat(seq(',', $.full_column_name)), ')'),
          '*'
        ),
        ',',
        $.expression,
        optional(seq(',', LANGUAGE, $.expression)),
        ')'
    ),
  ),
}
