import Icon, { SERVICE_ICON_OPTIONS } from '../components/Icon'
import { Field, TextArea, SelectField, Toggle, EditorCard, AddButton, SectionTitle } from './fields'

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
