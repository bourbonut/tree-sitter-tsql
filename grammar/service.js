const {
  ADD,
  ALTER,
  AUTHORIZATION,
  COMMA,
  CONTRACT,
  CREATE,
  DEFAULT,
  DOT,
  DROP,
  EQUAL,
  FORCE,
  KEY,
  LR_BRACKET,
  MASTER,
  NEW_ACCOUNT,
  NEW_PASSWORD,
  OLD_ACCOUNT,
  OLD_PASSWORD,
  ON,
  QUEUE,
  REGENERATE,
  RR_BRACKET,
  SERVICE,
  STRING,
  WITH,
} = require("./lexer.js");

module.exports = {
  // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-service-transact-sql
  alter_service: $ => seq(
    ALTER,
    SERVICE,
    field("modified_service_name", $.id_),
    optional(seq(
      ON,
      QUEUE,
      optional(seq(field("schema_name", $.id_), DOT)),
      field("queue_name", $.id_)
    )),
    optional(
      seq(
        '(',
        $.opt_arg_clause,
        repeat(seq(COMMA, $.opt_arg_clause)),
        ')'
      ),
    )
  ),

  opt_arg_clause: $ => seq(
    choice(seq(ADD, DROP)),
    CONTRACT,
    field("modified_contract_name", $.id_)
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-service-transact-sql
  create_service: $ => seq(
    CREATE,
    SERVICE,
    field("create_service_name", $.id_),
    optional(seq(AUTHORIZATION, field("owner_name", $.id_))),
    ON,
    QUEUE,
    optional(seq(field("schema_name", $.id_), DOT)),
    field("queue_name", $.id_),
    optional(seq(LR_BRACKET, repeat1(seq(optional(COMMA), choice($.id_, DEFAULT))), RR_BRACKET))
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-service-master-key-transact-sql
  alter_service_master_key: _ => seq(
    ALTER,
    SERVICE,
    MASTER,
    KEY,
    choice(
      seq(optional(FORCE), REGENERATE),
      seq(WITH, choice(
        seq(
          OLD_ACCOUNT,
          EQUAL,
          field("acold_account_name", STRING),
          COMMA,
          OLD_PASSWORD,
          EQUAL,
          field("old_password", STRING),
        ),
        seq(
          NEW_ACCOUNT,
          EQUAL,
          field("new_account_name", STRING),
          COMMA,
          NEW_PASSWORD,
          EQUAL,
          field("new_password", STRING)
        )
      ))
    )
  ),
}
