const {
  ADD,
  ALTER,
  ASYMMETRIC,
  BINARY,
  CERTIFICATE,
  CHECK_EXPIRATION,
  CHECK_POLICY,
  COMMA,
  CREATE,
  CREDENTIAL,
  DEFAULT_DATABASE,
  DEFAULT_LANGUAGE,
  DISABLE,
  DROP,
  ENABLE,
  EQUAL,
  FROM,
  HASHED,
  KEY,
  LOGIN,
  MUST_CHANGE,
  NAME,
  NO,
  OFF,
  OLD_PASSWORD,
  ON,
  PASSWORD,
  SID,
  STRING,
  UNLOCK,
  WINDOWS,
  WITH,
} = require("./lexer.js");

module.exports = {
  // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-login-transact-sql
  alter_login_sql_server: $ => seq(
    ALTER,
    LOGIN,
    field("login_name", $.id_),
    choice(
      optional(choice(ENABLE, DISABLE)),
      seq(
        WITH,
        seq(
          repeat(seq(PASSWORD, EQUAL, choice(field("password", STRING), seq(field("password_hash", BINARY), HASHED)))),
          repeat(choice(MUST_CHANGE, UNLOCK)),
          optional(seq(OLD_PASSWORD, EQUAL, field("old_password", STRING), repeat(choice(MUST_CHANGE, UNLOCK)))),
          optional(seq(DEFAULT_DATABASE, EQUAL, field("default_database", $.id_))),
          optional(seq(DEFAULT_LANGUAGE, EQUAL, field("default_language", $.id_))),
          optional(seq(NAME, EQUAL, field("login_name", $.id_))),
          optional(seq(CHECK_POLICY, EQUAL, choice(ON, OFF))),
          optional(seq(CHECK_EXPIRATION, EQUAL, choice(ON, OFF))),
          optional(seq(CREDENTIAL, EQUAL, field("credential_name", $.id_))),
          optional(seq(NO, CREDENTIAL))
        ),
        seq(choice(ADD, DROP), CREDENTIAL, field("credential_name", $.id_))
      ),
    ),
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-login-transact-sql
  create_login_sql_server: $ => seq(
    CREATE,
    LOGIN,
    field("login_name", $.id_),
    choice(
      seq(
        WITH,
        repeat(seq(PASSWORD, EQUAL, choice(field("password", STRING), seq(field("password_hash", BINARY), HASHED)))),
        optional(seq(optional(COMMA), SID, EQUAL, field("sid", BINARY))),
        optional(seq(optional(COMMA), DEFAULT_DATABASE, EQUAL, field("default_database", $.id_))),
        optional(seq(optional(COMMA), DEFAULT_LANGUAGE, EQUAL, field("default_language", $.id_))),
        optional(seq(optional(COMMA), CHECK_EXPIRATION, EQUAL, choice(ON, OFF))),
        optional(seq(optional(COMMA), CHECK_POLICY, EQUAL, choice(ON, OFF))),
        optional(seq(optional(COMMA), CREDENTIAL, EQUAL, field("credential_name", $.id_)))
      ),
      seq(
        FROM,
        choice(
          seq(WINDOWS, seq(
            WITH,
            seq(optional(COMMA), DEFAULT_DATABASE, EQUAL, field("default_database", $.id_)),
            seq(optional(COMMA), DEFAULT_LANGUAGE, EQUAL, field("default_language", STRING)),
          )),
          seq(CERTIFICATE, field("certname", $.id_)),
          seq(ASYMMETRIC, KEY, field("asym_key_name", $.id_)),
        )
      )
    ),
  ),

  alter_login_azure_sql: $ => seq(
    ALTER,
    LOGIN,
    field("login_name", $.id_),
    choice(
      optional(choice(ENABLE, DISABLE)),
      seq(WITH, choice(
        seq(PASSWORD, EQUAL, field("password", STRING), optional(seq(OLD_PASSWORD, EQUAL, field("old_password", STRING)))),
        seq(NAME, EQUAL, field("login_name", $.id_))
      )),
    ),
  ),

  create_login_azure_sql: $ => seq(
    CREATE,
    LOGIN,
    field("login_name", $.id_),
    WITH,
    PASSWORD,
    EQUAL,
    STRING,
    optional(seq(SID, EQUAL, field("sid", BINARY)))
  ),

  alter_login_azure_sql_dw_and_pdw: $ => seq(
    ALTER,
    LOGIN,
    field("login_name", $.id_),
    choice(
      optional(choice(ENABLE, DISABLE)),
      seq(WITH, choice(
        seq(PASSWORD, EQUAL, field("password", STRING), optional(seq(OLD_PASSWORD, EQUAL, field("old_password", STRING), repeat(choice(seq(MUST_CHANGE, UNLOCK)))))),
        seq(NAME, EQUAL, field("login_name", $.id_))
      )),
    ),
  ),

  create_login_pdw: $ => seq(
    CREATE,
    LOGIN,
    field("loginName", $.id_),
    choice(
      seq(WITH, seq(
        PASSWORD,
        EQUAL,
        field("password", STRING),
        optional(MUST_CHANGE),
        optional(seq(CHECK_POLICY, EQUAL, optional(choice(ON, OFF))))
      )),
      seq(FROM, WINDOWS)
    ),
  ),
}
