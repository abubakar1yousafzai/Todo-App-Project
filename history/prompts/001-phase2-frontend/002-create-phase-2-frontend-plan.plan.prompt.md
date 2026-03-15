---
id: 002
title: Create Phase 2 Frontend Implementation Plan
stage: plan
date: 2026-03-06
surface: agent
model: gemini-2.0-flash
feature: 001-phase2-frontend
branch: 001-phase2-frontend
user: desktop-b8ssd5m\inspire comp
command: sp.plan
labels: ["phase-2", "frontend", "planning", "nextjs", "better-auth", "contracts"]
links:
  spec: specs/001-phase2-frontend/spec.md
  plan: specs/001-phase2-frontend/plan.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-phase2-frontend/plan.md
  - specs/001-phase2-frontend/research.md
  - specs/001-phase2-frontend/data-model.md
  - specs/001-phase2-frontend/contracts/openapi.yaml
  - specs/001-phase2-frontend/quickstart.md
tests:
  - none
---

## Prompt

/sp.plan 

You are a Spec-Driven Development architect. Write a Phase 2 Frontend of my "Evolution of Todo" project.

## Context
- Now writing the HOW — technical plan for implementation
- Building ONLY Next.js frontend
- Backend (FastAPI) will be built separately

## Technology
- Next.js 16+ (App Router), TypeScript, Tailwind CSS
- Better Auth (client-side authentication)
- npm for package management

## Template to Follow
For EVERY section use this structure:

### Section Name
**Decision**: What we are doing
**Reasoning**: Why we chose this approach
**Linked Requirements**: FR-001, FR-002 (reference from specify.md)

---

## Sections to Cover

### 1. Folder Structure
Write the complete folder structure for the Next.js project:
- /app directory (all pages and layouts)
- /components directory (all reusable components)
- /lib directory (api client, auth helpers)
- /types directory (TypeScript interfaces)
- /hooks directory (custom React hooks)

### 2. Pages Plan
For each page write:
- Page path
- Purpose
- Components used on this page
- Protected or public route

Pages to cover:
- /signup
- /login
- /dashboard

### 3. Component Breakdown
List every component that needs to be built:

For each component write:
- Component name
- Purpose
- Props it accepts
- Which page uses it
- Linked FR from specify.md

Components to cover:
- AuthForm (signup/login form)
- Navbar (header with logout)
- TaskList (list of all tasks)
- TaskCard (single task item)
- TaskModal (add/edit task form)
- DeleteConfirmDialog (confirmation before delete)
- ProtectedRoute (redirect if not authenticated)

### 4. API Integration Plan
- Create lib/api.ts file plan
- Base URL configuration from environment variable
- JWT token attachment to every /api/* request (Authorization: Bearer)
- Mock data strategy (for when backend is not ready)

Write the function signatures for:
- getTasks(userId)
- createTask(userId, title, description)
- updateTask(userId, taskId, data)
- deleteTask(userId, taskId)
- toggleComplete(userId, taskId)

### 5. Better Auth Integration Plan
- How Better Auth is initialized in Next.js
- Where session is stored
- How JWT token is extracted from session
- How protected routes work (middleware.ts)
- Environment variables needed:
  - BETTER_AUTH_SECRET
  - BETTER_AUTH_URL
  - NEXT_PUBLIC_API_URL

### 6. State Management Plan
- How task list state is managed (useState/useReducer)
- How auth session state flows through the app
- Where loading and error states are handled

### 7. Error Handling Strategy
Map every error to a user-friendly message:
- Duplicate email → "Email already registered"
- Wrong credentials → "Invalid email or password"
- Network error → "Something went wrong, please try again"
- Unauthorized (401) → Redirect to /login
- Not found (404) → "Task not found"

### 8. TypeScript Interfaces
Write the TypeScript interfaces for:
- User
- Task
- Session
- ApiResponse
- TaskFormData

## Important Rules
- Every decision must reference FR numbers from specify.md
- Be specific — gemini cli will use this plan to generate actual code
- No vague statements like "handle errors properly"
- Folder structure must be complete and accurate
- Add metadata at top: Version, Phase, Status, Date

## Response snapshot

I have developed a detailed technical implementation plan for the Phase 2 Frontend. This includes a clear folder structure, page-by-page component breakdown, API integration strategy (JWT focused), Better Auth configuration, and TypeScript definitions. I've also established the data model and API contracts (OpenAPI) to ensure seamless future backend integration.

## Outcome

- ✅ Impact: Provided a comprehensive roadmap for implementation, ensuring technical consistency and requirement traceability.
- 🧪 Tests: None required for the planning phase.
- 📁 Files: Created plan.md, research.md, data-model.md, openapi.yaml, and quickstart.md in the feature directory.
- 🔁 Next prompts: "/sp.tasks Phase 2 Frontend"
- 🧠 Reflection: Using shadcn/ui and a centralized API client with JWT interceptors will significantly speed up development while maintaining high code quality.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
