# Specification: Taskly Landing Page

## 1. Route Logic Update
**Intent**: To provide a dedicated landing experience for new users while maintaining access to the dashboard for existing users.
**Success Criteria**:
- Unauthenticated users accessing `/` see the landing page.
- Authenticated users accessing `/` are redirected to `/dashboard`.
- No separate `/landing` route exists.
**Constraints**:
- Must integrate with the existing authentication check.
**Non-Goals**:
- Changes to the backend authentication logic.
---
## 2. General Style System
**Intent**: To establish a professional, consistent visual identity for the landing page.
**Success Criteria**:
- All elements follow the defined color palette and typography.
- Layout remains consistent across mobile and desktop breakpoints.
**Constraints**:
- Background: #F8F9FB
- Primary: Orange gradient (#FF6A00 → #FF8C42)
- Font: Inter
- Responsive design: 375px to 1920px.
**Non-Goals**:
- Custom design tokens outside the specified system.
---
## 3. Navbar Section
**Intent**: To provide easy navigation and clear access to the signup flow.
**Success Criteria**:
- Sticky positioning with subtle shadow on scroll.
- "Features" link enables smooth scrolling.
- "Get Started" redirects to `/signup`.
**Constraints**:
- Mobile view features a hamburger menu.
**Non-Goals**:
- Advanced navigation features like search or complex flyouts.
---
## 4. Hero Section
**Intent**: To capture user interest immediately and provide a clear value proposition.
**Success Criteria**:
- Visible value proposition with clear CTAs.
- App preview card effectively communicates functionality.
- Social proof section is displayed prominently.
**Constraints**:
- Must be mobile-responsive.
- **Hero Right Preview**: Include a realistic app mock UI card:
  - White background, rounded corners (16px–20px), soft shadow, browser-style top bar (3 dots + "taskly.app").
  - Inside: 3-column stats row (All, Completed, Pending, High Priority), task list with priority bars, checkboxes (checked for completed), task titles, due dates, and pin icons.
  - Floating toast notification at bottom: "Task Completed!" (light green background, rounded, shadow).
- **Social Proof**: Display user avatars with star ratings under hero CTAs.
**Non-Goals**:
- Real-time data or live interactive app elements.
---
## 5. Stats Strip
**Intent**: To quickly communicate the benefits and simplicity of Taskly.
**Success Criteria**:
- Four distinct, clearly readable stats displayed horizontally.
- Clean typography with light dividers.
**Constraints**:
- Center-aligned.
**Non-Goals**:
- Dynamic data updates (static display).
---
## 6. Features Section
**Intent**: To highlight the key capabilities of Taskly without clutter.
**Success Criteria**:
- Grid display (2 rows × 3 columns) of feature cards.
- Cards exhibit hover lift effects.
**Constraints**:
- Cards use orange soft backgrounds for feature icons inside soft rounded squares.
- Very subtle border and soft shadow on cards.
- Must be visually distinct and readable.
**Non-Goals**:
- Detailed documentation of each feature (keep summaries concise).
---
## 7. How It Works Section
**Intent**: To lower the barrier to entry by showing simplicity.
**Success Criteria**:
- Three clear steps presented horizontally.
- Use of orange number badges.
**Constraints**:
- Center-aligned layout.
**Non-Goals**:
- Complex animation sequences.
---
## 8. Testimonials Section
**Intent**: To build trust through social proof.
**Success Criteria**:
- Display of three distinct testimonials with star ratings and user info.
**Constraints**:
- Testimonials consist of mock data.
- Include circular avatar (initials) for each user.
- Display name + role below the quote.
**Non-Goals**:
- Real user data or live testimonial feed integration.
---
## 9. CTA Section
**Intent**: To drive final conversions.
**Success Criteria**:
- Prominent orange gradient CTA section.
- Clear button leading to `/signup`.
**Constraints**:
- Full-width design with rounded corners.
**Non-Goals**:
- Multiple competing CTA actions.
---
## 10. Footer
**Intent**: To provide standard site information and copyright notice.
**Success Criteria**:
- Consistent display of logo, name, and copyright info.
**Constraints**:
- Standard responsive footer layout.
**Non-Goals**:
- Complex footer navigation.
---
## 11. Interactions & Animations
**Intent**: To create a modern, polished user experience.
**Success Criteria**:
- All specified interactions and hover effects function as intended.
- Smooth scrolling between sections.
- Responsive design adapts seamlessly to all screen sizes.
**Constraints**:
- Performance must remain high (Lighthouse > 90).
**Non-Goals**:
- Overly complex or resource-intensive animations.
---
## User Scenarios
- **New User**: Lands on `/` -> reads hero -> scrolls to features -> understands simplicity -> clicks "Get Started" -> directed to `/signup`.
- **Existing User**: Lands on `/` -> automatically redirected to `/dashboard`.
- **Responsive User**: Accesses on mobile -> views optimized layout (navbar, stacks).
---
## Assumptions
- Inter font is configured globally and accessible.
- Authentication state is reliably provided by existing hooks/utils.
- Standard Tailwind CSS utility classes are sufficient for all designs.
---
## Success Criteria
- Unauthenticated user sees landing page.
- Authenticated user goes to `/dashboard`.
- "Get Started" redirects to `/signup`.
- All sections (Hero, Stats, Features, How-It-Works, Testimonials, CTA, Footer) render correctly.
- Smooth scroll to Features.
- Fully mobile responsive (375px to 1920px).
- Hover animations and sticky navbar behavior functional.
- Lighthouse score > 90.
