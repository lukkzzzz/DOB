<?php
require_once __DIR__ . '/database/db.php';
$pdo = db_connect();
$sql = file_get_contents(__DIR__ . '/database/migrate_bishops.sql');
$pdo->exec($sql);
echo "Migration successful.\n";
