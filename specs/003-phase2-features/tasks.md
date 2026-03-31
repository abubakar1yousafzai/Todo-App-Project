# Tasks: Phase 2 Feature Set

**Input**: Design documents from `/specs/003-phase2-features/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/openapi.yaml

**Tests**: Tests are included as requested in the plan.md (verify with updated tests).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `- [ ] [ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 [P] Install `next-themes` and `lucide-react` in `frontend/package.json`
- [x] T002 Configure `ThemeProvider` in `frontend/app/layout.tsx` for dark/light mode
- [x] T003 [P] Add global transition styles for theme switching in `frontend/app/globals.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T004 Update `Task` model with `due_date`, `priority`, and `is_pinned` in `backend/models.py`
- [x] T005 Update Pydantic schemas (`TaskCreate`, `TaskUpdate`, `TaskResponse`) in `backend/schemas/task.py`
- [x] T006 Update TypeScript interfaces (`Task`, `TaskFormData`) in `frontend/types/index.ts`
- [x] T007 Update API client functions to handle new task fields in `frontend/lib/api.ts`

**Checkpoint**: Foundation ready - backend models and frontend types are synchronized.

---

## Phase 3: User Story 1 - Task Organization (Priority: P1) 🎯 MVP

**Goal**: Implement Due Dates and Priority System.

**Independent Test**: Create a task with a specific due date and priority; verify they appear correctly on the TaskCard.

### Implementation for User Story 1

- [x] T008 [P] [US1] Add due date and priority inputs to `frontend/components/tasks/TaskModal.tsx`
- [x] T009 [P] [US1] Implement priority badge and due date display logic in `frontend/components/tasks/TaskCard.tsx`
- [x] T010 [US1] Update `addTask` and `updateTask` to handle new fields in `frontend/hooks/useTasks.ts`
- [x] T011 [US1] Update `create_task` and `update_task` routes in `backend/routes/tasks.py` to persist new fields
- [x] T012 [US1] Add overdue styling logic (red text) for due dates in `frontend/components/tasks/TaskCard.tsx`

**Checkpoint**: User Story 1 (Organization) is functional. Tasks have dates and priorities.

---

## Phase 4: User Story 2 - Task Prioritization (Priority: P1)

**Goal**: Implement Pinning and Priority/Pinned Sorting.

**Independent Test**: Pin a task and verify it moves to the top; verify sorting order matches pinned -> priority -> date.

### Implementation for User Story 2

- [x] T013 [P] [US2] Add pin/unpin toggle button with icon to `frontend/components/tasks/TaskCard.tsx`
- [x] T014 [US2] Implement `togglePin` functionality in `frontend/hooks/useTasks.ts`
- [x] T015 [US2] Update `list_tasks` route in `backend/routes/tasks.py` to sort by `is_pinned` and `priority`
- [x] T016 [US2] Verify `TaskList.tsx` correctly renders the sorted order from the backend

**Checkpoint**: User Story 2 (Prioritization) is functional. Pinned tasks stay at the top.

---

## Phase 5: User Story 3 - Visual Preference (Priority: P2)

**Goal**: Implement Dark/Light Mode toggle.

**Independent Test**: Toggle theme in Navbar and verify it persists after refresh.

### Implementation for User Story 3

- [x] T017 [US3] Implement `ThemeToggle` component with sun/moon icons in `frontend/components/layout/Navbar.tsx`
- [x] T018 [P] [US3] Apply Tailwind `dark:` classes to `frontend/components/tasks/TaskCard.tsx`
- [x] T019 [P] [US3] Apply Tailwind `dark:` classes to `frontend/components/tasks/TaskModal.tsx`
- [x] T020 [P] [US3] Ensure all base UI components in `frontend/components/ui/` support dark mode

**Checkpoint**: User Story 3 (Theme) is functional.

---

## Phase 6: User Story 4 - Error Recovery (Priority: P2)

**Goal**: Implement Undo Delete with 5-second window.

**Independent Test**: Delete a task, click Undo, and verify the task is restored.

### Implementation for User Story 4

- [x] T021 [US4] Create `UndoToast` component in `frontend/components/tasks/UndoToast.tsx`
- [x] T022 [US4] Implement delayed delete logic and undo state in `frontend/hooks/useTasks.ts`
- [x] T023 [US4] Integrate `UndoToast` into the main application layout or task list

**Checkpoint**: User Story 4 (Recovery) is functional.

---

## Phase 7: User Story 5 - Mobile Responsive (Priority: P1)

**Goal**: Mobile-first responsive design overhaul.

**Independent Test**: Verify layout and touch targets on mobile viewport (375px).

### Implementation for User Story 5

- [x] T024 [P] [US5] Update `TaskCard.tsx` layout for mobile (vertical stacking, min-h-11 touch targets)
- [x] T025 [P] [US5] Make `TaskModal.tsx` full-screen on mobile viewports
- [x] T026 [P] [US5] Ensure `Navbar.tsx` is responsive and touch-friendly
- [x] T027 [US5] Audit all frontend components for horizontal scrolling and fix padding/margins

---

## Phase 8: Polish & Cross-Cutting Concerns

- [x] T028 [P] Update `backend/tests/test_tasks.py` to cover new fields and sorting logic
- [x] T029 [P] Update `frontend/hooks/useTasks.test.ts` for new functionality
- [x] T030 Final verification against `specs/003-phase2-features/quickstart.md`

---

## Dependencies & Execution Order

1. **Phase 1 & 2** are strictly required before any story work.
2. **Phase 3 (US1)** and **Phase 4 (US2)** are high priority and should be completed next.
3. **Phase 5 (US3)**, **Phase 6 (US4)**, and **Phase 7 (US5)** can proceed in parallel once Phase 2 is done, but typically follow US1/US2.
4. **Phase 8** is for final verification.

### Parallel Opportunities
- T001, T003 (Setup)
- T008, T009 (US1 UI components)
- T018, T019, T020 (Dark mode styling)
- T024, T025, T026 (Mobile responsiveness)

---

## Implementation Strategy

### MVP First
- Complete Phase 1 & 2.
- Complete Phase 3 (Due Dates & Priority).
- This delivers the most significant organizational value.

### Incremental Delivery
- Add Pinning (Phase 4).
- Add Dark Mode (Phase 5).
- Add Undo Delete (Phase 6).
- Apply Mobile Responsive (Phase 7).
