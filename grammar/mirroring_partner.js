const {
  COLON,
  DECIMAL,
  DOT,
  DOUBLE_FORWARD_SLASH,
  FAILOVER,
  FORCE_SERVICE_ALLOW_DATA_LOSS,
  FULL,
  OF,
  OFF,
  RESUME,
  SAFETY,
  SUSPEND,
  TCP,
  TIMEOUT,
} = require("./lexer.js");

module.exports = {
  database_mirroring_option: $ => $.mirroring_set_option,

  mirroring_set_option: $ => choice(
    seq($.mirroring_partner, $.partner_option),
    seq($.mirroring_witness, $.witness_option),
  ),

  mirroring_partner: _ => PARTNER,

  mirroring_witness: _ => WITNESS,

  witness_partner_equal: _ => EQUAL,

  partner_option: $ => choice(
    seq($.witness_partner_equal, $.partner_server),
    FAILOVER,
    FORCE_SERVICE_ALLOW_DATA_LOSS,
    OFF,
    RESUME,
    seq(SAFETY, choice(seq(FULL, OFF))),
    SUSPEND,
    seq(TIMEOUT, DECIMAL),
  ),

  witness_option: $ => choice(
    seq($.witness_partner_equal, $.witness_server),
    OF,
  ),

  witness_server: $ => $.partner_server,

  partner_server: $ => seq(
    $.partner_server_tcp_prefix,
    $.host,
    $.mirroring_host_port_seperator,
    $.port_number
  ),

  mirroring_host_port_seperator: _ => COLON,

  partner_server_tcp_prefix: _ => seq(TCP, COLON, DOUBLE_FORWARD_SLASH),

  port_number: _ => seq(field("port", DECIMAL)),

  host: $ => choice(
    seq($.id_, DOT, $.host),
    choice(seq($.id_, DOT), $.id_),
  ),
}
