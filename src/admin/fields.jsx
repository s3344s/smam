import { useState } from 'react'
import { uploadImage, deleteImage } from '../lib/supabase'

export function Field({ label, value, onChange, hint, placeholder }) {
  return (
    <div>
      {label && <label className="label-dark">{label}</label>}
      <input
        className="input-dark"
        value={value ?? ''}
        placeholder={placeholder || ''}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  )
}

export function TextArea({ label, value, onChange, rows = 3, hint }) {
  return (
    <div>
      {label && <label className="label-dark">{label}</label>}
      <textarea
        className="input-dark resize-none"
        rows={rows}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  )
}

export function SelectField({ label, value, options, onChange }) {
  return (
    <div>
      {label && <label className="label-dark">{label}</label>}
      <select className="input-dark" value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  )
}

export function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={!!checked} onChange={(e) => onChange(e.target.checked)} />
        <div className={`h-6 w-11 rounded-full transition-colors ${checked ? 'bg-champagne' : 'bg-white/20'}`} />
        <div className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : ''}`} />
      </div>
      <span className="text-sm text-cream">{label}</span>
    </label>
  )
}

export function ImageUpload({ label, value, onChange, folder = 'general', hint }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setError('Fayl 5MB-dan böyük ola bilməz')
      return
    }
    setLoading(true)
    setError('')
    try {
      if (value) await deleteImage(value).catch(() => {})
      const url = await uploadImage(file, folder)
      onChange(url)
    } catch (err) {
      setError('Yükləmə xətası: ' + (err.message || 'bilinmir'))
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async () => {
    if (!value) return
    setLoading(true)
    try {
      await deleteImage(value)
      onChange('')
    } catch {
      onChange('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {label && <label className="label-dark">{label}</label>}
      {value ? (
        <div className="mt-1 overflow-hidden rounded-xl border border-white/10 bg-black/20">
          <img src={value} alt="preview" className="max-h-40 w-full object-cover" />
          <div className="flex items-center justify-between gap-3 p-3">
            <span className="truncate text-xs text-muted">Şəkil yüklənib</span>
            <button
              type="button"
              onClick={handleRemove}
              disabled={loading}
              className="rounded-lg border border-red-400/30 px-3 py-1.5 text-xs text-red-300 hover:bg-red-400/10 disabled:opacity-50"
            >
              {loading ? 'Silinir...' : 'Sil'}
            </button>
          </div>
        </div>
      ) : (
        <label className={`mt-1 flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-white/20 p-5 transition-colors hover:border-champagne/40 hover:bg-white/[0.02] ${loading ? 'pointer-events-none opacity-60' : ''}`}>
          <span className="text-2xl">📷</span>
          <span className="text-sm text-muted">{loading ? 'Yüklənir...' : 'Şəkil seç (maks 5MB)'}</span>
          <input type="file" accept="image/*" className="sr-only" onChange={handleFile} disabled={loading} />
        </label>
      )}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  )
}

export function EditorCard({ title, children, onDelete }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="font-display text-sm font-semibold text-cream">{title}</span>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-red-400/20 text-red-400/70 transition-colors hover:border-red-400/50 hover:bg-red-400/10 hover:text-red-300"
          >
            ✕
          </button>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

export function AddButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 py-4 text-sm text-muted transition-colors hover:border-champagne/40 hover:text-champagne"
    >
      <span className="text-lg">+</span>
      {label}
    </button>
  )
}

export function SectionTitle({ title, desc }) {
  return (
    <div className="mb-6">
      <h3 className="font-display text-lg font-semibold text-cream">{title}</h3>
      {desc && <p className="mt-1 text-sm text-muted">{desc}</p>}
    </div>
  )
}
