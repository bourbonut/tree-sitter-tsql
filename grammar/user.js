const {
  ALLOW_ENCRYPTED_VALUE_MODIFICATIONS,
  ALTER,
  ASYMMETRIC,
  BINARY,
  CERTIFICATE,
  COMMA,
  CREATE,
  DECIMAL,
  DEFAULT_LANGUAGE,
  DEFAULT_SCHEMA,
  EQUAL,
  EXTERNAL,
  FOR,
  FROM,
  KEY,
  LOGIN,
  NAME,
  NONE,
  NULL_,
  OFF,
  OLD_PASSWORD,
  ON,
  PASSWORD,
  PROVIDER,
  SID,
  STRING,
  USER,
  WITH,
  WITHOUT,
} = require("./lexer.js");

module.exports = {
  // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-user-transact-sql
  alter_user: $ => seq(
    ALTER,
    USER,
    field("username", $.id_),
    WITH,
    repeat1(choice(
      seq(optional(COMMA), NAME, EQUAL, field("newusername", $.id_)),
      seq(optional(COMMA), DEFAULT_SCHEMA, EQUAL, choice(field("schema_name", $.id_), NULL_)),
      seq(optional(COMMA), LOGIN, EQUAL, field("loginame", $.id_)),
      seq(optional(COMMA), PASSWORD, EQUAL, STRING, repeat1(seq(OLD_PASSWORD, EQUAL, STRING))),
      seq(optional(COMMA), DEFAULT_LANGUAGE, EQUAL, choice(NONE, field("lcid", DECIMAL), field("language_name_or_alias", $.id_))),
      seq(optional(COMMA), ALLOW_ENCRYPTED_VALUE_MODIFICATIONS, EQUAL, choice(ON, OFF))
    )),
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-user-transact-sql
  create_user: $ => choice(
    seq(
      CREATE,
      USER,
      field("user_name", $.id_),
      optional(seq(
        choice(FOR, FROM),
        LOGIN,
        field("login_name", $.id_)
      )),
      optional(seq(
        WITH,
        repeat(choice(
          seq(optional(COMMA), DEFAULT_SCHEMA, EQUAL, field("schema_name", $.id_)),
          seq(optional(COMMA), ALLOW_ENCRYPTED_VALUE_MODIFICATIONS, EQUAL, choice(ON, OFF))
        ))
      ))
    ),
    seq(
      CREATE,
      USER,
      choice(
        seq(
          field("windows_principal", $.id_),
          optional(seq(
            WITH,
            repeat(choice(
              seq(optional(COMMA), DEFAULT_SCHEMA, EQUAL, field("schema_name", $.id_)),
              seq(optional(COMMA), DEFAULT_LANGUAGE, EQUAL, choice(NONE, DECIMAL, field("language_name_or_alias", $.id_))),
              seq(optional(COMMA), SID, EQUAL, BINARY),
              seq(optional(COMMA), ALLOW_ENCRYPTED_VALUE_MODIFICATIONS, EQUAL, choice(ON, OFF))
            ))
          ))
        ),
        seq(
          field("user_name", $.id_),
          WITH,
          PASSWORD,
          EQUAL,
          field("password", STRING),
          repeat(choice(
            seq(optional(COMMA), DEFAULT_SCHEMA, EQUAL, field("schema_name", $.id_)),
            seq(optional(COMMA), DEFAULT_LANGUAGE, EQUAL, choice(NONE, DECIMAL, field("language_name_or_alias", $.id_))),
            seq(optional(COMMA), SID, EQUAL, BINARY),
            seq(optional(COMMA), ALLOW_ENCRYPTED_VALUE_MODIFICATIONS, EQUAL, choice(ON, OFF))
          ))
        ),
        seq(
          field("Azure_Active_Directory_principal", $.id_),
          FROM,
          EXTERNAL,
          PROVIDER
        )
      )
    ),
    seq(
      CREATE,
      USER,
      field("user_name", $.id_),
      choice(
        seq(
          WITHOUT,
          LOGIN,
          repeat(choice(
            seq(optional(COMMA), DEFAULT_SCHEMA, EQUAL, field("schema_name", $.id_)),
            seq(optional(COMMA), ALLOW_ENCRYPTED_VALUE_MODIFICATIONS, EQUAL, choice(ON, OFF))
          ))
        ),
        seq(
          choice(FOR, FROM),
          CERTIFICATE,
          field("cert_name", $.id_)
        ),
        seq(
          choice(FOR, FROM),
          ASYMMETRIC,
          KEY,
          field("asym_key_name", $.id_)
        )
      )
    ),
    seq(
      CREATE,
      USER,
      field("user_name", $.id_)
    )
  ),

  create_user_azure_sql_dw: $ => choice(
    seq(
      CREATE,
      USER,
      field("user_name", $.id_),
      optional(choice(
        seq(
          choice(FOR, FROM),
          LOGIN,
          field("login_name", $.id_)
        ),
        seq(WITHOUT, LOGIN)
      )),
      optional(seq(
        WITH,
        DEFAULT_SCHEMA,
        EQUAL,
        field("schema_name", $.id_)
      ))
    ),
    seq(
      CREATE,
      USER,
      field("Azure_Active_Directory_principal", $.id_),
      FROM,
      EXTERNAL,
      PROVIDER,
      optional(seq(
        WITH,
        DEFAULT_SCHEMA,
        EQUAL,
        field("schema_name", $.id_)
      ))
    )
  ),

  alter_user_azure_sql: $ => seq(
    ALTER,
    USER,
    field("username", $.id_),
    WITH,
    repeat1(choice(
      seq(optional(COMMA), NAME, EQUAL, field("newusername", $.id_)),
      seq(optional(COMMA), DEFAULT_SCHEMA, EQUAL, field("schema_name", $.id_)),
      seq(optional(COMMA), LOGIN, EQUAL, field("login_name", $.id_)),
      seq(optional(COMMA), ALLOW_ENCRYPTED_VALUE_MODIFICATIONS, EQUAL, choice(ON, OFF))
    ))
  ),
}
