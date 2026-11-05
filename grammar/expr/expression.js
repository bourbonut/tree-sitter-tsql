const {
  ALL,
  AS,
  ASC,
  CASE,
  COLLATE,
  DEFAULT,
  DESC,
  DISTINCT,
  DOLLAR_ACTIO,
  ELSE,
  END,
  LOCAL_ID,
  NULL_,
  WITH,
} = require("./lexer.js");

module.exports = {
  // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/expressions-transact-sql
  // Operator precendence: https://docs.microsoft.com/en-us/sql/t-sql/language-elements/operator-precedence-transact-sql
  expression: $ => choice(
    $.primitive_expression,
    $.function_call,
    seq($.expression, '.', choice(seq($.value_call, $.query_call, $.exist_call, $.modify_call),)),
    seq($.expression, '.', $.hierarchyid_call),
    seq($.expression, COLLATE, $.id_),
    $.case_expression,
    $.full_column_name,
    $.bracket_expression,
    $.unary_operator_expression,
    seq($.expression, $.op, =, choice(seq('*', '/', '%'),), $.expression),
    seq($.expression, $.op, =, choice(seq('+', '-', '&', '^', ',', ','),), $.expression),
    seq($.expression, $.time_zone),
    $.over_clause,
    DOLLAR_ACTIO,
  ),

  expression_list_: $ => (
    seq($.exp, +=, $.$.expression, repeat(seq(',', $.exp, +=, $.$.expression),)),
  ),

  primitive_expression: $ => choice(
    DEFAULT,
    NULL_,
    LOCAL_ID,
    $.primitive_constan,
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/case-transact-sql
  case_expression: $ => choice(
    seq(CASE, field("caseExpr", $.expression), repeat1($.switch_section), optional(seq(ELSE, field("elseExpr", $.expression))), END),
    seq(CASE, repeat1($.switch_search_condition_section), optional(seq(ELSE, field("elseExpr", $.expression))), END),
  ),

  unary_operator_expression: $ => choice(
    seq('~', $.expression),
    seq($.op, =, choice(seq('+', '-'),), $.expression),
  ),

  bracket_expression: $ => choice(
    seq('(', $.expression, ')'),
    seq('(', $.subquery, ')'),
  ),

  // https://msdn.microsoft.com/en-us/library/ms175972.aspx
  with_expression: $ => (
    seq(WITH, $.ctes, +=, $.common_table_expression, repeat(seq(',', $.ctes, +=, $.common_table_expression),)),
  ),

  common_table_expression: $ => (
    seq(field("expression_name", $.id_), optional(seq('(', field("columns", $.column_name_list), ')'),), AS, '(', field("cte_query", $.select_statement), ')'),
  ),

  order_by_expression: $ => (
    seq(field("order_by", $.expression), optional(choice(seq(field("ascending", ASC), field("descending", DESC))))),
  ),

  all_distinct_expression: $ => seq(
    optional(choice(ALL, DISTINCT)),
    $.expression
  ),
}
