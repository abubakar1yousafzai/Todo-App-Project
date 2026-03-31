# Quickstart: UI Redesign

## Setup Frontend
1. Navigate to `frontend/`:
   ```bash
   cd frontend
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```

## Development Workflow
- **Styles**: All UI components use Tailwind CSS. Custom Soft UI shadows are in `globals.css`.
- **Icons**: Use `lucide-react` only.
- **Font**: Inter is automatically handled by Next.js `font/google`.
- **Testing**:
  ```bash
  npm test
  ```
  Ensure all 73 existing tests pass after each phase of redesign.

## Core Files to Modify
- `app/globals.css`: The root of the Soft UI look.
- `hooks/useTasks.ts`: Core logic for search/filter and undo.
- `components/tasks/TaskCard.tsx`: Primary component for redesign.
