import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_DATA, STORAGE_KEY } from './defaultData'

const SiteDataContext = createContext(null)

function isPlainObject(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v)
}

// Merge stored data over defaults so newly added default fields
// never break a site that was edited with an older data version.
function deepMerge(base, override) {
  if (override === undefined) return base
  if (!isPlainObject(base) || !isPlainObject(override)) return override
  const out = { ...base }
  for (const key of Object.keys(override)) {
    out[key] = deepMerge(base[key], override[key])
  }
  return out
}

function loadData() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return structuredClone(DEFAULT_DATA)
    return deepMerge(structuredClone(DEFAULT_DATA), JSON.parse(raw))
  } catch {
    return structuredClone(DEFAULT_DATA)
  }
}

export function SiteDataProvider({ children }) {
  const [data, setData] = useState(loadData)

  // Persist instantly — public pages always read the latest data.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      // storage unavailable (private mode etc.) — site keeps working in memory
    }
  }, [data])

  const updateSection = useCallback((key, value) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }, [])

  const resetAll = useCallback(() => {
    setData(structuredClone(DEFAULT_DATA))
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* noop */
    }
  }, [])

  const value = useMemo(() => ({ data, setData, updateSection, resetAll }), [data, updateSection, resetAll])

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext)
  if (!ctx) throw new Error('useSiteData must be used inside <SiteDataProvider>')
  return ctx
}
