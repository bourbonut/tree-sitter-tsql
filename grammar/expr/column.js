const {
  AS,
  ASC,
  DELETED,
  DESC,
  IDENTITY,
  INSERTED,
  ROWGUID,
  STRING,
} = require("./lexer.js");

module.exports = {
  column_declaration: $ => seq(
    $.id_,
    $.data_type,
    optional(STRING)
  ),

  full_column_name_list: $ => seq(
    field("column", $.full_column_name),
    repeat(seq(',', field("column", $.full_column_name)))
  ),

  as_column_alias: $ => seq(optional(AS), $.column_alias),

  column_alias_list: $ => seq(
    '(',
    commaSep1(field("alias", $.column_alias)),
    ')'
  ),

  column_alias: $ => choice(
    $.id_,
    STRING
  ),

  full_column_name: $ => seq(
    optional(seq(
      choice(DELETED, INSERTED, $.full_table_name),
      '.'
    )),
    choice(
      field("column_name", $.id_),
      seq('$', choice(IDENTITY, ROWGUID))
    )
  ),

  column_name_list_with_order: $ => seq(
    $.id_,
    optional(choice(ASC, DESC)),
    repeat(seq(",", $.id_, optional(choice(ASC, DESC))))
  ),

  insert_column_name_list: $ => seq(
    field("col", $.insert_column_id),
    repeat(
      seq(
        ",",
        field("col", $.insert_column_id)
      )
    )
  ),

  insert_column_id: $ => seq(
    repeat(
      seq(
        field("ignore", optional($.id_)),
        "."
      )
    ),
    $.id_
  ),

  column_name_list: $ => seq(
    field("col", $.id_),
    repeat(
      seq(
        ",",
        field("col", $.id_)
      )
    )
  ),

  column_declaration: $ => seq($.id_, $.data_type, optional(STRING)),

  full_column_name_list: $ => seq(field("column", $.full_column_name), repeat(seq(',', field("column", $.full_column_name)))),

  as_column_alias: $ => seq(optional(AS), $.column_alias),

  column_alias_list: $ => seq(
    '(', field("alias", $.column_alias), repeat(seq(',', field("alias", $.column_alias))), ')'
  ),

  column_alias: $ => choice($.id_, STRING,),

  full_column_name: $ => seq(
    optional(seq(choice(DELETED, INSERTED, $.full_table_name), '.')),
    choice(seq(field("column_name", $.id_)), seq("$", choice(IDENTITY, ROWGUID))),
  ),

  column_name_list_with_order: $ => seq(
    $.id_,
    optional(choice(ASC, DESC)),
    repeat(seq(',', $.id_, optional(choice(seq(ASC, DESC)))))
  ),

  // For some reason, sql server allows any number of prefixes:  Here, h is the column: a.b.c.d.e.f.g.h
  insert_column_name_list: $ => seq(field("col", $.insert_column_id), repeat(seq(',', field("col", $.insert_column_id)))),

  insert_column_id: $ => seq(repeat(seq(field("ignore", optional($.id_)), '.')), $.id_),

  column_name_list: $ => seq(field("col", $.id_), repeat(seq(',', field("col", $.id_)))),
}
