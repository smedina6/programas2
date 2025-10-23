<?php
session_start(); 
?>
<header style="position: fixed; top: 0; left: 0; width: 100%; 
               background-color: #145c43;
               color: white; padding: 10px 20px; 
               display: flex; justify-content: space-between; 
               align-items: center; z-index: 1000;">
    <div>
        <!-- ✅ Cambiado a /vistas/menu.php -->
        <button onclick="location.href='../../ecodatos/vistas/menu.php'" 
                style="padding: 5px 10px; cursor:pointer; background-color:white; color:#4CAF50; border:none; border-radius:5px;">
             Menú
        </button>
    </div>
    <div>
        <button onclick="cerrarSesion()" 
                style="padding: 5px 10px; cursor:pointer; background-color:white; color:#4CAF50; border:none; border-radius:5px;">
             Cerrar Sesión
        </button>
    </div>
</header>

<script>
function cerrarSesion() {
    window.location.href = '../../ecodatos/index.php';
}
</script>
