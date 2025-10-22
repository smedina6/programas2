<?php
header('Content-Type: application/json; charset=utf-8');
include __DIR__ . '/conexion.php';

$accion = $_GET['accion'] ?? '';

switch($accion) {
    case 'pais':
        $result = $conexion->query("SELECT id_pais, nombre FROM pais ORDER BY nombre");
        echo json_encode($result->fetch_all(MYSQLI_ASSOC));
        break;

case 'departamento':
    $id_pais = intval($_GET['id_pais'] ?? 0);
    if ($id_pais === 0) {
        echo json_encode(['error' => 'id_pais no válido']);
        exit;
    }
    $result = $conexion->query("SELECT id_departamento, nombre FROM departamento WHERE id_pais=$id_pais ORDER BY nombre");
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
    break;

case 'ciudad':
    $id_departamento = intval($_GET['id_departamento'] ?? 0);
    if ($id_departamento === 0) {
        echo json_encode(['error' => 'id_departamento no válido']);
        exit;
    }
    $result = $conexion->query("SELECT id_ciudad, nombre FROM ciudad WHERE id_departamento=$id_departamento ORDER BY nombre");
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
    break;

    default:
        echo json_encode([]);
}
?>
