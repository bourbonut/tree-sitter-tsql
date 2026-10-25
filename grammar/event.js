const {
  ACTION,
  ADD,
  ALLOW_MULTIPLE_EVENT_LOSS,
  ALLOW_SINGLE_EVENT_LOSS,
  ALTER,
  AND,
  COMMA,
  CREATE,
  DATABASE,
  DECIMAL,
  DOT,
  DROP,
  EQUAL,
  EVENT,
  EVENT_RETENTION_MODE,
  EXCLAMATION,
  FAN_IN,
  FOR,
  GREATER,
  INFINITE,
  KB,
  LESS,
  LR_BRACKET,
  MAX_DISPATCH_LATENCY,
  MAX_EVENT_SIZE,
  MAX_MEMORY,
  MB,
  MEMORY_PARTITION_MODE,
  NONE,
  NOT,
  NOTIFICATION,
  NO_EVENT_LOSS,
  OFF,
  ON,
  OR,
  PER_CPU,
  PER_NODE,
  QUEUE,
  RR_BRACKET,
  SECONDS,
  SERVER,
  SERVICE,
  SESSION,
  SET,
  START,
  STARTUP_STATE,
  STATE,
  STOP,
  STRING,
  TARGET,
  TO,
  TRACK_CAUSALITY,
  WHERE,
  WITH,
} = require("./lexer.js");

module.exports = {
    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-event-notification-transact-sql
    create_event_notification: $ => seq(
      CREATE,
      EVENT,
      NOTIFICATION,
      field("event_notification_name", $.id_),
      ON,
      choice(SERVER, DATABASE, seq(QUEUE, field("queue_name", $.id_))),
      optional(seq(WITH, FAN_IN)),
      FOR,
      repeat1(seq(optional(COMMA), field("event_type_or_group", $.id_))),
      TO,
      SERVICE,
      field("broker_service", STRING),
      COMMA,
      field("broker_service_specifier_or_current_database", STRING),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-event-session-transact-sql
    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-event-session-transact-sql
    // todo: not implemented
    create_or_alter_event_session: $ => seq(
      choice(CREATE, ALTER),
      EVENT,
      SESSION,
      field('event_session_name', $.id_),
      ON,
      SERVER,
      repeat(
        seq(
          optional(COMMA),
          ADD,
          EVENT,
          optional(
            seq(
              field('event_module_guid', $.id_),
              DOT
            )
          ),
          field('event_package_name', $.id_),
          DOT,
          field('event_name', $.id_),
          repeat(
            seq(
              LR_BRACKET,
              optional(
                seq(
                  SET,
                  repeat(
                    seq(
                      optional(COMMA),
                      field('event_customizable_attributue', $.id_),
                      EQUAL,
                      choice($.DECIMAL, $.STRING)
                    )
                  )
                )
              ),
              repeat(
                seq(
                  ACTION,
                  LR_BRACKET,
                  repeat1(
                    seq(
                      optional(COMMA),
                      optional(
                        seq(
                          field('event_module_guid', $.id_),
                          DOT
                        )
                      ),
                      field('event_package_name', $.id_),
                      DOT,
                      field('action_name', $.id_)
                    )
                  ),
                  RR_BRACKET
                )
              ),
              optional(seq(WHERE, $.event_session_predicate_expression)),
              RR_BRACKET
            )
          )
        )
      ),
      repeat(
        seq(
          optional(COMMA),
          DROP,
          EVENT,
          optional(
            seq(
              field('event_module_guid', $.id_),
              DOT
            )
          ),
          field('event_package_name', $.id_),
          DOT,
          field('event_name', $.id_)
        )
      ),
      repeat(
        seq(
          ADD,
          TARGET,
          optional(
            seq(
              field('event_module_guid', $.id_),
              DOT
            )
          ),
          field('event_package_name', $.id_),
          DOT,
          field('target_name', $.id_),
          repeat(
            seq(
              LR_BRACKET,
              SET,
              repeat1(
                seq(
                  optional(COMMA),
                  field('target_parameter_name', $.id_),
                  EQUAL,
                  choice(
                    seq(
                      optional(LR_BRACKET),
                      $.DECIMAL,
                      optional(RR_BRACKET)
                    ),
                    $.STRING
                  )
                )
              ),
              RR_BRACKET
            )
          )
        )
      ),
      repeat(
        seq(
          DROP,
          TARGET,
          optional(
            seq(
              field('event_module_guid', $.id_),
              DOT
            )
          ),
          field('event_package_name', $.id_),
          DOT,
          field('target_name', $.id_)
        )
      ),
      optional(
        seq(
          WITH,
          LR_BRACKET,
          optional(
            seq(
              optional(COMMA),
              MAX_MEMORY,
              EQUAL,
              field('max_memory', $.DECIMAL),
              choice(KB, MB)
            )
          ),
          optional(
            seq(
              optional(COMMA),
              EVENT_RETENTION_MODE,
              EQUAL,
              choice(
                ALLOW_SINGLE_EVENT_LOSS,
                ALLOW_MULTIPLE_EVENT_LOSS,
                NO_EVENT_LOSS
              )
            )
          ),
          optional(
            seq(
              optional(COMMA),
              MAX_DISPATCH_LATENCY,
              EQUAL,
              choice(
                seq(
                  field('max_dispatch_latency_seconds', $.DECIMAL),
                  SECONDS
                ),
                INFINITE
              )
            )
          ),
          optional(
            seq(
              optional(COMMA),
              MAX_EVENT_SIZE,
              EQUAL,
              field('max_event_size', $.DECIMAL),
              choice(KB, MB)
            )
          ),
          optional(
            seq(
              optional(COMMA),
              MEMORY_PARTITION_MODE,
              EQUAL,
              choice(NONE, PER_NODE, PER_CPU)
            )
          ),
          optional(
            seq(
              optional(COMMA),
              TRACK_CAUSALITY,
              EQUAL,
              choice(ON, OFF)
            )
          ),
          optional(
            seq(
              optional(COMMA),
              STARTUP_STATE,
              EQUAL,
              choice(ON, OFF)
            )
          ),
          RR_BRACKET
        )
      ),
      optional(
        seq(
          STATE,
          EQUAL,
          choice(START, STOP)
        )
      )
    ),

    event_session_predicate_expression: $ => seq(
      optional(COMMA),
      optional(choice(AND, OR)),
      optional(NOT),
      choice($.event_session_predicate_factor, seq(LR_BRACKET, $.event_session_predicate_expression, RR_BRACKET)),
    ),

    event_session_predicate_factor: $ => choice(
        $.event_session_predicate_leaf,
        seq(LR_BRACKET, $.event_session_predicate_expression, RR_BRACKET),
    ),

    event_session_predicate_leaf: $ => choice(
      field("event_field_name", $.id_),
      seq(
        choice(
          field("event_field_name", $.id_),
          seq(
            optional(seq(field("event_module_guid", $.id_), DOT)),
            field("event_package_name", $.id_),
            DOT,
            field("predicate_source_name", $.id_)
          )
        ),
        choice(
          EQUAL,
          seq(LESS, GREATER),
          seq(EXCLAMATION, EQUAL),
          GREATER,
          seq(GREATER, EQUAL),
          LESS,
          seq(LESS, EQUAL)
        ),
        choice(DECIMAL, STRING)
      ),
      seq(
        optional(seq(field("event_module_guid", $.id_), DOT)),
        field("event_package_name", $.id_),
        DOT,
        field("predicate_compare_name", $.id_),
        LR_BRACKET,
        choice(
          field("event_field_name", $.id_),
          seq(
            optional(seq(field("event_module_guid", $.id_), DOT)),
            field("event_package_name", $.id_),
            DOT,
            field("predicate_source_name", $.id_),
            COMMA,
            choice(DECIMAL, STRING)
          )
        ),
        RR_BRACKET
      )
    ),
}
