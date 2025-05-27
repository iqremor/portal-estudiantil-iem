import { validarFormatoCodigo, validarCodigoEnServidor } from './validacion.js';

// ====================================
// FUNCIÓN PARA MOSTRAR MENSAJES
// ====================================
function showMessage(message, type = 'info') {
    // Remover mensajes existentes para evitar acumulación
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Crear nuevo elemento de mensaje
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 2rem;
        left: 50%;
        transform: translateX(-50%);
        padding: 1rem 2rem;
        border-radius: 50px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        animation: slideInDown 0.3s ease-out;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        max-width: 90%;
        text-align: center;
        ${type === 'success' ? 'background: linear-gradient(45deg, #4CAF50, #45a049);' : ''}
        ${type === 'error' ? 'background: linear-gradient(45deg, #f44336, #da190b);' : ''}
        ${type === 'info' ? 'background: linear-gradient(45deg, #2196F3, #0b7dda);' : ''}
    `;
    document.body.appendChild(messageDiv);

    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.animation = 'slideOutUp 0.3s ease-out';
            setTimeout(() => {
                messageDiv.remove();
            }, 300);
        }
    }, 4000);
}

// ====================================
// MANEJO DEL FORMULARIO DE ACCESO
// ====================================
document.getElementById('accessForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const cod_estudiante = document.getElementById('cod_estudiante').value.trim();
    
    // Mostrar el spinner de carga
    const loadingSpinner = document.getElementById('loadingSpinner');
    const buttonText = document.getElementById('buttonText');
    
    loadingSpinner.style.display = 'inline-block';
    buttonText.style.opacity = '0';

    try {
        // Validar formato
        if (!validarFormatoCodigo(cod_estudiante)) {
            showMessage('El código debe comenzar con IEM seguido de 4 números (Ejemplo: IEM1234)', 'error');
            return;
        }

        // Validar con el servidor
        const data = await validarCodigoEnServidor(cod_estudiante);

        if (data.permitido) {
            showMessage('Acceso permitido', 'success');
            // Guardar información del usuario con nombre completo
            localStorage.setItem('userInfo', JSON.stringify({
                nombre: data.nombre || cod_estudiante,
                grado: '11'
            }));
            setTimeout(() => {
                window.location.href = '/frontend/pages/inicio.html';
            }, 1000);
        } else {
            showMessage(data.mensaje || 'Código no permitido', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Error al validar el código', 'error');
    } finally {
        loadingSpinner.style.display = 'none';
        buttonText.style.opacity = '1';
    }
});

// ====================================
// INICIALIZACIÓN
// ====================================
window.addEventListener('load', function() {
    const input = document.getElementById('cod_estudiante');
    
    // Forzar mayúsculas al pegar texto
    input.addEventListener('paste', function(e) {
        e.preventDefault();
        const text = (e.clipboardData || window.clipboardData).getData('text');
        this.value = text.toUpperCase();
    });
    
    // Enfocar el input al cargar
    input.focus();
});

// ====================================
// FORMATEO DEL CAMPO DE CÓDIGO ESTUDIANTIL
// ====================================
document.getElementById('studentCode').addEventListener('input', function(e) {
    this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
});

// ====================================
// INYECCIÓN DE ESTILOS PARA ANIMACIONES
// ====================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }

    @keyframes slideOutUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }

    .loading {
        display: none;
        width: 20px;
        height: 20px;
        border: 2px solid #FFF;
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s linear infinite;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    @keyframes spin {
        to {
            transform: translateX(-50%) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// ====================================
// CONFIGURACIÓN INICIAL
// ====================================
window.addEventListener('load', function() {
    document.getElementById('studentCode').focus();
});
