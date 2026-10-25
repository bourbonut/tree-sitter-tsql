const {
  ALTER,
  COMMA,
  CREATE,
  DECIMAL,
  DEFAULT_DOUBLE_QUOTE,
  EQUAL,
  EXTERNAL,
  GROUP,
  GROUP_MAX_REQUESTS,
  HIGH,
  IMPORTANCE,
  LOW,
  LR_BRACKET,
  MAX_DOP,
  MEDIUM,
  REQUEST_MAX_CPU_TIME_SEC,
  REQUEST_MAX_MEMORY_GRANT_PERCENT,
  REQUEST_MEMORY_GRANT_TIMEOUT_SEC,
  RR_BRACKET,
  USING,
  WITH,
  WORKLOAD,
} = require("./lexer.js");

module.exports = {
  // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-workload-group-transact-sql

  alter_workload_group: $ => seq(
    ALTER,
    WORKLOAD,
    GROUP,
    choice(seq(field("workload_group_group_name", $.id_), DEFAULT_DOUBLE_QUOTE)),
    optional(seq(
      WITH,
      LR_BRACKET,
      repeat1(choice(
        seq(IMPORTANCE, EQUAL, choice(LOW, MEDIUM, HIGH)),
        seq(optional(COMMA), REQUEST_MAX_MEMORY_GRANT_PERCENT, EQUAL, field("request_max_memory_grant", DECIMAL)),
        seq(optional(COMMA), REQUEST_MAX_CPU_TIME_SEC, EQUAL, field("request_max_cpu_time_sec", DECIMAL)),
        seq(REQUEST_MEMORY_GRANT_TIMEOUT_SEC, EQUAL, field("request_memory_grant_timeout_sec", DECIMAL)),
        seq(MAX_DOP, EQUAL, field("max_dop", DECIMAL)),
        seq(GROUP_MAX_REQUESTS, EQUAL, field("group_max_requests", DECIMAL))
      )),
      RR_BRACKET
    )),
    optional(seq(
      USING,
      choice(seq(field("workload_group_pool_name", $.id_), DEFAULT_DOUBLE_QUOTE))
    ))
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-workload-group-transact-sql
  create_workload_group: $ => seq(
    CREATE,
    WORKLOAD,
    GROUP,
    field("workload_group_group_name", $.id_),
    optional(seq(
      WITH,
      LR_BRACKET,
      repeat1(choice(
        seq(IMPORTANCE, EQUAL, choice(LOW, MEDIUM, HIGH)),
        seq(optional(COMMA), REQUEST_MAX_MEMORY_GRANT_PERCENT, EQUAL, field("request_max_memory_grant", DECIMAL)),
        seq(optional(COMMA), REQUEST_MAX_CPU_TIME_SEC, EQUAL, field("request_max_cpu_time_sec", DECIMAL)),
        seq(REQUEST_MEMORY_GRANT_TIMEOUT_SEC, EQUAL, field("request_memory_grant_timeout_sec", DECIMAL)),
        seq(MAX_DOP, EQUAL, field("max_dop", DECIMAL)),
        seq(GROUP_MAX_REQUESTS, EQUAL, field("group_max_requests", DECIMAL))
      )),
      RR_BRACKET
    )),
    optional(choice(
      seq(
        USING,
        optional(choice(field("workload_group_pool_name", $.id_), DEFAULT_DOUBLE_QUOTE)),
        optional(choice(seq(optional(COMMA), EXTERNAL, field("external_pool_name", $.id_)), DEFAULT_DOUBLE_QUOTE))
      )
    ))
  ),
}
