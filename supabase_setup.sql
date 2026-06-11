-- ============================================================
-- CULTA Media Agency — Supabase Setup
-- Bu skripti Supabase Dashboard → SQL Editor-da işlət
-- ============================================================

-- 1. site_data cədvəli
CREATE TABLE IF NOT EXISTS public.site_data (
  key        TEXT PRIMARY KEY,
  value      JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Yalnız authenticated (admin) user yazabilsin
-- Oxumaq hər kəs üçün açıq (sayt public data oxuyur)
ALTER TABLE public.site_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read" ON public.site_data
  FOR SELECT USING (true);

CREATE POLICY "Auth write" ON public.site_data
  FOR ALL USING (auth.role() = 'authenticated');

-- 3. Boş başlanğıc sətri (app ilk açılışda data yoxdursa default işlədir)
-- INSERT INTO public.site_data (key, value) VALUES ('main', '{}'::jsonb)
-- ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- ✅ Bitdi! İndi Supabase Auth → Users bölməsindən
--    admin email + şifrəni əlavə et.
-- ============================================================

-- ─── Contact submissions cədvəli ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id         BIGSERIAL PRIMARY KEY,
  name       TEXT,
  phone      TEXT,
  business   TEXT,
  package    TEXT,
  message    TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Hər kəs yaza bilər (form göndərmək üçün)
CREATE POLICY "Public insert contact" ON public.contact_submissions
  FOR INSERT WITH CHECK (true);

-- Yalnız admin oxuya bilər
CREATE POLICY "Auth read contact" ON public.contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');
