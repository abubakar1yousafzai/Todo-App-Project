import pytest
from fastapi.testclient import TestClient
from datetime import datetime, timezone
from main import app
from db import get_session
from sqlmodel import Session, SQLModel, create_engine
from middleware.auth import get_current_user
from models import User

# Test setup: using a local SQLite database for tests
TEST_DATABASE_URL = "sqlite:///./test_tasks.db"
engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})

def override_get_session():
    with Session(engine) as session:
        yield session

app.dependency_overrides[get_session] = override_get_session

# Mock user ID for auth bypass
MOCK_USER_ID = "user_123"

def override_get_current_user():
    return MOCK_USER_ID

app.dependency_overrides[get_current_user] = override_get_current_user

@pytest.fixture(name="client")
def client_fixture():
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        # Create the user referenced by MOCK_USER_ID
        user = User(
            id=MOCK_USER_ID,
            name="Test User",
            email="test@example.com",
            emailVerified=True,
            createdAt=datetime.now(timezone.utc),
            updatedAt=datetime.now(timezone.utc)
        )
        session.add(user)
        session.commit()
        
    with TestClient(app) as client:
        yield client
    SQLModel.metadata.drop_all(engine)

# --- US1 Tests ---

def test_create_task_success(client: TestClient):
    """T010.1: should create task and return 201"""
    task_data = {"title": "Test Task", "description": "Test Description"}
    response = client.post(f"/api/{MOCK_USER_ID}/tasks", json=task_data)
    
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test Task"
    assert data["user_id"] == MOCK_USER_ID
    assert data["completed"] is False

def test_create_task_invalid_user_id(client: TestClient):
    """T010.5: should return 403 when user_id in URL doesn't match authenticated user"""
    wrong_user_id = "user_456"
    task_data = {"title": "Test Task"}
    response = client.post(f"/api/{wrong_user_id}/tasks", json=task_data)
    
    assert response.status_code == 403
    assert response.json()["detail"] == "User ID mismatch: access denied"

def test_list_tasks_success(client: TestClient):
    """T010.6: should list only tasks belonging to authenticated user"""
    # Create tasks
    client.post(f"/api/{MOCK_USER_ID}/tasks", json={"title": "Task 1"})
    client.post(f"/api/{MOCK_USER_ID}/tasks", json={"title": "Task 2"})
    
    # List tasks
    response = client.get(f"/api/{MOCK_USER_ID}/tasks")
    
    assert response.status_code == 200
    data = response.json()
    assert data["count"] == 2
    assert len(data["items"]) == 2

def test_list_tasks_empty(client: TestClient):
    """T010.7: should return empty list when user has no tasks"""
    # We need a different user for 'empty' test, or clear DB. 
    # Since we use MOCK_USER_ID globally, we can just assume it's empty at start of test
    # (fixture drops DB each time).
    response = client.get(f"/api/{MOCK_USER_ID}/tasks")
    
    assert response.status_code == 200
    data = response.json()
    assert data["count"] == 0
    assert data["items"] == []

# --- US2 Tests ---

def test_get_task_detail_success(client: TestClient):
    """T014.1: should return task details"""
    create_resp = client.post(f"/api/{MOCK_USER_ID}/tasks", json={"title": "Detail Task"})
    task_id = create_resp.json()["id"]
    
    response = client.get(f"/api/{MOCK_USER_ID}/tasks/{task_id}")
    assert response.status_code == 200
    assert response.json()["title"] == "Detail Task"
    assert response.json()["id"] == task_id

def test_get_task_not_found(client: TestClient):
    """T014.2: should return 404 when task not found"""
    response = client.get(f"/api/{MOCK_USER_ID}/tasks/999")
    assert response.status_code == 404

def test_update_task_success(client: TestClient):
    """T014.4: should update task title successfully"""
    create_resp = client.post(f"/api/{MOCK_USER_ID}/tasks", json={"title": "Old Title"})
    task_id = create_resp.json()["id"]
    
    response = client.put(f"/api/{MOCK_USER_ID}/tasks/{task_id}", json={"title": "New Title"})
    assert response.status_code == 200
    assert response.json()["title"] == "New Title"

def test_delete_task_success(client: TestClient):
    """T014.7: should delete task and return 204"""
    create_resp = client.post(f"/api/{MOCK_USER_ID}/tasks", json={"title": "To Delete"})
    task_id = create_resp.json()["id"]
    
    response = client.delete(f"/api/{MOCK_USER_ID}/tasks/{task_id}")
    assert response.status_code == 204
    
    get_resp = client.get(f"/api/{MOCK_USER_ID}/tasks/{task_id}")
    assert get_resp.status_code == 404

# --- US3 Tests ---

def test_toggle_complete_success(client: TestClient):
    """T018.1: should toggle completed from false to true"""
    create_resp = client.post(f"/api/{MOCK_USER_ID}/tasks", json={"title": "Toggle Task"})
    task_id = create_resp.json()["id"]
    assert create_resp.json()["completed"] is False
    
    # Toggle to true
    response = client.patch(f"/api/{MOCK_USER_ID}/tasks/{task_id}/complete")
    assert response.status_code == 200
    assert response.json()["completed"] is True
    
    # Toggle back to false
    response = client.patch(f"/api/{MOCK_USER_ID}/tasks/{task_id}/complete")
    assert response.status_code == 200
    assert response.json()["completed"] is False

# --- Phase 2 New Feature Tests ---

def test_create_task_with_new_fields(client: TestClient):
    """T010.8: should create task with due_date, priority and is_pinned"""
    due_date = "2023-12-31T23:59:59"
    task_data = {
        "title": "Full Task", 
        "due_date": due_date,
        "priority": "high",
        "is_pinned": True
    }
    response = client.post(f"/api/{MOCK_USER_ID}/tasks", json=task_data)
    
    assert response.status_code == 201
    data = response.json()
    assert data["priority"] == "high"
    assert data["is_pinned"] is True
    assert "2023-12-31" in data["due_date"]

def test_update_task_priority_and_pin(client: TestClient):
    """T014.5: should update priority and pin status"""
    create_resp = client.post(f"/api/{MOCK_USER_ID}/tasks", json={"title": "Update Me"})
    task_id = create_resp.json()["id"]
    
    update_data = {"priority": "low", "is_pinned": True}
    response = client.put(f"/api/{MOCK_USER_ID}/tasks/{task_id}", json=update_data)
    
    assert response.status_code == 200
    data = response.json()
    assert data["priority"] == "low"
    assert data["is_pinned"] is True

def test_toggle_pin_success(client: TestClient):
    """T014.6: should toggle pin status via dedicated endpoint"""
    create_resp = client.post(f"/api/{MOCK_USER_ID}/tasks", json={"title": "Pin Me"})
    task_id = create_resp.json()["id"]
    assert create_resp.json()["is_pinned"] is False
    
    # Toggle on
    response = client.patch(f"/api/{MOCK_USER_ID}/tasks/{task_id}/pin")
    assert response.status_code == 200
    assert response.json()["is_pinned"] is True
    
    # Toggle off
    response = client.patch(f"/api/{MOCK_USER_ID}/tasks/{task_id}/pin")
    assert response.status_code == 200
    assert response.json()["is_pinned"] is False

def test_list_tasks_sorting(client: TestClient):
    """T015.1: should sort by is_pinned (desc), priority (high>med>low), created_at (desc)"""
    # Create tasks in specific order to test sorting
    # 1. Low priority, unpinned
    client.post(f"/api/{MOCK_USER_ID}/tasks", json={"title": "Task 1", "priority": "low"})
    # 2. High priority, unpinned
    client.post(f"/api/{MOCK_USER_ID}/tasks", json={"title": "Task 2", "priority": "high"})
    # 3. Medium priority, pinned
    client.post(f"/api/{MOCK_USER_ID}/tasks", json={"title": "Task 3", "priority": "medium", "is_pinned": True})
    # 4. Low priority, pinned
    client.post(f"/api/{MOCK_USER_ID}/tasks", json={"title": "Task 4", "priority": "low", "is_pinned": True})
    
    response = client.get(f"/api/{MOCK_USER_ID}/tasks")
    assert response.status_code == 200
    items = response.json()["items"]
    
    # Expected order:
    # 1. Task 3 (Pinned, Medium)
    # 2. Task 4 (Pinned, Low)
    # 3. Task 2 (Unpinned, High)
    # 4. Task 1 (Unpinned, Low)
    
    assert items[0]["title"] == "Task 3"
    assert items[1]["title"] == "Task 4"
    assert items[2]["title"] == "Task 2"
    assert items[3]["title"] == "Task 1"
