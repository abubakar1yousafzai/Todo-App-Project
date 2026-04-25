# Tasks: Floating AI Chatbot Widget

**Feature**: [Floating AI Chatbot Widget](specs/007-floating-chatbot/spec.md)
**Branch**: `007-floating-chatbot`
**Date**: 2026-04-23

## Implementation Strategy
MVP focuses on User Story 1 (Accessing the AI Assistant) and User Story 3 (Authenticated User Interaction) as a combined foundational unit, followed by adding the unauthenticated "Sign Up" prompt from User Story 2.

## Phase 1: Setup
- [X] T001 Install `framer-motion` dependency
- [X] T002 Create `hooks/useChatWidget.ts` with basic state management

## Phase 2: Foundational
- [X] T003 [P] Create `components/chat/ChatBubble.tsx` with circular styling
- [X] T004 [P] Create `components/chat/ChatPopup.tsx` with container layout
- [X] T005 [US1] Create `components/chat/ChatWidget.tsx` integrating bubble and popup

## Phase 3: User Story 1 (Accessing the AI Assistant)
- [X] T006 [US1] Update `app/layout.tsx` to include `<ChatWidget />` globally
- [X] T007 [US1] Configure widget visibility on landing and dashboard pages

## Phase 4: User Story 3 (Authenticated User Interaction)
- [X] T008 [US3] Update `components/chat/ChatInterface.tsx` to handle `isAuthenticated` prop
- [X] T009 [US3] Implement logic to persist `conversationId` in localStorage

## Phase 5: User Story 2 (Unauthenticated Interaction)
- [X] T010 [US2] Implement restricted message prompt for unauthenticated users in `ChatInterface.tsx`
- [X] T011 [US2] Add "Sign Up"/"Log In" buttons to unauthenticated chat view

## Phase 6: Polish & Cleanup
- [X] T012 Remove `app/chat/page.tsx`
- [X] T013 Update `components/layout/Navbar.tsx` to remove chat link
- [X] T014 [P] Final CSS responsive design adjustments (mobile/desktop animations)

---

## Dependency Graph
T001/T002 (Setup) → T003/T004/T005 (Foundational) → T006/T007 (US1) → T008/T009 (US3) → T010/T011 (US2) → T012/T013/T014 (Cleanup)

## Parallel Execution Opportunities
- T003 (ChatBubble) and T004 (ChatPopup) can be developed independently.
- T014 (CSS Polish) can be performed after any UI task.
