import { motion } from 'framer-motion'
import Icon from './Icon'
import { Reveal, SectionHeading } from './ui'
import { useSiteData } from '../data/SiteDataContext'
import { useIsMobile, waLink } from '../lib/utils'

export default function Pricing() {
  const { data } = useSiteData()
  const isMobile = useIsMobile()

  return (
    <section id="paketler" className="section-pad relative overflow-hidden">
      {/* animated aurora behind the cards — static on mobile */}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-24 h-[520px] w-[820px] -translate-x-1/2 rounded-full blur-[170px]"
        style={{
          background:
            'radial-gradient(circle at 30% 40%, rgba(216,197,160,0.13), transparent 55%), radial-gradient(circle at 70% 60%, rgba(139,124,246,0.16), transparent 55%)',
        }}
        animate={isMobile ? undefined : { rotate: [0, 14, -8, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Paketlər"
          title="Biznesinizə uyğun paketi seçin"
          subtitle="Hər paket sistemli kontent, peşəkar dizayn və ölçülə bilən nəticə üzərində qurulub. Qiymətlər fərdi ehtiyaclara uyğun tənzimlənə bilər."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {data.pricing.map((pkg, i) => {
            const message = `Salam, CULTA Media Agency. ${pkg.name} paketi haqqında məlumat almaq istəyirəm.`
            return (
              <Reveal key={pkg.id || i} delay={i * 0.09} y={36}>
                <div
                  className={`relative flex h-full flex-col rounded-3xl p-7 transition-all duration-500 hover:-translate-y-2 ${
                    pkg.highlighted
                      ? 'border border-champagne/40 bg-gradient-to-b from-champagne/[0.1] via-white/[0.04] to-white/[0.02] shadow-glow'
                      : 'glass hover:border-white/25'
                  }`}
                >
                  {pkg.highlighted && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-champagne/50 bg-ink px-4 py-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-champagne shadow-glow">
                      Ən çox seçilən
                    </span>
                  )}

                  <span className="font-display text-xs font-medium uppercase tracking-[0.3em] text-muted">
                    Paket {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-cream">{pkg.name}</h3>

                  <div className="mt-5 flex items-baseline gap-2">
                    <span
                      className={`font-display font-bold tracking-tight ${
                        pkg.price.length > 9 ? 'text-2xl' : 'text-[2.1rem]'
                      } ${pkg.highlighted ? 'text-champagne' : 'text-cream'}`}
                    >
                      {pkg.price}
                    </span>
                    {pkg.period && <span className="text-sm text-muted">/ {pkg.period}</span>}
                  </div>

                  <p className="mt-3 min-h-[40px] text-[13px] leading-relaxed text-muted">{pkg.tagline}</p>

                  <div className="my-6 h-px bg-gradient-to-r from-white/15 via-white/5 to-transparent" />

                  <ul className="flex flex-1 flex-col gap-3">
                    {pkg.features.map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-2.5 text-sm text-cream/85">
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            pkg.highlighted ? 'bg-champagne/15 text-champagne' : 'bg-white/[0.06] text-champagne/80'
                          }`}
                        >
                          <Icon name="check" className="h-3 w-3" strokeWidth={2} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={waLink(data.contact.whatsappRaw, message)}
                    target="_blank"
                    rel="noreferrer"
                    className={`${pkg.highlighted ? 'btn-primary' : 'btn-ghost'} mt-8 w-full !text-[13px]`}
                  >
                    Bu paketi seç
                    <Icon name="whatsapp" className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-sm text-muted">
            Reklam büdcəsi paket qiymətinə daxil deyil və hədəflərə uyğun ayrıca planlanır.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
