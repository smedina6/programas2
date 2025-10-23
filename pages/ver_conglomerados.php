<?php
include '../php/conexion.php';
include '../php/cerrar/header.php';
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>EcoDatos - Ver Conglomerados</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
  <link rel="stylesheet" href="../css/ver_conglomerados.css">
  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script src="../js/mapa.js" defer></script>
    <script>
        function abrirPagina(url) {
            window.location.href = url;
        }
    </script>
    <style>
        body {
            margin-top: 60px; 
        }
    </style>
</head>
<body>

  <div class="content">
    <div class="sidebar">
      <h2>Lista de Conglomerados Generados</h2>
      <input type="text" id="buscar" placeholder="Buscar conglomerado...">
      <div id="lista-conglomerados"></div>
    <p class="descripcion">
      Revisa los conglomerados propuestos y elige si deseas registrarlos o eliminarlos.
    </p>

    <div id="lista-conglomerados"></div>

    <div class="acciones">
      <button onclick="generarConglomerados()">➕ Generar Nuevos</button>
    </div>
    </div>
    <div id="map"></div>
  </div>

  <footer>
    &copy; 2025 EcoDatos - Inventario Forestal
  </footer>
</body>
</html>
