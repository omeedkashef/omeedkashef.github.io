# 🤖 AI_FEATURE_Link-Page

> Use with `./ai/ai-spec.md`. The global spec governs scope, tech constraints, and conventions; this document covers only the Links page.

---

## Feature Identity

- **Feature Name:** Link Page
- **Related Area:** Frontend / public pages
- **Route:** `/links` — rendered at `https://FL11024OmeedK.github.io/#/links`

---

## Feature Goal

Give a visitor the handful of places worth going next — the professional profile, the source code, the verified certifications, and the design file this site came from — each explained well enough that they know what they will find before they click.

Home makes the claim and Portfolio evidences it; Links is where a visitor goes to verify any of it independently.

---

## Feature Scope

### In Scope (Included)

- Four link cards, each with an image, a title, a short description, and a clickable URL
- Every link opens in a new tab
- Four AI-generated thumbnails, one per destination
- Page header consistent with the other public pages

### Out of Scope (Excluded)

- Header, footer, navigation — inherited from the Project Layout feature.
- The resume download, which lives on Portfolio.
- Any Supabase interaction, form, or persisted state.
- Link previews fetched at runtime. Thumbnails are local static images; nothing is scraped.
- Analytics or click tracking.

---

## Sub-Requirements (Feature Breakdown)

- **A — Card structure.** Every link renders as a card or structured item, not a bare list entry.
- **B — Image.** Every card carries a thumbnail or preview image.
- **C — Title.** Every card carries a title or name.
- **D — Description.** Every card carries a description of one to three sentences.
- **E — Clickable URL.** Every card exposes a working URL that opens in a new tab.
- **F — Count.** At least three links are displayed. Four ship.
- **G — AI image.** At least one image on the page is AI-generated, relevant, and carries `alt` text. All four are.

---

## User Flow / Logic (High Level)

1. Visitor selects Links from the navigation, or opens `#/links` directly.
2. A short page header states what the page is for.
3. Four cards render in a grid — three columns on desktop, reflowing to one on mobile.
4. Each card shows its thumbnail, title, description, and the destination host so the visitor can see where they are going before clicking.
5. Activating a card opens the destination in a new tab. The portfolio stays open in the original tab.
6. The footer closes the page.

No interactive state beyond hover. Nothing is fetched, submitted, or persisted.

---

## Interfaces (Pages, Endpoints, Screens)

### Frontend

| File | Role |
| --- | --- |
| `src/pages/Links.jsx` | The page — replaces the placeholder |
| `src/App.css` | Link-card rules built on existing primitives |
| `src/assets/link-linkedin.jpg` | AI-generated thumbnail |
| `src/assets/link-github.jpg` | AI-generated thumbnail |
| `src/assets/link-coursera.jpg` | AI-generated thumbnail |
| `src/assets/link-figma.jpg` | AI-generated thumbnail |

### Backend / API

None. The destinations are third-party sites reached by ordinary anchors — the app makes no request to them.

---

## Data Used or Modified

No user input, no persistence, no network calls from the app itself. All content is static and defined in `Links.jsx`, taken from the resolved Links content in the global spec.

| Title | URL | Thumbnail |
| --- | --- | --- |
| LinkedIn | `https://www.linkedin.com/in/omeedkashef` | `link-linkedin.jpg` |
| GitHub | `https://github.com/FL11024OmeedK` | `link-github.jpg` |
| Coursera Profile | `https://www.coursera.org/learner/omeedkashef` | `link-coursera.jpg` |
| Portfolio Design File | `https://www.figma.com/make/YBYiqbFMh7f60b3tFPcSHt/Portfolio-website-design` | `link-figma.jpg` |

Descriptions are the two-sentence versions already resolved in the global spec, which sit inside the required one-to-three sentence range.

### Validations

No form input. The checks are structural:

| Check | Rule | If it fails |
| --- | --- | --- |
| Link count | At least 3 cards render | Graded requirement fails |
| Card structure | Every link is a card, not a bare list item | Graded requirement fails |
| Image present | Every card has a thumbnail that loads | Graded requirement fails |
| Title present | Every card has a title | Graded requirement fails |
| Description length | Every description is 1–3 sentences | Graded requirement fails |
| URL works | Every `href` is absolute and well-formed | Visitor reaches a dead end |
| New tab | Every link carries `target="_blank"` | Graded requirement fails |
| Tab safety | Every `target="_blank"` also carries `rel="noreferrer"` | The opened page can reach back through `window.opener` |
| AI image | At least 1 AI-generated image renders | Graded requirement fails |
| Alt text | Every image has descriptive, non-empty `alt` | Accessibility requirement fails |
| Overflow | Nothing exceeds the viewport at any width | Graded requirement fails |

### Expected Behavior

| Situation | Expected result |
| --- | --- |
| Visitor opens `#/links` | Page renders inside the shared layout |
| Visitor activates a card | Destination opens in a new tab; the portfolio stays open |
| Viewport >768px | Cards render as a multi-column grid |
| Viewport ≤768px | Cards stack to one column; images scale; no horizontal scroll |
| Images still loading | Reserved aspect ratios hold their space; no layout shift |
| Images fail to load | `alt` text conveys what each destination is |
| Keyboard navigation | Every card is reachable by Tab and shows a visible focus ring |
| Reduced motion preferred | The hover zoom does not animate |

---

## Tech Constraints (Feature-Level)

- React + Vite, JavaScript, plain CSS with existing tokens. No new dependencies.
- Thumbnails are imported from `src/assets/` so Vite fingerprints them.
- External links are plain `<a>` elements — never `NavLink` or `react-router` navigation, which would try to resolve them as internal routes.
- Every external link carries `target="_blank"` and `rel="noreferrer"`.
- The whole card is the link, so the click target matches what the visitor sees. It must therefore be a single `<a>`, not an `<a>` nested inside other interactive elements.
- Exactly one `h1` — the page title. Card titles are `h2`.

---

## Acceptance Criteria

- [ ] At least 3 links are displayed on the page.
- [ ] Each link is displayed as a card or structured item.
- [ ] Each link entry includes an image.
- [ ] Each link entry includes a title or name.
- [ ] Each link entry includes a description of 1–3 sentences.
- [ ] Each link entry includes a clickable URL.
- [ ] Every link opens in a new tab.
- [ ] At least 1 image on the page was generated with an AI tool.
- [ ] Images complement the content.
- [ ] Every image has appropriate `alt` text.
- [ ] The AI tool used is documented.
- [ ] Every card is keyboard reachable with a visible focus ring.
- [ ] No horizontal overflow at 375px or 1280px.
- [ ] `npm run build` completes without errors and `npx oxlint` reports no problems.

---

## Notes for the AI

- Build only Links. Do not touch other pages or the shared chrome.
- Take the four entries verbatim from the resolved Links content in `ai/ai-spec.md`. They are decided content, not suggestions.
- `rel="noreferrer"` is not optional. Without it the opened page gets a handle on this one through `window.opener`.
- Make the entire card the anchor rather than a "visit" button, so the visible target and the click target are the same shape.
- Show the destination host on the card. A visitor should be able to see where a link goes before committing to it.
- Verify at 375px and 1280px, and confirm every `href` is absolute.
