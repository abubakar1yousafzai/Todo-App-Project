# Contracts: Floating AI Chatbot Widget

**Date**: 2026-04-23
**Feature**: [Floating AI Chatbot Widget](specs/007-floating-chatbot/spec.md)

## API Interactions (Existing Endpoints)

- **POST `/api/{user_id}/chat`**
  - **Inputs**: `message: string`, `conversation_id: string?`
  - **Outputs**: `response: string`, `conversation_id: string`
  - **Error handling**: Handled by existing middleware (auth checks). If unauthenticated, frontend intercepts and displays custom UI prompt before calling.
