<?php
require_once __DIR__ . '/database/db.php';
$pdo = db_connect();
$sql = file_get_contents(__DIR__ . '/database/add_coat_of_arms.sql');
$pdo->exec($sql);
echo "Migration 2 successful.\n";
