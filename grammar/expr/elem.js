const {
  DOUBLE_COLON,
  LOCAL_ID,
  WRITE,
} = require("./lexer.js");

module.exports = {
  udt_elem: $ => choice(
    seq(field("udt_column_name", $.id_), '.', field("non_static_attr", $.id_), $.udt_method_arguments, optional($.as_column_alias)),
    seq(field("udt_column_name", $.id_), DOUBLE_COLON, field("static_attr", $.id_), optional($.udt_method_arguments), optional($.as_column_alias)),
  ),

  expression_elem: $ => choice(
    seq(field("leftAlias", $.column_alias), $.eq, =, '=', field("leftAssignment", $.expression)),
    seq(field("expressionAs", $.expression), optional($.as_column_alias)),
  ),

  select_list_elem: $ => choice(
    $.asterisk,
    $.udt_elem,
    seq(LOCAL_ID, choice(seq($.assignment_operator, '='),), $.expression),
    $.expression_ele,
  ),

  update_elem: $ => choice(
    seq(LOCAL_ID, '=', $.full_column_name, choice(seq('=', $.assignment_operator),), $.expression),
    seq(choice(seq($.full_column_name, LOCAL_ID),), choice(seq('=', $.assignment_operator),), $.expression),
    seq(field("udt_column_name", $.id_), '.', field("method_name", $.id_), '(', $.expression_list_, ')'),
    seq(//|, $.full_column_name, '.', WRITE, ($.expression,)),
  ),

  update_elem_merge: $ => choice(
    seq(choice(seq($.full_column_name, LOCAL_ID),), choice(seq('=', $.assignment_operator),), $.expression),
    seq(field("udt_column_name", $.id_), '.', field("method_name", $.id_), '(', $.expression_list_, ')'),
    seq(//|, $.full_column_name, '.', WRITE, ($.expression,)),
  ),
}
