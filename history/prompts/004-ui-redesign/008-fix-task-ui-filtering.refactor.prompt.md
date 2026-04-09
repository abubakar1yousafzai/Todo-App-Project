---
id: 008
title: Fix Task UI and Filtering Logic
stage: refactor
date: 2026-03-31
surface: agent
model: gemini-2.0-pro-exp-02-05
feature: 004-ui-redesign
branch: 004-ui-redesign
user: INSPIRE COMP
command: Refactor Task UI and Filtering
labels: ["refactor", "ui-fixes", "stats-cards", "filtering"]
links:
  spec: specs/004-ui-redesign/spec.md
  plan: specs/004-ui-redesign/plan.md
  tasks: specs/004-ui-redesign/tasks.md
files:
 - frontend/app/dashboard/page.tsx
 - frontend/components/tasks/StatsCards.tsx
 - frontend/components/tasks/SearchBar.tsx
 - frontend/components/tasks/AddTaskInput.tsx
 - frontend/hooks/useTasks.tsx
 - frontend/components/tasks/TaskCard.tsx
 - frontend/app/dashboard/page.test.tsx
tests:
 - frontend/app/dashboard/page.test.tsx
 - all frontend unit tests
---

## Prompt

Update and fix the existing Task Management UI with the following improvements and bug fixes:
... (list of layout fixes, stats cards improvements, remove redundancy, functionality fixes, state management, UX improvements) ...

## Response snapshot

- Moved SearchBar directly below "Dashboard" heading.
- Replaced 3 stats cards with 4 compact filtering cards (All, Completed, Pending, High Priority).
- Removed redundant FilterTabs component.
- Fixed AddTaskInput to prevent empty submissions and support instant additions with priority/date.
- Updated useTasks hook to support the new "Pending" filter and ensure immediate UI updates.
- Refined TaskCard with data-testids and fixed interaction logic.
- Updated unit tests to match new UI structure.

## Outcome

- ✅ Impact: Significantly improved UX with a cleaner layout and integrated filtering.
- 🧪 Tests: 75/75 passed
- 📁 Files: page.tsx, StatsCards.tsx, SearchBar.tsx, AddTaskInput.tsx, useTasks.tsx, TaskCard.tsx, page.test.tsx
- 🔁 Next prompts: none
- 🧠 Reflection: Using the StatsCards as the primary filtering mechanism reduces UI clutter while maintaining full functionality. Adding data-testids to custom buttons improved test stability.

## Evaluation notes (flywheel)

- Failure modes observed: Initial test failure due to missing filter-tabs testid.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): none
