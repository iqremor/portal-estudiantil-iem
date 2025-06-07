// Lógica del simulacro interactivo
document.addEventListener('DOMContentLoaded', () => {
    // Obtener elementos del DOM
    const volverInicioBtn = document.querySelector('.back-to-home-button');
    const CerrarSesionBtn = document.querySelector('#logoutButton');


    // Registrar la función en el ámbito global para el botón
    window.volverAlInicio = volverAlInicio;
    window.CerrarSesion = CerrarSesion;

    function volverAlInicio() {
        window.location.href = '/frontend/pages/inicio.html';
    }

    function CerrarSesion() {
        // Borrar información de la sesión
        // Eliminar datos del localStorage
        localStorage.clear();
        
        // Eliminar datos del sessionStorage
        sessionStorage.clear();
        
        // Redirigir a la página index.html
        window.location.href = 'index.html';

    }

    // Manejo de eventos
    if (volverInicioBtn) {
        volverInicioBtn.addEventListener('click', volverAlInicio);
    }

});