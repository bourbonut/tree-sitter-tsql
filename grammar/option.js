const {
  ACCELERATED_DATABASE_RECOVERY,
  ALLOWED,
  ALLOW_SNAPSHOT_ISOLATION,
  ANSI_NULLS,
  ANSI_NULL_DEFAULT,
  ANSI_PADDING,
  ANSI_WARNINGS,
  ARITHABORT,
  AUTO_CLEANUP,
  AUTO_CLOSE,
  AUTO_CREATE_STATISTICS,
  AUTO_SHRINK,
  AUTO_UPDATE_STATISTICS,
  AUTO_UPDATE_STATISTICS_ASYNC,
  AVAILABILITY,
  BULK_LOGGED,
  CHANGE_RETENTION,
  CHANGE_TRACKING,
  CHECKSUM,
  COMPATIBILITY_LEVEL,
  CONCAT_NULL_YIELDS_NULL,
  CONTAINMENT,
  CURSOR_CLOSE_ON_COMMIT,
  CURSOR_DEFAULT,
  DATE_CORRELATION_OPTIMIZATION,
  DAYS,
  DB_CHAINING,
  DECIMAL,
  DEFAULT_FULLTEXT_LANGUAGE,
  DEFAULT_LANGUAGE,
  DELAYED_DURABILITY,
  DISABLED,
  DISABLE_BROKER,
  ENABLE_BROKER,
  ENCRYPTION,
  EQUAL,
  ERROR_BROKER_CONVERSATIONS,
  FILESTREAM,
  FORCED,
  FULL,
  GLOBAL,
  GROUP,
  HADR,
  HONOR_BROKER_PRIORITY,
  HOURS,
  INCREMENTAL,
  LOCAL,
  MEMORY_OPTIMIZED_ELEVATE_TO_SNAPSHOT,
  MINUTES,
  MIXED_PAGE_ALLOCATION,
  MULTI_USE,
  NESTED_TRIGGERS,
  NEW_BROKER,
  NONE,
  NUMERIC_ROUNDABORT,
  OFF,
  ON,
  PAGE_VERIFY,
  PARAMETERIZATION,
  PARTIAL,
  QUOTED_IDENTIFIER,
  READONLY,
  READWRITE,
  READ_COMMITTED_SNAPSHOT,
  READ_ONLY,
  READ_WRIT,
  RECOVERY,
  RECURSIVE_TRIGGERS,
  RESTRICTED_USER,
  RESUME,
  SECONDS,
  SIMPLE,
  SINGLE_USER,
  STRING,
  SUSPEND,
  TARGET_RECOVERY_TIME,
  TORN_PAGE_DETECTION,
  TRANSFORM_NOISE_WORDS,
  TRUSTWORTHY,
  TWO_DIGIT_YEAR_CUTOFF,
} = require("./lexer.js");

module.exports = {
  filegroup_updatability_option: _ => choice(
    READONLY,
    READWRITE,
    READ_ONLY,
    READ_WRIT,
  ),

  // https://msdn.microsoft.com/en-us/library/bb522682.aspx
  // Runtime check.
  database_optionspec: $ => choice(
    $.auto_option,
    $.change_tracking_option,
    $.containment_option,
    $.cursor_option,
    $.database_mirroring_option,
    $.date_correlation_optimization_option,
    $.db_encryption_option,
    $.db_state_option,
    $.db_update_option,
    $.db_user_access_option,
    $.delayed_durability_option,
    $.external_access_option,
    seq(FILESTREAM, $.database_filestream_option),
    $.hadr_options,
    $.mixed_page_allocation_option,
    $.parameterization_optio,
    // $.query_store_options
    $.recovery_optio,
    // $.remote_data_archive_option
    $.service_broker_option,
    $.snapshot_option,
    $.sql_option,
    $.target_recovery_time_option,
    $.terminatio,
  ),

  auto_option: $ => choice(
    seq(AUTO_CLOSE, $.on_off),
    seq(AUTO_CREATE_STATISTICS, OFF),
    seq(ON, choice(seq(INCREMENTAL, EQUAL, ON, OFF),)),
    seq(AUTO_SHRINK, $.on_off),
    seq(AUTO_UPDATE_STATISTICS, $.on_off),
    seq(AUTO_UPDATE_STATISTICS_ASYNC, choice(seq(ON, OFF),)),
  ),

  change_tracking_option: $ => seq(
    CHANGE_TRACKING,
    EQUAL,
    choice(OFF, seq(
      ON,
      '(',
      repeat(
        seq(
          $.change_tracking_option_list,
          repeat(seq(',', $.change_tracking_option_list),)
        )
      ),
      ')'
    ))
  ),

  change_tracking_option_list: $ => choice(
    seq(AUTO_CLEANUP, EQUAL, $.on_off),
    seq(CHANGE_RETENTION, EQUAL, DECIMAL, choice(seq(DAYS, HOURS, MINUTES),)),
  ),

  containment_option: _ => seq(CONTAINMENT, EQUAL, choice(seq(NONE, PARTIAL),)),

  cursor_option: $ => choice(
    seq(CURSOR_CLOSE_ON_COMMIT, $.on_off),
    seq(CURSOR_DEFAULT, choice(seq(LOCAL, GLOBAL),)),
  ),

  date_correlation_optimization_option: $ => seq(DATE_CORRELATION_OPTIMIZATION, $.on_off),

  db_encryption_option: $ => seq(ENCRYPTION, $.on_off),

  db_state_option: _ => choice(
    ONLINE,
    OFFLINE,
    EMERGENCY
  ),

  db_update_option: _ => choice(
    READ_ONLY,
    READ_WRIT,
  ),

  db_user_access_option: _ => choice(
    SINGLE_USER,
    RESTRICTED_USER,
    MULTI_USE,
  ),

  delayed_durability_option: _ => seq(
    DELAYED_DURABILITY,
    EQUAL,
    choice(seq(DISABLED, ALLOWED, FORCED))
  ),

  external_access_option: $ => choice(
    seq(DB_CHAINING, $.on_off),
    seq(TRUSTWORTHY, $.on_off),
    seq(DEFAULT_LANGUAGE, EQUAL, choice(seq($.id_, STRING),)),
    seq(DEFAULT_FULLTEXT_LANGUAGE, EQUAL, choice(seq($.id_, STRING),)),
    seq(NESTED_TRIGGERS, EQUAL, choice(OFF, ON)),
    seq(TRANSFORM_NOISE_WORDS, EQUAL, choice(OFF, ON)),
    seq(TWO_DIGIT_YEAR_CUTOFF, EQUAL, DECIMAL),
  ),

  hadr_options: $ => seq(
    HADR,
    choice(seq((AVAILABILITY, GROUP, EQUAL, field("availability_group_name", $.id_), OFF), choice(seq(SUSPEND, RESUME),)))
  ),

  mixed_page_allocation_option: _ => seq(
    MIXED_PAGE_ALLOCATION,
    choice(seq(OFF, ON))
  ),

  parameterization_option: _ => seq(
    PARAMETERIZATION,
    choice(seq(SIMPLE, FORCED))
  ),

  recovery_option: $ => choice(
    seq(RECOVERY, choice(seq(FULL, BULK_LOGGED, SIMPLE),)),
    seq(TORN_PAGE_DETECTION, $.on_off),
    seq(ACCELERATED_DATABASE_RECOVERY, '=', $.on_off),
    seq(PAGE_VERIFY, choice(seq(CHECKSUM, TORN_PAGE_DETECTION, NONE),)),
  ),

  service_broker_option: $ => choice(
    ENABLE_BROKER,
    DISABLE_BROKER,
    NEW_BROKER,
    ERROR_BROKER_CONVERSATIONS,
    seq(HONOR_BROKER_PRIORITY, $.on_off),
  ),

  snapshot_option: $ => choice(
    seq(ALLOW_SNAPSHOT_ISOLATION, $.on_off),
    seq(READ_COMMITTED_SNAPSHOT, choice(seq(ON, OFF),)),
    seq(MEMORY_OPTIMIZED_ELEVATE_TO_SNAPSHOT, '=', choice(ON, OFF)),
  ),

  sql_option: $ => choice(
    seq(ANSI_NULL_DEFAULT, $.on_off),
    seq(ANSI_NULLS, $.on_off),
    seq(ANSI_PADDING, $.on_off),
    seq(ANSI_WARNINGS, $.on_off),
    seq(ARITHABORT, $.on_off),
    seq(COMPATIBILITY_LEVEL, EQUAL, DECIMAL),
    seq(CONCAT_NULL_YIELDS_NULL, $.on_off),
    seq(NUMERIC_ROUNDABORT, $.on_off),
    seq(QUOTED_IDENTIFIER, $.on_off),
    seq(RECURSIVE_TRIGGERS, $.on_off),
  ),

  target_recovery_time_option: _ => seq(
    TARGET_RECOVERY_TIME,
    EQUAL,
    DECIMAL,
    choice(seq(SECONDS, MINUTES),)
  ),
}
