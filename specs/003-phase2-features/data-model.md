# Data Model: Phase 2 Feature Set

## Task Entity (Updated)

| Field | Type | Description | Default | Constraints |
|-------|------|-------------|---------|-------------|
| id | Integer | Unique identifier (Primary Key) | Auto-increment | Required |
| user_id | String | Reference to the owner | null | Required, Indexed |
| title | String | Task title | null | Required, Max 200 chars |
| description | String | Task details | null | Optional, Max 1000 chars |
| completed | Boolean | Status of completion | false | Required |
| due_date | DateTime | Optional task deadline | null | Optional |
| priority | String | Priority level | "medium" | "high", "medium", "low" |
| is_pinned | Boolean | Pin task at top | false | Required |
| created_at | DateTime | Creation timestamp | now() | Required |
| updated_at | DateTime | Last update timestamp | now() | Required |

## State Transitions

### Task Priority
- Default: `medium`
- Possible: `high`, `medium`, `low`
- Any task can be updated to any priority level at any time.

### Pin Status
- Default: `false`
- Possible: `true`, `false`
- Toggled by user interaction.

### Undo Delete (Client-side)
1. User clicks Delete.
2. Task state transitions to `deleted` (locally removed from list).
3. 5-second timer starts.
4. If Undo clicked: Task state transitions back to `active`.
5. If Timer expires: Final delete API call is made.
