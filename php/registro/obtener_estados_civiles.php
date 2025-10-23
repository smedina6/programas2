<?php
include '../../php/conexion.php'; 
header('Content-Type: application/json');

$result = $conexion->query("SELECT id_estado, nombre_estado FROM estado_civil ORDER BY nombre_estado");
$datos = [];
while($row = $result->fetch_assoc()){
    $datos[] = $row;
}
echo json_encode($datos);
?>
