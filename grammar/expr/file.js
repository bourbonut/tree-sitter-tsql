const {
  CONTAINS,
  DECIMAL,
  DEFAULT,
  EQUAL,
  FILEGROUP,
  FILEGROWTH,
  FILENAME,
  FILESTREAM,
  GB,
  KB,
  LR_BRACKET,
  MAXSIZE,
  MB,
  MEMORY_OPTIMIZED_DATA,
  NAME,
  RR_BRACKET,
  SIZE,
  STRING,
  TB,
  UNLIMITED,
} = require("./lexer.js");

module.exports = {
  database_file_spec: $ => choice(
    $.file_group,
    $.file_spec
  ),

  file_group: $ => seq(
    FILEGROUP,
    $.id_,
    optional(seq(CONTAINS, FILESTREAM)),
    optional(DEFAULT),
    optional(seq(CONTAINS, MEMORY_OPTIMIZED_DATA)),
    $.file_spec,
    repeat(seq(',', $.file_spec))
  ),

  file_spec: $ => seq(
    LR_BRACKET,
    NAME,
    EQUAL,
    choice($.id_, STRING),
    optional(','),
    FILENAME,
    EQUAL,
    field("file", STRING),
    optional(','),
    optional(seq(SIZE, EQUAL, $.file_size, optional(','))),
    optional(seq(MAXSIZE, EQUAL, choice($.file_size, UNLIMITED), optional(','))),
    optional(seq(FILEGROWTH, EQUAL, $.file_size, optional(','))),
    RR_BRACKET
  ),

  file_size: _ => seq(
    DECIMAL,
    optional(choice(KB, MB, GB, TB, "%"))
  )
}
