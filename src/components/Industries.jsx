import { useSiteData } from '../data/SiteDataContext'
import { SectionHeading } from './ui'
import Icon from './Icon'

function Row({ items, reverse = false }) {
  const doubled = [...items, ...items, ...items]
  return (
    <div className="relative overflow-hidden py-3">
      <div className={`marquee-track ${reverse ? 'reverse' : ''}`}>
        {doubled.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="glass mx-2.5 flex shrink-0 items-center gap-2.5 rounded-full border border-white/8 px-5 py-2.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-champagne/80" />
            <span className="whitespace-nowrap text-sm text-cream/80">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Industries() {
  const { siteData: data, t } = useSiteData()
  const list = data.industries
  const half = Math.ceil(list.length / 2)
  const rowA = list.slice(0, half)
  const rowB = list.slice(half)

  return (
    <section className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow={t('industries.eyebrow')}
          title={t('industries.title')}
          subtitle={t('industries.subtitle')}
        />
      </div>

      <div className="relative mt-12 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl items-center justify-center gap-2 px-5 text-sm text-muted md:px-8">
        <Icon name="spark" className="h-4 w-4 text-champagne" />
        <span>{t('industries.note')}</span>
      </div>
    </section>
  )
}
