# Sistema de Componentes Reutilizables

## Descripción
Este directorio contiene componentes HTML reutilizables que pueden ser incluidos en múltiples páginas del portal. El sistema utiliza un cargador de componentes basado en JavaScript que permite insertar dinámicamente estos fragmentos de HTML en las páginas.

## Componentes Disponibles

### Header (`header.html`)
Encabezado estándar que muestra el logo de la institución, información institucional y datos del usuario conectado.

**Uso:**
```html
<div id="header-container" data-component="/frontend/components/header.html"></div>
```

### Footer (`footer.html`)
Pie de página estándar con información de copyright y lema institucional.

**Uso:**
```html
<div id="footer-container" data-component="/frontend/components/footer.html"></div>
```

### Background Animation (`background-animation.html`)
Elementos animados para el fondo de las páginas que dan dinamismo visual.

**Uso:**
```html
<div id="background-animation-container" data-component="/frontend/components/background-animation.html"></div>
```

## Cómo Usar Componentes

### Método Básico
1. Incluir el script de componentes en el head de la página:
```html
<script type="module" src="/frontend/js/shared/components.js"></script>
```

2. Insertar un contenedor con atributos data-component:
```html
<div id="mi-contenedor" data-component="/ruta/al/componente.html"></div>
```

### Personalización de Componentes
Puedes pasar datos para personalizar un componente usando el atributo data-values con un objeto JSON:

```html
<div id="mi-contenedor" 
     data-component="/ruta/al/componente.html"
     data-values='{"titulo": "Mi Título", "usuario": "Juan"}'></div>
```

Dentro del componente, usa la sintaxis {{nombreVariable}} para las partes que se reemplazarán:

```html
<h1>{{titulo}}</h1>
<p>Bienvenido, {{usuario}}</p>
```

## Carga Manual de Componentes

También puedes cargar componentes programáticamente:

```javascript
import { loadComponent } from '/frontend/js/shared/components.js';

// Cargar un componente básico
await loadComponent('mi-contenedor', '/ruta/al/componente.html');

// Cargar un componente con datos personalizados
await loadComponent('mi-contenedor', '/ruta/al/componente.html', {
  titulo: 'Mi Título Dinámico',
  usuario: 'María'
});
```

## Buenas Prácticas

1. **Estructura Consistente**: Mantén una estructura HTML consistente en todos los componentes.
2. **Documentación Interna**: Incluye comentarios que expliquen el propósito y uso del componente.
3. **Estilos Modulares**: Evita estilos inline, usa las clases CSS definidas globalmente.
4. **Nombres Claros**: Usa nombres descriptivos para los IDs de contenedores.
5. **Validación**: Asegúrate de que los componentes se vean bien en todas las resoluciones.

## Extensión del Sistema

Para añadir nuevos componentes:

1. Crea un nuevo archivo HTML en este directorio
2. Documenta su propósito con comentarios
3. Actualiza este README.md añadiendo información del nuevo componente
4. Prueba el componente en diferentes páginas antes de implementarlo completamente
