from pydantic import BaseModel

class ClienteBase(BaseModel):
    nome: str
    cnpj: str
    ativo: bool = True

class ClienteCreate(ClienteBase):
    pass

class ClienteRead(ClienteBase):
    id: int
    class Config:
        from_attributes = True

class LicencaBase(BaseModel):
    tipo: str
    status: str
    cliente_id: int

class LicencaCreate(LicencaBase):
    pass

class LicencaRead(LicencaBase):
    id: int
    class Config:
        from_attributes = True
        