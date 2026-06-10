import { useSiteData } from '../data/SiteDataContext'
import { SectionHeading, Reveal, TiltCard } from './ui'
import Icon from './Icon'

const ACCENTS = ['text-champagne', 'text-violet', 'text-electric']

export default function Testimonials() {
  const { data } = useSiteData()

  return (
    <section className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-violet/8 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Rəylər"
          title="Müştərilərimiz nə deyir?"
          subtitle="Bizimlə işləyən bizneslərin ən çox qeyd etdiyi dəyişikliklər."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {data.testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <TiltCard className="glass group relative h-full rounded-3xl border border-white/8 p-8" max={6}>
                <span
                  aria-hidden="true"
                  className={`font-display text-6xl leading-none ${ACCENTS[i % ACCENTS.length]} opacity-40 transition-opacity duration-300 group-hover:opacity-70`}
                >
                  &ldquo;
                </span>
                <p className="mt-3 text-lg leading-relaxed text-cream/90">{t.quote}</p>
                <div className="mt-8 flex items-center gap-3 border-t border-white/8 pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <Icon name="person" className={`h-4.5 w-4.5 ${ACCENTS[i % ACCENTS.length]}`} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-cream">{t.role}</div>
                    <div className="text-xs text-muted">CULTA müştərisi</div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
