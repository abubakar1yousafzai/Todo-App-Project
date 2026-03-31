---
id: 001
title: Create Phase 2 Backend Specification
stage: spec
date: 2026-03-08
surface: agent
model: gemini-2.0-flash
feature: 002-phase2-backend
branch: 002-phase2-backend
user: human
command: sp.specify
labels: [backend, fastapi, sqlmodel, spec]
links:
  spec: specs/002-phase2-backend/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/002-phase2-backend/spec.md
  - specs/002-phase2-backend/checklists/requirements.md
tests:
  - null
---

## Prompt

You are a Spec-Driven Development architect. Write a `specs/002-phase2-backend/specify.md` for Phase 2 Backend of "Evolution of Todo" project. ## Context - Frontend (Next.js + Better Auth) is already complete - Now building FastAPI backend - Constitution Version 1.1.0 already ratified - Frontend sends JWT token in Authorization: Bearer header ## Technology Stack - Python 3.13+, FastAPI, SQLModel, Neon PostgreSQL - JWT verification using BETTER_AUTH_SECRET - uv package manager ## Template to Follow EXACTLY Use this 4-part structure for the ENTIRE backend specification: ## Part 1: Reference Architecture Analysis Research similar FastAPI + PostgreSQL implementations and reveal: - How JWT verification is typically done in FastAPI - How SQLModel is used for database operations - How CORS is configured for frontend-backend communication - Key insights from production FastAPI applications ## Part 2: Current Architecture Analysis Analyze what we have and what we need: - Current state: Frontend complete, no backend exists yet - What frontend expects from backend (API endpoints, JWT, responses) - Files that will be created: - backend/main.py - backend/models.py - backend/db.py - backend/routes/tasks.py - backend/middleware/auth.py - Constraints: Must match frontend API client exactly ## Part 3: Implementation Plan Break into phases: - Phase 1: Project setup (FastAPI + uv + environment) - Phase 2: Database models (SQLModel + Neon connection) - Phase 3: JWT middleware (verify Better Auth tokens) - Phase 4: Task CRUD endpoints - Phase 5: Error handling + CORS Rollback: Each phase independently testable ## Part 4: Implementation Checklist Write checklist for ALL of these: ### Project Setup - [ ] Initialize project with uv - [ ] Install dependencies: fastapi, sqlmodel, uvicorn, python-jose, psycopg2-binary - [ ] Create .env file with DATABASE_URL and BETTER_AUTH_SECRET - [ ] Create backend/main.py with FastAPI app ### Database Models (backend/models.py) - [ ] User model: id (string), email (string), name (optional), created_at - [ ] Task model: id (int), user_id (string FK), title (string max 200), description (optional max 1000), completed (bool default false), created_at, updated_at ### Database Connection (backend/db.py) - [ ] Connect to Neon PostgreSQL using DATABASE_URL - [ ] Create tables on startup - [ ] Index on tasks.user_id and tasks.completed ### JWT Middleware (backend/middleware/auth.py) - [ ] Extract token from Authorization: Bearer header - [ ] Verify JWT using BETTER_AUTH_SECRET - [ ] Extract user_id from token payload - [ ] Return 401 if token missing or invalid - [ ] Return 403 if URL user_id does not match token user_id ### Task API Endpoints (backend/routes/tasks.py) - [ ] GET /api/{user_id}/tasks — list tasks, filter by status - [ ] POST /api/{user_id}/tasks — create task (title required, description optional) - [ ] GET /api/{user_id}/tasks/{task_id} — get single task - [ ] PUT /api/{user_id}/tasks/{task_id} — update task - [ ] DELETE /api/{user_id}/tasks/{task_id} — delete task - [ ] PATCH /api/{user_id}/tasks/{task_id}/complete — toggle completion ### Error Handling - [ ] 400 → validation errors - [ ] 401 → missing/invalid JWT - [ ] 403 → user_id mismatch - [ ] 404 → task not found - [ ] 500 → database errors ### CORS Configuration - [ ] Allow frontend origin (localhost:3000) - [ ] Allow Authorization header - [ ] Allow all required HTTP methods ## Constraints - Do NOT store passwords (Better Auth handles auth on frontend) - Do NOT change API endpoint format (frontend depends on it) - JWT secret must be same as frontend BETTER_AUTH_SECRET - All endpoints must filter by authenticated user_id only - Response time < 300ms for all endpoints ## Success Criteria - All 6 API endpoints return correct responses - JWT verification rejects invalid tokens with 401 - User isolation: each user sees only their own tasks - Database operations complete within 300ms - CORS allows frontend requests without errors - All pytest tests pass ## Non-Goals - No AI or chatbot (Phase 3) - No MCP server (Phase 3) - No Kubernetes (Phase 4) - No email verification - No password reset Write the complete specify.md now following this exact template.

## Response snapshot

Created Phase 2 Backend specification in `specs/002-phase2-backend/spec.md` following the 4-part structure:
1. Reference Architecture Analysis (FastAPI, SQLModel, CORS)
2. Current Architecture Analysis (Frontend expectations, file structure)
3. Implementation Plan (Phased approach)
4. Implementation Checklist (Detailed task lists)

Also created a quality checklist in `specs/002-phase2-backend/checklists/requirements.md`.

## Outcome

- ✅ Impact: Established the technical requirements and implementation roadmap for the FastAPI backend.
- 🧪 Tests: None (specification stage).
- 📁 Files: Created `specs/002-phase2-backend/spec.md` and `specs/002-phase2-backend/checklists/requirements.md`.
- 🔁 Next prompts: /sp.plan to create the technical plan.
- 🧠 Reflection: The user provided a very technical prompt which essentially dictated the structure of the specification. I followed it while ensuring it aligned with the frontend's existing API client.

## Evaluation notes (flywheel)

- Failure modes observed: `create-new-feature.ps1` had some parameter binding issues on retry but successfully initialized the branch and directory.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Improve script parameter handling for PowerShell.
