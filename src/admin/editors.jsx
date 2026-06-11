import Icon, { SERVICE_ICON_OPTIONS } from '../components/Icon'
import { Field, TextArea, SelectField, Toggle, EditorCard, AddButton, SectionTitle, ImageUpload } from './fields'

/* ---------- helpers ---------- */

const updateAt = (arr, i, patch) => arr.map((item, idx) => (idx === i ? { ...item, ...patch } : item))
const removeAt = (arr, i) => arr.filter((_, idx) => idx !== i)

/* ---------- Hero ---------- */

export function HeroEditor({ value, onChange }) {
  const set = (key) => (v) => onChange({ ...value, [key]: v })
  const setCard = (i, v) => onChange({ ...value, floatingCards: value.floatingCards.map((c, idx) => (idx === i ? v : c)) })

  return (
    <div>
      <SectionTitle title="Hero bölməsi" desc="Saytın ilk ekranındakı başlıq, sloqan və düymə mətnləri." />
      <div className="space-y-4">
        <Field label="Yuxarı etiket (badge)" value={value.badge} onChange={set('badge')} />
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Başlıq — 1-ci hissə" value={value.titleA} onChange={set('titleA')} />
          <Field label="Başlıq — vurğulu söz" value={value.titleAccent} onChange={set('titleAccent')} hint="Qızılı qradiyentlə göstərilir." />
          <Field label="Başlıq — son hissə" value={value.titleB} onChange={set('titleB')} />
        </div>
        <Field label="Sloqan" value={value.slogan} onChange={set('slogan')} />
        <TextArea label="Alt mətn (subtitle)" rows={3} value={value.subtitle} onChange={set('subtitle')} />
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Əsas düymə (CTA)" value={value.ctaPrimary} onChange={set('ctaPrimary')} />
          <Field label="İkinci düymə" value={value.ctaSecondary} onChange={set('ctaSecondary')} />
        </div>
        <div>
          <label className="label-dark">Üzən kartlar (3D ətrafında)</label>
          <div className="grid gap-3 md:grid-cols-2">
            {value.floatingCards.map((c, i) => (
              <input key={i} className="input-dark" value={c} onChange={(e) => setCard(i, e.target.value)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Stats ---------- */

export function StatsEditor({ value, onChange }) {
  return (
    <div>
      <SectionTitle title="Statistika" desc="Hero altındakı rəqəmsal göstəricilər. Rəqəm hissəsi animasiya ilə sayılır." />
      <div className="space-y-4">
        {value.map((s, i) => (
          <EditorCard key={i} title={`Göstərici ${i + 1}`} onDelete={value.length > 1 ? () => onChange(removeAt(value, i)) : undefined}>
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Rəqəm" value={s.value} onChange={(v) => onChange(updateAt(value, i, { value: v }))} hint="Yalnız rəqəm (məs: 20)" />
              <Field label="Suffiks" value={s.suffix} onChange={(v) => onChange(updateAt(value, i, { suffix: v }))} hint="məs: +, M+ AZN, /7" />
              <Field label="Etiket" value={s.label} onChange={(v) => onChange(updateAt(value, i, { label: v }))} />
            </div>
          </EditorCard>
        ))}
        <AddButton label="Yeni göstərici əlavə et" onClick={() => onChange([...value, { value: '10', suffix: '+', label: 'Yeni göstərici' }])} />
      </div>
    </div>
  )
}

/* ---------- Services ---------- */

export function ServicesEditor({ value, onChange }) {
  return (
    <div>
      <SectionTitle title="Xidmətlər" desc="Xidmət kartları — başlıq, qısa təsvir və ikon." />
      <div className="space-y-4">
        {value.map((s, i) => (
          <EditorCard
            key={i}
            title={
              <span className="flex items-center gap-2">
                <Icon name={s.icon} className="h-4 w-4 text-champagne" />
                {`Xidmət ${i + 1}`}
              </span>
            }
            onDelete={() => onChange(removeAt(value, i))}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Başlıq" value={s.title} onChange={(v) => onChange(updateAt(value, i, { title: v }))} />
              <SelectField label="İkon" value={s.icon} options={SERVICE_ICON_OPTIONS} onChange={(v) => onChange(updateAt(value, i, { icon: v }))} />
            </div>
            <TextArea label="Təsvir" rows={2} value={s.desc} onChange={(v) => onChange(updateAt(value, i, { desc: v }))} />
          </EditorCard>
        ))}
        <AddButton
          label="Yeni xidmət əlavə et"
          onClick={() => onChange([...value, { icon: 'spark', title: 'Yeni xidmət', desc: 'Xidmətin qısa təsviri.' }])}
        />
      </div>
    </div>
  )
}

/* ---------- Pricing ---------- */

export function PricingEditor({ value, onChange }) {
  const setHighlighted = (i) => onChange(value.map((p, idx) => ({ ...p, highlighted: idx === i ? !p.highlighted : false })))

  return (
    <div>
      <SectionTitle
        title="Paketlər"
        desc='Qiymət paketləri. Xüsusiyyətləri hər sətirdə bir olmaqla yazın. "Ən çox seçilən" yalnız bir paketdə aktiv ola bilər.'
      />
      <div className="space-y-4">
        {value.map((p, i) => (
          <EditorCard key={p.id ?? i} title={p.name || `Paket ${i + 1}`} onDelete={() => onChange(removeAt(value, i))}>
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Ad" value={p.name} onChange={(v) => onChange(updateAt(value, i, { name: v }))} />
              <Field label="Qiymət" value={p.price} onChange={(v) => onChange(updateAt(value, i, { price: v }))} hint='Rəqəm və ya mətn (məs: "Fərdi qiymət")' />
              <Field label="Dövr" value={p.period} onChange={(v) => onChange(updateAt(value, i, { period: v }))} hint="məs: AZN / ay" />
            </div>
            <Field label="Qısa təsvir (tagline)" value={p.tagline} onChange={(v) => onChange(updateAt(value, i, { tagline: v }))} />
            <TextArea
              label="Xüsusiyyətlər (hər sətirdə bir)"
              rows={6}
              value={(p.features || []).join('\n')}
              onChange={(v) => onChange(updateAt(value, i, { features: v.split('\n').filter((line) => line.trim() !== '') }))}
            />
            <Toggle label='"Ən çox seçilən" kimi vurğula' checked={!!p.highlighted} onChange={() => setHighlighted(i)} />
          </EditorCard>
        ))}
        <AddButton
          label="Yeni paket əlavə et"
          onClick={() =>
            onChange([
              ...value,
              {
                id: `pkg-${Date.now()}`,
                name: 'Yeni paket',
                price: '0',
                period: 'AZN / ay',
                tagline: 'Paketin qısa təsviri',
                features: ['Xüsusiyyət 1', 'Xüsusiyyət 2'],
                highlighted: false,
              },
            ])
          }
        />
      </div>
    </div>
  )
}

/* ---------- Process ---------- */

export function ProcessEditor({ value, onChange }) {
  return (
    <div>
      <SectionTitle title="Proses" desc="İş prosesinin addımları — sırayla göstərilir." />
      <div className="space-y-4">
        {value.map((p, i) => (
          <EditorCard key={i} title={`Addım ${String(i + 1).padStart(2, '0')}`} onDelete={value.length > 2 ? () => onChange(removeAt(value, i)) : undefined}>
            <Field label="Başlıq" value={p.title} onChange={(v) => onChange(updateAt(value, i, { title: v }))} />
            <TextArea label="Təsvir" rows={2} value={p.desc} onChange={(v) => onChange(updateAt(value, i, { desc: v }))} />
          </EditorCard>
        ))}
        <AddButton label="Yeni addım əlavə et" onClick={() => onChange([...value, { title: 'Yeni addım', desc: 'Addımın təsviri.' }])} />
      </div>
    </div>
  )
}

/* ---------- FAQ ---------- */

export function FaqEditor({ value, onChange }) {
  return (
    <div>
      <SectionTitle title="FAQ" desc="Tez-tez verilən suallar və cavabları." />
      <div className="space-y-4">
        {value.map((f, i) => (
          <EditorCard key={i} title={`Sual ${i + 1}`} onDelete={() => onChange(removeAt(value, i))}>
            <Field label="Sual" value={f.q} onChange={(v) => onChange(updateAt(value, i, { q: v }))} />
            <TextArea label="Cavab" rows={3} value={f.a} onChange={(v) => onChange(updateAt(value, i, { a: v }))} />
          </EditorCard>
        ))}
        <AddButton label="Yeni sual əlavə et" onClick={() => onChange([...value, { q: 'Yeni sual?', a: 'Cavab mətni.' }])} />
      </div>
    </div>
  )
}

/* ---------- Contact ---------- */

export function ContactEditor({ value, onChange }) {
  const set = (key) => (v) => onChange({ ...value, [key]: v })
  return (
    <div>
      <SectionTitle title="Əlaqə məlumatları" desc="Telefon, WhatsApp və Instagram — bütün saytda avtomatik yenilənir." />
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Telefon (görünən)" value={value.phoneDisplay} onChange={set('phoneDisplay')} hint="məs: 050-505-19-55" />
          <Field label="Telefon (zəng formatı)" value={value.phoneRaw} onChange={set('phoneRaw')} hint="məs: +994505051955" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="WhatsApp (görünən)" value={value.whatsappDisplay} onChange={set('whatsappDisplay')} />
          <Field label="WhatsApp (wa.me formatı)" value={value.whatsappRaw} onChange={set('whatsappRaw')} hint="Ölkə kodu ilə, + işarəsiz: 994505051955" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Instagram istifadəçi adı" value={value.instagramHandle} onChange={set('instagramHandle')} hint="məs: @cultamedia.az" />
          <Field label="Instagram linki" value={value.instagramUrl} onChange={set('instagramUrl')} />
        </div>
      </div>
    </div>
  )
}

/* ---------- Brand / Logo ---------- */

export function BrandEditor({ value, onChange }) {
  const set = (key) => (v) => onChange({ ...value, [key]: v })
  const readImage = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => onChange({ ...value, logoImage: String(reader.result || '') })
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <SectionTitle title="Logo və brend" desc="Sol yuxarıdakı logo buradan dəyişir. Şəkil yükləsəniz mətn logosu əvəzinə həmin şəkil görünəcək." />
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Logo mətni" value={value.logoText} onChange={set('logoText')} />
          <Field label="Alt yazı" value={value.logoSubtext} onChange={set('logoSubtext')} hint="Məs: Agency. Boş saxlasanız görünməyəcək." />
        </div>
        <Field label="Logo alt etiketi" value={value.logoAlt} onChange={set('logoAlt')} />
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <label className="label-dark">Logo şəkli yüklə</label>
          <input
            type="file"
            accept="image/*"
            className="input-dark file:mr-4 file:rounded-lg file:border-0 file:bg-champagne file:px-3 file:py-2 file:font-display file:text-xs file:font-semibold file:text-ink"
            onChange={(e) => readImage(e.target.files?.[0])}
          />
          <Field label="və ya logo şəkil linki / data URL" value={value.logoImage} onChange={set('logoImage')} hint="Boş saxlasanız CULTA mətn logosu görünəcək." />
          {value.logoImage && (
            <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/20 p-4">
              <img src={value.logoImage} alt="Logo preview" className="max-h-16 max-w-[220px] object-contain" />
              <button type="button" onClick={() => set('logoImage')('')} className="rounded-lg border border-red-400/30 px-3 py-2 text-xs text-red-300 hover:bg-red-400/10">Şəkli sil</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ---------- Header / Navigation ---------- */

export function NavigationEditor({ value, onChange }) {
  const set = (key) => (v) => onChange({ ...value, [key]: v })
  const setItem = (i, patch) => onChange({ ...value, items: updateAt(value.items || [], i, patch) })

  return (
    <div>
      <SectionTitle title="Header menyusu" desc="Şəkildə işarələnən header hissələrinin saytda görünüb-görünməməsini və adlarını buradan tənzimləyin." />
      <div className="space-y-5">
        <EditorCard title="Header düymələri və kontrollar">
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Qiymət düyməsi" value={value.quoteLabel} onChange={set('quoteLabel')} />
            <Field label="WhatsApp düyməsi" value={value.whatsappLabel} onChange={set('whatsappLabel')} />
            <Field label="Mobil WhatsApp düyməsi" value={value.mobileWhatsappLabel} onChange={set('mobileWhatsappLabel')} />
          </div>
          <Field label="Instagram adı" value={value.instagramLabel} onChange={set('instagramLabel')} />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <Toggle label="Dil seçimi görünsün" checked={value.showLanguage !== false} onChange={(v) => set('showLanguage')(v)} />
            <Toggle label="Dark/Light görünsün" checked={value.showTheme !== false} onChange={(v) => set('showTheme')(v)} />
            <Toggle label="Qiymət düyməsi görünsün" checked={value.showQuote !== false} onChange={(v) => set('showQuote')(v)} />
            <Toggle label="Instagram görünsün" checked={value.showInstagram !== false} onChange={(v) => set('showInstagram')(v)} />
            <Toggle label="WhatsApp görünsün" checked={value.showWhatsapp !== false} onChange={(v) => set('showWhatsapp')(v)} />
          </div>
        </EditorCard>

        {(value.items || []).map((item, i) => (
          <EditorCard key={item.id || i} title={`Menyu linki ${i + 1}`} onDelete={() => onChange({ ...value, items: removeAt(value.items || [], i) })}>
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Ad" value={item.label} onChange={(v) => setItem(i, { label: v })} />
              <Field label="Link / anchor" value={item.href} onChange={(v) => setItem(i, { href: v })} hint="Məs: #xidmetler" />
              <Field label="ID" value={item.id} onChange={(v) => setItem(i, { id: v })} />
            </div>
            <Toggle label="Header və footerdə görünsün" checked={item.visible !== false} onChange={(v) => setItem(i, { visible: v })} />
          </EditorCard>
        ))}
        <AddButton label="Yeni menyu linki əlavə et" onClick={() => onChange({ ...value, items: [...(value.items || []), { id: `custom-${Date.now()}`, label: 'Yeni link', href: '#', visible: true }] })} />
      </div>
    </div>
  )
}

/* ---------- Section headings / site copy ---------- */

const COPY_GROUP_LABELS = {
  about: 'Haqqımızda başlıqları',
  services: 'Xidmətlər bölməsi başlıqları',
  pricing: 'Paketlər və kalkulyator başlıqları',
  why: 'Niyə biz başlıqları',
  portfolio: 'Portfolio başlıqları',
  process: 'Proses başlıqları',
  industries: 'Sahələr başlıqları',
  testimonials: 'Rəylər başlıqları',
  faq: 'FAQ başlıqları',
  contact: 'Əlaqə formu yazıları',
  footer: 'Footer başlıqları',
}

export function SectionCopyEditor({ value, onChange }) {
  const setGroupField = (group, key, next) => onChange({ ...value, [group]: { ...(value[group] || {}), [key]: next } })

  return (
    <div>
      <SectionTitle title="Saytdakı bütün başlıqlar" desc="Bölmə etiketləri, böyük başlıqlar, alt mətnlər, form etiketləri və modal başlıqları buradan dəyişir." />
      <div className="space-y-5">
        {Object.entries(value || {}).map(([group, fields]) => (
          <EditorCard key={group} title={COPY_GROUP_LABELS[group] || group}>
            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(fields || {}).map(([key, val]) => (
                String(val).length > 90 ? (
                  <TextArea key={key} label={key} rows={3} value={val} onChange={(v) => setGroupField(group, key, v)} />
                ) : (
                  <Field key={key} label={key} value={val} onChange={(v) => setGroupField(group, key, v)} />
                )
              ))}
            </div>
          </EditorCard>
        ))}
      </div>
    </div>
  )
}

/* ---------- About ---------- */

export function AboutEditor({ value, onChange }) {
  const set = (key) => (v) => onChange({ ...value, [key]: v })
  return (
    <div>
      <SectionTitle title="Haqqımızda" desc="Haqqımızda mətni və kartları." />
      <div className="space-y-4">
        <Field label="Böyük başlıq" value={value.title} onChange={set('title')} />
        <TextArea label="Mətn" rows={4} value={value.text} onChange={set('text')} />
        {(value.cards || []).map((card, i) => (
          <EditorCard key={i} title={`Kart ${i + 1}`} onDelete={() => onChange({ ...value, cards: removeAt(value.cards || [], i) })}>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Başlıq" value={card.title} onChange={(v) => onChange({ ...value, cards: updateAt(value.cards || [], i, { title: v }) })} />
              <SelectField label="İkon" value={card.icon} options={SERVICE_ICON_OPTIONS} onChange={(v) => onChange({ ...value, cards: updateAt(value.cards || [], i, { icon: v }) })} />
            </div>
            <TextArea label="Təsvir" rows={2} value={card.desc} onChange={(v) => onChange({ ...value, cards: updateAt(value.cards || [], i, { desc: v }) })} />
          </EditorCard>
        ))}
        <AddButton label="Yeni kart əlavə et" onClick={() => onChange({ ...value, cards: [...(value.cards || []), { icon: 'spark', title: 'Yeni kart', desc: 'Qısa təsvir.' }] })} />
      </div>
    </div>
  )
}

/* ---------- Why Us ---------- */

export function WhyUsEditor({ value, onChange }) {
  return (
    <div>
      <SectionTitle title="Niyə biz" desc="Kartlar və müqayisə bloku." />
      <div className="space-y-4">
        {(value.cards || []).map((card, i) => (
          <EditorCard key={i} title={`Kart ${i + 1}`} onDelete={() => onChange({ ...value, cards: removeAt(value.cards || [], i) })}>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Başlıq" value={card.title} onChange={(v) => onChange({ ...value, cards: updateAt(value.cards || [], i, { title: v }) })} />
              <SelectField label="İkon" value={card.icon} options={SERVICE_ICON_OPTIONS} onChange={(v) => onChange({ ...value, cards: updateAt(value.cards || [], i, { icon: v }) })} />
            </div>
            <TextArea label="Təsvir" rows={2} value={card.desc} onChange={(v) => onChange({ ...value, cards: updateAt(value.cards || [], i, { desc: v }) })} />
          </EditorCard>
        ))}
        <AddButton label="Yeni kart əlavə et" onClick={() => onChange({ ...value, cards: [...(value.cards || []), { icon: 'spark', title: 'Yeni üstünlük', desc: 'Qısa təsvir.' }] })} />
        <EditorCard title="Müqayisə bloku">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Sol başlıq" value={value.comparison?.ordinaryTitle} onChange={(v) => onChange({ ...value, comparison: { ...(value.comparison || {}), ordinaryTitle: v } })} />
            <Field label="Sağ başlıq" value={value.comparison?.cultaTitle} onChange={(v) => onChange({ ...value, comparison: { ...(value.comparison || {}), cultaTitle: v } })} />
          </div>
          <TextArea label="Sol siyahı (hər sətirdə bir)" rows={4} value={(value.comparison?.ordinary || []).join('\n')} onChange={(v) => onChange({ ...value, comparison: { ...(value.comparison || {}), ordinary: v.split('\n').filter(Boolean) } })} />
          <TextArea label="Sağ siyahı (hər sətirdə bir)" rows={4} value={(value.comparison?.culta || []).join('\n')} onChange={(v) => onChange({ ...value, comparison: { ...(value.comparison || {}), culta: v.split('\n').filter(Boolean) } })} />
        </EditorCard>
      </div>
    </div>
  )
}

/* ---------- Portfolio ---------- */

export function PortfolioEditor({ value, onChange }) {
  return (
    <div>
      <SectionTitle title="Portfolio" desc="Portfolio kartları — şəkil, mətn və rəng aksenti." />
      <div className="space-y-4">
        {value.map((item, i) => (
          <EditorCard key={i} title={`Portfolio ${i + 1} — ${item.type || 'Yeni'}`} onDelete={() => onChange(removeAt(value, i))}>
            <ImageUpload
              label="Portfolio şəkli"
              value={item.image || ''}
              onChange={(v) => onChange(updateAt(value, i, { image: v }))}
              folder="portfolio"
              hint="Tövsiyə: 720×480px, maks 5MB"
            />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Tip / sahə" value={item.type} onChange={(v) => onChange(updateAt(value, i, { type: v }))} />
              <SelectField label="Rəng aksenti" value={item.accent} options={['champagne', 'violet', 'electric']} onChange={(v) => onChange(updateAt(value, i, { accent: v }))} />
            </div>
            <Field label="Hədəf" value={item.goal} onChange={(v) => onChange(updateAt(value, i, { goal: v }))} />
            <Field label="Xidmət" value={item.service} onChange={(v) => onChange(updateAt(value, i, { service: v }))} />
            <Field label="Nəticə" value={item.result} onChange={(v) => onChange(updateAt(value, i, { result: v }))} />
          </EditorCard>
        ))}
        <AddButton label="Yeni portfolio əlavə et" onClick={() => onChange([...value, { type: 'Yeni sahə', goal: 'Hədəf', service: 'Xidmət', result: 'Nəticə', accent: 'champagne', image: '' }])} />
      </div>
    </div>
  )
}

/* ---------- Industries ---------- */

export function IndustriesEditor({ value, onChange }) {
  return (
    <div>
      <SectionTitle title="Sahələr" desc="Hərəkətli sahə etiketləri. Hər sətirdə bir sahə yazın." />
      <TextArea rows={12} label="Sahələr" value={(value || []).join('\n')} onChange={(v) => onChange(v.split('\n').filter((line) => line.trim() !== ''))} />
    </div>
  )
}

/* ---------- Testimonials ---------- */

export function TestimonialsEditor({ value, onChange }) {
  return (
    <div>
      <SectionTitle title="Müştəri rəyləri" desc="Rəy mətni, ad, vəzifə və foto." />
      <div className="space-y-4">
        {value.map((item, i) => (
          <EditorCard key={i} title={`Rəy ${i + 1} — ${item.name || 'Ad yoxdur'}`} onDelete={() => onChange(removeAt(value, i))}>
            <ImageUpload
              label="Müştəri fotosu (isteğe bağlı)"
              value={item.photo || ''}
              onChange={(v) => onChange(updateAt(value, i, { photo: v }))}
              folder="testimonials"
              hint="Tövsiyə: kvadrat format, 200×200px"
            />
            <TextArea label="Rəy mətni" rows={4} value={item.quote} onChange={(v) => onChange(updateAt(value, i, { quote: v }))} />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Ad Soyad" value={item.name} onChange={(v) => onChange(updateAt(value, i, { name: v }))} />
              <Field label="Vəzifə / biznes" value={item.role} onChange={(v) => onChange(updateAt(value, i, { role: v }))} />
            </div>
          </EditorCard>
        ))}
        <AddButton label="Yeni rəy əlavə et" onClick={() => onChange([...value, { quote: 'Yeni rəy mətni.', name: 'Ad Soyad', role: 'Vəzifə / biznes', photo: '' }])} />
      </div>
    </div>
  )
}

/* ---------- Footer ---------- */

export function FooterEditor({ value, onChange }) {
  const set = (key) => (v) => onChange({ ...value, [key]: v })
  return (
    <div>
      <SectionTitle title="Footer" desc="Saytın ən aşağı hissəsindəki mətn." />
      <TextArea label="Footer sloqanı" rows={3} value={value.tagline} onChange={set('tagline')} />
    </div>
  )
}

/* ---------- Addons (Pricing Calculator) ---------- */

const ADDON_GROUPS = ['Dizayn və video', 'AI video', 'Çəkiliş', 'Digər SMM']

export function AddonsEditor({ value, onChange }) {
  const updateAddon = (i, patch) => onChange(value.map((a, idx) => (idx === i ? { ...a, ...patch } : a)))
  const removeAddon = (i) => onChange(value.filter((_, idx) => idx !== i))

  return (
    <div>
      <SectionTitle
        title="Kalkulyator — Əlavə xidmətlər"
        desc="Qiymət kalkulyatorunda görünən əlavə xidmətlər və qiymətlər. Qrup adı kartı vizual olaraq qruplaşdırır."
      />
      <div className="space-y-4">
        {value.map((addon, i) => (
          <EditorCard
            key={addon.id || i}
            title={<span className="flex items-center gap-2"><span className="text-xs text-champagne/60">{addon.group}</span> — {addon.label}</span>}
            onDelete={() => removeAddon(i)}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <SelectField
                label="Qrup"
                value={addon.group}
                options={ADDON_GROUPS}
                onChange={(v) => updateAddon(i, { group: v })}
              />
              <SelectField
                label="Tip"
                value={addon.type}
                options={['counter', 'check']}
                onChange={(v) => updateAddon(i, { type: v })}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Ad" value={addon.label} onChange={(v) => updateAddon(i, { label: v })} />
              <Field label="Qiymət (AZN)" value={String(addon.price)} onChange={(v) => updateAddon(i, { price: Number(v) || 0 })} hint="Rəqəm daxil edin" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Vahid (counter üçün)" value={addon.unit || ''} onChange={(v) => updateAddon(i, { unit: v })} hint="məs: post, video, sessiya" />
              <SelectField
                label="İkon"
                value={addon.icon}
                options={['design', 'calendar', 'reels', 'spark', 'camera', 'phone', 'radar', 'meta', 'target', 'copy', 'brand', 'web', 'team', 'growth', 'system', 'gem']}
                onChange={(v) => updateAddon(i, { icon: v })}
              />
            </div>
          </EditorCard>
        ))}
        <AddButton
          label="Yeni əlavə xidmət"
          onClick={() => onChange([...value, {
            id: `addon-${Date.now()}`,
            label: 'Yeni xidmət',
            price: 100,
            unit: '',
            type: 'check',
            icon: 'spark',
            group: 'Digər SMM',
          }])}
        />
      </div>
    </div>
  )
}
