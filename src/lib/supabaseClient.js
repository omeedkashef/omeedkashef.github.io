import { createClient } from '@supabase/supabase-js'

// Vite exposes any VITE_-prefixed variable from .env (local) or from the
// GitHub Actions env: block (production). Both values are public by design:
// the anon key is safe to ship in the bundle because Row Level Security is
// what actually protects the data. The service_role key must NEVER be used here.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Fallback behavior: when the variables are missing the app must still load
// rather than crash on a blank screen. Features that need Supabase check this
// flag and show a friendly message instead.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY ' +
      'to .env for local development, or to the repository secrets for deployment. ' +
      'The contact form, login, and back office will be unavailable until then.',
  )
}

// null when unconfigured — always guard with isSupabaseConfigured before use.
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
