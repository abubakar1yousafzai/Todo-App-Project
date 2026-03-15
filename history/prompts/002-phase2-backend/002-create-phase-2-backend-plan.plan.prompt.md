---
id: 002
title: Create Phase 2 Backend Plan
stage: plan
date: 2026-03-08
surface: agent
model: gemini-2.0-flash
feature: 002-phase2-backend
branch: 002-phase2-backend
user: human
command: sp.plan
labels: [backend, fastapi, sqlmodel, plan]
links:
  spec: specs/002-phase2-backend/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/002-phase2-backend/plan.md
tests:
  - null
---

## Prompt

You are a Spec-Driven Development architect. Write a `specs/002-phase2-backend/plan.md` for Phase 2 Backend of "Evolution of Todo" project. ## Context - Specify file: specs/002-phase2-backend/specify.md (already approved) - Frontend (Next.js + Better Auth) is already complete - Now planning HOW to build FastAPI backend - Constitution Version 1.1.0 already ratified ## Technology Stack - Python 3.13+ - FastAPI - SQLModel (ORM) - Neon Serverless PostgreSQL - python-jose (JWT verification) - uv (package manager) - pytest (testing) ## Template to Follow EXACTLY Use this 4-part structure: ## Part 1: Reference Architecture Analysis Research similar FastAPI backend implementations: - How production FastAPI apps structure their folders - How SQLModel sessions are managed with FastAPI Depends - How JWT dependency injection works in FastAPI - Best practices for route organization ## Part 2: Current Architecture Analysis - What exists: Frontend complete, no backend - What needs to be built: Complete FastAPI backend - How frontend connects to backend: - Base URL: http://localhost:8000 - JWT in Authorization: Bearer header - All endpoints under /api/{user_id}/ - Files that will be created and their purpose ## Part 3: Implementation Plan Break into phases with folder structure ## Part 4: Implementation Checklist Detailed checklist for everything --- ## What to Cover in Plan ### 1. Folder Structure Write complete backend folder structure: backend/ ├── main.py ├── models.py ├── db.py ├── routes/ │   └── tasks.py ├── middleware/ │   └── auth.py ├── schemas/ │   └── task.py ├── tests/ │   ├── test_tasks.py │   └── test_auth.py ├── .env ├── .env.example ├── pyproject.toml └── README.md ### 2. Models Plan (backend/models.py) Using SQLModel - write exact model definitions plan: User model: - id: str (primary key, from Better Auth) - email: str (unique, index) - name: Optional[str] - created_at: datetime Task model: - id: Optional[int] (primary key, auto increment) - user_id: str (foreign key → users.id, index) - title: str (max 200 chars, not null) - description: Optional[str] (max 1000 chars) - completed: bool (default False) - created_at: datetime (auto) - updated_at: datetime (auto update) ### 3. Database Connection Plan (backend/db.py) - Create engine using DATABASE_URL from .env - Session generator for FastAPI Depends - create_db_and_tables() function called on startup - Connection pooling for Neon PostgreSQL ### 4. JWT Middleware Plan (backend/middleware/auth.py) - HTTPBearer security scheme - Verify token using python-jose and BETTER_AUTH_SECRET - Extract user_id from JWT payload (sub field) - FastAPI dependency: get_current_user() - Compare URL user_id with token user_id - Raise 401 if invalid, 403 if mismatch ### 5. Schemas Plan (backend/schemas/task.py) Write Pydantic schemas for request/response: - TaskCreate: title (required), description (optional) - TaskUpdate: title (optional), description (optional) - TaskResponse: all fields including id, user_id, completed, created_at, updated_at - TaskList: list of TaskResponse ### 6. API Endpoints Plan (backend/routes/tasks.py) For each endpoint write: - Method + path - Request body/params - Response model - Auth dependency - Business logic steps Endpoints: GET /api/{user_id}/tasks POST /api/{user_id}/tasks GET /api/{user_id}/tasks/{task_id} PUT /api/{user_id}/tasks/{task_id} DELETE /api/{user_id}/tasks/{task_id} PATCH /api/{user_id}/tasks/{task_id}/complete ### 7. Error Handling Plan Global exception handlers: - RequestValidationError → 400 - HTTPException → pass through - SQLAlchemyError → 500 - JWTError → 401 ### 8. CORS Plan - Allow origins: http://localhost:3000 - Allow headers: Authorization, Content-Type - Allow methods: GET, POST, PUT, DELETE, PATCH, OPTIONS - Allow credentials: True ### 9. Testing Plan (backend/tests/) Write plan for pytest tests: test_auth.py: - test valid JWT passes middleware - test missing token returns 401 - test invalid token returns 401 - test user_id mismatch returns 403 test_tasks.py: - test create task returns 201 - test list tasks returns only user tasks - test get task by id - test update task - test delete task - test toggle complete - test task not found returns 404 ### 10. Environment Variables Plan backend/.env.example: - DATABASE_URL=postgresql://... - BETTER_AUTH_SECRET=same-as-frontend ## Constraints - Match frontend api.ts exactly (same endpoints, same response format) - BETTER_AUTH_SECRET must be same as frontend - No manual coding — Gemini generates all code - Python 3.13+ only - uv for package management ## Success Criteria - uvicorn starts without errors - All 6 endpoints respond correctly - JWT middleware blocks invalid tokens - pytest passes all tests - Frontend can connect without CORS errors Write the complete plan.md

## Response snapshot

Created a detailed technical plan in `specs/002-phase2-backend/plan.md` covering folder structure, SQLModel definitions, database connection, JWT middleware logic, Pydantic schemas, and a comprehensive testing strategy. The plan aligns with the 4-part structure requested and adheres to all project constraints.

## Outcome

- ✅ Impact: Provided a technical roadmap for implementing the FastAPI backend.
- 🧪 Tests: Defined in the plan for future implementation.
- 📁 Files: Created `specs/002-phase2-backend/plan.md`.
- 🔁 Next prompts: /sp.tasks to generate the implementation tasks.
- 🧠 Reflection: The plan is highly specific, matching the frontend's API client requirements and using the requested tech stack.

## Evaluation notes (flywheel)

- Failure modes observed: None during file creation.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
