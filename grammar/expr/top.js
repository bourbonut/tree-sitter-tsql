const {
  DECIMAL,
  FLOAT,
  PERCENT,
  REAL,
  TIES,
  TOP,
  WITH,
} = require("./lexer.js");

module.exports = {
  // https://msdn.microsoft.com/en-us/library/ms189463.aspx
  top_clause: $ => seq(TOP, choice(seq($.top_percent, $.top_count)), optional(seq(WITH, TIES))),

  top_percent: $ => choice(
    seq(field("percent_constant", choice(seq(REAL, FLOAT, DECIMAL))), PERCENT),
    seq('(', field("topper_expression", $.expression), ')', PERCENT),
  ),

  top_count: $ => choice(
    seq(field("count_constant", DECIMAL)),
    seq('(', field("topcount_expression", $.expression), ')'),
  ),
}
