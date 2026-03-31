## Test Specification: Phase 2 Feature Set

**Version**: 1.0.0  
**Phase**: 2 (Productivity & UX)  
**Status**: Completed  
**Date**: 2026-03-21  

---

### F1 - Due Date
#### Test Cases:
- [x] **TaskModal**: should render due date input field
- [x] **TaskModal**: should accept valid date input
- [x] **TaskModal**: should work on mobile (375px viewport)
- [x] **TaskCard**: should show due date when set
- [x] **TaskCard**: should show due date in red when overdue
- [x] **TaskCard**: should not show due date when not set
- [x] **Backend**: should create task with `due_date`
- [x] **Backend**: should return `due_date` in task response
- [x] **Backend**: should update `due_date` successfully
- [x] **Backend**: should accept `null` `due_date`

---

### F2 - Priority System
#### Test Cases:
- [x] **TaskModal**: should render priority selector
- [x] **TaskModal**: should default priority to "medium"
- [x] **TaskModal**: should accept "high", "medium", "low" values
- [x] **TaskCard**: should show red badge for high priority
- [x] **TaskCard**: should show yellow badge for medium priority
- [x] **TaskCard**: should show green badge for low priority
- [x] **Backend**: should create task with priority "high"
- [x] **Backend**: should create task with priority "medium"
- [x] **Backend**: should create task with priority "low"
- [x] **Backend**: should default priority to "medium" when not provided
- [x] **Backend**: should reject invalid priority values

---

### F3 - Pin Important Tasks
#### Test Cases:
- [x] **TaskCard**: should render pin button on each task
- [x] **TaskCard**: should show filled pin icon when task is pinned
- [x] **TaskCard**: should show outline pin icon when task is not pinned
- [x] **TaskCard**: should call `togglePin` when pin button clicked
- [x] **TaskList**: should show pinned tasks at top of list
- [x] **TaskList**: should show unpinned tasks below pinned tasks
- [x] **TaskList**: should maintain pin order after new task added
- [x] **useTasks**: should toggle `is_pinned` from `false` to `true`
- [x] **useTasks**: should toggle `is_pinned` from `true` to `false`
- [x] **Backend**: should create task with `is_pinned` `false` by default
- [x] **Backend**: should update `is_pinned` to `true`
- [x] **Backend**: should return pinned tasks first in list

---

### F4 - Dark / Light Mode
#### Test Cases:
- [x] **Navbar**: should render theme toggle button
- [x] **Navbar**: should show sun icon in dark mode
- [x] **Navbar**: should show moon icon in light mode
- [x] **Navbar**: should toggle theme when button clicked
- [x] **layout**: should apply `dark` class when dark mode active
- [x] **layout**: should apply `light` class when light mode active
- [x] **layout**: should save preference to `localStorage`
- [x] **layout**: should load saved preference on mount

---

### F5 - Undo Delete
#### Test Cases:
- [x] **useTasks**: should show undo toast after task deleted
- [x] **useTasks**: should restore task when `undoDelete` called within 5 seconds
- [x] **useTasks**: should permanently delete task after 5 seconds
- [x] **useTasks**: should only show one undo toast at a time
- [x] **useTasks**: should cancel previous undo when new task deleted
- [x] **UndoToast**: should render at bottom-left position
- [x] **UndoToast**: should show "Task deleted. Undo?" message
- [x] **UndoToast**: should render Undo button
- [x] **UndoToast**: should call `onUndo` when Undo button clicked
- [x] **UndoToast**: should auto dismiss after 5 seconds
- [x] **UndoToast**: should not be visible when `isOpen` is `false`

---

### F6 - Mobile Responsive
#### Test Cases:
- [x] **TaskCard**: should have touch friendly buttons (min 44px)
- [x] **TaskCard**: should render correctly at 375px viewport
- [x] **TaskModal**: should be full screen on mobile viewport
- [x] **TaskModal**: should have touch friendly inputs
- [x] **TaskList**: should not have horizontal scroll at 375px
- [x] **Navbar**: should render correctly on mobile viewport
