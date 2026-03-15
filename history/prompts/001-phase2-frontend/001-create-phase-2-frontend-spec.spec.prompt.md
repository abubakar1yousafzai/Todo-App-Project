---
id: 001
title: Create Phase 2 Frontend Specification
stage: spec
date: 2026-03-04
surface: agent
model: gemini-2.0-flash
feature: 001-phase2-frontend
branch: 001-phase2-frontend
user: desktop-b8ssd5m\inspire comp
command: sp.specify
labels: ["phase-2", "frontend", "specification", "nextjs", "better-auth"]
links:
  spec: specs/001-phase2-frontend/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-phase2-frontend/spec.md
  - specs/001-phase2-frontend/checklists/requirements.md
tests:
  - none
---

## Prompt

Write a Phase 2 Frontend of my "Evolution of Todo" project.
## Context
- Phase 1 (Python console app with in-memory storage) is already complete
- Now building ONLY the Next.js frontend for Phase 2
- Backend (FastAPI) will be built separately after frontend spec is approved
- Constitution Version 1.1.0 is already ratified
## Technology
- Next.js 16+ (App Router), TypeScript, Tailwind CSS
- Better Auth (client-side authentication)
- npm for package management
## Template to Follow
For EVERY feature, use exactly this structure:
## Feature Name
**Intent**: Why does this feature exist? What user problem does it solve?
**Success Criteria**:
- Bullet list of measurable, testable outcomes
**Constraints**:
- Technical, performance, security, UX limits
**Non-Goals**:
- What we are explicitly NOT building in this feature
---
## Features to Specify (write all of these)
1. User Registration Page (/signup)
2. User Login Page (/login)
3. Dashboard / Task List Page (/dashboard)
4. Add Task (form/modal on dashboard)
5. Edit Task (inline or modal)
6. Delete Task (with confirmation)
7. Mark Task Complete / Incomplete (toggle)
8. Navigation & Layout (header, protected routes, logout)
## Important Rules
- Be specific and measurable in Success Criteria (not vague like "works correctly")
- Constraints must include: response time, validation rules, UX behavior, accessibility
- Non-Goals must prevent scope creep (no AI, no Kubernetes, no chatbot in Phase 2)
- Every feature must reference that it calls the backend REST API (even though backend is built later - frontend will use mock data or API calls)
- Add metadata at top: Version, Phase, Status, Date
## Write this section: Better Auth Configuration
Cover ALL of these points using the template above:
### Signup
- Email format validation
- Password rules (minimum length, uppercase, number required)
- Duplicate email prevention with clear user-friendly error message
- Response time < 200ms
### Login
- Email + password authentication
- Invalid credentials error (never reveal which field is wrong)
- Response time < 200ms
- Session creation after successful login
### JWT Token
- Token issued after successful login
- Shared secret: BETTER_AUTH_SECRET (same used by FastAPI backend)
- Token must be attached to every /api/* request in Authorization header
### Session Management
- Protected routes redirect to /login if no session
- Logout clears session and token
- Session persists on page refresh
### Error Messages
- All errors must be user-friendly (no technical details exposed)
- Examples:
- "Email already registered" (duplicate signup)
- "Invalid email or password" (wrong credentials)
- "Too many attempts, please try again later" (rate limit)
## Non-Goals for Better Auth
- Phone number verification — out of scope
- Two-factor authentication — out of scope
- Password reset via email — Phase 3

## Response snapshot

I have created a comprehensive feature specification for the Phase 2 Frontend, covering user authentication (Better Auth) and core task management features. The specification is technology-agnostic where possible but adheres to the requested Next.js/FastAPI context. I also generated a quality checklist to verify the spec's completeness.

## Outcome

- ✅ Impact: Established clear requirements and success criteria for the Phase 2 frontend development.
- 🧪 Tests: None run at this stage.
- 📁 Files: Created specs/001-phase2-frontend/spec.md and specs/001-phase2-frontend/checklists/requirements.md.
- 🔁 Next prompts: "/sp.plan Phase 2 Frontend"
- 🧠 Reflection: The spec-driven approach ensures that authentication and data isolation (via user_id filtering) are considered from the start.

## Evaluation notes (flywheel)

- Failure modes observed: Initial script run failed due to positional argument parsing in PowerShell.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
