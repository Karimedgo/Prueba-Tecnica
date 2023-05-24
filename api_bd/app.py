from flask import Flask,request
import sqlite3
import os
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

ruta_script = os.path.dirname(os.path.abspath(__file__))

# Construir la ruta al archivo prueba.db
ruta_bd = os.path.join(ruta_script, 'prueba.db')
# Establecer conexión con la base de datos


def leer():
    try:
        conn = sqlite3.connect(ruta_bd)
        # Crear un cursor para ejecutar consultas
        cursor = conn.cursor()

        # Obtener el nombre de las tablas
        cursor.execute("SELECT * FROM estados ORDER BY fecha DESC;")
        resultado = cursor.fetchall()

        # Mostrar las tablas
        print("datos:")
        print(resultado[0])#resultado)
        for fila in resultado:
            print(fila)
            break
        return {"estado de puerta":resultado[0][1],"estado de termometro":resultado[0][0],"ultima fecha":resultado[0][2]}
        # Cerrar el cursor
       

    except sqlite3.Error as error:
        print("Error en la conexión con la base de datos:", error)

    finally:
        # Cerrar la conexión
        conn.close()


def set_datos():
    try:
        conn = sqlite3.connect(ruta_bd)
        # Crear un cursor para ejecutar consultas
        cursor = conn.cursor()

        # Obtener el nombre de las tablas
        cursor.execute("SELECT * FROM estados ORDER BY fecha ASC;")
        resultado = cursor.fetchall()
        datos_puerta = {}
        datos_termo = {}
        # Mostrar las tablas
        print("resultado",[resultado])
        for i in range(len(resultado)):
            datos_puerta[resultado[i][2]] = resultado[i][0]
            datos_termo[resultado[i][2]] = resultado[i][1]
        return {"datos_puerta":datos_puerta,"datos_termometro":datos_termo}
        
        

    except sqlite3.Error as error:
        print("Error en la conexión con la base de datos:", error)

    finally:
        # Cerrar la conexión
        conn.close()


@app.route("/leer",methods=["GET"])
def leer_datos():
    return leer()

@app.route("/leer_datos",methods=["GET"])
def set_leer_datos():
    return set_datos()

@app.route("/nuevo_estado",methods=["POST"])
def insertar():
    peticion =request.get_json()
    conn = sqlite3.connect(ruta_bd)
        # Crear un cursor para ejecutar consultas
    cursor = conn.cursor()
    termometro = peticion["estado_termometro"]
    puerta = peticion["estado_puerta"]    
    cursor.execute(f'insert into estados (termometro_estado,puerta_estado) VALUES ({termometro},{puerta});')
    conn.commit()
    return request.get_data()


if __name__ == '__main__':
    app.run(debug=True,port=5800)




