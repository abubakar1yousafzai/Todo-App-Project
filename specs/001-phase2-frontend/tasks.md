# Tasks: Phase 2 Frontend Features

**Input**: Design documents from `specs/001-phase2-frontend/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/openapi.yaml

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize Next.js 16+ project with TypeScript and Tailwind in `/frontend`
- [x] T002 Install core dependencies: `better-auth`, `lucide-react`, `zod`, `clsx`, `tailwind-merge`
- [x] T003 [P] Configure `.env.local` with `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and `NEXT_PUBLIC_API_URL`
- [x] T004 [P] Initialize shadcn/ui and add base components: `Button`, `Input`, `Dialog`, `Label`, `Card`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure required for all user stories

- [x] T005 Create TypeScript interfaces and types in `frontend/types/index.ts` (User, Task, ApiResponse)
- [x] T006 Initialize Better Auth client configuration in `frontend/lib/auth.ts`
- [x] T007 [P] Implement API client with JWT interceptor logic in `frontend/lib/api.ts`
- [x] T008 [P] Implement Next.js auth middleware for route protection in `frontend/middleware.ts`

**Checkpoint**: Foundation ready - user story implementation can begin

---

## Phase 3: User Story 1 - Secure Signup & Login (Priority: P1) 🎯 MVP

**Goal**: Enable users to create accounts and log in securely via Better Auth

**Independent Test**: Register a new user at `/signup`, log in at `/login`, and verify redirection to `/dashboard`.

### Implementation for User Story 1

- [x] T009 [US1] Implement `useAuth` custom hook for session management in `frontend/hooks/useAuth.ts`
- [x] T010 [P] [US1] Create `AuthForm` component with Zod validation in `frontend/components/auth/AuthForm.tsx`
- [x] T011 [US1] Create registration page with `AuthForm` in `frontend/app/signup/page.tsx`
- [x] T012 [US1] Create login page with `AuthForm` in `frontend/app/login/page.tsx`
- [x] T013 [US1] Implement `ProtectedRoute` wrapper component in `frontend/components/auth/ProtectedRoute.tsx`

**Checkpoint**: User Story 1 functional - Auth flow complete

---

## Phase 4: User Story 2 - Task Management Dashboard (Priority: P1)

**Goal**: Display task list and allow adding new tasks for the logged-in user

**Independent Test**: Log in, add a new task via the dashboard, and verify it appears in the list and can be toggled.

### Implementation for User Story 2

- [x] T014 [US2] Create `Navbar` component with brand and logout in `frontend/components/layout/Navbar.tsx`
- [x] T015 [US2] Implement `useTasks` custom hook with optimistic UI logic in `frontend/hooks/useTasks.ts`
- [x] T016 [P] [US2] Create `TaskCard` component with completion toggle in `frontend/components/tasks/TaskCard.tsx`
- [x] T017 [US2] Create `TaskList` component to render the user's tasks in `frontend/components/tasks/TaskList.tsx`
- [x] T018 [US2] Create `TaskModal` for "Add Task" functionality in `frontend/components/tasks/TaskModal.tsx`
- [x] T019 [US2] Assemble the dashboard page in `frontend/app/dashboard/page.tsx`

**Checkpoint**: User Story 2 functional - Core task CRUD (Create/Read/Toggle) complete

---

## Phase 5: User Story 3 - Task Organization (Priority: P2)

**Goal**: Allow users to edit task details and delete tasks with confirmation

**Independent Test**: Edit a task's title, save it, and then delete a task, confirming the removal from the list.

### Implementation for User Story 3

- [x] T020 [US3] Update `TaskModal` to handle editing mode with initial data in `frontend/components/tasks/TaskModal.tsx`
- [x] T021 [P] [US3] Create `DeleteConfirmDialog` component in `frontend/components/tasks/DeleteConfirmDialog.tsx`
- [x] T022 [US3] Integrate edit and delete actions into the `TaskCard` component in `frontend/components/tasks/TaskCard.tsx`

**Checkpoint**: All user stories functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: UI/UX refinements and final documentation

- [x] T023 [P] Add loading skeletons for `TaskList` and `AuthForm`
- [x] T024 [P] Implement toast notifications for API success/error states using `sonner` or `react-hot-toast`
- [x] T025 Update `frontend/README.md` with setup and environment variable instructions
- [x] T026 Perform final accessibility audit (ARIA labels, keyboard navigation) on all forms

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Initial project creation.
- **Foundational (Phase 2)**: Depends on Setup (T001-T004). Blocks all User Stories.
- **User Story 1 (Phase 3)**: Depends on Foundation (T005-T008). Must be complete for authenticated features.
- **User Story 2 (Phase 4)**: Depends on US1 (T009-T013) for the authenticated dashboard context.
- **User Story 3 (Phase 5)**: Depends on US2 (T014-T019) as it extends the task list functionality.

### Parallel Opportunities

- T003 and T004 can run in parallel.
- T007 and T008 can run in parallel.
- T010 and T016/T021 are mostly independent UI tasks.
- Polish tasks T023-T026 can run in parallel after Phase 5.

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1. Complete Setup and Foundation.
2. Deliver Auth flow (US1).
3. Deliver Task display and Add functionality (US2).
4. **Validation**: User can log in and see their own tasks.

### Incremental Delivery

1. Foundation ready.
2. Auth ready (MVP step 1).
3. Task Dashboard ready (MVP step 2).
4. Edit/Delete functionality added (Full Phase 2 scope).
5. Polish and Documentation.
