import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_DATA } from './defaultData'
import { UI_KEY, getCopy, translateSiteData } from './i18n'
import { loadSiteDataFromDB, saveSiteDataToDB } from '../lib/supabase'

const SiteDataContext = createContext(null)

function isPlainObject(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v)
}

function deepMerge(base, override) {
  if (override === undefined) return base
  if (!isPlainObject(base) || !isPlainObject(override)) return override
  const out = { ...base }
  for (const key of Object.keys(override)) {
    out[key] = deepMerge(base[key], override[key])
  }
  return out
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
  const [data, setData] = useState(() => structuredClone(DEFAULT_DATA))
  const [ui, setUi] = useState(loadUi)
  const [dbReady, setDbReady] = useState(false)
  const [saveTimeout, setSaveTimeout] = useState(null)

  // Load from Supabase on mount
  useEffect(() => {
    loadSiteDataFromDB().then((dbData) => {
      if (dbData) {
        setData(deepMerge(structuredClone(DEFAULT_DATA), dbData))
      }
      setDbReady(true)
    }).catch(() => {
      setDbReady(true)
    })
  }, [])

  // Save to Supabase with debounce (only after initial load)
  useEffect(() => {
    if (!dbReady) return
    if (saveTimeout) clearTimeout(saveTimeout)
    const t = setTimeout(() => {
      saveSiteDataToDB(data).catch(console.error)
    }, 800)
    setSaveTimeout(t)
    return () => clearTimeout(t)
  }, [data, dbReady])

  // UI preferences still in localStorage (lang/theme are per-device)
  useEffect(() => {
    try {
      window.localStorage.setItem(UI_KEY, JSON.stringify(ui))
    } catch { /* noop */ }
    document.documentElement.lang = ui.lang
    document.documentElement.classList.toggle('theme-light', ui.theme === 'light')
    document.documentElement.classList.toggle('theme-dark', ui.theme === 'dark')
  }, [ui])

  const updateSection = useCallback((key, value) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }, [])

  const resetAll = useCallback(() => {
    const fresh = structuredClone(DEFAULT_DATA)
    setData(fresh)
    saveSiteDataToDB(fresh).catch(console.error)
  }, [])

  const setLang = useCallback((lang) => setUi((prev) => ({ ...prev, lang })), [])
  const setTheme = useCallback((theme) => setUi((prev) => ({ ...prev, theme })), [])
  const toggleTheme = useCallback(() => setUi((prev) => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' })), [])

  const siteData = useMemo(() => translateSiteData(data, ui.lang), [data, ui.lang])
  const t = useCallback((key) => getCopy(ui.lang, key), [ui.lang])

  const value = useMemo(
    () => ({ data, siteData, setData, updateSection, resetAll, lang: ui.lang, setLang, theme: ui.theme, setTheme, toggleTheme, t, dbReady }),
    [data, siteData, updateSection, resetAll, ui.lang, ui.theme, setLang, setTheme, toggleTheme, t, dbReady]
  )

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext)
  if (!ctx) throw new Error('useSiteData must be used inside <SiteDataProvider>')
  return ctx
}
