import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="noise relative flex min-h-screen flex-col items-center justify-center bg-ink px-5 text-cream">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-violet/10 blur-[150px]" />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative text-center"
      >
        <span className="font-display text-[10rem] font-black leading-none tracking-tight text-white/[0.04] md:text-[14rem]">
          404
        </span>
        <div className="-mt-8 md:-mt-12">
          <h1 className="font-display text-3xl font-bold text-cream md:text-4xl">Səhifə tapılmadı</h1>
          <p className="mt-4 text-base text-muted">Axtardığınız səhifə mövcud deyil və ya köçürülüb.</p>
          <Link
            to="/"
            className="btn-primary mt-8 inline-flex"
          >
            Ana səhifəyə qayıt
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
