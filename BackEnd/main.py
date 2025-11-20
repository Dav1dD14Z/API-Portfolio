from fastapi import FastAPI, HTTPException, Request, Form, status
from fastapi.responses import JSONResponse
from models.countries import Countrie, Login, User
from fastapi.middleware.cors import CORSMiddleware

import sqlite3

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hola clase!"}


@app.get("/create_db")
def create_db():
    conn = sqlite3.connect('miwebsite.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS countries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description1 TEXT NOT NULL,
            description2 TEXT NOT NULL,
            flag_url TEXT NOT NULL,
            latitude REAL,
            longitude REAL,
            video_url TEXT,
            img1 TEXT,
            img2 TEXT, 
            img3 TEXT,
            img4 TEXT,
            img5 TEXT,
            img6 TEXT,
            img7 TEXT,
            BckImage TEXT
        )''')
    conn.commit()
    conn.close()
    return {"message": "Database created successfully"}, status.HTTP_201_CREATED

@app.post("/countries/")
def crear_producto(countrie: Countrie):
    conn = sqlite3.connect('miwebsite.db')
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO countries (name, description1, description2, flag_url, latitude, longitude, video_url, img1, img2, img3, img4, img5, img6, img7, BckImage) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    ''', (countrie.name, countrie.description1, countrie.description2, countrie.flag_url, countrie.latitude, countrie.longitude, countrie.video_url, countrie.img1, countrie.img2, countrie.img3, countrie.img4, countrie.img5, countrie.img6, countrie.img7, countrie.BckImage))
    conn.commit()
    conn.close()
    return {
        "message": "Producto creado correctamente",
        "data": countrie.dict()
    }

@app.get("/countries/")
def listar_countries():
    conn = sqlite3.connect('miwebsite.db')
    cursor = conn.cursor()
    cursor.execute('SELECT id, name, description1, description2, flag_url, latitude, longitude, video_url, img1, img2, img3, img4, img5, img6, img7, BckImage FROM countries')
    countries = cursor.fetchall()
    conn.close()
    return {
        "data": [{"id": row[0], "nombre": row[1], "descripcion1": row[2], "descripcion2": row[3] , "URL": row[4], "latitud": row[5], "longitud": row[6], "video": row[7], "img1": row[8], "img2": row[9], "img3": row[10], "img4": row[11], "img5": row[12], "img6": row[13], "img7": row[14], "background": row[15]} for row in countries]
    }

@app.get("/countries/{countrie_id}")
def obtener_pais(countrie_id: int):
    conn = sqlite3.connect('miwebsite.db')
    cursor = conn.cursor()
    cursor.execute('SELECT id, name, description1, description2, flag_url, latitude, longitude, video_url, img1, img2, img3, img4, img5, img6, img7, BckImage FROM countries WHERE id = ?', (countrie_id,))
    row = cursor.fetchone()
    conn.close()

    if row is None:
        raise HTTPException(status_code=404, detail="País no encontrado")

    return {
        "id": row[0],
        "nombre": row[1],
        "descripcion1": row[2],
        "descripcion2": row[3],
        "url": row[4], 
        "latitud": row[5],
        "longitud": row[6],
        "video": row[7],
        "img1": row[8],
        "img2": row[9],
        "img3": row[10],
        "img4": row[11],
        "img5": row[12],
        "img6": row[13],
        "img7": row[14],    
        "background": row[15]
    }

@app.delete("/countries/{countrie_id}")
def eliminar_pais(countrie_id: int):
    conn = sqlite3.connect('miwebsite.db')
    cursor = conn.cursor()
    
    # Check if country exists
    cursor.execute('SELECT id FROM countries WHERE id = ?', (countrie_id,))
    if cursor.fetchone() is None:
        conn.close()
        raise HTTPException(status_code=404, detail="País no encontrado")
    
    # Delete the country
    cursor.execute('DELETE FROM countries WHERE id = ?', (countrie_id,))
    conn.commit()
    conn.close()
    
    return {"message": f"País con ID {countrie_id} eliminado correctamente"}



# Usuarios

@app.get("/create_users_db")
def create_db():
    conn = sqlite3.connect('usuarios.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            status INTEGER NOT NULL
        )''')
    conn.commit()
    conn.close()
    return {"message": "Database created successfully"}, status.HTTP_201_CREATED

@app.post("/adding/")
def crear_producto(user: User):
    conn = sqlite3.connect('usuarios.db')
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO users (username, password, status) VALUES (?,?,?)
    ''', (user.username, user.password, user.status))
    conn.commit()
    conn.close()
    return {
        "message": "Producto creado correctamente",
        "data": user.dict()
    }

@app.get("/users/")
def listar_users():
    conn = sqlite3.connect('usuarios.db')
    cursor = conn.cursor()
    cursor.execute('SELECT id, username, password, status FROM users')
    users = cursor.fetchall()
    conn.close()
    return {
        "data": [{"id": row[0], "username": row[1], "password": row[2], "status": row[3]} for row in users]
    }

@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    conn = sqlite3.connect('usuarios.db')
    cursor = conn.cursor()
    
    cursor.execute('SELECT id FROM users WHERE id = ?', (user_id,))
    if cursor.fetchone() is None:
        conn.close()
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    cursor.execute('DELETE FROM users WHERE id = ?', (user_id,))
    conn.commit()
    conn.close()
    
    return {"message": f"Usuario con ID {user_id} eliminado correctamente"}



# Login
@app.post("/login")
def login(data: Login):
    conn = sqlite3.connect("usuarios.db")
    cursor = conn.cursor()

    cursor.execute("SELECT id, username, password, status FROM users WHERE username = ?", (data.username,))
    user = cursor.fetchone()
    conn.close()

    if not user:
        raise HTTPException(status_code=400, detail="Usuario no encontrado")

    stored_password = user[2]
    status = user[3]

    if stored_password != data.password:
        raise HTTPException(status_code=400, detail="Contraseña incorrecta")

    if status == 0:
        return {"message": "Acceso restringido. Usuario inactivo.", "status": 0}

    return {"message": "Login exitoso", "status": user[3], "user_id": user[0]}
