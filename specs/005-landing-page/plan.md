# Implementation Plan: Taskly Landing Page

## Part 1: Reference Architecture Analysis
Research:
- SaaS landing page patterns using Next.js App Router (responsive, performance-oriented).
- `framer-motion` (if allowed) or CSS transitions for scroll animations and hover effects.
- Tailwind CSS utility classes for complex gradients (orange #FF6A00 to #FF8C42) and soft shadows.
- Next.js sticky navbar implementation using `position: sticky`.
- Smooth scroll behavior using CSS `scroll-behavior: smooth` or `scrollIntoView`.
- Mock UI card design (HTML/CSS layering of absolute/relative elements).
- Auth state management in Next.js using existing Better Auth integration.

## Part 2: Current Architecture Analysis
Current state:
- `frontend/app/page.tsx` redirects to `/dashboard` or `/login`.
- No landing page exists.
- Auth check relies on the `useAuth` hook.

What needs to change:
- `frontend/app/page.tsx` needs logic to check auth and conditionally render `LandingPage` or redirect.
- Creation of `/components/landing/` directory for modular landing page components.
- Global styles in `globals.css` might need minor adjustments for landing-specific requirements.

## Part 3: Implementation Plan
Phase 1: Route Logic & Auth Redirect
Phase 2: Landing Layout & Navbar Component
Phase 3: Hero Section with Mock UI Preview
Phase 4: Stats Strip Component
Phase 5: Features Section (2x3 Grid)
Phase 6: How It Works Section (3-Step Process)
Phase 7: Testimonials Section (Avatars/Initials)
Phase 8: CTA Section & Footer
Phase 9: Animations, Polish & Smooth Scroll
Phase 10: Mobile Responsiveness Audit & Lighthouse Check

## Part 4: Implementation Checklist

### Phase 1: Route Logic
- [ ] Update `frontend/app/page.tsx`:
  - Fetch session (non-blocking).
  - If authenticated → redirect `/dashboard`.
  - If unauthenticated → render `<LandingPage />`.
  - Handle initial load state.

### Phase 2: Landing Navbar
- [ ] Create `frontend/components/landing/LandingNavbar.tsx`:
  - Sticky nav with logo ("Taskly"), features link, and "Get Started" CTA.
  - Transparent-to-white transition on scroll.

### Phase 3: Hero Section
- [ ] Create `frontend/components/landing/Hero.tsx`:
  - Value prop content (Heading, subtext, buttons).
  - Social proof section (avatars/star ratings).
  - App preview card with browser-style top bar and task mock UI.
  - Floating toast notification.

### Phase 4: Stats Strip
- [ ] Create `frontend/components/landing/StatsStrip.tsx`:
  - 4-column row (100% Free, 0 Accounts, ∞ Tasks, <1s Load).

### Phase 5: Features Section
- [ ] Create `frontend/components/landing/Features.tsx`:
  - Features grid (2x3) with soft icon backgrounds and hover-lift effect.

### Phase 6: How It Works
- [ ] Create `frontend/components/landing/HowItWorks.tsx`:
  - 3-step visualization with numbered badges.

### Phase 7: Testimonials
- [ ] Create `frontend/components/landing/Testimonials.tsx`:
  - Cards with avatar (initials), star ratings, name, and quote.

### Phase 8: CTA Section & Footer
- [ ] Create `frontend/components/landing/CTA.tsx`.
- [ ] Create `frontend/components/landing/Footer.tsx`.

### Phase 9: Animations & Polish
- [ ] Implement smooth scroll for anchor links.
- [ ] Add Intersection Observer for section fade-in animations.
- [ ] Configure hover transitions.

### Phase 10: Responsiveness & Audit
- [ ] Validate 375px+ responsiveness.
- [ ] Lighthouse audit (aim > 90).

## New Files to Create
`frontend/components/landing/`
├── LandingNavbar.tsx
├── Hero.tsx
├── StatsStrip.tsx
├── Features.tsx
├── HowItWorks.tsx
├── Testimonials.tsx
├── CTA.tsx
└── Footer.tsx

## Update
- `frontend/app/page.tsx`
