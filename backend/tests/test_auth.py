import pytest
from fastapi.testclient import TestClient
from jose import jwt
import time
from main import app
from middleware.auth import SECRET_KEY, ALGORITHM

@pytest.fixture(name="client")
def client_fixture():
    with TestClient(app) as client:
        yield client

def create_test_token(user_id: str, expires_in: int = 3600):
    payload = {
        "sub": user_id,
        "exp": int(time.time()) + expires_in
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def test_auth_valid_token(client: TestClient):
    """T020.1: should allow request with valid JWT"""
    user_id = "user_123"
    token = create_test_token(user_id)
    headers = {"Authorization": f"Bearer {token}"}
    
    # Using the health check which is public, but let's test a protected route with a dummy ID
    # Since we haven't implemented a simple "me" endpoint, we'll use a task endpoint
    response = client.get(f"/api/{user_id}/tasks", headers=headers)
    assert response.status_code == 200

def test_auth_missing_header(client: TestClient):
    """T020.2: should return 401 when Authorization header is missing"""
    response = client.get("/api/user_123/tasks")
    assert response.status_code == 401

def test_auth_invalid_signature(client: TestClient):
    """T020.4: should return 401 when token signature is invalid"""
    token = jwt.encode({"sub": "user_123"}, "wrong_secret", algorithm=ALGORITHM)
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/api/user_123/tasks", headers=headers)
    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid token or signature"

def test_auth_user_id_mismatch(client: TestClient):
    """T020.5: should return 403 when URL user_id doesn't match token sub"""
    token = create_test_token("user_123")
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/api/user_456/tasks", headers=headers)
    assert response.status_code == 403
    assert response.json()["detail"] == "User ID mismatch: access denied"
