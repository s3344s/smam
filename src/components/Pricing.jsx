import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon'
import { Reveal, SectionHeading } from './ui'
import { useSiteData } from '../data/SiteDataContext'
import { useIsMobile, waLink } from '../lib/utils'

function priceNumber(price) {
  const n = String(price || '').replace(/[^0-9]/g, '')
  return n ? Number(n) : 0
}

function formatPrice(n) {
  return `${Math.round(n).toLocaleString('ru-RU')} AZN`
}

function CalculatorModal({ open, onClose, selected, packages, setSelected, contact, t, addons, copy = {} }) {
  const groups = useMemo(() => {
    const map = {}
    for (const a of (addons || [])) {
      if (!map[a.group]) map[a.group] = []
      map[a.group].push(a)
    }
    return Object.entries(map).map(([title, items]) => ({ title, items }))
  }, [addons])

  const [counts, setCounts] = useState({})
  const [checked, setChecked] = useState({})

  useEffect(() => {
    if (!open) return undefined
    document.body.style.overflow = 'hidden'
    const close = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', close)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', close)
    }
  }, [open, onClose])

  useEffect(() => {
    if (open) { setCounts({}); setChecked({}) }
  }, [open, selected?.id])

  if (!selected) return null

  const flatAddons = (addons || [])
  const chosenAddons = flatAddons
    .map((a) => {
      const qty = a.type === 'counter' ? counts[a.id] || 0 : checked[a.id] ? 1 : 0
      return qty ? { ...a, qty, subtotal: qty * a.price } : null
    })
    .filter(Boolean)

  const base = priceNumber(selected?.price)
  const addonsTotal = chosenAddons.reduce((sum, a) => sum + a.subtotal, 0)
  const total = base + addonsTotal
  const monthlyLabel = copy.monthly || t('pricing.monthly')

  const message = [
    copy.modalTitle || t('pricing.modalTitle'),
    '',
    `📦 Paket: ${selected.name} — ${selected.price}`,
    ...(chosenAddons.length ? ['', '➕ Əlavə xidmətlər:'] : []),
    ...chosenAddons.map((a) => `• ${a.label} × ${a.qty} = ${formatPrice(a.subtotal)}`),
    '',
    `💰 Aylıq cəmi: ${selected.price?.match(/\d/) ? formatPrice(total) : selected.price}`,
  ].join('\n')

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-8 backdrop-blur-sm md:items-center md:py-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-ink shadow-2xl"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-white/8 px-7 py-5">
              <div>
                <span className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-champagne">
                  {copy.modalEyebrow || t('pricing.modalEyebrow')}
                </span>
                <h2 className="mt-1 font-display text-xl font-bold text-cream">{copy.modalTitle || t('pricing.modalTitle')}</h2>
              </div>
              <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted hover:text-cream">
                <Icon name="close" className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-0 md:grid-cols-[1fr_300px]">
              {/* left */}
              <div className="overflow-y-auto p-6 md:max-h-[72vh] md:p-8">
                {/* Step 1 — package */}
                <p className="mb-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-muted">{copy.step1 || t('pricing.step1')}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelected(pkg)}
                      className={`flex flex-col rounded-2xl border p-4 text-left transition-all duration-200 ${
                        selected?.id === pkg.id
                          ? 'border-champagne/50 bg-champagne/[0.07]'
                          : 'border-white/10 hover:border-white/25 hover:bg-white/[0.03]'
                      }`}
                    >
                      <span className="font-display text-sm font-semibold text-cream">{pkg.name}</span>
                      <span className={`mt-1 font-display text-lg font-bold ${selected?.id === pkg.id ? 'text-champagne' : 'text-cream'}`}>
                        {pkg.price}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Step 2 — addons */}
                {groups.length > 0 && (
                  <>
                    <p className="mb-4 mt-8 font-display text-xs font-bold uppercase tracking-[0.2em] text-muted">{copy.step2 || t('pricing.step2')}</p>
                    <div className="space-y-6">
                      {groups.map(({ title, items }) => (
                        <div key={title}>
                          <p className="mb-3 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-champagne/70">{title}</p>
                          <div className="space-y-2">
                            {items.map((addon) => (
                              <div key={addon.id} className="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">
                                <div className="flex items-center gap-3 min-w-0">
                                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-champagne">
                                    <Icon name={addon.icon} className="h-4 w-4" />
                                  </span>
                                  <div className="min-w-0">
                                    <span className="block truncate text-sm text-cream">{addon.label}</span>
                                    <span className="text-xs text-muted">{formatPrice(addon.price)}{addon.unit ? ` / ${addon.unit}` : ''}</span>
                                  </div>
                                </div>
                                {addon.type === 'counter' ? (
                                  <div className="flex items-center gap-2 shrink-0">
                                    <button onClick={() => setCounts((c) => ({ ...c, [addon.id]: Math.max(0, (c[addon.id] || 0) - 1) }))}
                                      className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-muted hover:border-white/30 hover:text-cream">
                                      <Icon name="minus" className="h-3 w-3" />
                                    </button>
                                    <span className="w-6 text-center font-display text-sm font-bold text-cream">{counts[addon.id] || 0}</span>
                                    <button onClick={() => setCounts((c) => ({ ...c, [addon.id]: (c[addon.id] || 0) + 1 }))}
                                      className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-muted hover:border-champagne/50 hover:text-champagne">
                                      <Icon name="plus" className="h-3 w-3" />
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => setChecked((c) => ({ ...c, [addon.id]: !c[addon.id] }))}
                                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-all ${
                                      checked[addon.id] ? 'border-champagne bg-champagne/20 text-champagne' : 'border-white/20 text-transparent hover:border-white/40'
                                    }`}
                                  >
                                    <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.5} />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* right — summary */}
              <aside className="border-t border-white/8 bg-white/[0.02] p-6 md:border-l md:border-t-0 md:p-8">
                <div className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.2em] text-muted">
                  <Icon name="report" className="h-4 w-4" />
                  {copy.summary || t('pricing.summary')}
                </div>
                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between gap-4 text-muted">
                    <span>{selected.name}</span>
                    <span className="font-display font-bold text-cream">{selected.price}</span>
                  </div>
                  {chosenAddons.map((a) => (
                    <div key={a.id} className="flex justify-between gap-4 text-muted">
                      <span className="min-w-0 truncate">{a.label} × {a.qty}</span>
                      <span className="shrink-0">{formatPrice(a.subtotal)}</span>
                    </div>
                  ))}
                </div>
                <div className="my-5 h-px bg-white/10" />
                <p className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-muted">{monthlyLabel}</p>
                <p className="mt-1 font-display text-3xl font-black text-cream">
                  {selected.price?.match(/\d/) ? formatPrice(total) : selected.price}
                </p>
                <p className="mt-1 text-xs text-muted">{t('pricing.roi')}</p>
                <a
                  href={waLink(contact.whatsappRaw, message)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary mt-6 w-full !px-4 !py-3 !text-[13px]"
                >
                  {copy.request || t('pricing.request')}
                </a>
              </aside>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Pricing() {
  const { siteData: data, t, lang } = useSiteData()
  const isMobile = useIsMobile()
  const copy = data.sectionCopy?.pricing || {}
  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState(data.pricing.find((p) => p.highlighted) || data.pricing[0])

  useEffect(() => {
    setSelected((prev) => data.pricing.find((p) => p.id === prev?.id) || data.pricing.find((p) => p.highlighted) || data.pricing[0])
  }, [data.pricing])

  const openCalculator = (pkg) => {
    setSelected(pkg)
    setModalOpen(true)
  }

  return (
    <section id="paketler" className="section-pad relative overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-24 h-[520px] w-[820px] -translate-x-1/2 rounded-full blur-[170px]"
        style={{
          background:
            'radial-gradient(circle at 30% 40%, rgba(216,197,160,0.13), transparent 55%), radial-gradient(circle at 70% 60%, rgba(139,124,246,0.16), transparent 55%)',
        }}
        animate={isMobile ? undefined : { rotate: [0, 14, -8, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container-x relative">
        <SectionHeading
          eyebrow={copy.eyebrow || t('pricing.eyebrow')}
          title={copy.title || t('pricing.title')}
          subtitle={copy.subtitle || t('pricing.subtitle')}
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {data.pricing.map((pkg, i) => (
            <Reveal key={pkg.id || i} delay={i * 0.09} y={36}>
              <div
                className={`relative flex h-full flex-col rounded-3xl p-6 transition-all duration-500 hover:-translate-y-2 sm:p-7 ${
                  pkg.highlighted
                    ? 'border border-champagne/40 bg-gradient-to-b from-champagne/[0.1] via-white/[0.04] to-white/[0.02] shadow-glow'
                    : 'glass hover:border-white/25'
                }`}
              >
                {pkg.highlighted && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-champagne/50 bg-ink px-4 py-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-champagne shadow-glow">
                    {t('common.selected')}
                  </span>
                )}

                <span className="font-display text-xs font-medium uppercase tracking-[0.3em] text-muted">
                  {t('common.package')} {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold text-cream">{pkg.name}</h3>

                <div className="mt-5 flex items-baseline gap-2">
                  <span className={`font-display font-bold tracking-tight ${String(pkg.price || '').length > 9 ? 'text-2xl' : 'text-[2.1rem]'} ${pkg.highlighted ? 'text-champagne' : 'text-cream'}`}>
                    {pkg.price}
                  </span>
                  {pkg.period && <span className="text-sm text-muted">/ {pkg.period}</span>}
                </div>

                <p className="mt-3 min-h-[40px] text-[13px] leading-relaxed text-muted">{pkg.tagline}</p>
                <div className="my-6 h-px bg-gradient-to-r from-white/15 via-white/5 to-transparent" />

                <ul className="flex flex-1 flex-col gap-3">
                  {pkg.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-2.5 text-sm text-cream/90">
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${pkg.highlighted ? 'bg-champagne/15 text-champagne' : 'bg-white/[0.06] text-champagne/80'}`}>
                        <Icon name="check" className="h-3 w-3" strokeWidth={2} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => openCalculator(pkg)}
                  className={`${pkg.highlighted ? 'btn-primary' : 'btn-ghost'} mt-8 w-full !text-[13px]`}
                >
                  {copy.choose || t('pricing.choose')}
                  <Icon name="plus" className="h-4 w-4" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-sm text-muted">{t('common.budget')}</p>
        </Reveal>
      </div>

      <CalculatorModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        selected={selected}
        packages={data.pricing}
        setSelected={setSelected}
        contact={data.contact}
        t={t}
        lang={lang}
        addons={data.addons}
        copy={copy}
      />
    </section>
  )
}
