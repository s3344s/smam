# CULTA Media Agency — Rəsmi Sayt v1.1

React + Vite + Tailwind CSS + Framer Motion + Three.js + **Supabase**

---

## 🚀 Quraşdırma

```bash
npm install
npm run dev
```

---

## ⚙️ Supabase Quraşdırması (İlk dəfə)

### 1. SQL Skriptini İşlət
Supabase Dashboard → **SQL Editor** → yeni sorğu aç → `supabase_setup.sql` faylının içindəkiləri yapışdır → **Run**

### 2. Admin İstifadəçi Yarat
Supabase Dashboard → **Authentication** → **Users** → **Add user** → email + şifrə daxil et

### 3. `.env` Faylı
Kök qovluqda `.env` faylı artıq mövcuddur. Lazım gələrsə yeniləmək üçün:
```env
VITE_SUPABASE_URL=https://kgkncdelshcpnkbamxfi.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## 🔐 Admin Paneli

Ünvan: `/smadmin`

Admin email + şifrə ilə giriş — Supabase Auth vasitəsilə. Şifrə artıq kodda yoxdur.

Dəyişiklik edib **"Yadda saxla"** düyməsinə basanda — bütün cihazlarda dərhal görünür.

---

## 📁 Struktur

```
src/
├── lib/supabase.js          # Supabase client + helpers
├── data/SiteDataContext.jsx # Supabase-dən oxuyur/yazır
├── admin/
│   ├── Admin.jsx            # Supabase session ilə auth
│   ├── Login.jsx            # Email/şifrə giriş
│   ├── Dashboard.jsx        # Admin panel (+ Kalkulyator tab)
│   └── editors.jsx          # Bütün editorlar + AddonsEditor
├── components/
│   └── Pricing.jsx          # ADDONS artıq data.addons-dan gəlir
└── styles/index.css         # Mobil optimizasiya əlavə edilib
```

---

## 🗄️ Data Axışı

```
Admin dəyişiklik edir
     ↓
Dashboard → save()
     ↓
SiteDataContext.updateSection()
     ↓
Supabase: site_data WHERE key='main'
     ↓
Bütün brauzerlər növbəti yükləmədə yeni datanı görür
```

---

## 🌐 Deploy

### Vercel
1. GitHub-a yüklə
2. Vercel-də **Environment Variables** əlavə et:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Deploy et

### Netlify
Eyni qaydada — Site Settings → Environment Variables-a əlavə et.

> ⚠️ `.env` faylını GitHub-a yükləmə — `.gitignore`-da qeyd edilib.
