const {
  ABSENT,
  AUTO,
  BROWSE,
  BY,
  COMMA,
  ELEMENTS,
  EXPLICIT,
  FETCH,
  FIRST,
  FOR,
  INCLUDE_NULL_VALUES,
  JSON,
  NEXT,
  OFFSET,
  ONLY,
  ORDER,
  OVER,
  PARTITION,
  PATH,
  RANGE,
  RAW,
  ROOT,
  ROW,
  ROWS,
  STRING,
  WITHOUT_ARRAY_WRAPPER,
  XML,
  XMLDATA,
  XMLSCHEMA,
  XSINIL,
} = require("./lexer.js");

module.exports = {
  // https://docs.microsoft.com/en-us/sql/t-sql/queries/select-over-clause-transact-optional($.sql)view=sql-server-ver16
  order_by_clause: $ => (
    seq(ORDER, BY, $.order_bys, +=, $.order_by_expression, repeat(seq(',', $.order_bys, +=, $.order_by_expression),)),
  ),

  // https://msdn.microsoft.com/en-us/library/ms188385.aspx
  select_order_by_clause: $ => (
    seq($.order_by_clause, optional(choice(
      seq(OFFSET, field("offset_exp", $.expression), $.offset_rows, =, (ROW, ROWS), optional(choice(
        seq(FETCH, $.fetch_offset, =, (FIRST, NEXT), field("fetch_exp", $.expression), $.fetch_rows, =, choice(seq(ROW, ROWS),), ONLY)
      ),))
    ),)),
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/queries/select-for-clause-transact-sql
  for_clause: $ => choice(
    seq(FOR, BROWSE),
    seq(FOR, XML, (RAW, optional(seq('(', STRING, ')'),), |, AUTO), repeat($.xml_common_directives), (),
      seq(COMMA, (XMLDATA, |, XMLSCHEMA, optional(seq('(', STRING, ')'),))),
      seq()?, optional(seq(COMMA, ELEMENTS, optional(choice(seq(XSINIL, ABSENT),))))),
    seq(FOR, XML, EXPLICIT, repeat($.xml_common_directives), optional(seq(COMMA, XMLDATA),)),
    seq(FOR, XML, PATH, optional(seq('(', STRING, ')'),), repeat($.xml_common_directives), optional(seq(COMMA, ELEMENTS, optional(choice(seq(XSINIL, ABSENT),))))),
    seq(FOR, JSON, choice(seq(AUTO, PATH),), repeat(
      seq(COMMA, choice(seq(ROOT, (seq('(', STRING, ')'),), INCLUDE_NULL_VALUES, WITHOUT_ARRAY_WRAPPER),))
    ),),
  ),

  // https://msdn.microsoft.com/en-us/library/ms189461.aspx
  over_clause: $ => (
    seq(OVER, '(', optional(seq(PARTITION, BY, $.expression_list_),), optional($.order_by_clause), optional($.row_or_range_clause), ')'),
  ),

  row_or_range_clause: $ => (
    seq(choice(seq(ROWS, RANGE),), $.window_frame_extent),
  ),

  over_clause: $ => seq(
    OVER,
    '(',
      optional(seq(PARTITION, BY, $.expression_list_)),
      optional($.order_by_clause),
      optional($.row_or_range_clause),
      ')'
  ),

  row_or_range_clause: $ => seq(
    choice(ROWS, RANGE),
    $.window_frame_extent
  ),
}
