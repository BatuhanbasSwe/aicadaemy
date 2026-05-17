# 🧭 LGS Kâşifi — Türk Dahileriyle LGS'ye Hazırlan

> **"Hayatta en hakiki mürşit ilimdir."** — Mustafa Kemal Atatürk

LGS Kâşifi, 8. sınıf öğrencilerinin **Atatürk, Cahit Arf, Aziz Sancar, Yunus Emre, Mevlana ve Shakespeare** gibi Türk-dünya dahileriyle birebir sohbet ederek LGS'ye hazırlandığı, yapay zekâ destekli bir öğrenme platformudur. Çocuk her soruyu sorduğunda **Merak Ağacı** dallanır, doğru cevaplar **altın yıldız** ekler, arkadaşlarla **lig sıralaması** kızışır.

Bir hackathon (16 saat) çıktısı olarak başladı; şu an tam kapsamlı bir Next.js 16 + Supabase + Gemini AI uygulamasıdır.

---

## 📑 İçindekiler

- [Vizyon](#-vizyon)
- [Öne Çıkan Özellikler](#-öne-çıkan-özellikler)
- [Karakterler & Müfredat](#-karakterler--müfredat)
- [Teknoloji Stack'i](#%EF%B8%8F-teknoloji-stacki)
- [Mimari](#%EF%B8%8F-mimari)
- [Hızlı Başlangıç](#-hızlı-başlangıç)
- [Ortam Değişkenleri](#-ortam-değişkenleri-envlocal)
- [Proje Yapısı](#-proje-yapısı)
- [Veri Akışı](#-veri-akışı-chat--ağaç--lgs)
- [Önemli Bileşenler](#-önemli-bileşenler)
- [Geliştirme Notları](#-geliştirme-notları)
- [Yol Haritası](#%EF%B8%8F-yol-haritası)
- [Katkı & Lisans](#-katkı--lisans)

---

## 🎯 Vizyon

Geleneksel test kitapları çocuğun "neden?" sorusunu öldürür. LGS Kâşifi tam tersini yapar:

1. Çocuk bir **karakter seçer** (örn. Cahit Arf — matematik).
2. Karaktere **istediği soruyu** sorar; karakter kendi sesinden cevaplar ve **3 takip sorusu** önerir.
3. Her cevap **Merak Ağacı**'na bir düğüm ekler — çocuk kendi öğrenme haritasını gözüyle görür.
4. Yeterince konu açıldığında karakter **gerçek bir LGS sorusu** sorar; doğru cevap **altın yıldız + skor** kazandırır.
5. Arkadaşlar lig tablosunda yarışır, günlük görevler XP biriktirir.

**Hedef:** LGS'yi *çalışılması gereken bir yük* olmaktan çıkarıp *keşfedilen bir oyun* hâline getirmek.

---

## ✨ Öne Çıkan Özellikler

| Özellik | Açıklama |
|---|---|
| 🤖 **6 AI Karakter** | Atatürk, Cahit Arf, Aziz Sancar, Yunus Emre, Mevlana, Shakespeare — her biri kendi sesi, hikâyesi ve öğretme tarzıyla (Gemini structured output ile) |
| 🌳 **Merak Ağacı (D3.js)** | Her sohbet turu ağaca düğüm ekler; `root → opened → suggested` hiyerarşisi canlı çizilir, yakınlaştırma & tam ekran modu var |
| 📚 **Müfredat Tarayıcı** | 6 ders × ünite × konu üç seviyeli drill-down; her konu **markdown + KaTeX** ile zengin anlatım kartı |
| 🧮 **LGS Soru Bankası** | Gerçek LGS soruları (JSON); karakter "yeterince konuştuk" dediğinde otomatik enjekte edilir, konfeti + skor güncellemesi |
| 🏆 **Lig & Arkadaşlar** | Hard-coded sahte arkadaşlar + tick simülasyonu — "Ayşe seni geçti!" anı demo'da canlı görünür |
| 📅 **Takvim** | 2026 ders programı, etkinlik ekleme, sınav planlayıcı |
| 🔥 **Günlük Görevler** | Streak, XP, hedef kartları (Duolingo-tarzı motivasyon) |
| 🔐 **Supabase Auth** | E-posta + parola + kullanıcı adı + sınıf seviyesi; profile ve oyun durumu cloud'a senkron |
| 💾 **Persist & Sync** | Zustand `persist` middleware (localStorage) + Supabase `game_state` JSON kolonu |

---

## 👥 Karakterler & Müfredat

| Karakter | Ders | Detay Seviyesi | Karakter Özeti |
|---|---|---|---|
| 🇹🇷 **Mustafa Kemal Atatürk** | T.C. İnkılap Tarihi | `full` | Vakur ama sıcak; Kurtuluş Savaşı'nı hikâyelerle anlatır |
| 🧮 **Cahit Arf** | Matematik | `full` | Oyunbaz, "matematik bir şiirdir" diyen tutkulu bilim insanı |
| 🧬 **Aziz Sancar** | Fen Bilimleri | `minimal` | Mütevazı Nobel ödüllü; DNA tamiri ve hayata bağlı bilim |
| 📜 **Yunus Emre** | Türkçe | `minimal` | Halk filozofu; kelimelerin kalbi ve şiirsel anlatım |
| 🕊️ **Mevlana** | Din Kültürü | `minimal` | Hoşgörü, kıssalar, evrensel insan değerleri |
| 🎭 **William Shakespeare** | İngilizce | `minimal` | Dramatik & oyuncu; Türkçe-İngilizce harmanlanmış öğretim |

> Karakter prompt'ları `lib/content/characters.ts` içinde; ortak kurallar (`SHARED_RULES`) hepsine inject edilir.

---

## 🛠️ Teknoloji Stack'i

### Frontend
- **Next.js 16.2.6** (App Router, Turbopack) — `node_modules/next/dist/docs/` içindeki kılavuza göre, bu sürümde geleneksel davranışların bazıları değişmiştir. Kod yazmadan önce ilgili dosyayı oku.
- **React 19.2** + TypeScript 5
- **Tailwind CSS 4** (`@tailwindcss/postcss`)
- **Framer Motion** — sayfa geçişleri ve mikro animasyonlar
- **D3.js 7** — Merak Ağacı (tree layout, zoom, drag)
- **Lucide React** — ikonografi
- **canvas-confetti** — doğru cevap kutlaması

### AI & İçerik
- **Google Gemini** (`@google/generative-ai`) — `gemini-2.0-flash-exp` veya benzeri; structured output (`responseSchema`) ile JSON garantisi
- **react-markdown + remark-math + rehype-katex** — konu anlatımlarında LaTeX formül desteği (`$...$`, `$...$`)
- **KaTeX 0.16** — matematiksel notasyon

### Backend & State
- **Supabase** (Auth + Postgres) — `lib/supabase/client.ts`, `auth.ts`, `types.ts`
- **Zustand 5** + `persist` middleware — global state + localStorage senkronu

---

## 🏗️ Mimari

```
┌──────────────────────────────────────────────────────────┐
│  Browser (Next.js App Router · /chat)                    │
│  ┌──────────────┐  ┌────────────┐  ┌──────────────────┐ │
│  │  ChatCard    │  │CuriosityTree│  │  MufredatView    │ │
│  └──────┬───────┘  └──────┬─────┘  └────────┬─────────┘ │
│         │                 │                 │            │
│         │       ┌─────────▼──────────┐      │            │
│         └──────▶│  useGameStore       │◀────┘            │
│                 │  (Zustand + persist)│                   │
│                 └─────┬───────────┬───┘                   │
└───────────────────────│───────────│───────────────────────┘
                        │ POST      │ saveGameState()
                        ▼           ▼
              ┌─────────────────┐  ┌──────────────────┐
              │ /api/chat       │  │  Supabase        │
              │ (Gemini call +  │  │  (Auth, profiles,│
              │  LGS injection) │  │   game_state)    │
              └────────┬────────┘  └──────────────────┘
                       │
                       ▼
              ┌──────────────────┐
              │  Google Gemini   │
              │  (structured     │
              │   JSON output)   │
              └──────────────────┘
```

### Chat API Sözleşmesi

**Request** — `POST /api/chat`
```json
{
  "characterId": "cahit_arf",
  "classLevel": 8,
  "history": [{ "role": "user", "content": "..." }],
  "userMessage": "EBOB nedir?"
}
```

**Response** (Gemini `responseSchema` ile zorlanmış)
```json
{
  "answer": "Düşün şimdi, iki sayının ortak çarpanları...",
  "followUpQuestions": ["...", "...", "..."],
  "shouldInjectLgsQuestion": false,
  "suggestedLgsQuestionId": null
}
```

> `shouldInjectLgsQuestion=true` olduğunda server `pickQuestionForCharacter()` ile uygun LGS sorusunu seçer ve `suggestedLgsQuestionId` döner.

---

## 🚀 Hızlı Başlangıç

### Gereksinimler
- **Node.js 20+**
- **npm** (veya pnpm/yarn/bun)
- **Gemini API key** — [aistudio.google.com](https://aistudio.google.com/app/apikey)
- **Supabase projesi** (opsiyonel ama auth için gerekli) — [supabase.com](https://supabase.com)

### Kurulum

```bash
# 1. Bağımlılıklar
npm install

# 2. Ortam değişkenleri (aşağıdaki bölüme bak)
cp .env.example .env.local
# .env.local'i kendi key'lerinle doldur

# 3. Dev server
npm run dev
```

Tarayıcıda **[http://localhost:3000](http://localhost:3000)** aç.

### Scriptler

```bash
npm run dev      # Next dev (Turbopack)
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

---

## 🔐 Ortam Değişkenleri (`.env.local`)

```env
# Gemini AI
GEMINI_API_KEY=your_gemini_key_here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

> **Not:** `GEMINI_API_KEY` server-side kullanılır (`/api/chat`); `NEXT_PUBLIC_*` ön ekliler client'a expose edilir.

### Supabase Tabloları

`profiles` tablosu için minimal şema:

```sql
create table public.profiles (
  id uuid references auth.users not null primary key,
  username text unique not null,
  class_level int2 check (class_level between 5 and 8),
  game_state jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "users read own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "users update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "users insert own profile"
  on public.profiles for insert with check (auth.uid() = id);
```

---

## 📂 Proje Yapısı

```
edtech/
├── app/
│   ├── api/
│   │   ├── chat/route.ts          # Gemini proxy + LGS enjeksiyon mantığı
│   │   └── test/route.ts          # Gemini smoke test endpoint
│   ├── chat/page.tsx              # ANA SAYFA — sidebar + tüm görünümler
│   ├── login/page.tsx             # Supabase auth (email + parola)
│   ├── register/page.tsx          # Kayıt (kullanıcı adı + sınıf)
│   ├── onboarding/page.tsx        # 4 adımlı karşılama wizard
│   ├── layout.tsx                 # Fontlar, KaTeX CSS, AuthBootstrap
│   ├── globals.css                # Tailwind + topic-md prose stilleri
│   └── page.tsx                   # Root redirect (login | chat)
│
├── components/
│   ├── ChatCard.tsx               # Sohbet UI + takip soru butonları
│   ├── CuriosityTree.tsx          # D3.js Merak Ağacı (zoom, fullscreen)
│   ├── MufredatView.tsx           # 3-seviye drill: Subject → Unit → Detail
│   ├── TopicMarkdown.tsx          # ReactMarkdown + KaTeX renderer
│   ├── LgsQuestionCard.tsx        # LGS soru kartı (4 şıklı, konfeti)
│   ├── ScorePanel.tsx             # Skor / streak / XP paneli
│   ├── FriendList.tsx             # Lig + arkadaş listesi
│   ├── CalendarView.tsx           # 2026 ders/sınav takvimi
│   ├── DailyChallenge.tsx         # Günlük görev kartı
│   ├── TasksCard.tsx              # Görev listesi
│   ├── NotificationsDrawer.tsx    # Bildirimler
│   └── AuthBootstrap.tsx          # Sayfa açılışında Supabase session restore
│
├── lib/
│   ├── content/
│   │   ├── characters.ts          # 6 karakter persona + system prompt
│   │   ├── adventures.ts          # Macera senaryoları (Kurtuluş Savaşı vb.)
│   │   ├── mufredat.ts            # 6 ders müfredatı (markdown + LaTeX)
│   │   ├── lgs-questions.ts       # LGS soru bankası
│   │   └── fake-friends.ts        # Demo arkadaş skoru
│   ├── gemini/
│   │   ├── client.ts              # Gemini SDK init
│   │   └── buildPrompt.ts         # systemInstruction + history builder
│   ├── store/
│   │   ├── useGameStore.ts        # Zustand store (persist, tree, score)
│   │   └── useSupabaseSync.ts     # Cloud senkron hook
│   ├── supabase/
│   │   ├── client.ts              # Supabase client
│   │   ├── auth.ts                # signIn, signUp, signOut, profile fetch
│   │   └── types.ts               # ProfileRow, ProfileGameState
│   └── types/index.ts             # Paylaşılan TypeScript tipleri
│
├── public/                        # Statik varlıklar
├── docs/                          # Tasarım notları
├── plan.md                        # Hackathon orijinal planı
├── mufredat.md                    # Müfredat içerik referansı
├── AGENTS.md                      # AI agent talimatları
├── CLAUDE.md                      # Claude-spesifik proje notları
└── package.json
```

---

## 🔄 Veri Akışı (Chat → Ağaç → LGS)

1. **Kullanıcı mesaj yazar** → `ChatCard` → `POST /api/chat`
2. **Server** `characters.ts`'den persona + `adventures.ts`'den senaryo alır → `buildSystemInstruction()` ile Gemini'ye system prompt verir
3. **Gemini** structured output ile `{ answer, followUpQuestions, shouldInjectLgsQuestion }` JSON döner
4. **Server** `shouldInjectLgsQuestion=true` ise `pickQuestionForCharacter()` ile LGS sorusu seçer
5. **Client** `useGameStore.ingestChatTurn()` çağırır:
   - `root` yoksa kullanıcının ilk sorusu root olur
   - Yeni `opened` düğüm + 3 `suggested` düğüm ağaca eklenir
   - `score.nodesOpened` artar
6. **D3** ağaç layout'unu yeniden hesaplar, animasyonla yeni düğümler eklenir
7. **LGS injekte edildiyse** `LgsQuestionCard` modal'ı açılır; doğru cevap → konfeti + `addLgsCorrectNode` (altın yıldız ağaca eklenir)
8. **Supabase sync** `saveGameState()` ile `profiles.game_state` JSON kolonu güncellenir

---

## 🧩 Önemli Bileşenler

### `useGameStore` (`lib/store/useGameStore.ts`)

Tüm uygulama state'inin merkezi. Önemli action'lar:

- `loadFromProfile(profile)` — login sonrası Supabase profilinden state'i yükler
- `ingestChatTurn(userMsg, response)` — sohbet turunu ağaca işler
- `addStarred(content)` — çocuğun kendi yazdığı soruyu `starred` düğüm olarak ekler
- `addLgsCorrectNode(question)` — LGS doğru cevap için altın yıldız düğüm
- `markUnitStudied(unitId)` — müfredat ünitesini "çalışıldı" olarak işaretler
- `signOutLocal()` — local state'i temizler
- `onRehydrateStorage` hook'u, eski bug'dan kalma orphan root'ları temizler

### `MufredatView` (`components/MufredatView.tsx`)

3 seviyeli drill-down:
1. **SubjectGrid** — 6 ders kartı (progress circle, "sıradaki" gösterge, "Devam et" / "Müfredatı Gör")
2. **UnitList** — seçili dersin üniteleri (yapılan üniteler yeşil rozetle)
3. **UnitDetail** — konuların `TopicMarkdown` ile render edilmiş zengin anlatımları + "Hocamla çalış" CTA

### `CuriosityTree` (`components/CuriosityTree.tsx`)

D3 tree layout + zoom + drag. Tam ekran modu, düğüm tipine göre renk kodlaması:
- 🟡 root (kullanıcının başlangıç sorusu)
- 🔵 opened (cevaplanmış sorular)
- ⚪ suggested (AI'ın önerdiği takip soruları — tıklayınca otomatik soru atar)
- 🌸 starred (çocuğun kendi yazdığı sorular)
- 🟢 lgs_correct (doğru cevaplanmış LGS soruları)

### `TopicMarkdown` (`components/TopicMarkdown.tsx`)

```tsx
<ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
  {content}
</ReactMarkdown>
```

`.topic-md` CSS class'ı `app/globals.css` içinde tanımlı; başlıklar, listeler, tablolar, blockquote ve KaTeX formülleri için prose stili.

> **LaTeX kullanım notu:** TypeScript string'lerinde tüm LaTeX backslash'leri iki katına çıkar: `\\frac`, `\\sqrt`, `\\pi`, `\\times`. Inline: `$x^2$`, block: `$$\\frac{a}{b}$$`.

---

## 🧪 Geliştirme Notları

### Next.js 16 Uyarısı
> Bu, bildiğin Next.js değil. API'ler, conventions ve dosya yapısı eğitim verisinden farklı olabilir. Yeni kod yazmadan önce `node_modules/next/dist/docs/` içindeki ilgili kılavuzu oku.

### Karakter Sesini Korumak
`SHARED_RULES` her karaktere inject edilir; ama her karakterin **kendi sesi** öncelikli olmalı. Yeni karakter eklerken:
1. `lib/content/characters.ts` içine kayıt aç
2. `lib/types/index.ts` içindeki `CharacterId` union'a ekle
3. `lib/content/lgs-questions.ts` içinde o derse ait sorular olduğundan emin ol
4. `components/MufredatView.tsx` içindeki `GUIDE_NAME` map'ine ekle

### LGS Sorusu Eklemek
`lib/content/lgs-questions.ts` içinde `LgsQuestion` tipine uygun yeni kayıt aç. `pickQuestionForCharacter()` characterId'ye göre filtreler.

### Müfredat İçeriği
`lib/content/mufredat.ts` — her topic'in `explanation` alanı markdown + LaTeX destekler. Yeni konu eklerken zengin içerik için:
- **Tanım** → `**Tanım:**` 
- **Formül** → `$$E = mc^2$$`
- **Örnek** → `> **Örnek:** ...`
- **Sınav ipucu** → `**Sınav İpucu:** ...`

---

## 🗺️ Yol Haritası

- [x] 6 karakter persona + Gemini structured output
- [x] Merak Ağacı (D3, zoom, fullscreen)
- [x] LGS soru bankası + enjeksiyon mantığı
- [x] Supabase auth + cloud sync
- [x] Müfredat tarayıcı (3 seviye + KaTeX)
- [x] Lig & sahte arkadaş simülasyonu
- [x] Takvim & günlük görevler
- [ ] **Forum** — Öğrencilerin soru paylaşıp birbirine yardım ettiği, dahilerle topluca sohbet edebileceği topluluk alanı
- [ ] **Kurum & Öğrenci Takip Sistemi** — Okullar tüm öğrencilerin ilerlemesini tek panelden izleyebilecek
- [ ] **Veli & Öğrenci Takip Sistemi** — Veliler çocuklarının günlük çalışma raporlarını anlık görebilecek
- [ ] Sesli mesajlaşma (Gemini Live API)
- [ ] Avatar karakterleri animasyonlu (Lottie)
- [ ] Tüm 6 dersin müfredat içeriği tamamlanması (şu an Matematik ve Türkçe zengin; diğerleri özet)
- [ ] PWA + offline mode

---

## 🤝 Katkı & Lisans

Bu proje açık kaynaklı bir hackathon çıktısıdır. PR'lar memnuniyetle karşılanır.

**Geliştiriciler:**
- 🧑‍💻 [BatuhanbasSwe](https://github.com/BatuhanbasSwe) — Backend, AI, içerik
- 🧑‍💻 [gorkemgoksu](https://github.com/gorkemgoksu) — Frontend, UI/UX, D3

**Lisans:** MIT

---

<p align="center">
  <i>"Bir öğretmeni veriyle değiştiremezsin — ama her çocuğa Atatürk'le sohbet etme şansı verebilirsin."</i>
</p>
