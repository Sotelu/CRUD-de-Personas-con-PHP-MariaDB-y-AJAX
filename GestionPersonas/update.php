<?php
header('Content-Type: application/json');
require 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

$id = intval($data['id']);
$nombre = $data['doce_nombre'];
$apellido = $data['doce_apellido'];
$cumple = $data['per_cumple'];
$mail = $data['per_mail'];
$cel = $data['doce_cel'];

$sql = "UPDATE personas SET doce_nombre='$nombre', doce_apellido='$apellido', per_cumple='$cumple', per_mail='$mail', doce_cel='$cel' WHERE id=$id";
if (mysqli_query($conn, $sql)) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => mysqli_error($conn)]);
}

mysqli_close($conn);
?>

