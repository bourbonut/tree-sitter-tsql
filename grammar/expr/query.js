const {
  ALL,
  BY,
  DISTINCT,
  FROM,
  GROUP,
  GROUPING,
  HAVING,
  INTO,
  LOCAL_ID,
  QUERY,
  QUERY_SQUARE_BRACKET,
  SELECT,
  SETS,
  STRING,
  UNION,
  WHERE,
} = require("./lexer.js");

module.exports = {
  // Changed union rule to sql_union to avoid union construct with C++ target.  Issue reported by person who generates into C++.  This individual reports change causes generated code to work

  query_expression: $ => choice(
    seq($.query_specification, select_order_optional($.by_clause), $.unions, +=, sql_unirepeat($.on), $.order, $.by, $.can, $.be, $.on, $.the, "top", $.side, $.of, $.union),
    seq('(', $.query_expression, ')', optional(seq(UNION, ALL?, $.query_expression),)),
  ),

  // https://msdn.microsoft.com/en-us/library/ms176104.aspx
  query_specification: $ => (
    seq(SELECT, allOrDistinct, =, optional(choice(seq(ALL, DISTINCT),)), field("top", optional($.top_clause)), field("columns", $.select_list)),
    seq(//, https://msdn.microsoft.com/en-us/library/ms188029.$.aspx),
    seq(optional(seq(INTO, field("into", $.table_name))), optional(seq(FROM, field("from", $.table_sources)),), optional(seq(WHERE, field("where", $.search_condition)),)),
    seq(//, https://msdn.microsoft.com/en-us/library/ms177673.$.aspx),
    seq(optional(
      seq(GROUP, BY, choice(
        seq((field("groupByAll", ALL?), groupBys, +=, $.group_by_item, (',', groupBys, +=, $.group_by_item)*)),
        seq(GROUPING, SETS, '(', groupSets, +=, $.grouping_sets_item, repeat(
          seq(',', groupSets, +=, $.grouping_sets_item)
        ), ')')
      ),)
    ), optional(seq(HAVING, field("having", $.search_condition)))),
  ),

  query_method: $ => (
    seq(choice(seq(field("loc_id", LOCAL_ID), field("value_id", $.full_column_name), '(', $.subquery, ')'),), '.', field("call", $.query_call)),
  ),

  query_call: $ => (
    seq(choice(seq(QUERY, QUERY_SQUARE_BRACKET),), '(', field("xquery", STRING), ')'),
  ),
}
