// Datos simulados si no hay conexión a base de datos
const conglomerados = [
  { id: 1, nombre: "Conglomerado 1", ubicacion: "4.71, -74.07", brigada: "Brigada A" },
  { id: 2, nombre: "Conglomerado 2", ubicacion: "6.24, -75.58", brigada: "Brigada B" },
  { id: 3, nombre: "Conglomerado 3", ubicacion: "3.45, -76.53", brigada: "Brigada C" },
  { id: 4, nombre: "Conglomerado 4", ubicacion: "10.39, -75.47", brigada: "Brigada D" }
];

// Función para cerrar sesión
function cerrarSesion() {
  alert("Sesión cerrada.");
  window.location.href = "login.html";
}

// Función para cargar la tabla con datos
function cargarTabla() {
  const tabla = document.getElementById("tabla-conglomerados");

  // Limpiar tabla (excepto encabezado)
  tabla.innerHTML = `<tr><th>ID</th><th>Nombre</th><th>Ubicación</th><th>Brigada Asignada</th></tr>`;

  // Agregar filas
  conglomerados.forEach(c => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${c.id}</td>
      <td>${c.nombre}</td>
      <td>${c.ubicacion}</td>
      <td>${c.brigada}</td>
    `;
    tabla.appendChild(fila);
  });
}

// Simular conexión a BD (si falla, usa datos locales)
function obtenerDatos() {
  // Simular fetch fallido
  const conexionBD = false; 

  if (conexionBD) {
    // Aquí iría código real de fetch a base de datos
  } else {
    cargarTabla(); // usa datos locales
  }
}

// Ejecutar al cargar
document.addEventListener("DOMContentLoaded", obtenerDatos);
