from mcp.server.fastmcp import FastMCP
from sqlmodel import Session, select
from backend.models import Task
from backend.db import engine

mcp = FastMCP("TodoAssistant")

def get_session():
    with Session(engine) as session:
        yield session

@mcp.tool()
async def add_task(title: str, user_id: str, description: str = None) -> str:
    """Add a new task."""
    with Session(engine) as session:
        task = Task(title=title, description=description, user_id=user_id)
        session.add(task)
        session.commit()
        return f"Task '{title}' added."

@mcp.tool()
async def list_tasks(user_id: str, status: str = "all") -> str:
    """List tasks for a user."""
    with Session(engine) as session:
        statement = select(Task).where(Task.user_id == user_id)
        if status == "pending":
            statement = statement.where(Task.completed == False)
        elif status == "completed":
            statement = statement.where(Task.completed == True)
        tasks = session.exec(statement).all()
        return str([t.title for t in tasks])

@mcp.tool()
async def complete_task(task_id: int, user_id: str) -> str:
    """Mark a task as complete."""
    with Session(engine) as session:
        task = session.get(Task, task_id)
        if task and task.user_id == user_id:
            task.completed = True
            session.add(task)
            session.commit()
            return f"Task {task_id} completed."
        return "Task not found."

@mcp.tool()
async def delete_task(task_id: int, user_id: str) -> str:
    """Remove a task."""
    with Session(engine) as session:
        task = session.get(Task, task_id)
        if task and task.user_id == user_id:
            session.delete(task)
            session.commit()
            return f"Task {task_id} deleted."
        return "Task not found."

@mcp.tool()
async def update_task(task_id: int, user_id: str, title: str = None, description: str = None) -> str:
    """Modify a task."""
    with Session(engine) as session:
        task = session.get(Task, task_id)
        if task and task.user_id == user_id:
            if title: task.title = title
            if description: task.description = description
            session.add(task)
            session.commit()
            return f"Task {task_id} updated."
        return "Task not found."
