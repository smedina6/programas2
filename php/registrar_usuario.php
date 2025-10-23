<?php
header('Content-Type: application/json; charset=utf-8');
include 'conexion.php';
file_put_contents('log.txt', $_SERVER['REQUEST_METHOD'] . "\n", FILE_APPEND);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // --- Recoger datos del formulario ---
    $tipo_documento = $_POST['tipo_documento'] ?? null;
    $documento = $_POST['documento'] ?? null;
    $nombre = $_POST['nombre'] ?? null;
    $apellido = $_POST['apellido'] ?? null;
    $pais = $_POST['pais'] ?? null;
    $departamento = $_POST['departamento'] ?? null;
    $ciudad = $_POST['ciudad'] ?? null;
    $estado_civil = $_POST['estado_civil'] ?? null;
    $condicion = $_POST['condicion'] ?? null;
    $etnia = $_POST['etnia'] ?? null;
    $correo = $_POST['correo'] ?? null;
    $telefono = $_POST['telefono'] ?? null;
    $direccion = $_POST['direccion'] ?? null;
    $clave = $_POST['contrasena'] ?? null;
    $estudios = $_POST['estudios'] ?? null;
    $fecha_ingreso = $_POST['fecha_ingreso'] ?? null;
    $estados = $_POST['estados'] ?? null;
    $comentarios = $_POST['comentarios'] ?? null;
    $roles = $_POST['roles'] ?? null;
    $fecha_registro = date('Y-m-d H:i:s');

    // Convertir cadena vacía a NULL
    $campos = [
        &$tipo_documento, &$documento, &$nombre, &$apellido, &$pais, &$departamento, &$ciudad,
        &$estado_civil, &$condicion, &$etnia, &$correo, &$telefono, &$direccion,
        &$clave, &$estudios, &$fecha_ingreso, &$estados, &$comentarios, &$roles
    ];
    foreach ($campos as &$valor) {
        if (isset($valor) && trim($valor) === '') {
            $valor = null;
        }
    }

    // --- Encriptar la clave antes de guardar ---
    if (!empty($clave)) {
        $clave = password_hash($clave, PASSWORD_BCRYPT);
    }

    // --- Preparar consulta ---
    $sql = "INSERT INTO usuarios (
                tipo_documento, documento, nombre, apellido, pais, departamento, ciudad, estado_civil,
                condicion, etnia, correo, telefono, direccion,  clave, estudios,
                fecha_ingreso, estados, comentarios, fecha_registro, roles
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conexion->prepare($sql);

    if (!$stmt) {
        echo json_encode(['status' => 'error', 'mensaje' => 'Error al preparar consulta: ' . $conexion->error]);
        exit;
    }

    $stmt->bind_param(
    "isssiiiiiissssssissi",
    $tipo_documento, $documento, $nombre, $apellido, $pais, $departamento, $ciudad,
    $estado_civil, $condicion, $etnia, $correo, $telefono, $direccion, $clave,
    $estudios, $fecha_ingreso, $estados, $comentarios, $fecha_registro, $roles
    );


    if ($stmt->execute()) {
        echo json_encode(['status' => 'ok', 'mensaje' => 'Usuario registrado correctamente']);
    } else {
        echo json_encode(['status' => 'error', 'mensaje' => 'Error al ejecutar: ' . $stmt->error]);
    }

    $stmt->close();
    $conexion->close();

} else {
    echo json_encode(['status' => 'error', 'mensaje' => 'Método no permitido']);
}
?>
