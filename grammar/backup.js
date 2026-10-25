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
    backup_database: $ => (
            seq(BACKUP, DATABASE, choice(seq(LOAD, NOUNLOAD),)4, (),
        seq(READ_WRITE_FILEGROUPS, choice(seq(LOAD, NOUNLOAD),)2),
        seq()?, choice(seq(LOAD, NOUNLOAD),)2, (),
        seq(TO, choice(seq(LOAD, NOUNLOAD),)1),
        seq(|, TO, (, optional(COMMA), choice(
                    AES_128,
                    AES_192,
                    AES_256,
                    TRIPLE_DES_3KE
                ),7, EQUAL, choice(seq(STRING, $.id_),))+),
        seq(), (),
            choice(
                    AES_128,
                    AES_192,
                    AES_256,
                    TRIPLE_DES_3KE
                ),
        seq(|, (, MIRROR, TO, (, optional(COMMA), choice(
                    AES_128,
                    AES_192,
                    AES_256,
                    TRIPLE_DES_3KE
                ),7, EQUAL, choice(seq(STRING, $.id_),))+)+),
        seq()?, optional(
        seq(WITH, repeat(choice(
        seq(optional(COMMA), DIFFERENTIAL),
        seq(optional(COMMA), COPY_ONLY),
        seq(optional(COMMA), (COMPRESSION, NO_COMPRESSION)),
        seq(optional(COMMA), DESCRIPTION, EQUAL, (STRING, id_)),
        seq(optional(COMMA), NAME, EQUAL, field("backup_set_name", $.id_)),
        seq(optional(COMMA), CREDENTIAL),
        seq(optional(COMMA), FILE_SNAPSHOT),
        seq(optional(COMMA), (EXPIREDATE, EQUAL, (STRING, id_), RETAINDAYS, EQUAL, (DECIMAL, id_))),
        seq(optional(COMMA), (NOINIT, INIT)),
        seq(optional(COMMA), (NOSKIP, SKIP_KEYWORD)),
        seq(optional(COMMA), (NOFORMAT, FORMAT)),
        seq(optional(COMMA), MEDIADESCRIPTION, EQUAL, (STRING, id_)),
        seq(optional(COMMA), MEDIANAME, EQUAL, (field("medianame", STRING))),
        seq(optional(COMMA), BLOCKSIZE, EQUAL, (DECIMAL, id_)),
        seq(optional(COMMA), BUFFERCOUNT, EQUAL, (DECIMAL, id_)),
        seq(optional(COMMA), MAXTRANSFER, EQUAL, (DECIMAL, id_)),
        seq(optional(COMMA), (NO_CHECKSUM, CHECKSUM)),
        seq(optional(COMMA), (STOP_ON_ERROR, CONTINUE_AFTER_ERROR)),
        seq(optional(COMMA), RESTART),
        seq(optional(COMMA), STATS, (EQUAL, field("stats_percent", DECIMAL))?),
        seq(optional(COMMA), (REWIND, NOREWIND)),
        seq(optional(COMMA), (LOAD, NOUNLOAD)),
        seq(optional(COMMA), ENCRYPTION, LR_BRACKET, ALGORITHM, EQUAL, (),
                    AES_128,
                    AES_192,
                    AES_256,
                    TRIPLE_DES_3KE,
        seq(), COMMA, SERVER, CERTIFICATE, EQUAL, choice(
        seq(field("encryptor_name", $.id_)),
        seq(SERVER, ASYMMETRIC, KEY, EQUAL, field("encryptor_name", $.id_))
                ),)
            ),))
        ),),
    ),

    backup_log: $ => (
            seq(BACKUP, LOG, choice(seq(NORECOVERY, STANDBY, EQUAL, field("undo_file_name", STRING)))3, (),
        seq(TO, choice(seq(NORECOVERY, STANDBY, EQUAL, field("undo_file_name", STRING)))2),
        seq(|, TO, (, optional(COMMA), choice(
                    AES_128,
                    AES_192,
                    AES_256,
                    TRIPLE_DES_3KE
                ),8, EQUAL, choice(
                    AES_128,
                    AES_192,
                    AES_256,
                    TRIPLE_DES_3KE
                ),0)+),
        seq(), (),
            choice(
                    AES_128,
                    AES_192,
                    AES_256,
                    TRIPLE_DES_3KE
                ),
        seq(|, (, MIRROR, TO, (, optional(COMMA), choice(
                    AES_128,
                    AES_192,
                    AES_256,
                    TRIPLE_DES_3KE
                ),8, EQUAL, choice(
                    AES_128,
                    AES_192,
                    AES_256,
                    TRIPLE_DES_3KE
                ),0)+)+),
        seq()?, optional(
        seq(WITH, repeat(choice(
        seq(optional(COMMA), DIFFERENTIAL),
        seq(optional(COMMA), COPY_ONLY),
        seq(optional(COMMA), (COMPRESSION, NO_COMPRESSION)),
        seq(optional(COMMA), DESCRIPTION, EQUAL, (STRING, id_)),
        seq(optional(COMMA), NAME, EQUAL, field("backup_set_name", $.id_)),
        seq(optional(COMMA), CREDENTIAL),
        seq(optional(COMMA), FILE_SNAPSHOT),
        seq(optional(COMMA), (EXPIREDATE, EQUAL, (STRING, id_), RETAINDAYS, EQUAL, (DECIMAL, id_))),
        seq(optional(COMMA), (NOINIT, INIT)),
        seq(optional(COMMA), (NOSKIP, SKIP_KEYWORD)),
        seq(optional(COMMA), (NOFORMAT, FORMAT)),
        seq(optional(COMMA), MEDIADESCRIPTION, EQUAL, (STRING, id_)),
        seq(optional(COMMA), MEDIANAME, EQUAL, (field("medianame", STRING))),
        seq(optional(COMMA), BLOCKSIZE, EQUAL, (DECIMAL, id_)),
        seq(optional(COMMA), BUFFERCOUNT, EQUAL, (DECIMAL, id_)),
        seq(optional(COMMA), MAXTRANSFER, EQUAL, (DECIMAL, id_)),
        seq(optional(COMMA), (NO_CHECKSUM, CHECKSUM)),
        seq(optional(COMMA), (STOP_ON_ERROR, CONTINUE_AFTER_ERROR)),
        seq(optional(COMMA), RESTART),
        seq(optional(COMMA), STATS, (EQUAL, field("stats_percent", DECIMAL))?),
        seq(optional(COMMA), (REWIND, NOREWIND)),
        seq(optional(COMMA), (LOAD, NOUNLOAD)),
        seq(optional(COMMA), (NORECOVERY, STANDBY, EQUAL, field("undo_file_name", STRING))),
        seq(optional(COMMA), NO_TRUNCATE),
        seq(optional(COMMA), ENCRYPTION, LR_BRACKET, ALGORITHM, EQUAL, (),
                    AES_128,
                    AES_192,
                    AES_256,
                    TRIPLE_DES_3KE,
        seq(), COMMA, SERVER, CERTIFICATE, EQUAL, choice(
        seq(field("encryptor_name", $.id_)),
        seq(SERVER, ASYMMETRIC, KEY, EQUAL, field("encryptor_name", $.id_))
                ),)
            ),))
        ),),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/backup-certificate-transact-sql
    backup_certificate: $ => (
            seq(BACKUP, CERTIFICATE, field("certname", $.id_), TO, FILE, EQUAL, field("cert_file", STRING), optional(
        seq(WITH, PRIVATE, KEY, LR_BRACKET, repeat1(choice(
        seq(optional(COMMA), FILE, EQUAL, field("private_key_file", STRING)),
        seq(optional(COMMA), ENCRYPTION, BY, PASSWORD, EQUAL, field("encryption_password", STRING)),
        seq(optional(COMMA), DECRYPTION, BY, PASSWORD, EQUAL, field("decryption_pasword", STRING))
            ),), RR_BRACKET)
        ),),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/backup-master-key-transact-sql
    backup_master_key: $ => (
            seq(BACKUP, MASTER, KEY, TO, FILE, EQUAL, field("master_key_backup_file", STRING), ENCRYPTION, BY, PASSWORD, EQUAL, field("encryption_password", STRING)),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/backup-service-master-key-transact-sql
    backup_service_master_key: $ => (
            seq(BACKUP, SERVICE, MASTER, KEY, TO, FILE, EQUAL, field("service_master_key_backup_file", STRING), ENCRYPTION, BY, PASSWORD, EQUAL, field("encryption_password", STRING)),
    ),
}
