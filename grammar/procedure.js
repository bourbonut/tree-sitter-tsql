const {
  AS,
  DEFAULT,
  ENCRYPTION,
  LOCAL_ID,
  NULL,
  OUT,
  OUTPUT,
  READONLY,
  RECOMPILE,
  VARYING,
} = require("./lexer.js");

module.exports = {
  procedure_param_default_value: $ => choice(
    NULL$._,
    DEFAULT,
    $.constant,
    LOCAL_ID,
  ),

  procedure_param: $ => (
    seq(LOCAL_ID, AS?, optional(seq(field("type_schema", $.id_), '.'),), $.data_type, VARYING?, optional(
      seq('=', field("default_val", $.procedure_param_default_value))
    ), optional(choice(seq(OUT, OUTPUT, READONLY),))),
  ),

  procedure_option: $ => choice(
    ENCRYPTION,
    RECOMPILE,
    $.execute_clause,
  ),
}
