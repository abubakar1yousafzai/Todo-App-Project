---
id: 003
title: Create UI Redesign Implementation Plan
stage: plan
date: 2026-03-31
surface: agent
model: gemini-2.0-pro-exp-02-05
feature: 004-ui-redesign
branch: 004-ui-redesign
user: INSPIRE COMP
command: /sp.plan
labels: ["plan", "ui-redesign", "soft-ui", "architecture"]
links:
  spec: specs/004-ui-redesign/spec.md
  plan: specs/004-ui-redesign/plan.md
  research: specs/004-ui-redesign/research.md
  data_model: specs/004-ui-redesign/data-model.md
  quickstart: specs/004-ui-redesign/quickstart.md
files:
 - specs/004-ui-redesign/plan.md
 - specs/004-ui-redesign/research.md
 - specs/004-ui-redesign/data-model.md
 - specs/004-ui-redesign/quickstart.md
 - GEMINI.md
tests:
 - none
---

## Prompt

You are a Spec-Driven Development architect. 
Write `specs/004-ui-redesign/plan.md` for 
UI Redesign of "Evolution of Todo" project.

## Context
- specify.md already approved
- Phase 2 complete, all features working
- Only frontend changes needed
- No backend changes required

## Existing Files to UPDATE (not recreate):
- frontend/app/globals.css
- frontend/app/layout.tsx
- frontend/components/layout/Navbar.tsx
- frontend/components/tasks/TaskCard.tsx
- frontend/components/tasks/TaskList.tsx
- frontend/components/tasks/TaskModal.tsx
- frontend/components/tasks/UndoToast.tsx
- frontend/app/dashboard/page.tsx
- frontend/app/login/page.tsx
- frontend/app/signup/page.tsx
- frontend/hooks/useTasks.ts

## Template to Follow EXACTLY
Use 4-part structure:

## Part 1: Reference Architecture Analysis
Research:
- Neumorphism/Soft UI implementation with Tailwind CSS
- How to add Inter font in Next.js
- Real-time search filtering in React
- Filter tabs pattern in React
- Stats cards with dynamic counts
- Colored left border on cards with Tailwind

## Part 2: Current Architecture Analysis
- What exists currently
- What needs to change in each file
- Which components need major vs minor updates

## Part 3: Implementation Plan
Break into clear phases:
- Phase 1: Design System Setup
- Phase 2: Layout & Navbar
- Phase 3: Dashboard Page
- Phase 4: Stats Cards
- Phase 5: Search & Filter
- Phase 6: Add Task Section
- Phase 7: TaskCard Redesign
- Phase 8: TaskModal Redesign
- Phase 9: Login/Signup Pages
- Phase 10: Animations & Polish

## Part 4: Implementation Checklist

... (rest of the prompt checklist omitted for brevity but preserved in context) ...

## New Files to Create
- frontend/components/tasks/StatsCards.tsx
- frontend/components/tasks/SearchBar.tsx
- frontend/components/tasks/FilterTabs.tsx
- frontend/components/tasks/AddTaskInput.tsx

## Constraints
- Tailwind CSS only (no custom CSS except globals.css)
- shadcn/ui for modals and dialogs
- lucide-react for icons
- Inter font
- No backend changes
- All existing tests must pass

## Success Criteria
- Stats show correct dynamic counts
- Search filters in real-time
- Filter tabs work correctly
- TaskCard has colored left bar
- Modal is 2-column centered
- Animations smooth
- Mobile responsive 375px+
- All 73 tests passing

Write complete plan.md now using 4-part template.

## Response snapshot

Created a 10-phase implementation plan for the Soft UI redesign. Developed research.md for design system choices, data-model.md for UI state mapping, and quickstart.md for developer setup. Updated the agent context to reflect new UI tech choices.

## Outcome

- ✅ Impact: Established a structured, phased roadmap for transforming the UI without breaking existing functionality.
- 🧪 Tests: none
- 📁 Files: specs/004-ui-redesign/plan.md, specs/004-ui-redesign/research.md, specs/004-ui-redesign/data-model.md, specs/004-ui-redesign/quickstart.md, GEMINI.md
- 🔁 Next prompts: /sp.tasks
- 🧠 Reflection: Separating the "Soft UI" design system setup (Phase 1) from component-specific redesigns ensures visual consistency across the entire project.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): none
