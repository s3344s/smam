import { Suspense, lazy, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Icon from './Icon'
import { PixelCluster } from './ui'
import { useSiteData } from '../data/SiteDataContext'
import { useIsMobile, waLink } from '../lib/utils'

const Hero3D = lazy(() => import('./Hero3D'))

const CARD_ICONS = ['strategy', 'design', 'meta', 'gem']
const CARD_POSITIONS = [
  'left-[2%] top-[16%]',
  'right-[4%] top-[28%]',
  'left-[6%] bottom-[24%]',
  'right-[10%] bottom-[12%]',
]

function FloatingCard({ label, icon, className, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.1 + delay, duration: 0.7, ease: 'easeOut' }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4.5 + delay * 2, repeat: Infinity, ease: 'easeInOut', delay }}
        className="glass-strong flex items-center gap-2.5 rounded-2xl px-4 py-3 shadow-card"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-champagne/10 text-champagne">
          <Icon name={icon} className="h-4 w-4" />
        </span>
        <span className="font-display text-sm font-semibold text-cream">{label}</span>
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const { siteData: data, t } = useSiteData()
  const { hero, contact } = data
  const isMobile = useIsMobile()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (isMobile) return undefined // no parallax source needed on touch
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [isMobile])

  const consultLink = waLink(
    contact.whatsappRaw,
    'Salam, CULTA Media Agency. Pulsuz konsultasiya almaq istəyirəm.'
  )

  const fade = (delay) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease: [0.21, 0.55, 0.3, 0.98] },
  })

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 md:pt-32">
      {/* atmosphere */}
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -top-40 left-1/2 h-[560px] w-[860px] -translate-x-1/2 rounded-full bg-violet/15 blur-[160px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 h-[420px] w-[520px] rounded-full bg-champagne/[0.07] blur-[140px]"
        aria-hidden="true"
      />

      {/* 3D scene — desktop/tablet only. Mobile gets a pure-CSS orb:
          three.js chunk is never even downloaded on phones. */}
      {isMobile ? (
        <div className="hero-orb-static" aria-hidden="true" />
      ) : (
        <div
          className="pointer-events-none absolute right-[-8%] top-0 h-full w-[58%] opacity-95"
          aria-hidden="true"
        >
          <Suspense fallback={<div className="hero-orb-fallback" />}>
            <Hero3D mouse={mouse} reduced={false} />
          </Suspense>
        </div>
      )}

      {/* floating cards over the 3D scene (desktop) */}
      {!isMobile && (
        <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[52%] lg:block" aria-hidden="true">
          {hero.floatingCards.slice(0, 4).map((label, i) => (
            <FloatingCard key={i} label={label} icon={CARD_ICONS[i % CARD_ICONS.length]} className={CARD_POSITIONS[i]} delay={i * 0.18} />
          ))}
        </div>
      )}

      <div className="container-x relative z-10">
        <div className="max-w-2xl">
          <motion.span {...fade(0.35)} className="eyebrow mb-7 inline-flex">
            <PixelCluster />
            {hero.badge}
          </motion.span>

          <motion.h1
            {...fade(0.45)}
            className="font-display text-[2.55rem] font-bold leading-[1.07] tracking-tight text-cream sm:text-6xl lg:text-[4.3rem]"
          >
            {hero.titleA}{' '}
            <span className="bg-gradient-to-r from-champagne-light via-champagne to-violet bg-clip-text text-transparent">
              {hero.titleAccent}
            </span>{' '}
            {hero.titleB}
          </motion.h1>

          <motion.p {...fade(0.6)} className="mt-7 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {hero.subtitle}
          </motion.p>

          <motion.p {...fade(0.7)} className="mt-4 font-display text-sm font-medium tracking-wide text-champagne/80">
            {hero.slogan}
          </motion.p>

          <motion.div {...fade(0.82)} className="mt-10 flex flex-col gap-3.5 sm:flex-row">
            <a href={consultLink} target="_blank" rel="noreferrer" className="btn-primary">
              {hero.ctaPrimary}
              <Icon name="arrowRight" className="h-4 w-4" />
            </a>
            <a href="#paketler" className="btn-ghost">
              {hero.ctaSecondary}
            </a>
          </motion.div>

          {/* floating cards as chips on mobile/tablet — static (no infinite loops on weak GPUs) */}
          <motion.div {...fade(0.95)} className="mt-12 grid grid-cols-2 gap-3 sm:max-w-md lg:hidden">
            {hero.floatingCards.slice(0, 4).map((label, i) => (
              <div key={i} className="glass flex items-center gap-2.5 rounded-xl px-3.5 py-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-champagne/10 text-champagne">
                  <Icon name={CARD_ICONS[i % CARD_ICONS.length]} className="h-3.5 w-3.5" />
                </span>
                <span className="font-display text-[13px] font-semibold text-cream">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* scroll hint */}
      {!isMobile && (
        <motion.a
          href="#stats"
          aria-label="Aşağı sürüşdür"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted md:flex"
        >
        <span className="text-[10px] font-display uppercase tracking-[0.4em]">{t('common.discover')}</span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-9 w-6 items-start justify-center rounded-full border border-white/20 pt-1.5"
        >
          <span className="h-1.5 w-1 rounded-full bg-champagne" />
        </motion.span>
        </motion.a>
      )}
    </section>
  )
}
