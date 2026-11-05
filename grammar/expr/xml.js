const {
  BASE64,
  BINARY_KEYWORD,
  ROOT,
  STRING,
  TYPE,
} = require("./lexer.js");

module.exports = {
  xml_common_directives: _ => seq(',', choice(seq(BINARY_KEYWORD, BASE64, TYPE, ROOT, optional(seq('(', STRING, ')'),)))),

  xml_data_type_methods: $ => choice(
    $.value_method,
    $.query_method,
    $.exist_method,
    $.modify_method
  ),
}
