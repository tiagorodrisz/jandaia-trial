from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas

#Rota para gerenciar clientes
router = APIRouter(prefix="/clientes", tags=["clientes"])

@router.get("/", response_model=list[schemas.ClienteRead])
#Listar todos os clientes
def listar_clientes(db: Session = Depends(get_db)):
    return db.query(models.Cliente).all()
#
@router.post("/", response_model=schemas.ClienteRead, status_code=201)
def criar_cliente(payload: schemas.ClienteCreate, db: Session = Depends(get_db)):
    ja_existe = db.query(models.Cliente).filter_by(cnpj=payload.cnpj).first()
    if ja_existe:
        raise HTTPException(status_code=400, detail="Cliente com CNPJ já cadastrado.")
    cliente = models.Cliente(**payload.model_dump())
    db.add(cliente)
    db.commit()
    db.refresh(cliente)
    return cliente

