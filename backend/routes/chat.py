from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from backend.db import get_session
from backend.models import Conversation, Message
from backend.agents.todo_agent import agent
from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    content: str

class ChatResponse(BaseModel):
    response: str

@router.post("/api/{user_id}/chat", response_model=ChatResponse)
async def chat(user_id: str, request: ChatRequest, session: Session = Depends(get_session)):
    # 1. Get/Create Conversation
    conv = session.exec(select(Conversation).where(Conversation.user_id == user_id)).first()
    if not conv:
        conv = Conversation(user_id=user_id)
        session.add(conv)
        session.commit()
        session.refresh(conv)
    
    # 2. Store user message
    user_msg = Message(conversation_id=conv.id, user_id=user_id, role="user", content=request.content)
    session.add(user_msg)
    
    # 3. Get AI response (Placeholder for actual Agent SDK interaction)
    ai_response = "I have processed your request."
    
    # 4. Store assistant response
    ai_msg = Message(conversation_id=conv.id, user_id=user_id, role="assistant", content=ai_response)
    session.add(ai_msg)
    session.commit()
    
    return ChatResponse(response=ai_response)
