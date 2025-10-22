<?php
header('Content-Type: application/json');
include 'conexion.php';

$result = $conexion->query("SELECT id_rol, nombre_rol FROM roles");

$roles = [];
while($row = $result->fetch_assoc()){
    $roles[] = $row;
}

echo json_encode($roles);
?>
