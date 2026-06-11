import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon'
import { Logo } from './ui'
import { useSiteData } from '../data/SiteDataContext'
import { LANGUAGES } from '../data/i18n'
import { waLink } from '../lib/utils'

const NAV_LINKS = [
  { href: '#haqqimizda', key: 'nav.about' },
  { href: '#xidmetler', key: 'nav.services' },
  { href: '#paketler', key: 'nav.pricing' },
  { href: '#proses', key: 'nav.process' },
  { href: '#niye-biz', key: 'nav.why' },
  { href: '#portfolio', key: 'nav.portfolio' },
  { href: '#faq', key: 'nav.faq' },
  { href: '#elaqe', key: 'nav.contact' },
]

function LanguageThemeControls({ compact = false }) {
  const { lang, setLang, theme, toggleTheme, t } = useSiteData()
  const [open, setOpen] = useState(false)
  const active = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]

  return (
    <div className={`relative flex items-center ${compact ? 'gap-2' : 'gap-2.5'}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t('nav.language')}
        className="flex h-10 items-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-3.5 font-display text-xs font-semibold uppercase tracking-[0.12em] text-cream transition-all hover:border-champagne/45 hover:bg-white/[0.07]"
      >
        <Icon name="globe" className="h-4 w-4 text-champagne" />
        {active.short}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="glass-strong absolute right-12 top-12 z-50 w-52 overflow-hidden rounded-2xl border border-white/10 p-1.5 shadow-card"
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

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={t('nav.theme')}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.035] text-cream transition-all hover:border-champagne/45 hover:bg-white/[0.07]"
      >
        <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="h-4.5 w-4.5" />
      </button>
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

  const wa = waLink(data.contact.whatsappRaw, 'Salam, CULTA Media Agency. Xidmətləriniz haqqında məlumat almaq istəyirəm.')

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.55, 0.3, 0.98] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'border-b border-white/[0.07] bg-ink/75 py-3 backdrop-blur-xl' : 'bg-transparent py-5'
        }`}
      >
        <div className="container-x flex items-center justify-between gap-4">
          <a href="#hero" aria-label={t('nav.home')} className="shrink-0">
            <Logo size="sm" withAgency={false} />
          </a>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Əsas naviqasiya">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-[13px] font-medium text-muted transition-colors hover:bg-white/[0.05] hover:text-cream"
              >
                {t(link.key)}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <LanguageThemeControls />
            <a href="#paketler" className="btn-primary !px-5 !py-2.5 !text-[13px]">
              {t('nav.quote')}
            </a>
            <a
              href={data.contact.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-muted transition-all hover:border-violet/60 hover:text-violet"
            >
              <Icon name="instagram" className="h-[18px] w-[18px]" />
            </a>
            <a href={wa} target="_blank" rel="noreferrer" className="btn-ghost !px-5 !py-2.5 !text-[13px]">
              <Icon name="whatsapp" className="h-4 w-4" />
              {t('nav.whatsapp')}
            </a>
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
            className="fixed inset-0 z-40 flex flex-col bg-ink/95 pt-28 backdrop-blur-2xl lg:hidden"
          >
            <nav className="container-x flex flex-1 flex-col gap-1 overflow-y-auto pb-10" aria-label="Mobil naviqasiya">
              <div className="mb-5 flex items-center justify-between">
                <LanguageThemeControls compact />
                <a href="#paketler" onClick={() => setOpen(false)} className="btn-primary !px-5 !py-2.5 !text-[13px]">
                  {t('nav.quote')}
                </a>
              </div>
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.45, ease: 'easeOut' }}
                  className="border-b border-white/[0.06] py-4 font-display text-2xl font-semibold text-cream"
                >
                  {t(link.key)}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8 flex flex-col gap-3"
              >
                <a href={wa} target="_blank" rel="noreferrer" className="btn-primary w-full">
                  <Icon name="whatsapp" className="h-4 w-4" />
                  {t('nav.mobileWhatsapp')}
                </a>
                <a href={data.contact.instagramUrl} target="_blank" rel="noreferrer" className="btn-ghost w-full">
                  <Icon name="instagram" className="h-4 w-4" />
                  {t('nav.instagram')}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
