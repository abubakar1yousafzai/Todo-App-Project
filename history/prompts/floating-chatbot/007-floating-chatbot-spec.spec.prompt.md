---
id: 007
title: floating-chatbot-widget-spec
stage: spec
date: 2026-04-23
surface: agent
model: gemini-pro
feature: floating-chatbot
branch: 007-floating-chatbot
user: user
command: /sp.specify
labels: ["floating-chatbot", "ui", "spec"]
links:
  spec: "specs/007-floating-chatbot/spec.md"
  ticket: null
  adr: null
  pr: null
files:
 - specs/007-floating-chatbot/spec.md
 - specs/007-floating-chatbot/checklists/requirements.md
tests:
 - none
---

## Prompt

I need to update the Phase 3 chatbot specification to change the UI implementation from a separate /chat page to a floating chatbot widget. **Current Implementation (What We Have):** - Separate /chat page at app/chat/page.tsx - Full-page ChatInterface component - User navigates to /chat to use chatbot **Required Change (What We Need):** - Remove /chat page completely - Create a floating chatbot widget (bottom-right corner) - Widget appears on: * Landing page (for all visitors) * Dashboard page (for authenticated users only) - Widget behavior: * Shows a chat bubble button (bottom-right, fixed position) * Clicking opens chat popup/modal overlay * Chat popup stays on top of page content * Minimizable/closable * Persists conversation state when minimized **Functionality Based on Authentication:** **Unauthenticated Users (on Landing Page):** - See chat bubble button - Click → Chat opens - Can ask general questions about the app - If they try task operations → Show message: "Please sign up or log in to manage tasks" - Provide quick signup/login buttons in chat **Authenticated Users (on Dashboard):** - See chat bubble button - Click → Chat opens - Can perform all task operations: * Add task * List tasks * Complete task * Delete task * Update task * All other features from spec - Full MCP tool access - Conversation persists across sessions **UI/UX Requirements:** **Chat Bubble Button:** - Position: Fixed bottom-right corner (20px from right, 20px from bottom) - Size: 60px × 60px circular button - Icon: Chat/message icon with notification badge (if new messages) - Color: Primary brand color - Hover effect: Slight scale/shadow animation - Z-index: High (above all content except modals) **Chat Popup/Modal:** - Position: Bottom-right, above chat bubble - Size: 400px width × 600px height (desktop) - Size: Full screen (mobile) - Components: * Header: "AI Task Assistant" + minimize/close buttons * Message area: Scrollable, auto-scroll to bottom * Input area: Text input + send button at bottom - Animation: Slide up when opening, slide down when closing - Backdrop: Optional light overlay on mobile (dismissible) **State Management:** - Chat state persists when minimized (don't lose messages) - Conversation ID stored in localStorage - Messages remain when switching between pages - Close button clears conversation (optional) **Responsive Design:** - Desktop: Floating widget bottom-right - Tablet: Same as desktop, maybe slightly smaller - Mobile: Full-screen overlay when opened

## Response snapshot

Created new branch `007-floating-chatbot`, initialized specification `specs/007-floating-chatbot/spec.md`, and created a quality checklist.

## Outcome

- ✅ Impact: High
- 🧪 Tests: n/a
- 📁 Files: specs/007-floating-chatbot/spec.md, specs/007-floating-chatbot/checklists/requirements.md
- 🔁 Next prompts: /sp.plan
- 🧠 Reflection: Specification defined, ready for planning.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
