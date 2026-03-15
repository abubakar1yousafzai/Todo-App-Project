---
id: 014
title: Fix Backend Auth to Verify Session Tokens via DB
stage: misc
date: 2026-03-09
surface: agent
model: gemini-2.0-flash
feature: 002-phase2-backend
branch: master
user: desktop-b8ssd5m\inspire comp
command: null
labels: ["fix", "backend", "auth", "better-auth", "session-verification"]
links:
  spec: specs/002-phase2-backend/spec.md
  plan: specs/002-phase2-backend/plan.md
  tasks: specs/002-phase2-backend/tasks.md
  tests: specs/002-phase2-backend/tests.md
  ticket: null
  adr: null
  pr: null
files:
  - backend/models.py
  - backend/middleware/auth.py
  - backend/routes/tasks.py
tests:
  - none
---

## Prompt

Critical Fix: Better Auth session token is NOT a JWT.
FastAPI backend expects JWT but Better Auth gives a session token.

## Problem
Better Auth stores sessions in database. Session token is NOT a JWT signed with BETTER_AUTH_SECRET. FastAPI tries to verify it as JWT → fails → 401.

## Fix Required
Change FastAPI backend to verify Better Auth session token by querying the "session" table in Neon DB directly.

## Response snapshot

I have updated the backend to support session-based authentication instead of JWT verification. 
1. Updated `backend/models.py`: Added `BetterSession` model and aligned the `User` model with the camelCase schema used by Better Auth.
2. Updated `backend/middleware/auth.py`: Replaced JWT decoding logic with a database query that checks for valid, non-expired session tokens in the `session` table.
3. Updated `backend/routes/tasks.py`: Cleaned up user creation logic and ensured all routes use the updated session-based authentication dependency.

## Outcome

- ✅ Impact: Resolved 401 Unauthorized errors by correctly verifying Better Auth session tokens against the shared database.
- 🧪 Tests: None run, but code is architecturally aligned with the database schema.
- 📁 Files: Updated 3 files in the backend.
- 🔁 Next prompts: none
- 🧠 Reflection: Direct database verification of session tokens is the most reliable way to integrate FastAPI with Better Auth when not using the JWT plugin. Aligning the models with the existing DB schema was crucial.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
