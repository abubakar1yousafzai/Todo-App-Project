# Feature Specification: AI-Powered Chatbot (Phase 3)

**Feature Branch**: `006-ai-chatbot`  
**Created**: 2026-04-14  
**Status**: Draft  

## Overview
This phase introduces an AI-powered conversational interface to the Todo application. Users can now manage their tasks using natural language via a chat interface. The backend utilizes the OpenAI Agents SDK for AI reasoning and an MCP (Model Context Protocol) server to expose task-management tools, persisting conversation and task states in the database.

## LLM Provider Configuration
We use Google Gemini instead of OpenAI to align with project requirements and API availability.
1. **Compatibility Layer**: We utilize the OpenAI Agents SDK configured with the Google Generative Language API's OpenAI-compatible endpoint.
2. **Setup**: Users must obtain a `GEMINI_API_KEY` from Google AI Studio.
3. **Model**: We use `gemini-2.0-flash-exp` for fast, efficient performance.
4. **Integration**: The backend is configured to use an `AsyncOpenAI` client pointing to the Gemini base URL, which works seamlessly with the existing OpenAI Agents SDK logic.

## Technology Stack
- **AI Framework**: OpenAI Agents SDK (compatible with any OpenAI-compatible API)
- **LLM Provider**: Google Gemini (via OpenAI Chat Completions API)
- **LLM Model**: `gemini-2.0-flash-exp`

## Environment Variables
```env
GEMINI_API_KEY=your-google-api-key-here
GEMINI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
```

## Agent Configuration
- **Model Behavior**: Uses Gemini 2.0 Flash Exp for high-performance conversational responses.
- **SDK**: No code changes required to the agent logic, as it interacts with the OpenAI-compatible endpoint.
- **Tools**: MCP tools for task management function identically via tool calling.

## API Integration Example
```python
from agents import Agent, Runner, OpenAIChatCompletionsModel, AsyncOpenAI
import os

# Google Chat Completions API Service (OpenAI-compatible)
external_client: AsyncOpenAI = AsyncOpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url=os.getenv("GEMINI_BASE_URL"),
)

# Gemini Model via OpenAI SDK
llm_model: OpenAIChatCompletionsModel = OpenAIChatCompletionsModel(
    model="gemini-2.0-flash-exp",
    openai_client=external_client
)

# Create Agent
agent: Agent = Agent(name="TodoAssistant", model=llm_model)
```

## Cost & Constraints
- **Pricing**: Leverages Gemini's free tier. No OpenAI costs.
- **Constraints**: 
    - Must use the OpenAI-compatible endpoint (not native Gemini SDK).
    - Rate limits for the free tier should be managed via retry logic.

## User Scenarios & Testing

### User Story 1 - Conversational Task Management (Priority: P1)
As a user, I want to add, view, complete, delete, and update my tasks through a conversational chat interface so that I can manage my to-do list naturally.

**Why this priority**: Core functionality of the phase.

**Independent Test**: Send a natural language message to the chat interface to add a task, then verify the task appears in the task list.

**Acceptance Scenarios**:
1. **Given** no tasks, **When** user sends "Add buy groceries to my list", **Then** system confirms creation of "Buy groceries" task.
2. **Given** pending tasks exist, **When** user sends "Show me my pending tasks", **Then** system lists all pending tasks.
3. **Given** a specific task exists, **When** user sends "Mark task 1 as complete", **Then** system marks task as completed.

---

### User Story 2 - Conversation History Persistence (Priority: P2)
As a user, I want my conversation history to be saved so that I can resume discussions after refreshing the page or logging out and back in.

**Why this priority**: Ensures a seamless, professional experience.

**Independent Test**: Reload the page after a conversation and verify the previous messages are still visible.

**Acceptance Scenarios**:
1. **Given** an active chat, **When** user refreshes the page, **Then** all previous messages are reloaded and displayed.

---

### User Story 3 - Error Handling & Contextual Awareness (Priority: P3)
As a user, I want to receive helpful feedback if my request is ambiguous or invalid so that I know what to do next.

**Why this priority**: Improves UX and reliability.

**Independent Test**: Send an invalid task management request (e.g., delete a non-existent task) and verify the AI provides a clear error message.

**Acceptance Scenarios**:
1. **Given** no task with ID 999, **When** user sends "Delete task 999", **Then** system provides a polite error message explaining that the task was not found.

### Edge Cases
- What happens when the AI is unable to parse the request?
- How does the system handle concurrent tool calls?
- How does the system handle very long conversation histories?

## Requirements

### Functional Requirements
- **FR-001**: System MUST expose an MCP server with tools for: `add_task`, `list_tasks`, `complete_task`, `delete_task`, `update_task`.
- **FR-002**: System MUST persist conversation history and messages in the database.
- **FR-003**: System MUST reuse existing Better Auth JWT token validation.
- **FR-004**: System MUST ensure task operations are scoped to the authenticated `user_id`.
- **FR-005**: AI agents MUST interpret natural language to invoke the correct MCP tools.

### Key Entities
- **Conversation**: Represents a chat session (id, user_id, timestamps).
- **Message**: Represents an individual turn in a conversation (id, conversation_id, role, content, timestamps).

## Success Criteria

### Measurable Outcomes
- **SC-001**: Users can perform basic task operations (add/list/complete) with natural language.
- **SC-002**: Chat history persists across browser sessions.
- **SC-003**: 100% of chat-initiated task actions respect user data isolation (i.e., cannot access other users' tasks).
- **SC-004**: System successfully integrates with Google Gemini via OpenAI-compatible API.
