const {
  ADD,
  AFFINITY,
  ALTER,
  AND,
  APPLICATION_LOG,
  AUDIT,
  AUDIT_GUID,
  AUTHORIZATION,
  AUTO,
  BUFFER,
  CLUSTER,
  COMMA,
  CONFIGURATION,
  CONTEXT,
  CONTINUE,
  CPU,
  CREATE,
  DECIMAL,
  DEFAULT,
  DIAGNOSTICS,
  DROP,
  EQUAL,
  EXCLAMATION,
  EXTENSION,
  FAILOVER,
  FAILURECONDITIONLEVEL,
  FAIL_OPERATION,
  FILE,
  FILENAME,
  FILEPATH,
  FOR,
  GB,
  GREATER,
  HADR,
  HEALTHCHECKTIMEOUT,
  KB,
  LESS,
  LOCAL,
  LOG,
  LR_BRACKET,
  MAXSIZE,
  MAX_FILES,
  MAX_ROLLOVER_FILES,
  MAX_SIZE,
  MB,
  MEMBER,
  MODIFY,
  NAME,
  NOT,
  NUMANODE,
  OFF,
  ON,
  ON_FAILURE,
  OR,
  PATH,
  POOL,
  PROCESS,
  PROPERTY,
  QUEUE_DELAY,
  REMOVE,
  RESERVE_DISK_SPACE,
  ROLE,
  RR_BRACKET,
  SECURITY_LO,
  SECURITY_LOG,
  SERVER,
  SET,
  SHUTDOWN,
  SIZE,
  SOFTNUMA,
  SPECIFICATION,
  SQLDUMPERFLAGS,
  SQLDUMPERPATH,
  SQLDUMPERTIMEOUT,
  STATE,
  STRING,
  TB,
  TO,
  UNLIMITED,
  VERBOSELOGGING,
  WHERE,
  WITH,
} = require("./lexer.js");

module.exports = {
  // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-server-audit-transact-sql
  alter_server_audit: $ => seq(
    ALTER,
    SERVER,
    AUDIT,
    field("audit_name", $.id_),
    seq(
      optional(seq(
        TO,
        seq(
          FILE,
          seq(
            LR_BRACKET,
            seq(optional(COMMA), FILEPATH, EQUAL, field("filepath", STRING)),
            seq(optional(COMMA), MAXSIZE, EQUAL, choice(DECIMAL, choice(MB, GB, TB), UNLIMITED)),
            seq(optional(COMMA), MAX_ROLLOVER_FILES, EQUAL, field("max_rollover_files", choice(DECIMAL, UNLIMITED))),
            seq(optional(COMMA), MAX_FILES, EQUAL, field("max_files", DECIMAL)),
            seq(optional(COMMA), RESERVE_DISK_SPACE, EQUAL, (ON, OFF)),
            RR_BRACKET
          )
        ),
        APPLICATION_LOG,
        SECURITY_LO,
      )),
      optional(seq(
        WITH,
        LR_BRACKET,
        repeat(choice(
          seq(optional(COMMA), QUEUE_DELAY, EQUAL, field("queue_delay", DECIMAL)),
          seq(optional(COMMA), ON_FAILURE, EQUAL, choice(CONTINUE, SHUTDOWN, FAIL_OPERATION)),
          seq(optional(COMMA), STATE, EQUAL, choice(ON, OFF)),
        )),
        RR_BRACKET
      )),
      optional(seq(
        WHERE,
        choice(
          seq(
            optional(COMMA),
            optional(NOT),
            field("event_field_name", $.id_),
            choice(
              EQUAL,
              seq(LESS, GREATER),
              seq(EXCLAMATION, EQUAL),
              GREATER,
              seq(GREATER, EQUAL),
              LESS,
              seq(LESS, EQUAL),
            ),
            choice(DECIMAL, STRING),
          ),
          seq(
            optional(COMMA),
            choice(AND, OR),
            optional(NOT),
            choice(
              EQUAL,
              seq(LESS, GREATER),
              seq(EXCLAMATION, EQUAL),
              GREATER,
              seq(GREATER, EQUAL),
              LESS,
              seq(LESS, EQUAL),
            ),
            choice(seq(DECIMAL, STRING),)
          )
        ),
      )),
      seq(REMOVE, WHERE),
      seq(MODIFY, NAME, EQUAL, field("new_audit_name", $.id_))
    )
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-server-audit-transact-sql
  create_server_audit: $ => seq(
    CREATE,
    SERVER,
    AUDIT,
    field("audit_name", $.id_),
    choice(
      seq(
        optional(seq(
          TO,
          choice(
            seq(
              FILE,
              LR_BRACKET,
              repeat(choice(
                seq(optional(COMMA), FILEPATH, EQUAL, field("filepath", STRING)),
                seq(optional(COMMA), MAXSIZE, EQUAL, choice(seq(DECIMAL, choice(MB, GB, TB)), UNLIMITED)),
                seq(optional(COMMA), MAX_ROLLOVER_FILES, EQUAL, field("max_rollover_files", choice(DECIMAL, UNLIMITED))),
                seq(optional(COMMA), MAX_FILES, EQUAL, field("max_files", DECIMAL)),
                seq(optional(COMMA), RESERVE_DISK_SPACE, EQUAL, choice(ON, OFF))
              )),
              RR_BRACKET
            ),
            APPLICATION_LOG,
            SECURITY_LOG
          )
        )),
        optional(seq(
          WITH,
          LR_BRACKET,
          repeat(choice(
            seq(optional(COMMA), QUEUE_DELAY, EQUAL, field("queue_delay", DECIMAL)),
            seq(optional(COMMA), ON_FAILURE, EQUAL, choice(CONTINUE, SHUTDOWN, FAIL_OPERATION)),
            seq(optional(COMMA), STATE, EQUAL, choice(ON, OFF)),
            seq(optional(COMMA), AUDIT_GUID, EQUAL, field("audit_guide", $.id_))
          )),
          RR_BRACKET
        )),
        optional(seq(
          WHERE,
          repeat1(choice(
            seq(
              optional(COMMA),
              optional(NOT),
              field("event_field_name", $.id_),
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
              optional(COMMA),
              choice(AND, OR),
              optional(NOT),
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
            )
          ))
        ))
      ),
      seq(REMOVE, WHERE),
      seq(MODIFY, NAME, EQUAL, field("new_audit_name", $.id_))
    )
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-server-audit-specification-transact-sql
  alter_server_audit_specification: $ => seq(
    ALTER,
    SERVER,
    AUDIT,
    SPECIFICATION,
    field("audit_specification_name", $.id_),
    optional(seq(FOR, SERVER, AUDIT, field("audit_name", $.id_))),
    repeat(seq(choice(ADD, DROP), LR_BRACKET, field("audit_action_group_name", $.id_), RR_BRACKET)),
    optional(seq(WITH, LR_BRACKET, STATE, EQUAL, choice(ON, OFF), RR_BRACKET)),
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-server-audit-specification-transact-sql
  create_server_audit_specification: $ => seq(
    CREATE,
    SERVER,
    AUDIT,
    SPECIFICATION,
    field("audit_specification_name", $.id_),
    optional(seq(FOR, SERVER, AUDIT, field("audit_name", $.id_))),
    repeat(seq(ADD, LR_BRACKET, field("audit_action_group_name", $.id_), RR_BRACKET)),
    optional(seq(WITH, LR_BRACKET, STATE, EQUAL, choice(ON, OFF), RR_BRACKET)),
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-server-configuration-transact-sql
  alter_server_configuration: _ => seq(
    ALTER,
    SERVER,
    CONFIGURATION,
    SET,
    choice(
      seq(
        PROCESS,
        AFFINITY,
        choice(
          seq(
            CPU,
            EQUAL,
            choice(
              AUTO,
              repeat1(
                choice(
                  seq(
                    optional(COMMA),
                    DECIMAL,
                  ),
                  seq(
                    optional(COMMA),
                    DECIMAL,
                    TO,
                    DECIMAL
                  )
                )
              )
            )
          ),
          seq(
            NUMANODE,
            EQUAL,
            repeat1(
              choice(
                seq(
                  optional(COMMA),
                  DECIMAL,
                ),
                seq(
                  optional(COMMA),
                  DECIMAL,
                  TO,
                  DECIMAL
                )
              )
            )
          )
        ),
      ),
      seq(
        DIAGNOSTICS,
        LOG,
        choice(
          ON,
          OFF,
          seq(PATH, EQUAL, choice(STRING, DEFAULT)),
          seq(MAX_SIZE, EQUAL, choice(seq(DECIMAL, MB), DEFAULT)),
          seq(MAX_FILES, EQUAL, choice(DECIMAL, DEFAULT))
        ),
      ),
      seq(
        FAILOVER,
        CLUSTER,
        PROPERTY,
        choice(
          seq(VERBOSELOGGING, EQUAL, choice(STRING, DEFAULT)),
          seq(SQLDUMPERFLAGS, EQUAL, choice(STRING, DEFAULT)),
          seq(SQLDUMPERPATH, EQUAL, choice(STRING, DEFAULT)),
          seq(SQLDUMPERTIMEOUT, choice(STRING, DEFAULT)),
          seq(FAILURECONDITIONLEVEL, EQUAL, choice(STRING, DEFAULT)),
          seq(HEALTHCHECKTIMEOUT, EQUAL, choice(DECIMAL, DEFAULT))
        ),
      ),
      seq(
        HADR,
        CLUSTER,
        CONTEXT,
        EQUAL,
        choice(STRING, LOCAL)
      ),
      seq(
        BUFFER,
        POOL,
        EXTENSION,
        choice(
          seq(
            ON,
            LR_BRACKET,
            FILENAME,
            EQUAL,
            STRING,
            COMMA,
            SIZE,
            EQUAL,
            DECIMAL,
            choice(KB, MB, GB),
            RR_BRACKET,
          ),
          OFF
        ),
      ),
      seq(
        SET,
        SOFTNUMA,
        choice(ON, OFF)
      )
    ),
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-server-role-transact-sql
  alter_server_role: $ => seq(
    ALTER,
    SERVER,
    ROLE,
    field("server_role_name", $.id_),
    choice(
      seq(choice(ADD, DROP), MEMBER, field("server_principal", $.id_)),
      seq(WITH, NAME, EQUAL, field("new_server_role_name", $.id_))
    )
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-server-role-transact-sql
  create_server_role: $ => seq(
    CREATE,
    SERVER,
    ROLE,
    field("server_role", $.id_),
    optional(seq(AUTHORIZATION, field("server_principal", $.id_)))
  ),

  alter_server_role_pdw: $ => seq(
    ALTER,
    SERVER,
    ROLE,
    field("server_role_name", $.id_),
    choice(ADD, DROP),
    MEMBER,
    field("login", $.id_)
  ),
}
