const {
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
}
