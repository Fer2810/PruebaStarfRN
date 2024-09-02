from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Conexión a la base de datos
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",  # Cambia esto por tu contraseña de MySQL
        database="app_incas"  # Cambia esto por el nombre de tu base de datos
    )

# Ruta para inicio de sesión de administrador
@app.route('/login/administrador', methods=['POST'])
def login_administrador():
    data = request.json
    nombre = data.get('nombre')
    contraseña = data.get('contraseña')

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM administradores WHERE nombre = %s", (nombre,))
    admin = cursor.fetchone()

    cursor.close()
    connection.close()

    if admin and admin['contraseña'] == contraseña:
        return jsonify({"message": "Inicio de sesión exitoso"}), 200
    else:
        return jsonify({"message": "Nombre o contraseña incorrectos"}), 401

# Ruta para inicio de sesión de profesor
@app.route('/login/profesor', methods=['POST'])
def login_profesor():
    data = request.json
    nombre = data.get('nombre')
    contraseña = data.get('contraseña')

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM datos_prof WHERE nombre = %s", (nombre,))
    profesor = cursor.fetchone()

    cursor.close()
    connection.close()

    if profesor and profesor['contraseña'] == contraseña:
        return jsonify({"message": "Inicio de sesión exitoso"}), 200
    else:
        return jsonify({"message": "Nombre o contraseña incorrectos"}), 401

# Ruta para obtener estudiantes presentes
@app.route('/obtener_presentes', methods=['GET'])
def obtener_presentes():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT nie, nombre, apellido, bachillerato, genero, id_año FROM presentes WHERE estado = 1")
    presentes = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(presentes)

# Ruta para guardar asistencia
@app.route('/guardar_asistencia', methods=['POST'])
def guardar_asistencia():
    datos = request.json
    connection = get_db_connection()
    cursor = connection.cursor()

    for presente in datos:
        try:
            cursor.execute("""
                INSERT INTO asistencia_general (nie, nombre, apellido, bachillerato, genero, id_año, fecha_registro)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, (presente['nie'], presente['nombre'], presente['apellido'], presente['bachillerato'], presente['genero'], presente['id_año'], datetime.now()))
        except mysql.connector.Error as err:
            print(f"Error al insertar en asistencia_general: {err}")
            connection.rollback()
            return jsonify({"error": "No se pudo guardar la asistencia"}), 500

    connection.commit()
    cursor.close()
    connection.close()

    return jsonify({"message": "Datos guardados con éxito"})

# Ruta para obtener estudiantes no presentes (estado = 0)
@app.route('/obtener_no_presentes', methods=['GET'])
def obtener_no_presentes():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT nie, nombre, apellido, bachillerato, genero, id_año FROM presentes WHERE estado = 0")
    no_presentes = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(no_presentes)

# Ruta para guardar justificaciones
@app.route('/guardar_justificaciones', methods=['POST'])
def guardar_justificaciones():
    datos = request.json
    connection = get_db_connection()
    cursor = connection.cursor()

    if not isinstance(datos, list):
        return jsonify({'error': 'El formato de los datos es incorrecto'}), 400

    for item in datos:
        try:
            justificacion = item.get('justificacion', 'presente')  # Valor por defecto para justificacion

            if item.get('check'):
                cursor.execute("""
                    INSERT INTO asistencia_general (nie, nombre, apellido, bachillerato, genero, id_año, fecha_registro, justificacion_asistencia)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                """, (item['nie'], item['nombre'], item['apellido'], item['bachillerato'], item['genero'], item['id_año'], datetime.now(), justificacion))
            else:
                cursor.execute("""
                    INSERT INTO no_asistencia_general (nie, nombre, apellido, bachillerato, genero, id_año, fecha_registro, justificacion_asistencia)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                """, (item['nie'], item['nombre'], item['apellido'], item['bachillerato'], item['genero'], item['id_año'], datetime.now(), justificacion))
        except mysql.connector.Error as err:
            print(f"Error al insertar en justificaciones: {err}")
            connection.rollback()
            return jsonify({"error": "No se pudo guardar la justificación"}), 500

    connection.commit()
    cursor.close()
    connection.close()

    return jsonify({"message": "Datos guardados con éxito"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
