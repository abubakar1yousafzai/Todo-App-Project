# Data Model: UI Redesign

## Task Entity (Existing)
*Mapped from `frontend/types/index.ts`*

| Field | Type | Description |
|-------|------|-------------|
| id | number | Unique task ID |
| user_id | string | Associated user ID |
| title | string | Task title (bold in Soft UI) |
| description | string | Optional detailed description |
| completed | boolean | Toggle state, Green bar in UI |
| due_date | string (ISO) | Optional due date with calendar icon |
| priority | enum | "high" (Red), "medium" (Orange), "low" (Blue) |
| is_pinned | boolean | Pinned status for top-of-list ordering |
| created_at | string | Creation timestamp |
| updated_at | string | Last modification timestamp |

## Component States (Client-side only)

### FilterState
| State | Value | Description |
|-------|-------|-------------|
| searchQuery | string | Current input in SearchBar |
| activeFilter | enum | All / Completed / Pending / High Priority |

### UI Status (Local)
- **lastDeletedTask**: `Task \| null` - Used by `UndoToast` to restore tasks.
- **isUndoVisible**: `boolean` - Controls "Undo" button in Header.
