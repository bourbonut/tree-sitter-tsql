const {
  ALL,
  ASYMMETRIC,
  AUDIT,
  AUTHORIZATION,
  BINDING,
  BY,
  CATALOG,
  CERTIFICATE,
  COLLECTION,
  COLUMN,
  COMMA,
  CONTRACT,
  COUNTER,
  CREDENTIAL,
  CRYPTOGRAPHIC,
  DATA,
  DATABASE,
  DEFAULT,
  DOT,
  DROP,
  ENCRYPTION,
  ENDPOINT,
  EVENT,
  EXISTS,
  EXTERNAL,
  FILE,
  FORMAT,
  FROM,
  FULLTEXT,
  FUNCTION,
  GROUP,
  IF,
  INDEX,
  KEY,
  LIBRARY,
  LIST,
  LOGIN,
  MASTER,
  MESSAGE,
  NOTIFICATION,
  ON,
  PARTITION,
  POLICY,
  POOL,
  PROC,
  PROCEDURE,
  PROPERTY,
  PROVIDER,
  QUEUE,
  REMOTE,
  REMOVE,
  RESOURCE,
  ROLE,
  ROUTE,
  RULE,
  SCHEMA,
  SCHEME,
  SCOPED,
  SEARCH,
  SECURITY,
  SEQUENCE,
  SERVER,
  SERVICE,
  SESSION,
  SIGNATURE,
  SOURCE,
  SPECIFICATION,
  STATISTICS,
  STOPLIST,
  SYMMETRIC,
  SYNONYM,
  TABLE,
  TRIGGER,
  TYPE,
  USER,
  VIEW,
  WORKLOAD,
  XML,
} = require("./lexer.js");

module.exports = {
  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-certificate-transact-sql
  drop_certificate: $ => seq(DROP, CERTIFICATE, field("certificate_name", $.id_)),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-column-encryption-key-transact-sql
  drop_column_encryption_key: $ => seq(DROP, COLUMN, ENCRYPTION, KEY, field("key_name", $.id_)),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-column-master-key-transact-sql
  drop_column_master_key: $ => seq(DROP, COLUMN, MASTER, KEY, field("key_name", $.id_)),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-contract-transact-sql
  drop_contract: $ => seq(DROP, CONTRACT, field("dropped_contract_name", $.id_)),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-credential-transact-sql
  drop_credential: $ => seq(DROP, CREDENTIAL, field("credential_name", $.id_)),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-cryptographic-provider-transact-sql
  drop_cryptograhic_provider: $ => seq(DROP, CRYPTOGRAPHIC, PROVIDER, field("provider_name", $.id_)),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-database-transact-sql
  drop_database: $ => seq(
    DROP,
    DATABASE,
    optional(seq(IF, EXISTS)),
    repeat1(seq(optional(COMMA), field("database_name_or_database_snapshot_name", $.id_)))
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-database-audit-specification-transact-sql
  drop_database_audit_specification: $ => seq(
    DROP, DATABASE, AUDIT, SPECIFICATION, field("audit_specification_name", $.id_)
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-database-encryption-key-transact-optional($.sql)view=sql-server-ver15
  drop_database_encryption_key: _ => seq(DROP, DATABASE, ENCRYPTION, KEY),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-database-scoped-credential-transact-sql
  drop_database_scoped_credential: $ => seq(DROP, DATABASE, SCOPED, CREDENTIAL, field("credential_name", $.id_)),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-default-transact-sql
  drop_default: $ => seq(
    DROP,
    DEFAULT,
    optional(seq(IF, EXISTS)),
    seq(optional(COMMA), optional(seq(field("schema_name", $.id_), DOT)), field("default_name", $.id_))
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-endpoint-transact-sql
  drop_endpoint: $ => seq(DROP, ENDPOINT, field("endPointName", $.id_)),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-external-data-source-transact-sql
  drop_external_data_source: $ => seq(DROP, EXTERNAL, DATA, SOURCE, field("external_data_source_name", $.id_)),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-external-file-format-transact-sql
  drop_external_file_format: $ => seq(DROP, EXTERNAL, FILE, FORMAT, field("external_file_format_name", $.id_)),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-external-library-transact-sql
  drop_external_library: $ => seq(
    DROP,
    EXTERNAL,
    LIBRARY,
    field("library_name", $.id_),
    optional(seq(AUTHORIZATION, field("owner_name", $.id_)))
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-external-resource-pool-transact-sql
  drop_external_resource_pool: $ => seq(DROP, EXTERNAL, RESOURCE, POOL, field("pool_name", $.id_)),


  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-external-table-transact-sql
  drop_external_table: $ => seq(
    DROP,
    EXTERNAL,
    TABLE,
    optional(seq(field("database_name", $.id_), DOT)),
    optional(seq(field("schema_name", $.id_), DOT)),
    field("table", $.id_)
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-event-notification-transact-sql
  drop_event_notifications: $ => seq(
    DROP,
    EVENT,
    NOTIFICATION,
    repeat1(seq(optional(COMMA), field("notification_name", $.id_))),
    ON,
    choice(
      SERVER,
      DATABASE,
      seq(QUEUE, field("queue_name", $.id_))
    ),
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-event-session-transact-sql
  drop_event_session: $ => seq(
    DROP,
    EVENT,
    SESSION,
    field("event_session_name", $.id_),
    ON,
    SERVER
  ),


  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-fulltext-catalog-transact-sql
  drop_fulltext_catalog: $ => seq(
    DROP,
    FULLTEXT,
    CATALOG,
    field("catalog_name", $.id_)
  ),


  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-fulltext-index-transact-sql
  drop_fulltext_index: $ => seq(
    DROP,
    FULLTEXT,
    INDEX,
    ON,
    optional(seq(field("schema", $.id_), DOT)),
    field("table", $.id_)
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-fulltext-stoplist-transact-sql
  drop_fulltext_stoplist: $ => seq(DROP, FULLTEXT, STOPLIST, field("stoplist_name", $.id_)),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-login-transact-sql
  drop_login: $ => seq(DROP, LOGIN, field("login_name", $.id_)),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-master-key-transact-sql
  drop_master_key: _ => seq(DROP, MASTER, KEY),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-message-type-transact-sql
  drop_message_type: $ => seq(DROP, MESSAGE, TYPE, field("message_type_name", $.id_)),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-partition-function-transact-sql
  drop_partition_function: $ => seq(DROP, PARTITION, FUNCTION, field("partition_function_name", $.id_)),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-partition-scheme-transact-sql
  drop_partition_scheme: $ => seq(DROP, PARTITION, SCHEME, field("partition_scheme_name", $.id_)),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-queue-transact-sql
  drop_queue: $ => seq(
    DROP,
    QUEUE,
    optional(seq(field("database_name", $.id_), DOT),),
    optional(seq(field("schema_name", $.id_), DOT),),
    field("queue_name", $.id_)
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-remote-service-binding-transact-sql
  drop_remote_service_binding: $ => seq(DROP, REMOTE, SERVICE, BINDING, field("binding_name", $.id_)),


  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-resource-pool-transact-sql
  drop_resource_pool: $ => seq(DROP, RESOURCE, POOL, field("pool_name", $.id_)),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-role-transact-sql
  drop_db_role: $ => seq(DROP, ROLE, optional(seq(IF, EXISTS)), field("role_name", $.id_)),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-route-transact-sql
  drop_route: $ => seq(DROP, ROUTE, field("route_name", $.id_)),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-rule-transact-sql
  drop_rule: $ => seq(
    DROP,
    RULE,
    optional(seq(IF, EXISTS)),
    optional(seq(optional(COMMA), optional(seq(field("schema_name", $.id_), DOT)), field("rule_name", $.id_)))
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-schema-transact-sql
  drop_schema: $ => seq(DROP, SCHEMA, optional(seq(IF, EXISTS)), field("schema_name", $.id_)),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-search-property-list-transact-sql
  drop_search_property_list: $ => seq(DROP, SEARCH, PROPERTY, LIST, field("property_list_name", $.id_)),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-security-policy-transact-sql
  drop_security_policy: $ => seq(DROP, SECURITY, POLICY, optional(seq(IF, EXISTS)), optional(seq(field("schema_name", $.id_), DOT)), field("security_policy_name", $.id_)),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-sequence-transact-sql
  drop_sequence: $ => seq(
    DROP, SEQUENCE, optional(seq(IF, EXISTS)), optional(
      seq(
        optional(COMMA),
        optional(field("database_name", $.id_), DOT),
        optional(seq(field("schema_name", $.id_), DOT)),
        field("sequence_name", $.id_)
      ),
    ),
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-server-audit-transact-sql
  drop_server_audit: $ => seq(DROP, SERVER, AUDIT, field("audit_name", $.id_)),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-server-audit-specification-transact-sql
  drop_server_audit_specification: $ => seq(
    DROP,
    SERVER,
    AUDIT,
    SPECIFICATION,
    field("audit_specification_name", $.id_)
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-server-role-transact-sql
  drop_server_role: $ => seq(DROP, SERVER, ROLE, field("role_name", $.id_)),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-service-transact-sql
  drop_service: $ => seq(DROP, SERVICE, field("dropped_service_name", $.id_)),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-signature-transact-sql
  drop_signature: $ => seq(
    DROP,
    optional(COUNTER),
    SIGNATURE,
    FROM,
    optional(seq(field("schema_name", $.id_), DOT)),
    field("module_name", $.id_),
    BY,
    repeat1(
      choice(
        seq(optional(COMMA), CERTIFICATE, field("cert_name", $.id_)),
        seq(optional(COMMA), ASYMMETRIC, KEY, field("Asym_key_name", $.id_))
      ),
    ),
  ),

  drop_statistics_name_azure_dw_and_pdw: $ => seq(
    DROP,
    STATISTICS,
    optional(seq(field("schema_name", $.id_), DOT)),
    field("object_name", $.id_),
    DOT,
    field("statistics_name", $.id_)
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-symmetric-key-transact-sql
  drop_symmetric_key: $ => seq(
    DROP,
    SYMMETRIC,
    KEY,
    field("symmetric_key_name", $.id_),
    optional(seq(REMOVE, PROVIDER, KEY))
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-synonym-transact-sql
  drop_synonym: $ => seq(
    DROP,
    SYNONYM,
    optional(seq(IF, EXISTS),),
    optional(seq(field("schema", $.id_), DOT)),
    field("synonym_name", $.id_)
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-user-transact-sql
  drop_user: $ => seq(
    DROP,
    USER,
    optional(seq(IF, EXISTS)),
    field("user_name", $.id_)
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-workload-group-transact-sql
  drop_workload_group: $ => seq(DROP, WORKLOAD, GROUP, field("group_name", $.id_)),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-xml-schema-collection-transact-sql
  drop_xml_schema_collection: $ => seq(
    DROP,
    XML,
    SCHEMA,
    COLLECTION,
    optional(seq(field("relational_schema", $.id_), DOT)),
    field("sql_identifier", $.id_)
  ),

    // https://msdn.microsoft.com/en-us/library/ms176118.aspx
    drop_index: $ => (
            seq(DROP, INDEX, optional(seq(IF, EXISTS),), choice(
        seq($.drop_relational_or_xml_or_spatial_index, (',', $.drop_relational_or_xml_or_spatial_index)*),
        seq($.drop_backward_compatible_index, repeat(seq(',', $.drop_backward_compatible_index),))
        ), optional(';')),
    ),

    drop_relational_or_xml_or_spatial_index: $ => (
            seq(field("index_name", $.id_), ON, $.full_table_name),
    ),

    drop_backward_compatible_index: $ => (
            seq(optional(seq(field("owner_name", $.id_), '.'),), field("table_or_view_name", $.id_), '.', field("index_name", $.id_)),
    ),

    // https://msdn.microsoft.com/en-us/library/ms174969.aspx
    drop_procedure: $ => (
            seq(DROP, $.proc, =, choice(seq(PROC, PROCEDURE),), optional(seq(IF, EXISTS),), $.func_$.proc_name_schema, repeat(seq(',', $.func_proc_name_schema),), optional(';')),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-trigger-transact-sql
    drop_trigger: $ => choice(
        $.drop_dml_trigger,
        $.drop_ddl_trigge,
    ),

    drop_dml_trigger: $ => (
            seq(DROP, TRIGGER, optional(seq(IF, EXISTS),), $.simple_name, repeat(seq(',', $.simple_name),), optional(';')),
    ),

    drop_ddl_trigger: $ => (
            seq(DROP, TRIGGER, optional(seq(IF, EXISTS),), $.simple_name, repeat(seq(',', $.simple_name),), ON, choice(seq(DATABASE, ALL, SERVER),), optional(';')),
    ),

    // https://msdn.microsoft.com/en-us/library/ms190290.aspx
    drop_function: $ => (
            seq(DROP, FUNCTION, optional(seq(IF, EXISTS),), $.func_proc_name_schema, repeat(seq(',', $.func_proc_name_schema),), optional(';')),
    ),

    // https://msdn.microsoft.com/en-us/library/ms175075.aspx
    drop_statistics: $ => (
            seq(DROP, STATISTICS, repeat1(seq(optional(COMMA), optional(seq($.table_name, '.'),), field("name", $.id_))), ';'),
    ),

    // https://msdn.microsoft.com/en-us/library/ms173790.aspx
    drop_table: $ => (
            seq(DROP, TABLE, optional(seq(IF, EXISTS),), $.table_name, repeat(seq(',', $.table_name),), optional(';')),
    ),

    // https://msdn.microsoft.com/en-us/library/ms173492.aspx
    drop_view: $ => (
            seq(DROP, VIEW, optional(seq(IF, EXISTS),), $.simple_name, repeat(seq(',', $.simple_name),), optional(';')),
    ),

    drop_type: $ => (
            seq(DROP, TYPE, optional(seq(IF, EXISTS),), field("name", $.simple_name)),
    ),
}
