# Tasks: Phase 2 Backend (Evolution of Todo)

**Input**: specs/002-phase2-backend/spec.md, specs/002-phase2-backend/plan.md
**Prerequisites**: plan.md, spec.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize project with `uv init backend`
- [x] T002 Install dependencies: `fastapi`, `sqlmodel`, `uvicorn`, `python-jose`, `psycopg2-binary`, `python-dotenv`, `pytest`, `httpx`
- [x] T003 [P] Create `.env` and `.env.example` in `backend/`
- [x] T004 [P] Create `backend/main.py` with basic FastAPI app skeleton

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [X] T005 [P] Implement User and Task models in `backend/models.py`
- [X] T006 [P] Configure database engine and `get_session` dependency in `backend/db.py`
- [X] T007 [P] Implement JWT verification and `get_current_user` dependency in `backend/middleware/auth.py`
- [X] T008 [P] Define Pydantic schemas for tasks in `backend/schemas/task.py`
- [X] T009 Configure CORS and startup table creation logic in `backend/main.py`

---

## Phase 3: User Story 1 - Create and List Tasks (Priority: P1) 🎯 MVP

**Goal**: Enable users to persist new tasks and view their task list.

**Independent Test**: Create a task via `POST /api/{user_id}/tasks` and verify it appears in the list returned by `GET /api/{user_id}/tasks`.

### Tests for User Story 1

- [X] T010 [US1] Create initial unit tests for task creation and listing in `backend/tests/test_tasks.py`

### Implementation for User Story 1

- [X] T011 [US1] Implement `POST /api/{user_id}/tasks` endpoint in `backend/routes/tasks.py`
- [X] T012 [US1] Implement `GET /api/{user_id}/tasks` endpoint in `backend/routes/tasks.py`
- [X] T013 [US1] Register tasks router in `backend/main.py`

**Checkpoint**: Basic task creation and listing are functional and verified.

---

## Phase 4: User Story 2 - Task Details, Update, and Deletion (Priority: P2)

**Goal**: Enable users to manage existing tasks by viewing details, editing, or removing them.

**Independent Test**: Update a task's title via `PUT` and verify the change; delete a task via `DELETE` and verify it is no longer in the list.

### Tests for User Story 2

- [X] T014 [US2] Add unit tests for task detail, update, and delete operations in `backend/tests/test_tasks.py`

### Implementation for User Story 2

- [X] T015 [US2] Implement `GET /api/{user_id}/tasks/{task_id}` endpoint in `backend/routes/tasks.py`
- [X] T016 [US2] Implement `PUT /api/{user_id}/tasks/{task_id}` endpoint in `backend/routes/tasks.py`
- [X] T017 [US2] Implement `DELETE /api/{user_id}/tasks/{task_id}` endpoint in `backend/routes/tasks.py`

**Checkpoint**: Task management (detail, update, delete) is fully functional and verified.

---

## Phase 5: User Story 3 - Task Status Management (Priority: P3)

**Goal**: Enable users to toggle task completion status.

**Independent Test**: Call `PATCH /api/{user_id}/tasks/{task_id}/complete` and verify the `completed` field toggles in the database.

### Tests for User Story 3

- [X] T018 [US3] Add unit tests for completion toggle in `backend/tests/test_tasks.py`

### Implementation for User Story 3

- [X] T019 [US3] Implement `PATCH /api/{user_id}/tasks/{task_id}/complete` endpoint in `backend/routes/tasks.py`

**Checkpoint**: Task status management is functional and verified.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification, error handling, and documentation.

- [X] T020 [P] Create auth unit tests for valid/invalid/missing tokens and user isolation in `backend/tests/test_auth.py`
- [X] T021 Implement global error handling for validation and database errors in `backend/main.py`
- [X] T022 [P] Create `backend/README.md` with setup and testing instructions


---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 - BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Phase 2 completion.
  - US1 (Phase 3) is the priority MVP.
  - US2 and US3 follow sequentially.
- **Polish (Phase 6)**: Depends on all user stories being complete.

### User Story Dependencies

- **User Story 1**: No dependencies on other stories.
- **User Story 2**: Depends on User Story 1 (requires existing tasks to test details/update/delete).
- **User Story 3**: Depends on User Story 1.

### Parallel Opportunities

- T003 and T004 in Setup.
- T005, T006, T007, T008 in Foundational.
- T020 and T022 in Polish.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup and Foundational phases.
2. Complete User Story 1.
3. **VALIDATE**: Ensure a user can log in (using frontend token) and successfully create/list tasks.

### Incremental Delivery

1. Deliver US1 as the basic functional increment.
2. Deliver US2 to provide full CRUD capabilities.
3. Deliver US3 for status toggling.
4. Final Polish and error handling.
