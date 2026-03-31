---
id: 001
title: Create Phase 2 Features Specification
stage: spec
date: 2026-03-21
surface: agent
model: gemini-2.0-flash
feature: phase2-features
branch: 003-phase2-features
user: abubakar1yousafzai
command: /sp.specify
labels: [spec, phase2, features]
links:
  spec: specs/003-phase2-features/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/003-phase2-features/spec.md
  - specs/003-phase2-features/checklists/requirements.md
tests:
  - Specification Quality Checklist
---

## Prompt

You are a Spec-Driven Development architect. Write `specs/003-phase2-features/specify.md` for new features in "Evolution of Todo" project. ## Context - Phase 2 Frontend + Backend already complete - Now adding 6 new features - Constitution Version 1.1.0 already ratified ## Template to Follow For EVERY feature use exactly this structure: ## Feature Name **Intent**: Why does this feature exist? **Success Criteria**: - Measurable, testable outcomes **Constraints**: - Technical, performance, UX limits **Non-Goals**: - What we are NOT building --- ## Features to Specify ### 1. Due Date / Deadline - User can set a date for each task - Due date shows on TaskCard - Overdue tasks show in red color - Optional field (not required) - Mobile friendly date picker ### 2. Priority System - Three levels: High / Medium / Low - Default: Medium - Visual indicator on TaskCard: - High → Red badge - Medium → Yellow badge - Low → Green badge - Tasks can be sorted by priority ### 3. Pin Important Tasks - User can pin any task - Pinned tasks always show at TOP of list - Pin icon on TaskCard (toggle pin/unpin) - Visual indicator: pin icon filled when pinned ### 4. Dark / Light Mode - Toggle button in Navbar - Default: system preference - Preference saved in localStorage - Smooth transition between modes - All components must support both modes ### 5. Undo Delete (5 second window) - When task deleted → show toast bottom-left - Toast shows: "Task deleted. Undo?" - Undo button in toast - After 5 seconds → permanent delete - If Undo clicked → task restored immediately - Only ONE undo toast at a time ### 6. Mobile Friendly / Responsive Design - All pages work on mobile (320px to 1920px) - Touch friendly buttons (min 44x44px) - Mobile navigation (hamburger menu if needed) - TaskCard readable on small screens - Modals full screen on mobile - No horizontal scrolling on any screen size - Forms easy to fill on mobile keyboard - Success Criteria: - Works on iPhone SE (375px) ✅ - Works on iPad (768px) ✅ - Works on Desktop (1440px) ✅ - Lighthouse mobile score > 90 ✅ ## Important Rules - Be specific and measurable - Reference existing components - Every feature must work on mobile AND desktop - Non-Goals must prevent scope creep - Add metadata: Version, Phase, Status, Date Write complete specify.md now.

## Response snapshot

Created a comprehensive specification for the 6 requested Phase 2 features (Due Date, Priority, Pinning, Dark Mode, Undo Delete, and Mobile Responsiveness) in `specs/003-phase2-features/spec.md`. The spec follows the project's standard SDD template and includes detailed user scenarios, functional requirements, and measurable success criteria. Also generated a quality checklist in `specs/003-phase2-features/checklists/requirements.md`.

## Outcome

- ✅ Impact: Established a clear and testable specification for the next phase of development.
- 🧪 Tests: Validated against the Specification Quality Checklist.
- 📁 Files: `specs/003-phase2-features/spec.md`, `specs/003-phase2-features/checklists/requirements.md`
- 🔁 Next prompts: /sp.plan to create the technical architecture and implementation tasks.
- 🧠 Reflection: The request was clear, allowing for a high-quality specification without needing further clarification. Informed guesses for standard features like localStorage and system theme defaults were used.

## Evaluation notes (flywheel)

- Failure modes observed: Initial script call failed due to Join-Path positional parameter limits in PowerShell 5.1.
- Graders run and results (PASS/FAIL): PASS (Manual verification of file creation and branch checkout)
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Fix Join-Path usage in the create-new-feature.ps1 script to handle multiple child paths correctly in older PowerShell versions.
