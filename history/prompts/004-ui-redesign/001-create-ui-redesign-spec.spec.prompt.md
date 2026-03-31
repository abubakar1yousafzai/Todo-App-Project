---
id: 001
title: Create UI Redesign Specification
stage: spec
date: 2026-03-31
surface: agent
model: gemini-2.0-pro-exp-02-05
feature: 004-ui-redesign
branch: 004-ui-redesign
user: INSPIRE COMP
command: /sp.specify
labels: ["spec", "ui-redesign", "soft-ui"]
links:
  spec: specs/004-ui-redesign/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/004-ui-redesign/spec.md
 - specs/004-ui-redesign/checklists/requirements.md
tests:
 - none
---

## Prompt

You are a Spec-Driven Development architect. Write `specs/004-ui-redesign/specify.md` for UI Redesign of "Evolution of Todo" project. ## Context - Phase 2 Frontend + Backend complete - Features (due date, priority, pin, dark mode, undo) added - Now redesigning UI to be professional and beautiful - Constitution Version 1.1.0 already ratified ## Template to Follow For EVERY section use exactly this structure: ## Feature Name **Intent**: Why does this feature exist? **Success Criteria**: - Measurable, testable outcomes **Constraints**: - Technical, performance, UX limits **Non-Goals**: - What we are NOT building --- ## Design to Specify ### 1. General Style System - Style: Soft UI (Neumorphism + Minimal) - Background: #F7F7F8 - Border radius: 16px-20px (large rounded corners) - Shadows: soft elevation shadows - Font: Inter (Google Fonts) - Spacing: clean, consistent padding - Colors: - Primary: Orange (#F97316) - Success: Green (#16A34A) - Danger: Red (#EF4444) - Muted: Gray (#6B7280) - White: #FFFFFF - Background: #F7F7F8 ### 2. Header Section Left side: - Rounded orange square icon with white checklist - Title: "My Tasks" (bold, large) - Subtitle: "X total tasks" (small, muted gray, dynamic count) Right side: - "Undo" button: - Pill shape - Light gray background - Back arrow icon - Hover effect - Only visible when deleted task available ### 3. Stats Cards (3 cards in a row) Card 1 - Completed: - Background: light green - Icon: check circle - Number: dynamic count - Label: "Completed" Card 2 - High Priority: - Background: light red/pink - Icon: warning triangle - Number: dynamic count - Label: "High Priority" Card 3 - Incomplete: - Background: light orange/yellow - Icon: empty circle - Number: dynamic count - Label: "Incomplete" All cards: - Equal width (1/3 each) - Rounded corners (16px) - Soft shadow - Center aligned content - Dynamic numbers from task list ### 4. Search + Filter Section Search Bar: - Full width input - Placeholder: "Search tasks..." - Left: search icon - Rounded edges - Light background - Real-time filtering as user types - Instant task list update Filter Tabs (horizontal pills): - All - Completed - Pending - High Priority Active tab: - Filled orange background - White text Inactive tab: - Light gray background - Dark text - Smooth transition Behavior: - All → show all tasks - Completed → completed tasks only - Pending → incomplete tasks only - High Priority → high priority only ### 5. Add Task Section Large rounded container: - White/light gray background Inside: - Input field: - Placeholder: "Add a new task..." - Full width, rounded - Orange "+" circular button (right side) Below input: - Priority selector pills: - High / Med / Low - Active: filled orange - Inactive: gray outline - Due date button: - Rounded, small - Calendar icon + "Due date" text ### 6. Task List Each task card: - White card, rounded corners, soft shadow - Left: vertical colored bar: - Red → High priority - Orange → Medium priority - Green → Completed - Checkbox (circle, empty or checked) - Task title (bold) - Below title: due date (small, gray, calendar icon) - Right side buttons: - Pin icon (filled when pinned) - Delete icon - Edit icon (optional) - Pinned tasks always at TOP - Hover: slight elevation + border highlight ### 7. Interactions & Animations - Search typing → instant filter - Filter tab click → instant update - Checkbox click → mark complete + green bar - Pin click → move to top instantly - Add task → appears instantly in list - Priority change → colored bar updates - Undo button → restore last deleted task - Smooth transitions on all interactions - Cards fade in on load - Hover: translateY(-2px) lift ### 8. Mobile Responsive - Works 320px to 1920px - Stats cards: 3 in row on desktop, stack on mobile - Touch friendly buttons (min 44x44px) - Search bar full width on mobile - Filter tabs scrollable on mobile - Task cards readable on 375px - No horizontal scroll ## Files to Update - frontend/app/globals.css - frontend/app/layout.tsx - frontend/components/layout/Navbar.tsx - frontend/components/tasks/TaskCard.tsx - frontend/components/tasks/TaskList.tsx - frontend/components/tasks/TaskModal.tsx - frontend/components/tasks/UndoToast.tsx - frontend/app/dashboard/page.tsx - frontend/app/login/page.tsx - frontend/app/signup/page.tsx - frontend/hooks/useTasks.ts (search + filter logic) ## Constraints - Tailwind CSS only - shadcn/ui components - No backend changes - Inter font from Google Fonts - Orange as primary accent color - All existing functionality must work - Mobile first approach ## Success Criteria - Stats cards show dynamic counts ✅ - Search filters tasks in real-time ✅ - Filter tabs work correctly ✅ - Task cards have colored left bar ✅ - Pinned tasks always on top ✅ - Undo button restores deleted task ✅ - Responsive on all screen sizes ✅ - Smooth animations on all interactions ✅ - Lighthouse score > 90 ✅ ## Non-Goals - No backend changes - No new features beyond listed - No third party UI libraries except shadcn/ui - No dark mode in this redesign Write complete specify.md now.

## Response snapshot

Created feature branch 004-ui-redesign, wrote initial specification including Soft UI requirements, real-time search, and dynamic stats cards. Added a quality checklist and posed three clarification questions regarding task count, dark mode, and edit functionality.

## Outcome

- ✅ Impact: Established a clear, testable specification for the UI Redesign feature.
- 🧪 Tests: none
- 📁 Files: specs/004-ui-redesign/spec.md, specs/004-ui-redesign/checklists/requirements.md
- 🔁 Next prompts: /sp.clarify (to resolve pending questions), then /sp.plan
- 🧠 Reflection: Detailed user input made it easy to create a comprehensive spec, though balancing technical constraints (Tailwind, shadcn) with specification-level abstraction is key.

## Evaluation notes (flywheel)

- Failure modes observed: create-new-feature.ps1 failed on Join-Path with too many arguments.
- Graders run and results (PASS/FAIL): PASS (manual validation)
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Update create-new-feature.ps1 to handle multi-segment Join-Path correctly.
