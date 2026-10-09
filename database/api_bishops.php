<?php
require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function respond($payload, $status = 200) {
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
function respond_error($message, $status = 400) {
    respond(['ok' => false, 'error' => $message], $status);
}
function read_json_body() {
    $raw = file_get_contents('php://input');
    if ($raw === false || trim($raw) === '') return null;
    return json_decode($raw, true);
}

if (!db_is_ready()) {
    respond_error('Database is not ready.', 500);
}

$method = $_SERVER['REQUEST_METHOD'];
$pdo = db_connect();

// GET all bishops
if ($method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM `bishops` ORDER BY `start_year` ASC");
    $bishops = $stmt->fetchAll();
    respond(['ok' => true, 'bishops' => $bishops]);
}

// POST create/update bishop
if ($method === 'POST') {
    $body = read_json_body();
    if (!$body) respond_error('Invalid JSON body.');
    
    $id = isset($body['id']) ? (int)$body['id'] : null;
    $full_name = trim($body['full_name'] ?? '');
    $start_year = isset($body['start_year']) ? (int)$body['start_year'] : 0;
    
    if ($full_name === '') respond_error('Name is required.');
    if ($start_year === 0) respond_error('Start year is required.');

    $end_year = !empty($body['end_year']) ? (int)$body['end_year'] : null;
    $photo = !empty($body['photo']) ? trim($body['photo']) : null;
    $coat_of_arms = !empty($body['coat_of_arms']) ? trim($body['coat_of_arms']) : null;
    $dob = !empty($body['dob']) ? trim($body['dob']) : null;
    $pob = !empty($body['pob']) ? trim($body['pob']) : null;
    $ordination_date = !empty($body['ordination_date']) ? trim($body['ordination_date']) : null;
    $episcopal_motto = !empty($body['episcopal_motto']) ? trim($body['episcopal_motto']) : null;
    $biography = !empty($body['biography']) ? trim($body['biography']) : null;
    $contributions = !empty($body['contributions']) ? trim($body['contributions']) : null;

    if ($id) {
        $stmt = $pdo->prepare("UPDATE `bishops` SET `full_name`=?, `photo`=?, `coat_of_arms`=?, `start_year`=?, `end_year`=?, `dob`=?, `pob`=?, `ordination_date`=?, `episcopal_motto`=?, `biography`=?, `contributions`=? WHERE `id`=?");
        $stmt->execute([$full_name, $photo, $coat_of_arms, $start_year, $end_year, $dob, $pob, $ordination_date, $episcopal_motto, $biography, $contributions, $id]);
    } else {
        $stmt = $pdo->prepare("INSERT INTO `bishops` (`full_name`, `photo`, `coat_of_arms`, `start_year`, `end_year`, `dob`, `pob`, `ordination_date`, `episcopal_motto`, `biography`, `contributions`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$full_name, $photo, $coat_of_arms, $start_year, $end_year, $dob, $pob, $ordination_date, $episcopal_motto, $biography, $contributions]);
        $id = $pdo->lastInsertId();
    }
    respond(['ok' => true, 'id' => $id]);
}

// DELETE bishop
if ($method === 'DELETE') {
    $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
    if (!$id) respond_error('Missing id parameter.');
    $stmt = $pdo->prepare("DELETE FROM `bishops` WHERE `id`=?");
    $stmt->execute([$id]);
    respond(['ok' => true]);
}
