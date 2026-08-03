import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js'
import { CheckIcon, XIcon } from '../components/Icons.jsx'

const EMPTY = { name: '', email: '', message: '' }
const UNTOUCHED = { name: false, email: false, message: false }

// Deliberately permissive: something@something.tld with no whitespace. Stricter
// patterns reject valid addresses, and the real check is whether a reply lands.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Enter a valid email address.'
  if (!values.message.trim()) errors.message = 'Please include a message.'
  return errors
}

function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [touched, setTouched] = useState(UNTOUCHED)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const errors = validate(values)
  const isValid = Object.keys(errors).length === 0

  // Errors surface only after a field has been touched, or once a submit has
  // been attempted — so the form does not scold someone who hasn't typed yet.
  const errorFor = (field) => (touched[field] ? errors[field] : undefined)

  // The success banner clears itself. The failure banner does not: it stays
  // until the next submit so the visitor can read it and retry.
  useEffect(() => {
    if (status !== 'success') return undefined
    const timer = setTimeout(() => setStatus('idle'), 5000)
    return () => clearTimeout(timer)
  }, [status])

  const update = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const blur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setTouched({ name: true, email: true, message: true })
    if (!isValid || status === 'sending' || !isSupabaseConfigured) return

    setStatus('sending')

    // No .select() chained here. RLS grants the anonymous role INSERT but
    // denies SELECT, so reading the row back would fail even though the write
    // succeeded — and it would surface as a false failure to the visitor.
    const { error } = await supabase.from('messages').insert({
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    })

    if (error) {
      console.error('Contact form insert failed:', error.message)
      setStatus('error')
      return // fields deliberately retained so nothing typed is lost
    }

    setValues(EMPTY)
    setTouched(UNTOUCHED)
    setStatus('success')
  }

  const sending = status === 'sending'

  return (
    <>
      <section className="section container" aria-labelledby="contact-heading">
        <div className="split contact-layout">
          <div>
            <p className="eyebrow">Contact</p>
            <h1 id="contact-heading">
              Working on something
              <br />
              <em>that matters?</em>
            </h1>
            <p className="lead contact-intro">
              I&apos;m open to roles, consulting, and collaborations in global health, social
              justice, and social enterprise — especially where technical depth and product
              thinking are both needed.
            </p>
            <div className="contact-details">
              <a href="mailto:omeedkashef@gmail.com">omeedkashef@gmail.com</a>
              <p className="meta">Tampa Bay, Florida · open to remote and global opportunities</p>
            </div>
          </div>

          <div>
            {!isSupabaseConfigured && (
              <p className="form-status form-status--error" role="status">
                <XIcon />
                <span>
                  The contact form is unavailable right now. Please email me directly at
                  omeedkashef@gmail.com.
                </span>
              </p>
            )}

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className={`field${errorFor('name') ? ' field--invalid' : ''}`}>
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={update('name')}
                  onBlur={blur('name')}
                  placeholder="Your name"
                  disabled={!isSupabaseConfigured || sending}
                  aria-invalid={Boolean(errorFor('name'))}
                  aria-describedby={errorFor('name') ? 'contact-name-error' : undefined}
                />
                {errorFor('name') && (
                  <span className="field-error" id="contact-name-error">
                    {errorFor('name')}
                  </span>
                )}
              </div>

              <div className={`field${errorFor('email') ? ' field--invalid' : ''}`}>
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={update('email')}
                  onBlur={blur('email')}
                  placeholder="you@organization.com"
                  disabled={!isSupabaseConfigured || sending}
                  aria-invalid={Boolean(errorFor('email'))}
                  aria-describedby={errorFor('email') ? 'contact-email-error' : undefined}
                />
                {errorFor('email') && (
                  <span className="field-error" id="contact-email-error">
                    {errorFor('email')}
                  </span>
                )}
              </div>

              <div className={`field${errorFor('message') ? ' field--invalid' : ''}`}>
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={update('message')}
                  onBlur={blur('message')}
                  placeholder="What are you working on? What kind of help would be most useful?"
                  disabled={!isSupabaseConfigured || sending}
                  aria-invalid={Boolean(errorFor('message'))}
                  aria-describedby={errorFor('message') ? 'contact-message-error' : undefined}
                />
                {errorFor('message') && (
                  <span className="field-error" id="contact-message-error">
                    {errorFor('message')}
                  </span>
                )}
              </div>

              {/* Disabled while invalid AND while in flight — an impatient
                  double-click would otherwise insert two rows. */}
              <button
                type="submit"
                className="btn contact-submit"
                disabled={!isValid || sending || !isSupabaseConfigured}
              >
                {sending ? 'Sending…' : 'Send message'}
              </button>

              <div className="contact-feedback" role="status" aria-live="polite">
                {status === 'success' && (
                  <p className="form-status form-status--success">
                    <CheckIcon />
                    <span>Message sent! I&apos;ll be in touch soon.</span>
                  </p>
                )}
                {status === 'error' && (
                  <p className="form-status form-status--error">
                    <XIcon />
                    <span>Something went wrong. Please try again, or email me directly.</span>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
