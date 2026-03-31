# Research: Phase 2 Feature Set

## Reference Architecture Analysis

### 1. Due Dates in Todo Apps
- **Best Practices**: Use a clear date picker (browser native or a library like Radix/Shadcn). Highlight overdue tasks prominently.
- **Implementation**: Store as ISO 8601 strings in the database. Frontend should handle timezone-naive or local time comparisons for "overdue" status.
- **Reference**: Google Tasks, Todoist.

### 2. Priority Systems
- **Best Practices**: Three-level systems (High, Medium, Low) are common for simplicity. Use color-coded badges (Red, Yellow/Amber, Green) for instant recognition.
- **Implementation**: Enum in the database. Default should be "medium".
- **Reference**: Jira, GitHub Issues.

### 3. Pin/Unpin Functionality
- **Best Practices**: Provide a clear toggle (pin icon). Pinned items should override any other sorting logic except possibly grouping.
- **Implementation**: Boolean flag `is_pinned`. Sorting logic: `ORDER BY is_pinned DESC, priority_weight DESC, created_at DESC`.

### 4. Dark/Light Mode with Next.js
- **Best Practices**: Use `next-themes` for reliable theme switching and avoiding hydration mismatches. Use Tailwind's `dark:` modifier.
- **Implementation**: Wrap the application in a `ThemeProvider`. Save preference in `localStorage` (handled by `next-themes`).

### 5. Undo Delete Pattern
- **Best Practices**: When a user deletes an item, don't delete it immediately. Show a toast with an "Undo" button and a timer. If the timer expires, proceed with the actual deletion.
- **Implementation**: 
    - **Optimistic UI**: Remove from list immediately.
    - **Delayed Execution**: Set a `setTimeout` for 5 seconds to call the delete API.
    - **Undo**: If "Undo" is clicked, clear the timeout and restore the item in the UI.

### 6. Mobile Responsive Design
- **Best Practices**: Mobile-first approach. Minimum touch target size of 44x44px. Stack elements vertically on small screens. Full-screen modals for better input handling.
- **Implementation**: Tailwind breakpoints (`sm`, `md`, `lg`). `min-h-[44px]` for interactive elements.

## Technical Context & Decisions

- **Decision**: Use `next-themes` for theme management.
- **Rationale**: Industry standard for Next.js, handles system preferences and hydration automatically.
- **Decision**: Implement "Undo Delete" via a client-side timeout in the `useTasks` hook.
- **Rationale**: Simplest implementation without needing "soft delete" logic in the backend, providing immediate user feedback.
- **Decision**: Use native `<input type="date">` for the mobile-friendly date picker.
- **Rationale**: Best mobile experience with native OS date pickers, requires no additional libraries.
