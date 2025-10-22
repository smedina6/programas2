<?php include '../php/cerrar/header.php'; ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menú Principal</title>
    <link rel="stylesheet" href="../css/iniciosesion.css">
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
    <main id="menu">
        <h2>Menú Principal</h2>
        <div class="botones">
            <button class="nav" onclick="abrirPagina('pages/brigadas/asignar_brigada.html')">Asignar Brigada</button>
            <button class="nav" onclick="abrirPagina('pages/conglomerados/ver_conglomerados.html')">Ver Conglomerado</button>
            <button class="nav" onclick="abrirPagina('pages/conglomerados/lista_conglomerados.html')">Lista de Conglo-brigad</button>
            <button class="nav" onclick="abrirPagina('pages/conglomerados/filtrar_conglomerados.html')">Filtrar Conglomerados</button>
            <button class="nav" onclick="abrirPagina('pages/brigadas/brigadista_conglomerados.html')">Conglomerados Aceptados</button>
            <button class="nav" onclick="abrirPagina('pages/admin/registrar_empleados.php')">Registrar Usuario</button>
        </div>
    </main>
</body>
</html>
