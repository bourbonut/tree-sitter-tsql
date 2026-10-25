const {
  ALTER,
  ANONYMOUS,
  AUTHORIZATION,
  BINDING,
  COMMA,
  CREATE,
  EQUAL,
  OFF,
  ON,
  REMOTE,
  SERVICE,
  STRING,
  TO,
  USER,
  WITH,
} = require("./lexer.js");

module.exports = {
  // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-remote-service-binding-transact-sql
  alter_remote_service_binding: $ => seq(
    ALTER,
    REMOTE,
    SERVICE,
    BINDING,
    field("binding_name", $.id_),
    WITH,
    optional(seq(USER, EQUAL, field("user_name", $.id_))),
    optional(seq(COMMA, ANONYMOUS, EQUAL, choice(ON, OFF))),
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-remote-service-binding-transact-sql
  create_remote_service_binding: $ => seq(
    CREATE,
    REMOTE,
    SERVICE,
    BINDING,
    field("binding_name", $.id_),
    optional(seq(AUTHORIZATION, field("owner_name", $.id_))),
    TO,
    SERVICE,
    field("remote_service_name", STRING),
    WITH,
    optional(seq(USER, EQUAL, field("user_name", $.id_))),
    optional(seq(COMMA, ANONYMOUS, EQUAL, choice(ON, OFF)))
  ),
}
