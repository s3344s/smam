import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useSiteData } from '../data/SiteDataContext'
import { DEFAULT_DATA } from '../data/defaultData'
import { Logo } from '../components/ui'
import Icon from '../components/Icon'
import {
  BrandEditor,
  NavigationEditor,
  SectionCopyEditor,
  HeroEditor,
  StatsEditor,
  AboutEditor,
  ServicesEditor,
  PricingEditor,
  WhyUsEditor,
  PortfolioEditor,
  ProcessEditor,
  IndustriesEditor,
  TestimonialsEditor,
  FaqEditor,
  ContactEditor,
  FooterEditor,
} from './editors'

const TABS = [
  { id: 'brand', label: 'Logo', icon: 'gem' },
  { id: 'navigation', label: 'Header menyu', icon: 'layers' },
  { id: 'sectionCopy', label: 'Başlıqlar', icon: 'copy' },
  { id: 'hero', label: 'Hero', icon: 'spark' },
  { id: 'stats', label: 'Statistika', icon: 'growth' },
  { id: 'about', label: 'Haqqımızda', icon: 'team' },
  { id: 'services', label: 'Xidmətlər', icon: 'layers' },
  { id: 'pricing', label: 'Paketlər', icon: 'gem' },
  { id: 'whyUs', label: 'Niyə biz', icon: 'system' },
  { id: 'portfolio', label: 'Portfolio', icon: 'report' },
  { id: 'process', label: 'Proses', icon: 'radar' },
  { id: 'industries', label: 'Sahələr', icon: 'target' },
  { id: 'testimonials', label: 'Rəylər', icon: 'star' },
  { id: 'faq', label: 'FAQ', icon: 'idea' },
  { id: 'contact', label: 'Əlaqə', icon: 'phone' },
  { id: 'footer', label: 'Footer', icon: 'web' },
]

const EDITABLE_KEYS = TABS.map((t) => t.id)

function pickEditable(data) {
  return structuredClone(
    Object.fromEntries(EDITABLE_KEYS.map((key) => [key, data[key]]))
  )
}

export default function Dashboard({ onLogout }) {
  const { data, updateSection, resetAll } = useSiteData()
  const [draft, setDraft] = useState(() => pickEditable(data))
  const [active, setActive] = useState('hero')
  const [toast, setToast] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const dirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(pickEditable(data)),
    [draft, data]
  )

  const showToast = (text) => {
    setToast(text)
    setTimeout(() => setToast(null), 2400)
  }

  const save = () => {
    EDITABLE_KEYS.forEach((key) => updateSection(key, structuredClone(draft[key])))
    showToast('Dəyişikliklər yadda saxlanıldı')
  }

  const reset = () => {
    const ok = window.confirm('Bütün məzmun ilkin vəziyyətə qaytarılsın? Bu əməliyyat geri alına bilməz.')
    if (!ok) return
    resetAll()
    setDraft(pickEditable(DEFAULT_DATA))
    showToast('Məzmun ilkin vəziyyətə qaytarıldı')
  }

  const setSection = (key) => (value) => setDraft((d) => ({ ...d, [key]: value }))

  const editors = {
    brand: <BrandEditor value={draft.brand} onChange={setSection('brand')} />,
    navigation: <NavigationEditor value={draft.navigation} onChange={setSection('navigation')} />,
    sectionCopy: <SectionCopyEditor value={draft.sectionCopy} onChange={setSection('sectionCopy')} />,
    hero: <HeroEditor value={draft.hero} onChange={setSection('hero')} />,
    stats: <StatsEditor value={draft.stats} onChange={setSection('stats')} />,
    about: <AboutEditor value={draft.about} onChange={setSection('about')} />,
    services: <ServicesEditor value={draft.services} onChange={setSection('services')} />,
    pricing: <PricingEditor value={draft.pricing} onChange={setSection('pricing')} />,
    whyUs: <WhyUsEditor value={draft.whyUs} onChange={setSection('whyUs')} />,
    portfolio: <PortfolioEditor value={draft.portfolio} onChange={setSection('portfolio')} />,
    process: <ProcessEditor value={draft.process} onChange={setSection('process')} />,
    industries: <IndustriesEditor value={draft.industries} onChange={setSection('industries')} />,
    testimonials: <TestimonialsEditor value={draft.testimonials} onChange={setSection('testimonials')} />,
    faq: <FaqEditor value={draft.faq} onChange={setSection('faq')} />,
    contact: <ContactEditor value={draft.contact} onChange={setSection('contact')} />,
    footer: <FooterEditor value={draft.footer} onChange={setSection('footer')} />,
  }

  const TabList = ({ onPick }) => (
    <nav className="space-y-1">
      {TABS.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => {
            setActive(t.id)
            onPick?.()
          }}
          className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors ${
            active === t.id
              ? 'bg-champagne/12 text-champagne'
              : 'text-muted hover:bg-white/5 hover:text-cream'
          }`}
        >
          <Icon name={t.icon} className="h-4.5 w-4.5" />
          {t.label}
        </button>
      ))}
    </nav>
  )

  return (
    <div className="noise relative min-h-screen bg-ink text-cream">
      <div className="grid-bg pointer-events-none fixed inset-0 opacity-30" />

      {/* Top bar */}
      <header className="glass-strong sticky top-0 z-40 border-b border-white/8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3.5 md:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-muted lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menyu"
            >
              <Icon name={menuOpen ? 'close' : 'menu'} className="h-4.5 w-4.5" />
            </button>
            <Logo size="sm" withAgency={false} brand={data.brand} />
            <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted sm:block">
              İdarəetmə paneli
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {dirty && (
              <span className="hidden items-center gap-1.5 text-xs text-champagne/90 md:flex">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-champagne" />
                Yadda saxlanmamış dəyişiklik
              </span>
            )}
            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-2 rounded-xl border border-white/10 px-3.5 py-2 text-sm text-cream/80 transition-colors hover:border-white/25"
            >
              <Icon name="eye" className="h-4 w-4" />
              <span className="hidden sm:inline">Sayta bax</span>
            </Link>
            <button type="button" onClick={save} className="btn-primary !px-4 !py-2 text-sm">
              <Icon name="save" className="h-4 w-4" />
              <span className="hidden sm:inline">Yadda saxla</span>
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="flex items-center gap-2 rounded-xl border border-white/10 px-3.5 py-2 text-sm text-muted transition-colors hover:border-red-400/40 hover:text-red-400"
            >
              <Icon name="logout" className="h-4 w-4" />
              <span className="hidden sm:inline">Çıxış</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile tab drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass-strong sticky top-[61px] z-30 border-b border-white/8 p-4 lg:hidden"
          >
            <TabList onPick={() => setMenuOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative mx-auto flex max-w-7xl gap-8 px-5 py-8 md:px-8">
        {/* Sidebar */}
        <aside className="sticky top-24 hidden max-h-[calc(100vh-7rem)] w-60 shrink-0 overflow-y-auto pr-1 lg:block">
          <TabList />
          <div className="mt-8 border-t border-white/8 pt-6">
            <button
              type="button"
              onClick={reset}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-muted transition-colors hover:bg-red-400/10 hover:text-red-400"
            >
              <Icon name="trash" className="h-4.5 w-4.5" />
              İlkin vəziyyətə qaytar
            </button>
            <p className="mt-3 px-4 text-xs leading-relaxed text-muted/70">
              Məlumatlar bu brauzerin yaddaşında (localStorage) saxlanılır.
            </p>
          </div>
        </aside>

        {/* Editor */}
        <main className="min-w-0 flex-1 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {editors[active]}
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-white/8 pt-6">
            <button type="button" onClick={save} className="btn-primary">
              <Icon name="save" className="h-4 w-4" />
              Yadda saxla
            </button>
            <button
              type="button"
              onClick={reset}
              className="flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm text-muted transition-colors hover:border-red-400/40 hover:text-red-400 lg:hidden"
            >
              <Icon name="trash" className="h-4 w-4" />
              İlkin vəziyyətə qaytar
            </button>
          </div>
        </main>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            className="glass-strong fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 rounded-2xl border border-champagne/30 px-5 py-3.5 text-sm text-cream shadow-glow"
          >
            <Icon name="check" className="h-4.5 w-4.5 text-champagne" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
