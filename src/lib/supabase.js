import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

const BUCKET = 'culta-media'

// ─── Site Data ────────────────────────────────────────────────────────────────

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

// ─── Storage ──────────────────────────────────────────────────────────────────

export async function uploadImage(file, folder = 'general') {
  const ext = file.name.split('.').pop()
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })
  if (error) throw error
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export async function deleteImage(url) {
  if (!url || !url.includes(BUCKET)) return
  const path = url.split(`${BUCKET}/`)[1]
  if (!path) return
  await supabase.storage.from(BUCKET).remove([path])
}

// ─── Contact submissions ──────────────────────────────────────────────────────

export async function saveContactSubmission(form) {
  const { error } = await supabase
    .from('contact_submissions')
    .insert([{ ...form, created_at: new Date().toISOString() }])
  if (error) throw error
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

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
