# 🤖 AI_FEATURE_Portfolio-Page

> Use with `./ai/ai-spec.md`. The global spec governs scope, tech constraints, and conventions; this document covers only the Portfolio page.

---

## Feature Identity

- **Feature Name:** Portfolio Page
- **Related Area:** Frontend / public pages
- **Route:** `/portfolio` — rendered at `https://FL11024OmeedK.github.io/#/portfolio`

---

## Feature Goal

Give a visitor the professional record behind the Home page: where Omeed Kashef studied, where he has worked and what he did there, the projects that came out of it, and a downloadable resume they can keep.

Home makes the claim; Portfolio is the evidence. The education and work sections are meant to read like a resume, because that is what they are.

---

## Feature Scope

### In Scope (Included)

- Education section
- Work experience section with dates, ordered most recent first
- Projects section — the six professional projects resolved in the global spec
- Clickable project cards and a dedicated case-study page for each project
- A downloadable PDF of the resume
- Two AI-generated images acting as section headers
- Section separation consistent with the Home page

### Out of Scope (Excluded)

- Header, footer, navigation — inherited from the Project Layout feature.
- Skills — those live on Home.
- The links list, contact form, and anything Supabase-backed.

---

## Where dates appear

Deliberate and specific, at the student's direction:

| Section | Dates? | Why |
| --- | --- | --- |
| **Work experience** | **Yes** | The section should read like a resume, and the grading sheet requires "title/role, organization, dates, and description". |
| **Education** | **No** | The resume itself carries no education dates, so the site matches its source document. |
| **Projects** | **No** | The grading sheet does not ask for project dates. |

Reverse-chronological ordering is honoured in all three sections, including the two where dates are not displayed.

### ⚠️ Known deviation

| Grading requirement | What ships | Status |
| --- | --- | --- |
| Education entries include "institution name, degree/program, **and dates**" | Institution and degree/program only | **Accepted risk**, already recorded in the global spec and reaffirmed. |

Job titles and organisation names in the work section are carried as previously recorded and are **not** revised in this feature. Dates come from the resume, which is the source document for this section.

---

## User Flow / Logic (High Level)

1. Visitor selects Portfolio from the navigation, or opens `#/portfolio` directly.
2. A short page header states what the page is, alongside the resume download control.
3. The education section lists institutions, most recent first.
4. An AI-generated image separates education from work.
5. The work section lists roles most recent first — title, organisation, dates, and what was done there.
6. A second AI-generated image separates work from projects.
7. The projects section presents six clickable cards, each with an image, name, tech tags, and a description.
8. Activating a card opens its case-study route with the challenge, approach, and outcome.
9. Activating the resume control downloads the file rather than navigating away.
10. The footer closes the page.

No interactive state. Nothing is fetched, submitted, or persisted.

---

## Interfaces (Pages, Endpoints, Screens)

### Frontend

| File | Role |
| --- | --- |
| `src/pages/Portfolio.jsx` | The page — replaces the placeholder |
| `src/pages/ProjectDetail.jsx` | Shared case-study view for the six project routes |
| `src/App.css` | Portfolio-specific rules built on existing primitives |
| `public/Omeed_Kashef_Resume.pdf` | The downloadable resume, served as a static asset |
| `src/assets/portfolio-education.jpg` | AI-generated section image |
| `src/assets/portfolio-projects.jpg` | AI-generated section image |
| `src/assets/card-*.jpg` (six) | Project-specific AI-generated card artwork |
| `src/assets/{onboarding,medical,vehicle}-*.jpg` | Cropped source visuals from `portfolio with notes.pdf` |
| `src/assets/{swarm,packaging}-*.jpg` | Project-specific AI-generated supporting visuals |

The resume lives in `public/` rather than `src/assets/` deliberately: it must keep a stable, human-readable filename for the download, and Vite fingerprints anything imported from `src/`.

### Backend / API

None.

---

## Data Used or Modified

No user input, no persistence, no network calls. All content is static and defined in `Portfolio.jsx`.

### Education — most recent first, no dates

| Institution | Degree / Program |
| --- | --- |
| University of Iowa | Master of Science (MS), Industrial and Systems Engineering |
| Grinnell College | Bachelor of Arts (BA), Biochemistry |

### Work experience — most recent first, with dates

| Title | Organisation | Dates |
| --- | --- | --- |
| Forward Deployed Engineer | Codeboxx | April 2026 – Present |
| SMB Account Executive | Frontier Communications | July 2025 – April 2026 |
| Senior Product Consultant | Defense Contractor | June 2024 – July 2025 |
| Product Consultant | Goddard | May 2023 – June 2024 |
| Usability Consultant | Haemonetics | December 2022 – April 2023 |
| Product Owner | Ford Motor Company | October 2019 – September 2022 |
| Human Factors Researcher | Driving Safety Research Institute | August 2017 – August 2019 |

Descriptions are drawn from the resume's own bullets for each role, condensed into prose. No responsibility or metric appears that the resume does not state.

The San Diego employer is "Defense Contractor" — the resume's own wording, and the name required by the global spec.

### Projects — the six resolved in the global spec, no dates

Ordered most recent first, matching the other two sections, though no dates render.

| Project | Domain | Source | Image |
| --- | --- | --- | --- |
| Swarm Control | Defense | Portfolio deck; resume (Defense Contractor) | `card-swarm.jpg` |
| Surgical Needle Tracking | Medical Device | Portfolio deck; resume (Defense Contractor) | `card-surgical.jpg` |
| Packaging & Distribution | Robotics | Portfolio deck; resume (Goddard) | `card-packaging.jpg` |
| Driver Onboarding | Automotive | Portfolio deck; resume (Ford) | `card-onboarding.jpg` |
| Vehicle Interface | Autonomous Vehicles | Portfolio deck; resume (DSRI) | `card-vehicle.jpg` |
| Apheresis Device Safety | Medical Device | Annotated portfolio deck; resume (Haemonetics) | `card-apheresis.jpg` |

Descriptions follow the deck's challenge / process / result structure. The San Diego employer is not named in any project description, per the global spec — the two projects from that role name no organisation at all.

Each card uses distinct, project-specific AI artwork, which becomes the case-study header background. Every case-study page has exactly three visual elements: that background plus two compact, text-free evidence visuals. Text extracted from the original portfolio slides is integrated into the challenge, approach, outcome, and evidence copy rather than repeated inside the images.

### Validations

| Check | Rule | If it fails |
| --- | --- | --- |
| Education count | At least 1 entry renders | Graded requirement fails |
| Education fields | Every entry has institution and degree/program | Graded requirement fails |
| Work count | At least 1 entry renders | Graded requirement fails |
| Work fields | Every entry has title, organisation, dates, and description | Graded requirement fails |
| Work descriptions | Each mentions responsibilities or achievements | Graded requirement fails |
| Ordering | All three sections are most-recent-first | Graded requirement fails |
| Project count | At least 1 project renders | Graded requirement fails |
| Project fields | Every project has name, tech, description, and image | Graded requirement fails |
| Resume link | Resolves to a real PDF and downloads | Graded requirement fails |
| Section count | At least 3 visually distinct sections | Graded requirement fails |
| AI images | At least 2 AI-generated images render with alt text | Graded requirement fails |
| Content truth | Every claim traces to the resume | Violates the global authenticity rule |
| Overflow | Nothing exceeds the viewport at any width | Graded requirement fails |

### Expected Behavior

| Situation | Expected result |
| --- | --- |
| Visitor opens `#/portfolio` | Page renders inside the shared layout |
| Visitor activates the resume control | The PDF downloads; the page does not navigate away |
| Viewport >768px | Projects render as a multi-column grid; work entries use a two-column row |
| Viewport ≤768px | Everything stacks to one column; images scale; no horizontal scroll |
| Images still loading | Reserved aspect ratios hold their space; no layout shift |
| Images fail to load | `alt` text conveys the content |
| Reduced motion preferred | No animation runs |

---

## Tech Constraints (Feature-Level)

- React + Vite, JavaScript, plain CSS with existing tokens. No new dependencies.
- Project and section images are imported from `src/assets/` so Vite fingerprints them. The resume is referenced from `public/` by stable path, with the `download` attribute.
- Exactly one `h1` — the page title. Section headings are `h2`, entry headings `h3`.
- Reuse `.container`, `.section`, `.card-grid`, `.media`, `.rule`, `.tag`, `.label`, `.btn`.
- Dates render in the work section only.

---

## Acceptance Criteria

- [ ] The page includes an education section with at least one institution.
- [ ] Each education entry includes institution name and degree/program.
- [ ] Education entries are in reverse chronological order.
- [ ] The page includes a work experience section with at least one role.
- [ ] Each work entry includes title/role, organisation, dates, and description.
- [ ] Work descriptions mention responsibilities or achievements.
- [ ] Work entries are in reverse chronological order.
- [ ] The page includes a projects section with at least one project.
- [ ] Each project includes name, tech, description, and image.
- [ ] Each project description explains what it is and its purpose.
- [ ] A downloadable PDF of the resume is available and resolves.
- [ ] The page has at least 3 distinct sections, visually separated.
- [ ] At least 2 AI-generated images are integrated, complementing the content.
- [ ] Both AI images have appropriate `alt` text.
- [ ] No horizontal overflow at 375px or 1280px.
- [ ] `npm run build` completes without errors and `npx oxlint` reports no problems.
- [ ] ⚠️ Education dates — **knowingly not met**, see Known deviation.

---

## Notes for the AI

- Build only Portfolio. Do not touch other pages or the shared chrome.
- Dates render in the work section only — not in education, not on projects. Do not revise job titles or organisation names.
- Keep reverse-chronological ordering everywhere, including where dates are not shown.
- Descriptions come from the resume's own bullets. Do not invent metrics or responsibilities.
- The resume link needs `download` so it saves rather than opening in place.
- Verify at 375px and 1280px, and confirm the PDF actually resolves rather than 404s.
