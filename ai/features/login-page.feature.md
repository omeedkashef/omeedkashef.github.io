# 🤖 AI_FEATURE_Login-Page

> Use with `./ai/ai-spec.md`. The global spec governs scope, tech constraints, and conventions; this document covers only the Login page.

---

## Feature Identity

- **Feature Name:** Login Page
- **Related Area:** Frontend / unlisted route / Supabase Auth
- **Route:** `/login` — reachable at `https://FL11024OmeedK.github.io/#/login`

---

## Feature Goal

Let the single admin account reach the private back office, and let nobody else discover that it exists.

This is the gate. The Back Office feature enforces the lock; this feature turns the key.

---

## Feature Scope

### In Scope (Included)

- An unlisted route that appears in no navigation
- A secret keyboard shortcut as a second way in
- Email and password fields with a submit button
- Authentication via `supabase.auth.signInWithPassword()`
- Redirect to the Back Office on success
- A visually distinct error on failure
- Session persistence across refreshes
- Redirect straight to the Back Office if a valid session already exists

### Out of Scope (Excluded)

- The Back Office itself, its route guard, its data, and its logout control.
- User registration, password reset, email confirmation, magic links, OAuth. The single admin account is created by hand in the Supabase dashboard; the app never registers anyone.
- Roles or permissions beyond "authenticated".
- Rate limiting or lockout. Supabase enforces its own limits.

---

## Sub-Requirements (Feature Breakdown)

- **A — Unlisted route.** `/login` appears in no header nav, no footer, and no mobile bottom nav.
- **B — Reachable.** It can be reached by typing the URL, or by a secret keyboard sequence.
- **C — Fields.** An `input[type=email]`, an `input[type=password]`, and a submit button.
- **D — Authentication.** Submitting calls `supabase.auth.signInWithPassword()` with the entered values, using the client from `src/lib/supabaseClient.js`.
- **E — Success.** On success the user is navigated to `/backoffice`.
- **F — Session.** The session is established and persists; refreshing does not sign the user out.
- **G — Existing session.** If a valid session is already present, the Login route redirects to the Back Office rather than asking again.
- **H — Failure.** Wrong credentials display a visually distinct error message.

---

## How the route stays unlisted

The public navigation is built from `src/components/navItems.js`, which contains only Home, Portfolio, Links, and Contact. `/login` is absent from that list, and the footer links outward only. Nothing needs to filter it out, because nothing ever adds it.

### The secret keyboard shortcut

Typing **`admin`** anywhere on the site navigates to the Login route.

Two constraints make this safe rather than annoying:

- **It is ignored while focus is in a text field.** Without this, typing "admin" into the contact form's message box would navigate away mid-sentence and discard what the visitor had written.
- **The buffer is capped and time-limited**, so unrelated keystrokes minutes apart cannot accumulate into an accidental match.

The listener is mounted once in the shared layout so the shortcut works from any page. This is the one place the Login feature touches shared chrome, and it is anticipated by the global spec.

---

## User Flow / Logic (High Level)

**Signing in**

1. Admin types `#/login`, or types `admin` on any page.
2. On mount, the page checks for an existing session. If one is found, it redirects to the Back Office without rendering the form.
3. Otherwise the form renders: email, password, submit.
4. Admin enters credentials and submits. The button enters a signing-in state and is disabled.
5. `signInWithPassword` succeeds. The session is stored, and the app navigates to `/backoffice`.

**Wrong credentials**

5. `signInWithPassword` returns an error. A red message appears. The email is retained; the password field is cleared.

**Already signed in**

1. Admin opens `#/login` with a valid session. The Back Office renders instead — no second sign-in.

**After a refresh**

1. Admin refreshes on any route. `supabase-js` restores the session from local storage, so they remain signed in.

---

## Interfaces (Pages, Endpoints, Screens)

### Frontend

| File | Role |
| --- | --- |
| `src/pages/Login.jsx` | The page and the form |
| `src/components/useSecretRoute.js` | The keyboard shortcut hook |
| `src/components/Main.jsx` | Mounts the hook once, so the shortcut works everywhere |
| `src/App.css` | Login layout rules |

### Backend / Data

Supabase Auth, via `src/lib/supabaseClient.js`:

- `supabase.auth.signInWithPassword({ email, password })`
- `supabase.auth.getSession()` — read on mount to detect an existing session

No table is read or written by this feature.

---

## Data Used or Modified

No application data. The only stored artefact is the Supabase session, which `supabase-js` persists to local storage by default. That default is what satisfies the "refreshing does not log the user out" requirement, so it must not be disabled.

**Verified against the live project:** the account `admin@codeboxx.com` exists, its email is confirmed, and the email/password provider is enabled. An authenticated session can `SELECT` and `DELETE` on `messages`; an anonymous one cannot.

### Validations

| Check | Rule | Error shown |
| --- | --- | --- |
| Email | Required, non-empty | "Enter your email address." |
| Password | Required, non-empty | "Enter your password." |
| Credentials | Verified by Supabase, never client-side | "Invalid login credentials." |

Client-side validation only prevents submitting an obviously empty form. **Whether the credentials are correct is decided by Supabase and never by this code.** The error message shown on failure is deliberately generic — it does not reveal whether the email exists.

### Expected Behavior

| Situation | Expected result |
| --- | --- |
| Route opened with no session | The form renders |
| Route opened with a valid session | Redirects to the Back Office |
| Empty submit | Field errors shown, no network call |
| Wrong password | Red error; email retained, password cleared |
| Correct credentials | Session established, navigates to the Back Office |
| Page refreshed after signing in | Still signed in |
| Submit clicked twice quickly | One request — the button is disabled in flight |
| Supabase not configured | Form disabled with an explanatory notice; the page still renders |
| `admin` typed in a text field | Nothing happens — the shortcut is suppressed |
| `admin` typed outside a field | Navigates to Login |
| Viewport ≤768px | Form fills the width; no horizontal overflow |

---

## Tech Constraints (Feature-Level)

- React + Vite, JavaScript, plain CSS with existing tokens. No new dependencies.
- The Supabase client comes from `src/lib/supabaseClient.js` and is created nowhere else.
- Guard on `isSupabaseConfigured` before touching `supabase`, which is `null` when unconfigured.
- Session persistence stays at the `supabase-js` default. Do not pass `persistSession: false`.
- Navigation uses `useNavigate` with `replace`, so the browser Back button does not return to a login form the user has already passed through.
- The password input must be `type="password"`.
- Never log credentials, tokens, or the session object.
- Exactly one `h1`.

---

## Acceptance Criteria

- [ ] The route is not in the header navigation, footer, or mobile bottom nav.
- [ ] The page is reachable by typing the URL.
- [ ] The page is reachable by a secret keyboard sequence.
- [ ] The secret sequence is ignored while typing in a form field.
- [ ] An email input with `type="email"` is present.
- [ ] A password input with `type="password"` is present.
- [ ] A submit button is present.
- [ ] Submitting calls `supabase.auth.signInWithPassword()` with the entered values.
- [ ] The client from `src/lib/supabaseClient.js` is used.
- [ ] After successful login the user is navigated to the Back Office route.
- [ ] The session is established and persists.
- [ ] Refreshing after login does not sign the user out.
- [ ] If a valid session exists, opening Login redirects to the Back Office.
- [ ] Wrong credentials display an error message.
- [ ] The error message is visually distinct.
- [ ] No horizontal overflow at 375px or 1280px.
- [ ] `npm run build` completes without errors and `npx oxlint` reports no problems.

---

## Notes for the AI

- Do not add `/login` to `navItems.js`, not even temporarily. Its absence is the requirement.
- The secret shortcut must ignore keystrokes originating in `input`, `textarea`, and `contenteditable` elements. Skipping this makes the contact form unusable for anyone whose message contains the word.
- Keep session persistence at the library default — the refresh requirement depends on it.
- Navigate with `replace: true` so Back does not land on a stale login form.
- Keep the failure message generic. Distinguishing "no such user" from "wrong password" tells an attacker which emails are real.
- Verify by actually signing in with the real credentials, refreshing, and confirming the session survives — not by trusting that the call returned no error.
