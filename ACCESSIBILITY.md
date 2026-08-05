# Accessibility Improvements Summary

This document outlines the accessibility enhancements made to ensure WCAG 2.1 AA compliance across the portfolio site.

## Input Fields & Forms

### Styling Improvements
- **Visual Background**: Input fields now have a visible `surface` background color instead of transparent
- **Full Borders**: Changed from bottom-border-only to complete 1px borders for better visibility
- **Improved Padding**: Increased to 12px (top/bottom) and 14px (left/right) for better readability and touch targets
- **Clear Focus State**: Focus includes a 3px colored shadow (selection color) for obvious visual feedback
- **Hover State**: Fields highlight with primary color on hover for clear interactivity

### Form Labels
- **Prominent Text Color**: Labels now use the primary text color (`--fg`) instead of muted color
- **Font Weight**: Increased to 500 for better visibility and hierarchy
- **Proper Association**: All inputs have `htmlFor` attributes linking to input `id` attributes

### Error Handling
- **ARIA Integration**: 
  - Invalid inputs have `aria-invalid="true"`
  - Error messages have unique IDs
  - Inputs have `aria-describedby` attributes linking to error message IDs
- **Visual Feedback**: Error states show danger color border with red-tinted focus shadow
- **Error Prominence**: Error text uses font-weight 500 with proper margin spacing

## Touch Target Sizes

All interactive elements now meet or exceed WCAG AA standards for minimum touch targets (44x44px minimum):

- **Buttons**: `min-height: 44px` with appropriate padding
- **Theme Toggle**: `min-width/height: 44px` with visual centering
- **Table Actions**: `min-width/height: 44px` with centered content
- **Modal Close Button**: `min-width/height: 44px` with proper spacing

## Focus Management

### Focus Indicators
All interactive elements have clear, visible focus indicators:
- **Outline Style**: 2px solid primary color with 2px offset
- **Consistency**: Applied to buttons, links, form inputs, and interactive controls
- **Visibility**: Meets WCAG AAA contrast requirements

### Keyboard Navigation
- **Skip Link**: "Skip to main content" link provides keyboard users a way to bypass navigation
- **Tab Order**: Natural HTML element order ensures logical tab flow
- **Focus Trap Prevention**: No focus traps in modals or other interactive components

## Links

### Link Styling
- **Underline**: All text links now have underlines for clarity and color-blind accessibility
- **Text Decoration**: 1px underline with 2px offset for readability
- **Navigation Exemption**: Navigation links (`.site-nav__link`, `.link-card`, `.site-header__brand`) exclude underlines
- **Visited State**: Links show consistent visited styling

### External Links
- **Visual Indicators**: Arrow characters (`↗`) are marked as `aria-hidden` to avoid redundant screen reader announcements
- **Security**: External links use `rel="noreferrer"` for privacy

## Form Status Messages

### Styling
- **Visual Container**: Messages have a surface background with a left border (4px)
- **Color Coding**: 
  - Success: Green border (primary color)
  - Error: Red border (danger color)
- **Icon Support**: SVG icons included with proper flex alignment
- **ARIA Integration**: Messages have `role="status"` and `aria-live="polite"` for automatic announcement

## Semantic HTML

### Structure
- **Main Element**: `<main id="app-main">` wraps all page content
- **Header**: Fixed navigation header with proper semantic role
- **Footer**: Site footer with proper semantic structure
- **Sections**: Page sections use `<section>` tags with `aria-labelledby` attributes
- **Navigation**: Proper `<nav>` tags with `aria-label` attributes

### Form Elements
- **Labels**: All form inputs have associated `<label>` elements
- **Error Messages**: Error spans have unique IDs and are linked via `aria-describedby`
- **Field Validation**: Inputs use `aria-invalid` to indicate validation state

## Images

### Alt Text
All images include descriptive alt text:
- **Hero Images**: Describe the visual content and context
- **Project Thumbnails**: Describe the project domain or visual theme
- **Thumbnails**: Descriptive alt text instead of generic "image" labels
- **Logo**: Detailed description including context ("Omeed Kashef's personal logo: a stylised leaf enclosed in a circle")

## Color Contrast

Ratios below are computed (WCAG relative-luminance formula), not estimated.
Worst case per row across both themes.

| Pair | Need | Dark | Light |
|---|---|---|---|
| Body text on page bg | 4.5 | 14.83 | 15.16 |
| Muted text on page bg | 4.5 | 6.20 | 5.99 |
| Links on page bg | 4.5 | 6.32 | 5.29 |
| Accent / `<em>` on page bg | 4.5 | 7.14 | 5.01 |
| Danger text on page bg | 4.5 | 5.69 | 5.78 |
| Muted text on surface | 4.5 | 5.41 | 5.43 |
| Links on surface | 4.5 | 5.53 | 4.80 |
| Accent on surface | 4.5 | 6.24 | 4.54 |
| Danger text on surface | 4.5 | 4.97 | 5.24 |
| Placeholder on field fill | 4.5 | 5.41 | 5.43 |
| Input border vs field fill | 3.0 | 3.30 | 3.89 |
| Input border vs page bg | 3.0 | 3.78 | 4.29 |
| Focus ring vs page bg | 3.0 | 6.32 | 5.29 |
| Button label on primary fill | 4.5 | 6.32 | 5.29 |

### Three failures found and fixed

1. **`--danger` in dark mode** was `#d9534f` — 4.08:1 on `--surface`, below AA.
   Now `#e06b67` (4.97:1). This surfaced because form status banners were given
   a `--surface` background; the old red passed on the page background (4.66:1)
   but not on the banner.
2. **`--placeholder`** was `rgba(122,158,130,0.4)` dark / `rgba(74,101,82,0.55)`
   light, compositing to **1.98:1** and **2.27:1**. Alpha had to reach ~0.95 to
   pass, so both are now solid: `#7a9e82` / `#4a6552` (5.41 / 5.43).
3. **Input borders** used `--border` (0.16 alpha, ~1.3:1) — failing WCAG 1.4.11,
   which requires 3:1 for UI component boundaries. Added a dedicated
   `--border-input` token (`#3f7d5a` / `#517f63`). `--border` is unchanged for
   card and table edges, which are decorative rather than component boundaries.

### Other notes
- **Reduced Motion**: theme transitions respect `prefers-reduced-motion`
- `--selection` is a wash behind text, not text, so it is exempt from 4.5:1

## Text Size

The bottom of the type scale previously spanned 15.2px to 12px — five tokens
across 3.2px, with `--step-lead` sitting only 0.8px above `--step-body`. The
hierarchy existed in the token names but not on screen. Raising `--step-body`
alone would have inverted it (lead at 15.2px would render *smaller* than a 16px
body), so the whole lower half moved together.

| Token | Before | After | Role |
|---|---|---|---|
| `--step-title` | 1.4rem / 22.4px | **1.5rem / 24px** | h3, card and modal titles |
| `--step-lead` | 0.95rem / 15.2px | **1.125rem / 18px** | intro paragraphs |
| `--step-body` | 0.9rem / 14.4px | **1rem / 16px** | body copy, inputs, buttons |
| `--step-sm` | 0.85rem / 13.6px | **0.9375rem / 15px** | card and project descriptions |
| `--step-xs` | 0.75rem / 12px | **0.8125rem / 13px** | labels, meta, field errors |
| `.mobile-nav__label` | 0.625rem / 10px | **0.6875rem / 11px** | bottom nav |
| `.site-footer__name` | 1rem | **1.125rem** | was equal to body once body hit 16px |

### Why 16px on `--step-body` specifically

Beyond matching the browser default: **iOS Safari auto-zooms the viewport when a
text input takes focus at any font-size below 16px.** The form inputs inherit
`--step-body`, so at 14.4px every tap into the contact or login form was
zooming and shifting the page. At 16px it does not.

### Line length

`max-width` values are in `rem`, which resolves against the 16px root rather
than `--step-body` — so the containers did not move and larger text means
*fewer* characters per line. Measure improved everywhere:

| Element | Before | After |
|---|---|---|
| `.home-background__copy`, `.contact-intro` | 76 chars | 68 |
| `.links-intro` | 84 | 71 |
| `.home-intro__lead` | 109 | 92 |
| `.entry__text` | 108 | **98 → 77** (max-width 46rem → 36rem) |

`.entry__text` needed the extra change: at 46rem it still ran to ~98 characters,
past the 45–75 range that reads comfortably, and it carries the densest prose on
the site. `.home-intro__lead` is left at 92 — it is display type in a hero, where
a longer measure is a defensible design choice rather than a readability problem.

`.home-intro__lead` also had its own `clamp(1rem, …)` floor, which after the
change would have rendered the hero lead *below* `--step-lead` on narrow desktop
widths — and below what the same element renders at on mobile, where the
breakpoint resolves it to `--step-lead`. The floor is now `1.125rem`.

## Typography

### Readable Sizes
- **Body Text**: 0.9rem (minimum 12px equivalent)
- **Labels**: 0.75rem with increased letter spacing for uppercase text
- **Headings**: Responsive sizing using `clamp()` for fluid scaling
- **Line Heights**: 1.7 for body text (WCAG recommendation)

## Accessibility Checklist

- ✅ Semantic HTML structure with proper landmarks
- ✅ All form inputs have associated labels
- ✅ Error messages linked to inputs via `aria-describedby`
- ✅ Form validation with `aria-invalid` attributes
- ✅ All buttons and interactive elements have visible focus states
- ✅ All images have descriptive alt text
- ✅ Touch targets meet 44x44px minimum
- ✅ Color contrast meets WCAG AA — verified by computation, see table above
- ✅ Skip to main content link for keyboard users
- ✅ Heading hierarchy is logical and continuous
- ✅ Form status messages use `aria-live="polite"`
- ✅ Links are visually distinct and underlined
- ✅ Navigation uses proper ARIA labels
- ✅ Motion respects `prefers-reduced-motion` setting

## Testing Recommendations

1. **Keyboard Navigation**: Tab through all pages to ensure logical tab order
2. **Screen Reader**: Test with NVDA, JAWS, or VoiceOver
3. **Color Contrast**: Use WAVE or Lighthouse to verify contrast ratios
4. **Touch Targets**: Test on mobile devices to verify button sizes are comfortable
5. **Focus Indicators**: Verify all interactive elements show clear focus states
6. **Form Validation**: Test error states and error message announcements
7. **Zoom Testing**: Test at 200% zoom to ensure content remains accessible

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM: Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [MDN: Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
