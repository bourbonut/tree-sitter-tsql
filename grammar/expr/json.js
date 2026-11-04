const {
  ABSENT,
  AS,
  JSON,
  NULL_,
  ON,
} = require("./lexer.js");

module.exports = {
  json_declaration: $ => (
    seq($.json_col, +=, $.$.json_column_declaration, repeat(seq(',', $.json_col, +=, $.$.json_column_declaration),)),
  ),

  json_column_declaration: $ => (
    seq($.column_declaration, optional(seq(AS, JSON),)),
  ),

  json_key_value: $ => (
    seq(field("json_key_name", $.expression), ':', field("value_expression", $.expression)),
  ),

  json_null_clause: $ => (
    seq(choice(seq(ABSENT, NULL_),), ON, NULL_),
  ),
}
