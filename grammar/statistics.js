const {
  ALL,
  AUTO_DROP,
  COLUMNS,
  CREATE,
  DECIMAL,
  EQUAL,
  FULLSCAN,
  INCREMENTAL,
  INDEX,
  MAXDOP,
  NORECOMPUTE,
  ON,
  PAGECOUNT,
  PERCENT,
  PERSIST_SAMPLE_PERCENT,
  RESAMPLE,
  ROWCOUNT,
  ROWS,
  SAMPLE,
  STATISTICS,
  STATS_STREAM,
  UPDATE,
  WITH,
} = require("./lexer.js");

module.exports = {
  // https://msdn.microsoft.com/en-us/library/ms188038.aspx
  create_statistics: $ => (
    seq(CREATE, STATISTICS, $.id_, ON, $.table_name, '(', $.column_name_list, ')', optional(choice(
      seq(WITH, (FULLSCAN, SAMPLE, DECIMAL, (PERCENT, ROWS), STATS_STREAM), (',', NORECOMPUTE)?, optional(
        seq(',', INCREMENTAL, EQUAL, $.on_off)
      ),)
    ),), optional(';')),
  ),

  update_statistics: $ => (
    seq(UPDATE, STATISTICS, $.full_table_name, optional(choice(seq($.id_, '(', $.id_, repeat(seq(',', $.id_),), ')'),)), optional($.update_statistics_options)),
  ),

  update_statistics_options: $ => (
    seq(WITH, $.update_statistics_option, repeat(seq(',', $.update_statistics_option),)),
  ),

  update_statistics_option: $ => choice(
    (seq(FULLSCAN, optional(seq(optional(','), PERSIST_SAMPLE_PERCENT, '=', $.on_off),))),
    choice(seq(SAMPLE, field("number", DECIMAL), (PERCENT, ROWS), optional(seq(optional(','), PERSIST_SAMPLE_PERCENT, '=', $.on_off),))),
    seq(RESAMPLE, optional($.on_partitions)),
    seq(STATS_STREAM, '=', field("stats_stream_", $.expression)),
    seq(ROWCOUNT, '=', DECIMAL),
    seq(PAGECOUNT, '=', DECIMAL),
    ALL,
    COLUMNS,
    INDEX,
    NORECOMPUTE,
    seq(INCREMENTAL, '=', $.on_off),
    seq(MAXDOP, '=', field("max_dregree_of_parallelism", DECIMAL)),
    seq(AUTO_DROP, '=', $.on_off),
  ),
}
