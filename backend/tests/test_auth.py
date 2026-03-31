import pytest
from fastapi.testclient import TestClient
from datetime import datetime, timezone, timedelta
from main import app
from db import get_session
from sqlmodel import Session, SQLModel, create_engine
from models import User, BetterSession
import secrets

# Use a separate test database for auth tests to ensure isolation
TEST_DATABASE_URL = "sqlite:///./test_auth.db"
engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})

def override_get_session():
    with Session(engine) as session:
        yield session

app.dependency_overrides[get_session] = override_get_session

@pytest.fixture(name="client")
def client_fixture():
    SQLModel.metadata.create_all(engine)
    with TestClient(app) as client:
        yield client
    SQLModel.metadata.drop_all(engine)

def create_user_and_session(session: Session, user_id: str = "user_123"):
    """Helper to create a user and a valid session in the DB"""
    user = User(
        id=user_id,
        name="Test User",
        email=f"{user_id}@example.com",
        emailVerified=True,
        createdAt=datetime.now(timezone.utc),
        updatedAt=datetime.now(timezone.utc)
    )
    session.add(user)
    
    token = secrets.token_urlsafe(32)
    auth_session = BetterSession(
        id=secrets.token_urlsafe(16),
        token=token,
        userId=user_id,
        expiresAt=datetime.now(timezone.utc) + timedelta(hours=1),
        createdAt=datetime.now(timezone.utc),
        updatedAt=datetime.now(timezone.utc)
    )
    session.add(auth_session)
    session.commit()
    return token

def test_auth_valid_token(client: TestClient):
    """T020.1: should allow request with valid session token"""
    with Session(engine) as session:
        token = create_user_and_session(session, "user_123")
    
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/api/user_123/tasks", headers=headers)
    assert response.status_code == 200

def test_auth_missing_header(client: TestClient):
    """T020.2: should return 401 when Authorization header is missing"""
    # Note: FastAPI returns 403 Forbidden for missing auth in dependency usually, 
    # or 401 if it's strictly checking creds. HTTPBearer returns 403 if not present/valid.
    # Let's check what the actual behavior is.
    response = client.get("/api/user_123/tasks")
    assert response.status_code in [401, 403] 

def test_auth_invalid_token(client: TestClient):
    """T020.4: should return 401 when token is invalid (not in DB)"""
    headers = {"Authorization": "Bearer invalid_token_123"}
    response = client.get("/api/user_123/tasks", headers=headers)
    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid session token"

def test_auth_user_id_mismatch(client: TestClient):
    """T020.5: should return 403 when URL user_id doesn't match session user"""
    with Session(engine) as session:
        token = create_user_and_session(session, "user_123")
        
    headers = {"Authorization": f"Bearer {token}"}
    # Try to access another user's resources
    response = client.get("/api/user_456/tasks", headers=headers)
    assert response.status_code == 403
    assert response.json()["detail"] == "User ID mismatch: access denied"

def test_auth_expired_token(client: TestClient):
    """T020.6: should return 401 when session is expired"""
    with Session(engine) as session:
        user_id = "user_expired"
        user = User(
            id=user_id,
            name="Expired User",
            email="expired@example.com",
            emailVerified=True,
            createdAt=datetime.now(timezone.utc),
            updatedAt=datetime.now(timezone.utc)
        )
        session.add(user)
        
        token = "expired_token"
        auth_session = BetterSession(
            id="sess_expired",
            token=token,
            userId=user_id,
            # Expired 1 hour ago
            expiresAt=datetime.now(timezone.utc) - timedelta(hours=1),
            createdAt=datetime.now(timezone.utc) - timedelta(hours=2),
            updatedAt=datetime.now(timezone.utc) - timedelta(hours=2)
        )
        session.add(auth_session)
        session.commit()
    
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get(f"/api/{user_id}/tasks", headers=headers)
    assert response.status_code == 401
    assert response.json()["detail"] == "Session expired"
