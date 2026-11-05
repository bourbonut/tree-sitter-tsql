const {
  BINARY_CHECKSUM,
  CHECKSUM,
  LEFT,
  LOCAL_ID,
  RIGHT,
} = require("./lexer.js");

module.exports = {
  entity_name_for_azure_dw: $ => choice(
    field("schema", $.id_),
    seq(field("schema", $.id_), '.', field("object_name", $.id_))
  ),

  entity_name_for_parallel_dw: $ => choice(
    field("schema_database", $.id_),
    seq(field("schema", $.id_), '.', field("object_name", $.id_))
  ),

  entity_name: $ => seq(
    optional(choice(
      seq(field("server", $.id_), '.', field("database", $.id_), '.', field("schema", $.id_), '.'),
      seq(field("database", $.id_), '.', optional(field("schema", $.id_)), '.'),
      seq(field("schema", $.id_), '.')
    )),
    field("table", $.id_)
  ),

  simple_name: $ => seq(
    optional(seq(field("schema", $.id_), '.')),
    field("name", $.id_)
  ),

  func_proc_name_schema: $ => seq(
    optional(seq(field("schema", $.id_), '.')),
    field("procedure", $.id_)
  ),

  func_proc_name_database_schema: $ => choice(
    seq(
      optional(field("database", $.id_)),
      '.',
      optional(field("schema", $.id_)),
      '.',
      field("procedure", $.id_)
    ),
    $.func_proc_name_schema
  ),

  func_proc_name_server_database_schema: $ => choice(
    seq(
      optional(field("server", $.id_)),
      '.',
      optional(field("database", $.id_)),
      '.',
      optional(field("schema", $.id_)),
      '.',
      field("procedure", $.id_)
    ),
    $.func_proc_name_database_schema
  ),

  scalar_function_name: $ => choice(
    $.func_proc_name_server_database_schema,
    RIGHT,
    LEFT,
    BINARY_CHECKSUM,
    CHECKSUM
  ),

  cursor_name: $ => choice(
    $.id_,
    LOCAL_ID
  ),

  contract_name: $ => choice(
    $.id_,
    $.expression
  ),

  service_name: $ => choice(
    $.id_,
    $.expression
  ),
}
