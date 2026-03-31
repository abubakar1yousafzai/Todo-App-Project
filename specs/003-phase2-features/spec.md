# Feature Specification: Phase 2 Feature Set

**Feature Branch**: `003-phase2-features`  
**Created**: 2026-03-21  
**Status**: Draft  
**Input**: User description: "Add 6 new features: Due Date, Priority System, Pin Tasks, Dark/Light Mode, Undo Delete, and Mobile Friendly/Responsive Design."

## User Scenarios & Testing (mandatory)

### User Story 1 - Task Organization (Priority: P1)

As a user, I want to set due dates and priorities for my tasks so that I can organize my work effectively and focus on what's most important.

**Why this priority**: Core productivity enhancement. Essential for managing a growing list of tasks.

**Independent Test**: Create a task with a high priority and a due date. Verify that the visual indicators (red badge for priority, date display) appear correctly on the TaskCard.

**Acceptance Scenarios**:

1. **Given** a new task form, **When** I select "High" priority and a date 3 days in the future, **Then** the task should be created with a red priority badge and the selected due date.
2. **Given** an existing task, **When** the due date has passed, **Then** the due date text on the TaskCard should be displayed in red.

---

### User Story 2 - Task Prioritization (Priority: P1)

As a user, I want to pin important tasks and sort by priority so that my most critical work is always at the top of my list.

**Why this priority**: Ensures users don't lose track of critical items.

**Independent Test**: Pin a task at the bottom of the list. Verify it moves to the very top. Change priorities of other tasks and verify they sort correctly below the pinned tasks.

**Acceptance Scenarios**:

1. **Given** a list of multiple tasks, **When** I click the "Pin" icon on a task, **Then** that task should immediately move to the top of the list.
2. **Given** multiple unpinned tasks, **When** I sort by priority, **Then** "High" tasks should appear before "Medium", and "Medium" before "Low".

---

### User Story 3 - Visual Preference & Accessibility (Priority: P2)

As a user, I want to toggle between dark and light modes so that the application is comfortable to use in different lighting conditions.

**Why this priority**: Significant UX improvement and standard feature for modern web apps.

**Independent Test**: Click the theme toggle in the Navbar. Verify all components (background, cards, text) update their styling immediately and the preference persists after a page reload.

**Acceptance Scenarios**:

1. **Given** the app is in light mode, **When** I click the theme toggle, **Then** the app should transition smoothly to dark mode.
2. **Given** I have set the app to dark mode, **When** I refresh the page, **Then** the app should remain in dark mode.

---

### User Story 4 - Error Recovery (Priority: P2)

As a user, I want to be able to undo a task deletion within 5 seconds so that I can recover from accidental deletions without data loss.

**Why this priority**: Essential safety feature to prevent data loss and improve user confidence.

**Independent Test**: Delete a task. Verify a toast appears with an "Undo" button. Click "Undo" within 5 seconds and verify the task reappears.

**Acceptance Scenarios**:

1. **Given** a task is deleted, **When** I click "Undo" in the toast notification within 5 seconds, **Then** the task should be restored to the list.
2. **Given** a task is deleted, **When** 5 seconds pass without clicking "Undo", **Then** the toast should disappear and the deletion should be permanent.

---

### User Story 5 - Responsive Mobile Experience (Priority: P1)

As a user, I want to use the application on my mobile phone as easily as on my desktop so that I can manage my tasks on the go.

**Why this priority**: Mobile usage is a primary requirement for modern productivity tools.

**Independent Test**: Open the application on an iPhone SE (375px viewport). Verify the layout is vertical, buttons are large enough to touch, and there is no horizontal scrolling.

**Acceptance Scenarios**:

1. **Given** a mobile screen size, **When** I view the task list, **Then** the TaskCards should stack vertically and fill the screen width.
2. **Given** a mobile screen size, **When** I open a modal, **Then** it should appear full-screen for easier interaction.

## Requirements (mandatory)

### Functional Requirements

#### 1. Due Date / Deadline
- **FR-001**: System MUST allow users to set an optional due date for each task using a mobile-friendly date picker.
- **FR-002**: TaskCard MUST display the due date if set.
- **FR-003**: System MUST display overdue tasks' due dates in red.

#### 2. Priority System
- **FR-004**: System MUST support three priority levels: High, Medium, Low (Default: Medium).
- **FR-005**: TaskCard MUST show a visual indicator (badge): High (Red), Medium (Yellow), Low (Green).
- **FR-006**: System MUST allow sorting tasks by priority level.

#### 3. Pin Important Tasks
- **FR-007**: System MUST allow users to pin/unpin any task via a toggle icon on the TaskCard.
- **FR-008**: Pinned tasks MUST always be displayed at the top of the task list, regardless of other sorting/filtering.

#### 4. Dark / Light Mode
- **FR-009**: System MUST provide a toggle in the Navbar to switch between Dark and Light modes.
- **FR-010**: System MUST respect the user's system theme preference by default.
- **FR-011**: System MUST save the theme preference in `localStorage`.
- **FR-012**: All UI components MUST support both Dark and Light themes with smooth transitions.

#### 5. Undo Delete
- **FR-013**: System MUST show a toast notification with an "Undo" button when a task is deleted.
- **FR-014**: System MUST wait 5 seconds before permanently deleting the task from the backend.
- **FR-015**: System MUST restore the task immediately if "Undo" is clicked.
- **FR-016**: System MUST only display one "Undo" toast at a time.

#### 6. Mobile Friendly / Responsive Design
- **FR-017**: All pages MUST be fully responsive from 320px to 1920px width.
- **FR-018**: Touch targets (buttons, links) MUST have a minimum size of 44x44px on mobile devices.
- **FR-019**: Modals MUST display in full-screen mode on mobile devices.
- **FR-020**: The application MUST NOT have horizontal scrolling on any supported screen size.

### Key Entities

- **Task**:
    - `due_date`: Date (Optional)
    - `priority`: Enum (High, Medium, Low)
    - `is_pinned`: Boolean (Default: False)
- **User Preference**:
    - `theme`: Enum (Light, Dark, System)

## Success Criteria (mandatory)

### Measurable Outcomes

- **SC-001**: Users can set a due date and priority for a task in under 10 seconds.
- **SC-002**: Pinned tasks remain at the top of the list after page refresh.
- **SC-003**: Theme preference is correctly loaded and applied within 100ms of page load.
- **SC-004**: "Undo" functionality restores a task to its exact previous state (including priority, due date, and pin status).
- **SC-005**: Application achieves a Lighthouse Mobile Accessibility score of > 90.
- **SC-006**: Zero horizontal scrolling issues reported on iPhone SE, iPad, and Desktop (1440px).

## Assumptions

- **A-001**: The backend will be updated to store `due_date`, `priority`, and `is_pinned` fields.
- **A-002**: The "Undo Delete" logic will likely involve a client-side delay before calling the delete API, or a "soft-delete" mechanism in the backend.
- **A-003**: Standard browser `localStorage` is available for saving theme preferences.
