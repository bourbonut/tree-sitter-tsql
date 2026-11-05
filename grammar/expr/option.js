const {
  CONCAT,
  DB_CHAINING,
  DECIMAL,
  DEFAULT_FULLTEXT_LANGUAGE,
  DEFAULT_LANGUAGE,
  DIRECTORY_NAME,
  EQUAL,
  EXPAND,
  FAST,
  FILESTREAM,
  FOR,
  FORCE,
  FORCED,
  FULL,
  GROUP,
  HASH,
  IGNORE_NONCLUSTERED_COLUMNSTORE_INDEX,
  JOIN,
  KEEP,
  KEEPFIXED,
  LOOP,
  LR_BRACKET,
  MAXDOP,
  MAXRECURSION,
  MERGE,
  NESTED_TRIGGERS,
  NON_TRANSACTED_ACCESS,
  OFF,
  ON,
  OPTIMIZE,
  OPTION,
  ORDER,
  PARAMETERIZATION,
  PLAN,
  READ_ONLY,
  RECOMPILE,
  ROBUST,
  RR_BRACKET,
  SIMPLE,
  STRING,
  TRANSFORM_NOISE_WORDS,
  TRUSTWORTHY,
  TWO_DIGIT_YEAR_CUTOFF,
  UNION,
  UNKNOWN,
  USE,
  VIEWS,
} = require("./lexer.js");

module.exports = {
  // runtime check.
  bulk_option: $ => seq(
    $.id_,
    '=',
    field("bulk_option_value", choice(DECIMAL, STRING))
  ),

  create_database_option: $ => choice(
    seq(FILESTREAM, '(', commaSep1($.database_filestream_option), ')'),
    seq(DEFAULT_LANGUAGE, EQUAL, choice($.id_, STRING)),
    seq(DEFAULT_FULLTEXT_LANGUAGE, EQUAL, choice($.id_, STRING)),
    seq(NESTED_TRIGGERS, EQUAL, choice(OFF, ON)),
    seq(TRANSFORM_NOISE_WORDS, EQUAL, choice(OFF, ON)),
    seq(TWO_DIGIT_YEAR_CUTOFF, EQUAL, DECIMAL),
    seq(DB_CHAINING, choice(OFF, ON)),
    seq(TRUSTWORTHY, choice(OFF, ON))
  ),

  database_filestream_option: _ => seq(
    LR_BRACKET,
    choice(
      seq(NON_TRANSACTED_ACCESS, EQUAL, choice(OFF, READ_ONLY, FULL)),
      seq(DIRECTORY_NAME, EQUAL, STRING)
    ),
    RR_BRACKET
  ),

  // https://msdn.microsoft.com/en-us/library/ms181714.aspx
  option_clause : $ => seq(
    OPTION,
    '(',
    field("options_", $.option),
    repeat(seq(',', field("options_", $.option))),
    ')'
  ),

  option: $ => choice(
    seq(FAST, field("number_rows", DECIMAL)),
    seq(choice(seq(HASH, ORDER),), GROUP),
    seq(choice(seq(MERGE, HASH, CONCAT),), UNION),
    seq(choice(seq(LOOP, MERGE, HASH),), JOIN),
    seq(EXPAND, VIEWS),
    seq(FORCE, ORDER),
    IGNORE_NONCLUSTERED_COLUMNSTORE_INDEX,
    seq(KEEP, PLAN),
    seq(KEEPFIXED, PLAN),
    seq(MAXDOP, field("number_of_processors", DECIMAL)),
    seq(MAXRECURSION, field("number_recursion", DECIMAL)),
    seq(OPTIMIZE, FOR, '(', $.optimize_for_arg, repeat(seq(',', $.optimize_for_arg)), ')'),
    seq(OPTIMIZE, FOR, UNKNOWN),
    seq(PARAMETERIZATION, choice(seq(SIMPLE, FORCED),)),
    RECOMPILE,
    seq(ROBUST, PLAN),
    seq(USE, PLAN, STRING),
  ),
}
