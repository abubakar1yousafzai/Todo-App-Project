# Evolution of Todo - Phase 2 (Frontend)

A modern, full-stack Todo application built with Next.js 16+ and Better Auth. This project demonstrates Spec-Driven Development (SDD) and AI-native implementation practices.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Authentication**: Better Auth (Client-side)
- **Validation**: Zod
- **Testing**: Vitest + React Testing Library
- **Icons**: Lucide React
- **Notifications**: Sonner

## 🛠️ Setup Instructions

### 1. Prerequisites

- Node.js 20 or higher
- npm (installed with Node.js)

### 2. Installation

Clone the repository and navigate to the `frontend` directory:

```bash
cd frontend
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the `frontend` root and configure the following variables:

```env
# Shared secret for JWT signing (must match backend)
BETTER_AUTH_SECRET=your_32_character_secret_here

# Better Auth server URL (usually the same as frontend during dev)
BETTER_AUTH_URL=http://localhost:3000

# Backend FastAPI base URL
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 4. Running Locally

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 🧪 Testing

This project follows Test-Driven Development (TDD). You can run the test suite using Vitest:

```bash
# Run all tests once
npm test -- --run

# Run tests in watch mode
npm test
```

## 🏗️ Project Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components (shadcn/ui and custom).
- `hooks/`: Custom React hooks for Auth and Task management.
- `lib/`: Utility functions and shared library configurations (API, Auth).
- `types/`: TypeScript interfaces and shared types.

## 🔒 Security

- **JWT Authentication**: All API requests are authenticated via a JWT token issued by Better Auth.
- **Data Isolation**: Database operations are scoped to the authenticated `user_id`.
- **Route Protection**: Middleware ensures that only logged-in users can access the `/dashboard`.
