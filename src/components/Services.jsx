import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon'
import { Reveal, SectionHeading, TiltCard } from './ui'
import { useSiteData } from '../data/SiteDataContext'

function ServiceCard({ service, i }) {
  return (
    <Reveal delay={(i % 4) * 0.07} y={24}>
      <TiltCard className="group glass h-full rounded-2xl p-6">
        <div className="mb-5 flex items-center justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-champagne transition-colors duration-300 group-hover:border-champagne/40 group-hover:bg-champagne/10">
            <Icon name={service.icon} className="h-5 w-5" />
          </span>
          <span className="font-display text-[11px] font-medium tracking-[0.2em] text-white/20 transition-colors group-hover:text-champagne/50">
            {String(i + 1).padStart(2, '0')}
          </span>
        </div>
        <h3 className="font-display text-[15px] font-semibold leading-snug text-cream">{service.title}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-muted">{service.desc}</p>
      </TiltCard>
    </Reveal>
  )
}

export default function Services() {
  const { siteData: data, t } = useSiteData()
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? data.services : data.services.slice(0, 4)
  const hiddenCount = Math.max(data.services.length - 4, 0)

  return (
    <section id="xidmetler" className="section-pad relative overflow-hidden bg-panel/40">
      <div
        className="absolute right-[-180px] top-0 h-[480px] w-[480px] rounded-full bg-electric/[0.08] blur-[160px]"
        aria-hidden="true"
      />
      <div className="container-x relative">
        <SectionHeading
          eyebrow={t('services.eyebrow')}
          title={t('services.title')}
          subtitle={t('services.subtitle')}
        />

        <motion.div layout className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence initial={false}>
            {visible.map((service, i) => (
              <motion.div
                key={`${service.title}-${i}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.32, delay: expanded && i >= 4 ? (i % 4) * 0.04 : 0 }}
              >
                <ServiceCard service={service} i={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {hiddenCount > 0 && (
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col items-center gap-3">
              {!expanded && (
                <span className="text-sm text-muted">
                  +{hiddenCount} {t('services.hiddenText')}
                </span>
              )}
              <button type="button" onClick={() => setExpanded((v) => !v)} className="btn-ghost min-w-[220px]">
                {expanded ? t('services.lessButton') : t('services.moreButton')}
                <Icon name={expanded ? 'minus' : 'plus'} className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
