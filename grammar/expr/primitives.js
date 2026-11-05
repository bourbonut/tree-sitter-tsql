const {
  AT_KEYWORD,
  BINARY,
  CLUSTERED,
  DECIMAL,
  DOLLAR,
  DOUBLE,
  FLOAT,
  IDENTITY,
  LOCAL_ID,
  MAX,
  MINUS,
  NONCLUSTERED,
  NOT,
  NULL_,
  NVARCHAR,
  OFF,
  ON,
  PLACEHOLDER,
  PLUS,
  PRECISION,
  REAL,
  SQUARE_BRACKET_ID,
  STRING,
  TIME,
  VARBINARY_KEYWORD,
  VARCHAR,
  ZONE,
} = require("./lexer.js");

module.exports = {
  ddl_object: $ => choice(
    $.full_table_name,
    LOCAL_ID
  ),

  parameter: $ => PLACEHOLDER,

  time_zone: $ => (
    seq(AT_KEYWORD, TIME, ZONE, $.expression),
  ),

  subquery: $ => (
    $.select_statement,
  ),

  clustered: $ => choice(
    CLUSTERED,
    NONCLUSTERED
  ),

  on_off: _ => choice(
    ON,
    OFF
  ),

  null_notnull: _ => seq(
    optional(NOT),
    NULL_
  ),

  index_value: $ => choice(
    $.id_,
    DECIMAL
  ),

  // https://msdn.microsoft.com/en-us/library/ms179899.aspx
  constant: $ => choice(
    STRING,
    BINARY,
    seq(optional('-'), choice(DECIMAL, REAL, FLOAT)),
    seq(optional('-'), seq(
      field("dollar", DOLLAR),
      optional(choice(PLUS, MINUS)),
      choice(DECIMAL, FLOAT)
    )),
    $.parameter
  ),

  // To reduce ambiguity, -X is considered as an application of unary operator
  primitive_constant: $ => choice(
    STRING,
    BINARY,
    choice(DECIMAL, REAL, FLOAT),
    seq(
      field("dollar", DOLLAR),
      optional(choice(PLUS, MINUS)),
      choice(DECIMAL, FLOAT)
    ),
    $.parameter
  ),

  // https://msdn.microsoft.com/en-us/library/ms187752.aspx
  // TODO: implement runtime check or add new tokens.
  data_type: $ => choice(
    seq(
      field('scaled', choice(
        VARCHAR,
        NVARCHAR,
        BINARY,
        VARBINARY_KEYWORD,
        SQUARE_BRACKET_ID
      )),
      '(',
      MAX,
      ')'
    ),
    seq(
      field('ext_type', $.id_),
      '(',
      field('scale', DECIMAL),
      ',',
      field('prec', DECIMAL),
      ')'
    ),
    seq(
      field('ext_type', $.id_),
      '(',
      field('scale', DECIMAL),
      ')'
    ),
    seq(
      field('ext_type', $.id_),
      IDENTITY,
      optional(seq(
        '(',
        field('seed', DECIMAL),
        ',',
        field('inc', DECIMAL),
        ')'
      ))
    ),
    seq(
      DOUBLE,
      optional(PRECISION)
    ),
    field('unscaled_type', $.id_)
  ),
}
