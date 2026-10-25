const {
  ALTER,
  AS,
  BY,
  CACHE,
  CREATE,
  CYCLE,
  DECIMAL,
  DOT,
  INCREMENT,
  MAXVALUE,
  MINUS,
  MINVALUE,
  NO,
  RESTART,
  SEQUENCE,
  START,
  WITH,
} = require("./lexer.js");

module.exports = {
    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-sequence-transact-sql
    alter_sequence: $ => seq(
      ALTER,
      SEQUENCE,
      optional(seq(field("schema_name", $.id_), DOT)),
      field("sequence_name", $.id_),
      optional(seq(RESTART, optional(seq(WITH, DECIMAL)))),
      optional(seq(INCREMENT, BY, field("sequence_increment", DECIMAL))),
      optional(choice(seq(MINVALUE, DECIMAL), seq(NO, MINVALUE))),
      optional(choice(seq(MAXVALUE, DECIMAL), seq(NO, MAXVALUE))),
      optional(choice(CYCLE, seq(NO, CYCLE))),
      optional(choice(seq(CACHE, DECIMAL), seq(NO, CACHE)))
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-sequence-transact-sql
    create_sequence: $ => seq(
      CREATE,
      SEQUENCE,
      optional(seq(field("schema_name", $.id_), DOT)),
      field("sequence_name", $.id_),
      optional(seq(AS, $.data_type)),
      optional(seq(START, WITH, DECIMAL)),
      optional(seq(INCREMENT, BY, optional(MINUS), DECIMAL)),
      optional(choice(seq(MINVALUE, optional(seq(optional(MINUS), DECIMAL))), seq(NO, MINVALUE))),
      optional(choice(seq(MAXVALUE, optional(seq(optional(MINUS), DECIMAL))), seq(NO, MAXVALUE))),
      optional(choice(seq(CYCLE, seq(NO, CYCLE)))),
      optional(choice(seq(CACHE, optional(DECIMAL)), seq(NO, CACHE)))
    ),
}
