const {
  COMMA,
  DOUBLE_BACK_SLAS,
  SINGLE_QUOTE,
} = require("./lexer.js");

module.exports = {
  network_file_share: $ => seq($.network_file_start, $.network_computer, $.file_path),

  network_computer: $ => seq(field("computer_name", $.id_)),

  network_file_start: _ => DOUBLE_BACK_SLAS,

  file_path: $ => choice(
      seq($.file_directory_path_separator, $.file_path),
      $.id_,
  ),

  file_directory_path_separator: _ => '\\',

  local_file: $ => seq($.local_drive, $.file_path),

  local_drive: _ => DISK_DRIVE,

  multiple_local_files: $ => choice(
      seq($.multiple_$.local_file_start, $.local_file, SINGLE_QUOTE, COMMA),
      $.local_file,
  ),

  multiple_local_file_start: _ => SINGLE_QUOTE,
}
