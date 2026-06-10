import Icon from './Icon'
import { Reveal, SectionHeading, TiltCard } from './ui'
import { useSiteData } from '../data/SiteDataContext'

export default function Services() {
  const { data } = useSiteData()

  return (
    <section id="xidmetler" className="section-pad relative overflow-hidden bg-panel/40">
      <div
        className="absolute right-[-180px] top-0 h-[480px] w-[480px] rounded-full bg-electric/[0.08] blur-[160px]"
        aria-hidden="true"
      />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Xidmətlər"
          title="Brendinizi böyüdən tam xidmət sistemi"
          subtitle="Strategiyadan dizayna, reklamdan analitikaya — sosial media üçün lazım olan hər şey bir komandada."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.services.map((service, i) => (
            <Reveal key={i} delay={(i % 4) * 0.07} y={24}>
              <TiltCard className="group glass h-full rounded-2xl p-6">
                <div className="mb-5 flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-champagne transition-colors duration-300 group-hover:border-champagne/40 group-hover:bg-champagne/10">
                    <Icon name={service.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-display text-[11px] font-medium tracking-[0.2em] text-white/15 transition-colors group-hover:text-champagne/50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display text-[15px] font-semibold leading-snug text-cream">{service.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{service.desc}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
