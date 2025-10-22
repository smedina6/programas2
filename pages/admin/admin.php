<?php
session_start();

// Verificar que haya sesión y que el rol sea administrador
if (!isset($_SESSION['usuario']) || $_SESSION['rol'] !== 'Administrador') {
  header("Location: ../../index.php");
  exit;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Panel del Administrador</title>
  <link rel="stylesheet" href="admin.css">
</head>
<body>

  <header>
    <h1>Panel del Administrador</h1>
    <div class="usuario">
      <span>👤 <?php echo $_SESSION['nombre']; ?></span>
      <button onclick="cerrarSesion()">Cerrar sesión</button>
    </div>
  </header>

  <!-- MENÚ PRINCIPAL -->
  <main id="menu">
    <h2>Menú Principal</h2>
    <div class="botones">
      <button class="nav" onclick="abrirPagina('../../pages/brigadas/asignar_brigada.html')">Asignar Brigada</button>
      <button class="nav" onclick="abrirPagina('../../pages/conglomerados/ver_conglomerados.html')">Ver Conglomerado</button>
      <button class="nav" onclick="abrirPagina('../../pages/conglomerados/lista_conglomerados.html')">Lista de Conglo-brigad</button>
      <button class="nav" onclick="abrirPagina('../../pages/conglomerados/filtrar_conglomerados.html')">Filtrar Conglomerados</button>
      <button class="nav" onclick="abrirPagina('../../pages/brigadas/brigadista_conglomerados.html')">Conglomerados Aceptados</button>
      <button class="nav" onclick="abrirPagina('../../pages/admin/registrar_empleados.php')">Registrar Usuario</button>
    </div>
  </main>

  <!-- CONTENIDO CARGADO -->
  <iframe id="contenido" class="hidden"></iframe>

  <script src="admin.js"></script>
</body>
</html>
