import { useTheme } from './useTheme.js'
import { SunIcon, MoonIcon } from './Icons.jsx'

// The light/dark control. Lives in the header, which renders on every route and
// stays visible at every width, so one instance covers the "on every page"
// requirement without a second copy in MobileNav.
//
// The icon and the accessible name both describe the OUTCOME of pressing the
// button, not the current state: in dark mode it shows a sun and announces
// "Switch to light theme". A control labelled with its current state leaves a
// screen reader user guessing what activating it will do.
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const nextTheme = theme === 'dark' ? 'light' : 'dark'
  const label = `Switch to ${nextTheme} theme`

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

export default ThemeToggle
