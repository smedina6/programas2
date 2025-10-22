<?php
header('Content-Type: application/json');
include 'conexion.php'; // tu archivo de conexión

$query = "SELECT id_estado, nombre_estado, emoji_estado FROM estados ORDER BY id_estado";
$result = $conexion->query($query);

$estados = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $estados[] = $row;
    }
}

echo json_encode($estados);
?>
