# Design Reference — captured from Claude Design

**Source:** Claude Design project "Nature and technology in harmony"
(`847be2e5-21c4-4d8c-a576-63fa61ca04ab`)
**Captured:** 2026-08-03

## What this document is

The Claude Design project contains structure and written content that the app has
not implemented yet. That material lives only in the design project, which this
repository cannot read at build time. This file preserves it so it can be pulled
in later without going back to the design tool.

**This is reference material, not a specification.** `ai/ai-spec.md` and the
feature specs remain the source of truth. Where this document and the spec
disagree, the spec wins — every known disagreement is flagged inline below.

Nothing here is wired into `src/` yet. Design *tokens* and *images* have already
been transferred (`src/index.css`, `src/App.css`, `src/assets/`); only structure
and content remain outstanding.

---

## 1. Source files

The design project holds two generations of the app. The second supersedes the
first.

| File | Generation | What it holds |
| --- | --- | --- |
| `Portfolio.dc.html` | 1st | Single-page scroller. Hero → Work → About → Contact → Footer. Full token set. |
| `scraps/make/App.tsx` | 1st | React equivalent of the above. |
| `scraps/make/bash.txt` | **2nd** | Shell history containing a **complete six-page rewrite** — the most advanced artifact in the project. |
| `scraps/make/theme.css` | — | Empty stub. No tokens. |
| `scraps/make/fonts.css` | — | Google Fonts import. Already transferred. |
| `assets/hero.jpg` | — | Transferred to `src/assets/hero.jpg`. AI-generated (DALL·E). |
| `assets/portrait.jpg` | — | **Misleading name — not a portrait.** It is the mood board, identical in content to `4b07218b` from the `.make` bundle. Kept as [design-source/moodboard.png](design-source/moodboard.png) and removed from `src/assets/`, since it is a style reference rather than site content. |
| `Portfolio-print.dc.html` | — | Print/PDF translation of generation 1. **Captured** to [design-source/](design-source/Portfolio-print.dc.html) — carries the only light-mode palette (§5). |
| `uploads/*.make` (×2) | — | Figma Make ZIP bundles. **Blocked** — exceed the 256 KiB read cap, see §6. |

The second generation was produced after the design session extracted the resume,
LinkedIn export, portfolio PDF **and the FSD grading sheet**, then rebuilt the app
around them. It is the version worth mining.

---

## 2. Structure (2nd generation)

Six pages, matching this project's route list exactly:

```
home · portfolio · links · contact          (public, in nav)
login · backoffice                          (hidden, not in any nav)
```

### Layout shell

- Sticky header, `h-16`, containing logo + wordmark on the left, nav pills centre-right
- Footer with name, tagline, email, LinkedIn, resume link, copyright
- **Mobile bottom icon navigation** — `fixed inset-x-3 bottom-3`, four-column grid,
  icon over label, `md:hidden`. This satisfies the grading sheet's ≤768px
  requirement and did not exist in the 1st generation.
- Footer carries `pb-24 md:pb-9` so content clears the fixed bottom bar

### Page behaviours worth reusing

| Page | Behaviour |
| --- | --- |
| Contact | Per-field `touched` state; errors only after blur; submit disabled while invalid; success banner auto-dismisses after 5s; fields reset on success |
| Login | Renders back office directly once authenticated; distinct error text on bad credentials |
| Back office | Table Name/Email/Date/Actions; row delete; view modal closing on X, outside `mouseDown`, **and** `Escape` via a `keydown` listener; "No messages yet" empty state |

### ⚠️ Structural conflicts

1. **Navigation model.** The 2nd generation uses component state plus
   `window.location.pathname` for `/login` and `/backoffice`. This project uses
   `HashRouter` ([src/App.jsx](../src/App.jsx)). Any reuse must convert to routes
   under the `#` fragment. The grading sheet requires the served path stay at `/`.
2. **1st-generation anchors.** `href="#work"`, `#about`, `#contact` collide with
   `HashRouter`, which reads `#…` as a route.
3. **Language.** The design is TypeScript + Tailwind + `lucide-react`. This project
   is JavaScript + plain CSS with no icon library. Reuse means translating, not
   copying.

---

## 3. Content

> **Naming rule applied.** The design names the San Diego employer directly. Per
> [ai-spec.md](ai-spec.md) "Resolved content decisions", it is recorded here as
> **"Defense Contractor"** and must never appear under its real name on the site.

### Education

Reverse chronological. Dates included — see the note after the table.

| Institution | Degree / Program | Dates |
| --- | --- | --- |
| University of Iowa | M.S., Industrial & Systems Engineering | 2017–2019 |
| Grinnell College | B.A., Biochemistry | 2010–2014 |

> ⚠️ **Dates are recorded here but deliberately NOT used on the site.**
> `ai-spec.md` records "Education entries carry no dates" as a deliberate,
> accepted risk against the grading sheet, which requires "institution name,
> degree/program, **and dates**". The design supplies those dates, so adopting
> them would close that gap — the student was asked and **reaffirmed the
> no-dates decision**. The Portfolio page must show institution and
> degree/program only. The dates above exist for reference, not for rendering.

### Work experience

Reverse chronological.

| Role | Organization | Dates | Description |
| --- | --- | --- | --- |
| Forward Deployed Engineer | Codeboxx | Apr 2026 — Present | Analyze business use cases and build full-stack applications with AI-assisted MERN and Java/Spring Boot architectures, combining product thinking with human factors. |
| Senior Product Consultant | **Defense Contractor** | Jun 2024 — Jul 2025 | Led human factors, product, and 510(k) work for a Class II surgical needle-counting system; translated unmanned-vehicle operator priorities into product requirements and interface direction. |
| Product Consultant | Goddard | May 2023 — Jun 2024 | Delivered UX and human-factors research for medical, robotics, web, and mobile clients; tested Figma prototypes with 50+ participants and improved first-click success by 22%. |
| Product Owner | Ford Motor Company | Oct 2019 — Aug 2022 | Led an agile team of eight through Ford's in-vehicle onboarding prototype. Customer research across 60+ participants led to a 95% valuable-or-highly-valuable acceptance result. |

### Projects — two sets exist

**Set A — 6 projects** (`Portfolio.dc.html`, 1st generation). Confirmed by the
student as real work drawn from their professional history.

| Project | Domain | Year | Tags | Image |
| --- | --- | --- | --- | --- |
| AV Perception HMI | Autonomous Vehicles | 2023 | UX · Systems · Safety-Critical | `tech-in-nature.jpg` |
| Surgical Planning Workflow | Medical Device | 2022 | Product Management · UX · FDA 510(k) | `circuit-amber.jpg` |
| Field Health Data Platform | Global Health | 2024 | Full-Stack · Product · Low-Bandwidth | `analytics-dashboard.jpg` |
| Mission Systems Dashboard | Defense | 2021 | Systems Engineering · UX · Real-Time | `forest-sunset.jpg` |
| Justice Access Navigator | Social Justice | 2024 | Social Entrepreneurship · Full-Stack · Civic Tech | `urban-greenery.jpg` |
| Supply Chain Transparency | Social Enterprise | 2023 | Product Management · API · Impact | `solar-architecture.jpg` |

Full descriptions, verbatim:

- **AV Perception HMI** — Operator interface for a Level 4 AV fleet — translating
  real-time sensor fusion and edge-case decisions into actionable displays for
  remote supervisors.
- **Surgical Planning Workflow** — End-to-end product ownership of a pre-operative
  planning tool — requirements, regulatory documentation, and clinical validation
  across orthopedic surgery suites.
- **Field Health Data Platform** — Open-source platform for community health
  workers to collect and sync patient data offline — React Native, Node.js,
  PostgreSQL.
- **Mission Systems Dashboard** — Operator console for mission-critical ground
  systems — information architecture and interaction design for high-cognitive-load
  environments under ITAR constraints.
- **Justice Access Navigator** — Web app connecting low-income residents to legal
  aid, housing, and social services — co-designed with community organizers across
  three U.S. cities.
- **Supply Chain Transparency** — B2B SaaS tool helping SMEs audit and publish
  supplier labor standards — from requirements through MVP, partnered with a
  fair-trade certification body.

Original `alt` text, in the same order: "Laptop screen reflecting sunlight through
trees" · "Circuit board with glowing amber lights" · "Analytics dashboard on a
laptop screen" · "Aerial view of a vast forest at sunset" · "Dense urban greenery
interspersed with modern buildings" · "Modern building with large solar panels".
These describe the images generically rather than the projects — rewrite them
against the actual content when the Portfolio page is built.

**Set B — 3 projects** (2nd generation). Written after the design session read the
actual resume, and tied to specific roles above.

| Project | Tech / Method | Result | Description |
| --- | --- | --- | --- |
| Driver Onboarding | User stories · Cognitive walkthrough · Figma | 95% customer value rating | Designed an in-vehicle onboarding experience that helps drivers understand automated-vehicle updates without interrupting their journey. |
| Swarm Control | Scenario design · Card sorting · Systems requirements | Reduced information complexity | Mapped operator priorities and tradeoffs for cross-domain unmanned vehicles so frontend and backend teams could focus on the information that matters in time-critical decisions. |
| Surgical Needle Tracking | Ethnography · UFMEA · Validation planning | 17 critical use steps identified | Developed a risk-informed workflow and acceptance criteria for a surgical needle-counting system designed to mitigate retained-item risk in the operating room. |

> ✅ **Resolved: Set A ships.** The six projects above are what the Portfolio page
> will carry, with the image mapping already in place. Set B is retained here as a
> record only — do not put it on the site unless that decision changes.

### Technical skills (Home requires ≥3, each with icon + supporting text)

| Skill | Supporting text | Icon used in design |
| --- | --- | --- |
| Full-stack systems | React, Node.js, Java, Spring Boot, SQL, REST APIs, and Git — chosen to turn a well-defined use case into a working product. | `Code2` |
| Research to requirements | Task analysis, user testing, surveys, A/B testing, and systems requirements that make complex work measurable and buildable. | `BrainCircuit` |
| Product delivery | Roadmaps, backlogs, data visualization, and cross-functional documentation for teams working in high-consequence domains. | `Layers3` |

`ai-spec.md` lists five alternative technical skills drawn from the resume. Either
set satisfies the requirement.

### Soft skills (Home requires ≥3)

| Skill | Supporting text | Icon used in design |
| --- | --- | --- |
| Facilitation | Bring technical teams, subject-matter experts, and end users into the same decision-making conversation. | `UsersRound` |
| Stakeholder alignment | Translate competing priorities into clear tradeoffs, practical next steps, and a shared roadmap. | `Handshake` |
| Safety-minded judgment | Work deliberately in regulated and safety-critical contexts where trust, traceability, and human limits matter. | `ShieldCheck` |

### Expertise and domain lists (1st generation, About section)

**Expertise** — Industrial & Systems Engineering (requirements, architecture,
safety-critical design) · Product Management (roadmap, stakeholder alignment,
regulatory environments) · UX & Human Factors (research, interaction design,
usability in complex systems) · Full-Stack Development (React, Node.js, Python,
PostgreSQL, cloud infrastructure)

**Domains** — Autonomous Vehicles (HMI, perception UX, fleet ops) · Medical Device
(FDA-regulated, clinical workflows) · Defense (mission systems, ITAR, real-time
ops) · Global Health (low-resource settings, field tools) · Social Justice (civic
tech, legal aid, community co-design) · Social Entrepreneurship (impact ventures,
B2B SaaS, NGO partnerships)

### Links page

The design's 2nd generation lists three: LinkedIn, Coursera learning profile, and
a resume download. `ai-spec.md` specifies four with fuller descriptions (LinkedIn,
GitHub, Coursera, Figma design file) — **use the spec's list**, it is richer and
already resolved.

### Headline and body copy

**1st generation hero**
> Complex systems, *built for people.*
> Systems engineer and product leader with deep experience in autonomous vehicles,
> medical devices, and defense with a new focus on global health, social justice,
> and sustainable technology.

**2nd generation hero**
> Omeed Kashef *turns complexity* into clear next steps.
> Forward Deployed Engineer and product leader working across safety-critical
> systems, full-stack software, and human experience — now focused on technology
> that supports people and the living world.

Eyebrow: `Systems · Product · UX · Engineering` (1st) or
`Systems · Product · Human factors` (2nd).

**About prose (1st generation, 3 paragraphs)** — retained verbatim in
`Portfolio.dc.html`. Note that paragraph 1 references "defense systems" generically
and does not name the employer, so it is safe as written.

**Contact page**
> Working on something *that matters?*
> I'm open to roles, consulting, and collaborations in global health, social
> justice, and social enterprise — especially where technical depth and product
> thinking are both needed.

Email `omeedkashef@gmail.com`. Location line: "Tampa Bay, Florida · open to global
opportunities".

---

## 4. Corrections applied when capturing

| Item | In the design | Corrected to | Why |
| --- | --- | --- | --- |
| San Diego employer | Pacific Science & Engineering Group | **Defense Contractor** | Resolved decision in `ai-spec.md` |
| Admin password | `C0deB0xx4dm!` | `C0deB0xx4dm!n` | Grading sheet and `ai-spec.md` both specify the trailing `n` |
| Image sources | 7 remote Unsplash URLs | local files in `src/assets/` | Grading and spec require locally hosted images |

---

## 5. Light-mode palette

`Portfolio-print.dc.html` (saved at [design-source/Portfolio-print.dc.html](design-source/Portfolio-print.dc.html))
is a print translation of the same design, and it is the **only light theme the
design produced**. It maps one-for-one onto the dark tokens in
[src/index.css](../src/index.css), so it is the natural starting point if the
light/dark Extra Mile gets built.

| Dark token | Dark value | Print / light equivalent |
| --- | --- | --- |
| `--bg` | `#0b1610` | `#ffffff` (page) |
| `--fg` | `#d6ecd8` | `#16241b` |
| `--fg-muted` | `#7a9e82` | `#5c7a63` |
| body copy | `#7a9e82` | `#3c5544` |
| `--primary` | `#4fa874` | `#2f6b4a` |
| `--accent` | `#c89a2e` | `#8a6a12` |
| `--border` | `rgba(79,168,116,0.16)` | `rgba(22,36,27,0.16)` |
| `--surface` | `#162419` | `#e6ebe6` |

Note the pattern: the light theme darkens `--primary` and `--accent` for contrast
against white rather than reusing the dark-theme values. Same hues, different
lightness.

The print layout also shows the design's own resume treatment — two-column prose,
`break-inside: avoid` on project rows, a `break-before: page` before Selected work,
and a `1.7in` image column. Useful if the downloadable resume PDF ever needs
regenerating from the site rather than from the existing file.

---

## 6. The Figma Make bundle

`Portfolio website design.make` — 16.4 MB, exported 2026-07-26 — could not be read
through the MCP (256 KiB cap). It was downloaded manually and now lives at
`preliminary-docs/Portfolio website design.make`, which is gitignored. **Do not
commit it**: 16 MB of binary has no place in a graded repository, and everything
useful has been extracted.

It is a ZIP of 26 entries: `canvas.fig` (Figma canvas binary), `ai_chat.json`
(570 KB design conversation), 2 PNGs, and 6 PDFs.

### ✅ `FC18F7DE-…-1.PNG` — resolved, nothing is missing

The design chat references both `FC18F7DE-…-1.PNG` and `FC18F7DE-…​.PNG`, but the
bundle contains **only one copy of that image** (SHA-1 `f89829b2…`, 1536×1024),
byte-identical to the file already in `preliminary-docs/Portfolio/`. The `-1`
suffix is Figma Make's rename-on-duplicate-upload. `cityDetailImage` and
`heroImage` are the same picture. There is no second hero variant, and
`src/assets/hero.jpg` is derived from it.

### Second PNG — the mood board

`4b07218b…` (496×565) is the **style reference** that shaped the design, not site
content: a website mockup, three colour-swatch columns, and photo direction
(forest, circuit board, hands over a lit keyboard). Saved as
[design-source/moodboard.png](design-source/moodboard.png) since it explains where
the forest-and-gold palette came from.

### PDFs

Five duplicate documents already in `preliminary-docs/` — portfolio, resume,
LinkedIn export, m16 business document, FSD grading sheet.

One is **not** in this repository: a 9.9 MB PDF titled **"AI Consulting"**
(`e48d6e6d…`). Unknown provenance; extract from the bundle if it turns out to
matter.

### Not captured

`doc-page.js` and `support.js` — design-tool runtime scaffolding, no bearing on
this project. `canvas.fig` — proprietary binary, unreadable outside Figma.
`ai_chat.json` — the full design conversation, available in the bundle if the
reasoning behind a decision ever needs recovering.

---

## 7. Extra-mile note

The 2nd generation includes a **light/dark theme toggle** (`themeDark` state,
`document.documentElement.classList.toggle("dark")`). The grading sheet lists
light/dark mode as an Extra Mile, considered *only* once all main requirements are
complete and coach-reviewed. The token system in [src/index.css](../src/index.css)
is already CSS-custom-property based, which is the hard prerequisite — so this is
cheap to add at the end if time allows.
