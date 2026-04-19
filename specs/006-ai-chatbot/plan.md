# Implementation Plan: Phase 3 AI Chatbot

**Branch**: `006-ai-chatbot` | **Date**: 2026-04-14 | **Spec**: [specs/006-ai-chatbot/spec.md](../006-ai-chatbot/spec.md)
**Input**: Feature specification from `/specs/006-ai-chatbot/spec.md`

## Summary
Add an AI-powered conversational interface to the Todo application using **Google Gemini** (via OpenAI-compatible API) and MCP tools. Users manage tasks via chat, with conversations and messages persisted in the database.

## Technical Context

**Language/Version**: Python 3.11+ / TypeScript 5.x
**Primary Dependencies**: OpenAI Agents SDK, MCP Python SDK, SQLModel, FastAPI, Next.js 16
**LLM Provider**: Google Gemini (`gemini-2.5-flash` via OpenAI-compatible endpoint)
**Storage**: PostgreSQL (Neon)
**Testing**: pytest, vitest
**Target Platform**: Web (Next.js) + Linux server (FastAPI)
**Project Type**: Web Application (Monorepo)
**Performance Goals**: AI Response time < 5s
**Constraints**: Stateless backend, user data isolation, OpenAI SDK Compatibility
**Scale/Scope**: Task management via chat, conversation history persistence

## Constitution Check
*GATE: Passed - Feature follows modular, spec-driven development.*

## Project Structure

### Documentation
```text
specs/006-ai-chatbot/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md
```

### Source Code
```text
backend/
├── agents/
│   └── todo_agent.py
├── mcp/
│   └── server.py
├── routes/
│   ├── tasks.py
│   └── chat.py
├── models.py
└── main.py

frontend/
├── app/
│   └── chat/
│       └── page.tsx
├── components/
│   └── chat/
│       └── ChatInterface.tsx
├── hooks/
│   └── useChat.ts
├── lib/
│   └── api.ts
└── types/
    └── chat.ts
```

## Proposed Design Details

### 1. Database Entities
- **Conversation**: `id`, `user_id`, `created_at`, `updated_at`
- **Message**: `id`, `conversation_id`, `user_id`, `role` ("user"/"assistant"), `content`, `created_at`

### 2. Request Flow (10 Steps)
1. User sends message via `ChatInterface`.
2. `POST /api/{user_id}/chat` validates JWT via Better Auth middleware.
3. Chat route fetches/creates `Conversation` and stores user `Message` in DB.
4. Chat route retrieves conversation history (last N messages).
5. `todo_agent.py` initializes `AsyncOpenAI` client with Gemini base URL + `gemini-2.5-flash`.
6. Agent logic (OpenAI Agents SDK) interprets prompt, decides tool calls.
7. Agent executes MCP tools via `server.py` (database interaction).
8. Agent receives tool result and formats final answer.
9. Assistant `Message` is stored in DB.
10. API returns response to frontend.

### 3. Gemini Agent Setup (`backend/agents/todo_agent.py`)
```python
from agents import Agent, OpenAIChatCompletionsModel, AsyncOpenAI
import os

# Google Generative AI (OpenAI-compatible)
client = AsyncOpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url=os.getenv("GEMINI_BASE_URL"),
)

model = OpenAIChatCompletionsModel(
    model="gemini-2.5-flash",
    openai_client=client
)

agent = Agent(name="TodoAssistant", model=model, system_prompt="You are a helpful task manager.")

async def run_todo_agent(prompt: str, tools: list):
    # Logic to bind tools and run agent
    pass
```

### 4. MCP Server - 5 Tools
1. `add_task`: Create task with title/desc.
2. `list_tasks`: Filter by status (all/pending/completed).
3. `complete_task`: Mark by ID.
4. `delete_task`: Remove by ID.
5. `update_task`: Modify title/desc.

### 5. Backend Implementation
- **Chat Endpoint**: `POST /api/{user_id}/chat`
- **Security**:
  - Middleware: Reuse existing session validation.
  - Auth: Ensure `user_id` matches session and scope all queries.
  - Sanitization: Input length limits + SQLModel safety.

### 6. Environment Variables
```env
# Existing
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=...

# NEW
GEMINI_API_KEY=your-key-here
GEMINI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
```

### 7. Implementation Steps
1. Add `Conversation`, `Message` to `models.py`.
2. Build MCP server (`backend/mcp/server.py`).
3. Setup `agents/todo_agent.py` with Gemini configuration.
4. Implement `routes/chat.py` with session auth.
5. Build frontend `ChatInterface` and `useChat`.
6. Integrate with existing app.
7. Run tests.
