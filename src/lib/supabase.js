import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ─── Site Data helpers ────────────────────────────────────────────────────────

export async function loadSiteDataFromDB() {
  const { data, error } = await supabase
    .from('site_data')
    .select('value')
    .eq('key', 'main')
    .single()

  if (error || !data) return null
  return data.value
}

export async function saveSiteDataToDB(siteData) {
  const { error } = await supabase
    .from('site_data')
    .upsert({ key: 'main', value: siteData, updated_at: new Date().toISOString() })

  if (error) throw error
}

// ─── Auth helpers ─────────────────────────────────────────────────────────────

export async function signInAdmin(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signOutAdmin() {
  await supabase.auth.signOut()
}

export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}
