# Specification: Phase 2 Backend (Evolution of Todo)

## Part 1: Reference Architecture Analysis

Research into similar FastAPI + PostgreSQL implementations reveals several industry standards and best practices:

### JWT Verification in FastAPI
- **Mechanism**: Use `python-jose` for decoding and validating tokens.
- **Pattern**: Implement a `HTTPBearer` security dependency that extracts the token from the `Authorization: Bearer` header.
- **Verification**: Tokens must be verified against the `BETTER_AUTH_SECRET` (the same one used by the frontend). The `sub` field in the JWT typically contains the user's unique identifier.
- **Best Practice**: Use FastAPI's dependency injection system to ensure all protected routes have a valid token before execution.

### SQLModel for Database Operations
- **Unified Models**: SQLModel allows defining a single class that acts as both a Pydantic model (for API validation) and a SQLAlchemy model (for database tables).
- **Session Management**: Use a generator with FastAPI's `Depends` to provide a database session to each request, ensuring connections are properly closed.
- **Async Support**: While SQLModel supports async, synchronous sessions with a connection pooler (like Neon's) are often simpler and highly performant for CRUD operations.

### CORS Configuration
- **Middleware**: Use `fastapi.middleware.cors.CORSMiddleware`.
- **Restricted Origins**: Explicitly allow `http://localhost:3000` (frontend).
- **Allowed Headers**: Must include `Authorization` to allow the Bearer token.
- **Allowed Methods**: Include `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, and `OPTIONS`.

### Key Insights from Production FastAPI Applications
- **Input Validation**: Leverage Pydantic's `Field` for strict validation (e.g., max length for titles).
- **Error Consistency**: Return JSON responses with consistent error structures (e.g., `{"detail": "Error message"}`).
- **Environment Variables**: Use `python-dotenv` or Pydantic's `BaseSettings` to manage secrets securely.

## Part 2: Current Architecture Analysis

### Current State
- **Frontend**: Fully functional Next.js application using Better Auth.
- **Backend**: Non-existent (current frontend uses mock data or fails).
- **Integration**: Frontend expects a FastAPI backend at `http://localhost:8000/api`.

### Frontend Expectations
The backend must provide the following RESTful interface:
- **Auth**: Extract `userId` from JWT and verify it matches the `userId` in the URL path.
- **Headers**: Respect `Authorization: Bearer <token>` and `Content-Type: application/json`.
- **Endpoints**:
  - `GET /api/{user_id}/tasks`: List all tasks for the user.
  - `POST /api/{user_id}/tasks`: Create a new task.
  - `GET /api/{user_id}/tasks/{task_id}`: Retrieve a specific task.
  - `PUT /api/{user_id}/tasks/{task_id}`: Update an existing task.
  - `DELETE /api/{user_id}/tasks/{task_id}`: Remove a task.
  - `PATCH /api/{user_id}/tasks/{task_id}/complete`: Toggle task completion status.

### Files to be Created
- `backend/main.py`: Entry point and FastAPI app configuration.
- `backend/models.py`: SQLModel definitions for User and Task.
- `backend/db.py`: Database engine and session management.
- `backend/routes/tasks.py`: Implementation of task CRUD endpoints.
- `backend/middleware/auth.py`: JWT verification and user isolation logic.

### Constraints
- Must match the frontend `api.ts` client exactly.
- User isolation is critical: a user must never be able to access or modify another user's tasks.

## Part 3: Implementation Plan

### Phase 1: Project Setup
- Initialize with `uv`.
- Configure `.env` with `DATABASE_URL` and `BETTER_AUTH_SECRET`.
- Basic FastAPI "Hello World" to verify setup.

### Phase 2: Database Models
- Define `User` and `Task` models in SQLModel.
- Configure Neon PostgreSQL connection.
- Implement startup event to create tables.

### Phase 3: JWT Middleware
- Implement token extraction and validation.
- Secure routes by comparing JWT payload `sub` with URL `user_id`.

### Phase 4: Task CRUD Endpoints
- Implement all 6 required endpoints.
- Ensure strict filtering by `user_id`.

### Phase 5: Error Handling + CORS
- Add global exception handlers for database and validation errors.
- Configure `CORSMiddleware` for frontend communication.

**Rollback Strategy**: Each phase will be committed separately. If a phase fails verification, rollback to the previous commit and re-evaluate the technical approach.

## Part 4: Implementation Checklist

## Constraints
- Do NOT store passwords (Better Auth handles auth on frontend)
- Do NOT change API endpoint format (frontend depends on it)
- JWT secret must be same as frontend BETTER_AUTH_SECRET
- All endpoints must filter by authenticated user_id only
- Response time < 300ms for all endpoints

## Success Criteria
- All 6 API endpoints return correct responses
- JWT verification rejects invalid tokens with 401
- User isolation: each user sees only their own tasks
- Database operations complete within 300ms
- CORS allows frontend requests without errors
- All pytest tests pass

## Non-Goals
- No AI or chatbot (Phase 3)
- No MCP server (Phase 3)
- No Kubernetes (Phase 4)
- No email verification
- No password reset

### Project Setup
- [ ] Initialize project with uv
- [ ] Install dependencies: `fastapi`, `sqlmodel`, `uvicorn`, `python-jose[cryptography]`, `psycopg2-binary`, `python-dotenv`
- [ ] Create `.env` file with `DATABASE_URL` and `BETTER_AUTH_SECRET`
- [ ] Create `backend/main.py` with FastAPI app

### Database Models (`backend/models.py`)
- [ ] User model: `id` (string), `email` (string), `name` (optional), `created_at`
- [ ] Task model: `id` (int), `user_id` (string FK), `title` (string max 200), `description` (optional max 1000), `completed` (bool default false), `created_at`, `updated_at`

### Database Connection (`backend/db.py`)
- [ ] Connect to Neon PostgreSQL using `DATABASE_URL`
- [ ] Create tables on startup
- [ ] Index on `tasks.user_id` and `tasks.completed`

### JWT Middleware (`backend/middleware/auth.py`)
- [ ] Extract token from `Authorization: Bearer` header
- [ ] Verify JWT using `BETTER_AUTH_SECRET`
- [ ] Extract `user_id` from token payload
- [ ] Return 401 if token missing or invalid
- [ ] Return 403 if URL `user_id` does not match token `user_id`

### Task API Endpoints (`backend/routes/tasks.py`)
- [ ] `GET /api/{user_id}/tasks` — list tasks, filter by status
- [ ] `POST /api/{user_id}/tasks` — create task (title required, description optional)
- [ ] `GET /api/{user_id}/tasks/{task_id}` — get single task
- [ ] `PUT /api/{user_id}/tasks/{task_id}` — update task
- [ ] `DELETE /api/{user_id}/tasks/{task_id}` — delete task
- [ ] `PATCH /api/{user_id}/tasks/{task_id}/complete` — toggle completion

### Error Handling
- [ ] 400 → validation errors
- [ ] 401 → missing/invalid JWT
- [ ] 403 → user_id mismatch
- [ ] 404 → task not found
- [ ] 500 → database errors

### CORS Configuration
- [ ] Allow frontend origin (`http://localhost:3000`)
- [ ] Allow `Authorization` header
- [ ] Allow all required HTTP methods
