# Feature Specification: UI Redesign

**Feature Branch**: `004-ui-redesign`  
**Created**: 2026-03-31  
**Status**: Draft  
**Input**: User description: "Evolution of Todo UI Redesign - Professional Soft UI"

## Intent
Transform the existing Todo application into a professional and visually appealing "Soft UI" (Neumorphism + Minimal) product. The goal is to improve user engagement through clean aesthetics, better task organization (pinning, priority bars), and improved feedback (dynamic stats, undo functionality).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Modernized Dashboard Experience (Priority: P1)

The user lands on the dashboard and sees a professional, "Soft UI" interface. They immediately see their task counts (Completed, High Priority, Incomplete) in visually distinct cards, giving them an instant overview of their progress.

**Why this priority**: The primary goal of this feature is a visual overhaul. The dashboard is the first point of contact and sets the tone for the entire professional experience.

**Independent Test**: Verify that navigating to the dashboard renders the Soft UI elements (rounded corners, soft shadows, stats cards) and that the stats accurately reflect the current task list.

**Acceptance Scenarios**:

1. **Given** a user is logged in with multiple tasks, **When** they view the dashboard, **Then** they see 3 stats cards (Completed, High Priority, Incomplete) with dynamic counts matching their task list.
2. **Given** the dashboard is loaded, **When** viewed on a mobile device (375px), **Then** the stats cards stack vertically and the layout remains clean with no horizontal scrolling.

---

### User Story 2 - Real-time Task Search and Filtering (Priority: P1)

The user needs to find specific tasks among a large list. They use the new full-width search bar and the pill-shaped filter tabs (All, Completed, Pending, High Priority) to instantly find what they need.

**Why this priority**: Essential for productivity. A professional tool must allow users to manage information density efficiently.

**Independent Test**: Verify that typing "Buy" in the search bar immediately hides tasks that don't match, and clicking "High Priority" shows only red-priority tasks.

**Acceptance Scenarios**:

1. **Given** tasks "Buy Milk" and "Call Boss", **When** a user types "Milk" in the search bar, **Then** only "Buy Milk" is visible.
2. **Given** various tasks, **When** a user clicks the "Completed" filter tab, **Then** only tasks marked as done are shown.

---

### User Story 3 - Task Organization and Management (Priority: P2)

The user interacts with individual task cards which now have vertical colored bars indicating priority. They can pin important tasks to the top for quick access. If they delete a task accidentally, they can use the "Undo" button in the header.

**Why this priority**: Enhances the functional utility of the list beyond just aesthetics.

**Independent Test**: Pin a task at the bottom and confirm it jumps to the top. Delete a task and use "Undo" to bring it back.

**Acceptance Scenarios**:

1. **Given** a task list, **When** a user clicks the Pin icon on a task, **Then** that task instantly moves to the top of the list (above all unpinned tasks).
2. **Given** a user deletes a task, **When** the "Undo" button appears in the header and is clicked, **Then** the task is restored to its previous state in the list.

### Edge Cases

- **Empty State**: How does the dashboard look when there are zero tasks? (Should show a friendly empty state message/illustration).
- **Long Titles**: How do task cards handle extremely long titles that exceed the card width? (Should truncate with ellipsis or wrap cleanly without breaking layout).
- **Rapid Actions**: How does the "Undo" button behave if a user deletes two tasks in rapid succession? (Should ideally restore the very last one, or the one corresponding to the most recent notification).
- **Network Failure**: How does the UI indicate that a pin or delete action failed to sync? (Should show a toast error and revert the UI state).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST implement a "Soft UI" style system using Tailwind CSS, featuring #F7F7F8 background, 16px-20px border radius, and soft elevation shadows.
- **FR-002**: Header MUST display a rounded orange square icon with a white checklist, the title "My Tasks", and a dynamic subtitle showing the global total task count (e.g., "12 total tasks") regardless of active filters.
- **FR-003**: Dashboard MUST include three equal-width stats cards for Completed (Green), High Priority (Red/Pink), and Incomplete (Orange/Yellow).
- **FR-004**: System MUST provide a full-width search bar with an icon and real-time filtering logic.
- **FR-005**: System MUST provide horizontal pill-shaped filter tabs (All, Completed, Pending, High Priority) with smooth transitions.
- **FR-006**: Add Task section MUST be a large rounded container with a priority selector and due date button.
- **FR-007**: Task cards MUST feature a vertical colored bar on the left (Red: High, Orange: Medium, Green: Completed) and circular checkboxes.
- **FR-008**: Pinned tasks MUST be prioritized at the top of the task list regardless of other sorting/filtering.
- **FR-009**: System MUST show an "Undo" button in the header only when a task deletion has occurred, allowing the user to restore the last deleted item.
- **FR-010**: System MUST use the 'Inter' font from Google Fonts.
- **FR-011**: System WILL NOT support Dark Mode. The existing Dark Mode functionality must be removed or disabled to maintain the new Soft UI brand identity.
- **FR-012**: Task editing functionality (Edit icon/modal) is EXCLUDED from this phase.

### Key Entities

- **Task**: A work item with Title, Priority (High/Medium/Low), Due Date, Pin Status, and Completion Status.
- **Stats**: A data structure aggregating task counts based on state and priority.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All dashboard stats cards show accurate dynamic counts matching the task list state at all times.
- **SC-002**: Search filtering occurs with a perceived latency of < 100ms.
- **SC-003**: Pinned tasks are correctly moved to the top of the list instantly upon selection.
- **SC-004**: Application is fully responsive from 320px to 1920px with no layout breakage.
- **SC-005**: Lighthouse Accessibility score is > 90 due to high contrast and proper ARIA labels for new components.

## Assumptions

1. The `useTasks` hook will handle the local search and filtering logic without requiring new backend endpoints.
2. The "Undo" functionality will persist for the duration of the current session or until the next page refresh.
3. shadcn/ui components will be used as the base for buttons, inputs, and cards.
