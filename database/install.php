<?php
/* ============================================================
   Diocese of Boac CMS — One-time browser installer
   ------------------------------------------------------------
   Steps:
     1. Start Apache + MySQL in XAMPP.
     2. Open:  http://localhost/DOB proposal/DOB/database/install.php
     3. Click "Install Database".
   The installer creates the `dob_cms` database, the content
   tables, and seeds basic metadata. It can be re-run safely.
   ============================================================ */

require_once __DIR__ . '/db.php';

header('Content-Type: text/html; charset=utf-8');

$action = isset($_POST['action']) ? $_POST['action'] : '';
$results = [];
$installed = db_is_ready();

/* ── Perform installation ─────────────────────────────────── */
if ($action === 'install') {

    // 1. Connect to the server (no DB selected yet)
    $server = db_connect_server();
    if (!$server) {
        $results['error'] = 'Could not connect to MySQL. Is Apache & MySQL running in XAMPP? Check DB_USER/DB_PASS in db.php.';
    } else {
        // 2. Create the database
        $dbname = DB_NAME;
        $server->exec(
            "CREATE DATABASE IF NOT EXISTS `{$dbname}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
        );
        $results['database'] = "Database `{$dbname}` ready ✓";

        // 3. Run table schema
        $schemaFile = __DIR__ . '/schema_tables.sql';
        if (is_file($schemaFile)) {
            $sql = file_get_contents($schemaFile);
            $pdo = db_connect(true);
            if ($pdo) {
                $pdo->exec($sql);
                $results['tables'] = 'Tables created ✓';
            } else {
                $results['error'] = 'Connected to server but could not select the database.';
            }
        } else {
            $results['error'] = 'Missing schema_tables.sql';
        }
    }

    $installed = db_is_ready();
}

/* ── Status helpers ───────────────────────────────────────── */
function status_badge($ok, $label)
{
    $color = $ok ? '#1a7f37' : '#b42318';
    $bg    = $ok ? '#dafbe1' : '#ffebe9';
    return "<span style='background:{$bg};color:{$color};border-radius:999px;padding:4px 12px;font-size:12px;font-weight:600;'>{$label}</span>";
}

$phpOk    = version_compare(PHP_VERSION, '7.4', '>=');
$pdoOk    = extension_loaded('pdo_mysql');
$connOk   = db_connect() !== null;
$readyOk  = $installed;
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CMS Installer | Diocese of Boac</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; background:#f6f0e4; color:#2a2420; margin:0; padding:32px 16px; }
  .card { max-width:720px; margin:0 auto; background:#fffdf9; border:1px solid #ece2cd; border-radius:14px; padding:32px; box-shadow:0 10px 30px rgba(42,36,32,.08); }
  h1 { font-size:22px; margin:0 0 4px; color:#4a1420; }
  p.sub { color:#5c5147; font-size:14px; margin:0 0 24px; }
  .checks { display:grid; gap:10px; margin:20px 0; }
  .check { display:flex; justify-content:space-between; align-items:center; border:1px solid #ece2cd; border-radius:10px; padding:12px 16px; background:#fff; font-size:14px; }
  .check span:first-child { font-weight:600; }
  button { background:#6a1f2b; color:#fff; border:0; border-radius:8px; padding:12px 22px; font-size:15px; font-weight:600; cursor:pointer; }
  button:hover { background:#4a1420; }
  button:disabled { background:#b0a89e; cursor:not-allowed; }
  .result { background:#dafbe1; border:1px solid #a2e6b5; color:#1a7f37; border-radius:10px; padding:14px 16px; font-size:14px; margin-top:20px; white-space:pre-line; }
  .error { background:#ffebe9; border:1px solid #ffb3ab; color:#b42318; }
  a { color:#6a1f2b; }
  .footer { max-width:720px; margin:18px auto 0; font-size:13px; color:#5c5147; text-align:center; }
</style>
</head>
<body>

<div class="card">
  <h1>⚙️ CMS Installer — Diocese of Boac</h1>
  <p class="sub">Creates the <code>dob_cms</code> database and content tables. Safe to re-run.</p>

  <div class="checks">
    <div class="check">
      <span>PHP version (≥ 7.4)</span>
      <?php echo status_badge($phpOk, PHP_VERSION); ?>
    </div>
    <div class="check">
      <span>PDO MySQL extension</span>
      <?php echo status_badge($pdoOk, $pdoOk ? 'Loaded' : 'Missing'); ?>
    </div>
    <div class="check">
      <span>Database connection</span>
      <?php echo status_badge($connOk, $connOk ? 'Connected' : 'Offline'); ?>
    </div>
    <div class="check">
      <span>CMS installed</span>
      <?php echo status_badge($readyOk, $readyOk ? 'Installed ✓' : 'Not yet'); ?>
    </div>
  </div>

  <form method="post">
    <input type="hidden" name="action" value="install">
    <button type="submit" <?php echo $readyOk ? 'disabled' : ''; ?>>
      <?php echo $readyOk ? '✅ Already Installed' : 'Install Database'; ?>
    </button>
  </form>

  <?php if (isset($results['error'])): ?>
    <div class="result error"><?php echo htmlspecialchars($results['error']); ?></div>
  <?php elseif (isset($results['database'])): ?>
    <div class="result">
      <?php echo htmlspecialchars($results['database']); ?>
      <?php if (isset($results['tables'])) echo "\n" . htmlspecialchars($results['tables']); ?>
      <?php echo $installed ? "\n\n🎉 Installation complete. The site and admin panel are now database-backed." : ''; ?>
    </div>
  <?php endif; ?>

  <p style="margin-top:24px;font-size:14px;">
    Next steps:
    <a href="../index.html">Open the website</a> ·
    <a href="../admin.html">Open the admin panel</a>
  </p>
</div>

<div class="footer">Diocese of Boac CMS · install.php</div>

</body>
</html>

