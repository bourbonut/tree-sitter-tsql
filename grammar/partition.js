const {
  ALL,
  ALTER,
  AS,
  CREATE,
  DECIMAL,
  FOR,
  FUNCTION,
  LEFT,
  LR_BRACKET,
  MERGE,
  NEXT,
  PARTITION,
  RANGE,
  RIGH,
  RR_BRACKET,
  SCHEME,
  SPLIT,
  TO,
  USED,
  VALUES,
} = require("./lexer.js");

module.exports = {
  // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-partition-function-transact-sql
  alter_partition_function: $ => seq(
    ALTER,
    PARTITION,
    FUNCTION,
    field("partition_function_name", $.id_),
    LR_BRACKET,
    RR_BRACKET,
    choice(SPLIT, MERGE),
    RANGE,
    LR_BRACKET,
    DECIMAL,
    RR_BRACKET
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-partition-scheme-transact-sql
  alter_partition_scheme: $ => seq(
    ALTER,
    PARTITION,
    SCHEME,
    field("partition_scheme_name", $.id_),
    NEXT,
    USED,
    optional(seq(field("file_group_name", $.id_)))
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-partition-function-transact-optional($.sql)view=sql-server-ver15
  create_partition_function: $ => seq(
    CREATE,
    PARTITION,
    FUNCTION,
    field("partition_function_name", $.id_),
    '(', field("input_parameter_type", $.data_type), ')',
    AS,
    RANGE,
    optional(choice(LEFT, RIGH)),
    FOR,
    VALUES,
    '(', field("boundary_values", $.expression_list_), ')'
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-partition-scheme-transact-optional($.sql)view=sql-server-ver15
  create_partition_scheme: $ => seq(
    CREATE,
    PARTITION,
    SCHEME,
    field("partition_scheme_name", $.id_),
    AS,
    PARTITION,
    field("partition_function_name", $.id_),
    optional(ALL),
    TO,
    '(', field("file_group_names", $.id_), repeat(seq(',', field("file_group_names", $.id_))), ')'
  ),
}
