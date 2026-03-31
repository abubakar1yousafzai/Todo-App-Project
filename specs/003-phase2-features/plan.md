# Implementation Plan: Phase 2 Feature Set

**Branch**: `003-phase2-features` | **Date**: 2026-03-21 | **Spec**: [specs/003-phase2-features/spec.md]
**Input**: Feature specification for 6 new features (Due Date, Priority, Pin, Dark Mode, Undo Delete, Mobile Responsive).

## Summary
Implement a comprehensive set of productivity and UX enhancements including task organization tools (due dates, priority, pinning), modern UI features (dark/light mode), safety features (undo delete), and a mobile-first responsive overhaul.

## Technical Context

**Language/Version**: Python 3.13 (Backend), TypeScript 5.0+ (Frontend)
**Primary Dependencies**: FastAPI, SQLModel, Next.js 16 (App Router), Tailwind CSS, next-themes, lucide-react
**Storage**: SQLite (Dev) / PostgreSQL (Prod) via SQLModel
**Testing**: pytest (Backend), vitest (Frontend)
**Target Platform**: Web (Responsive 320px - 1920px)
**Project Type**: Web application (Frontend + Backend)
**Performance Goals**: <100ms for UI state updates, <200ms for theme transitions
**Constraints**: 5-second undo window, mobile-first design (min 44px touch targets)
**Scale/Scope**: 6 integrated features across 10+ existing files

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Spec-Driven**: `spec.md` is complete and covers all 6 features.
- [x] **AI-Generated**: Plan is designed for AI implementation via atomic tasks.
- [x] **Stateless/Multi-user**: All task operations include `user_id` filtering.
- [x] **Type Safety**: Full TypeScript interfaces and Pydantic schemas defined.
- [x] **Single Source of Truth**: All requirements mapped to `specs/003-phase2-features/`.

---

## Part 1: Reference Architecture Analysis
*Extracted from [research.md](research.md)*

- **Due Dates**: Native `<input type="date">` for mobile-friendly input; ISO 8601 storage.
- **Priority**: 3-level (High/Medium/Low) badge system with color-coded status.
- **Pinning**: Boolean flag `is_pinned` used as primary sort key.
- **Dark Mode**: `next-themes` with Tailwind `dark:` classes for system-aware transitions.
- **Undo Delete**: Client-side `setTimeout` (5s) with toast notification for immediate recovery.
- **Mobile Responsive**: Flex/Grid layouts with touch-friendly dimensions (min h-11/w-11).

## Part 2: Current Architecture Analysis

### Current State:
- **Backend**: `Task` model has basic fields (id, title, description, completed, timestamps).
- **Frontend**: `TaskCard` and `TaskList` handle basic display. `useTasks` hook handles CRUD with optimistic updates.
- **Auth**: Better Auth used for user management and session handling.

### Required Changes:
- **Database**: Add `due_date`, `priority`, `is_pinned` to `Task` model.
- **API**: Update schemas and routes to handle new fields and specialized sorting (pinned first).
- **Frontend Types**: Update `Task` interface.
- **Frontend Hooks**: Update `useTasks` for new fields and implement "Undo Delete" logic.
- **Frontend UI**: Update `Navbar` (theme toggle), `TaskModal` (new inputs), `TaskCard` (badges/icons), and `TaskList` (sorting).

## Part 3: Implementation Plan

### Phase 1: Backend Foundation
1. Update `backend/models.py` with new fields.
2. Update `backend/schemas/task.py` (Create/Update/Response schemas).
3. Update `backend/routes/tasks.py` to support new fields and multi-criteria sorting.
4. Verify backend with updated tests.

### Phase 2: Frontend Foundation & Types
1. Update `frontend/types/index.ts`.
2. Update `frontend/lib/api.ts` to include new fields in `TaskFormData`.
3. Update `frontend/app/layout.tsx` with `ThemeProvider` from `next-themes`.

### Phase 3: Core UI Components (Task Management)
1. Update `frontend/components/tasks/TaskModal.tsx`: Add due date and priority inputs.
2. Update `frontend/components/tasks/TaskCard.tsx`: Add priority badges, due date display, and pin toggle.
3. Update `frontend/components/tasks/TaskList.tsx`: Implement pinned tasks logic and priority sorting.

### Phase 4: Global Features & Polish
1. Update `frontend/components/layout/Navbar.tsx`: Add Theme Toggle button.
2. Update `frontend/hooks/useTasks.ts`: Implement `undoDelete` logic and multi-field updates.
3. Create `frontend/components/tasks/UndoToast.tsx`.
4. Final responsive polish across all components.

## Part 4: Implementation Checklist

### Backend
- [ ] Add `due_date`, `priority`, `is_pinned` to `Task` model in `backend/models.py`.
- [ ] Update `TaskCreate`, `TaskUpdate`, `TaskResponse` in `backend/schemas/task.py`.
- [ ] Update `list_tasks` in `backend/routes/tasks.py` to sort: `is_pinned DESC, priority (weight) DESC, created_at DESC`.

### Frontend - Foundation
- [ ] Add `due_date`, `priority`, `is_pinned` to `Task` and `TaskFormData` interfaces.
- [ ] Install `next-themes` and wrap `app/layout.tsx` in `ThemeProvider`.
- [ ] Add `dark:` variants to `globals.css` and existing UI components.

### Frontend - Task Features
- [ ] **TaskModal**: Add `<input type="date">` and priority `<select>`.
- [ ] **TaskCard**: 
    - [ ] Display `due_date` (red if overdue).
    - [ ] Display Priority Badge (High: Red, Medium: Yellow, Low: Green).
    - [ ] Add Pin/Unpin icon button (lucide-react `Pin` / `PinOff`).
- [ ] **TaskList**: Ensure pinned tasks are grouped at the top.
- [ ] **useTasks**: 
    - [ ] Add `togglePin(taskId)` function.
    - [ ] Update `deleteTask` to use 5-second `setTimeout` and `showUndoToast`.
    - [ ] Implement `undoDelete(taskId)` to cancel timeout.

### Mobile & UX
- [ ] Verify all buttons are `h-11 w-11` (44px) on mobile.
- [ ] Ensure modals are `inset-0` (full-screen) on mobile screens.
- [ ] Verify theme transitions are smooth (CSS `transition-colors`).
