import sqlite3

# Conectar a la base de datos (se creará si no existe)
conexion = sqlite3.connect("resultados.db")

# Crear un cursor para ejecutar comandos SQL
cursor = conexion.cursor()

# Crear la tabla "resultados"
cursor.execute("""
    CREATE TABLE resultados (
        codigo TEXT PRIMARY KEY,
        nombre TEXT,
        puntaje INTEGER
    )
""")

# Guardar los cambios y cerrar la conexión
conexion.commit()
conexion.close()