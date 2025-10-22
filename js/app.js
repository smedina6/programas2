document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const msgBox = document.getElementById('msg');
  const viewAdmin = document.getElementById('view-admin');
  const viewTecnico = document.getElementById('view-tecnico');
  const viewBrigada = document.getElementById('view-brigada');
  const viewPublic = document.getElementById('view-public');

  // Ocultar todas las vistas
  const hideAllViews = () => {
    [viewAdmin, viewTecnico, viewBrigada, viewPublic].forEach(v => {
      if (v) v.style.display = 'none';
    });
  };

  // Mostrar vista publica inicialmente
  hideAllViews();
  if (viewPublic) viewPublic.style.display = 'block';

  if (!form) return;

  // Evento de login
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const clave = document.getElementById('clave').value;

    if (!usuario || !clave) {
      msgBox.textContent = 'Por favor completa los campos.';
      return;
    }

    try {
      const resp = await fetch('../php/login.php', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, clave })
      });

      const data = await resp.json();
      console.log(data); // para depuración

      if (resp.ok && data.ok) {
        // Login correcto
        const roles = data.roles || [];

        hideAllViews(); // Oculta todo antes de mostrar lo correspondiente

        if (roles.includes('administrador')) {
          if (viewAdmin) viewAdmin.style.display = 'block';
        } else if (roles.includes('tecnico')) {
          if (viewTecnico) viewTecnico.style.display = 'block';
        } else if (roles.includes('brigada')) {
          if (viewBrigada) viewBrigada.style.display = 'block';
        } else {
          if (viewPublic) viewPublic.style.display = 'block';
        }

        msgBox.textContent = `Bienvenido ${data.nombre || ''} ${data.apellido || ''}`;

      } else {
        // Error en la autenticación
        msgBox.textContent = data.msg || 'Usuario o contraseña incorrectos.';
      }

    } catch (err) {
      console.error('Error:', err);
      msgBox.textContent = 'Error de comunicación con el servidor.';
    }
  });
});

// ------------------- Funciones de navegación -------------------
function cerrarSesion() {
  alert("Sesión cerrada.");
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("header").classList.add("hidden");
  document.getElementById("login-section").classList.remove("hidden");
  document.getElementById("contenido").classList.add("hidden");
}

function abrirPagina(url) {
  const frame = document.getElementById("contenido");
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("header").classList.remove("hidden");
  frame.src = url;
  frame.classList.remove("hidden");
}

function mostrarMenu() {
  document.getElementById("contenido").classList.add("hidden");
  document.getElementById("menu").classList.remove("hidden");
}
