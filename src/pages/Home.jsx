import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import Preloader from '../components/Preloader'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import About from '../components/About'
import Services from '../components/Services'
import Pricing from '../components/Pricing'
import WhyUs from '../components/WhyUs'
import Portfolio from '../components/Portfolio'
import Process from '../components/Process'
import Industries from '../components/Industries'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { useSiteData } from '../data/SiteDataContext'

export default function Home() {
  const { theme } = useSiteData()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [loading])

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`noise relative min-h-screen bg-ink text-cream ${theme === 'light' ? 'site-light' : 'site-dark'}`}>
      <AnimatePresence>{loading && <Preloader key="preloader" />}</AnimatePresence>

      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Pricing />
        <WhyUs />
        <Portfolio />
        <Process />
        <Industries />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
