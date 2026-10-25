const {
  ACCENT_SENSITIVITY,
  ADD,
  ALL,
  ALTER,
  AS,
  AUTHORIZATION,
  BINARY,
  CATALOG,
  CREATE,
  DECIMAL,
  DEFAULT,
  DOT,
  DROP,
  EQUAL,
  FILEGROUP,
  FROM,
  FULLTEXT,
  IN,
  LANGUAGE,
  OFF,
  ON,
  PATH,
  REBUILD,
  REORGANIZE,
  STOPLIST,
  STRING,
  SYSTEM,
  WITH,
} = require("./lexer.js");

module.exports = {
  // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-fulltext-catalog-transact-sql
  alter_fulltext_catalog: $ => seq(
    ALTER,
    FULLTEXT,
    CATALOG,
    field("catalog_name", $.id_),
    choice(
      seq(REBUILD, optional(seq(WITH, ACCENT_SENSITIVITY, EQUAL, choice(ON, OFF)))),
      REORGANIZE,
      seq(AS, DEFAULT)
    )
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-fulltext-catalog-transact-sql
  create_fulltext_catalog: $ => seq(
    CREATE,
    FULLTEXT,
    CATALOG,
    field("catalog_name", $.id_),
    optional(seq(ON, FILEGROUP, field("filegroup", $.id_))),
    optional(seq(IN, PATH, field("rootpath", STRING))),
    optional(seq(WITH, ACCENT_SENSITIVITY, EQUAL, choice(ON, OFF))),
    optional(AS, DEFAULT),
    optional(seq(AUTHORIZATION, field("owner_name", $.id_)))
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-fulltext-stoplist-transact-sql
  alter_fulltext_stoplist: $ => seq(
    ALTER,
    FULLTEXT,
    STOPLIST,
    field("stoplist_name", $.id_),
    choice(
      seq(ADD, field("stopword", STRING), LANGUAGE, choice(STRING, DECIMAL, BINARY)),
      seq(DROP, choice(
        seq(field("stopword", STRING), LANGUAGE, choice(STRING, DECIMAL, BINARY)),
        seq(ALL, choice(STRING, DECIMAL, BINARY)),
        ALL
      ))
    ),
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-fulltext-stoplist-transact-sql
  create_fulltext_stoplist: $ => seq(
    CREATE,
    FULLTEXT,
    STOPLIST,
    field("stoplist_name", $.id_),
    optional(seq(FROM, choice(seq(
      optional(seq(field("database_name", $.id_), DOT)),
      field("source_stoplist_name", $.id_),
      SYSTEM,
      STOPLIST
    )))),
    optional(seq(AUTHORIZATION, field("owner_name", $.id_))),
  ),
}
