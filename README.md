# 🎓 İstanbul Öğrenci Rehberi (LoTC)

İstanbul'a yeni gelen birinci sınıf üniversite öğrencileri için hazırlanmış kapsamlı bir mobil web rehberi. Harita, bütçe, ulaşım, sağlık, burslar ve yapay zeka destekli sohbet asistanı bir arada.

---

## 📱 Özellikler

| Modül | Açıklama |
|---|---|
| 🗺️ **Harita** | Leaflet tabanlı interaktif İstanbul haritası |
| 🚌 **Ulaşım** | Okula gidiş güzergahları ve süreleri |
| 💰 **Bütçe** | Aylık harcama planlayıcısı |
| 📈 **Pahalılık** | İstanbul'da yaşam maliyeti göstergesi |
| 🏥 **Sağlık** | Yakın hastaneler ve sağlık hizmetleri |
| 🛒 **İhtiyaçlar** | Temel ihtiyaç listesi ve öneriler |
| 🎓 **Burslar** | KYK, İBB ve diğer burs başvuru bilgileri |
| 🌱 **Gelişim** | İSMEK kursları ve kariyer kaynakları |
| 🗓️ **İlk Hafta** | Okula başlangıç için yapılacaklar listesi |
| ♿ **Erişilebilirlik** | Etkinlikler ve erişilebilirlik bilgileri |

Şu anda **Medipol Üniversitesi (Kavacık)** ve **Sancaktepe** ilçesi için içerik mevcuttur. Diğer okul ve ilçeler yakında eklenecektir.

---

## 🛠️ Teknoloji Yığını

- **Framework:** [TanStack Start](https://tanstack.com/start) (React 19 + SSR)
- **Routing:** TanStack Router (file-based)
- **UI:** [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Stil:** Tailwind CSS v4
- **Harita:** Leaflet + React Leaflet
- **Grafikler:** Recharts
- **Form:** React Hook Form + Zod
- **Build:** Vite 7
- **Deploy:** Cloudflare Workers (Wrangler)

---

## 🚀 Kurulum

### Gereksinimler

- Node.js 18+
- [Bun](https://bun.sh/) (önerilen) veya npm

### Adımlar

```bash
# Repoyu klonla
git clone https://github.com/kullanici/LoTC.git
cd LoTC

# Bağımlılıkları yükle
bun install
# veya: npm install

# Geliştirme sunucusunu başlat
bun run dev
# veya: npm run dev
```

Uygulama `http://localhost:3000` adresinde açılacaktır.

---

## 📜 Betikler

```bash
bun run dev          # Geliştirme sunucusu
bun run build        # Prodüksiyon build (Cloudflare Workers için)
bun run build:dev    # Development modunda build
bun run preview      # Build önizlemesi
bun run lint         # ESLint kontrolü
bun run format       # Prettier ile kod formatlama
```

---

## 🗂️ Proje Yapısı

```
src/
├── components/
│   ├── screens/         # Tam sayfa ekranlar (MenuScreen)
│   ├── tabs/            # Her modülün tab içeriği
│   │   ├── UlasimTab.tsx
│   │   ├── ButceTab.tsx
│   │   ├── PahalilikTab.tsx
│   │   ├── SaglikTab.tsx
│   │   ├── IhtiyaclarTab.tsx
│   │   ├── BurslarTab.tsx
│   │   ├── GelisimTab.tsx
│   │   ├── IlkHaftaTab.tsx
│   │   ├── EtkinliklerTab.tsx
│   │   └── HaritaTab.tsx
│   └── ui/              # shadcn/ui bileşenleri
├── context/
│   └── AppContext.tsx    # Seçili okul/ilçe global state
├── hooks/
│   └── use-mobile.tsx
├── lib/
│   ├── modules.ts       # Modül ID'leri ve başlıkları
│   └── utils.ts
├── routes/
│   ├── __root.tsx       # Root layout
│   └── index.tsx        # Ana sayfa
└── styles.css
```

---

## 🌍 Deploy (Cloudflare Workers)

```bash
# Prodüksiyon build al
bun run build

# Cloudflare Workers'a deploy et
npx wrangler deploy
```

`wrangler.jsonc` dosyasında worker adını ve uyumluluk tarihini özelleştirebilirsiniz.

---

## 🏫 Yeni Okul/İlçe Eklemek

1. `src/routes/index.tsx` içindeki `SCHOOL_OPTIONS` ve `DISTRICT_OPTIONS` dizilerine yeni seçenek ekleyin, `available: true` yapın.
2. İlgili tab bileşenlerinde (`UlasimTab`, `ButceTab` vb.) `selectedSchool` ve `selectedDistrict` context değerlerine göre koşullu içerik ekleyin.

---

## 🤝 Katkı

Pull request'ler memnuniyetle karşılanır! Büyük değişiklikler için önce bir issue açarak tartışmanızı öneririz.

1. Fork'layın
2. Feature branch oluşturun: `git checkout -b feature/yeni-modul`
3. Commit'leyin: `git commit -m 'feat: yeni modül eklendi'`
4. Push'layın: `git push origin feature/yeni-modul`
5. Pull Request açın
