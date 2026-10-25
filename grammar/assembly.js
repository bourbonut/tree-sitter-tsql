const {
  ADD,
  ALTER,
  AS,
  ASSEMBLY,
  AUTHORIZATION,
  BINARY,
  COMMA,
  CREATE,
  DATA,
  DEPENDENTS,
  DROP,
  EQUAL,
  EXISTS,
  EXTERNAL_ACCESS,
  FILE,
  FROM,
  IF,
  NO,
  PERMISSION_SET,
  SAFE,
  STRING,
  UNCHECKED,
  UNSAFE,
  VISIBILITY,
  WITH,
} = require("./lexer.js");

module.exports = {
    alter_assembly: $ => seq(
      $.alter_assembly_start,
      field("assembly_name", $.id_),
      $.alter_assembly_clause
    ),

    alter_assembly_start: _ => seq(ALTER, ASSEMBLY),

    alter_assembly_clause: $ => seq(
      optional($.alter_assembly_from_clause),
      optional($.alter_assembly_with_clause),
      optional($.alter_assembly_drop_clause),
      optional($.alter_assembly_add_clause)
    ),

    alter_assembly_from_clause: $ => seq(
      $.alter_assembly_from_clause_start,
      choice($.client_assembly_specifier, $.alter_assembly_file_bits)
    ),

    alter_assembly_from_clause_start: _ => FROM,

    alter_assembly_drop_clause: $ => seq(
      $.alter_assembly_drop,
      $.alter_assembly_drop_multiple_files
    ),

    alter_assembly_drop_multiple_files: $ => choice(
        ALL,
        $.multiple_local_file,
    ),

    alter_assembly_drop: _ => DROP,

    alter_assembly_add_clause: $ => seq(
      $.alter_asssembly_add_clause_start,
      $.alter_assembly_client_file_clause
    ),

    alter_asssembly_add_clause_start: _ => seq(ADD, FILE, FROM),

    alter_assembly_client_file_clause: $ => seq(
      $.alter_assembly_file_name,
      optional(seq($.alter_assembly_as, $.id_))
    ),

    alter_assembly_file_name: _ => STRING,

    alter_assembly_file_bits: $ => seq($.alter_assembly_as, $.id_),

    alter_assembly_as: _ => AS,

    alter_assembly_with_clause: $ => seq($.alter_assembly_with, $.assembly_option),

    alter_assembly_with: _ => WITH,

    client_assembly_specifier: $ => choice(
        $.network_file_share,
        $.local_file,
        STRING,
    ),

    assembly_option: $ => choice(
        seq(PERMISSION_SET, EQUAL, choice(seq(SAFE, EXTERNAL_ACCESS, UNSAFE))),
        seq(VISIBILITY, EQUAL, $.on_off),
        seq(UNCHECKED, DATA),
        seq($.assembly_option, COMMA),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-assembly-transact-sql
    create_assembly: $ => (
        seq(
          CREATE,
          ASSEMBLY,
          field("assembly_name", $.id_),
          optional(seq(AUTHORIZATION, field("owner_name", $.id_))),
          FROM,
          repeat1(seq(optional(COMMA), choice(STRING, BINARY))),
          optional(seq(WITH, PERMISSION_SET, EQUAL, choice(SAFE, EXTERNAL_ACCESS, UNSAFE)))
        )
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-assembly-transact-sql
    drop_assembly: $ => seq(
      DROP,
      ASSEMBLY,
      optional(seq(IF, EXISTS)),
      repeat1(seq(optional(COMMA), field("assembly_name", $.id_))),
      optional(seq(WITH, NO, DEPENDENTS))
    ),
}
