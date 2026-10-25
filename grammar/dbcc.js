const {
  ALL,
  ALL_CONSTRAINTS,
  ALL_ERRORMSGS,
  ALL_INDEXES,
  ALL_LEVELS,
  BACKUP_CLONED,
  CHECKALLOC,
  CHECKCATALOG,
  CHECKCONSTRAINTS,
  CHECKDB,
  CHECKFILEGROUP,
  CHECKTABLE,
  CLEANTABLE,
  CLONEDATABASE,
  COMPUTE,
  DATA_PURITY,
  DBCC,
  DBREINDEX,
  DECIMAL,
  DEFAULT,
  DROPCLEANBUFFERS,
  ESTIMATEONL,
  ESTIMATEONLY,
  EXTENDED_LOGICAL_CHECKS,
  FAST,
  FREE,
  GB,
  IGNORE_REPLICATED_TABLE_CACHE,
  MAXDOP,
  MB,
  NOINDEX,
  NO_INFOMSG,
  NO_INFOMSGS,
  NO_QUERYSTORE,
  NO_STATISTICS,
  PDW_SHOWSPACEUSED,
  PHYSICAL_ONLY,
  PROCCACHE,
  REPAIR_ALLOW_DATA_LOSS,
  REPAIR_FAST,
  REPAIR_REBUIL,
  REPAIR_REBUILD,
  SERVICEBROKER,
  SHOWCONTIG,
  SHRINKLOG,
  SIZE,
  STRING,
  TABLERESULTS,
  TABLOCK,
  TB,
  VERIFY_CLONEDB,
  WITH,
} = require("./lexer.js");

module.exports = {
  dbcc_checkalloc_option: $ => choice(
    ALL_ERRORMSGS,
    NO_INFOMSGS,
    TABLOCK,
    ESTIMATEONL,
  ),

  // https://learn.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-checkalloc-transact-optional($.sql)view=sql-server-ver16
  dbcc_checkalloc: $ => (
    seq(field("name", CHECKALLOC), optional(choice(
      seq('(', (field("database", $.id_), field("databaseid", STRING), DECIMAL), (),
        seq(',', NOINDEX),
        seq(',', (, REPAIR_ALLOW_DATA_LOSS, REPAIR_FAST, REPAIR_REBUILD)),
        seq()?, ')', optional(
          seq(WITH, field("dbcc_option", $.dbcc_checkalloc_option), repeat(seq(',', field("dbcc_option", $.dbcc_checkalloc_option))))
        ),)
    ),)),
  ),

  // https://learn.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-checkcatalog-transact-optional($.sql)view=sql-server-ver16
  dbcc_checkcatalog: $ => (
    seq(field("name", CHECKCATALOG), optional(seq('(', choice(seq(field("database", $.id_), field("databasename", STRING), DECIMAL),), ')'),), optional(
      seq(WITH, field("dbcc_option", NO_INFOMSGS))
    ),),
  ),

  dbcc_checkconstraints_option: $ => choice(
    ALL_CONSTRAINTS,
    ALL_ERRORMSGS,
    NO_INFOMSG,
  ),

  // https://learn.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-checkconstraints-transact-optional($.sql)view=sql-server-ver16
  dbcc_checkconstraints: $ => (
    seq(field("name", CHECKCONSTRAINTS), optional(
      seq('(', choice(seq(field("table_or_constraint", $.id_), field("table_or_constraint_name", STRING))), ')')
    ), optional(
      seq(WITH, field("dbcc_option", $.dbcc_checkconstraints_option), repeat(
        seq(',', field("dbcc_option", $.dbcc_checkconstraints_option))
      ),)
    ),),
  ),

  dbcc_checkdb_table_option: $ => choice(
    ALL_ERRORMSGS,
    EXTENDED_LOGICAL_CHECKS,
    NO_INFOMSGS,
    TABLOCK,
    ESTIMATEONLY,
    PHYSICAL_ONLY,
    DATA_PURITY,
    seq(MAXDOP, '=', field("max_dregree_of_parallelism", DECIMAL)),
  ),

  // https://learn.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-checkdb-transact-optional($.sql)view=sql-server-ver16
  dbcc_checkdb: $ => (
    seq(field("name", CHECKDB), optional(choice(
      seq('(', (field("database", $.id_), field("databasename", STRING), DECIMAL), optional(
        seq(',', choice(seq(NOINDEX, REPAIR_ALLOW_DATA_LOSS, REPAIR_FAST, REPAIR_REBUILD),))
      ), ')')
    ),), optional(
      seq(WITH, field("dbcc_option", $.dbcc_checkdb_table_option), repeat(seq(',', field("dbcc_option", $.dbcc_checkdb_table_option))))
    ),),
  ),

  dbcc_checkfilegroup_option: $ => choice(
    ALL_ERRORMSGS,
    NO_INFOMSGS,
    TABLOCK,
    ESTIMATEONLY,
    PHYSICAL_ONLY,
    seq(MAXDOP, '=', field("max_dregree_of_parallelism", DECIMAL)),
  ),

  // https://learn.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-checkfilegroup-transact-optional($.sql)view=sql-server-ver16
  // Additional parameters: https://dbtut.com/index.php/2019/01/01/dbcc-checkfilegroup-command-on-sql-server/
  dbcc_checkfilegroup: $ => (
    seq(field("name", CHECKFILEGROUP), optional(choice(
      seq('(', (field("filegroup_id", DECIMAL), field("filegroup_name", STRING)), optional(
        seq(',', choice(seq(NOINDEX, REPAIR_ALLOW_DATA_LOSS, REPAIR_FAST, REPAIR_REBUILD),))
      ), ')')
    ),), optional(
      seq(WITH, field("dbcc_option", $.dbcc_checkfilegroup_option), repeat(
        seq(',', field("dbcc_option", $.dbcc_checkfilegroup_option))
      ),)
    ),),
  ),

  // https://learn.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-checktable-transact-optional($.sql)view=sql-server-ver16
  dbcc_checktable: $ => (
    seq(field("name", CHECKTABLE), '(', field("table_or_view_name", STRING), optional(
      seq(',', choice(
        NOINDEX,
        seq(field("index_id", $.expression)),
        REPAIR_ALLOW_DATA_LOSS,
        REPAIR_FAST,
        REPAIR_REBUIL
      ),)
    ), ')', optional(
      seq(WITH, field("dbcc_option", $.dbcc_checkdb_table_option), repeat(seq(',', field("dbcc_option", $.dbcc_checkdb_table_option))))
    ),),
  ),

  // https://learn.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-cleantable-transact-optional($.sql)view=sql-server-ver16
  dbcc_cleantable: $ => (
    seq(field("name", CLEANTABLE), '(', choice(seq(field("database", $.id_), field("databasename", STRING), DECIMAL),), ',', choice(
      seq(field("table_or_view", $.id_)),
      seq(field("table_or_view_name", STRING))
    ), optional(seq(',', field("batch_size", DECIMAL))), ')', optional(seq(WITH, field("dbcc_option", NO_INFOMSGS)),)),
  ),

  dbcc_clonedatabase_option: $ => choice(
    NO_STATISTICS,
    NO_QUERYSTORE,
    SERVICEBROKER,
    VERIFY_CLONEDB,
    BACKUP_CLONED,
  ),

  // https://learn.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-clonedatabase-transact-optional($.sql)view=sql-server-ver16
  dbcc_clonedatabase: $ => (
    seq(field("name", CLONEDATABASE), '(', field("source_database", $.id_), ',', field("target_database", $.id_), ')', optional(
      seq(WITH, field("dbcc_option", $.dbcc_clonedatabase_option), repeat(seq(',', field("dbcc_option", $.dbcc_clonedatabase_option))))
    ),),
  ),

  // https://learn.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-pdw-showspaceused-transact-optional($.sql)view=aps-pdw-2016-au7
  dbcc_pdw_showspaceused: $ => (
    seq(field("name", PDW_SHOWSPACEUSED), optional(seq('(', field("tablename", $.id_), ')'),), optional(
      seq(WITH, field("dbcc_option", IGNORE_REPLICATED_TABLE_CACHE))
    ),),
  ),

  // https://learn.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-proccache-transact-optional($.sql)view=sql-server-ver16
  dbcc_proccache: $ => (
    seq(field("name", PROCCACHE), optional(seq(WITH, field("dbcc_option", NO_INFOMSGS)))),
  ),

  dbcc_showcontig_option: $ => choice(
    ALL_INDEXES,
    TABLERESULTS,
    FAST,
    ALL_LEVELS,
    NO_INFOMSG,
  ),

  // https://learn.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-showcontig-transact-optional($.sql)view=sql-server-ver16
  dbcc_showcontig: $ => (
    seq(field("name", SHOWCONTIG), optional(seq('(', field("table_or_view", $.expression), optional(seq(',', field("index", $.expression))), ')'),), optional(
      seq(WITH, field("dbcc_option", $.dbcc_showcontig_option), repeat(seq(',', $.dbcc_showcontig_option),))
    ),),
  ),

  // https://learn.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-shrinklog-azure-sql-data-optional($.warehouse)view=aps-pdw-2016-au7
  dbcc_shrinklog: $ => (
    seq(field("name", SHRINKLOG), optional(seq('(', SIZE, '=', choice(seq((seq(DECIMAL, choice(seq(MB, GB, TB),))), DEFAULT),), ')'),), optional(
      seq(WITH, field("dbcc_option", NO_INFOMSGS))
    ),),
  ),

  // https://learn.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-dbreindex-transact-optional($.sql)view=sql-server-ver16
  dbcc_dbreindex: $ => (
    seq(field("name", DBREINDEX), '(', field("table", $.id_or_string), optional(
      seq(',', field("index_name", $.id_or_string), optional(seq(',', field("fillfactor", $.expression))))
    ), ')', optional(seq(WITH, field("dbcc_option", NO_INFOMSGS)))),
  ),

  // https://learn.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-dllname-free-transact-optional($.sql)view=sql-server-ver16
  dbcc_dll_free: $ => (
    seq(field("dllname", $.id_), '(', field("name", FREE), ')', optional(seq(WITH, field("dbcc_option", NO_INFOMSGS)))),
  ),

  // https://learn.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-dropcleanbuffers-transact-optional($.sql)view=sql-server-ver16
  dbcc_dropcleanbuffers: $ => (
    seq(field("name", DROPCLEANBUFFERS), optional(choice(seq('(', COMPUTE, ALL, ')'),)), optional(seq(WITH, field("dbcc_option", NO_INFOMSGS)))),
  ),

  dbcc_clause: $ => (
    seq(DBCC, choice(
      $.dbcc_checkalloc,
      $.dbcc_checkcatalog,
      $.dbcc_checkconstraints,
      $.dbcc_checkdb,
      $.dbcc_checkfilegroup,
      $.dbcc_checktable,
      $.dbcc_cleantable,
      $.dbcc_clonedatabase,
      $.dbcc_dbreindex,
      $.dbcc_dll_free,
      $.dbcc_dropcleanbuffers,
      $.dbcc_pdw_showspaceused,
      $.dbcc_proccache,
      $.dbcc_showcontig,
      $.dbcc_shrinklo
    ),),
  ),
}
