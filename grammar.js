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

    // ***************************************************************************************************************

    tsql_file: $ => choice(
        seq(repeat($.batch), EOF),
        seq($.execute_body_batch, repeat($.go_statement), EOF),
    ),

    batch: $ => choice(
        $.go_statement,
        seq(optional($.execute_body_batch), choice(seq($.go_statement, repeat1($.sql_clauses))), repeat($.go_statement)),
        seq($.batch_level_statement, repeat($.go_statement)),
    ),

    batch_level_statement: $ => choice(
        $.create_or_alter_function,
        $.create_or_alter_procedure,
        $.create_or_alter_trigger,
        $.create_vie,
    ),

    sql_clauses: $ => choice(
        seq($.dml_clause, optional(SEMI)),
        seq($.cfl_statement, optional(SEMI)),
        seq($.another_statement, optional(SEMI)),
        seq($.ddl_clause, optional(SEMI)),
        seq($.dbcc_clause, optional(SEMI)),
        seq($.backup_statement, optional(SEMI)),
        SEMI,
    ),

    // Data Manipulation Language: https://msdn.microsoft.com/en-us/library/ff848766(v=sql.120).aspx
    dml_clause: $ => choice(
        $.merge_statement,
        $.delete_statement,
        $.insert_statement,
        $.select_statement_standalone,
        $.update_statemen,
    ),

    // Data Definition Language: https://msdn.microsoft.com/en-us/library/ff848799.aspx)
    ddl_clause: $ => choice(
        $.alter_application_role,
        $.alter_assembly,
        $.alter_asymmetric_key,
        $.alter_authorization,
        $.alter_authorization_for_azure_dw,
        $.alter_authorization_for_parallel_dw,
        $.alter_authorization_for_sql_database,
        $.alter_availability_group,
        $.alter_certificate,
        $.alter_column_encryption_key,
        $.alter_credential,
        $.alter_cryptographic_provider,
        $.alter_database,
        $.alter_database_audit_specification,
        $.alter_db_role,
        $.alter_endpoint,
        $.alter_external_data_source,
        $.alter_external_library,
        $.alter_external_resource_pool,
        $.alter_fulltext_catalog,
        $.alter_fulltext_stoplist,
        $.alter_index,
        $.alter_login_azure_sql,
        $.alter_login_azure_sql_dw_and_pdw,
        $.alter_login_sql_server,
        $.alter_master_key_azure_sql,
        $.alter_master_key_sql_server,
        $.alter_message_type,
        $.alter_partition_function,
        $.alter_partition_scheme,
        $.alter_remote_service_binding,
        $.alter_resource_governor,
        $.alter_schema_azure_sql_dw_and_pdw,
        $.alter_schema_sql,
        $.alter_sequence,
        $.alter_server_audit,
        $.alter_server_audit_specification,
        $.alter_server_configuration,
        $.alter_server_role,
        $.alter_server_role_pdw,
        $.alter_service,
        $.alter_service_master_key,
        $.alter_symmetric_key,
        $.alter_table,
        $.alter_user,
        $.alter_user_azure_sql,
        $.alter_workload_group,
        $.alter_xml_schema_collection,
        $.create_application_role,
        $.create_assembly,
        $.create_asymmetric_key,
        $.create_column_encryption_key,
        $.create_column_master_key,
        $.create_columnstore_index,
        $.create_credential,
        $.create_cryptographic_provider,
        $.create_database,
        $.create_database_audit_specification,
        $.create_db_role,
        $.create_endpoint,
        $.create_event_notification,
        $.create_external_library,
        $.create_external_resource_pool,
        $.create_fulltext_catalog,
        $.create_fulltext_stoplist,
        $.create_index,
        $.create_login_azure_sql,
        $.create_login_pdw,
        $.create_login_sql_server,
        $.create_master_key_azure_sql,
        $.create_master_key_sql_server,
        $.create_nonclustered_columnstore_index,
        $.create_or_alter_broker_priority,
        $.create_or_alter_event_session,
        $.create_partition_function,
        $.create_partition_scheme,
        $.create_remote_service_binding,
        $.create_resource_pool,
        $.create_route,
        $.create_rule,
        $.create_schema,
        $.create_schema_azure_sql_dw_and_pdw,
        $.create_search_property_list,
        $.create_security_policy,
        $.create_sequence,
        $.create_server_audit,
        $.create_server_audit_specification,
        $.create_server_role,
        $.create_service,
        $.create_statistics,
        $.create_synonym,
        $.create_table,
        $.create_type,
        $.create_user,
        $.create_user_azure_sql_dw,
        $.create_workload_group,
        $.create_xml_index,
        $.create_xml_schema_collection,
        $.disable_trigger,
        $.drop_aggregate,
        $.drop_application_role,
        $.drop_assembly,
        $.drop_asymmetric_key,
        $.drop_availability_group,
        $.drop_broker_priority,
        $.drop_certificate,
        $.drop_column_encryption_key,
        $.drop_column_master_key,
        $.drop_contract,
        $.drop_credential,
        $.drop_cryptograhic_provider,
        $.drop_database,
        $.drop_database_audit_specification,
        $.drop_database_encryption_key,
        $.drop_database_scoped_credential,
        $.drop_db_role,
        $.drop_default,
        $.drop_endpoint,
        $.drop_event_notifications,
        $.drop_event_session,
        $.drop_external_data_source,
        $.drop_external_file_format,
        $.drop_external_library,
        $.drop_external_resource_pool,
        $.drop_external_table,
        $.drop_fulltext_catalog,
        $.drop_fulltext_index,
        $.drop_fulltext_stoplist,
        $.drop_function,
        $.drop_index,
        $.drop_login,
        $.drop_master_key,
        $.drop_message_type,
        $.drop_partition_function,
        $.drop_partition_scheme,
        $.drop_procedure,
        $.drop_queue,
        $.drop_remote_service_binding,
        $.drop_resource_pool,
        $.drop_route,
        $.drop_rule,
        $.drop_schema,
        $.drop_search_property_list,
        $.drop_security_policy,
        $.drop_sequence,
        $.drop_server_audit,
        $.drop_server_audit_specification,
        $.drop_server_role,
        $.drop_service,
        $.drop_signature,
        $.drop_statistics,
        $.drop_statistics_name_azure_dw_and_pdw,
        $.drop_symmetric_key,
        $.drop_synonym,
        $.drop_table,
        $.drop_trigger,
        $.drop_type,
        $.drop_user,
        $.drop_view,
        $.drop_workload_group,
        $.drop_xml_schema_collection,
        $.enable_trigger,
        $.lock_table,
        $.truncate_table,
        $.update_statistic,
    ),

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
    break_statement: $ => seq(BREAK, optional(';')),

    // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/continue-transact-sql
    continue_statement: $ => seq(CONTINUE, optional(';')),

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

    throw_error_number: $ => choice(
        DECIMAL,
        LOCAL_ID,
    ),

    throw_message: $ => choice(
        STRING,
        LOCAL_ID,
    ),

    throw_state: $ => choice(
        DECIMAL,
        LOCAL_ID,
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql
    try_catch_statement: $ => seq(
      BEGIN, TRY, optional(';'), field("try_clauses", repeat1($.sql_clauses)), END, TRY, optional(';'), BEGIN, CATCH, optional(';'), field("catch_clauses", repeat($.sql_clauses)), END, CATCH, optional(';')
    ),


    // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/waitfor-transact-sql
    waitfor_statement: $ => seq(
      WAITFOR, optional($.receive_statement), optional(','), optional(seq(choice(DELAY, TIME, TIMEOUT), $.time)), optional($.expression), optional(';')
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/while-transact-sql
    while_statement: $ => seq(WHILE, $.search_condition, choice($.sql_clauses, seq(BREAK, optional(';')), seq(CONTINUE, optional(';')))),

    // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/print-transact-sql
    print_statement: $ => seq(
      PRINT, choice($.expression, DOUBLE_QUOTE_ID), repeat(seq(',', LOCAL_ID)), optional(';')
    ),


    // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/raiserror-transact-sql
    raiseerror_statement: $ => (
        seq(RAISERROR, '(', field("msg", choice(DECIMAL, STRING, LOCAL_ID)), ',', field("severity", $.constant_LOCAL_ID), ',', field("state", $.constant_LOCAL_ID), repeat(
          seq(',', choice($.constant_LOCAL_ID, NULL_))
        ), ')', optional(seq(WITH, choice(LOG, SETERROR, NOWAIT))), optional(';')),
        seq(RAISERROR, DECIMAL, field("formatstring", choice(STRING, LOCAL_ID, DOUBLE_QUOTE_ID)), repeat(
          seq(',', field("argument", choice(DECIMAL, STRING, LOCAL_ID)))
        ))
    ),

    empty_statement: $ => ';',

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

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-application-role-transact-sql
    alter_application_role: $ => (
        seq(ALTER, APPLICATION, ROLE, field("appliction_role", $.id_), WITH, optional(
          seq(optional(COMMA), NAME, EQUAL, field("new_application_role_name", $.id_))
        ), optional(seq(optional(COMMA), PASSWORD, EQUAL, field("application_role_password", STRING))), optional(
          seq(optional(COMMA), DEFAULT_SCHEMA, EQUAL, field("app_role_default_schema", $.id_))
        ),)
    ),

    // https://learn.microsoft.com/en-us/sql/t-sql/statements/alter-xml-schema-collection-transact-optional($.sql)view=sql-server-ver16
    alter_xml_schema_collection: $ => seq(ALTER, XML, SCHEMA, COLLECTION, optional(seq($.id_, '.'),), $.id_, ADD, STRING),

    create_application_role: $ => (
        seq(CREATE, APPLICATION, ROLE, field("appliction_role", $.id_), WITH, optional(
          seq(optional(COMMA), PASSWORD, EQUAL, field("application_role_password", STRING))
        ), optional(seq(optional(COMMA), DEFAULT_SCHEMA, EQUAL, field("app_role_default_schema", $.id_))))
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-aggregate-transact-sql

    drop_aggregate: $ => seq(
      DROP, AGGREGATE, optional(seq(IF, EXISTS)), optional(seq(field("schema_name", $.id_), DOT)), field("aggregate_name", $.id_)
    ),


    // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-application-role-transact-sql
    drop_application_role: $ => (
      seq(DROP, APPLICATION, ROLE, field("rolename", $.id_))
    ),

    alter_assembly: $ => (
      seq($.alter_assembly_start, field("assembly_name", $.id_), $.alter_assembly_clause)
    ),

    alter_assembly_start: $ => seq(ALTER, ASSEMBLY),


    alter_assembly_clause: $ => seq(optional($.alter_assembly_from_clause), optional($.alter_assembly_with_clause), optional($.alter_assembly_drop_clause), optional($.alter_assembly_add_clause)),

    alter_assembly_from_clause: $ => seq(
      $.alter_assembly_from_clause_start, choice($.client_assembly_specifier, $.alter_assembly_file_bits)
    ),

    alter_assembly_from_clause_start: $ => FROM,

    alter_assembly_drop_clause: $ => seq($.alter_assembly_drop, $.alter_assembly_drop_multiple_files),

    alter_assembly_drop_multiple_files: $ => choice(
        ALL,
        $.multiple_local_file,
    ),

    alter_assembly_drop: $ => DROP,

    alter_assembly_add_clause: $ => seq($.alter_asssembly_add_clause_start, $.alter_assembly_client_file_clause),

    alter_asssembly_add_clause_start: $ => seq(ADD, FILE, FROM),

    // need to implement
    alter_assembly_client_file_clause: $ => seq($.alter_assembly_file_name, optional(seq($.alter_assembly_as, $.id_))),

    alter_assembly_file_name: $ => STRING,

    //need to implement
    alter_assembly_file_bits: $ => seq($.alter_assembly_as, $.id_),

    alter_assembly_as: $ => AS,

    alter_assembly_with_clause: $ => seq($.alter_assembly_with, $.assembly_option),

    alter_assembly_with: $ => WITH,

    client_assembly_specifier: $ => choice(
        $.network_file_share,
        $.local_file,
        STRING,
    ),

    assembly_option: $ => choice(
        seq(PERMISSION_SET, EQUAL, choice(seq(SAFE, EXTERNAL_ACCESS, UNSAFE))),
        seq(VISIBILITY, EQUAL, $.on_off),
        seq(UNCHECKED, DATA),
        seq($.assembly_option, COMMA),
    ),

    network_file_share: $ => seq($.network_file_start, $.network_computer, $.file_path),

    network_computer: $ => seq(field("computer_name", $.id_)),

    network_file_start: $ => DOUBLE_BACK_SLAS,

    file_path: $ => choice(
        seq($.file_directory_path_separator, $.file_path),
        $.id_,
    ),

    file_directory_path_separator: $ => '\\',

    local_file: $ => seq($.local_drive, $.file_path),

    local_drive: $ => DISK_DRIVE,

    multiple_local_files: $ => choice(
        seq($.multiple_$.local_file_start, $.local_file, SINGLE_QUOTE, COMMA),
        $.local_file,
    ),

    multiple_local_file_start: $ => SINGLE_QUOTE,

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-assembly-transact-sql
    create_assembly: $ => (
        seq(CREATE, ASSEMBLY, field("assembly_name", $.id_), optional(seq(AUTHORIZATION, field("owner_name", $.id_))), FROM, repeat1(
          seq(optional(COMMA), choice(STRING, BINARY))
        ), optional(seq(WITH, PERMISSION_SET, EQUAL, choice(SAFE, EXTERNAL_ACCESS, UNSAFE))))
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-assembly-transact-sql
    drop_assembly: $ => seq(DROP, ASSEMBLY, optional(seq(IF, EXISTS)), repeat1(seq(optional(COMMA), field("assembly_name", $.id_))), optional(seq(WITH, NO, DEPENDENTS))),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-asymmetric-key-transact-sql

    alter_asymmetric_key: $ => seq(
      $.alter_asymmetric_key_start, field("Asym_Key_Name", $.id_), seq(choice($.asymmetric_key_option, REMOVE), PRIVATE, KEY)
    ),

    alter_asymmetric_key_start: $ => seq(ALTER, ASYMMETRIC, KEY),

    asymmetric_key_option: $ => (
      seq($.asymmetric_key_option_start, $.asymmetric_key_password_change_option, optional(
        seq(COMMA, $.asymmetric_key_password_change_option)
      ), RR_BRACKET)
    ),

    asymmetric_key_option_start: $ => seq(WITH, PRIVATE, KEY, LR_BRACKET),

    asymmetric_key_password_change_option: $ => choice(
      seq(DECRYPTION, BY, PASSWORD, EQUAL, STRING),
      seq(ENCRYPTION, BY, PASSWORD, EQUAL, STRING),
    ),

    //https://docs.microsoft.com/en-us/sql/t-sql/statements/create-asymmetric-key-transact-sql

    create_asymmetric_key: $ => (
        seq(CREATE, ASYMMETRIC, KEY, field("Asym_Key_Nam", $.id_), optional(seq(AUTHORIZATION, field("database_principal_name", $.id_))), optional(
          seq(FROM, choice(
            seq(FILE, EQUAL, STRING),
            seq(EXECUTABLE_FILE, EQUAL, STRING),
            seq(ASSEMBLY, field("Assembly_Name", $.id_)),
            seq(PROVIDER, field("Provider_Name", $.id_))
          ),)
        ), optional(
          seq(WITH, choice(
            seq(ALGORITHM, EQUAL, choice(RSA_4096, RSA_3072, RSA_2048, RSA_1024, RSA_512)),
            seq(PROVIDER_KEY_NAME, EQUAL, field("provider_key_name", STRING)),
            seq(CREATION_DISPOSITION, EQUAL, choice(CREATE_NEW, OPEN_EXISTING))
          ),)
        ), optional(seq(ENCRYPTION, BY, PASSWORD, EQUAL, field("asymmetric_key_password", STRING))))
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-asymmetric-key-transact-sql
    drop_asymmetric_key: $ => seq(DROP, ASYMMETRIC, KEY, field("key_name", $.id_), optional(seq(REMOVE, PROVIDER, KEY))),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-authorization-transact-sql

    alter_authorization: $ => seq(
      $.alter_authorization_start, optional(seq($.class_type, $.colon_colon)), field("entity", $.entity_name), $.entity_to, $.authorization_grantee
    ),


    authorization_grantee: $ => choice(
        seq(field("principal_name", $.id_)),
        seq(SCHEMA, OWNER),
    ),

    entity_to: $ => TO,

    colon_colon: $ => DOUBLE_COLON,

    alter_authorization_start: $ => seq(ALTER, AUTHORIZATION, ON),

    alter_authorization_for_sql_database: $ => (
        seq($.alter_authorization_start, optional(seq($.class_type_for_sql_database, $.colon_colon)), field("entity", $.entity_name), $.entity_to, $.authorization_grantee),
    ),

    alter_authorization_for_azure_dw: $ => seq($.alter_authorization_start, optional(seq($.class_type_for_azure_dw, $.colon_colon)), field("entity", $.entity_name_for_azure_dw), $.entity_to, $.authorization_grantee),


    alter_authorization_for_parallel_dw: $ => seq($.alter_authorization_start, optional(seq($.class_type_for_parallel_dw, $.colon_colon),), field("entity", $.entity_name_for_parallel_dw), $.entity_to, $.authorization_grantee),


    class_type: $ => choice(
        OBJECT,
        ASSEMBLY,
        seq(ASYMMETRIC, KEY),
        seq(AVAILABILITY, GROUP),
        CERTIFICATE,
        CONTRACT,
        TYPE,
        DATABASE,
        ENDPOINT,
        seq(FULLTEXT, CATALOG),
        seq(FULLTEXT, STOPLIST),
        seq(MESSAGE, TYPE),
        seq(REMOTE, SERVICE, BINDING),
        ROLE,
        ROUTE,
        SCHEMA,
        seq(SEARCH, PROPERTY, LIST),
        seq(SERVER, ROLE),
        SERVICE,
        seq(SYMMETRIC, KEY),
        seq(XML, SCHEMA, COLLECTION),
    ),

    class_type_for_sql_database: $ => choice(
        OBJECT,
        ASSEMBLY,
        seq(ASYMMETRIC, KEY),
        CERTIFICATE,
        TYPE,
        DATABASE,
        seq(FULLTEXT, CATALOG),
        seq(FULLTEXT, STOPLIST),
        ROLE,
        SCHEMA,
        seq(SEARCH, PROPERTY, LIST),
        seq(SYMMETRIC, KEY),
        seq(XML, SCHEMA, COLLECTION),
    ),

    class_type_for_azure_dw: $ => choice(
        SCHEMA,
        OBJECT,
    ),

    class_type_for_parallel_dw: $ => choice(
        DATABASE,
        SCHEMA,
        OBJECT,
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/grant-transact-optional($.sql)view=sql-server-ver15
    // SELECT DISTINCT '| ' + CLASS_DESC
    // FROM sys.dm_audit_actions
    // ORDER BY 1
    class_type_for_grant: $ => choice(
        seq(APPLICATION, ROLE),
        ASSEMBLY,
        seq(ASYMMETRIC, KEY),
        AUDIT,
        seq(AVAILABILITY, GROUP),
        seq(BROKER, PRIORITY),
        CERTIFICATE,
        seq(COLUMN, choice(seq(ENCRYPTION, MASTER),), KEY),
        CONTRACT,
        CREDENTIAL,
        seq(CRYPTOGRAPHIC, PROVIDER),
        seq(DATABASE, optional(choice(
          seq(AUDIT, SPECIFICATION),
          seq(ENCRYPTION, KEY),
          seq(EVENT, SESSION),
          seq(SCOPED, choice(CONFIGURATION, CREDENTIAL, seq(RESOURCE, GOVERNOR)))
        ),)),
        ENDPOINT,
        seq(EVENT, SESSION),
        seq(NOTIFICATION, choice(DATABASE, OBJECT, SERVER)),
        seq(EXTERNAL, choice(seq(DATA, SOURCE), seq(FILE, FORMAT), LIBRARY, RESOURCE, POOL, TABLE, CATALOG, STOPLIST)),
        LOGIN,
        seq(MASTER, KEY),
        seq(MESSAGE, TYPE),
        OBJECT,
        seq(PARTITION, choice(FUNCTION, SCHEME)),
        seq(REMOTE, SERVICE, BINDING),
        seq(RESOURCE, GOVERNOR),
        ROLE,
        ROUTE,
        SCHEMA,
        seq(SEARCH, PROPERTY, LIST),
        seq(SERVER, optional(choice(seq(AUDIT, optional(SPECIFICATION)), ROLE))),
        SERVICE,
        seq(SQL, LOGIN),
        seq(SYMMETRIC, KEY),
        seq(TRIGGER, choice(seq(DATABASE, SERVER))),
        TYPE,
        USER,
        seq(XML, SCHEMA, COLLECTION),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-availability-group-transact-sql
    drop_availability_group: $ => seq(DROP, AVAILABILITY, GROUP, field("group_name", $.id_)),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-availability-group-transact-sql
    alter_availability_group: $ => seq($.alter_availability_group_start, $.alter_availability_group_options),

    alter_availability_group_start: $ => seq(ALTER, AVAILABILITY, GROUP, field("group_name", $.id_)),

    alter_availability_group_options: $ => choice(
      seq(
        SET,
        LR_BRACKET,
        choice(
          seq(AUTOMATED_BACKUP_PREFERENCE, EQUAL, choice(PRIMARY, SECONDARY_ONLY, SECONDARY, NONE)),
          seq(FAILURE_CONDITION_LEVEL, EQUAL, DECIMAL),
          seq(HEALTH_CHECK_TIMEOUT, EQUAL, field("milliseconds", DECIMAL)),
          seq(DB_FAILOVER, EQUAL, choice(ON, OFF)),
          seq(REQUIRED_SYNCHRONIZED_SECONDARIES_TO_COMMIT, EQUAL, DECIMAL)
        ),
        RR_BRACKET
      ),
      seq(ADD, DATABASE, field("database_name", $.id_)),
      seq(REMOVE, DATABASE, field("database_name", $.id_)),
      seq(
        ADD, REPLICA, ON, field("server_instance", STRING),
        WITH, LR_BRACKET,
        seq(
          optional(seq(ENDPOINT_URL, EQUAL, STRING)),
          optional(seq(optional(COMMA), AVAILABILITY_MODE, EQUAL, choice(SYNCHRONOUS_COMMIT, ASYNCHRONOUS_COMMIT))),
          optional(seq(optional(COMMA), FAILOVER_MODE, EQUAL, choice(AUTOMATIC, MANUAL))),
          optional(seq(optional(COMMA), SEEDING_MODE, EQUAL, choice(AUTOMATIC, MANUAL))),
          optional(seq(optional(COMMA), BACKUP_PRIORITY, EQUAL, DECIMAL)),
          optional(seq(optional(COMMA), PRIMARY_ROLE, LR_BRACKET, ALLOW_CONNECTIONS, EQUAL, choice(READ_WRITE, ALL), RR_BRACKET)),
          optional(seq(optional(COMMA), SECONDARY_ROLE, LR_BRACKET, ALLOW_CONNECTIONS, EQUAL, READ_ONLY, RR_BRACKET))
        ),
        RR_BRACKET
      ),
      seq(
        SECONDARY_ROLE,
        LR_BRACKET,
        choice(
          seq(ALLOW_CONNECTIONS, EQUAL, choice(NO, READ_ONLY, ALL)),
          seq(READ_ONLY_ROUTING_LIST, EQUAL, LR_BRACKET, STRING, RR_BRACKET)
        ),
        RR_BRACKET
      ),
      seq(
        PRIMARY_ROLE,
        LR_BRACKET,
        choice(
          seq(ALLOW_CONNECTIONS, EQUAL, choice(NO, READ_ONLY, ALL)),
          seq(
            READ_ONLY_ROUTING_LIST,
            EQUAL,
            LR_BRACKET,
            choice(
              repeat(seq(optional(COMMA), STRING)),
              NONE
            ),
            RR_BRACKET
          ),
          seq(SESSION_TIMEOUT, EQUAL, field("session_timeout", DECIMAL))
        ),
        RR_BRACKET
      ),
      seq(
        MODIFY, REPLICA, ON, field("server_instance", STRING),
        choice(
          seq(
            WITH, LR_BRACKET,
            choice(
              seq(ENDPOINT_URL, EQUAL, STRING),
              seq(AVAILABILITY_MODE, EQUAL, choice(SYNCHRONOUS_COMMIT, ASYNCHRONOUS_COMMIT)),
              seq(FAILOVER_MODE, EQUAL, choice(AUTOMATIC, MANUAL)),
              seq(SEEDING_MODE, EQUAL, choice(AUTOMATIC, MANUAL)),
              seq(BACKUP_PRIORITY, EQUAL, DECIMAL)
            ),
            RR_BRACKET
          ),
          seq(
            SECONDARY_ROLE, LR_BRACKET,
            choice(
              seq(ALLOW_CONNECTIONS, EQUAL, choice(NO, READ_ONLY, ALL)),
              seq(READ_ONLY_ROUTING_LIST, EQUAL, LR_BRACKET, STRING, RR_BRACKET)
            ),
            RR_BRACKET
          ),
          seq(
            PRIMARY_ROLE, LR_BRACKET,
            choice(
              seq(ALLOW_CONNECTIONS, EQUAL, choice(NO, READ_ONLY, ALL)),
              seq(
                READ_ONLY_ROUTING_LIST,
                EQUAL,
                LR_BRACKET,
                choice(repeat(seq(optional(COMMA), STRING)), NONE),
                RR_BRACKET
              ),
              seq(SESSION_TIMEOUT, EQUAL, field("session_timeout", DECIMAL))
            ),
            RR_BRACKET
          ),
        ),
      ),
      seq(REMOVE, REPLICA, ON, STRING),
      JOIN,
      seq(
        JOIN, AVAILABILITY, GROUP, ON,
        repeat1(seq(
          optiona(COMMA),
          field("ag_name", STRING),
          WITH,
          LR_BRACKET,
          LISTENER_URL, EQUAL, STRING, COMMA, AVAILABILITY_MODE, EQUAL,
          choice(SYNCHRONOUS_COMMIT, ASYNCHRONOUS_COMMIT),
          COMMA, FAILOVER_MODE, EQUAL, MANUAL, COMMA, SEEDING_MODE, EQUAL, choice(AUTOMATIC, MANUAL), RR_BRACKET
        ),)
      ),
      seq(
        MODIFY, AVAILABILITY, GROUP, ON,
        repeat1(seq(
          optional(COMMA), field("ag_name_modified", STRING), WITH, LR_BRACKET,
          LISTENER_URL, EQUAL, STRING,
            optional(seq(optional(COMMA), AVAILABILITY_MODE, EQUAL, choice(SYNCHRONOUS_COMMIT, ASYNCHRONOUS_COMMIT))),
            optional(seq(optional(COMMA), FAILOVER_MODE, EQUAL, MANUAL)),
            optional(seq(optional(COMMA), SEEDING_MODE, EQUAL, choice(AUTOMATIC, MANUAL))),
          RR_BRACKET
        ),)
      ),
      seq(GRANT, CREATE, ANY, DATABASE),
      seq(DENY, CREATE, ANY, DATABASE),
      FAILOVER,
      FORCE_FAILOVER_ALLOW_DATA_LOSS,
      seq(
        ADD, LISTENER, field("listener_name", STRING), LR_BRACKET,
        (
          seq(WITH, DHCP, ON, LR_BRACKET, $.ip_v4_failover, $.ip_v4_failover, RR_BRACKET),
          seq(
            WITH, IP, LR_BRACKET,
            repeat1(seq(optional(COMMA), LR_BRACKET, choice(seq($.ip_v4_failover, COMMA, $.ip_v4_failover), $.ip_v6_failover), RR_BRACKET)),
            optional(seq(COMMA, PORT, EQUAL, DECIMAL)),
            RR_BRACKET
          ),
        ),
        RR_BRACKET
      ),
      seq(
        MODIFY, LISTENER,
        choice(
          seq(ADD, IP, LR_BRACKET, choice(seq($.ip_v4_failover, $.ip_v4_failover), $.ip_v6_failover), RR_BRACKET),
          seq(PORT, EQUAL, DECIMAL)
        ),
      ),
      seq(RESTART, LISTENER, STRING),
      seq(REMOVE, LISTENER, STRING),
      OFFLINE,
      seq(WITH, LR_BRACKET, DTC_SUPPORT, EQUAL, PER_DB, RR_BRACKET)
    ),

    ip_v4_failover: $ => STRING,

    ip_v6_failover: $ => STRING,

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-broker-priority-transact-sql
    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-broker-priority-transact-sql
    create_or_alter_broker_priority: $ => seq(
      choice(CREATE, ALTER), BROKER, PRIORITY, field("ConversationPriorityName", $.id_), FOR, CONVERSATION, SET, LR_BRACKET,
      optional(
        seq(CONTRACT_NAME, EQUAL, choice($.id, ANY), optional(COMMA))
      ),
      optional(
        seq(LOCAL_SERVICE_NAME, EQUAL, choice(seq(optional(DOUBLE_FORWARD_SLASH), $.id_), ANY), optional(COMMA))
      ),
      optional(
        seq(REMOTE_SERVICE_NAME, EQUAL, choice(seq(field("RemoteServiceName", STRING), ANY)), optional(COMMA))
      ),
      optional(
        seq(PRIORITY_LEVEL, EQUAL, choice(seq(field("PriorityValue", DECIMAL), DEFAULT)))
      ),
      RR_BRACKET
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-broker-priority-transact-sql
    drop_broker_priority: $ => seq(DROP, BROKER, PRIORITY, field("ConversationPriorityName", $.id_)),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-certificate-transact-sql
    alter_certificate: $ => seq(
        ALTER, CERTIFICATE, field("certificate_name", $.id_),
        choice(
          seq(REMOVE, PRIVATE_KEY),
          seq(WITH, PRIVATE, KEY, LR_BRACKET, repeat1(
            seq(FILE, EQUAL, STRING, optional(COMMA)),
            seq(DECRYPTION, BY, PASSWORD, EQUAL, STRING, optional(COMMA)),
            seq(ENCRYPTION, BY, PASSWORD, EQUAL, STRING, optional(COMMA)),
          ), RR_BRACKET),
          seq(WITH, ACTIVE, FOR, BEGIN_DIALOG, EQUAL, choice(ON, OFF))
        ),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-column-encryption-key-transact-sql
    alter_column_encryption_key: $ => seq(
      ALTER, COLUMN, ENCRYPTION, KEY, field("column_encryption_key", $.id_), choice(ADD, DROP), VALUE, LR_BRACKET, COLUMN_MASTER_KEY, EQUAL, field("column_master_key_name", $.id_),
      optional(
        seq(COMMA, ALGORITHM, EQUAL, field("algorithm_name", STRING), COMMA, ENCRYPTED_VALUE, EQUAL, BINARY)
      ),
      RR_BRACKET
    ),


    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-column-encryption-key-transact-sql
    create_column_encryption_key: $ => seq(
        CREATE, COLUMN, ENCRYPTION, KEY, field("column_encryption_key", $.id_), WITH, VALUES, repeat1(
          seq(LR_BRACKET, optional(COMMA), COLUMN_MASTER_KEY, EQUAL, field("column_master_key_name", $.id_), COMMA, ALGORITHM, EQUAL, field("algorithm_name", STRING), COMMA, ENCRYPTED_VALUE),
          seq(EQUAL, field("encrypted_value", BINARY), RR_BRACKET, optional(COMMA))
        ),
    ),

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
    drop_database_encryption_key: $ => seq(DROP, DATABASE, ENCRYPTION, KEY),

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
    drop_master_key: $ => seq(DROP, MASTER, KEY),

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

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/disable-trigger-transact-sql
    disable_trigger: $ => seq(
      DISABLE,
      TRIGGER,
      choice(repeat1(seq(optional(COMMA), optional(seq(field("schema_name", $.id_), DOT)), field("trigger_name", $.id_))), ALL),
      ON,
      choice(seq(optional(seq(field("schema_id", $.id_), DOT)), field("object_name", $.id_)), DATABASE, seq(ALL, SERVER))
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/enable-trigger-transact-sql
    enable_trigger: $ => seq(
      ENABLE,
      TRIGGER,
      choice(seq(repeat1(seq(optional(COMMA), optional(seq(field("schema_name", $.id_), DOT)), field("trigger_name", $.id_))), ALL),),
      ON,
      choice(seq(optional(seq(field("schema_id", $.id_), DOT)), field("object_name", $.id_)), DATABASE, seq(ALL, SERVER))
    ),

    lock_table: $ => seq(
      LOCK,
      TABLE,
      $.table_name,
      IN,
      choice(seq(SHARE, EXCLUSIVE)),
      MODE,
      optional(choice(seq(WAIT, field("seconds", DECIMAL), NOWAIT),)),
      optional(';')
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/truncate-table-transact-sql
    truncate_table: $ => seq(
      TRUNCATE,
      TABLE,
      $.table_name,
      optional(seq(
        WITH,
        LR_BRACKET,
        PARTITIONS,
        LR_BRACKET,
        repeat1(seq(optional(COMMA), choice(seq(DECIMAL, DECIMAL, TO, DECIMAL),))),
        RR_BRACKET,
        RR_BRACKET
      )),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-column-master-key-transact-sql
    create_column_master_key: $ => seq(
      CREATE,
      COLUMN,
      MASTER,
      KEY,
      field("key_name", $.id_),
      WITH,
      LR_BRACKET,
      KEY_STORE_PROVIDER_NAME,
      EQUAL,
      field("key_store_provider_name", STRING),
      COMMA,
      KEY_PATH,
      EQUAL,
      field("key_path", STRING),
      RR_BRACKET
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-credential-transact-sql
    alter_credential: $ => seq(
      ALTER,
      CREDENTIAL,
      field("credential_name", $.id_),
      WITH,
      IDENTITY,
      EQUAL,
      field("identity_name", STRING),
      optional(seq(COMMA, SECRET, EQUAL, field("secret", STRING))),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-credential-transact-sql
    create_credential: $ => seq(
      CREATE,
      CREDENTIAL,
      field("credential_name", $.id_),
      WITH,
      IDENTITY,
      EQUAL,
      field("identity_name", STRING),
      optional(seq(COMMA, SECRET, EQUAL, field("secret", STRING))),
      optional(seq(FOR, CRYPTOGRAPHIC, PROVIDER, field("cryptographic_provider_name", $.id_)))
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-cryptographic-provider-transact-sql
    alter_cryptographic_provider: $ => seq(
      ALTER,
      CRYPTOGRAPHIC,
      PROVIDER,
      field("provider_name", $.id_),
      optional(seq(FROM, FILE, EQUAL, field("crypto_provider_ddl_file", STRING))),
      optional(choice(seq(ENABLE, DISABLE)))
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-cryptographic-provider-transact-sql
    create_cryptographic_provider: $ => seq(
      CREATE,
      CRYPTOGRAPHIC,
      PROVIDER,
      field("provider_name", $.id_),
      FROM,
      FILE,
      EQUAL,
      field("path_of_DLL", STRING)
    ),

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

    endpoint_encryption_alogorithm_clause: $ => seq(
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

    endpoint_listener_clause: $ => seq(
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

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-event-notification-transact-sql
    create_event_notification: $ => seq(
      CREATE,
      EVENT,
      NOTIFICATION,
      field("event_notification_name", $.id_),
      ON,
      choice(SERVER, DATABASE, seq(QUEUE, field("queue_name", $.id_))),
      optional(seq(WITH, FAN_IN)),
      FOR,
      repeat1(seq(optional(COMMA), field("event_type_or_group", $.id_))),
      TO,
      SERVICE,
      field("broker_service", STRING),
      COMMA,
      field("broker_service_specifier_or_current_database", STRING),
    ),

    // MARKER

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-event-session-transact-sql
    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-event-session-transact-sql
    // todo: not implemented
    create_or_alter_event_session: $ => seq(
      choice(CREATE, ALTER),
      EVENT,
      SESSION,
      field('event_session_name', $.id_),
      ON,
      SERVER,

      repeat(
        seq(
          optional(COMMA),
          ADD,
          EVENT,

          optional(
            seq(
              field('event_module_guid', $.id_),
              DOT
            )
          ),

          field('event_package_name', $.id_),
          DOT,
          field('event_name', $.id_),

          repeat(
            seq(
              LR_BRACKET,

              optional(
                seq(
                  SET,
                  repeat(
                    seq(
                      optional(COMMA),
                      field('event_customizable_attributue', $.id_),
                      EQUAL,
                      choice($.DECIMAL, $.STRING)
                    )
                  )
                )
              ),

              repeat(
                seq(
                  ACTION,
                  LR_BRACKET,

                  repeat1(
                    seq(
                      optional(COMMA),

                      optional(
                        seq(
                          field('event_module_guid', $.id_),
                          DOT
                        )
                      ),

                      field('event_package_name', $.id_),
                      DOT,
                      field('action_name', $.id_)
                    )
                  ),
                  RR_BRACKET
                )
              ),
              optional(seq(WHERE, $.event_session_predicate_expression)),
              RR_BRACKET
            )
          )
        )
      ),

      repeat(
        seq(
          optional(COMMA),
          DROP,
          EVENT,

          optional(
            seq(
              field('event_module_guid', $.id_),
              DOT
            )
          ),

          field('event_package_name', $.id_),
          DOT,
          field('event_name', $.id_)
        )
      ),

      repeat(
        seq(
          ADD,
          TARGET,

          optional(
            seq(
              field('event_module_guid', $.id_),
              DOT
            )
          ),

          field('event_package_name', $.id_),
          DOT,
          field('target_name', $.id_),

          repeat(
            seq(
              LR_BRACKET,
              SET,

              repeat1(
                seq(
                  optional(COMMA),
                  field('target_parameter_name', $.id_),
                  EQUAL,

                  choice(
                    seq(
                      optional(LR_BRACKET),
                      $.DECIMAL,
                      optional(RR_BRACKET)
                    ),
                    $.STRING
                  )
                )
              ),

              RR_BRACKET
            )
          )
        )
      ),

      repeat(
        seq(
          DROP,
          TARGET,

          optional(
            seq(
              field('event_module_guid', $.id_),
              DOT
            )
          ),

          field('event_package_name', $.id_),
          DOT,
          field('target_name', $.id_)
        )
      ),

      optional(
        seq(
          WITH,
          LR_BRACKET,

          optional(
            seq(
              optional(COMMA),
              MAX_MEMORY,
              EQUAL,
              field('max_memory', $.DECIMAL),
              choice(KB, MB)
            )
          ),

          optional(
            seq(
              optional(COMMA),
              EVENT_RETENTION_MODE,
              EQUAL,
              choice(
                ALLOW_SINGLE_EVENT_LOSS,
                ALLOW_MULTIPLE_EVENT_LOSS,
                NO_EVENT_LOSS
              )
            )
          ),

          optional(
            seq(
              optional(COMMA),
              MAX_DISPATCH_LATENCY,
              EQUAL,
              choice(
                seq(
                  field('max_dispatch_latency_seconds', $.DECIMAL),
                  SECONDS
                ),
                INFINITE
              )
            )
          ),

          optional(
            seq(
              optional(COMMA),
              MAX_EVENT_SIZE,
              EQUAL,
              field('max_event_size', $.DECIMAL),
              choice(KB, MB)
            )
          ),

          optional(
            seq(
              optional(COMMA),
              MEMORY_PARTITION_MODE,
              EQUAL,
              choice(NONE, PER_NODE, PER_CPU)
            )
          ),

          optional(
            seq(
              optional(COMMA),
              TRACK_CAUSALITY,
              EQUAL,
              choice(ON, OFF)
            )
          ),

          optional(
            seq(
              optional(COMMA),
              STARTUP_STATE,
              EQUAL,
              choice(ON, OFF)
            )
          ),

          RR_BRACKET
        )
      ),

      optional(
        seq(
          STATE,
          EQUAL,
          choice(START, STOP)
        )
      )
    ),

    event_session_predicate_expression: $ => seq(
      optional(COMMA),
      optional(choice(AND, OR)),
      optional(NOT),
      choice($.event_session_predicate_factor, seq(LR_BRACKET, $.event_session_predicate_expression, RR_BRACKET)),
    ),

    event_session_predicate_factor: $ => choice(
        $.event_session_predicate_leaf,
        seq(LR_BRACKET, $.event_session_predicate_expression, RR_BRACKET),
    ),

    event_session_predicate_leaf: $ => choice(
      field("event_field_name", $.id_),

      seq(
        choice(
          field("event_field_name", $.id_),
          seq(
            optional(seq(field("event_module_guid", $.id_), DOT)),
            field("event_package_name", $.id_),
            DOT,
            field("predicate_source_name", $.id_)
          )
        ),
        choice(
          EQUAL,
          seq(LESS, GREATER),
          seq(EXCLAMATION, EQUAL),
          GREATER,
          seq(GREATER, EQUAL),
          LESS,
          seq(LESS, EQUAL)
        ),
        choice(DECIMAL, STRING)
      ),

      seq(
        optional(seq(field("event_module_guid", $.id_), DOT)),
        field("event_package_name", $.id_),
        DOT,
        field("predicate_compare_name", $.id_),
        LR_BRACKET,
        choice(
          field("event_field_name", $.id_),
          seq(
            optional(seq(field("event_module_guid", $.id_), DOT)),
            field("event_package_name", $.id_),
            DOT,
            field("predicate_source_name", $.id_),
            COMMA,
            choice(DECIMAL, STRING)
          )
        ),
        RR_BRACKET
      )
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-external-data-source-transact-sql
    alter_external_data_source: $ => choice(
      seq(
        ALTER,
        EXTERNAL,
        DATA,
        SOURCE,
        field("data_source_name", $.id_),
        SET,
        repeat1(
          choice(
            seq(LOCATION, EQUAL, field("location", STRING), optional(COMMA)),
            seq(RESOURCE_MANAGER_LOCATION, EQUAL, field("resource_manager_location", STRING), optional(COMMA)),
            seq(CREDENTIAL, EQUAL, field("credential_name", $.id_))
          )
        ),
      ),
      seq(
        ALTER,
        EXTERNAL,
        DATA,
        SOURCE,
        field("data_source_name", $.id_),
        WITH,
        LR_BRACKET,
        TYPE,
        EQUAL,
        BLOB_STORAGE,
        COMMA,
        LOCATION,
        EQUAL,
        field("location", STRING),
        optional(seq(COMMA, CREDENTIAL, EQUAL, field("credential_name", $.id_))),
        RR_BRACKET
      ),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-external-library-transact-sql
    alter_external_library: $ => seq(
      ALTER,
      EXTERNAL,
      LIBRARY,
      field("library_name", $.id_),
      optional(seq(AUTHORIZATION, field("owner_name", $.id_))),
      choice(seq(SET, ADD)),
      choice(seq(
        LR_BRACKET,
        CONTENT,
        EQUAL,
        field("client_library", choice(STRING, BINARY, NONE)),
        seq(COMMA, PLATFORM, EQUAL, optional(choice(WINDOWS, LINUX)), RR_BRACKET),
        WITH,
        repeat1(choice(
          seq(optional(COMMA), LANGUAGE, EQUAL, choice(seq(R, PYTHON))),
          seq(DATA_SOURCE, EQUAL, field("external_data_source_name", $.id_))
        )),
        RR_BRACKET
      )),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-external-library-transact-sql
    create_external_library: $ => seq(
      CREATE,
      EXTERNAL,
      LIBRARY,
      field("library_name", $.id_),
      optional(seq(AUTHORIZATION, field("owner_name", $.id_))),
      FROM,
      choice(seq(
        optional(COMMA),
        optional(LR_BRACKET),
        optional(choice(CONTENT, EQUAL)),
        field("client_library", choice(STRING, BINARY, NONE)),
        optional(seq(COMMA, PLATFORM, EQUAL, optional(choice(WINDOWS, LINUX)), RR_BRACKET)),
      )),
      optional(seq(
        WITH,
        repeat1(choice(
          seq(optional(COMMA), LANGUAGE, EQUAL, choice(R, PYTHON)),
          seq(DATA_SOURCE, EQUAL, field("external_data_source_name", $.id_))
        )),
        RR_BRACKET
      )),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-external-resource-pool-transact-sql
    alter_external_resource_pool: $ => seq(
      ALTER,
      EXTERNAL,
      RESOURCE,
      POOL,
      choice(field("pool_name", choice($.id_, DEFAULT_DOUBLE_QUOTE))),
      WITH,
      LR_BRACKET,
      MAX_CPU_PERCENT,
      EQUAL,
      field("max_cpu_percent", DECIMAL),
      choice(
        seq(optional(COMMA), AFFINITY, CPU, EQUAL, choice(AUTO, repeat1(choice(seq(optional(COMMA), DECIMAL, TO, DECIMAL), seq(COMMA, DECIMAL))))),
        seq(NUMANODE, EQUAL, repeat1(choice(seq(optional(COMMA), DECIMAL, TO, DECIMAL), seq(optional(COMMA), DECIMAL))))
      ),
      optional(seq(optional(COMMA), MAX_MEMORY_PERCENT, EQUAL, field("max_memory_percent", DECIMAL))),
      optional(seq(optional(COMMA), MAX_PROCESSES, EQUAL, field("max_processes", DECIMAL))),
      RR_BRACKET
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-external-resource-pool-transact-sql
    create_external_resource_pool: $ => seq(
      CREATE,
      EXTERNAL,
      RESOURCE,
      POOL,
      field("pool_name", $.id_),
      WITH,
      LR_BRACKET,
      MAX_CPU_PERCENT,
      EQUAL,
      field("max_cpu_percent", DECIMAL),
      choice(
        seq(optional(COMMA), AFFINITY, CPU, EQUAL, choice(AUTO, repeat1(
          seq(optional(COMMA), DECIMAL, TO, DECIMAL),
          seq(COMMA, DECIMAL)
        ))),
        seq(NUMANODE, EQUAL, repeat1(choice(seq(optional(COMMA), DECIMAL, TO, DECIMAL), seq(optional(COMMA), DECIMAL))))
      ),
      optional(seq(optional(COMMA), MAX_MEMORY_PERCENT, EQUAL, field("max_memory_percent", DECIMAL))),
      optional(seq(optional(COMMA), MAX_PROCESSES, EQUAL, field("max_processes", DECIMAL))),
      RR_BRACKET
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-fulltext-catalog-transact-sql
    alter_fulltext_catalog: $ => seq(
      ALTER,
      FULLTEXT,
      CATALOG,
      field("catalog_name", $.id_),
      choice(
        seq(REBUILD, optional(seq(WITH, ACCENT_SENSITIVITY, EQUAL, choice(ON, OFF)))),
        REORGANIZE,
        seq(AS, DEFAULT)
      )
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-fulltext-catalog-transact-sql
    create_fulltext_catalog: $ => seq(
      CREATE,
      FULLTEXT,
      CATALOG,
      field("catalog_name", $.id_),
      optional(seq(ON, FILEGROUP, field("filegroup", $.id_))),
      optional(seq(IN, PATH, field("rootpath", STRING))),
      optional(seq(WITH, ACCENT_SENSITIVITY, EQUAL, choice(ON, OFF))),
      optional(AS, DEFAULT),
      optional(seq(AUTHORIZATION, field("owner_name", $.id_)))
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-fulltext-stoplist-transact-sql
    alter_fulltext_stoplist: $ => seq(
      ALTER,
      FULLTEXT,
      STOPLIST,
      field("stoplist_name", $.id_),
      choice(
        seq(ADD, field("stopword", STRING), LANGUAGE, choice(STRING, DECIMAL, BINARY)),
        seq(DROP, choice(
          seq(field("stopword", STRING), LANGUAGE, choice(STRING, DECIMAL, BINARY)),
          seq(ALL, choice(STRING, DECIMAL, BINARY)),
          ALL
        ))
      ),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-fulltext-stoplist-transact-sql
    create_fulltext_stoplist: $ => seq(
      CREATE,
      FULLTEXT,
      STOPLIST,
      field("stoplist_name", $.id_),
      optional(seq(FROM, choice(seq(
        optional(seq(field("database_name", $.id_), DOT)),
        field("source_stoplist_name", $.id_),
        SYSTEM,
        STOPLIST
      )))),
      optional(seq(AUTHORIZATION, field("owner_name", $.id_))),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-login-transact-sql
    alter_login_sql_server: $ => seq(
      ALTER,
      LOGIN,
      field("login_name", $.id_),
      choice(
        optional(choice(ENABLE, DISABLE)),
        seq(
          WITH,
          seq(
            repeat(seq(PASSWORD, EQUAL, choice(field("password", STRING), seq(field("password_hash", BINARY), HASHED)))),
            repeat(choice(MUST_CHANGE, UNLOCK)),
            optional(seq(OLD_PASSWORD, EQUAL, field("old_password", STRING), repeat(choice(MUST_CHANGE, UNLOCK)))),
            optional(seq(DEFAULT_DATABASE, EQUAL, field("default_database", $.id_))),
            optional(seq(DEFAULT_LANGUAGE, EQUAL, field("default_language", $.id_))),
            optional(seq(NAME, EQUAL, field("login_name", $.id_))),
            optional(seq(CHECK_POLICY, EQUAL, choice(ON, OFF))),
            optional(seq(CHECK_EXPIRATION, EQUAL, choice(ON, OFF))),
            optional(seq(CREDENTIAL, EQUAL, field("credential_name", $.id_))),
            optional(seq(NO, CREDENTIAL))
          ),
          seq(choice(ADD, DROP), CREDENTIAL, field("credential_name", $.id_))
        ),
      ),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-login-transact-sql
    create_login_sql_server: $ => seq(
      CREATE,
      LOGIN,
      field("login_name", $.id_),
      choice(
        seq(
          WITH,
          repeat(seq(PASSWORD, EQUAL, choice(field("password", STRING), seq(field("password_hash", BINARY), HASHED)))),
          optional(seq(optional(COMMA), SID, EQUAL, field("sid", BINARY))),
          optional(seq(optional(COMMA), DEFAULT_DATABASE, EQUAL, field("default_database", $.id_))),
          optional(seq(optional(COMMA), DEFAULT_LANGUAGE, EQUAL, field("default_language", $.id_))),
          optional(seq(optional(COMMA), CHECK_EXPIRATION, EQUAL, choice(ON, OFF))),
          optional(seq(optional(COMMA), CHECK_POLICY, EQUAL, choice(ON, OFF))),
          optional(seq(optional(COMMA), CREDENTIAL, EQUAL, field("credential_name", $.id_)))
        ),
        seq(
          FROM,
          choice(
            seq(WINDOWS, seq(
              WITH,
              seq(optional(COMMA), DEFAULT_DATABASE, EQUAL, field("default_database", $.id_)),
              seq(optional(COMMA), DEFAULT_LANGUAGE, EQUAL, field("default_language", STRING)),
            )),
            seq(CERTIFICATE, field("certname", $.id_)),
            seq(ASYMMETRIC, KEY, field("asym_key_name", $.id_)),
          )
        )
      ),
    ),

    alter_login_azure_sql: $ => seq(
      ALTER,
      LOGIN,
      field("login_name", $.id_),
      choice(
        optional(choice(ENABLE, DISABLE)),
        seq(WITH, choice(
          seq(PASSWORD, EQUAL, field("password", STRING), optional(seq(OLD_PASSWORD, EQUAL, field("old_password", STRING)))),
          seq(NAME, EQUAL, field("login_name", $.id_))
        )),
      ),
    ),

    create_login_azure_sql: $ => seq(
      CREATE,
      LOGIN,
      field("login_name", $.id_),
      WITH,
      PASSWORD,
      EQUAL,
      STRING,
      optional(seq(SID, EQUAL, field("sid", BINARY)))
    ),

    alter_login_azure_sql_dw_and_pdw: $ => seq(
      ALTER,
      LOGIN,
      field("login_name", $.id_),
      choice(
        optional(choice(ENABLE, DISABLE)),
        seq(WITH, choice(
          seq(PASSWORD, EQUAL, field("password", STRING), optional(seq(OLD_PASSWORD, EQUAL, field("old_password", STRING), repeat(choice(seq(MUST_CHANGE, UNLOCK)))))),
          seq(NAME, EQUAL, field("login_name", $.id_))
        )),
      ),
    ),

    create_login_pdw: $ => seq(
      CREATE,
      LOGIN,
      field("loginName", $.id_),
      choice(
        seq(WITH, seq(
          PASSWORD,
          EQUAL,
          field("password", STRING),
          optional(MUST_CHANGE),
          optional(seq(CHECK_POLICY, EQUAL, optional(choice(ON, OFF))))
        )),
        seq(FROM, WINDOWS)
      ),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-master-key-transact-sql
    alter_master_key_sql_server: $ => seq(
      ALTER,
      MASTER,
      KEY,
      choice(
        seq(optional(FORCE), REGENERATE, WITH, ENCRYPTION, BY, PASSWORD, EQUAL, field("password", STRING)),
        seq(
          choice(ADD, DROP),
          ENCRYPTION,
          BY,
          choice(seq(SERVICE, MASTER, KEY), seq(PASSWORD, EQUAL, field("encryption_password", STRING)))
        )
      ),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-master-key-transact-sql
    create_master_key_sql_server: $ => seq(
      CREATE,
      MASTER,
      KEY,
      ENCRYPTION,
      BY,
      PASSWORD,
      EQUAL,
      field("password", STRING)
    ),

    alter_master_key_azure_sql: $ => seq(
      ALTER,
      MASTER,
      KEY,
      choice(
        seq(optional(FORCE), REGENERATE, WITH, ENCRYPTION, BY, PASSWORD, EQUAL, field("password", STRING)),
        seq(ADD, ENCRYPTION, BY, choice(
          seq(SERVICE, MASTER, KEY),
          seq(PASSWORD, EQUAL, field("encryption_password", STRING))
        )),
        seq(DROP, ENCRYPTION, BY, PASSWORD, EQUAL, field("encryption_password", STRING))
      ),
    ),

    create_master_key_azure_sql: $ => seq(
      CREATE,
      MASTER,
      KEY,
      optional(seq(ENCRYPTION, BY, PASSWORD, EQUAL, field("password", STRING)))
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-message-type-transact-sql
    alter_message_type: $ => seq(
      ALTER,
      MESSAGE,
      TYPE,
      field("message_type_name", $.id_),
      VALIDATION,
      EQUAL,
      choice(NONE, EMPTY, WELL_FORMED_XML, seq(VALID_XML, WITH, SCHEMA, COLLECTION, field("schema_collection_name", $.id_))),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-partition-function-transact-sql
    alter_partition_function: $ => seq(
      ALTER,
      PARTITION,
      FUNCTION,
      field("partition_function_name", $.id_),
      LR_BRACKET,
      RR_BRACKET,
      choice(SPLIT, MERGE),
      RANGE,
      LR_BRACKET,
      DECIMAL,
      RR_BRACKET
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-partition-scheme-transact-sql
    alter_partition_scheme: $ => seq(
      ALTER,
      PARTITION,
      SCHEME,
      field("partition_scheme_name", $.id_),
      NEXT,
      USED,
      optional(seq(field("file_group_name", $.id_)))
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-remote-service-binding-transact-sql
    alter_remote_service_binding: $ => seq(
      ALTER,
      REMOTE,
      SERVICE,
      BINDING,
      field("binding_name", $.id_),
      WITH,
      optional(seq(USER, EQUAL, field("user_name", $.id_))),
      optional(seq(COMMA, ANONYMOUS, EQUAL, choice(ON, OFF))),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-remote-service-binding-transact-sql
    create_remote_service_binding: $ => seq(
      CREATE,
      REMOTE,
      SERVICE,
      BINDING,
      field("binding_name", $.id_),
      optional(seq(AUTHORIZATION, field("owner_name", $.id_))),
      TO,
      SERVICE,
      field("remote_service_name", STRING),
      WITH,
      optional(seq(USER, EQUAL, field("user_name", $.id_))),
      optional(seq(COMMA, ANONYMOUS, EQUAL, choice(ON, OFF)))
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-resource-pool-transact-sql
    create_resource_pool: $ => seq(
      CREATE,
      RESOURCE,
      POOL,
      field("pool_name", $.id_),
      optional(choice(
        seq(
          WITH,
          LR_BRACKET,
          optional(seq(optional(COMMA), MIN_CPU_PERCENT, EQUAL, DECIMAL)),
          optional(seq(optional(COMMA), MAX_CPU_PERCENT, EQUAL, DECIMAL)),
          optional(seq(optional(COMMA), CAP_CPU_PERCENT, EQUAL, DECIMAL)),
          optional(seq(
            optional(COMMA),
            AFFINITY,
            SCHEDULER,
            EQUAL,
            choice(
              AUTO,
              seq(LR_BRACKET, repeat1(optional(COMMA), choice(DECIMAL, seq(DECIMAL, TO, DECIMAL))), RR_BRACKET),
              seq(NUMANODE, EQUAL, LR_BRACKET, repeat1(seq(optional(COMMA), (DECIMAL, DECIMAL, TO, DECIMAL))), RR_BRACKET),
            )
          )),
          optional(seq(optional(COMMA), MIN_MEMORY_PERCENT, EQUAL, DECIMAL)),
          optional(seq(optional(COMMA), MAX_MEMORY_PERCENT, EQUAL, DECIMAL)),
          optional(seq(optional(COMMA), MIN_IOPS_PER_VOLUME, EQUAL, DECIMAL)),
          optional(seq(optional(COMMA), MAX_IOPS_PER_VOLUME, EQUAL, DECIMAL)),
          RR_BRACKET,
        ),
      )),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-resource-governor-transact-sql
    alter_resource_governor: $ => seq(
      ALTER,
      RESOURCE,
      GOVERNOR,
      choice(
        choice(DISABLE, RECONFIGURE),
        seq(WITH, LR_BRACKET, CLASSIFIER_FUNCTION, EQUAL, choice(
          seq(field("schema_name", $.id_), DOT, field("function_name", $.id_)), $.NULL_),
          RR_BRACKET
        ),
        seq(RESET, STATISTICS),
        seq(
          WITH,
          LR_BRACKET,
          MAX_OUTSTANDING_IO_PER_VOLUME,
          EQUAL,
          field("max_outstanding_io_per_volume", DECIMAL),
          RR_BRACKET
        )
      )
    ),

    // https://learn.microsoft.com/en-us/sql/t-sql/statements/alter-database-audit-specification-transact-optional($.sql)view=sql-server-ver16
    alter_database_audit_specification: $ => seq(
      ALTER,
      DATABASE,
      AUDIT,
      SPECIFICATION,
      field("audit_specification_name", $.id_),
      optional(seq(FOR, SERVER, AUDIT, field("audit_name", $.id_))),
      optional(seq($.audit_action_spec_group, repeat(seq(',', $.audit_action_spec_group)))),
      optional(seq(WITH, '(', STATE, '=', choice(ON, OFF), ')')),
    ),

    audit_action_spec_group: $ => seq(
      choice(ADD, DROP),
      '(', choice($.audit_action_specification, field("audit_action_group_name", $.id_)), ')'
    ),


    audit_action_specification: $ => seq(
      $.action_specification,
      repeat(seq(',', $.action_specification)),
      ON,
      optional(seq($.audit_class_name, '::')),
      $.audit_securable,
      BY,
      $.principal_id,
      repeat(seq(',', $.principal_id)),
    ),

    action_specification: $ => choice(
        SELECT,
        INSERT,
        UPDATE,
        DELETE,
        EXECUTE,
        RECEIVE,
        REFERENCE,
    ),

    audit_class_name: $ => choice(
        OBJECT,
        SCHEMA,
        TABL,
    ),

    audit_securable: $ => seq(optional(seq(optional(seq($.id_, '.'),), $.id_, '.')), $.id_),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-role-transact-sql
    alter_db_role: $ => seq(
      ALTER,
      ROLE,
      field("role_name", $.id_),
      choice(seq(choice(seq(ADD, DROP)), MEMBER, field("database_principal", $.id_)), seq(WITH, NAME, EQUAL, field("new_role_name", $.id_))),
    ),

    // MARKER

    // https://learn.microsoft.com/en-us/sql/t-sql/statements/create-database-audit-specification-transact-optional($.sql)view=sql-server-ver16
    create_database_audit_specification: $ => (
            seq(CREATE, DATABASE, AUDIT, SPECIFICATION, field("audit_specification_name", $.id_), optional(
        seq(FOR, SERVER, AUDIT, field("audit_name", $.id_))
        ), optional(seq($.audit_action_spec_group, repeat(seq(',', $.audit_action_spec_group),))), optional(
        seq(WITH, '(', STATE, '=', choice(seq(ON, OFF),), ')')
        ),),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-role-transact-sql
    create_db_role: $ => (
            seq(CREATE, ROLE, field("role_name", $.id_), optional(seq(AUTHORIZATION, field("owner_name", $.id_)))),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-route-transact-sql
    create_route: $ => (
            seq(CREATE, ROUTE, field("route_name", $.id_), optional(seq(AUTHORIZATION, field("owner_name", $.id_))), WITH, optional(
        seq(optional(COMMA), SERVICE_NAME, EQUAL, field("route_service_name", STRING))
        ), optional(seq(optional(COMMA), BROKER_INSTANCE, EQUAL, field("broker_instance_identifier", STRING))), optional(
        seq(optional(COMMA), LIFETIME, EQUAL, DECIMAL)
        ), optional(COMMA), ADDRESS, EQUAL, STRING, optional(seq(COMMA, MIRROR_ADDRESS, EQUAL, STRING),)),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-rule-transact-sql
    create_rule: $ => (
            seq(CREATE, RULE, optional(seq(field("schema_name", $.id_), DOT),), field("rule_name", $.id_), AS, $.search_condition),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-schema-transact-sql
    alter_schema_sql: $ => (
            seq(ALTER, SCHEMA, field("schema_name", $.$.id_), TRANSFER, optional(
        seq(choice(seq(OBJECT, TYPE, XML, SCHEMA, COLLECTION),), DOUBLE_COLON)
        ), $.id_, optional(seq(DOT, $.id_),)),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-schema-transact-sql
    create_schema: $ => (
            seq(CREATE, SCHEMA, choice(
        seq(field("schema_name", $.id_)),
        seq(AUTHORIZATION, field("owner_name", $.id_)),
        seq(field("schema_name", $.id_), AUTHORIZATION, field("owner_name", $.id_))
        ), repeat(choice(
            $.create_table,
            $.create_view,
        seq((GRANT, DENY), (SELECT, INSERT, DELETE, UPDATE), ON, optional(seq(SCHEMA, DOUBLE_COLON),), field("object_name", $.id_), TO, field("owner_name", $.id_)),
        seq(REVOKE, (SELECT, INSERT, DELETE, UPDATE), ON, optional(seq(SCHEMA, DOUBLE_COLON),), field("object_name", $.id_), FROM, field("owner_name", $.id_))
        ),)),
    ),

    create_schema_azure_sql_dw_and_pdw: $ => (
            seq(CREATE, SCHEMA, field("schema_name", $.id_), optional(seq(AUTHORIZATION, field("owner_name", $.id_)))),
    ),

    alter_schema_azure_sql_dw_and_pdw: $ => (
            seq(ALTER, SCHEMA, field("schema_name", $.$.id_), TRANSFER, optional(seq(OBJECT, DOUBLE_COLON),), $.id_, optional(seq(DOT, ID),)),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-search-property-list-transact-sql
    create_search_property_list: $ => (
            seq(CREATE, SEARCH, PROPERTY, LIST, field("new_list_name", $.id_), optional(
        seq(FROM, optional(seq(field("database_name", $.id_), DOT),), field("source_list_name", $.id_))
        ), optional(seq(AUTHORIZATION, field("owner_name", $.id_)))),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-security-policy-transact-sql
    create_security_policy: $ => (
            seq(CREATE, SECURITY, POLICY, optional(seq(field("schema_name", $.id_), DOT),), field("security_policy_name", $.id_), repeat1(choice(
        seq(optional(COMMA), ADD, (FILTER, BLOCK)?, PREDICATE, field("tvf_schema_name", $.id_), DOT, field("security_predicate_function_name", $.id_), LR_BRACKET, (),
        seq(optional(COMMA), field("column_name_or_arguments", $.id_)),
        seq()+, RR_BRACKET, ON, field("table_schema_name", $.id_), DOT, field("name", $.id_), repeat(choice(
        seq(optional(COMMA), AFTER, (INSERT, UPDATE)),
        seq(optional(COMMA), BEFORE, choice(seq(UPDATE, DELETE),))
            ),))
        ),), optional(choice(seq(WITH, LR_BRACKET, STATE, EQUAL, (ON, OFF), optional(seq(SCHEMABINDING, (#######,))), RR_BRACKET),)), optional(
        seq(NOT, FOR, REPLICATION)
        ),),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-sequence-transact-sql
    alter_sequence: $ => (
            seq(ALTER, SEQUENCE, optional(seq(field("schema_name", $.id_), DOT),), field("sequence_name", $.id_), optional(seq(RESTART, optional(seq(WITH, DECIMAL),))), optional(
        seq(INCREMENT, BY, field("sequnce_increment", DECIMAL))
        ), optional(choice(seq(MINVALUE, DECIMAL, NO, MINVALUE),)), optional(choice(seq(MAXVALUE, DECIMAL, NO, MAXVALUE),)), optional(choice(seq(CYCLE, NO, CYCLE),)), optional(choice(
        seq(CACHE, DECIMAL),
        seq(NO, CACHE)
        ),)),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-sequence-transact-sql
    create_sequence: $ => (
            seq(CREATE, SEQUENCE, optional(seq(field("schema_name", $.id_), DOT),), field("sequence_name", $.id_), optional(seq(AS, $.data_type),), optional(
        seq(START, WITH, DECIMAL)
        ), optional(seq(INCREMENT, BY, MINUS?, DECIMAL),), optional(choice(seq(MINVALUE, optional(seq(MINUS?, DECIMAL),), NO, MINVALUE),)), optional(choice(
        seq(MAXVALUE, optional(seq(MINUS?, DECIMAL),)),
        seq(NO, MAXVALUE)
        ),), optional(choice(seq(CYCLE, NO, CYCLE),)), optional(choice(seq(CACHE, DECIMAL?, NO, CACHE),))),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-server-audit-transact-sql
    alter_server_audit: $ => (
            seq(ALTER, SERVER, AUDIT, field("audit_name", $.id_), choice(
            ,
        seq(TO, (),
        seq(FILE, (),
        seq(LR_BRACKET, (),
        seq(optional(COMMA), FILEPATH, EQUAL, field("filepath", STRING)),
        seq(optional(COMMA), MAXSIZE, EQUAL, (, DECIMAL, (MB, GB, TB), UNLIMITED)),
        seq(optional(COMMA), MAX_ROLLOVER_FILES, EQUAL, $.max_rollover_files, =, (DECIMAL, UNLIMITED)),
        seq(optional(COMMA), MAX_FILES, EQUAL, field("max_files", DECIMAL)),
        seq(optional(COMMA), RESERVE_DISK_SPACE, EQUAL, (ON, OFF)),
        seq()*, RR_BRACKET)
                    ),
                    APPLICATION_LOG,
                    SECURITY_LO,
                ,
        seq()?, (),
        seq(WITH, LR_BRACKET, (),
        seq(optional(COMMA), QUEUE_DELAY, EQUAL, field("queue_delay", DECIMAL)),
        seq(optional(COMMA), ON_FAILURE, EQUAL, (CONTINUE, SHUTDOWN, FAIL_OPERATION)),
        seq(optional(COMMA), STATE, EQUAL, (ON, OFF)),
        seq()*, RR_BRACKET),
        seq()?, optional(
        seq(WHERE, choice(
        seq(optional(COMMA), (NOT?), field("event_field_name", $.id_), (),
                        EQUAL,
        seq((LESS, GREATER)),
        seq((EXCLAMATION, EQUAL)),
                        GREATER,
        seq((GREATER, EQUAL)),
                        LESS,
        seq(LESS, EQUAL),
        seq(), choice(seq(DECIMAL, STRING),)),
        seq(optional(COMMA), (AND, OR), NOT?, (),
                        EQUAL,
        seq((LESS, GREATER)),
        seq((EXCLAMATION, EQUAL)),
                        GREATER,
        seq((GREATER, EQUAL)),
                        LESS,
        seq(LESS, EQUAL),
        seq(), choice(seq(DECIMAL, STRING),))
                ),)
            ),),
        seq(REMOVE, WHERE),
        seq(MODIFY, NAME, EQUAL, field("new_audit_name", $.id_))
        ),),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-server-audit-transact-sql
    create_server_audit: $ => (
            seq(CREATE, SERVER, AUDIT, field("audit_name", $.id_), choice(
            ,
        seq(TO, (),
        seq(FILE, (),
        seq(LR_BRACKET, (),
        seq(optional(COMMA), FILEPATH, EQUAL, field("filepath", STRING)),
        seq(optional(COMMA), MAXSIZE, EQUAL, (, DECIMAL, (MB, GB, TB), UNLIMITED)),
        seq(optional(COMMA), MAX_ROLLOVER_FILES, EQUAL, $.max_rollover_files, =, (DECIMAL, UNLIMITED)),
        seq(optional(COMMA), MAX_FILES, EQUAL, field("max_files", DECIMAL)),
        seq(optional(COMMA), RESERVE_DISK_SPACE, EQUAL, (ON, OFF)),
        seq()*, RR_BRACKET)
                    ),
                    APPLICATION_LOG,
                    SECURITY_LO,
                ,
        seq()?, (),
        seq(WITH, LR_BRACKET, (),
        seq(optional(COMMA), QUEUE_DELAY, EQUAL, field("queue_delay", DECIMAL)),
        seq(optional(COMMA), ON_FAILURE, EQUAL, (CONTINUE, SHUTDOWN, FAIL_OPERATION)),
        seq(optional(COMMA), STATE, EQUAL, (ON, OFF)),
        seq(optional(COMMA), AUDIT_GUID, EQUAL, field("audit_guid", $.id_)),
        seq()*, RR_BRACKET),
        seq()?, optional(
        seq(WHERE, choice(
        seq(optional(COMMA), (NOT?), field("event_field_name", $.id_), (),
                        EQUAL,
        seq((LESS, GREATER)),
        seq((EXCLAMATION, EQUAL)),
                        GREATER,
        seq((GREATER, EQUAL)),
                        LESS,
        seq(LESS, EQUAL),
        seq(), choice(seq(DECIMAL, STRING),)),
        seq(optional(COMMA), (AND, OR), NOT?, (),
                        EQUAL,
        seq((LESS, GREATER)),
        seq((EXCLAMATION, EQUAL)),
                        GREATER,
        seq((GREATER, EQUAL)),
                        LESS,
        seq(LESS, EQUAL),
        seq(), choice(seq(DECIMAL, STRING),))
                ),)
            ),),
        seq(REMOVE, WHERE),
        seq(MODIFY, NAME, EQUAL, field("new_audit_name", $.id_))
        ),),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-server-audit-specification-transact-sql

    alter_server_audit_specification: $ => (
            seq(ALTER, SERVER, AUDIT, SPECIFICATION, field("audit_specification_name", $.id_), optional(
        seq(FOR, SERVER, AUDIT, field("audit_name", $.id_))
        ), repeat(seq(choice(seq(ADD, DROP),), LR_BRACKET, field("audit_action_group_name", $.id_), RR_BRACKET),), optional(
        seq(WITH, LR_BRACKET, STATE, EQUAL, choice(seq(ON, OFF),), RR_BRACKET)
        ),),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-server-audit-specification-transact-sql
    create_server_audit_specification: $ => (
            seq(CREATE, SERVER, AUDIT, SPECIFICATION, field("audit_specification_name", $.id_), optional(
        seq(FOR, SERVER, AUDIT, field("audit_name", $.id_))
        ), repeat(seq(ADD, LR_BRACKET, field("audit_action_group_name", $.id_), RR_BRACKET),), optional(
        seq(WITH, LR_BRACKET, STATE, EQUAL, choice(seq(ON, OFF),), RR_BRACKET)
        ),),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-server-configuration-transact-sql

    alter_server_configuration: $ => (
            seq(ALTER, SERVER, CONFIGURATION, SET, (
            #######
        ),),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-server-role-transact-sql
    alter_server_role: $ => (
            seq(ALTER, SERVER, ROLE, field("server_role_name", $.id_), choice(
        seq(choice(seq(ADD, DROP),), MEMBER, field("server_principal", $.id_)),
        seq(WITH, NAME, EQUAL, field("new_server_role_name", $.id_))
        ),),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-server-role-transact-sql
    create_server_role: $ => (
            seq(CREATE, SERVER, ROLE, field("server_role", $.id_), optional(seq(AUTHORIZATION, field("server_principal", $.id_)))),
    ),

    alter_server_role_pdw: $ => (
            seq(ALTER, SERVER, ROLE, field("server_role_name", $.id_), choice(seq(ADD, DROP),), MEMBER, field("login", $.id_)),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-service-transact-sql
    alter_service: $ => (
            seq(ALTER, SERVICE, field("modified_service_name", $.id_), optional(
        seq(ON, QUEUE, optional(seq(field("schema_name", $.id_), DOT),), field("queue_name", $.id_))
        ), optional(seq('(', $.opt_arg_clause, repeat(seq(COMMA, $.opt_arg_clause),), ')'),)),
    ),

    opt_arg_clause: $ => (
            seq(choice(seq(ADD, DROP),), CONTRACT, field("modified_contract_name", $.id_)),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-service-transact-sql
    create_service: $ => (
            seq(CREATE, SERVICE, field("create_service_name", $.id_), optional(seq(AUTHORIZATION, field("owner_name", $.id_))), ON, QUEUE, optional(
        seq(field("schema_name", $.id_), DOT)
        ), field("queue_name", $.id_), optional(seq(LR_BRACKET, repeat1(seq(optional(COMMA), choice(seq($.id_, DEFAULT),))), RR_BRACKET),)),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-service-master-key-transact-sql

    alter_service_master_key: $ => (
            seq(ALTER, SERVICE, MASTER, KEY, choice(
        seq(FORCE?, REGENERATE),
            #######
        ),),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-symmetric-key-transact-sql

    alter_symmetric_key: $ => (
            seq(ALTER, SYMMETRIC, KEY, field("key_name", $.id_), choice(
        seq((ADD, DROP), ENCRYPTION, BY, choice(
        seq(CERTIFICATE, field("certificate_name", $.id_)),
        seq(PASSWORD, EQUAL, field("password", STRING)),
        seq(SYMMETRIC, KEY, field("symmetric_key_name", $.id_)),
        seq(ASYMMETRIC, KEY, field("Asym_key_name", $.id_))
            ),)
        ),),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-synonym-transact-sql
    create_synonym: $ => (
            seq(CREATE, SYNONYM, optional(seq($.schema_name_1, =, $.id_, DOT),), field("synonym_name", $.id_), FOR, choice(
        seq((field("server_name", $.$.id_), DOT)?, (field("database_name", $.$.id_), DOT)?, (schema_name_2, =, $.id_, DOT)?, field("object_name", $.$.id_)),
        seq((database_or_schema2, =, $.id_, DOT)?, optional(seq($.schema_id_2field("_or_object_name", $.id_), DOT),))
        ),),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-user-transact-sql
    alter_user: $ => (
            seq(ALTER, USER, field("username", $.id_), WITH, repeat1(choice(
        seq(optional(COMMA), NAME, EQUAL, field("newusername", $.id_)),
        seq(optional(COMMA), DEFAULT_SCHEMA, EQUAL, (, field("schema_name", $.id_), NULL_)),
        seq(optional(COMMA), LOGIN, EQUAL, field("loginame", $.id_)),
        seq(optional(COMMA), PASSWORD, EQUAL, STRING, (OLD_PASSWORD, EQUAL, STRING)+),
        seq(optional(COMMA), DEFAULT_LANGUAGE, EQUAL, (NONE, field("lcid", DECIMAL), field("language_name_or_alias", $.id_))),
        seq(optional(COMMA), ALLOW_ENCRYPTED_VALUE_MODIFICATIONS, EQUAL, choice(seq(ON, OFF),))
        ),)),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-user-transact-sql
    create_user: $ => (
            seq(CREATE, USER, field("user_name", $.id_), optional(seq(choice(seq(FOR, FROM),), LOGIN, field("login_name", $.id_))), (),
        seq(WITH, repeat(choice(
        seq(optional(COMMA), DEFAULT_SCHEMA, EQUAL, field("schema_name", $.id_)),
        seq(optional(COMMA), ALLOW_ENCRYPTED_VALUE_MODIFICATIONS, EQUAL, choice(seq(ON, OFF),))
            ),)),
        ),?,
        seq(CREATE, USER, choice(
        seq(field("windows_principal", $.id_), (),
        seq(WITH, (),
        seq(optional(COMMA), DEFAULT_SCHEMA, EQUAL, field("schema_name", $.id_)),
        seq(optional(COMMA), DEFAULT_LANGUAGE, EQUAL, (NONE, DECIMAL, field("language_name_or_alias", $.id_))),
        seq(optional(COMMA), SID, EQUAL, BINARY),
        seq(optional(COMMA), ALLOW_ENCRYPTED_VALUE_MODIFICATIONS, EQUAL, (ON, OFF))
                ),
            ),?,
        seq(field("user_name", $.id_), WITH, PASSWORD, EQUAL, field("password", STRING), repeat(choice(
        seq(optional(COMMA), DEFAULT_SCHEMA, EQUAL, field("schema_name", $.id_)),
        seq(optional(COMMA), DEFAULT_LANGUAGE, EQUAL, (NONE, DECIMAL, field("language_name_or_alias", $.id_))),
        seq(optional(COMMA), SID, EQUAL, BINARY),
        seq(optional(COMMA), ALLOW_ENCRYPTED_VALUE_MODIFICATIONS, EQUAL, choice(seq(ON, OFF),))
            ),)),
        seq(field("Azure_Active_Directory_principal", $.id_), FROM, EXTERNAL, PROVIDER)
        ),),
        seq(CREATE, USER, field("user_name", $.id_), choice(
        seq(WITHOUT, LOGIN, (),
        seq(optional(COMMA), DEFAULT_SCHEMA, EQUAL, field("schema_name", $.id_)),
        seq(optional(COMMA), ALLOW_ENCRYPTED_VALUE_MODIFICATIONS, EQUAL, (ON, OFF))
            ),*,
        seq((#######,), CERTIFICATE, field("cert_name", $.id_)),
        seq((#######,), ASYMMETRIC, KEY, field("asym_key_name", $.id_))
        ),),
        seq(CREATE, USER, field("user_name", $.id_)),
    ),

    create_user_azure_sql_dw: $ => (
            seq(CREATE, USER, field("user_name", $.id_), optional(choice(seq(choice(seq(FOR, FROM),), LOGIN, field("login_name", $.id_), WITHOUT, LOGIN),)), (#######,)),
        seq(CREATE, USER, field("Azure_Active_Directory_principal", $.id_), FROM, EXTERNAL, PROVIDER, (#######,)),
    ),

    alter_user_azure_sql: $ => (
            seq(ALTER, USER, field("username", $.id_), WITH, repeat1(choice(
        seq(optional(COMMA), NAME, EQUAL, field("newusername", $.id_)),
        seq(optional(COMMA), DEFAULT_SCHEMA, EQUAL, field("schema_name", $.id_)),
        seq(optional(COMMA), LOGIN, EQUAL, field("loginame", $.id_)),
        seq(optional(COMMA), ALLOW_ENCRYPTED_VALUE_MODIFICATIONS, EQUAL, choice(seq(ON, OFF),))
        ),)),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-workload-group-transact-sql

    alter_workload_group: $ => (
            seq(ALTER, WORKLOAD, GROUP, choice(seq(field("workload_group_group_name", $.id_), DEFAULT_DOUBLE_QUOTE),), optional(
        seq(WITH, LR_BRACKET, repeat1(choice(
        seq(IMPORTANCE, EQUAL, choice(seq(LOW, MEDIUM, HIGH),)),
        seq(optional(COMMA), REQUEST_MAX_MEMORY_GRANT_PERCENT, EQUAL, field("request_max_memory_grant", DECIMAL)),
        seq(optional(COMMA), REQUEST_MAX_CPU_TIME_SEC, EQUAL, field("request_max_cpu_time_sec", DECIMAL)),
        seq(REQUEST_MEMORY_GRANT_TIMEOUT_SEC, EQUAL, field("request_memory_grant_timeout_sec", DECIMAL)),
        seq(MAX_DOP, EQUAL, field("max_dop", DECIMAL)),
        seq(GROUP_MAX_REQUESTS, EQUAL, field("group_max_requests", DECIMAL))
            ),), RR_BRACKET)
        ), optional(seq(USING, choice(seq(field("workload_group_pool_name", $.id_), DEFAULT_DOUBLE_QUOTE),)))),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-workload-group-transact-sql
    create_workload_group: $ => (
            seq(CREATE, WORKLOAD, GROUP, field("workload_group_group_name", $.id_), optional(
        seq(WITH, LR_BRACKET, repeat1(choice(
        seq(IMPORTANCE, EQUAL, choice(seq(LOW, MEDIUM, HIGH),)),
        seq(optional(COMMA), REQUEST_MAX_MEMORY_GRANT_PERCENT, EQUAL, field("request_max_memory_grant", DECIMAL)),
        seq(optional(COMMA), REQUEST_MAX_CPU_TIME_SEC, EQUAL, field("request_max_cpu_time_sec", DECIMAL)),
        seq(REQUEST_MEMORY_GRANT_TIMEOUT_SEC, EQUAL, field("request_memory_grant_timeout_sec", DECIMAL)),
        seq(MAX_DOP, EQUAL, field("max_dop", DECIMAL)),
        seq(GROUP_MAX_REQUESTS, EQUAL, field("group_max_requests", DECIMAL))
            ),), RR_BRACKET)
        ), optional(choice(
        seq(USING, (field("workload_group_pool_name", $.id_), DEFAULT_DOUBLE_QUOTE)?, optional(choice(
        seq(optional(COMMA), EXTERNAL, field("external_pool_name", $.id_)),
                DEFAULT_DOUBLE_QUOT
            ),))
        ),)),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-xml-schema-collection-transact-sql
    create_xml_schema_collection: $ => (
            seq(CREATE, XML, SCHEMA, COLLECTION, optional(seq(field("relational_schema", $.id_), DOT),), field("sql_identifier", $.id_), AS, choice(
            STRING,
            $.id_,
            LOCAL_I
        ),),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-partition-function-transact-optional($.sql)view=sql-server-ver15
    create_partition_function: $ => (
            seq(CREATE, PARTITION, FUNCTION, field("partition_function_name", $.id_), '(', field("input_parameter_type", $.data_type), ')', AS, RANGE, optional(choice(
            LEFT,
            RIGH
        ),), FOR, VALUES, '(', field("boundary_values", $.expression_list_), ')'),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-partition-scheme-transact-optional($.sql)view=sql-server-ver15
    create_partition_scheme: $ => (
            seq(CREATE, PARTITION, SCHEME, field("partition_scheme_name", $.$.id_), AS, PARTITION, field("partition_function_name", $.$.id_), ALL?, TO, '(', $.file_group_names, +=, $.id_, repeat(
        seq(',', $.file_group_names, +=, $.id_)
        ), ')'),
    ),

    create_queue: $ => (
            seq(CREATE, QUEUE, choice(seq($.full_table_name, field("queue_name", $.id_))), optional($.queue_settings), optional(choice(
        seq(ON, field("filegroup", $.id_)),
            DEFAUL
        ),)),
    ),

    queue_settings: $ => (
            seq(WITH, optional(seq(STATUS, EQUAL, $.on_off, optional(COMMA)),), optional(seq(RETENTION, EQUAL, $.on_off, optional(COMMA)),), optional(
        seq(ACTIVATION, LR_BRACKET, choice(
                (
        seq((STATUS, EQUAL, $.on_off, optional(COMMA))?, (),
        seq(PROCEDURE_NAME, EQUAL, $.func_proc_name_database_schema, optional(COMMA)),
        seq()?, (MAX_QUEUE_READERS, EQUAL, field("max_readers", DECIMAL), optional(COMMA))?, optional(
        seq(EXECUTE, AS, choice(seq(SELF, field("user_name", STRING), OWNER),), optional(COMMA))
                    ),)
                ),
                DRO
            ), RR_BRACKET, optional(COMMA))
        ), optional(seq(POISON_MESSAGE_HANDLING, LR_BRACKET, (seq(STATUS, EQUAL, $.on_off),), RR_BRACKET),)),
    ),

    alter_queue: $ => (
            seq(ALTER, QUEUE, choice(seq($.full_table_name, field("queue_name", $.id_))), choice(seq($.queue_settings, $.queue_action),)),
    ),

    queue_action: $ => choice(
            seq(REBUILD, optional(seq(WITH, LR_BRACKET, $.queue_rebuild_options, RR_BRACKET),)),
        seq(REORGANIZE, optional(seq(WITH, LOB_COMPACTION, EQUAL, $.on_off),)),
        seq(MOVE, TO, choice(seq($.id_, DEFAULT),)),
    ),

    queue_rebuild_options: $ => (
            seq(MAXDOP, EQUAL, DECIMAL),
    ),

    create_contract: $ => (
            seq(CREATE, CONTRACT, $.contract_name, optional(seq(AUTHORIZATION, field("owner_name", $.id_))), LR_BRACKET, repeat1(choice(
        seq((field("message_type_name", $.id_), DEFAULT), SENT, BY, choice(seq(INITIATOR, TARGET, ANY),), optional(COMMA))
        ),), RR_BRACKET),
    ),

    conversation_statement: $ => choice(
        $.begin_conversation_timer,
        $.begin_conversation_dialog,
        $.end_conversation,
        $.get_conversation,
        $.send_conversation,
        $.waitfor_conversatio,
    ),

    message_statement: $ => (
            seq(CREATE, MESSAGE, TYPE, field("message_type_name", $.id_), optional(seq(AUTHORIZATION, field("owner_name", $.id_))), (
        seq(VALIDATION, EQUAL, choice(
                NONE,
                EMPTY,
                WELL_FORMED_XML,
        seq(VALID_XML, WITH, SCHEMA, COLLECTION, field("schema_collection_name", $.id_))
            ),)
        ),),
    ),

    // DML

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/merge-transact-sql
    // note that there's a limit on number of when_matches but it has to be done runtime due to different ordering of statements allowed
    merge_statement: $ => (
            seq(optional($.with_expression), MERGE, optional(seq(TOP, '(', $.expression, ')', PERCENT?),), INTO?, $.ddl_object, optional($.with_table_hints), optional($.as_table_alias), USING, $.table_sources, ON),
        seq($.search_condition, repeat1($.when_matches), optional($.output_clause), optional($.option_clause), ';'),
    ),

    when_matches: $ => choice(
        repeat1(seq(WHEN, MATCHED, optional(seq(AND, $.search_condition),), THEN, $.merge_matched),),
        (seq(WHEN, NOT, MATCHED, (BY, TARGET)?, optional(seq(AND, $.search_condition),), THEN, $.merge_not_matched),),
        ########,
    ),

    merge_matched: $ => choice(
            seq(UPDATE, SET, $.update_elem_merge, repeat(seq(',', $.update_elem_merge),)),
        DELET,
    ),

    merge_not_matched: $ => (
            seq(INSERT, optional(seq('(', $.column_name_list, ')'),), choice(seq($.table_value_constructor, DEFAULT, VALUES),)),
    ),

    // https://msdn.microsoft.com/en-us/library/ms189835.aspx
    delete_statement: $ => (
            seq(optional($.with_expression), DELETE, optional(choice(seq(TOP, '(', $.expression, ')', PERCENT?, TOP, DECIMAL),)), FROM?, $.delete_statement_from, optional($.with_table_hints), optional($.output_clause), optional(
        seq(FROM, $.table_sources)
        ), optional(seq(WHERE, choice(seq($.search_condition, CURRENT, OF, choice(seq(GLOBAL?, $.cursor_name, field("cursor_var", LOCAL_ID)))),)),), optional($.for_clause), optional($.option_clause), optional(';')),
    ),

    delete_statement_from: $ => choice(
        $.ddl_object,
        $.rowset_function_limited,
        seq(field("table_var", LOCAL_ID)),
    ),

    // https://msdn.microsoft.com/en-us/library/ms174335.aspx
    insert_statement: $ => (
            seq(optional($.with_expression), INSERT, optional(seq(TOP, '(', $.expression, ')', PERCENT?),), INTO?, choice(
            $.ddl_object,
            $.rowset_function_limite
        ), optional($.with_table_hints), optional(seq('(', $.insert_column_name_list, ')'),), optional($.output_clause), $.insert_statement_value, optional($.for_clause), optional($.option_clause), optional(';')),
    ),

    insert_statement_value: $ => choice(
        $.table_value_constructor,
        $.derived_table,
        $.execute_statement,
        seq(DEFAULT, VALUES),
    ),

    receive_statement: $ => (
            seq(optional('('), RECEIVE, choice(seq(ALL, DISTINCT, $.top_clause, '*'),), repeat(seq(LOCAL_ID, '=', $.expression, optional(','))), FROM, $.full_table_name, optional(
        seq(INTO, field("table_variable", $.id_), (seq(WHERE, field("where", $.search_condition))))
        ), optional(')')),
    ),

    // https://msdn.microsoft.com/en-us/library/ms189499.aspx
    select_statement_standalone: $ => (
            seq(optional($.with_expression), $.select_statement),
    ),

    select_statement: $ => (
            seq($.query_expression, optional($.select_order_by_clause), optional($.for_clause), optional($.option_clause), optional(';')),
    ),

    time: $ => (
        ########,
    ),

    // https://msdn.microsoft.com/en-us/library/ms177523.aspx
    update_statement: $ => (
            seq(optional($.with_expression), UPDATE, optional(seq(TOP, '(', $.expression, ')', PERCENT?),), choice(
            $.ddl_object,
            $.rowset_function_limite
        ), optional($.with_table_hints), SET, $.update_elem, repeat(seq(',', $.update_elem),), optional($.output_clause), optional(seq(FROM, $.table_sources),), optional(
        seq(WHERE, choice(seq($.search_condition, CURRENT, OF, choice(seq(GLOBAL?, $.cursor_name, field("cursor_var", LOCAL_ID)))),))
        ), optional($.for_clause), optional($.option_clause), optional(';')),
    ),

    // https://msdn.microsoft.com/en-us/library/ms177564.aspx
    output_clause: $ => (
            seq(OUTPUT, $.output_dml_list_elem, repeat(seq(',', $.output_dml_list_elem),), optional(choice(
        seq(INTO, (LOCAL_ID, table_name), optional(seq('(', $.column_name_list, ')'),))
        ),)),
    ),

    output_dml_list_elem: $ => (
            seq(choice(seq($.expression, $.asterisk),), optional($.as_column_alias)),
    ),

    // DDL

    // https://msdn.microsoft.com/en-ie/library/ms176061.aspx
    create_database: $ => (
            seq(CREATE, DATABASE, (seq(field("database", $.id_))), optional(seq(CONTAINMENT, '=', choice(seq(NONE, PARTIAL),)),), optional(
        seq(ON, PRIMARY?, $.database_file_spec, repeat(seq(',', $.database_file_spec),))
        ), optional(seq(LOG, ON, $.database_file_spec, repeat(seq(',', $.database_file_spec),))), optional(seq(COLLATE, field("collation_name", $.id_)),), optional(
        seq(WITH, $.create_database_option, repeat(seq(',', $.create_database_option),))
        ),),
    ),

    // https://msdn.microsoft.com/en-us/library/ms188783.aspx
    create_index: $ => (
            seq(CREATE, UNIQUE?, optional($.clustered), INDEX, $.id_, ON, $.table_name, '(', $.column_name_list_with_order, ')', optional(
        seq(INCLUDE, '(', $.column_name_list, ')')
        ), optional(seq(WHERE, field("where", $.search_condition))), optional($.create_index_option,), optional(seq(ON, $.id_),), optional(';')),
    ),

    create_index_options: $ => (
            seq('WITH', '(', $.relational_index_option, repeat(seq(',', $.relational_index_option),), ')'),
    ),

    relational_index_option: $ => choice(
        $.rebuild_index_option,
        seq(DROP_EXISTING, '=', $.on_off),
        seq(OPTIMIZE_FOR_SEQUENTIAL_KEY, '=', $.on_off),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-index-transact-sql
    alter_index: $ => (
            seq(ALTER, INDEX, choice(seq($.id_, ALL),), ON, $.table_name, choice(
            DISABLE,
            PAUSE,
            ABORT,
        seq(RESUME, optional($.resumable_index_options)),
            $.reorganize_partition,
            $.set_index_options,
            $.rebuild_partitio
        ),),
    ),

    resumable_index_options: $ => (
            seq(WITH, '(', (seq($.resumable_index_option, repeat(seq(',', $.resumable_index_option),))), ')'),
    ),

    resumable_index_option: $ => choice(
            seq(MAXDOP, '=', field("max_degree_of_parallelism", DECIMAL)),
        seq(MAX_DURATION, '=', field("max_duration", DECIMAL), MINUTES?),
        $.low_priority_lock_wai,
    ),

    reorganize_partition: $ => (
            seq(REORGANIZE, optional(seq(PARTITION, '=', DECIMAL),), optional($.reorganize_options)),
    ),

    reorganize_options: $ => (
            seq(WITH, '(', (seq($.reorganize_option, repeat(seq(',', $.reorganize_option),))), ')'),
    ),

    reorganize_option: $ => choice(
            seq(LOB_COMPACTION, '=', $.on_off),
        seq(COMPRESS_ALL_ROW_GROUPS, '=', $.on_off),
    ),

    set_index_options: $ => (
            seq(SET, '(', $.set_index_option, repeat(seq(',', $.set_index_option),), ')'),
    ),

    set_index_option: $ => choice(
            seq(ALLOW_ROW_LOCKS, '=', $.on_off),
        seq(ALLOW_PAGE_LOCKS, '=', $.on_off),
        seq(OPTIMIZE_FOR_SEQUENTIAL_KEY, '=', $.on_off),
        seq(IGNORE_DUP_KEY, '=', $.on_off),
        seq(STATISTICS_NORECOMPUTE, '=', $.on_off),
        seq(COMPRESSION_DELAY, '=', field("delay", DECIMAL), MINUTES?),
    ),

    rebuild_partition: $ => choice(
            seq(REBUILD, optional(seq(PARTITION, '=', ALL),), optional($.rebuild_index_options)),
        seq(REBUILD, PARTITION, '=', DECIMAL, single_partition_optional($.rebuild_index_options)),
    ),

    rebuild_index_options: $ => (
            seq(WITH, '(', $.rebuild_index_option, repeat(seq(',', $.rebuild_index_option),), ')'),
    ),

    rebuild_index_option: $ => choice(
            seq(PAD_INDEX, '=', $.on_off),
        seq(FILLFACTOR, '=', DECIMAL),
        seq(SORT_IN_TEMPDB, '=', $.on_off),
        seq(IGNORE_DUP_KEY, '=', $.on_off),
        seq(STATISTICS_NORECOMPUTE, '=', $.on_off),
        seq(STATISTICS_INCREMENTAL, '=', $.on_off),
        seq(ONLINE, '=', choice(seq(ON, optional(seq('(', $.low_priority_lock_wait, ')'),), OFF),)),
        seq(RESUMABLE, '=', $.on_off),
        seq(MAX_DURATION, '=', field("times", DECIMAL), MINUTES?),
        seq(ALLOW_ROW_LOCKS, '=', $.on_off),
        seq(ALLOW_PAGE_LOCKS, '=', $.on_off),
        seq(MAXDOP, '=', field("max_degree_of_parallelism", DECIMAL)),
        seq(DATA_COMPRESSION, '=', choice(seq(NONE, ROW, PAGE, COLUMNSTORE, COLUMNSTORE_ARCHIVE),), optional($.on_partitions)),
        seq(XML_COMPRESSION, '=', $.on_off, optional($.on_partitions)),
    ),

    single_partition_rebuild_index_options: $ => (
            seq(WITH, '(', $.single_partition_rebuild_index_option, repeat(seq(',', $.single_partition_rebuild_index_option),), ')'),
    ),

    single_partition_rebuild_index_option: $ => choice(
            seq(SORT_IN_TEMPDB, '=', $.on_off),
        seq(MAXDOP, '=', field("max_degree_of_parallelism", DECIMAL)),
        seq(RESUMABLE, '=', $.on_off),
        seq(DATA_COMPRESSION, '=', choice(seq(NONE, ROW, PAGE, COLUMNSTORE, COLUMNSTORE_ARCHIVE),), optional($.on_partitions)),
        seq(XML_COMPRESSION, '=', $.on_off, optional($.on_partitions)),
        seq(ONLINE, '=', choice(seq(ON, optional(seq('(', $.low_priority_lock_wait, ')'),), OFF),)),
    ),

    on_partitions: $ => (
            seq(ON, PARTITIONS, '(', field("partition_number", DECIMAL), ('TO', field("to_partition_number", DECIMAL))?, repeat(
        seq(',', field("partition_number", DECIMAL), optional(seq('TO', field("to_partition_number", DECIMAL))))
        ), ')'),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-columnstore-index-transact-optional($.sql)view=sql-server-ver15
    create_columnstore_index: $ => (
            seq(CREATE, CLUSTERED, COLUMNSTORE, INDEX, $.id_, ON, $.table_name, optional($.create_columnstore_index_options), optional(
        seq(ON, $.id_)
        ), optional(';')),
    ),

    create_columnstore_index_options: $ => (
            seq('WITH', '(', $.columnstore_index_option, repeat(seq(',', $.columnstore_index_option),), ')'),
    ),

    columnstore_index_option: $ => choice(
            seq(DROP_EXISTING, '=', $.on_off),
        seq(MAXDOP, '=', field("max_degree_of_parallelism", DECIMAL)),
        seq(ONLINE, '=', $.on_off),
        seq(COMPRESSION_DELAY, '=', field("delay", DECIMAL), MINUTES?),
        seq(DATA_COMPRESSION, '=', choice(seq(COLUMNSTORE, COLUMNSTORE_ARCHIVE),), optional($.on_partitions)),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-columnstore-index-transact-optional($.sql)view=sql-server-ver15
    create_nonclustered_columnstore_index: $ => (
            seq(CREATE, NONCLUSTERED?, COLUMNSTORE, INDEX, $.id_, ON, $.table_name, '(', $.column_name_list_with_order, ')', optional(
        seq(WHERE, $.search_condition)
        ), optional($.create_columnstore_index_options), optional(seq(ON, $.id_),), optional(';')),
    ),

    create_xml_index: $ => (
            seq(CREATE, PRIMARY?, XML, INDEX, $.id_, ON, $.table_name, '(', $.id_, ')', optional(
        seq(USING, XML, INDEX, $.id_, optional(seq(FOR, optional(choice(seq(VALUE, PATH, PROPERTY),)))))
        ), optional($.xml_index_options), optional(';')),
    ),

    xml_index_options: $ => (
            seq('WITH', '(', $.xml_index_option, repeat(seq(',', $.xml_index_option),), ')'),
    ),

    xml_index_option: $ => choice(
            seq(PAD_INDEX, '=', $.on_off),
        seq(FILLFACTOR, '=', DECIMAL),
        seq(SORT_IN_TEMPDB, '=', $.on_off),
        seq(IGNORE_DUP_KEY, '=', $.on_off),
        seq(DROP_EXISTING, '=', $.on_off),
        seq(ONLINE, '=', choice(seq(ON, optional(seq('(', $.low_priority_lock_wait, ')'),), OFF),)),
        seq(ALLOW_ROW_LOCKS, '=', $.on_off),
        seq(ALLOW_PAGE_LOCKS, '=', $.on_off),
        seq(MAXDOP, '=', field("max_degree_of_parallelism", DECIMAL)),
        seq(XML_COMPRESSION, '=', $.on_off),
    ),

    // https://msdn.microsoft.com/en-us/library/ms187926(v=sql.120).aspx
    create_or_alter_procedure: $ => (
            seq(choice(seq((seq(CREATE, optional(seq(OR, ALTER),))), ALTER),), $.proc, =, choice(seq(PROC, PROCEDURE),), field("$.procName", $.func_$.proc_name_schema), optional(
        seq(';', DECIMAL)
        ), optional(seq(optional('('), $.procedure_param, repeat(seq(',', $.procedure_param),), optional(')'))), optional(
        seq(WITH, $.procedure_option, repeat(seq(',', $.procedure_option),))
        ), optional(seq(FOR, REPLICATION),), AS, choice(seq($.as_external_name, repeat($.sql_clauses)))),
    ),

    as_external_name: $ => (
            seq(EXTERNAL, NAME, field("assembly_name", $.id_), '.', field("class_name", $.id_), '.', field("method_name", $.id_)),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/create-trigger-transact-sql
    create_or_alter_trigger: $ => choice(
        $.create_or_alter_dml_trigger,
        $.create_or_alter_ddl_trigge,
    ),

    create_or_alter_dml_trigger: $ => (
            seq(choice(seq(CREATE, optional(seq(OR, ALTER),), ALTER),), TRIGGER, $.simple_name, ON, $.table_name, optional(
        seq(WITH, $.dml_trigger_option, repeat(seq(',', $.dml_trigger_option),))
        ), choice(seq(FOR, AFTER, INSTEAD, OF),), $.dml_trigger_operation, repeat(seq(',', $.dml_trigger_operation),), optional(seq(WITH, APPEND),), optional(
        seq(NOT, FOR, REPLICATION)
        ), AS, repeat1($.sql_clauses)),
    ),

    dml_trigger_option: $ => choice(
        ENCRYPTION,
        $.execute_claus,
    ),

    dml_trigger_operation: $ => (
        ########,
    ),

    create_or_alter_ddl_trigger: $ => (
            seq(choice(seq(CREATE, optional(seq(OR, ALTER),), ALTER),), TRIGGER, $.simple_name, ON, choice(seq(ALL, SERVER, DATABASE),), optional(
        seq(WITH, $.dml_trigger_option, repeat(seq(',', $.dml_trigger_option),))
        ), choice(seq(FOR, AFTER),), $.ddl_trigger_operation, repeat(seq(',', $.ddl_trigger_operation),), AS, repeat1($.sql_clauses)),
    ),

    ddl_trigger_operation: $ => (
        $.simple_i,
    ),

    // https://msdn.microsoft.com/en-us/library/ms186755.aspx
    create_or_alter_function: $ => (
            seq(choice(seq((seq(CREATE, optional(seq(OR, ALTER),))), ALTER),), FUNCTION, field("funcName", $.func_proc_name_schema), choice(
            (seq('(', $.procedure_param, repeat(seq(',', $.procedure_param),), ')'),),
        seq('(', ')')
        ), $.but, $.can, $.be, $.empty),
        seq(choice(seq($.func_body_returns_select, $.func_body_returns_table, $.func_body_returns_scalar),), optional(';')),
    ),

    func_body_returns_select: $ => (
            seq(RETURNS, TABLE, optional(seq(WITH, $.function_option, repeat(seq(',', $.function_option),))), AS?, choice(
            $.as_external_name,
        seq(RETURN, choice(seq('(', $.select_statement_standalone, ')', $.select_statement_standalone),))
        ),),
    ),

    func_body_returns_table: $ => (
            seq(RETURNS, LOCAL_ID, $.table_type_definition, optional(seq(WITH, $.function_option, repeat(seq(',', $.function_option),))), AS?, choice(
            $.as_external_name,
        seq(BEGIN, repeat($.sql_clauses), RETURN, optional(';'), END, optional(';'))
        ),),
    ),

    func_body_returns_scalar: $ => (
            seq(RETURNS, $.data_type, optional(seq(WITH, $.function_option, repeat(seq(',', $.function_option),))), AS?, choice(
            $.as_external_name,
        seq(BEGIN, repeat($.sql_clauses), RETURN, field("ret", $.expression), optional(';'), END)
        ),),
    ),

    procedure_param_default_value: $ => choice(
        NULL$._,
        DEFAULT,
        $.constant,
        LOCAL_I,
    ),

    procedure_param: $ => (
            seq(LOCAL_ID, AS?, optional(seq(field("type_schema", $.id_), '.'),), $.data_type, VARYING?, optional(
        seq('=', field("default_val", $.procedure_param_default_value))
        ), optional(choice(seq(OUT, OUTPUT, READONLY),))),
    ),

    procedure_option: $ => choice(
        ENCRYPTION,
        RECOMPILE,
        $.execute_claus,
    ),

    function_option: $ => choice(
        ENCRYPTION,
        SCHEMABINDING,
        seq(RETURNS, NULL$._, ON, NULL$._, INPUT),
        seq(CALLED, ON, NULL$._, INPUT),
        $.execute_claus,
    ),

    // https://msdn.microsoft.com/en-us/library/ms188038.aspx
    create_statistics: $ => (
            seq(CREATE, STATISTICS, $.id_, ON, $.table_name, '(', $.column_name_list, ')', optional(choice(
        seq(WITH, (FULLSCAN, SAMPLE, DECIMAL, (PERCENT, ROWS), STATS_STREAM), (',', NORECOMPUTE)?, optional(
        seq(',', INCREMENTAL, EQUAL, $.on_off)
            ),)
        ),), optional(';')),
    ),

    update_statistics: $ => (
            seq(UPDATE, STATISTICS, $.full_table_name, optional(choice(seq($.id_, '(', $.id_, repeat(seq(',', $.id_),), ')'),)), optional($.update_statistics_options)),
    ),

    update_statistics_options: $ => (
            seq(WITH, $.update_statistics_option, repeat(seq(',', $.update_statistics_option),)),
    ),

    update_statistics_option: $ => choice(
        (seq(FULLSCAN, optional(seq(optional(','), PERSIST_SAMPLE_PERCENT, '=', $.on_off),))),
        choice(seq(SAMPLE, field("number", DECIMAL), (PERCENT, ROWS), optional(seq(optional(','), PERSIST_SAMPLE_PERCENT, '=', $.on_off),))),
        seq(RESAMPLE, optional($.on_partitions)),
        seq(STATS_STREAM, '=', field("stats_stream_", $.expression)),
        seq(ROWCOUNT, '=', DECIMAL),
        seq(PAGECOUNT, '=', DECIMAL),
        ALL,
        COLUMNS,
        INDEX,
        NORECOMPUTE,
        seq(INCREMENTAL, '=', $.on_off),
        seq(MAXDOP, '=', field("max_dregree_of_parallelism", DECIMAL)),
        seq(AUTO_DROP, '=', $.on_off),
    ),

    // https://msdn.microsoft.com/en-us/library/ms174979.aspx
    create_table: $ => (
            seq(CREATE, TABLE, $.table_name, '(', $.column_def_table_constraints, repeat(seq(optional(','), $.table_indices),), optional(','), ')', optional(
        seq(LOCK, $.simple_id)
        ), repeat($.table_options), optional(choice(seq(ON, $.id_, DEFAULT, $.on_partition_or_filegroup),)), optional(choice(seq(TEXTIMAGE_ON, $.id_, DEFAULT),)), optional(';')),
    ),

    table_indices: $ => choice(
            seq(INDEX, $.id_, UNIQUE?, optional($.clustered), '(', $.column_name_list_with_order, ')'),
        seq(INDEX, $.id_, CLUSTERED, COLUMNSTORE),
        seq(INDEX, $.id_, NONCLUSTERED?, COLUMNSTORE, '(', $.column_name_list, ')', optional($.create_table_index_options), optional(
        seq(ON, $.id_)
        ),),
    ),

    table_options: $ => (
            seq(WITH, choice(seq('(', $.table_option, repeat(seq(',', $.table_option),), ')', $.table_option, repeat(seq(',', $.table_option),)))),
    ),

    table_option: $ => choice(
            seq(choice(seq($.simple_id, $.keyword),), '=', choice(seq($.simple_id, $.keyword, $.on_off, DECIMAL),)),
        seq(CLUSTERED, COLUMNSTORE, INDEX),
        HEAP,
        seq(FILLFACTOR, '=', DECIMAL),
        seq(DISTRIBUTION, '=', HASH, '(', $.id_, ')'),
        seq(CLUSTERED, INDEX, '(', $.id_, (ASC, |, DESC)?, repeat(seq(',', $.id_, (#######,))), ')'),
        seq(DATA_COMPRESSION, '=', choice(seq(NONE, ROW, PAGE),), optional($.on_partitions)),
        seq(XML_COMPRESSION, '=', $.on_off, optional($.on_partitions)),
    ),

    create_table_index_options: $ => (
            seq(WITH, '(', $.create_table_index_option, repeat(seq(',', $.create_table_index_option),), ')'),
    ),

    create_table_index_option: $ => choice(
            seq(PAD_INDEX, '=', $.on_off),
        seq(FILLFACTOR, '=', DECIMAL),
        seq(IGNORE_DUP_KEY, '=', $.on_off),
        seq(STATISTICS_NORECOMPUTE, '=', $.on_off),
        seq(STATISTICS_INCREMENTAL, '=', $.on_off),
        seq(ALLOW_ROW_LOCKS, '=', $.on_off),
        seq(ALLOW_PAGE_LOCKS, '=', $.on_off),
        seq(OPTIMIZE_FOR_SEQUENTIAL_KEY, '=', $.on_off),
        seq(DATA_COMPRESSION, '=', choice(seq(NONE, ROW, PAGE, COLUMNSTORE, COLUMNSTORE_ARCHIVE),), optional($.on_partitions)),
        seq(XML_COMPRESSION, '=', $.on_off, optional($.on_partitions)),
    ),

    // https://msdn.microsoft.com/en-us/library/ms187956.aspx
    create_view: $ => (
            seq(choice(seq(CREATE, optional(seq(OR, ALTER),), ALTER),), VIEW, $.simple_name, optional(seq('(', $.column_name_list, ')'),), optional(
        seq(WITH, $.view_attribute, repeat(seq(',', $.view_attribute),))
        ), AS, $.select_statement_standalone, optional(seq(WITH, CHECK, OPTION),), optional(';')),
    ),

    view_attribute: $ => choice(
        ENCRYPTION,
        SCHEMABINDING,
        VIEW_METADAT,
    ),

    // https://msdn.microsoft.com/en-us/library/ms190273.aspx
    alter_table: $ => (
            seq(ALTER, TABLE, $.table_name, choice(
        seq(SET, '(', LOCK_ESCALATION, '=', (AUTO, TABLE, DISABLE), ')'),
        seq(ADD, $.column_def_table_constraints),
        seq(ALTER, COLUMN, ($.column_definition, column_modifier)),
        seq(DROP, COLUMN, $.id_, (',', $.id_)*),
        seq(DROP, CONSTRAINT, field("constraint", $.id_)),
        seq(WITH, (CHECK, NOCHECK), ADD, (CONSTRAINT, field("constraint", $.id_))?, (),
        seq(FOREIGN, KEY, '(', field("fk", $.column_name_list), ')', REFERENCES, $.table_name, (),
        seq('(', field("pk", $.column_name_list), ')'),
        seq()?, ($.on_delete, on_update)*),
        seq(CHECK, '(', $.search_condition, ')')
            ),
        seq((NOCHECK, CHECK), CONSTRAINT, field("constraint", $.id_)),
        seq(choice(seq(ENABLE, DISABLE),), TRIGGER, optional($.id_)),
        seq(REBUILD, $.table_options),
        seq(SWITCH, $.switch_partition)
        ), optional(';')),
    ),

    switch_partition: $ => (
            seq(optional(seq(PARTITION?, field("source_partition_number_expression", $.expression))), TO, field("target_table", $.table_name), optional(
        seq(PARTITION, field("target_partition_number_expression", $.expression))
        ), optional(seq(WITH, $.low_priority_lock_wait),)),
    ),

    low_priority_lock_wait: $ => (
            seq(WAIT_AT_LOW_PRIORITY, '(', MAX_DURATION, '=', field("max_duration", $.time), MINUTES?, ',', ABORT_AFTER_WAIT, '=', $.abort_after_wait, =, choice(
            NONE,
            SELF,
            BLOCKER
        ), ')'),
    ),

    // https://msdn.microsoft.com/en-us/library/ms174269.aspx
    alter_database: $ => (
            seq(ALTER, DATABASE, choice(seq(field("database", $.id_), CURRENT),), choice(
        seq(MODIFY, NAME, '=', field("new_name", $.id_)),
        seq(COLLATE, field("collation", $.id_)),
        seq(SET, $.database_optionspec, optional(seq(WITH, $.termination),)),
            $.add_or_modify_files,
            $.add_or_modify_filegroup
        ), optional(';')),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-database-transact-sql-file-and-filegroup-optional($.options)view=sql-server-ver15
    add_or_modify_files: $ => choice(
            seq(ADD, FILE, $.filespec, repeat(seq(',', $.filespec),), optional(seq(TO, FILEGROUP, field("filegroup_name", $.id_)))),
        seq(ADD, LOG, FILE, $.filespec, repeat(seq(',', $.filespec),)),
        seq(REMOVE, FILE, field("logical_file_name", $.id_)),
        seq(MODIFY, FILE, $.filespec),
    ),

    filespec: $ => (
            seq('(', NAME, '=', field("name", $.id_or_string), optional(seq(',', NEWNAME, '=', field("new_name", $.id_or_string))), optional(
        seq(',', FILENAME, '=', field("file_name", STRING))
        ), optional(seq(',', SIZE, '=', field("size", $.file_size))), optional(choice(seq(',', MAXSIZE, '=', (seq(field("max_size", $.file_size)),), UNLIMITED),)), optional(
        seq(',', FILEGROWTH, '=', field("growth_increment", $.file_size))
        ), optional(seq(',', OFFLINE),), ')'),
    ),

    add_or_modify_filegroups: $ => choice(
            seq(ADD, FILEGROUP, field("filegroup_name", $.id_), optional(choice(seq(CONTAINS, FILESTREAM, CONTAINS, MEMORY_OPTIMIZED_DATA),))),
        seq(REMOVE, FILEGROUP, field("filegrou_name", $.id_)),
        seq(MODIFY, FILEGROUP, field("filegrou_name", $.id_), choice(
            $.filegroup_updatability_option,
            DEFAULT,
        seq(NAME, '=', field("new_filegroup_name", $.id_)),
            AUTOGROW_SINGLE_FILE,
            AUTOGROW_ALL_FILE
        ),),
    ),

    filegroup_updatability_option: $ => choice(
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
        seq(//, |, $.query_store_options),
        $.recovery_optio,
        seq(//, |, $.remote_data_archive_option),
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

    change_tracking_option: $ => (
            seq(CHANGE_TRACKING, EQUAL, choice(
            OFF,
        seq(ON, '(', repeat(seq($.change_tracking_option_list, repeat(seq(',', $.change_tracking_option_list),))), ')')
        ),),
    ),

    change_tracking_option_list: $ => choice(
            seq(AUTO_CLEANUP, EQUAL, $.on_off),
        seq(CHANGE_RETENTION, EQUAL, DECIMAL, choice(seq(DAYS, HOURS, MINUTES),)),
    ),

    containment_option: $ => (
            seq(CONTAINMENT, EQUAL, choice(seq(NONE, PARTIAL),)),
    ),

    cursor_option: $ => choice(
            seq(CURSOR_CLOSE_ON_COMMIT, $.on_off),
        seq(CURSOR_DEFAULT, choice(seq(LOCAL, GLOBAL),)),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-endpoint-transact-sql
    alter_endpoint: $ => (
            seq(ALTER, ENDPOINT, field("endpointname", $.id_), optional(seq(AUTHORIZATION, field("login", $.id_))), optional(
        seq(STATE, EQUAL, $.state, =, choice(seq(STARTED, STOPPED, DISABLED),))
        ), AS, TCP, LR_BRACKET, $.endpoint_listener_clause, RR_BRACKET, choice(
        seq(FOR, TSQL, LR_BRACKET, RR_BRACKET),
        seq(FOR, SERVICE_BROKER, LR_BRACKET, $.endpoint_authentication_clause, (),
        seq(optional(COMMA), $.endpoint_encryption_alogorithm_clause),
        seq()?, (optional(COMMA), MESSAGE_FORWARDING, EQUAL, (ENABLED, DISABLED))?, (),
        seq(optional(COMMA), MESSAGE_FORWARD_SIZE, EQUAL, DECIMAL),
        seq()?, RR_BRACKET),
        seq(FOR, DATABASE_MIRRORING, LR_BRACKET, $.endpoint_authentication_clause, (),
        seq(optional(COMMA), $.endpoint_encryption_alogorithm_clause),
        seq()?, optional(COMMA), ROLE, EQUAL, choice(seq(WITNESS, PARTNER, ALL),), RR_BRACKET)
        ),),
    ),

    /* Will visit later
    */
    database_mirroring_option: $ => (
        $.mirroring_set_optio,
    ),

    mirroring_set_option: $ => choice(
            seq($.mirroring_partner, $.partner_option),
        seq($.mirroring_witness, $.witness_option),
    ),

    mirroring_partner: $ => (
        PARTNE,
    ),

    mirroring_witness: $ => (
        WITNES,
    ),

    witness_partner_equal: $ => (
        EQUA,
    ),

    partner_option: $ => choice(
            seq($.witness_partner_equal, $.partner_server),
        FAILOVER,
        FORCE_SERVICE_ALLOW_DATA_LOSS,
        OFF,
        RESUME,
        seq(SAFETY, choice(seq(FULL, OFF),)),
        SUSPEND,
        seq(TIMEOUT, DECIMAL),
    ),

    witness_option: $ => choice(
            seq($.witness_partner_equal, $.witness_server),
        OF,
    ),

    witness_server: $ => (
        $.partner_serve,
    ),

    partner_server: $ => (
            seq($.partner_server_tcp_prefix, $.host, mirroring_$.host_port_seperator, $.port_number),
    ),

    mirroring_host_port_seperator: $ => (
        COLO,
    ),

    partner_server_tcp_prefix: $ => (
            seq(TCP, COLON, DOUBLE_FORWARD_SLASH),
    ),

    port_number: $ => (
            seq(field("port", DECIMAL)),
    ),

    host: $ => choice(
            seq($.id_, DOT, $.host),
        ########,
    ),

    date_correlation_optimization_option: $ => (
            seq(DATE_CORRELATION_OPTIMIZATION, $.on_off),
    ),

    db_encryption_option: $ => (
            seq(ENCRYPTION, $.on_off),
    ),

    db_state_option: $ => (
        ########,
    ),

    db_update_option: $ => choice(
        READ_ONLY,
        READ_WRIT,
    ),

    db_user_access_option: $ => choice(
        SINGLE_USER,
        RESTRICTED_USER,
        MULTI_USE,
    ),

    delayed_durability_option: $ => (
            seq(DELAYED_DURABILITY, EQUAL, choice(seq(DISABLED, ALLOWED, FORCED),)),
    ),

    external_access_option: $ => choice(
            seq(DB_CHAINING, $.on_off),
        seq(TRUSTWORTHY, $.on_off),
        seq(DEFAULT_LANGUAGE, EQUAL, choice(seq($.id_, STRING),)),
        seq(DEFAULT_FULLTEXT_LANGUAGE, EQUAL, choice(seq($.id_, STRING),)),
        seq(NESTED_TRIGGERS, EQUAL, (#######,)),
        seq(TRANSFORM_NOISE_WORDS, EQUAL, (#######,)),
        seq(TWO_DIGIT_YEAR_CUTOFF, EQUAL, DECIMAL),
    ),

    hadr_options: $ => (
            seq(HADR, choice(seq((, AVAILABILITY, GROUP, EQUAL, field("availability_group_name", $.id_), OFF), choice(seq(SUSPEND, RESUME),)))),
    ),

    mixed_page_allocation_option: $ => (
            seq(MIXED_PAGE_ALLOCATION, choice(seq(OFF, ON),)),
    ),

    parameterization_option: $ => (
            seq(PARAMETERIZATION, choice(seq(SIMPLE, FORCED),)),
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
        seq(MEMORY_OPTIMIZED_ELEVATE_TO_SNAPSHOT, =, choice(seq(ON, OFF),)),
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

    target_recovery_time_option: $ => (
            seq(TARGET_RECOVERY_TIME, EQUAL, DECIMAL, choice(seq(SECONDS, MINUTES),)),
    ),

    termination: $ => choice(
            seq(ROLLBACK, AFTER, field("seconds", DECIMAL)),
        seq(ROLLBACK, IMMEDIATE),
        NO_WAI,
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

    create_type: $ => (
            seq(CREATE, TYPE, field("name", $.simple_name), optional(seq(FROM, $.data_type, optional($.null_notnull))), optional(
        seq(AS, TABLE, LR_BRACKET, $.column_def_table_constraints, RR_BRACKET)
        ),),
    ),

    drop_type: $ => (
            seq(DROP, TYPE, optional(seq(IF, EXISTS),), field("name", $.simple_name)),
    ),

    rowset_function_limited: $ => choice(
        $.openquery,
        $.opendatasourc,
    ),

    // https://msdn.microsoft.com/en-us/library/ms188427(v=sql.120).aspx
    openquery: $ => (
            seq(OPENQUERY, '(', field("linked_server", $.id_), ',', field("query", STRING), ')'),
    ),

    // https://msdn.microsoft.com/en-us/library/ms179856.aspx
    opendatasource: $ => (
            seq(OPENDATASOURCE, '(', field("provider", STRING), ',', field("init", STRING), ')', '.', optional(seq(field("database", $.id_))), '.', optional(
        seq(field("scheme", $.id_))
        ), '.', (seq(field("table", $.id_)))),
    ),

    // Other statements.

    // https://msdn.microsoft.com/en-us/library/ms188927.aspx
    declare_statement: $ => choice(
            seq(DECLARE, LOCAL_ID, AS?, choice(seq($.data_type, $.table_type_definition, $.table_name),)),
        seq(DECLARE, $.loc, +=, declare_$.local, repeat(seq(',', $.loc, +=, declare_$.local),)),
        seq(DECLARE, LOCAL_ID, AS?, $.xml_type_definition),
        seq(WITH, XMLNAMESPACES, '(', $.xml_dec, +=, $.$.xml_declaration, repeat(seq(',', $.xml_dec, +=, $.$.xml_declaration),), ')'),
    ),

    xml_declaration: $ => choice(
            seq(field("xml_namespace_uri", STRING), AS, $.id_),
        seq(DEFAULT, STRING),
    ),

    // https://msdn.microsoft.com/en-us/library/ms181441(v=sql.120).aspx
    cursor_statement
        // https://msdn.microsoft.com/en-us/library/ms175035(v=sql.120).aspx: $ => (
            seq(CLOSE, GLOBAL?, $.cursor_name, optional(';')),
        seq(//, https://msdn.microsoft.com/en-us/library/ms188782(#######,).$.aspx),
        seq(DEALLOCATE, GLOBAL?, CURSOR?, $.cursor_name, optional(';')),
        seq(//, https://msdn.microsoft.com/en-us/library/ms180169(#######,).$.aspx),
        $.declare_curso,
        seq(//, https://msdn.microsoft.com/en-us/library/ms180152(#######,).$.aspx),
        $.fetch_curso,
        seq(//, https://msdn.microsoft.com/en-us/library/ms190500(#######,).$.aspx),
        seq(OPEN, GLOBAL?, $.cursor_name, optional(';')),
    ),

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

    kill_statement: $ => (
            seq(KILL, choice(seq($.kill_process, $.kill_query_notification, $.kill_stats_job),)),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/kill-transact-sql
    kill_process: $ => (
            seq(choice(seq($.session_id, =, choice(seq(DECIMAL, STRING),), UOW),), optional(seq(WITH, STATUSONLY),)),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/kill-query-notification-subscription-transact-sql
    kill_query_notification: $ => (
            seq(QUERY, NOTIFICATION, SUBSCRIPTION, choice(seq(ALL, field("subscription_id", DECIMAL)))),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/kill-stats-job-transact-sql
    kill_stats_job: $ => (
            seq(STATS, JOB, field("job_id", DECIMAL)),
    ),

    // https://msdn.microsoft.com/en-us/library/ms188332.aspx
    execute_statement: $ => (
            seq(EXECUTE, $.execute_body, optional(';')),
    ),

    execute_body_batch: $ => (
            seq($.func_proc_name_server_database_schema, optional(seq($.execute_statement_arg, repeat(seq(',', $.execute_statement_arg),))), optional(';')),
    ),

    //https://docs.microsoft.com/it-it/sql/t-sql/language-elements/execute-transact-optional($.sql)view=sql-server-ver15
    execute_body: $ => choice(
            seq(optional(seq(field("return_status", LOCAL_ID), '='),), choice(seq($.func_proc_name_server_database_schema, $.execute_var_string),), optional($.execute_statement_arg)),
        seq('(', $.execute_var_string, repeat(seq(',', $.execute_var_string),), ')', optional(seq(AS, choice(seq(LOGIN, USER),), '=', STRING),), optional(
        seq(AT_KEYWORD, field("linkedServer", $.id_))
        ),),
        seq(AS, choice(seq(choice(seq(LOGIN, USER),), '=', STRING, CALLER),)),
    ),

    execute_statement_arg: $ => choice(
            seq($.execute_statement_arg_unnamed, repeat(seq(',', $.execute_statement_arg),), ),
        seq($.execute_statement_arg_n$.amed, repeat(seq(',', $.execute_statement_arg_named),), //N$.amed, $.can, $.only, $.be, $.continued, $.by, $.unn$.amed),
    ),

    execute_statement_arg_named: $ => (
            seq(field("name", LOCAL_ID), '=', field("value", $.execute_parameter)),
    ),

    execute_statement_arg_unnamed: $ => (
            seq(field("value", $.execute_parameter)),
    ),

    execute_parameter: $ => (
        ########,
    ),

    execute_var_string: $ => choice(
            seq(LOCAL_ID, optional(choice(seq(OUTPUT, OUT),)), optional(seq('+', LOCAL_ID, optional(seq('+', $.execute_var_string),)))),
        seq(STRING, optional(seq('+', LOCAL_ID, optional(seq('+', $.execute_var_string),)))),
    ),

    // https://msdn.microsoft.com/en-us/library/ff848791.aspx
    security_statement
        // https://msdn.microsoft.com/en-us/library/ms188354.aspx: $ => (
            seq($.execute_clause, optional(';')),
       ,
        seq(GRANT, choice(seq(ALL, PRIVILEGES?, $.grant_permission, optional(seq('(', $.column_name_list, ')'),))), optional(
        seq(ON, optional(seq($.class_type_for_grant, '::'),), field("on_id", $.table_name))
        ), TO, $.to_principal, +=, $.principal_id, repeat(seq(',', $.to_principal, +=, $.principal_id),), optional(seq(WITH, GRANT, OPTION),), optional(
        seq(AS, field("as_principal", $.principal_id))
        ), optional(';')),
       ,
        seq(REVERT, optional(seq(WITH, COOKIE, '=', LOCAL_ID),), optional(';')),
        $.open_key,
        $.close_key,
        $.create_key,
        $.create_certificat,
    ),

    principal_id: $ => choice(
        $.id_,
        PUBLI,
    ),

    create_certificate: $ => (
            seq(CREATE, CERTIFICATE, field("certificate_name", $.id_), optional(seq(AUTHORIZATION, field("user_name", $.id_))), choice(
        seq(FROM, $.existing_keys),
            $.generate_new_key
        ), optional(seq(ACTIVE, FOR, BEGIN, DIALOG, '=', $.on_off),)),
    ),

    existing_keys: $ => choice(
            seq(ASSEMBLY, field("assembly_name", $.id_)),
        seq(EXECUTABLE?, FILE, EQUAL, field("path_to_file", STRING), optional(seq(WITH, PRIVATE, KEY, '(', $.private_key_options, ')'),)),
    ),

    private_key_options: $ => (
            seq(choice(seq(FILE, BINARY),), '=', field("path", STRING), optional(
        seq(',', choice(seq(DECRYPTION, ENCRYPTION),), BY, PASSWORD, '=', field("password", STRING))
        ),),
    ),

    generate_new_keys: $ => (
            seq(optional(seq(ENCRYPTION, BY, PASSWORD, '=', field("password", STRING))), WITH, SUBJECT, EQUAL, field("certificate_subject_name", STRING), repeat(
        seq(',', $.date_options)
        ),),
    ),

    date_options: $ => (
            seq(choice(seq(START_DATE, EXPIRY_DATE),), EQUAL, STRING),
    ),

    open_key: $ => choice(
            seq(OPEN, SYMMETRIC, KEY, field("key_name", $.id_), DECRYPTION, BY, $.decryption_mechanism),
        seq(OPEN, MASTER, KEY, DECRYPTION, BY, PASSWORD, '=', field("password", STRING)),
    ),

    close_key: $ => choice(
            seq(CLOSE, SYMMETRIC, KEY, field("key_name", $.id_)),
        seq(CLOSE, ALL, SYMMETRIC, KEYS),
        seq(CLOSE, MASTER, KEY),
    ),

    create_key: $ => choice(
            seq(CREATE, MASTER, KEY, ENCRYPTION, BY, PASSWORD, '=', field("password", STRING)),
        seq(CREATE, SYMMETRIC, KEY, field("key_name", $.id_), optional(seq(AUTHORIZATION, field("user_name", $.id_))), optional(
        seq(FROM, PROVIDER, field("provider_name", $.id_))
        ), WITH, repeat1(seq(choice(seq($.key_options, ENCRYPTION, BY, $.encryption_mechanism),), optional(',')))),
    ),

    key_options: $ => choice(
            seq(KEY_SOURCE, EQUAL, field("pass_phrase", STRING)),
        seq(ALGORITHM, EQUAL, $.algorithm),
        seq(IDENTITY_VALUE, EQUAL, field("identity_phrase", STRING)),
        seq(PROVIDER_KEY_NAME, EQUAL, field("key_name_in_provider", STRING)),
        seq(CREATION_DISPOSITION, EQUAL, choice(seq(CREATE_NEW, OPEN_EXISTING),)),
    ),

    algorithm: $ => choice(
        DES,
        TRIPLE_DES,
        TRIPLE_DES_3KEY,
        RC2,
        RC4,
        RC4_128,
        DESX,
        AES_128,
        AES_192,
        AES_25,
    ),

    encryption_mechanism: $ => choice(
            seq(CERTIFICATE, field("certificate_name", $.id_)),
        seq(ASYMMETRIC, KEY, field("asym_key_name", $.id_)),
        seq(SYMMETRIC, KEY, field("decrypting_Key_name", $.id_)),
        seq(PASSWORD, '=', STRING),
    ),

    decryption_mechanism: $ => choice(
            seq(CERTIFICATE, field("certificate_name", $.id_), optional(seq(WITH, PASSWORD, EQUAL, STRING),)),
        seq(ASYMMETRIC, KEY, field("asym_key_name", $.id_), optional(seq(WITH, PASSWORD, EQUAL, STRING),)),
        seq(SYMMETRIC, KEY, field("decrypting_Key_name", $.id_)),
        seq(PASSWORD, EQUAL, STRING),
    ),

    // https://docs.microsoft.com/en-us/sql/relational-databases/system-functions/sys-fn-builtin-permissions-transact-optional($.sql)view=sql-server-ver15
    // SELECT DISTINCT '| ' + permission_name
    // FROM sys.fn_builtin_permissions (DEFAULT)
    // ORDER BY 1
    grant_permission: $ => choice(
            seq(ADMINISTER, optional(seq(ALL, USER, SECURABLES),)2),
        seq(ALTER, optional(choice(
        seq(ANY, choice(
        seq(APPLICATION, ROLE),
                ASSEMBLY,
        seq(ASYMMETRIC, KEY),
        seq(AVAILABILITY, GROUP),
                CERTIFICATE,
        seq(COLUMN, (, ENCRYPTION, KEY, MASTER, KEY)),
                CONNECTION,
                CONTRACT,
                CREDENTIAL,
        seq(DATABASE, (),
                    AUDIT,
        seq(DDL, TRIGGER),
        seq(EVENT, (, NOTIFICATION, SESSION)),
        seq(SCOPED, CONFIGURATION)
                ),?,
                DATASPACE,
                ENDPOINT,
        seq(EVENT, (, NOTIFICATION, SESSION)),
        seq(EXTERNAL, (, DATA, SOURCE, FILE, FORMAT, LIBRARY)),
        seq(FULLTEXT, CATALOG),
        seq(LINKED, SERVER),
                LOGIN,
                MASK,
        seq(MESSAGE, TYPE),
        seq(REMOTE, SERVICE, BINDING),
                ROLE,
                ROUTE,
                SCHEMA,
        seq(SECURITY, POLICY),
        seq(SERVER, choice(seq(AUDIT, ROLE),)),
                SERVICE,
        seq(SYMMETRIC, KEY),
                USE
            ),),
            RESOURCES,
        seq(SERVER, STATE),
            SETTINGS,
            TRAC
        ),)),
        seq(AUTHENTICATE, SERVER?),
        seq(BACKUP, choice(seq(DATABASE, LOG),)),
        CHECKPOINT,
        seq(CONNECT, optional(choice(seq(ANY, DATABASE, REPLICATION, SQL),))),
        seq(CONTROL, SERVER?),
        seq(CREATE, choice(
            AGGREGATE,
        seq(ANY, DATABASE),
            ASSEMBLY,
        seq(ASYMMETRIC, KEY),
        seq(AVAILABILITY, GROUP),
            CERTIFICATE,
            CONTRACT,
        seq(DATABASE, optional(seq(DDL, EVENT, NOTIFICATION),)),
        seq(DDL, EVENT, NOTIFICATION),
            DEFAULT,
            ENDPOINT,
        seq(EXTERNAL, LIBRARY),
        seq(FULLTEXT, CATALOG),
            FUNCTION,
        seq(MESSAGE, TYPE),
            PROCEDURE,
            QUEUE,
        seq(REMOTE, SERVICE, BINDING),
            ROLE,
            ROUTE,
            RULE,
            SCHEMA,
            SEQUENCE,
        seq(SERVER, ROLE),
            SERVICE,
        seq(SYMMETRIC, KEY),
            SYNONYM,
            TABLE,
        seq(TRACE, EVENT, NOTIFICATION),
            TYPE,
            VIEW,
        seq(XML, SCHEMA, COLLECTION)
        ),),
        DELETE,
        seq(EXECUTE, optional(seq(ANY, EXTERNAL, SCRIPT),)),
        seq(EXTERNAL, ACCESS, ASSEMBLY),
        seq(IMPERSONATE, optional(seq(ANY, LOGIN),)),
        INSERT,
        seq(KILL, DATABASE, CONNECTION),
        RECEIVE,
        REFERENCES,
        seq(SELECT, optional(seq(ALL, USER, SECURABLES),)),
        SEND,
        SHOWPLAN,
        SHUTDOWN,
        seq(SUBSCRIBE, QUERY, NOTIFICATIONS),
        seq(TAKE, OWNERSHIP),
        UNMASK,
        seq(UNSAFE, ASSEMBLY),
        UPDATE,
        seq(VIEW, choice(
        seq(ANY, choice(seq(DATABASE, DEFINITION, COLUMN, choice(seq(ENCRYPTION, MASTER),), KEY, DEFINITION),)),
        seq(CHANGE, TRACKING),
        seq(DATABASE, STATE),
            DEFINITION,
        seq(SERVER, STATE)
        ),),
    ),

    // https://msdn.microsoft.com/en-us/library/ms190356.aspx
    // https://msdn.microsoft.com/en-us/library/ms189484.aspx
    set_statement: $ => choice(
            seq(SET, LOCAL_ID, optional(seq('.', field("member_name", $.id_))), '=', $.expression),
        seq(SET, LOCAL_ID, $.assignment_operator, $.expression),
        seq(SET, LOCAL_ID, '=', CURSOR, $.declare_set_cursor_common, optional(
        seq(FOR, choice(seq(READ, ONLY, UPDATE, optional(seq(OF, $.column_name_list),))))
        ),),
       ,
        $.set_specia,
    ),

    // https://msdn.microsoft.com/en-us/library/ms174377.aspx
    transaction_statement
        // https://msdn.microsoft.com/en-us/library/ms188386.aspx: $ => (
            seq(BEGIN, DISTRIBUTED, choice(seq(TRAN, TRANSACTION),), optional(choice(seq($.id_, LOCAL_ID),))),
       ,
        seq(BEGIN, choice(seq(TRAN, TRANSACTION),), (choice(seq($.id_, LOCAL_ID),), (WITH, MARK, STRING)?)?),
       ,
        seq(COMMIT, choice(seq(TRAN, TRANSACTION),), optional(choice(
        seq(($.id_, LOCAL_ID), optional(seq(WITH, '(', DELAYED_DURABILITY, EQUAL, choice(seq(OFF, ON),), ')'),))
        ),)),
       ,
        seq(COMMIT, WORK?),
        seq(COMMIT, $.id_),
        seq(ROLLBACK, $.id_),
       ,
        seq(ROLLBACK, choice(seq(TRAN, TRANSACTION),), optional(choice(seq($.id_, LOCAL_ID),))),
       ,
        seq(ROLLBACK, WORK?),
       ,
        seq(SAVE, choice(seq(TRAN, TRANSACTION),), optional(choice(seq($.id_, LOCAL_ID),))),
    ),

    // https://msdn.microsoft.com/en-us/library/ms188037.aspx
    go_statement: $ => (
            seq(GO, optional(seq(field("count", DECIMAL)))),
    ),

    // https://msdn.microsoft.com/en-us/library/ms188366.aspx
    use_statement: $ => (
            seq(USE, field("database", $.id_)),
    ),

    setuser_statement: $ => (
            seq(SETUSER, field("user", STRING?)),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/reconfigure-transact-sql
    reconfigure_statement: $ => (
            seq(RECONFIGURE, optional(seq(WITH, OVERRIDE),)),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/shutdown-transact-sql
    shutdown_statement: $ => (
            seq(SHUTDOWN, optional(seq(WITH, NOWAIT),)),
    ),

    checkpoint_statement: $ => (
            seq(CHECKPOINT, optional(seq(field("checkPointDuration", DECIMAL)))),
    ),

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

    execute_clause: $ => (
            seq(EXECUTE, AS, $.clause, =, choice(seq(CALLER, SELF, OWNER, STRING),)),
    ),

    declare_local: $ => (
            seq(LOCAL_ID, AS?, $.data_type, optional(seq('=', $.expression),)),
    ),

    table_type_definition: $ => (
            seq(TABLE, '(', $.column_def_table_constraints, repeat(seq(optional(','), $.table_type_indices),), ')'),
    ),

    table_type_indices: $ => choice(
            seq(choice(seq(choice(seq((PRIMARY, KEY, INDEX, id_), optional(choice(seq(CLUSTERED, NONCLUSTERED),)))), UNIQUE),), '(', $.column_name_list_with_order, ')'),
        seq(CHECK, '(', $.search_condition, ')'),
    ),

    xml_type_definition: $ => (
            seq(XML, '(', optional(choice(seq(CONTENT, DOCUMENT),)), $.xml_schema_collection, ')'),
    ),

    xml_schema_collection: $ => (
            seq(ID, '.', ID),
    ),

    column_def_table_constraints: $ => (
            seq($.column_def_table_constraint, repeat(seq(optional(','), $.column_def_table_constraint),)),
    ),

    column_def_table_constraint: $ => choice(
        $.column_definition,
        $.materialized_column_definition,
        $.table_constrain,
    ),

    // https://msdn.microsoft.com/en-us/library/ms187742.aspx
    // There is a documentation error: column definition elements can be given in
    // any order
    column_definition: $ => (
            seq($.id_, choice(seq($.data_type, AS, $.expression, PERSISTED?),), repeat($.column_definition_element), optional($.column_index)),
    ),

    column_definition_element: $ => choice(
        FILESTREAM,
        seq(COLLATE, field("collation_name", $.id_)),
        SPARSE,
        seq(MASKED, WITH, '(', FUNCTION, '=', field("mask_function", STRING), ')'),
        seq(optional(seq(CONSTRAINT, field("constraint", $.id_))), DEFAULT, field("constant_expr", $.expression)),
        seq(IDENTITY, optional(seq('(', field("seed", DECIMAL), ',', field("increment", DECIMAL), ')'),)),
        seq(NOT, FOR, REPLICATION),
        seq(GENERATED, ALWAYS, AS, choice(seq(ROW, TRANSACTION_ID, SEQUENCE_NUMBER),), choice(seq(START, END),), HIDDEN_KEYWORD?),
       ,
        ROWGUIDCOL,
        seq(ENCRYPTED, WITH, '(', COLUMN_ENCRYPTION_KEY, '=', field("key_name", STRING), ',', ENCRYPTION_TYPE, '=', choice(
            DETERMINISTIC,
            RANDOMIZE
        ), ',', ALGORITHM, '=', field("algo", STRING), ')'),
        $.column_constrain,
    ),

    column_modifier: $ => (
            seq($.id_, choice(seq(ADD, DROP),), choice(
            ROWGUIDCOL,
            PERSISTED,
        seq(NOT, FOR, REPLICATION),
            SPARSE,
            HIDDEN_KEYWORD,
        seq(MASKED, optional(seq(WITH, choice(seq(FUNCTION, EQUAL, STRING, LR_BRACKET, FUNCTION, EQUAL, STRING, RR_BRACKET),))))
        ),),
    ),

    materialized_column_definition: $ => (
            seq($.id_, choice(seq(COMPUTE, AS),), $.expression, optional(choice(seq(MATERIALIZED, NOT, MATERIALIZED),))),
    ),

    // https://msdn.microsoft.com/en-us/library/ms186712.aspx
    // There is a documentation error: NOT NULL is a constraint
    // and therefore can be given a name.
    column_constraint: $ => (
            seq(optional(seq(CONSTRAINT, field("constraint", $.id_))), choice(
            $.null_notnull,
        seq((, (PRIMARY, KEY, UNIQUE), optional($.clustered), primary_key_options)),
            (seq(optional(seq(FOREIGN, KEY),), $.foreign_key_options),),
            $.check_constrain
        ),),
    ),

    column_index: $ => (
            seq(INDEX, field("index_name", $.id_), optional($.clustered), optional($.create_table_index_options), optional($.on_partition_or_filegroup), optional(
        seq(FILESTREAM_ON, choice(seq(field("filestream_filegroup_or_partition_schema_name", $.id_), NULL_DOUBLE_QUOTE),))
        ),),
    ),

    on_partition_or_filegroup: $ => (
            seq(ON, choice(
            (seq(field("partition_scheme_name", $.id_), '(', field("partition_column_name", $.id_), ')'),),
        seq(field("filegroup", $.id_)),
            DEFAULT_DOUBLE_QUOT
        ),),
    ),

    // https://msdn.microsoft.com/en-us/library/ms188066.aspx
    table_constraint: $ => (
            seq(optional(seq(CONSTRAINT, field("constraint", $.id_))), choice(
        seq(((PRIMARY, KEY, UNIQUE), optional($.clustered), '(', $.column_name_list_with_order, ')', primary_key_options)),
        seq((, FOREIGN, KEY, '(', field("fk", $.column_name_list), ')', foreign_key_options)),
        seq((, CONNECTION, '(', $.connection_node, (, ',', $.connection_node)*, ')')),
            (seq(DEFAULT, field("constant_expr", $.expression), FOR, field("column", $.id_), optional(seq(WITH, VALUES),))),
            $.check_constrain
        ),),
    ),

    connection_node: $ => (
            seq(field("from_node_table", $.id_), TO, field("to_node_table", $.id_)),
    ),

    primary_key_options: $ => (
            seq(optional(seq(WITH, FILLFACTOR, '=', DECIMAL),), optional($.alter_table_index_options), optional($.on_partition_or_filegroup)),
    ),

    foreign_key_options: $ => (
            seq(REFERENCES, $.table_name, '(', field("pk", $.column_name_list), ')', repeat(choice(seq($.on_delete, $.on_update),)), optional(
        seq(NOT, FOR, REPLICATION)
        ),),
    ),

    check_constraint: $ => (
            seq(CHECK, optional(seq(NOT, FOR, REPLICATION),), '(', $.search_condition, ')'),
    ),

    on_delete: $ => (
            seq(ON, DELETE, choice(seq(NO, ACTION, CASCADE, SET, NULL$._, SET, DEFAULT),)),
    ),

    on_update: $ => (
            seq(ON, UPDATE, choice(seq(NO, ACTION, CASCADE, SET, NULL$._, SET, DEFAULT),)),
    ),

    alter_table_index_options: $ => (
            seq(WITH, '(', $.alter_table_index_option, repeat(seq(',', $.alter_table_index_option),), ')'),
    ),

    // https://msdn.microsoft.com/en-us/library/ms186869.aspx
    alter_table_index_option: $ => choice(
            seq(PAD_INDEX, '=', $.on_off),
        seq(FILLFACTOR, '=', DECIMAL),
        seq(IGNORE_DUP_KEY, '=', $.on_off),
        seq(STATISTICS_NORECOMPUTE, '=', $.on_off),
        seq(ALLOW_ROW_LOCKS, '=', $.on_off),
        seq(ALLOW_PAGE_LOCKS, '=', $.on_off),
        seq(OPTIMIZE_FOR_SEQUENTIAL_KEY, '=', $.on_off),
        seq(SORT_IN_TEMPDB, '=', $.on_off),
        seq(MAXDOP, '=', field("max_degree_of_parallelism", DECIMAL)),
        seq(DATA_COMPRESSION, '=', choice(seq(NONE, ROW, PAGE, COLUMNSTORE, COLUMNSTORE_ARCHIVE),), optional($.on_partitions)),
        seq(XML_COMPRESSION, '=', $.on_off, optional($.on_partitions)),
        seq(DISTRIBUTION, '=', HASH, '(', $.id_, ')'),
        seq(CLUSTERED, INDEX, '(', $.id_, (ASC, |, DESC)?, repeat(seq(',', $.id_, (#######,))), ')'),
        seq(ONLINE, '=', choice(seq(ON, optional(seq('(', $.low_priority_lock_wait, ')'),), OFF),)),
        seq(RESUMABLE, '=', $.on_off),
        seq(MAX_DURATION, '=', field("times", DECIMAL), MINUTES?),
    ),

    // https://msdn.microsoft.com/en-us/library/ms180169.aspx
    declare_cursor: $ => (
            seq(DECLARE, $.cursor_name, choice(
        seq(CURSOR, ($.declare_set_cursor_common, (FOR, UPDATE, (OF, column_name_list)?)?)?),
        seq((SEMI_SENSITIVE, INSENSITIVE)?, SCROLL?, CURSOR, FOR, $.select_statement_standalone, optional(
        seq(FOR, choice(seq(READ, ONLY, UPDATE, (seq(OF, $.column_name_list),))))
            ),)
        ), optional(';')),
    ),

    declare_set_cursor_common: $ => (
            seq(repeat($.declare_set_cursor_common_partial), FOR, $.select_statement_standalone),
    ),

    declare_set_cursor_common_partial: $ => choice(
        choice(seq(LOCAL, GLOBAL),),
        choice(seq(FORWARD_ONLY, SCROLL),),
        choice(seq(STATIC, KEYSET, DYNAMIC, FAST_FORWARD),),
        choice(seq(READ_ONLY, SCROLL_LOCKS, OPTIMISTIC),),
        TYPE_WARNIN,
    ),

    fetch_cursor: $ => (
            seq(FETCH, optional(seq(optional(choice(seq(NEXT, PRIOR, FIRST, LAST, choice(seq(ABSOLUTE, RELATIVE),), $.expression),)), FROM),), GLOBAL?, $.cursor_name, optional(
        seq(INTO, LOCAL_ID, repeat(seq(',', LOCAL_ID),))
        ), optional(';')),
    ),

    // https://msdn.microsoft.com/en-us/library/ms190356.aspx
    // Runtime check.
    set_special: $ => choice(
            seq(SET, $.id_, choice(seq($.id_, constant_LOCAL_ID, $.on_off),), optional(';')),
        seq(SET, STATISTICS, choice(seq(IO, TIME, XML, PROFILE),), $.on_off, optional(';')),
        seq(SET, ROWCOUNT, choice(seq(LOCAL_ID, DECIMAL),), optional(';')),
        seq(SET, TEXTSIZE, DECIMAL, optional(';')),
       ,
        seq(SET, TRANSACTION, ISOLATION, LEVEL, choice(
        seq(READ, UNCOMMITTED),
        seq(READ, COMMITTED),
        seq(REPEATABLE, READ),
            SNAPSHOT,
            SERIALIZABLE,
            DECIMA
        ), optional(';')),
       ,
        seq(SET, IDENTITY_INSERT, $.table_name, $.on_off, optional(';')),
        seq(SET, $.special_list, repeat(seq(',', $.special_list),), $.on_off),
        seq(SET, $.modify_method),
    ),

    special_list: $ => choice(
        ANSI_NULLS,
        QUOTED_IDENTIFIER,
        ANSI_PADDING,
        ANSI_WARNINGS,
        ANSI_DEFAULTS,
        ANSI_NULL_DFLT_OFF,
        ANSI_NULL_DFLT_ON,
        ARITHABORT,
        ARITHIGNORE,
        CONCAT_NULL_YIELDS_NULL,
        CURSOR_CLOSE_ON_COMMIT,
        FMTONLY,
        FORCEPLAN,
        IMPLICIT_TRANSACTIONS,
        NOCOUNT,
        NOEXEC,
        NUMERIC_ROUNDABORT,
        PARSEONLY,
        REMOTE_PROC_TRANSACTIONS,
        SHOWPLAN_ALL,
        SHOWPLAN_TEXT,
        SHOWPLAN_XML,
        XACT_ABOR,
    ),

    constant_LOCAL_ID: $ => choice(
        $.constant,
        LOCAL_I,
    ),

    // Expression.

    // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/expressions-transact-sql
    // Operator precendence: https://docs.microsoft.com/en-us/sql/t-sql/language-elements/operator-precedence-transact-sql
    expression: $ => choice(
        $.primitive_expression,
        $.function_call,
        seq($.expression, '.', choice(seq($.value_call, $.query_call, $.exist_call, $.modify_call),)),
        seq($.expression, '.', $.hierarchyid_call),
        seq($.expression, COLLATE, $.id_),
        $.case_expression,
        $.full_column_name,
        $.bracket_expression,
        $.unary_operator_expression,
        seq($.expression, $.op, =, choice(seq('*', '/', '%'),), $.expression),
        seq($.expression, $.op, =, choice(seq('+', '-', '&', '^', ',', ','),), $.expression),
        seq($.expression, $.time_zone),
        $.over_clause,
        DOLLAR_ACTIO,
    ),

    parameter: $ => (
        PLACEHOLDE,
    ),

    time_zone: $ => (
            seq(AT_KEYWORD, TIME, ZONE, $.expression),
    ),

    primitive_expression: $ => choice(
        DEFAULT,
        NULL$._,
        LOCAL_ID,
        $.primitive_constan,
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/case-transact-sql
    case_expression: $ => choice(
            seq(CASE, field("caseExpr", $.expression), repeat1($.switch_section), optional(seq(ELSE, field("elseExpr", $.expression))), END),
        seq(CASE, repeat1($.switch_search_condition_section), optional(seq(ELSE, field("elseExpr", $.expression))), END),
    ),

    unary_operator_expression: $ => choice(
            seq('~', $.expression),
        seq($.op, =, choice(seq('+', '-'),), $.expression),
    ),

    bracket_expression: $ => choice(
            seq('(', $.expression, ')'),
        seq('(', $.subquery, ')'),
    ),

    subquery: $ => (
        $.select_statemen,
    ),

    // https://msdn.microsoft.com/en-us/library/ms175972.aspx
    with_expression: $ => (
            seq(WITH, $.ctes, +=, $.common_table_expression, repeat(seq(',', $.ctes, +=, $.common_table_expression),)),
    ),

    common_table_expression: $ => (
            seq(field("expression_name", $.id_), optional(seq('(', field("columns", $.column_name_list), ')'),), AS, '(', field("cte_query", $.select_statement), ')'),
    ),

    update_elem: $ => choice(
            seq(LOCAL_ID, '=', $.full_column_name, choice(seq('=', $.assignment_operator),), $.expression),
        seq(choice(seq($.full_column_name, LOCAL_ID),), choice(seq('=', $.assignment_operator),), $.expression),
        seq(field("udt_column_name", $.id_), '.', field("method_name", $.id_), '(', $.expression_list_, ')'),
        seq(//|, $.full_column_name, '.', WRITE, ($.expression,)),
    ),

    update_elem_merge: $ => choice(
            seq(choice(seq($.full_column_name, LOCAL_ID),), choice(seq('=', $.assignment_operator),), $.expression),
        seq(field("udt_column_name", $.id_), '.', field("method_name", $.id_), '(', $.expression_list_, ')'),
        seq(//|, $.full_column_name, '.', WRITE, ($.expression,)),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/queries/search-condition-transact-sql
    search_condition: $ => choice(
            seq(NOT*, choice(seq($.predicate, '(', $.search_condition, ')'),)),
        seq($.search_condition, AND, $.search_condition),
        seq($.search_condition, OR, $.search_condition),
    ),

    predicate: $ => choice(
            seq(EXISTS, '(', $.subquery, ')'),
        $.freetext_predicate,
        seq($.expression, $.comparison_operator, $.expression),
        seq($.expression, MULT_ASSIGN, $.expression, ////SQL-82, $.syntax, $.for, $.left, $.outer, joins;, '*='., S$.ee, https:),
        seq($.expression, $.comparison_operator, choice(seq(ALL, SOME, ANY),), '(', $.subquery, ')'),
        seq($.expression, NOT*, BETWEEN, $.expression, AND, $.expression),
        seq($.expression, NOT*, IN, '(', choice(seq($.subquery, $.expression_list_),), ')'),
        seq($.expression, NOT*, LIKE, $.expression, optional(seq(ESCAPE, $.expression),)),
        seq($.expression, IS, $.null_notnull),
    ),

    // Changed union rule to sql_union to avoid union construct with C++ target.  Issue reported by person who generates into C++.  This individual reports change causes generated code to work

    query_expression: $ => choice(
            seq($.query_specificati$.on, select_$.order_optional($.by_clause), $.uni$.ons, +=, sql_$.unirepeat($.on), $.order, $.by, $.can, $.be, $.on, $.the, "top", $.side, $.of, $.uni$.on, :/),
        seq('(', $.query_expression, ')', optional(seq(UNION, ALL?, $.query_expression),)),
    ),

    sql_union: $ => (
            seq(choice(seq(UNION, ALL?, EXCEPT, INTERSECT),), choice(
        seq(field("spec", $.query_specification)),
            #######
        ),),
    ),

    // https://msdn.microsoft.com/en-us/library/ms176104.aspx
    query_specification: $ => (
            seq(SELECT, allOrD$.istinct, =, optional(choice(seq(ALL, DISTINCT),)), field("top", optional($.top_clause)), field("columns", $.select_list)),
        seq(//, https://msdn.microsoft.com/en-us/library/ms188029.$.aspx),
        seq(optional(seq(INTO, field("into", $.table_name))), optional(seq(FROM, field("from", $.table_sources)),), optional(seq(WHERE, field("where", $.search_condition)),)),
        seq(//, https://msdn.microsoft.com/en-us/library/ms177673.$.aspx),
        seq(optional(
        seq(GROUP, BY, choice(
        seq((field("groupByAll", ALL?), groupB$.ys, +=, $.group_by_item, (',', groupB$.ys, +=, $.group_by_item)*)),
        seq(GROUPING, SETS, '(', groupS$.ets, +=, $.grouping_s$.ets_item, repeat(
        seq(',', groupS$.ets, +=, $.grouping_s$.ets_item)
                ), ')')
            ),)
        ), optional(seq(HAVING, field("having", $.search_condition)))),
    ),

    // https://msdn.microsoft.com/en-us/library/ms189463.aspx
    top_clause: $ => (
            seq(TOP, choice(seq($.top_percent, $.top_count),), optional(seq(WITH, TIES),)),
    ),

    top_percent: $ => choice(
            seq($.percent_constant, =, choice(seq(REAL, FLOAT, DECIMAL),), PERCENT),
        seq('(', field("topper_expression", $.expression), ')', PERCENT),
    ),

    top_count: $ => choice(
            seq(field("count_constant", DECIMAL)),
        seq('(', field("topcount_expression", $.expression), ')'),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/queries/select-over-clause-transact-optional($.sql)view=sql-server-ver16
    order_by_clause: $ => (
            seq(ORDER, BY, $.order_bys, +=, $.order_by_expression, repeat(seq(',', $.order_bys, +=, $.order_by_expression),)),
    ),

    // https://msdn.microsoft.com/en-us/library/ms188385.aspx
    select_order_by_clause: $ => (
            seq($.order_by_clause, optional(choice(
        seq(OFFSET, field("offset_exp", $.expression), $.offset_rows, =, (ROW, ROWS), optional(choice(
        seq(FETCH, $.fetch_offset, =, (FIRST, NEXT), field("fetch_exp", $.expression), $.fetch_rows, =, choice(seq(ROW, ROWS),), ONLY)
            ),))
        ),)),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/queries/select-for-clause-transact-sql
    for_clause: $ => choice(
            seq(FOR, BROWSE),
        seq(FOR, XML, (RAW, optional(seq('(', STRING, ')'),), |, AUTO), repeat($.xml_common_directives), (),
        seq(COMMA, (XMLDATA, |, XMLSCHEMA, optional(seq('(', STRING, ')'),))),
        seq()?, optional(seq(COMMA, ELEMENTS, optional(choice(seq(XSINIL, ABSENT),))))),
        seq(FOR, XML, EXPLICIT, repeat($.xml_common_directives), optional(seq(COMMA, XMLDATA),)),
        seq(FOR, XML, PATH, optional(seq('(', STRING, ')'),), repeat($.xml_common_directives), optional(seq(COMMA, ELEMENTS, optional(choice(seq(XSINIL, ABSENT),))))),
        seq(FOR, JSON, choice(seq(AUTO, PATH),), repeat(
        seq(COMMA, choice(seq(ROOT, (seq('(', STRING, ')'),), INCLUDE_NULL_VALUES, WITHOUT_ARRAY_WRAPPER),))
        ),),
    ),

    xml_common_directives: $ => (
            seq(',', choice(seq(BINARY_KEYWORD, BASE64, TYPE, ROOT, optional(seq('(', STRING, ')'),)))),
    ),

    order_by_expression: $ => (
            seq(field("order_by", $.expression), optional(choice(seq(field("ascending", ASC), field("descending", DESC))))),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/queries/select-group-by-transact-optional($.sql)view=sql-server-ver15
    grouping_sets_item: $ => choice(
            seq(optional('('), groupSetI$.tems, +=, $.group_by_item, repeat(seq(',', groupSetI$.tems, +=, $.group_by_item),), optional(')')),
        seq('(', ')'),
    ),

    group_by_item: $ => (
        $.expressio,
        seq(/*|, $.rollup_spec),
        $.cube_spec,
        $.grouping_sets_spec,
        repeat($.grand_total),
    ),

    option_clause
        // https://msdn.microsoft.com/en-us/library/ms181714.aspx: $ => (
            seq(OPTION, '(', $.$.options_, +=, $.option, repeat(seq(',', $.$.options_, +=, $.option),), ')'),
    ),

    option: $ => choice(
            seq(FAST, field("number_rows", DECIMAL)),
        seq(choice(seq(HASH, ORDER),), GROUP),
        seq(choice(seq(MERGE, HASH, CONCAT),), UNION),
        seq(choice(seq(LOOP, MERGE, HASH),), JOIN),
        seq(EXPAND, VIEWS),
        seq(FORCE, ORDER),
        IGNORE_NONCLUSTERED_COLUMNSTORE_INDEX,
        seq(KEEP, PLAN),
        seq(KEEPFIXED, PLAN),
        seq(MAXDOP, field("number_of_processors", DECIMAL)),
        seq(MAXRECURSION, field("number_recursion", DECIMAL)),
        seq(OPTIMIZE, FOR, '(', $.optimize_for_arg, repeat(seq(',', $.optimize_for_arg),), ')'),
        seq(OPTIMIZE, FOR, UNKNOWN),
        seq(PARAMETERIZATION, choice(seq(SIMPLE, FORCED),)),
        RECOMPILE,
        seq(ROBUST, PLAN),
        seq(USE, PLAN, STRING),
    ),

    optimize_for_arg: $ => (
            seq(LOCAL_ID, choice(seq(UNKNOWN, '=', choice(seq($.constant, NULL$._),)))),
    ),

    // https://msdn.microsoft.com/en-us/library/ms176104.aspx
    select_list: $ => (
            seq($.selectE$.lement, +=, $.select_list_elem, repeat(seq(',', selectE$.lement, +=, $.select_list_elem),)),
    ),

    udt_method_arguments: $ => (
            seq('(', $.argument, +=, $.execute_var_string, repeat(seq(',', $.argument, +=, $.execute_var_string),), ')'),
    ),

    // https://docs.microsoft.com/ru-ru/sql/t-sql/queries/select-clause-transact-sql
    asterisk: $ => choice(
            seq(optional(seq($.table_name, '.'),), '*'),
        seq(choice(seq(INSERTED, DELETED),), '.repeat(', ')'),
    ),

    udt_elem: $ => choice(
            seq(field("udt_column_name", $.id_), '.', field("non_static_attr", $.id_), $.udt_method_arguments, optional($.as_column_alias)),
        seq(field("udt_column_name", $.id_), DOUBLE_COLON, field("static_attr", $.id_), optional($.udt_method_arguments), optional($.as_column_alias)),
    ),

    expression_elem: $ => choice(
            seq(field("leftAlias", $.column_alias), $.eq, =, '=', field("leftAssignment", $.expression)),
        seq(field("expressionAs", $.expression), optional($.as_column_alias)),
    ),

    select_list_elem: $ => choice(
        $.asterisk,
        $.udt_elem,
        seq(LOCAL_ID, choice(seq($.assignment_operator, '='),), $.expression),
        $.expression_ele,
    ),

    table_sources: $ => choice(
        $.non_ansi_join,
        seq($.source, +=, table_$.source, repeat(seq(',', $.source, +=, table_$.source),)),
    ),

    // sqlenlight.com/support/help/sa0006/
    // stale link
    non_ansi_join: $ => (
            seq($.source, +=, table_$.source, repeat1(seq(',', $.source, +=, table_$.source),)),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/queries/from-transact-sql
    table_source: $ => (
            seq($.table_source_item, $.joins, +=, repeat($.join_part)),
    ),

    table_source_item: $ => choice(
            seq($.full_table_name, $.deprecated_table_hint, $.as_table_alias),
        seq($.full_table_name, optional($.as_table_alias), optional(choice(
            $.with_table_hints,
            $.deprecated_table_hint,
            $.sybase_legacy_hint
        ),)),
        seq($.rowset_function, optional($.as_table_alias)),
        seq('(', $.derived_table, ')', (#######,)),
        seq($.change_table, optional($.as_table_alias)),
        seq($.nodes_method, (#######,)),
        seq($.function_call, (#######,)),
        seq(field("loc_id", LOCAL_ID), optional($.as_table_alias)),
        seq(field("loc_id_call", LOCAL_ID), '.', field("loc_fcall", $.function_call), (#######,)),
        $.open_xml,
        $.open_json,
        seq(DOUBLE_COLON, field("oldstyle_fcall", $.function_call), optional($.as_table_alias)),
        seq('(', $.table_source, ')'),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/functions/openxml-transact-sql
    open_xml: $ => (
            seq(OPENXML, '(', $.expression, ',', $.expression, optional(seq(',', $.expression),), ')', optional(seq(WITH, '(', $.schema_declaration, ')'),), optional($.as_table_alias)),
    ),

    open_json: $ => (
            seq(OPENJSON, '(', $.expression, optional(seq(',', $.expression),), ')', optional(seq(WITH, '(', $.json_declaration, ')'),), optional($.as_table_alias)),
    ),

    json_declaration: $ => (
            seq($.json_col, +=, $.$.json_column_declaration, repeat(seq(',', $.json_col, +=, $.$.json_column_declaration),)),
    ),

    json_column_declaration: $ => (
            seq($.column_declaration, optional(seq(AS, JSON),)),
    ),

    schema_declaration: $ => (
            seq($.xml_col, +=, $.column_declaration, repeat(seq(',', $.xml_col, +=, $.column_declaration),)),
    ),

    column_declaration: $ => (
            seq($.id_, $.data_type, STRING?),
    ),

    change_table: $ => choice(
        $.change_table_changes,
        $.change_table_versio,
    ),

    change_table_changes: $ => (
            seq(CHANGETABLE, '(', CHANGES, field("changetable", $.table_name), ',', $.changesid, =, choice(seq(NULL$._, DECIMAL, LOCAL$._ID),), ')'),
    ),

    change_table_version: $ => (
            seq(CHANGETABLE, '(', VERSION, field("versiontable", $.table_name), ',', field("pk_columns", $.full_column_name_list), ',', field("pk_values", $.select_list), ')'),
    ),

    // https://msdn.microsoft.com/en-us/library/ms191472.aspx
    join_part
        // https://msdn.microsoft.com/en-us/library/ms173815(v=sql.120).aspx: $ => choice(
        $.join_on,
        $.cross_join,
        $.apply_,
        $.pivot,
        $.unpivo,
    ),

    join_on: $ => (
            seq(choice(seq(field("inner", INNER?), $.join_type, =, choice(seq(LEFT, RIGHT, FULL),), field("outer", OUTER?))), optional(
        seq($.join_hint, =, choice(seq(LOOP, HASH, MERGE, REMOTE),))
        ), JOIN, field("source", $.table_source), ON, field("cond", $.search_condition)),
    ),

    cross_join: $ => (
            seq(CROSS, JOIN, $.table_source_item),
    ),

    apply_: $ => (
            seq($.apply_style, =, choice(seq(CROSS, OUTER),), APPLY, field("source", $.table_source_item)),
    ),

    pivot: $ => (
            seq(PIVOT, $.pivot_clause, $.as_table_alias),
    ),

    unpivot: $ => (
            seq(UNPIVOT, $.unpivot_clause, $.as_table_alias),
    ),

    pivot_clause: $ => (
            seq('(', $.aggregate_windowed_function, FOR, $.full_column_name, IN, $.column_alias_list, ')'),
    ),

    unpivot_clause: $ => (
            seq('(', field("unpivot_exp", $.expression), FOR, $.full_column_name, IN, '(', $.$.full_column_name_list, ')', ')'),
    ),

    full_column_name_list: $ => (
            seq($.column, +=, $.full_$.column_name, repeat(seq(',', $.column, +=, $.full_$.column_name),)),
    ),

    // https://msdn.microsoft.com/en-us/library/ms190312.aspx
    rowset_function: $ => (
        (
        seq(OPENROWSET, LR_BRACKET, field("provider_name", STRING), COMMA, field("connectionString", STRING), COMMA, field("sql", STRING), RR_BRACKET)
        ),
        ########,
    ),

    // runtime check.
    bulk_option: $ => (
            seq($.id_, '=', $.bulk_option_value, =, choice(seq(DECIMAL, STRING),)),
    ),

    derived_table: $ => choice(
        $.subquery,
        seq('(', $.subquery, repeat(seq(UNION, ALL, $.subquery),), ')'),
        $.table_value_constructor,
        seq('(', $.table_value_constructor, ')'),
    ),

    function_call: $ => choice(
            seq($.ranking_windowed_function, #, RANKING_WINDOWED_FUNC),
        seq($.aggregate_windowed_function, #, AGGREGATE_WINDOWED_FUNC),
        seq($.analytic_windowed_function, #, ANALYTIC_WINDOWED_FUNC),
        seq($.built_in_functions, #, BUILT_IN_FUNC),
        seq($.scalar_function_name, '(', optional($.expression_list_), ')', #, SCALAR_FUNCTION),
        seq($.freetext_function, #, FREE_TEXT),
        seq($.partition_function, #, PARTITION_FUNC),
        seq($.hierarchyid_static_method, #, HIERARCHYID_METHOD),
    ),

    partition_function: $ => (
            seq(optional(seq(field("database", $.id_), '.'),), DOLLAR_PARTITION, '.', field("func_name", $.id_), '(', $.expression, ')'),
    ),

    freetext_function: $ => (
            seq(choice(seq(CONTAINSTABLE, FREETEXTTABLE),), '(', $.table_name, ',', choice(
            $.full_column_name,
        seq('(', $.full_column_name, repeat(seq(',', $.full_column_name),), ')'),
            '*
        ), ',', $.expression, optional(seq(',', LANGUAGE, $.expression),), optional(seq(',', $.expression),), ')'),
        seq(choice(seq(SEMANTICSIMILARITYTABLE, SEMANTICKEYPHRASETABLE),), '(', $.table_name, ',', choice(
            $.full_column_name,
        seq('(', $.full_column_name, repeat(seq(',', $.full_column_name),), ')'),
            '*
        ), ',', $.expression, ')'),
        seq(SEMANTICSIMILARITYDETAILSTABLE, '(', $.table_name, ',', $.full_column_name, ',', $.expression, ',', $.full_column_name, ',', $.expression, ')'),
    ),

    freetext_predicate: $ => (
            seq(CONTAINS, '(', choice(
            $.full_column_name,
        seq('(', $.full_column_name, repeat(seq(',', $.full_column_name),), ')'),
            '*',
        seq(PROPERTY, '(', $.full_column_name, ',', $.expression, ')')
        ), ',', $.expression, ')'),
        seq(FREETEXT, '(', $.table_name, ',', choice(
            $.full_column_name,
        seq('(', $.full_column_name, repeat(seq(',', $.full_column_name),), ')'),
            '*
        ), ',', $.expression, optional(seq(',', LANGUAGE, $.expression),), ')'),
    ),

    json_key_value: $ => (
            seq(field("json_key_name", $.expression), ':', field("value_expression", $.expression)),
    ),

    json_null_clause: $ => (
            seq(choice(seq(ABSENT, NULL$._),), ON, NULL$._),
    ),

    built_in_functions
        // Metadata functions
        // https://docs.microsoft.com/en-us/sql/t-sql/functions/app-name-transact-optional($.sql)view=sql-server-ver16: $ => (
            seq(APP_NAME, '(', ')', #, APP_NAME),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/applock-mode-transact-optional($.sql)view=sql-server-ver16),
        seq(APPLOCK_MODE, '(', field("database_principal", $.expression), ',', field("resource_name", $.expression), ',', field("lock_owner", $.expression), ')', #, APPLOCK_MODE),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/applock-test-transact-optional($.sql)view=sql-server-ver16),
        seq(APPLOCK_TEST, '(', field("database_principal", $.expression), ',', field("resource_name", $.expression), ',', field("lock_mode", $.expression), ',', field("lock_owner", $.expression), ')', #),
            APPLOCK_TES,
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/assemblyproperty-transact-optional($.sql)view=sql-server-ver16),
        seq(ASSEMBLYPROPERTY, '(', field("assembly_name", $.expression), ',', field("property_name", $.expression), ')', #, ASSEMBLYPROPERTY),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/col-length-transact-optional($.sql)view=sql-server-ver16),
        seq(COL_LENGTH, '(', field("table", $.expression), ',', field("column", $.expression), ')', #, COL_LENGTH),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/col-name-transact-optional($.sql)view=sql-server-ver16),
        seq(COL_NAME, '(', field("table_id", $.expression), ',', field("column_id", $.expression), ')', #, COL_NAME),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/columnproperty-transact-optional($.sql)view=sql-server-ver16),
        seq(COLUMNPROPERTY, '(', field("id", $.expression), ',', field("column", $.expression), ',', field("property", $.expression), ')', #, COLUMNPROPERTY),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/databasepropertyex-transact-optional($.sql)view=sql-server-ver16),
        seq(DATABASEPROPERTYEX, '(', field("database", $.expression), ',', field("property", $.expression), ')', #, DATABASEPROPERTYEX),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/db-id-transact-optional($.sql)view=sql-server-ver16),
        seq(DB_ID, '(', field("database_name", optional($.expression)), ')', #, DB_ID),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/db-name-transact-optional($.sql)view=sql-server-ver16),
        seq(DB_NAME, '(', field("database_id", optional($.expression)), ')', #, DB_NAME),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/file-id-transact-optional($.sql)view=sql-server-ver16),
        seq(FILE_ID, '(', field("file_name", $.expression), ')', #, FILE_ID),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/file-idex-transact-optional($.sql)view=sql-server-ver16),
        seq(FILE_IDEX, '(', field("file_name", $.expression), ')', #, FILE_IDEX),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/file-name-transact-optional($.sql)view=sql-server-ver16),
        seq(FILE_NAME, '(', field("file_id", $.expression), ')', #, FILE_NAME),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/filegroup-id-transact-optional($.sql)view=sql-server-ver16),
        seq(FILEGROUP_ID, '(', field("filegroup_name", $.expression), ')', #, FILEGROUP_ID),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/filegroup-name-transact-optional($.sql)view=sql-server-ver16),
        seq(FILEGROUP_NAME, '(', field("filegroup_id", $.expression), ')', #, FILEGROUP_NAME),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/filegroupproperty-transact-optional($.sql)view=sql-server-ver16),
        seq(FILEGROUPPROPERTY, '(', field("filegroup_name", $.expression), ',', field("property", $.expression), ')', #, FILEGROUPPROPERTY),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/fileproperty-transact-optional($.sql)view=sql-server-ver16),
        seq(FILEPROPERTY, '(', field("file_name", $.expression), ',', field("property", $.expression), ')', #, FILEPROPERTY),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/filepropertyex-transact-optional($.sql)view=sql-server-ver16),
        seq(FILEPROPERTYEX, '(', field("name", $.expression), ',', field("property", $.expression), ')', #, FILEPROPERTYEX),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/fulltextcatalogproperty-transact-optional($.sql)view=sql-server-ver16),
        seq(FULLTEXTCATALOGPROPERTY, '(', field("catalog_name", $.expression), ',', field("property", $.expression), ')', #, FULLTEXTCATALOGPROPERTY),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/fulltextserviceproperty-transact-optional($.sql)view=sql-server-ver16),
        seq(FULLTEXTSERVICEPROPERTY, '(', field("property", $.expression), ')', #, FULLTEXTSERVICEPROPERTY),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/index-col-transact-optional($.sql)view=sql-server-ver16),
        seq(INDEX_COL, '(', field("table_or_view_name", $.expression), ',', field("index_id", $.expression), ',', field("key_id", $.expression), ')', #, INDEX_COL),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/indexkey-property-transact-optional($.sql)view=sql-server-ver16),
        seq(INDEXKEY_PROPERTY, '(', field("object_id", $.expression), ',', field("index_id", $.expression), ',', field("key_id", $.expression), ',', field("property", $.expression), ')', #, INDEXKEY_PROPERTY),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/indexproperty-transact-optional($.sql)view=sql-server-ver16),
        seq(INDEXPROPERTY, '(', field("object_id", $.expression), ',', field("index_or_statistics_name", $.expression), ',', field("property", $.expression), ')', #, INDEXPROPERTY),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/next-value-for-transact-optional($.sql)view=sql-server-ver16),
        seq(NEXT, VALUE, FOR, field("sequence_name", $.table_name), optional(seq(field("server_user_sid", $.expression)))1, #, NEXT_VALUE_FOR),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/object-definition-transact-optional($.sql)view=sql-server-ver16),
        seq(OBJECT_DEFINITION, '(', field("object_id", $.expression), ')', #, OBJECT_DEFINITION),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/object-id-transact-optional($.sql)view=sql-server-ver16),
        seq(OBJECT_ID, '(', field("object_name", $.expression), optional(seq(field("server_user_sid", $.expression)))0, ')', #, OBJECT_ID),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/object-name-transact-optional($.sql)view=sql-server-ver16),
        seq(OBJECT_NAME, '(', field("object_id", $.expression), optional(seq(field("login", $.expression), optional(seq(',', param2, =, $.expression),)))9, ')', #, OBJECT_NAME),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/object-schema-name-transact-optional($.sql)view=sql-server-ver16),
        seq(OBJECT_SCHEMA_NAME, '(', field("object_id", $.expression), optional(seq(field("login", $.expression), optional(seq(',', param2, =, $.expression),)))9, ')', #, OBJECT_SCHEMA_NAME),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/objectproperty-transact-optional($.sql)view=sql-server-ver16),
        seq(OBJECTPROPERTY, '(', field("id", $.expression), ',', field("property", $.expression), ')', #, OBJECTPROPERTY),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/objectpropertyex-transact-optional($.sql)view=sql-server-ver16),
        seq(OBJECTPROPERTYEX, '(', field("id", $.expression), ',', field("property", $.expression), ')', #, OBJECTPROPERTYEX),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/original-db-name-transact-optional($.sql)view=sql-server-ver16),
        seq(ORIGINAL_DB_NAME, '(', ')', #, ORIGINAL_DB_NAME),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/parsename-transact-optional($.sql)view=sql-server-ver16),
        seq(PARSENAME, '(', field("object_name", $.expression), ',', field("object_piece", $.expression), ')', #, PARSENAME),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/schema-id-transact-optional($.sql)view=sql-server-ver16),
        seq(SCHEMA_ID, '(', field("schema_name", optional($.expression)), ')', #, SCHEMA_ID),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/schema-name-transact-optional($.sql)view=sql-server-ver16),
        seq(SCHEMA_NAME, '(', field("schema_id", optional($.expression)), ')', #, SCHEMA_NAME),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/scope-identity-transact-optional($.sql)view=sql-server-ver16),
        seq(SCOPE_IDENTITY, '(', ')', #, SCOPE_IDENTITY),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/serverproperty-transact-optional($.sql)view=sql-server-ver16),
        seq(SERVERPROPERTY, '(', field("property", $.expression), ')', #, SERVERPROPERTY),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/stats-date-transact-optional($.sql)view=sql-server-ver16),
        seq(STATS_DATE, '(', field("object_id", $.expression), ',', field("stats_id", $.expression), ')', #, STATS_DATE),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/type-id-transact-optional($.sql)view=sql-server-ver16),
        seq(TYPE_ID, '(', field("type_name", $.expression), ')', #, TYPE_ID),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/type-name-transact-optional($.sql)view=sql-server-ver16),
        seq(TYPE_NAME, '(', field("type_id", $.expression), ')', #, TYPE_NAME),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/typeproperty-transact-optional($.sql)view=sql-server-ver16),
        seq(TYPEPROPERTY, '(', field("type", $.expression), ',', field("property", $.expression), ')', #, TYPEPROPERTY),
        seq(//, S$.tring, $.functions),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/ascii-transact-optional($.sql)view=sql-server-ver16),
        seq(ASCII, '(', field("character_expression", $.expression), ')', #, ASCII),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/char-transact-optional($.sql)view=sql-server-ver16),
        seq(CHAR, '(', field("integer_expression", $.expression), ')', #, CHAR),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/charindex-transact-optional($.sql)view=sql-server-ver16),
        seq(CHARINDEX, '(', field("expressionToFind", $.expression), ',', field("expressionToSearch", $.expression), optional(seq(field("login", $.expression), optional(seq(',', param2, =, $.expression),)))8, ')', #, CHARINDEX),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/concat-transact-optional($.sql)view=sql-server-ver16),
        seq(CONCAT, '(', string_value_1, =, $.expression, ',', string_value_2, =, $.expression, optional(seq(field("login", $.expression), optional(seq(',', param2, =, $.expression),)))7, ')', #, CONCAT),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/concat-ws-transact-optional($.sql)view=sql-server-ver16),
        seq(CONCAT_WS, '(', field("separator", $.$.expression), ',', argument_1, =, $.expression, ',', argument_2, =, $.expression, optional(seq(field("login", $.expression), optional(seq(',', param2, =, $.expression),)))6, ')', #, CONCAT_WS),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/difference-transact-optional($.sql)view=sql-server-ver16),
        seq(DIFFERENCE, '(', character_$.expression_1, =, $.expression, ',', character_$.expression_2, =, $.expression, ')', #, DIFFERENCE),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/format-transact-optional($.sql)view=sql-server-ver16),
        seq(FORMAT, '(', field("value", $.expression), ',', field("format", $.expression), optional(seq(field("login", $.expression), optional(seq(',', param2, =, $.expression),)))5, ')', #, FORMAT),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/left-transact-optional($.sql)view=sql-server-ver16),
        seq(LEFT, '(', field("character_expression", $.expression), ',', field("integer_expression", $.expression), ')', #, LEFT),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/len-transact-optional($.sql)view=sql-server-ver16),
        seq(LEN, '(', field("string_expression", $.expression), ')', #, LEN),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/lower-transact-optional($.sql)view=sql-server-ver16),
        seq(LOWER, '(', field("character_expression", $.expression), ')', #, LOWER),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/ltrim-transact-optional($.sql)view=sql-server-ver16),
        seq(LTRIM, '(', field("character_expression", $.expression), ')', #, LTRIM),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/nchar-transact-optional($.sql)view=sql-server-ver16),
        seq(NCHAR, '(', field("integer_expression", $.expression), ')', #, NCHAR),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/patindex-transact-optional($.sql)view=sql-server-ver16),
        seq(PATINDEX, '(', field("pattern", $.expression), ',', field("string_expression", $.expression), ')', #, PATINDEX),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/quotename-transact-optional($.sql)view=sql-server-ver16),
        seq(QUOTENAME, '(', field("character_string", $.expression), optional(seq(field("login", $.expression), optional(seq(',', param2, =, $.expression),)))4, ')', #, QUOTENAME),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/replace-transact-optional($.sql)view=sql-server-ver16),
        seq(REPLACE, '(', field("input", $.expression), ',', field("replacing", $.expression), ',', field("with", $.expression), ')', #, REPLACE),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/replicate-transact-optional($.sql)view=sql-server-ver16),
        seq(REPLICATE, '(', field("string_expression", $.expression), ',', field("integer_expression", $.expression), ')', #, REPLICATE),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/reverse-transact-optional($.sql)view=sql-server-ver16),
        seq(REVERSE, '(', field("string_expression", $.expression), ')', #, REVERSE),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/right-transact-optional($.sql)view=sql-server-ver16),
        seq(RIGHT, '(', field("character_expression", $.expression), ',', field("integer_expression", $.expression), ')', #, RIGHT),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/rtrim-transact-optional($.sql)view=sql-server-ver16),
        seq(RTRIM, '(', field("character_expression", $.expression), ')', #, RTRIM),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/soundex-transact-optional($.sql)view=sql-server-ver16),
        seq(SOUNDEX, '(', field("character_expression", $.expression), ')', #, SOUNDEX),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/space-transact-optional($.sql)view=sql-server-ver16),
        seq(SPACE_KEYWORD, '(', field("integer_expression", $.expression), ')', #, SPACE),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/str-transact-optional($.sql)view=sql-server-ver16),
        seq(STR, '(', field("float_expression", $.expression), optional(seq(field("login", $.expression), optional(seq(',', param2, =, $.expression),)))3, ')', #, STR),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/string-agg-transact-optional($.sql)view=sql-server-ver16),
        seq(STRING_AGG, '(', field("expr", $.expression), ',', field("separator", $.expression), ')', optional(seq(field("login", $.expression), optional(seq(',', param2, =, $.expression),)))2, #, STRINGAGG),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/string-escape-transact-optional($.sql)view=sql-server-ver16),
        seq(STRING_ESCAPE, '(', field("text_", $.expression), ',', field("type_", $.expression), ')', #, STRING_ESCAPE),
       ,
        seq(STUFF, '(', field("str", $.expression), ',', field("from", $.expression), ',', field("to", $.expression), ',', field("str_with", $.expression), ')', #, STUFF),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/substring-transact-optional($.sql)view=sql-server-ver16),
        seq(SUBSTRING, '(', field("string_expression", $.expression), ',', field("start_", $.expression), ',', field("length", $.expression), ')', #, SUBSTRING),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/translate-transact-optional($.sql)view=sql-server-ver16),
        seq(TRANSLATE, '(', field("inputString", $.expression), ',', field("characters", $.expression), ',', field("translations", $.expression), ')', #, TRANSLATE),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/trim-transact-optional($.sql)view=sql-server-ver16),
        seq(TRIM, '(', optional(seq(field("login", $.expression), optional(seq(',', param2, =, $.expression),)))1, field("string_", $.expression), ')', #, TRIM),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/unicode-transact-optional($.sql)view=sql-server-ver16),
        seq(UNICODE, '(', field("ncharacter_expression", $.expression), ')', #, UNICODE),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/upper-transact-optional($.sql)view=sql-server-ver16),
        seq(UPPER, '(', field("character_expression", $.expression), ')', #, UPPER),
        seq(//, S$.ystem, $.functions),
       ,
        seq(BINARY_CHECKSUM, '(', optional(seq(field("server_user_sid", $.expression)))9, ')', #, BINARY_CHECKSUM),
       ,
        seq(CHECKSUM, '(', optional(seq(field("server_user_sid", $.expression)))9, ')', #, CHECKSUM),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/compress-transact-optional($.sql)view=sql-server-ver16),
        seq(COMPRESS, '(', field("expr", $.expression), ')', #, COMPRESS),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/connectionproperty-transact-optional($.sql)view=sql-server-ver16),
        seq(CONNECTIONPROPERTY, '(', field("property", STRING), ')', #, CONNECTIONPROPERTY),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/context-info-transact-optional($.sql)view=sql-server-ver16),
        seq(CONTEXT_INFO, '(', ')', #, CONTEXT_INFO),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/current-request-id-transact-optional($.sql)view=sql-server-ver16),
        seq(CURRENT_REQUEST_ID, '(', ')', #, CURRENT_REQUEST_ID),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/current-transaction-id-transact-optional($.sql)view=sql-server-ver16),
        seq(CURRENT_TRANSACTION_ID, '(', ')', #, CURRENT_TRANSACTION_ID),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/decompress-transact-optional($.sql)view=sql-server-ver16),
        seq(DECOMPRESS, '(', field("expr", $.expression), ')', #, DECOMPRESS),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/error-line-transact-optional($.sql)view=sql-server-ver16),
        seq(ERROR_LINE, '(', ')', #, ERROR_LINE),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/error-message-transact-optional($.sql)view=sql-server-ver16),
        seq(ERROR_MESSAGE, '(', ')', #, ERROR_MESSAGE),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/error-number-transact-optional($.sql)view=sql-server-ver16),
        seq(ERROR_NUMBER, '(', ')', #, ERROR_NUMBER),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/error-procedure-transact-optional($.sql)view=sql-server-ver16),
        seq(ERROR_PROCEDURE, '(', ')', #, ERROR_PROCEDURE),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/error-severity-transact-optional($.sql)view=sql-server-ver16),
        seq(ERROR_SEVERITY, '(', ')', #, ERROR_SEVERITY),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/error-state-transact-optional($.sql)view=sql-server-ver16),
        seq(ERROR_STATE, '(', ')', #, ERROR_STATE),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/formatmessage-transact-optional($.sql)view=sql-server-ver16),
        seq(FORMATMESSAGE, '(', optional(seq(field("server_user_sid", $.expression)))8, ',', $.expression, optional(seq(field("server_user_sid", $.expression)),)7, ')', #, FORMATMESSAGE),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/get-filestream-transaction-context-transact-optional($.sql)view=sql-server-ver16),
        seq(GET_FILESTREAM_TRANSACTION_CONTEXT, '(', ')', #, GET_FILESTREAM_TRANSACTION_CONTEXT),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/getansinull-transact-optional($.sql)view=sql-server-ver16),
        seq(GETANSINULL, '(', optional(seq(field("server_user_sid", $.expression)))6, ')', #, GETANSINULL),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/host-id-transact-optional($.sql)view=sql-server-ver16),
        seq(HOST_ID, '(', ')', #, HOST_ID),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/host-name-transact-optional($.sql)view=sql-server-ver16),
        seq(HOST_NAME, '(', ')', #, HOST_NAME),
       ,
        seq(ISNULL, '(', field("left", $.expression), ',', field("right", $.expression), ')', #, ISNULL),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/isnumeric-transact-optional($.sql)view=sql-server-ver16),
        seq(ISNUMERIC, '(', $.expression, ')', #, ISNUMERIC),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/min-active-rowversion-transact-optional($.sql)view=sql-server-ver16),
        seq(MIN_ACTIVE_ROWVERSION, '(', ')', #, MIN_ACTIVE_ROWVERSION),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/newid-transact-optional($.sql)view=sql-server-ver16),
        seq(NEWID, '(', ')', #, NEWID),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/newsequentialid-transact-optional($.sql)view=sql-server-ver16),
        seq(NEWSEQUENTIALID, '(', ')', #, NEWSEQUENTIALID),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/rowcount-big-transact-optional($.sql)view=sql-server-ver16),
        seq(ROWCOUNT_BIG, '(', ')', #, ROWCOUNT_BIG),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/session-context-transact-optional($.sql)view=sql-server-ver16),
        seq(SESSION_CONTEXT, '(', field("key", STRING), ')', #, SESSION_CONTEXT),
        seq(//, https://docs.microsoft.com/en-us/sql/t-sql/functions/xact-state-transact-optional($.sql)view=sql-server-ver16),
        seq(XACT_STATE, '(', ')', #, XACT_STATE),
        seq(//, https://msdn.microsoft.com/en-us/library/hh231076.$.aspx),
       ,
        seq(CAST, '(', $.expression, AS, $.data_type, ')', #, CAST),
        seq(TRY_CAST, '(', $.expression, AS, $.data_type, ')', #, TRY_CAST),
        seq(CONVERT, '(', field("convert_data_type", $.data_type), ',', field("convert_expression", $.expression), optional(seq(field("server_user_sid", $.expression)))5, ')', #, CONVERT),
       ,
        seq(COALESCE, '(', $.expression_list_, ')', #, COALESCE),
        seq(//, C$.ursor, $.functions),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/cursor-rows-transact-optional($.sql)view=sql-server-ver16),
        seq(CURSOR_ROWS, #, CURSOR_ROWS),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/cursor-rows-transact-optional($.sql)view=sql-server-ver16),
        seq(FETCH_STATUS, #, FETCH_STATUS),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/cursor-status-transact-optional($.sql)view=sql-server-ver16),
        seq(CURSOR_STATUS, '(', field("scope", STRING), ',', field("cursor", $.expression), ')', #, CURSOR_STATUS),
        seq(//, C$.ryptographic, $.functions),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/cert-id-transact-optional($.sql)view=sql-server-ver16),
        seq(CERT_ID, '(', field("cert_name", $.expression), ')', #, CERT_ID),
        seq(//, D$.ata, $.type, $.functions),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/datalength-transact-optional($.sql)view=sql-server-ver16),
        seq(DATALENGTH, '(', $.expression, ')', #, DATALENGTH),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/ident-current-transact-optional($.sql)view=sql-server-ver16),
        seq(IDENT_CURRENT, '(', field("table_or_view", $.expression), ')', #, IDENT_CURRENT),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/ident-incr-transact-optional($.sql)view=sql-server-ver16),
        seq(IDENT_INCR, '(', field("table_or_view", $.expression), ')', #, IDENT_INCR),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/ident-seed-transact-optional($.sql)view=sql-server-ver16),
        seq(IDENT_SEED, '(', field("table_or_view", $.expression), ')', #, IDENT_SEED),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/ident-seed-transact-optional($.sql)view=sql-server-ver16),
        seq(IDENTITY, '(', field("datatype", $.data_type), optional(seq(field("server_user_sid", $.expression)))4, ')', #, IDENTITY),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/ident-seed-transact-optional($.sql)view=sql-server-ver16),
        seq(SQL_VARIANT_PROPERTY, '(', field("expr", $.expression), ',', field("property", STRING), ')', #, SQL_VARIANT_PROPERTY),
        seq(//, D$.ate, $.functions),
        //https://infocenter.sybase.com/help/index.optional($.jsp)topic=/com.sybase.infocenter.dc36271.1572/$.html/blocks/CJADIDHD.$.htm,
        seq(CURRENT_DATE, '(', ')', #, CURRENT_DATE),
       ,
        seq(CURRENT_TIMESTAMP, #, CURRENT_TIMESTAMP),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/current-timezone-transact-optional($.sql)view=sql-server-ver16),
        seq(CURRENT_TIMEZONE, '(', ')', #, CURRENT_TIMEZONE),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/current-timezone-id-transact-optional($.sql)view=sql-server-ver16),
        seq(CURRENT_TIMEZONE_ID, '(', ')', #, CURRENT_TIMEZONE_ID),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/date-bucket-transact-optional($.sql)view=sql-server-ver16),
        seq(DATE_BUCKET, '(', field("datepart", $.dateparts_)9, ',', field("number", $.expression), ',', field("date", $.expression), optional(seq(field("server_user_sid", $.expression)))3, ')', #, DATE_BUCKET),
       ,
        seq(DATEADD, '(', field("datepart", $.dateparts_)12, ',', field("number", $.expression), ',', field("date", $.expression), ')', #, DATEADD),
       ,
        seq(DATEDIFF, '(', field("datepart", $.dateparts_)12, ',', field("date_first", $.expression), ',', field("date_second", $.expression), ')', #, DATEDIFF),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/datediff-big-transact-optional($.sql)view=sql-server-ver16),
        seq(DATEDIFF_BIG, '(', field("datepart", $.dateparts_)12, ',', field("startdate", $.expression), ',', field("enddate", $.expression), ')', #, DATEDIFF_BIG),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/datefromparts-transact-optional($.sql)view=sql-server-ver16),
        seq(DATEFROMPARTS, '(', field("year", $.expression), ',', field("month", $.expression), ',', field("day", $.expression), ')', #, DATEFROMPARTS),
       ,
        seq(DATENAME, '(', field("datepart", $.dateparts_)15, ',', field("date", $.expression), ')', #, DATENAME),
       ,
        seq(DATEPART, '(', field("datepart", $.dateparts_)15, ',', field("date", $.expression), ')', #, DATEPART),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/datetime2fromparts-transact-optional($.sql)view=sql-server-ver16),
        seq(DATETIME2FROMPARTS, '(', field("year", $.expression), ',', field("month", $.expression), ',', field("day", $.expression), ',', field("hour", $.expression), ',', field("minute", $.expression), ',', $.seconds, =),
        seq($.expression, ',', field("fractions", $.$.expression), ',', field("precision", $.$.expression), ')', #, DATETIME2FROMPARTS),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/datetimefromparts-transact-optional($.sql)view=sql-server-ver16),
        seq(DATETIMEFROMPARTS, '(', field("year", $.expression), ',', field("month", $.expression), ',', field("day", $.expression), ',', field("hour", $.expression), ',', field("minute", $.expression), ',', $.seconds, =),
        seq($.expression, ',', field("milliseconds", $.$.expression), ')', #, DATETIMEFROMPARTS),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/datetimeoffsetfromparts-transact-optional($.sql)view=sql-server-ver16),
        seq(DATETIMEOFFSETFROMPARTS, '(', field("year", $.expression), ',', field("month", $.expression), ',', field("day", $.expression), ',', field("hour", $.expression), ',', field("minute", $.expression), ','),
        seq(field("seconds", $.expression), ',', field("fractions", $.expression), ',', field("hour_offset", $.expression), ',', field("minute_offset", $.expression), ',', field("precision", DECIMAL), ')', #),
            DATETIMEOFFSETFROMPART,
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/datetrunc-transact-optional($.sql)view=sql-server-ver16),
        seq(DATETRUNC, '(', field("datepart", $.dateparts_datetrunc), ',', field("date", $.expression), ')', #, DATETRUNC),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/day-transact-optional($.sql)view=sql-server-ver16),
        seq(DAY, '(', field("date", $.expression), ')', #, DAY),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/eomonth-transact-optional($.sql)view=sql-server-ver16),
        seq(EOMONTH, '(', field("start_date", $.expression), optional(seq(field("server_user_sid", $.expression)))2, ')', #, EOMONTH),
       ,
        seq(GETDATE, '(', ')', #, GETDATE),
       ,
        seq(GETUTCDATE, '(', ')', #, GETUTCDATE),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/isdate-transact-optional($.sql)view=sql-server-ver16),
        seq(ISDATE, '(', $.expression, ')', #, ISDATE),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/month-transact-optional($.sql)view=sql-server-ver16),
        seq(MONTH, '(', field("date", $.expression), ')', #, MONTH),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/smalldatetimefromparts-transact-optional($.sql)view=sql-server-ver16),
        seq(SMALLDATETIMEFROMPARTS, '(', field("year", $.expression), ',', field("month", $.expression), ',', field("day", $.expression), ',', field("hour", $.expression), ',', field("minute", $.expression), ')', #),
            SMALLDATETIMEFROMPART,
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/switchoffset-transact-optional($.sql)view=sql-server-ver16),
        seq(SWITCHOFFSET, '(', field("datetimeoffset_expression", $.expression), ',', field("timezoneoffset_expression", $.expression), ')', #, SWITCHOFFSET),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/sysdatetime-transact-optional($.sql)view=sql-server-ver16),
        seq(SYSDATETIME, '(', ')', #, SYSDATETIME),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/sysdatetimeoffset-transact-optional($.sql)view=sql-server-ver16),
        seq(SYSDATETIMEOFFSET, '(', ')', #, SYSDATETIMEOFFSET),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/sysutcdatetime-transact-optional($.sql)view=sql-server-ver16),
        seq(SYSUTCDATETIME, '(', ')', #, SYSUTCDATETIME),
        //https://learn.microsoft.com/en-us/sql/t-sql/functions/timefromparts-transact-optional($.sql)view=sql-server-ver16,
        seq(TIMEFROMPARTS, '(', field("hour", $.expression), ',', field("minute", $.expression), ',', field("seconds", $.expression), ',', field("fractions", $.expression), ',', field("precision", DECIMAL), ')', #),
            TIMEFROMPART,
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/todatetimeoffset-transact-optional($.sql)view=sql-server-ver16),
        seq(TODATETIMEOFFSET, '(', field("datetime_expression", $.expression), ',', field("timezoneoffset_expression", $.expression), ')', #, TODATETIMEOFFSET),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/year-transact-optional($.sql)view=sql-server-ver16),
        seq(YEAR, '(', field("date", $.expression), ')', #, YEAR),
       ,
        seq(IDENTITY, '(', $.data_type, optional(seq(field("server_user_sid", $.expression)))1, optional(seq(field("server_user_sid", $.expression)),)0, ')', #, IDENTITY),
       ,
        seq(MIN_ACTIVE_ROWVERSION, '(', ')', #, MIN_ACTIVE_ROWVERSION),
       ,
        seq(NULLIF, '(', field("left", $.expression), ',', field("right", $.expression), ')', #, NULLIF),
        seq(//, https://docs.microsoft.com/en-us/$.sql/t-$.sql/functions/parse-transact-$.sql),
       ,
        seq(PARSE, '(', field("str", $.expression), AS, $.data_type, optional(seq(field("user", $.expression)))9, ')', #, PARSE),
       ,
        seq($.xml_data_type_methods, #, XML_DATA_TYPE_FUNC),
       ,
        seq(IIF, '(', field("cond", $.search_condition), ',', field("left", $.expression), ',', field("right", $.expression), ')', #, IIF),
        seq(//, JSON, $.functions),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/isjson-transact-optional($.sql)view=azure-sqldw-$.latest),
        seq(ISJSON, '(', field("json_expr", $.expression), optional(seq(field("user", $.expression)))8, ')', #, ISJSON),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/json-object-transact-optional($.sql)view=azure-sqldw-$.latest),
        seq(JSON_OBJECT, '(', optional(seq(field("user", $.expression)))7, optional($.json_null_clause), ')', #, JSON_OBJECT),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/json-array-transact-optional($.sql)view=azure-sqldw-$.latest),
        seq(JSON_ARRAY, '(', optional($.expression_list_), optional($.json_null_clause), ')', #, JSON_ARRAY),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/json-value-transact-optional($.sql)view=azure-sqldw-$.latest),
        seq(JSON_VALUE, '(', field("expr", $.expression), ',', field("path", $.expression), ')', #, JSON_VALUE),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/json-query-transact-optional($.sql)view=azure-sqldw-$.latest),
        seq(JSON_QUERY, '(', field("expr", $.expression), optional(seq(field("user", $.expression)))6, ')', #, JSON_QUERY),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/json-modify-transact-optional($.sql)view=azure-sqldw-$.latest),
        seq(JSON_MODIFY, '(', field("expr", $.expression), ',', field("path", $.expression), ',', field("new_value", $.expression), ')', #, JSON_MODIFY),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/json-path-exists-transact-optional($.sql)view=azure-sqldw-$.latest),
        seq(JSON_PATH_EXISTS, '(', field("value_expression", $.expression), ',', field("sql_json_path", $.expression), ')', #, JSON_PATH_EXISTS),
        seq(//, M$.ath, $.functions),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/abs-transact-optional($.sql)view=sql-server-ver16),
        seq(ABS, '(', field("numeric_expression", $.expression), ')', #, ABS),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/acos-transact-optional($.sql)view=sql-server-ver16),
        seq(ACOS, '(', field("float_expression", $.expression), ')', #, ACOS),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/asin-transact-optional($.sql)view=sql-server-ver16),
        seq(ASIN, '(', field("float_expression", $.expression), ')', #, ASIN),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/atan-transact-optional($.sql)view=sql-server-ver16),
        seq(ATAN, '(', field("float_expression", $.expression), ')', #, ATAN),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/atn2-transact-optional($.sql)view=sql-server-ver16),
        seq(ATN2, '(', field("float_expression", $.expression), ',', field("float_expression", $.expression), ')', #, ATN2),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/ceiling-transact-optional($.sql)view=sql-server-ver16),
        seq(CEILING, '(', field("numeric_expression", $.expression), ')', #, CEILING),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/cos-transact-optional($.sql)view=sql-server-ver16),
        seq(COS, '(', field("float_expression", $.expression), ')', #, COS),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/cot-transact-optional($.sql)view=sql-server-ver16),
        seq(COT, '(', field("float_expression", $.expression), ')', #, COT),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/degrees-transact-optional($.sql)view=sql-server-ver16),
        seq(DEGREES, '(', field("numeric_expression", $.expression), ')', #, DEGREES),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/exp-transact-optional($.sql)view=sql-server-ver16),
        seq(EXP, '(', field("float_expression", $.expression), ')', #, EXP),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/floor-transact-optional($.sql)view=sql-server-ver16),
        seq(FLOOR, '(', field("numeric_expression", $.expression), ')', #, FLOOR),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/log-transact-optional($.sql)view=sql-server-ver16),
        seq(LOG, '(', field("float_expression", $.expression), optional(seq(field("user", $.expression)))5, ')', #, LOG),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/log10-transact-optional($.sql)view=sql-server-ver16),
        seq(LOG10, '(', field("float_expression", $.expression), ')', #, LOG10),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/pi-transact-optional($.sql)view=sql-server-ver16),
        seq(PI, '(', ')', #, PI),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/power-transact-optional($.sql)view=sql-server-ver16),
        seq(POWER, '(', field("float_expression", $.expression), ',', field("y", $.expression), ')', #, POWER),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/radians-transact-optional($.sql)view=sql-server-ver16),
        seq(RADIANS, '(', field("numeric_expression", $.expression), ')', #, RADIANS),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/rand-transact-optional($.sql)view=sql-server-ver16),
        seq(RAND, '(', optional(seq(field("user", $.expression)))4, ')', #, RAND),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/round-transact-optional($.sql)view=sql-server-ver16),
        seq(ROUND, '(', field("numeric_expression", $.expression), ',', field("length", $.expression), optional(seq(field("user", $.expression)))3, ')', #, ROUND),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/sign-transact-optional($.sql)view=sql-server-ver16),
        seq(SIGN, '(', field("numeric_expression", $.expression), ')', #, MATH_SIGN),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/sin-transact-optional($.sql)view=sql-server-ver16),
        seq(SIN, '(', field("float_expression", $.expression), ')', #, SIN),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/sqrt-transact-optional($.sql)view=sql-server-ver16),
        seq(SQRT, '(', field("float_expression", $.expression), ')', #, SQRT),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/square-transact-optional($.sql)view=sql-server-ver16),
        seq(SQUARE, '(', field("float_expression", $.expression), ')', #, SQUARE),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/tan-transact-optional($.sql)view=sql-server-ver16),
        seq(TAN, '(', field("float_expression", $.expression), ')', #, TAN),
        seq(//, L$.ogical, $.functions),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/logical-functions-greatest-transact-optional($.sql)view=azure-sqldw-$.latest),
        seq(GREATEST, '(', $.expression_list_, ')', #, GREATEST),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/logical-functions-least-transact-optional($.sql)view=azure-sqldw-$.latest),
        seq(LEAST, '(', $.expression_list_, ')', #, LEAST),
        seq(//, S$.ecurity, $.functions),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/certencoded-transact-optional($.sql)view=sql-server-ver16),
        seq(CERTENCODED, '(', field("certid", $.expression), ')', #, CERTENCODED),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/certprivatekey-transact-optional($.sql)view=sql-server-ver16),
        seq(CERTPRIVATEKEY, '(', field("certid", $.expression), ',', field("encryption_password", $.expression), optional(seq(field("user", $.expression)))2, ')', #, CERTPRIVATEKEY),
       ,
        seq(CURRENT_USER, #, CURRENT_USER),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/database-principal-id-transact-optional($.sql)view=sql-server-ver16),
        seq(DATABASE_PRINCIPAL_ID, '(', optional(seq(field("user", $.expression)))1, ')', #, DATABASE_PRINCIPAL_ID),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/has-dbaccess-transact-optional($.sql)view=sql-server-ver16),
        seq(HAS_DBACCESS, '(', field("database_name", $.expression), ')', #, HAS_DBACCESS),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/has-perms-by-name-transact-optional($.sql)view=sql-server-ver16),
        seq(HAS_PERMS_BY_NAME, '(', field("securable", $.expression), ',', field("securable_class", $.expression), ',', field("permission", $.expression), optional(seq(field("user", $.expression)))0, ')', #, HAS_PERMS_BY_NAME),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/is-member-transact-optional($.sql)view=sql-server-ver16),
        seq(IS_MEMBER, '(', field("group_or_role", $.expression), ')', #, IS_MEMBER),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/is-rolemember-transact-optional($.sql)view=sql-server-ver16),
        seq(IS_ROLEMEMBER, '(', field("role", $.expression), optional(seq(',', field("database_principal", $.expression))), ')', #, IS_ROLEMEMBER),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/is-srvrolemember-transact-optional($.sql)view=sql-server-ver16),
        seq(IS_SRVROLEMEMBER, '(', field("role", $.expression), optional(seq(',', field("login", $.expression))), ')', #, IS_SRVROLEMEMBER),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/loginproperty-transact-optional($.sql)view=sql-server-ver16),
        seq(LOGINPROPERTY, '(', field("login_name", $.expression), ',', field("property_name", $.expression), ')', #, LOGINPROPERTY),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/original-login-transact-optional($.sql)view=sql-server-ver16),
        seq(ORIGINAL_LOGIN, '(', ')', #, ORIGINAL_LOGIN),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/permissions-transact-optional($.sql)view=sql-server-ver16),
        seq(PERMISSIONS, '(', optional(seq(field("object_id", $.expression), optional(seq(',', field("column", $.expression)))),), ')', #, PERMISSIONS),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/pwdencrypt-transact-optional($.sql)view=sql-server-ver16),
        seq(PWDENCRYPT, '(', field("password", $.expression), ')', #, PWDENCRYPT),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/pwdcompare-transact-optional($.sql)view=sql-server-ver16),
        seq(PWDCOMPARE, '(', field("clear_text_password", $.expression), ',', field("password_hash", $.expression), optional(
        seq(',', field("version", $.expression))
        ), ')', #, PWDCOMPARE),
       ,
        seq(SESSION_USER, #, SESSION_USER),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/sessionproperty-transact-optional($.sql)view=sql-server-ver16),
        seq(SESSIONPROPERTY, '(', field("option_name", $.expression), ')', #, SESSIONPROPERTY),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/suser-id-transact-optional($.sql)view=sql-server-ver16),
        seq(SUSER_ID, '(', optional(seq(field("login", $.expression))), ')', #, SUSER_ID),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/suser-name-transact-optional($.sql)view=sql-server-ver16),
        seq(SUSER_NAME, '(', optional(seq(field("server_user_sid", $.expression))), ')', #, SUSER_SNAME),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/suser-sid-transact-optional($.sql)view=sql-server-ver16),
        seq(SUSER_SID, '(', optional(seq(field("login", $.expression), optional(seq(',', param2, =, $.expression),))), ')', #, SUSER_SID),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/suser-sname-transact-optional($.sql)view=sql-server-ver16),
        seq(SUSER_SNAME, '(', optional(seq(field("server_user_sid", $.expression))), ')', #, SUSER_SNAME),
       ,
        seq(SYSTEM_USER, #, SYSTEM_USER),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/user-transact-optional($.sql)view=sql-server-ver16),
        seq(USER, #, USER),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/user-id-transact-optional($.sql)view=sql-server-ver16),
        seq(USER_ID, '(', optional(seq(field("user", $.expression))), ')', #, USER_ID),
        seq(//, https://learn.microsoft.com/en-us/sql/t-sql/functions/user-name-transact-optional($.sql)view=sql-server-ver16),
        seq(USER_NAME, '(', optional(seq(field("id", $.expression))), ')', #, USER_NAME),
    ),

    xml_data_type_methods: $ => choice(
        $.value_method,
        $.query_method,
        $.exist_method,
        $.modify_metho,
    ),

    // https://learn.microsoft.com/en-us/sql/t-sql/functions/date-bucket-transact-optional($.sql)view=sql-server-ver16
    dateparts_9: $ => choice(
        YEAR,
        YEAR_ABBR,
        QUARTER,
        QUARTER_ABBR,
        MONTH,
        MONTH_ABBR,
        DAY,
        DAY_ABBR,
        WEEK,
        WEEK_ABBR,
        HOUR,
        HOUR_ABBR,
        MINUTE,
        MINUTE_ABBR,
        SECOND,
        SECOND_ABBR,
        MILLISECOND,
        MILLISECOND_ABB,
    ),

    // https://learn.microsoft.com/en-us/sql/t-sql/functions/dateadd-transact-optional($.sql)view=sql-server-ver16
    dateparts_12: $ => choice(
        $.dateparts_9,
        DAYOFYEAR,
        DAYOFYEAR_ABBR,
        MICROSECOND,
        MICROSECOND_ABBR,
        NANOSECOND,
        NANOSECOND_ABB,
    ),

    // https://learn.microsoft.com/en-us/sql/t-sql/functions/datename-transact-optional($.sql)view=sql-server-ver16
    dateparts_15: $ => choice(
        $.dateparts_12,
        WEEKDAY,
        WEEKDAY_ABBR,
        TZOFFSET,
        TZOFFSET_ABBR,
        ISO_WEEK,
        ISO_WEEK_ABB,
    ),

    // https://learn.microsoft.com/en-us/sql/t-sql/functions/datetrunc-transact-optional($.sql)view=sql-server-ver16
    dateparts_datetrunc: $ => choice(
        $.dateparts_9,
        DAYOFYEAR,
        DAYOFYEAR_ABBR,
        MICROSECOND,
        MICROSECOND_ABBR,
        ISO_WEEK,
        ISO_WEEK_ABB,
    ),

    value_method: $ => (
            seq(choice(
        seq(field("loc_id", LOCAL_ID)),
        seq(field("value_id", $.full_column_name)),
        seq(field("eventdata", EVENTDATA), '(', ')'),
        seq(field("query", $.query_method)),
        seq('(', $.subquery, ')')
        ), '.', field("call", $.value_call)),
    ),

    value_call: $ => (
            seq(choice(seq(VALUE, VALUE_SQUARE_BRACKET),), '(', field("xquery", STRING), ',', field("sqltype", STRING), ')'),
    ),

    query_method: $ => (
            seq(choice(seq(field("loc_id", LOCAL_ID), field("value_id", $.full_column_name), '(', $.subquery, ')'),), '.', field("call", $.query_call)),
    ),

    query_call: $ => (
            seq(choice(seq(QUERY, QUERY_SQUARE_BRACKET),), '(', field("xquery", STRING), ')'),
    ),

    exist_method: $ => (
            seq(choice(seq(field("loc_id", LOCAL_ID), field("value_id", $.full_column_name), '(', $.subquery, ')'),), '.', field("call", $.exist_call)),
    ),

    exist_call: $ => (
            seq(choice(seq(EXIST, EXIST_SQUARE_BRACKET),), '(', field("xquery", STRING), ')'),
    ),

    modify_method: $ => (
            seq(choice(seq(field("loc_id", LOCAL_ID), field("value_id", $.full_column_name), '(', $.subquery, ')'),), '.', field("call", $.modify_call)),
    ),

    modify_call: $ => (
            seq(choice(seq(MODIFY, MODIFY_SQUARE_BRACKET),), '(', field("xml_dml", STRING), ')'),
    ),

    hierarchyid_call: $ => choice(
            seq(GETANCESTOR, '(', field("n", $.expression), ')'),
        seq(GETDESCENDANT, '(', child1, =, $.expression, ',', child2, =, $.expression, ')'),
        seq(GETLEVEL, '(', ')'),
        seq(ISDESCENDANTOF, '(', field("parent_", $.expression), ')'),
        seq(GETREPARENTEDVALUE, '(', field("oldroot", $.expression), ',', field("newroot", $.expression), ')'),
        seq(TOSTRING, '(', ')'),
    ),

    hierarchyid_static_method: $ => (
            seq(HIERARCHYID, DOUBLE_COLON, choice(seq(GETROOT, '(', ')', PARSE, '(', field("input", $.expression), ')'),)),
    ),

    nodes_method: $ => (
            seq(choice(seq(field("loc_id", LOCAL_ID), field("value_id", $.full_column_name), '(', $.subquery, ')'),), '.', NODES, '(', field("xquery", STRING), ')'),
    ),

    switch_section: $ => (
            seq(WHEN, $.expression, THEN, $.expression),
    ),

    switch_search_condition_section: $ => (
            seq(WHEN, $.search_condition, THEN, $.expression),
    ),

    as_column_alias: $ => (
            seq(AS?, $.column_alias),
    ),

    as_table_alias: $ => (
            seq(AS?, $.table_alias),
    ),

    table_alias: $ => (
        $.id,
    ),

    // https://msdn.microsoft.com/en-us/library/ms187373.aspx
    with_table_hints: $ => (
            seq(WITH, '(', $.hint, +=, $.table_$.hint, repeat(seq(optional(','), $.hint, +=, $.table_$.hint),), ')'),
    ),

    deprecated_table_hint: $ => (
            seq('(', $.table_hint, ')'),
    ),

    // https://infocenter-archive.sybase.com/help/index.optional($.jsp)topic=/com.sybase.infocenter.dc00938.1502/html/locking/locking103.htm
    // https://infocenter-archive.sybase.com/help/index.optional($.jsp)topic=/com.sybase.dc32300_1250/html/sqlug/sqlug792.htm
    // https://infocenter-archive.sybase.com/help/index.optional($.jsp)topic=/com.sybase.dc36271_36272_36273_36274_1250/html/refman/X35229.htm
    // Legacy hint with no parenthesis and no WITH keyword. Actually conflicts with table alias name except for holdlock which is
    // a reserved keyword in this grammar. We might want a separate sybase grammar variant.
    sybase_legacy_hints: $ => (
        $.sybase_legacy_hint,
    ),

    sybase_legacy_hint: $ => choice(
        HOLDLOCK,
        NOHOLDLOCK,
        READPAST,
        SHARE,
    ),

    // For simplicity, we don't build subsets for INSERT/UPDATE/DELETE/SELECT/MERGE
    // which means the grammar accept slightly more than the what the specification (documentation) says.
    table_hint: $ => choice(
        NOEXPAND,
        seq(INDEX, choice(
        seq('(', $.index_value, repeat(seq(',', $.index_value),), ')'),
        seq('=', '(', $.index_value, ')'),
        seq('=', $.$.index_value, //, $.examples, $.in, $.the, $.doc, $.$.include, $.this, $.syntax)
        ),),
        seq(FORCESEEK, optional(seq('(', $.index_value, '(', $.column_name_list, ')', ')'),)),
        FORCESCAN,
        HOLDLOCK,
        NOLOCK,
        NOWAIT,
        PAGLOCK,
        READCOMMITTED,
        READCOMMITTEDLOCK,
        READPAST,
        READUNCOMMITTED,
        REPEATABLEREAD,
        ROWLOCK,
        SERIALIZABLE,
        SNAPSHOT,
        seq(SPATIAL_WINDOW_MAX_CELLS, '=', DECIMAL),
        TABLOCK,
        TABLOCKX,
        UPDLOCK,
        XLOCK,
        KEEPIDENTITY,
        KEEPDEFAULTS,
        IGNORE_CONSTRAINTS,
        IGNORE_TRIGGER,
    ),

    index_value: $ => choice(
        $.id_,
        DECIMA,
    ),

    column_alias_list: $ => (
            seq('(', $.alias, +=, $.column_$.alias, repeat(seq(',', $.alias, +=, $.column_$.alias),), ')'),
    ),

    column_alias: $ => choice(
        $.id_,
        STRIN,
    ),

    table_value_constructor: $ => (
            seq(VALUES, '(', $.exps, +=, $.expression_list_, ')', repeat(seq(',', '(', $.exps, +=, $.expression_list_, ')'),)),
    ),

    expression_list_: $ => (
            seq($.exp, +=, $.$.expression, repeat(seq(',', $.exp, +=, $.$.expression),)),
    ),

    // https://msdn.microsoft.com/en-us/library/ms189798.aspx
    ranking_windowed_function: $ => choice(
            seq(choice(seq(RANK, DENSE_RANK, ROW_NUMBER),), '(', ')', $.over_clause),
        seq(NTILE, '(', $.expression, ')', $.over_clause),
    ),

    // https://msdn.microsoft.com/en-us/library/ms173454.aspx
    aggregate_windowed_function: $ => choice(
            seq($.agg_func, =, choice(seq(AVG, MAX, MIN, SUM, STDEV, STDEVP, VAR, VARP),), '(', $.all_distinct_expression, ')', optional($.over_clause)),
        seq($.cnt, =, choice(seq(COUNT, COUNT_BIG),), '(', choice(seq('*', $.all_distinct_expression),), ')', optional($.over_clause)),
        seq(CHECKSUM_AGG, '(', $.all_distinct_expression, ')'),
        seq(GROUPING, '(', $.expression, ')'),
        seq(GROUPING_ID, '(', $.expression_list_, ')'),
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/functions/analytic-functions-transact-sql
    analytic_windowed_function: $ => choice(
            seq(choice(seq(FIRST_VALUE, LAST_VALUE),), '(', $.expression, ')', $.over_clause),
        seq(choice(seq(LAG, LEAD),), '(', $.expression, optional(seq(',', $.expression, optional(seq(',', $.expression),))), ')', $.over_clause),
        seq(choice(seq(CUME_DIST, PERCENT_RANK),), '(', ')', OVER, '(', optional(seq(PARTITION, BY, $.expression_list_),), $.order_by_clause, ')'),
        seq(choice(seq(PERCENTILE_CONT, PERCENTILE_DISC),), '(', $.expression, ')', WITHIN, GROUP, '(', $.order_by_clause, ')', OVER, '(', optional(
        seq(PARTITION, BY, $.expression_list_)
        ), ')'),
    ),

    all_distinct_expression: $ => (
            seq(optional(choice(seq(ALL, DISTINCT),)), $.expression),
    ),

    // https://msdn.microsoft.com/en-us/library/ms189461.aspx
    over_clause: $ => (
            seq(OVER, '(', optional(seq(PARTITION, BY, $.expression_list_),), optional($.order_by_clause), optional($.row_or_range_clause), ')'),
    ),

    row_or_range_clause: $ => (
            seq(choice(seq(ROWS, RANGE),), $.window_frame_extent),
    ),

    window_frame_extent: $ => choice(
        $.window_frame_preceding,
        seq(BETWEEN, $.window_frame_bound, AND, $.window_frame_bound),
    ),

    window_frame_bound: $ => choice(
        $.window_frame_preceding,
        $.window_frame_followin,
    ),

    window_frame_preceding: $ => choice(
            seq(UNBOUNDED, PRECEDING),
        seq(DECIMAL, PRECEDING),
        seq(CURRENT, ROW),
    ),

    window_frame_following: $ => choice(
            seq(UNBOUNDED, FOLLOWING),
        seq(DECIMAL, FOLLOWING),
    ),

    create_database_option: $ => choice(
            seq(FILESTREAM, (seq($.database_filestream_option, repeat(seq(',', $.database_filestream_option),)))),
        seq(DEFAULT_LANGUAGE, EQUAL, (#######,)),
        seq(DEFAULT_FULLTEXT_LANGUAGE, EQUAL, (#######,)),
        seq(NESTED_TRIGGERS, EQUAL, (#######,)),
        seq(TRANSFORM_NOISE_WORDS, EQUAL, (#######,)),
        seq(TWO_DIGIT_YEAR_CUTOFF, EQUAL, DECIMAL),
        seq(DB_CHAINING, (#######,)),
        seq(TRUSTWORTHY, (#######,)),
    ),

    database_filestream_option: $ => (
            seq(LR_BRACKET, choice(
        seq((, NON_TRANSACTED_ACCESS, EQUAL, (, OFF, READ_ONLY, FULL))),
            #######
        ), RR_BRACKET),
    ),

    database_file_spec: $ => choice(
        $.file_group,
        $.file_spe,
    ),

    file_group: $ => (
            seq(FILEGROUP, $.id_, optional(seq(CONTAINS, FILESTREAM),), optional(DEFAUL,), optional(seq(CONTAINS, MEMORY_OPTIMIZED_DATA),), $.file_spec, repeat(
        seq(',', $.file_spec)
        ),),
    ),

    file_spec: $ => (
            seq(LR_BRACKET, NAME, EQUAL, choice(seq($.id_, STRING),), optional(','), FILENAME, EQUAL, field("file", STRING), optional(','), optional(
        seq(SIZE, EQUAL, $.file_size, optional(','))
        ), optional(seq(MAXSIZE, EQUAL, choice(seq($.file_size, UNLIMITED),), optional(','))), optional(seq(FILEGROWTH, EQUAL, $.file_size, optional(',')),), RR_BRACKET),
    ),

    // Primitive.
    entity_name: $ => (
            seq(optional(choice(
        seq(field("server", $.id_), '.', field("database", $.id_), '.', field("schema", $.id_), '.'),
        seq(field("database", $.id_), '.', optional(seq(field("schema", $.id_))), '.'),
        seq(field("schema", $.id_), '.')
        ),), field("table", $.id_)),
    ),

    entity_name_for_azure_dw: $ => choice(
            seq(field("schema", $.id_)),
        seq(field("schema", $.id_), '.', field("object_name", $.id_)),
    ),

    entity_name_for_parallel_dw: $ => choice(
            seq(field("schema_database", $.id_)),
        seq(field("schema", $.id_), '.', field("object_name", $.id_)),
    ),

    full_table_name: $ => (
            seq(optional(choice(
        seq(field("linkedServer", $.id_), '.', '.', field("schema", $.id_), '.'),
        seq(field("server", $.id_), '.', field("database", $.id_), '.', field("schema", $.id_), '.'),
        seq(field("database", $.id_), '.', field("schema", optional($.id_)), '.'),
        seq(field("schema", $.id_), '.')
        ),), field("table", $.id_)),
    ),

    table_name: $ => (
            seq(optional(choice(seq(field("database", $.id_), '.', field("schema", optional($.id_)), '.', field("schema", $.id_), '.'),)), choice(
        seq(field("table", $.id_)),
        seq(field("blocking_hierarchy", BLOCKING_HIERARCHY))
        ),),
    ),

    simple_name: $ => (
            seq(optional(seq(field("schema", $.id_), '.'),), field("name", $.id_)),
    ),

    func_proc_name_schema: $ => (
            seq(optional(seq((seq(field("schema", $.id_))), '.'),), field("procedure", $.id_)),
    ),

    func_proc_name_database_schema: $ => choice(
            seq(field("database", optional($.id_)), '.', field("schema", optional($.id_)), '.', field("procedure", $.id_)),
        $.func_proc_name_schem,
    ),

    func_proc_name_server_database_schema: $ => choice(
            seq(field("server", optional($.id_)), '.', field("database", optional($.id_)), '.', field("schema", optional($.id_)), '.', field("procedure", $.id_)),
        $.func_proc_name_database_schem,
    ),

    ddl_object: $ => choice(
        $.full_table_name,
        LOCAL_I,
    ),

    full_column_name: $ => (
            seq(optional(seq(choice(seq(DELETED, INSERTED, $.full_table_name),), '.'),), choice(
        seq(field("column_name", $.id_)),
            #######
        ),),
    ),

    column_name_list_with_order: $ => (
            seq($.id_, (ASC, |, DESC)?, repeat(seq(',', $.id_, optional(choice(seq(ASC, DESC),))))),
    ),

    //For some reason, sql server allows any number of prefixes:  Here, h is the column: a.b.c.d.e.f.g.h
    insert_column_name_list: $ => (
            seq($.col, +=, insert_$.column_id, repeat(seq(',', $.col, +=, insert_$.column_id),)),
    ),

    insert_column_id: $ => (
            seq(repeat(seq($.ignore, +=, optional($.id_), '.'),), $.id_),
    ),

    column_name_list: $ => (
            seq($.col, +=, $.id_, repeat(seq(',', $.col, +=, $.id_),)),
    ),

    cursor_name: $ => choice(
        $.id_,
        LOCAL_I,
    ),

    on_off: $ => choice(
        ON,
        OF,
    ),

    clustered: $ => choice(
        CLUSTERED,
        NONCLUSTERE,
    ),

    null_notnull: $ => (
            seq(NOT?, NULL$._),
    ),

    scalar_function_name: $ => choice(
        $.func_proc_name_server_database_schema,
        RIGHT,
        LEFT,
        BINARY_CHECKSUM,
        CHECKSU,
    ),

    begin_conversation_timer: $ => (
            seq(BEGIN, CONVERSATION, TIMER, '(', LOCAL_ID, ')', TIMEOUT, '=', $.time, optional(';')),
    ),

    begin_conversation_dialog: $ => (
            seq(BEGIN, DIALOG, optional(CONVERSATIO,), field("dialog_handle", LOCAL_ID), FROM, SERVICE, field("initiator_service_name", $.service_name), TO, SERVICE, $.target_service_name, =),
        seq($.service_name, optional(seq(',', field("service_broker_guid", STRING))), ON, CONTRACT, $.contract_name, optional(choice(
        seq(WITH, ((RELATED_CONVERSATION, RELATED_CONVERSATION_GROUP), '=', LOCAL_ID, optional(','))?, (),
        seq(LIFETIME, '=', (DECIMAL, LOCAL_ID), optional(',')),
        seq()?, optional(seq(ENCRYPTION, '=', $.on_off),))
        ),), optional(';')),
    ),

    contract_name: $ => (
        ########,
    ),

    service_name: $ => (
        ########,
    ),

    end_conversation: $ => (
            seq(END, CONVERSATION, field("conversation_handle", LOCAL_ID), optional(';'), optional(
        seq(WITH, optional(choice(
        seq(ERROR, '=', $.faliure_code, =, (LOCAL_ID, STRING), DESCRIPTION, '=', $.failure_text, =, choice(
                    LOCAL_ID,
                    STRIN
                ),)
            ),), CLEANUP?)
        ),),
    ),

    waitfor_conversation: $ => (
            seq(WAITFOR?, '(', $.get_conversation, ')', optional(seq(optional(','), TIMEOUT, field("timeout", $.time))), optional(';')),
    ),

    get_conversation: $ => (
            seq(GET, CONVERSATION, GROUP, $.conversation_group_id, =, choice(seq(STRING, LOCAL_ID),), FROM, field("queue", $.queue_id), optional(';')),
    ),

    queue_id: $ => choice(
        (seq(field("database_name", $.id_), '.', field("schema_name", $.id_), '.', field("name", $.id_))),
        $.id,
    ),

    send_conversation: $ => (
            seq(SEND, ON, CONVERSATION, $.conversation_handle, =, (STRING, |, LOCAL_ID), MESSAGE, TYPE, field("message_type_name", $.expression), optional(
        seq('(', $.message_body_expression, =, choice(seq(STRING, LOCAL_ID),), ')')
        ), optional(';')),
    ),

    // https://msdn.microsoft.com/en-us/library/ms187752.aspx
    // TODO: implement runtime check or add new tokens.

    data_type: $ => choice(
            seq($.scaled, =, choice(seq(VARCHAR, NVARCHAR, BINARY_KEYWORD, VARBINARY_KEYWORD, SQUARE_BRACKET_ID),), '(', MAX, ')'),
        seq(field("ext_type", $.id_), '(', field("scale", DECIMAL), ',', field("prec", DECIMAL), ')'),
        seq(field("ext_type", $.id_), '(', field("scale", DECIMAL), ')'),
        seq(field("ext_type", $.id_), IDENTITY, optional(seq('(', field("seed", DECIMAL), ',', field("inc", DECIMAL), ')'),)),
        seq(field("double_prec", DOUBLE), PRECISION?),
        seq(field("unscaled_type", $.id_)),
    ),

    // https://msdn.microsoft.com/en-us/library/ms179899.aspx
    constant: $ => choice(
            seq(STRING, $.datetime, $.or, $.uniqueidentifier),
        BINARY,
        seq(optional('-'), choice(seq(DECIMAL, REAL, FLOAT),), ),
        seq(optional('-'), $.dollar, =, '$', optional(choice(seq('-repeat1(', ')'),)), choice(seq(DECIMAL, FLOAT),)),
        $.paramete,
    ),

    // To reduce ambiguity, -X is considered as an application of unary operator
    primitive_constant: $ => choice(
            seq(STRING, $.datetime, $.or, $.uniqueidentifier),
        BINARY,
        seq(choice(seq(DECIMAL, REAL, FLOAT),), ),
        seq($.dollar, =, '$', optional(choice(seq('-repeat1(', ')'),)), choice(seq(DECIMAL, FLOAT),)),
        $.paramete,
    ),

    keyword: $ => choice(
        ABORT,
        ABSOLUTE,
        ACCENT_SENSITIVITY,
        ACCESS,
        ACTION,
        ACTIVATION,
        ACTIVE,
        seq(ADD, //, ?),
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
        ZON,
       ,
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
        XACT_STAT,
       ,
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
        TA,
       ,
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
        YEA,
       ,
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
        WEEKDA,
       ,
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
        WEEKDAY_ABB,
       ,
        SP_EXECUTESQ,
       ,
        VARCHAR,
        NVARCHAR,
        PRECISION,
        FILESTREAM_O,
    ),

    // https://msdn.microsoft.com/en-us/library/ms175874.aspx
    id_: $ => choice(
        ID,
        TEMP_ID,
        DOUBLE_QUOTE_ID,
        DOUBLE_QUOTE_BLANK,
        SQUARE_BRACKET_ID,
        $.keyword,
        RA,
    ),

    simple_id: $ => (
        I,
    ),

    id_or_string: $ => choice(
        $.id_,
        STRIN,
    ),

    // https://msdn.microsoft.com/en-us/library/ms188074.aspx
    // Spaces are allowed for comparison operators.
    comparison_operator: $ => choice(
        '=',
        '>',
        '<',
        seq('<', '='),
        seq('>', '='),
        seq('<', '>'),
        seq('!', '='),
        seq('!', '>'),
        seq('!', '<'),
    ),

    assignment_operator: $ => choice(
        '+=',
        '-=',
        '*=',
        '/=',
        '%=',
        '&=',
        '^=',
        '|=',
    ),

    file_size: $ => (
            seq(DECIMAL, optional(choice(seq(KB, MB, GB, TB, '%'),))),
    ),

    // ***************************************************************************************************************


    // MARKER

    table_source_item: $ => choice(
      seq($.full_table_name, $.deprecated_table_hint, $.as_table_alias), // this is currently allowed
      seq(
        $.full_table_name,
        optional($.as_table_alias),
        optional(choice($.with_table_hints, $.deprecated_table_hint, $.sybase_legacy_hints))
      ),
      seq($.rowset_function, optional($.as_table_alias)),
      seq('(', $.derived_table, ')', optional(seq($.as_table_alias, optional($.column_alias_list)))),
      seq($.change_table, optional($.as_table_alias)),
      seq($.nodes_method, optional($.as_table_alias, optional(column_alias_list))),
      seq($.function_call, optional($.as_table_alias, optional(column_alias_list))),
      seq(field("loc_id", LOCAL_ID), optional($.as_table_alias)),
      seq(field("loc_id_call", LOCAL_ID), '.', field("loc_fcall", $.function_call), optional(seq($.as_table_alias, optional($.column_alias_list)))),
      $.open_xml,
      $.open_json,
      seq(DOUBLE_COLON, field("oldstyle_fcall", $.function_call), optional($.as_table_alias)), // Build-in function (old syntax)
      seq('(', $.table_source, ')'),
    ),

    open_xml: $ => seq(
      OPENXML,
      '(',
      $.expression,
      ',',
      $.expression,
      optional(seq(',', $.expression)),
      ')',
      optional(seq(
        WITH,
        '(',
        $.schema_declaration,
        ')'
      )),
      optional($.as_table_alias)
    ),

    open_json: $ => seq(
      OPENJSON,
      '(',
      $.expression,
      optional(seq(',', $.expression)),
      ')',
      optional(seq(
        WITH,
        '(',
        $.json_declaration,
        ')'
      )),
      optional($.as_table_alias)
    ),

    json_declaration: $ => seq(
      field("json_col", $.json_column_declaration),
      repeat(seq(',', field("json_col", $.json_column_declaration)))
    ),

    json_column_declaration: $ => seq(
      $.column_declaration,
      optional(seq(AS, JSON))
    ),

    schema_declaration: $ => seq(
      field("xml_col", $.column_declaration),
      repeat(seq(',', field("xml_col", $.column_declaration)))
    ),

    column_declaration: $ => seq(
      $.id_,
      $.data_type,
      optional(STRING)
    ),

    change_table: $ => choice(
      $.change_table_changes,
      $.change_table_version
    ),

    change_table_changes: $ => seq(
      CHANGETABLE,
      '(',
      CHANGES,
      field("changetable", $.table_name),
      ',',
      field("changesid", choice(NULL_, DECIMAL, LOCAL_ID)),
      ')'
    ),

    change_table_version: $ => seq(
      CHANGETABLE,
      '(',
      VERSION,
      field("versiontable", $.table_name),
      ',',
      field("pk_columns", $.full_column_name_list),
      ',',
      field("pk_values", $.select_list),
      ')'
    ),

    // https://msdn.microsoft.com/en-us/library/ms191472.aspx
    join_part: $ => choice(
      $.join_on,
      $.cross_join,
      $.apply_,
      $.pivot,
      $.unpivot
    ),

    join_on: $ => seq(
      optional(choice(
        field("inner", INNER),
        seq(
          field("join_type", choice(LEFT, RIGHT, FULL)),
          optional(field("outer", OUTER))
        )
      )),
      optional(field("join_hint", choice(LOOP, HASH, MERGE, REMOTE))),
      JOIN,
      field("source", $.table_source),
      ON,
      field("cond", $.search_condition)
    ),

    cross_join: $ => seq(
      CROSS,
      JOIN,
      $.table_source_item
    ),

    apply_: $ => seq(
      field("apply_style", choice(CROSS, OUTER)),
      APPLY,
      field("source", $.table_source_item)
    ),

    pivot: $ => seq(
      PIVOT,
      $.pivot_clause,
      optional($.as_table_alias)
    ),

    unpivot: $ => seq(
      UNPIVOT,
      $.unpivot_clause,
      optional($.as_table_alias)
    ),

    pivot_clause: $ => seq(
      '(',
      $.aggregate_windowed_function,
      FOR,
      $.full_column_name,
      IN,
      $.column_alias_list,
      ')'
    ),

    unpivot_clause: $ => seq(
      '(',
      field("unpivot_exp", $.expression),
      FOR,
      $.full_column_name,
      IN,
      '(',
      $.full_column_name_list,
      ')',
      ')'
    ),

    full_column_name_list: $ => seq(
      field("column", $.full_column_name),
      repeat(seq(',', field("column", $.full_column_name)))
    ),

    rowset_function: $ => choice(
      seq(
        OPENROWSET,
        '(',
        field("provider_name", STRING),
        ',',
        field("connection_string", STRING),
        ',',
        field("sql", STRING),
        ')'
      ),
      seq(
        OPENROWSET,
        '(',
        BULK,
        field("data_file", STRING),
        ',',
        choice(
          seq($.bulk_option, repeat(seq(',', $.bulk_option))),
          $.id_
        ),
        ')'
      )
    ),

    bulk_option: $ => seq(
      $.id_,
      '=',
      field("bulk_option_value", choice(DECIMAL, STRING))
    ),

    derived_table: $ => choice(
      $.subquery,
      seq('(', $.subquery, repeat(seq(UNION, ALL, $.subquery)), ')'),
      $.table_value_constructor,
      seq('(', $.table_value_constructor, ')')
    ),

    function_call: $ => choice(
      $.ranking_windowed_function,
      $.aggregate_windowed_function,
      $.analytic_windowed_function,
      $.built_in_functions,
      seq($.scalar_function_name, '(', optional($.expression_list_), ')'),
      $.freetext_function,
      $.partition_function,
      $.hierarchyid_static_method,
    ),

    partition_function: $ => seq(
      optional(seq(field("database", $.id_), '.')),
      $.DOLLAR_PARTITION,
      '.',
      field("func_name", $.id_),
      '(',
      $.expression,
      ')'
    ),

    freetext_function: $ => choice(
      seq(
        choice(CONTAINSTABLE, FREETEXTTABLE),
        '(',
        $.table_name,
        ',',
        choice(
          $.full_column_name,
          seq('(', $.full_column_name, repeat(seq(',', $.full_column_name)), ')'),
          '*'
        ),
        ',',
        $.expression,
        optional(seq(',', LANGUAGE, $.expression)),
        optional(seq(',', $.expression)),
        ')'
      ),
      seq(
        choice(SEMANTICSIMILARITYTABLE, SEMANTICKEYPHRASETABLE),
        '(',
        $.table_name,
        ',',
        choice(
          $.full_column_name,
          seq('(', $.full_column_name, repeat(seq(',', $.full_column_name)), ')'),
          '*'
        ),
        ',',
        $.expression,
        ')'
      ),
      seq(
        SEMANTICSIMILARITYDETAILSTABLE,
        '(',
        $.table_name,
        ',',
        $.full_column_name,
        ',',
        $.expression,
        ',',
        $.full_column_name,
        ',',
        $.expression,
        ')'
      )
    ),

    freetext_predicate: $ => choice(
      seq(
        CONTAINS,
        '(',
        choice(
          $.full_column_name,
          seq('(', $.full_column_name, repeat(seq(',', $.full_column_name)), ')'),
          '*',
          seq(PROPERTY, '(', $.full_column_name, ',', $.expression, ')')
        ),
        ',',
        $.expression,
        ')'
      ),
      seq(
        FREETEXT,
        '(',
        $.table_name,
        ",",
        choice(
          $.full_column_name,
          seq('(', $.full_column_name, repeat(seq(',', $.full_column_name)), ')'),
          '*'
        ),
        ',',
        $.expression,
        optional(seq(',', LANGUAGE, $.expression)),
        ')'
      ),
    ),

    json_key_value: $ => seq(
      field("json_key_name", $.expression),
      ":",
      field("value_expression", $.expression),
    ),

    json_null_clause: $ => seq(
      choice(ABSENT, NULL_), ON, NULL_
    ),

    built_in_functions: $ => choice(
      // Metadata functions
      seq(APP_NAME, '(', ')'),
      seq(APPLOCK_MODE, '(', field("database_principal", $.expression), ',', field("resource_name", $.expression), ',', field("lock_owner", $.expression), ')'),
      seq(APPLOCK_TEST, '(', field("database_principal", $.expression), ',', field("resource_name", $.expression), ',', field("lock_mode", $.expression), ',', field("lock_owner", $.expression), ')'),
      seq(ASSEMBLYPROPERTY, '(', field("assembly_name", $.expression), ',', field("property_name", $.expression), ')'),
      seq(COL_LENGTH, '(', field("table", $.expression), ',', field("column", $.expression), ')'),
      seq(COL_NAME, '(', field("table_id", $.expression), ',', field("column_id", $.expression), ')'),
      seq(COLUMNPROPERTY, '(', field("id", $.expression), ',', field("column", $.expression), ',', field("property", $.expression), ')'),
      seq(DATABASEPROPERTYEX, '(', field("database", $.expression), ',', field("property", $.expression), ')'),
      seq(DB_ID, '(', optional(field("database_name", $.expression)), ')'),
      seq(DB_NAME, '(', optional(field("database_id", $.expression)), ')'),
      seq(FILE_ID, '(', field("file_name", $.expression), ')'),
      seq(FILE_IDEX, '(', field("file_name", $.expression), ')'),
      seq(FILE_NAME, '(', field("file_id", $.expression), ')'),
      seq(FILEGROUP_ID, '(', field("filegroup_name", $.expression), ')'),
      seq(FILEGROUP_NAME, '(', field("filegroup_id", $.expression), ')'),
      seq(FILEGROUPPROPERTY, '(', field("filegroup_name", $.expression), ',', field("property", $.expression), ')'),
      seq(FILEPROPERTY, '(', field("file_name", $.expression), ',', field("property", $.expression), ')'),
      seq(FILEPROPERTYEX, '(', field("name", $.expression), ',', field("property", $.expression), ')'),
      seq(FULLTEXTCATALOGPROPERTY, '(', field("catalog_name", $.expression), ',', field("property", $.expression), ')'),
      seq(FULLTEXTSERVICEPROPERTY, '(', field("property", $.expression), ')'),
      seq(INDEX_COL, '(', field("table_or_view_name", $.expression), ',', field("index_id", $.expression), ',', field("key_id", $.expression), ')'),
      seq(INDEXKEY_PROPERTY, '(', field("object_id", $.expression), ',', field("index_id", $.expression), ',', field("key_id", $.expression), ',', field("property", $.expression), ')'),
      seq(INDEXPROPERTY, '(', field("object_id", $.expression), ',', field("index_or_statistics_name", $.expression), ',', field("property", $.expression), ')'),
      seq(NEXT, VALUE, FOR, field("sequence_name", $.table_name), optional(seq(OVER, '(', $.order_by_clause, ')'))),
      seq(OBJECT_DEFINITION, '(', field("object_id", $.expression), ')'),
      seq(OBJECT_ID, '(', field("object_name", $.expression), optional(seq(',', field("object_type", $.expression))), ')'),
      seq(OBJECT_NAME, '(', field("object_id", $.expression), optional(seq(',', field("database_id", $.expression))), ')'),
      seq(OBJECT_SCHEMA_NAME, '(', field("object_id", $.expression), optional(seq(',', field("database_id", $.expression))), ')'),
      seq(OBJECTPROPERTY, '(', field("id", $.expression), ',', field("property", $.expression), ')'),
      seq(OBJECTPROPERTYEX, '(', field("id", $.expression), ',', field("property", $.expression), ')'),
      seq(ORIGINAL_DB_NAME, '(', ')'),
      seq(PARSENAME, '(', field("object_name", $.expression), ',', field("object_piece", $.expression), ')'),
      seq(SCHEMA_ID, '(', optional(field("schema_name", $.expression)), ')'),
      seq(SCHEMA_NAME, '(', optional(field("schema_id", $.expression)), ')'),
      seq(SCOPE_IDENTITY, '(', ')'),
      seq(SERVERPROPERTY, '(', field("property", $.expression), ')'),
      seq(STATS_DATE, '(', field("object_id", $.expression), ',', field("stats_id", $.expression), ')'),
      seq(TYPE_ID, '(', field("type_name", $.expression), ')'),
      seq(TYPE_NAME, '(', field("type_id", $.expression), ')'),
      seq(TYPEPROPERTY, '(', field("type", $.expression), ',', field("property", $.expression), ')'),

      // String functions
      seq(ASCII, '(', field("character_expression", $.expression), ')'),
      seq(CHAR, '(', field("integer_expression", $.expression), ')'),
      seq(CHARINDEX, '(', field("expressionToFind", $.expression), ',', field("expressionToSearch", $.expression), optional(seq(',', field("start_location", $.expression))), ')'),
      seq(CONCAT, '(', field("string_value_1", $.expression), ',', field("string_value_2", $.expression), repeat(seq(',', field("string_value_n", $.expression))), ')'),
      seq(CONCAT_WS, '(', field("separator", $.expression), ',', field("argument_1", $.expression), ',', field("argument_2", $.expression), repeat(seq(',', field("argument_n", $.expression))), ')'),
      seq(DIFFERENCE, '(', field("character_expression_1", $.expression), ',', field("character_expression_2", $.expression), ')'),
      seq(FORMAT, '(', field("value", $.expression), ',', field("format", $.expression), optional(seq(',', field("culture", $.expression))), ')'),
      seq(LEFT, '(', field("character_expression", $.expression), ',', field("integer_expression", $.expression), ')'),
      seq(LEN, '(', field("string_expression", $.expression), ')'),
      seq(LOWER, '(', field("character_expression", $.expression), ')'),
      seq(LTRIM, '(', field("character_expression", $.expression), ')'),
      seq(NCHAR, '(', field("integer_expression", $.expression), ')'),
      seq(PATINDEX, '(', field("pattern", $.expression), ',', field("string_expression", $.expression), ')'),
      seq(QUOTENAME, '(', field("character_string", $.expression), optional(seq(',', field("quote_character", $.expression))), ')'),
      seq(REPLACE, '(', field("input", $.expression), ',', field("replacing", $.expression), ',', field("with", $.expression), ')'),
      seq(REPLICATE, '(', field("string_expression", $.expression), ',', field("integer_expression", $.expression), ')'),
      seq(REVERSE, '(', field("string_expression", $.expression), ')'),
      seq(RIGHT, '(', field("character_expression", $.expression), ',', field("integer_expression", $.expression), ')'),
      seq(RTRIM, '(', field("character_expression", $.expression), ')'),
      seq(SOUNDEX, '(', field("character_expression", $.expression), ')'),
      seq(SPACE_KEYWORD, '(', field("integer_expression", $.expression), ')'),
      seq(STR, '(', field("float_expression", $.expression), optional(seq(',', field("length_expression", $.expression), optional(seq(',', field("decimal", $.expression))))), ')'),
      seq(STRING_AGG, '(', field("expr", $.expression), ',', field("separator", $.expression), ')', optional(seq(WITHIN, GROUP, '(', $.order_by_clause, ')'))),
      seq(STRING_ESCAPE, '(', field("text_", $.expression), ',', field("type_", $.expression), ')'),
      seq(STUFF, '(', field("str", $.expression), ',', field("from", $.expression), ',', field("to", $.expression), ',', field("str_with", $.expression), ')'),
      seq(SUBSTRING, '(', field("string_expression", $.expression), ',', field("start_", $.expression), ',', field("length", $.expression), ')'),
      seq(TRANSLATE, '(', field("inputString", $.expression), ',', field("characters", $.expression), ',', field("translations", $.expression), ')'),
      seq(TRIM, '(', optional(seq(field("characters", $.expression), FROM)), field("string_", $.expression), ')'),
      seq(UNICODE, '(', field("ncharacter_expression", $.expression), ')'),
      seq(UPPER, '(', field("character_expression", $.expression), ')'),

      // System functions
      seq(BINARY_CHECKSUM, '(', choice('*', seq($.expression, repeat(seq(',', $.expression)))), ')'),
      seq(CHECKSUM, '(', choice('*', seq($.expression, repeat(seq(',', $.expression)))), ')'),
      seq(COMPRESS, '(', field("expr", $.expression), ')'),
      seq(CONNECTIONPROPERTY, '(', field("property", STRING), ')'),
      seq(CONTEXT_INFO, '(', ')'),
      seq(CURRENT_REQUEST_ID, '(', ')'),
      seq(CURRENT_TRANSACTION_ID, '(', ')'),
      seq(DECOMPRESS, '(', field("expr", $.expression), ')'),
      seq(ERROR_LINE, '(', ')'),
      seq(ERROR_MESSAGE, '(', ')'),
      seq(ERROR_NUMBER, '(', ')'),
      seq(ERROR_PROCEDURE, '(', ')'),
      seq(ERROR_SEVERITY, '(', ')'),
      seq(ERROR_STATE, '(', ')'),
      seq(FORMATMESSAGE, '(', choice(field("msg_number", DECIMAL), field("msg_string", STRING), field("msg_variable", LOCAL_ID)), ',', $.expression, repeat(seq(',', $.expression)), ')'),
      seq(GET_FILESTREAM_TRANSACTION_CONTEXT, '(', ')'),
      seq(GETANSINULL, '(', optional(field("database", STRING)), ')'),
      seq(HOST_ID, '(', ')'),
      seq(HOST_NAME, '(', ')'),
      seq(ISNULL, '(', field("left", $.expression), ',', field("right", $.expression), ')'),
      seq(ISNUMERIC, '(', $.expression, ')'),
      seq(MIN_ACTIVE_ROWVERSION, '(', ')'),
      seq(NEWID, '(', ')'),
      seq(NEWSEQUENTIALID, '(', ')'),
      seq(ROWCOUNT_BIG, '(', ')'),
      seq(SESSION_CONTEXT, '(', field("key", STRING), ')'),
      seq(XACT_STATE, '(', ')'),
      seq(CAST, '(', $.expression, AS, $.data_type, ')'),
      seq(TRY_CAST, '(', $.expression, AS, $.data_type, ')'),
      seq(CONVERT, '(', field("convert_data_type", $.data_type), ',', field("convert_expression", $.expression), optional(seq(',', field("style", $.expression))), ')'),
      seq(COALESCE, '(', $.expression_list_, ')'),

      // Cursor functions
      CURSOR_ROWS,
      FETCH_STATUS,
      seq(CURSOR_STATUS, '(', field("scope", STRING), ',', field("cursor", $.expression), ')'),

      // Cryptographic functions
      seq(CERT_ID, '(', field("cert_name", $.expression), ')'),

      // Data type functions
      seq(DATALENGTH, '(', $.expression, ')'),
      seq(IDENT_CURRENT, '(', field("table_or_view", $.expression), ')'),
      seq(IDENT_INCR, '(', field("table_or_view", $.expression), ')'),
      seq(IDENT_SEED, '(', field("table_or_view", $.expression), ')'),
      seq(IDENTITY, '(', field("datatype", $.data_type), optional(seq(',', field("seed", DECIMAL), ',', field("increment", DECIMAL))), ')'),
      seq(SQL_VARIANT_PROPERTY, '(', field("expr", $.expression), ',', field("property", STRING), ')'),

      // Date functions
      seq(CURRENT_DATE, '(', ')'),
      CURRENT_TIMESTAMP,
      seq(CURRENT_TIMEZONE, '(', ')'),
      seq(CURRENT_TIMEZONE_ID, '(', ')'),
      seq(DATE_BUCKET, '(', field("datepart", $.dateparts_9), ',', field("number", $.expression), ',', field("date", $.expression), optional(seq(',', field("origin", $.expression))), ')'),
      seq(DATEADD, '(', field("datepart", $.dateparts_12), ',', field("number", $.expression), ',', field("date", $.expression), ')'),
      seq(DATEDIFF, '(', field("datepart", $.dateparts_12), ',', field("date_first", $.expression), ',', field("date_second", $.expression), ')'),
      seq(DATEDIFF_BIG, '(', field("datepart", $.dateparts_12), ',', field("startdate", $.expression), ',', field("enddate", $.expression), ')'),
      seq(DATEFROMPARTS, '(', field("year", $.expression), ',', field("month", $.expression), ',', field("day", $.expression), ')'),
      seq(DATENAME, '(', field("datepart", $.dateparts_15), ',', field("date", $.expression), ')'),
      seq(DATEPART, '(', field("datepart", $.dateparts_15), ',', field("date", $.expression), ')'),
      seq(DATETIME2FROMPARTS, '(', field("year", $.expression), ',', field("month", $.expression), ',', field("day", $.expression), ',', field("hour", $.expression), ',', field("minute", $.expression), ',', field("seconds", $.expression), ',', field("fractions", $.expression), ',', field("precision", $.expression), ')'),
      seq(DATETIMEFROMPARTS, '(', field("year", $.expression), ',', field("month", $.expression), ',', field("day", $.expression), ',', field("hour", $.expression), ',', field("minute", $.expression), ',', field("seconds", $.expression), ',', field("milliseconds", $.expression), ')'),
      seq(DATETIMEOFFSETFROMPARTS, '(', field("year", $.expression), ',', field("month", $.expression), ',', field("day", $.expression), ',', field("hour", $.expression), ',', field("minute", $.expression), ',', field("seconds", $.expression), ',', field("fractions", $.expression), ',', field("hour_offset", $.expression), ',', field("minute_offset", $.expression), ',', field("precision", DECIMAL), ')'),
      seq(DATETRUNC, '(', field("datepart", $.dateparts_datetrunc), ',', field("date", $.expression), ')'),
      seq(DAY, '(', field("date", $.expression), ')'),
      seq(EOMONTH, '(', field("start_date", $.expression), optional(seq(',', field("month_to_add", $.expression))), ')'),
      seq(GETDATE, '(', ')'),
      seq(GETUTCDATE, '(', ')'),
      seq(ISDATE, '(', $.expression, ')'),
      seq(MONTH, '(', field("date", $.expression), ')'),
      seq(SMALLDATETIMEFROMPARTS, '(', field("year", $.expression), ',', field("month", $.expression), ',', field("day", $.expression), ',', field("hour", $.expression), ',', field("minute", $.expression), ')'),
      seq(SWITCHOFFSET, '(', field("datetimeoffset_expression", $.expression), ',', field("timezoneoffset_expression", $.expression), ')'),
      seq(SYSDATETIME, '(', ')'),
      seq(SYSDATETIMEOFFSET, '(', ')'),
      seq(SYSUTCDATETIME, '(', ')'),
      seq(TIMEFROMPARTS, '(', field("hour", $.expression), ',', field("minute", $.expression), ',', field("seconds", $.expression), ',', field("fractions", $.expression), ',', field("precision", DECIMAL), ')'),
      seq(TODATETIMEOFFSET, '(', field("datetime_expression", $.expression), ',', field("timezoneoffset_expression", $.expression), ')'),
      seq(YEAR, '(', field("date", $.expression), ')'),
      seq(IDENTITY, '(', field("data_type", $.data_type), optional(seq(',', field("seed", DECIMAL))), optional(seq(',', field("increment", DECIMAL))), ')'),
      seq(NULLIF, '(', field("left", $.expression), ',', field("right", $.expression), ')'),
      seq(PARSE, '(', field("str", $.expression), AS, $.data_type, optional(seq(USING, field("culture", $.expression))), ')'),
      $.xml_data_type_methods,
      seq(IIF, '(', field("cond", $.search_condition), ',', field("left", $.expression), ',', field("right", $.expression), ')'),

      // JSON functions
      seq(ISJSON, '(', field("json_expr", $.expression), optional(seq(',', field("json_type_constraint", $.expression))), ')'),
      seq(JSON_OBJECT, '(', optional(seq(field("key_value", $.json_key_value), repeat(seq(',', field("key_value", $.json_key_value))))), optional($.json_null_clause), ')'),
      seq(JSON_ARRAY, '(', optional($.expression_list_), optional($.json_null_clause), ')'),
      seq(JSON_VALUE, '(', field("expr", $.expression), ',', field("path", $.expression), ')'),
      seq(JSON_QUERY, '(', field("expr", $.expression), optional(seq(',', field("path", $.expression))), ')'),
      seq(JSON_MODIFY, '(', field("expr", $.expression), ',', field("path", $.expression), ',', field("new_value", $.expression), ')'),
      seq(JSON_PATH_EXISTS, '(', field("value_expression", $.expression), ',', field("sql_json_path", $.expression), ')'),

      // Math functions
      seq(ABS, '(', field("numeric_expression", $.expression), ')'),
      seq(ACOS, '(', field("float_expression", $.expression), ')'),
      seq(ASIN, '(', field("float_expression", $.expression), ')'),
      seq(ATAN, '(', field("float_expression", $.expression), ')'),
      seq(ATN2, '(', field("float_expression", $.expression), ',', field("float_expression", $.expression), ')'),
      seq(CEILING, '(', field("numeric_expression", $.expression), ')'),
      seq(COS, '(', field("float_expression", $.expression), ')'),
      seq(COT, '(', field("float_expression", $.expression), ')'),
      seq(DEGREES, '(', field("numeric_expression", $.expression), ')'),
      seq(EXP, '(', field("float_expression", $.expression), ')'),
      seq(FLOOR, '(', field("numeric_expression", $.expression), ')'),
      seq(LOG, '(', field("float_expression", $.expression), optional(seq(',', field("base", $.expression))), ')'),
      seq(LOG10, '(', field("float_expression", $.expression), ')'),
      seq(PI, '(', ')'),
      seq(POWER, '(', field("float_expression", $.expression), ',', field("y", $.expression), ')'),
      seq(RADIANS, '(', field("numeric_expression", $.expression), ')'),
      seq(RAND, '(', optional(field("seed", $.expression)), ')'),
      seq(ROUND, '(', field("numeric_expression", $.expression), ',', field("length", $.expression), optional(seq(',', field("function", $.expression))), ')'),
      seq(SIGN, '(', field("numeric_expression", $.expression), ')'),
      seq(SIN, '(', field("float_expression", $.expression), ')'),
      seq(SQRT, '(', field("float_expression", $.expression), ')'),
      seq(SQUARE, '(', field("float_expression", $.expression), ')'),
      seq(TAN, '(', field("float_expression", $.expression), ')'),

      // Logical functions
      seq(GREATEST, '(', $.expression_list_, ')'),
      seq(LEAST, '(', $.expression_list_, ')'),

      // Security functions
      seq(CERTENCODED, '(', field("certid", $.expression), ')'),
      seq(CERTPRIVATEKEY, '(', field("certid", $.expression), ',', field("encryption_password", $.expression), optional(seq(',', field("decryption_pasword", $.expression))), ')'),
      CURRENT_USER,
      seq(DATABASE_PRINCIPAL_ID, '(', optional(field("principal_name", $.expression)), ')'),
      seq(HAS_DBACCESS, '(', field("database_name", $.expression), ')'),
      seq(HAS_PERMS_BY_NAME, '(', field("securable", $.expression), ',', field("securable_class", $.expression), ',', field("permission", $.expression), optional(seq(',', field("sub_securable", $.expression), optional(seq(',', field("sub_securable_class", $.expression))))), ')'),
      seq(IS_MEMBER, '(', field("group_or_role", $.expression), ')'),
      seq(IS_ROLEMEMBER, '(', field("role", $.expression), optional(seq(',', field("database_principal", $.expression))), ')'),
      seq(IS_SRVROLEMEMBER, '(', field("role", $.expression), optional(seq(',', field("login", $.expression))), ')'),
      seq(LOGINPROPERTY, '(', field("login_name", $.expression), ',', field("property_name", $.expression), ')'),
      ORIGINAL_LOGIN,
      seq(PERMISSIONS, '(', optional(seq(field("object_id", $.expression), optional(seq(',', field("column", $.expression))))), ')'),
      seq(PWDENCRYPT, '(', field("password", $.expression), ')'),
      seq(PWDCOMPARE, '(', field("clear_text_password", $.expression), ',', field("password_hash", $.expression), optional(seq(',', field("version", $.expression))), ')'),
      SESSION_USER,
      seq(SESSIONPROPERTY, '(', field("option_name", $.expression), ')'),
      seq(SUSER_ID, '(', optional(field("login", $.expression)), ')'),
      seq(SUSER_NAME, '(', optional(field("server_user_sid", $.expression)), ')'),
      seq(SUSER_SID, '(', optional(seq(field("login", $.expression), optional(seq(',', field("param2", $.expression))))), ')'),
      seq(SUSER_SNAME, '(', optional(field("server_user_sid", $.expression)), ')'),
      SYSTEM_USER,
      USER,
      seq(USER_ID, '(', optional(field("user", $.expression)), ')'),
      seq(USER_NAME, '(', optional(field("id", $.expression)), ')')
    ),

    xml_data_type_methods: $ => choice(
        $.value_method,
        $.query_method,
        $.exist_method,
        $.modify_method
    ),


    // https://learn.microsoft.com/en-us/sql/t-sql/functions/date-bucket-transact-sql?view=sql-server-ver16
    dateparts_9: $ => choice(
      YEAR,
      YEAR_ABBR,
      QUARTER,
      QUARTER_ABBR,
      MONTH,
      MONTH_ABBR,
      DAY,
      DAY_ABBR,
      WEEK,
      WEEK_ABBR,
      HOUR,
      HOUR_ABBR,
      MINUTE,
      MINUTE_ABBR,
      SECOND,
      SECOND_ABBR,
      MILLISECOND,
      MILLISECOND_ABBR
    ),

    // https://learn.microsoft.com/en-us/sql/t-sql/functions/dateadd-transact-sql?view=sql-server-ver16
    dateparts_12: $ => choice(
      $.dateparts_9,
      DAYOFYEAR,
      DAYOFYEAR_ABBR,
      MICROSECOND,
      MICROSECOND_ABBR,
      NANOSECOND,
      NANOSECOND_ABBR
    ),

    // https://learn.microsoft.com/en-us/sql/t-sql/functions/datename-transact-sql?view=sql-server-ver16
    dateparts_15: $ => choice(
      $.dateparts_12,
      WEEKDAY,
      WEEKDAY_ABBR,
      TZOFFSET,
      TZOFFSET_ABBR,
      ISO_WEEK,
      ISO_WEEK_ABBR
    ),

    // https://learn.microsoft.com/en-us/sql/t-sql/functions/datetrunc-transact-sql?view=sql-server-ver16
    dateparts_datetrunc: $ => choice(
      $.dateparts_9,
      DAYOFYEAR,
      DAYOFYEAR_ABBR,
      MICROSECOND,
      MICROSECOND_ABBR,
      ISO_WEEK,
      ISO_WEEK_ABBR
    ),

    value_method: $ => seq(
      choice(
        field("loc_id", LOCAL_ID),
        field("value_id", $.full_column_name),
        field("eventdata", seq(EVENTDATA, '(', ')')),
        field("query", $.query_method),
        seq('(', $.subquery, ')')
      ),
      '.',
      field("call", $.value_call)
    ),

    value_call: $ => seq(
      choice(VALUE, VALUE_SQUARE_BRACKET),
      '(',
      field("xquery", STRING),
      ',',
      field("sqltype", STRING),
      ')'
    ),

    query_method: $ => seq(
      choice(
        field("loc_id", LOCAL_ID),
        field("value_id", $.full_column_name),
        seq('(', $.subquery, ')')
      ),
      '.',
      field("call", $.query_call)
    ),

    query_call: $ => seq(
      choice(QUERY, QUERY_SQUARE_BRACKET),
      '(',
      field("xquery", STRING),
      ')'
    ),

    exist_method: $ => seq(
      choice(
        field("loc_id", LOCAL_ID),
        field("value_id", $.full_column_name),
        seq('(', $.subquery, ')')
      ),
      '.',
      field("call", $.exist_call)
    ),

    exist_call: $ => seq(
      choice(EXIST, EXIST_SQUARE_BRACKET),
      '(',
      field("xquery", STRING),
      ')'
    ),

    modify_method: $ => seq(
      choice(
        field("loc_id", LOCAL_ID),
        field("value_id", $.full_column_name),
        seq('(', $.subquery, ')')
      ),
      '.',
      field("call", $.modify_call)
    ),

    modify_call: $ => seq(
      choice(MODIFY, MODIFY_SQUARE_BRACKET),
      '(',
      field("xml_dml", STRING),
      ')'
    ),

    hierarchyid_call: $ => choice(
      seq(GETANCESTOR, '(', field("n", $.expression), ')'),
      seq(
        GETDESCENDANT,
        '(',
        field("child1", $.expression),
        ',',
        field("child2", $.expression),
        ')'
      ),
      seq(GETLEVEL, '(', ')'),
      seq(ISDESCENDANTOF, '(', field("parent_", $.expression), ')'),
      seq(
        GETREPARENTEDVALUE,
        '(',
        field("oldroot", $.expression),
        ',',
        field("newroot", $.expression),
        ')'
      ),
      seq(TOSTRING, '(', ')')
    ),

    hierarchyid_static_method: $ => seq(
      HIERARCHYID,
      DOUBLE_COLON,
      choice(
        seq(GETROOT, '(', ')'),
        seq(PARSE, '(', field("input", $.expression), ')')
      )
    ),

    nodes_method: $ => seq(
      choice(
        field("loc_id", LOCAL_ID),
        field("value_id", $.full_column_name),
        seq('(', $.subquery, ')')
      ),
      '.',
      NODES,
      '(',
      field("xquery", STRING),
      ')'
    ),

    switch_section: $ => seq(
      WHEN,
      $.expression,
      THEN,
      $.expression
    ),

    switch_search_condition_section: $ => seq(
      WHEN,
      $.search_condition,
      THEN,
      $.expression
    ),

    as_column_alias: $ => seq(optional(AS), $.column_alias),

    table_alias: $ => $.id_,

    with_table_hints: $ => seq(
      WITH,
      '(',
      field("hint", $.table_hint),
      repeat(seq(
        optional(','),
        field("hint", $.table_hint)
      )),
      ')'
    ),

    deprecated_table_hint: $ => seq("(", $.table_hint, ")"),

    sybase_legacy_hints: $ => repeat1($.sybase_legacy_hint),

    sybase_legacy_hint: $ => choice(
      HOLDLOCK,
      NOHOLDLOCK,
      READPAST,
      SHARED
    ),

    table_hint: $ => choice(
        NOEXPAND,
        seq(
          INDEX, choice(
            seq('(', $.index_value, repeat(seq(',' $.index_value)), ')'),
            seq('=', '(', $.index_value, ')'),
            seq('=', $.index_value),
          )
        ),
        seq(FORCESEEK, optional(seq('(', $.index_value, '(', $.column_name_list, ')', ')'))),
        FORCESCAN,
        HOLDLOCK,
        NOLOCK,
        NOWAIT,
        PAGLOCK,
        READCOMMITTED,
        READCOMMITTEDLOCK,
        READPAST,
        READUNCOMMITTED,
        REPEATABLEREAD,
        ROWLOCK,
        SERIALIZABLE,
        SNAPSHOT,
        seq(SPATIAL_WINDOW_MAX_CELLS, '=', DECIMAL),
        TABLOCK,
        TABLOCKX,
        UPDLOCK,
        XLOCK,
        KEEPIDENTITY,
        KEEPDEFAULTS,
        IGNORE_CONSTRAINTS,
        IGNORE_TRIGGERS
    ),

    index_value: $ => choice(
      $.id_,
      DECIMAL
    ),

    column_alias_list: $ => seq(
      '(',
      commaSep1(field("alias", $.column_alias)),
      ')'
    ),

    column_alias: $ => choice(
      $.id_,
      STRING
    ),

    table_value_constructor: $ => seq(
      VALUES,
      commaSep1(
        seq('(', field("exps", $.expression_list_), ')')
      )
    ),

    expression_list_: $ => commaSep1(
      field("exp", $.expression)
    ),

    // https://msdn.microsoft.com/en-us/library/ms189798.aspx
    ranking_windowed_function: $ => choice(
      seq(
        choice(RANK, DENSE_RANK, ROW_NUMBER),
        '(',
        ')',
        $.over_clause
      ),
      seq(
        NTILE,
        '(',
        $.expression,
        ')',
        $.over_clause
      )
    ),

    // https://msdn.microsoft.com/en-us/library/ms173454.aspx
    aggregate_windowed_function: $ => choice(
      seq(
        field("agg_func", choice(AVG, MAX, MIN, SUM, STDEV, STDEVP, VAR, VARP)),
        '(',
        $.all_distinct_expression,
        ')',
        optional($.over_clause)
      ),
      seq(
        field("cnt", choice(COUNT, COUNT_BIG)),
        '(',
        choice('*', $.all_distinct_expression),
        ')',
        optional($.over_clause)
      ),
      seq(
        CHECKSUM_AGG,
        '(',
        $.all_distinct_expression,
        ')'
      ),
      seq(
        GROUPING,
        '(',
        $.expression,
        ')'
      ),
      seq(
        GROUPING_ID,
        '(',
        $.expression_list_,
        ')'
      )
    ),

    // https://docs.microsoft.com/en-us/sql/t-sql/functions/analytic-functions-transact-sql
    analytic_windowed_function: $ => choice(
      seq(
        choice(FIRST_VALUE, LAST_VALUE),
        '(',
        $.expression,
        ')',
        $.over_clause
      ),
      seq(
        choice(LAG, LEAD),
        '(',
        $.expression,
        optional(seq(
          ',',
          $.expression,
          optional(seq(',', $.expression))
        )),
        ')',
        $.over_clause
      ),
      seq(
        choice(CUME_DIST, PERCENT_RANK),
        '(',
        ')',
        OVER,
        '(',
        optional(seq(PARTITION, BY, $.expression_list_)),
        $.order_by_clause,
        ')'
      ),
      seq(
        choice(PERCENTILE_CONT, PERCENTILE_DISC),
        '(',
        $.expression,
        ')',
        WITHIN,
        GROUP,
        '(',
        $.order_by_clause,
        ')',
        OVER,
        '(',
        optional(seq(PARTITION, BY, $.expression_list_)),
        ')'
      )
    ),

    all_distinct_expression: $ => seq(
      optional(choice(ALL, DISTINCT)),
      $.expression
    ),

    over_clause: $ => seq(
      OVER,
      '(',
      optional(seq(PARTITION, BY, $.expression_list_)),
      optional($.order_by_clause),
      optional($.row_or_range_clause),
      ')'
    ),

    row_or_range_clause: $ => seq(
      choice(ROWS, RANGE),
      $.window_frame_extent
    ),

    window_frame_extent: $ => choice(
      $.window_frame_preceding,
      seq(BETWEEN, $.window_frame_bound, AND, $.window_frame_bound)
    ),

    window_frame_bound: $ => choice(
      $.window_frame_preceding,
      $.window_frame_following
    ),

    window_frame_preceding: $ => choice(
      seq(UNBOUNDED, PRECEDING),
      seq(DECIMAL, PRECEDING),
      seq(CURRENT, ROW)
    ),

    window_frame_following: $ => choice(
      seq(UNBOUNDED, FOLLOWING),
      seq(DECIMAL, FOLLOWING)
    ),

    create_database_option: $ => choice(
      seq(FILESTREAM, '(', commaSep1($.database_filestream_option), ')'),
      seq(DEFAULT_LANGUAGE, EQUAL, choice($.id_, STRING)),
      seq(DEFAULT_FULLTEXT_LANGUAGE, EQUAL, choice($.id_, STRING)),
      seq(NESTED_TRIGGERS, EQUAL, choice(OFF, ON)),
      seq(TRANSFORM_NOISE_WORDS, EQUAL, choice(OFF, ON)),
      seq(TWO_DIGIT_YEAR_CUTOFF, EQUAL, DECIMAL),
      seq(DB_CHAINING, choice(OFF, ON)),
      seq(TRUSTWORTHY, choice(OFF, ON))
    ),

    database_filestream_option: $ => seq(
      LR_BRACKET,
      choice(
        seq(NON_TRANSACTED_ACCESS, EQUAL, choice(OFF, READ_ONLY, FULL)),
        seq(DIRECTORY_NAME, EQUAL, STRING)
      ),
      RR_BRACKET
    ),

    database_file_spec: $ => choice(
      $.file_group,
      $.file_spec
    ),

    file_group: $ => seq(
      FILEGROUP,
      $.id_,
      optional(seq(CONTAINS, FILESTREAM)),
      optional(DEFAULT),
      optional(seq(CONTAINS, MEMORY_OPTIMIZED_DATA)),
      $.file_spec,
      repeat(seq(',', $.file_spec))
    ),

    file_spec: $ => seq(
      LR_BRACKET,
      NAME,
      EQUAL,
      choice($.id_, STRING),
      optional(','),
      FILENAME,
      EQUAL,
      field("file", STRING),
      optional(','),
      optional(seq(SIZE, EQUAL, $.file_size, optional(','))),
      optional(seq(MAXSIZE, EQUAL, choice($.file_size, UNLIMITED), optional(','))),
      optional(seq(FILEGROWTH, EQUAL, $.file_size, optional(','))),
      RR_BRACKET
    ),

    entity_name: $ => seq(
      optional(choice(
        seq(field("server", $.id_), '.', field("database", $.id_), '.', field("schema", $.id_), '.'),
        seq(field("database", $.id_), '.', optional(field("schema", $.id_)), '.'),
        seq(field("schema", $.id_), '.')
      )),
      field("table", $.id_)
    ),

    entity_name_for_azure_dw: $ => choice(
      field("schema", $.id_),
      seq(field("schema", $.id_), '.', field("object_name", $.id_))
    ),

    entity_name_for_parallel_dw: $ => choice(
      field("schema_database", $.id_),
      seq(field("schema", $.id_), '.', field("object_name", $.id_))
    ),

    full_table_name: $ => seq(
      optional(choice(
        seq(field("linkedServer", $.id_), '.', '.', field("schema", $.id_), '.'),
        seq(field("server", $.id_), '.', field("database", $.id_), '.', field("schema", $.id_), '.'),
        seq(field("database", $.id_), '.', optional(field("schema", $.id_)), '.'),
        seq(field("schema", $.id_), '.')
      )),
      field("table", $.id_)
    ),

    table_name: $ => seq(
      optional(choice(
        seq(field("database", $.id_), '.', optional(field("schema", $.id_)), '.'),
        seq(field("schema", $.id_), '.')
      )),
      choice(
        field("table", $.id_),
        field("blocking_hierarchy", BLOCKING_HIERARCHY)
      )
    ),

    simple_name: $ => seq(
      optional(seq(field("schema", $.id_), '.')),
      field("name", $.id_)
    ),

    func_proc_name_schema: $ => seq(
      optional(seq(field("schema", $.id_), '.')),
      field("procedure", $.id_)
    ),

    func_proc_name_database_schema: $ => choice(
      seq(
        optional(field("database", $.id_)),
        '.',
        optional(field("schema", $.id_)),
        '.',
        field("procedure", $.id_)
      ),
      $.func_proc_name_schema
    ),

    func_proc_name_server_database_schema: $ => choice(
      seq(
        optional(field("server", $.id_)),
        '.',
        optional(field("database", $.id_)),
        '.',
        optional(field("schema", $.id_)),
        '.',
        field("procedure", $.id_)
      ),
      $.func_proc_name_database_schema
    ),

    ddl_object: $ => choice(
      $.full_table_name,
      LOCAL_ID
    ),

    full_column_name: $ => seq(
      optional(seq(
        choice(DELETED, INSERTED, $.full_table_name),
        '.'
      )),
      choice(
        field("column_name", $.id_),
        seq('$', choice(IDENTITY, ROWGUID))
      )
    ),

    column_name_list_with_order: $ => seq(
      $.id_,
      optional(choice(ASC, DESC)),
      repeat(seq(",", $.id_, optional(choice(ASC, DESC))))
    ),

    insert_column_name_list: $ => seq(
      field("col", $.insert_column_id),
      repeat(
        seq(
          ",",
          field("col", $.insert_column_id)
        )
      )
    ),

    insert_column_id: $ => seq(
      repeat(
        seq(
          field("ignore", optional($.id_)),
          "."
        )
      ),
      $.id_
    ),

    column_name_list: $ => seq(
      field("col", $.id_),
      repeat(
        seq(
          ",",
          field("col", $.id_)
        )
      )
    ),

    cursor_name: $ => choice(
      $.id_,
      LOCAL_ID
    ),

    on_off: $ => choice(
      ON,
      OFF
    ),

    clustered: $ => choice(
      CLUSTERED,
      NONCLUSTERED
    ),

    null_notnull: $ => seq(
      optional(NOT),
      NULL_
    ),

    scalar_function_name: $ => choice(
      $.func_proc_name_server_database_schema,
      RIGHT,
      LEFT,
      BINARY_CHECKSUM,
      CHECKSUM
    ),

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

    contract_name: $ => choice(
      $.id_,
      $.expression
    ),

    service_name: $ => choice(
      $.id_,
      $.expression
    ),

    end_conversation: $ => seq(
      END,
      CONVERSATION,
      field("conversation_handle", LOCAL_ID),
      optional(";"),
      optional(
        seq(
          WITH,
          optional(
            seq(
              ERROR,
              "=",
              field(
                "failure_code",
                choice(LOCAL_ID, STRING)
              ),
              DESCRIPTION,
              "=",
              field(
                "failure_text",
                choice(LOCAL_ID, STRING)
              )
            )
          ),
          optional(CLEANUP)
        )
      )
    ),

    waitfor_conversation: $ => seq(
      optional(WAITFOR),
      '(',
      $.get_conversation,
      ')',
      optional(seq(
        optional(','),
        TIMEOUT,
        field("timeout", $.time)
      )),
      optional(';')
    ),

    get_conversation: $ => seq(
      GET,
      CONVERSATION,
      GROUP,
      field("conversation_group_id", choice(STRING, LOCAL_ID)),
      FROM,
      field("queue", $.queue_id),
      optional(';')
    ),

    queue_id: $ => choice(
      seq(
        field("database_name", $.id_),
        '.',
        field("schema_name", $.id_),
        '.',
        field("name", $.id_)
      ),
      $.id_
    ),

    send_conversation: $ => seq(
      SEND,
      ON,
      CONVERSATION,
      field("conversation_function", choice(STRING, LOCAL_ID)),
      MESSAGE,
      TYPE,
      field("message_type_name", $.expression),
      optional(seq(
        '(',
        field("message_body_expression", choice(STRING, LOCAL_ID)),
        ')'
      )),
      optional(';')
    ),

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
