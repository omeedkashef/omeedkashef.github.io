# Omeed Kashef — Personal Portfolio (Module 16)

Live site: **https://FL11024OmeedK.github.io**

LinkedIn Profile: https://www.linkedin.com/in/omeedkashef/

LinkedIn Update: 
- updated open to volunteer section and areas of interest
- updated link to portfolio website
- updated AI Native Full Stack certification end date and skills

---

## Table of Contents

- [Project Description](#project-description)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation / Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Author / Contributors](#author--contributors)

---

## Project Description

This is the personal portfolio site of Omeed Kashef — a systems engineer and product leader working across autonomous vehicles, medical devices, defense, and now global health and social impact.

The site presents his skills, education, work history, projects, and professional links in one place, and lets a visitor send him a message directly. Behind an unlisted URL, a private back office lets him read and delete those messages.

**Who it is for:** employers, recruiters, collaborators, and anyone who wants to understand what he does and get in touch.

**What problem it solves:** a resume PDF is static, easy to lose, and says nothing about how someone builds. This site is both the record and the demonstration — the portfolio is itself the evidence of the full-stack work it describes.

It is a static single-page application. There is no server of our own; GitHub Pages serves the built files, and Supabase provides the database and authentication.

### Pages

| Route | Page | Access |
| --- | --- | --- |
| `#/` | Home — introduction, technical skills, soft skills | Public |
| `#/portfolio` | Portfolio — education, work experience, projects, resume download | Public |
| `#/links` | Links — professional profiles and the design file | Public |
| `#/contact` | Contact — message form writing to Supabase | Public |
| `#/login` | Login — Supabase email/password sign-in | Unlisted |
| `#/backoffice` | Back Office — read and delete messages | Authenticated only |

Login and Back Office appear in no navigation. They are reachable only by typing the URL.

**Build status:** Home, Portfolio, Links, and Contact are complete. Login and Back Office are in progress.

### Why the URL has a `#`

The site uses React Router's `HashRouter`, so every route lives after a `#` fragment and the served path always stays `/`. This is deliberate: GitHub Pages serves static files with no server-side routing, so a real path like `/portfolio` would return a 404 on refresh or on a direct link. With `HashRouter`, refreshing or deep-linking to any route — including `#/backoffice` — works.

---

## Tech Stack

**Frontend**
- React 19.2.8
- Vite 8.1.5 (build tool and dev server)
- React Router 7.18.1 — `HashRouter` only
- Plain CSS with custom properties. No UI framework, no CSS-in-JS, no icon library — icons are hand-authored inline SVG.

**Backend**
- None of our own. The site is fully static.

**Database / Services**
- Supabase (PostgreSQL, Auth, Row Level Security) via `@supabase/supabase-js` 2.110.9

**DevOps**
- GitHub Actions — builds and deploys to GitHub Pages on every push to `main`
- GitHub Pages — hosting, served from the Actions deployment
- Node 22 in CI

**Tooling**
- oxlint 1.75.0 for linting
- DALL·E via ChatGPT for the logo and page imagery

**Testing**
- No automated test suite. Verification for this project was done by driving the built app in headless Chromium at 1280×800 and 375×812 — checking rendered structure, responsive behaviour, horizontal overflow, colour contrast, and the live Supabase round trip. There is no unit or integration test framework in the repository.

---

## Project Structure

```
FL11024OmeedK.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Build + deploy to GitHub Pages on push to main
├── ai/                           # AI specification documents (graded deliverables)
│   ├── ai-spec.md                # Project-wide spec — read before any feature
│   ├── design-reference.md       # Structure and content captured from the design tool
│   ├── design-source/            # Raw design artefacts kept for reference
│   └── features/                 # One specification per feature
│       ├── setup-deploy.feature.md
│       ├── header-footer.feature.md
│       ├── home-page.feature.md
│       ├── portfolio-page.feature.md
│       ├── link-page.feature.md
│       └── contact-page.feature.md
├── public/                       # Served as-is, not fingerprinted
│   ├── Omeed_Kashef_Resume.pdf   # Downloadable resume
│   └── favicon.svg
├── src/
│   ├── assets/                   # Images — AI-generated and stock, all local
│   ├── components/               # Shared chrome
│   │   ├── Main.jsx              # Layout wrapper: Header + page + Footer
│   │   ├── Header.jsx            # Fixed top bar, logo, desktop nav
│   │   ├── MobileNav.jsx         # Bottom icon bar, ≤768px
│   │   ├── Footer.jsx            # Contact info and copyright
│   │   ├── Icons.jsx             # Inline SVG icon set
│   │   └── navItems.js           # Single source of truth for public navigation
│   ├── lib/
│   │   └── supabaseClient.js     # The ONLY place the Supabase client is created
│   ├── pages/                    # One component per route
│   │   ├── Home.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Links.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   └── BackOffice.jsx
│   ├── App.jsx                   # Route table, wrapped in the Main layout
│   ├── App.css                   # Layout primitives and component styles
│   ├── index.css                 # Design tokens, reset, base typography
│   └── main.jsx                  # Entry point — mounts HashRouter
├── .env                          # LOCAL ONLY — gitignored, never committed
├── .env.example                  # Template showing which variables are needed
├── index.html
├── package.json
└── vite.config.js                # base: '/'
```

**Two conventions worth knowing:**

- `src/lib/supabaseClient.js` is the only file that calls `createClient`. Every feature imports from it rather than constructing its own client.
- `src/components/navItems.js` is the only list of public routes. The desktop nav and mobile nav both read from it, so they cannot drift apart — and Login and Back Office are absent from it by construction, which is what keeps them out of every navigation surface.

---

## Installation / Setup

**Prerequisites:** Node.js 22 or later, and Git.

```bash
# Clone the repository
git clone https://github.com/FL11024OmeedK/FL11024OmeedK.github.io.git

# Navigate to the project directory
cd FL11024OmeedK.github.io

# Install dependencies exactly as locked
npm ci

# Create your local environment file from the template
cp .env.example .env
# then open .env and fill in the two Supabase values (see below)

# Start the development server
npm run dev
```

The application will be available at **http://localhost:5173**.

### Available scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Produce a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run oxlint across the project |

### Running without Supabase

The app is designed to load even when Supabase is not configured. If `.env` is missing or incomplete, every page still renders; the contact form appears disabled with a note to email directly, and a warning explains what is missing in the browser console. Nothing white-screens.

---

## Environment Variables

Two variables are required. Both are read at **build time** by Vite, not at runtime.

```env
# Supabase project URL — Project Settings → Data API
VITE_SUPABASE_URL=https://your-project-ref.supabase.co

# Supabase publishable (anon) key — Project Settings → API Keys
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

Create a `.env` file in the project root and add these with your actual values. `.env` is listed in `.gitignore` and must never be committed. `.env.example` documents the names without the values.

**Anything prefixed `VITE_` is compiled into the public JavaScript bundle and is readable by anyone who visits the site.** That is expected here: the publishable key is designed to be public, and Row Level Security is what actually protects the data. The Supabase **secret / `service_role` key must never** be placed in this file, in the workflow, or anywhere in this repository.

For deployment the same two names are stored as **GitHub repository secrets** (Settings → Secrets and variables → Actions) and injected into the build step by `.github/workflows/deploy.yml`.

---

## API Documentation

**This project exposes no API endpoints of its own.** It is a static front end with no server, so there are no routes to document in the usual sense.

All server interaction goes through the Supabase client in `src/lib/supabaseClient.js`. These are the operations the application performs:

### Database — table `messages`

| Operation | Called by | Who may perform it |
| --- | --- | --- |
| `supabase.from('messages').insert({ name, email, message })` | Contact page | Anonymous (public) |
| `supabase.from('messages').select()` | Back Office | Authenticated only |
| `supabase.from('messages').delete()` | Back Office | Authenticated only |

**Table schema**

| Column | Purpose |
| --- | --- |
| `id` | Primary key, set by the database |
| `name` | Sender's name, from the contact form |
| `email` | Sender's email, from the contact form |
| `message` | Message body |
| `created_at` | Timestamp, set by the database, used to order the back office newest-first |

### Authentication

| Operation | Called by |
| --- | --- |
| `supabase.auth.signInWithPassword({ email, password })` | Login page |
| `supabase.auth.getSession()` | Back Office route guard |
| `supabase.auth.signOut()` | Back Office logout |

The app never registers users. The single admin account is created by hand in the Supabase dashboard.

### Row Level Security

RLS is enabled on `messages`, and it is the real security boundary — not the client-side code.

- **Anonymous role:** `INSERT` allowed, `SELECT` denied.
- **Authenticated role:** `SELECT` and `DELETE` allowed.

One consequence is worth recording, because it is easy to get wrong: the contact form's insert must **not** chain `.select()`. Anonymous users may write but not read, so asking for the inserted row back fails on the read even though the write succeeded — and it surfaces to the visitor as a false error.

---

## Author / Contributors

**Omeed Kashef** — [@FL11024OmeedK](https://github.com/FL11024OmeedK)

- Portfolio: [FL11024OmeedK.github.io](https://FL11024OmeedK.github.io)
- LinkedIn: [linkedin.com/in/omeedkashef](https://www.linkedin.com/in/omeedkashef)
- Email: omeedkashef@gmail.com

Systems engineer and product leader with experience across autonomous vehicles, medical devices, and defense, now focused on global health, social justice, and sustainable technology. Currently a Forward Deployed Engineer at Codeboxx.

**LinkedIn update for this module:** see the "LinkedIn Update" line at the top of this file.

**Contributors:** none — this is a solo project built for Codeboxx Module 16.
