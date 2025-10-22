<?php
header("Content-Type: application/json");
include("conexion.php"); 

$correo = $_POST['correo'] ?? '';
$clave = $_POST['clave'] ?? '';

if (empty($correo) || empty($clave) || empty($rol)) {
    echo json_encode(["success" => false, "message" => "Complete todos los campos."]);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM usuarios WHERE correo = ?");
$stmt->bind_param("s", $correo);
$stmt->execute();
$result = $stmt->get_result();


if ($result->num_rows > 0) {
    $usuario = $result->fetch_assoc();
    if (password_verify($clave, $usuario['clave'])) {
        session_start();
        $_SESSION['usuario'] = $usuario['nombre'];
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Contraseña incorrecta."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Correo incorrecto."]);
}

$stmt->close();
$conn->close();
?>
