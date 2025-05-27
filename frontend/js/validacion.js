// =====================
// Importaciones
// =====================

// =====================
// Validación de formato
// =====================
// Valida que el código empiece por IEM y tenga 4 números
export function validarFormatoCodigo(cod_estudiante) {
    // Verificar que el código existe y no está vacío
    if (!cod_estudiante || typeof cod_estudiante !== 'string') {
        return false;
    }
    // Convertir a mayúsculas y eliminar espacios
    const codigo = cod_estudiante.trim().toUpperCase();
    // Validar el formato: IEM seguido de exactamente 4 números
    return /^IEM\d{4}$/.test(codigo);
}


// =====================
// Validación en servidor
// =====================
// Llama a la API para validar el código estudiantil
export async function validarCodigoEnServidor(cod_estudiante) {
    const response = await fetch('/api/validar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cod_estudiante })
    });
    return await response.json(); // Puede incluir { permitido, mensaje, nombre }
}
