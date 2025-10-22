<?php
include('conexion.php');

$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
  $nombre = $conn->real_escape_string($data['nombre']);
  $ubicacion = $conn->real_escape_string($data['ubicacion']);

  $sql = "INSERT INTO conglomerado (nombre, ubicacion) VALUES ('$nombre', '$ubicacion')";
  if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "ok", "mensaje" => "Conglomerado registrado"]);
  } else {
    echo json_encode(["status" => "error", "mensaje" => $conn->error]);
  }
}

$conn->close();
?>
