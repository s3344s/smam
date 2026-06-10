import { useEffect, useState } from 'react'

/** Build a wa.me deep link with a pre-filled message. */
export function waLink(rawNumber, text) {
  const num = String(rawNumber || '').replace(/[^\d]/g, '')
  const query = text ? `?text=${encodeURIComponent(text)}` : ''
  return `https://wa.me/${num}${query}`
}

/** Media-query hook — used to slim down 3D effects on small screens. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mq = window.matchMedia(query)
    const handler = (e) => setMatches(e.matches)
    mq.addEventListener('change', handler)
    setMatches(mq.matches)
    return () => mq.removeEventListener('change', handler)
  }, [query])

  return matches
}

export const useIsMobile = () => useMediaQuery('(max-width: 768px)')
