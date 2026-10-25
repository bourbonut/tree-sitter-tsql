const {
  ALTER,
  AUTHORIZATION,
  DOUBLE_COLON,
  ON,
  OWNER,
  SCHEMA,
  TO,
} = require("./lexer.js");

module.exports = {
    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-authorization-transact-sql

    alter_authorization: $ => seq(
      $.alter_authorization_start, optional(seq($.class_type, $.colon_colon)), field("entity", $.entity_name), $.entity_to, $.authorization_grantee
    ),

    authorization_grantee: $ => choice(
        seq(field("principal_name", $.id_)),
        seq(SCHEMA, OWNER),
    ),

    entity_to: _ => TO,

    colon_colon: _ => DOUBLE_COLON,

    alter_authorization_start: _ => seq(ALTER, AUTHORIZATION, ON),

    alter_authorization_for_sql_database: $ => (
        seq($.alter_authorization_start, optional(seq($.class_type_for_sql_database, $.colon_colon)), field("entity", $.entity_name), $.entity_to, $.authorization_grantee),
    ),

    alter_authorization_for_azure_dw: $ => seq($.alter_authorization_start, optional(seq($.class_type_for_azure_dw, $.colon_colon)), field("entity", $.entity_name_for_azure_dw), $.entity_to, $.authorization_grantee),

    alter_authorization_for_parallel_dw: $ => seq($.alter_authorization_start, optional(seq($.class_type_for_parallel_dw, $.colon_colon),), field("entity", $.entity_name_for_parallel_dw), $.entity_to, $.authorization_grantee),
}
