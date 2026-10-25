
const {
  AES,
  ALGORITHM,
  ALL,
  AS,
  AUTHENTICATION,
  AUTHORIZATION,
  CERTIFICATE,
  COMMA,
  CREATE,
  DATABASE_MIRRORING,
  DECIMAL,
  DISABLED,
  ENABLED,
  ENCRYPTION,
  ENDPOINT,
  EQUAL,
  FOR,
  IPV4_ADDR,
  KERBEROS,
  LISTENER_IP,
  LISTENER_PORT,
  LR_BRACKET,
  MESSAGE_FORWARDING,
  MESSAGE_FORWARD_SIZE,
  NEGOTIATE,
  NTLM,
  PARTNER,
  RC4,
  REQUIRED,
  ROLE,
  RR_BRACKET,
  SERVICE_BROKER,
  STARTED,
  STATE,
  STOPPED,
  STRING,
  SUPPORTED,
  TCP,
  TSQL,
  WINDOWS,
  WITNESS,
} = require("./lexer.js");

module.exports = {
  // https://learn.microsoft.com/en-us/sql/t-sql/statements/create-endpoint-transact-optional($.sql)view=sql-server-ver16
  create_endpoint: $ => seq(
    CREATE,
    ENDPOINT,
    field("endpointname", $.id_),
    optional(seq(AUTHORIZATION, field("login", $.id_))),
    optional(seq(STATE, EQUAL, field("state", choice(STARTED, STOPPED, DISABLED)))),
    AS,
    TCP,
    LR_BRACKET,
    $.endpoint_listener_clause,
    RR_BRACKET,
    choice(
      seq(FOR, TSQL, LR_BRACKET, RR_BRACKET),
      seq(
        FOR,
        SERVICE_BROKER,
        LR_BRACKET,
        $.endpoint_authentication_clause,
        optional(seq(optional(COMMA), $.endpoint_encryption_alogorithm_clause)),
        optional(seq(optional(COMMA), MESSAGE_FORWARDING, EQUAL, choice(ENABLED, DISABLED))),
        optional(seq(optional(COMMA), MESSAGE_FORWARD_SIZE, EQUAL, DECIMAL)),
        RR_BRACKET
      ),
      seq(
        FOR,
        DATABASE_MIRRORING,
        LR_BRACKET,
        $.endpoint_authentication_clause,
        seq(optional(COMMA), $.endpoint_encryption_alogorithm_clause),
        optional(COMMA),
        ROLE,
        EQUAL,
        choice(WITNESS, PARTNER, ALL),
        RR_BRACKET
      )
    ),
  ),

  endpoint_encryption_alogorithm_clause: _ => seq(
    ENCRYPTION,
    EQUAL,
    choice(DISABLED, SUPPORTED, REQUIRED),
    optional(seq(ALGORITHM, choice(seq(AES, optional(RC4)), seq(RC4, optional(AES)))))
  ),

  endpoint_authentication_clause: $ => seq(
    AUTHENTICATION,
    EQUAL,
    choice(
      seq(WINDOWS, optional(choice(NTLM, KERBEROS, NEGOTIATE)), optional(seq(CERTIFICATE, field("cert_name", $.id_)))),
      seq(CERTIFICATE, field("cert_name", $.id_), optional(WINDOWS), optional(choice(NTLM, KERBEROS, NEGOTIATE)))
    )
  ),

  endpoint_listener_clause: _ => seq(
    LISTENER_PORT,
    EQUAL,
    field("port", DECIMAL),
    optional(
      seq(
        COMMA,
        LISTENER_IP,
        EQUAL,
        choice(ALL, seq('(', choice(field("ipv4", IPV4_ADDR), field("ipv6", STRING)), ')'))
      )
    ),
  ),
}
