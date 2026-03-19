from sqlalchemy import create_engine, text
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

# Connect without specifying a database to create it if it doesn't exist
try:
    setup_engine = create_engine("mysql+mysqlconnector://root@localhost/")
    with setup_engine.connect() as conn:
        conn.execute(text("CREATE DATABASE IF NOT EXISTS healthcare_db"))
except Exception as e:
    print(f"Warning: Could not create database automatically. Please ensure MySQL is running. Error: {e}")

SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://root@localhost/healthcare_db"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
