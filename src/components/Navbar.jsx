import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon'
import { Logo } from './ui'
import { useSiteData } from '../data/SiteDataContext'
import { waLink } from '../lib/utils'

const NAV_LINKS = [
  { href: '#haqqimizda', label: 'Haqqımızda' },
  { href: '#xidmetler', label: 'Xidmətlər' },
  { href: '#paketler', label: 'Paketlər' },
  { href: '#proses', label: 'Proses' },
  { href: '#niye-biz', label: 'Niyə biz?' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#faq', label: 'FAQ' },
  { href: '#elaqe', label: 'Əlaqə' },
]

export default function Navbar() {
  const { data } = useSiteData()
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
          <a href="#hero" aria-label="CULTA — ana səhifə" className="shrink-0">
            <Logo size="sm" withAgency={false} />
          </a>

          {/* desktop nav */}
          <nav className="hidden items-center gap-1 xl:flex" aria-label="Əsas naviqasiya">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-[13px] font-medium text-muted transition-colors hover:bg-white/[0.05] hover:text-cream"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* desktop actions */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <a
              href={data.contact.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-muted transition-all hover:border-violet/60 hover:text-violet"
            >
              <Icon name="instagram" className="h-[18px] w-[18px]" />
            </a>
            <a href={wa} target="_blank" rel="noreferrer" className="btn-primary !px-5 !py-2.5 !text-[13px]">
              <Icon name="whatsapp" className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          {/* mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Menyunu bağla' : 'Menyunu aç'}
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-cream lg:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
          </button>
        </div>
      </motion.header>

      {/* mobile menu */}
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
                  {link.label}
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
                  WhatsApp-a yaz
                </a>
                <a href={data.contact.instagramUrl} target="_blank" rel="noreferrer" className="btn-ghost w-full">
                  <Icon name="instagram" className="h-4 w-4" />
                  Instagram
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
