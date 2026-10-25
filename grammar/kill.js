const {
  ALL,
  DECIMAL,
  JOB,
  KILL,
  NOTIFICATION,
  QUERY,
  STATS,
  STATUSONLY,
  STRING,
  SUBSCRIPTION,
  UOW,
  WITH,
} = require("./lexer.js");

module.exports = {
    kill_statement: $ => (
            seq(KILL, choice(seq($.kill_process, $.kill_query_notification, $.kill_stats_job),)),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/kill-transact-sql
    kill_process: $ => (
            seq(choice(seq($.session_id, =, choice(seq(DECIMAL, STRING),), UOW),), optional(seq(WITH, STATUSONLY),)),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/kill-query-notification-subscription-transact-sql
    kill_query_notification: $ => (
            seq(QUERY, NOTIFICATION, SUBSCRIPTION, choice(seq(ALL, field("subscription_id", DECIMAL)))),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/kill-stats-job-transact-sql
    kill_stats_job: $ => (
            seq(STATS, JOB, field("job_id", DECIMAL)),
    ),
}
