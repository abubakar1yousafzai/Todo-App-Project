from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List, Optional
from db import get_session
from models import Task, User
from schemas.task import TaskCreate, TaskResponse, TaskList, TaskUpdate
from middleware.auth import get_current_user, verify_user_access

router = APIRouter(prefix="/api/{user_id}/tasks", tags=["tasks"])

@router.post("/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(
    user_id: str,
    task_in: TaskCreate,
    session: Session = Depends(get_session),
    current_user_id: str = Depends(get_current_user)
):
    """Create a new task for the authenticated user."""
    # Verify that the URL user_id matches the session's user_id
    verify_user_access(user_id, current_user_id)
    
    # Ensure the user exists in the database
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db_task = Task(
        **task_in.model_dump(),
        user_id=user_id
    )
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task

from sqlalchemy import case

# ... (keep existing code)

@router.get("/", response_model=TaskList)
async def list_tasks(
    user_id: str,
    completed: Optional[bool] = None,
    session: Session = Depends(get_session),
    current_user_id: str = Depends(get_current_user)
):
    """List all tasks for the authenticated user, with optional filtering."""
    # Verify that the URL user_id matches the session's user_id
    verify_user_access(user_id, current_user_id)
    
    query = select(Task).where(Task.user_id == user_id)
    
    if completed is not None:
        query = query.where(Task.completed == completed)
    
    # Custom sorting for priority: high > medium > low
    priority_order = case(
        (Task.priority == "high", 3),
        (Task.priority == "medium", 2),
        (Task.priority == "low", 1),
        else_=0
    )
    
    # Sort by:
    # 1. Pinned tasks first (is_pinned is boolean, True > False in Python but simpler to order by DESC)
    # 2. Priority (high > medium > low)
    # 3. Creation date (newest first)
    query = query.order_by(
        Task.is_pinned.desc(),
        priority_order.desc(),
        Task.created_at.desc()
    )
    
    results = session.exec(query).all()
    
    return TaskList(items=results, count=len(results))

@router.get("/{task_id}", response_model=TaskResponse)
async def get_task(
    user_id: str,
    task_id: int,
    session: Session = Depends(get_session),
    current_user_id: str = Depends(get_current_user)
):
    """Get details of a specific task."""
    verify_user_access(user_id, current_user_id)
    
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if task.user_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to access this task")
    
    return task

@router.put("/{task_id}", response_model=TaskResponse)
async def update_task(
    user_id: str,
    task_id: int,
    task_in: TaskUpdate,
    session: Session = Depends(get_session),
    current_user_id: str = Depends(get_current_user)
):
    """Update an existing task."""
    verify_user_access(user_id, current_user_id)
    
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if task.user_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this task")
    
    task_data = task_in.model_dump(exclude_unset=True)
    for key, value in task_data.items():
        setattr(task, key, value)
    
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    user_id: str,
    task_id: int,
    session: Session = Depends(get_session),
    current_user_id: str = Depends(get_current_user)
):
    """Delete a task."""
    verify_user_access(user_id, current_user_id)
    
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if task.user_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this task")
    
    session.delete(task)
    session.commit()
    return None

@router.patch("/{task_id}/complete", response_model=TaskResponse)
async def toggle_task_complete(
    user_id: str,
    task_id: int,
    session: Session = Depends(get_session),
    current_user_id: str = Depends(get_current_user)
):
    """Toggle the completion status of a task."""
    verify_user_access(user_id, current_user_id)
    
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if task.user_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to toggle this task")
    
    task.completed = not task.completed
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

@router.patch("/{task_id}/pin", response_model=TaskResponse)
async def toggle_task_pin(
    user_id: str,
    task_id: int,
    session: Session = Depends(get_session),
    current_user_id: str = Depends(get_current_user)
):
    """Toggle the pinned status of a task."""
    verify_user_access(user_id, current_user_id)
    
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if task.user_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to toggle this task")
    
    task.is_pinned = not task.is_pinned
    session.add(task)
    session.commit()
    session.refresh(task)
    return task
