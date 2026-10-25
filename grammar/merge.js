const {
  AND,
  BY,
  DEFAULT,
  DELETE,
  INSERT,
  INTO,
  MATCHED,
  MERGE,
  NOT,
  ON,
  PERCENT,
  SET,
  SOURCE,
  TARGET,
  THEN,
  TOP,
  UPDATE,
  USING,
  VALUES,
  WHEN,
} = require("./lexer.js");

module.exports = {
  // https://docs.microsoft.com/en-us/sql/t-sql/statements/merge-transact-sql
  // note that there's a limit on number of when_matches but it has to be done runtime due to different ordering of statements allowed
  merge_statement: $ => seq(
    optional($.with_expression),
    MERGE,
    optional(seq(TOP, '(', $.expression, ')', optional(PERCENT))),
    optional(INTO),
    $.ddl_object,
    optional($.with_table_hints),
    optional($.as_table_alias),
    USING,
    $.table_sources,
    ON,
    $.search_condition,
    repeat1($.when_matches),
    optional($.output_clause),
    optional($.option_clause),
    ';'
  ),

  when_matches: $ => choice(
    repeat1(seq(WHEN, MATCHED, optional(seq(AND, $.search_condition)), THEN, $.merge_matched)),
    seq(WHEN, NOT, MATCHED, optional(seq(BY, TARGET)), optional(seq(AND, $.search_condition)), THEN, $.merge_not_matched),
    repeat1(seq(WHEN, NOT, MATCHED, BY, SOURCE, optional(seq(AND, $.search_condition)), THEN, $.merge_matched)),
  ),

  merge_matched: $ => choice(
    seq(UPDATE, SET, $.update_elem_merge, repeat(seq(',', $.update_elem_merge))),
    DELETE,
  ),

  merge_not_matched: $ => seq(
    INSERT,
    optional(seq('(', $.column_name_list, ')')),
    choice(seq($.table_value_constructor, DEFAULT, VALUES)),
  ),
}
