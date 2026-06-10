import Icon from './Icon'
import { Reveal, SectionHeading, TiltCard } from './ui'
import { useSiteData } from '../data/SiteDataContext'

export default function About() {
  const { data } = useSiteData()
  const { about } = data

  return (
    <section id="haqqimizda" className="section-pad relative overflow-hidden">
      <div
        className="absolute -left-44 top-1/3 h-[420px] w-[420px] rounded-full bg-violet/10 blur-[150px]"
        aria-hidden="true"
      />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading align="left" eyebrow="Haqqımızda" title={about.title} />
          <Reveal delay={0.2}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
              <span className="text-cream">{about.text.split('.')[0]}.</span>{' '}
              {about.text.split('.').slice(1).join('.').trim()}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-9 flex items-center gap-4">
              <span className="h-px w-14 bg-gradient-to-r from-champagne to-transparent" />
              <span className="font-display text-xs font-medium uppercase tracking-[0.35em] text-champagne/80">
                Sistemli yanaşma
              </span>
            </div>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {about.cards.map((card, i) => (
            <Reveal key={i} delay={0.1 + i * 0.08}>
              <TiltCard className="glass h-full rounded-2xl p-6">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-champagne/20 bg-champagne/[0.07] text-champagne">
                  <Icon name={card.icon} className="h-6 w-6" />
                </span>
                <h3 className="font-display text-lg font-semibold text-cream">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{card.desc}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
