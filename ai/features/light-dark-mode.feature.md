# 🤖 AI_FEATURE_Light-Dark-Mode

> Use with `./ai/ai-spec.md`. The global spec governs scope, tech constraints, and conventions; this document covers only the Light & Dark mode feature.

---

## Feature Identity

- **Feature Name:** Light & Dark Mode
- **Related Area:** Frontend / design system
- **Grading sheet name:** "Extra Mile - Light & Dark mode"
- **Status:** Extra mile. Per `ai/ai-spec.md`, this is built only after the eight core features are complete and reviewed.

---

## Feature Goal

Let a visitor choose between the site's existing dark forest palette and a light equivalent, from any page, and have that choice remembered across visits. If the visitor has never chosen, follow the theme their operating system already asks for.

The site was designed dark-first — "Nature and technology in harmony", deep forest and gold. This feature does not redesign it. It adds a second palette that keeps the same identity at inverted lightness, and it routes every theme-dependent colour through a token so both palettes are driven from one place.

---

## Feature Scope

### In Scope (Included)

- A theme toggle control in the site header, therefore present and reachable on every route at every viewport width
- A complete light palette alongside the existing dark palette, both expressed as CSS custom properties
- Removal of the remaining hard-coded colour values in `src/App.css`, replaced by new tokens
- Persistence of an explicit choice in `localStorage`
- `prefers-color-scheme` as the default when no explicit choice has been stored
- Live response to an OS theme change while the site is open, for visitors who have not made an explicit choice
- An animated transition when the theme changes, suppressed under `prefers-reduced-motion`
- No flash of the wrong theme on first paint
- Both themes applied to every page and every component, including the hidden Login and Back Office routes and the modal

### Out of Scope (Excluded)

- A three-state control (Light / Dark / System). The toggle is binary; the system preference is the default, not a selectable position.
- Per-page or per-component theme overrides. The theme is global.
- Redesigning any layout, type scale, spacing, or component structure. Only colour changes.
- Theme-specific image assets. The AI-generated photographs are used unchanged in both themes.
- Storing the preference in Supabase or tying it to the authenticated Back Office user. It is a device-local preference.
- Server-side rendering concerns. The app is a static client-rendered SPA.
- Any new dependency. No theming library, no icon package.

---

## Sub-Requirements (Feature Breakdown)

- **A — Toggle control.** A button in the header, on every page, that switches between light and dark. Because `Header` renders on all six routes and stays visible at all widths, one control satisfies the "every page" requirement without a second copy in `MobileNav`.
- **B — Tokenised colour.** Every theme-dependent colour in the app resolves through a CSS custom property. No component rule may contain a literal colour value.
- **C — Persistence.** An explicit choice is written to `localStorage` and re-applied on the next visit, including after a full reload and on a different route.
- **D — System default.** With nothing stored, the theme follows `prefers-color-scheme`. A visitor whose OS is set to light sees the light theme on first load without touching the toggle.
- **E — Smooth transition.** Switching themes animates colour rather than snapping, and the animation is suppressed for visitors who prefer reduced motion.
- **F — Full coverage.** Every page and component is legible and correct in both themes, with no element left at a colour belonging to the other theme.
- **G — No flash.** The correct theme is applied before first paint, so a visitor who chose light never sees a dark frame first.
- **H — Accessibility.** The control is keyboard reachable, has an accessible name that describes what it will do, and both palettes meet WCAG AA contrast for body text.

---

## User Flow / Logic (High Level)

**First visit, OS set to dark**

1. Visitor loads any route. Nothing is stored in `localStorage`.
2. The resolver falls back to `prefers-color-scheme`, which reports dark.
3. The page paints dark. The toggle offers "Switch to light theme".

**First visit, OS set to light**

1. Same as above, but the media query reports light.
2. The page paints light on first frame — no dark flash, no manual step.

**Visitor switches theme**

1. Visitor clicks the toggle in the header.
2. The theme flips, colours transition over ~250ms, and the toggle icon and accessible name update to describe the new opposite action.
3. `theme` is written to `localStorage`.
4. Visitor navigates to another route. The chosen theme persists — the header, footer, mobile bar, cards, forms, and modal all follow.

**Returning visit**

1. Visitor loads any route. `localStorage.theme` holds their choice.
2. A blocking script in `index.html` applies it to `<html>` before the stylesheet paints.
3. The stored choice wins even if it disagrees with the OS setting.

**OS theme changes while the site is open**

1. Visitor has made no explicit choice. The OS flips from light to dark.
2. The `matchMedia` listener fires and the site follows.
3. Had the visitor made an explicit choice, their choice is kept and the OS change is ignored.

**Visitor with reduced motion enabled**

1. Visitor clicks the toggle. The theme changes instantly with no colour animation.
2. Everything else behaves identically.

---

## Interfaces (Pages, Endpoints, Screens)

### Frontend

| File | Change | Role |
| --- | --- | --- |
| `index.html` | Modified | Blocking inline script that resolves and applies the theme before first paint; `theme-color` meta tags for mobile browser chrome |
| `src/index.css` | Modified | Both palettes as custom properties, plus the theme-transition rule |
| `src/App.css` | Modified | Hard-coded colours replaced by tokens; toggle button styling |
| `src/lib/theme.js` | New | Theme resolution, persistence, and application — no React |
| `src/components/useTheme.js` | New | React binding over `theme.js`: current theme, setter, OS-change subscription. Sits beside `useSecretRoute.js`, matching where this project already keeps its hooks |
| `src/components/ThemeToggle.jsx` | New | The header control |
| `src/components/Header.jsx` | Modified | Renders `ThemeToggle` |
| `src/components/Icons.jsx` | Modified | `SunIcon` and `MoonIcon` added to the existing inline SVG set |

All six routes — Home, Portfolio, Links, Contact, Login, Back Office — are affected as consumers. None needs code changes, because they already draw every colour from tokens.

### Backend / API

None. This feature has no server interaction and stores nothing in Supabase.

### Infrastructure

None beyond the existing deploy pipeline.

---

## Data Used or Modified

One value, stored on the visitor's device.

| Key | Store | Type | Values | Meaning |
| --- | --- | --- | --- | --- |
| `theme` | `localStorage` | string | `"light"`, `"dark"` | An explicit choice. Absent means "follow the OS". |

The applied theme is also mirrored onto the DOM as `data-theme` on `<html>`, which is what CSS actually selects on. That attribute is derived state, never a source of truth.

No personal data is involved, so no consent banner or privacy consideration applies.

### Validations

No form input, so the checks are on stored and derived state:

| Check | Rule | If it fails |
| --- | --- | --- |
| Stored value | Only `"light"` or `"dark"` are honoured | A corrupted or hand-edited value must be ignored and the OS preference used, not applied blindly |
| `localStorage` availability | Access is wrapped in `try`/`catch` | Safari private mode throws on write; an unguarded call would break the toggle entirely |
| Attribute values | `data-theme` is only ever `"light"` or `"dark"` | A third value would match no palette rule and fall through to the dark default |
| Token completeness | Every token defined in the dark palette has a light counterpart | A missing token silently keeps a dark colour in the light theme |
| Literal colours | No hex or `rgb()`/`rgba()` literal remains in `src/App.css` | That rule keeps one colour in both themes and breaks the light palette |
| Contrast | Body text meets WCAG AA (4.5:1) against its background in both themes | An accessibility requirement fails |

### Expected Behavior

| Situation | Expected result |
| --- | --- |
| No stored preference, OS dark | Dark theme on first paint |
| No stored preference, OS light | Light theme on first paint |
| Toggle clicked | Theme flips, colours transition, `localStorage.theme` updated |
| Page reloaded after a choice | Chosen theme applied before first paint, no flash |
| Route changed after a choice | Theme persists; no re-resolution, no flicker |
| Stored choice disagrees with OS | Stored choice wins |
| OS theme changes, no stored choice | Site follows the OS live, without reload |
| OS theme changes, choice stored | Site keeps the stored choice |
| `localStorage` unavailable or throws | Toggle still works for the session; the choice simply is not remembered |
| Stored value is not `light` or `dark` | Ignored; OS preference used |
| `prefers-reduced-motion: reduce` | Theme changes instantly, no colour animation |
| Toggle reached by keyboard | Focus ring visible; Enter and Space activate it |
| Screen reader on the toggle | Announces the action it will perform, not just "button" |
| Modal open when the theme flips | Backdrop and panel follow the new theme |
| Hidden routes `#/login`, `#/backoffice` | Both themed like every other page |
| Mobile bottom nav | Follows the theme at ≤768px |
| Hero image sections | Scrim flips so the overlaid headline stays legible in both themes |

---

## Tech Constraints (Feature-Level)

- React + Vite, JavaScript. Plain CSS with custom properties — no UI framework, per the global spec.
- **No new dependencies.** The sun and moon icons are inline SVG added to `src/components/Icons.jsx`, matching how every other icon in this project is drawn.
- The theme is selected in CSS by `[data-theme]` on `<html>`, never by a class on `body` and never by inline styles on components.
- The dark palette stays on bare `:root` so it remains the fallback if JavaScript never runs. The light palette is applied by `:root[data-theme="light"]` and, for the no-JavaScript case, by `@media (prefers-color-scheme: light)` scoped to `:root:not([data-theme])`.
- `color-scheme` is set per theme so native form controls, scrollbars, and the browser's own UI match.
- The pre-paint script in `index.html` is inline and blocking by necessity — a module script would run after first paint and reintroduce the flash. It stays minimal and touches only `documentElement`.
- The transition is applied through a temporary class added for the duration of the switch, not as a permanent global `transition` on `*`, which would interfere with hover and focus transitions already defined on links and buttons.
- The transition rule sits inside `@media (prefers-reduced-motion: no-preference)` rather than relying on the existing global reduced-motion override, because that override and this rule would otherwise both be `!important`.
- Existing token names do not change. Pages and components keep consuming `--bg`, `--fg`, `--primary`, and the rest exactly as they do now.

---

## Acceptance Criteria

- [ ] A toggle control is visible in the header on all six routes.
- [ ] The toggle is visible and usable at ≤768px, where the desktop nav is hidden.
- [ ] Clicking the toggle switches the theme immediately.
- [ ] Every theme-dependent colour is defined as a CSS custom property.
- [ ] `src/App.css` contains no literal hex, `rgb()`, or `rgba()` colour value.
- [ ] The chosen theme is written to `localStorage` under `theme`.
- [ ] Reloading the page restores the chosen theme.
- [ ] Navigating between routes preserves the chosen theme.
- [ ] With no stored preference, the theme matches `prefers-color-scheme`.
- [ ] A stored preference overrides `prefers-color-scheme`.
- [ ] With no stored preference, changing the OS theme updates the site live.
- [ ] An invalid stored value is ignored and the OS preference is used.
- [ ] The toggle still works when `localStorage` throws.
- [ ] Colours animate when the theme changes.
- [ ] The animation is suppressed under `prefers-reduced-motion: reduce`.
- [ ] No flash of the wrong theme on load with a stored preference.
- [ ] Home, Portfolio, Links, Contact, Login, and Back Office are all correct in both themes.
- [ ] The header, footer, mobile bottom nav, cards, forms, tables, and modal are all correct in both themes.
- [ ] Hero headlines stay legible over their images in both themes.
- [ ] Body text meets WCAG AA contrast against its background in both themes.
- [ ] The toggle is keyboard reachable, shows a visible focus ring, and has an accessible name describing what it will do.
- [ ] `npm run build` completes without errors and `npx oxlint` reports no problems.

---

## Notes for the AI

- This is a colour-layer feature. If a change touches layout, spacing, type, or component structure, it is out of scope.
- Do not rename existing tokens. Pages consume them by name; renaming turns a contained change into a full-app refactor.
- Add the light palette by overriding the same token names, not by introducing parallel `--light-*` names that components would have to choose between.
- Six literal colours currently live in `src/App.css`: the horizontal hero scrim gradient, the modal backdrop, and the error red used by the table danger action and the form validation states. Each needs a token before the light theme can be complete.
- The Home hero overlays text on a photograph using a dark scrim, built from two gradients. In the light theme the scrim must lighten, or the overlaid text must be pinned to light values — pick one. Both gradients need the same treatment; only one of them is currently a token.
- Put the toggle in `.site-header__inner` as a sibling of `.site-nav`, not inside it. `.site-nav` is `display: none` below 768px, and a toggle nested inside it would vanish on mobile.
- Give the toggle an accessible name that states the outcome ("Switch to light theme"), not the current state. It changes with the theme.
- Verify at 1280px and 375px, in both themes, on every route including `#/login` and `#/backoffice`, and with the modal open.
- The gold accent `#c89a2e` does not meet AA on a light background. The light palette needs a darker gold; do not reuse the dark-theme value.
