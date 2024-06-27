<?php
header('Content-Type: application/json');
require 'db.php';

$id = intval($_GET['id']);

$sql = "DELETE FROM personas WHERE id=$id";
if (mysqli_query($conn, $sql)) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => mysqli_error($conn)]);
}

mysqli_close($conn);
?>
