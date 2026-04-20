from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from agents import Runner
from db import get_session
from models import Conversation, Message
from chatbot.todo_agent import agent
from pydantic import BaseModel, Field

router = APIRouter()

class ChatRequest(BaseModel):
    content: str = Field(..., min_length=1, max_length=5000)

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
    user_msg = Message(conversation_id=conv.id, user_id=user_id, role="user", content=request.content.strip())
    session.add(user_msg)
    session.commit()

    # 3. Run agent with user_id in context for data isolation
    try:
        result = await Runner.run(
            agent,
            input=request.content.strip(),
            context={"user_id": user_id},
        )
        ai_response = result.final_output or "I could not process your request."
    except Exception as e:
        ai_response = f"Sorry, something went wrong: {str(e)}"

    # 4. Store assistant response
    ai_msg = Message(conversation_id=conv.id, user_id=user_id, role="assistant", content=ai_response)
    session.add(ai_msg)
    session.commit()

    return ChatResponse(response=ai_response)
