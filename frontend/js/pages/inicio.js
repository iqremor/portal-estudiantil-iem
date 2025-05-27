// ====================================
// MANEJO DE LA SESIÓN DEL USUARIO
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    // Obtener información del usuario del localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    if (!userInfo) {
        // Si no hay información del usuario, redirigir al login
        window.location.href = '/';
        return;
    }

    // Mostrar nombre completo
    document.getElementById('userName').textContent = userInfo.nombre;

    // Mostrar iniciales (nombre y apellido)
    function getInitials(nombre) {
        return nombre.split(' ').map(word => word[0]).join('').toUpperCase();
    }
    document.getElementById('userInitials').textContent = getInitials(userInfo.nombre);

    // Actualizar el grado
    document.getElementById('userGrade').textContent = `Grado ${userInfo.grado}`;

    // Actualizar el mensaje de bienvenida
    const welcomeMessage = document.querySelector('.welcome-section h2');
    if (welcomeMessage) {
        welcomeMessage.textContent = `¡HOLA! \n ${userInfo.nombre}`;
    }

    // Actualizar el subtítulo
    const welcomeSubtitle = document.querySelector('.welcome-section p');
    if (welcomeSubtitle) {
        welcomeSubtitle.textContent = `Estudiante de grado ${userInfo.grado}`;
    }
});

// ====================================
// MANEJO DEL CIERRE DE SESIÓN
// ====================================
window.logout = function() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        // Limpiar la información del usuario
        localStorage.removeItem('userInfo');
        sessionStorage.removeItem('userSession');
        
        // Redirigir al login
        window.location.href = '/';
    }
};
