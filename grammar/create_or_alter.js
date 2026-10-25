const {
  AFTER,
  ALL,
  ALTER,
  APPEND,
  AS,
  CREATE,
  DATABASE,
  DECIMAL,
  DELETE,
  ENCRYPTION,
  EXTERNAL,
  FOR,
  FUNCTION,
  INSERT,
  INSTEAD,
  NAME,
  NOT,
  OF,
  ON,
  OR,
  PROC,
  PROCEDURE,
  REPLICATION,
  SERVER,
  TRIGGER,
  UPDATE,
  WITH,
} = require("./lexer.js");

module.exports = {
  // https://msdn.microsoft.com/en-us/library/ms187926(v=sql.120).aspx
  create_or_alter_procedure: $ => (
    seq(choice(seq((seq(CREATE, optional(seq(OR, ALTER),))), ALTER),), $.proc, =, choice(seq(PROC, PROCEDURE),), field("$.procName", $.func_$.proc_name_schema), optional(
      seq(';', DECIMAL)
    ), optional(seq(optional('('), $.procedure_param, repeat(seq(',', $.procedure_param),), optional(')'))), optional(
      seq(WITH, $.procedure_option, repeat(seq(',', $.procedure_option),))
    ), optional(seq(FOR, REPLICATION),), AS, choice(seq($.as_external_name, repeat($.sql_clauses)))),
  ),

  as_external_name: $ => (
    seq(EXTERNAL, NAME, field("assembly_name", $.id_), '.', field("class_name", $.id_), '.', field("method_name", $.id_)),
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-trigger-transact-sql
  create_or_alter_trigger: $ => choice(
    $.create_or_alter_dml_trigger,
    $.create_or_alter_ddl_trigge,
  ),

  create_or_alter_dml_trigger: $ => (
    seq(choice(seq(CREATE, optional(seq(OR, ALTER),), ALTER),), TRIGGER, $.simple_name, ON, $.table_name, optional(
      seq(WITH, $.dml_trigger_option, repeat(seq(',', $.dml_trigger_option),))
    ), choice(seq(FOR, AFTER, INSTEAD, OF),), $.dml_trigger_operation, repeat(seq(',', $.dml_trigger_operation),), optional(seq(WITH, APPEND),), optional(
      seq(NOT, FOR, REPLICATION)
    ), AS, repeat1($.sql_clauses)),
  ),

  dml_trigger_option: $ => choice(
    ENCRYPTION,
    $.execute_claus,
  ),

  dml_trigger_operation: $ => choice(
    INSERT,
    UPDATE,
    DELETE,
  ),

  create_or_alter_ddl_trigger: $ => seq(
    choice(seq(CREATE, optional(seq(OR, ALTER)), ALTER)),
    TRIGGER,
    $.simple_name,
    ON,
    choice(seq(ALL, SERVER, DATABASE)),
    optional(seq(WITH, $.dml_trigger_option, repeat(seq(',', $.dml_trigger_option)))),
    choice(seq(FOR, AFTER)),
    $.ddl_trigger_operation,
    repeat(seq(',', $.ddl_trigger_operation)),
    AS,
    repeat1($.sql_clauses)
  ),

  ddl_trigger_operation: $ => $.simple_id,

  // https://msdn.microsoft.com/en-us/library/ms186755.aspx
  create_or_alter_function: $ => (
    seq(choice(seq((seq(CREATE, optional(seq(OR, ALTER),))), ALTER),), FUNCTION, field("funcName", $.func_proc_name_schema), choice(
      (seq('(', $.procedure_param, repeat(seq(',', $.procedure_param),), ')'),),
      seq('(', ')')
    ), $.but, $.can, $.be, $.empty),
    seq(choice(seq($.func_body_returns_select, $.func_body_returns_table, $.func_body_returns_scalar),), optional(';')),
  ),
}
