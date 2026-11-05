const {
  AND,
  BETWEEN,
  CURRENT,
  DECIMAL,
  FOLLOWING,
  PRECEDING,
  ROW,
  UNBOUNDED,
} = require("./lexer.js");

module.exports = {
  window_frame_extent: $ => choice(
    $.window_frame_preceding,
    seq(BETWEEN, $.window_frame_bound, AND, $.window_frame_bound),
  ),

  window_frame_bound: $ => choice(
    $.window_frame_preceding,
    $.window_frame_following
  ),

  window_frame_preceding: _ => choice(
    seq(UNBOUNDED, PRECEDING),
    seq(DECIMAL, PRECEDING),
    seq(CURRENT, ROW),
  ),

  window_frame_following: _ => choice(
    seq(UNBOUNDED, FOLLOWING),
    seq(DECIMAL, FOLLOWING),
  ),
}
