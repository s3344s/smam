import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { Logo } from '../components/ui'
import Icon from '../components/Icon'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  // Supabase reset linkindən gələn session-u qur
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        // session quruldu, form aktiv olur
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSubmit = async (e) => {
    e?.preventDefault?.()
    setError('')

    if (password.length < 6) {
      setError('Şifrə minimum 6 simvol olmalıdır.')
      return
    }
    if (password !== confirm) {
      setError('Şifrələr eyni deyil.')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      setDone(true)
      setTimeout(() => navigate('/smadmin'), 2500)
    } catch (err) {
      setError(err.message || 'Xəta baş verdi.')
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
        <div className="glass-strong rounded-3xl border border-white/10 p-8 md:p-10">
          <div className="flex flex-col items-center text-center">
            <Logo size="md" withAgency={false} />
            <div className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted">
              <Icon name="lock" className="h-3.5 w-3.5 text-champagne" />
              Yeni şifrə təyin et
            </div>
          </div>

          {done ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 flex flex-col items-center gap-4 text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-champagne/40 bg-champagne/10 text-champagne">
                <Icon name="check" className="h-7 w-7" strokeWidth={2} />
              </span>
              <p className="font-display text-lg font-semibold text-cream">Şifrə dəyişdirildi!</p>
              <p className="text-sm text-muted">Admin panelinə yönləndirilirsiniz...</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="label-dark" htmlFor="new-pass">Yeni şifrə</label>
                <input
                  id="new-pass"
                  type="password"
                  className="input-dark"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="label-dark" htmlFor="confirm-pass">Şifrəni təsdiqlə</label>
                <input
                  id="confirm-pass"
                  type="password"
                  className="input-dark"
                  placeholder="••••••••"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>

              {error && (
                <p className="text-center text-sm text-red-400">{error}</p>
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
                    Dəyişdirilir...
                  </span>
                ) : (
                  <>
                    Şifrəni dəyiş
                    <Icon name="arrowRight" className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
}
