<?php
header("Content-Type: application/json; charset=UTF-8");

// Si aún no tienes conexión, deja estos datos simulados activos:
$conglomerados = [
    ["id" => 1, "nombre" => "Conglomerado Simulado 1", "ubicacion" => "4.71, -74.07"],
    ["id" => 2, "nombre" => "Conglomerado Simulado 2", "ubicacion" => "5.32, -72.44"],
    ["id" => 3, "nombre" => "Conglomerado Simulado 3", "ubicacion" => "3.45, -76.53"]
];

// Si más adelante conectas la base de datos, descomenta esto:
/*
include_once("../database/conexion.php");
$result = $conexion->query("SELECT id, nombre, ubicacion FROM conglomerado");
$conglomerados = [];
while ($row = $result->fetch_assoc()) {
    $conglomerados[] = $row;
}
*/

echo json_encode($conglomerados, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>
