import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Reveal, SectionHeading } from './ui'
import { useSiteData } from '../data/SiteDataContext'

export default function Process() {
  const { siteData: data, t } = useSiteData()
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.78', 'end 0.55'],
  })
  const lineScale = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.6 })

  return (
    <section id="proses" className="section-pad relative overflow-hidden bg-panel/40">
      <div
        className="absolute right-[-140px] top-1/4 h-[420px] w-[420px] rounded-full bg-violet/[0.09] blur-[150px]"
        aria-hidden="true"
      />
      <div className="container-x relative">
        <SectionHeading
          eyebrow={t('process.eyebrow')}
          title={t('process.title')}
          subtitle={t('process.subtitle')}
        />

        <div ref={ref} className="relative mx-auto mt-20 max-w-4xl">
          {/* base line + glowing animated line */}
          <div className="absolute left-[22px] top-0 h-full w-px bg-white/10 md:left-1/2" aria-hidden="true" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: lineScale }}
            className="absolute left-[22px] top-0 h-full w-px origin-top bg-gradient-to-b from-champagne via-violet to-electric shadow-[0_0_18px_rgba(216,197,160,0.6)] md:left-1/2"
          />

          <div className="flex flex-col gap-12 md:gap-16">
            {data.process.map((step, i) => {
              const left = i % 2 === 0
              return (
                <Reveal key={i} delay={0.05} y={36}>
                  <div className={`relative flex items-start gap-7 md:gap-0 ${left ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* node */}
                    <div className="relative z-10 mt-1 flex shrink-0 items-center justify-center md:absolute md:left-1/2 md:-translate-x-1/2">
                      <span className="absolute h-11 w-11 rounded-full bg-champagne/20 blur-md" aria-hidden="true" />
                      <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-champagne/50 bg-ink font-display text-sm font-bold text-champagne shadow-glow">
                        {i + 1}
                      </span>
                    </div>

                    {/* card */}
                    <div className={`flex-1 md:w-[calc(50%-3.5rem)] md:flex-none ${left ? 'md:mr-auto md:pr-0 md:text-right' : 'md:ml-auto'}`}>
                      <div className="glass inline-block w-full rounded-2xl p-6 transition-all duration-500 hover:border-champagne/30 hover:bg-white/[0.06] md:p-7">
                        <span className="font-display text-[11px] font-medium uppercase tracking-[0.3em] text-champagne/70">
                          {t('common.step')} {String(i + 1).padStart(2, '0')}
                        </span>
                        <h3 className="mt-2 font-display text-xl font-semibold text-cream">{step.title}</h3>
                        <p className="mt-2.5 text-sm leading-relaxed text-muted">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
