
const mapElement = document.getElementById('map');
if (!mapElement) {
  console.error("❌ No se encontró el elemento 'map' en el HTML.");
} else {
  const map = L.map('map').setView([4.5, -74.0], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  let conglomerados = [];
  const shapes = {};
  let contadorID = 1;

  // Si no existe la variable REGIONES_COLOMBIA, crear un arreglo de ejemplo
  const REGIONES_COLOMBIA = window.REGIONES_COLOMBIA || [
    { nombre: "Andina", minLat: 3.0, maxLat: 6.0, minLon: -76.0, maxLon: -72.0 },
    { nombre: "Caribe", minLat: 9.0, maxLat: 11.5, minLon: -75.5, maxLon: -73.0 },
    { nombre: "Pacífica", minLat: 2.5, maxLat: 6.0, minLon: -78.0, maxLon: -76.0 },
    { nombre: "Orinoquía", minLat: 4.0, maxLat: 7.5, minLon: -73.0, maxLon: -68.0 },
    { nombre: "Amazonía", minLat: -1.0, maxLat: 3.5, minLon: -74.0, maxLon: -69.0 }
  ];

  // ================================
  // 🔢 FUNCIONES AUXILIARES
  // ================================
  const getRandomFloat = (min, max) => +(Math.random() * (max - min) + min).toFixed(4);

  function generarCoordenadaAleatoria() {
    if (!REGIONES_COLOMBIA.length) {
      console.warn("⚠️ No hay regiones cargadas, usando coordenadas por defecto.");
      return [4.5, -74.0];
    }
    const region = REGIONES_COLOMBIA[Math.floor(Math.random() * REGIONES_COLOMBIA.length)];
    const latitud = getRandomFloat(region.minLat, region.maxLat);
    const longitud = getRandomFloat(region.minLon, region.maxLon);
    return [latitud, longitud];
  }

  function agregarConglomeradoAlMapa(c) {
    const [lat, lon] = c.coords;
    const radioConglomerado = 95;
    const radioSubparcela = 15;
    const distancia = 80;

    const deltaLat = distancia / 111320;
    const deltaLon = distancia / (111320 * Math.cos(lat * Math.PI / 180));

    // Fondo del conglomerado
    const fondo = L.circle(c.coords, {
      radius: radioConglomerado,
      color: "#228B22",
      fillColor: "#7CFC00",
      fillOpacity: 0.2
    })
      .addTo(map)
      .bindPopup(`<b>${c.nombre}</b><br>${c.ubicacion}<br>Conglomerado con 5 subparcelas.`);

    // Crear las 5 subparcelas
    const posiciones = [
      [lat, lon],
      [lat + deltaLat, lon],
      [lat - deltaLat, lon],
      [lat, lon + deltaLon],
      [lat, lon - deltaLon]
    ];

    const subparcelas = posiciones.map(p =>
      L.circle(p, {
        radius: radioSubparcela,
        color: "#0b3d2e",
        fillColor: "#1f7a5b",
        fillOpacity: 0.6
      })
        .addTo(map)
        .bindPopup(`<b>${c.nombre}</b><br>${c.ubicacion}<br>Subparcela circular (radio 15 m).`)
    );

    shapes[c.id] = { fondo, subparcelas };
  }

  function renderizarLista(lista) {
    const contenedor = document.getElementById('lista-conglomerados');
    if (!contenedor) {
      console.error("❌ No se encontró el contenedor 'lista-conglomerados'.");
      return;
    }

    contenedor.innerHTML = '';

    lista.forEach(c => {
      const div = document.createElement('div');
      div.classList.add('conglomerado');
      div.innerHTML = `
        <div class="info">
          <strong class="nombre-link" style="color:#007bff; cursor:pointer; text-decoration:underline;">
            ${c.nombre}
          </strong><br>
          <small>${c.ubicacion}</small>
        </div>
        <div class="botones">
          <button class="btn-guardar" data-id="${c.id}">Registrar</button>
          <button class="btn-eliminar" data-id="${c.id}">Eliminar</button>
        </div>
      `;
      contenedor.appendChild(div);
    });

    // Asignar eventos
    contenedor.querySelectorAll('.nombre-link').forEach(link =>
      link.addEventListener('click', e => {
        const nombre = e.target.textContent.trim();
        const c = conglomerados.find(x => x.nombre === nombre);
        if (c) mostrarEnMapa(c.id);
      })
    );

    contenedor.querySelectorAll('.btn-guardar').forEach(btn =>
      btn.addEventListener('click', e => guardarConglomerado(Number(e.target.dataset.id)))
    );

    contenedor.querySelectorAll('.btn-eliminar').forEach(btn =>
      btn.addEventListener('click', e => eliminarConglomerado(Number(e.target.dataset.id)))
    );
  }

  function generarConglomerados() {
    limpiarMapa();
    const cantidad = 5;

    for (let i = 0; i < cantidad; i++) {
      const coords = generarCoordenadaAleatoria();
      const nombre = `Conglomerado ${contadorID}`;
      const ubicacion = `${coords[0].toFixed(4)}, ${coords[1].toFixed(4)}`;

      const nuevo = { id: contadorID++, nombre, ubicacion, coords };
      conglomerados.push(nuevo);
      agregarConglomeradoAlMapa(nuevo);
    }

    renderizarLista(conglomerados);
    mostrarMensaje(`🆕 Se generaron ${cantidad} conglomerados aleatorios.`);
  }

  function filtrarConglomerados() {
    const input = document.getElementById('buscar');
    if (!input) return;
    const busqueda = input.value.toLowerCase();
    const filtrados = conglomerados.filter(c =>
      c.nombre.toLowerCase().includes(busqueda) ||
      c.ubicacion.toLowerCase().includes(busqueda)
    );
    renderizarLista(filtrados);
  }

  function mostrarEnMapa(id) {
    const shape = shapes[id];
    if (shape && shape.fondo) {
      map.fitBounds(shape.fondo.getBounds());
      shape.fondo.openPopup();
    }
  }

  function guardarConglomerado(id) {
  const c = conglomerados.find(x => x.id === id);
  if (!c) return mostrarMensaje("❌ Conglomerado no encontrado.");

 
  fetch('/ecodatos/php/guardar_conglomerado.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `nombre=${encodeURIComponent(c.nombre)}&lat=${c.coords[0]}&lon=${c.coords[1]}&id_brigada=1`
  })
  .then(res => res.json())
  .then(data => {
    mostrarMensaje(data.success ? `✅ ${data.message}` : `❌ ${data.message}`);
  })
  .catch(err => {
    mostrarMensaje(` Error en la conexión: ${err}`);
  });


}


  function eliminarConglomerado(id) {
    const c = conglomerados.find(x => x.id === id);
    if (!c) return;
    conglomerados = conglomerados.filter(x => x.id !== id);

    if (shapes[id]) {
      map.removeLayer(shapes[id].fondo);
      shapes[id].subparcelas.forEach(s => map.removeLayer(s));
      delete shapes[id];
    }

    renderizarLista(conglomerados);
    mostrarMensaje(`🗑️ Conglomerado "${c.nombre}" eliminado.`);
  }

  function limpiarMapa() {
    Object.values(shapes).forEach(s => {
      map.removeLayer(s.fondo);
      s.subparcelas.forEach(sub => map.removeLayer(sub));
    });
    Object.keys(shapes).forEach(id => delete shapes[id]);
    conglomerados = [];
    contadorID = 1;
  }
  function mostrarMensaje(texto) {
    let mensajeDiv = document.getElementById('mensaje-temporal');
    if (!mensajeDiv) {
      mensajeDiv = document.createElement('div');
      mensajeDiv.id = 'mensaje-temporal';
      mensajeDiv.style.position = 'fixed';
      mensajeDiv.style.bottom = '20px';
      mensajeDiv.style.right = '20px';
      mensajeDiv.style.background = '#333';
      mensajeDiv.style.color = '#fff';
      mensajeDiv.style.padding = '10px 15px';
      mensajeDiv.style.borderRadius = '8px';
      mensajeDiv.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
      mensajeDiv.style.zIndex = '9999';
      document.body.appendChild(mensajeDiv);
    }
    mensajeDiv.textContent = texto;
    mensajeDiv.style.opacity = '1';
    setTimeout(() => mensajeDiv.style.opacity = '0', 2500);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const buscarInput = document.getElementById('buscar');
    if (buscarInput) buscarInput.addEventListener('input', filtrarConglomerados);

    const generarBtn = document.getElementById('btn-generar');
    if (generarBtn) generarBtn.addEventListener('click', generarConglomerados);
  });
}
