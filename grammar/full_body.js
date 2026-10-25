const {
  AS,
  BEGIN,
  CALLED,
  ENCRYPTION,
  END,
  INPUT,
  LOCAL_ID,
  NULL,
  ON,
  RETURN,
  RETURNS,
  SCHEMABINDING,
  TABLE,
  WITH,
} = require("./lexer.js");

module.exports = {
    func_body_returns_select: $ => (
            seq(RETURNS, TABLE, optional(seq(WITH, $.function_option, repeat(seq(',', $.function_option),))), AS?, choice(
            $.as_external_name,
        seq(RETURN, choice(seq('(', $.select_statement_standalone, ')', $.select_statement_standalone),))
        ),),
    ),

    func_body_returns_table: $ => (
            seq(RETURNS, LOCAL_ID, $.table_type_definition, optional(seq(WITH, $.function_option, repeat(seq(',', $.function_option),))), AS?, choice(
            $.as_external_name,
        seq(BEGIN, repeat($.sql_clauses), RETURN, optional(';'), END, optional(';'))
        ),),
    ),

    func_body_returns_scalar: $ => (
            seq(RETURNS, $.data_type, optional(seq(WITH, $.function_option, repeat(seq(',', $.function_option),))), AS?, choice(
            $.as_external_name,
        seq(BEGIN, repeat($.sql_clauses), RETURN, field("ret", $.expression), optional(';'), END)
        ),),
    ),

    function_option: $ => choice(
        ENCRYPTION,
        SCHEMABINDING,
        seq(RETURNS, NULL$._, ON, NULL$._, INPUT),
        seq(CALLED, ON, NULL$._, INPUT),
        $.execute_claus,
    ),
}
