# Implementation Plan: UI Redesign

**Feature Branch**: `004-ui-redesign`
**Created**: 2026-03-31
**Status**: Draft
**Spec**: [spec.md](spec.md)

## Part 1: Reference Architecture Analysis

### Research Findings
- **Soft UI / Neumorphism**: Achieved with Tailwind CSS using subtle backgrounds (`bg-[#F7F7F8]`), large border radii (`rounded-[20px]`), and dual shadows (light/dark) or simplified soft elevation (`shadow-sm` to `shadow-md` with custom blurs).
- **Next.js Font Integration**: Utilize `next/font/google` in `layout.tsx` for optimal loading and layout shift prevention.
- **Real-time Filtering**: Implement using `useMemo` in `useTasks.ts` or the consuming component to filter based on `searchQuery` and `activeFilter` without extra re-renders.
- **Component Patterns**:
  - **Stats Cards**: Vertical stack on mobile, grid-cols-3 on desktop.
  - **Filter Tabs**: Horizontal scrollable `flex` container on mobile, fixed row on desktop.
  - **Task Cards**: Left border coloring via `border-l-4` conditional classes.

## Part 2: Current Architecture Analysis

### Existing State
- **Frontend**: Next.js 15 (App Router) with Tailwind CSS and shadcn/ui.
- **Auth**: Working login/signup pages with JWT-based authentication.
- **Task Management**: Basic CRUD with `useTasks` hook and `api.ts` library.
- **Layout**: Simple Navbar and main container.

### Change Analysis
- **globals.css**: Needs root color variables and custom Soft UI shadow/animation classes.
- **layout.tsx**: Integrate Inter font.
- **Navbar.tsx**: Major redesign for "My Tasks" branding and Soft UI aesthetic.
- **useTasks.ts**: Add local filtering and search state management.
- **Task Components**: Total overhaul of `TaskCard`, `TaskList`, and `TaskModal` to match the Soft UI design.
- **New Components**: `StatsCards`, `SearchBar`, `FilterTabs`, `AddTaskInput` for modularity.

## Part 3: Implementation Plan

### Phase 1: Design System Setup
- Integrate Inter font in `layout.tsx`.
- Define #F7F7F8 background and custom shadow/border-radius utilities in `globals.css`.
- Add `fadeIn` and `hoverLift` animations.

### Phase 2: Layout & Navbar
- Redesign `Navbar.tsx` with sticky positioning, Soft UI shadow, and the "My Tasks" branding.
- Update `layout.tsx` background to global Soft UI gray.

### Phase 3: Dashboard Page & State
- Update `dashboard/page.tsx` to host the new layout structure.
- Update `useTasks.ts` with `searchQuery` and `activeFilter` states and logic.

### Phase 4: Stats Cards Component
- Implement `StatsCards.tsx` with dynamic counts (Completed, High Priority, Incomplete).
- Ensure mobile responsiveness (stacking).

### Phase 5: Search & Filter Components
- Create `SearchBar.tsx` for real-time title filtering.
- Create `FilterTabs.tsx` for category-based filtering (All, Completed, Pending, High Priority).

### Phase 6: Add Task Redesign
- Create `AddTaskInput.tsx` as a prominent, rounded container.
- Integrate priority pills and due date selector.

### Phase 7: TaskCard Redesign
- Overhaul `TaskCard.tsx` with vertical colored bars, Soft UI shadow, and circular checkboxes.
- Implement "pinned-to-top" logic.

### Phase 8: TaskModal Redesign
- Redesign the task creation/editing modal (via shadcn/ui Dialog) to be a 2-column centered layout.

### Phase 9: Login/Signup Redesign
- Update `login/page.tsx` and `signup/page.tsx` with consistent Soft UI branding and centered cards.

### Phase 10: Animations & Polish
- Finalize transitions, `UndoToast` styling, and conduct cross-browser/responsive testing.

## Part 4: Implementation Checklist

### Phase 1: Design System Setup
- [ ] Add Inter font to `frontend/app/layout.tsx`
- [ ] Update `frontend/app/globals.css`:
  - [ ] Set background to #F7F7F8
  - [ ] Add CSS variables for primary (#F97316), success (#16A34A), and danger (#EF4444)
  - [ ] Define `.soft-shadow` and `.hover-lift` classes
  - [ ] Add `@keyframes fadeIn`

### Phase 2: Navbar Update
- [ ] Update `frontend/components/layout/Navbar.tsx`:
  - [ ] Add orange square icon + "My Tasks" branding
  - [ ] Style with sticky top and soft shadow

### Phase 3: Dashboard Page
- [ ] Update `frontend/app/dashboard/page.tsx`:
  - [ ] Integrate new layout: Stats -> Search/Filter -> AddInput -> List
  - [ ] Remove old form logic

### Phase 4: Stats Cards
- [ ] Create `frontend/components/tasks/StatsCards.tsx`
- [ ] Connect dynamic counts from `useTasks` hook

### Phase 5: Search + Filter
- [ ] Update `frontend/hooks/useTasks.ts` with filtering logic
- [ ] Create `frontend/components/tasks/SearchBar.tsx`
- [ ] Create `frontend/components/tasks/FilterTabs.tsx`

### Phase 6: Add Task Input
- [ ] Create `frontend/components/tasks/AddTaskInput.tsx`
- [ ] Include priority pills and due date trigger

### Phase 7: TaskCard Redesign
- [ ] Update `frontend/components/tasks/TaskCard.tsx`:
  - [ ] Implement left priority bar logic
  - [ ] Implement circular checkbox
  - [ ] Apply `.soft-shadow` and `.hover-lift`

### Phase 8: TaskModal Redesign
- [ ] Update `frontend/components/tasks/TaskModal.tsx` for 2-column layout

### Phase 9: Login/Signup Redesign
- [ ] Style `frontend/app/login/page.tsx` with Soft UI cards
- [ ] Style `frontend/app/signup/page.tsx` with Soft UI cards

### Phase 10: Animations & Polish
- [ ] Update `frontend/components/tasks/UndoToast.tsx`
- [ ] Verify responsive behavior on mobile (375px)
- [ ] Ensure all 73 tests pass

## Constitution Check
- **Small Viable Diff**: Changes are focused only on UI components.
- **No Unrelated Changes**: Backend and Core Auth logic remain untouched.
- **Testing**: Plan includes running all 73 existing tests.
