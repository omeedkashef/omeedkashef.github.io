# 🤖 AI_FEATURE_Back-Office

> Use with `./ai/ai-spec.md`. The global spec governs scope, tech constraints, and conventions; this document covers only the Back Office.

---

## Feature Identity

- **Feature Name:** Back Office
- **Related Area:** Frontend / protected route / Supabase (read and delete)
- **Route:** `/backoffice` — reachable at `https://FL11024OmeedK.github.io/#/backoffice`

---

## Feature Goal

Give the site owner a private place to read the messages visitors send, open any one of them in full, delete the ones he is finished with, and sign out.

This is the other half of the Contact page. Contact writes; Back Office reads and removes. It is the last of the eight features.

---

## Feature Scope

### In Scope (Included)

- An authentication guard that verifies a session before rendering anything
- Redirect to Login when there is no session
- Fetching all rows from `messages`, newest first
- A table with Name, Email, Date, and Actions columns
- An error state when the fetch fails
- An empty state when there are no messages
- A per-row delete that removes the row from the table immediately
- A modal showing the full message, closable by button, outside click, and Escape
- A logout button that clears the session and redirects

### Out of Scope (Excluded)

- The Login page and its form — that is the Login feature. This feature only redirects to it.
- Editing or replying to messages. The back office is read and delete only.
- Pagination, search, sorting by column, or filtering. The message volume for this project does not warrant it.
- Marking messages read or unread — there is no such column.
- Any public-facing UI. Nothing here is reachable without a session.

---

## Sub-Requirements (Feature Breakdown)

- **A — Guard.** Authentication is verified before the page renders. An authenticated visit renders the back office; an unauthenticated one redirects to Login.
- **B — Unlisted.** `/backoffice` appears in no header nav, footer, or mobile bottom nav.
- **C — Fetch.** All rows from `messages` are fetched and displayed.
- **D — Fetch failure.** A failed fetch displays an error message.
- **E — Empty state.** An empty table displays "No messages yet".
- **F — Columns.** The table renders Name, Email, Date, and Actions.
- **G — Ordering.** Rows are ordered by `created_at` descending.
- **H — Delete.** Each row has a delete control, and a deleted row disappears immediately.
- **I — Modal.** Clicking a row or its View button opens a modal with the sender's name, email, date and time, and the full message text.
- **J — Modal close.** The modal closes via its close button, an outside click, and the Escape key.
- **K — Logout.** A visible logout button calls `signOut()` and redirects afterwards.

---

## How the route is protected

Two independent layers, because either alone is insufficient:

1. **Client-side guard.** The page calls `getSession()` before rendering and redirects to Login when there is none. This is a *usability* measure — it stops the admin seeing a broken page, and it satisfies the graded requirement.
2. **Row Level Security.** The anonymous role cannot `SELECT` or `DELETE` from `messages`. This is the *actual* security boundary.

The distinction matters. A determined visitor can bypass any client-side guard by editing the JavaScript; they cannot bypass RLS, because it is enforced by Postgres. **Verified against the live project:** an anonymous `SELECT` on `messages` returns zero rows, and an anonymous `DELETE` matches zero rows. No message content is retrievable without a valid session, regardless of what the client does.

---

## User Flow / Logic (High Level)

**Authenticated**

1. Admin arrives from Login, or opens `#/backoffice` directly with a live session.
2. The guard confirms the session. A brief checking state renders while it resolves.
3. Messages are fetched newest first and rendered as a table.
4. Admin clicks a row, or its View button. A modal opens with the full message.
5. Admin closes the modal with the X, by clicking outside it, or with Escape.
6. Admin clicks delete on a row. The row is removed from the database and disappears from the table.
7. Admin clicks Log out. The session is cleared and the app returns to Home.

**Not authenticated**

1. Someone opens `#/backoffice` with no session.
2. The guard finds none and redirects to Login. No message data is ever requested.

**Fetch fails**

3. The table is replaced by an error message explaining that messages could not be loaded.

**No messages**

3. The table is replaced by "No messages yet."

---

## Interfaces (Pages, Endpoints, Screens)

### Frontend

| File | Role |
| --- | --- |
| `src/pages/BackOffice.jsx` | The page, guard, table, modal, and logout |
| `src/components/Icons.jsx` | Trash icon for the delete control |
| `src/App.css` | Table and modal rules |

### Backend / Data

Supabase, via `src/lib/supabaseClient.js`:

| Call | Purpose |
| --- | --- |
| `supabase.auth.getSession()` | The guard |
| `supabase.auth.onAuthStateChange()` | Redirect if the session ends while the page is open |
| `supabase.from('messages').select('*').order('created_at', { ascending: false })` | The table |
| `supabase.from('messages').delete().eq('id', id)` | Row deletion |
| `supabase.auth.signOut()` | Logout |

---

## Data Used or Modified

### Table: `messages`

Schema confirmed against the live project:

| Column | Type | Notes |
| --- | --- | --- |
| `id` | **uuid** | Primary key. Not an integer — a delete filtered with a numeric id fails with `22P02 invalid input syntax for type uuid`. |
| `name` | text | Sender's name |
| `email` | text | Sender's email |
| `message` | text | Body |
| `created_at` | timestamptz | e.g. `2026-08-03T20:45:41.351721+00:00` |

Rows are read and deleted. Nothing on this page writes or updates a message.

### Validations

No user input beyond clicks, so the checks are on state rather than form data:

| Check | Rule | If it fails |
| --- | --- | --- |
| Session present | Verified before any data request | Unauthenticated visitors could see the page shell |
| Fetch error surfaced | A failed select shows an error rather than an empty table | The admin thinks the inbox is empty when it is not |
| Empty vs error distinguished | Zero rows and a failed fetch produce different messages | Same as above |
| Delete confirmed by the server | The row is removed from local state only after the delete returns without error | The table lies about what is in the database |
| Date rendered readably | `created_at` is formatted, not shown raw | Unreadable ISO timestamps |
| Modal escape routes | Close button, outside click, and Escape all work | Graded requirement fails |

### Expected Behavior

| Situation | Expected result |
| --- | --- |
| Authenticated visit | Table renders with messages newest first |
| Unauthenticated visit | Redirects to Login; no data request is made |
| Session expires while the page is open | Redirects to Login |
| Fetch fails | Error message shown instead of the table |
| Zero messages | "No messages yet" shown instead of the table |
| Row or View clicked | Modal opens with name, email, date and time, and full message |
| Close button clicked | Modal closes |
| Click outside the modal | Modal closes |
| Escape pressed | Modal closes |
| Click inside the modal | Modal stays open |
| Delete clicked | Row disappears immediately after the server confirms |
| Delete fails | Row remains and an error is shown |
| Logout clicked | Session cleared, redirected to Home |
| Viewport ≤768px | The table scrolls horizontally inside its own container rather than overflowing the page |

---

## Tech Constraints (Feature-Level)

- React + Vite, JavaScript, plain CSS with existing tokens. No new dependencies.
- The Supabase client comes from `src/lib/supabaseClient.js` and is created nowhere else.
- Guard on `isSupabaseConfigured` before touching `supabase`.
- Deletes filter on the uuid `id`. Never assume an integer key.
- Local state is updated only after the server confirms the delete — never optimistically. An optimistic removal that silently fails would show the admin an inbox that does not match the database.
- The table lives inside a horizontally scrollable container so a narrow viewport scrolls the table, not the page. The global no-overflow rule still applies.
- The Escape listener is bound only while the modal is open, and removed on close.
- Exactly one `h1`.
- Never log message contents or the session object.

---

## Acceptance Criteria

- [ ] Navigating to `/backoffice` while authenticated renders the Back Office.
- [ ] Navigating to `/backoffice` while not authenticated redirects to Login.
- [ ] Authentication is verified before the page renders.
- [ ] The route is in no public navigation surface.
- [ ] All messages are fetched and displayed.
- [ ] A failed fetch displays an error message.
- [ ] An empty table displays "No messages yet".
- [ ] The table renders Name, Email, Date, and Actions columns.
- [ ] Each row corresponds to one message.
- [ ] Messages are ordered by `created_at` descending.
- [ ] A delete control is present on every row.
- [ ] A deleted message disappears from the table immediately.
- [ ] Clicking a row or a View button opens a modal with the full message.
- [ ] The modal shows sender name and email.
- [ ] The modal shows date and time.
- [ ] The modal shows the full message text.
- [ ] The modal has a close button.
- [ ] Clicking outside the modal closes it.
- [ ] Pressing Escape closes the modal.
- [ ] A logout button is visible.
- [ ] Logout calls `supabase.auth.signOut()` and clears the session.
- [ ] After logout the user is redirected to Home or Login.
- [ ] No horizontal page overflow at 375px or 1280px.
- [ ] `npm run build` completes without errors and `npx oxlint` reports no problems.

---

## Notes for the AI

- Do not add `/backoffice` to `navItems.js`.
- Do not delete optimistically. Remove the row from state only after the server confirms, or the table will disagree with the database the first time a delete fails.
- `id` is a uuid. Filtering a delete with a number returns `22P02`, which looks like a permissions problem and is not.
- Distinguish the empty state from the error state. They look similar and mean opposite things.
- Bind the Escape listener only while the modal is open, and clean it up — a listener left attached will keep firing after the modal is gone.
- Stop click propagation inside the modal, or the outside-click handler closes it the moment the admin clicks anything within it.
- Put the table in its own scroll container. A wide table is the most likely source of page-level horizontal overflow on mobile.
- Verify by signing in for real, confirming the rows match the database, deleting one, and confirming it is gone from both the table and the table's source — not just from the screen.
