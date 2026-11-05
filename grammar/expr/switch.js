const {
  THEN,
  WHEN,
} = require("./lexer.js");

module.exports = {
  switch_section: $ => seq(
    WHEN,
    $.expression,
    THEN,
    $.expression
  ),

  switch_search_condition_section: $ => seq(
    WHEN,
    $.search_condition,
    THEN,
    $.expression
  ),
}
