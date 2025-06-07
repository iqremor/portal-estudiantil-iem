# Componente Header

## Descripción
El componente Header proporciona la cabecera estándar para todas las páginas del portal estudiantil. Muestra el logo institucional, información de la institución y datos del usuario autenticado junto con el botón de cierre de sesión.

## Estructura HTML
```html
<header class="main-header">
    <div class="header-content">
        <div class="logo-section">
            <div class="logo">
                <img src="/frontend/assets/images/escudo_nuevo.png" alt="Logo IEM">
            </div>
            <div class="institution-info">
                <h1>Institución Educativa Mojarras</h1>
                <p>Convivencia y Superación</p>
            </div>
        </div>
        <div class="user-actions">
            <div class="user-info">
                <div class="user-avatar">
                    <span id="userInitials">US</span>
                </div>
                <div class="user-details">
                    <h3 id="userName">Estudiante</h3>
                </div>
            </div>
            <button onclick="logout()" class="btn btn-logout">
                <svg width="20" height="20" viewBox="0 0 22 22" fill="currentColor">
                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                </svg>
                <span>Cerrar Sesión</span>
            </button>
        </div>
    </div>
</header>
```

## Cómo usar
Para incluir este componente en una página, añade el siguiente código HTML:

```html
<div id="header-container" data-component="/frontend/components/header.html"></div>
```

Asegúrate de incluir el script de componentes en la sección `<head>` de tu página:

```html
<script type="module" src="/frontend/js/shared/components.js"></script>
```

## Dependencias
- **CSS**: Requiere los estilos definidos en `/frontend/css/styles.css`
- **JavaScript**: Depende de la función `logout()` definida en `/frontend/js/shared/logout.js`
- **Recursos**: Utiliza la imagen del escudo en `/frontend/assets/images/escudo_nuevo.png`

## Funcionalidad
- **Logo**: Muestra el escudo institucional
- **Información Institucional**: Muestra el nombre y lema de la institución
- **Información de Usuario**: Muestra las iniciales y nombre del usuario actual
- **Botón de Cierre de Sesión**: Permite al usuario cerrar sesión

## Personalización
El componente muestra automáticamente la información del usuario actual si está disponible en `localStorage`. Si necesitas personalizar la información mostrada, puedes usar el atributo `data-values`:

```html
<div id="header-container" 
     data-component="/frontend/components/header.html"
     data-values='{"userInitials": "AB", "userName": "Ana Bolena"}'></div>
```

## Responsividad
El componente está diseñado para adaptarse a diferentes tamaños de pantalla:

- **Escritorio**: Muestra todos los elementos en línea
- **Tablet**: Compacta ligeramente la información
- **Móvil**: Reorganiza los elementos para una mejor visualización

## Buenas Prácticas
1. No modificar directamente el HTML del componente; usa el sistema de personalización
2. Si necesitas estilos específicos, agrégalos en la hoja de estilos de la página
3. Mantén la consistencia visual en todas las páginas

## Mantenimiento
Si necesitas actualizar este componente, modifica el archivo `/frontend/components/header.html` y los cambios se reflejarán en todas las páginas que lo utilizan.
