# Research: Floating AI Chatbot Widget

**Date**: 2026-04-23
**Feature**: [Floating AI Chatbot Widget](specs/007-floating-chatbot/spec.md)

## Unknowns & Research

### 1. Persistent State Persistence
- **Decision**: Use `localStorage` to save the chat session ID and widget minimized/open state.
- **Rationale**: Provides persistent user experience without requiring backend database complexity for temporary UI state.
- **Alternatives considered**: URL parameters (too messy), cookies (overkill for UI state), backend storage (too much latency/cost for UI state).

### 2. Framer Motion Integration
- **Decision**: Utilize `framer-motion` for slide-up animations on both mobile and desktop.
- **Rationale**: Industry standard for smooth React animations; handles `AnimatePresence` for unmounting components gracefully.
- **Alternatives considered**: CSS transitions (less maintainable for complex modal state), raw CSS keyframes (harder to manage).

### 3. Responsive Popup Design
- **Decision**: Conditionally apply Tailwind classes for desktop (fixed 400x600) vs mobile (full-screen).
- **Rationale**: Keeps logic in CSS/Tailwind where possible; minimizes component complexity.
- **Alternatives considered**: Separate components for mobile/desktop (DRY violation).

## Dependencies

- `framer-motion`: For animation.
- `lucide-react`: For the chat icon (already in use in the project).
