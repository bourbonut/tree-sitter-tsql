const {
  AVG,
  BULK,
  BY,
  CHECKSUM_AGG,
  CONTAINSTABLE,
  COUNT,
  COUNT_BIG,
  CUME_DIST,
  DENSE_RANK,
  DOLLAR_PARTITION,
  FIRST_VALUE,
  FREETEXTTABLE,
  GROUP,
  GROUPING,
  GROUPING_ID,
  LAG,
  LANGUAGE,
  LAST_VALUE,
  LEAD,
  MAX,
  MIN,
  NTILE,
  OPENROWSET,
  OVER,
  PARTITION,
  PERCENTILE_CONT,
  PERCENTILE_DISC,
  PERCENT_RANK,
  RANK,
  ROW_NUMBER,
  SEMANTICKEYPHRASETABLE,
  SEMANTICSIMILARITYDETAILSTABLE,
  SEMANTICSIMILARITYTABLE,
  STDEV,
  STDEVP,
  STRING,
  SUM,
  VAR,
  VARP,
  WITHIN,
} = require("./lexer.js");

module.exports = {
  // https://msdn.microsoft.com/en-us/library/ms190312.aspx
  rowset_function: $ => choice(
    seq(
      OPENROWSET,
      '(',
        field("provider_name", STRING),
        ',',
        field("connection_string", STRING),
        ',',
        field("sql", STRING),
        ')'
    ),
    seq(
      OPENROWSET,
      '(',
        BULK,
        field("data_file", STRING),
        ',',
        choice(
          seq($.bulk_option, repeat(seq(',', $.bulk_option))),
          $.id_
        ),
        ')'
    )
  ),

  partition_function: $ => seq(
    optional(seq(field("database", $.id_), '.')),
    DOLLAR_PARTITION,
    '.',
    field("func_name", $.id_),
    '(',
      $.expression,
      ')'
  ),

  freetext_function: $ => choice(
    seq(
      choice(CONTAINSTABLE, FREETEXTTABLE),
      '(',
        $.table_name,
        ',',
        choice(
          $.full_column_name,
          seq('(', $.full_column_name, repeat(seq(',', $.full_column_name)), ')'),
          '*'
        ),
        ',',
        $.expression,
        optional(seq(',', LANGUAGE, $.expression)),
        optional(seq(',', $.expression)),
        ')'
    ),
    seq(
      choice(SEMANTICSIMILARITYTABLE, SEMANTICKEYPHRASETABLE),
      '(',
        $.table_name,
        ',',
        choice(
          $.full_column_name,
          seq('(', $.full_column_name, repeat(seq(',', $.full_column_name)), ')'),
          '*'
        ),
        ',',
        $.expression,
        ')'
    ),
    seq(
      SEMANTICSIMILARITYDETAILSTABLE,
      '(',
        $.table_name,
        ',',
        $.full_column_name,
        ',',
        $.expression,
        ',',
        $.full_column_name,
        ',',
        $.expression,
        ')'
    )
  ),

  // https://msdn.microsoft.com/en-us/library/ms189798.aspx
  ranking_windowed_function: $ => choice(
    seq(
      choice(RANK, DENSE_RANK, ROW_NUMBER),
      '(',
        ')',
      $.over_clause
    ),
    seq(
      NTILE,
      '(',
        $.expression,
        ')',
      $.over_clause
    )
  ),

  // https://msdn.microsoft.com/en-us/library/ms173454.aspx
  aggregate_windowed_function: $ => choice(
    seq(
      field("agg_func", choice(AVG, MAX, MIN, SUM, STDEV, STDEVP, VAR, VARP)),
      '(',
        $.all_distinct_expression,
        ')',
      optional($.over_clause)
    ),
    seq(
      field("cnt", choice(COUNT, COUNT_BIG)),
      '(',
        choice('*', $.all_distinct_expression),
        ')',
      optional($.over_clause)
    ),
    seq(
      CHECKSUM_AGG,
      '(',
        $.all_distinct_expression,
        ')'
    ),
    seq(
      GROUPING,
      '(',
        $.expression,
        ')'
    ),
    seq(
      GROUPING_ID,
      '(',
        $.expression_list_,
        ')'
    )
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/functions/analytic-functions-transact-sql
  analytic_windowed_function: $ => choice(
    seq(
      choice(FIRST_VALUE, LAST_VALUE),
      '(',
        $.expression,
        ')',
      $.over_clause
    ),
    seq(
      choice(LAG, LEAD),
      '(',
        $.expression,
        optional(seq(
          ',',
          $.expression,
          optional(seq(',', $.expression))
        )),
        ')',
      $.over_clause
    ),
    seq(
      choice(CUME_DIST, PERCENT_RANK),
      '(',
        ')',
      OVER,
      '(',
        optional(seq(PARTITION, BY, $.expression_list_)),
        $.order_by_clause,
        ')'
    ),
    seq(
      choice(PERCENTILE_CONT, PERCENTILE_DISC),
      '(',
        $.expression,
        ')',
      WITHIN,
      GROUP,
      '(',
        $.order_by_clause,
        ')',
      OVER,
      '(',
        optional(seq(PARTITION, BY, $.expression_list_)),
        ')'
    )
  ),
}
