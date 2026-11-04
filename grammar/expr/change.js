const {
  CHANGES,
  CHANGETABLE,
  DECIMAL,
  LOCAL_ID,
  NULL_,
  VERSION,
} = require("./lexer.js");

module.exports = {
  change_table: $ => choice(
    $.change_table_changes,
    $.change_table_version
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
}
