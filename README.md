# Portal de Evaluación Académica IEM

## Descripción
Sistema web interactivo para evaluaciones académicas que permite a los estudiantes realizar pruebas en diferentes áreas del conocimiento. Desarrollado específicamente para la Institución Educativa Municipal (IEM).

## Características Principales
- 🔐 Sistema de autenticación por código estudiantil
- 📚 Evaluaciones en múltiples áreas:
  - Matemáticas
  - Ciencias Naturales
  - Ciencias Sociales
  - Análisis de Imagen
  - Comprensión de Textos
- ⏱️ Temporizador incorporado en las pruebas
- 📊 Sistema de puntuación estandarizado
- 💾 Almacenamiento de resultados
- 📱 Diseño responsive

## Requisitos Previos
- Node.js >= 14.x
- Python >= 3.12
- Navegador web moderno (Chrome, Firefox, Safari, Edge)

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_del_repositorio]
cd plat_web
```

2. Instalar dependencias del servidor:
```bash
npm install
```

3. Configurar el entorno virtual de Python:
```bash
python -m venv plate
source plate/bin/activate  # En Linux/Mac
pip install -r requirements.txt
```

4. Configurar la base de datos:
```bash
# Asegurarse que el archivo usuarios.json existe en la carpeta data/
```

## Uso
1. Iniciar el servidor:
```bash
node plate_server.js
```

2. Acceder a la aplicación:
- Abrir el navegador
- Visitar `http://localhost:8000`
- Ingresar con el código estudiantil (formato: IEMdddd)

# Portal de Acceso Estudiantil - IEM

## Estructura del Proyecto

### Archivos Principales y sus Roles

**Frontend:**
- `index.html`: Página principal con el formulario de acceso
- `frontend/js/validacion.js`: Funciones de validación del código estudiantil
- `frontend/js/index.js`: Manejo del formulario y mensajes de UI
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

### 2. Validación Frontend (index.js + validacion.js)
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
[index.html] ← → [index.js + validacion.js]
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
5. Configurar la rama principal:
```bash
git branch -M main
```
6. revisar el estado del repositorio:
```bash
git status
git remote -v
```
7. subir a un repositorio remoto:
```bash
git remote add origin [https://github.com/iqremor/portal-estudiantil-iem.git]
git push -u origin main
```
8. verificar las ramas del proyecto:
  a. ramas locales:
    ```bash
    git branch -a
    ``` 
  b. ramas remotas:
    ```bash
    git branch -r
    ```
9. verificar el historial de commits:
  a. rama principal
    ```bash
    git log main
    ```
  b. rama de desarrollo
    ```bash 
    git log develop
    ```
10. crear una nueva rama para desarrollo:
  a. creación de la rama de desarrollo local: 
  ```bash
  git checkout -b develop
  ```
  b. creación de la rama de desarrollo remota:
  ```bash
  git push -u origin feature/mi-nueva-caracteristica
  ```
  c. cambio entre ramas:
  ```bash
  git switch main # para cambiar a la rama principal 
  git switch develop # para cambiar a la rama de desarrollo
  ```
11. subir la rama de desarrollo al repositorio remoto:
```bash
git push -u origin develop
``` 
12. realizar cambios y hacer commit:
```bash
git add .
git commit -m "Descripción de los cambios realizados"
```
13. fusionar cambios de la rama de desarrollo a la rama principal:
```bash
git checkout main
git merge develop
```
14. subir los cambios a la rama principal en el repositorio remoto:
```bash
git push origin main
```
15. eliminar la rama de desarrollo local y remota (opcional):
```bash
git branch -d develop
git push origin --delete develop
``` 

## Contribución
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

## Versión de Cambios

### Flujo Actual del Proyecto (2025-05-26)

1. **Acceso y Autenticación**
   - El usuario accede a la página principal (`index.html`) e ingresa su código estudiantil (formato: IEM####).
   - El frontend valida el formato antes de enviar la petición al backend.
   - Si el formato es válido, se envía una petición POST a `/api/validar`.

2. **Validación en el Backend**
   - El backend (`plate_server.js`) verifica el código en `usuarios_permitidos` de `data/usuarios.json`.
   - Si el código es válido, responde con `{ permitido: true, mensaje: "Código permitido", nombre: "Nombre Completo" }`.
   - Si no es válido, responde con `{ permitido: false, mensaje: "Código no permitido", nombre: null }`.

3. **Manejo de la Respuesta en el Frontend**
   - Si el acceso es permitido, el frontend guarda en `localStorage` el nombre completo y el grado del usuario.
   - Se muestra un mensaje de éxito y se redirige automáticamente a la página de inicio (`frontend/pages/inicio.html`).
   - Si el acceso no es permitido, se muestra un mensaje de error y el usuario permanece en la página de login.

4. **Página de Inicio Personalizada**
   - Al cargar la página de inicio, el script lee el nombre completo y el grado desde `localStorage`.
   - Se muestran el nombre completo y las iniciales del usuario en el header.
   - También se personaliza el mensaje de bienvenida y el subtítulo con el nombre y grado.

5. **Cierre de Sesión**
   - El usuario puede cerrar sesión con el botón correspondiente.
   - Al cerrar sesión, se eliminan los datos del usuario de `localStorage` y se redirige al login.

6. **Estructura de Datos Mejorada**
   - El archivo `usuarios.json` ahora contiene un objeto `nombres` que asocia cada código a un nombre completo.
   - Esto permite mostrar el nombre real del usuario tras la autenticación.

7. **Estilos y Responsividad**
   - El diseño es responsivo y moderno, adaptándose a cualquier dispositivo.
   - El footer siempre es visible y el contenido principal está centrado.

8. **Control de Versiones**
   - El proyecto utiliza Git, con instrucciones claras para ramas, commits y trabajo colaborativo.

---