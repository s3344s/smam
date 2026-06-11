import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_DATA, STORAGE_KEY } from './defaultData'
import { UI_KEY, getCopy, translateSiteData } from './i18n'

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

function loadUi() {
  try {
    const raw = window.localStorage.getItem(UI_KEY)
    const parsed = raw ? JSON.parse(raw) : null
    return {
      lang: ['az', 'en', 'ru'].includes(parsed?.lang) ? parsed.lang : 'az',
      theme: ['dark', 'light'].includes(parsed?.theme) ? parsed.theme : 'dark',
    }
  } catch {
    return { lang: 'az', theme: 'dark' }
  }
}

export function SiteDataProvider({ children }) {
  const [data, setData] = useState(loadData)
  const [ui, setUi] = useState(loadUi)

  // Persist instantly — public pages always read the latest data.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      // storage unavailable (private mode etc.) — site keeps working in memory
    }
  }, [data])

  useEffect(() => {
    try {
      window.localStorage.setItem(UI_KEY, JSON.stringify(ui))
    } catch {
      /* noop */
    }

    document.documentElement.lang = ui.lang
    document.documentElement.classList.toggle('theme-light', ui.theme === 'light')
    document.documentElement.classList.toggle('theme-dark', ui.theme === 'dark')
  }, [ui])

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

  const setLang = useCallback((lang) => {
    setUi((prev) => ({ ...prev, lang }))
  }, [])

  const setTheme = useCallback((theme) => {
    setUi((prev) => ({ ...prev, theme }))
  }, [])

  const toggleTheme = useCallback(() => {
    setUi((prev) => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }))
  }, [])

  const siteData = useMemo(() => translateSiteData(data, ui.lang), [data, ui.lang])
  const t = useCallback((key) => getCopy(ui.lang, key), [ui.lang])

  const value = useMemo(
    () => ({ data, siteData, setData, updateSection, resetAll, lang: ui.lang, setLang, theme: ui.theme, setTheme, toggleTheme, t }),
    [data, siteData, updateSection, resetAll, ui.lang, ui.theme, setLang, setTheme, toggleTheme, t]
  )

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext)
  if (!ctx) throw new Error('useSiteData must be used inside <SiteDataProvider>')
  return ctx
}
