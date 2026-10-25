const {
  ALGORITHM,
  ALTER,
  ASSEMBLY,
  ASYMMETRIC,
  AUTHORIZATION,
  BY,
  COMMA,
  CREATE,
  CREATE_NEW,
  CREATION_DISPOSITION,
  DECRYPTION,
  DROP,
  ENCRYPTION,
  EQUAL,
  EXECUTABLE_FILE,
  FILE,
  FROM,
  KEY,
  LR_BRACKET,
  OPEN_EXISTING,
  PASSWORD,
  PRIVATE,
  PROVIDER,
  PROVIDER_KEY_NAME,
  REMOVE,
  RR_BRACKET,
  RSA_1024,
  RSA_2048,
  RSA_3072,
  RSA_4096,
  RSA_512,
  STRING,
  WITH,
} = require("./lexer.js");

module.exports = {
  // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-asymmetric-key-transact-sql
  alter_asymmetric_key: $ => seq(
    $.alter_asymmetric_key_start,
    field("Asym_Key_Name", $.id_),
    seq(choice($.asymmetric_key_option, REMOVE), PRIVATE, KEY)
  ),

  alter_asymmetric_key_start: _ => seq(ALTER, ASYMMETRIC, KEY),

  asymmetric_key_option: $ => seq(
    $.asymmetric_key_option_start,
    $.asymmetric_key_password_change_option,
    optional(seq(COMMA, $.asymmetric_key_password_change_option)),
    RR_BRACKET
  ),

  asymmetric_key_option_start: _ => seq(WITH, PRIVATE, KEY, LR_BRACKET),

  asymmetric_key_password_change_option: _ => choice(
    seq(DECRYPTION, BY, PASSWORD, EQUAL, STRING),
    seq(ENCRYPTION, BY, PASSWORD, EQUAL, STRING),
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-asymmetric-key-transact-sql
  create_asymmetric_key: $ => seq(
    CREATE,
    ASYMMETRIC,
    KEY,
    field("Asym_Key_Nam", $.id_),
    optional(seq(AUTHORIZATION, field("database_principal_name", $.id_))),
    optional(seq(FROM, choice(
      seq(FILE, EQUAL, STRING),
      seq(EXECUTABLE_FILE, EQUAL, STRING),
      seq(ASSEMBLY, field("Assembly_Name", $.id_)),
      seq(PROVIDER, field("Provider_Name", $.id_))
    ))),
    optional(seq(WITH, choice(
      seq(ALGORITHM, EQUAL, choice(RSA_4096, RSA_3072, RSA_2048, RSA_1024, RSA_512)),
      seq(PROVIDER_KEY_NAME, EQUAL, field("provider_key_name", STRING)),
      seq(CREATION_DISPOSITION, EQUAL, choice(CREATE_NEW, OPEN_EXISTING))
    ))),
    optional(seq(ENCRYPTION, BY, PASSWORD, EQUAL, field("asymmetric_key_password", STRING)))
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-asymmetric-key-transact-sql
  drop_asymmetric_key: $ => seq(DROP, ASYMMETRIC, KEY, field("key_name", $.id_), optional(seq(REMOVE, PROVIDER, KEY))),
}
