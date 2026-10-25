const {
  ADD,
  ALL,
  ALLOW_CONNECTIONS,
  ALTER,
  ANY,
  ASYNCHRONOUS_COMMIT,
  AUTOMATED_BACKUP_PREFERENCE,
  AUTOMATIC,
  AVAILABILITY,
  AVAILABILITY_MODE,
  BACKUP_PRIORITY,
  COMMA,
  CREATE,
  DATABASE,
  DB_FAILOVER,
  DECIMAL,
  DENY,
  DHCP,
  DROP,
  DTC_SUPPORT,
  ENDPOINT_URL,
  EQUAL,
  FAILOVER,
  FAILOVER_MODE,
  FAILURE_CONDITION_LEVEL,
  FORCE_FAILOVER_ALLOW_DATA_LOSS,
  GRANT,
  GROUP,
  HEALTH_CHECK_TIMEOUT,
  IP,
  JOIN,
  LISTENER,
  LISTENER_URL,
  LR_BRACKET,
  MANUAL,
  MODIFY,
  NO,
  NONE,
  OFF,
  OFFLINE,
  ON,
  PER_DB,
  PORT,
  PRIMARY,
  PRIMARY_ROLE,
  READ_ONLY,
  READ_ONLY_ROUTING_LIST,
  READ_WRITE,
  REMOVE,
  REPLICA,
  REQUIRED_SYNCHRONIZED_SECONDARIES_TO_COMMIT,
  RESTART,
  RR_BRACKET,
  SECONDARY,
  SECONDARY_ONLY,
  SECONDARY_ROLE,
  SEEDING_MODE,
  SESSION_TIMEOUT,
  SET,
  STRING,
  SYNCHRONOUS_COMMIT,
  WITH,
} = require("./lexer.js");

module.exports = {
  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-availability-group-transact-sql
  drop_availability_group: $ => seq(DROP, AVAILABILITY, GROUP, field("group_name", $.id_)),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-availability-group-transact-sql
  alter_availability_group: $ => seq($.alter_availability_group_start, $.alter_availability_group_options),

  alter_availability_group_start: $ => seq(ALTER, AVAILABILITY, GROUP, field("group_name", $.id_)),

  alter_availability_group_options: $ => choice(
    seq(
      SET,
      LR_BRACKET,
      choice(
        seq(AUTOMATED_BACKUP_PREFERENCE, EQUAL, choice(PRIMARY, SECONDARY_ONLY, SECONDARY, NONE)),
        seq(FAILURE_CONDITION_LEVEL, EQUAL, DECIMAL),
        seq(HEALTH_CHECK_TIMEOUT, EQUAL, field("milliseconds", DECIMAL)),
        seq(DB_FAILOVER, EQUAL, choice(ON, OFF)),
        seq(REQUIRED_SYNCHRONIZED_SECONDARIES_TO_COMMIT, EQUAL, DECIMAL)
      ),
      RR_BRACKET
    ),
    seq(ADD, DATABASE, field("database_name", $.id_)),
    seq(REMOVE, DATABASE, field("database_name", $.id_)),
    seq(
      ADD, REPLICA, ON, field("server_instance", STRING),
      WITH, LR_BRACKET,
      seq(
        optional(seq(ENDPOINT_URL, EQUAL, STRING)),
        optional(seq(optional(COMMA), AVAILABILITY_MODE, EQUAL, choice(SYNCHRONOUS_COMMIT, ASYNCHRONOUS_COMMIT))),
        optional(seq(optional(COMMA), FAILOVER_MODE, EQUAL, choice(AUTOMATIC, MANUAL))),
        optional(seq(optional(COMMA), SEEDING_MODE, EQUAL, choice(AUTOMATIC, MANUAL))),
        optional(seq(optional(COMMA), BACKUP_PRIORITY, EQUAL, DECIMAL)),
        optional(seq(optional(COMMA), PRIMARY_ROLE, LR_BRACKET, ALLOW_CONNECTIONS, EQUAL, choice(READ_WRITE, ALL), RR_BRACKET)),
        optional(seq(optional(COMMA), SECONDARY_ROLE, LR_BRACKET, ALLOW_CONNECTIONS, EQUAL, READ_ONLY, RR_BRACKET))
      ),
      RR_BRACKET
    ),
    seq(
      SECONDARY_ROLE,
      LR_BRACKET,
      choice(
        seq(ALLOW_CONNECTIONS, EQUAL, choice(NO, READ_ONLY, ALL)),
        seq(READ_ONLY_ROUTING_LIST, EQUAL, LR_BRACKET, STRING, RR_BRACKET)
      ),
      RR_BRACKET
    ),
    seq(
      PRIMARY_ROLE,
      LR_BRACKET,
      choice(
        seq(ALLOW_CONNECTIONS, EQUAL, choice(NO, READ_ONLY, ALL)),
        seq(
          READ_ONLY_ROUTING_LIST,
          EQUAL,
          LR_BRACKET,
          choice(
            repeat(seq(optional(COMMA), STRING)),
            NONE
          ),
          RR_BRACKET
        ),
        seq(SESSION_TIMEOUT, EQUAL, field("session_timeout", DECIMAL))
      ),
      RR_BRACKET
    ),
    seq(
      MODIFY, REPLICA, ON, field("server_instance", STRING),
      choice(
        seq(
          WITH, LR_BRACKET,
          choice(
            seq(ENDPOINT_URL, EQUAL, STRING),
            seq(AVAILABILITY_MODE, EQUAL, choice(SYNCHRONOUS_COMMIT, ASYNCHRONOUS_COMMIT)),
            seq(FAILOVER_MODE, EQUAL, choice(AUTOMATIC, MANUAL)),
            seq(SEEDING_MODE, EQUAL, choice(AUTOMATIC, MANUAL)),
            seq(BACKUP_PRIORITY, EQUAL, DECIMAL)
          ),
          RR_BRACKET
        ),
        seq(
          SECONDARY_ROLE, LR_BRACKET,
          choice(
            seq(ALLOW_CONNECTIONS, EQUAL, choice(NO, READ_ONLY, ALL)),
            seq(READ_ONLY_ROUTING_LIST, EQUAL, LR_BRACKET, STRING, RR_BRACKET)
          ),
          RR_BRACKET
        ),
        seq(
          PRIMARY_ROLE, LR_BRACKET,
          choice(
            seq(ALLOW_CONNECTIONS, EQUAL, choice(NO, READ_ONLY, ALL)),
            seq(
              READ_ONLY_ROUTING_LIST,
              EQUAL,
              LR_BRACKET,
              choice(repeat(seq(optional(COMMA), STRING)), NONE),
              RR_BRACKET
            ),
            seq(SESSION_TIMEOUT, EQUAL, field("session_timeout", DECIMAL))
          ),
          RR_BRACKET
        ),
      ),
    ),
    seq(REMOVE, REPLICA, ON, STRING),
    JOIN,
    seq(
      JOIN, AVAILABILITY, GROUP, ON,
      repeat1(seq(
        optiona(COMMA),
        field("ag_name", STRING),
        WITH,
        LR_BRACKET,
        LISTENER_URL, EQUAL, STRING, COMMA, AVAILABILITY_MODE, EQUAL,
        choice(SYNCHRONOUS_COMMIT, ASYNCHRONOUS_COMMIT),
        COMMA, FAILOVER_MODE, EQUAL, MANUAL, COMMA, SEEDING_MODE, EQUAL, choice(AUTOMATIC, MANUAL), RR_BRACKET
      ),)
    ),
    seq(
      MODIFY, AVAILABILITY, GROUP, ON,
      repeat1(seq(
        optional(COMMA), field("ag_name_modified", STRING), WITH, LR_BRACKET,
        LISTENER_URL, EQUAL, STRING,
        optional(seq(optional(COMMA), AVAILABILITY_MODE, EQUAL, choice(SYNCHRONOUS_COMMIT, ASYNCHRONOUS_COMMIT))),
        optional(seq(optional(COMMA), FAILOVER_MODE, EQUAL, MANUAL)),
        optional(seq(optional(COMMA), SEEDING_MODE, EQUAL, choice(AUTOMATIC, MANUAL))),
        RR_BRACKET
      ),)
    ),
    seq(GRANT, CREATE, ANY, DATABASE),
    seq(DENY, CREATE, ANY, DATABASE),
    FAILOVER,
    FORCE_FAILOVER_ALLOW_DATA_LOSS,
    seq(
      ADD, LISTENER, field("listener_name", STRING), LR_BRACKET,
      (
        seq(WITH, DHCP, ON, LR_BRACKET, $.ip_v4_failover, $.ip_v4_failover, RR_BRACKET),
        seq(
          WITH, IP, LR_BRACKET,
          repeat1(seq(optional(COMMA), LR_BRACKET, choice(seq($.ip_v4_failover, COMMA, $.ip_v4_failover), $.ip_v6_failover), RR_BRACKET)),
          optional(seq(COMMA, PORT, EQUAL, DECIMAL)),
          RR_BRACKET
        ),
      ),
      RR_BRACKET
    ),
    seq(
      MODIFY, LISTENER,
      choice(
        seq(ADD, IP, LR_BRACKET, choice(seq($.ip_v4_failover, $.ip_v4_failover), $.ip_v6_failover), RR_BRACKET),
        seq(PORT, EQUAL, DECIMAL)
      ),
    ),
    seq(RESTART, LISTENER, STRING),
    seq(REMOVE, LISTENER, STRING),
    OFFLINE,
    seq(WITH, LR_BRACKET, DTC_SUPPORT, EQUAL, PER_DB, RR_BRACKET)
  ),

  ip_v4_failover: _ => STRING,

  ip_v6_failover: _ => STRING,
}
