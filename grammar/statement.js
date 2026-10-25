const {
  ACTIVE,
  ALL,
  AS,
  AUTHORIZATION,
  BEGIN,
  BREAK,
  CATCH,
  CERTIFICATE,
  CLOSE,
  COLLECTION,
  CONTINUE,
  COOKIE,
  CREATE,
  CURRENT,
  DEALLOCATE,
  DECIMAL,
  DECLARE,
  DEFAULT,
  DELAY,
  DELETE,
  DIALOG,
  DISTINCT,
  DOUBLE_QUOTE_ID,
  ELSE,
  EMPTY,
  END,
  EQUAL,
  FOR,
  FROM,
  GLOBAL,
  GOTO,
  GRANT,
  IF,
  INSERT,
  INTO,
  LOCAL_ID,
  LOG,
  MESSAGE,
  NONE,
  NOWAIT,
  NULL_,
  OF,
  ON,
  OPEN,
  OPTION,
  PERCENT,
  PRINT,
  PRIVILEGES,
  PUBLIC,
  RAISERROR,
  RECEIVE,
  RETURN,
  REVERT,
  SCHEMA,
  SET,
  SETERROR,
  STRING,
  THROW,
  TIME,
  TIMEOUT,
  TO,
  TOP,
  TRY,
  TYPE,
  UPDATE,
  VALIDATION,
  VALID_XML,
  VALUES,
  WAITFOR,
  WELL_FORMED_XML,
  WHERE,
  WHILE,
  WITH,
  XMLNAMESPACES,
} = require("./lexer.js");

module.exports = {
  backup_statement: $ => choice(
    $.backup_database,
    $.backup_log,
    $.backup_certificate,
    $.backup_master_key,
    $.backup_service_master_ke,
  ),

  // Control-of-Flow Language: https://docs.microsoft.com/en-us/sql/t-sql/language-elements/control-of-flow
  cfl_statement: $ => choice(
    $.block_statement,
    $.break_statement,
    $.continue_statement,
    $.goto_statement,
    $.if_statement,
    $.print_statement,
    $.raiseerror_statement,
    $.return_statement,
    $.throw_statement,
    $.try_catch_statement,
    $.waitfor_statement,
    $.while_statemen,
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/begin-end-transact-sql
  block_statement: $ => seq(BEGIN, optional(';'), repeat($.sql_clauses), END, optional(';')),

  // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/break-transact-sql
  break_statement: _ => seq(BREAK, optional(';')),

  // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/continue-transact-sql
  continue_statement: _ => seq(CONTINUE, optional(';')),

  // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/goto-transact-sql
  goto_statement: $ => choice(
    seq(GOTO, $.id_, optional(';')),
    seq($.id_, ':', optional(';')),
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/return-transact-sql
  return_statement: $ => seq(RETURN, optional($.expression), optional(';')),

  // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/if-else-transact-sql
  if_statement: $ => seq(IF, $.search_condition, $.sql_clauses, optional(seq(ELSE, $.sql_clauses)), optional(';')),

  // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/throw-transact-sql
  throw_statement: $ => seq(THROW, optional(seq($.throw_error_number, ',', $.throw_message, ',', $.throw_state)), optional(';')),

  throw_error_number: _ => choice(
    DECIMAL,
    LOCAL_ID,
  ),

  throw_message: _ => choice(
    STRING,
    LOCAL_ID,
  ),

  throw_state: _ => choice(
    DECIMAL,
    LOCAL_ID,
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql
  try_catch_statement: $ => seq(
    BEGIN,
    TRY,
    optional(';'),
    field("try_clauses", repeat1($.sql_clauses)),
    END,
    TRY,
    optional(';'),
    BEGIN,
    CATCH,
    optional(';'),
    field("catch_clauses", repeat($.sql_clauses)),
    END,
    CATCH,
    optional(';')
  ),


  // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/waitfor-transact-sql
  waitfor_statement: $ => seq(
    WAITFOR,
    optional($.receive_statement),
    optional(','),
    optional(seq(choice(DELAY, TIME, TIMEOUT), $.time)),
    optional($.expression),
    optional(';')
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/while-transact-sql
  while_statement: $ => seq(
    WHILE,
    $.search_condition,
    choice($.sql_clauses, seq(BREAK, optional(';')), seq(CONTINUE, optional(';')))
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/print-transact-sql
  print_statement: $ => seq(
    PRINT, choice($.expression, DOUBLE_QUOTE_ID), repeat(seq(',', LOCAL_ID)), optional(';')
  ),


  // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/raiserror-transact-sql
  raiseerror_statement: $ => choice(
    seq(
      RAISERROR,
      '(',
        field("msg", choice(DECIMAL, STRING, LOCAL_ID)),
        ',',
        field("severity", $.constant_LOCAL_ID),
        ',',
        field("state", $.constant_LOCAL_ID),
        repeat(seq(',', choice($.constant_LOCAL_ID, NULL_))),
        ')',
      optional(seq(WITH, choice(LOG, SETERROR, NOWAIT))),
      optional(';')
    ),
    seq(
      RAISERROR,
      DECIMAL,
      field("formatstring", choice(STRING, LOCAL_ID, DOUBLE_QUOTE_ID)),
      repeat(seq(',', field("argument", choice(DECIMAL, STRING, LOCAL_ID))))
    )
  ),

  empty_statement: _ => ';',

  another_statement: $ => choice(
    $.alter_queue,
    $.checkpoint_statement,
    $.conversation_statement,
    $.create_contract,
    $.create_queue,
    $.cursor_statement,
    $.declare_statement,
    $.execute_statement,
    $.kill_statement,
    $.message_statement,
    $.reconfigure_statement,
    $.security_statement,
    $.set_statement,
    $.setuser_statement,
    $.shutdown_statement,
    $.transaction_statement,
    $.use_statemen,
  ),

  conversation_statement: $ => choice(
    $.begin_conversation_timer,
    $.begin_conversation_dialog,
    $.end_conversation,
    $.get_conversation,
    $.send_conversation,
    $.waitfor_conversation,
  ),

  message_statement: $ => seq(
    CREATE,
    MESSAGE,
    TYPE,
    field("message_type_name", $.id_),
    optional(seq(AUTHORIZATION, field("owner_name", $.id_))),
    seq(
      VALIDATION,
      EQUAL,
      choice(NONE, EMPTY, WELL_FORMED_XML, seq(VALID_XML, WITH, SCHEMA, COLLECTION, field("schema_collection_name", $.id_))),
    ),
  ),

  // https://msdn.microsoft.com/en-us/library/ms189835.aspx
  delete_statement: $ => seq(
    optional($.with_expression),
    DELETE,
    optional(choice(
      seq(TOP, '(', $.expression, ')', optional(PERCENT)),
      seq(TOP, DECIMAL)
    )),
    optional(FROM),
    $.delete_statement_from,
    optional($.with_table_hints),
    optional($.output_clause),
    optional(seq(FROM, $.table_sources)),
    optional(seq(
      WHERE,
      choice(
        $.search_condition,
        seq(CURRENT, OF, choice(
          seq(optional(GLOBAL), $.cursor_name),
          seq(field("cursor_var", LOCAL_ID))
        ))
      )
    )),
    optional($.for_clause),
    optional($.option_clause),
    optional(';')
  ),

  delete_statement_from: $ => choice(
    $.ddl_object,
    $.rowset_function_limited,
    seq(field("table_var", LOCAL_ID)),
  ),

  // https://msdn.microsoft.com/en-us/library/ms174335.aspx
  insert_statement: $ => seq(
    optional($.with_expression),
    INSERT,
    optional(seq(TOP, '(', $.expression, ')', optional(PERCENT))),
    optional(INTO),
    choice(
      $.ddl_object,
      $.rowset_function_limited,
    ),
    optional($.with_table_hints),
    optional(seq('(', $.insert_column_name_list, ')')),
    optional($.output_clause),
    $.insert_statement_value,
    optional($.for_clause),
    optional($.option_clause),
    optional(';'),
  ),

  insert_statement_value: $ => choice(
    $.table_value_constructor,
    $.derived_table,
    $.execute_statement,
    seq(DEFAULT, VALUES),
  ),

  receive_statement: $ => seq(
    optional('('),
      RECEIVE,
      choice(seq(ALL, DISTINCT, $.top_clause, '*')),
      repeat(seq(LOCAL_ID, '=', $.expression, optional(','))),
      FROM,
      $.full_table_name,
      optional(seq(INTO, field("table_variable", $.id_),
        seq(WHERE, field("where", $.search_condition)))),
      optional(')')
  ),

  // https://msdn.microsoft.com/en-us/library/ms189499.aspx
  select_statement_standalone: $ => seq(optional($.with_expression), $.select_statement),

  select_statement: $ => seq(
    $.query_expression,
    optional($.select_order_by_clause),
    optional($.for_clause),
    optional($.option_clause),
    optional(';')
  ),

  // https://msdn.microsoft.com/en-us/library/ms177523.aspx
  update_statement: $ => seq(
    optional($.with_expression),
    UPDATE,
    optional(choice(
      seq(TOP, '(', $.expression, ')', optional(PERCENT)),
      seq(TOP, DECIMAL)
    )),
    choice(
      $.ddl_object,
      $.rowset_function_limited
    ),
    optional($.with_table_hints),
    SET,
    $.update_elem,
    repeat(seq(',', $.update_elem)),
    optional($.output_clause),
    optional(seq(FROM, $.table_sources)),
    optional(seq(
      WHERE,
      choice(
        $.search_condition,
        seq(CURRENT, OF, choice(
          seq(optional(GLOBAL), $.cursor_name),
          seq(field("cursor_var", LOCAL_ID))
        ))
      )
    )),
    optional($.for_clause),
    optional($.option_clause),
    optional(';')
  ),

  // https://msdn.microsoft.com/en-us/library/ms188927.aspx
  declare_statement: $ => choice(
    seq(DECLARE, LOCAL_ID, optional(AS), choice($.data_type, $.table_type_definition, $.table_name)),
    seq(DECLARE, field('loc', $.declare_local), repeat(seq(',', field('loc', $.declare_local)))),
    seq(DECLARE, LOCAL_ID, optional(AS), $.xml_type_definition),
    seq(WITH, XMLNAMESPACES, '(', field('xml_dec', $.xml_declaration), repeat(seq(',', field('xml_dec', $.xml_declaration))), ')'),
  ),

  xml_declaration: $ => choice(
    seq(field("xml_namespace_uri", STRING), AS, $.id_),
    seq(DEFAULT, STRING),
  ),

  // https://msdn.microsoft.com/en-us/library/ms181441(v=sql.120).aspx
  cursor_statement: $ => choice(
    // https://msdn.microsoft.com/en-us/library/ms175035(v=sql.120).aspx
    seq(CLOSE, optional(GLOBAL), $.cursor_name, optional(';')),
    // https://msdn.microsoft.com/en-us/library/ms188782(v=sql.120).aspx
    seq(DEALLOCATE, optional(GLOBAL), $.cursor_name, optional(';')),
    // https://msdn.microsoft.com/en-us/library/ms180169(v=sql.120).aspx
    seq($.declare_cursor),
    // https://msdn.microsoft.com/en-us/library/ms180152(v=sql.120).aspx
    seq($.fetch_cursor),
    // https://msdn.microsoft.com/en-us/library/ms190500(v=sql.120).aspx
    seq(OPEN, optional(GLOBAL), $.cursor_name, optional(';')),
  ),

  // https://msdn.microsoft.com/en-us/library/ff848791.aspx
  security_statement: $ => choice(
      // https://msdn.microsoft.com/en-us/library/ms188354.aspx: $ => (
      seq($.execute_clause, optional(';')),
      seq(
        GRANT,
        choice(
          seq(ALL, optional(PRIVILEGES)),
          $.grant_permission,
          optional(seq('(', $.column_name_list, ')'))
        ),
        optional(seq(ON, optional(seq($.class_type_for_grant, '::')), field("on_id", $.table_name))),
        TO,
        field("to_principal", $.principal_id),
        repeat(seq(',', field("to_principal", $.principal_id))),
        optional(seq(WITH, GRANT, OPTION)),
        optional(seq(AS, field("as_principal", $.principal_id))),
        optional(';')
      ),
      seq(REVERT, optional(seq(WITH, COOKIE, '=', LOCAL_ID),), optional(';')),
      $.open_key,
      $.close_key,
      $.create_key,
      $.create_certificat,
  ),

  principal_id: $ => choice($.id_, PUBLIC),

  create_certificate: $ => seq(
    CREATE,
    CERTIFICATE,
    field("certificate_name", $.id_),
    optional(seq(AUTHORIZATION, field("user_name", $.id_))),
    choice(seq(FROM, $.existing_keys), $.generate_new_key),
    optional(seq(ACTIVE, FOR, BEGIN, DIALOG, '=', $.on_off))
  ),

  // https://msdn.microsoft.com/en-us/library/ms190356.aspx
  // https://msdn.microsoft.com/en-us/library/ms189484.aspx
  set_statement: $ => choice(
    seq(SET, LOCAL_ID, optional(seq('.', field("member_name", $.id_))), '=', $.expression),
    seq(SET, LOCAL_ID, $.assignment_operator, $.expression),
    seq(
      SET,
      LOCAL_ID,
      '=',
      CURSOR,
      $.declare_set_cursor_common,
      optional(seq(
        FOR,
        choice(
          seq(READ, ONLY),
          seq(UPDATE, optional(seq(OF, $.column_name_list)))
        )
      )),
    ),
    // https://msdn.microsoft.com/en-us/library/ms189837.aspx
    $.set_special,
  ),

  // https://msdn.microsoft.com/en-us/library/ms174377.aspx
  transaction_statement: $ => choice(
    // https://msdn.microsoft.com/en-us/library/ms188386.aspx
    seq(BEGIN, DISTRIBUTED, choice(seq(TRAN, TRANSACTION),), optional(choice(seq($.id_, LOCAL_ID),))),
    // https://msdn.microsoft.com/en-us/library/ms188929.aspx
    seq(BEGIN, choice(seq(TRAN, TRANSACTION),), optional(choice(seq($.id_, LOCAL_ID),), optional(seq(WITH, MARK, STRING)))),
    // https://msdn.microsoft.com/en-us/library/ms190295.aspx
    seq(COMMIT, choice(seq(TRAN, TRANSACTION),), optional(choice(
      seq(($.id_, LOCAL_ID), optional(seq(WITH, '(', DELAYED_DURABILITY, EQUAL, choice(seq(OFF, ON),), ')'),))
    ))),
    // https://msdn.microsoft.com/en-us/library/ms178628.aspx
    seq(COMMIT, optional(WORK)),
    seq(COMMIT, $.id_),
    seq(ROLLBACK, $.id_),
    // https://msdn.microsoft.com/en-us/library/ms181299.aspx
    seq(ROLLBACK, choice(seq(TRAN, TRANSACTION),), optional(choice(seq($.id_, LOCAL_ID),))),
    // https://msdn.microsoft.com/en-us/library/ms174973.aspx
    seq(ROLLBACK, optional(WORK)),
    // https://msdn.microsoft.com/en-us/library/ms188378.aspx
    seq(SAVE, choice(seq(TRAN, TRANSACTION),), optional(choice(seq($.id_, LOCAL_ID),))),
  ),

  // https://msdn.microsoft.com/en-us/library/ms188037.aspx
  go_statement: _ => seq(GO, optional(seq(field("count", DECIMAL)))),

  // https://msdn.microsoft.com/en-us/library/ms188366.aspx
  use_statement: $ => seq(USE, field("database", $.id_)),

  setuser_statement: _ => seq(SETUSER, field("user", optional(STRING))),

  // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/reconfigure-transact-sql
  reconfigure_statement: _ => seq(RECONFIGURE, optional(seq(WITH, OVERRIDE))),

  // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/shutdown-transact-sql
  shutdown_statement: _ => seq(SHUTDOWN, optional(seq(WITH, NOWAIT))),

  checkpoint_statement: _ => seq(CHECKPOINT, optional(seq(field("checkPointDuration", DECIMAL)))),
}
