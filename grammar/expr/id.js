const {
  DOUBLE_QUOTE_BLANK,
  DOUBLE_QUOTE_ID,
  ID,
  RAW,
  SQUARE_BRACKET_ID,
  STRING,
  TEMP_ID,
} = require("./lexer.js");

module.exports = {
  // https://msdn.microsoft.com/en-us/library/ms175874.aspx
  id_: $ => choice(
    ID,
    TEMP_ID,
    DOUBLE_QUOTE_ID,
    DOUBLE_QUOTE_BLANK,
    SQUARE_BRACKET_ID,
    $.keyword,
    RAW,
  ),

  simple_id: _ => ID,

  id_or_string: $ => choice($.id_, STRING),
}
