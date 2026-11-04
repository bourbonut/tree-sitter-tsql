const {
  AS,
  BLOCKING_HIERARCHY,
  CHANGES,
  CHANGETABLE,
  DECIMAL,
  DOUBLE_COLON,
  FORCESCAN,
  FORCESEEK,
  HOLDLOCK,
  IGNORE_CONSTRAINTS,
  IGNORE_TRIGGER,
  IGNORE_TRIGGERS,
  INDEX,
  KEEPDEFAULTS,
  KEEPIDENTITY,
  LOCAL_ID,
  NOEXPAND,
  NOLOCK,
  NOWAIT,
  NULL_,
  PAGLOCK,
  READCOMMITTED,
  READCOMMITTEDLOCK,
  READPAST,
  READUNCOMMITTED,
  REPEATABLEREAD,
  ROWLOCK,
  SERIALIZABLE,
  SNAPSHOT,
  SPATIAL_WINDOW_MAX_CELLS,
  TABLOCK,
  TABLOCKX,
  UPDLOCK,
  VALUES,
  VERSION,
  WITH,
  XLOCK,
} = require("./lexer.js");

module.exports = {
  table_sources: $ => choice(
    $.non_ansi_join,
    seq($.source, +=, table_$.source, repeat(seq(',', $.source, +=, table_$.source),)),
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/queries/from-transact-sql
  table_source: $ => (
    seq($.table_source_item, $.joins, +=, repeat($.join_part)),
  ),

  table_source_item: $ => choice(
    seq($.full_table_name, $.deprecated_table_hint, $.as_table_alias),
    seq($.full_table_name, optional($.as_table_alias), optional(choice(
      $.with_table_hints,
      $.deprecated_table_hint,
      $.sybase_legacy_hint
    ),)),
    seq($.rowset_function, optional($.as_table_alias)),
    seq('(', $.derived_table, ')', (#######,)),
    seq($.change_table, optional($.as_table_alias)),
    seq($.nodes_method, (#######,)),
    seq($.function_call, (#######,)),
    seq(field("loc_id", LOCAL_ID), optional($.as_table_alias)),
    seq(field("loc_id_call", LOCAL_ID), '.', field("loc_fcall", $.function_call), (#######,)),
    $.open_xml,
    $.open_json,
    seq(DOUBLE_COLON, field("oldstyle_fcall", $.function_call), optional($.as_table_alias)),
    seq('(', $.table_source, ')'),
  ),

  as_table_alias: $ => (
    seq(AS?, $.table_alias),
  ),

  table_alias: $ => (
    $.id,
  ),

  // https://msdn.microsoft.com/en-us/library/ms187373.aspx
  with_table_hints: $ => (
    seq(WITH, '(', $.hint, +=, $.table_$.hint, repeat(seq(optional(','), $.hint, +=, $.table_$.hint),), ')'),
  ),

  deprecated_table_hint: $ => (
    seq('(', $.table_hint, ')'),
  ),

  // For simplicity, we don't build subsets for INSERT/UPDATE/DELETE/SELECT/MERGE
  // which means the grammar accept slightly more than the what the specification (documentation) says.
  table_hint: $ => choice(
    NOEXPAND,
    seq(INDEX, choice(
      seq('(', $.index_value, repeat(seq(',', $.index_value),), ')'),
      seq('=', '(', $.index_value, ')'),
      seq('=', $.$.index_value, //, $.examples, $.in, $.the, $.doc, $.$.include, $.this, $.syntax)
    ),),
    seq(FORCESEEK, optional(seq('(', $.index_value, '(', $.column_name_list, ')', ')'),)),
    FORCESCAN,
    HOLDLOCK,
    NOLOCK,
    NOWAIT,
    PAGLOCK,
    READCOMMITTED,
    READCOMMITTEDLOCK,
    READPAST,
    READUNCOMMITTED,
    REPEATABLEREAD,
    ROWLOCK,
    SERIALIZABLE,
    SNAPSHOT,
    seq(SPATIAL_WINDOW_MAX_CELLS, '=', DECIMAL),
    TABLOCK,
    TABLOCKX,
    UPDLOCK,
    XLOCK,
    KEEPIDENTITY,
    KEEPDEFAULTS,
    IGNORE_CONSTRAINTS,
    IGNORE_TRIGGER,
  ),

  table_value_constructor: $ => (
    seq(VALUES, '(', $.exps, +=, $.expression_list_, ')', repeat(seq(',', '(', $.exps, +=, $.expression_list_, ')'),)),
  ),

  full_table_name: $ => (
    seq(optional(choice(
      seq(field("linkedServer", $.id_), '.', '.', field("schema", $.id_), '.'),
      seq(field("server", $.id_), '.', field("database", $.id_), '.', field("schema", $.id_), '.'),
      seq(field("database", $.id_), '.', field("schema", optional($.id_)), '.'),
      seq(field("schema", $.id_), '.')
    ),), field("table", $.id_)),
  ),

  table_name: $ => (
    seq(optional(choice(seq(field("database", $.id_), '.', field("schema", optional($.id_)), '.', field("schema", $.id_), '.'),)), choice(
      seq(field("table", $.id_)),
      seq(field("blocking_hierarchy", BLOCKING_HIERARCHY))
    ),),
  ),

  table_source_item: $ => choice(
    seq($.full_table_name, $.deprecated_table_hint, $.as_table_alias), // this is currently allowed
    seq(
      $.full_table_name,
      optional($.as_table_alias),
      optional(choice($.with_table_hints, $.deprecated_table_hint, $.sybase_legacy_hints))
    ),
    seq($.rowset_function, optional($.as_table_alias)),
    seq('(', $.derived_table, ')', optional(seq($.as_table_alias, optional($.column_alias_list)))),
    seq($.change_table, optional($.as_table_alias)),
    seq($.nodes_method, optional($.as_table_alias, optional(column_alias_list))),
    seq($.function_call, optional($.as_table_alias, optional(column_alias_list))),
    seq(field("loc_id", LOCAL_ID), optional($.as_table_alias)),
    seq(field("loc_id_call", LOCAL_ID), '.', field("loc_fcall", $.function_call), optional(seq($.as_table_alias, optional($.column_alias_list)))),
    $.open_xml,
    $.open_json,
    seq(DOUBLE_COLON, field("oldstyle_fcall", $.function_call), optional($.as_table_alias)), // Build-in function (old syntax)
    seq('(', $.table_source, ')'),
  ),

  change_table_changes: $ => seq(
    CHANGETABLE,
    '(',
      CHANGES,
      field("changetable", $.table_name),
      ',',
      field("changesid", choice(NULL_, DECIMAL, LOCAL_ID)),
      ')'
  ),

  change_table_version: $ => seq(
    CHANGETABLE,
    '(',
      VERSION,
      field("versiontable", $.table_name),
      ',',
      field("pk_columns", $.full_column_name_list),
      ',',
      field("pk_values", $.select_list),
      ')'
  ),

  table_alias: $ => $.id_,

  with_table_hints: $ => seq(
    WITH,
    '(',
      field("hint", $.table_hint),
      repeat(seq(
        optional(','),
        field("hint", $.table_hint)
      )),
      ')'
  ),

  deprecated_table_hint: $ => seq("(", $.table_hint, ")"),

  table_hint: $ => choice(
    NOEXPAND,
    seq(
      INDEX, choice(
        seq('(', $.index_value, repeat(seq(',' $.index_value)), ')'),
        seq('=', '(', $.index_value, ')'),
        seq('=', $.index_value),
      )
    ),
    seq(FORCESEEK, optional(seq('(', $.index_value, '(', $.column_name_list, ')', ')'))),
    FORCESCAN,
    HOLDLOCK,
    NOLOCK,
    NOWAIT,
    PAGLOCK,
    READCOMMITTED,
    READCOMMITTEDLOCK,
    READPAST,
    READUNCOMMITTED,
    REPEATABLEREAD,
    ROWLOCK,
    SERIALIZABLE,
    SNAPSHOT,
    seq(SPATIAL_WINDOW_MAX_CELLS, '=', DECIMAL),
    TABLOCK,
    TABLOCKX,
    UPDLOCK,
    XLOCK,
    KEEPIDENTITY,
    KEEPDEFAULTS,
    IGNORE_CONSTRAINTS,
    IGNORE_TRIGGERS
  ),

  table_value_constructor: $ => seq(
    VALUES,
    commaSep1(
      seq('(', field("exps", $.expression_list_), ')')
    )
  ),

  full_table_name: $ => seq(
    optional(choice(
      seq(field("linkedServer", $.id_), '.', '.', field("schema", $.id_), '.'),
      seq(field("server", $.id_), '.', field("database", $.id_), '.', field("schema", $.id_), '.'),
      seq(field("database", $.id_), '.', optional(field("schema", $.id_)), '.'),
      seq(field("schema", $.id_), '.')
    )),
    field("table", $.id_)
  ),

  table_name: $ => seq(
    optional(choice(
      seq(field("database", $.id_), '.', optional(field("schema", $.id_)), '.'),
      seq(field("schema", $.id_), '.')
    )),
    choice(
      field("table", $.id_),
      field("blocking_hierarchy", BLOCKING_HIERARCHY)
    )
  ),
}
