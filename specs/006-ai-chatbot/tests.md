# Test Suite: Phase 3 AI Chatbot

This test suite covers backend logic for MCP tools, AI agent interactions, and the chat endpoint, along with frontend state management.

## 1. Backend Tests (`backend/tests/test_chat.py`)

### 1.1 MCP Tool Tests
```python
import pytest
from backend.mcp.server import add_task, list_tasks

@pytest.mark.asyncio
async def test_mcp_add_task_isolation(db_session, user_id):
    # Test task added for user_id is only visible to user_id
    await add_task(title="Test Task", user_id=user_id)
    tasks = await list_tasks(user_id=user_id)
    assert len(tasks) == 1
    
    other_tasks = await list_tasks(user_id="other_user")
    assert len(other_tasks) == 0
```

### 1.2 Chat Endpoint Tests
```python
@pytest.mark.asyncio
async def test_chat_endpoint_persistence(client, auth_headers, user_id):
    # Send message, verify response stored in DB
    response = await client.post(
        f"/api/{user_id}/chat", 
        json={"content": "Add buy groceries"},
        headers=auth_headers
    )
    assert response.status_code == 200
    
    # Verify conversation and messages created in DB
    # (Check DB count for Conversation/Message for user_id)
```

## 2. Frontend Tests (`frontend/hooks/useChat.test.ts`)

### 2.1 State Management Tests
```typescript
import { renderHook, act } from '@testing-library/react';
import { useChat } from '../hooks/useChat';

test('useChat should update messages optimistically', async () => {
    const { result } = renderHook(() => useChat());
    
    act(() => {
        result.current.sendMessage("Add buy groceries");
    });
    
    // Verify message added to state
    expect(result.current.messages.length).toBe(1);
    expect(result.current.isLoading).toBe(true);
});
```

## 3. Integration Tests
- **Database Isolation**: Verify that `user_id` context is correctly enforced across all `list_tasks` and `add_task` calls originating from the Chat Agent.
- **Session Auth**: Verify that unauthenticated requests to `/api/{user_id}/chat` are rejected by Better Auth middleware.
