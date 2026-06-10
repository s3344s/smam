# CULTA Media Agency — Rəsmi Sayt

Premium, qaranlıq, kinematik dizaynlı agentlik saytı. **React + Vite + Tailwind CSS + Framer Motion + Three.js (React Three Fiber)** üzərində qurulub. Bütün məzmun Azərbaycan dilindədir və daxili admin paneli vasitəsilə redaktə oluna bilir.

---

## 1. Quraşdırma

Tələb: **Node.js 18+** (tövsiyə: 20+).

```bash
npm install
npm run dev
```

Sayt `http://localhost:5173` ünvanında açılacaq.

İstehsal (production) üçün:

```bash
npm run build      # dist/ qovluğuna yığır
npm run preview    # yığılmış versiyaya lokal baxış
```

## 2. Admin paneli

Ünvan: **`/admin`** (məs: `http://localhost:5173/admin`). Saytın footer-indəki diskret **"Admin girişi"** linki də ora aparır.

| | |
|---|---|
| İstifadəçi adı | `admin` |
| Şifrə | `culta2026` |

Paneldən redaktə olunur: **Hero** (başlıq, sloqan, alt mətn, CTA-lar, üzən kartlar), **Statistika**, **Xidmətlər** (ikon seçimi ilə, əlavə et/sil), **Paketlər** (qiymət, xüsusiyyətlər, "Ən çox seçilən" vurğusu), **Proses addımları**, **FAQ** və **Əlaqə məlumatları** (telefon, WhatsApp, Instagram — bütün saytda avtomatik yenilənir).

**"Yadda saxla"** düyməsi dəyişiklikləri tətbiq edir, **"İlkin vəziyyətə qaytar"** isə hər şeyi default məzmuna qaytarır.

> Giriş şifrəsini dəyişmək üçün: `src/data/defaultData.js` faylında `ADMIN_CREDENTIALS` obyektini redaktə edin.

## 3. Məlumatlar harada saxlanılır?

Bütün redaktə olunan məzmun **brauzerin `localStorage`** yaddaşında saxlanılır (`culta_site_data_v1` açarı altında). Bu o deməkdir ki:

- Server və ya verilənlər bazası tələb olunmur — sayt tam statikdir.
- Dəyişikliklər yalnız **redaktə edilən brauzerdə** görünür. Başqa cihazlar default məzmunu görür.
- Hər kəsin görməsi üçün dəyişikliyi qalıcı etmək istəyirsinizsə, eyni mətni `src/data/defaultData.js` faylındakı `DEFAULT_DATA` obyektinə köçürüb yenidən deploy edin.
- Default məzmuna yeni sahə əlavə olunarsa, köhnə yadda saxlanmış data ilə avtomatik birləşdirilir (deep merge) — sayt heç vaxt sınmır.

## 4. Deploy

### Vercel

1. Layihəni GitHub-a yükləyin və Vercel-də **New Project** ilə seçin.
2. Framework avtomatik **Vite** kimi tanınacaq (Build: `npm run build`, Output: `dist`).
3. `/admin` kimi marşrutların işləməsi üçün kök qovluqda `vercel.json` yaradın:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Netlify

1. **Add new site → Import** ilə repo-nu seçin (Build: `npm run build`, Publish: `dist`).
2. SPA marşrutları üçün `public/_redirects` faylı yaradın:

```
/*  /index.html  200
```

## 5. Struktur

```
src/
├── main.jsx / App.jsx        # giriş nöqtəsi və marşrutlar (/, /admin)
├── pages/Home.jsx             # bütün bölmələrin yığıldığı səhifə
├── components/                # Preloader, Navbar, Hero (+Hero3D), Stats, About,
│                              # Services, Pricing, WhyUs, Portfolio, Process,
│                              # Industries, Testimonials, FAQ, Contact, Footer, ui, Icon
├── admin/                     # Admin.jsx (auth), Login, Dashboard, editors, fields
├── data/
│   ├── defaultData.js         # bütün default məzmun + admin giriş məlumatları
│   └── SiteDataContext.jsx    # localStorage sinxronlu data konteksti
├── lib/utils.js               # waLink (WhatsApp), media query hook-ları
└── styles/index.css           # dizayn sistemi (glass, btn, input, marquee…)
```

## 6. Qeydlər

- **WhatsApp inteqrasiyası:** bütün CTA-lar `wa.me/994505051955` üzərindən hazır mesajla açılır; əlaqə forması heç bir serverə məlumat göndərmir — mesajı formatlayıb WhatsApp-a ötürür.
- **Mobil performans:** telefonlarda WebGL səhnəsi ümumiyyətlə yüklənmir (three.js endirilmir belə) — onun yerinə yüngül, saf CSS orb göstərilir. Mobil üçün `backdrop-filter` və nəhəng `blur()` qatları söndürülüb, sonsuz animasiyalar dayandırılıb. 3D yalnız desktop/planşetdə, `lazy` şəkildə yüklənir.
- **Şəkillər:** Portfolio bölməsindəki kartlar placeholder-dir — real keys şəkilləri əlavə etmək üçün `src/components/Portfolio.jsx` faylına `<img>` əlavə edə bilərsiniz.
