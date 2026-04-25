# Implementation Plan: Floating AI Chatbot Widget

**Branch**: `007-floating-chatbot` | **Date**: 2026-04-23 | **Spec**: [specs/007-floating-chatbot/spec.md](specs/007-floating-chatbot/spec.md)
**Input**: Floating AI Chatbot Widget feature specification.

## Summary

The goal is to replace the existing `/chat` page with a persistent floating chatbot widget (bubble + popup) accessible across the landing and dashboard pages, with authenticated-user-only task operation permissions.

## Technical Context

**Language/Version**: TypeScript / React (Next.js 15+)
**Primary Dependencies**: React, Tailwind CSS, Framer Motion
**Storage**: localStorage
**Testing**: Vitest
**Target Platform**: Web
**Project Type**: Web application (Next.js)
**Performance Goals**: Sub-1s interaction delay
**Constraints**: Mobile full-screen responsive, persist chat state across pages
**Scale/Scope**: All visitors (landing) and authenticated users (dashboard)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Clear, testable acceptance criteria included
- [x] Smallest viable change (reusing existing backend)
- [x] No unrelated refactoring
- [x] Design artifacts planned (research, data-model, contracts, quickstart)

## Project Structure

### Documentation

```text
specs/007-floating-chatbot/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md
```

### Source Code

```text
frontend/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── dashboard/page.tsx
├── components/
│   └── chat/
│       ├── ChatWidget.tsx
│       ├── ChatBubble.tsx
│       ├── ChatPopup.tsx
│       └── ChatInterface.tsx
├── hooks/
│   └── useChatWidget.ts
```

**Structure Decision**: Web application option (frontend directory) selected.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |
