# Tests: Taskly Landing Page

## 1. Route Logic Tests (`frontend/app/page.test.tsx`)
**Goal**: Verify correct redirection based on auth state.

- **Test 1: Redirect Authenticated User**
  - Setup: Mock `useAuth` hook to return `{ user: { id: '1' }, isAuthenticated: true }`.
  - Action: Render `<Page />`.
  - Expectation: Component should trigger a redirect to `/dashboard`.

- **Test 2: Show Landing Page for Unauthenticated User**
  - Setup: Mock `useAuth` hook to return `{ user: null, isAuthenticated: false }`.
  - Action: Render `<Page />`.
  - Expectation: Component should render the `LandingPage` content (Hero section, Navbar, etc.).

## 2. Component Logic Tests (`frontend/components/landing/LandingNavbar.test.tsx`)
**Goal**: Verify navigation and UI state.

- **Test 3: Navbar Navigation Links**
  - Setup: Render `<LandingNavbar />`.
  - Action: Find "Features" link and "Get Started" button.
  - Expectation: Verify `href` attributes point to `#features` and `/signup`.

- **Test 4: Mobile Hamburger Menu**
  - Setup: Render `<LandingNavbar />` in mobile viewport.
  - Action: Click hamburger button.
  - Expectation: Menu items become visible.

## 3. UI Component Interaction Tests (`frontend/components/landing/Hero.test.tsx`)
**Goal**: Verify CTA interactions.

- **Test 5: Hero CTA Buttons**
  - Setup: Render `<Hero />`.
  - Action: Click "Start Free" button.
  - Expectation: Verify navigation event to `/signup`.
