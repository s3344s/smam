import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSiteData } from '../data/SiteDataContext'
import { SectionHeading, Reveal } from './ui'
import Icon from './Icon'

function FaqItem({ item, open, onToggle, index }) {
  return (
    <Reveal delay={index * 0.04}>
      <div
        className={`glass overflow-hidden rounded-2xl border transition-colors duration-300 ${
          open ? 'border-champagne/30' : 'border-white/8 hover:border-white/16'
        }`}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        >
          <span className="flex items-center gap-4">
            <span className={`font-display text-sm ${open ? 'text-champagne' : 'text-muted'}`}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="font-display text-base font-medium text-cream md:text-lg">{item.q}</span>
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
              open ? 'border-champagne/40 bg-champagne/10 text-champagne' : 'border-white/10 text-muted'
            }`}
          >
            <Icon name="chevronDown" className="h-4 w-4" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
            >
              <p className="px-6 pb-6 pl-[4.25rem] leading-relaxed text-muted">{item.a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  )
}

export default function FAQ() {
  const { siteData: data, t } = useSiteData()
  const [openIndex, setOpenIndex] = useState(0)
  const copy = data.sectionCopy?.faq || {}

  return (
    <section id="faq" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <SectionHeading
          eyebrow={copy.eyebrow || t('faq.eyebrow')}
          title={copy.title || t('faq.title')}
          subtitle={copy.subtitle || t('faq.subtitle')}
        />

        <div className="mt-14 space-y-4">
          {data.faq.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
