import { useRef } from 'react'
import { motion } from 'framer-motion'

/* ------------------------------------------------------------------ */
/* Logo — wordmark with the rising-pixel motif from the CULTA brand   */
/* ------------------------------------------------------------------ */
export function Logo({ size = 'md', withAgency = true, brand }) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-xl md:text-2xl',
    lg: 'text-4xl md:text-6xl',
  }
  const imageHeights = {
    sm: 'h-8 md:h-9',
    md: 'h-11 md:h-14',
    lg: 'h-16 md:h-24',
  }
  const text = brand?.logoText || 'CULTA'
  const subtext = brand?.logoSubtext ?? 'Agency'
  const alt = brand?.logoAlt || text

  if (brand?.logoImage) {
    return (
      <span className="relative inline-flex flex-col items-center leading-none select-none">
        <img src={brand.logoImage} alt={alt} className={`${imageHeights[size]} max-w-[180px] object-contain`} />
        {withAgency && subtext && (
          <span className="mt-1 font-display text-[0.5em] font-medium uppercase tracking-[0.6em] text-muted">
            {subtext}
          </span>
        )}
      </span>
    )
  }

  if (text.trim().toUpperCase() !== 'CULTA') {
    return (
      <span className="relative inline-flex flex-col items-center leading-none select-none">
        <span className={`font-display font-bold uppercase tracking-[0.22em] text-cream ${sizes[size]}`}>{text}</span>
        {withAgency && subtext && (
          <span className="mt-1 font-display text-[0.5em] font-medium uppercase tracking-[0.6em] text-muted">
            {subtext}
          </span>
        )}
      </span>
    )
  }

  return (
    <span className="relative inline-flex flex-col items-center leading-none select-none">
      <span className={`font-display font-bold tracking-[0.22em] text-cream ${sizes[size]}`}>
        CUL
        <span className="relative inline-block">
          <svg
            viewBox="0 0 20 26"
            className="pointer-events-none absolute -top-[0.95em] left-1/2 h-[1em] w-[0.8em] -translate-x-1/2 text-cream"
            fill="currentColor"
            aria-hidden="true"
          >
            <rect x="8" y="20" width="4" height="4" opacity="0.95" />
            <rect x="3" y="14" width="3.2" height="3.2" opacity="0.8" />
            <rect x="12" y="11" width="2.8" height="2.8" opacity="0.7" />
            <rect x="6" y="6" width="2.4" height="2.4" opacity="0.55" />
            <rect x="13" y="2" width="2" height="2" opacity="0.4" />
          </svg>
          T
        </span>
        A
      </span>
      {withAgency && subtext && (
        <span className="mt-1 font-display text-[0.5em] font-medium uppercase tracking-[0.6em] text-muted">
          {subtext}
        </span>
      )}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Pixel cluster — small decorative squares used next to eyebrows      */
/* ------------------------------------------------------------------ */
export function PixelCluster({ className = 'h-3.5 w-3.5 text-champagne' }) {
  return (
    <svg viewBox="0 0 14 14" className={className} fill="currentColor" aria-hidden="true">
      <rect x="0" y="10" width="4" height="4" />
      <rect x="6" y="6" width="3.2" height="3.2" opacity="0.75" />
      <rect x="10.5" y="1" width="2.6" height="2.6" opacity="0.5" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Reveal — scroll-triggered entrance used across all sections         */
/* ------------------------------------------------------------------ */
export function Reveal({ children, delay = 0, y = 30, className = '', once = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.75, delay, ease: [0.21, 0.55, 0.3, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* SectionHeading — eyebrow + display title + optional subtitle        */
/* ------------------------------------------------------------------ */
export function SectionHeading({ eyebrow, title, subtitle, align = 'center', className = '' }) {
  const alignCls = align === 'left' ? 'items-start text-left' : 'items-center text-center'
  return (
    <div className={`flex flex-col gap-5 ${alignCls} ${className}`}>
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">
            <PixelCluster />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2 className="max-w-3xl font-display text-3xl font-bold leading-[1.12] tracking-tight text-cream sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.16}>
          <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* TiltCard — 3D tilt + mouse-following spotlight glow                 */
/* ------------------------------------------------------------------ */
export function TiltCard({ children, className = '', max = 9, as: Tag = 'div' }) {
  const ref = useRef(null)
  // No hover → no tilt: skip all pointer math on touch devices.
  const canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches

  const handleMove = (e) => {
    if (!canHover) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const px = x / rect.width - 0.5
    const py = y / rect.height - 0.5
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
    el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateZ(0)`
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={canHover ? handleMove : undefined}
      onMouseLeave={canHover ? handleLeave : undefined}
      className={`tilt-card ${className}`}
    >
      {children}
    </Tag>
  )
}
