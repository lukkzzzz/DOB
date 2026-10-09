<?php
/* ============================================================
   Diocese of Boac CMS — REST API
   ------------------------------------------------------------
   The front-end storage layer (window.storage in site-data.js)
   talks to this endpoint.

   Endpoints
   ---------
   GET  api.php?action=status              → health check
   GET  api.php?key=<content-key>          → read a content key
   POST api.php  {key, value}              → upsert content (JSON)
   DELETE api.php?key=<content-key>        → delete a content key

   Content keys are like:  list:news | content:home | site | ...
   ============================================================ */

require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

/* ── CORS preflight ──────────────────────────────────────── */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

/* ── Helpers ─────────────────────────────────────────────── */
function respond($payload, $status = 200)
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function respond_error($message, $status = 400)
{
    respond(['ok' => false, 'error' => $message], $status);
}

function read_json_body()
{
    $raw = file_get_contents('php://input');
    if ($raw === false || trim($raw) === '') {
        return null;
    }
    $data = json_decode($raw, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        return null;
    }
    return $data;
}

function sanitize_key($key)
{
    $key = trim((string)$key);
    $key = preg_replace('/[^A-Za-z0-9_:\-]/', '', $key);
    return substr($key, 0, 120);
}

/* ── Database not ready? ─────────────────────────────────── */
if (!db_is_ready()) {
    respond_error('Database is not installed. Run database/install.php first.', 500);
}

$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? trim($_GET['action']) : '';
$key    = isset($_GET['key']) ? sanitize_key($_GET['key']) : '';

/* ── GET status ──────────────────────────────────────────── */
if ($method === 'GET' && $action === 'status') {
    $pdo = db_connect();
    $version = 'n/a';
    try {
        $stmt = $pdo->query('SELECT `value` FROM ' . TBL_META . ' WHERE mkey = "cms_version" LIMIT 1');
        $row = $stmt->fetch();
        $version = $row ? $row['value'] : 'n/a';
    } catch (Exception $e) {
        // ignore
    }
    respond([
        'ok'      => true,
        'status'  => 'connected',
        'cms_version' => $version,
        'database'    => DB_NAME,
    ]);
}

/* ── GET content ─────────────────────────────────────────── */
if ($method === 'GET') {
    if ($key === '') {
        respond_error('Missing ?key= parameter.');
    }

    $pdo = db_connect();
    $stmt = $pdo->prepare('SELECT `data`, `updated_at` FROM ' . TBL_CONTENT . ' WHERE ckey = :ckey LIMIT 1');
    $stmt->execute([':ckey' => $key]);
    $row = $stmt->fetch();

    if (!$row || $row['data'] === null || $row['data'] === '') {
        respond(['key' => $key, 'value' => null, 'found' => false]);
    }

    $decoded = json_decode($row['data'], true);
    $decoded = ($decoded === null && json_last_error() !== JSON_ERROR_NONE) ? $row['data'] : $decoded;

    respond([
        'key'   => $key,
        'value' => $decoded,
        'found' => true,
        'updated_at' => $row['updated_at'],
    ]);
}

/* ── POST upsert content ─────────────────────────────────── */
if ($method === 'POST') {
    $body = read_json_body();
    if ($body === null || !isset($body['key']) || $body['key'] === '') {
        respond_error('Body must contain a non-empty "key".');
    }

    $key    = sanitize_key($body['key']);
    $value  = array_key_exists('value', $body) ? $body['value'] : null;
    $stored = db_json_encode($value);

    $pdo = db_connect();
    $stmt = $pdo->prepare(
        'INSERT INTO ' . TBL_CONTENT . ' (ckey, data, updated_at)
         VALUES (:ckey, :data, NOW())
         ON DUPLICATE KEY UPDATE data = :data2, updated_at = NOW()'
    );
    $stmt->execute([':ckey' => $key, ':data' => $stored, ':data2' => $stored]);

    respond(['ok' => true, 'key' => $key, 'saved' => true], 200);
}

/* ── DELETE content ──────────────────────────────────────── */
if ($method === 'DELETE') {
    if ($key === '') {
        respond_error('Missing ?key= parameter for DELETE.');
    }

    $pdo = db_connect();
    $stmt = $pdo->prepare('DELETE FROM ' . TBL_CONTENT . ' WHERE ckey = :ckey');
    $stmt->execute([':ckey' => $key]);

    respond(['ok' => true, 'key' => $key, 'deleted' => true], 200);
}

/* ── Unknown route ───────────────────────────────────────── */
respond_error('Unsupported request. Use GET ?key=, GET ?action=status, POST, or DELETE.', 404);

