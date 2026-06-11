import { useSiteData } from '../data/SiteDataContext'
import { waLink } from '../lib/utils'
import { Logo } from './ui'
import Icon from './Icon'

export default function Footer() {
  const { siteData: data, t } = useSiteData()
  const { contact, footer } = data
  const nav = data.navigation || {}
  const copy = data.sectionCopy?.footer || {}
  const menu = (nav.items || []).filter((item) => item.visible !== false)
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo size="md" brand={data.brand} />
            <p className="mt-5 max-w-sm leading-relaxed text-muted">{footer.tagline}</p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition-colors hover:border-violet/50 hover:text-violet"
              >
                <Icon name="instagram" className="h-4.5 w-4.5" />
              </a>
              <a
                href={waLink(contact.whatsappRaw, 'Salam, CULTA Media Agency. Məlumat almaq istəyirəm.')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition-colors hover:border-[#4ade80]/50 hover:text-[#4ade80]"
              >
                <Icon name="whatsapp" className="h-4.5 w-4.5" />
              </a>
              <a
                href={`tel:${contact.phoneRaw}`}
                aria-label="Telefon"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition-colors hover:border-electric/50 hover:text-electric"
              >
                <Icon name="phone" className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{copy.menu || t('footer.menu')}</h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              {menu.map((m) => (
                <li key={m.id || m.href}>
                  <a href={m.href} className="text-sm text-cream/80 transition-colors hover:text-cream">
                    {m.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{copy.contact || t('footer.contact')}</h3>
            <ul className="mt-5 space-y-3 text-sm text-cream/70">
              <li>
                <span className="block text-xs text-muted">{copy.phone || t('footer.phone')}</span>
                <a href={`tel:${contact.phoneRaw}`} className="transition-colors hover:text-cream">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <span className="block text-xs text-muted">{copy.whatsapp || t('footer.whatsapp')}</span>
                <a
                  href={waLink(contact.whatsappRaw, 'Salam, CULTA Media Agency.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-cream"
                >
                  {contact.whatsappDisplay}
                </a>
              </li>
              <li>
                <span className="block text-xs text-muted">{copy.instagram || t('footer.instagram')}</span>
                <a
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-cream"
                >
                  {contact.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-7 text-xs text-muted md:flex-row">
          <span>© {year} CULTA Media Agency. {copy.rights || t('footer.rights')}</span>
        </div>
      </div>
    </footer>
  )
}
