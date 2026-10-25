const {
  ALTER,
  AUTHORIZATION,
  COLLECTION,
  CREATE,
  DELETE,
  DENY,
  DOT,
  DOUBLE_COLON,
  FROM,
  GRANT,
  ID,
  INSERT,
  OBJECT,
  ON,
  REVOKE,
  SCHEMA,
  SELECT,
  TO,
  TRANSFER,
  TYPE,
  UPDATE,
  XML,
} = require("./lexer.js");

module.exports = {
  // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-schema-transact-sql
  alter_schema_sql: $ => seq(
    ALTER,
    SCHEMA,
    field("schema_name", $.id_),
    TRANSFER,
    optional(seq(choice(OBJECT, TYPE, seq(XML, SCHEMA, COLLECTION)), DOUBLE_COLON)),
    $.id_,
    optional(seq(DOT, $.id_))
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-schema-transact-sql
  create_schema: $ => seq(
    CREATE,
    SCHEMA,
    choice(
      seq(field("schema_name", $.id_)),
      seq(AUTHORIZATION, field("owner_name", $.id_)),
      seq(field("schema_name", $.id_), AUTHORIZATION, field("owner_name", $.id_))
    ),
    repeat(
      choice(
        $.create_table,
        $.create_view,
        seq(
          choice(GRANT, DENY),
          choice(SELECT, INSERT, DELETE, UPDATE),
          ON,
          optional(seq(SCHEMA, DOUBLE_COLON)),
          field("object_name", $.id_),
          TO,
          field("owner_name", $.id_)
        ),
        seq(
          REVOKE,
          choice(SELECT, INSERT, DELETE, UPDATE),
          ON,
          optional(SCHEMA, DOUBLE_COLON),
          field("object_name", $.id_),
          FROM,
          field("owner_name", $.id_)
        )
      ),
    )
  ),

  create_schema_azure_sql_dw_and_pdw: $ => seq(
    CREATE,
    SCHEMA,
    field("schema_name", $.id_),
    optional(seq(AUTHORIZATION, field("owner_name", $.id_)))
  ),

  alter_schema_azure_sql_dw_and_pdw: $ => seq(
    ALTER,
    SCHEMA,
    field("schema_name", $.id_),
    TRANSFER,
    optional(seq(OBJECT, DOUBLE_COLON)),
    $.id_,
    optional(seq(DOT, ID))
  ),
}
