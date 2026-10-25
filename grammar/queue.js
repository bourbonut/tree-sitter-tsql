const {
  ACTIVATION,
  ALTER,
  AS,
  COMMA,
  CREATE,
  DECIMAL,
  DEFAULT,
  DROP,
  EQUAL,
  EXECUTE,
  LOB_COMPACTION,
  LR_BRACKET,
  MAXDOP,
  MAX_QUEUE_READERS,
  MOVE,
  ON,
  OWNER,
  POISON_MESSAGE_HANDLING,
  PROCEDURE_NAME,
  QUEUE,
  REBUILD,
  REORGANIZE,
  RETENTION,
  RR_BRACKET,
  SELF,
  STATUS,
  STRING,
  TO,
  WITH,
} = require("./lexer.js");

module.exports = {
  create_queue: $ => seq(
    CREATE,
    QUEUE,
    choice(seq($.full_table_name, field("queue_name", $.id_))),
    optional($.queue_settings),
    optional(choice(seq(ON, field("filegroup", $.id_)), DEFAULT))
  ),

  queue_settings: $ => seq(
    WITH,
    optional(seq(STATUS, EQUAL, $.on_off, optional(COMMA))),
    optional(seq(RETENTION, EQUAL, $.on_off, optional(COMMA))),
    optional(seq(ACTIVATION, LR_BRACKET, choice(
      seq(
        optional(seq(STATUS, EQUAL, $.on_off, optional(COMMA))),
        seq(PROCEDURE_NAME, EQUAL, $.func_proc_name_database_schema, optional(COMMA)),
        optional(seq(MAX_QUEUE_READERS, EQUAL, field("max_readers", DECIMAL), optional(COMMA))),
        optional(seq(EXECUTE, AS, choice(SELF, field("user_name", STRING), OWNER), optional(COMMA))),
      ),
      DROP
    ), RR_BRACKET, optional(COMMA))),
    optional(seq(POISON_MESSAGE_HANDLING, LR_BRACKET, optional(seq(STATUS, EQUAL, $.on_off)), RR_BRACKET)),
  ),

  alter_queue: $ => seq(
    ALTER,
    QUEUE,
    choice(seq($.full_table_name, field("queue_name", $.id_))),
    choice(seq($.queue_settings, $.queue_action))
  ),


  queue_action: $ => choice(
    seq(REBUILD, optional(seq(WITH, LR_BRACKET, $.queue_rebuild_options, RR_BRACKET))),
    seq(REORGANIZE, optional(seq(WITH, LOB_COMPACTION, EQUAL, $.on_off))),
    seq(MOVE, TO, choice($.id_, DEFAULT)),
  ),

  queue_rebuild_options: _ => seq(MAXDOP, EQUAL, DECIMAL),
}
