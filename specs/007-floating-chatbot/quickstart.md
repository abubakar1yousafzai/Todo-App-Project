# Quickstart: Floating AI Chatbot Widget

**Date**: 2026-04-23
**Feature**: [Floating AI Chatbot Widget](specs/007-floating-chatbot/spec.md)

## Getting Started

1. **Install Dependencies**:
   `npm install framer-motion`

2. **Implement Hook**:
   Create `hooks/useChatWidget.ts` for managing widget state (`isOpen`, `isMinimized`) and persisting to `localStorage`.

3. **Develop Components**:
   - `ChatBubble.tsx`: Circular floating button.
   - `ChatPopup.tsx`: Modal container with animations.
   - `ChatWidget.tsx`: Main component managing the bubble/popup toggling and auth-check logic.

4. **Integration**:
   Update `app/layout.tsx` to include `<ChatWidget />` globally, excluding `/login` and `/signup` routes via `usePathname`.

5. **Cleanup**:
   - Delete `app/chat/page.tsx`.
   - Remove "Chat" link from `components/layout/Navbar.tsx`.
