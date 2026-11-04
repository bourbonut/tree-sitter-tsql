const {
  OPENJSON,
  OPENXML,
  WITH,
} = require("./lexer.js");

module.exports = {
  // https://docs.microsoft.com/en-us/sql/t-sql/functions/openxml-transact-sql
  open_xml: $ => seq(
    OPENXML,
    '(',
    $.expression,
    ',',
    $.expression,
    optional(seq(',', $.expression)),
    ')',
    optional(seq(WITH, '(', $.schema_declaration, ')')),
    optional($.as_table_alias)
  ),

  open_json: $ => seq(
    OPENJSON,
    '(',
    $.expression,
    optional(seq(',', $.expression)),
    ')',
    optional(seq(WITH, '(', $.json_declaration, ')')),
    optional($.as_table_alias)
  ),
}
