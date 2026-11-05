const {
  CROSS,
  FULL,
  HASH,
  INNER,
  JOIN,
  LEFT,
  LOOP,
  MERGE,
  ON,
  OUTER,
  REMOTE,
  RIGHT,
} = require("./lexer.js");

module.exports = {
  // https://msdn.microsoft.com/en-us/library/ms191472.aspx
  join_part: $ => choice(
    $.join_on,
    $.cross_join,
    $.apply_,
    $.pivot,
    $.unpivot
  ),

  join_on: $ => seq(
    optional(choice(
      field("inner", INNER),
      seq(
        field("join_type", choice(LEFT, RIGHT, FULL)),
        optional(field("outer", OUTER))
      )
    )),
    optional(field("join_hint", choice(LOOP, HASH, MERGE, REMOTE))),
    JOIN,
    field("source", $.table_source),
    ON,
    field("cond", $.search_condition)
  ),

  // sqlenlight.com/support/help/sa0006/
  // stale link
  non_ansi_join: $ => (
    seq($.source, +=, table_$.source, repeat1(seq(',', $.source, +=, table_$.source),)),
  ),

  // https://msdn.microsoft.com/en-us/library/ms191472.aspx
  join_part: $ => choice(
    // https://msdn.microsoft.com/en-us/library/ms173815(v=sql.120).aspx
    $.join_on,
    $.cross_join,
    $.apply_,
    $.pivot,
    $.unpivo,
  ),

  join_on: $ => (
    seq(choice(seq(field("inner", INNER?), $.join_type, =, choice(seq(LEFT, RIGHT, FULL),), field("outer", OUTER?))), optional(
      seq($.join_hint, =, choice(seq(LOOP, HASH, MERGE, REMOTE),))
    ), JOIN, field("source", $.table_source), ON, field("cond", $.search_condition)),
  ),

  cross_join: $ => seq(
    CROSS,
    JOIN,
    $.table_source_item
  ),
}
