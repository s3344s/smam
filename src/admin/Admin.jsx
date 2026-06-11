import { useEffect, useState } from 'react'
import { supabase, signOutAdmin } from '../lib/supabase'
import Login from './Login'
import Dashboard from './Dashboard'

export default function Admin() {
  const [session, setSession] = useState(undefined) // undefined = loading

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOutAdmin()
    setSession(null)
  }

  // Loading state
  if (session === undefined) {
    return (
      <div className="noise flex min-h-screen items-center justify-center bg-ink">
        <svg className="h-8 w-8 animate-spin text-champagne" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      </div>
    )
  }

  return session
    ? <Dashboard onLogout={handleLogout} />
    : <Login onSuccess={() => {}} />
}
