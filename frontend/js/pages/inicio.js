// ====================================
// MANEJO DE LA SESIÓN DEL USUARIO
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    // Manejar el botón de PreUNAL
    const btnPreunal = document.getElementById('btn-preunal');
    if (btnPreunal) {
        btnPreunal.addEventListener('click', function(e) {
            e.preventDefault();
            // Guardar el estado actual en localStorage
            localStorage.setItem('lastPage', 'inicio.html');
            // Redirigir al simulacro
            window.location.href = this.getAttribute('href');
        });
    }
});
