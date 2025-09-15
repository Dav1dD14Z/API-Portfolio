from fastapi import FastAPI, HTTPException, Request, Form, status
from fastapi.responses import JSONResponse
from models.countries import Countrie
from fastapi.middleware.cors import CORSMiddleware

import sqlite3

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 👈 aquí puedes poner "*" o una lista como ["http://127.0.0.1:5500"]
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
            description TEXT NOT NULL,
            flag_url TEXT NOT NULL
        )''')
    conn.commit()
    conn.close()
    return {"message": "Database created successfully"}, status.HTTP_201_CREATED

@app.post("/countries/")
def crear_producto(countrie: Countrie):
    conn = sqlite3.connect('miwebsite.db')
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO countries (name, description, flag_url) VALUES (?, ?, ?)
    ''', (countrie.name, countrie.description, countrie.flag_url))
    conn.commit()
    conn.close()
    return {
        "message": "Producto creado correctamente",
        "data": countrie.dict()
    }

@app.get("/countries/")
def listar_productos():
    conn = sqlite3.connect('miwebsite.db')
    cursor = conn.cursor()
    cursor.execute('SELECT id, name, description, flag_url FROM countries')
    productos = cursor.fetchall()
    conn.close()
    return {
        "data": [{"id": row[0], "nombre": row[1], "descripcion": row[2], "URL": row[3]} for row in productos]
    }

@app.get("/countries/{countrie_id}")
def obtener_pais(countrie_id: int):
    conn = sqlite3.connect('miwebsite.db')
    cursor = conn.cursor()
    cursor.execute('SELECT id, name, description, flag_url FROM countries WHERE id = ?', (countrie_id,))
    row = cursor.fetchone()
    conn.close()

    if row is None:
        raise HTTPException(status_code=404, detail="País no encontrado")

    return {
        "id": row[0],
        "nombre": row[1],
        "descripcion": row[2],
        "url": row[3]
    }
