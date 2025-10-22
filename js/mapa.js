// Inicializar mapa
const map = L.map('map').setView([4.5, -74.0], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Lista de conglomerados base
let conglomerados = [
  { id: 1, nombre: "Bosque Amazonas", ubicacion: "Leticia, Amazonas", coords: [-4.2153, -69.9406] },
  { id: 2, nombre: "Bosque Chocó", ubicacion: "Nuquí, Chocó", coords: [5.7074, -77.2707] },
  { id: 3, nombre: "Bosque Guaviare", ubicacion: "San José del Guaviare, Guaviare", coords: [2.5739, -72.6459] },
  { id: 4, nombre: "Bosque Caquetá", ubicacion: "Florencia, Caquetá", coords: [1.615, -75.6062] }
];

// Diccionario para círculos en el mapa
const shapes = {};

function cargarMapa() {
  conglomerados.forEach(c => {
    const [lat, lon] = c.coords;
    const radioconglomerado= 95;
    const radioSubparcela = 15;
    const distancia = 80;

    const deltaLat = distancia / 111320;
    const deltaLon = distancia / (111320 * Math.cos(lat * Math.PI / 180));

    const fondo = L.circle(c.coords, {
      radius:  radioconglomerado,
      color: "#228B22",
      fillColor: "#7CFC00",
      fillOpacity: 0.2
    })
    .addTo(map)
    .bindPopup(`<b>${c.nombre}</b><br>${c.ubicacion}<br>Conglomerado (5 subparcelas).`);

    const posiciones = [
      [lat, lon],
      [lat + deltaLat, lon],
      [lat - deltaLat, lon],
      [lat, lon + deltaLon],
      [lat, lon - deltaLon]
    ];

    const subparcelas = [];

    posiciones.forEach(p => {
      const circle = L.circle(p, {
        radius: radioSubparcela,
        color: "#0b3d2e",
        fillColor: "#1f7a5b",
        fillOpacity: 0.6
      })
      .addTo(map)
      .bindPopup(`<b>${c.nombre}</b><br>${c.ubicacion}<br>Subparcela circular (radio 15 m).`);
      subparcelas.push(circle);
    });

    shapes[c.id] = { fondo, subparcelas };
  });
}

// Renderizar lista lateral
function renderizarLista(lista) {
  const contenedor = document.getElementById('lista-conglomerados');
  contenedor.innerHTML = '';

  lista.forEach(c => {
    const div = document.createElement('div');
    div.classList.add('conglomerado');
    div.innerHTML = `
      <div class="info">
        <strong class="nombre-link" style="color:#007bff; cursor:pointer; text-decoration:underline;">${c.nombre}</strong><br>
        <small>${c.ubicacion}</small>
      </div>
      <div class="botones">
        <button class="btn-guardar" onclick="guardarConglomerado(${c.id})">Registrar</button>
        <button class="btn-eliminar" onclick="eliminarConglomerado(${c.id})">Eliminar</button>
      </div>
    `;

    // Solo el nombre hace el centrado en el mapa
    div.querySelector('.nombre-link').addEventListener('click', () => mostrarEnMapa(c.id));
    contenedor.appendChild(div);
  });
}

// Buscar conglomerados
function filtrarConglomerados() {
  const busqueda = document.getElementById('buscar').value.toLowerCase();
  const filtrados = conglomerados.filter(c =>
    c.nombre.toLowerCase().includes(busqueda) || c.ubicacion.toLowerCase().includes(busqueda)
  );
  renderizarLista(filtrados);
}

// Mostrar en mapa
function mostrarEnMapa(id) {
  const shape = shapes[id];
  if (shape && shape.fondo) {
    map.fitBounds(shape.fondo.getBounds());
    shape.fondo.openPopup();
  }
}

// Acciones de los botones
function guardarConglomerado(id) {
  const c = conglomerados.find(x => x.id === id);
  alert(`✅ Conglomerado "${c.nombre}" registrado con éxito.`);
}

function eliminarConglomerado(id) {
  conglomerados = conglomerados.filter(c => c.id !== id);
  if (shapes[id]) {
    map.removeLayer(shapes[id].fondo);
    shapes[id].subparcelas.forEach(s => map.removeLayer(s));
  }
  renderizarLista(conglomerados);
}

function generarConglomerados() {
  alert("🆕 Nuevos conglomerados generados (simulación).");
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  cargarMapa();
  renderizarLista(conglomerados);
  document.getElementById('buscar').addEventListener('input', filtrarConglomerados);
});
