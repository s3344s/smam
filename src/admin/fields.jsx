import Icon from '../components/Icon'

export function Field({ label, value, onChange, placeholder = '', type = 'text', hint }) {
  return (
    <div>
      <label className="label-dark">{label}</label>
      <input
        type={type}
        className="input-dark"
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
    </div>
  )
}

export function TextArea({ label, value, onChange, rows = 3, placeholder = '', hint }) {
  return (
    <div>
      <label className="label-dark">{label}</label>
      <textarea
        rows={rows}
        className="input-dark resize-y"
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
    </div>
  )
}

export function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="label-dark">{label}</label>
      <select className="input-dark" value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}

export function Toggle({ label, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 text-sm text-cream/80"
    >
      <span
        className={`relative h-6 w-11 rounded-full border transition-colors ${
          checked ? 'border-champagne/60 bg-champagne/30' : 'border-white/15 bg-white/5'
        }`}
      >
        <span
          className={`absolute top-0.5 h-4.5 w-4.5 rounded-full transition-all ${
            checked ? 'left-[1.45rem] bg-champagne' : 'left-0.5 bg-muted'
          }`}
          style={{ height: '1.125rem', width: '1.125rem' }}
        />
      </span>
      {label}
    </button>
  )
}

export function EditorCard({ title, onDelete, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h4 className="font-display text-sm font-medium text-cream/90">{title}</h4>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="flex items-center gap-1.5 rounded-lg border border-red-400/20 px-2.5 py-1.5 text-xs text-red-400/90 transition-colors hover:border-red-400/50 hover:bg-red-400/10"
          >
            <Icon name="trash" className="h-3.5 w-3.5" />
            Sil
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
      <Icon name="plus" className="h-4 w-4" />
      {label}
    </button>
  )
}

export function SectionTitle({ title, desc }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-xl font-semibold text-cream md:text-2xl">{title}</h2>
      {desc && <p className="mt-1.5 text-sm text-muted">{desc}</p>}
    </div>
  )
}
