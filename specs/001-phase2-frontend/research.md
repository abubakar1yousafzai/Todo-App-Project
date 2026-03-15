# Research: Phase 2 Frontend Features

**Feature Context**: Next.js 16+ Frontend for Todo App with Better Auth.

## Decisions

### 1. UI Component Library
- **Decision**: shadcn/ui (Tailwind CSS based).
- **Rationale**: Industry standard for Next.js projects; provides high-quality, accessible components that are fully customizable (via code copy/paste).
- **Alternatives considered**: Material UI (too heavy/opinionated), Headless UI (requires more styling effort).

### 2. Client-Side Authentication Flow
- **Decision**: Better Auth with JWT.
- **Rationale**: Handles the complexity of session management and JWT issuance. It aligns with the requirement to share a secret with the FastAPI backend.
- **Alternatives considered**: NextAuth.js (good but Better Auth is specifically requested and highly modular).

### 3. API Client Pattern
- **Decision**: Native `fetch` wrapper in `lib/api.ts`.
- **Rationale**: Minimal footprint; easy to inject headers (JWT) for all requests. Works well with Next.js server/client components.
- **Alternatives considered**: Axios (adds extra weight without significant benefit for this use case).

### 4. Route Protection
- **Decision**: Next.js Middleware + React Context.
- **Rationale**: Middleware provides server-side redirects for initial loads; Context/Hooks provide smooth client-side transitions and state.
- **Alternatives considered**: Higher-Order Components (HOCs) - more verbose and less modern than Hooks/Middleware.

## Best Practices
- **Folder Structure**: Feature-based or atomic design inside `/components`.
- **Error Handling**: Use `error.tsx` for runtime errors and Toast notifications for API failures.
- **Validation**: `Zod` for schema-based validation in forms.
