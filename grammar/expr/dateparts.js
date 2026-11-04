const {
  DAY,
  DAYOFYEAR,
  DAYOFYEAR_ABBR,
  DAY_ABBR,
  HOUR,
  HOUR_ABBR,
  ISO_WEEK,
  ISO_WEEK_ABBR,
  MICROSECOND,
  MICROSECOND_ABBR,
  MILLISECOND,
  MILLISECOND_ABBR,
  MINUTE,
  MINUTE_ABBR,
  MONTH,
  MONTH_ABBR,
  NANOSECOND,
  NANOSECOND_ABBR,
  QUARTER,
  QUARTER_ABBR,
  SECOND,
  SECOND_ABBR,
  TZOFFSET,
  TZOFFSET_ABBR,
  WEEK,
  WEEKDAY,
  WEEKDAY_ABBR,
  WEEK_ABBR,
  YEAR,
  YEAR_ABBR,
} = require("./lexer.js");

module.exports = {
  // https://learn.microsoft.com/en-us/sql/t-sql/functions/date-bucket-transact-sql?view=sql-server-ver16
  dateparts_9: _ => choice(
    YEAR,
    YEAR_ABBR,
    QUARTER,
    QUARTER_ABBR,
    MONTH,
    MONTH_ABBR,
    DAY,
    DAY_ABBR,
    WEEK,
    WEEK_ABBR,
    HOUR,
    HOUR_ABBR,
    MINUTE,
    MINUTE_ABBR,
    SECOND,
    SECOND_ABBR,
    MILLISECOND,
    MILLISECOND_ABBR
  ),

  // https://learn.microsoft.com/en-us/sql/t-sql/functions/dateadd-transact-sql?view=sql-server-ver16
  dateparts_12: $ => choice(
    $.dateparts_9,
    DAYOFYEAR,
    DAYOFYEAR_ABBR,
    MICROSECOND,
    MICROSECOND_ABBR,
    NANOSECOND,
    NANOSECOND_ABBR
  ),

  // https://learn.microsoft.com/en-us/sql/t-sql/functions/datename-transact-sql?view=sql-server-ver16
  dateparts_15: $ => choice(
    $.dateparts_12,
    WEEKDAY,
    WEEKDAY_ABBR,
    TZOFFSET,
    TZOFFSET_ABBR,
    ISO_WEEK,
    ISO_WEEK_ABBR
  ),

  // https://learn.microsoft.com/en-us/sql/t-sql/functions/datetrunc-transact-sql?view=sql-server-ver16
  dateparts_datetrunc: $ => choice(
    $.dateparts_9,
    DAYOFYEAR,
    DAYOFYEAR_ABBR,
    MICROSECOND,
    MICROSECOND_ABBR,
    ISO_WEEK,
    ISO_WEEK_ABBR
  ),
}
