const {
  FOR,
  IN,
  PIVOT,
  UNPIVOT,
} = require("./lexer.js");

module.exports = {
  pivot_clause: $ => seq(
    '(',
    $.aggregate_windowed_function,
    FOR,
    $.full_column_name,
    IN,
    $.column_alias_list,
    ')'
  ),

  unpivot_clause: $ => seq(
    '(',
    field("unpivot_exp", $.expression),
    FOR,
    $.full_column_name,
    IN,
    '(',
    $.full_column_name_list,
    ')',
    ')'
  ),

  pivot: $ => seq(
    PIVOT,
    $.pivot_clause,
    optional($.as_table_alias)
  ),

  unpivot: $ => seq(
    UNPIVOT,
    $.unpivot_clause,
    optional($.as_table_alias)
  ),
}
