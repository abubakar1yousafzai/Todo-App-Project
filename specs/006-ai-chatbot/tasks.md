# Tasks: Phase 3 AI Chatbot

**Feature**: 006-ai-chatbot
**Status**: Pending

## Implementation Strategy
MVP: Complete User Story 1 (Conversational Task Management) as the primary deliverable.

## Phase 1: Setup
- [x] T001 Initialize project directories for backend agents and mcp server
- [x] T002 Update .env with GEMINI_API_KEY and GEMINI_BASE_URL

## Phase 2: Foundational
- [x] T003 [P] Add Conversation and Message models to backend/models.py
- [x] T004 [P] Run database migration for new tables

## Phase 3: Conversational Task Management (US1)
- [x] T005 [P] [US1] Create MCP server with 5 tool definitions in backend/mcp/server.py
- [x] T006 [P] [US1] Configure Gemini Agent with OpenAI SDK in backend/agents/todo_agent.py
- [x] T007 [US1] Implement chat endpoint POST /api/{user_id}/chat in backend/routes/chat.py
- [x] T008 [US1] Update backend/main.py to register chat router

## Phase 4: Chat Interface (US2)
- [x] T009 [P] [US2] Create ChatRequest/ChatResponse types in frontend/types/chat.ts
- [x] T010 [P] [US2] Implement sendChatMessage in frontend/lib/api.ts
- [x] T011 [P] [US2] Create useChat hook in frontend/hooks/useChat.ts
- [x] T012 [P] [US2] Build ChatInterface component in frontend/components/chat/ChatInterface.tsx
- [x] T013 [US2] Create chat page in frontend/app/chat/page.tsx
- [x] T014 [US2] Add chat link to frontend/components/layout/Navbar.tsx

## Phase 5: Polish & Cross-cutting
- [x] T015 [P] Implement input validation in backend/routes/chat.py
- [x] T016 [P] Ensure task sync with existing dashboard logic

## Dependencies
- US1 (T005-T008) blocks US2 (T009-T014).
- Setup (T001-T002) blocks everything.
- Foundational (T003-T004) blocks US1.

## Parallel Opportunities
- Backend logic (T005, T006) can be developed alongside frontend types/client (T009, T010).
- Components (T011, T012) can be worked on in parallel once types are defined.
