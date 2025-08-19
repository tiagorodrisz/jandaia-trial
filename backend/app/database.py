from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

#DATABASE_URL = "sqlite:///./app.db"
DATABASE_URL = "postgresql+psycopg://postgres:postgres@localhost:5432/jandaia"

engine = create_engine(
    DATABASE_URL
    #connect_args={"check_same_thread":False}
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

