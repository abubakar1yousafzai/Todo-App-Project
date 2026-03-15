# Technical Plan: Phase 2 Backend (Evolution of Todo)

## Part 1: Reference Architecture Analysis

Based on industry standards for production-ready FastAPI applications and the specific tech stack (SQLModel, Neon, Better Auth), the following architectural patterns will be implemented:

### Folder Structure & Route Organization
- **Standard**: A modular structure separating models, schemas, database logic, and routes.
- **Organization**: Using `APIRouter` to group related endpoints (e.g., tasks) and including them in the main `FastAPI` instance. This allows for clean versioning and scalable route management.

### SQLModel Session Management
- **Pattern**: A generator-based dependency (`get_session`) using FastAPI's `Depends`.
- **Management**: The session is opened per request and automatically closed when the request is finished. Connection pooling for Neon PostgreSQL will be managed via the `create_engine` configuration.

### JWT Dependency Injection
- **Mechanism**: `HTTPBearer` security scheme combined with `python-jose`.
- **Dependency**: A `get_current_user` dependency will:
  1. Extract the token from the `Authorization` header.
  2. Verify the signature using `BETTER_AUTH_SECRET` (HS256 algorithm).
  3. Decode the payload to extract the `sub` (user_id).
  4. Ensure the `user_id` from the token matches the `user_id` in the API path where required (user isolation).

---

## Part 2: Current Architecture Analysis

### Current State
- **Frontend**: Fully complete Next.js application using Better Auth for authentication.
- **Backend**: Non-existent.

### Integration Requirements
- **Base URL**: `http://localhost:8000/api`
- **Auth**: Frontend sends JWT in `Authorization: Bearer <token>`.
- **Endpoint Structure**: All endpoints follow the pattern `/api/{user_id}/tasks/...` to facilitate multi-tenancy and user isolation.

### Files to be Created
1. `backend/main.py`: Entry point, CORS configuration, and router inclusion.
2. `backend/models.py`: SQLModel definitions for database tables.
3. `backend/db.py`: Engine creation and session dependency.
4. `backend/routes/tasks.py`: Task CRUD logic.
5. `backend/middleware/auth.py`: JWT verification dependency.
6. `backend/schemas/task.py`: Pydantic models for request/response validation.
7. `backend/tests/`: Pytest suite for automated verification.

---

## Part 3: Implementation Plan

### Folder Structure
```
backend/
├── main.py
├── models.py
├── db.py
├── routes/
│   └── tasks.py
├── middleware/
│   └── auth.py
├── schemas/
│   └── task.py
├── tests/
│   ├── test_tasks.py
│   └── test_auth.py
├── .env
├── .env.example
├── pyproject.toml
└── README.md
```

### Phase 1: Foundational Setup
- Initialize project with `uv init backend`.
- Install core dependencies (`fastapi`, `sqlmodel`, `uvicorn`, `python-jose[cryptography]`, `psycopg2-binary`, `python-dotenv`).
- Configure `.env` and `.env.example`.

### Phase 2: Data Models & Database
- Implement `User` and `Task` models in `models.py`.
- Configure the database engine in `db.py` with Neon PostgreSQL connection string.
- Implement startup table creation logic in `main.py`.

### Phase 3: Auth Middleware
- Implement `get_current_user` in `middleware/auth.py`.
- Ensure strict verification of JWT against `BETTER_AUTH_SECRET`.
- Implement path-based user isolation (verify URL `user_id` == Token `sub`).

### Phase 4: Task API Implementation
- Define request/response schemas in `schemas/task.py`.
- Implement CRUD routes in `routes/tasks.py`.
- Apply `get_current_user` dependency to all task routes.

### Phase 5: Polish & Testing
- Configure CORS in `main.py`.
- Implement global error handlers.
- Write and run pytest suite in `tests/`.

---

## Part 4: Implementation Checklist

### Project Setup
- [ ] Initialize project with `uv`
- [ ] Install dependencies: `fastapi`, `sqlmodel`, `uvicorn`, `python-jose`, `psycopg2-binary`, `python-dotenv`, `pytest`, `httpx`
- [ ] Create `.env` and `.env.example`
- [ ] Create `backend/main.py` with basic FastAPI app and CORS

### Models & DB (`backend/models.py`, `backend/db.py`)
- [ ] **User Model**: `id` (str, pk), `email` (str, unique), `name` (opt), `created_at` (datetime)
- [ ] **Task Model**: `id` (int, pk), `user_id` (str, fk), `title` (str, 200), `description` (str, 1000), `completed` (bool), `created_at`, `updated_at`
- [ ] **Engine**: Create engine with `DATABASE_URL`
- [ ] **Session**: Implement `get_session` dependency
- [ ] **Startup**: Ensure tables are created on app startup

### Auth Middleware (`backend/middleware/auth.py`)
- [ ] Extract JWT from Bearer header
- [ ] Decode using `BETTER_AUTH_SECRET`
- [ ] Extract `sub` as `user_id`
- [ ] Implement `get_current_user` dependency
- [ ] Return 401 for invalid tokens, 403 for `user_id` mismatch in paths

### Schemas (`backend/schemas/task.py`)
- [ ] `TaskCreate`: title (req), description (opt)
- [ ] `TaskUpdate`: title (opt), description (opt)
- [ ] `TaskResponse`: id, user_id, title, description, completed, created_at, updated_at
- [ ] `TaskList`: list of `TaskResponse`

### Routes (`backend/routes/tasks.py`)
- [ ] `GET /api/{user_id}/tasks` — List tasks for user
- [ ] `POST /api/{user_id}/tasks` — Create task for user
- [ ] `GET /api/{user_id}/tasks/{task_id}` — Get single task (check ownership)
- [ ] `PUT /api/{user_id}/tasks/{task_id}` — Update task (check ownership)
- [ ] `DELETE /api/{user_id}/tasks/{task_id}` — Delete task (check ownership)
- [ ] `PATCH /api/{user_id}/tasks/{task_id}/complete` — Toggle completion (check ownership)

### Testing
- [ ] `test_auth.py`: Verify valid/invalid/missing tokens and user isolation
- [ ] `test_tasks.py`: Verify all 6 CRUD operations and task ownership enforcement
- [ ] Verify `uvicorn` starts and frontend can connect via CORS
