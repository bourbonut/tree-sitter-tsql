const {
  ALTER,
  APPLICATION,
  COMMA,
  CREATE,
  DEFAULT_SCHEMA,
  DROP,
  EQUAL,
  NAME,
  PASSWORD,
  ROLE,
  STRING,
  WITH,
} = require("./lexer.js");

module.exports = {
  // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-application-role-transact-sql
  alter_application_role: $ => seq(
    ALTER,
    APPLICATION,
    ROLE,
    field("appliction_role", $.id_),
    WITH,
    optional(seq(optional(COMMA), NAME, EQUAL, field("new_application_role_name", $.id_))),
    optional(seq(optional(COMMA), PASSWORD, EQUAL, field("application_role_password", STRING))),
    optional(seq(optional(COMMA), DEFAULT_SCHEMA, EQUAL, field("app_role_default_schema", $.id_))),
  ),

  create_application_role: $ => seq(
    CREATE,
    APPLICATION,
    ROLE,
    field("appliction_role", $.id_),
    WITH,
    optional(seq(optional(COMMA), PASSWORD, EQUAL, field("application_role_password", STRING))),
    optional(seq(optional(COMMA), DEFAULT_SCHEMA, EQUAL, field("app_role_default_schema", $.id_)))
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-application-role-transact-sql
  drop_application_role: $ => seq(DROP, APPLICATION, ROLE, field("rolename", $.id_)),
}
