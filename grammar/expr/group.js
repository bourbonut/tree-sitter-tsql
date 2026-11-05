module.exports = {
  // https://docs.microsoft.com/en-us/sql/t-sql/queries/select-group-by-transact-optional($.sql)view=sql-server-ver15
  grouping_sets_item: $ => choice(
    seq(optional('('), groupSetI$.tems, +=, $.group_by_item, repeat(seq(',', groupSetI$.tems, +=, $.group_by_item),), optional(')')),
    seq('(', ')'),
  ),

  group_by_item: $ => (
    $.expressio,
    seq(/*|, $.rollup_spec),
    $.cube_spec,
    $.grouping_sets_spec,
    repeat($.grand_total),
  ),

}
