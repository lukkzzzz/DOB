<?php
/* ============================================================
   Diocese of Boac CMS — Database connection helper
   ------------------------------------------------------------
   Uses PDO with MySQL/MariaDB. Defaults match a standard XAMPP
   setup (root / empty password). Adjust DB_HOST / DB_USER /
   DB_PASS / DB_NAME below if your environment differs.
   ============================================================ */

// ── Configuration ─────────────────────────────────────────
define('DB_HOST', '127.0.0.1');
define('DB_PORT', '3306');
define('DB_NAME', 'dob_cms');
define('DB_USER', 'root');
define('DB_PASS', '');

define('DB_CHARSET', 'utf8mb4');

// ── Tables ────────────────────────────────────────────────
define('TBL_CONTENT', 'cms_content');
define('TBL_META', 'cms_meta');

/**
 * Open (and cache) a single PDO connection to the CMS database.
 *
 * @param bool $forceNew  Skip the cached connection and create a new one.
 * @return PDO|null
 */
function db_connect($forceNew = false)
{
    static $pdo = null;

    if ($pdo !== null && !$forceNew) {
        return $pdo;
    }

    try {
        $dsn = sprintf(
            'mysql:host=%s;port=%s;dbname=%s;charset=%s',
            DB_HOST,
            DB_PORT,
            DB_NAME,
            DB_CHARSET
        );

        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);

        return $pdo;
    } catch (PDOException $e) {
        return null;
    }
}

/**
 * Connect to the server WITHOUT selecting a database.
 * Used by the installer to create the database.
 *
 * @return PDO|null
 */
function db_connect_server()
{
    try {
        $dsn = sprintf('mysql:host=%s;port=%s;charset=%s', DB_HOST, DB_PORT, DB_CHARSET);
        return new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
    } catch (PDOException $e) {
        return null;
    }
}

/**
 * Whether the CMS database + required tables exist.
 *
 * @return bool
 */
function db_is_ready()
{
    $pdo = db_connect();
    if (!$pdo) {
        return false;
    }

    try {
        $stmt = $pdo->query('SHOW TABLES');
        $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);

        return in_array(TBL_CONTENT, $tables, true)
            && in_array(TBL_META, $tables, true);
    } catch (PDOException $e) {
        return false;
    }
}

/**
 * JSON-encode a value safely for storage.
 *
 * @param mixed $value
 * @return string
 */
function db_json_encode($value)
{
    return json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}

