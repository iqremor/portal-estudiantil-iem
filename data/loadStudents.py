#!/usr/bin/env python3
"""
Script para cargar estudiantes desde un archivo CSV a usuarios.json
"""

import pandas as pd
import json
import os
from datetime import date
from pathlib import Path

# Rutas de archivos
SCRIPT_DIR = Path(__file__).parent
CSV_FILE_PATH = SCRIPT_DIR / '../data/PRECIFES.csv'  # Cambiado a PREICFES.csv
JSON_FILE_PATH = SCRIPT_DIR / '../data/usuarios.json'

def load_existing_json():
    """Carga el archivo JSON existente o retorna un diccionario vacío"""
    if JSON_FILE_PATH.exists():
        try:
            with open(JSON_FILE_PATH, 'r', encoding='utf-8') as file:
                existing_data = json.load(file)
                print('📄 Archivo usuarios.json existente encontrado, actualizando...')
                return existing_data
        except (json.JSONDecodeError, Exception) as e:
            print(f'⚠️  Archivo JSON corrupto o inválido ({e}), creando uno nuevo...')
            return {}
    else:
        print('📄 Creando nuevo archivo usuarios.json...')
        return {}

def load_csv_data():
    """Carga y valida los datos del archivo CSV"""
    if not CSV_FILE_PATH.exists():
        raise FileNotFoundError(f"❌ No se encontró el archivo CSV: {CSV_FILE_PATH}")
    
    try:
        # Intentar diferentes encodings comunes
        encodings = ['utf-8', 'latin-1', 'cp1252', 'iso-8859-1']
        df = None
        
        for encoding in encodings:
            try:
                df = pd.read_csv(CSV_FILE_PATH, encoding=encoding)
                print(f'✅ CSV cargado exitosamente con encoding: {encoding}')
                break
            except UnicodeDecodeError:
                continue
        
        if df is None:
            raise Exception("No se pudo leer el archivo CSV con ningún encoding")
        
        # Validar columnas requeridas
        required_columns = ['nombre', 'codigo']
        missing_columns = [col for col in required_columns if col not in df.columns]
        
        if missing_columns:
            raise ValueError(f"Columnas faltantes en el CSV: {missing_columns}")
        
        # Limpiar datos
        df = df.dropna(subset=['nombre', 'codigo'])  # Eliminar filas con valores nulos
        df['nombre'] = df['nombre'].astype(str).str.strip()
        df['codigo'] = df['codigo'].astype(str).str.strip().str.upper()
        
        # Eliminar duplicados por código
        df = df.drop_duplicates(subset=['codigo'], keep='first')
        
        print(f'📊 Datos procesados: {len(df)} estudiantes válidos encontrados')
        return df
        
    except Exception as e:
        raise Exception(f"Error procesando el archivo CSV: {str(e)}")

def create_usuarios_structure(df, existing_data):
    """Crea la estructura del JSON con los datos del CSV"""
    
    # Crear listas y diccionarios
    usuarios_permitidos = df['codigo'].tolist()
    nombres = dict(zip(df['codigo'], df['nombre']))
    
    # Estructura del JSON
    usuarios = {
        "comentario_1": existing_data.get("comentario_1", "Datos de usuario para la aplicación web"),
        "usuarios_permitidos": usuarios_permitidos,
        "nombres": nombres,
        "comentario_2": existing_data.get("comentario_2", "Puedes agregar aquí información adicional para el frontend o administración"),
        "informacion": {
            "ultima_actualizacion": str(date.today()),  # Fecha actual YYYY-MM-DD
            "total_usuarios": len(df),
            "contacto_soporte": existing_data.get("informacion", {}).get("contacto_soporte", "soporte@iem_cauca.edu.co")
        },
        "comentario_3": existing_data.get("comentario_3", "Puedes agregar más secciones según necesidades futuras")
    }
    
    # Preservar secciones adicionales del archivo existente
    for key, value in existing_data.items():
        if key not in usuarios and key not in ['usuarios_permitidos', 'nombres']:
            usuarios[key] = value
    
    return usuarios

def save_json(usuarios_data):
    """Guarda el archivo JSON"""
    try:
        with open(JSON_FILE_PATH, 'w', encoding='utf-8') as file:
            json.dump(usuarios_data, file, indent=4, ensure_ascii=False)
        
        print(f'✅ Actualización completada: {usuarios_data["informacion"]["total_usuarios"]} estudiantes actualizados en usuarios.json')
        print(f'📅 Fecha de actualización: {usuarios_data["informacion"]["ultima_actualizacion"]}')
        print(f'📁 Archivo guardado en: {JSON_FILE_PATH.absolute()}')
        
    except Exception as e:
        raise Exception(f"Error escribiendo el archivo JSON: {str(e)}")

def main():
    """Función principal"""
    try:
        print('🚀 Iniciando actualización de usuarios.json desde CSV...')
        
        # Cargar datos existentes
        existing_data = load_existing_json()
        
        # Cargar y procesar CSV
        df = load_csv_data()
        
        # Crear estructura JSON
        usuarios_data = create_usuarios_structure(df, existing_data)
        
        # Guardar archivo JSON
        save_json(usuarios_data)
        
        print('🎉 Proceso completado exitosamente!')
        
    except Exception as e:
        print(f'❌ Error: {str(e)}')
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())