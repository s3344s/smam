import { useState } from 'react'
import { AUTH_KEY } from '../data/defaultData'
import Login from './Login'
import Dashboard from './Dashboard'

function readAuth() {
  try {
    return window.sessionStorage.getItem(AUTH_KEY) === '1'
  } catch {
    return false
  }
}

export default function Admin() {
  const [authed, setAuthed] = useState(readAuth)

  const login = () => {
    try {
      window.sessionStorage.setItem(AUTH_KEY, '1')
    } catch {
      /* noop */
    }
    setAuthed(true)
  }

  const logout = () => {
    try {
      window.sessionStorage.removeItem(AUTH_KEY)
    } catch {
      /* noop */
    }
    setAuthed(false)
  }

  return authed ? <Dashboard onLogout={logout} /> : <Login onSuccess={login} />
}
