from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import Base, engine, get_db
from . import models
from .routers import clientes, licencas

app = FastAPI(title="Jandaia Mini API")

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "API Jandaia Mini rodando"}

@app.on_event("startup")
def seed():
    from sqlalchemy.orm import Session
    db: Session
    for db in [next(get_db())]:
        if not db.query(models.Cliente).first():
            c1 = models.Cliente(nome="Transportadora Alfa", cnpj="12.345.678/0001-95")
            c2 = models.Cliente(nome="Logística Minas Gerais", cnpj="98.765.432/0001-12")
            db.add_all([c1, c2])
            db.commit()
            db.refresh(c1)
            db.refresh(c2)

            l1 = models.Licenca(tipo="ANTT", status="Ativa", cliente_id=c1.id)
            l2 = models.Licenca(tipo="AET", status="Pendente", cliente_id=c2.id)
            db.add_all([l1, l2])
            db.commit()
            db.refresh(l1)
            db.refresh(l2)

app.include_router(clientes.router)
app.include_router(licencas.router)
                                
