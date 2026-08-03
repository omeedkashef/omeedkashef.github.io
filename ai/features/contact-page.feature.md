# 🤖 AI_FEATURE_Contact-Page

> Use with `./ai/ai-spec.md`. The global spec governs scope, tech constraints, and conventions; this document covers only the Contact page.

---

## Feature Identity

- **Feature Name:** Contact Page
- **Related Area:** Frontend / public pages / Supabase (write path)
- **Route:** `/contact` — rendered at `https://FL11024OmeedK.github.io/#/contact`

---

## Feature Goal

Let a visitor send a message without leaving the site, and give them immediate, unambiguous feedback about whether it arrived.

This is the first feature that writes to Supabase. Everything before it was static.

---

## Feature Scope

### In Scope (Included)

- A form with name, email, and message fields, each with a visible label
- Client-side validation of all three fields, including email format
- Validation errors displayed to the user
- Submission disabled while the form is invalid
- `INSERT` into the Supabase `messages` table via the shared client
- Visually distinct success and failure feedback
- Field reset after a successful send
- Success message that clears itself after a few seconds
- Graceful degradation when Supabase is not configured

### Out of Scope (Excluded)

- Header, footer, navigation — inherited from the Project Layout feature.
- Reading, listing, or deleting messages — that is the Back Office feature.
- Email notification, autoresponders, spam filtering, or rate limiting.
- File attachments.
- Server-side validation. There is no server; Row Level Security is the enforcement boundary.

---

## Sub-Requirements (Feature Breakdown)

- **A — Fields.** A text input for name, an email input for email, and a textarea for message, each with a visible label.
- **B — Required.** All three are required; the form cannot be submitted empty.
- **C — Email format.** The email field validates as a well-formed address.
- **D — Errors shown.** Validation failures are displayed to the user, not merely blocked.
- **E — Submit gating.** The submit button is disabled while the form is invalid.
- **F — Insert.** On valid submission, one row is inserted into `messages` with `name`, `email`, and `message`, using the client from `src/lib/supabaseClient.js`.
- **G — Feedback.** Success and failure are each displayed and visually distinct.
- **H — Reset.** Fields are cleared after a successful send.
- **I — Dismissal.** The success message disappears after a few seconds.

---

## User Flow / Logic (High Level)

**Happy path**

1. Visitor opens Contact and sees the three labelled fields, with submit disabled.
2. As fields are completed, validation runs. Errors appear only after a field has been touched, so the form does not scold someone who has not typed yet.
3. Once all three are valid, submit enables.
4. Visitor submits. The button enters a sending state and is disabled to prevent a double insert.
5. The row is inserted. A green success message with a check mark appears, and all three fields clear.
6. After five seconds the success message disappears on its own.

**Failure path**

4. The insert fails — network down, RLS rejection, table unreachable.
5. A red failure message with an X appears. **Fields are not cleared**, so nothing the visitor typed is lost and they can retry.

**Unconfigured path**

1. If `isSupabaseConfigured` is false, the form renders disabled with an explanatory notice rather than throwing. The page still loads.

---

## Interfaces (Pages, Endpoints, Screens)

### Frontend

| File | Role |
| --- | --- |
| `src/pages/Contact.jsx` | The page and the form |
| `src/components/Icons.jsx` | Check and X icons for the feedback states |
| `src/App.css` | Form and feedback rules built on existing primitives |

### Backend / Data

Supabase, reached only through `src/lib/supabaseClient.js`:

- `supabase.from('messages').insert({ name, email, message })` — anonymous INSERT, permitted by RLS.

**The insert must not chain `.select()`.** RLS grants the anonymous role INSERT but denies SELECT, so asking for the inserted row back would fail on the read even though the write succeeded. This was verified against the live project: an anonymous `select` on `messages` returns status 200 with zero rows.

`created_at` and `id` are set by the database. The client never supplies them.

---

## Data Used or Modified

### Table: `messages`

| Field | Source | Set by |
| --- | --- | --- |
| `id` | — | Database |
| `name` | Form input | Client |
| `email` | Form input | Client |
| `message` | Form input | Client |
| `created_at` | — | Database |

### Validations

All client-side. RLS is the real boundary; these exist for the visitor's benefit.

| Field | Rule | Error shown |
| --- | --- | --- |
| Name | Required, non-empty after trimming | "Please enter your name." |
| Email | Required, non-empty after trimming | "Please enter your email address." |
| Email | Must match a well-formed address pattern | "Enter a valid email address." |
| Message | Required, non-empty after trimming | "Please include a message." |

Errors surface only after a field has been touched, or immediately on a submit attempt. Submission is blocked while any rule fails.

### Expected Behavior

| Situation | Expected result |
| --- | --- |
| Page loads | Three empty fields, submit disabled, no errors shown |
| Field blurred while empty | That field's error appears |
| Invalid email entered | Format error appears on blur |
| All fields valid | Submit enables |
| Submit clicked | Button shows a sending state and is disabled |
| Insert succeeds | Green success message with a check; all fields cleared |
| Five seconds after success | Success message disappears |
| Insert fails | Red failure message with an X; **fields retain their content** |
| Submit clicked twice quickly | Only one insert — the button is disabled while in flight |
| Supabase not configured | Form disabled with an explanatory notice; page still renders |
| Viewport ≤768px | Fields stack full width; no horizontal overflow |
| Keyboard only | Every field and the button are reachable, with visible focus rings |

---

## Tech Constraints (Feature-Level)

- React + Vite, JavaScript, plain CSS with existing tokens. No new dependencies.
- The Supabase client is imported from `src/lib/supabaseClient.js` and created nowhere else.
- Guard on `isSupabaseConfigured` before touching `supabase`, which is `null` when unconfigured.
- Never chain `.select()` onto the insert — see above.
- Only the publishable key is ever used. No secret key appears in this or any client file.
- The form uses `noValidate` so validation messaging is ours and consistent, rather than the browser's native bubbles.
- Inputs are controlled components; state lives in the page.
- Exactly one `h1` — the page title.

---

## Acceptance Criteria

- [ ] A text input for the sender's name is present with a visible label.
- [ ] An email input for the sender's email is present with a visible label.
- [ ] A textarea for the message is present with a visible label.
- [ ] All three fields are required; the form cannot be submitted with empty fields.
- [ ] The email field validates for proper email format.
- [ ] Validation errors are displayed to the user.
- [ ] The submit button is disabled when validation fails.
- [ ] On valid submission an INSERT is made to the `messages` table.
- [ ] The payload includes `name`, `email`, and `message`.
- [ ] The submission uses the client from `src/lib/supabaseClient.js`.
- [ ] A success message is displayed on success, visually distinct, with a check icon.
- [ ] A failure message is displayed on failure, visually distinct, with an X icon.
- [ ] Form fields are cleared after a successful submission.
- [ ] The success message disappears after a few seconds.
- [ ] The form degrades gracefully when Supabase is unconfigured.
- [ ] No horizontal overflow at 375px or 1280px.
- [ ] `npm run build` completes without errors and `npx oxlint` reports no problems.

---

## Notes for the AI

- Build only Contact. Do not touch other pages or the shared chrome.
- Do not chain `.select()` after the insert. This is the single most likely way to break this feature, and it will look like a write failure when the write actually succeeded.
- Do not clear the fields on failure. Losing a visitor's typed message because the network blipped is worse than the original error.
- Disable the button while the request is in flight, not just while invalid — otherwise an impatient double-click writes two rows.
- Show errors after blur, not on every keystroke from an empty state.
- Verify the insert end to end against the real project, then confirm the row is actually there rather than trusting a green banner.
