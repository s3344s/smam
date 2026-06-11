import { useRef } from 'react'
import Icon from './Icon'
import { Reveal, SectionHeading } from './ui'
import { useSiteData } from '../data/SiteDataContext'

const ACCENTS = {
  champagne: {
    glow: 'from-champagne/25',
    chip: 'border-champagne/30 bg-champagne/10 text-champagne',
    ring: 'group-hover:border-champagne/40',
  },
  violet: {
    glow: 'from-violet/25',
    chip: 'border-violet/30 bg-violet/10 text-violet',
    ring: 'group-hover:border-violet/40',
  },
  electric: {
    glow: 'from-electric/25',
    chip: 'border-electric/30 bg-electric/10 text-electric',
    ring: 'group-hover:border-electric/40',
  },
}

export default function Portfolio() {
  const { siteData: data, t } = useSiteData()
  const trackRef = useRef(null)

  const scrollBy = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 400, behavior: 'smooth' })
  }

  return (
    <section id="portfolio" className="section-pad relative overflow-hidden">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow={t('portfolio.eyebrow')}
            title={t('portfolio.title')}
            subtitle={t('portfolio.subtitle')}
          />
          <Reveal delay={0.2} className="hidden gap-2.5 md:flex">
            <button
              onClick={() => scrollBy(-1)}
              aria-label={t('portfolio.prev')}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-cream transition-all hover:border-champagne/50 hover:bg-white/[0.05]"
            >
              <Icon name="arrowRight" className="h-5 w-5 rotate-180" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label={t('portfolio.next')}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-cream transition-all hover:border-champagne/50 hover:bg-white/[0.05]"
            >
              <Icon name="arrowRight" className="h-5 w-5" />
            </button>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.15}>
        <div
          ref={trackRef}
          className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 sm:px-8 lg:px-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]"
        >
          {data.portfolio.map((item, i) => {
            const accent = ACCENTS[item.accent] || ACCENTS.champagne
            return (
              <article
                key={i}
                className={`group relative flex w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-white/10 bg-panel transition-all duration-500 hover:-translate-y-2 sm:w-[360px] ${accent.ring}`}
              >
                {/* visual area */}
                <div className="relative h-44 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${accent.glow} via-transparent to-transparent opacity-70 transition-transform duration-700 group-hover:scale-110`} />
                  <div className="grid-bg absolute inset-0 opacity-60" />
                  <span className="absolute left-6 top-6 font-display text-[64px] font-bold leading-none text-white/[0.06] transition-colors duration-500 group-hover:text-white/10">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={`absolute bottom-5 left-6 inline-flex items-center rounded-full border px-3.5 py-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.14em] ${accent.chip}`}>
                    {item.type}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div>
                    <span className="label-dark !mb-1">{t('portfolio.goal')}</span>
                    <p className="text-sm leading-relaxed text-cream/90">{item.goal}</p>
                  </div>
                  <div>
                    <span className="label-dark !mb-1">{t('portfolio.service')}</span>
                    <p className="text-sm text-muted">{item.service}</p>
                  </div>
                  <div className="mt-auto flex items-center gap-2.5 border-t border-white/[0.07] pt-4">
                    <Icon name="growth" className="h-4 w-4 text-champagne" />
                    <span className="font-display text-sm font-semibold text-champagne">{item.result}</span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}
