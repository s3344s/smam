import { motion } from 'framer-motion'

const LETTERS = ['C', 'U', 'L', 'T', 'A']

export default function Preloader() {
  return (
    <motion.div
      key="preloader"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* rising pixels */}
      <div className="relative mb-6 h-10 w-10">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="absolute bg-champagne"
            style={{
              width: 8 - i * 1.4,
              height: 8 - i * 1.4,
              left: `${[18, 2, 24, 10][i]}px`,
            }}
            initial={{ bottom: 0, opacity: 0 }}
            animate={{ bottom: [0, 34], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, delay: i * 0.22, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}
      </div>

      {/* letters */}
      <div className="flex items-center gap-[0.22em] overflow-hidden font-display text-4xl font-bold tracking-[0.22em] text-cream md:text-6xl">
        {LETTERS.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.09, ease: [0.21, 0.55, 0.3, 0.98] }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      <motion.span
        className="mt-3 font-display text-[10px] font-medium uppercase tracking-[0.7em] text-muted md:text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        Media Agency
      </motion.span>

      {/* progress line */}
      <div className="mt-10 h-px w-44 overflow-hidden bg-white/10 md:w-56">
        <motion.div
          className="h-full bg-gradient-to-r from-champagne-dark via-champagne to-champagne-light"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.7, ease: [0.65, 0, 0.35, 1] }}
        />
      </div>
    </motion.div>
  )
}
