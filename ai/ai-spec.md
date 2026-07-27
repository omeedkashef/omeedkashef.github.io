# 🤖 AI_SPEC — Project Specification (Main)

> **Read this document first, before implementing any feature.**
> Every feature specification in `./ai/features/` is a supplement to this file, never a replacement.
> Where a source document disagrees with another, the **FSD Grading Sheet (m16)** is the final authority.

---

## Project Identity

- **Project Name:** `FL11024OmeedK.github.io` — Personal Portfolio Website
- **Short Description:**
  A public-facing personal portfolio for Omeed Kashef, built with React + Vite and deployed to GitHub Pages via GitHub Actions. It presents skills, experience, projects and links, and uses Supabase to persist contact-form messages and to authenticate a private admin back office.
- **Project Type:** Static Single-Page Application (React + Vite), no custom backend, with Supabase as Backend-as-a-Service.

---

## Goal and Scope

### Goal

Deliver a live, publicly accessible portfolio at `https://FL11024OmeedK.github.io` that represents Omeed Kashef professionally to employers and recruiters, and that proves competence in React, responsive design, CI/CD deployment, and third-party service integration.

This is the final module of the program. There is **no fictional client** — the student is the client, and there is **no starter codebase**. The project begins from a blank slate scaffolded with `npm create vite@latest`.

### In Scope (Build Now)

Eight core features, each with its own feature specification document:

1. **Setup & Deploy** — Vite React scaffold, `vite.config.js` base path, GitHub Actions deploy workflow, GitHub Pages configuration.
2. **Project Layout** — `Main` layout wrapper, `Header`/`Navbar`, `Footer`, AI-generated logo, global responsive behavior.
3. **Home Page** — introduction, technical skills, soft skills, AI-generated images.
4. **Portfolio Page** — education, work experience, projects, downloadable resume PDF, AI-generated images.
5. **Link Page** — at least 3 link cards with image, title, description, external URL.
6. **Contact Page** — name/email/message form, client-side validation, Supabase insert, success/failure feedback.
7. **Login Page** — unlisted secret route, email/password form, Supabase `signInWithPassword`, session persistence.
8. **Back Office** — protected `/backoffice` route, messages table with view modal and delete, logout.

Supporting deliverables that live in the repository:

- `./README.md` — project title/description, tech stack, project structure, setup instructions, environment variables, API documentation, author (including LinkedIn summary + profile link).
- `./CONCEPTS.md` — three challenging concepts with purpose, difficulty, and usage location.
- `./docs/script-1.md`, `./docs/pitch-feedback.md`, `./docs/script-2.md` — elevator pitch scripts and feedback.
- `./LeetCode-Challenges/<challenge-name>.png` — solution screenshots for the five required problems.
- `./ai/ai-spec.md` and `./ai/features/*.feature.md` — this spec and the eight feature specs.

### Out of Scope (Do NOT Build)

- **Any custom backend or server.** GitHub Pages serves static files only. No Express, no Node server, no serverless functions.
- **Public user registration or sign-up.** The single admin account is created manually in the Supabase dashboard, never through the app.
- **Public read access to messages.** Visitors may `INSERT` only; reading requires authentication.
- A CMS, blog engine, comment system, analytics dashboard, or newsletter.
- State-management libraries (Redux, Zustand, MobX) — React state and context are sufficient at this size.
- A component/UI library (Material UI, Bootstrap, Chakra, Tailwind) unless a feature spec explicitly permits it. Styling is custom CSS.
- Server-side rendering, i18n frameworks, or testing frameworks beyond what a feature spec requires.
- Committing `.env`, `submission-summary.md`, or the `preliminary-docs/` folder to the repository.
- **Extra-mile features (Light/Dark mode, Languages) until all eight core features are complete and reviewed by a coach.** If built, they follow `./ai/features/light-dark-mode.feature.md` and `./ai/features/languages.feature.md`.

---

## Users and Use Cases

- **Visitor (anonymous public):** browses Home, Portfolio, Links and Contact pages; downloads the resume PDF; submits a contact message. Cannot read stored messages and cannot see any link to the login or back office.
- **Admin (Omeed Kashef, single account):** reaches the secret login route by typing the URL directly (or a secret keydown), authenticates with Supabase, then reads, views in full, and deletes contact messages in the back office, and logs out.

---

## Feature Index (Links Only)

- `./ai/features/setup-deploy.feature.md`
- `./ai/features/header-footer.feature.md`
- `./ai/features/home-page.feature.md`
- `./ai/features/portfolio-page.feature.md`
- `./ai/features/link-page.feature.md`
- `./ai/features/contact-page.feature.md`
- `./ai/features/login-page.feature.md`
- `./ai/features/back-office.feature.md`

Extra mile only (after core completion and coach review):

- `./ai/features/light-dark-mode.feature.md`
- `./ai/features/languages.feature.md`

---

## Pages / Screens / Routes (Project Map)

This is a frontend-only project. There are no owned API routes; all server interaction goes through the Supabase client.

### Routes

| Route | Page | URL shown | Access | In navigation? |
| --- | --- | --- | --- | --- |
| `/` | Home | `…github.io/#/` | Public | Yes |
| `/portfolio` | Portfolio | `…github.io/#/portfolio` | Public | Yes |
| `/links` | Links | `…github.io/#/links` | Public | Yes |
| `/contact` | Contact | `…github.io/#/contact` | Public | Yes |
| `/login` | Login | `…github.io/#/login` | Public but unlisted | **No** |
| `/backoffice` | Back Office | `…github.io/#/backoffice` | Authenticated only | **No** |

**Routing: React Router with `HashRouter`.**

The grading sheet requires that the URL *path* always stays `https://FL11024OmeedK.github.io` and never becomes `/home`, `/portfolio`, etc. `HashRouter` satisfies this — everything after the `#` is a fragment, not a path, so the path served by GitHub Pages is always `/`. The docebo module doc recommends `HashRouter` for exactly this reason, and it is also what makes a direct link or a refresh on `#/backoffice` work on static hosting, where a real `/backoffice` request would 404.

This also gives Login and Back Office genuinely addressable URLs, which the Secret Login Route and Back Office Route requirements depend on: the login page must be reachable "by manually typing the URL OR secret keyboard keydown", and `/backoffice` must render when authenticated and redirect when not.

Use `BrowserRouter` nowhere. Login and Back Office must not appear in the header, footer, or mobile bottom navigation.

### External Services (not our endpoints)

- Supabase REST/Auth, reached only through `src/lib/supabaseClient.js`:
  - `INSERT` into `messages` — public, used by the contact form.
  - `SELECT` from `messages` — authenticated only, used by the back office.
  - `DELETE` from `messages` — authenticated only, used by the back office.
  - `auth.signInWithPassword()` / `auth.signOut()` / `auth.getSession()`.

---

## Data and Models (Simple)

### Database — Supabase (PostgreSQL)

**Table: `messages`**

> The grading sheet names this table `messages`. Other course material refers to `contact_messages`; **`messages` is correct** and is the name used everywhere in this project.

| Field | Purpose |
| --- | --- |
| `id` | Primary key |
| `name` | Sender's name, from the contact form |
| `email` | Sender's email, from the contact form |
| `message` | Message body, from the contact form |
| `created_at` | Timestamp, used to order the back office newest-first |

**Row Level Security (RLS):** enabled on `messages`.

- Anonymous (public) role: `INSERT` allowed. `SELECT` **denied**.
- Authenticated role: `SELECT` and `DELETE` allowed.

**Auth:** email/password provider enabled. One admin user is created manually in the Supabase dashboard — `admin@codeboxx.com` / `C0deB0xx4dm!n`. The app never registers users.

### Static / local data

- Skills, education, work history, projects and links are hard-coded content or local JSON — there is no database behind them.
- The resume PDF is a static asset served from the app.

---

## Content Sources and Authenticity

This is a real professional portfolio that employers will read. **All content must be true.**

- **Education and work history come from the real resume and LinkedIn profile.** Do not invent employers, roles, dates, or metrics.
- **Projects are the applications actually built during the Codeboxx program** (Rocket Elevators and the other module projects), described with their real tech stack and purpose.
- **Never carry over the placeholder projects from the Figma/Claude design export** — "AV Perception HMI", "Surgical Planning Workflow", "Field Health Data Platform", "Mission Systems Dashboard", "Justice Access Navigator". These are design filler and describe work that is not the student's.
- **Never carry over the design's Unsplash image URLs.** All images are locally hosted, and the required ones are AI-generated with the tool documented.

### Known content gaps to resolve before the Portfolio page is done

- Education entries have **no dates** on the resume; the grading sheet requires institution, degree/program, **and dates**. These must be supplied.
- The resume anonymises the San Diego employer as "Defense Contractor" while LinkedIn names **Pacific Science & Engineering Group, Inc.** Pick one and use it consistently.
- Haemonetics is titled "Usability Consultant" on the resume and "Product Engineer" on LinkedIn. Pick one.
- `Links.docx` currently holds a single URL. The Links page needs **at least three**, each with a title, a 1–3 sentence description, and a thumbnail image.
- Soft skills are not itemised anywhere in the source documents. At least three must be written, each with an icon and supporting text.

### Design source

A visual prototype exists (Figma → Claude Design export, "Nature and technology in harmony"): a dark, nature-toned design system with CSS custom properties. Its **look and tokens** are a good foundation. Its **structure is not** — it is a single-page scroller with Work/About/Contact only. It is missing the Links page, the education section, the soft-skills section, the resume download button, the AI-generated logo, the footer copyright notice, and the mobile bottom icon navigation. Treat the design as styling reference, and this specification as the source of truth for structure and content.

---

## Tech Stack and Tools

### Frontend

- React (scaffolded with `npm create vite@latest`, framework React, variant JavaScript)
- Vite (build tool and dev server)
- React Router (`HashRouter`) — see Routing above
- Custom CSS with CSS custom properties (variables) for all colors and spacing — no UI framework

### Backend

- **None.** GitHub Pages is static hosting only.

### Database / Services

- Supabase (PostgreSQL + Auth + RLS), accessed with `@supabase/supabase-js`

### Tools

- GitHub Actions (build and deploy to GitHub Pages)
- AI image generation tools, for the logo and page images (the tool used must be documented)
- Git / GitHub

---

## Repository Structure

```
/
├─ .github/workflows/deploy.yml   # build + deploy to GitHub Pages
├─ ai/
│  ├─ ai-spec.md                  # this document
│  └─ features/                   # one spec per feature
├─ docs/
│  ├─ script-1.md
│  ├─ pitch-feedback.md
│  └─ script-2.md
├─ LeetCode-Challenges/           # solution screenshots (.png)
├─ public/                        # static assets (resume PDF, favicon)
├─ src/
│  ├─ assets/                     # images, AI-generated logo
│  ├─ components/                 # Header, Footer, Main layout, shared UI
│  ├─ lib/supabaseClient.js       # the ONLY place the Supabase client is created
│  ├─ pages/                      # Home, Portfolio, Links, Contact, Login, BackOffice
│  ├─ App.jsx                     # routes
│  └─ main.jsx                    # entry point
├─ .env                           # LOCAL ONLY — gitignored, never committed
├─ .gitignore
├─ CONCEPTS.md
├─ README.md
├─ index.html
├─ package.json
└─ vite.config.js                 # base: '/'
```

---

## Rules for the AI

1. **Read this spec and the relevant feature spec before writing any code.** Do not start from the prompt alone.
2. **Build only what is in scope.** Do not add features, pages, routes, or dependencies that no spec requires.
3. **Write junior-friendly code.** Plain function components with hooks, clear names, small files. No advanced patterns, no clever abstractions, no premature optimization.
4. **Never create a backend.** If a task seems to need a server, it must be solved with Supabase or static data instead.
5. **Create the Supabase client in exactly one place** — `src/lib/supabaseClient.js`. Every feature imports it from there.
6. **Never hard-code Supabase credentials.** Read `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from environment variables. Only the anon/publishable key is ever used — the `service_role` key must never appear in this project.
7. **Never commit `.env`.** It stays in `.gitignore`; the deploy workflow injects the values from GitHub repository secrets.
8. **Reuse before creating.** Extend an existing component or file when one fits; do not duplicate layout, styling, or fetch logic.
9. **Every page renders inside the `Main` layout** so the header and footer are consistent everywhere.
10. **Keep `/login` and `/backoffice` out of all navigation.**
11. **Validate user input on the client before sending it to Supabase.**
12. **All images need meaningful `alt` text**, and AI-generated images must be documented (comment or spec).
13. **Explain changes briefly** after generating code, and flag anything the student should verify manually.
14. **Do not refactor unrelated code** while implementing a feature.

### Coding standards / conventions

- **Components:** PascalCase files and function names (`Header.jsx`, `ContactForm.jsx`).
- **Variables and functions:** camelCase. **Constants:** UPPER_SNAKE_CASE.
- **Routes and CSS classes:** lowercase, hyphenated (`/backoffice`, `.nav-link`).
- **Indentation:** 2 spaces. Semicolons on. One component per file.
- **Commit messages** follow `<type>(optional scope): <short summary>` — e.g. `feat(contact): add form validation`.
  Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, plus `init`, `perf`, `build`, `ci`, `revert`, `typo`, `ui`, `ux`, `deps`, `wip`.
- **Branching:** `feature/*` branches are created from `dev` and merged back into `dev`; `dev` merges into `main` at the end. **No direct commits to `main`.** Only `main` is graded, and history must show `feature → dev → main`.

---

## How to Run / Test the Project

### Local development

1. Install dependencies: `npm install`
2. Create a `.env` file in the project root (never committed):
   ```
   VITE_SUPABASE_URL=<your Supabase project URL>
   VITE_SUPABASE_ANON_KEY=<your Supabase anon/publishable key>
   ```
3. Start the dev server: `npm run dev`
4. Open the printed local URL (default `http://localhost:5173`).
5. Verify the build before pushing: `npm run build`, then `npm run preview`.

### Manual test path

- Visit `/`, `/portfolio`, `/links`, `/contact` from the header on desktop and on a ≤768px viewport.
- Submit the contact form with empty fields and a malformed email — both must be rejected with a visible error.
- Submit a valid message — confirm success feedback, cleared fields, and a new row in the Supabase `messages` table.
- Visit `/backoffice` while logged out — must redirect to login.
- Log in with the admin credentials, confirm redirect to the back office, refresh the page and confirm the session survives.
- Open a message modal, close it with the X, an outside click, and Escape. Delete a message and confirm it disappears immediately.
- Log out and confirm the session is cleared.

### Deployment

- Push to `main` triggers `.github/workflows/deploy.yml`, which runs `npm ci`, `npm run build`, and deploys `dist/`.
- GitHub Pages source must be set to **GitHub Actions**.
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` must exist as repository secrets (Settings → Secrets and variables → Actions) and be passed to the build step via `env:`.

---

## Definition of Done

### Project setup

- [ ] Repository is **public**, named `FL11024OmeedK.github.io`, with all coaches added as collaborators.
- [ ] Branches `main`, `dev`, and `feature/*` exist; no direct commits were made to `main`.
- [ ] All feature branches merged into `dev`, then `dev` merged into `main`; history shows `feature → dev → main`.
- [ ] `.env` and `preliminary-docs/` are gitignored; `submission-summary.md` is **not** in the repository.

### Application

- [ ] `npm run build` completes without errors and the site is live at `https://FL11024OmeedK.github.io`.
- [ ] The URL path never becomes `/home`, `/portfolio`, etc. — navigation happens after the `#`, and the served path stays `/`.
- [ ] Typing `#/login` or `#/backoffice` opens those screens directly, and refreshing any route does not 404.
- [ ] All portfolio content is factually true; no placeholder projects from the design export remain.
- [ ] Header and footer render on every page; the AI-generated logo links to Home.
- [ ] Layout is correct on desktop (>768px, horizontal nav) and mobile (≤768px, bottom icon nav) with no horizontal overflow.
- [ ] Home has ≥3 distinct sections, ≥3 technical skills and ≥3 soft skills (each with supporting text and an icon), and ≥2 AI-generated images.
- [ ] Portfolio has education, work, and project sections in reverse chronological order, a downloadable resume PDF, and ≥2 AI-generated images.
- [ ] Links page shows ≥3 cards, each with image, title, description, and a URL opening in a new tab, plus ≥1 AI-generated image.
- [ ] Contact form validates all three fields and email format, inserts into Supabase `messages`, and shows distinct success/failure feedback with fields reset on success.
- [ ] Login is reachable only by direct URL, authenticates via `signInWithPassword`, persists the session across refresh, and shows a distinct error on failure.
- [ ] Back office is protected, lists messages newest-first with Name/Email/Date/Actions, opens a full-message modal (closable via X, outside click, and Escape), deletes rows instantly, and logs out.
- [ ] RLS allows public `INSERT` and denies public `SELECT`; only the anon key is used anywhere.
- [ ] All images have meaningful `alt` text and the AI tools used are documented.

### Documentation and deliverables

- [ ] `README.md` covers title/description, tech stack, project structure, setup, environment variables, API documentation, and author with LinkedIn summary + link (sections that do not apply are explicitly noted).
- [ ] `CONCEPTS.md` lists 3 concepts with purpose, why each was challenging, and usage location.
- [ ] `docs/script-1.md`, `docs/pitch-feedback.md`, and `docs/script-2.md` exist.
- [ ] All 5 LeetCode screenshots saved under `./LeetCode-Challenges/`.
- [ ] This spec plus all 8 feature specs exist under `./ai/`.
- [ ] All required videos recorded and uploaded to YouTube as **Unlisted**: elevator pitch #1, elevator pitch #2, CONCEPTS explanation, problem-solving explanation, technical demo & code overview.
- [ ] `submission-summary` document (submitted through the platform, not committed) contains student name, module name, repository link, all video links, and required credentials.
- [ ] Final resume and LinkedIn profile reviewed and approved.
- [ ] Submitted by 11:59 PM Friday of the deadline week.
