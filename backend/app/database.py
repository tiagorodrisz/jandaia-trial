from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

#DATABASE_URL = "sqlite:///./app.db"
DATABASE_URL = "postgresql+psycopg://postgres:postgres@localhost:5432/jandaia"

#Conecta o SQLAlchemy ao PostgreSQL
engine = create_engine(
    DATABASE_URL
    #Estava sendo usado SQLite
    #connect_args={"check_same_thread":False}
    )

#Cria uma sessão local para interagir com o banco de dados
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

#Cria uma base declarativa para os modelos do SQLAlchemy
Base = declarative_base()

#Função geradora que fornece sessão para cada request do FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

