const precedences = require('./grammar/precedences.js');
const built_in_functions = require('./grammar/builtins.js');
const odbc_scalar_functions = require('./grammar/functions/odbc_scalar_functions.js');
const aggregate_window_functions = require('./grammar/functions/aggregate_functions.js');
const analytic_windowed_functions = require('./grammar/functions/analytic_windowed_functions.js');
const bit_manipulation_functions = require('./grammar/functions/bit_manipulation_functions.js');
const collation_functions = require('./grammar/functions/collation_functions.js');
const configuration_functions = require('./grammar/functions/configuration_functions.js');
const conversion_functions = require('./grammar/functions/conversion_functions.js');
const data_type = require('./grammar/data_types.js');

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

//
// LEXER https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlLexer.g4

// Keywords
const ABORT = token(/ABORT/i);
const ABORT_AFTER_WAIT = token(/ABORT_AFTER_WAIT/i);
const ABSENT = token(/ABSENT/i);
const ABSOLUTE = token(/ABSOLUTE/i);
const ACCELERATED_DATABASE_RECOVERY = token(/ACCELERATED_DATABASE_RECOVERY/i);
const ACCENT_SENSITIVITY = token(/ACCENT_SENSITIVITY/i);
const ACCESS = token(/ACCESS/i);
const ACTION = token(/ACTION/i);
const ACTIVATION = token(/ACTIVATION/i);
const ACTIVE = token(/ACTIVE/i);
const ADD = token(/ADD/i);
const ADDRESS = token(/ADDRESS/i);
const ADMINISTER = token(/ADMINISTER/i);
const AES = token(/AES/i);
const AES_128 = token(/AES_128/i);
const AES_192 = token(/AES_192/i);
const AES_256 = token(/AES_256/i);
const AFFINITY = token(/AFFINITY/i);
const AFTER = token(/AFTER/i);
const AGGREGATE = token(/AGGREGATE/i);
const ALGORITHM = token(/ALGORITHM/i);
const ALL = token(/ALL/i);
const ALLOWED = token(/ALLOWED/i);
const ALLOW_CONNECTIONS = token(/ALLOW_CONNECTIONS/i);
const ALLOW_ENCRYPTED_VALUE_MODIFICATIONS = token(/ALLOW_ENCRYPTED_VALUE_MODIFICATIONS/i);
const ALLOW_MULTIPLE_EVENT_LOSS = token(/ALLOW_MULTIPLE_EVENT_LOSS/i);
const ALLOW_PAGE_LOCKS = token(/ALLOW_PAGE_LOCKS/i);
const ALLOW_ROW_LOCKS = token(/ALLOW_ROW_LOCKS/i);
const ALLOW_SINGLE_EVENT_LOSS = token(/ALLOW_SINGLE_EVENT_LOSS/i);
const ALLOW_SNAPSHOT_ISOLATION = token(/ALLOW_SNAPSHOT_ISOLATION/i);
const ALL_CONSTRAINTS = token(/ALL_CONSTRAINTS/i);
const ALL_ERRORMSGS = token(/ALL_ERRORMSGS/i);
const ALL_INDEXES = token(/ALL_INDEXES/i);
const ALL_LEVELS = token(/ALL_LEVELS/i);
const ALTER = token(/ALTER/i);
const ALWAYS = token(/ALWAYS/i);
const AND = token(/AND/i);
const ANONYMOUS = token(/ANONYMOUS/i);
const ANSI_DEFAULTS = token(/ANSI_DEFAULTS/i);
const ANSI_NULLS = token(/ANSI_NULLS/i);
const ANSI_NULL_DEFAULT = token(/ANSI_NULL_DEFAULT/i);
const ANSI_NULL_DFLT_OFF = token(/ANSI_NULL_DFLT_OFF/i);
const ANSI_NULL_DFLT_ON = token(/ANSI_NULL_DFLT_ON/i);
const ANSI_PADDING = token(/ANSI_PADDING/i);
const ANSI_WARNINGS = token(/ANSI_WARNINGS/i);
const ANY = token(/ANY/i);
const APPEND = token(/APPEND/i);
const APPLICATION = token(/APPLICATION/i);
const APPLICATION_LOG = token(/APPLICATION_LOG/i);
const APPLOCK_MODE = token(/APPLOCK_MODE/i);
const APPLOCK_TEST = token(/APPLOCK_TEST/i);
const APPLY = token(/APPLY/i);
const APP_NAME = token(/APP_NAME/i);
const ARITHABORT = token(/ARITHABORT/i);
const ARITHIGNORE = token(/ARITHIGNORE/i);
const AS = token(/AS/i);
const ASC = token(/ASC/i);
const ASCII = token(/ASCII/i);
const ASSEMBLY = token(/ASSEMBLY/i);
const ASSEMBLYPROPERTY = token(/ASSEMBLYPROPERTY/i);
const ASYMMETRIC = token(/ASYMMETRIC/i);
const ASYNCHRONOUS_COMMIT = token(/ASYNCHRONOUS_COMMIT/i);
const AT_KEYWORD = token(/AT_KEYWORD/i);
const AUDIT = token(/AUDIT/i);
const AUDIT_GUID = token(/AUDIT_GUID/i);
const AUTHENTICATE = token(/AUTHENTICATE/i);
const AUTHENTICATION = token(/AUTHENTICATION/i);
const AUTHORIZATION = token(/AUTHORIZATION/i);
const AUTO = token(/AUTO/i);
const AUTOGROW_ALL_FILES = token(/AUTOGROW_ALL_FILES/i);
const AUTOGROW_SINGLE_FILE = token(/AUTOGROW_SINGLE_FILE/i);
const AUTOMATED_BACKUP_PREFERENCE = token(/AUTOMATED_BACKUP_PREFERENCE/i);
const AUTOMATIC = token(/AUTOMATIC/i);
const AUTO_CLEANUP = token(/AUTO_CLEANUP/i);
const AUTO_CLOSE = token(/AUTO_CLOSE/i);
const AUTO_CREATE_STATISTICS = token(/AUTO_CREATE_STATISTICS/i);
const AUTO_DROP = token(/AUTO_DROP/i);
const AUTO_SHRINK = token(/AUTO_SHRINK/i);
const AUTO_UPDATE_STATISTICS = token(/AUTO_UPDATE_STATISTICS/i);
const AUTO_UPDATE_STATISTICS_ASYNC = token(/AUTO_UPDATE_STATISTICS_ASYNC/i);
const AVAILABILITY = token(/AVAILABILITY/i);
const AVAILABILITY_MODE = token(/AVAILABILITY_MODE/i);
const AVG = token(/AVG/i);
const BACKSLASH = token('\\');
const BACKUP = token(/BACKUP/i);
const BACKUP_CLONEDB = token(/BACKUP_CLONEDB/i);
const BACKUP_PRIORITY = token(/BACKUP_PRIORITY/i);
const BASE64 = token(/BASE64/i);
const BEFORE = token(/BEFORE/i);
const BEGIN = token(/BEGIN/i);
const BEGIN_DIALOG = token(/BEGIN_DIALOG/i);
const BETWEEN = token(/BETWEEN/i);
const BIGINT = token(/BIGINT/i);
const BINARY_CHECKSUM = token(/BINARY_CHECKSUM/i);
const BINARY_KEYWORD = token(/BINARY_KEYWORD/i);
const BINDING = token(/BINDING/i);
const BLOB_STORAGE = token(/BLOB_STORAGE/i);
const BLOCK = token(/BLOCK/i);
const BLOCKERS = token(/BLOCKERS/i);
const BLOCKING_HIERARCHY = token(/BLOCKING_HIERARCHY/i);
const BLOCKSIZE = token(/BLOCKSIZE/i);
const BREAK = token(/BREAK/i);
const BROKER = token(/BROKER/i);
const BROKER_INSTANCE = token(/BROKER_INSTANCE/i);
const BROWSE = token(/BROWSE/i);
const BUFFER = token(/BUFFER/i);
const BUFFERCOUNT = token(/BUFFERCOUNT/i);
const BULK = token(/BULK/i);
const BULK_LOGGED = token(/BULK_LOGGED/i);
const BY = token(/BY/i);
const CACHE = token(/CACHE/i);
const CALLED = token(/CALLED/i);
const CALLER = token(/CALLER/i);
const CAP_CPU_PERCENT = token(/CAP_CPU_PERCENT/i);
const CASCADE = token(/CASCADE/i);
const CASE = token(/CASE/i);
const CAST = token(/CAST/i);
const CATALOG = token(/CATALOG/i);
const CATCH = token(/CATCH/i);
const CERTENCODED = token(/CERTENCODED/i);
const CERTIFICATE = token(/CERTIFICATE/i);
const CERTPRIVATEKEY = token(/CERTPRIVATEKEY/i);
const CERT_ID = token(/CERT_ID/i);
const CHANGE = token(/CHANGE/i);
const CHANGES = token(/CHANGES/i);
const CHANGETABLE = token(/CHANGETABLE/i);
const CHANGE_RETENTION = token(/CHANGE_RETENTION/i);
const CHANGE_TRACKING = token(/CHANGE_TRACKING/i);
const CHAR = token(/CHAR/i);
const CHARINDEX = token(/CHARINDEX/i);
const CHECK = token(/CHECK/i);
const CHECKALLOC = token(/CHECKALLOC/i);
const CHECKCATALOG = token(/CHECKCATALOG/i);
const CHECKCONSTRAINTS = token(/CHECKCONSTRAINTS/i);
const CHECKDB = token(/CHECKDB/i);
const CHECKFILEGROUP = token(/CHECKFILEGROUP/i);
const CHECKPOINT = token(/CHECKPOINT/i);
const CHECKSUM = token(/CHECKSUM/i);
const CHECKSUM_AGG = token(/CHECKSUM_AGG/i);
const CHECKTABLE = token(/CHECKTABLE/i);
const CHECK_EXPIRATION = token(/CHECK_EXPIRATION/i);
const CHECK_POLICY = token(/CHECK_POLICY/i);
const CLASSIFIER_FUNCTION = token(/CLASSIFIER_FUNCTION/i);
const CLEANTABLE = token(/CLEANTABLE/i);
const CLEANUP = token(/CLEANUP/i);
const CLONEDATABASE = token(/CLONEDATABASE/i);
const CLOSE = token(/CLOSE/i);
const CLUSTER = token(/CLUSTER/i);
const CLUSTERED = token(/CLUSTERED/i);
const COALESCE = token(/COALESCE/i);
const COLLATE = token(/COLLATE/i);
const COLLECTION = token(/COLLECTION/i);
const COLUMN = token(/COLUMN/i);
const COLUMNPROPERTY = token(/COLUMNPROPERTY/i);
const COLUMNS = token(/COLUMNS/i);
const COLUMNSTORE = token(/COLUMNSTORE/i);
const COLUMNSTORE_ARCHIVE = token(/COLUMNSTORE_ARCHIVE/i);
const COLUMN_ENCRYPTION_KEY = token(/COLUMN_ENCRYPTION_KEY/i);
const COLUMN_MASTER_KEY = token(/COLUMN_MASTER_KEY/i);
const COL_LENGTH = token(/COL_LENGTH/i);
const COL_NAME = token(/COL_NAME/i);
const COMMIT = token(/COMMIT/i);
const COMMITTED = token(/COMMITTED/i);
const COMPATIBILITY_LEVEL = token(/COMPATIBILITY_LEVEL/i);
const COMPRESS = token(/COMPRESS/i);
const COMPRESSION = token(/COMPRESSION/i);
const COMPRESSION_DELAY = token(/COMPRESSION_DELAY/i);
const COMPRESS_ALL_ROW_GROUPS = token(/COMPRESS_ALL_ROW_GROUPS/i);
const COMPUTE = token(/COMPUTE/i);
const CONCAT = token(/CONCAT/i);
const CONCAT_NULL_YIELDS_NULL = token(/CONCAT_NULL_YIELDS_NULL/i);
const CONCAT_WS = token(/CONCAT_WS/i);
const CONFIGURATION = token(/CONFIGURATION/i);
const CONNECT = token(/CONNECT/i);
const CONNECTION = token(/CONNECTION/i);
const CONNECTIONPROPERTY = token(/CONNECTIONPROPERTY/i);
const CONSTRAINT = token(/CONSTRAINT/i);
const CONTAINMENT = token(/CONTAINMENT/i);
const CONTAINS = token(/CONTAINS/i);
const CONTAINSTABLE = token(/CONTAINSTABLE/i);
const CONTENT = token(/CONTENT/i);
const CONTEXT = token(/CONTEXT/i);
const CONTEXT_INFO = token(/CONTEXT_INFO/i);
const CONTINUE = token(/CONTINUE/i);
const CONTINUE_AFTER_ERROR = token(/CONTINUE_AFTER_ERROR/i);
const CONTRACT = token(/CONTRACT/i);
const CONTRACT_NAME = token(/CONTRACT_NAME/i);
const CONTROL = token(/CONTROL/i);
const CONVERSATION = token(/CONVERSATION/i);
const CONVERT = token(/(TRY_)?CONVERT/i);
const COOKIE = token(/COOKIE/i);
const COPY_ONLY = token(/COPY_ONLY/i);
const COUNT = token(/COUNT/i);
const COUNTER = token(/COUNTER/i);
const COUNT_BIG = token(/COUNT_BIG/i);
const CPU = token(/CPU/i);
const CREATE = token(/CREATE/i);
const CREATE_NEW = token(/CREATE_NEW/i);
const CREATION_DISPOSITION = token(/CREATION_DISPOSITION/i);
const CREDENTIAL = token(/CREDENTIAL/i);
const CROSS = token(/CROSS/i);
const CRYPTOGRAPHIC = token(/CRYPTOGRAPHIC/i);
const CUME_DIST = token(/CUME_DIST/i);
const CURRENT = token(/CURRENT/i);
const CURRENT_DATE = token(/CURRENT_DATE/i);
const CURRENT_REQUEST_ID = token(/CURRENT_REQUEST_ID/i);
const CURRENT_TIME = token(/CURRENT_TIME/i);
const CURRENT_TIMESTAMP = token(/CURRENT_TIMESTAMP/i);
const CURRENT_TRANSACTION_ID = token(/CURRENT_TRANSACTION_ID/i);
const CURRENT_USER = token(/CURRENT_USER/i);
const CURSOR = token(/CURSOR/i);
const CURSOR_CLOSE_ON_COMMIT = token(/CURSOR_CLOSE_ON_COMMIT/i);
const CURSOR_DEFAULT = token(/CURSOR_DEFAULT/i);
const CURSOR_STATUS = token(/CURSOR_STATUS/i);
const CYCLE = token(/CYCLE/i);
const DATA = token(/DATA/i);
const DATABASE = token(/DATABASE/i);
const DATABASEPROPERTYEX = token(/DATABASEPROPERTYEX/i);
const DATABASE_MIRRORING = token(/DATABASE_MIRRORING/i);
const DATABASE_PRINCIPAL_ID = token(/DATABASE_PRINCIPAL_ID/i);
const DATALENGTH = token(/DATALENGTH/i);
const DATASPACE = token(/DATASPACE/i);
const DATA_COMPRESSION = token(/DATA_COMPRESSION/i);
const DATA_PURITY = token(/DATA_PURITY/i);
const DATA_SOURCE = token(/DATA_SOURCE/i);
const DATEADD = token(/DATEADD/i);
const DATEDIFF = token(/DATEDIFF/i);
const DATENAME = token(/DATENAME/i);
const DATEPART = token(/DATEPART/i);
const DATE_CORRELATION_OPTIMIZATION = token(/DATE_CORRELATION_OPTIMIZATION/i);
const DAYS = token(/DAYS/i);
const DBCC = token(/DBCC/i);
const DBREINDEX = token(/DBREINDEX/i);
const DB_CHAINING = token(/DB_CHAINING/i);
const DB_FAILOVER = token(/DB_FAILOVER/i);
const DB_ID = token(/DB_ID/i);
const DB_NAME = token(/DB_NAME/i);
const DDL = token(/DDL/i);
const DEALLOCATE = token(/DEALLOCATE/i);
const DECLARE = token(/DECLARE/i);
const DECOMPRESS = token(/DECOMPRESS/i);
const DECRYPTION = token(/DECRYPTION/i);
const DEFAULT = token(/DEFAULT/i);
const DEFAULT_DATABASE = token(/DEFAULT_DATABASE/i);
const DEFAULT_DOUBLE_QUOTE = token(/"DEFAULT"/i);
const DEFAULT_FULLTEXT_LANGUAGE = token(/DEFAULT_FULLTEXT_LANGUAGE/i);
const DEFAULT_LANGUAGE = token(/DEFAULT_LANGUAGE/i);
const DEFAULT_SCHEMA = token(/DEFAULT_SCHEMA/i);
const DEFINITION = token(/DEFINITION/i);
const DELAY = token(/DELAY/i);
const DELAYED_DURABILITY = token(/DELAYED_DURABILITY/i);
const DELETE = token(/DELETE/i);
const DELETED = token(/DELETED/i);
const DENSE_RANK = token(/DENSE_RANK/i);
const DENY = token(/DENY/i);
const DEPENDENTS = token(/DEPENDENTS/i);
const DES = token(/DES/i);
const DESC = token(/DESC/i);
const DESCRIPTION = token(/DESCRIPTION/i);
const DESX = token(/DESX/i);
const DETERMINISTIC = token(/DETERMINISTIC/i);
const DHCP = token(/DHCP/i);
const DIAGNOSTICS = token(/DIAGNOSTICS/i);
const DIALOG = token(/DIALOG/i);
const DIFFERENCE = token(/DIFFERENCE/i);
const DIFFERENTIAL = token(/DIFFERENTIAL/i);
const DIRECTORY_NAME = token(/DIRECTORY_NAME/i);
const DISABLE = token(/DISABLE/i);
const DISABLED = token(/DISABLED/i);
const DISABLE_BROKER = token(/DISABLE_BROKER/i);
const DISK = token(/DISK/i);
const DISTINCT = token(/DISTINCT/i);
const DISTRIBUTED = token(/DISTRIBUTED/i);
const DISTRIBUTION = token(/DISTRIBUTION/i);
const DOCUMENT = token(/DOCUMENT/i);
const DOLLAR_PARTITION = token(/\$PARTITION/i);
const DOUBLE = token(/DOUBLE/i);
const DOUBLE_BACK_SLASH = token('\\\\');
const DOUBLE_FORWARD_SLASH = token('//')
const DROP = token(/DROP/i);
const DROPCLEANBUFFERS = token(/DROPCLEANBUFFERS/i);
const DROP_EXISTING = token(/DROP_EXISTING/i);
const DTC_SUPPORT = token(/DTC_SUPPORT/i);
const DUMP = token(/DUMP/i);
const DYNAMIC = token(/DYNAMIC/i);
const ELEMENTS = token(/ELEMENTS/i);
const ELSE = token(/ELSE/i);
const EMERGENCY = token(/EMERGENCY/i);
const EMPTY = token(/EMPTY/i);
const ENABLE = token(/ENABLE/i);
const ENABLED = token(/ENABLED/i);
const ENABLE_BROKER = token(/ENABLE_BROKER/i);
const ENCRYPTED = token(/ENCRYPTED/i);
const ENCRYPTED_VALUE = token(/ENCRYPTED_VALUE/i);
const ENCRYPTION = token(/ENCRYPTION/i);
const ENCRYPTION_TYPE = token(/ENCRYPTION_TYPE/i);
const END = token(/END/i);
const ENDPOINT = token(/ENDPOINT/i);
const ENDPOINT_URL = token(/ENDPOINT_URL/i);
const ERRLVL = token(/ERRLVL/i);
const ERROR = token(/ERROR/i);
const ERROR_BROKER_CONVERSATIONS = token(/ERROR_BROKER_CONVERSATIONS/i);
const ERROR_LINE = token(/ERROR_LINE/i);
const ERROR_MESSAGE = token(/ERROR_MESSAGE/i);
const ERROR_NUMBER = token(/ERROR_NUMBER/i);
const ERROR_PROCEDURE = token(/ERROR_PROCEDURE/i);
const ERROR_SEVERITY = token(/ERROR_SEVERITY/i);
const ERROR_STATE = token(/ERROR_STATE/i);
const ESCAPE = token(/ESCAPE/i);
const ESTIMATEONLY = token(/ESTIMATEONLY/i);
const EVENT = token(/EVENT/i);
const EVENTDATA = token(/EVENTDATA/i);
const EVENT_RETENTION_MODE = token(/EVENT_RETENTION_MODE/i);
const EXCEPT = token(/EXCEPT/i);
const EXCLUSIVE = token(/EXCLUSIVE/i);
const EXECUTABLE = token(/EXECUTABLE/i);
const EXECUTABLE_FILE = token(/EXECUTABLE_FILE/i);
const EXECUTE = token(/EXEC(UTE)?/i);
const EXIST = token(/EXIST/i);
const EXISTS = token(/EXISTS/i);
const EXIST_SQUARE_BRACKET  = token(/\[EXIST\]/i);
const EXIT = token(/EXIT/i);
const EXPAND = token(/EXPAND/i);
const EXPIREDATE = token(/EXPIREDATE/i);
const EXPIRY_DATE = token(/EXPIRY_DATE/i);
const EXPLICIT = token(/EXPLICIT/i);
const EXTENDED_LOGICAL_CHECKS = token(/EXTENDED_LOGICAL_CHECKS/i);
const EXTENSION = token(/EXTENSION/i);
const EXTERNAL = token(/EXTERNAL/i);
const EXTERNAL_ACCESS = token(/EXTERNAL_ACCESS/i);
const FAILOVER = token(/FAILOVER/i);
const FAILOVER_MODE = token(/FAILOVER_MODE/i);
const FAILURE = token(/FAILURE/i);
const FAILURECONDITIONLEVEL = token(/FAILURECONDITIONLEVEL/i);
const FAILURE_CONDITION_LEVEL = token(/FAILURE_CONDITION_LEVEL/i);
const FAIL_OPERATION = token(/FAIL_OPERATION/i);
const FAN_IN = token(/FAN_IN/i);
const FAST = token(/FAST/i);
const FAST_FORWARD = token(/FAST_FORWARD/i);
const FETCH = token(/FETCH/i);
const FILE = token(/FILE/i);
const FILEGROUP = token(/FILEGROUP/i);
const FILEGROUPPROPERTY = token(/FILEGROUPPROPERTY/i);
const FILEGROUP_ID = token(/FILEGROUP_ID/i);
const FILEGROUP_NAME = token(/FILEGROUP_NAME/i);
const FILEGROWTH = token(/FILEGROWTH/i);
const FILENAME = token(/FILENAME/i);
const FILEPATH = token(/FILEPATH/i);
const FILEPROPERTY = token(/FILEPROPERTY/i);
const FILEPROPERTYEX = token(/FILEPROPERTYEX/i);
const FILESTREAM = token(/FILESTREAM/i);
const FILESTREAM_ON = token(/FILESTREAM_ON/i);
const FILE_ID = token(/FILE_ID/i);
const FILE_IDEX = token(/FILE_IDEX/i);
const FILE_NAME = token(/FILE_NAME/i);
const FILE_SNAPSHOT = token(/FILE_SNAPSHOT/i);
const FILLFACTOR = token(/FILLFACTOR/i);
const FILTER = token(/FILTER/i);
const FIRST = token(/FIRST/i);
const FIRST_VALUE = token(/FIRST_VALUE/i);
const FMTONLY = token(/FMTONLY/i);
const FOLLOWING = token(/FOLLOWING/i);
const FOR = token(/FOR/i);
const FORCE = token(/FORCE/i);
const FORCED = token(/FORCED/i);
const FORCEPLAN = token(/FORCEPLAN/i);
const FORCESCAN = token(/FORCESCAN/i);
const FORCESEEK = token(/FORCESEEK/i);
const FORCE_FAILOVER_ALLOW_DATA_LOSS = token(/FORCE_FAILOVER_ALLOW_DATA_LOSS/i);
const FORCE_SERVICE_ALLOW_DATA_LOSS = token(/FORCE_SERVICE_ALLOW_DATA_LOSS/i);
const FOREIGN = token(/FOREIGN/i);
const FORMAT = token(/FORMAT/i);
const FORMATMESSAGE = token(/FORMATMESSAGE/i);
const FORWARD_ONLY = token(/FORWARD_ONLY/i);
const FREE = token(/FREE/i);
const FREETEXT = token(/FREETEXT/i);
const FREETEXTTABLE = token(/FREETEXTTABLE/i);
const FROM = token(/FROM/i);
const FULL = token(/FULL/i);
const FULLSCAN = token(/FULLSCAN/i);
const FULLTEXT = token(/FULLTEXT/i);
const FULLTEXTCATALOGPROPERTY = token(/FULLTEXTCATALOGPROPERTY/i);
const FULLTEXTSERVICEPROPERTY = token(/FULLTEXTSERVICEPROPERTY/i);
const FUNCTION = token(/FUNCTION/i);
const GB = token(/GB/i);
const GENERATED = token(/GENERATED/i);
const GET = token(/GET/i);
const GETANCESTOR = token(/GETANCESTOR/i);
const GETANSINULL = token(/GETANSINULL/i);
const GETDATE = token(/GETDATE/i);
const GETDESCENDANT = token(/GETDESCENDANT/i);
const GETLEVEL = token(/GETLEVEL/i);
const GETREPARENTEDVALUE = token(/GETREPARENTEDVALUE/i);
const GETROOT = token(/GETROOT/i);
const GETUTCDATE = token(/GETUTCDATE/i);
const GET_FILESTREAM_TRANSACTION_CONTEXT = token(/GET_FILESTREAM_TRANSACTION_CONTEXT/i);
const GLOBAL = token(/GLOBAL/i);
const GO = token(/GO/i);
const GOTO = token(/GOTO/i);
const GOVERNOR = token(/GOVERNOR/i);
const GRANT = token(/GRANT/i);
const GREATEST = token(/GREATEST/i);
const GROUP = token(/GROUP/i);
const GROUPING = token(/GROUPING/i);
const GROUPING_ID = token(/GROUPING_ID/i);
const GROUP_MAX_REQUESTS = token(/GROUP_MAX_REQUESTS/i);
const HADR = token(/HADR/i);
const HASH = token(/HASH/i);
const HASHED = token(/HASHED/i);
const HAS_DBACCESS = token(/HAS_DBACCESS/i);
const HAS_PERMS_BY_NAME = token(/HAS_PERMS_BY_NAME/i);
const HAVING = token(/HAVING/i);
const HEALTHCHECKTIMEOUT = token(/HEALTHCHECKTIMEOUT/i);
const HEALTH_CHECK_TIMEOUT = token(/HEALTH_CHECK_TIMEOUT/i);
const HEAP = token(/HEAP/i);
const HIDDEN_KEYWORD = token(/HIDDEN_KEYWORD/i);
const HIERARCHYID = token(/HIERARCHYID/i);
const HIGH = token(/HIGH/i);
const HOLDLOCK = token(/HOLDLOCK/i);
const HONOR_BROKER_PRIORITY = token(/HONOR_BROKER_PRIORITY/i);
const HOST_ID = token(/HOST_ID/i);
const HOST_NAME = token(/HOST_NAME/i);
const HOURS = token(/HOURS/i);
const IDENTITY = token(/IDENTITY/i);
const IDENTITYCOL = token(/IDENTITYCOL/i);
const IDENTITY_INSERT = token(/IDENTITY_INSERT/i);
const IDENTITY_VALUE = token(/IDENTITY_VALUE/i);
const IDENT_CURRENT = token(/IDENT_CURRENT/i);
const IDENT_INCR = token(/IDENT_INCR/i);
const IDENT_SEED = token(/IDENT_SEED/i);
const IF = token(/IF/i);
const IGNORE_CONSTRAINTS = token(/IGNORE_CONSTRAINTS/i);
const IGNORE_DUP_KEY = token(/IGNORE_DUP_KEY/i);
const IGNORE_NONCLUSTERED_COLUMNSTORE_INDEX = token(/IGNORE_NONCLUSTERED_COLUMNSTORE_INDEX/i);
const IGNORE_REPLICATED_TABLE_CACHE = token(/IGNORE_REPLICATED_TABLE_CACHE/i);
const IGNORE_TRIGGERS = token(/IGNORE_TRIGGERS/i);
const IIF = token(/IIF/i);
const IMMEDIATE = token(/IMMEDIATE/i);
const IMPERSONATE = token(/IMPERSONATE/i);
const IMPLICIT_TRANSACTIONS = token(/IMPLICIT_TRANSACTIONS/i);
const IMPORTANCE = token(/IMPORTANCE/i);
const IN = token(/IN/i);
const INCLUDE = token(/INCLUDE/i);
const INCLUDE_NULL_VALUES = token(/INCLUDE_NULL_VALUES/i);
const INCREMENT = token(/INCREMENT/i);
const INCREMENTAL = token(/INCREMENTAL/i);
const INDEX = token(/INDEX/i);
const INDEXKEY_PROPERTY = token(/INDEXKEY_PROPERTY/i);
const INDEXPROPERTY = token(/INDEXPROPERTY/i);
const INDEX_COL = token(/INDEX_COL/i);
const INFINITE = token(/INFINITE/i);
const INIT = token(/INIT/i);
const INITIATOR = token(/INITIATOR/i);
const INNER = token(/INNER/i);
const INPUT = token(/INPUT/i);
const INSENSITIVE = token(/INSENSITIVE/i);
const INSERT = token(/INSERT/i);
const INSERTED = token(/INSERTED/i);
const INSTEAD = token(/INSTEAD/i);
const INT = token(/INT/i);
const INTERSECT = token(/INTERSECT/i);
const INTO = token(/INTO/i);
const IO = token(/IO/i);
const IP = token(/IP/i);
const IS = token(/IS/i);
const ISDESCENDANTOF = token(/ISDESCENDANTOF/i);
const ISJSON = token(/ISJSON/i);
const ISNULL = token(/ISNULL/i);
const ISNUMERIC = token(/ISNUMERIC/i);
const ISOLATION = token(/ISOLATION/i);
const IS_MEMBER = token(/IS_MEMBER/i);
const IS_ROLEMEMBER = token(/IS_ROLEMEMBER/i);
const IS_SRVROLEMEMBER = token(/IS_SRVROLEMEMBER/i);
const JOB = token(/JOB/i);
const JOIN = token(/JOIN/i);
const JSON = token(/JSON/i);
const JSON_ARRAY = token(/JSON_ARRAY/i);
const JSON_MODIFY = token(/JSON_MODIFY/i);
const JSON_OBJECT = token(/JSON_OBJECT/i);
const JSON_PATH_EXISTS = token(/JSON_PATH_EXISTS/i);
const JSON_QUERY = token(/JSON_QUERY/i);
const JSON_VALUE = token(/JSON_VALUE/i);
const KB = token(/KB/i);
const KEEP = token(/KEEP/i);
const KEEPDEFAULTS = token(/KEEPDEFAULTS/i);
const KEEPFIXED = token(/KEEPFIXED/i);
const KEEPIDENTITY = token(/KEEPIDENTITY/i);
const KERBEROS = token(/KERBEROS/i);
const KEY = token(/KEY/i);
const KEYS = token(/KEYS/i);
const KEYSET = token(/KEYSET/i);
const KEY_PATH = token(/KEY_PATH/i);
const KEY_SOURCE = token(/KEY_SOURCE/i);
const KEY_STORE_PROVIDER_NAME = token(/KEY_STORE_PROVIDER_NAME/i);
const KILL = token(/KILL/i);
const LAG = token(/LAG/i);
const LANGUAGE = token(/LANGUAGE/i);
const LAST = token(/LAST/i);
const LAST_VALUE = token(/LAST_VALUE/i);
const LEAD = token(/LEAD/i);
const LEAST = token(/LEAST/i);
const LEFT = token(/LEFT/i);
const LEN = token(/LEN/i);
const LEVEL = token(/LEVEL/i);
const LIBRARY = token(/LIBRARY/i);
const LIFETIME = token(/LIFETIME/i);
const LIKE = token(/LIKE/i);
const LINENO = token(/LINENO/i);
const LINKED = token(/LINKED/i);
const LINUX = token(/LINUX/i);
const LIST = token(/LIST/i);
const LISTENER = token(/LISTENER/i);
const LISTENER_IP = token(/LISTENER_IP/i);
const LISTENER_PORT = token(/LISTENER_PORT/i);
const LISTENER_URL = token(/LISTENER_URL/i);
const LOAD = token(/LOAD/i);
const LOB_COMPACTION = token(/LOB_COMPACTION/i);
const LOCAL = token(/LOCAL/i);
const LOCAL_SERVICE_NAME = token(/LOCAL_SERVICE_NAME/i);
const LOCATION = token(/LOCATION/i);
const LOCK = token(/LOCK/i);
const LOCK_ESCALATION = token(/LOCK_ESCALATION/i);
const LOG = token(/LOG/i);
const LOGIN = token(/LOGIN/i);
const LOGINPROPERTY = token(/LOGINPROPERTY/i);
const LOOP = token(/LOOP/i);
const LOW = token(/LOW/i);
const LOWER = token(/LOWER/i);
const LTRIM = token(/LTRIM/i);
const MANUAL = token(/MANUAL/i);
const MARK = token(/MARK/i);
const MASK = token(/MASK/i);
const MASKED = token(/MASKED/i);
const MASTER = token(/MASTER/i);
const MATCHED = token(/MATCHED/i);
const MATERIALIZED = token(/MATERIALIZED/i);
const MAX = token(/MAX/i);
const MAXDOP = token(/MAXDOP/i);
const MAXRECURSION = token(/MAXRECURSION/i);
const MAXSIZE = token(/MAXSIZE/i);
const MAXTRANSFER = token(/MAXTRANSFER/i);
const MAXVALUE = token(/MAXVALUE/i);
const MAX_CPU_PERCENT = token(/MAX_CPU_PERCENT/i);
const MAX_DISPATCH_LATENCY = token(/MAX_DISPATCH_LATENCY/i);
const MAX_DOP = token(/MAX_DOP/i);
const MAX_DURATION = token(/MAX_DURATION/i);
const MAX_EVENT_SIZE = token(/MAX_EVENT_SIZE/i);
const MAX_FILES = token(/MAX_FILES/i);
const MAX_IOPS_PER_VOLUME = token(/MAX_IOPS_PER_VOLUME/i);
const MAX_MEMORY = token(/MAX_MEMORY/i);
const MAX_MEMORY_PERCENT = token(/MAX_MEMORY_PERCENT/i);
const MAX_OUTSTANDING_IO_PER_VOLUME = token(/MAX_OUTSTANDING_IO_PER_VOLUME/i);
const MAX_PROCESSES = token(/MAX_PROCESSES/i);
const MAX_QUEUE_READERS = token(/MAX_QUEUE_READERS/i);
const MAX_ROLLOVER_FILES = token(/MAX_ROLLOVER_FILES/i);
const MAX_SIZE = token(/MAX_SIZE/i);
const MB = token(/MB/i);
const MEDIADESCRIPTION = token(/MEDIADESCRIPTION/i);
const MEDIANAME = token(/MEDIANAME/i);
const MEDIUM = token(/MEDIUM/i);
const MEMBER = token(/MEMBER/i);
const MEMORY_OPTIMIZED_DATA = token(/MEMORY_OPTIMIZED_DATA/i);
const MEMORY_PARTITION_MODE = token(/MEMORY_PARTITION_MODE/i);
const MERGE = token(/MERGE/i);
const MESSAGE = token(/MESSAGE/i);
const MESSAGE_FORWARDING = token(/MESSAGE_FORWARDING/i);
const MESSAGE_FORWARD_SIZE = token(/MESSAGE_FORWARD_SIZE/i);
const MIN = token(/MIN/i);
const MINUTES = token(/MINUTES/i);
const MINVALUE = token(/MINVALUE/i);
const MIN_ACTIVE_ROWVERSION = token(/MIN_ACTIVE_ROWVERSION/i);
const MIN_CPU_PERCENT = token(/MIN_CPU_PERCENT/i);
const MIN_IOPS_PER_VOLUME = token(/MIN_IOPS_PER_VOLUME/i);
const MIN_MEMORY_PERCENT = token(/MIN_MEMORY_PERCENT/i);
const MIRROR = token(/MIRROR/i);
const MIRROR_ADDRESS = token(/MIRROR_ADDRESS/i);
const MIXED_PAGE_ALLOCATION = token(/MIXED_PAGE_ALLOCATION/i);
const MODE = token(/MODE/i);
const MODIFY = token(/MODIFY/i);
const MODIFY_SQUARE_BRACKET = token(/\[MODIFY\]/i);
const MOVE = token(/MOVE/i);
const MULTI_USER = token(/MULTI_USER/i);
const MUST_CHANGE = token(/MUST_CHANGE/i);
const NAME = token(/NAME/i);
const NATIONAL = token(/NATIONAL/i);
const NCHAR = token(/NCHAR/i);
const NEGOTIATE = token(/NEGOTIATE/i);
const NESTED_TRIGGERS = token(/NESTED_TRIGGERS/i);
const NEWID = token(/NEWID/i);
const NEWNAME = token(/NEWNAME/i);
const NEWSEQUENTIALID = token(/NEWSEQUENTIALID/i);
const NEW_ACCOUNT = token(/NEW_ACCOUNT/i);
const NEW_BROKER = token(/NEW_BROKER/i);
const NEW_PASSWORD = token(/NEW_PASSWORD/i);
const NEXT = token(/NEXT/i);
const NO = token(/NO/i);
const NOCHECK = token(/NOCHECK/i);
const NOCOUNT = token(/NOCOUNT/i);
const NODES = token(/NODES/i);
const NOEXEC = token(/NOEXEC/i);
const NOEXPAND = token(/NOEXPAND/i);
const NOFORMAT = token(/NOFORMAT/i);
const NOHOLDLOCK = token(/NOHOLDLOCK/i);
const NOINDEX = token(/NOINDEX/i);
const NOINIT = token(/NOINIT/i);
const NOLOCK = token(/NOLOCK/i);
const NONCLUSTERED = token(/NONCLUSTERED/i);
const NONE = token(/NONE/i);
const NON_TRANSACTED_ACCESS = token(/NON_TRANSACTED_ACCESS/i);
const NORECOMPUTE = token(/NORECOMPUTE/i);
const NORECOVERY = token(/NORECOVERY/i);
const NOREWIND = token(/NOREWIND/i);
const NOSKIP = token(/NOSKIP/i);
const NOT = token(/NOT/i);
const NOTIFICATION = token(/NOTIFICATION/i);
const NOTIFICATIONS = token(/NOTIFICATIONS/i);
const NOUNLOAD = token(/NOUNLOAD/i);
const NOWAIT = token(/NOWAIT/i);
const NO_CHECKSUM = token(/NO_CHECKSUM/i);
const NO_COMPRESSION = token(/NO_COMPRESSION/i);
const NO_EVENT_LOSS = token(/NO_EVENT_LOSS/i);
const NO_INFOMSGS = token(/NO_INFOMSGS/i);
const NO_QUERYSTORE = token(/NO_QUERYSTORE/i);
const NO_STATISTICS = token(/NO_STATISTICS/i);
const NO_TRUNCATE = token(/NO_TRUNCATE/i);
const NO_WAIT = token(/NO_WAIT/i);
const NTILE = token(/NTILE/i);
const NTLM = token(/NTLM/i);
const NULLIF = token(/NULLIF/i);
const NULL_ = token(/NULL_/i);
const NULL_DOUBLE_QUOTE = token(/"NULL"/i);
const NUMANODE = token(/NUMANODE/i);
const NUMBER = token(/NUMBER/i);
const NUMERIC_ROUNDABORT = token(/NUMERIC_ROUNDABORT/i);
const OBJECT = token(/OBJECT/i);
const OBJECTPROPERTY = token(/OBJECTPROPERTY/i);
const OBJECTPROPERTYEX = token(/OBJECTPROPERTYEX/i);
const OBJECT_DEFINITION = token(/OBJECT_DEFINITION/i);
const OBJECT_ID = token(/OBJECT_ID/i);
const OBJECT_NAME = token(/OBJECT_NAME/i);
const OBJECT_SCHEMA_NAME = token(/OBJECT_SCHEMA_NAME/i);
const OF = token(/OF/i);
const OFF = token(/OFF/i);
const OFFLINE = token(/OFFLINE/i);
const OFFSET = token(/OFFSET/i);
const OFFSETS = token(/OFFSETS/i);
const OLD_ACCOUNT = token(/OLD_ACCOUNT/i);
const OLD_PASSWORD = token(/OLD_PASSWORD/i);
const ON = token(/ON/i);
const ONLINE = token(/ONLINE/i);
const ONLY = token(/ONLY/i);
const ON_FAILURE = token(/ON_FAILURE/i);
const OPEN = token(/OPEN/i);
const OPENDATASOURCE = token(/OPENDATASOURCE/i);
const OPENJSON = token(/OPENJSON/i);
const OPENQUERY = token(/OPENQUERY/i);
const OPENROWSET = token(/OPENROWSET/i);
const OPENXML = token(/OPENXML/i);
const OPEN_EXISTING = token(/OPEN_EXISTING/i);
const OPERATIONS = token(/OPERATIONS/i);
const OPTIMISTIC = token(/OPTIMISTIC/i);
const OPTIMIZE = token(/OPTIMIZE/i);
const OPTIMIZE_FOR_SEQUENTIAL_KEY = token(/OPTIMIZE_FOR_SEQUENTIAL_KEY/i);
const OPTION = token(/OPTION/i);
const OR = token(/OR/i);
const ORDER = token(/ORDER/i);
const ORIGINAL_DB_NAME = token(/ORIGINAL_DB_NAME/i);
const ORIGINAL_LOGIN = token(/ORIGINAL_LOGIN/i);
const OUT = token(/OUT/i);
const OUTER = token(/OUTER/i);
const OUTPUT = token(/OUTPUT/i);
const OVER = token(/OVER/i);
const OVERRIDE = token(/OVERRIDE/i);
const OWNER = token(/OWNER/i);
const OWNERSHIP = token(/OWNERSHIP/i);
const PAD_INDEX = token(/PAD_INDEX/i);
const PAGE = token(/PAGE/i);
const PAGECOUNT = token(/PAGECOUNT/i);
const PAGE_VERIFY = token(/PAGE_VERIFY/i);
const PAGLOCK = token(/PAGLOCK/i);
const PARAMETERIZATION = token(/PARAMETERIZATION/i);
const PARAM_NODE = token(/PARAM_NODE/i);
const PARSE = token(/(TRY_)?PARSE/i);
const PARSENAME = token(/PARSENAME/i);
const PARSEONLY = token(/PARSEONLY/i);
const PARTIAL = token(/PARTIAL/i);
const PARTITION = token(/PARTITION/i);
const PARTITIONS = token(/PARTITIONS/i);
const PARTNER = token(/PARTNER/i);
const PASSWORD = token(/PASSWORD/i);
const PATH = token(/PATH/i);
const PATINDEX = token(/PATINDEX/i);
const PAUSE = token(/PAUSE/i);
const PDW_SHOWSPACEUSED = token(/PDW_SHOWSPACEUSED/i);
const PERCENT = token(/PERCENT/i);
const PERCENTILE_CONT = token(/PERCENTILE_CONT/i);
const PERCENTILE_DISC = token(/PERCENTILE_DISC/i);
const PERCENT_RANK = token(/PERCENT_RANK/i);
const PERMISSIONS = token(/PERMISSIONS/i);
const PERMISSION_SET = token(/PERMISSION_SET/i);
const PERSISTED = token(/PERSISTED/i);
const PERSIST_SAMPLE_PERCENT = token(/PERSIST_SAMPLE_PERCENT/i);
const PER_CPU = token(/PER_CPU/i);
const PER_DB = token(/PER_DB/i);
const PER_NODE = token(/PER_NODE/i);
const PHYSICAL_ONLY = token(/PHYSICAL_ONLY/i);
const PIVOT = token(/PIVOT/i);
const PLAN = token(/PLAN/i);
const PLATFORM = token(/PLATFORM/i);
const POISON_MESSAGE_HANDLING = token(/POISON_MESSAGE_HANDLING/i);
const POLICY = token(/POLICY/i);
const POOL = token(/POOL/i);
const PORT = token(/PORT/i);
const PRECEDING = token(/PRECEDING/i);
const PRECISION = token(/PRECISION/i);
const PREDICATE = token(/PREDICATE/i);
const PRIMARY = token(/PRIMARY/i);
const PRIMARY_ROLE = token(/PRIMARY_ROLE/i);
const PRINT = token(/PRINT/i);
const PRIOR = token(/PRIOR/i);
const PRIORITY = token(/PRIORITY/i);
const PRIORITY_LEVEL = token(/PRIORITY_LEVEL/i);
const PRIVATE = token(/PRIVATE/i);
const PRIVATE_KEY = token(/PRIVATE_KEY/i);
const PRIVILEGES = token(/PRIVILEGES/i);
const PROC = token(/PROC/i);
const PROCCACHE = token(/PROCCACHE/i);
const PROCEDURE = token(/PROCEDURE/i);
const PROCEDURE_NAME = token(/PROCEDURE_NAME/i);
const PROCESS = token(/PROCESS/i);
const PROFILE = token(/PROFILE/i);
const PROPERTY = token(/PROPERTY/i);
const PROVIDER = token(/PROVIDER/i);
const PROVIDER_KEY_NAME = token(/PROVIDER_KEY_NAME/i);
const PUBLIC = token(/PUBLIC/i);
const PWDCOMPARE = token(/PWDCOMPARE/i);
const PWDENCRYPT = token(/PWDENCRYPT/i);
const PYTHON = token(/PYTHON/i);
const QUERY = token(/QUERY/i);
const QUERY_SQUARE_BRACKET = token(/\[QUERY\]/i);
const QUEUE = token(/QUEUE/i);
const QUEUE_DELAY = token(/QUEUE_DELAY/i);
const QUOTED_IDENTIFIER = token(/QUOTED_IDENTIFIER/i);
const QUOTENAME = token(/QUOTENAME/i);
const R = token(/R/i);
const RAISERROR = token(/RAISERROR/i);
const RANDOMIZED = token(/RANDOMIZED/i);
const RANGE = token(/RANGE/i);
const RANK = token(/RANK/i);
const RAW = token(/RAW/i);
const RC2 = token(/RC2/i);
const RC4 = token(/RC4/i);
const RC4_128 = token(/RC4_128/i);
const READ = token(/READ/i);
const READCOMMITTED = token(/READCOMMITTED/i);
const READCOMMITTEDLOCK = token(/READCOMMITTEDLOCK/i);
const READONLY = token(/READONLY/i);
const READPAST = token(/READPAST/i);
const READTEXT = token(/READTEXT/i);
const READUNCOMMITTED = token(/READUNCOMMITTED/i);
const READWRITE = token(/READWRITE/i);
const READ_COMMITTED_SNAPSHOT = token(/READ_COMMITTED_SNAPSHOT/i);
const READ_ONLY = token(/READ_ONLY/i);
const READ_ONLY_ROUTING_LIST = token(/READ_ONLY_ROUTING_LIST/i);
const READ_WRITE = token(/READ_WRITE/i);
const READ_WRITE_FILEGROUPS = token(/READ_WRITE_FILEGROUPS/i);
const REBUILD = token(/REBUILD/i);
const RECEIVE = token(/RECEIVE/i);
const RECOMPILE = token(/RECOMPILE/i);
const RECONFIGURE = token(/RECONFIGURE/i);
const RECOVERY = token(/RECOVERY/i);
const RECURSIVE_TRIGGERS = token(/RECURSIVE_TRIGGERS/i);
const REFERENCES = token(/REFERENCES/i);
const REGENERATE = token(/REGENERATE/i);
const RELATED_CONVERSATION = token(/RELATED_CONVERSATION/i);
const RELATED_CONVERSATION_GROUP = token(/RELATED_CONVERSATION_GROUP/i);
const RELATIVE = token(/RELATIVE/i);
const REMOTE = token(/REMOTE/i);
const REMOTE_PROC_TRANSACTIONS = token(/REMOTE_PROC_TRANSACTIONS/i);
const REMOTE_SERVICE_NAME = token(/REMOTE_SERVICE_NAME/i);
const REMOVE = token(/REMOVE/i);
const REORGANIZE = token(/REORGANIZE/i);
const REPAIR_ALLOW_DATA_LOSS = token(/REPAIR_ALLOW_DATA_LOSS/i);
const REPAIR_FAST = token(/REPAIR_FAST/i);
const REPAIR_REBUILD = token(/REPAIR_REBUILD/i);
const REPEATABLE = token(/REPEATABLE/i);
const REPEATABLEREAD = token(/REPEATABLEREAD/i);
const REPLACE = token(/REPLACE/i);
const REPLICA = token(/REPLICA/i);
const REPLICATE = token(/REPLICATE/i);
const REPLICATION = token(/REPLICATION/i);
const REQUEST_MAX_CPU_TIME_SEC = token(/REQUEST_MAX_CPU_TIME_SEC/i);
const REQUEST_MAX_MEMORY_GRANT_PERCENT = token(/REQUEST_MAX_MEMORY_GRANT_PERCENT/i);
const REQUEST_MEMORY_GRANT_TIMEOUT_SEC = token(/REQUEST_MEMORY_GRANT_TIMEOUT_SEC/i);
const REQUIRED = token(/REQUIRED/i);
const REQUIRED_SYNCHRONIZED_SECONDARIES_TO_COMMIT = token(/REQUIRED_SYNCHRONIZED_SECONDARIES_TO_COMMIT/i);
const RESAMPLE = token(/RESAMPLE/i);
const RESERVE_DISK_SPACE = token(/RESERVE_DISK_SPACE/i);
const RESET = token(/RESET/i);
const RESOURCE = token(/RESOURCE/i);
const RESOURCES = token(/RESOURCES/i);
const RESOURCE_MANAGER_LOCATION = token(/RESOURCE_MANAGER_LOCATION/i);
const RESTART = token(/RESTART/i);
const RESTORE = token(/RESTORE/i);
const RESTRICT = token(/RESTRICT/i);
const RESTRICTED_USER = token(/RESTRICTED_USER/i);
const RESUMABLE = token(/RESUMABLE/i);
const RESUME = token(/RESUME/i);
const RETAINDAYS = token(/RETAINDAYS/i);
const RETENTION = token(/RETENTION/i);
const RETURN = token(/RETURN/i);
const RETURNS = token(/RETURNS/i);
const REVERSE = token(/REVERSE/i);
const REVERT = token(/REVERT/i);
const REVOKE = token(/REVOKE/i);
const REWIND = token(/REWIND/i);
const RIGHT = token(/RIGHT/i);
const ROBUST = token(/ROBUST/i);
const ROLE = token(/ROLE/i);
const ROLLBACK = token(/ROLLBACK/i);
const ROOT = token(/ROOT/i);
const ROUND_ROBIN = token(/ROUND_ROBIN/i);
const ROUTE = token(/ROUTE/i);
const ROW = token(/ROW/i);
const ROWCOUNT = token(/ROWCOUNT/i);
const ROWCOUNT_BIG = token(/ROWCOUNT_BIG/i);
const ROWGUID = token(/ROWGUID/i);
const ROWGUIDCOL = token(/ROWGUIDCOL/i);
const ROWLOCK = token(/ROWLOCK/i);
const ROWS = token(/ROWS/i);
const ROW_NUMBER = token(/ROW_NUMBER/i);
const RSA_1024 = token(/RSA_1024/i);
const RSA_2048 = token(/RSA_2048/i);
const RSA_3072 = token(/RSA_3072/i);
const RSA_4096 = token(/RSA_4096/i);
const RSA_512 = token(/RSA_512/i);
const RTRIM = token(/RTRIM/i);
const RULE = token(/RULE/i);
const SAFE = token(/SAFE/i);
const SAFETY = token(/SAFETY/i);
const SAMPLE = token(/SAMPLE/i);
const SAVE = token(/SAVE/i);
const SCHEDULER = token(/SCHEDULER/i);
const SCHEMA = token(/SCHEMA/i);
const SCHEMABINDING = token(/SCHEMABINDING/i);
const SCHEMA_ID = token(/SCHEMA_ID/i);
const SCHEMA_NAME = token(/SCHEMA_NAME/i);
const SCHEME = token(/SCHEME/i);
const SCOPED = token(/SCOPED/i);
const SCOPE_IDENTITY = token(/SCOPE_IDENTITY/i);
const SCRIPT = token(/SCRIPT/i);
const SCROLL = token(/SCROLL/i);
const SCROLL_LOCKS = token(/SCROLL_LOCKS/i);
const SEARCH = token(/SEARCH/i);
const SECONDARY = token(/SECONDARY/i);
const SECONDARY_ONLY = token(/SECONDARY_ONLY/i);
const SECONDARY_ROLE = token(/SECONDARY_ROLE/i);
const SECONDS = token(/SECONDS/i);
const SECRET = token(/SECRET/i);
const SECURABLES = token(/SECURABLES/i);
const SECURITY = token(/SECURITY/i);
const SECURITYAUDIT = token(/SECURITYAUDIT/i);
const SECURITY_LOG = token(/SECURITY_LOG/i);
const SEEDING_MODE = token(/SEEDING_MODE/i);
const SELECT = token(/SELECT/i);
const SELF = token(/SELF/i);
const SEMANTICKEYPHRASETABLE = token(/SEMANTICKEYPHRASETABLE/i);
const SEMANTICSIMILARITYDETAILSTABLE = token(/SEMANTICSIMILARITYDETAILSTABLE/i);
const SEMANTICSIMILARITYTABLE = token(/SEMANTICSIMILARITYTABLE/i);
const SEMI_SENSITIVE = token(/SEMI_SENSITIVE/i);
const SEND = token(/SEND/i);
const SENT = token(/SENT/i);
const SEQUENCE = token(/SEQUENCE/i);
const SEQUENCE_NUMBER = token(/SEQUENCE_NUMBER/i);
const SERIALIZABLE = token(/SERIALIZABLE/i);
const SERVER = token(/SERVER/i);
const SERVERPROPERTY = token(/SERVERPROPERTY/i);
const SERVICE = token(/SERVICE/i);
const SERVICEBROKER = token(/SERVICEBROKER/i);
const SERVICE_BROKER = token(/SERVICE_BROKER/i);
const SERVICE_NAME = token(/SERVICE_NAME/i);
const SESSION = token(/SESSION/i);
const SESSIONPROPERTY = token(/SESSIONPROPERTY/i);
const SESSION_CONTEXT = token(/SESSION_CONTEXT/i);
const SESSION_TIMEOUT = token(/SESSION_TIMEOUT/i);
const SESSION_USER = token(/SESSION_USER/i);
const SET = token(/SET/i);
const SETERROR = token(/SETERROR/i);
const SETS = token(/SETS/i);
const SETTINGS = token(/SETTINGS/i);
const SETUSER = token(/SETUSER/i);
const SHARE = token(/SHARE/i);
const SHARED = token(/SHARED/i);
const SHOWCONTIG = token(/SHOWCONTIG/i);
const SHOWPLAN = token(/SHOWPLAN/i);
const SHOWPLAN_ALL = token(/SHOWPLAN_ALL/i);
const SHOWPLAN_TEXT = token(/SHOWPLAN_TEXT/i);
const SHOWPLAN_XML = token(/SHOWPLAN_XML/i);
const SHRINKLOG = token(/SHRINKLOG/i);
const SHUTDOWN = token(/SHUTDOWN/i);
const SID = token(/SID/i);
const SIGNATURE = token(/SIGNATURE/i);
const SIMPLE = token(/SIMPLE/i);
const SINGLE_USER = token(/SINGLE_USER/i);
const SIZE = token(/SIZE/i);
const SKIP_KEYWORD = token(/SKIP_KEYWORD/i);
const SMALLINT = token(/SMALLINT/i);
const SNAPSHOT = token(/SNAPSHOT/i);
const SOFTNUMA = token(/SOFTNUMA/i);
const SOME = token(/SOME/i);
const SORT_IN_TEMPDB = token(/SORT_IN_TEMPDB/i);
const SOUNDEX = token(/SOUNDEX/i);
const SOURCE = token(/SOURCE/i);
const SPACE_KEYWORD = token(/SPACE_KEYWORD/i);
const SPARSE = token(/SPARSE/i);
const SPATIAL_WINDOW_MAX_CELLS = token(/SPATIAL_WINDOW_MAX_CELLS/i);
const SPECIFICATION = token(/SPECIFICATION/i);
const SPLIT = token(/SPLIT/i);
const SQL = token(/SQL/i);
const SQLDUMPERFLAGS = token(/SQLDUMPERFLAGS/i);
const SQLDUMPERPATH = token(/SQLDUMPERPATH/i);
const SQLDUMPERTIMEOUT = token(/SQLDUMPERTIMEOUT/i);
const SQL_VARIANT_PROPERTY = token(/SQL_VARIANT_PROPERTY/i);
const STANDBY = token(/STANDBY/i);
const START = token(/START/i);
const STARTED = token(/STARTED/i);
const STARTUP_STATE = token(/STARTUP_STATE/i);
const START_DATE = token(/START_DATE/i);
const STATE = token(/STATE/i);
const STATIC = token(/STATIC/i);
const STATISTICS = token(/STATISTICS/i);
const STATISTICS_INCREMENTAL = token(/STATISTICS_INCREMENTAL/i);
const STATISTICS_NORECOMPUTE = token(/STATISTICS_NORECOMPUTE/i);
const STATS = token(/STATS/i);
const STATS_DATE = token(/STATS_DATE/i);
const STATS_STREAM = token(/STATS_STREAM/i);
const STATUS = token(/STATUS/i);
const STATUSONLY = token(/STATUSONLY/i);
const STDEV = token(/STDEV/i);
const STDEVP = token(/STDEVP/i);
const STOP = token(/STOP/i);
const STOPLIST = token(/STOPLIST/i);
const STOPPED = token(/STOPPED/i);
const STOP_ON_ERROR = token(/STOP_ON_ERROR/i);
const STR = token(/STR/i);
const STRING_AGG = token(/STRING_AGG/i);
const STRING_ESCAPE = token(/STRING_ESCAPE/i);
const STUFF = token(/STUFF/i);
const SUBJECT = token(/SUBJECT/i);
const SUBSCRIBE = token(/SUBSCRIBE/i);
const SUBSCRIPTION = token(/SUBSCRIPTION/i);
const SUBSTRING = token(/SUBSTRING/i);
const SUM = token(/SUM/i);
const SUPPORTED = token(/SUPPORTED/i);
const SUSER_ID = token(/SUSER_ID/i);
const SUSER_NAME = token(/SUSER_NAME/i);
const SUSER_SID = token(/SUSER_SID/i);
const SUSER_SNAME = token(/SUSER_SNAME/i);
const SUSPEND = token(/SUSPEND/i);
const SWITCH = token(/SWITCH/i);
const SYMMETRIC = token(/SYMMETRIC/i);
const SYNCHRONOUS_COMMIT = token(/SYNCHRONOUS_COMMIT/i);
const SYNONYM = token(/SYNONYM/i);
const SYSTEM = token(/SYSTEM/i);
const SYSTEM_USER = token(/SYSTEM_USER/i);
const TABLE = token(/TABLE/i);
const TABLERESULTS = token(/TABLERESULTS/i);
const TABLESAMPLE = token(/TABLESAMPLE/i);
const TABLOCK = token(/TABLOCK/i);
const TABLOCKX = token(/TABLOCKX/i);
const TAKE = token(/TAKE/i);
const TAPE = token(/TAPE/i);
const TARGET = token(/TARGET/i);
const TARGET_RECOVERY_TIME = token(/TARGET_RECOVERY_TIME/i);
const TB = token(/TB/i);
const TCP = token(/TCP/i);
const TEXTIMAGE_ON = token(/TEXTIMAGE_ON/i);
const TEXTSIZE = token(/TEXTSIZE/i);
const THEN = token(/THEN/i);
const THROW = token(/THROW/i);
const TIES = token(/TIES/i);
const TIME = token(/TIME/i);
const TIMEOUT = token(/TIMEOUT/i);
const TIMER = token(/TIMER/i);
const TINYINT = token(/TINYINT/i);
const TO = token(/TO/i);
const TOP = token(/TOP/i);
const TORN_PAGE_DETECTION = token(/TORN_PAGE_DETECTION/i);
const TOSTRING = token(/TOSTRING/i);
const TRACE = token(/TRACE/i);
const TRACKING = token(/TRACKING/i);
const TRACK_CAUSALITY = token(/TRACK_CAUSALITY/i);
const TRAN = token(/TRAN/i);
const TRANSACTION = token(/TRANSACTION/i);
const TRANSACTION_ID = token(/TRANSACTION_ID/i);
const TRANSFER = token(/TRANSFER/i);
const TRANSFORM_NOISE_WORDS = token(/TRANSFORM_NOISE_WORDS/i);
const TRANSLATE = token(/TRANSLATE/i);
const TRIGGER = token(/TRIGGER/i);
const TRIM = token(/TRIM/i);
const TRIPLE_DES = token(/TRIPLE_DES/i);
const TRIPLE_DES_3KEY = token(/TRIPLE_DES_3KEY/i);
const TRUNCATE = token(/TRUNCATE/i);
const TRUSTWORTHY = token(/TRUSTWORTHY/i);
const TRY = token(/TRY/i);
const TRY_CAST = token(/TRY_CAST/i);
const TSEQUAL = token(/TSEQUAL/i);
const TSQL = token(/TSQL/i);
const TWO_DIGIT_YEAR_CUTOFF = token(/TWO_DIGIT_YEAR_CUTOFF/i);
const TYPE = token(/TYPE/i);
const TYPEPROPERTY = token(/TYPEPROPERTY/i);
const TYPE_ID = token(/TYPE_ID/i);
const TYPE_NAME = token(/TYPE_NAME/i);
const TYPE_WARNING = token(/TYPE_WARNING/i);
const UNBOUNDED = token(/UNBOUNDED/i);
const UNCHECKED = token(/UNCHECKED/i);
const UNCOMMITTED = token(/UNCOMMITTED/i);
const UNICODE = token(/UNICODE/i);
const UNION = token(/UNION/i);
const UNIQUE = token(/UNIQUE/i);
const UNKNOWN = token(/UNKNOWN/i);
const UNLIMITED = token(/UNLIMITED/i);
const UNLOCK = token(/UNLOCK/i);
const UNMASK = token(/UNMASK/i);
const UNPIVOT = token(/UNPIVOT/i);
const UNSAFE = token(/UNSAFE/i);
const UOW = token(/UOW/i);
const UPDATE = token(/UPDATE/i);
const UPDATETEXT = token(/UPDATETEXT/i);
const UPDLOCK = token(/UPDLOCK/i);
const UPPER = token(/UPPER/i);
const URL = token(/URL/i);
const USE = token(/USE/i);
const USED = token(/USED/i);
const USER = token(/USER/i);
const USER_ID = token(/USER_ID/i);
const USER_NAME = token(/USER_NAME/i);
const USING = token(/USING/i);
const VALIDATION = token(/VALIDATION/i);
const VALID_XML = token(/VALID_XML/i);
const VALUE = token(/VALUE/i);
const VALUES = token(/VALUES/i);
const VALUE_SQUARE_BRACKET = token(/\[VALUE\]/i);
const VAR = token(/VAR/i);
const VARBINARY_KEYWORD = token(/VARBINARY_KEYWORD/i);
const VARP = token(/VARP/i);
const VARYING = token(/VARYING/i);
const VERBOSELOGGING = token(/VERBOSELOGGING/i);
const VERIFY_CLONEDB = token(/VERIFY_CLONEDB/i);
const VERSION = token(/VERSION/i);
const VIEW = token(/VIEW/i);
const VIEWS = token(/VIEWS/i);
const VIEW_METADATA = token(/VIEW_METADATA/i);
const VISIBILITY = token(/VISIBILITY/i);
const WAIT = token(/WAIT/i);
const WAITFOR = token(/WAITFOR/i);
const WAIT_AT_LOW_PRIORITY = token(/WAIT_AT_LOW_PRIORITY/i);
const WELL_FORMED_XML = token(/WELL_FORMED_XML/i);
const WHEN = token(/WHEN/i);
const WHERE = token(/WHERE/i);
const WHILE = token(/WHILE/i);
const WINDOWS = token(/WINDOWS/i);
const WITH = token(/WITH/i);
const WITHIN = token(/WITHIN/i);
const WITHOUT = token(/WITHOUT/i);
const WITHOUT_ARRAY_WRAPPER = token(/WITHOUT_ARRAY_WRAPPER/i);
const WITNESS = token(/WITNESS/i);
const WORK = token(/WORK/i);
const WORKLOAD = token(/WORKLOAD/i);
const WRITETEXT = token(/WRITETEXT/i);
const XACT_ABORT = token(/XACT_ABORT/i);
const XACT_STATE = token(/XACT_STATE/i);
const XLOCK = token(/XLOCK/i);
const XML = token(/XML/i);
const XMLDATA = token(/XMLDATA/i);
const XMLNAMESPACES = token(/XMLNAMESPACES/i);
const XMLSCHEMA = token(/XMLSCHEMA/i);
const XML_COMPRESSION = token(/XML_COMPRESSION/i);
const XSINIL = token(/XSINIL/i);
const ZONE = token(/ZONE/i);

const ABS = token(/ABS/i);
const ACOS = token(/ACOS/i);
const ASIN = token(/ASIN/i);
const ATAN = token(/ATAN/i);
const ATN2 = token(/ATN2/i);
const CEILING = token(/CEILING/i);
const COS = token(/COS/i);
const COT = token(/COT/i);
const DEGREES = token(/DEGREES/i);
const EXP = token(/EXP/i);
const FLOOR = token(/FLOOR/i);
const LOG10 = token(/LOG10/i);
const PI = token(/PI/i);
const POWER = token(/POWER/i);
const RADIANS = token(/RADIANS/i);
const RAND = token(/RAND/i);
const ROUND = token(/ROUND/i);
const SIGN = token(/SIGN/i);
const SIN = token(/SIN/i);
const SQRT = token(/SQRT/i);
const SQUARE = token(/SQUARE/i);
const TAN = token(/TAN/i);

const CURRENT_TIMEZONE = token(/CURRENT_TIMEZONE/i);
const CURRENT_TIMEZONE_ID = token(/CURRENT_TIMEZONE_ID/i);
const DATE_BUCKET = token(/DATE_BUCKET/i);
const DATEDIFF_BIG = token(/DATEDIFF_BIG/i);
const DATEFROMPARTS = token(/DATEFROMPARTS/i);
const DATETIME2FROMPARTS = token(/DATETIME2FROMPARTS/i);
const DATETIMEFROMPARTS = token(/DATETIMEFROMPARTS/i);
const DATETIMEOFFSETFROMPARTS = token(/DATETIMEOFFSETFROMPARTS/i);
const DATETRUNC = token(/DATETRUNC/i);
const DAY = token(/DAY/i);
const EOMONTH = token(/EOMONTH/i);
const ISDATE = token(/ISDATE/i);
const MONTH = token(/MONTH/i);
const SMALLDATETIMEFROMPARTS = token(/SMALLDATETIMEFROMPARTS/i);
const SWITCHOFFSET = token(/SWITCHOFFSET/i);
const SYSDATETIME = token(/SYSDATETIME/i);
const SYSDATETIMEOFFSET = token(/SYSDATETIMEOFFSET/i);
const SYSUTCDATETIME = token(/SYSUTCDATETIME/i);
const TIMEFROMPARTS = token(/TIMEFROMPARTS/i);
const TODATETIMEOFFSET = token(/TODATETIMEOFFSET/i);
const YEAR = token(/YEAR/i);

const QUARTER = token(/QUARTER/i);
const DAYOFYEAR = token(/DAYOFYEAR/i);
const WEEK = token(/WEEK/i);
const HOUR = token(/HOUR/i);
const MINUTE = token(/MINUTE/i);
const SECOND = token(/SECOND/i);
const MILLISECOND = token(/MILLISECOND/i);
const MICROSECOND = token(/MICROSECOND/i);
const NANOSECOND = token(/NANOSECOND/i);
const TZOFFSET = token(/TZOFFSET/i);
const ISO_WEEK = token(/ISO_WEEK/i);
const WEEKDAY = token(/WEEKDAY/i);

const YEAR_ABBR = token(/(yy|yyyy)/i);
const QUARTER_ABBR = token(/(qq|q)/i);
const MONTH_ABBR = token(/(mm|m)/i);
const DAYOFYEAR_ABBR = token(/(dy|y)/i);
const DAY_ABBR = token(/(dd|d)/i);
const WEEK_ABBR = token(/(wk|ww)/i);
const HOUR_ABBR = token(/HOUR_ABBR/i);
const MINUTE_ABBR = token(/(mi|n)/i);
const SECOND_ABBR = token(/(ss|s)/i);
const MILLISECOND_ABBR = token(/MILLISECOND_ABBR/i);
const MICROSECOND_ABBR = token(/MICROSECOND_ABBR/i);
const NANOSECOND_ABBR = token(/NANOSECOND_ABBR/i);
const TZOFFSET_ABBR = token(/TZOFFSET_ABBR/i);
const ISO_WEEK_ABBR = token(/(isowk|isoww)/i);
const WEEKDAY_ABBR = token(/WEEKDAY_ABBR/i);

const SP_EXECUTESQL = token(/SP_EXECUTESQL/i);

// Built-ins
const VARCHAR = token(/VARCHAR/i);
const NVARCHAR = token(/NVARCHAR/i);


// Combinations that cannot be used as IDs
const DISK_DRIVE = token(/[A-Z]:/);
const DOLLAR_ACTION = token(/\$ACTION/i);

// Functions starting with double at signs
const CURSOR_ROWS  = token(/@@CURSOR_ROWS/i);
const FETCH_STATUS = token(/@@FETCH_STATUS/i);

const IPV4_ADDR = token(/[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/);

// ID can be not only Latin.
const DOUBLE_QUOTE_ID = token(/"[^"]+"/);
const DOUBLE_QUOTE_BLANK = token('""');
const SINGLE_QUOTE = token("'");
const SQUARE_BRACKET_ID = token(/\[([^\]]|\]\])*\]/);
const LOCAL_ID = token(/@[a-zA-Z0-9_$@#\uFF01-\uFF5E]+/);
const TEMP_ID = token(/#[a-zA-Z0-9_$@#\uFF01-\uFF5E]+/);
const DECIMAL = token(/[0-9]+/);
const ID = token(/[a-zA-Z_#\uFF01-\uFF5E][a-zA-Z0-9_#$@\uFF01-\uFF5E]*/);
const STRING = token(/N?'([^']|'')*'/);
const BINARY = token(/0X[0-9a-fA-F]*/i);
const FLOAT = token(/([0-9]+\.[0-9]+|[0-9]+\.|\.?[0-9]+)/);
const REAL = token(/([0-9]+|([0-9]+\.[0-9]+|[0-9]+\.|\.?[0-9]+))E[+-]?[0-9]+/i);

const EQUAL = token('=');

const GREATER = token('>');
const LESS = token('<');
const EXCLAMATION = token('!');

const PLUS_ASSIGN = token(/\+=/);
const MINUS_ASSIGN = token(/-=/);
const MULT_ASSIGN = token(/\*=/);
const DIV_ASSIGN = token(/\/=/);
const MOD_ASSIGN = token(/%=/);
const AND_ASSIGN = token(/&=/);
const XOR_ASSIGN = token(/\^=/);
const OR_ASSIGN = token(/\|=/);

const DOUBLE_BAR = token(/\|\|/);
const DOT = token(/\./);
const UNDERLINE = token('_');
const AT = token('@');
const SHARP = token('#');
const DOLLAR = token('$');
const LR_BRACKET = token('(');
const RR_BRACKET = token(')');
const COMMA = token(',');
const SEMI = token(';');
const COLON = token(':');
const DOUBLE_COLON = token('::');
const STAR = token('*');
const DIVIDE = token('/');
const MODULE = token('%');
const PLUS = token(/\+/);
const MINUS = token('-');
const BIT_NOT = token('~');
const BIT_OR = token(/\|/);
const BIT_AND = token('&');
const BIT_XOR = token(/\^/);

const PLACEHOLDER = token(/\?/);

const LETTER = token(/[A-Z_]/);
const DEC_DOT_DEC = token(/([0-9]+\.[0-9]+|[0-9]+\.|\.[0-9]+)/);
const HEX_DIGIT = token(/[0-9A-F]/);
const DEC_DIGIT = token(/[0-9]/);

//
// UTILS
//
const parens = (...rule) => seq('(', ...rule, ')');

//
// PARSER https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4
//

module.exports = grammar({
  name: "tsql",

  conflicts: $ => [
    [$.batch]
  ],

  // // For spaces, tabulations and line breaks
  // extras: $ => [
  //   /[\s\uFEFF\xA0]/, // \s couvre [ \t\r\n\f]
  //   $.comment
  // ],

  ...precedences,

  rules: {
    // comment: $ => token(choice(
    //   seq('--', /[^\r\n]*/),
    //   seq('/*', /[^*]*\*+([^/*][^*]*\*+)*/, '/')
    // )),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L35
    tsql_file: $ => choice(
      repeat($.batch)
      ,seq($.execute_body_batch, repeat($.go_statement))
    ),

    batch: $ => choice(
      prec(1,$.go_statement)
      ,seq(optional($.execute_body_batch),choice($.go_statement, repeat1($.sql_clauses)), repeat($.go_statement))
      ,//TODO seq($.batch_level_statement, repeat($.go_statement))
       //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L46-L51
    ),

    //https://learn.microsoft.com/en-us/sql/t-sql/language-elements/sql-server-utilities-statements-go?view=sql-server-ver16
    go_statement: $ => seq(token(/GO/i), optional(field("count", $.integer))),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L3145
    execute_body_batch: $ => prec.left(seq(
      $.func_proc_name_server_database_schema, optional(seq($.execute_statement_arg, repeat(seq(token(','), $.execute_statement_arg)))), optional(SEMI)
    )),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5145
    func_proc_name_server_database_schema: $ => choice(
      seq(optional(field('server', $.id_)), DOT, optional(field('database', $.id_)), DOT, optional(field('schema', $.id_)), DOT, field('procedure', $.id_))
      ,$.func_proc_name_database_schema
    ),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5140
    func_proc_name_database_schema: $ => choice(
      seq(optional(field('database', $.id_)), DOT, optional(field('schema', $.id_)), DOT, field('procedure', $.id_))
      ,$.func_proc_name_schema
    ),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5136
    func_proc_name_schema: $ => prec.right(seq(optional(seq(field('schema',$.id_), DOT)), field('procedure', $.id_))),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L3158
    execute_statement_arg: $ => choice(
      prec.left(seq($.execute_statement_arg_unnamed, repeat(seq(token(','), $.execute_statement_arg))))   //Unnamed params can continue unnamed
      ,prec.left(seq($.execute_statement_arg_named, repeat(seq(token(','), $.execute_statement_arg_named)))) //Named can only be continued by unnamed
    ),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L3163
    execute_statement_arg_named: $ => seq(
      field('name', LOCAL_ID), token('='), field('value', $.execute_parameter)
    ),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L3167
    execute_statement_arg_unnamed : $ => field('value', $.execute_parameter),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L3171
    execute_parameter: $ => choice(
      $.constant
      ,seq($.LOCAL_ID_, optional($.OUTPUT))
      ,$.id_
      ,$.default
      ,$.null_
    ),

    LOCAL_ID_: $ => LOCAL_ID,
    OUTPUT: $ => token(/OUT(PUT)?/i),

    default: $ => token(/DEFAULT/i),
    null_: $ => token(/NULL/i),

    constant: $ => choice(
      STRING
      ,seq(optional(token(/-/)), choice(DECIMAL)) //TODO
      //TODO https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5270
    ),

    //TODO batch_level_statement: $ => 'TODO', //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L46-L51

    sql_clauses: $ => choice(
      seq($.dml_clause, optional(SEMI))
      ,seq($.another_statement, optional(SEMI))
      //TODO https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L53-L61
    ),

    another_statement: $ => choice(
      //TODO https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L350
      $.declare_statement,
      $.execute_statement
    ),

    // https://msdn.microsoft.com/en-us/library/ms188332.aspx
    // https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L3141
    execute_statement: $ => prec.left(seq($.execute, $.execute_body, optional(SEMI))),

    execute: $ => token(/EXEC(UTE)?/i),

    // https://learn.microsoft.com/en-us/sql/t-sql/language-elements/execute-transact-sql?view=sql-server-ver15
    execute_body: $ => prec.left(choice(
      seq(optional(seq(field('return_status',$.LOCAL_ID_), token(/=/)))
        , choice($.func_proc_name_server_database_schema, $.execute_var_string)
        , optional($.execute_statement_arg)
        , optional(seq($.WITH, $.execute_option, repeat(seq(token(','), $.execute_option)))))
      //TODO execute_option https://learn.microsoft.com/en-us/sql/t-sql/language-elements/execute-transact-sql?view=sql-server-ver15

      ,seq(parens(seq($.execute_var_string, repeat(seq(token(','), $.execute_var_string))))
        ,optional(seq($.AS, choice($.LOGIN,$.USER), token('='), $.string_lit))
        ,optional(seq($.AT_KEYWORD, field('linkedServer', $.id_))))
      //TODO AT_DATA_SOURCE https://learn.microsoft.com/en-us/sql/t-sql/language-elements/execute-transact-sql?view=sql-server-ver16&redirectedfrom=MSDN#:~:text=AT%20DATA_SOURCE%20data_source_name%20Applies%20to%3A%20SQL%20Server%202019%20(15.x)%20and%20later
    )),

    WITH: $ => token(/WITH/i),

    execute_option: $ => choice(
      $.RECOMPILE
      ,seq($.RESULT_SETS, choice($.NONE, $.UNDEFINED))
      //TODO Result Sets Definition
      // https://learn.microsoft.com/en-us/sql/t-sql/language-elements/execute-transact-sql?view=sql-server-ver15
    ),

    RESULT_SETS: $ => seq(token(/RESULT/i), token(/SETS/i)),
    NONE: $ => token(/NONE/i),
    UNDEFINED: $ => token(/UNDEFINED/i),

    RECOMPILE: $ => token(/RECOMPILE/i),

    AS: $ => token(/AS/i),
    LOGIN: $ => token(/LOGIN/i),
    USER: $ => token(/USER/i),
    AT_KEYWORD: $ => token(/AT/i),

    // https://learn.microsoft.com/en-us/sql/t-sql/language-elements/execute-transact-sql?view=sql-server-ver15
    // https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L3175-L3178
    execute_var_string: $ => choice(
      seq($.LOCAL_ID_, optional(seq($.PLUS, $.LOCAL_ID_, optional(seq($.PLUS, $.execute_var_string)))))
      ,seq($.string_lit, optional(seq($.PLUS, $.LOCAL_ID_, optional(seq($.PLUS, $.execute_var_string)))))
    ),

    string_lit: $ => token(seq(
      optional('N')
      ,"'" //Opening Single Quote
      ,repeat(choice(
        /[^']/,               // Any character except a single quote
        "''"                  // Escaped single quote (two single quotes)
      ))
      ,"'" //Closing Single Quote

    )),


    PLUS: $ => token(/\+/),

    dml_clause: $ => choice(
      $.select_statement_standalone
      //TODO https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L63-L70
    ),

    select_statement_standalone: $ => seq(
      //TODO with_expression https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L2183
      $.select_statement
    ),

    select_statement: $ => prec.left(seq(
      $.query_expression
      ,optional(SEMI)
      //TODO https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L2186
    )),

    query_expression: $ => seq(
      $.query_specification
      //TODO union all https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L3999
    ),

    query_specification: $ => seq(
      $.select
      ,$.select_list
      ,optional(seq(token(/FROM/i), $.table_sources))
      ,optional($.groupby)
      //TODO https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4010-L4023
    ),

    declare_statement: $ => choice(
      seq(
        token(/DECLARE/i),
        $.declare_local,
        repeat(seq(COMMA, $.declare_local))
      ),

      // seq(
      //   token(/DECLARE/i),
      //   LOCAL_ID,
      //   optional(token(/AS/i)),
      //   $.table_type_definition
      // ),

      // seq(
      //   token(/DECLARE/i),
      //   LOCAL_ID,
      //   optional(token(/AS/i)),
      //   $.xml_type_definition
      // ),
      //
      // seq(
      //   token(/WITH/i),
      //   token(/XMLNAMESPACES/i),
      //   '(',
      //   $.xml_declaration,
      //   repeat(seq($.comma, $.xml_declaration)),
      //   ')'
      // )
    ),

    declare_local: $ => seq(
      LOCAL_ID,
      optional(token(/AS/i)),
      choice(
        $.data_type,
        $.table_name
      ),
      optional(seq(EQUAL, $.expression))
    ),

    select: $ => token(/SELECT/i),
    //https://learn.microsoft.com/en-us/sql/t-sql/queries/select-clause-transact-sql?view=sql-server-ver16&redirectedfrom=MSDN
    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4119
    select_list: $ => seq($.select_list_elem, repeat(seq(token(','), $.select_list_elem))),

    //TODO REDO THIS ONE
    select_list_elem: $ => choice(
      $.asterisk
      ,$.udt_elem
      ,seq($.LOCAL_ID_, choice($.assignment_operator, token('=')), $.expression)
      ,$.expression_elem
      //TODO https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4143-L4148
    ),

    //TODO
    groupby: $ => seq($.groupby_, choice(
      field('groupBys',seq($.group_by_item, repeat(seq(token(','), $.group_by_item))))
    )),

    //TODO
    group_by_item: $ => choice(
      $.expression
    ),

    groupby_: $ => token(/GROUP BY/i),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L6294
    assignment_operator: $ => choice(
       token('+=')
      ,token('-=')
      ,token('*=')
      ,token('/=')
      ,token('%=')
      ,token('&=')
      ,token('^=')
      ,token('|=')
    ),

    asterisk: $ => token(/\*/),

    //https://learn.microsoft.com/en-us/sql/t-sql/queries/select-clause-transact-sql?view=sql-server-ver16
    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4133
    udt_elem: $ => prec.left(choice(
      seq(field('udt_column_name', $.id_), DOT, field('non_static_attr',$.id_), $.udt_method_arguments, optional($.as_column_alias))

      ,seq(field('udt_column_name', $.id_), DOUBLE_COLON, field('non_static_attr',$.id_)
        ,optional($.udt_method_arguments)
        ,optional($.as_column_alias))
    )),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4123
    udt_method_arguments: $ => seq(
      parens($.execute_var_string, repeat(seq(token(','), $.execute_var_string)))
    ),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4138
    expression_elem: $ => prec.right(choice(
      seq(field('leftAlias', $.column_alias), token(/=/), field('leftAssignment', $.expression))
      ,seq(field('expressionAs', $.expression), optional($.as_column_alias))
    )),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4910
    as_column_alias: $ => seq(optional($.as), $.column_alias),
    as: $ => token(/AS/i),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4990
    column_alias: $ => choice(
      $.id_
      ,$.string_lit
    ),

    table_sources: $ => choice(
      $.table_source
      //TODO https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4150-L4153
    ),

    //TODO https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4160C4-L4163
    table_source: $ => seq($.table_source_item),

    table_source_item: $ => choice(
      $.full_table_name
    ),

    //TODO CORPUS
    table_name: $ => prec.right(seq(
      optional(choice(
        seq(field('database', $.id_), DOT, field('schema', $.id_))
        ,seq(field('schema', $.id_), DOT)
      ))
      ,choice(
        field('table', $.id_)
        //TODO blocking_hiearchy
        //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5128
      )
    )),


    full_table_name: $ => prec.right(seq(
      optional(choice(
      //NOTE? whats this dotdot example https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5118
        seq(field('server', $.id_), DOT, field('database', $.id_), DOT, field('schema', $.id_), DOT)
        ,seq(field('database', $.id_), DOT, field('schema', $.id_), DOT)
        ,seq(field('schema', $.id_), DOT)
      ))
      ,field('table', $.id_)
    )),

    //TODO https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5155-L5160
    full_column_name: $ => seq(
      $.id_
    ),

    //TODO CORPUS
    expression: $ => choice(
      $.primitive_expression
      ,$.full_column_name
      ,$.function_call
      //TODO https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L3900-L3917
    ),

    //TODO CORPUS
    function_call: $ => choice(
      $.ranking_windowed_function
      ,$.aggregate_functions
      ,$.analytic_windowed_functions

      ,$.built_in_functions
      //TODO built_in_function ~~200 rules https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4291

      ,choice(
        seq($.scalar_function_name, parens(optional($.expression_list_)))
        ,seq(choice($.binary_checksum_, $.checksum_), parens(choice($.asterisk, $.expression_list_))) //TODO MOVE TO BUILTINS
      )

      ,$.partition_function
      //TODO https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4287
      ,$.hierarchyid_static_method
      //TODO freetext_function
      ,$.odbc_scalar_functions
      ,$.bit_manipulation_functions
      ,$.collation_functions
      ,$.configuration_functions
      ,$.conversion_functions
    ),

    // ...built_in_functions,
    // ...odbc_scalar_functions,
    // ...aggregate_window_functions,
    // ...analytic_windowed_functions,
    // ...bit_manipulation_functions,
    // ...collation_functions,
    // ...configuration_functions,
    // ...conversion_functions,
    // ...data_type,

    //https://learn.microsoft.com/en-us/sql/t-sql/data-types/hierarchyid-data-type-method-reference?view=sql-server-ver16
    hierarchyid_static_method: $ => choice(
      seq($.hierachyid_, DOUBLE_COLON, choice(
        seq($.getroot_, parens())
        ,seq($.parse_, parens(field('input',$.expression)))
        )
      )
      ,seq($.id_, DOT, choice(
        $.getlevel_
        ,$.tostring_
      ), parens())

      ,seq($.id_, DOT, choice(
        $.getancestor_
        ,$.is_descendant_of_
      ), parens($.expression))

      ,seq($.id_, DOT, choice(
        $.get_reparented_value_
        ,$.get_descendant_
      ), parens(seq($.expression, token(','), $.expression)))


    ),

    hierachyid_: $ => token(/HIERARCHYID/i),

    get_descendant_: $ => token(/GetDescendant/i),
    get_reparented_value_: $ => token(/GetReparentedValue/i),
    getancestor_: $ => token(/GETANCESTOR/i),
    is_descendant_of_: $ => token(/IsDescendantOf/i),
    getlevel_: $ => token(/GETLEVEL/i),
    getroot_: $ => token(/GETROOT/i),
    tostring_: $ => token(/ToString/i),


    parse_: $ => token(/PARSE/i),

    // https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4298-L4300
    partition_function: $ => seq(
      optional(seq(field('database', $.id_), DOT)), $.dollar_partition_, DOT, field('func_name', $.id_), parens($.expression)
    ),

    dollar_partition_: $ => token(/\$PARTITION/i),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5198
    scalar_function_name: $ => choice(
      $.func_proc_name_database_schema
      ,$.right_
      ,$.left_
    ),

    right_: $ => token(/RIGHT/i),
    left_: $ => token(/LEFT/i),
    binary_checksum_: $ => token(/BINARY_CHECKSUM/i),
    checksum_: $ => token(/CHECKSUM/i),

    local_id_: $ => LOCAL_ID,
    seperator: $ => choice(
      $.local_id_
      ,$.string_lit
    ),
    //https://msdn.microsoft.com/en-us/library/ms189798.aspx
    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5004
    ranking_windowed_function: $ => choice(
      seq(choice($.rank_, $.dense_rank_, $.row_number_)
        ,token('('), token(')'), $.over_clause)
      ,seq($.ntile_, parens($.expression), $.over_clause)
    ),

    ntile_: $ => token(/NTILE/i),
    rank_: $ => token(/RANK/i),
    dense_rank_: $ => token(/DENSE_RANK/i),
    row_number_: $ => token(/ROW_NUMBER/i),

    //https://msdn.microsoft.com/en-us/library/ms189461.aspx
    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5033
    over_clause: $ => seq(
      token(/OVER/i)
      ,token('(')
        ,optional($.partition_by_clause)
        ,optional($.order_by_clause)
        ,optional($.row_or_range_clause)
      ,token(')')
    ),

    partition_by_clause: $ => seq(token(/PARTITION/i), token(/BY/i), $.expression_list_),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4999
    expression_list_: $ => prec.left(seq($.expression, repeat(seq(token(','), $.expression)))),

    //https://docs.microsoft.com/en-us/sql/t-sql/queries/select-over-clause-transact-sql?view=sql-server-ver16
    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4041
    order_by_clause: $ => seq(
      token(/ORDER/i), token(/BY/i), $.order_by_expression, repeat(seq(token(','), $.order_by_expression))
    ),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L4071
    order_by_expression: $ => seq(
      field('order_by', $.expression)
      ,optional($.collation_)
      ,optional(choice(
        field('ascending', $.asc_)
        ,field('descending', $.desc_)
      )),
    ),

    collation_: $ => seq(
      token(/COLLATE/i)
      ,field('collation_name', $.id_)
    ),

    asc_: $ => token(/ASC/i),
    desc_: $ => token(/DESC/i),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5041
    window_frame_extent: $ => choice(
      $.window_frame_preceding
      ,seq(token(/BETWEEN/i), $.window_frame_bound, token(/AND/i), $.window_frame_bound)
    ),

    window_frame_bound: $ => choice(
      $.window_frame_preceding
      ,$.window_frame_following
    ),

    window_frame_following: $ => choice(
      seq(token(/UNBOUNDED/i), token(/FOLLOWING/i))
      ,seq(DECIMAL, token(/FOLLOWING/i))
    ),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5051
    window_frame_preceding: $ => choice(
      seq(token(/UNBOUNDED/i), token(/PRECEDING/i))
      ,seq(DECIMAL, token(/PRECEDING/i))
      ,seq(token(/CURRENT/i), token(/ROW/i))
    ),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5037
    row_or_range_clause: $ => seq(
      choice(token(/ROWS/i), token(/RANGE/i)),
      $.window_frame_extent
    ),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L3927
    primitive_expression: $ => choice(
      $.default
      ,$.null_
      ,$.LOCAL_ID_
      ,$.primitive_constant
    ),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5278
    primitive_constant: $ => choice(
      $.string_lit
      ,$.binary
      ,$.real_
      ,$.decimal_
      ,$.float_
      ,$.money_
      ,$.parameter_
    ),

    binary: $ => token(/0x[0-9A-F]*/),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L5283
    money_: $ => seq(field('dollar', token('$')), optional(choice(token('-'),token('+'))), choice($.real_, $.float_)),

    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L3919-L3921
    parameter_: $ => token('?'),


    //https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlLexer.g4#L1231
    real_: $ => seq(
      choice(DECIMAL,DEC_DOT_DEC)
      ,token(/E/i)
      ,optional(choice(token('+'),token('-')))
      ,token(/[0-9]+/)),

    placeholder: $ => alias('TODO', $.dummy),

    // MARKER

    data_type: $ => choice(
      seq(
        field('scaled', choice(
          VARCHAR,
          NVARCHAR,
          BINARY,
          VARBINARY_KEYWORD,
          SQUARE_BRACKET_ID
        )),
        '(',
        token(/MAX/i),
        ')'
      ),
      seq(
        field('ext_type', $.id_),
        '(',
        field('scale', DECIMAL),
        ',',
        field('prec', DECIMAL),
        ')'
      ),
      seq(
        field('ext_type', $.id_),
        '(',
        field('scale', DECIMAL),
        ')'
      ),
      seq(
        field('ext_type', $.id_),
        IDENTITY,
        optional(seq(
          '(',
          field('seed', DECIMAL),
          ',',
          field('inc', DECIMAL),
          ')'
        ))
      ),
      seq(
        DOUBLE,
        optional(PRECISION)
      ),

      field('unscaled_type', $.id_)
    ),

    constant: $ => choice(
      STRING,
      BINARY,
      seq(optional('-'), choice(DECIMAL, REAL, FLOAT)),
      seq(optional('-'), seq(
        field("dollar", DOLLAR),
        optional(choice(PLUS, MINUS)),
        choice(DECIMAL, FLOAT)
      )),
      $.parameter
    ),

    primitive_constant: $ => choice(
      STRING,
      BINARY,
      choice(DECIMAL, REAL, FLOAT),
      seq(
        field("dollar", DOLLAR),
        optional(choice(PLUS, MINUS)),
        choice(DECIMAL, FLOAT)
      ),
      $.parameter
    ),

    keyword: $ => choice(
      ABORT,
      ABSOLUTE,
      ACCENT_SENSITIVITY,
      ACCESS,
      ACTION,
      ACTIVATION,
      ACTIVE,
      ADD,
      ADDRESS,
      AES_128,
      AES_192,
      AES_256,
      AFFINITY,
      AFTER,
      AGGREGATE,
      ALGORITHM,
      ALL_CONSTRAINTS,
      ALL_ERRORMSGS,
      ALL_INDEXES,
      ALL_LEVELS,
      ALLOW_ENCRYPTED_VALUE_MODIFICATIONS,
      ALLOW_PAGE_LOCKS,
      ALLOW_ROW_LOCKS,
      ALLOW_SNAPSHOT_ISOLATION,
      ALLOWED,
      ALWAYS,
      ANSI_DEFAULTS,
      ANSI_NULL_DEFAULT,
      ANSI_NULL_DFLT_OFF,
      ANSI_NULL_DFLT_ON,
      ANSI_NULLS,
      ANSI_PADDING,
      ANSI_WARNINGS,
      APP_NAME,
      APPLICATION_LOG,
      APPLOCK_MODE,
      APPLOCK_TEST,
      APPLY,
      ARITHABORT,
      ARITHIGNORE,
      ASCII,
      ASSEMBLY,
      ASSEMBLYPROPERTY,
      AT_KEYWORD,
      AUDIT,
      AUDIT_GUID,
      AUTO,
      AUTO_CLEANUP,
      AUTO_CLOSE,
      AUTO_CREATE_STATISTICS,
      AUTO_DROP,
      AUTO_SHRINK,
      AUTO_UPDATE_STATISTICS,
      AUTO_UPDATE_STATISTICS_ASYNC,
      AUTOGROW_ALL_FILES,
      AUTOGROW_SINGLE_FILE,
      AVAILABILITY,
      AVG,
      BACKUP_CLONEDB,
      BACKUP_PRIORITY,
      BASE64,
      BEGIN_DIALOG,
      BIGINT,
      BINARY_KEYWORD,
      BINARY_CHECKSUM,
      BINDING,
      BLOB_STORAGE,
      BROKER,
      BROKER_INSTANCE,
      BULK_LOGGED,
      CALLER,
      CAP_CPU_PERCENT,
      CAST,
      TRY_CAST,
      CATALOG,
      CATCH,
      CERT_ID,
      CERTENCODED,
      CERTPRIVATEKEY,
      CHANGE,
      CHANGE_RETENTION,
      CHANGE_TRACKING,
      CHAR,
      CHARINDEX,
      CHECKALLOC,
      CHECKCATALOG,
      CHECKCONSTRAINTS,
      CHECKDB,
      CHECKFILEGROUP,
      CHECKSUM,
      CHECKSUM_AGG,
      CHECKTABLE,
      CLEANTABLE,
      CLEANUP,
      CLONEDATABASE,
      COL_LENGTH,
      COL_NAME,
      COLLECTION,
      COLUMN_ENCRYPTION_KEY,
      COLUMN_MASTER_KEY,
      COLUMNPROPERTY,
      COLUMNS,
      COLUMNSTORE,
      COLUMNSTORE_ARCHIVE,
      COMMITTED,
      COMPATIBILITY_LEVEL,
      COMPRESS_ALL_ROW_GROUPS,
      COMPRESSION_DELAY,
      CONCAT,
      CONCAT_WS,
      CONCAT_NULL_YIELDS_NULL,
      CONTENT,
      CONTROL,
      COOKIE,
      COUNT,
      COUNT_BIG,
      COUNTER,
      CPU,
      CREATE_NEW,
      CREATION_DISPOSITION,
      CREDENTIAL,
      CRYPTOGRAPHIC,
      CUME_DIST,
      CURSOR_CLOSE_ON_COMMIT,
      CURSOR_DEFAULT,
      CURSOR_STATUS,
      DATA,
      DATA_PURITY,
      DATABASE_PRINCIPAL_ID,
      DATABASEPROPERTYEX,
      DATALENGTH,
      DATE_CORRELATION_OPTIMIZATION,
      DATEADD,
      DATEDIFF,
      DATENAME,
      DATEPART,
      DAYS,
      DB_CHAINING,
      DB_FAILOVER,
      DB_ID,
      DB_NAME,
      DBCC,
      DBREINDEX,
      DECRYPTION,
      DEFAULT_DOUBLE_QUOTE,
      DEFAULT_FULLTEXT_LANGUAGE,
      DEFAULT_LANGUAGE,
      DEFINITION,
      DELAY,
      DELAYED_DURABILITY,
      DELETED,
      DENSE_RANK,
      DEPENDENTS,
      DES,
      DESCRIPTION,
      DESX,
      DETERMINISTIC,
      DHCP,
      DIALOG,
      DIFFERENCE,
      DIRECTORY_NAME,
      DISABLE,
      DISABLE_BROKER,
      DISABLED,
      DOCUMENT,
      DROP_EXISTING,
      DROPCLEANBUFFERS,
      DYNAMIC,
      ELEMENTS,
      EMERGENCY,
      EMPTY,
      ENABLE,
      ENABLE_BROKER,
      ENCRYPTED,
      ENCRYPTED_VALUE,
      ENCRYPTION,
      ENCRYPTION_TYPE,
      ENDPOINT_URL,
      ERROR_BROKER_CONVERSATIONS,
      ESTIMATEONLY,
      EXCLUSIVE,
      EXECUTABLE,
      EXIST,
      EXIST_SQUARE_BRACKET,
      EXPAND,
      EXPIRY_DATE,
      EXPLICIT,
      EXTENDED_LOGICAL_CHECKS,
      FAIL_OPERATION,
      FAILOVER_MODE,
      FAILURE,
      FAILURE_CONDITION_LEVEL,
      FAST,
      FAST_FORWARD,
      FILE_ID,
      FILE_IDEX,
      FILE_NAME,
      FILEGROUP,
      FILEGROUP_ID,
      FILEGROUP_NAME,
      FILEGROUPPROPERTY,
      FILEGROWTH,
      FILENAME,
      FILEPATH,
      FILEPROPERTY,
      FILEPROPERTYEX,
      FILESTREAM,
      FILTER,
      FIRST,
      FIRST_VALUE,
      FMTONLY,
      FOLLOWING,
      FORCE,
      FORCE_FAILOVER_ALLOW_DATA_LOSS,
      FORCED,
      FORCEPLAN,
      FORCESCAN,
      FORMAT,
      FORWARD_ONLY,
      FREE,
      FULLSCAN,
      FULLTEXT,
      FULLTEXTCATALOGPROPERTY,
      FULLTEXTSERVICEPROPERTY,
      GB,
      GENERATED,
      GETDATE,
      GETUTCDATE,
      GLOBAL,
      GO,
      GREATEST,
      GROUP_MAX_REQUESTS,
      GROUPING,
      GROUPING_ID,
      HADR,
      HAS_DBACCESS,
      HAS_PERMS_BY_NAME,
      HASH,
      HEALTH_CHECK_TIMEOUT,
      HIDDEN_KEYWORD,
      HIGH,
      HONOR_BROKER_PRIORITY,
      HOURS,
      IDENT_CURRENT,
      IDENT_INCR,
      IDENT_SEED,
      IDENTITY_VALUE,
      IGNORE_CONSTRAINTS,
      IGNORE_DUP_KEY,
      IGNORE_NONCLUSTERED_COLUMNSTORE_INDEX,
      IGNORE_REPLICATED_TABLE_CACHE,
      IGNORE_TRIGGERS,
      IMMEDIATE,
      IMPERSONATE,
      IMPLICIT_TRANSACTIONS,
      IMPORTANCE,
      INCLUDE_NULL_VALUES,
      INCREMENTAL,
      INDEX_COL,
      INDEXKEY_PROPERTY,
      INDEXPROPERTY,
      INITIATOR,
      INPUT,
      INSENSITIVE,
      INSERTED,
      INT,
      IP,
      IS_MEMBER,
      IS_ROLEMEMBER,
      IS_SRVROLEMEMBER,
      ISJSON,
      ISOLATION,
      JOB,
      JSON,
      JSON_OBJECT,
      JSON_ARRAY,
      JSON_VALUE,
      JSON_QUERY,
      JSON_MODIFY,
      JSON_PATH_EXISTS,
      KB,
      KEEP,
      KEEPDEFAULTS,
      KEEPFIXED,
      KEEPIDENTITY,
      KEY_SOURCE,
      KEYS,
      KEYSET,
      LAG,
      LAST,
      LAST_VALUE,
      LEAD,
      LEAST,
      LEN,
      LEVEL,
      LIST,
      LISTENER,
      LISTENER_URL,
      LOB_COMPACTION,
      LOCAL,
      LOCATION,
      LOCK,
      LOCK_ESCALATION,
      LOGIN,
      LOGINPROPERTY,
      LOOP,
      LOW,
      LOWER,
      LTRIM,
      MANUAL,
      MARK,
      MASKED,
      MATERIALIZED,
      MAX,
      MAX_CPU_PERCENT,
      MAX_DOP,
      MAX_FILES,
      MAX_IOPS_PER_VOLUME,
      MAX_MEMORY_PERCENT,
      MAX_PROCESSES,
      MAX_QUEUE_READERS,
      MAX_ROLLOVER_FILES,
      MAXDOP,
      MAXRECURSION,
      MAXSIZE,
      MB,
      MEDIUM,
      MEMORY_OPTIMIZED_DATA,
      MESSAGE,
      MIN,
      MIN_ACTIVE_ROWVERSION,
      MIN_CPU_PERCENT,
      MIN_IOPS_PER_VOLUME,
      MIN_MEMORY_PERCENT,
      MINUTES,
      MIRROR_ADDRESS,
      MIXED_PAGE_ALLOCATION,
      MODE,
      MODIFY,
      MODIFY_SQUARE_BRACKET,
      MOVE,
      MULTI_USER,
      NAME,
      NCHAR,
      NESTED_TRIGGERS,
      NEW_ACCOUNT,
      NEW_BROKER,
      NEW_PASSWORD,
      NEWNAME,
      NEXT,
      NO,
      NO_INFOMSGS,
      NO_QUERYSTORE,
      NO_STATISTICS,
      NO_TRUNCATE,
      NO_WAIT,
      NOCOUNT,
      NODES,
      NOEXEC,
      NOEXPAND,
      NOINDEX,
      NOLOCK,
      NON_TRANSACTED_ACCESS,
      NORECOMPUTE,
      NORECOVERY,
      NOTIFICATIONS,
      NOWAIT,
      NTILE,
      NULL_DOUBLE_QUOTE,
      NUMANODE,
      NUMBER,
      NUMERIC_ROUNDABORT,
      OBJECT,
      OBJECT_DEFINITION,
      OBJECT_ID,
      OBJECT_NAME,
      OBJECT_SCHEMA_NAME,
      OBJECTPROPERTY,
      OBJECTPROPERTYEX,
      OFFLINE,
      OFFSET,
      OLD_ACCOUNT,
      ONLINE,
      ONLY,
      OPEN_EXISTING,
      OPENJSON,
      OPTIMISTIC,
      OPTIMIZE,
      OPTIMIZE_FOR_SEQUENTIAL_KEY,
      ORIGINAL_DB_NAME,
      ORIGINAL_LOGIN,
      OUT,
      OUTPUT,
      OVERRIDE,
      OWNER,
      OWNERSHIP,
      PAD_INDEX,
      PAGE_VERIFY,
      PAGECOUNT,
      PAGLOCK,
      PARAMETERIZATION,
      PARSENAME,
      PARSEONLY,
      PARTITION,
      PARTITIONS,
      PARTNER,
      PATH,
      PATINDEX,
      PAUSE,
      PDW_SHOWSPACEUSED,
      PERCENT_RANK,
      PERCENTILE_CONT,
      PERCENTILE_DISC,
      PERMISSIONS,
      PERSIST_SAMPLE_PERCENT,
      PHYSICAL_ONLY,
      POISON_MESSAGE_HANDLING,
      POOL,
      PORT,
      PRECEDING,
      PRIMARY_ROLE,
      PRIOR,
      PRIORITY,
      PRIORITY_LEVEL,
      PRIVATE,
      PRIVATE_KEY,
      PRIVILEGES,
      PROCCACHE,
      PROCEDURE_NAME,
      PROPERTY,
      PROVIDER,
      PROVIDER_KEY_NAME,
      PWDCOMPARE,
      PWDENCRYPT,
      QUERY,
      QUERY_SQUARE_BRACKET,
      QUEUE,
      QUEUE_DELAY,
      QUOTED_IDENTIFIER,
      QUOTENAME,
      RANDOMIZED,
      RANGE,
      RANK,
      RC2,
      RC4,
      RC4_128,
      READ_COMMITTED_SNAPSHOT,
      READ_ONLY,
      READ_ONLY_ROUTING_LIST,
      READ_WRITE,
      READCOMMITTED,
      READCOMMITTEDLOCK,
      READONLY,
      READPAST,
      READUNCOMMITTED,
      READWRITE,
      REBUILD,
      RECEIVE,
      RECOMPILE,
      RECOVERY,
      RECURSIVE_TRIGGERS,
      RELATIVE,
      REMOTE,
      REMOTE_PROC_TRANSACTIONS,
      REMOTE_SERVICE_NAME,
      REMOVE,
      REORGANIZE,
      REPAIR_ALLOW_DATA_LOSS,
      REPAIR_FAST,
      REPAIR_REBUILD,
      REPEATABLE,
      REPEATABLEREAD,
      REPLACE,
      REPLICA,
      REPLICATE,
      REQUEST_MAX_CPU_TIME_SEC,
      REQUEST_MAX_MEMORY_GRANT_PERCENT,
      REQUEST_MEMORY_GRANT_TIMEOUT_SEC,
      REQUIRED_SYNCHRONIZED_SECONDARIES_TO_COMMIT,
      RESAMPLE,
      RESERVE_DISK_SPACE,
      RESOURCE,
      RESOURCE_MANAGER_LOCATION,
      RESTRICTED_USER,
      RESUMABLE,
      RETENTION,
      REVERSE,
      ROBUST,
      ROOT,
      ROUTE,
      ROW,
      ROW_NUMBER,
      ROWGUID,
      ROWLOCK,
      ROWS,
      RTRIM,
      SAMPLE,
      SCHEMA_ID,
      SCHEMA_NAME,
      SCHEMABINDING,
      SCOPE_IDENTITY,
      SCOPED,
      SCROLL,
      SCROLL_LOCKS,
      SEARCH,
      SECONDARY,
      SECONDARY_ONLY,
      SECONDARY_ROLE,
      SECONDS,
      SECRET,
      SECURABLES,
      SECURITY,
      SECURITY_LOG,
      SEEDING_MODE,
      SELF,
      SEMI_SENSITIVE,
      SEND,
      SENT,
      SEQUENCE,
      SEQUENCE_NUMBER,
      SERIALIZABLE,
      SERVERPROPERTY,
      SERVICEBROKER,
      SESSIONPROPERTY,
      SESSION_TIMEOUT,
      SETERROR,
      SHARE,
      SHARED,
      SHOWCONTIG,
      SHOWPLAN,
      SHOWPLAN_ALL,
      SHOWPLAN_TEXT,
      SHOWPLAN_XML,
      SIGNATURE,
      SIMPLE,
      SINGLE_USER,
      SIZE,
      SMALLINT,
      SNAPSHOT,
      SORT_IN_TEMPDB,
      SOUNDEX,
      SPACE_KEYWORD,
      SPARSE,
      SPATIAL_WINDOW_MAX_CELLS,
      SQL_VARIANT_PROPERTY,
      STANDBY,
      START_DATE,
      STATIC,
      STATISTICS_INCREMENTAL,
      STATISTICS_NORECOMPUTE,
      STATS_DATE,
      STATS_STREAM,
      STATUS,
      STATUSONLY,
      STDEV,
      STDEVP,
      STOPLIST,
      STR,
      STRING_AGG,
      STRING_ESCAPE,
      STUFF,
      SUBJECT,
      SUBSCRIBE,
      SUBSCRIPTION,
      SUBSTRING,
      SUM,
      SUSER_ID,
      SUSER_NAME,
      SUSER_SID,
      SUSER_SNAME,
      SUSPEND,
      SYMMETRIC,
      SYNCHRONOUS_COMMIT,
      SYNONYM,
      SYSTEM,
      TABLERESULTS,
      TABLOCK,
      TABLOCKX,
      TAKE,
      TARGET_RECOVERY_TIME,
      TB,
      TEXTIMAGE_ON,
      THROW,
      TIES,
      TIME,
      TIMEOUT,
      TIMER,
      TINYINT,
      TORN_PAGE_DETECTION,
      TRACKING,
      TRANSACTION_ID,
      TRANSFORM_NOISE_WORDS,
      TRANSLATE,
      TRIM,
      TRIPLE_DES,
      TRIPLE_DES_3KEY,
      TRUSTWORTHY,
      TRY,
      TSQL,
      TWO_DIGIT_YEAR_CUTOFF,
      TYPE,
      TYPE_ID,
      TYPE_NAME,
      TYPE_WARNING,
      TYPEPROPERTY,
      UNBOUNDED,
      UNCOMMITTED,
      UNICODE,
      UNKNOWN,
      UNLIMITED,
      UNMASK,
      UOW,
      UPDLOCK,
      UPPER,
      USER_ID,
      USER_NAME,
      USING,
      VALID_XML,
      VALIDATION,
      VALUE,
      VALUE_SQUARE_BRACKET,
      VAR,
      VARBINARY_KEYWORD,
      VARP,
      VERIFY_CLONEDB,
      VERSION,
      VIEW_METADATA,
      VIEWS,
      WAIT,
      WELL_FORMED_XML,
      WITHOUT_ARRAY_WRAPPER,
      WORK,
      WORKLOAD,
      XLOCK,
      XML,
      XML_COMPRESSION,
      XMLDATA,
      XMLNAMESPACES,
      XMLSCHEMA,
      XSINIL,
      ZONE,
      // More keywords that can also be used as IDs
      ABORT_AFTER_WAIT,
      ABSENT,
      ADMINISTER,
      AES,
      ALLOW_CONNECTIONS,
      ALLOW_MULTIPLE_EVENT_LOSS,
      ALLOW_SINGLE_EVENT_LOSS,
      ANONYMOUS,
      APPEND,
      APPLICATION,
      ASYMMETRIC,
      ASYNCHRONOUS_COMMIT,
      AUTHENTICATE,
      AUTHENTICATION,
      AUTOMATED_BACKUP_PREFERENCE,
      AUTOMATIC,
      AVAILABILITY_MODE,
      BEFORE,
      BLOCK,
      BLOCKERS,
      BLOCKSIZE,
      BLOCKING_HIERARCHY,
      BUFFER,
      BUFFERCOUNT,
      CACHE,
      CALLED,
      CERTIFICATE,
      CHANGETABLE,
      CHANGES,
      CHECK_POLICY,
      CHECK_EXPIRATION,
      CLASSIFIER_FUNCTION,
      CLUSTER,
      COMPRESS,
      COMPRESSION,
      CONNECT,
      CONNECTION,
      CONFIGURATION,
      CONNECTIONPROPERTY,
      CONTAINMENT,
      CONTEXT,
      CONTEXT_INFO,
      CONTINUE_AFTER_ERROR,
      CONTRACT,
      CONTRACT_NAME,
      CONVERSATION,
      COPY_ONLY,
      CURRENT_REQUEST_ID,
      CURRENT_TRANSACTION_ID,
      CYCLE,
      DATA_COMPRESSION,
      DATA_SOURCE,
      DATABASE_MIRRORING,
      DATASPACE,
      DDL,
      DECOMPRESS,
      DEFAULT_DATABASE,
      DEFAULT_SCHEMA,
      DIAGNOSTICS,
      DIFFERENTIAL,
      DISTRIBUTION,
      DTC_SUPPORT,
      ENABLED,
      ENDPOINT,
      ERROR,
      ERROR_LINE,
      ERROR_MESSAGE,
      ERROR_NUMBER,
      ERROR_PROCEDURE,
      ERROR_SEVERITY,
      ERROR_STATE,
      EVENT,
      EVENTDATA,
      EVENT_RETENTION_MODE,
      EXECUTABLE_FILE,
      EXPIREDATE,
      EXTENSION,
      EXTERNAL_ACCESS,
      FAILOVER,
      FAILURECONDITIONLEVEL,
      FAN_IN,
      FILE_SNAPSHOT,
      FORCESEEK,
      FORCE_SERVICE_ALLOW_DATA_LOSS,
      FORMATMESSAGE,
      GET,
      GET_FILESTREAM_TRANSACTION_CONTEXT,
      GETANCESTOR,
      GETANSINULL,
      GETDESCENDANT,
      GETLEVEL,
      GETREPARENTEDVALUE,
      GETROOT,
      GOVERNOR,
      HASHED,
      HEALTHCHECKTIMEOUT,
      HEAP,
      HIERARCHYID,
      HOST_ID,
      HOST_NAME,
      IIF,
      IO,
      INCLUDE,
      INCREMENT,
      INFINITE,
      INIT,
      INSTEAD,
      ISDESCENDANTOF,
      ISNULL,
      ISNUMERIC,
      KERBEROS,
      KEY_PATH,
      KEY_STORE_PROVIDER_NAME,
      LANGUAGE,
      LIBRARY,
      LIFETIME,
      LINKED,
      LINUX,
      LISTENER_IP,
      LISTENER_PORT,
      LOCAL_SERVICE_NAME,
      LOG,
      MASK,
      MATCHED,
      MASTER,
      MAX_MEMORY,
      MAXTRANSFER,
      MAXVALUE,
      MAX_DISPATCH_LATENCY,
      MAX_DURATION,
      MAX_EVENT_SIZE,
      MAX_SIZE,
      MAX_OUTSTANDING_IO_PER_VOLUME,
      MEDIADESCRIPTION,
      MEDIANAME,
      MEMBER,
      MEMORY_PARTITION_MODE,
      MESSAGE_FORWARDING,
      MESSAGE_FORWARD_SIZE,
      MINVALUE,
      MIRROR,
      MUST_CHANGE,
      NEWID,
      NEWSEQUENTIALID,
      NOFORMAT,
      NOINIT,
      NONE,
      NOREWIND,
      NOSKIP,
      NOUNLOAD,
      NO_CHECKSUM,
      NO_COMPRESSION,
      NO_EVENT_LOSS,
      NOTIFICATION,
      NTLM,
      OLD_PASSWORD,
      ON_FAILURE,
      OPERATIONS,
      PAGE,
      PARAM_NODE,
      PARTIAL,
      PASSWORD,
      PERMISSION_SET,
      PER_CPU,
      PER_DB,
      PER_NODE,
      PERSISTED,
      PLATFORM,
      POLICY,
      PREDICATE,
      PROCESS,
      PROFILE,
      PYTHON,
      R,
      READ_WRITE_FILEGROUPS,
      REGENERATE,
      RELATED_CONVERSATION,
      RELATED_CONVERSATION_GROUP,
      REQUIRED,
      RESET,
      RESOURCES,
      RESTART,
      RESUME,
      RETAINDAYS,
      RETURNS,
      REWIND,
      ROLE,
      ROUND_ROBIN,
      ROWCOUNT_BIG,
      RSA_512,
      RSA_1024,
      RSA_2048,
      RSA_3072,
      RSA_4096,
      SAFETY,
      SAFE,
      SCHEDULER,
      SCHEME,
      SCRIPT,
      SERVER,
      SERVICE,
      SERVICE_BROKER,
      SERVICE_NAME,
      SESSION,
      SESSION_CONTEXT,
      SETTINGS,
      SHRINKLOG,
      SID,
      SKIP_KEYWORD,
      SOFTNUMA,
      SOURCE,
      SPECIFICATION,
      SPLIT,
      SQL,
      SQLDUMPERFLAGS,
      SQLDUMPERPATH,
      SQLDUMPERTIMEOUT,
      STATE,
      STATS,
      START,
      STARTED,
      STARTUP_STATE,
      STOP,
      STOPPED,
      STOP_ON_ERROR,
      SUPPORTED,
      SWITCH,
      TAPE,
      TARGET,
      TCP,
      TOSTRING,
      TRACE,
      TRACK_CAUSALITY,
      TRANSFER,
      UNCHECKED,
      UNLOCK,
      UNSAFE,
      URL,
      USED,
      VERBOSELOGGING,
      VISIBILITY,
      WAIT_AT_LOW_PRIORITY,
      WINDOWS,
      WITHOUT,
      WITNESS,
      XACT_ABORT,
      XACT_STATE,
      //
      ABS,
      ACOS,
      ASIN,
      ATAN,
      ATN2,
      CEILING,
      COS,
      COT,
      DEGREES,
      EXP,
      FLOOR,
      LOG10,
      PI,
      POWER,
      RADIANS,
      RAND,
      ROUND,
      SIGN,
      SIN,
      SQRT,
      SQUARE,
      TAN,
      //
      CURRENT_TIMEZONE,
      CURRENT_TIMEZONE_ID,
      DATE_BUCKET,
      DATEDIFF_BIG,
      DATEFROMPARTS,
      DATETIME2FROMPARTS,
      DATETIMEFROMPARTS,
      DATETIMEOFFSETFROMPARTS,
      DATETRUNC,
      DAY,
      EOMONTH,
      ISDATE,
      MONTH,
      SMALLDATETIMEFROMPARTS,
      SWITCHOFFSET,
      SYSDATETIME,
      SYSDATETIMEOFFSET,
      SYSUTCDATETIME,
      TIMEFROMPARTS,
      TODATETIMEOFFSET,
      YEAR,
      //
      QUARTER,
      DAYOFYEAR,
      WEEK,
      HOUR,
      MINUTE,
      SECOND,
      MILLISECOND,
      MICROSECOND,
      NANOSECOND,
      TZOFFSET,
      ISO_WEEK,
      WEEKDAY,
      //
      YEAR_ABBR,
      QUARTER_ABBR,
      MONTH_ABBR,
      DAYOFYEAR_ABBR,
      DAY_ABBR,
      WEEK_ABBR,
      HOUR_ABBR,
      MINUTE_ABBR,
      SECOND_ABBR,
      MILLISECOND_ABBR,
      MICROSECOND_ABBR,
      NANOSECOND_ABBR,
      TZOFFSET_ABBR,
      ISO_WEEK_ABBR,
      WEEKDAY_ABBR,
      //
      SP_EXECUTESQL,
      // Built-ins
      VARCHAR,
      NVARCHAR,
      PRECISION, // https://github.com/antlr/grammars-v4/blob/master/sql/tsql/TSqlParser.g4#L6257
      FILESTREAM_ON,
    ),

    // https://msdn.microsoft.com/en-us/library/ms175874.aspx
    id_: $ => choice(
      ID,
      TEMP_ID,
      DOUBLE_QUOTE_ID,
      DOUBLE_QUOTE_BLANK,
      SQUARE_BRACKET_ID,
      $.keyword,
      RAW,
    ),

    simple_id: $ => ID,

    id_or_string: $ => choice($.id_, STRING),

    // https://msdn.microsoft.com/en-us/library/ms188074.aspx
    // Spaces are allowed for comparison operators.
    comparison_operator: $ => choice(
      '=',
      '>',
      '<',
      '<=',
      '>=',
      '<>',
      '!=',
      '!>',
      '!<'
    ),

    assignment_operator: $ => choice(
      '+=',
      '-=',
      '*=',
      '/=',
      '%=',
      '&=',
      '^=',
      '|='
    ),

    file_size: $ => seq(
      DECIMAL,
      optional(choice(KB, MB, GB, TB, "%"))
    )
  }
});
