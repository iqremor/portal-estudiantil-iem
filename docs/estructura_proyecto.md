# Estructura del Proyecto Portal Estudiantil IEM

## Visión General

El Portal Estudiantil IEM es una aplicación web que permite a los estudiantes realizar evaluaciones académicas en diferentes áreas. La aplicación sigue una arquitectura cliente-servidor con un frontend en HTML/CSS/JavaScript y un backend en Node.js con Express.

## Estructura de Directorios

```
plat_web/                    # Raíz del proyecto
├── data/                    # Datos de la aplicación
│   └── usuarios.json        # Base de datos de usuarios
├── frontend/                # Código frontend
│   ├── assets/              # Recursos estáticos (imágenes, fuentes, etc.)
│   ├── components/          # Componentes HTML reutilizables
│   ├── css/                 # Hojas de estilo
│   │   ├── styles.css       # Estilos globales
│   │   └── pages/           # Estilos específicos de página
│   ├── js/                  # Código JavaScript
│   │   ├── pages/           # Scripts específicos de página
│   │   ├── shared/          # Módulos compartidos
│   │   ├── index.js        # Script principal
│   │   └── validacion.js    # Validación de formularios
│   └── pages/               # Páginas HTML
│       ├── inicio.html      # Página de inicio tras login
│       └── simulacro.html   # Página de simulacros
├── docs/                    # Documentación
├── index.html              # Página de login
├── plate_server.js         # Servidor Express
├── package.json            # Dependencias npm
├── .gitignore              # Archivos ignorados por git
└── README.md               # Documentación principal
```

## Componentes Principales

### Frontend

#### Sistema de Componentes
El frontend utiliza un sistema de componentes HTML reutilizables que se cargan dinámicamente mediante JavaScript. Esto permite mantener una estructura consistente y reducir la duplicación de código.

**Componentes Disponibles:**
- Header: Encabezado común para todas las páginas
- Footer: Pie de página común
- Background Animation: Elementos de animación de fondo

#### Módulos JavaScript
La lógica JavaScript está organizada en módulos reutilizables que proporcionan funcionalidad específica:

**Módulos Principales:**
- components.js: Carga de componentes HTML
- navigation.js: Navegación entre páginas
- logout.js: Gestión de cierre de sesión

#### Páginas
Las páginas HTML del portal siguen una estructura común y utilizan los componentes reutilizables:

**Páginas Principales:**
- index.html: Página de login
- inicio.html: Dashboard del estudiante
- simulacro.html: Interfaz de simulacros

### Backend

#### Servidor Express
El archivo `plate_server.js` implementa un servidor Express que maneja:
- Validación de usuarios
- Rutas API
- Servicio de archivos estáticos

#### Base de Datos
La información de usuarios se almacena en `data/usuarios.json` con la siguiente estructura:
```json
{
  "usuarios_permitidos": ["IEM1234", "IEM5678", ...],
  "nombres": {
    "IEM1234": "Nombre Completo",
    ...
  }
}
```

## Flujo de Trabajo

### Autenticación
1. El usuario ingresa su código estudiantil en la página de login
2. El frontend valida el formato y envía una petición al servidor
3. El servidor verifica el código contra la base de datos
4. Si es válido, el usuario es redirigido al dashboard

### Navegación
1. Todas las páginas verifican la autenticación al cargar
2. La información del usuario se obtiene del localStorage
3. Los componentes comunes (header, footer) se cargan automáticamente

## Convenciones

### Rutas
Todas las rutas a recursos utilizan rutas absolutas desde la raíz del proyecto:
- CSS: `/frontend/css/...`
- JavaScript: `/frontend/js/...`
- Componentes: `/frontend/components/...`
- Imágenes: `/frontend/assets/images/...`

### Estilos
Los estilos siguen una estructura modular:
- `styles.css`: Estilos globales y variables CSS
- Carpeta `pages/`: Estilos específicos para cada página

### JavaScript
- Se utiliza sintaxis de módulos ES6 (import/export)
- Cada función tiene documentación JSDoc
- El código está organizado en módulos con responsabilidad única

## Ampliación del Proyecto

Para añadir nuevas funcionalidades:

1. **Nuevas páginas**:
   - Crear HTML en `/frontend/pages/`
   - Usar los componentes existentes
   - Crear JS específico en `/frontend/js/pages/`

2. **Nuevos componentes**:
   - Crear HTML en `/frontend/components/`
   - Documentar el uso del componente
   - Actualizar README.md del directorio

3. **Nuevas funcionalidades del servidor**:
   - Añadir rutas en `plate_server.js`
   - Documentar API endpoints
