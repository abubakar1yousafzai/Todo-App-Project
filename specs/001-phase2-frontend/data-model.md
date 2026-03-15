# Data Model: Phase 2 Frontend Features

**Scope**: Frontend data representation and validation rules for Todo App.

## Entities

### 1. User
- **Fields**:
  - `id`: string (from Better Auth/DB)
  - `email`: string (validated email format)
  - `name`: string (optional, 2-100 characters)
- **Relationships**:
  - Owns many Tasks.

### 2. Task
- **Fields**:
  - `id`: number (primary key)
  - `user_id`: string (owner reference)
  - `title`: string (1-200 characters, required)
  - `description`: string (optional, max 1000 characters)
  - `completed`: boolean (default: false)
  - `created_at`: string (ISO 8601 timestamp)
  - `updated_at`: string (ISO 8601 timestamp)
- **State Transitions**:
  - `pending` <-> `completed` (toggleable)
  - `created` -> `updated` (on edit)
  - `exists` -> `null` (on delete)

### 3. Session
- **Fields**:
  - `user`: User object
  - `token`: string (JWT)
  - `expires_at`: string (timestamp)

## Validation Rules (Zod Schemas)

### SignupSchema
- `email`: z.string().email()
- `password`: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/)
- `name`: z.string().min(2).optional()

### TaskSchema
- `title`: z.string().min(1).max(200)
- `description`: z.string().max(1000).optional()
