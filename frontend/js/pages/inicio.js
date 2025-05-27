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

    // Actualizar información en el header
    document.getElementById('userInitials').textContent = getInitials(userInfo.nombre);
    document.getElementById('userName').textContent = userInfo.nombre;
    document.getElementById('userGrade').textContent = `Grado ${userInfo.grado}`;

    // Actualizar el mensaje de bienvenida
    const welcomeMessage = document.querySelector('.welcome-section h2');
    if (welcomeMessage) {
        welcomeMessage.textContent = `¡Bienvenido ${userInfo.nombre}!`;
    }

    // Actualizar el subtítulo
    const welcomeSubtitle = document.querySelector('.welcome-section p');
    if (welcomeSubtitle) {
        welcomeSubtitle.textContent = `Estudiante de grado ${userInfo.grado}`;
    }
});

// Función para obtener las iniciales del nombre
function getInitials(name) {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();
}

// ====================================
// MANEJO DEL CIERRE DE SESIÓN
// ====================================
function logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        // Limpiar la información del usuario
        localStorage.removeItem('userInfo');
        sessionStorage.removeItem('userSession');
        
        // Redirigir al login
        window.location.href = '/';
    }
}
