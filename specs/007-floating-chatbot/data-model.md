# Data Model: Floating AI Chatbot Widget

**Date**: 2026-04-23
**Feature**: [Floating AI Chatbot Widget](specs/007-floating-chatbot/spec.md)

## Entities

### ChatWidgetState (Frontend-only, localStorage)

| Field | Type | Description |
|-------|------|-------------|
| `isOpen` | boolean | Tracks if the chat popup is currently displayed. |
| `conversationId` | string \| null | ID of the current active conversation. |
| `lastMinimizedAt` | string \| null | Timestamp of last interaction (for session management). |

## State Transitions

- **Hidden** (Initial) → **Minimized** (via load)
- **Minimized** (Bubble visible) → **Maximized** (Popup visible, triggered by Click)
- **Maximized** → **Minimized** (Triggered by Minimize button or Close)
