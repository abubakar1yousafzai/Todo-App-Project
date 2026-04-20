from agents import function_tool, RunContextWrapper
from sqlmodel import Session, select
from models import Task
from db import engine
from typing import Optional

@function_tool
async def add_task(ctx: RunContextWrapper[dict], title: str, description: Optional[str] = None) -> str:
    """Add a new task for the current user."""
    user_id = ctx.context["user_id"]
    with Session(engine) as session:
        task = Task(title=title, description=description, user_id=user_id)
        session.add(task)
        session.commit()
        return f"Task '{title}' added successfully."

@function_tool
async def list_tasks(ctx: RunContextWrapper[dict], status: str = "all") -> str:
    """List tasks for the current user. status can be 'all', 'pending', or 'completed'."""
    user_id = ctx.context["user_id"]
    with Session(engine) as session:
        statement = select(Task).where(Task.user_id == user_id)
        if status == "pending":
            statement = statement.where(Task.completed == False)
        elif status == "completed":
            statement = statement.where(Task.completed == True)
        tasks = session.exec(statement).all()
        if not tasks:
            return "No tasks found."
        return "\n".join([f"[{t.id}] {'✓' if t.completed else '○'} {t.title}" for t in tasks])

@function_tool
async def complete_task(ctx: RunContextWrapper[dict], task_id: int) -> str:
    """Mark a task as complete by its ID."""
    user_id = ctx.context["user_id"]
    with Session(engine) as session:
        task = session.get(Task, task_id)
        if task and task.user_id == user_id:
            task.completed = True
            session.add(task)
            session.commit()
            return f"Task '{task.title}' marked as complete."
        return f"Task {task_id} not found."

@function_tool
async def delete_task(ctx: RunContextWrapper[dict], task_id: int) -> str:
    """Delete a task by its ID."""
    user_id = ctx.context["user_id"]
    with Session(engine) as session:
        task = session.get(Task, task_id)
        if task and task.user_id == user_id:
            session.delete(task)
            session.commit()
            return f"Task '{task.title}' deleted."
        return f"Task {task_id} not found."

@function_tool
async def update_task(ctx: RunContextWrapper[dict], task_id: int, title: Optional[str] = None, description: Optional[str] = None) -> str:
    """Update a task's title or description by its ID."""
    user_id = ctx.context["user_id"]
    with Session(engine) as session:
        task = session.get(Task, task_id)
        if task and task.user_id == user_id:
            if title:
                task.title = title
            if description:
                task.description = description
            session.add(task)
            session.commit()
            return f"Task {task_id} updated successfully."
        return f"Task {task_id} not found."

todo_tools = [add_task, list_tasks, complete_task, delete_task, update_task]
