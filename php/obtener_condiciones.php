<?php
include 'conexion.php'; 
header('Content-Type: application/json');

$result = $conexion->query("SELECT id_condicion, nombre_condicion FROM condicion ORDER BY nombre_condicion");

$datos = [];
while ($row = $result->fetch_assoc()) {
    $datos[] = $row;
}

echo json_encode($datos);
?>
