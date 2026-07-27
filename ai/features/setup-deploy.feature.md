# 🤖 AI_FEATURE_Setup-Deploy

> Use with `./ai/ai-spec.md`. The global spec governs scope, tech constraints, and conventions; this document covers only the Setup & Deploy feature.

---

## Feature Identity

- **Feature Name:** Setup & Deploy
- **Related Area:** Frontend infrastructure / CI-CD

---

## Feature Goal

Take the project from an empty repository to a live, automatically deployed React application at `https://FL11024OmeedK.github.io`, so that every push to `main` rebuilds and republishes the site without manual steps.

This is the foundation feature — no other feature can be verified until this one works.

---

## Feature Scope

### In Scope (Included)

- Scaffolding a React application with Vite (JavaScript variant)
- Configuring `vite.config.js` with the correct `base` path for a root user site
- Creating the GitHub Actions workflow at `.github/workflows/deploy.yml`
- Configuring GitHub Pages to serve from the Actions deployment
- Passing `VITE_*` environment variables from repository secrets into the build step
- The base application shell (`main.jsx`, `App.jsx`) with `HashRouter` and the six routes declared in the global spec
- `.gitignore` covering `.env`, `node_modules/`, `dist/`, and `preliminary-docs/`

### Out of Scope (Excluded)

- **Supabase setup** — creating the project, the `messages` table, RLS policies, the admin user, and `src/lib/supabaseClient.js`. The grading sheet marks Supabase Setup as *not included in this feature specification*; it is prerequisite configuration handled separately and consumed by the Contact, Login, and Back Office features.
- Page content, layout, header, footer, and styling — those belong to the Project Layout and page features.
- Any custom domain or DNS configuration.
- Preview/staging deployments for `dev` or feature branches. Only `main` deploys.

---

## Sub-Requirements (Feature Breakdown)

- **A — Vite scaffold.** Create the app with `npm create vite@latest FL11024OmeedK.github.io`, selecting framework **React** and variant **JavaScript**.
- **B — Base path.** `vite.config.js` sets `base: '/'`, correct for a `username.github.io` root repository.
- **C — Deploy workflow.** `.github/workflows/deploy.yml` triggers on push to `main`, runs `npm ci` then `npm run build`, and deploys the `dist/` folder to GitHub Pages.
- **D — Pages source.** In repository settings, GitHub Pages source is set to **GitHub Actions** (not a branch).
- **E — Build-time secrets.** `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` exist as repository secrets and are passed to the build step via `env:`.
- **F — Application shell.** `main.jsx` wraps the app in `HashRouter`; `App.jsx` declares the six `Route` entries pointing at placeholder page components that later features fill in.
- **G — Ignore rules.** `.env` is listed in `.gitignore` and is never committed.

---

## User Flow / Logic (High Level)

**Developer flow**

1. Developer merges a completed feature into `dev`, then merges `dev` into `main`.
2. The push to `main` triggers the GitHub Actions workflow.
3. The workflow checks out the code, installs Node, runs `npm ci`, then `npm run build` with the `VITE_*` secrets injected as environment variables.
4. Vite writes the production bundle to `dist/`.
5. The workflow uploads `dist/` as a Pages artifact and deploys it.
6. The new version is live at `https://FL11024OmeedK.github.io`.

**Visitor flow**

1. Visitor opens `https://FL11024OmeedK.github.io`.
2. `index.html` loads, the React bundle mounts, and the Home view renders.
3. Clicking a nav link changes the route — the URL path stays `/`, only the `#` fragment changes.
4. Opening `…/#/login` directly renders the Login screen instead of the public shell.

---

## Interfaces (Pages, Endpoints, Screens)

### Frontend

- `index.html` — Vite entry document
- `src/main.jsx` — mounts React
- `src/App.jsx` — `Routes` / `Route` declarations
- `vite.config.js` — `base: '/'`

### Backend / API

None. This feature introduces no server calls.

### Infrastructure

- `.github/workflows/deploy.yml` — build and deploy pipeline
- GitHub repository settings → Pages → Source: GitHub Actions
- GitHub repository settings → Secrets and variables → Actions: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

---

## Data Used or Modified

No application data. The only values handled are build-time environment variables:

| Variable | Source | Used for |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | GitHub Actions secret (prod) / `.env` (local) | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | GitHub Actions secret (prod) / `.env` (local) | Supabase anon/publishable key |

Only the **anon/publishable** key is ever used. The `service_role` key must never appear in this repository, in the workflow, or in the bundle.

---

## Tech Constraints (Feature-Level)

- React + Vite, **JavaScript** — not TypeScript, not Next.js.
- `base` must be `'/'`. A subpath base would break asset URLs on a root user site.
- **React Router with `HashRouter`.** Never `BrowserRouter` — a real path would 404 on GitHub Pages.
- The workflow must use `npm ci`, not `npm install`, so builds are reproducible from `package-lock.json`.
- Only `main` deploys. Pushes to `dev` or `feature/*` must not publish.
- Secrets are referenced as `${{ secrets.NAME }}` in the workflow and never hard-coded.
- Anything prefixed `VITE_` is embedded in the client bundle and is therefore public by design — only publishable values may use that prefix.

---

## Acceptance Criteria

- [ ] `npm run dev` starts the app locally without errors.
- [ ] `npm run build` completes without errors and produces a `dist/` folder.
- [ ] `vite.config.js` sets `base: '/'`.
- [ ] `.github/workflows/deploy.yml` exists, triggers on push to `main`, and runs `npm ci` → `npm run build` → deploy of `dist/`.
- [ ] The workflow passes `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the build step via `env:`.
- [ ] Both secrets are configured in repository settings.
- [ ] GitHub Pages source is set to GitHub Actions and a run has completed successfully.
- [ ] `https://FL11024OmeedK.github.io` loads the React application.
- [ ] Navigating between pages never changes the URL path — it stays `/`, with only the `#` fragment changing.
- [ ] Opening `https://FL11024OmeedK.github.io/#/login` directly renders the Login screen and does not 404 on refresh.
- [ ] `.env` is gitignored and absent from the repository history.
- [ ] No Supabase key appears in any committed file.

---

## Notes for the AI

- Build the shell only. Page components created here are placeholders — do not implement header, footer, styling, or page content in this feature.
- Keep `App.jsx` small and readable: `HashRouter` in `main.jsx`, a single `Routes` block in `App.jsx`, one `Route` per screen.
- Read the hash on first mount as well as on change, so a direct link to `#/backoffice` works on a cold load.
- Add `react-router-dom` only; no other dependency beyond what Vite scaffolds — `@supabase/supabase-js` arrives with the Supabase-dependent features.
- If the deploy workflow fails, report the actual failing step and log output; do not guess at a fix or silently change unrelated configuration.
