const {
  ABORT,
  ALL,
  ALLOW_PAGE_LOCKS,
  ALLOW_ROW_LOCKS,
  ALTER,
  CLUSTERED,
  COLUMNSTORE,
  COLUMNSTORE_ARCHIVE,
  COMPRESSION_DELAY,
  COMPRESS_ALL_ROW_GROUPS,
  CREATE,
  DATA_COMPRESSION,
  DECIMAL,
  DISABLE,
  DROP_EXISTING,
  FILLFACTOR,
  FOR,
  IGNORE_DUP_KEY,
  INCLUDE,
  INDEX,
  LOB_COMPACTION,
  MAXDOP,
  MAX_DURATION,
  MINUTES,
  NONCLUSTERED,
  NONE,
  OFF,
  ON,
  ONLINE,
  OPTIMIZE_FOR_SEQUENTIAL_KEY,
  PAD_INDEX,
  PAGE,
  PARTITION,
  PARTITIONS,
  PATH,
  PAUSE,
  PRIMARY,
  PROPERTY,
  REBUILD,
  REORGANIZE,
  RESUMABLE,
  RESUME,
  ROW,
  SET,
  SORT_IN_TEMPDB,
  STATISTICS_INCREMENTAL,
  STATISTICS_NORECOMPUTE,
  TO,
  UNIQUE,
  USING,
  VALUE,
  WHERE,
  WITH,
  XML,
  XML_COMPRESSION,
} = require("./lexer.js");

module.exports = {
  // https://msdn.microsoft.com/en-us/library/ms188783.aspx
  create_index: $ => (
    seq(CREATE, UNIQUE?, optional($.clustered), INDEX, $.id_, ON, $.table_name, '(', $.column_name_list_with_order, ')', optional(
      seq(INCLUDE, '(', $.column_name_list, ')')
    ), optional(seq(WHERE, field("where", $.search_condition))), optional($.create_index_option,), optional(seq(ON, $.id_),), optional(';')),
  ),

  create_index_options: $ => (
    seq('WITH', '(', $.relational_index_option, repeat(seq(',', $.relational_index_option),), ')'),
  ),

  relational_index_option: $ => choice(
    $.rebuild_index_option,
    seq(DROP_EXISTING, '=', $.on_off),
    seq(OPTIMIZE_FOR_SEQUENTIAL_KEY, '=', $.on_off),
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-index-transact-sql
  alter_index: $ => (
    seq(ALTER, INDEX, choice(seq($.id_, ALL),), ON, $.table_name, choice(
      DISABLE,
      PAUSE,
      ABORT,
      seq(RESUME, optional($.resumable_index_options)),
      $.reorganize_partition,
      $.set_index_options,
      $.rebuild_partitio
    ),),
  ),

  resumable_index_options: $ => (
    seq(WITH, '(', (seq($.resumable_index_option, repeat(seq(',', $.resumable_index_option),))), ')'),
  ),

  resumable_index_option: $ => choice(
    seq(MAXDOP, '=', field("max_degree_of_parallelism", DECIMAL)),
    seq(MAX_DURATION, '=', field("max_duration", DECIMAL), MINUTES?),
    $.low_priority_lock_wai,
  ),

  reorganize_partition: $ => (
    seq(REORGANIZE, optional(seq(PARTITION, '=', DECIMAL),), optional($.reorganize_options)),
  ),

  reorganize_options: $ => (
    seq(WITH, '(', (seq($.reorganize_option, repeat(seq(',', $.reorganize_option),))), ')'),
  ),

  reorganize_option: $ => choice(
    seq(LOB_COMPACTION, '=', $.on_off),
    seq(COMPRESS_ALL_ROW_GROUPS, '=', $.on_off),
  ),

  set_index_options: $ => (
    seq(SET, '(', $.set_index_option, repeat(seq(',', $.set_index_option),), ')'),
  ),

  set_index_option: $ => choice(
    seq(ALLOW_ROW_LOCKS, '=', $.on_off),
    seq(ALLOW_PAGE_LOCKS, '=', $.on_off),
    seq(OPTIMIZE_FOR_SEQUENTIAL_KEY, '=', $.on_off),
    seq(IGNORE_DUP_KEY, '=', $.on_off),
    seq(STATISTICS_NORECOMPUTE, '=', $.on_off),
    seq(COMPRESSION_DELAY, '=', field("delay", DECIMAL), MINUTES?),
  ),

  rebuild_partition: $ => choice(
    seq(REBUILD, optional(seq(PARTITION, '=', ALL),), optional($.rebuild_index_options)),
    seq(REBUILD, PARTITION, '=', DECIMAL, single_partition_optional($.rebuild_index_options)),
  ),

  rebuild_index_options: $ => (
    seq(WITH, '(', $.rebuild_index_option, repeat(seq(',', $.rebuild_index_option),), ')'),
  ),

  rebuild_index_option: $ => choice(
    seq(PAD_INDEX, '=', $.on_off),
    seq(FILLFACTOR, '=', DECIMAL),
    seq(SORT_IN_TEMPDB, '=', $.on_off),
    seq(IGNORE_DUP_KEY, '=', $.on_off),
    seq(STATISTICS_NORECOMPUTE, '=', $.on_off),
    seq(STATISTICS_INCREMENTAL, '=', $.on_off),
    seq(ONLINE, '=', choice(seq(ON, optional(seq('(', $.low_priority_lock_wait, ')'),), OFF),)),
    seq(RESUMABLE, '=', $.on_off),
    seq(MAX_DURATION, '=', field("times", DECIMAL), MINUTES?),
    seq(ALLOW_ROW_LOCKS, '=', $.on_off),
    seq(ALLOW_PAGE_LOCKS, '=', $.on_off),
    seq(MAXDOP, '=', field("max_degree_of_parallelism", DECIMAL)),
    seq(DATA_COMPRESSION, '=', choice(seq(NONE, ROW, PAGE, COLUMNSTORE, COLUMNSTORE_ARCHIVE),), optional($.on_partitions)),
    seq(XML_COMPRESSION, '=', $.on_off, optional($.on_partitions)),
  ),

  single_partition_rebuild_index_options: $ => (
    seq(WITH, '(', $.single_partition_rebuild_index_option, repeat(seq(',', $.single_partition_rebuild_index_option),), ')'),
  ),

  single_partition_rebuild_index_option: $ => choice(
    seq(SORT_IN_TEMPDB, '=', $.on_off),
    seq(MAXDOP, '=', field("max_degree_of_parallelism", DECIMAL)),
    seq(RESUMABLE, '=', $.on_off),
    seq(DATA_COMPRESSION, '=', choice(seq(NONE, ROW, PAGE, COLUMNSTORE, COLUMNSTORE_ARCHIVE),), optional($.on_partitions)),
    seq(XML_COMPRESSION, '=', $.on_off, optional($.on_partitions)),
    seq(ONLINE, '=', choice(seq(ON, optional(seq('(', $.low_priority_lock_wait, ')'),), OFF),)),
  ),

  on_partitions: $ => (
    seq(ON, PARTITIONS, '(', field("partition_number", DECIMAL), ('TO', field("to_partition_number", DECIMAL))?, repeat(
      seq(',', field("partition_number", DECIMAL), optional(seq('TO', field("to_partition_number", DECIMAL))))
    ), ')'),
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-columnstore-index-transact-optional($.sql)view=sql-server-ver15
  create_columnstore_index: $ => (
    seq(CREATE, CLUSTERED, COLUMNSTORE, INDEX, $.id_, ON, $.table_name, optional($.create_columnstore_index_options), optional(
      seq(ON, $.id_)
    ), optional(';')),
  ),

  create_columnstore_index_options: $ => (
    seq('WITH', '(', $.columnstore_index_option, repeat(seq(',', $.columnstore_index_option),), ')'),
  ),

  columnstore_index_option: $ => choice(
    seq(DROP_EXISTING, '=', $.on_off),
    seq(MAXDOP, '=', field("max_degree_of_parallelism", DECIMAL)),
    seq(ONLINE, '=', $.on_off),
    seq(COMPRESSION_DELAY, '=', field("delay", DECIMAL), MINUTES?),
    seq(DATA_COMPRESSION, '=', choice(seq(COLUMNSTORE, COLUMNSTORE_ARCHIVE),), optional($.on_partitions)),
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-columnstore-index-transact-optional($.sql)view=sql-server-ver15
  create_nonclustered_columnstore_index: $ => (
    seq(CREATE, NONCLUSTERED?, COLUMNSTORE, INDEX, $.id_, ON, $.table_name, '(', $.column_name_list_with_order, ')', optional(
      seq(WHERE, $.search_condition)
    ), optional($.create_columnstore_index_options), optional(seq(ON, $.id_),), optional(';')),
  ),

  create_xml_index: $ => (
    seq(CREATE, PRIMARY?, XML, INDEX, $.id_, ON, $.table_name, '(', $.id_, ')', optional(
      seq(USING, XML, INDEX, $.id_, optional(seq(FOR, optional(choice(seq(VALUE, PATH, PROPERTY),)))))
    ), optional($.xml_index_options), optional(';')),
  ),

  xml_index_options: $ => (
    seq('WITH', '(', $.xml_index_option, repeat(seq(',', $.xml_index_option),), ')'),
  ),

  xml_index_option: $ => choice(
    seq(PAD_INDEX, '=', $.on_off),
    seq(FILLFACTOR, '=', DECIMAL),
    seq(SORT_IN_TEMPDB, '=', $.on_off),
    seq(IGNORE_DUP_KEY, '=', $.on_off),
    seq(DROP_EXISTING, '=', $.on_off),
    seq(ONLINE, '=', choice(seq(ON, optional(seq('(', $.low_priority_lock_wait, ')'),), OFF),)),
    seq(ALLOW_ROW_LOCKS, '=', $.on_off),
    seq(ALLOW_PAGE_LOCKS, '=', $.on_off),
    seq(MAXDOP, '=', field("max_degree_of_parallelism", DECIMAL)),
    seq(XML_COMPRESSION, '=', $.on_off),
  ),
}
