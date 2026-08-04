import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js'
import { XIcon } from '../components/Icons.jsx'

function Login() {
  const navigate = useNavigate()
  const [values, setValues] = useState({ email: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState({})
  const [authError, setAuthError] = useState('')
  const [status, setStatus] = useState('checking') // checking | ready | signing-in

  // If a session already exists, never show the form — go straight through.
  // This is also what makes a refresh after login keep the admin signed in:
  // supabase-js restores the session from local storage before this runs.
  useEffect(() => {
    let active = true

    if (!isSupabaseConfigured) {
      setStatus('ready')
      return undefined
    }

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      if (data.session) navigate('/backoffice', { replace: true })
      else setStatus('ready')
    })

    return () => {
      active = false
    }
  }, [navigate])

  const update = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (status === 'signing-in' || !isSupabaseConfigured) return

    const errors = {}
    if (!values.email.trim()) errors.email = 'Enter your email address.'
    if (!values.password) errors.password = 'Enter your password.'
    setFieldErrors(errors)
    setAuthError('')
    if (Object.keys(errors).length > 0) return

    setStatus('signing-in')

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email.trim(),
      password: values.password,
    })

    if (error) {
      // Deliberately generic. Distinguishing "no such user" from "wrong
      // password" would tell an attacker which email addresses are real.
      setAuthError('Invalid login credentials.')
      setValues((prev) => ({ ...prev, password: '' }))
      setStatus('ready')
      return
    }

    // replace: true so the browser Back button does not return to a login form
    // the admin has already passed through.
    navigate('/backoffice', { replace: true })
  }

  // Avoids a flash of the login form before the existing-session check resolves.
  if (status === 'checking') {
    return (
      <section className="section container">
        <p className="meta">Checking session…</p>
      </section>
    )
  }

  const signingIn = status === 'signing-in'

  return (
    <section className="section container login" aria-labelledby="login-heading">
      <p className="eyebrow">Admin access</p>
      <h1 id="login-heading">Welcome back.</h1>
      <p className="lead login__intro">
        This area is for the site owner. Use your authorized account to reach the message inbox.
      </p>

      {!isSupabaseConfigured && (
        <p className="form-status form-status--error" role="status">
          <XIcon />
          <span>Authentication is unavailable — Supabase is not configured.</span>
        </p>
      )}

      <form className="login__form" onSubmit={handleSubmit} noValidate>
        <div className={`field${fieldErrors.email ? ' field--invalid' : ''}`}>
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="username"
            value={values.email}
            onChange={update('email')}
            disabled={!isSupabaseConfigured || signingIn}
            aria-invalid={Boolean(fieldErrors.email)}
          />
          {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
        </div>

        <div className={`field${fieldErrors.password ? ' field--invalid' : ''}`}>
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={values.password}
            onChange={update('password')}
            disabled={!isSupabaseConfigured || signingIn}
            aria-invalid={Boolean(fieldErrors.password)}
          />
          {fieldErrors.password && <span className="field-error">{fieldErrors.password}</span>}
        </div>

        <button
          type="submit"
          className="btn login__submit"
          disabled={!isSupabaseConfigured || signingIn}
        >
          {signingIn ? 'Signing in…' : 'Log in'}
        </button>

        <div className="login__feedback" role="status" aria-live="polite">
          {authError && (
            <p className="form-status form-status--error">
              <XIcon />
              <span>{authError}</span>
            </p>
          )}
        </div>
      </form>
    </section>
  )
}

export default Login
