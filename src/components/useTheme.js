import { useCallback, useEffect, useState } from 'react'
import {
  applyTheme,
  applyThemeWithTransition,
  readStoredTheme,
  resolveTheme,
  storeTheme,
  subscribeToSystemTheme,
} from '../lib/theme.js'

/**
 * React binding over lib/theme.js. Returns the active theme and a setter that
 * applies, animates, and persists a change.
 *
 * State is seeded from resolveTheme() rather than from a hardcoded default, so
 * the first render already agrees with what the blocking script in index.html
 * painted. Seeding it to 'dark' would make the toggle render the wrong icon for
 * one frame on a light-themed device.
 */
export function useTheme() {
  const [theme, setThemeState] = useState(resolveTheme)

  // The blocking script has normally done this already. Repeating it covers the
  // case where that script did not run, and keeps the DOM in step if React ever
  // mounts with different state than the attribute holds.
  useEffect(() => {
    applyTheme(theme)
    // Deliberately runs once. Later changes go through setTheme, which applies
    // the theme itself with the transition enabled.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Follow the OS while the site is open, but only for a visitor who has not
  // chosen. An explicit choice is not something a system-level change may undo.
  useEffect(() => {
    return subscribeToSystemTheme((systemTheme) => {
      if (readStoredTheme()) return
      setThemeState(systemTheme)
      applyThemeWithTransition(systemTheme)
    })
  }, [])

  const setTheme = useCallback((next) => {
    setThemeState(next)
    applyThemeWithTransition(next)
    storeTheme(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  return { theme, setTheme, toggleTheme }
}

export default useTheme
