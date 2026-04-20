import pytest
from sqlmodel import Session, select
from backend.models import Task, Conversation
from backend.mcp.server import add_task, list_tasks
from backend.db import engine

@pytest.fixture
def db_session():
    with Session(engine) as session:
        yield session

@pytest.mark.asyncio
async def test_mcp_add_task_isolation(db_session):
    user_id = "test_user"
    await add_task(title="Test Task", user_id=user_id)
    
    # Check if task exists for this user
    statement = select(Task).where(Task.user_id == user_id)
    tasks = db_session.exec(statement).all()
    assert len(tasks) == 1
    assert tasks[0].title == "Test Task"
