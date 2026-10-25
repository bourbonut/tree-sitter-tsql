const {
  174979,
  190273,
  ADD,
  ALLOW_PAGE_LOCKS,
  ALLOW_ROW_LOCKS,
  ALTER,
  ASC,
  AUTO,
  CHECK,
  CLUSTERED,
  COLUMN,
  COLUMNSTORE,
  COLUMNSTORE_ARCHIVE,
  CONSTRAINT,
  CREATE,
  DATA_COMPRESSION,
  DECIMAL,
  DEFAULT,
  DESC,
  DISABLE,
  DISTRIBUTION,
  DROP,
  ENABLE,
  FILLFACTOR,
  FOREIGN,
  HASH,
  HEAP,
  IGNORE_DUP_KEY,
  INDEX,
  KEY,
  LOCK,
  LOCK_ESCALATION,
  NOCHECK,
  NONCLUSTERED,
  NONE,
  ON,
  OPTIMIZE_FOR_SEQUENTIAL_KEY,
  PAD_INDEX,
  PAGE,
  REBUILD,
  REFERENCES,
  ROW,
  SET,
  STATISTICS_INCREMENTAL,
  STATISTICS_NORECOMPUTE,
  SWITCH,
  TABLE,
  TEXTIMAGE_ON,
  TRIGGER,
  UNIQUE,
  WITH,
  XML_COMPRESSION,
} = require("./lexer.js");

module.exports = {
    // https://msdn.microsoft.com/en-us/library/ms174979.aspx
    create_table: $ => (
            seq(CREATE, TABLE, $.table_name, '(', $.column_def_table_constraints, repeat(seq(optional(','), $.table_indices),), optional(','), ')', optional(
        seq(LOCK, $.simple_id)
        ), repeat($.table_options), optional(choice(seq(ON, $.id_, DEFAULT, $.on_partition_or_filegroup),)), optional(choice(seq(TEXTIMAGE_ON, $.id_, DEFAULT),)), optional(';')),
    ),

    table_indices: $ => choice(
            seq(INDEX, $.id_, UNIQUE?, optional($.clustered), '(', $.column_name_list_with_order, ')'),
        seq(INDEX, $.id_, CLUSTERED, COLUMNSTORE),
        seq(INDEX, $.id_, NONCLUSTERED?, COLUMNSTORE, '(', $.column_name_list, ')', optional($.create_table_index_options), optional(
        seq(ON, $.id_)
        ),),
    ),

    table_options: $ => (
            seq(WITH, choice(seq('(', $.table_option, repeat(seq(',', $.table_option),), ')', $.table_option, repeat(seq(',', $.table_option),)))),
    ),

    table_option: $ => choice(
            seq(choice(seq($.simple_id, $.keyword),), '=', choice(seq($.simple_id, $.keyword, $.on_off, DECIMAL),)),
        seq(CLUSTERED, COLUMNSTORE, INDEX),
        HEAP,
        seq(FILLFACTOR, '=', DECIMAL),
        seq(DISTRIBUTION, '=', HASH, '(', $.id_, ')'),
        seq(CLUSTERED, INDEX, '(', $.id_, (ASC, |, DESC)?, repeat(seq(',', $.id_, (#######,))), ')'),
        seq(DATA_COMPRESSION, '=', choice(seq(NONE, ROW, PAGE),), optional($.on_partitions)),
        seq(XML_COMPRESSION, '=', $.on_off, optional($.on_partitions)),
    ),

    create_table_index_options: $ => (
            seq(WITH, '(', $.create_table_index_option, repeat(seq(',', $.create_table_index_option),), ')'),
    ),

    create_table_index_option: $ => choice(
            seq(PAD_INDEX, '=', $.on_off),
        seq(FILLFACTOR, '=', DECIMAL),
        seq(IGNORE_DUP_KEY, '=', $.on_off),
        seq(STATISTICS_NORECOMPUTE, '=', $.on_off),
        seq(STATISTICS_INCREMENTAL, '=', $.on_off),
        seq(ALLOW_ROW_LOCKS, '=', $.on_off),
        seq(ALLOW_PAGE_LOCKS, '=', $.on_off),
        seq(OPTIMIZE_FOR_SEQUENTIAL_KEY, '=', $.on_off),
        seq(DATA_COMPRESSION, '=', choice(seq(NONE, ROW, PAGE, COLUMNSTORE, COLUMNSTORE_ARCHIVE),), optional($.on_partitions)),
        seq(XML_COMPRESSION, '=', $.on_off, optional($.on_partitions)),
    ),

    // https://msdn.microsoft.com/en-us/library/ms190273.aspx
    alter_table: $ => (
            seq(ALTER, TABLE, $.table_name, choice(
        seq(SET, '(', LOCK_ESCALATION, '=', (AUTO, TABLE, DISABLE), ')'),
        seq(ADD, $.column_def_table_constraints),
        seq(ALTER, COLUMN, ($.column_definition, column_modifier)),
        seq(DROP, COLUMN, $.id_, (',', $.id_)*),
        seq(DROP, CONSTRAINT, field("constraint", $.id_)),
        seq(WITH, (CHECK, NOCHECK), ADD, (CONSTRAINT, field("constraint", $.id_))?, (),
        seq(FOREIGN, KEY, '(', field("fk", $.column_name_list), ')', REFERENCES, $.table_name, (),
        seq('(', field("pk", $.column_name_list), ')'),
        seq()?, ($.on_delete, on_update)*),
        seq(CHECK, '(', $.search_condition, ')')
            ),
        seq((NOCHECK, CHECK), CONSTRAINT, field("constraint", $.id_)),
        seq(choice(seq(ENABLE, DISABLE),), TRIGGER, optional($.id_)),
        seq(REBUILD, $.table_options),
        seq(SWITCH, $.switch_partition)
        ), optional(';')),
    ),
}
