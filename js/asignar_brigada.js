document.addEventListener("DOMContentLoaded", async () => {
  const form = document.querySelector("form");
  const selectConglomerado = document.getElementById("id_conglomerado");
  const selectBrigada = document.getElementById("brigada");

  // --- Datos de respaldo ---
  const conglomeradosFallback = [
    { id: 1, nombre: "Bosque Amazonas" },
    { id: 2, nombre: "Bosque Chocó" },
    { id: 3, nombre: "Bosque Guaviare" },
    { id: 4, nombre: "Bosque Caquetá" }
  ];

  const brigadasFallback = [
    { id: 1, nombre: "Brigada A5b" },
    { id: 2, nombre: "Brigada B7y" },
    { id: 3, nombre: "Brigada C6y" },
    { id: 4, nombre: "Brigada D5f" }
  ];

  // --- Función para cargar select dinámicamente ---
  async function cargarSelect(url, selectElement, fallback, label = "Seleccione") {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Error al cargar datos.");
      const datos = await response.json();

      selectElement.innerHTML = `<option value="">${label}</option>`;
      datos.forEach(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.nombre;
        selectElement.appendChild(option);
      });

    } catch (error) {
      console.warn(`⚠️ No se pudo cargar desde ${url}. Usando datos de respaldo.`, error);
      selectElement.innerHTML = `<option value="">${label}</option>`;
      fallback.forEach(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.nombre;
        selectElement.appendChild(option);
      });
    }
  }

  // Cargar conglomerados y brigadas
  await cargarSelect("../../php/obtener_conglomerados.php", selectConglomerado, conglomeradosFallback, "Seleccione un conglomerado");
  await cargarSelect("../../php/obtener_brigadas.php", selectBrigada, brigadasFallback, "Seleccione una brigada");

  // --- Envío del formulario ---
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const idConglomerado = formData.get("id_conglomerado");
    const idBrigada = formData.get("brigada");

    try {
      const response = await fetch("../../php/asignar_brigada.php", {
        method: "POST",
        body: formData
      });

      if (!response.ok) throw new Error("No se pudo conectar con el servidor PHP.");

      const texto = await response.text();
      alert(texto);
      form.reset();

    } catch (error) {
      console.warn("⚠️ No hay conexión con PHP o base de datos:", error);
      // Simulación del envío
      alert(`✅ (Simulado) Brigada '${selectBrigada.selectedOptions[0].text}' asignada al conglomerado '${selectConglomerado.selectedOptions[0].text}'.`);
      form.reset();
    }
  });
});
