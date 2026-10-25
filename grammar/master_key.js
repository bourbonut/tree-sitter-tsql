const {
 ADD,
 ALTER,
 BY,
 CREATE,
 DROP,
 ENCRYPTION,
 EQUAL,
 FORCE,
 KEY,
 MASTER,
 PASSWORD,
 REGENERATE,
 SERVICE,
 STRING,
 WITH,
} = require("./lexer.js");

module.exports = {
  // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-master-key-transact-sql
  alter_master_key_sql_server: _ => seq(
    ALTER,
    MASTER,
    KEY,
    choice(
      seq(optional(FORCE), REGENERATE, WITH, ENCRYPTION, BY, PASSWORD, EQUAL, field("password", STRING)),
      seq(
        choice(ADD, DROP),
        ENCRYPTION,
        BY,
        choice(seq(SERVICE, MASTER, KEY), seq(PASSWORD, EQUAL, field("encryption_password", STRING)))
      )
    ),
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-master-key-transact-sql
  create_master_key_sql_server: _ => seq(
    CREATE,
    MASTER,
    KEY,
    ENCRYPTION,
    BY,
    PASSWORD,
    EQUAL,
    field("password", STRING)
  ),

  alter_master_key_azure_sql: _ => seq(
    ALTER,
    MASTER,
    KEY,
    choice(
      seq(optional(FORCE), REGENERATE, WITH, ENCRYPTION, BY, PASSWORD, EQUAL, field("password", STRING)),
      seq(ADD, ENCRYPTION, BY, choice(
        seq(SERVICE, MASTER, KEY),
        seq(PASSWORD, EQUAL, field("encryption_password", STRING))
      )),
      seq(DROP, ENCRYPTION, BY, PASSWORD, EQUAL, field("encryption_password", STRING))
    ),
  ),

  create_master_key_azure_sql: _ => seq(
    CREATE,
    MASTER,
    KEY,
    optional(seq(ENCRYPTION, BY, PASSWORD, EQUAL, field("password", STRING)))
  ),
}
