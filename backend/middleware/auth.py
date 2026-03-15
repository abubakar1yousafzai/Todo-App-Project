import os
from datetime import datetime, timezone
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlmodel import Session, select
from db import get_session
from models import BetterSession
from dotenv import load_dotenv

load_dotenv()

security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_session)
) -> str:
    """
    FastAPI dependency to verify the Better Auth session token via database lookup.
    """
    token = credentials.credentials
    
    # Query the session table for a matching token that hasn't expired
    statement = select(BetterSession).where(
        BetterSession.token == token
    )
    results = db.exec(statement)
    session_record = results.first()

    if not session_record:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid session token"
        )

    # Check expiration (Better Auth 'expiresAt' vs current time)
    # Ensure both are timezone-aware or naive. SQLModel usually handles this, 
    # but we ensure comparison is valid.
    now = datetime.now(timezone.utc)
    # If session_record.expiresAt is naive, we assume it's UTC
    expires_at = session_record.expiresAt
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)

    if expires_at < now:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session expired"
        )

    return session_record.userId

def verify_user_access(url_user_id: str, token_user_id: str) -> bool:
    """
    Verify that the user_id from the URL matches the user_id from the session.
    Raises 403 HTTPException if there is a mismatch.
    """
    if url_user_id != token_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User ID mismatch: access denied"
        )
    return True
