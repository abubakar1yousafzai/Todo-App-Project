---
id: 011
title: Explain .gitignore and database exclusion
stage: explainer
date: 2026-03-25
surface: agent
model: gemini-2.0-flash
feature: 002-phase2-backend
branch: main
user: user
command: none
labels: ["gitignore", "database", "security", "best-practices"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - backend/.gitignore
tests:
  - none
---

## Prompt

ye jau tumna chiza isma likha ha wau kiu likha ha aur Database wala kiu likha ha ham ye data base wala github pr nhi dalanga kiya?

## Response snapshot

I explained the reasoning behind .gitignore patterns, specifically focusing on security, merge conflicts, and the distinction between data and structure for database files. I advised that models and schemas should be shared instead of raw .db files.

## Outcome

- ✅ Impact: User educated on Git best practices and security regarding database files.
- 🧪 Tests: none
- 📁 Files: none (explanation only)
- 🔁 Next prompts: Continue with development tasks.
- 🧠 Reflection: Users often confuse the need for data with the need for structure. Explaining migrations/models vs. raw data is crucial.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): none
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
