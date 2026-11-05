const {
  HOLDLOCK,
  NOHOLDLOCK,
  READPAST,
  SHARED,
} = require("./lexer.js");

module.exports = {
  // https://infocenter-archive.sybase.com/help/index.optional($.jsp)topic=/com.sybase.infocenter.dc00938.1502/html/locking/locking103.htm
  // https://infocenter-archive.sybase.com/help/index.optional($.jsp)topic=/com.sybase.dc32300_1250/html/sqlug/sqlug792.htm
  // https://infocenter-archive.sybase.com/help/index.optional($.jsp)topic=/com.sybase.dc36271_36272_36273_36274_1250/html/refman/X35229.htm
  // Legacy hint with no parenthesis and no WITH keyword. Actually conflicts with table alias name except for holdlock which is
  // a reserved keyword in this grammar. We might want a separate sybase grammar variant.
  sybase_legacy_hints: $ => repeat1($.sybase_legacy_hint),

  sybase_legacy_hint: _ => choice(
    HOLDLOCK,
    NOHOLDLOCK,
    READPAST,
    SHARED
  ),
}
