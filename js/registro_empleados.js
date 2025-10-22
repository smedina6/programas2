

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formEmpleado');
  const paisSelect = document.getElementById('pais');
  const departamentoSelect = document.getElementById('departamento');
  const ciudadSelect = document.getElementById('ciudad');
  const tipoSelect = document.getElementById('tipo_documento');
  const estadoCivilSelect = document.getElementById('estado_civil');
  const condicionSelect = document.getElementById('condicion');
  const etniaSelect = document.getElementById('etnia');
  const estadoSelect = document.getElementById('estado');
  const rolSelect=document.getElementById('rol')



  // ====== Cargar Tipos de Documento desde PHP ======
  fetch('php/obtener_tipos_documento.php')
    .then(res => res.json())
    .then(data => {
      data.forEach(tipo => {
        const option = document.createElement('option');
        option.value = tipo.id_tipo_documento;
        option.textContent = tipo.nombre_tipo;
        tipoSelect.appendChild(option);
      });
    })
    .catch(err => console.error('Error cargando tipos de documento:', err));

  fetch('php/obtener_datos_pais.php?accion=pais')
    .then(res => res.json())
    .then(data => {
      data.forEach(pais => {
        const option = document.createElement('option');
        option.value = pais.id_pais;
        option.textContent = pais.nombre;
        paisSelect.appendChild(option);
      });
    })
    .catch(err => console.error('Error cargando paises:', err));

  // ====== Cambios en País ======
  paisSelect.addEventListener('change', () => {
    const idPais = paisSelect.value;
    departamentoSelect.innerHTML = '<option value="">Seleccione un departamento...</option>';
    ciudadSelect.innerHTML = '<option value="">Seleccione una ciudad...</option>';

    if (!idPais) return;

    fetch(`php/obtener_datos_pais.php?accion=departamento&id_pais=${idPais}`)
      .then(res => res.json())
      .then(data => {
        data.forEach(d => {
          const option = document.createElement('option');
          option.value = d.id_departamento;
          option.textContent = d.nombre;
          departamentoSelect.appendChild(option);
        });
      })
      .catch(err => console.error('Error cargando departamentos:', err));
  });

  // ====== Cambios en Departamento ======
  departamentoSelect.addEventListener('change', () => {
    const idDepartamento = departamentoSelect.value;
    ciudadSelect.innerHTML = '<option value="">Seleccione una ciudad...</option>';

    if (!idDepartamento) return;

    fetch(`php/obtener_datos_pais.php?accion=ciudad&id_departamento=${idDepartamento}`)
      .then(res => res.json())
      .then(data => {
        data.forEach(c => {
          const option = document.createElement('option');
          option.value = c.id_ciudad;
          option.textContent = c.nombre;
          ciudadSelect.appendChild(option);
        });
      })
      .catch(err => console.error('Error cargando ciudades:', err));
  });

  // ====== Cargar Estado Civil desde PHP ======
  fetch('php/obtener_estados_civiles.php')
    .then(res => res.json())
    .then(data => {
      console.log("Etnias recibidas:", data); 
      data.forEach(e => {
        const option = document.createElement('option');
        option.value = e.id_estado;
        option.textContent = e.nombre_estado;
        estadoCivilSelect.appendChild(option);
      });
    })
    .catch(err => console.error('Error cargando estados civiles:', err));

  // ====== Cargar Condiciones desde PHP ======
  fetch('php/obtener_condiciones.php')
    .then(res => res.json())
    .then(data => {
      data.forEach(c => {
        const option = document.createElement('option');
        option.value = c.id_condicion;
        option.textContent = c.nombre_condicion;
        condicionSelect.appendChild(option);
      });
    })
    .catch(err => console.error('Error cargando condiciones:', err));

  // ====== Cargar Etnias desde PHP ======
  fetch('php/obtener_etnias.php')
    .then(res => res.json())
    .then(data => {
      data.forEach(c => {
        const option = document.createElement('option');
        option.value = c.id_etnia;
        option.textContent = c.nombre_etnia;
        etniaSelect.appendChild(option);
      });
    })
    .catch(err => console.error('Error cargando etnias:', err));

  fetch('php/obtener_estados.php')
    .then(res => res.json())
    .then(data => {
       data.forEach(c => {
      const option = document.createElement('option');
      option.value = c.id_estado;
      option.textContent = c.nombre_estado;
      estadoSelect.appendChild(option);
    });
    })
    .catch(err => console.error('Error cargando estado:', err));

  fetch('php/obtener_rol.php')
  .then(res => res.json())
  .then(data => {
    const rolSelect = document.getElementById('rol');
    data.forEach(r => {
      const option = document.createElement('option');
      option.value = r.id_rol;
      option.textContent = r.nombre_rol;
      rolSelect.appendChild(option);
    });
  })
  .catch(err => console.error('Error cargando roles:', err));

  // ====== Enviar Formulario ======
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const datos = new FormData(form);

    fetch('php/registrar_usuario.php', {
  method: 'POST',
  body: datos
})
.then(async res => {
  const texto = await res.text();
  console.log("Respuesta del servidor:", texto);
  try {
    return JSON.parse(texto);
  } catch (e) {
    throw new Error("El servidor no devolvió JSON válido: " + texto);
  }
})
.then(data => {
  if (data.status === 'ok') {
    alert("Empleado registrado correctamente.");
    form.reset();
  } else {
    alert("Error: " + data.mensaje);
  }
})
.catch(err => {
  console.error("Error de conexión con el servidor:", err);
  alert("Error de conexión con el servidor.");
});
  });
});
