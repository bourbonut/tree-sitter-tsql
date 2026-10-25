const {
  ADD,
  ALTER,
  AUDIT,
  BY,
  CREATE,
  DATABASE,
  DELETE,
  DROP,
  EXECUTE,
  FOR,
  INSERT,
  OFF,
  ON,
  RECEIVE,
  REFERENCE,
  SELECT,
  SERVER,
  SPECIFICATION,
  STATE,
  UPDATE,
  WITH,
} = require("./lexer.js");

module.exports = {
  // https://learn.microsoft.com/en-us/sql/t-sql/statements/alter-database-audit-specification-transact-optional($.sql)view=sql-server-ver16
  alter_database_audit_specification: $ => seq(
    ALTER,
    DATABASE,
    AUDIT,
    SPECIFICATION,
    field("audit_specification_name", $.id_),
    optional(seq(FOR, SERVER, AUDIT, field("audit_name", $.id_))),
    optional(seq($.audit_action_spec_group, repeat(seq(',', $.audit_action_spec_group)))),
    optional(seq(WITH, '(', STATE, '=', choice(ON, OFF), ')')),
  ),

  audit_action_spec_group: $ => seq(
    choice(ADD, DROP),
    '(', choice($.audit_action_specification, field("audit_action_group_name", $.id_)), ')'
  ),


  audit_action_specification: $ => seq(
    $.action_specification,
    repeat(seq(',', $.action_specification)),
    ON,
    optional(seq($.audit_class_name, '::')),
    $.audit_securable,
    BY,
    $.principal_id,
    repeat(seq(',', $.principal_id)),
  ),

  action_specification: _ => choice(
    SELECT,
    INSERT,
    UPDATE,
    DELETE,
    EXECUTE,
    RECEIVE,
    REFERENCE,
  ),

  // https://learn.microsoft.com/en-us/sql/t-sql/statements/create-database-audit-specification-transact-optional($.sql)view=sql-server-ver16
  create_database_audit_specification: $ => seq(
    CREATE,
    DATABASE,
    AUDIT,
    SPECIFICATION,
    field("audit_specification_name", $.id_),
    optional(seq(FOR, SERVER, AUDIT, field("audit_name", $.id_)) ),
    optional(seq($.audit_action_spec_group, repeat(seq(',', $.audit_action_spec_group)))),
    optional(seq(WITH, '(', STATE, '=', choice(ON, OFF), ')') ),
  ),
}
