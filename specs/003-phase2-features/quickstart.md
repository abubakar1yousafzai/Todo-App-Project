# Quickstart: Phase 2 Feature Set

## Overview
This phase adds 6 new features to the Evolution of Todo app:
1. Due Date / Deadline
2. Priority System
3. Pin Tasks
4. Dark / Light Mode
5. Undo Delete
6. Mobile Friendly / Responsive Design

## Backend Setup
1. **Database Migration**: Ensure the `Task` table is updated with `due_date`, `priority`, and `is_pinned` fields. SQLModel handles this automatically via `create_all` if using the existing development database setup.
2. **Dependencies**: No new backend dependencies required.
3. **Run**: 
   ```bash
   cd backend
   uv run uvicorn main:app --reload
   ```

## Frontend Setup
1. **Dependencies**: Install `next-themes` and `lucide-react` (if not already present).
   ```bash
   cd frontend
   npm install next-themes
   ```
2. **Environment**: Ensure `.env.local` contains correct backend URL.
3. **Run**:
   ```bash
   cd frontend
   npm run dev
   ```

## Testing New Features
- **Due Date**: Create a task and set a date. Verify it shows on the card.
- **Priority**: Change priority and verify badge color (Red/Yellow/Green).
- **Pinning**: Pin a task and verify it moves to the top.
- **Dark Mode**: Click the sun/moon icon in the Navbar.
- **Undo Delete**: Delete a task and click "Undo" in the toast.
- **Mobile**: Resize browser to 375px or use DevTools device emulator.
