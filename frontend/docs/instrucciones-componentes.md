# Instrucciones para Implementar Componentes

## Introducción

El Portal Estudiantil IEM utiliza un sistema de componentes reutilizables para mantener una estructura consistente en todas las páginas. Este documento proporciona instrucciones para implementar correctamente los componentes `header.html` y `footer.html` en las páginas del portal.

## Componentes Principales

### Header (`header.html`)

El componente Header proporciona la cabecera estándar para todas las páginas, mostrando:
- Logo institucional
- Nombre y lema de la institución
- Información del usuario conectado
- Botón de cierre de sesión

### Footer (`footer.html`)

El componente Footer proporciona el pie de página estándar con:
- Información de copyright
- Lema institucional

## Pasos para Implementar Componentes

### 1. Incluir Scripts Necesarios

En la sección `<head>` de cada página, incluye los siguientes scripts en este orden específico:

```html
<script type="module" src="/frontend/js/shared/navigation.js"></script>
<script type="module" src="/frontend/js/shared/logout.js"></script>
<script type="module" src="/frontend/js/shared/components.js"></script>
```

El orden es importante porque:
- `navigation.js` exporta funciones de navegación que pueden ser usadas por otros scripts
- `logout.js` proporciona la función de cierre de sesión utilizada en el header
- `components.js` debe cargarse al final para poder encontrar todas las funciones necesarias

### 2. Implementar Header

Coloca el siguiente código justo después de abrir el `<body>` y después del componente de animación de fondo (si existe):

```html
<!-- Header (componente) -->
<div id="header-container" data-component="/frontend/components/header.html"></div>
```

### 3. Implementar Footer

Coloca el siguiente código antes de los scripts específicos de la página y después del contenido principal:

```html
<!--=================================
    FOOTER
==================================-->
<div id="footer-container" data-component="/frontend/components/footer.html"></div>
```

## Estructura Completa Recomendada

```html
<!DOCTYPE html>
<html lang="es">
<head>
   <!-- Meta información y título -->
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Título de la Página - IEM</title>

   <!-- Hojas de estilo -->
   <link rel="stylesheet" href="/frontend/css/index.css">
   <link rel="stylesheet" href="/frontend/css/pages/nombre-pagina.css">

   <!-- Scripts compartidos (en este orden) -->
   <script type="module" src="/frontend/js/shared/navigation.js"></script>
   <script type="module" src="/frontend/js/shared/logout.js"></script>
   <script type="module" src="/frontend/js/shared/components.js"></script>
</head>
<body class="page-body">
<!-- Animaciones de fondo (componente) -->
<div id="background-animation-container" data-component="/frontend/components/background-animation.html"></div>

<!-- Header (componente) -->
<div id="header-container" data-component="/frontend/components/header.html"></div>

<!-- Contenido principal -->
<main class="main-container">
   <!-- Contenido específico de la página -->
</main>

<!-- Footer (componente) -->
<div id="footer-container" data-component="/frontend/components/footer.html"></div>

<!-- Script específico de la página -->
<script type="module" src="/frontend/js/pages/nombre-pagina.js"></script>
</body>
</html>
```

## Verificación de Implementación

Para verificar que los componentes se han implementado correctamente:

1. **Header**:
   - El logo institucional debe mostrarse correctamente
   - El nombre del usuario debe actualizarse automáticamente
   - El botón de cierre de sesión debe funcionar

2. **Footer**:
   - Debe mostrarse al final de la página
   - Debe contener el copyright y lema institucional

## Resolución de Problemas

Si los componentes no se cargan correctamente:

1. **Verificar orden de scripts**: Asegúrate de que los scripts se cargan en el orden correcto
2. **Comprobar rutas**: Verifica que las rutas a los componentes son correctas
3. **Revisar consola**: Busca errores en la consola del navegador
4. **Comprobar IDs**: Asegúrate de que los IDs de los contenedores son exactamente `header-container` y `footer-container`

## Ejemplos de Implementación

Las páginas `inicio.html` y `simulacro.html` ya tienen implementados correctamente estos componentes y pueden usarse como referencia.
