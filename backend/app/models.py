from sqlalchemy import Boolean, Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Cliente(Base):
    __tablename__ = 'clientes'

    #Colunas da tabela, id sendo a chave primária
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, index=True)
    cnpj = Column(String, unique=True, index=True, nullable=False)
    ativo = Column(Boolean, default=True)

    licencas = relationship("Licenca", back_populates="cliente")

class Licenca(Base):
    __tablename__ = 'licencas'

    id = Column(Integer, primary_key=True, index=True)
    tipo = Column(String, nullable=False)
    status = Column(String, nullable=False)

    #Chave estrangeira para referenciar a tabela de clientes
    cliente_id = Column(Integer, ForeignKey('clientes.id'), nullable=False)

    #Relacionamento com a tabela de clientes
    cliente = relationship("Cliente", back_populates="licencas")

