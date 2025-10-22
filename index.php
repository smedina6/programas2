<?php
include 'php/conexion.php';
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>EcoDatos - Inicio</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="css/iniciosesion.css" />
  <script src="js/app.js" defer></script>
</head>
<body>
  <!-- Encabezado -->
  <header id="header" class="hidden">
    <h1>EcoDatos</h1>
    <div class="header-buttons">
      <button class="menu" onclick="mostrarMenu()">Menú</button>
      <button class="logout" onclick="cerrarSesion()">Cerrar Sesión</button>
    </div>
  </header>

  <!-- LOGIN MODERNO -->
  <main id="login-section">
    <div class="card">
      <header class="card__header">
        <div class="logo"><span>ED</span></div>
        <div class="title">
          <h1>EcoDatos</h1>
        </div>
      </header>

      <form id="loginForm">
        <p class="error" id="errorBox">Por favor, revisa tu correo y contraseña.</p>
        <div class="field">
          <label for="usuario">Correo electrónico</label>
          <input class="input" id="usuario" type="email" placeholder="tu@correo.com" required />
        </div>
        <div class="field">
          <label for="clave">Contraseña</label>
          <input class="input" id="clave" type="password" placeholder="••••••••" minlength="6" required />
        </div>
        <div class="actions">
        </div>
        <button class="btn" type="submit">Iniciar sesión</button>
        <p class="note">Accede para continuar con tus datos forestales.</p>
      </form>

      <footer>© <span id="year"></span> EcoDatos · Todos los derechos reservados</footer>
    </div>
  </main>

  <!-- MENÚ PRINCIPAL -->
  <main id="menu" class="hidden">
    <h2>Menú Principal</h2>
    <button class="nav" onclick="abrirPagina('pages/brigadas/asignar_brigada.html')">Asignar Brigada</button>
    <button class="nav" onclick="abrirPagina('pages/conglomerados/ver_conglomerados.html')">Ver conglomerado</button>
    <button class="nav" onclick="abrirPagina('pages/conglomerados/lista_conglomerados.html')">Lista de Conglo-brigad</button>
    <button class="nav" onclick="abrirPagina('pages/conglomerados/filtrar_conglomerados.html')">Filtrar Conglomerados</button>
    <button class="nav" onclick="abrirPagina('pages/brigadas/brigadista_conglomerados.html')">Conglomerados Aceptados</button>
    <button class="nav" onclick="abrirPagina('pages/admin/registrar_empleados.php')">Registrar usuario</button>
  </main>

  <iframe id="contenido" class="hidden"></iframe>
</body>
</html>
