# Test Specification: Phase 2 Backend (Evolution of Todo)

**Version**: 1.0.0  
**Phase**: Phase 2 Backend  
**Status**: Draft  
**Date**: 2026-03-08  
**Framework**: pytest + httpx

---

## T010 - Task Creation & Listing
**File**: `backend/tests/test_tasks.py`

**Test Cases**:
- [ ] T010.1: should create task with valid JWT and return 201
- [ ] T010.2: should return 400 when title is missing
- [ ] T010.3: should return 400 when title exceeds 200 chars
- [ ] T010.4: should return 401 when JWT is missing
- [ ] T010.5: should return 403 when user_id in URL doesn't match token
- [ ] T010.6: should list only tasks belonging to authenticated user
- [ ] T010.7: should return empty list when user has no tasks
- [ ] T010.8: should filter tasks by status "pending"
- [ ] T010.9: should filter tasks by status "completed"

---

## T014 - Task Detail, Update, Delete
**File**: `backend/tests/test_tasks.py`

**Test Cases**:
- [ ] T014.1: should return task details with correct user_id
- [ ] T014.2: should return 404 when task not found
- [ ] T014.3: should return 403 when accessing another user's task
- [ ] T014.4: should update task title successfully
- [ ] T014.5: should update task description successfully
- [ ] T014.6: should return 404 when updating non-existent task
- [ ] T014.7: should delete task and return 204
- [ ] T014.8: should return 404 when deleting non-existent task

---

## T018 - Toggle Complete
**File**: `backend/tests/test_tasks.py`

**Test Cases**:
- [ ] T018.1: should toggle completed from false to true
- [ ] T018.2: should toggle completed from true to false
- [ ] T018.3: should return 404 when task not found

---

## T020 - Auth Tests
**File**: `backend/tests/test_auth.py`

**Test Cases**:
- [ ] T020.1: should allow request with valid JWT
- [ ] T020.2: should return 401 when Authorization header is missing
- [ ] T020.3: should return 401 when token is expired
- [ ] T020.4: should return 401 when token signature is invalid
- [ ] T020.5: should return 403 when URL user_id doesn't match token sub

---

## Metadata Summary
- **Total Test Suites**: 4
- **Total Test Cases**: 25
- **Coverage Target**: 100% of Task CRUD and Auth Middleware logic
- **Prerequisites**: `BETTER_AUTH_SECRET` must be set in the test environment.
