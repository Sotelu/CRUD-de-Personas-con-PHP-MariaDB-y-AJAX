<?php
header('Content-Type: application/json');
require 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

$nombre = $data['doce_nombre'];
$apellido = $data['doce_apellido'];
$cumple = $data['per_cumple'];
$mail = $data['per_mail'];
$cel = $data['doce_cel'];

$sql = "INSERT INTO personas (doce_nombre, doce_apellido, per_cumple, per_mail, doce_cel) VALUES ('$nombre', '$apellido', '$cumple', '$mail', '$cel')";
if (mysqli_query($conn, $sql)) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => mysqli_error($conn)]);
}

mysqli_close($conn);



