# Sistema de Componentes

## Descripción General
El sistema de componentes permite crear interfaces consistentes y mantenibles mediante la reutilización de fragmentos HTML. Este enfoque modular facilita el mantenimiento y garantiza la coherencia visual en toda la aplicación.

## Beneficios
- **Consistencia**: Interfaz uniforme en todas las páginas
- **Mantenibilidad**: Cambios centralizados que se reflejan en toda la aplicación
- **Eficiencia**: Reducción de código duplicado
- **Escalabilidad**: Facilita la creación de nuevas páginas

## Componentes Disponibles

| Componente | Archivo | Descripción | Documentación |
|------------|---------|-------------|---------------|
| Header | `/frontend/components/header.html` | Cabecera estándar con logo, info institucional y datos de usuario | [Ver documentación](/frontend/docs/header-component.md) |
| Footer | `/frontend/components/footer.html` | Pie de página con copyright y lema institucional | [Ver documentación](/frontend/docs/footer-component.md) |
| Background Animation | `/frontend/components/background-animation.html` | Elementos animados para el fondo | [Ver documentación](/frontend/docs/background-animation-component.md) |

## Cómo Funciona

### Arquitectura
El sistema utiliza un cargador de componentes basado en JavaScript que:
1. Detecta contenedores con atributos `data-component`
2. Carga el HTML del componente desde la ruta especificada
3. Reemplaza variables si se proporcionan datos personalizados
4. Inserta el contenido en el contenedor

### Flujo de Datos
```
[Página HTML] → [Cargador de Componentes] → [Archivo de Componente] → [DOM Actualizado]
```

## Uso Básico

### 1. Incluir el Script de Componentes
```html
<script type="module" src="/frontend/js/shared/components.js"></script>
```

### 2. Definir Contenedores de Componentes
```html
<div id="mi-contenedor" data-component="/ruta/al/componente.html"></div>
```

### 3. Personalizar con Datos (Opcional)
```html
<div id="mi-contenedor" 
     data-component="/ruta/al/componente.html"
     data-values='{"variable1": "valor1", "variable2": "valor2"}'></div>
```

## Uso Programático

También puedes cargar componentes desde JavaScript:

```javascript
import { loadComponent } from '/frontend/js/shared/components.js';

// Cargar un componente básico
await loadComponent('mi-contenedor', '/ruta/al/componente.html');

// Cargar un componente con datos personalizados
await loadComponent('mi-contenedor', '/ruta/al/componente.html', {
  variable1: 'valor1',
  variable2: 'valor2'
});
```

## Creación de Nuevos Componentes

### Estructura Recomendada
```html
<!--=================================
    NOMBRE DEL COMPONENTE
==================================-->
<div class="componente-container">
    <!-- Contenido del componente -->
    <p>Texto de ejemplo con {{variable}}</p>
</div>
```

### Pasos para Crear un Nuevo Componente
1. Crear un archivo HTML en `/frontend/components/`
2. Seguir la estructura recomendada
3. Usar `{{nombreVariable}}` para partes que serán reemplazadas
4. Documentar el componente en `/frontend/docs/`
5. Actualizar este documento para incluir el nuevo componente

## Buenas Prácticas

### Estructura y Nombrado
- Usar nombres descriptivos para los archivos de componentes
- Seguir la estructura de comentarios establecida
- Mantener los componentes enfocados en una sola responsabilidad

### Estilos
- Usar clases CSS en lugar de estilos inline
- Definir estilos base en `/frontend/css/styles.css`
- Usar modificadores de clase para variaciones

### JavaScript
- Evitar scripts complejos dentro de componentes
- Preferir eventos delegados desde la página principal
- Documentar cualquier requisito de JavaScript

## Depuración

Si un componente no se carga correctamente:
1. Verificar que el ID del contenedor existe y es único
2. Comprobar que la ruta al componente es correcta
3. Validar el formato JSON si se usan datos personalizados
4. Revisar la consola del navegador para mensajes de error

## Extensión del Sistema

Para mejorar el sistema de componentes en el futuro:
1. Implementar caché de componentes para mejorar rendimiento
2. Añadir sistema de eventos para comunicación entre componentes
3. Crear componentes anidados (componentes dentro de componentes)
4. Desarrollar herramientas de previsualización de componentes
