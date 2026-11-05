const {
  BEGIN,
  CONTRACT,
  CONVERSATION,
  DECIMAL,
  DIALOG,
  ENCRYPTION,
  FROM,
  LIFETIME,
  LOCAL_ID,
  ON,
  RELATED_CONVERSATION,
  RELATED_CONVERSATION_GROUP,
  SERVICE,
  STRING,
  TIMEOUT,
  TIMER,
  TO,
  WITH,
} = require("./lexer.js");

module.exports = {
  begin_conversation_timer: $ => seq(
    BEGIN,
    CONVERSATION,
    TIMER,
    "(",
      LOCAL_ID,
      ")",
    TIMEOUT,
    "=",
    $.time,
    optional(";")
  ),

  begin_conversation_dialog: $ => seq(
    BEGIN,
    DIALOG,
    optional(CONVERSATION),
    field("dialog_handle", LOCAL_ID),
    FROM,
    SERVICE,
    field("initiator_service_name", $.service_name),
    TO,
    SERVICE,
    field("target_service_name", $.service_name),
    optional(seq(',', field("service_broker_guid", STRING))),
    ON,
    CONTRACT,
    field("contract_name", $.contract_name),
    optional(seq(
      WITH,
      optional(seq(
        choice(RELATED_CONVERSATION, RELATED_CONVERSATION_GROUP),
        '=',
        LOCAL_ID,
        optional(',')
      )),
      optional(seq(
        LIFETIME,
        '=',
        choice(DECIMAL, LOCAL_ID),
        optional(',')
      )),
      optional(seq(
        ENCRYPTION,
        '=',
        $.on_off
      ))
    )),
    optional(';')
  ),
}
