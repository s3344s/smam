import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon'
import { Reveal, SectionHeading } from './ui'
import { useSiteData } from '../data/SiteDataContext'
import { useIsMobile, waLink } from '../lib/utils'

const ADDONS = {
  az: [
    {
      titleKey: 'pricing.designVideo',
      items: [
        { id: 'post', label: 'Post Dizayn', price: 50, unitKey: 'pricing.unitPost', type: 'counter', icon: 'design' },
        { id: 'story', label: 'Story Hazırlanması', price: 40, unitKey: 'pricing.unitStory', type: 'counter', icon: 'calendar' },
        { id: 'reels30', label: 'Reels Montaj (30 san)', price: 90, unitKey: 'pricing.unitVideo', type: 'counter', icon: 'reels' },
        { id: 'reels60', label: 'Reels Montaj (60 san)', price: 140, unitKey: 'pricing.unitVideo', type: 'counter', icon: 'reels' },
      ],
    },
    {
      titleKey: 'pricing.aiVideo',
      items: [
        { id: 'ai30', label: 'AI Video (30 san)', price: 120, unitKey: 'pricing.unitVideo', type: 'counter', icon: 'spark' },
        { id: 'ai60', label: 'AI Video (60 san)', price: 180, unitKey: 'pricing.unitVideo', type: 'counter', icon: 'spark' },
        { id: 'ai90', label: 'AI Video (90 san – 2 dəq)', price: 260, unitKey: 'pricing.unitVideo', type: 'counter', icon: 'spark' },
      ],
    },
    {
      titleKey: 'pricing.shooting',
      items: [
        { id: 'proShoot', label: 'Professional Çəkiliş', price: 370, unitKey: 'pricing.unitSession', type: 'counter', icon: 'camera' },
        { id: 'mobileShoot', label: 'Mobil Çəkiliş', price: 100, unitKey: 'pricing.unitSession', type: 'counter', icon: 'phone' },
        { id: 'studioShoot', label: 'Studio Çəkiliş', price: 100, unitKey: 'pricing.unitSession', type: 'counter', icon: 'camera' },
        { id: 'droneShoot', label: 'Dron Çəkilişi', price: 820, unitKey: 'pricing.unitSession', type: 'counter', icon: 'radar' },
      ],
    },
    {
      titleKey: 'pricing.other',
      items: [
        { id: 'metaAds', label: 'Meta Ads', price: 320, type: 'check', icon: 'meta' },
        { id: 'seo', label: 'SEO Xidməti', price: 320, type: 'check', icon: 'target' },
        { id: 'chatbot', label: 'AI Chatbot', price: 420, type: 'check', icon: 'spark' },
        { id: 'copyPlan', label: 'Copywriting və Kontent Planı', price: 220, type: 'check', icon: 'copy' },
        { id: 'competitor', label: 'Rəqib Analizi', price: 320, type: 'check', icon: 'radar' },
        { id: 'brandbook', label: 'Brandbook Hazırlanması', price: 420, type: 'check', icon: 'brand' },
        { id: 'website', label: 'Website Xidməti (Start)', price: 1220, type: 'check', icon: 'web' },
        { id: 'community', label: 'Community Management', price: 200, type: 'check', icon: 'team' },
        { id: 'campaign', label: 'Reklam Kampaniyası', price: 180, type: 'check', icon: 'growth' },
        { id: 'smmManage', label: 'SMM İdarəetmə', price: 270, type: 'check', icon: 'system' },
        { id: 'branding', label: 'Branding Dizayn', price: 220, type: 'check', icon: 'gem' },
      ],
    },
  ],
  en: [
    { titleKey: 'pricing.designVideo', items: [
      { id: 'post', label: 'Post Design', price: 50, unitKey: 'pricing.unitPost', type: 'counter', icon: 'design' },
      { id: 'story', label: 'Story Preparation', price: 40, unitKey: 'pricing.unitStory', type: 'counter', icon: 'calendar' },
      { id: 'reels30', label: 'Reels Edit (30 sec)', price: 90, unitKey: 'pricing.unitVideo', type: 'counter', icon: 'reels' },
      { id: 'reels60', label: 'Reels Edit (60 sec)', price: 140, unitKey: 'pricing.unitVideo', type: 'counter', icon: 'reels' },
    ]},
    { titleKey: 'pricing.aiVideo', items: [
      { id: 'ai30', label: 'AI Video (30 sec)', price: 120, unitKey: 'pricing.unitVideo', type: 'counter', icon: 'spark' },
      { id: 'ai60', label: 'AI Video (60 sec)', price: 180, unitKey: 'pricing.unitVideo', type: 'counter', icon: 'spark' },
      { id: 'ai90', label: 'AI Video (90 sec – 2 min)', price: 260, unitKey: 'pricing.unitVideo', type: 'counter', icon: 'spark' },
    ]},
    { titleKey: 'pricing.shooting', items: [
      { id: 'proShoot', label: 'Professional Shooting', price: 370, unitKey: 'pricing.unitSession', type: 'counter', icon: 'camera' },
      { id: 'mobileShoot', label: 'Mobile Shooting', price: 100, unitKey: 'pricing.unitSession', type: 'counter', icon: 'phone' },
      { id: 'studioShoot', label: 'Studio Shooting', price: 100, unitKey: 'pricing.unitSession', type: 'counter', icon: 'camera' },
      { id: 'droneShoot', label: 'Drone Shooting', price: 820, unitKey: 'pricing.unitSession', type: 'counter', icon: 'radar' },
    ]},
    { titleKey: 'pricing.other', items: [
      { id: 'metaAds', label: 'Meta Ads', price: 320, type: 'check', icon: 'meta' }, { id: 'seo', label: 'SEO Service', price: 320, type: 'check', icon: 'target' }, { id: 'chatbot', label: 'AI Chatbot', price: 420, type: 'check', icon: 'spark' }, { id: 'copyPlan', label: 'Copywriting & Content Plan', price: 220, type: 'check', icon: 'copy' }, { id: 'competitor', label: 'Competitor Analysis', price: 320, type: 'check', icon: 'radar' }, { id: 'brandbook', label: 'Brandbook Preparation', price: 420, type: 'check', icon: 'brand' }, { id: 'website', label: 'Website Service (Start)', price: 1220, type: 'check', icon: 'web' }, { id: 'community', label: 'Community Management', price: 200, type: 'check', icon: 'team' }, { id: 'campaign', label: 'Ad Campaign', price: 180, type: 'check', icon: 'growth' }, { id: 'smmManage', label: 'SMM Management', price: 270, type: 'check', icon: 'system' }, { id: 'branding', label: 'Branding Design', price: 220, type: 'check', icon: 'gem' },
    ]},
  ],
  ru: [
    { titleKey: 'pricing.designVideo', items: [
      { id: 'post', label: 'Дизайн поста', price: 50, unitKey: 'pricing.unitPost', type: 'counter', icon: 'design' },
      { id: 'story', label: 'Подготовка сторис', price: 40, unitKey: 'pricing.unitStory', type: 'counter', icon: 'calendar' },
      { id: 'reels30', label: 'Монтаж Reels (30 сек)', price: 90, unitKey: 'pricing.unitVideo', type: 'counter', icon: 'reels' },
      { id: 'reels60', label: 'Монтаж Reels (60 сек)', price: 140, unitKey: 'pricing.unitVideo', type: 'counter', icon: 'reels' },
    ]},
    { titleKey: 'pricing.aiVideo', items: [
      { id: 'ai30', label: 'AI видео (30 сек)', price: 120, unitKey: 'pricing.unitVideo', type: 'counter', icon: 'spark' },
      { id: 'ai60', label: 'AI видео (60 сек)', price: 180, unitKey: 'pricing.unitVideo', type: 'counter', icon: 'spark' },
      { id: 'ai90', label: 'AI видео (90 сек – 2 мин)', price: 260, unitKey: 'pricing.unitVideo', type: 'counter', icon: 'spark' },
    ]},
    { titleKey: 'pricing.shooting', items: [
      { id: 'proShoot', label: 'Профессиональная съемка', price: 370, unitKey: 'pricing.unitSession', type: 'counter', icon: 'camera' },
      { id: 'mobileShoot', label: 'Мобильная съемка', price: 100, unitKey: 'pricing.unitSession', type: 'counter', icon: 'phone' },
      { id: 'studioShoot', label: 'Студийная съемка', price: 100, unitKey: 'pricing.unitSession', type: 'counter', icon: 'camera' },
      { id: 'droneShoot', label: 'Съемка дроном', price: 820, unitKey: 'pricing.unitSession', type: 'counter', icon: 'radar' },
    ]},
    { titleKey: 'pricing.other', items: [
      { id: 'metaAds', label: 'Meta Ads', price: 320, type: 'check', icon: 'meta' }, { id: 'seo', label: 'SEO услуга', price: 320, type: 'check', icon: 'target' }, { id: 'chatbot', label: 'AI чатбот', price: 420, type: 'check', icon: 'spark' }, { id: 'copyPlan', label: 'Копирайтинг и контент-план', price: 220, type: 'check', icon: 'copy' }, { id: 'competitor', label: 'Анализ конкурентов', price: 320, type: 'check', icon: 'radar' }, { id: 'brandbook', label: 'Подготовка brandbook', price: 420, type: 'check', icon: 'brand' }, { id: 'website', label: 'Website услуга (Start)', price: 1220, type: 'check', icon: 'web' }, { id: 'community', label: 'Community Management', price: 200, type: 'check', icon: 'team' }, { id: 'campaign', label: 'Рекламная кампания', price: 180, type: 'check', icon: 'growth' }, { id: 'smmManage', label: 'SMM управление', price: 270, type: 'check', icon: 'system' }, { id: 'branding', label: 'Branding дизайн', price: 220, type: 'check', icon: 'gem' },
    ]},
  ],
}

function priceNumber(price) {
  const n = String(price || '').replace(/[^0-9]/g, '')
  return n ? Number(n) : 0
}

function formatPrice(n) {
  return `${Math.round(n).toLocaleString('ru-RU')} AZN`
}

function flattenAddons(groups) {
  return groups.flatMap((g) => g.items)
}

function copyForTitle(copy, titleKey, t) {
  const key = String(titleKey).split('.').pop()
  return copy?.[key] || t(titleKey)
}

function CalculatorModal({ open, onClose, selected, packages, setSelected, contact, t, lang, copy = {} }) {
  const groups = ADDONS[lang] || ADDONS.az
  const addons = flattenAddons(groups)
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
    if (open) {
      setCounts({})
      setChecked({})
    }
  }, [open, selected?.id])

  if (!selected) return null

  const base = priceNumber(selected?.price)
  const chosenAddons = addons
    .map((a) => {
      const qty = a.type === 'counter' ? counts[a.id] || 0 : checked[a.id] ? 1 : 0
      return qty ? { ...a, qty, subtotal: qty * a.price } : null
    })
    .filter(Boolean)
  const addonsTotal = chosenAddons.reduce((sum, a) => sum + a.subtotal, 0)
  const total = base + addonsTotal

  const inc = (id, delta) => setCounts((c) => ({ ...c, [id]: Math.max(0, (c[id] || 0) + delta) }))
  const basePackageLabel = t('pricing.basePackage')
  const addonsLabel = t('pricing.addons')
  const monthlyLabel = copy.monthly || t('pricing.monthly')
  const message = [
    'Salam, CULTA Media Agency.',
    `${basePackageLabel}: ${selected?.name || '-'} (${selected?.price || '-'})`,
    chosenAddons.length ? `${addonsLabel}:` : '',
    ...chosenAddons.map((a) => `- ${a.label} × ${a.qty}: ${formatPrice(a.subtotal)}`),
    `${monthlyLabel}: ${selected?.price?.match(/\d/) ? formatPrice(total) : selected?.price || '-'}`,
  ].filter(Boolean).join('\n')

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] overflow-y-auto bg-black/75 px-3 py-6 backdrop-blur-xl sm:px-4 sm:py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button type="button" className="fixed inset-0 cursor-default" onClick={onClose} aria-label={t('pricing.close')} />
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto max-w-6xl rounded-[1.5rem] border border-white/10 bg-ink/95 p-4 shadow-card sm:rounded-[2rem] md:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t('pricing.close')}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-cream transition hover:border-white/25 md:right-5 md:top-5 md:h-10 md:w-10"
            >
              <Icon name="close" className="h-4 w-4" />
            </button>

            <div className="max-w-2xl pr-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-champagne">
                <Icon name="calculator" className="h-3.5 w-3.5" />
                {copy.modalEyebrow || t('pricing.modalEyebrow')}
              </span>
              <h3 className="mt-5 font-display text-3xl font-black leading-[0.98] tracking-tight text-cream sm:text-4xl md:text-6xl">
                {copy.modalTitle || t('pricing.modalTitle')}
              </h3>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-base">
                {copy.modalSubtitle || t('pricing.modalSubtitle')}
              </p>
            </div>

            <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-[1fr_320px]">
              <div className="space-y-6">
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]">
                  <div className="border-b border-white/8 px-5 py-4 font-display text-[11px] font-bold uppercase tracking-[0.22em] text-cream">
                    {copy.step1 || t('pricing.step1')}
                  </div>
                  <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4">
                    {packages.map((pkg) => {
                      const active = selected.id === pkg.id
                      return (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => setSelected(pkg)}
                          className={`relative rounded-2xl border p-4 text-left transition-all ${
                            active ? 'border-champagne bg-white/[0.07] shadow-glow' : 'border-white/10 bg-white/[0.025] hover:border-white/25'
                          }`}
                        >
                          {pkg.highlighted && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cream px-3 py-1 font-display text-[9px] font-bold uppercase tracking-[0.18em] text-ink">
                              {t('common.selected')}
                            </span>
                          )}
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-champagne">
                            <Icon name="gem" className="h-4 w-4" />
                          </span>
                          <p className="mt-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-muted">{pkg.name}</p>
                          <p className="mt-1 font-display text-xl font-black text-cream">{pkg.price}</p>
                          {pkg.period && <p className="text-xs text-muted">/ {pkg.period}</p>}
                          <ul className="mt-4 space-y-1 text-xs text-muted">
                            {pkg.features.slice(0, 4).map((f) => <li key={f}>✓ {f}</li>)}
                            {pkg.features.length > 4 && <li>+ {t('common.more')}...</li>}
                          </ul>
                          {active && <Icon name="check" className="absolute right-4 top-4 h-4 w-4 text-cream" />}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]">
                  <div className="border-b border-white/8 px-5 py-4 font-display text-[11px] font-bold uppercase tracking-[0.22em] text-cream">
                    {copy.step2 || t('pricing.step2')}
                  </div>
                  <div className="space-y-7 p-4 md:p-5">
                    {groups.map((group) => (
                      <div key={group.titleKey}>
                        <h4 className="mb-3 font-display text-xs font-bold uppercase tracking-[0.18em] text-cream">
                          {copyForTitle(copy, group.titleKey, t)}
                        </h4>
                        <div className="grid gap-3 md:grid-cols-2">
                          {group.items.map((a) => {
                            const qty = counts[a.id] || 0
                            const isChecked = !!checked[a.id]
                            return (
                              <div
                                key={a.id}
                                className={`flex items-center gap-3 rounded-2xl border p-3 transition-colors ${
                                  qty || isChecked ? 'border-champagne/40 bg-champagne/[0.06]' : 'border-white/8 bg-white/[0.025]'
                                }`}
                              >
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/[0.035] text-champagne">
                                  <Icon name={a.icon} className="h-4.5 w-4.5" />
                                </span>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate font-display text-sm font-semibold text-cream">{a.label}</p>
                                  <p className="text-xs text-muted">{formatPrice(a.price)}{a.unitKey ? ` / ${t(a.unitKey)}` : '/ay'}</p>
                                </div>
                                {a.type === 'counter' ? (
                                  <div className="flex h-9 shrink-0 items-center overflow-hidden rounded-lg border border-white/15">
                                    <button type="button" onClick={() => inc(a.id, -1)} className="flex h-full w-9 items-center justify-center text-muted hover:text-cream">
                                      <Icon name="minus" className="h-3.5 w-3.5" />
                                    </button>
                                    <span className="w-9 text-center font-display text-sm font-bold text-cream">{qty}</span>
                                    <button type="button" onClick={() => inc(a.id, 1)} className="flex h-full w-9 items-center justify-center text-muted hover:text-cream">
                                      <Icon name="plus" className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => setChecked((c) => ({ ...c, [a.id]: !c[a.id] }))}
                                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${
                                      isChecked ? 'border-champagne bg-champagne text-ink' : 'border-white/15 text-transparent'
                                    }`}
                                  >
                                    <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                                  </button>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="h-fit rounded-3xl border border-white/10 bg-white/[0.045] p-5 lg:sticky lg:top-6">
                <div className="mb-5 flex items-center gap-2 font-display text-[11px] font-bold uppercase tracking-[0.22em] text-muted">
                  <Icon name="report" className="h-4 w-4" />
                  {copy.summary || t('pricing.summary')}
                </div>
                <div className="space-y-3 text-sm">
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
                <p className="mt-1 font-display text-3xl font-black text-cream">{selected.price?.match(/\d/) ? formatPrice(total) : selected.price}</p>
                <p className="mt-1 text-xs text-muted">{t('pricing.roi')}</p>
                <a href={waLink(contact.whatsappRaw, message)} target="_blank" rel="noreferrer" className="btn-primary mt-6 w-full !px-4 !py-3 !text-[13px]">
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
                  <span
                    className={`font-display font-bold tracking-tight ${
                      String(pkg.price || '').length > 9 ? 'text-2xl' : 'text-[2.1rem]'
                    } ${pkg.highlighted ? 'text-champagne' : 'text-cream'}`}
                  >
                    {pkg.price}
                  </span>
                  {pkg.period && <span className="text-sm text-muted">/ {pkg.period}</span>}
                </div>

                <p className="mt-3 min-h-[40px] text-[13px] leading-relaxed text-muted">{pkg.tagline}</p>

                <div className="my-6 h-px bg-gradient-to-r from-white/15 via-white/5 to-transparent" />

                <ul className="flex flex-1 flex-col gap-3">
                  {pkg.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-2.5 text-sm text-cream/90">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          pkg.highlighted ? 'bg-champagne/15 text-champagne' : 'bg-white/[0.06] text-champagne/80'
                        }`}
                      >
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
        copy={copy}
      />
    </section>
  )
}
