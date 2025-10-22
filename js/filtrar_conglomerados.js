// Datos "almacenados" por defecto
const defaultConglomerados = [
  { id: 1, nombre: "Conglomerado 1", ubicacion: "4.71, -74.07", especies: ["Roble", "Pino"], vegetacion: "Bosque" },
  { id: 2, nombre: "Conglomerado 2", ubicacion: "6.24, -75.58", especies: ["Cedro", "Guayacán"], vegetacion: "Selva" },
  { id: 3, nombre: "Conglomerado 3", ubicacion: "3.45, -76.53", especies: ["Roble", "Cedro"], vegetacion: "Bosque" },
];

// Simulación de "consulta a base de datos"
function consultarBaseDatos() {
  return []; // vacío = no hay datos
}

// Genera datos aleatorios
function generarDatosAleatorios(cantidad) {
  const nombres = ["Conglomerado A", "Conglomerado B", "Conglomerado C", "Conglomerado D"];
  const vegetaciones = ["Bosque", "Selva", "Sabana"];
  const especiesList = ["Roble", "Pino", "Cedro", "Guayacán", "Caoba", "Nogal"];

  const datos = [];
  for (let i = 0; i < cantidad; i++) {
    const id = i + 10;
    const nombre = nombres[Math.floor(Math.random() * nombres.length)] + " " + id;
    const ubicacion = (Math.random() * 10).toFixed(2) + ", " + (-70 - Math.random() * 10).toFixed(2);
    const vegetacion = vegetaciones[Math.floor(Math.random() * vegetaciones.length)];
    const especies = [];
    const cantidadEspecies = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < cantidadEspecies; j++) {
      const especie = especiesList[Math.floor(Math.random() * especiesList.length)];
      if (!especies.includes(especie)) especies.push(especie);
    }
    datos.push({ id, nombre, ubicacion, vegetacion, especies });
  }
  return datos;
}

// Obtener datos
let conglomerados = consultarBaseDatos();
if (conglomerados.length === 0) {
  conglomerados = [...defaultConglomerados, ...generarDatosAleatorios(5)];
}

// Referencias a elementos
const tableBody = document.querySelector("#resultados tbody");
const filterForm = document.getElementById("filterForm");
const vegetacionInput = document.getElementById("vegetacion");
const especieInput = document.getElementById("especie");

function mostrarResultados(datos) {
  tableBody.innerHTML = "";
  if (datos.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="4">No se encontraron resultados</td></tr>`;
    return;
  }
  datos.forEach(c => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${c.id}</td>
                     <td>${c.nombre}</td>
                     <td>${c.ubicacion}</td>
                     <td>${c.especies.join(", ")}</td>
                     <td>${c.vegetacion}</td>`;
    tableBody.appendChild(row);
  });
}

// Filtrado case-insensitive y parcial
filterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const veg = vegetacionInput.value.trim().toLowerCase();
  const esp = especieInput.value.trim().toLowerCase();

  const resultados = conglomerados.filter(c => {
    const vegetacionCoincide = !veg || c.vegetacion.toLowerCase().includes(veg);
    const especieCoincide = !esp || c.especies.some(s => s.toLowerCase().includes(esp));
    return vegetacionCoincide && especieCoincide;
  });

  mostrarResultados(resultados);
});

// Mostrar todos al iniciar
mostrarResultados(conglomerados);

// Botones
document.getElementById("logout").addEventListener("click", () => {
  alert("Sesión cerrada.");
  window.location.href = "login.html";
});

document.getElementById("menu").addEventListener("click", () => {
  window.location.href = "index.html";
});
