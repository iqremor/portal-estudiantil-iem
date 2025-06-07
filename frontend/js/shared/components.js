/**
 * @module components
 * @description Funciones para cargar y gestionar componentes HTML reutilizables
 */

// Cache para componentes cargados
const componentCache = new Map();

/**
 * Carga un componente HTML en un contenedor específico
 * @param {string} containerId - ID del elemento donde se cargará el componente
 * @param {string} componentPath - Ruta al archivo HTML del componente
 * @param {Object} [options={}] - Opciones de configuración
 * @param {Object} [options.data={}] - Datos para personalizar el componente
 * @param {boolean} [options.cache=true] - Si se debe cachear el componente
 * @param {boolean} [options.append=false] - Si se debe agregar al contenido existente
 * @param {Function} [options.onLoad] - Callback ejecutado después de cargar el componente
 * @returns {Promise<boolean>} - Promesa que resuelve a true si el componente se cargó correctamente
 */
export async function loadComponent(containerId, componentPath, options = {}) {
    const {
        data = {},
        cache = true,
        append = false,
        onLoad = null
    } = options;

    try {
        // Validar parámetros
        if (!containerId || typeof containerId !== 'string') {
            console.error('loadComponent: containerId debe ser un string válido', { containerId, componentPath });
            return false;
        }

        if (!componentPath || typeof componentPath !== 'string') {
            console.error('loadComponent: componentPath debe ser un string válido', { containerId, componentPath });
            return false;
        }

        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`loadComponent: Contenedor con ID '${containerId}' no encontrado para el componente '${componentPath}'.`);
            return false;
        }

        let htmlContent;

        // Verificar cache si está habilitado
        if (cache && componentCache.has(componentPath)) {
            htmlContent = componentCache.get(componentPath);
        } else {
            // Cargar el componente desde el archivo
            const response = await fetch(componentPath);

            if (!response.ok) {
                throw new Error(`Error cargando componente '${componentPath}': ${response.status} ${response.statusText}`);
            }

            htmlContent = await response.text();

            // Guardar en cache si está habilitado
            if (cache) {
                componentCache.set(componentPath, htmlContent);
            }
        }

        // Procesar variables de datos
        const processedContent = processTemplate(htmlContent, data);

        // Insertar HTML en el contenedor
        if (append) {
            container.insertAdjacentHTML('beforeend', processedContent);
        } else {
            container.innerHTML = processedContent;
        }

        // Ejecutar scripts del componente (si los tuviera internamente, lo cual no es recomendable para shared components)
        await executeComponentScripts(container);

        // Ejecutar callback si se proporcionó
        if (typeof onLoad === 'function') {
            onLoad(container, data);
        }

        return true;

    } catch (error) {
        console.error(`Error al cargar componente '${componentPath}' en #${containerId}:`, error);
        // Si el contenedor existe, se podría limpiar o mostrar un mensaje de error.
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `<p style="color:red;">Error al cargar ${componentPath}. Ver consola.</p>`;
        }
        return false;
    }
}

/**
 * Procesa un template HTML reemplazando variables
 * @param {string} template - Template HTML con variables
 * @param {Object} data - Datos para reemplazar en el template
 * @returns {string} - HTML procesado
 */
function processTemplate(template, data) {
    if (!data || Object.keys(data).length === 0) {
        return template;
    }

    let processedTemplate = template;

    // Reemplazar variables simples {{variable}}
    Object.keys(data).forEach(key => {
        const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
        const value = data[key] !== null && data[key] !== undefined ? data[key] : '';
        processedTemplate = processedTemplate.replace(regex, value);
    });

    // Procesar condicionales simples {{#if variable}}...{{/if}}
    processedTemplate = processConditionals(processedTemplate, data);

    // Procesar loops simples {{#each array}}...{{/each}}
    processedTemplate = processLoops(processedTemplate, data);

    return processedTemplate;
}

/**
 * Procesa condicionales en el template
 * @param {string} template - Template con condicionales
 * @param {Object} data - Datos del contexto
 * @returns {string} - Template procesado
 */
function processConditionals(template, data) {
    const conditionalRegex = /\{\{#if\s+(\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g;

    return template.replace(conditionalRegex, (match, condition, content) => {
        const conditionValue = data[condition];
        return conditionValue ? content : '';
    });
}

/**
 * Procesa loops en el template
 * @param {string} template - Template con loops
 * @param {Object} data - Datos del contexto
 * @returns {string} - Template procesado
 */
function processLoops(template, data) {
    const loopRegex = /\{\{#each\s+(\w+)\}\}([\s\S]*?)\{\{\/each\}\}/g;

    return template.replace(loopRegex, (match, arrayName, content) => {
        const array = data[arrayName];
        if (!Array.isArray(array)) {
            return '';
        }

        return array.map((item, index) => {
            let itemContent = content;

            // Reemplazar variables del item
            if (typeof item === 'object' && item !== null) { // Asegurar que item sea un objeto
                Object.keys(item).forEach(key => {
                    const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
                    itemContent = itemContent.replace(regex, item[key]);
                });
            } else {
                // Si el item es primitivo, usar {{this}}
                itemContent = itemContent.replace(/\{\{\s*this\s*\}\}/g, item);
            }

            // Reemplazar índice
            itemContent = itemContent.replace(/\{\{\s*@index\s*\}\}/g, index);

            return itemContent;
        }).join('');
    });
}

/**
 * Ejecuta los scripts contenidos en un componente.
 * PRECAUCIÓN: Generalmente no es buena práctica tener scripts dentro de componentes HTML
 * que se cargan dinámicamente de esta manera, especialmente si son módulos o tienen dependencias complejas.
 * Es mejor manejar la lógica del componente desde el script principal que lo carga.
 * @param {HTMLElement} container - Contenedor del componente
 * @returns {Promise<void>}
 */
async function executeComponentScripts(container) {
    const scripts = container.querySelectorAll('script');

    for (const oldScript of scripts) {
        const newScript = document.createElement('script');

        // Copiar atributos
        Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
        });

        // Manejar scripts externos vs inline
        if (oldScript.src) {
            // Script externo
            // Si es type="module", el navegador maneja la carga y ejecución única.
            // Pero si se re-inserta así, podría re-ejecutarse si no es módulo o si el navegador no lo cachea bien.
            // console.warn("Ejecutando script externo desde componente:", oldScript.src); // Mensaje eliminado
            await new Promise((resolve, reject) => {
                newScript.onload = resolve;
                newScript.onerror = (err) => {
                    console.error("Error cargando script externo de componente:", oldScript.src, err);
                    reject(err);
                };
                // Si el script original era module, el nuevo también debería serlo.
                if (oldScript.type === 'module') newScript.type = 'module';
                newScript.src = oldScript.src; // El src debe ser la URL completa
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });
        } else {
            // Script inline
            // console.warn("Ejecutando script inline desde componente."); // Mensaje eliminado
            newScript.textContent = oldScript.textContent;
            if (oldScript.type === 'module') newScript.type = 'module'; // Mantener tipo módulo si aplica
            oldScript.parentNode.replaceChild(newScript, oldScript);
        }
    }
}

/**
 * Carga múltiples componentes de forma paralela
 * @param {Array<Object>} components - Array de objetos con configuración de componentes
 * @returns {Promise<Array<boolean>>} - Array de resultados
 */
export async function loadMultipleComponents(components) {
    if (!Array.isArray(components)) {
        console.error('loadMultipleComponents: components debe ser un array');
        return [];
    }

    const promises = components.map(config => {
        if (!config.containerId || !config.componentPath) {
            console.error('loadMultipleComponents: Configuración de componente inválida:', config);
            return Promise.resolve(false); // Resuelve a false para esta configuración inválida
        }
        return loadComponent(config.containerId, config.componentPath, config.options);
    });

    try {
        // Promise.allSettled es más robusto si algunos componentes fallan en cargar
        const results = await Promise.allSettled(promises);
        // Devolver un array de booleanos basado en si cada promesa original se resolvió a true
        return results.map(r => r.status === 'fulfilled' && r.value === true);
    } catch (error) { // Aunque Promise.allSettled no rechaza, es buena práctica tener un catch.
        console.error('Error inesperado en loadMultipleComponents (esto no debería ocurrir con Promise.allSettled):', error);
        return new Array(components.length).fill(false);
    }
}

/**
 * Inicializa componentes basados en atributos data-component.
 * Esta función ahora devuelve una Promesa que se resuelve cuando todos los componentes
 * especificados por data-component han sido procesados.
 * @returns {Promise<void>}
 */
export async function initComponents() {
    const elementsWithComponents = document.querySelectorAll('[data-component]');

    if (elementsWithComponents.length === 0) {
        return Promise.resolve(); // Resuelve inmediatamente si no hay componentes
    }

    const componentConfigs = Array.from(elementsWithComponents).map(element => {
        const componentPath = element.getAttribute('data-component');
        const dataAttributes = element.dataset;

        // Extraer datos adicionales de atributos data-*
        const data = {};
        Object.keys(dataAttributes).forEach(key => {
            if (key !== 'component' && key !== 'cache' && key !== 'append') { // Excluir atributos de control
                data[key] = dataAttributes[key];
            }
        });

        // Asegurarse de que el elemento tenga un ID, si no, generar uno temporalmente (no ideal para producción robusta)
        if (!element.id) {
            element.id = `component-host-${Math.random().toString(36).substring(2, 9)}`;
            // console.warn(`Elemento con data-component '${componentPath}' no tenía ID. Se asignó uno temporal: ${element.id}`); // Mensaje eliminado
        }

        return {
            containerId: element.id,
            componentPath,
            options: {
                data,
                cache: element.getAttribute('data-cache') !== 'false', // cache es true por defecto
                append: element.getAttribute('data-append') === 'true'  // append es false por defecto
            }
        };
    });

    // Esperar a que todos los componentes se carguen
    await loadMultipleComponents(componentConfigs);
}

/**
 * Limpia el cache de componentes
 * @param {string} [componentPath] - Ruta específica a limpiar (opcional)
 * @returns {void}
 */
export function clearComponentCache(componentPath) {
    if (componentPath) {
        componentCache.delete(componentPath);
    } else {
        componentCache.clear();
    }
}

/**
 * Recarga un componente específico
 * @param {string} containerId - ID del contenedor
 * @param {string} componentPath - Ruta del componente
 * @param {Object} [options={}] - Opciones de configuración
 * @returns {Promise<boolean>}
 */
export async function reloadComponent(containerId, componentPath, options = {}) {
    // console.log(`Recargando componente: ${componentPath} en #${containerId}`); // Mensaje eliminado
    // Limpiar del cache antes de recargar para asegurar que se obtiene la versión más reciente del archivo
    clearComponentCache(componentPath);
    return loadComponent(containerId, componentPath, {
        ...options,
        cache: false // Forzar no usar cache en la recarga inicial, luego se puede volver a cachear si loadComponent lo hace.
    });
}

// Exponer funciones globalmente para uso en HTML (si es estrictamente necesario)
// Generalmente es mejor importar módulos donde se necesiten.
if (typeof window !== 'undefined') {
    window.loadComponent = loadComponent; // Para llamadas manuales si es necesario
}

// ====================================
// MANEJO DE LA SESIÓN DEL USUARIO
// ====================================

/**
 * Obtiene las iniciales de un nombre completo
 * @param {string} nombre - Nombre completo del usuario
 * @returns {string} - Iniciales en mayúsculas
 */
function getInitials(nombre) {
    if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
        return 'US'; // Usuario desconocido o nombre vacío
    }

    return nombre
        .trim()
        .split(/\s+/) // Dividir por uno o más espacios
        .filter(word => word.length > 0)
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2); // Máximo 2 iniciales
}

/**
 * Actualiza un elemento del DOM de forma segura
 * @param {string} elementId - ID del elemento
 * @param {string} content - Contenido a establecer
 * @param {string} property - Propiedad a actualizar (textContent, innerHTML, etc.)
 */
function updateElementSafely(elementId, content, property = 'textContent') {
    const element = document.getElementById(elementId);
    if (element) {
        element[property] = content;
        return true;
    } else {
        // console.warn(`updateElementSafely: Elemento con ID '${elementId}' no encontrado para actualizar.`); // Mensaje eliminado
        return false;
    }
}

/**
 * Actualiza elementos por selector de forma segura
 * @param {string} selector - Selector CSS
 * @param {string} content - Contenido a establecer
 * @param {string} property - Propiedad a actualizar
 */
function updateElementsBySelectorSafely(selector, content, property = 'textContent') {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
        elements.forEach(element => {
            element[property] = content;
        });
        return true;
    } else {
        // console.warn(`updateElementsBySelectorSafely: No se encontraron elementos con selector '${selector}'`); // Mensaje eliminado
        return false;
    }
}

/**
 * Verifica si localStorage está disponible y funcional
 * @returns {boolean}
 */
function isLocalStorageAvailable() {
    try {
        const testKey = '__localStorageTest__';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        console.error('localStorage no está disponible o no funciona:', e);
        return false;
    }
}

/**
 * Obtiene información del usuario de forma segura desde localStorage
 * @returns {Object|null} - Información del usuario o null si no existe o hay error
 */
function getUserInfo() {
    // console.log('Obteniendo información del usuario desde localStorage...'); // Mensaje eliminado

    if (!isLocalStorageAvailable()) {
        // Mensaje ya mostrado por isLocalStorageAvailable
        return null;
    }

    try {
        const userInfoString = localStorage.getItem('userInfo');
        if (!userInfoString) {
            // console.warn('No hay información de usuario (userInfo) en localStorage.'); // Mensaje eliminado
            return null;
        }

        // console.log('Datos de usuario (string) en localStorage:', userInfoString); // Mensaje eliminado
        let userInfo;
        try {
            userInfo = JSON.parse(userInfoString);
        } catch (parseError) {
            console.error('Error al analizar (JSON.parse) los datos del usuario desde localStorage:', parseError);
            // console.error('Datos que causaron el error:', userInfoString); // Mensaje eliminado
            localStorage.removeItem('userInfo'); // Eliminar datos corruptos
            return null;
        }

        // Validar que userInfo sea un objeto y tenga la propiedad nombre
        if (typeof userInfo !== 'object' || userInfo === null || !userInfo.nombre) {
            // console.warn('Información de usuario incompleta o malformada. Falta "nombre" o no es un objeto:', userInfo); // Mensaje eliminado
            // Intentar obtener el nombre de otros campos comunes como fallback, o asignar uno por defecto.
            userInfo.nombre = userInfo.name || userInfo.fullName || userInfo.usuario || 'Usuario Anónimo';
            // console.log('Nombre de usuario asignado por fallback:', userInfo.nombre); // Mensaje eliminado
        }

        // console.log('Datos de usuario parseados y validados:', userInfo); // Mensaje eliminado
        return userInfo;

    } catch (error) { // Captura errores generales durante el proceso
        console.error('Error general al obtener información del usuario desde localStorage:', error);
        return null;
    }
}

/**
 * Inicializa la información del usuario en la interfaz.
 * Esta función ahora se llama DESPUÉS de que los componentes (como el header) se cargan.
 */
function initializeUserInterface() {
    // console.log('Inicializando interfaz de usuario (nombre, iniciales, etc.)...'); // Mensaje eliminado

    const userInfo = getUserInfo();
    // console.log('Datos de usuario recuperados para UI:', userInfo); // Mensaje eliminado

    if (!userInfo) {
        // console.warn('No se encontró información de usuario válida para inicializar la UI.'); // Mensaje eliminado
        updateElementSafely('UserName', 'Invitado');
        updateElementSafely('userInitials', 'IN');
        return;
    }

    const displayName = userInfo.nombre || 'Usuario'; // Asegurar que displayName tenga un valor

    // Actualizar nombre de usuario en el header (asumiendo que el header ya está cargado)
    // console.log(`Actualizando nombre de usuario a: "${displayName}"`); // Mensaje eliminado
    updateElementSafely('UserName', displayName);


    // Actualizar iniciales en el header
    const initials = getInitials(displayName);
    // console.log(`Actualizando iniciales del usuario a: "${initials}"`); // Mensaje eliminado
    updateElementSafely('userInitials', initials);

    // Actualizar grado si existe (ejemplo, si tienes un elemento para ello)
    if (userInfo.grado) {
        const gradeText = `Grado ${userInfo.grado}`;
        updateElementSafely('userGrade', gradeText) ||
        updateElementsBySelectorSafely('.user-grade', gradeText);
    }

    // Actualizar mensaje de bienvenida en la página principal (si existe)
    const welcomeTitleElement = document.querySelector('.welcome-section h2[data-welcome-title]');
    if (welcomeTitleElement) {
        welcomeTitleElement.textContent = `${displayName}`;
    } else {
        const oldWelcomeTitle = document.querySelector('.welcome-section h2');
        if (oldWelcomeTitle && !oldWelcomeTitle.hasAttribute('data-welcome-title')) {
            oldWelcomeTitle.textContent = `${displayName}`;
        }
    }

    const welcomeSubtitleElement = document.querySelector('.welcome-section p[data-welcome-subtitle]');
    if (welcomeSubtitleElement && userInfo.grado) {
        welcomeSubtitleElement.textContent = `En esta plataforma podrás realizar múltiples actividades para grado ${userInfo.grado}.`;
    } else {
        const oldWelcomeSubtitle = document.querySelector('.welcome-section p');
        if (oldWelcomeSubtitle && !oldWelcomeSubtitle.hasAttribute('data-welcome-subtitle') && userInfo.grado) {
            oldWelcomeSubtitle.textContent = `En esta plataforma podrás realizar múltiples actividades para grado ${userInfo.grado}.`;
        }
    }

    // console.log('Interfaz de usuario (nombre/iniciales) inicializada.'); // Mensaje eliminado
}

/**
 * Función para cerrar sesión
 */
function logout() {
    // console.log('Cerrando sesión...'); // Mensaje eliminado

    try {
        if (isLocalStorageAvailable()) {
            localStorage.removeItem('userInfo');
            // console.log('Información de usuario eliminada de localStorage.'); // Mensaje eliminado
        }

        // Limpiar sessionStorage también si se usa para algo relacionado con la sesión
        if (typeof sessionStorage !== 'undefined') {
            try {
                sessionStorage.clear();
                // console.log('SessionStorage limpiado.'); // Mensaje eliminado
            } catch (e) {
                // console.warn('No se pudo limpiar sessionStorage completamente:', e); // Mensaje eliminado
            }
        }

        // Limpiar cache de componentes, por si algún componente cacheado depende del estado de sesión
        clearComponentCache();

        // console.log('Sesión cerrada. Redirigiendo al login (ruta raíz "/").'); // Mensaje eliminado
        window.location.href = '/';

    } catch (error) {
        console.error('Error durante el proceso de cerrar sesión:', error);
        const errorMsgElement = document.getElementById('logout-error-message');
        if (errorMsgElement) errorMsgElement.textContent = 'Error al cerrar sesión. Intenta recargar la página.';
    }
}

/**
 * Inicializa los event listeners para el logout.
 * Esta función ahora se llama DESPUÉS de que los componentes (como el header) se cargan.
 */
function initializeLogoutButtons() {
    // console.log('Inicializando botones de logout...'); // Mensaje eliminado
    const logoutButton = document.getElementById('logoutButton');

    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            // console.log('Botón de logout (#logoutButton) clickeado.'); // Mensaje eliminado
            logout();
        });
        // console.log('Listener de logout añadido a #logoutButton.'); // Mensaje eliminado
    } else {
        // console.warn('Botón de logout con ID "logoutButton" no encontrado. ¿Está el header cargado?'); // Mensaje eliminado
        const genericLogoutButtons = document.querySelectorAll('.logout-button, [data-action="logout"]');
        if (genericLogoutButtons.length > 0) {
            genericLogoutButtons.forEach(button => {
                if (!button.dataset.logoutListenerAttached) {
                    button.addEventListener('click', function(e) {
                        e.preventDefault();
                        logout();
                    });
                    button.dataset.logoutListenerAttached = "true";
                    // console.log('Listener de logout añadido a botón genérico:', button); // Mensaje eliminado
                }
            });
        } else {
            // console.warn('No se encontraron botones de logout genéricos tampoco.'); // Mensaje eliminado
        }
    }

    if (typeof window !== 'undefined') {
        window.logout = logout;
    }
}

// ====================================
// INICIALIZACIÓN PRINCIPAL DE LA APLICACIÓN
// ====================================

let appInitialized = false;

/**
 * Función principal para inicializar la aplicación: carga componentes y luego inicializa la UI.
 */
async function initializeAppCore() {
    if (appInitialized) {
        return;
    }

    try {
        await initComponents();
    } catch (error) {
        console.error('Error crítico durante la carga de componentes (initComponents):', error);
        return;
    }

    try {
        // console.log('Paso 2: Inicializando interfaz de usuario (nombres, iniciales)...'); // Mensaje eliminado
        initializeUserInterface();
    } catch (error) {
        console.error('Error al inicializar la interfaz de usuario (initializeUserInterface):', error);
    }

    try {
        // console.log('Paso 3: Inicializando botones de logout...'); // Mensaje eliminado
        initializeLogoutButtons();
    } catch (error) {
        console.error('Error al inicializar los botones de logout (initializeLogoutButtons):', error);
    }

    appInitialized = true;
    // console.log('initializeAppCore completado. Aplicación inicializada.'); // Mensaje eliminado
}

// Manejar el evento DOMContentLoaded para iniciar la aplicación.
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAppCore);
    } else {
        setTimeout(initializeAppCore, 0);
    }
}