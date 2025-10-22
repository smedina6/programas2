<?php
$servidor = "localhost";
$usuario = "root";
$clave = "123456";
$baseDatos = "ecodatos";
$puerto = 3307; 

$conexion = new mysqli($servidor, $usuario, $clave, $baseDatos, $puerto);

if ($conexion->connect_error) {
    die("❌ Error de conexión: " . $conexion->connect_error);
}
?>
