# 🤖 AI_FEATURE_Home-Page

> Use with `./ai/ai-spec.md`. The global spec governs scope, tech constraints, and conventions; this document covers only the Home page.

---

## Feature Identity

- **Feature Name:** Home Page
- **Related Area:** Frontend / public pages
- **Route:** `/` — rendered at `https://FL11024OmeedK.github.io/#/`

---

## Feature Goal

Give a visitor who has never heard of Omeed Kashef a clear answer to "who is this and what can he do" within one screen of scrolling: his name and role, a short introduction in his own voice, and evidence of both technical capability and the human skills that surround it.

This is the default landing page, so it carries the first impression for every visitor — including the employers the global spec names as the real audience.

---

## Feature Scope

### In Scope (Included)

- The introduction section: name, role/tagline, and an introductory paragraph
- The technical skills section: five skills, each with an icon and supporting text
- The soft skills section: four skills, each with an icon and supporting text
- Two AI-generated images with descriptive `alt` text
- Section dividers and spacing that make the three sections read as distinct
- Responsive behaviour within the page — cards reflow, images scale, nothing overflows

### Out of Scope (Excluded)

- Header, footer, and navigation — owned by the Project Layout feature and inherited automatically.
- Education, work history, and projects — those belong to the Portfolio page.
- The links list — Links page.
- The contact form — Contact page.
- Any Supabase interaction. Home is entirely static.
- The design prototype's single-page-scroller structure. Home is a route, not an anchor within a scroller.

---

## Sub-Requirements (Feature Breakdown)

- **A — Root path.** Home renders at `/` and is the default landing page. Already wired by the Setup & Deploy feature; this feature must not change the route.
- **B — Introduction.** The name is the most prominent element on the page. A role or tagline sits alongside it. A short paragraph describes who he is.
- **C — Technical skills.** At least three, each with an icon and a sentence of supporting text, visually organised as a grid of cards.
- **D — Soft skills.** At least three, each with an icon and supporting text, visually organised.
- **E — Layout.** At least three distinct sections, visually separated by spacing and rules.
- **F — AI images.** At least two AI-generated images, relevant to the content, each with meaningful `alt` text, with the generating tool documented.

---

## User Flow / Logic (High Level)

1. Visitor opens the site root. Home renders as the default route inside the shared layout.
2. The introduction fills the first view: a full-bleed AI-generated image behind the name, role, and opening paragraph.
3. Visitor scrolls. A rule separates the introduction from the technical skills section.
4. Technical skills appear as a grid — three columns on desktop, reflowing to one on mobile. Each card carries an icon, a title, and a sentence.
5. A second AI-generated image forms a band between the technical and soft skills sections, breaking the rhythm so the two skill groups do not read as one long list.
6. Soft skills appear in the same card pattern, so the visual language is consistent.
7. The footer closes the page, inherited from the layout.

There is no interactive state on this page. Nothing is fetched, submitted, or persisted.

---

## Interfaces (Pages, Endpoints, Screens)

### Frontend

| File | Role |
| --- | --- |
| `src/pages/Home.jsx` | The page itself — replaces the placeholder |
| `src/components/Icons.jsx` | Extended with one icon per skill |
| `src/App.css` | Home-specific section rules, built on existing primitives |
| `src/assets/hero.jpg` | AI-generated introduction image |
| `src/assets/home-collaboration.jpg` | AI-generated mid-page band image |

### Backend / API

None.

### Infrastructure

None.

---

## Data Used or Modified

No user input, no persistence, no network calls. All content is static and defined in `Home.jsx`.

**Technical skills** — sourced from the resume, as recorded in `ai-spec.md`:

| Skill | Supporting text covers |
| --- | --- |
| JavaScript & Front-End | HTML, CSS, JavaScript, React |
| MERN Stack | MongoDB, Express, React, Node |
| Java Back-End | Java, Spring Boot, JPA, SQL |
| APIs & Tooling | REST APIs, Postman, Git & GitHub |
| Data Analysis & Visualization | R, Excel, statistical analysis of study data |

**Soft skills** — from `ai-spec.md`, each evidenced by a real line in the resume: Leadership & Mentorship, Cross-Functional Communication, Stakeholder & Client Management, Design Thinking & Empathy.

Five and four respectively, against a requirement of three each. The surplus is deliberate — it lets a card be cut later without dropping below the threshold.

### Validations

No form input. The checks are content and structural:

| Check | Rule | If it fails |
| --- | --- | --- |
| Name prominence | The name is the largest text on the page and the only `h1` | Graded requirement fails |
| Role visible | A role or tagline renders near the name | Graded requirement fails |
| Intro paragraph | A paragraph of prose, not a list, describes who he is | Graded requirement fails |
| Technical skill count | At least 3 render | Graded requirement fails |
| Soft skill count | At least 3 render | Graded requirement fails |
| Supporting text | Every skill has a full sentence, never a bare label | Graded requirement fails |
| Skill icons | Every skill card has an icon representing it | Graded requirement fails |
| Section count | At least 3 visually distinct sections | Graded requirement fails |
| AI image count | At least 2 AI-generated images render | Graded requirement fails |
| Alt text | Every image has descriptive, non-empty `alt` | Accessibility requirement fails |
| Content truth | Every claim traces to the resume | Violates the authenticity rule in the global spec |
| Overflow | No element exceeds the viewport at any width | Graded requirement fails |

### Expected Behavior

| Situation | Expected result |
| --- | --- |
| Visitor opens `/` | Home renders as the default route |
| Visitor opens `#/` directly | Same page, no 404 |
| Viewport >768px | Skills render as a multi-column grid |
| Viewport ≤768px | Skills stack to one column; images scale; no horizontal scroll |
| Images still loading | Reserved aspect ratios hold their space; no layout shift |
| Images fail to load | `alt` text conveys the content |
| Keyboard navigation | Nothing on the page is a focus trap; the page contains no interactive controls of its own |
| Reduced motion preferred | No animation runs, per the global rule |

---

## Tech Constraints (Feature-Level)

- React + Vite, JavaScript. Plain CSS with the existing custom properties.
- **No new dependencies.** Skill icons are inline SVG, extending `Icons.jsx`.
- Colour, spacing, and type come from tokens. No hard-coded hex values.
- Images are imported as modules so Vite fingerprints them; never referenced by a bare public path.
- Exactly one `h1` on the page — the name. Section headings are `h2`.
- Content must be true. No invented metrics, employers, or capabilities. Every skill traces to the resume via `ai-spec.md`.

---

## Acceptance Criteria

- [ ] The Home page is accessible at the root URL and is the default landing page.
- [ ] The student's name is prominently displayed.
- [ ] A role, title, or short tagline is visible.
- [ ] A brief introductory paragraph describes who the student is.
- [ ] At least 3 technical skills are listed or described.
- [ ] Each technical skill has supporting text, not a single word.
- [ ] Each technical skill has an icon representing it.
- [ ] The technical skills section is visually organised as cards or a grid.
- [ ] At least 3 soft skills or talents are listed or described.
- [ ] Each soft skill has supporting text and an icon.
- [ ] The soft skills section is visually organised.
- [ ] The page has at least 3 distinct sections.
- [ ] Sections are visually separated by spacing, backgrounds, or dividers.
- [ ] At least 2 images on the page were generated with an AI tool.
- [ ] Both images are relevant to the content or theme of the page.
- [ ] Both images have appropriate `alt` text.
- [ ] The AI tool used is documented.
- [ ] No horizontal overflow at 375px or 1280px.
- [ ] `npm run build` completes without errors and `npx oxlint` reports no problems.

---

## Notes for the AI

- Build only Home. Do not touch the header, footer, or other pages.
- Take the skill lists verbatim from `ai-spec.md` — they are already resolved content decisions, not suggestions. Expand each into a supporting sentence without adding claims the resume does not support.
- Reuse `.container`, `.section`, `.card-grid`, `.media`, `.rule`, `.eyebrow`, and `.label` from `App.css` rather than writing new layout primitives.
- The introduction image is full-bleed and sits behind text, so it needs the `--hero-scrim` gradient for legibility. Check contrast, not just appearance.
- Keep exactly one `h1`. The placeholder pages each had one; Home's must be the name.
- Verify at 375px and 1280px before considering the feature done.
