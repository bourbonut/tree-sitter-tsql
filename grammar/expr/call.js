const {
  EXIST,
  EXIST_SQUARE_BRACKET,
  GETANCESTOR,
  GETDESCENDANT,
  GETLEVEL,
  GETREPARENTEDVALUE,
  ISDESCENDANTOF,
  MODIFY,
  MODIFY_SQUARE_BRACKET,
  QUERY,
  QUERY_SQUARE_BRACKET,
  STRING,
  TOSTRING,
  VALUE,
  VALUE_SQUARE_BRACKET,
} = require("./lexer.js");

module.exports = {
  value_call: _ => seq(
    choice(VALUE, VALUE_SQUARE_BRACKET),
    '(',
    field("xquery", STRING),
    ',',
    field("sqltype", STRING),
    ')'
  ),

  query_call: _ => seq(
    choice(QUERY, QUERY_SQUARE_BRACKET),
    '(',
    field("xquery", STRING),
    ')'
  ),

  exist_call: _ => seq(
    choice(EXIST, EXIST_SQUARE_BRACKET),
    '(',
    field("xquery", STRING),
    ')'
  ),

  modify_call: _ => seq(
    choice(MODIFY, MODIFY_SQUARE_BRACKET),
    '(',
      field("xml_dml", STRING),
      ')'
  ),

  hierarchyid_call: $ => choice(
    seq(GETANCESTOR, '(', field("n", $.expression), ')'),
    seq(
      GETDESCENDANT,
      '(',
        field("child1", $.expression),
        ',',
        field("child2", $.expression),
        ')'
    ),
    seq(GETLEVEL, '(', ')'),
    seq(ISDESCENDANTOF, '(', field("parent_", $.expression), ')'),
    seq(
      GETREPARENTEDVALUE,
      '(',
        field("oldroot", $.expression),
        ',',
        field("newroot", $.expression),
        ')'
    ),
    seq(TOSTRING, '(', ')')
  ),

  function_call: $ => choice(
    $.ranking_windowed_function,
    $.aggregate_windowed_function,
    $.analytic_windowed_function,
    $.built_in_functions,
    seq($.scalar_function_name, '(', optional($.expression_list_), ')'),
    $.freetext_function,
    $.partition_function,
    $.hierarchyid_static_method,
  ),
}
