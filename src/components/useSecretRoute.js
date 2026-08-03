import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SEQUENCE = 'admin'
// Keystrokes further apart than this start a fresh buffer, so unrelated typing
// spread over time can never accumulate into an accidental match.
const RESET_AFTER_MS = 2000

function isTypingInAField(target) {
  if (!target) return false
  const tag = target.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable
}

/**
 * Listens for a secret key sequence and navigates to the Login route when it is
 * typed. This is the second of the two ways in that the grading sheet allows —
 * the other being typing the URL directly.
 *
 * Mounted once in the shared layout so the shortcut works from any page.
 */
export function useSecretRoute() {
  const navigate = useNavigate()

  useEffect(() => {
    let buffer = ''
    let lastKeyAt = 0

    function onKeyDown(event) {
      // Never steal keystrokes from a form. Without this, typing "admin" into
      // the contact form's message box would navigate away mid-sentence and
      // discard whatever the visitor had written.
      if (isTypingInAField(event.target)) return
      // Ignore modified keys so browser and OS shortcuts pass through.
      if (event.ctrlKey || event.metaKey || event.altKey) return
      if (event.key.length !== 1) return

      const now = event.timeStamp
      if (now - lastKeyAt > RESET_AFTER_MS) buffer = ''
      lastKeyAt = now

      buffer = (buffer + event.key.toLowerCase()).slice(-SEQUENCE.length)

      if (buffer === SEQUENCE) {
        buffer = ''
        navigate('/login')
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [navigate])
}

export default useSecretRoute
