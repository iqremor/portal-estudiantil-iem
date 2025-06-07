# Módulos JavaScript Compartidos

## Descripción
Este directorio contiene módulos JavaScript reutilizables que proporcionan funcionalidad común a múltiples páginas del portal. Estos módulos están diseñados para ser importados y utilizados en cualquier página que los necesite.

## Módulos Disponibles

### Components (`components.js`)
Proporciona funcionalidad para cargar componentes HTML reutilizables en las páginas.

**Funciones principales:**
- `loadComponent(containerId, componentPath, data)`: Carga un componente HTML en un contenedor específico
- `initComponents()`: Inicializa automáticamente todos los componentes definidos con atributos data-component

**Uso:**
```javascript
import { loadComponent } from '/frontend/js/shared/components.js';

// Cargar un componente
await loadComponent('mi-contenedor', '/frontend/components/mi-componente.html');
```

### Navigation (`navigation.js`)
Gestiona la navegación entre páginas y la verificación de autenticación.

**Funciones principales:**
- `volverAlInicio()`: Navega a la página de inicio
- `irAlLogin()`: Navega a la página de login y limpia la sesión
- `navegarA(path)`: Navega a una página específica
- `verificarAutenticacion()`: Verifica si el usuario está autenticado

**Uso:**
```javascript
import { navegarA, verificarAutenticacion } from '/frontend/js/shared/navigation.js';

// Verificar autenticación antes de mostrar contenido
if (verificarAutenticacion()) {
  // Mostrar contenido protegido
}

// Navegar a otra página
navegarA('/frontend/pages/otra-pagina.html');
```

### Logout (`logout.js`)
Maneja el cierre de sesión de usuarios.

**Funciones principales:**
- `logout()`: Cierra la sesión del usuario y redirige al login

**Uso:**
```html
<button onclick="logout()">Cerrar Sesión</button>
```

## Cómo Crear Nuevos Módulos

1. Crea un nuevo archivo JavaScript en este directorio
2. Usa sintaxis de módulos ES6 (export/import)
3. Documenta cada función con comentarios JSDoc
4. Actualiza este README.md añadiendo información del nuevo módulo

Ejemplo de estructura para un nuevo módulo:

```javascript
/**
 * @module miModulo
 * @description Descripción de lo que hace este módulo
 */

/**
 * Descripción de la función
 * @param {tipo} parametro - Descripción del parámetro
 * @returns {tipo} Descripción del valor de retorno
 */
export function miFuncion(parametro) {
  // Implementación
  return resultado;
}
```

## Buenas Prácticas

1. **Modularidad**: Cada módulo debe tener una responsabilidad única y bien definida
2. **Documentación**: Usa comentarios JSDoc para documentar cada función
3. **Manejo de Errores**: Implementa try/catch para operaciones que puedan fallar
4. **Consistencia**: Mantén un estilo de código consistente en todos los módulos
5. **Evita Efectos Secundarios**: Los módulos no deben modificar el estado global inesperadamente

## Interoperabilidad

Para usar estos módulos en páginas HTML, asegúrate de incluir el atributo `type="module"` en la etiqueta script:

```html
<script type="module">
  import { miFuncion } from '/frontend/js/shared/miModulo.js';

  // Usar la función importada
  miFuncion();
</script>
```

O para importar en un archivo externo:

```html
<script type="module" src="/frontend/js/pages/miPagina.js"></script>
```
