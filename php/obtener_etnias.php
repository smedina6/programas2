<?php
include 'conexion.php';  // Archivo con tu conexión a la base de datos
header('Content-Type: application/json');

$result = $conexion->query("SELECT id_etnia, nombre_etnia FROM etnia ORDER BY nombre_etnia");

$datos = [];
while ($row = $result->fetch_assoc()) {
    $datos[] = $row;
}

echo json_encode($datos);
?>
