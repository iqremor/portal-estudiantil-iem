# Simulacro_web

aplicación web interactiva similar a un sistema de pruebas académicas en WSL (Windows Subsystem for Linux). La aplicación debe permitir a los usuarios realizar evaluaciones en diferentes áreas de conocimiento (matemáticas, ciencias naturales, ciencias sociales, análisis de imagen y comprensión de textos).
El sistema debe incluir:

# 1. Una página de inicio con autenticación donde los usuarios ingresen su número de identificación
# 2. Una interfaz principal que muestre las diferentes categorías de preguntas disponibles
# 3. Secciones específicas para cada tipo de prueba con temporizador incorporado
Un sistema de puntuación que calcule resultados estandarizados (con media y desviación estándar definidas)
Almacenamiento de las interacciones y resultados del usuario en un backend

La aplicación debe ser responsive y funcionar en los navegadores más comunes. Por favor, explica paso a paso:

Cómo configurar el entorno de desarrollo en WSL
Qué tecnologías de frontend y backend serían más apropiadas
Cómo estructurar la base de datos para almacenar preguntas, respuestas y resultados de usuarios
Cómo implementar la autenticación de usuarios
Cómo desarrollar el sistema de puntuación y estadísticas
Cómo desplegar la aplicación en un servidor

# Portal de Acceso Estudiantil - IEM

## Estructura del Proyecto

### Archivos Principales y sus Roles

**Frontend:**
- `index.html`: Página principal con el formulario de acceso
- `frontend/js/validacion.js`: Funciones de validación del código estudiantil
- `frontend/js/script.js`: Manejo del formulario y mensajes de UI
- `frontend/css/styles.css`: Estilos de la aplicación
- `frontend/pages/inicio.html`: Página a la que se redirige tras acceso exitoso

**Backend:**
- `plate_server.js`: Servidor Express que maneja la validación
- `data/usuarios.json`: Base de datos de códigos permitidos

## Flujo de Validación

### 1. Entrada de Usuario
```
Usuario ingresa código en index.html
↓
Formato: IEMdddd (ejemplo: IEM1234)
```

### 2. Validación Frontend (script.js + validacion.js)
```
Validación de formato
↓
Si formato válido → Petición al servidor
Si formato inválido → Muestra mensaje de error
```

### 3. Validación Backend (plate_server.js)
```
Recibe petición POST a /api/validar
↓
Verifica en usuarios.json
↓
Responde: { permitido: true/false, mensaje: "..." }
```

### 4. Respuesta al Usuario
```
Si permitido:
→ Muestra mensaje de éxito
→ Redirige a inicio.html

Si no permitido:
→ Muestra mensaje de error
→ Mantiene en index.html
```

## Interacción de Componentes

```
[index.html] ← → [script.js + validacion.js]
      ↑               ↓
      └───── API ─────┘
              ↓
    [plate_server.js + usuarios.json]
```

## Mensajes de Validación

- **Formato inválido**: "El código estudiantil debe empezar por IEM y tener 4 números"
- **Código no permitido**: "Código no permitido"
- **Éxito**: "Código permitido" + redirección

## Seguridad
- Validación en frontend y backend
- Formato específico requerido (IEMdddd)
- Lista de usuarios permitidos en JSON
- Sin almacenamiento de contraseñas

## Características Adicionales
- Interfaz responsiva
- Mensajes de error visuales
- Animaciones de carga
- Validación en tiempo real del formato
- Recarga automática de la lista de usuarios permitidos

## Control de Versiones (Git)

### Configuración Inicial
1. Inicializar el repositorio:
```bash
git init
```

2. Crear archivo .gitignore:
```
# Dependencies
node_modules/
plate/

# Environment
.env
.env.local

# Logs
*.log
npm-debug.log*

# Editor directories
.vscode/
.idea/

# Sistema
.DS_Store
Thumbs.db
```

3. Agregar archivos al staging:
```bash
git add .
```

4. Primer commit:
```bash
git commit -m "Versión inicial del portal de acceso estudiantil"
```

### Estructura de Commits
- feat: Nuevas características
- fix: Correcciones de errores
- docs: Cambios en documentación
- style: Cambios de formato
- refactor: Refactorización de código
- test: Agregando o modificando tests

### Ramas Principales
- main: Versión estable
- develop: Desarrollo activo
- feature/*: Nuevas características

### Flujo de Trabajo
1. Crear rama para nueva característica
2. Desarrollar y probar
3. Hacer commit con mensaje descriptivo
4. Merge a develop
5. Pruebas finales
6. Merge a main para producción
