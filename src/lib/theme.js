/* ---------------------------------------------------------------------------
   Theme resolution, persistence, and application.

   Plain functions with no React in them, because the same logic runs from two
   places: this module, and the small blocking script in index.html that has to
   apply the theme before the first paint. Keeping it framework-free means the
   rules live in one file and the inline script stays a two-line mirror of
   resolveTheme() rather than a second implementation.

   The applied theme is written to <html data-theme>. CSS selects on that
   attribute; nothing else in the app reads it.
   --------------------------------------------------------------------------- */

export const STORAGE_KEY = 'theme'

export const THEMES = ['light', 'dark']

// Matches the --bg token of each palette in index.css. Used only for the
// address-bar colour on mobile browsers, which cannot read a custom property.
const BROWSER_CHROME = {
  light: '#f5f8f3',
  dark: '#0b1610',
}

const DEFAULT_THEME = 'dark'

/** Reads the stored preference, or null when there is no valid one.
 *
 * localStorage throws rather than returning null in Safari private mode and
 * under some cookie-blocking settings, so every access is guarded. A value that
 * is not one of THEMES is treated as absent — a hand-edited or corrupted entry
 * must fall through to the OS preference, not be applied blindly.
 */
export function readStoredTheme() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return THEMES.includes(stored) ? stored : null
  } catch {
    return null
  }
}

/** Persists an explicit choice. Silently does nothing if storage is unavailable
 *  — the toggle still works for the session, it just is not remembered. */
export function storeTheme(theme) {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* preference is not persisted; not worth interrupting the visitor over */
  }
}

/** The theme the operating system is asking for. */
export function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : DEFAULT_THEME
}

/** An explicit choice wins over the OS; the OS wins over the dark default. */
export function resolveTheme() {
  return readStoredTheme() ?? getSystemTheme()
}

/** Calls back when the OS preference changes. The caller decides whether to
 *  act on it — a visitor who has chosen explicitly should not be overridden. */
export function subscribeToSystemTheme(onChange) {
  const query = window.matchMedia('(prefers-color-scheme: light)')
  const handler = (event) => onChange(event.matches ? 'light' : DEFAULT_THEME)
  query.addEventListener('change', handler)
  return () => query.removeEventListener('change', handler)
}

/** Writes the theme to the DOM. This is the only function that touches it. */
export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme

  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', BROWSER_CHROME[theme])
}

/** Duration of --t-theme in milliseconds, read from CSS so the value is not
 *  maintained in two places. */
function transitionDuration() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--t-theme').trim()
  const value = Number.parseFloat(raw)
  if (!Number.isFinite(value)) return 250
  return raw.endsWith('ms') ? value : value * 1000
}

let transitionTimer

/** Applies the theme with the colour cross-fade enabled.
 *
 * The .theme-transition class is added for the length of the switch and then
 * removed, so the transition covers deliberate theme changes only. Left on
 * permanently it would also animate hover and focus colour changes, which have
 * their own faster timings.
 */
export function applyThemeWithTransition(theme) {
  const root = document.documentElement

  root.classList.add('theme-transition')
  applyTheme(theme)

  window.clearTimeout(transitionTimer)
  transitionTimer = window.setTimeout(() => {
    root.classList.remove('theme-transition')
  }, transitionDuration())
}
