# 🤖 AI_FEATURE_Project-Layout

> Use with `./ai/ai-spec.md`. The global spec governs scope, tech constraints, and conventions; this document covers only the Project Layout (header, footer, and shared chrome) feature.

---

## Feature Identity

- **Feature Name:** Project Layout — Header, Footer, and Navigation
- **Related Area:** Frontend / shared UI
- **Grading sheet name:** "Feature - Project layout"

---

## Feature Goal

Give every page the same frame: a fixed header carrying the AI-generated logo and navigation, a footer carrying contact details and a copyright notice, and a navigation model that switches from a horizontal bar on desktop to a bottom icon bar on mobile.

This is the second foundation feature. Every page feature that follows renders inside this chrome and inherits its responsive behaviour, so building it now means Home through Back Office get their layout for free.

---

## Feature Scope

### In Scope (Included)

- A `Main` layout component wrapping all page content between the header and the footer
- A `Header` component, fixed to the top of the viewport, present on every page
- A `Footer` component, present on every page, with contact information and a copyright notice
- The AI-generated logo in the header, linking to Home, with meaningful `alt` text
- Desktop navigation (>768px): horizontal links in the header
- Mobile navigation (≤768px): icon-only links pinned to the bottom of the viewport
- Active-route indication in both navigations
- The global responsive rules — no horizontal overflow, scaling images, stacking sections
- Icons drawn as inline SVG

### Out of Scope (Excluded)

- All page content. Home, Portfolio, Links, Contact, Login, and Back Office remain placeholders and are filled in by their own features.
- Any Supabase interaction. This feature has no data layer.
- Authentication state. The header does not change for a logged-in user; the Back Office feature owns its own logout control.
- The design tokens themselves — the palette, type scale, and spacing already exist in `src/index.css` and `src/App.css` from the design-system work. This feature consumes them and must not redefine them.
- Light/dark theme switching, which is an Extra Mile with its own specification.

---

## Sub-Requirements (Feature Breakdown)

- **A — Main layout.** A `Main` component wraps every route's content between `Header` and `Footer`, so the chrome is declared once rather than repeated per page.
- **B — Header.** Fixed to the top of the viewport, visible while scrolling, with consistent background and styling on every page.
- **C — Navigation links.** Links to the four public pages only: Home, Portfolio, Links, Contact.
- **D — Footer.** On every page, below the page content, containing an email address, social links, and a copyright notice.
- **E — Logo.** The AI-generated logo image renders in the header, clicking it navigates to Home, and it carries descriptive `alt` text. The AI tool used is documented.
- **F — Desktop navigation.** Above 768px, navigation links are laid out horizontally in the header.
- **G — Mobile navigation.** At 768px and below, the header links are replaced by an icon bar fixed to the bottom of the viewport.
- **H — No overflow.** At every width, no content overflows the viewport horizontally; images scale; sections stack.
- **I — Hidden routes.** Login and Back Office appear in no navigation — not the header, not the footer, not the mobile bar.

---

## User Flow / Logic (High Level)

**Desktop visitor (>768px)**

1. Visitor loads any route. The header is fixed at the top with the logo on the left and four horizontal links on the right.
2. The link matching the current route is visually marked as active.
3. Visitor scrolls. The header stays put; page content scrolls beneath it.
4. Visitor clicks a link. The route changes, only the `#` fragment updates, and the new page renders inside the same chrome.
5. Visitor clicks the logo. Home renders.
6. Visitor reaches the bottom. The footer shows contact details and the copyright line.

**Mobile visitor (≤768px)**

1. Visitor loads any route. The header still shows the logo, but the horizontal links are gone.
2. A bar of four icons is fixed to the bottom of the viewport.
3. The icon matching the current route is marked as active.
4. Page content is padded so neither the fixed header nor the fixed bottom bar covers it.
5. Tapping an icon changes route; the bar stays in place.

**Visitor on a hidden route**

1. Visitor types `#/login` or `#/backoffice`. The page renders inside the same layout.
2. Neither route appears in any navigation, and no navigation control leads to them.

---

## Interfaces (Pages, Endpoints, Screens)

### Frontend

| File | Role |
| --- | --- |
| `src/components/Main.jsx` | Layout wrapper — renders `Header`, the routed page, then `Footer` |
| `src/components/Header.jsx` | Fixed top bar: logo + desktop navigation |
| `src/components/Footer.jsx` | Contact information and copyright |
| `src/components/MobileNav.jsx` | Bottom icon bar, ≤768px only |
| `src/components/Icons.jsx` | Inline SVG icon set — one per public route |
| `src/components/navItems.js` | Single source of truth for the four public routes |
| `src/App.jsx` | Wraps the existing `Routes` block in `Main` |
| `src/App.css` | Layout primitives already present; component rules added here |

### Backend / API

None. This feature has no server interaction.

### Infrastructure

None beyond the existing deploy pipeline.

---

## Data Used or Modified

No application data and no user input. The only data is the static navigation list, defined once in `src/components/navItems.js` and consumed by both navigations so they can never drift apart:

| Field | Purpose |
| --- | --- |
| `to` | Route path passed to `NavLink` |
| `label` | Visible text on desktop; accessible name on mobile |
| `icon` | Inline SVG component used by the mobile bar |

Login and Back Office are deliberately absent from this list. That absence is what satisfies the "not in any navigation" requirement — they are excluded by construction rather than by a filter that could later be removed by mistake.

### Validations

No form validation. The checks that apply are structural:

| Check | Rule | If it fails |
| --- | --- | --- |
| Nav completeness | All four public routes appear in `navItems` | A page becomes unreachable by navigation |
| Hidden routes | `/login` and `/backoffice` never appear in `navItems` | A graded requirement fails outright |
| Logo alt text | The logo `img` has a non-empty, descriptive `alt` | Accessibility requirement fails |
| Logo target | The logo is a link to `/` | Graded requirement fails |
| Header persistence | `Header` renders on all six routes | Graded requirement fails |
| Footer persistence | `Footer` renders on all six routes | Graded requirement fails |
| Content clearance | Page content is padded past the fixed header and, on mobile, the bottom bar | Content is hidden beneath fixed chrome |
| Horizontal overflow | No element exceeds the viewport width at any size | Graded requirement fails |
| Icon accessibility | Every icon-only control has an accessible name | Screen readers announce an unlabelled button |

### Expected Behavior

| Situation | Expected result |
| --- | --- |
| Any route loads | Header at top, footer at bottom, page content between them |
| Viewport >768px | Four navigation links laid out horizontally in the header; no bottom bar |
| Viewport ≤768px | No header links; four icons fixed at the bottom |
| Viewport crosses 768px | Navigation swaps with no reload and no layout jump |
| Current route matches a nav item | That item is visually marked active in whichever navigation is showing |
| Logo clicked | Home renders |
| Page scrolled | Header stays fixed; on mobile the bottom bar stays fixed |
| Long content on a narrow screen | Vertical scrolling only — never horizontal |
| `#/login` or `#/backoffice` opened | Renders inside the layout; appears in no navigation |
| User prefers reduced motion | Transitions are suppressed by the existing global rule |
| Keyboard navigation | Every link and icon is reachable by Tab and shows a visible focus ring |

---

## Tech Constraints (Feature-Level)

- React + Vite, JavaScript. Plain CSS with custom properties — no UI framework, per the global spec.
- **No new dependencies.** Icons are inline SVG. An icon library would add a dependency no specification requires, which the global spec forbids.
- Colour, spacing, and type values come from the tokens in `src/index.css`. No hard-coded hex values in component CSS.
- Navigation uses `NavLink` from `react-router-dom` so active state comes from the router rather than from manual state.
- The 768px breakpoint is written literally in media queries — custom properties cannot be used in media query conditions. `--bp-mobile` documents the value.
- `Header` and `MobileNav` render on every route, including `/login` and `/backoffice`.
- Icons are decorative; the accessible name comes from adjacent text or an `aria-label`, and each `svg` carries `aria-hidden="true"`.

---

## Acceptance Criteria

- [ ] A `Main` layout component wraps all page content between header and footer.
- [ ] A `Header` component renders at the top of every one of the six routes.
- [ ] The header is fixed and stays visible while scrolling.
- [ ] The header has consistent background and styling across all pages.
- [ ] The header contains navigation links to all four public pages.
- [ ] A `Footer` component renders at the bottom of every one of the six routes.
- [ ] The footer includes contact information — an email address and social links.
- [ ] The footer includes a copyright notice.
- [ ] The AI-generated logo is visible in the header.
- [ ] Clicking the logo navigates to Home.
- [ ] The logo has appropriate `alt` text.
- [x] The AI tool used to generate the logo is documented — see "AI-generated assets and tool attribution" in `ai/ai-spec.md`. The logo was generated with DALL·E via ChatGPT.
- [ ] Above 768px, navigation links are displayed horizontally at the top.
- [ ] At 768px and below, navigation becomes icons displayed at the bottom.
- [ ] The logo scales appropriately and does not overflow.
- [ ] Text is readable without horizontal scrolling on mobile.
- [ ] Images scale appropriately on smaller screens.
- [ ] Sections stack vertically on narrow viewports.
- [ ] No content overflows the viewport at any width.
- [ ] Login and Back Office appear in no navigation.
- [ ] Every interactive element is keyboard reachable and shows a visible focus ring.
- [ ] `npm run build` completes without errors and `npx oxlint` reports no problems.

---

## Notes for the AI

- Build the chrome only. Do not add page content — the six pages stay as placeholders until their own features run.
- Define the navigation list once and let both navigations read from it. Two hand-maintained lists will drift.
- Do not add `/login` or `/backoffice` to the navigation list "for testing". Their absence is the requirement.
- Reuse `--header-h` and `--mobile-nav-h`, already defined in `src/index.css`, and the `.app-main` padding rules already in `src/App.css`. Do not invent parallel values.
- Prefer `auto-fit`/`minmax` grids and `flex-wrap` over width media queries. The only breakpoint this feature needs is the 768px navigation swap.
- Use the existing `.sr-only` utility for the accessible names of icon-only controls.
- Verify at both 1280px and 375px before considering the feature done, and confirm `document.documentElement.scrollWidth` never exceeds `clientWidth`.
