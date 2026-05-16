# 🧭 LGS Kâşifi — Hackathon Proje Planı

> **Tema:** Eğitim Teknolojileri
> **Süre:** 1 gün (~16 efektif saat)
> **Takım:** 2 kişi
> **Hedef Kitle:** Ortaokul 5-8. sınıf, özellikle 8. sınıf (LGS odaklı)

---

## 🎯 Konsept (Asansör Konuşması)

**LGS Kâşifi**, Türk tarihinden ve biliminden dahileri (Atatürk, Cahit Arf, Aziz Sancar, Mevlana, Yunus Emre, Shakespeare) ortaokul öğrencisinin kişisel öğretmenine dönüştüren AI destekli bir LGS hazırlık platformudur. Karakter çocukla **interaktif macera** kurar, çocuğun sorduğu her soru görsel bir **"Merak Ağacı"na** dönüşür ve macera arasına **gerçek MEB LGS çıkmış soruları** gömülür. Çocuk hem keyif alır hem sınava hazırlanır.

---

## 🧠 Alınan Stratejik Kararlar (UNUTMA!)

- [x] **Hedef kitle:** Sadece ortaokul (5-8. sınıf), demo 8. sınıfa odaklı
- [x] **Müfredat:** MEB müfredatına bağlı (LGS odaklı)
- [x] **Adaptiflik:** Teknik altyapı tüm sınıfları destekliyor, UI/demo ortaokul estetiği
- [x] **6 rehber karakter:** Her LGS dersine bir tane (aşağıda detay)
- [x] **Showcase stratejisi:** 2 karakter (Atatürk + Cahit Arf) tam dolu, 4'ü minimal
- [x] **Gerçek LGS soruları kullanılacak** (MEB açık arşivinden)
- [x] **Wow faktörü:** Merak Ağacı görselleşmesi (D3.js)
- [x] **Sosyal/Rekabet özelliği:** Arkadaş ekle + karşılaştırma + liderlik tablosu (Supabase backend)
- [x] **Jüri stratejisi:** Yenilikçi fikir + sosyal etki (kursa erişim eşitsizliği) + viral büyüme (arkadaş daveti)

### 👥 6 Rehber - Ders Eşleşmesi

| Ders | Rehber | Detay Seviyesi |
|------|--------|---------------|
| 🧮 Matematik | **Cahit Arf** | 🟢 Tam (showcase) |
| 🇹🇷 T.C. İnkılap Tarihi | **Atatürk** | 🟢 Tam (showcase) |
| 🔬 Fen Bilimleri | **Aziz Sancar** | 🟡 Minimal |
| 📜 Türkçe | **Yunus Emre** | 🟡 Minimal |
| 🕊️ Din Kültürü | **Mevlana** | 🟡 Minimal |
| 🎭 İngilizce | **Shakespeare** | 🟡 Minimal |

---

## 👥 Rol Bölümü (2 Kişi)

### 🧑‍💻 Kişi A — Frontend & UX
- Tüm React/Next.js UI iskelet ve bileşenleri
- Sohbet ekranı, karşılama akışı, skor paneli
- Merak Ağacı görselleştirme (D3.js)
- UI cilası, animasyonlar, çocuk dostu estetik
- Demo provası

### 🧑‍💻 Kişi B — Backend & AI & İçerik
- Gemini API entegrasyonu, structured JSON output
- 6 karakter persona prompt'ları
- 2 macera senaryosu
- 5 LGS sorusunun JSON formatı
- LGS sorusu enjeksiyon mantığı
- **Supabase backend kurulumu (arkadaş + liderlik tablosu için)**
- Pitch deck

> İkisi de state yönetimi ve testte birlikte çalışır.

---

## ⏰ Saat-Saat Plan (Toplam 16 Saat)

### 🌅 Faz 0 — Kurulum (Saat 0–1)
- **A & B birlikte:** Proje iskeleti, repo, Vercel, Gemini API testi, klasör yapısı kararı

### 📝 Faz 1 — İçerik Temeli (Saat 1–3)
- **A:** Karşılama akışı (sınıf/ders/rehber seçimi) UI iskeleti
- **B:** 6 karakter persona prompt'ları + 2 macera senaryosu + 5 LGS sorusu derleme

### 💬 Faz 2 — Core Chat MVP (Saat 3–7)
- **A:** Sohbet UI (mesaj balonları, takip soru butonları, input)
- **B:** Gemini chat API route + structured JSON output + state yönetimi

### 🌳 Faz 3 — Merak Ağacı (Saat 7–11)
- **A:** D3.js ile ağaç render, animasyonlu büyüme, düğüm tıklama
- **B:** Ağaç state'i, düğüm tipleri (opened/suggested/starred), localStorage persistence

### 🎯 Faz 4 — LGS Soruları (Saat 11–12.5)
- **A:** Çoktan seçmeli soru kartı UI, skor paneli, geri bildirim animasyonu
- **B:** LGS sorusu enjeksiyon mantığı, doğru/yanlış akışı

### 🤝 Faz 4.5 — Arkadaş & Rekabet (Saat 12.5–14.5) [YENİ]
- **B:** Supabase kurulumu, kullanıcı tablosu, arkadaşlık tablosu, REST endpoint'ler
- **A:** Davet kodu üretme UI, "Arkadaş Ekle" butonu, arkadaş listesi yan paneli, mini liderlik tablosu
- **Birlikte:** Skor senkronizasyonu (lokal değişiklik → Supabase'e push)

### ✨ Faz 5 — Polish & Demo (Saat 14.5–15.5)
- **A:** UI son cila — renkler, emojiler, mikro-animasyonlar (sıkıştırılmış)
- **B:** Pitch deck (5 slayt)

### ✅ Faz 6 — Verifikasyon (Saat 15.5–16)
- **A & B birlikte:** End-to-end test (2 hesap aç, arkadaş ekle, kıyasla), edge case, production deploy, demo provası

---

## ✅ Detaylı Görev Listesi

### 🟦 Faz 0 — Kurulum

#### Görev 1: Proje iskeletini kur
- [x] Next.js 14 (App Router) + TypeScript projesi oluştur
- [x] TailwindCSS kur ve test et
- [ ] GitHub repo aç, ilk commit
- [ ] Vercel'e bağla, boş deploy başarılı olsun
- [x] Google AI Studio'dan Gemini API key al
- [x] `.env.local` dosyası + `.env.example` ekle
- [ ] Vercel'e ortam değişkenlerini de gir
- [x] `/api/test` route ile Gemini "merhaba" testi yap
- [x] Klasör yapısı oluştur: `/app`, `/components`, `/lib/gemini`, `/lib/content`, `/lib/types`, `/lib/store`
- [x] `lib/types/index.ts` içinde temel TypeScript tipleri (Character, Adventure, TreeNode, LgsQuestion, ChatMessage)

---

### 🟪 Faz 1 — İçerik Temeli (Paralel)

#### Görev 2: 6 karakter persona sistem prompt'larını yaz _(Batuhan)_
- [ ] `/lib/content/characters.ts` dosyasını oluştur
- [ ] **Atatürk** persona (detaylı, 200+ kelime, ses tonu, dönem, hitap)
- [ ] **Cahit Arf** persona (detaylı, matematik aşkı, mizah)
- [ ] **Aziz Sancar** persona (minimal)
- [ ] **Yunus Emre** persona (minimal)
- [ ] **Mevlana** persona (minimal)
- [ ] **Shakespeare** persona (minimal, İngilizce-Türkçe karışık)
- [ ] Her karaktere ait: ad, ders, avatar emoji, gradient renk, başlangıç selamlaması
- [ ] Tüm prompt'larda ortak bir "8. sınıf öğrencisiyle konuşuyorsun, kısa cevap ver" yönergesi

#### Görev 3: 2 detaylı macera senaryosu hazırla _(Batuhan)_
- [ ] `/lib/content/adventures.ts` dosyasını oluştur
- [ ] **Atatürk → Kurtuluş Savaşı** macerası: opening, 3-5 milestone, LGS soru noktaları
- [ ] **Cahit Arf → Geometride Bir Bulmaca** macerası: opening, milestone'lar
- [ ] Her macera için JSON şema: `{id, characterId, mebUnit, openingPrompt, milestones[], lgsQuestionTriggers[]}`
- [ ] Diğer 4 karakter için iskelet (1 satırlık opening yeter)

#### Görev 4: 5 gerçek MEB LGS sorusunu derle _(Batuhan)_
- [ ] MEB ÖSYM/AÖGM açık arşivinden geçmiş yıl LGS sorularını bul (2022/2023/2024)
- [ ] 3 matematik sorusu seç (kolay/orta/zor karışık)
- [ ] 2 inkılap tarihi sorusu seç
- [ ] `/lib/content/lgs-questions.json` formatına çevir
- [ ] Her soru: `{id, year, subject, unit, difficulty, question, options[4], correctIndex, explanation}`
- [ ] Telif/kaynak notları yorum satırı olarak ekle

---

### 🟩 Faz 2 — Core Chat MVP

#### Görev 5: Karşılama akışı (sınıf + ders + rehber seçimi) ✅ _Görkem_
- [x] `/app/onboarding/page.tsx` 4 adımlı wizard
- [x] Adım 1: kullanıcı adı + "Kaçıncı sınıftasın?" — 5/6/7/8 kartları
- [x] Adım 2: 6 ders kartı (emoji + isim)
- [x] Adım 3: Seçilen derse uygun rehber kartı (avatar + tek cümle tanıtım)
- [x] Adım 4: Davet kodu + "Maceraya Başla!" butonu → `/chat` sayfasına yönlendirir
- [x] Seçimler localStorage'a yaz (Zustand persist ile)
- [x] `KAS-XXXXXX` davet kodu üretimi

#### Görev 6: Gemini chat API route _(Batuhan)_
- [ ] `/app/api/chat/route.ts` POST endpoint
- [ ] Body: `{characterId, classLevel, history[], userMessage}`
- [ ] Karakter persona + sınıf seviyesi sistem prompt'a inject
- [ ] Gemini `responseSchema` ile yapısal JSON zorla:
  ```
  { answer: string,
    followUpQuestions: [3 string],
    shouldInjectLgsQuestion: boolean,
    suggestedLgsQuestionId: string | null }
  ```
- [ ] Hata yönetimi (rate limit, parse fail, timeout)
- [ ] Loglar ekle (debug için)

#### Görev 7: Sohbet UI ✅ _Görkem_
- [x] `/app/chat/page.tsx` ana sohbet sayfası (sidebar + dashboard shell)
- [x] Sol: karakter avatar + balon, Sağ: kullanıcı balonu
- [x] Karakter cevabı altında 3 sarı "?" buton (takip soruları)
- [x] Altta serbest input + "Sen ne merak ediyorsun?" placeholder
- [x] Mesaj gönderme akışı + loading state ("Karakter düşünüyor...")
- [x] API hazır olmadığında karakter'e özel stub yanıt
- [ ] Streaming (zaman kalırsa, opsiyonel)

#### Görev 8: State yönetimi ✅ _(Batuhan — hazır teslim edildi)_
- [x] Zustand store kur (`/lib/store/useGameStore.ts`)
- [x] Tree state: `nodes[]` (id, parentId, type, content)
- [x] Conversation history
- [x] LGS score: `{answered, correct, byDifficulty}`
- [x] localStorage persistence (zustand/middleware/persist)
- [x] Her cevap döndüğünde yeni "opened" düğüm + 3 "suggested" düğüm eklenir

---

### 🟨 Faz 3 — Merak Ağacı

#### Görev 9: Ağaç görselleştirme (D3.js) ✅ _Görkem_
- [x] D3.js kur (`npm i d3 @types/d3`)
- [x] `/components/CuriosityTree.tsx` bileşeni
- [x] D3 `tree` layout ile pozisyon hesapla
- [x] SVG render: düğümler (circle), dallar (path)
- [x] Düğüm renkleri:
  - [x] 🟡 Altın = root (başlangıç sorusu)
  - [x] 🔵 Mavi = opened (keşfedilen)
  - [x] 🟨 Sarı kesikli = suggested (henüz açılmamış)
  - [x] 🩷 Pembe yıldız = starred (çocuğun kendi sorusu)
  - [x] 🟢 Yeşil = lgs_correct (doğru çözülen LGS)
- [ ] Bugünkü patika için kalın yol vurgusu
- [x] Yeni düğüm eklendiğinde React re-render ile güncelleme
- [x] Düğüme tıklama: suggested → sohbete gönderilir + promoteSuggested çağrılır

#### Görev 10: Ağaç-Sohbet etkileşimi ✅ _Görkem_
- [x] Sarı "suggested" düğüme tıklama → o soru sohbete gönderilir → mavi olur
- [x] Çocuğun input'tan yazdığı soru → pembe yıldız olarak yeni dal
- [ ] Eski düğümlere tekrar tıklayınca "bu konuyu hatırla" akışı
- [x] Mobile responsive (bottom nav + responsive grid)

---

### 🟧 Faz 4 — LGS Soruları

#### Görev 11: LGS sorusu enjeksiyonu + UI ✅ _Görkem_
- [x] Karakter cevabında `shouldInjectLgsQuestion=true` gelirse soruyu sohbete bas
- [x] `/components/LgsQuestionCard.tsx`: yıl/ünite etiketi, soru, 4 şık radio, "Cevapla"
- [x] Doğru cevap → konfeti + tree'ye altın yıldız düğüm
- [x] Yanlış cevap → açıklama balonu göster
- [x] Cevap sonrası skor store'a yaz

#### Görev 12: Skor & ilerleme paneli ✅ _Görkem_
- [x] `/components/ScorePanel.tsx` — sağ panelde sabit
- [x] "Bugün: X düğüm, Y LGS sorusu (Z doğru)"
- [x] Doğruluk yüzdesi ring chart
- [x] Davet kodu kopyala butonu
- [x] "Yol haritamızda: veli paneli" küçük not (sunum kartı)

---

### 🤝 Faz 4.5 — Arkadaş & Rekabet [YENİ]

#### Görev 13: Supabase backend kurulumu _(Batuhan)_
- [ ] Supabase'de yeni proje aç (ücretsiz tier)
- [ ] `users` tablosu: `id, username, classLevel, inviteCode, createdAt`
- [ ] `friendships` tablosu: `userId, friendId, createdAt` (çift yönlü ekle)
- [ ] `user_stats` tablosu: `userId, nodesOpened, lgsAnswered, lgsCorrect, lastActiveAt, streak`
- [ ] Row-Level Security: minimal (sadece arkadaşlar birbirini okuyabilir)
- [ ] `npm i @supabase/supabase-js` ekle
- [ ] `.env.local`'a Supabase URL + anon key
- [ ] `/lib/supabase/client.ts` ile global istemci

#### Görev 14: Kullanıcı kaydı + davet kodu _Görkem_
- [x] Karşılama akışına "Kullanıcı adın?" adımı ekle (en başta)
- [x] Kayıt olunca 6 karakterlik benzersiz davet kodu üret (örn: `KAS-7X9Q`)
- [ ] Kullanıcı bilgisini Supabase'e kaydet _(Batuhan)_
- [x] Profil sayfasında "Senin kodun: KAS-7X9Q [Kopyala]" göster

#### Görev 15: "Arkadaş Ekle" akışı _Görkem_
- [x] Arkadaş listesi içinde "+ Arkadaş Ekle" butonu
- [x] Modal: "Arkadaşının kodunu gir" input + "Ekle" butonu
- [ ] Kod geçerli mi kontrol et (Supabase query) _(Batuhan entegrasyonu)_
- [ ] `friendships` tablosuna çift yönlü kayıt ekle _(Batuhan)_
- [x] "Eklendi! 🎉" toast

#### Görev 16: Arkadaş listesi + mini liderlik tablosu _Görkem_
- [x] Sağ kenardaki ScorePanel'in altına "👥 Arkadaşlarım" kartı
- [x] Her arkadaş için satır: avatar, kullanıcı adı, bugünkü düğüm sayısı, LGS doğru sayısı
- [x] Senin satırın highlighted (mavi çerçeve)
- [x] Sıralama: bugünkü puana göre (düğüm + doğru × 2)
- [x] "🏆 1." rozeti birinciye (Crown icon)
- [x] Her 30 saniyede bir refresh (polling — setInterval simülasyonu)

#### Görev 17: Karşılaştırma & motivasyon bildirimleri _Görkem_
- [x] Alt banner: "Bugün X seni Y puan ile geçti! Sen de aç 🚀"
- [ ] LGS sorusu doğru çözüldüğünde: "Bu soruyu X de çözmüştü" (opsiyonel)
- [ ] Skor değişince Supabase'e push _(Batuhan entegrasyonu)_
- [x] Lokal skor + arkadaş skoru kıyaslama FriendList'te görünür

---

### 🟫 Faz 5 — Polish & Demo

#### Görev 18: UI Cilası _Görkem_
- [x] Karakter avatarları: gradient daire + initials (illüstrasyon gerek yok)
- [x] Framer Motion ile mesaj giriş animasyonları
- [x] Doğru LGS cevabı konfeti efekti (`canvas-confetti`)
- [x] "Karakter yazıyor..." 3 nokta animasyon
- [x] Renk paleti: paper/ink/brand/coral/mint/sky/sun (HTML tasarımından)
- [x] Mobile responsive temel düzey (bottom nav, responsive grid)
- [x] Karanlık mod GEREKMİYOR (zaman kaybetme)

#### Görev 19: Pitch Deck (5 slayt) _(Batuhan)_
- [ ] **Slayt 1 — Problem:** "Türkiye'de 1.2M çocuk LGS'ye giriyor, kurs ücretleri aileyi zorluyor, sıkıcı testler merakı öldürüyor"
- [ ] **Slayt 2 — Çözüm:** "LGS Kâşifi" + ekran görüntüsü + tek cümle
- [ ] **Slayt 3 — Demo:** Canlı demo (screenshot backup) — Merak Ağacı + Arkadaş Rekabeti
- [ ] **Slayt 4 — Teknik:** Next.js + Gemini structured output + D3 + Supabase realtime + mimari diyagram
- [ ] **Slayt 5 — Vizyon & Viral Büyüme:** "Her çocuk 3 arkadaşını davet ediyor → organik büyüme", veli paneli, MEB entegrasyon, sosyal etki
- [ ] `.pptx` dosyasına çıkar

---

### 🏫 Faz 7 — Kurum & Veli Entegrasyonu [GELECEK]

#### Görev 21: Veli Paneli & Kontrol
- [ ] Veli hesabı — çocuğun hesabıyla ebeveyn bağlantısı (davet linki ile)
- [ ] Veli dashboard: günlük aktif süre, açılan düğüm, LGS doğru/yanlış grafiği
- [ ] Veli onayıyla içerik filtresi — yasaklı kelime listesi (özelleştirilebilir)
- [ ] Veli bildirimi — çocuk X dakika üstüne geçince / LGS hedefini tutturunca
- [ ] Veli haftalık ilerleme raporu (mail/push)

#### Görev 22: Kurum / Dershane Entegrasyonu
- [ ] Kurum hesabı — dershane ve okullar için admin paneli
- [ ] Öğrenci kuruma davet sistemi (kurum kodu ile — öğrenci kurumuna katılır)
- [ ] Kurum dashboard: tüm öğrencilerin istatistikleri tek ekranda
  - [ ] Öğrenci başına: çözülen soru sayısı, yapılan etkinlikler, günlük aktif süre
  - [ ] Ders kırılımı: hangi derste ne kadar vakit geçirildi
  - [ ] Kurum bazlı liderlik tablosu
- [ ] Öğretmen hesabı — belirli öğrencilere görev atayabilir
- [ ] Kurum için özel karakter / persona (dershanenin logolu karakteri)

#### Görev 23: Forum & Topluluk (Filtreli)
- [ ] Konu bazlı forum — öğrenciler soru sorabilir (Matematik, Türkçe, İnkılap, vs.)
- [ ] Veli onaylı moderasyon — veli tanımladığı yasaklı kelimeler otomatik filtrelenir
- [ ] Rehber karakter forum sorularını yanıtlar (AI moderatör)
- [ ] Öğrenci birbirinin sorularını oylayabilir (gamification)
- [ ] Okul/dershane bazlı özel forum kanalları

#### Görev 24: OGM Materyal & Kitap Entegrasyonu
- [ ] MEB/OGM resmi ders kitaplarını sisteme yükle (PDF/dijital)
- [ ] Kitap sayfaları ile sohbet bağlantısı — rehber karakter ilgili sayfayı referans alır
- [ ] "Bu konu kitabın X. sayfasında geçiyor" yönlendirmesi
- [ ] Öğrenci kitap sayfasını okuyabilir, soru sorabilir
- [ ] OGM materyalleri ile LGS soruları eşleştirmesi (hangi kitap bölümünden çıkıyor)

---

### 🟥 Faz 6 — Verifikasyon

#### Görev 20: End-to-end test + deploy
- [ ] Temiz incognito tarayıcıda baştan akışı oyna
- [ ] Sınıf seç → Atatürk seç → 3 mesaj at → sarı düğüm aç → kendi soru yaz → LGS sorusu çıksın → şık seç → skor güncellensin
- [ ] Aynı akışı Cahit Arf ile bir kez daha
- [ ] **Arkadaş akışı testi:** 2 ayrı tarayıcıda hesap aç, kod ile ekle, biri 5 düğüm açsın, diğerinde liderlik tablosunda görünsün
- [ ] **Edge case'ler:**
  - [ ] Gemini timeout/hata → kullanıcıya nazik mesaj
  - [ ] JSON parse fail → retry veya fallback
  - [ ] Network kopması → mesaj kaybolmasın
  - [ ] Boş input → gönder butonu disabled
  - [ ] Geçersiz arkadaş kodu → hata mesajı
  - [ ] Aynı arkadaşı 2 kez ekleme → engelle
- [ ] Production'a son deploy
- [ ] **Demo provası:** 3 dakikalık akış 2 kere prova (arkadaş kıyasla anı dahil)
- [ ] Backup video kaydet (demo çökerse)

---

## 🎤 Demo Senaryosu (3 Dakika 30 Saniye)

**0:00–0:20 — Hook**
> "Türkiye'de her yıl 1.2 milyon çocuk LGS'ye giriyor. Aileler özel kurslara servet ödüyor. Çocuklar sıkılıyor. Biz dedik ki: ya bu çocuğun yanında Atatürk olsa? Ya arkadaşlarıyla yarışsa?"

**0:20–0:40 — Karşılama**
> Kullanıcı adı (Mert), sınıf (8), ders (İnkılap), rehber (Atatürk). Avatar + selam.

**0:40–1:20 — Sohbet + Merak Ağacı**
> Atatürk: "1919 Samsun'dayım, sen olsan ne yapardın?"
> Çocuk yanıt verir, ağaçta düğüm büyür, sarı "?" çıkar, birine tıklar, ağaç büyür.
> Çocuk kendi sorusunu yazar → pembe yıldız!

**1:20–2:00 — LGS Sorusu**
> Atatürk: "Bunu pekiştirelim, 2023 LGS'sinden bir soru..."
> Çoktan seçmeli görünür, doğru cevap → konfeti, skor güncellenir.

**2:00–2:30 — 🔥 Arkadaş Rekabeti Anı**
> Sağ panelde liderlik tablosu: "Ayşe: 12 düğüm | Sen: 9 düğüm 🥈"
> Üst bannerda bildirim: "Ayşe seni geçti! 3 düğüm fazla açmış 🚀"
> "Hemen kendin de bir soru sor" demo'sunda çocuk bir tane daha açar, sıra değişir.
> **Sunum cümlesi:** "Bu bir oyun haline geliyor. Çocuklar birbirlerini motive ediyor. Her kullanıcı 3 arkadaş davet ederse organik viral büyüme bedavaya geliyor."

**2:30–3:00 — Wow Anı (Merak Ağacı tam ekran)**
> "Bugün 5 dakikada bu çocuk Samsun'dan Sakarya'ya kadar bir merak haritası çıkardı. Ve bunu yalnız yapmadı."

**3:00–3:30 — Kapanış**
> "6 ders, 6 Türk dahisi. Gerçek MEB LGS soruları. Arkadaşlarla rekabet. Kursa parası olmayan her çocuk için tamamen ücretsiz. Bu sadece başlangıç."

---

## ⚠️ Risk Alanları & B Planı

| Risk | Olasılık | B Planı |
|------|----------|---------|
| Gemini structured output bozulur | Orta | Strict JSON parse + retry + manual schema validation |
| D3.js animasyon zaman alır | Orta | Basit React+SVG tree'ye düş, animasyon atla |
| 6 karakteri yetiştiremezsiniz | Yüksek | Demo'ya 2 karakter yeter, diğer 4 "yakında" badge |
| Vercel deploy'da env değişkenleri | Düşük | Setup'ta önce halledilir, .env.example ile dokümante |
| Demo'da internet/API ölür | Düşük | Backup video önceden çek |
| Mobil görünüm bozuk | Yüksek | Demo masaüstünde yapılır, mobil "yakında" |
| LGS sorusu telif | Düşük | Sadece MEB'in resmi olarak yayımladıklarını kullan |
| **Supabase setup zaman alır** | Orta | Schemaları önceden hazırla, RLS'i basit tut, fallback olarak localStorage simülasyonu |
| **Arkadaş özelliği yetişmez** | Orta | "Sahte arkadaş" mod (hard-coded Ayşe + Ahmet skoru ile demo) — sunumda Supabase code'unu göster |
| **Demo'da 2. hesap açma sıkıntısı** | Orta | Önceden 2 hesap aç, davet kodlarını cebinde tut |

---

## 📚 Faydalı Linkler & Referanslar

- Gemini API docs: https://ai.google.dev/gemini-api/docs
- Gemini structured output: https://ai.google.dev/gemini-api/docs/structured-output
- Next.js App Router: https://nextjs.org/docs/app
- D3 Tree: https://observablehq.com/@d3/tree
- Zustand persist: https://docs.pmnd.rs/zustand/integrations/persisting-store-data
- MEB LGS örnek sorular: https://odsgm.meb.gov.tr (resmi)
- TailwindCSS: https://tailwindcss.com
- **Supabase JS docs:** https://supabase.com/docs/reference/javascript
- **Supabase quickstart:** https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
- **Supabase RLS:** https://supabase.com/docs/guides/auth/row-level-security

---

## 🏁 Sunum Öncesi Son Kontrol Listesi (Saat 15:45)

- [ ] Production URL çalışıyor
- [ ] Demo akışı baştan sona 1 kere daha
- [ ] Pitch deck en güncel hali açık
- [ ] Backup video laptop'ta hazır
- [ ] Internet B planı (telefon hotspot)
- [ ] Charger'lar dolu
- [ ] Pitch yapacak kişi nefes alıyor 🙂

---

> **Motto:** "Mükemmel değil, demo edilebilir." — bir özelliği 3 saatte mükemmel yapacağına 1 saatte çalışır hale getir, kalan zamanı başka göreve aktar.

**Bol şans! 🚀**
