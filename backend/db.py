import os
from dotenv import load_dotenv
from sqlmodel import Session, create_engine, SQLModel
from typing import Generator

# Load environment variables from .env file
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL must be set in the .env file")

# Neon Serverless PostgreSQL recommended pooling settings
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=10
)

def get_session() -> Generator[Session, None, None]:
    """Generator for FastAPI Depends to provide database sessions."""
    with Session(engine) as session:
        yield session

def create_db_and_tables():
    """Create database tables on application startup."""
    # Import models to ensure they are registered with SQLModel
    import models  # noqa: F401
    SQLModel.metadata.create_all(engine)
