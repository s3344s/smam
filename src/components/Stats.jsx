import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { Reveal } from './ui'
import { useSiteData } from '../data/SiteDataContext'

function CountUp({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return undefined
    const controls = animate(0, Number(value) || 0, {
      duration: 1.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref} className="font-display text-4xl font-bold tracking-tight text-cream md:text-[3.4rem]">
      {display}
      <span className="bg-gradient-to-r from-champagne to-champagne-dark bg-clip-text text-transparent">{suffix}</span>
    </span>
  )
}

export default function Stats() {
  const { siteData: data } = useSiteData()

  return (
    <section id="stats" className="relative border-y border-white/[0.06] bg-panel/60">
      <div className="container-x grid grid-cols-2 lg:grid-cols-4">
        {data.stats.map((stat, i) => (
          <Reveal
            key={i}
            delay={i * 0.1}
            className={`flex flex-col items-center gap-2 px-4 py-12 text-center md:py-16 ${
              i !== 0 ? 'border-l border-white/[0.06]' : ''
            } ${i >= 2 ? 'max-lg:border-t max-lg:border-white/[0.06]' : ''} ${i === 2 ? 'max-lg:border-l-0' : ''}`}
          >
            <CountUp value={stat.value} suffix={stat.suffix} />
            <span className="text-sm text-muted md:text-[15px]">{stat.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
