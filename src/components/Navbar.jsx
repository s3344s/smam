import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon'
import { Logo } from './ui'
import { useSiteData } from '../data/SiteDataContext'
import { LANGUAGES } from '../data/i18n'
import { waLink } from '../lib/utils'

const DEFAULT_NAV_ITEMS = [
  { id: 'about', label: 'Haqqımızda', href: '#haqqimizda', visible: true },
  { id: 'services', label: 'Xidmətlər', href: '#xidmetler', visible: true },
  { id: 'pricing', label: 'Paketlər', href: '#paketler', visible: true },
  { id: 'process', label: 'Proses', href: '#proses', visible: true },
  { id: 'why', label: 'Niyə biz?', href: '#niye-biz', visible: true },
  { id: 'portfolio', label: 'Portfolio', href: '#portfolio', visible: true },
  { id: 'faq', label: 'FAQ', href: '#faq', visible: true },
  { id: 'contact', label: 'Əlaqə', href: '#elaqe', visible: true },
]

function LanguageThemeControls({ compact = false, showLanguage = true, showTheme = true }) {
  const { lang, setLang, theme, toggleTheme, t } = useSiteData()
  const [open, setOpen] = useState(false)
  const active = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]

  if (!showLanguage && !showTheme) return null

  return (
    <div className={`relative flex items-center ${compact ? 'gap-1.5' : 'gap-2'}`}>
      {showLanguage && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={t('nav.language')}
          className="flex h-9 items-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-3 font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-cream transition-all hover:border-champagne/45 hover:bg-white/[0.07]"
        >
          <Icon name="globe" className="h-3.5 w-3.5 text-champagne" />
          {active.short}
        </button>
      )}

      <AnimatePresence>
        {open && showLanguage && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="glass-strong absolute right-10 top-11 z-50 w-52 overflow-hidden rounded-2xl border border-white/10 p-1.5 shadow-card"
          >
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => {
                  setLang(l.code)
                  setOpen(false)
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm transition-colors ${
                  lang === l.code ? 'bg-white/[0.08] text-cream' : 'text-muted hover:bg-white/[0.05] hover:text-cream'
                }`}
              >
                <span className="font-display text-xs font-bold uppercase text-champagne">{l.short}</span>
                <span>{l.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {showTheme && (
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={t('nav.theme')}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.035] text-cream transition-all hover:border-champagne/45 hover:bg-white/[0.07]"
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export default function Navbar() {
  const { siteData: data, t } = useSiteData()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const nav = data.navigation || {}
  const links = (nav.items?.length ? nav.items : DEFAULT_NAV_ITEMS).filter((item) => item.visible !== false)
  const wa = waLink(data.contact.whatsappRaw, 'Salam, CULTA Media Agency. Xidmətləriniz haqqında məlumat almaq istəyirəm.')

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.55, 0.3, 0.98] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'border-b border-white/[0.07] bg-ink/75 py-2.5 backdrop-blur-xl' : 'bg-transparent py-4 md:py-5'
        }`}
      >
        <div className="container-x flex items-center justify-between gap-3">
          <a href="#hero" aria-label={t('nav.home')} className="shrink-0">
            <Logo size="sm" withAgency={false} brand={data.brand} />
          </a>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex" aria-label="Əsas naviqasiya">
            {links.map((link) => (
              <a
                key={link.id || link.href}
                href={link.href}
                className="rounded-full px-3 py-2 text-[13px] font-semibold text-muted transition-colors hover:bg-white/[0.05] hover:text-cream"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <LanguageThemeControls showLanguage={nav.showLanguage !== false} showTheme={nav.showTheme !== false} />
            {nav.showQuote !== false && (
              <a href="#paketler" className="btn-primary !px-5 !py-2.5 !text-[13px]">
                {nav.quoteLabel || t('nav.quote')}
              </a>
            )}
            {nav.showInstagram !== false && (
              <a
                href={data.contact.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={nav.instagramLabel || 'Instagram'}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-muted transition-all hover:border-violet/60 hover:text-violet"
              >
                <Icon name="instagram" className="h-4 w-4" />
              </a>
            )}
            {nav.showWhatsapp !== false && (
              <a href={wa} target="_blank" rel="noreferrer" className="btn-ghost !px-5 !py-2.5 !text-[13px]">
                <Icon name="whatsapp" className="h-4 w-4" />
                {nav.whatsappLabel || t('nav.whatsapp')}
              </a>
            )}
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t('nav.menuClose') : t('nav.menuOpen')}
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-cream lg:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-ink/95 pt-24 backdrop-blur-2xl lg:hidden"
          >
            <nav className="container-x flex flex-1 flex-col gap-1 overflow-y-auto pb-10" aria-label="Mobil naviqasiya">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <LanguageThemeControls compact showLanguage={nav.showLanguage !== false} showTheme={nav.showTheme !== false} />
                {nav.showQuote !== false && (
                  <a href="#paketler" onClick={() => setOpen(false)} className="btn-primary !px-5 !py-2.5 !text-[13px]">
                    {nav.quoteLabel || t('nav.quote')}
                  </a>
                )}
              </div>
              {links.map((link, i) => (
                <motion.a
                  key={link.id || link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.45, ease: 'easeOut' }}
                  className="border-b border-white/[0.06] py-4 font-display text-2xl font-semibold text-cream"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8 flex flex-col gap-3"
              >
                {nav.showWhatsapp !== false && (
                  <a href={wa} target="_blank" rel="noreferrer" className="btn-primary w-full">
                    <Icon name="whatsapp" className="h-4 w-4" />
                    {nav.mobileWhatsappLabel || t('nav.mobileWhatsapp')}
                  </a>
                )}
                {nav.showInstagram !== false && (
                  <a href={data.contact.instagramUrl} target="_blank" rel="noreferrer" className="btn-ghost w-full">
                    <Icon name="instagram" className="h-4 w-4" />
                    {nav.instagramLabel || t('nav.instagram')}
                  </a>
                )}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
