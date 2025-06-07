login-app/
│
├─ frontend/
   ├── index.html                 # Página principal/login
   ├── pages/                     # 📁 PÁGINAS SECUNDARIAS
   │   ├── dashboard.html         # Panel principal después del login
   │   ├── profile.html           # Perfil de usuario
   │   ├── settings.html          # Configuraciones
   │   ├── forgot-password.html   # Recuperar contraseña
   │   ├── register.html          # Registro de nuevos usuarios
   │   └── error.html             # Página de errores
   ├── css/
   │   ├── styles.css             # Estilos globales
   │   └── pages/                 # 📁 ESTILOS ESPECÍFICOS
   │       ├── dashboard.css
   │       ├── profile.css
   │       └── auth.css           # Estilos para login/register
   ├── js/
   │   ├── index.js              # JavaScript global
   │   └── pages/                 # 📁 SCRIPTS ESPECÍFICOS
   │       ├── dashboard.js
   │       ├── profile.js
   │       └── auth.js            # Lógica de autenticación
   ├── components/                # 📁 COMPONENTES REUTILIZABLES
   │   ├── navbar.html
   │   ├── footer.html
   │   └── modal.html
   ├── assets/
   │   ├── images/
   │   └── fonts/
   └── README.md