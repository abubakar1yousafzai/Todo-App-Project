---
id: 013
title: Fix JWT Token Attachment to Backend
stage: misc
date: 2026-03-09
surface: agent
model: gemini-2.0-flash
feature: 001-phase2-frontend
branch: 001-phase2-frontend
user: desktop-b8ssd5m\inspire comp
command: null
labels: ["fix", "frontend", "api", "jwt", "auth"]
links:
  spec: specs/001-phase2-frontend/spec.md
  plan: specs/001-phase2-frontend/plan.md
  tasks: specs/001-phase2-frontend/tasks.md
  tests: specs/001-phase2-frontend/tests.md
  ticket: null
  adr: null
  pr: null
files:
  - frontend/lib/api.ts
  - frontend/lib/auth.ts
tests:
  - all 72 tests passed
---

## Prompt

Fix JWT token not being sent to FastAPI backend.

## Problem
Backend is returning 401 Unauthorized for all API calls.
Frontend is not attaching the JWT token from Better Auth session to API requests.

## Fix Required
- Update frontend/lib/api.ts to attach token to Authorization: Bearer header.
- Update frontend/lib/auth.ts to correctly extract the session token from session.data.session.token.

## Response snapshot

I have updated `frontend/lib/auth.ts` to correctly extract the session token from the Better Auth session object using `session.session.token`. I also updated the centralized `request` wrapper in `frontend/lib/api.ts` to automatically fetch this token and attach it to the `Authorization: Bearer <token>` header for all outgoing API calls to the FastAPI backend. Verified that all 72 existing tests pass.

## Outcome

- ✅ Impact: Resolved 401 Unauthorized errors on the backend by ensuring every request is properly authenticated.
- 🧪 Tests: 72/72 tests passing.
- 📁 Files: Updated `frontend/lib/api.ts` and `frontend/lib/auth.ts`.
- 🔁 Next prompts: none
- 🧠 Reflection: Centralizing the token extraction and header attachment logic in a single fetch wrapper prevents future authentication-related regressions.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
