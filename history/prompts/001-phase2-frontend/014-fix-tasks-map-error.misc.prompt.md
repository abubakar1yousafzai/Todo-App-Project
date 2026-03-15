---
id: 015
title: Fix "tasks.map is not a function" by handling varied response formats
stage: misc
date: 2026-03-09
surface: agent
model: gemini-2.0-flash
feature: 001-phase2-frontend
branch: 001-phase2-frontend
user: desktop-b8ssd5m\inspire comp
command: null
labels: ["fix", "frontend", "hooks", "api-integration"]
links:
  spec: specs/001-phase2-frontend/spec.md
  plan: specs/001-phase2-frontend/plan.md
  tasks: specs/001-phase2-frontend/tasks.md
  tests: specs/001-phase2-frontend/tests.md
  ticket: null
  adr: null
  pr: null
files:
  - frontend/hooks/useTasks.ts
tests:
  - all 72 tests passed
---

## Prompt

Fix "tasks.map is not a function" error in frontend.

## Problem
Backend GET /api/{user_id}/tasks/ returns 200 OK
but frontend TaskList crashes with:
"tasks.map is not a function"

## Root Cause
Backend returns: {"items": [], "count": 0}
Frontend expects: [] (direct array)

## Fix Required
Update frontend/hooks/useTasks.ts to handle both response formats:
- If response.data is array → use directly
- If response.data has items → use response.data.items
- Default to empty array []

## Response snapshot

I updated `frontend/hooks/useTasks.ts` within the `fetchTasks` callback. Added logic to check if `response.data` is an array or an object containing an `items` array. This ensures the `tasks` state always receives an array, preventing the `.map()` crash. All 72 existing tests passed.

## Outcome

- ✅ Impact: Resolved frontend crash when fetching tasks from a paginated/object-wrapped backend response.
- 🧪 Tests: 72/72 tests passing.
- 📁 Files: Updated `frontend/hooks/useTasks.ts`.
- 🔁 Next prompts: none
- 🧠 Reflection: Defensive data extraction in hooks is crucial when API contracts might evolve or vary (e.g., between direct lists and paginated responses).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
