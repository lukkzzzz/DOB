<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
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

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(['ok' => false, 'error' => 'Only POST allowed'], 405);
}

if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    respond(['ok' => false, 'error' => 'No file uploaded or upload error'], 400);
}

$file = $_FILES['file'];
$maxSize = 2 * 1024 * 1024; // 2MB
if ($file['size'] > $maxSize) {
    respond(['ok' => false, 'error' => 'File size exceeds 2MB limit'], 400);
}

$allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mime, $allowedMimeTypes)) {
    respond(['ok' => false, 'error' => 'Invalid file type. Only JPG, PNG, WEBP allowed.'], 400);
}

// Ensure uploads dir exists
$uploadDir = __DIR__ . '/../uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = 'img_' . time() . '_' . uniqid() . '.' . strtolower($ext);
$destination = $uploadDir . $filename;

if (move_uploaded_file($file['tmp_name'], $destination)) {
    $url = 'uploads/' . $filename;
    respond(['ok' => true, 'url' => $url]);
} else {
    respond(['ok' => false, 'error' => 'Failed to move uploaded file'], 500);
}
