// =======================
//  Importaciones y setup
// =======================
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8000;

// =======================
//     Middleware
// =======================
app.use('/frontend', express.static(path.join(__dirname, 'frontend')));
app.use(express.json());

// =======================
//  Cargar usuarios
// =======================
let usuarios;
try {
    usuarios = JSON.parse(fs.readFileSync('data/usuarios.json', 'utf8'));
    if (!Array.isArray(usuarios.usuarios_permitidos)) {
        usuarios.usuarios_permitidos = [];
    }
} catch (error) {
    console.error('Error cargando usuarios:', error);
    usuarios = { usuarios_permitidos: [] };
}

// =======================
//      Rutas API
// =======================

// Ruta para validar nombre
app.post('/api/validar', (req, res) => {
    // Verificar si se recibió el código estudiantil
    if (!req.body.cod_estudiante) {
        return res.json({ permitido: false, mensaje: 'Código requerido' });
    }

    let cod_estudiante = req.body.cod_estudiante.trim().toUpperCase();

    // Validar el formato del código
    if (!/^IEM\d{4}$/.test(cod_estudiante)) {
        return res.json({ permitido: false, mensaje: 'El código debe comenzar con IEM seguido de 4 números' });
    }

    // Recargar usuarios desde usuarios.json para asegurar datos actualizados
    try {
        const usuariosActualizados = JSON.parse(fs.readFileSync('data/usuarios.json', 'utf8'));
        usuarios.usuarios_permitidos = Array.isArray(usuariosActualizados.usuarios_permitidos)
            ? usuariosActualizados.usuarios_permitidos
            : [];
    } catch (error) {
        console.error('Error recargando usuarios:', error);
        return res.json({ permitido: false, mensaje: 'Error interno' });
    }

    const permitido = usuarios.usuarios_permitidos.includes(cod_estudiante);

    res.json({ 
        permitido,
        mensaje: permitido ? 'Código permitido' : 'Código no permitido'
    });
});

// =======================
//      Rutas Web
// =======================

// Ruta para obtener página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para redirigir a inicio.html si el usuario está autenticado
app.post('/redirigir-inicio', (req, res) => {
    const nombre = req.body.nombre?.trim().toUpperCase(); // Normaliza a mayúsculas
    if (nombre && usuarios.usuarios_permitidos.includes(nombre)) {
        return res.json({ redirigir: true, url: '/frontend/pages/inicio.html' });
    }
    res.json({ redirigir: false });
});

// =======================
//   Iniciar servidor
// =======================
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
    console.log(`Usuarios permitidos: ${usuarios.usuarios_permitidos.length}`);
});

// =======================
//  Manejo de errores
// =======================
process.on('uncaughtException', (err) => {
    console.error('Error no capturado:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Promise rechazada:', reason);
});