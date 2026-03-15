from datetime import datetime, timezone
from typing import Optional
from sqlmodel import Field, SQLModel, Relationship

class User(SQLModel, table=True):
    # Mapping to Better Auth 'user' table
    __tablename__ = "user"
    
    id: str = Field(primary_key=True)
    name: str
    email: str = Field(unique=True, index=True)
    emailVerified: bool = Field(default=False)
    image: Optional[str] = None
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updatedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    
    tasks: list["Task"] = Relationship(back_populates="user")

class BetterSession(SQLModel, table=True):
    # Mapping to Better Auth 'session' table
    __tablename__ = "session"
    
    id: str = Field(primary_key=True)
    expiresAt: datetime
    token: str = Field(unique=True, index=True)
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updatedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    ipAddress: Optional[str] = None
    userAgent: Optional[str] = None
    userId: str = Field(foreign_key="user.id")

class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(foreign_key="user.id", index=True)
    title: str = Field(max_length=200, nullable=False)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: bool = Field(default=False)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column_kwargs={"onupdate": lambda: datetime.now(timezone.utc)}
    )
    
    user: User = Relationship(back_populates="tasks")
