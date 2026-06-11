import { useSiteData } from '../data/SiteDataContext'
import { Reveal } from './ui'
import Icon from './Icon'

function initials(name, fallback) {
  if (!name) return fallback
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
}

export default function Testimonials() {
  const { siteData: data, t } = useSiteData()

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-violet/8 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <span className="font-display text-[11px] font-bold uppercase tracking-[0.35em] text-muted">
              {t('testimonials.eyebrow')}
            </span>
            <h2 className="mt-6 font-display text-5xl font-black leading-[0.95] tracking-tight text-cream sm:text-6xl md:text-7xl">
              {t('testimonials.title')}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">{t('testimonials.subtitle')}</p>
          </div>
        </Reveal>

        <div className="mt-20 grid border-y border-white/8 md:grid-cols-3">
          {data.testimonials.map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <article className={`group flex h-full flex-col p-8 md:min-h-[330px] md:p-10 ${i > 0 ? 'border-t border-white/8 md:border-l md:border-t-0' : ''}`}>
                <div className="flex gap-1.5 text-champagne">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Icon key={idx} name="star" className="h-4 w-4 fill-current" strokeWidth={1.2} />
                  ))}
                </div>
                <p className="mt-8 flex-1 text-lg leading-relaxed text-cream/82">“{item.quote}”</p>
                <div className="mt-10 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/18 bg-white/[0.035] font-display text-sm font-bold text-cream transition group-hover:border-champagne/40 group-hover:text-champagne">
                    {initials(item.name, `M${i + 1}`)}
                  </div>
                  <div>
                    <div className="font-display text-base font-bold text-cream">{item.name || item.role}</div>
                    <div className="text-sm text-muted">{item.role}</div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
