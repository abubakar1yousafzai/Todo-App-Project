from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field

class TaskBase(BaseModel):
    title: str = Field(..., max_length=200, description="Task title")
    description: Optional[str] = Field(None, max_length=1000, description="Optional task description")
    due_date: Optional[datetime] = Field(None, description="Optional due date")
    priority: str = Field("medium", description="Task priority (high, medium, low)")
    is_pinned: bool = Field(False, description="Whether the task is pinned")

class TaskCreate(TaskBase):
    """Schema for creating a new task."""
    pass

class TaskUpdate(BaseModel):
    """Schema for updating an existing task. All fields are optional."""
    title: Optional[str] = Field(None, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)
    completed: Optional[bool] = None
    due_date: Optional[datetime] = None
    priority: Optional[str] = None
    is_pinned: Optional[bool] = None

class TaskResponse(TaskBase):
    """Schema for a task in the response. Includes database fields."""
    id: int
    user_id: str
    completed: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class TaskList(BaseModel):
    """Schema for a list of tasks."""
    items: List[TaskResponse]
    count: int
