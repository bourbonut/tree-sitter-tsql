const {
  DOUBLE_COLON,
  EVENTDATA,
  GETROOT,
  HIERARCHYID,
  LOCAL_ID,
  NODES,
  PARSE,
  STRING,
} = require("./lexer.js");

module.exports = {
  value_method: $ => seq(
    choice(
      field("loc_id", LOCAL_ID),
      field("value_id", $.full_column_name),
      field("eventdata", seq(EVENTDATA, '(', ')')),
      field("query", $.query_method),
      seq('(', $.subquery, ')')
    ),
    '.',
    field("call", $.value_call)
  ),

  query_method: $ => seq(
    choice(
      field("loc_id", LOCAL_ID),
      field("value_id", $.full_column_name),
      seq('(', $.subquery, ')')
    ),
    '.',
    field("call", $.query_call)
  ),

  exist_method: $ => seq(
    choice(
      field("loc_id", LOCAL_ID),
      field("value_id", $.full_column_name),
      seq('(', $.subquery, ')')
    ),
    '.',
    field("call", $.exist_call)
  ),

  modify_method: $ => seq(
    choice(
      field("loc_id", LOCAL_ID),
      field("value_id", $.full_column_name),
      seq('(', $.subquery, ')')
    ),
    '.',
    field("call", $.modify_call)
  ),

  hierarchyid_static_method: $ => seq(
    HIERARCHYID,
    DOUBLE_COLON,
    choice(
      seq(GETROOT, '(', ')'),
      seq(PARSE, '(', field("input", $.expression), ')')
    )
  ),

  nodes_method: $ => seq(
    choice(
      field("loc_id", LOCAL_ID),
      field("value_id", $.full_column_name),
      seq('(', $.subquery, ')')
    ),
    '.',
    NODES,
    '(',
      field("xquery", STRING),
      ')'
  ),
}
