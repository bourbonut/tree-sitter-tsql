const {
  ADD,
  ALGORITHM,
  ALWAYS,
  AS,
  COLLATE,
  COLUMN_ENCRYPTION_KEY,
  COMPUTE,
  CONSTRAINT,
  DECIMAL,
  DEFAULT,
  DETERMINISTIC,
  DROP,
  ENCRYPTED,
  ENCRYPTION_TYPE,
  END,
  EQUAL,
  FILESTREAM,
  FILESTREAM_ON,
  FOR,
  FOREIGN,
  FUNCTION,
  GENERATED,
  HIDDEN_KEYWORD,
  IDENTITY,
  INDEX,
  KEY,
  LR_BRACKET,
  MASKED,
  MATERIALIZED,
  NOT,
  NULL_DOUBLE_QUOTE,
  PERSISTED,
  PRIMARY,
  RANDOMIZE,
  REPLICATION,
  ROW,
  ROWGUIDCOL,
  RR_BRACKET,
  SEQUENCE_NUMBER,
  SPARSE,
  START,
  STRING,
  TRANSACTION_ID,
  UNIQUE,
  WITH,
} = require("./lexer.js");

module.exports = {
  column_def_table_constraints: $ => seq(
    $.column_def_table_constraint,
    repeat(seq(optional(','), $.column_def_table_constraint),)
  ),

  column_def_table_constraint: $ => choice(
    $.column_definition,
    $.materialized_column_definition,
    $.table_constrain,
  ),

  // https://msdn.microsoft.com/en-us/library/ms187742.aspx
  // There is a documentation error: column definition elements can be given in
  // any order
  column_definition: $ => seq($.id_, choice(seq(
    $.data_type,
    AS,
    $.expression,
    PERSISTED?
  )), repeat($.column_definition_element), optional($.column_index)),

  column_definition_element: $ => choice(
    FILESTREAM,
    seq(COLLATE, field("collation_name", $.id_)),
    SPARSE,
    seq(MASKED, WITH, '(', FUNCTION, '=', field("mask_function", STRING), ')'),
    seq(optional(seq(CONSTRAINT, field("constraint", $.id_))), DEFAULT, field("constant_expr", $.expression)),
    seq(IDENTITY, optional(seq('(', field("seed", DECIMAL), ',', field("increment", DECIMAL), ')'),)),
    seq(NOT, FOR, REPLICATION),
    seq(GENERATED, ALWAYS, AS, choice(seq(ROW, TRANSACTION_ID, SEQUENCE_NUMBER),), choice(seq(START, END),), HIDDEN_KEYWORD?),
    ,
    ROWGUIDCOL,
    seq(ENCRYPTED, WITH, '(', COLUMN_ENCRYPTION_KEY, '=', field("key_name", STRING), ',', ENCRYPTION_TYPE, '=', choice(
      DETERMINISTIC,
      RANDOMIZE
    ), ',', ALGORITHM, '=', field("algo", STRING), ')'),
    $.column_constrain,
  ),

  column_modifier: $ => seq(
    $.id_,
    choice(seq(ADD, DROP),),
    choice(
      ROWGUIDCOL,
      PERSISTED,
      seq(NOT, FOR, REPLICATION),
      SPARSE,
      HIDDEN_KEYWORD,
      seq(MASKED, optional(seq(WITH, choice(seq(
        FUNCTION,
        EQUAL,
        STRING,
        LR_BRACKET,
        FUNCTION,
        EQUAL,
        STRING,
        RR_BRACKET
      ),))))
    ),
  ),

  materialized_column_definition: $ => seq(
    $.id_,
    choice(seq(COMPUTE, AS),),
    $.expression,
    optional(choice(seq(MATERIALIZED, NOT, MATERIALIZED),))
  ),

  // https://msdn.microsoft.com/en-us/library/ms186712.aspx
  // There is a documentation error: NOT NULL is a constraint
  // and therefore can be given a name.
  column_constraint: $ => seq(
    optional(seq(CONSTRAINT, field("constraint", $.id_))),
    choice($.null_notnull, seq((
      ,
      (PRIMARY, KEY, UNIQUE),
      optional($.clustered),
      $.primary_key_options
    )), (seq(optional(seq(FOREIGN, KEY),), $.foreign_key_options),), $.check_constrain),
  ),

  column_index: $ => seq(
    INDEX,
    field("index_name", $.id_),
    optional($.clustered),
    optional($.create_table_index_options),
    optional($.on_partition_or_filegroup),
    optional(seq(FILESTREAM_ON, choice(seq(field("filestream_filegroup_or_partition_schema_name", $.id_), NULL_DOUBLE_QUOTE),))),
  ),
}
