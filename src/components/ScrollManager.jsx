import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// HashRouter uses the first hash for routing, while React Router exposes a
// second in-route hash (for example /portfolio#selected-projects) here.
// Handle that target after the new page has rendered; otherwise every route
// change starts at the top of the document.
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return undefined
    }

    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(hash.slice(1))
      target?.scrollIntoView({ block: 'start', behavior: 'auto' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}

export default ScrollManager
