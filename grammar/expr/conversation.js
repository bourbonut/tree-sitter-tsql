const {
  CLEANUP,
  CONVERSATION,
  DESCRIPTION,
  END,
  ERROR,
  FROM,
  GET,
  GROUP,
  LOCAL_ID,
  MESSAGE,
  ON,
  SEND,
  STRING,
  TIMEOUT,
  TYPE,
  WAITFOR,
  WITH,
} = require("./lexer.js");

module.exports = {
  end_conversation: _ => seq(
    END,
    CONVERSATION,
    field("conversation_handle", LOCAL_ID),
    optional(";"),
    optional(
      seq(
        WITH,
        optional(
          seq(
            ERROR,
            "=",
            field(
              "failure_code",
              choice(LOCAL_ID, STRING)
            ),
            DESCRIPTION,
            "=",
            field(
              "failure_text",
              choice(LOCAL_ID, STRING)
            )
          )
        ),
        optional(CLEANUP)
      )
    )
  ),

  waitfor_conversation: $ => seq(
    optional(WAITFOR),
    '(',
      $.get_conversation,
      ')',
    optional(seq(
      optional(','),
      TIMEOUT,
      field("timeout", $.time)
    )),
    optional(';')
  ),

  get_conversation: $ => seq(
    GET,
    CONVERSATION,
    GROUP,
    field("conversation_group_id", choice(STRING, LOCAL_ID)),
    FROM,
    field("queue", $.queue_id),
    optional(';')
  ),

  queue_id: $ => choice(
    seq(
      field("database_name", $.id_),
      '.',
      field("schema_name", $.id_),
      '.',
      field("name", $.id_)
    ),
    $.id_
  ),

  send_conversation: $ => seq(
    SEND,
    ON,
    CONVERSATION,
    field("conversation_function", choice(STRING, LOCAL_ID)),
    MESSAGE,
    TYPE,
    field("message_type_name", $.expression),
    optional(seq(
      '(',
        field("message_body_expression", choice(STRING, LOCAL_ID)),
        ')'
    )),
    optional(';')
  ),
}
