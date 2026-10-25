const {
  ADD,
  AFFINITY,
  ALTER,
  AUTHORIZATION,
  AUTO,
  BINARY,
  BLOB_STORAGE,
  COMMA,
  CONTENT,
  CPU,
  CREATE,
  CREDENTIAL,
  DATA,
  DATA_SOURCE,
  DECIMAL,
  DEFAULT_DOUBLE_QUOTE,
  EQUAL,
  EXTERNAL,
  FROM,
  LANGUAGE,
  LIBRARY,
  LINUX,
  LOCATION,
  LR_BRACKET,
  MAX_CPU_PERCENT,
  MAX_MEMORY_PERCENT,
  MAX_PROCESSES,
  NONE,
  NUMANODE,
  PLATFORM,
  POOL,
  PYTHON,
  RESOURCE,
  RESOURCE_MANAGER_LOCATION,
  RR_BRACKET,
  SET,
  SOURCE,
  STRING,
  TO,
  TYPE,
  WINDOWS,
  WITH,
} = require("./lexer.js")

module.exports = {
  // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-external-data-source-transact-sql
  alter_external_data_source: $ => choice(
    seq(
      ALTER,
      EXTERNAL,
      DATA,
      SOURCE,
      field("data_source_name", $.id_),
      SET,
      repeat1(
        choice(
          seq(LOCATION, EQUAL, field("location", STRING), optional(COMMA)),
          seq(RESOURCE_MANAGER_LOCATION, EQUAL, field("resource_manager_location", STRING), optional(COMMA)),
          seq(CREDENTIAL, EQUAL, field("credential_name", $.id_))
        )
      ),
    ),
    seq(
      ALTER,
      EXTERNAL,
      DATA,
      SOURCE,
      field("data_source_name", $.id_),
      WITH,
      LR_BRACKET,
      TYPE,
      EQUAL,
      BLOB_STORAGE,
      COMMA,
      LOCATION,
      EQUAL,
      field("location", STRING),
      optional(seq(COMMA, CREDENTIAL, EQUAL, field("credential_name", $.id_))),
      RR_BRACKET
    ),
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-external-library-transact-sql
  alter_external_library: $ => seq(
    ALTER,
    EXTERNAL,
    LIBRARY,
    field("library_name", $.id_),
    optional(seq(AUTHORIZATION, field("owner_name", $.id_))),
    choice(seq(SET, ADD)),
    choice(seq(
      LR_BRACKET,
      CONTENT,
      EQUAL,
      field("client_library", choice(STRING, BINARY, NONE)),
      seq(COMMA, PLATFORM, EQUAL, optional(choice(WINDOWS, LINUX)), RR_BRACKET),
      WITH,
      repeat1(choice(
        seq(optional(COMMA), LANGUAGE, EQUAL, choice(seq(R, PYTHON))),
        seq(DATA_SOURCE, EQUAL, field("external_data_source_name", $.id_))
      )),
      RR_BRACKET
    )),
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-external-library-transact-sql
  create_external_library: $ => seq(
    CREATE,
    EXTERNAL,
    LIBRARY,
    field("library_name", $.id_),
    optional(seq(AUTHORIZATION, field("owner_name", $.id_))),
    FROM,
    choice(seq(
      optional(COMMA),
      optional(LR_BRACKET),
      optional(choice(CONTENT, EQUAL)),
      field("client_library", choice(STRING, BINARY, NONE)),
      optional(seq(COMMA, PLATFORM, EQUAL, optional(choice(WINDOWS, LINUX)), RR_BRACKET)),
    )),
    optional(seq(
      WITH,
      repeat1(choice(
        seq(optional(COMMA), LANGUAGE, EQUAL, choice(R, PYTHON)),
        seq(DATA_SOURCE, EQUAL, field("external_data_source_name", $.id_))
      )),
      RR_BRACKET
    )),
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-external-resource-pool-transact-sql
  alter_external_resource_pool: $ => seq(
    ALTER,
    EXTERNAL,
    RESOURCE,
    POOL,
    choice(field("pool_name", choice($.id_, DEFAULT_DOUBLE_QUOTE))),
    WITH,
    LR_BRACKET,
    MAX_CPU_PERCENT,
    EQUAL,
    field("max_cpu_percent", DECIMAL),
    choice(
      seq(optional(COMMA), AFFINITY, CPU, EQUAL, choice(AUTO, repeat1(choice(seq(optional(COMMA), DECIMAL, TO, DECIMAL), seq(COMMA, DECIMAL))))),
      seq(NUMANODE, EQUAL, repeat1(choice(seq(optional(COMMA), DECIMAL, TO, DECIMAL), seq(optional(COMMA), DECIMAL))))
    ),
    optional(seq(optional(COMMA), MAX_MEMORY_PERCENT, EQUAL, field("max_memory_percent", DECIMAL))),
    optional(seq(optional(COMMA), MAX_PROCESSES, EQUAL, field("max_processes", DECIMAL))),
    RR_BRACKET
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-external-resource-pool-transact-sql
  create_external_resource_pool: $ => seq(
    CREATE,
    EXTERNAL,
    RESOURCE,
    POOL,
    field("pool_name", $.id_),
    WITH,
    LR_BRACKET,
    MAX_CPU_PERCENT,
    EQUAL,
    field("max_cpu_percent", DECIMAL),
    choice(
      seq(optional(COMMA), AFFINITY, CPU, EQUAL, choice(AUTO, repeat1(seq(optional(COMMA), DECIMAL, TO, DECIMAL), seq(COMMA, DECIMAL)))),
      seq(NUMANODE, EQUAL, repeat1(choice(seq(optional(COMMA), DECIMAL, TO, DECIMAL), seq(optional(COMMA), DECIMAL))))
    ),
    optional(seq(optional(COMMA), MAX_MEMORY_PERCENT, EQUAL, field("max_memory_percent", DECIMAL))),
    optional(seq(optional(COMMA), MAX_PROCESSES, EQUAL, field("max_processes", DECIMAL))),
    RR_BRACKET
  ),
}
