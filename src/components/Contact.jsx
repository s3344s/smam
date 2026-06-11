import { useState } from 'react'
import { useSiteData } from '../data/SiteDataContext'
import { waLink } from '../lib/utils'
import { SectionHeading, Reveal } from './ui'
import Icon from './Icon'

export default function Contact() {
  const { siteData: data, t } = useSiteData()
  const { contact, pricing } = data
  const copy = data.sectionCopy?.contact || {}

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
      form.name && `${copy.name || t('contact.name')}: ${form.name}`,
      form.phone && `${copy.phone || t('contact.phone')}: ${form.phone}`,
      form.business && `${copy.business || t('contact.business')}: ${form.business}`,
      form.pkg && `${copy.package || t('contact.package')}: ${form.pkg}`,
      form.message && `${copy.message || t('contact.message')}: ${form.message}`,
    ].filter(Boolean)
    window.open(waLink(contact.whatsappRaw, lines.join('\n')), '_blank', 'noopener,noreferrer')
  }

  const directButtons = [
    {
      label: copy.wa || t('contact.wa'),
      sub: contact.whatsappDisplay,
      icon: 'whatsapp',
      href: waLink(contact.whatsappRaw, 'Salam, CULTA Media Agency. Məlumat almaq istəyirəm.'),
      accent: 'text-[#4ade80]',
    },
    {
      label: copy.ig || t('contact.ig'),
      sub: contact.instagramHandle,
      icon: 'instagram',
      href: contact.instagramUrl,
      accent: 'text-violet',
    },
    {
      label: copy.call || t('contact.call'),
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
          eyebrow={copy.eyebrow || t('contact.eyebrow')}
          title={copy.title || t('contact.title')}
          subtitle={copy.subtitle || t('contact.subtitle')}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="glass-strong rounded-3xl border border-white/8 p-7 md:p-10">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="label-dark" htmlFor="c-name">{copy.name || t('contact.name')}</label>
                  <input
                    id="c-name"
                    className="input-dark"
                    placeholder={copy.namePh || t('contact.namePh')}
                    value={form.name}
                    onChange={set('name')}
                  />
                </div>
                <div>
                  <label className="label-dark" htmlFor="c-phone">{copy.phone || t('contact.phone')}</label>
                  <input
                    id="c-phone"
                    className="input-dark"
                    placeholder={copy.phonePh || t('contact.phonePh')}
                    value={form.phone}
                    onChange={set('phone')}
                  />
                </div>
                <div>
                  <label className="label-dark" htmlFor="c-business">{copy.business || t('contact.business')}</label>
                  <input
                    id="c-business"
                    className="input-dark"
                    placeholder={copy.businessPh || t('contact.businessPh')}
                    value={form.business}
                    onChange={set('business')}
                  />
                </div>
                <div>
                  <label className="label-dark" htmlFor="c-pkg">{copy.package || t('contact.package')}</label>
                  <select id="c-pkg" className="input-dark" value={form.pkg} onChange={set('pkg')}>
                    <option value="">{copy.select || t('contact.select')}</option>
                    {pricing.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name} — {p.price} {p.period}
                      </option>
                    ))}
                    <option value={copy.undecided || t('contact.undecided')}>{copy.undecided || t('contact.undecided')}</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="label-dark" htmlFor="c-msg">{copy.message || t('contact.message')}</label>
                  <textarea
                    id="c-msg"
                    rows={4}
                    className="input-dark resize-none"
                    placeholder={copy.messagePh || t('contact.messagePh')}
                    value={form.message}
                    onChange={set('message')}
                  />
                </div>
              </div>

              <button type="button" onClick={handleSubmit} className="btn-whatsapp mt-7 w-full justify-center">
                <Icon name="whatsapp" className="h-5 w-5" />
                {copy.send || t('contact.send')}
                <Icon name="arrowRight" className="h-4 w-4" />
              </button>
              <p className="mt-4 text-center text-xs text-muted">{copy.privacy || t('contact.privacy')}</p>
            </div>
          </Reveal>

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
                  <span className="text-xs font-semibold uppercase tracking-[0.18em]">{copy.consult || t('contact.consult')}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-cream/80">{copy.consultText || t('contact.consultText')}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
