// =====================
// Importaciones
// =====================

// =====================
// Validación de formato
// =====================
// Valida que el código empiece por IEM y tenga 4 números
export function validarFormatoCodigo(cod_estudiante) {
    return /^IEM\d{4}$/.test(cod_estudiante);
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
    return await response.json();
}
