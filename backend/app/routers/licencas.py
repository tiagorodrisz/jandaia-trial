from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas

router = APIRouter(prefix="/licencas", tags=["licencas"])

@router.get("/", response_model=list[schemas.LicencaRead])
def listar_licencas(db: Session = Depends(get_db)):
    return db.query(models.Licenca).all()

@router.get("/{licenca_id}", response_model=schemas.LicencaRead)
def obter_licenca(licenca_id: int, db: Session = Depends(get_db)):
    lic = db.query(models.Licenca).get(licenca_id)
    if not lic:
        raise HTTPException(status_code=404, detail="Licença não encontrada.")
    return lic

@router.post("/", response_model=schemas.LicencaRead, status_code=201)
def criar_licenca(payload: schemas.LicencaCreate, db: Session = Depends(get_db)):
    cliente = db.query(models.Cliente).get(payload.cliente_id)
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente inexistente.")
    lic = models.Licenca(**payload.model_dump())
    db.add(lic)
    db.commit()
    db.refresh(lic)
    return lic

