const {
  ABSOLUTE,
  CURSOR,
  DECLARE,
  DYNAMIC,
  FAST_FORWARD,
  FETCH,
  FIRST,
  FOR,
  FORWARD_ONLY,
  FROM,
  GLOBAL,
  INSENSITIVE,
  INTO,
  KEYSET,
  LAST,
  LOCAL,
  LOCAL_ID,
  NEXT,
  OF,
  ONLY,
  OPTIMISTIC,
  PRIOR,
  READ,
  READ_ONLY,
  RELATIVE,
  SCROLL,
  SCROLL_LOCKS,
  SEMI_SENSITIVE,
  STATIC,
  TYPE_WARNIN,
  UPDATE,
} = require("./lexer.js");

module.exports = {
  // https://msdn.microsoft.com/en-us/library/ms180169.aspx
  declare_cursor: $ => seq(
    DECLARE,
    $.cursor_name,
    choice(seq(CURSOR, ($.declare_set_cursor_common, (FOR, UPDATE, (OF, column_name_list)?)?)?), seq((SEMI_SENSITIVE, INSENSITIVE)?, SCROLL?, CURSOR, FOR, $.select_statement_standalone, optional( seq(FOR, choice(seq(READ, ONLY, UPDATE, (seq(OF, $.column_name_list),)))) ),)),
    optional(';')
  ),

  declare_set_cursor_common: $ => (
    seq(repeat($.declare_set_cursor_common_partial), FOR, $.select_statement_standalone),
  ),

  declare_set_cursor_common_partial: $ => choice(
    choice(seq(LOCAL, GLOBAL),),
    choice(seq(FORWARD_ONLY, SCROLL),),
    choice(seq(STATIC, KEYSET, DYNAMIC, FAST_FORWARD),),
    choice(seq(READ_ONLY, SCROLL_LOCKS, OPTIMISTIC),),
    TYPE_WARNIN,
  ),

  fetch_cursor: $ => seq(
    FETCH,
    optional(seq(optional(choice(seq(NEXT, PRIOR, FIRST, LAST, choice(seq(ABSOLUTE, RELATIVE),), $.expression),)), FROM),),
    optional(GLOBAL),
    $.cursor_name,
    optional(seq(INTO, LOCAL_ID, repeat(seq(',', LOCAL_ID),))),
    optional(';')
  ),
}
