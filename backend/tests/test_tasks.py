import pytest
from fastapi.testclient import TestClient
from jose import jwt
import os
from datetime import datetime, timezone
from main import app
from db import get_session
from sqlmodel import Session, SQLModel, create_engine
from middleware.auth import SECRET_KEY, ALGORITHM

# Test setup: using a local SQLite database for tests
TEST_DATABASE_URL = "sqlite:///./test.db"
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

def create_test_token(user_id: str):
    payload = {"sub": user_id}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

# --- US1 Tests ---

def test_create_task_success(client: TestClient):
    """T010.1: should create task with valid JWT and return 201"""
    user_id = "user_123"
    token = create_test_token(user_id)
    headers = {"Authorization": f"Bearer {token}"}
    
    task_data = {"title": "Test Task", "description": "Test Description"}
    response = client.post(f"/api/{user_id}/tasks", json=task_data, headers=headers)
    
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test Task"
    assert data["user_id"] == user_id
    assert data["completed"] is False

def test_create_task_invalid_user_id(client: TestClient):
    """T010.5: should return 403 when user_id in URL doesn't match token"""
    user_id = "user_123"
    wrong_user_id = "user_456"
    token = create_test_token(user_id)
    headers = {"Authorization": f"Bearer {token}"}
    
    task_data = {"title": "Test Task"}
    response = client.post(f"/api/{wrong_user_id}/tasks", json=task_data, headers=headers)
    
    assert response.status_code == 403
    assert response.json()["detail"] == "User ID mismatch: access denied"

def test_list_tasks_success(client: TestClient):
    """T010.6: should list only tasks belonging to authenticated user"""
    user_id = "user_123"
    token = create_test_token(user_id)
    headers = {"Authorization": f"Bearer {token}"}
    
    # Create a task first
    client.post(f"/api/{user_id}/tasks", json={"title": "Task 1"}, headers=headers)
    client.post(f"/api/{user_id}/tasks", json={"title": "Task 2"}, headers=headers)
    
    # Create a task for another user
    other_user_id = "user_456"
    other_token = create_test_token(other_user_id)
    client.post(f"/api/{other_user_id}/tasks", json={"title": "Other Task"}, headers={"Authorization": f"Bearer {other_token}"})
    
    # List tasks for user_123
    response = client.get(f"/api/{user_id}/tasks", headers=headers)
    
    assert response.status_code == 200
    data = response.json()
    assert data["count"] == 2
    assert len(data["items"]) == 2
    for task in data["items"]:
        assert task["user_id"] == user_id

def test_list_tasks_empty(client: TestClient):
    """T010.7: should return empty list when user has no tasks"""
    user_id = "user_empty"
    token = create_test_token(user_id)
    headers = {"Authorization": f"Bearer {token}"}
    
    response = client.get(f"/api/{user_id}/tasks", headers=headers)
    
    assert response.status_code == 200
    data = response.json()
    assert data["count"] == 0
    assert data["items"] == []

# --- US2 Tests ---

def test_get_task_detail_success(client: TestClient):
    """T014.1: should return task details with correct user_id"""
    user_id = "user_123"
    token = create_test_token(user_id)
    headers = {"Authorization": f"Bearer {token}"}
    
    # Create a task
    create_resp = client.post(f"/api/{user_id}/tasks", json={"title": "Detail Task"}, headers=headers)
    task_id = create_resp.json()["id"]
    
    # Get details
    response = client.get(f"/api/{user_id}/tasks/{task_id}", headers=headers)
    assert response.status_code == 200
    assert response.json()["title"] == "Detail Task"
    assert response.json()["id"] == task_id

def test_get_task_not_found(client: TestClient):
    """T014.2: should return 404 when task not found"""
    user_id = "user_123"
    token = create_test_token(user_id)
    headers = {"Authorization": f"Bearer {token}"}
    
    response = client.get(f"/api/{user_id}/tasks/999", headers=headers)
    assert response.status_code == 404

def test_get_task_forbidden(client: TestClient):
    """T014.3: should return 403 when accessing another user's task"""
    user_id = "user_1"
    other_user_id = "user_2"
    token_1 = create_test_token(user_id)
    token_2 = create_test_token(other_user_id)
    
    # User 1 creates a task
    create_resp = client.post(f"/api/{user_id}/tasks", json={"title": "Private Task"}, headers={"Authorization": f"Bearer {token_1}"})
    task_id = create_resp.json()["id"]
    
    # User 2 tries to access User 1's task
    response = client.get(f"/api/{other_user_id}/tasks/{task_id}", headers={"Authorization": f"Bearer {token_2}"})
    assert response.status_code == 403

def test_update_task_success(client: TestClient):
    """T014.4: should update task title successfully"""
    user_id = "user_123"
    token = create_test_token(user_id)
    headers = {"Authorization": f"Bearer {token}"}
    
    create_resp = client.post(f"/api/{user_id}/tasks", json={"title": "Old Title"}, headers=headers)
    task_id = create_resp.json()["id"]
    
    response = client.put(f"/api/{user_id}/tasks/{task_id}", json={"title": "New Title"}, headers=headers)
    assert response.status_code == 200
    assert response.json()["title"] == "New Title"

def test_delete_task_success(client: TestClient):
    """T014.7: should delete task and return 204"""
    user_id = "user_123"
    token = create_test_token(user_id)
    headers = {"Authorization": f"Bearer {token}"}
    
    create_resp = client.post(f"/api/{user_id}/tasks", json={"title": "To Delete"}, headers=headers)
    task_id = create_resp.json()["id"]
    
    response = client.delete(f"/api/{user_id}/tasks/{task_id}", headers=headers)
    assert response.status_code == 204
    
    # Verify it's gone
    get_resp = client.get(f"/api/{user_id}/tasks/{task_id}", headers=headers)
    assert get_resp.status_code == 404

# --- US3 Tests ---

def test_toggle_complete_success(client: TestClient):
    """T018.1: should toggle completed from false to true"""
    user_id = "user_123"
    token = create_test_token(user_id)
    headers = {"Authorization": f"Bearer {token}"}
    
    create_resp = client.post(f"/api/{user_id}/tasks", json={"title": "Toggle Task"}, headers=headers)
    task_id = create_resp.json()["id"]
    assert create_resp.json()["completed"] is False
    
    # Toggle to true
    response = client.patch(f"/api/{user_id}/tasks/{task_id}/complete", headers=headers)
    assert response.status_code == 200
    assert response.json()["completed"] is True
    
    # Toggle back to false
    response = client.patch(f"/api/{user_id}/tasks/{task_id}/complete", headers=headers)
    assert response.status_code == 200
    assert response.json()["completed"] is False


