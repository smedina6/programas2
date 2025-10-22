<?php
header("Content-Type: application/json; charset=UTF-8");

// --- MODO SIN BASE DE DATOS (simulado) ---
/* Si aún no tienes conexión a BD, puedes probar así */
$conglomerados = [
    ["id" => 1, "nombre" => "Conglomerado Norte"],
    ["id" => 2, "nombre" => "Conglomerado Sur"],
    ["id" => 3, "nombre" => "Conglomerado Oriente"]
];

echo json_encode($conglomerados);
exit;


// --- MODO CON BASE DE DATOS (activar después) ---
/*
include_once("../database/conexion.php");

$resultado = $conexion->query("SELECT id_conglomerado, nombre FROM conglomerado");

$conglomerados = [];
while ($fila = $resultado->fetch_assoc()) {
    $conglomerados[] = [
        "id" => $fila["id_conglomerado"],
        "nombre" => $fila["nombre"]
    ];
}

echo json_encode($conglomerados);
*/
?>
