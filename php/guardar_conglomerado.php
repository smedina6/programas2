<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');
include 'conexion.php'; // aquí tienes la variable $conexion (MySQLi)

$nombre = $_POST['nombre'] ?? '';
$lat    = $_POST['lat'] ?? '';
$lon    = $_POST['lon'] ?? '';

if (empty($nombre) || empty($lat) || empty($lon)) {
    echo json_encode(["success" => false, "message" => "Faltan datos obligatorios."]);
    exit;
}

try {
    // ✅ Preparar la consulta con MySQLi
    $stmt = $conexion->prepare("INSERT INTO conglomerado_aprobados (nombre, latitud, longitud) VALUES (?, ?, ?)");
    $stmt->bind_param("sdd", $nombre, $lat, $lon);

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "✅ Conglomerado guardado correctamente.",
            "id_insertado" => $conexion->insert_id
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "❌ Error al ejecutar la consulta: " . $stmt->error
        ]);
    }

    $stmt->close();
    $conexion->close();
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error al guardar: " . $e->getMessage()]);
}
?>

