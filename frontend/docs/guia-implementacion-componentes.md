# Guía de Implementación de Componentes

## Introducción

Esta guía explica cómo implementar correctamente los componentes reutilizables en las páginas del Portal Estudiantil IEM. Seguir estas instrucciones garantizará una estructura consistente y mantenible en todo el proyecto.

## Pasos para Implementar Componentes

### 1. Incluir Scripts Necesarios

En la sección `<head>` de cada página, incluye los scripts compartidos en este orden específico:

```html
<!--=================================
    SCRIPTS
==================================-->
<script type="module" src="/frontend/js/shared/navigation.js"></script>
<script type="module" src="/frontend/js/shared/logout.js"></script>
<script type="module" src="/frontend/js/shared/components.js"></script>
```

El orden es importante porque:
- `navigation.js` expone funciones globales que pueden ser usadas por los demás scripts
- `logout.js` expone la función de cierre de sesión usada en el header
- `components.js` debe cargarse al final para que pueda encontrar todas las funciones necesarias

### 2. Implementar los Componentes

Inserta los componentes en el `<body>` de la página en las posiciones apropiadas:

```html
<!-- Componente de animación de fondo (al inicio del body) -->
<div id="background-animation-container" data-component="/frontend/components/background-animation.html"></div>

<!-- Componente de header (después de la animación) -->
<div id="header-container" data-component="/frontend/components/header.html"></div>

<!-- Contenido principal de la página -->
<main>...</main>

<!-- Componente de footer (al final, antes de scripts adicionales) -->
<div id="footer-container" data-component="/frontend/components/footer.html"></div>
```

### 3. Mantener Estructura Consistente

Todas las páginas deben seguir esta estructura básica:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <!-- Meta información -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Título de la Página - IEM</title>

    <!-- Hojas de estilo -->
    <link rel="stylesheet" href="/frontend/css/index.css">
    <link rel="stylesheet" href="/frontend/css/pages/nombre-pagina.css">

    <!-- Scripts compartidos -->
    <script type="module" src="/frontend/js/shared/navigation.js"></script>
    <script type="module" src="/frontend/js/shared/logout.js"></script>
    <script type="module" src="/frontend/js/shared/components.js"></script>
</head>
<body class="page-body">
<!-- Componente de animación de fondo -->
<div id="background-animation-container" data-component="/frontend/components/background-animation.html"></div>

<!-- Componente de header -->
<div id="header-container" data-component="/frontend/components/header.html"></div>

<!-- Contenido principal -->
<main class="main-container">
    <!-- Contenido específico de la página -->
</main>

<!-- Componente de footer -->
<div id="footer-container" data-component="/frontend/components/footer.html"></div>

<!-- Script específico de la página -->
<script type="module" src="/frontend/js/pages/nombre-pagina.js"></script>
</body>
</html>
```

## Personalización de Componentes

Para personalizar un componente, usa el atributo `data-values`:

```html
<div id="header-container" 
     data-component="/frontend/components/header.html"
     data-values='{"pageTitle": "Simulacros"}'></div>
```

## Rutas Consistentes

Siempre usa rutas absolutas desde la raíz del proyecto:

```
/frontend/components/header.html  ✅ CORRECTO
../components/header.html         ❌ INCORRECTO
```

## Navegación entre Páginas

Para navegar entre páginas, usa las funciones de `navigation.js`:

```html
<button onclick="volverAlInicio()">Volver al Inicio</button>
<button onclick="navegarA('/frontend/pages/otra-pagina.html')">Ir a Otra Página</button>
```

## Depuración

Si un componente no se carga correctamente:

1. Verifica que los scripts se cargan en el orden correcto
2. Comprueba que los IDs de los contenedores son únicos
3. Asegúrate de que las rutas a los componentes son correctas
4. Revisa la consola del navegador para mensajes de error

## Lista de Verificación

Al implementar componentes en una página nueva, asegúrate de:

- [ ] Incluir los scripts en el orden correcto
- [ ] Usar rutas absolutas para todos los recursos
- [ ] Implementar todos los componentes necesarios
- [ ] Mantener la estructura HTML consistente
- [ ] Probar la navegación entre páginas
- [ ] Verificar que la información del usuario se muestra correctamente
- [ ] Comprobar que el cierre de sesión funciona

## Ejemplos de Implementación

Consulta `inicio.html` y `simulacro.html` como ejemplos de referencia para la implementación correcta de componentes.
