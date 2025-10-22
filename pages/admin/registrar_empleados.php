<?php
include '../../php/conexion.php';
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registro de Empleados</title>
  <script src="https://cdn.jsdelivr.net/npm/country-state-city@3.1.0/dist/index.min.js"></script>
  <link rel="stylesheet" href="../../css/registrosesion.css">
  <script src="../../js/registro_empleados.js" defer></script>
  
</head>
<body>
  <div class="container">
   <main id="registro-section">
    
    <div class="card">
      <header class="card__header">
        <div class="logo"><span>ED</span></div>
        
        <div class="title">
          <h1>EcoDatos</h1>
          <p>Registro de usuario</p>
        </div>
      </header>

      <form id="formEmpleado">
        <fieldset>
          <legend>Datos Personales</legend>

          <label for="tipo_documento">Tipo de documento:</label>
          <select id="tipo_documento" name="tipo_documento" required>
            <option value="">Seleccione...</option>
          </select>

          <label for="documento">Número de documento:</label>
          <input type="text" id="documento" name="documento" required>

          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" required>

          <label for="apellido">Apellido:</label>
          <input type="text" id="apellido" name="apellido" required>

          <label for="pais">País de origen:</label>
          <select id="pais" name="pais" required>
            <option value="">Seleccione un país...</option>
          </select>

          <label for="departamento">Departamento:</label>
          <select id="departamento" name="departamento" required>
            <option value="">Seleccione un departamento...</option>
          </select>

          <label for="ciudad">Ciudad:</label>
          <select id="ciudad" name="ciudad" required>
            <option value="">Seleccione una ciudad...</option>
          </select>

          <label for="estado_civil">Estado civil:</label>
          <select id="estado_civil" name="estado_civil" required>
            <option value="">Seleccione...</option>
          </select>

          <label for="condicion">¿Padece alguna condición?</label>
          <select id="condicion" name="condicion">
            <option value="">Seleccione...</option>
          </select>

          <label for="etnia">¿Pertenece a alguna etnia?</label>
          <select id="etnia" name="etnia">
            <option value="">Seleccione...</option>
          </select>
        </fieldset>

        <fieldset>
          <legend>Contacto</legend>
          <label for="correo">Correo electrónico:</label>
          <input type="email" id="correo" name="correo" required>

          <label for="telefono">Teléfono:</label>
          <input type="tel" id="telefono" name="telefono">

          <label for="direccion">Dirección:</label>
          <input type="text" id="direccion" name="direccion">
        </fieldset>

        <fieldset>
          <legend>Credenciales</legend>
          <label for="usuario">Usuario:</label>
          <input type="text" id="usuario" name="usuario" required>

          <label for="contrasena">Contraseña:</label>
          <input type="password" id="contrasena" name="contrasena" required>  
        </fieldset>

        <fieldset>
          <legend>Estudios</legend>
          <label for="estudios">Agregar estudios (separados por coma):</label>
          <input type="text" id="estudios" name="estudios">
        </fieldset>

        <fieldset>
          <legend>Otros Datos</legend>
          <label for="fecha_ingreso">Fecha de ingreso:</label>
          <input type="date" id="fecha_ingreso" name="fecha_ingreso">

          <label for="estado">Estado:</label>
          <select id="estado" name="estado">
            <option value="">Seleccione...</option>
          </select>

          <label for="rol">Rol:</label>
          <select id="rol" name="rol">
            <option value="">Seleccione...</option>
          </select>

          <label for="comentarios">Comentarios:</label>
          <textarea id="comentarios" name="comentarios" rows="3"></textarea>
        </fieldset>

        <button class="btn" type="submit">Crear cuenta</button>
      </form>
    </div>
  </main>
  </div>
</body>
</html>

