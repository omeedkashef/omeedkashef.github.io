# Module 16 – Personal Portfolio Website

## 🎯 Purpose

This document describes three challenging technical concepts applied while building the portfolio website.

---

## ✏️ Concept - 01

**🔤 Name:**

Supabase database integration and asynchronous form submission

**🎯 Purpose:**

The contact form validates a visitor's name, email address, and message before asynchronously inserting the information into the Supabase `messages` table. The interface tracks sending, success, and failure states so visitors receive clear feedback, duplicate submissions are prevented, and their input is preserved if the request fails.

**❓ Why it was challenging:**

This feature required coordinating client-side form state with a remote database operation. I had to account for invalid input, missing environment variables, network or database errors, and repeated clicks while a request was in progress. Another challenge was working within the Row Level Security policy: anonymous visitors may insert a message but cannot read records. Therefore, the insert cannot request the newly created row with `.select()`, because the message could be saved successfully while the forbidden read would make the interface report a misleading failure.

**📍 Where (file & line):**

- `src/pages/Contact.jsx`, lines 12–18: input validation
- `src/pages/Contact.jsx`, lines 49–74: asynchronous submission and Supabase insert
- `src/pages/Contact.jsx`, lines 175–195: duplicate-submission prevention and user feedback
- `src/lib/supabaseClient.js`, lines 7–25: environment configuration and shared client creation

---

## ✏️ Concept - 02

**🔤 Name:**

Authentication, protected back-office access, and Row Level Security

**🎯 Purpose:**

Supabase Authentication gives the site owner access to a private back office for viewing and deleting contact messages. The application checks for an existing session, redirects unauthenticated visitors to the login page, responds when authentication state changes, and signs the administrator out when requested. Row Level Security provides the actual data boundary: anonymous visitors can submit messages, while reading and deleting them is limited to authenticated access.

**❓ Why it was challenging:**

Protecting the feature required coordinating several layers without confusing them. The React route guard improves the user experience, but client-side code can be inspected or bypassed, so it cannot be the only security control. Database policies must still prevent unauthorized reads and deletes. I also had to manage asynchronous session restoration, avoid briefly displaying protected content before the session check finished, subscribe to sign-out events, clean up that subscription, and keep authentication errors generic so the login form does not reveal whether an account exists.

**📍 Where (file & line):**

- `src/pages/Login.jsx`, lines 13–33: existing-session check and redirect
- `src/pages/Login.jsx`, lines 39–69: credential validation and authentication
- `src/pages/BackOffice.jsx`, lines 68–95: route guard and auth-state subscription
- `src/pages/BackOffice.jsx`, lines 97–138: authenticated message access, deletion, and logout
- `ai/ai-spec.md`, lines 112–139: access model, table definition, and RLS requirements

---

## ✏️ Concept - 03

**🔤 Name:**

Hash-based routing for deployment on GitHub Pages

**🎯 Purpose:**

React Router provides separate URLs for the public portfolio pages and the unlisted login and back-office views. `HashRouter` keeps the actual server request at the domain root while storing the client-side route after `#`, allowing direct links and page refreshes to work on static GitHub Pages hosting.

**❓ Why it was challenging:**

A single-page application handles navigation in the browser, but GitHub Pages does not provide the server-side fallback normally used by `BrowserRouter`. Refreshing a path such as `/backoffice` would make the server look for a file at that location and return a 404. I had to connect the hosting limitation to the routing architecture, choose `HashRouter`, define every route in one table, and ensure Vite's base path matched a user site hosted at the domain root. This solution also needed to preserve addressable URLs for pages intentionally omitted from the visible navigation.

**📍 Where (file & line):**

- `src/main.jsx`, lines 3–15: `HashRouter` configuration
- `src/App.jsx`, lines 11–24: public and unlisted route definitions
- `vite.config.js`, lines 5–9: GitHub Pages base-path configuration

---
