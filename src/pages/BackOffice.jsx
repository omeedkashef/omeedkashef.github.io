import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js'
import { TrashIcon, XIcon } from '../components/Icons.jsx'

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function MessageModal({ message, onClose }) {
  // Bound only while the modal is open, and removed on close — a listener left
  // attached would keep firing after the modal is gone.
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    // mousedown rather than click: a click that starts inside the panel and
    // finishes on the backdrop (a drag while selecting text) would otherwise
    // close the modal out from under the admin.
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal__head">
          <div>
            <h2 id="modal-title" className="modal__name">
              {message.name}
            </h2>
            <p className="modal__meta">
              {message.email} · {formatDate(message.created_at)}
            </p>
          </div>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Close message">
            <XIcon />
          </button>
        </div>
        <p className="modal__body">{message.message}</p>
      </div>
    </div>
  )
}

function BackOffice() {
  const navigate = useNavigate()
  const [authState, setAuthState] = useState('checking') // checking | authed
  const [messages, setMessages] = useState([])
  const [loadState, setLoadState] = useState('loading') // loading | ready | error
  const [actionError, setActionError] = useState('')
  const [selected, setSelected] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  // Guard. Verified before any data is requested — an unauthenticated visitor
  // never triggers a fetch. Note this is a usability guard, not the security
  // boundary: RLS denies anonymous SELECT and DELETE at the database.
  useEffect(() => {
    let active = true

    if (!isSupabaseConfigured) {
      navigate('/login', { replace: true })
      return undefined
    }

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      if (data.session) setAuthState('authed')
      else navigate('/login', { replace: true })
    })

    // If the session ends while the page is open, leave immediately.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return
      if (!session) navigate('/login', { replace: true })
    })

    return () => {
      active = false
      sub?.subscription?.unsubscribe()
    }
  }, [navigate])

  const loadMessages = useCallback(async () => {
    setLoadState('loading')
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setLoadState('error')
      return
    }
    setMessages(data ?? [])
    setLoadState('ready')
  }, [])

  useEffect(() => {
    if (authState === 'authed') loadMessages()
  }, [authState, loadMessages])

  async function handleDelete(id) {
    setActionError('')
    setDeletingId(id)

    // id is a uuid. Filtering with a number returns 22P02, which looks like a
    // permissions failure and is not.
    const { error } = await supabase.from('messages').delete().eq('id', id)
    setDeletingId(null)

    if (error) {
      setActionError('Could not delete that message. Please try again.')
      return
    }

    // Removed from state only after the server confirms. An optimistic removal
    // that silently failed would show an inbox that disagrees with the database.
    setMessages((prev) => prev.filter((m) => m.id !== id))
    setSelected((prev) => (prev?.id === id ? null : prev))
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/', { replace: true })
  }

  if (authState === 'checking') {
    return (
      <section className="section container">
        <p className="meta">Checking session…</p>
      </section>
    )
  }

  return (
    <section className="section container" aria-labelledby="backoffice-heading">
      <div className="backoffice-head">
        <div>
          <p className="eyebrow">Private workspace</p>
          <h1 id="backoffice-heading">Message inbox</h1>
        </div>
        <button type="button" className="btn btn--ghost backoffice-logout" onClick={handleLogout}>
          Log out
        </button>
      </div>

      {actionError && (
        <p className="form-status form-status--error backoffice-alert">
          <XIcon />
          <span>{actionError}</span>
        </p>
      )}

      {loadState === 'loading' && <p className="meta">Loading messages…</p>}

      {/* Distinct from the empty state below — these look similar and mean
          opposite things. */}
      {loadState === 'error' && (
        <p className="form-status form-status--error">
          <XIcon />
          <span>Could not load messages. Please refresh and try again.</span>
        </p>
      )}

      {loadState === 'ready' && messages.length === 0 && (
        <p className="backoffice-empty">No messages yet.</p>
      )}

      {loadState === 'ready' && messages.length > 0 && (
        // Own scroll container: a wide table is the likeliest source of
        // page-level horizontal overflow on a narrow viewport.
        <div className="table-scroll">
          <table className="messages-table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Date</th>
                <th scope="col" className="messages-table__actions">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {messages.map((row) => (
                <tr key={row.id} onClick={() => setSelected(row)} className="messages-table__row">
                  <td>{row.name}</td>
                  <td className="messages-table__muted">{row.email}</td>
                  <td className="messages-table__muted">{formatDate(row.created_at)}</td>
                  <td className="messages-table__actions">
                    <div className="row messages-table__controls">
                      <button
                        type="button"
                        className="btn--ghost table-action"
                        onClick={(event) => {
                          event.stopPropagation()
                          setSelected(row)
                        }}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="btn--ghost table-action table-action--danger"
                        onClick={(event) => {
                          event.stopPropagation()
                          handleDelete(row.id)
                        }}
                        disabled={deletingId === row.id}
                        aria-label={`Delete message from ${row.name}`}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && <MessageModal message={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}

export default BackOffice
