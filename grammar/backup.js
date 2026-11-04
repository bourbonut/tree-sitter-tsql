const {
  AES_128,
  AES_192,
  AES_256,
  ALGORITHM,
  ASYMMETRIC,
  BACKUP,
  BLOCKSIZE,
  BUFFERCOUNT,
  BY,
  CERTIFICATE,
  CHECKSUM,
  COMMA,
  COMPRESSION,
  CONTINUE_AFTER_ERROR,
  COPY_ONLY,
  CREDENTIAL,
  DATABASE,
  DECIMAL,
  DECRYPTION,
  DESCRIPTION,
  DIFFERENTIAL,
  ENCRYPTION,
  EQUAL,
  EXPIREDATE,
  FILE,
  FILE_SNAPSHOT,
  FORMAT,
  INIT,
  KEY,
  LOAD,
  LOG,
  LR_BRACKET,
  MASTER,
  MAXTRANSFER,
  MEDIADESCRIPTION,
  MEDIANAME,
  MIRROR,
  NAME,
  NOFORMAT,
  NOINIT,
  NORECOVERY,
  NOREWIND,
  NOSKIP,
  NOUNLOAD,
  NO_CHECKSUM,
  NO_COMPRESSION,
  NO_TRUNCATE,
  PASSWORD,
  PRIVATE,
  READ_WRITE_FILEGROUPS,
  RESTART,
  RETAINDAYS,
  REWIND,
  RR_BRACKET,
  SERVER,
  SERVICE,
  SKIP_KEYWORD,
  STANDBY,
  STATS,
  STOP_ON_ERROR,
  STRING,
  TO,
  TRIPLE_DES_3KE,
  WITH,
} = require("./lexer.js");

module.exports = {
  // https://docs.microsoft.com/en-us/sql/t-sql/statements/backup-transact-sql
  backup_database: $ => seq(
    BACKUP,
    DATABASE,
    field("database_name", $.id_),
    optional(seq(
      READ_WRITE_FILEGROUPS,
      repeat(seq(
        optional(COMMA),
        choice(FILE, FILEGROUP),
        EQUAL,
        field("file_or_filegroup", STRING)
      ))
    )),
    repeat(seq(
      optional(COMMA),
      choice(FILE, FILEGROUP),
      EQUAL,
      field("file_or_filegroup", STRING)
    )),
    choice(
      seq(TO, repeat1(optional(COMMA), field("logical_device_name", $.id_))),
      seq(TO, repeat1(optional(COMMA), choice(DISK, TAPE, URL), EQUAL, choice(STRING, $.id_))),
    ),
    choice(
      repeat1(seq(MIRROR, TO, repeat1(optional(COMMA), field("logical_device_name", $.id_)))),
      repeat1(seq(MIRROR, TO, repeat1(optional(COMMA), choice(DISK, TAPE, URL), EQUAL, choice(STRING, $.id_)))),
    ),
    optional(
      seq(
        WITH,
        repeat(choice(
          seq(optional(COMMA), DIFFERENTIAL),
          seq(optional(COMMA), COPY_ONLY),
          seq(optional(COMMA), choice(COMPRESSION, NO_COMPRESSION)),
          seq(optional(COMMA), DESCRIPTION, EQUAL, choice(STRING, $.id_)),
          seq(optional(COMMA), NAME, EQUAL, field("backup_set_name", $.id_)),
          seq(optional(COMMA), CREDENTIAL),
          seq(optional(COMMA), FILE_SNAPSHOT),
          seq(optional(COMMA), seq(EXPIREDATE, EQUAL, choice(STRING, $.id_), RETAINDAYS, EQUAL, choice(DECIMAL, $.id_))),
          seq(optional(COMMA), choice(NOINIT, INIT)),
          seq(optional(COMMA), choice(NOSKIP, SKIP_KEYWORD)),
          seq(optional(COMMA), choice(NOFORMAT, FORMAT)),
          seq(optional(COMMA), MEDIADESCRIPTION, EQUAL, choice(STRING, $.id_)),
          seq(optional(COMMA), MEDIANAME, EQUAL, field("medianame", STRING)),
          seq(optional(COMMA), BLOCKSIZE, EQUAL, choice(DECIMAL, $.id_)),
          seq(optional(COMMA), BUFFERCOUNT, EQUAL, choice(DECIMAL, $.id_)),
          seq(optional(COMMA), MAXTRANSFER, EQUAL, choice(DECIMAL, $.id_)),
          seq(optional(COMMA), choice(NO_CHECKSUM, CHECKSUM)),
          seq(optional(COMMA), choice(STOP_ON_ERROR, CONTINUE_AFTER_ERROR)),
          seq(optional(COMMA), RESTART),
          seq(optional(COMMA), STATS, optional(seq(EQUAL, field("stats_percent", DECIMAL)))),
          seq(optional(COMMA), choice(REWIND, NOREWIND)),
          seq(optional(COMMA), choice(LOAD, NOUNLOAD)),
          seq(
            optional(COMMA),
            ENCRYPTION,
            LR_BRACKET,
            ALGORITHM,
            EQUAL,
            choice(AES_128, AES_192, AES_256, TRIPLE_DES_3KE),
            COMMA,
            SERVER,
            CERTIFICATE,
            EQUAL,
            choice(seq(field("encryptor_name", $.id_)), seq(SERVER, ASYMMETRIC, KEY, EQUAL, field("encryptor_name", $.id_)))
          )
        ))
      )
    ),
  ),

  backup_log: $ => seq(
    BACKUP,
    LOG,
    field("database_name", $.id_),
    optional(seq(
      READ_WRITE_FILEGROUPS,
      repeat(seq(
        optional(COMMA),
        choice(FILE, FILEGROUP),
        EQUAL,
        field("file_or_filegroup", STRING)
      ))
    )),
    repeat(seq(
      optional(COMMA),
      choice(FILE, FILEGROUP),
      EQUAL,
      field("file_or_filegroup", STRING)
    )),
    choice(
      seq(TO, repeat1(optional(COMMA), field("logical_device_name", $.id_))),
      seq(TO, repeat1(optional(COMMA), choice(DISK, TAPE, URL), EQUAL, choice(STRING, $.id_))),
    ),
    choice(
      repeat1(seq(MIRROR, TO, repeat1(optional(COMMA), field("logical_device_name", $.id_)))),
      repeat1(seq(MIRROR, TO, repeat1(optional(COMMA), choice(DISK, TAPE, URL), EQUAL, choice(STRING, $.id_)))),
    ),
    optional(
      seq(
        WITH,
        repeat(choice(
          seq(optional(COMMA), DIFFERENTIAL),
          seq(optional(COMMA), COPY_ONLY),
          seq(optional(COMMA), choice(COMPRESSION, NO_COMPRESSION)),
          seq(optional(COMMA), DESCRIPTION, EQUAL, choice(STRING, $.id_)),
          seq(optional(COMMA), NAME, EQUAL, field("backup_set_name", $.id_)),
          seq(optional(COMMA), CREDENTIAL),
          seq(optional(COMMA), FILE_SNAPSHOT),
          seq(optional(COMMA), seq(EXPIREDATE, EQUAL, choice(STRING, $.id_), RETAINDAYS, EQUAL, choice(DECIMAL, $.id_))),
          seq(optional(COMMA), choice(NOINIT, INIT)),
          seq(optional(COMMA), choice(NOSKIP, SKIP_KEYWORD)),
          seq(optional(COMMA), choice(NOFORMAT, FORMAT)),
          seq(optional(COMMA), MEDIADESCRIPTION, EQUAL, choice(STRING, $.id_)),
          seq(optional(COMMA), MEDIANAME, EQUAL, field("medianame", STRING)),
          seq(optional(COMMA), BLOCKSIZE, EQUAL, choice(DECIMAL, $.id_)),
          seq(optional(COMMA), BUFFERCOUNT, EQUAL, choice(DECIMAL, $.id_)),
          seq(optional(COMMA), MAXTRANSFER, EQUAL, choice(DECIMAL, $.id_)),
          seq(optional(COMMA), choice(NO_CHECKSUM, CHECKSUM)),
          seq(optional(COMMA), choice(STOP_ON_ERROR, CONTINUE_AFTER_ERROR)),
          seq(optional(COMMA), RESTART),
          seq(optional(COMMA), STATS, optional(seq(EQUAL, field("stats_percent", DECIMAL)))),
          seq(optional(COMMA), choice(REWIND, NOREWIND)),
          seq(optional(COMMA), choice(LOAD, NOUNLOAD)),
          seq(
            optional(COMMA),
            ENCRYPTION,
            LR_BRACKET,
            ALGORITHM,
            EQUAL,
            choice(AES_128, AES_192, AES_256, TRIPLE_DES_3KE),
            COMMA,
            SERVER,
            CERTIFICATE,
            EQUAL,
            choice(seq(field("encryptor_name", $.id_)), seq(SERVER, ASYMMETRIC, KEY, EQUAL, field("encryptor_name", $.id_)))
          )
        ))
      )
    ),
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/backup-certificate-transact-sql
  backup_certificate: $ => (
    seq(BACKUP, CERTIFICATE, field("certname", $.id_), TO, FILE, EQUAL, field("cert_file", STRING), optional(
      seq(WITH, PRIVATE, KEY, LR_BRACKET, repeat1(choice(
        seq(optional(COMMA), FILE, EQUAL, field("private_key_file", STRING)),
        seq(optional(COMMA), ENCRYPTION, BY, PASSWORD, EQUAL, field("encryption_password", STRING)),
        seq(optional(COMMA), DECRYPTION, BY, PASSWORD, EQUAL, field("decryption_pasword", STRING))
      )), RR_BRACKET)
    )),
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/backup-master-key-transact-sql
  backup_master_key: $ => seq(
    BACKUP,
    MASTER,
    KEY,
    TO,
    FILE,
    EQUAL,
    field("master_key_backup_file", STRING),
    ENCRYPTION,
    BY,
    PASSWORD,
    EQUAL,
    field("encryption_password", STRING)
  ),

  // https://docs.microsoft.com/en-us/sql/t-sql/statements/backup-service-master-key-transact-sql
  backup_service_master_key: $ => seq(
    BACKUP,
    SERVICE,
    MASTER,
    KEY,
    TO,
    FILE,
    EQUAL,
    field("service_master_key_backup_file", STRING),
    ENCRYPTION,
    BY,
    PASSWORD,
    EQUAL,
    field("encryption_password", STRING)
  ),
}
