document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#tabla-conglomerados tbody");
  const filtroInput = document.getElementById("filtro");
  const btnPrev = document.getElementById("prev");
  const btnNext = document.getElementById("next");
  const spanPagina = document.getElementById("pagina-actual");

  let datos = [];
  let paginaActual = 1;
  const filasPorPagina = 10; // máximo 10 por página

  function mostrarTabla() {
    tbody.innerHTML = "";

    const filtro = filtroInput.value.toLowerCase();
    const datosFiltrados = datos.filter(c => c.nombre.toLowerCase().includes(filtro));

    const totalPaginas = Math.ceil(datosFiltrados.length / filasPorPagina);
    if (paginaActual > totalPaginas) paginaActual = totalPaginas || 1;

    const inicio = (paginaActual - 1) * filasPorPagina;
    const fin = inicio + filasPorPagina;
    const paginaDatos = datosFiltrados.slice(inicio, fin);

    if (paginaDatos.length === 0) {
      tbody.innerHTML = `<tr><td colspan="3">No hay conglomerados para mostrar.</td></tr>`;
    } else {
      paginaDatos.forEach(c => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td>${c.id}</td>
          <td>${c.nombre}</td>
          <td>${c.ubicacion}</td>
        `;
        tbody.appendChild(fila);
      });
    }

    spanPagina.textContent = `${paginaActual} / ${totalPaginas || 1}`;

    // Deshabilitar botones si no hay más páginas
    btnPrev.disabled = paginaActual === 1;
    btnNext.disabled = paginaActual === totalPaginas || totalPaginas === 0;
  }

  btnPrev.addEventListener("click", () => {
    if (paginaActual > 1) {
      paginaActual--;
      mostrarTabla();
    }
  });

  btnNext.addEventListener("click", () => {
    const totalPaginas = Math.ceil(datos.filter(c => c.nombre.toLowerCase().includes(filtroInput.value.toLowerCase())).length / filasPorPagina);
    if (paginaActual < totalPaginas) {
      paginaActual++;
      mostrarTabla();
    }
  });

  filtroInput.addEventListener("input", () => {
    paginaActual = 1;
    mostrarTabla();
  });

  // Datos simulados de prueba (puedes reemplazar con PHP)
  datos = [];
  for (let i = 1; i <= 25; i++) {
    datos.push({
      id: i,
      nombre: `Conglomerado Demo ${i}`,
      ubicacion: `${(4 + Math.random() * 2).toFixed(2)}, ${( -74 + Math.random() * 2).toFixed(2)}`
    });
  }

  mostrarTabla();
});
