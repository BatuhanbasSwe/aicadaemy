# 🧭 LGS Kâşifi — Pitch Deck (5 Slayt)

> Demo: 3 dakika 30 saniye. Slayt başına ~40 saniye. Live demo aralarda.
> Konuşmacı notları her slaytın altında **🎤** ile işaretli.

---

## Slayt 1 — Problem

### "1.2 milyon çocuk. Bir sınav. Eşit olmayan bir başlangıç."

- 🇹🇷 Her yıl **1.2 milyon** ortaokul öğrencisi LGS'ye giriyor
- 💸 Aile başına ortalama yıllık özel ders / kurs maliyeti: **30.000 – 90.000 ₺**
- 😴 Çocuklar test çözmekten **sıkılıyor** — merak öldükçe öğrenme de ölüyor
- 🌍 Köyde, ilçede, mahallede oturan çocukla şehirde özel ders alan çocuk **aynı sınava** giriyor

> **🎤 "Türkiye'de her yıl 1.2 milyon çocuk LGS'ye giriyor. Aileler özel kurslara servet ödüyor. Çocuklar sıkılıyor. Biz dedik ki: ya bu çocuğun yanında Atatürk olsa? Ya arkadaşlarıyla yarışsa?"**

---

## Slayt 2 — Çözüm

### "LGS Kâşifi"
#### Türk dahileri ile sohbet ederek çalışmak.

| Ders | Rehber |
|------|--------|
| 🧮 Matematik | **Cahit Arf** |
| 🇹🇷 İnkılap Tarihi | **Atatürk** |
| 🔬 Fen | **Aziz Sancar** |
| 📜 Türkçe | **Yunus Emre** |
| 🕊️ Din Kültürü | **Mevlana** |
| 🎭 İngilizce | **Shakespeare** |

- 🌳 **Merak Ağacı:** çocuğun her sorusu görsel bir keşif dalına dönüşür
- 📝 **Gerçek MEB LGS soruları** macera arasına doğal akışla gömülür
- 🤝 **Arkadaşlarla rekabet:** liderlik tablosu, davet kodu, viral büyüme
- 💰 **Tamamen ücretsiz.** Kursa parası olmayan her çocuğa erişim eşitliği

> **🎤 "AI destekli tek bir karakter, çocukla 1-e-1 sohbet eder, kendi merak ettiği sorulardan yola çıkar, MEB müfredatına bağlı kalır ve oyunlaştırmayla yapay zekânın gücünü çocuğun cebine sokar."**

---

## Slayt 3 — Demo (LIVE)

> *(Bu slaytta sadece bir QR kod ve başlık var — perde projektöre canlı uygulama yansıtılır.)*

**Canlı demo akışı (2 dk):**

1. **Karşılama** (10 sn): "Mert" → 8. sınıf → İnkılap → Atatürk seçimi
2. **Sohbet + Merak Ağacı** (40 sn): Atatürk "1919 Samsun'a çıktım..." → çocuk soru sorar → ağaca düğüm büyür → sarı "?" butonlarına tıklar → ağaç dallanır → çocuk **kendi sorusunu** yazar → 🩷 pembe yıldız!
3. **LGS Sorusu** (30 sn): "Bunu pekiştirelim, 2023 LGS'sinden bir soru..." → 4 şık → doğru cevap → 🎉 konfeti
4. **🔥 Arkadaş Rekabeti** (30 sn): sağ panelde "Ayşe: 12 düğüm, Sen: 9 düğüm 🥈" → üst banner "Ayşe seni geçti! 3 düğüm fazla açmış 🚀" → demo'da yeni bir soru aç → sıra değişir
5. **Wow anı** (10 sn): Merak Ağacı tam ekran — Samsun'dan Sakarya'ya bir keşif haritası

> **🎤 "Şimdi sahnede ne olduğunu birlikte göreceğiz. 5 dakikada bu çocuk yalnız başına yapamayacağı bir şey yapacak: bir merak haritası çıkaracak."**

> **🛟 Backup:** Canlı demo bozulursa `./backup-demo.mp4` videosu hazır.

---

## Slayt 4 — Teknik Mimari

```
┌────────────────────────────────────────────────────────────────┐
│                    👶 Çocuk (Tarayıcı)                          │
│                                                                 │
│  Next.js 16 App Router  +  Tailwind  +  TypeScript             │
│  React 19 + Zustand (state + localStorage persist)             │
│  D3.js (Merak Ağacı) + Framer Motion + canvas-confetti         │
└─────────────────────────────┬───────────────────────────────────┘
                              │ POST /api/chat
                              ▼
┌────────────────────────────────────────────────────────────────┐
│              ⚡ Vercel Edge — Next.js API Route                  │
│                                                                 │
│  • 6 karakter persona sistem prompt'u                          │
│  • Macera context inject (milestone'lar)                       │
│  • Gemini 2.5 Flash + responseSchema (structured output)       │
│  • LGS sorusu seçimi (subject + history bazlı)                 │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
                  🤖 Google Gemini 2.5 Flash
              (JSON: answer, followUpQs[3], shouldInject)

📦 Sahte Arkadaş Modu: Supabase entegrasyonu hazır — demo'da
   rate-limit'e takılmamak için lokal simülasyon (üretim: Supabase RLS)
```

**Neden bu yığın:**
- **Gemini structured output** → parse hatası riski **sıfır**, UI direkt JSON tüketir
- **localStorage persist** → hesap açmadan da çalışır, demo barrier yok
- **Edge route** → sıfır cold-start, demo'da takılma yok

> **🎤 "Yapay zekânın çıktısını JSON şemasına zorluyoruz; bu sayede 'AI saçmaladı, UI patladı' diye bir senaryo yok. Karakter ne kadar yaratıcı olursa olsun, biz onun cevabını her zaman aynı şekilde parse edebiliyoruz."**

---

## Slayt 5 — Vizyon & Viral Büyüme

### Yarın

- 📲 **3 arkadaş daveti = organik viral büyüme**
  Her aktif çocuk ortalama 3 arkadaş davet ederse, **CAC ≈ 0**
- 👨‍👩‍👧 **Veli paneli:** çocuğun bugün hangi konuyu, ne kadar çalıştığı, hangi sorularda zorlandığı
- 🏫 **MEB / okul entegrasyonu:** öğretmen sınıfının ortak Merak Ağacı'nı görür
- 🎯 **Adaptif zorluk:** çocuğun yanlışlarına göre seviye otomatik ayarlanır
- 🌐 **YKS ve AYT'ye genişleme:** lise + üniversite hazırlık için aynı motor

### Sosyal etki

> "Köydeki çocukla, özel ders alan şehir çocuğu aynı sınava giriyor.
> LGS Kâşifi onların **arasındaki çukura küçük bir köprü** atmak için var."

### Şu an

✅ MVP çalışıyor: 6 karakter, 2 detaylı macera, 5 LGS sorusu, sohbet, Merak Ağacı, arkadaş rekabeti
🔜 Yarın: Supabase entegrasyonu, veli paneli, sınıf modu

> **🎤 "6 ders, 6 Türk dahisi. Gerçek MEB LGS soruları. Arkadaşlarla rekabet. Kursa parası olmayan her çocuk için tamamen ücretsiz. Bu sadece başlangıç. Teşekkürler."**

---

## 🎬 Konuşmacı Notları (Pano)

- **Hook'u ezberle**, ilk 20 saniye en kritik
- Demo'ya geçmeden **"şimdi sahneye veriyoruz"** demek dramatik momentum yaratır
- Arkadaş rekabeti slaytında **mutlaka** "her çocuk 3 arkadaş davet ederse" cümlesini söyle — viral büyüme jüriye satılır
- Kapanışta **göz kontağı** kur, hızlı bitir
- Sorulara hazırlık:
  - "Soru veritabanı nasıl büyür?" → MEB açık arşivi + öğretmenlerden katkı paneli (roadmap)
  - "Gemini'nin uydurması ne olur?" → structured output + ileride RAG (MEB ders kitapları)
  - "Çocuğun mahremiyeti?" → KVKK + ebeveyn izni, veriler localStorage (demo'da)
  - "Monetizasyon?" → freemium (temel ücretsiz, premium analitik/kurs entegrasyonu)
