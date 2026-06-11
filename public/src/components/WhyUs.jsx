import Icon from './Icon'
import { Reveal, SectionHeading, TiltCard } from './ui'
import { useSiteData } from '../data/SiteDataContext'

export default function WhyUs() {
  const { siteData: data, t } = useSiteData()
  const { whyUs } = data
  const copy = data.sectionCopy?.why || {}

  return (
    <section id="niye-biz" className="section-pad relative overflow-hidden bg-panel/40">
      <div
        className="absolute left-[-160px] bottom-0 h-[460px] w-[460px] rounded-full bg-champagne/[0.06] blur-[150px]"
        aria-hidden="true"
      />
      <div className="container-x relative">
        <SectionHeading
          eyebrow={copy.eyebrow || t('why.eyebrow')}
          title={copy.title || t('why.title')}
          subtitle={copy.subtitle || t('why.subtitle')}
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.cards.map((card, i) => (
            <Reveal key={i} delay={(i % 3) * 0.09}>
              <TiltCard className="glass h-full rounded-2xl p-7">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-violet/25 bg-violet/[0.08] text-violet">
                  <Icon name={card.icon} className="h-5 w-5" />
                </span>
                <h3 className="font-display text-base font-semibold leading-snug text-cream">{card.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{card.desc}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* comparison block */}
        <Reveal delay={0.15}>
          <div className="mt-20 overflow-hidden rounded-3xl border border-white/10">
            <div className="grid md:grid-cols-2">
              {/* ordinary SMM */}
              <div className="relative bg-white/[0.02] p-8 md:p-12">
                <span className="font-display text-xs font-medium uppercase tracking-[0.3em] text-muted/70">
                  {whyUs.comparison.ordinaryTitle}
                </span>
                <ul className="mt-7 flex flex-col gap-4">
                  {whyUs.comparison.ordinary.map((item, i) => (
                    <li key={i} className="flex items-center gap-3.5 text-muted/80">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-muted/50">
                        <Icon name="x" className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-[15px] line-through decoration-white/20">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CULTA approach */}
              <div className="relative border-t border-white/10 bg-gradient-to-br from-champagne/[0.09] via-violet/[0.05] to-transparent p-8 md:border-l md:border-t-0 md:p-12">
                <div
                  className="absolute right-0 top-0 h-44 w-44 rounded-full bg-champagne/15 blur-[90px]"
                  aria-hidden="true"
                />
                <span className="relative inline-flex items-center gap-2.5 font-display text-xs font-semibold uppercase tracking-[0.3em] text-champagne">
                  {whyUs.comparison.cultaTitle}
                </span>
                <ul className="relative mt-7 flex flex-col gap-4">
                  {whyUs.comparison.culta.map((item, i) => (
                    <li key={i} className="flex items-center gap-3.5 text-cream">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-champagne/40 bg-champagne/10 text-champagne">
                        <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2} />
                      </span>
                      <span className="font-display text-[15px] font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
