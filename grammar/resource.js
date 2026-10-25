const {
 AFFINITY,
 ALTER,
 AUTO,
 CAP_CPU_PERCENT,
 CLASSIFIER_FUNCTION,
 COMMA,
 CREATE,
 DECIMAL,
 DISABLE,
 DOT,
 EQUAL,
 GOVERNOR,
 LR_BRACKET,
 MAX_CPU_PERCENT,
 MAX_IOPS_PER_VOLUME,
 MAX_MEMORY_PERCENT,
 MAX_OUTSTANDING_IO_PER_VOLUME,
 MIN_CPU_PERCENT,
 MIN_IOPS_PER_VOLUME,
 MIN_MEMORY_PERCENT,
 NULL_,
 NUMANODE,
 POOL,
 RECONFIGURE,
 RESET,
 RESOURCE,
 RR_BRACKET,
 SCHEDULER,
 STATISTICS,
 TO,
 WITH,
} = require("./lexer.js");

module.exports = {
    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-resource-pool-transact-sql
    create_resource_pool: $ => seq(
      CREATE,
      RESOURCE,
      POOL,
      field("pool_name", $.id_),
      optional(choice(
        seq(
          WITH,
          LR_BRACKET,
          optional(seq(optional(COMMA), MIN_CPU_PERCENT, EQUAL, DECIMAL)),
          optional(seq(optional(COMMA), MAX_CPU_PERCENT, EQUAL, DECIMAL)),
          optional(seq(optional(COMMA), CAP_CPU_PERCENT, EQUAL, DECIMAL)),
          optional(seq(
            optional(COMMA),
            AFFINITY,
            SCHEDULER,
            EQUAL,
            choice(
              AUTO,
              seq(LR_BRACKET, repeat1(optional(COMMA), choice(DECIMAL, seq(DECIMAL, TO, DECIMAL))), RR_BRACKET),
              seq(NUMANODE, EQUAL, LR_BRACKET, repeat1(seq(optional(COMMA), (DECIMAL, DECIMAL, TO, DECIMAL))), RR_BRACKET),
            )
          )),
          optional(seq(optional(COMMA), MIN_MEMORY_PERCENT, EQUAL, DECIMAL)),
          optional(seq(optional(COMMA), MAX_MEMORY_PERCENT, EQUAL, DECIMAL)),
          optional(seq(optional(COMMA), MIN_IOPS_PER_VOLUME, EQUAL, DECIMAL)),
          optional(seq(optional(COMMA), MAX_IOPS_PER_VOLUME, EQUAL, DECIMAL)),
          RR_BRACKET,
        ),
      )),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-resource-governor-transact-sql
    alter_resource_governor: $ => seq(
      ALTER,
      RESOURCE,
      GOVERNOR,
      choice(
        choice(DISABLE, RECONFIGURE),
        seq(WITH, LR_BRACKET, CLASSIFIER_FUNCTION, EQUAL, choice(
          seq(field("schema_name", $.id_), DOT, field("function_name", $.id_)), NULL_),
          RR_BRACKET
        ),
        seq(RESET, STATISTICS),
        seq(
          WITH,
          LR_BRACKET,
          MAX_OUTSTANDING_IO_PER_VOLUME,
          EQUAL,
          field("max_outstanding_io_per_volume", DECIMAL),
          RR_BRACKET
        )
      )
    ),
}
