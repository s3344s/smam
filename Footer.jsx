import { useState } from 'react'
import { useSiteData } from '../data/SiteDataContext'
import { waLink } from '../lib/utils'
import { SectionHeading, Reveal } from './ui'
import Icon from './Icon'

export default function Contact() {
  const { data } = useSiteData()
  const { contact, pricing } = data

  const [form, setForm] = useState({
    name: '',
    phone: '',
    business: '',
    pkg: '',
    message: '',
  })

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = () => {
    const lines = [
      'Salam, CULTA Media Agency!',
      '',
      form.name && `Ad: ${form.name}`,
      form.phone && `Telefon: ${form.phone}`,
      form.business && `Biznes sahəsi: ${form.business}`,
      form.pkg && `Maraqlandığım paket: ${form.pkg}`,
      form.message && `Mesaj: ${form.message}`,
    ].filter(Boolean)
    window.open(waLink(contact.whatsappRaw, lines.join('\n')), '_blank', 'noopener,noreferrer')
  }

  const directButtons = [
    {
      label: 'WhatsApp-a yaz',
      sub: contact.whatsappDisplay,
      icon: 'whatsapp',
      href: waLink(contact.whatsappRaw, 'Salam, CULTA Media Agency. Məlumat almaq istəyirəm.'),
      accent: 'text-[#4ade80]',
    },
    {
      label: 'Instagram-a keç',
      sub: contact.instagramHandle,
      icon: 'instagram',
      href: contact.instagramUrl,
      accent: 'text-violet',
    },
    {
      label: 'Zəng et',
      sub: contact.phoneDisplay,
      icon: 'phone',
      href: `tel:${contact.phoneRaw}`,
      accent: 'text-electric',
    },
  ]

  return (
    <section id="elaqe" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[440px] bg-gradient-to-t from-champagne/[0.05] to-transparent" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Əlaqə"
          title="Layihənizi danışaq"
          subtitle="Formu doldurun — mesajınız birbaşa WhatsApp-a yönləndirilsin. Cavab adətən bir neçə saat ərzində verilir."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <div className="glass-strong rounded-3xl border border-white/8 p-7 md:p-10">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="label-dark" htmlFor="c-name">Ad</label>
                  <input
                    id="c-name"
                    className="input-dark"
                    placeholder="Adınız"
                    value={form.name}
                    onChange={set('name')}
                  />
                </div>
                <div>
                  <label className="label-dark" htmlFor="c-phone">Telefon</label>
                  <input
                    id="c-phone"
                    className="input-dark"
                    placeholder="0XX-XXX-XX-XX"
                    value={form.phone}
                    onChange={set('phone')}
                  />
                </div>
                <div>
                  <label className="label-dark" htmlFor="c-business">Biznes sahəsi</label>
                  <input
                    id="c-business"
                    className="input-dark"
                    placeholder="Məsələn: restoran, klinika, e-commerce…"
                    value={form.business}
                    onChange={set('business')}
                  />
                </div>
                <div>
                  <label className="label-dark" htmlFor="c-pkg">Maraqlandığınız paket</label>
                  <select id="c-pkg" className="input-dark" value={form.pkg} onChange={set('pkg')}>
                    <option value="">Seçin…</option>
                    {pricing.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name} — {p.price} {p.period}
                      </option>
                    ))}
                    <option value="Hələ qərar verməmişəm">Hələ qərar verməmişəm</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="label-dark" htmlFor="c-msg">Mesaj</label>
                  <textarea
                    id="c-msg"
                    rows={4}
                    className="input-dark resize-none"
                    placeholder="Layihəniz, hədəfiniz və ya sualınız haqqında qısa yazın…"
                    value={form.message}
                    onChange={set('message')}
                  />
                </div>
              </div>

              <button type="button" onClick={handleSubmit} className="btn-whatsapp mt-7 w-full justify-center">
                <Icon name="whatsapp" className="h-5 w-5" />
                WhatsApp ilə göndər
                <Icon name="arrowRight" className="h-4 w-4" />
              </button>
              <p className="mt-4 text-center text-xs text-muted">
                Göndər düyməsi WhatsApp tətbiqini hazır mesajla açır — heç bir məlumat serverə göndərilmir.
              </p>
            </div>
          </Reveal>

          {/* Direct contact */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            {directButtons.map((b, i) => (
              <Reveal key={b.label} delay={0.08 + i * 0.08}>
                <a
                  href={b.href}
                  target={b.href.startsWith('tel:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="glass group flex items-center gap-5 rounded-3xl border border-white/8 p-6 transition-colors duration-300 hover:border-white/20"
                >
                  <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-3.5 transition-transform duration-300 group-hover:scale-105">
                    <Icon name={b.icon} className={`h-6 w-6 ${b.accent}`} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-base font-medium text-cream">{b.label}</span>
                    <span className="block truncate text-sm text-muted">{b.sub}</span>
                  </span>
                  <Icon
                    name="arrowUpRight"
                    className="ml-auto h-5 w-5 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cream"
                  />
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.32}>
              <div className="glass rounded-3xl border border-champagne/20 bg-gradient-to-br from-champagne/[0.07] to-transparent p-6">
                <div className="flex items-center gap-2 text-champagne">
                  <Icon name="spark" className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em]">Pulsuz konsultasiya</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-cream/80">
                  İlk görüş ödənişsizdir. Biznesinizi dinləyir, mövcud vəziyyəti analiz edir və sizə uyğun
                  yanaşmanı təqdim edirik — heç bir öhdəlik olmadan.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
