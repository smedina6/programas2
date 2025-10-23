<?php
header('Content-Type: application/json');
include '../../php/conexion.php';

$result = $conexion->query("SELECT id_tipo_documento, nombre_tipo FROM tipo_documento");
$tipos = [];
while($row = $result->fetch_assoc()){
    $tipos[] = $row;
}

echo json_encode($tipos);
?>
