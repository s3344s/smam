import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ADMIN_CREDENTIALS } from '../data/defaultData'
import { Logo } from '../components/ui'
import Icon from '../components/Icon'

export default function Login({ onSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const submit = (e) => {
    e?.preventDefault?.()
    if (username.trim() === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      onSuccess()
    } else {
      setError(true)
      setTimeout(() => setError(false), 1800)
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
              <label className="label-dark" htmlFor="adm-user">İstifadəçi adı</label>
              <input
                id="adm-user"
                className="input-dark"
                placeholder="admin"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              <p className="text-center text-sm text-red-400">İstifadəçi adı və ya şifrə yanlışdır.</p>
            )}

            <button type="submit" className="btn-primary w-full justify-center">
              Daxil ol
              <Icon name="arrowRight" className="h-4 w-4" />
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
