import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { signInAdmin } from '../lib/supabase'
import { Logo } from '../components/ui'
import Icon from '../components/Icon'

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e?.preventDefault?.()
    if (!email || !password) return
    setLoading(true)
    setError(false)
    try {
      await signInAdmin(email.trim(), password)
      onSuccess()
    } catch {
      setError(true)
      setTimeout(() => setError(false), 1800)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="noise relative flex min-h-screen items-center justify-center bg-ink px-5 text-cream">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-champagne/8 blur-[150px]" />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <motion.div
          animate={error ? { x: [0, -10, 10, -7, 7, -3, 3, 0] } : { x: 0 }}
          transition={{ duration: 0.45 }}
          className="glass-strong rounded-3xl border border-white/10 p-8 md:p-10"
        >
          <div className="flex flex-col items-center text-center">
            <Logo size="md" withAgency={false} />
            <div className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted">
              <Icon name="lock" className="h-3.5 w-3.5 text-champagne" />
              İdarəetmə paneli
            </div>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <div>
              <label className="label-dark" htmlFor="adm-email">E-poçt</label>
              <input
                id="adm-email"
                type="email"
                className="input-dark"
                placeholder="admin@culta.az"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="label-dark" htmlFor="adm-pass">Şifrə</label>
              <input
                id="adm-pass"
                type="password"
                className="input-dark"
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-center text-sm text-red-400">E-poçt və ya şifrə yanlışdır.</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Giriş edilir...
                </span>
              ) : (
                <>
                  Daxil ol
                  <Icon name="arrowRight" className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-muted transition-colors hover:text-cream">
            ← Sayta qayıt
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
