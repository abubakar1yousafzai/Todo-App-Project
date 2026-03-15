# Test Specification: Phase 2 Frontend Features

**Version**: 1.0.0  
**Phase**: 2  
**Status**: Draft  
**Date**: 2026-03-06

**Context**: This document defines the test cases for the Phase 2 Frontend implementation using Vitest and React Testing Library. These tests follow a Test-Driven Development (TDD) approach, focusing on behavioral outcomes and requirement verification.

---

## Phase 2: Foundational Tests

### T005 - TypeScript Interfaces (P1)
**File to Test**: `frontend/types/index.ts`  
**Test File**: `frontend/types/index.test.ts`  
**Linked FR**: FR-013, Constitution VII

#### Test Cases:
- [x] should ensure `User` interface has required fields (id, email, name)
- [x] should ensure `Task` interface has required fields (id, user_id, title, description, completed, created_at, updated_at)
- [x] should ensure `TaskFormData` has required `title` and optional `description`
- [x] should ensure `ApiResponse` has optional `data` and optional `error` fields

### T006 - Better Auth Client (P1)
**File to Test**: `frontend/lib/auth.ts`  
**Test File**: `frontend/lib/auth.test.ts`  
**Linked FR**: FR-003, FR-005

#### Test Cases:
- [x] should initialize auth client with correct `baseUrl` from environment variables
- [x] should return user object when `getSession()` is called and a session exists
- [x] should return `null` when `getSession()` is called and no session exists

### T007 - API Client (P1)
**File to Test**: `frontend/lib/api.ts`  
**Test File**: `frontend/lib/api.test.ts`  
**Linked FR**: FR-004, FR-013

#### Test Cases:
- [x] should call `GET /api/{userId}/tasks` with correct userId when `getTasks(userId)` is invoked
- [x] should attach `Authorization: Bearer <token>` header to every request (FR-004)
- [x] should call `POST /api/{userId}/tasks` with correct body when `createTask(userId, data)` is invoked
- [x] should call `PUT /api/{userId}/tasks/{taskId}` with correct body when `updateTask(userId, taskId, data)` is invoked
- [x] should call `DELETE /api/{userId}/tasks/{taskId}` when `deleteTask(userId, taskId)` is invoked
- [x] should call `PATCH /api/{userId}/tasks/{taskId}/complete` when `toggleComplete(userId, taskId)` is invoked
- [x] should return an `ApiResponse` with an error message when the API returns a 401 Unauthorized
- [x] should return an `ApiResponse` with a user-friendly error when a network failure occurs (SC-005)

### T008 - Auth Middleware (P1)
**File to Test**: `frontend/middleware.ts`  
**Test File**: `frontend/middleware.test.ts`  
**Linked FR**: FR-006

#### Test Cases:
- [x] should allow access to `/dashboard` when the user is authenticated
- [x] should redirect unauthenticated users to `/login` when attempting to access `/dashboard` (FR-006)
- [x] should allow access to public routes `/login` and `/signup` without an active session

---

## Phase 3: Authentication Tests (US1)

### T009 - useAuth Hook (P1)
**File to Test**: `frontend/hooks/useAuth.ts`  
**Test File**: `frontend/hooks/useAuth.test.ts`  
**Linked FR**: FR-003, FR-007

#### Test Cases:
- [x] should return the `user` object when a valid session exists
- [x] should return `null` for `user` when no session exists
- [x] should set `loading` to `true` while the session is being fetched
- [x] should clear the session and redirect to `/login` when `logout()` is called (FR-007)
- [x] should redirect to `/dashboard` upon successful `login()`
- [x] should return a specific error message when `login()` fails due to invalid credentials

### T010 - AuthForm Component (P1)
**File to Test**: `frontend/components/auth/AuthForm.tsx`  
**Test File**: `frontend/components/auth/AuthForm.test.tsx`  
**Linked FR**: FR-001, FR-002, FR-003

#### Test Cases:
- [x] should render email and password input fields
- [x] should display "Email is required" when the email field is submitted empty
- [x] should display "Invalid email format" when an improperly formatted email is entered (FR-001)
- [x] should display "Password must be at least 8 characters" when password is too short (FR-001)
- [x] should display "Password must contain at least 1 uppercase letter" when criteria not met
- [x] should display "Password must contain at least 1 number" when criteria not met
- [x] should display "Email already registered" when the API returns a 409 conflict during signup (FR-002)
- [x] should display "Invalid email or password" when the API returns a 401 during login
- [x] should call the `onSubmit` handler with the correct data when the form is valid
- [x] should disable the submit button while the form is in a `loading` state

### T011 - Signup Page (P1)
**File to Test**: `frontend/app/signup/page.tsx`  
**Test File**: `frontend/app/signup/page.test.tsx`  
**Linked FR**: FR-001

#### Test Cases:
- [x] should render the `AuthForm` component with the `type="signup"` prop
- [x] should redirect the user to `/login` after a successful signup
- [x] should display a success message to the user after registration is complete

### T012 - Login Page (P1)
**File to Test**: `frontend/app/login/page.tsx`  
**Test File**: `frontend/app/login/page.test.tsx`  
**Linked FR**: FR-003

#### Test Cases:
- [x] should render the `AuthForm` component with the `type="login"` prop
- [x] should redirect the user to `/dashboard` after a successful login
- [x] should automatically redirect an already authenticated user to the `/dashboard`

---

## Phase 4: Dashboard Tests (US2)

### T014 - Navbar Component (P2)
**File to Test**: `frontend/components/layout/Navbar.tsx`  
**Test File**: `frontend/components/layout/Navbar.test.tsx`  
**Linked FR**: FR-007

#### Test Cases:
- [x] should render the application brand or logo
- [x] should render a logout button
- [x] should trigger the `logout()` function from `useAuth` when the logout button is clicked
- [x] should display the current user's email or name in the header

### T015 - useTasks Hook (P1)
**File to Test**: `frontend/hooks/useTasks.ts`  
**Test File**: `frontend/hooks/useTasks.test.ts`  
**Linked FR**: FR-008, FR-009, FR-012

#### Test Cases:
- [x] should fetch tasks for the authenticated user upon mounting (FR-008)
- [x] should set `loading` to `true` while tasks are being fetched
- [x] should return an empty array when the user has no tasks
- [x] should update the task list optimistically when `addTask()` is called
- [x] should roll back the optimistic UI update if the `addTask()` API call fails
- [x] should update a task in the list optimistically when `updateTask()` is called
- [x] should remove a task from the list optimistically when `deleteTask()` is called
- [x] should update the task's `completed` status when `toggleComplete()` is called (FR-012)

### T016 - TaskCard Component (P1)
**File to Test**: `frontend/components/tasks/TaskCard.tsx`  
**Test File**: `frontend/components/tasks/TaskCard.test.tsx`  
**Linked FR**: FR-012

#### Test Cases:
- [x] should render the task title and description
- [x] should render a completion toggle (checkbox or button)
- [x] should apply a strikethrough or visual indicator when a task is marked as completed
- [x] should call the `onToggle` handler with the correct task ID when clicked
- [x] should call the `onEdit` handler with the full task object when the Edit button is clicked
- [x] should call the `onDelete` handler with the task ID when the Delete button is clicked

### T017 - TaskList Component (P1)
**File to Test**: `frontend/components/tasks/TaskList.tsx`  
**Test File**: `frontend/components/tasks/TaskList.test.tsx`  
**Linked FR**: FR-008

#### Test Cases:
- [x] should render a `TaskCard` for every task in the provided list
- [x] should display a "No tasks yet" message when the task list is empty
- [x] should display a loading skeleton or spinner when `loading` is true
- [x] should verify that only tasks belonging to the current user are displayed (Data Isolation)

### T018 - TaskModal (Add Mode) (P1)
**File to Test**: `frontend/components/tasks/TaskModal.tsx`  
**Test File**: `frontend/components/tasks/TaskModal.test.tsx`  
**Linked FR**: FR-009

#### Test Cases:
- [x] should render a required title input and an optional description input
- [x] should display "Title is required" if the form is submitted without a title
- [x] should prevent submission if the title exceeds 200 characters (FR-009)
- [x] should prevent submission if the description exceeds 1000 characters (FR-009)
- [x] should call `onSubmit` with valid `TaskFormData` upon successful submission
- [x] should close the modal when the "Cancel" button is clicked
- [x] should show a loading state on the submit button while the API call is in progress

---

## Phase 5: Organization & Polish Tests (US3)

### T020 - TaskModal (Edit Mode) (P1)
**File to Test**: `frontend/components/tasks/TaskModal.tsx`  
**Test File**: `frontend/components/tasks/TaskModal.test.tsx`  
**Linked FR**: FR-010

#### Test Cases:
- [x] should pre-fill the title and description fields using the `initialData` prop
- [x] should call `onSubmit` with the updated data upon form submission
- [x] should display the title "Edit Task" instead of "Add Task" when in edit mode

### T021 - DeleteConfirmDialog Component (P1)
**File to Test**: `frontend/components/tasks/DeleteConfirmDialog.tsx`  
**Test File**: `frontend/components/tasks/DeleteConfirmDialog.test.tsx`  
**Linked FR**: FR-011

#### Test Cases:
- [x] should render a clear deletion confirmation message
- [x] should trigger the `onConfirm` callback when the "Confirm" button is clicked
- [x] should trigger the `onCancel` callback when the "Cancel" button is clicked
- [x] should ensure the dialog is not visible in the DOM when `isOpen` is false

### T019 - Dashboard Page (P1)
**File to Test**: `frontend/app/dashboard/page.tsx`  
**Test File**: `frontend/app/dashboard/page.test.tsx`  
**Linked FR**: FR-006, FR-008, FR-009

#### Test Cases:
- [x] should render the `Navbar` component
- [x] should render the `TaskList` component
- [x] should render an "Add Task" button
- [x] should open the `TaskModal` when the "Add Task" button is clicked
- [x] should redirect unauthenticated users to `/login` (Shared with Middleware test)
