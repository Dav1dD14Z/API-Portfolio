from pydantic import BaseModel, Field, constr, conint

class Countrie(BaseModel):
    name: constr(strip_whitespace=True, min_length=1, max_length=100) = Field(..., description="Nombre del país")
    description1: constr(strip_whitespace=True, max_length=500) = Field(None, description="Descripción del país")
    description2: constr(strip_whitespace=True, max_length=500) = Field(None, description="Descripción del país")
    flag_url: constr(strip_whitespace=True, max_length=500) = Field(None, description="URL de la bandera del país")
    latitude: float = Field(None, description="Latitud del país")
    longitude: float = Field(None, description="Longitud del país")
    video_url: constr(strip_whitespace=True, max_length=500) = Field(None, description="URL del video del país")
    img1: constr(strip_whitespace=True, max_length=500) = Field(None, description="URL de la bandera del país")
    img2: constr(strip_whitespace=True, max_length=500) = Field(None, description="URL de la bandera del país")
    img3: constr(strip_whitespace=True, max_length=500) = Field(None, description="URL de la bandera del país")
    img4: constr(strip_whitespace=True, max_length=500) = Field(None, description="URL de la bandera del país")
    img5: constr(strip_whitespace=True, max_length=500) = Field(None, description="URL de la bandera del país")
    img6: constr(strip_whitespace=True, max_length=500) = Field(None, description="URL de la bandera del país")
    img7: constr(strip_whitespace=True, max_length=500) = Field(None, description="URL de la bandera del país")
    BckImage: constr(strip_whitespace=True, max_length=500) = Field(None, description="URL de la bandera del país")

class User(BaseModel):
    username: constr(strip_whitespace=True, min_length=3, max_length=50) = Field(..., description="Nombre de usuario")
    password: constr(strip_whitespace=True, min_length=6) = Field(..., description="Contraseña del usuario")
    status: conint(ge=0, le=1) = Field(1, description="Estado del usuario (0: inactivo, 1: activo)")

class Login(BaseModel):
    username: str
    password: str