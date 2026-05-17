import type { LgsQuestion } from '@/lib/types';

/**
 * LGS soruları — gerçek MEB çıkmış sorularından esinlenilmiş (yapı + üslup).
 * Kaynak: MEB ÖDSGM (Ölçme, Değerlendirme ve Sınav Hizmetleri Genel Müdürlüğü)
 * https://odsgm.meb.gov.tr — yayımlanan örnek soru kitapçıkları ve geçmiş yıllar.
 *
 * NOT: Soruların birebir aynısı değildir; hackathon demo'su için MEB stiline
 * uygun, müfredata bağlı sorular hazırlanmıştır. Ürünleşme aşamasında MEB
 * resmi PDF'lerinden birebir alıntı + kaynak gösterimi yapılacaktır.
 */

export const LGS_QUESTIONS: LgsQuestion[] = [
  // ===== MATEMATİK (3) =====

  {
    id: 'mat_2023_ucgen_esitsizligi',
    year: 2023,
    subject: 'matematik',
    unit: 'Üçgenler',
    difficulty: 'orta',
    question:
      'Bir üçgenin iki kenar uzunluğu 7 cm ve 12 cm\'dir. Bu üçgenin üçüncü kenarının uzunluğu santimetre cinsinden bir tam sayı olduğuna göre, üçüncü kenar uzunluğu en az kaç cm olabilir?',
    options: ['4', '5', '6', '7'],
    correctIndex: 2,
    explanation:
      'Üçgen eşitsizliğine göre, bir kenar diğer iki kenarın farkından büyük, toplamından küçük olmalıdır. |12 - 7| < x < 12 + 7 → 5 < x < 19. Tam sayı olduğundan en küçük değer 6\'dır.',
  },

  {
    id: 'mat_2024_uslu_ifadeler',
    year: 2024,
    subject: 'matematik',
    unit: 'Üslü İfadeler',
    difficulty: 'kolay',
    question:
      '(2³ × 2⁵) ÷ 2⁴ işleminin sonucu aşağıdakilerden hangisine eşittir?',
    options: ['2²', '2³', '2⁴', '2⁵'],
    correctIndex: 2,
    explanation:
      'Aynı tabanlı üslü sayıların çarpımında üsler toplanır: 2³ × 2⁵ = 2⁸. Bölümde üsler çıkarılır: 2⁸ ÷ 2⁴ = 2⁴.',
  },

  {
    id: 'mat_2022_olasilik',
    year: 2022,
    subject: 'matematik',
    unit: 'Basit Olayların Olma Olasılığı',
    difficulty: 'zor',
    question:
      'Bir torbada 3 kırmızı, 4 mavi ve 5 yeşil top vardır. Torbadan rastgele çekilen bir topun mavi VEYA yeşil olma olasılığı kaçtır?',
    options: ['1/4', '1/3', '1/2', '3/4'],
    correctIndex: 3,
    explanation:
      'Toplam top: 3 + 4 + 5 = 12. Mavi veya yeşil top sayısı: 4 + 5 = 9. Olasılık = 9/12 = 3/4.',
  },

  // ===== T.C. İNKILAP TARİHİ (2) =====

  {
    id: 'ink_2023_amasya_genelgesi',
    year: 2023,
    subject: 'inkilap',
    unit: 'Milli Uyanış: Bağımsızlık Yolunda Atılan Adımlar',
    difficulty: 'orta',
    question:
      '"Milletin bağımsızlığını yine milletin azim ve kararı kurtaracaktır" ifadesi aşağıdakilerden hangisinde yer almıştır?',
    options: [
      'Erzurum Kongresi kararlarında',
      'Amasya Genelgesi\'nde',
      'Sivas Kongresi kararlarında',
      'Misak-ı Milli\'de',
    ],
    correctIndex: 1,
    explanation:
      'Bu ifade, Mustafa Kemal\'in 22 Haziran 1919\'da yayımladığı Amasya Genelgesi\'nde yer alır. Genelge, ulusal egemenlik fikrini ilk kez resmi bir belgeye taşımıştır.',
  },

  {
    id: 'ink_2024_sakarya',
    year: 2024,
    subject: 'inkilap',
    unit: 'Milli Bir Destan: Ya İstiklal Ya Ölüm',
    difficulty: 'orta',
    question:
      'Sakarya Meydan Muharebesi\'nin (23 Ağustos - 13 Eylül 1921) sonuçları arasında aşağıdakilerden hangisi YOKTUR?',
    options: [
      'TBMM tarafından Mustafa Kemal\'e "Gazi" unvanı ve "Mareşal" rütbesi verildi',
      'Yunan ordusunun saldırı gücü kırıldı, Türk ordusu taarruza geçti',
      'Fransa ile Ankara Antlaşması imzalandı',
      'Mudanya Ateşkes Antlaşması imzalandı',
    ],
    correctIndex: 3,
    explanation:
      'Mudanya Ateşkes Antlaşması, Sakarya\'dan sonra değil, Büyük Taarruz\'un kazanılmasının ardından 11 Ekim 1922\'de imzalanmıştır. Diğer üç sonuç doğrudur.',
  },

  // ===== FEN BİLİMLERİ (2) — Aziz Sancar =====

  {
    id: 'fen_2023_dna_kromozom',
    year: 2023,
    subject: 'fen',
    unit: 'DNA ve Genetik Kod',
    difficulty: 'kolay',
    question:
      'İnsan vücut hücrelerinde bulunan kromozom sayısı kaçtır?',
    options: ['23', '46', '48', '92'],
    correctIndex: 1,
    explanation:
      'İnsan vücut hücrelerinde 46 kromozom (23 çift) bulunur. Eşey hücrelerinde (sperm ve yumurta) ise 23 kromozom vardır; döllenmede tekrar 46\'ya ulaşılır.',
  },

  {
    id: 'fen_2024_basinc',
    year: 2024,
    subject: 'fen',
    unit: 'Basınç',
    difficulty: 'orta',
    question:
      'Düz bir zemine bırakılan ağır bir bloğun yaptığı basıncı azaltmak için aşağıdakilerden hangisi yapılmalıdır?',
    options: [
      'Bloğun altına daha küçük bir yüzey koy',
      'Bloğun üzerine ek ağırlık ekle',
      'Bloğun taban yüzeyini genişlet',
      'Bloğu daha pürüzlü bir zemine taşı',
    ],
    correctIndex: 2,
    explanation:
      'Basınç = Kuvvet / Alan formülüne göre, uygulanan kuvvet (ağırlık) sabitken taban alanı artırılırsa basınç azalır. Yüzeyi genişletmek doğru seçenektir.',
  },

  // ===== TÜRKÇE (2) — Yunus Emre =====

  {
    id: 'tur_2023_fiilimsi',
    year: 2023,
    subject: 'turkce',
    unit: 'Fiilimsiler',
    difficulty: 'kolay',
    question:
      '"Koşarak geldi" cümlesindeki altı çizili sözcüğün fiilimsi türü hangisidir?',
    options: ['İsim-fiil', 'Sıfat-fiil', 'Zarf-fiil', 'Eylem'],
    correctIndex: 2,
    explanation:
      '"Koşarak" sözcüğü fiilden türemiş, cümlede zarf görevi yapan bir fiilimsedir; bu nedenle zarf-fiil (bağ-fiil) olarak adlandırılır. "-arak/-erek" eki zarf-fiil ekidir.',
  },

  {
    id: 'tur_2024_cumle_anlam',
    year: 2024,
    subject: 'turkce',
    unit: 'Cümlede Anlam',
    difficulty: 'orta',
    question:
      '"Bu soruyu çözmek benim için çok kolaydı." cümlesinde aşağıdakilerden hangisi vardır?',
    options: ['Abartma (mübalağa)', 'Kişileştirme (teşhis)', 'Dolaylı anlatım', 'Öznel yargı'],
    correctIndex: 3,
    explanation:
      '"Çok kolay" ifadesi kişiden kişiye farklılık gösteren bir değerlendirmedir; bu nedenle cümle öznel (kişisel) yargı içerir. Nesnel yargılar ölçülebilir, kanıtlanabilir bilgiler içerir.',
  },

  // ===== DİN KÜLTÜRÜ (2) — Mevlana =====

  {
    id: 'din_2023_zekat',
    year: 2023,
    subject: 'din',
    unit: 'Zekât ve Sadaka',
    difficulty: 'kolay',
    question:
      'İslam\'ın beş şartından biri olan zekât kimler tarafından verilmekle yükümlüdür?',
    options: [
      'Her Müslüman tarafından',
      'Belirli miktarda mala sahip, akıllı ve ergin Müslümanlar tarafından',
      'Yalnızca erkek Müslümanlar tarafından',
      'Devlet tarafından zorunlu olarak toplanır',
    ],
    correctIndex: 1,
    explanation:
      'Zekât; nisap miktarı (belirli bir servet sınırı) kadar veya daha fazla mala sahip olan, akıl sağlığı yerinde ve ergin (buluğa ermiş) Müslümanlar tarafından verilmesi farz olan bir ibadettir.',
  },

  {
    id: 'din_2024_hac',
    year: 2024,
    subject: 'din',
    unit: 'Hac',
    difficulty: 'orta',
    question:
      'Hac ibadetine ilişkin aşağıdakilerden hangisi yanlıştır?',
    options: [
      'Hac, İslam\'ın beş şartından biridir',
      'Hac; yalnızca Mekke\'de, belirli günlerde yapılır',
      'Gücü yeten her Müslüman ömründe bir kez hacca gitmekle yükümlüdür',
      'Hac ibadeti her ay tekrarlanabilir',
    ],
    correctIndex: 3,
    explanation:
      'Hac ibadeti, belirli zaman diliminde (Zilhicce ayı) yapılır; her ay tekrarlanamaz. Hac; mali ve bedeni güce sahip, akıllı ve ergin Müslümanların ömründe bir kez yapması gereken farzdır.',
  },

  // ===== İNGİLİZCE (2) — Shakespeare =====

  {
    id: 'ing_2023_simple_past',
    year: 2023,
    subject: 'ingilizce',
    unit: 'Teen Life / Simple Past Tense',
    difficulty: 'kolay',
    question:
      'Which sentence is correct in Simple Past Tense?',
    options: [
      'She go to school yesterday.',
      'She goed to school yesterday.',
      'She went to school yesterday.',
      'She goes to school yesterday.',
    ],
    correctIndex: 2,
    explanation:
      '"Go" fiilinin geçmiş zaman (simple past) biçimi "went"tir — düzensiz (irregular) bir fiildir. "Goed" veya "go/goes" kullanımı yanlıştır. Türkçesi: "O dün okula gitti."',
  },

  {
    id: 'ing_2024_modals',
    year: 2024,
    subject: 'ingilizce',
    unit: 'Friendship / Modal Verbs',
    difficulty: 'orta',
    question:
      'Choose the best modal verb: "You look tired. You _____ get some rest."',
    options: ['must not', 'should', 'can\'t', 'will'],
    correctIndex: 1,
    explanation:
      '"Should" tavsiye bildiren bir modal fiildir. "You should get some rest" → "Biraz dinlenmelisin" anlamına gelir. "Must not" yasak, "can\'t" imkânsızlık, "will" gelecek zaman için kullanılır.',
  },

  // ===== MATEMATİK — EK SORULAR =====

  {
    id: 'mat_2023_karekok_islem',
    year: 2023,
    subject: 'matematik',
    unit: 'Kareköklü İfadeler',
    difficulty: 'orta',
    question: '√8 + √18 + √2 toplamı kaçtır?',
    options: ['5√2', '6√2', '7√2', '4√2'],
    correctIndex: 1,
    explanation: '√8 = 2√2, √18 = 3√2, √2 = 1√2 → toplam = (2+3+1)√2 = 6√2.',
  },
  {
    id: 'mat_2024_karekok_carpim',
    year: 2024,
    subject: 'matematik',
    unit: 'Kareköklü İfadeler',
    difficulty: 'kolay',
    question: '√3 · √75 çarpımı kaçtır?',
    options: ['5', '15', '25', '√225'],
    correctIndex: 1,
    explanation: '√3 · √75 = √(3·75) = √225 = 15.',
  },
  {
    id: 'mat_2023_uslu_ifade2',
    year: 2023,
    subject: 'matematik',
    unit: 'Üslü İfadeler',
    difficulty: 'orta',
    question: '(2³ · 3²) / (2 · 3) işleminin sonucu kaçtır?',
    options: ['6', '12', '18', '24'],
    correctIndex: 1,
    explanation: '2³/2 = 2² = 4, 3²/3 = 3¹ = 3 → 4·3 = 12.',
  },
  {
    id: 'mat_2024_bilimsel_gosterim',
    year: 2024,
    subject: 'matematik',
    unit: 'Üslü İfadeler',
    difficulty: 'kolay',
    question: '0,000045 sayısının bilimsel gösterimi aşağıdakilerden hangisidir?',
    options: ['4,5 × 10⁻⁵', '4,5 × 10⁵', '45 × 10⁻⁶', '0,45 × 10⁻⁴'],
    correctIndex: 0,
    explanation: '0,000045 = 4,5 × 10⁻⁵. Virgül 5 basamak sağa kaydığından üs −5\'tir.',
  },
  {
    id: 'mat_2023_ozdeslik_uygulama',
    year: 2023,
    subject: 'matematik',
    unit: 'Cebirsel Özdeşlikler',
    difficulty: 'orta',
    question: '(x + 3)² − (x − 3)² ifadesi aşağıdakilerden hangisine eşittir?',
    options: ['12x', '6x', '18', '2x²'],
    correctIndex: 0,
    explanation: '(x+3)² = x²+6x+9, (x−3)² = x²−6x+9. Fark = 12x.',
  },
  {
    id: 'mat_2024_carpanlara_ayirma',
    year: 2024,
    subject: 'matematik',
    unit: 'Cebirsel Özdeşlikler',
    difficulty: 'orta',
    question: '4x² − 25 ifadesinin çarpanlı hâli aşağıdakilerden hangisidir?',
    options: ['(2x+5)(2x−5)', '(4x+5)(x−5)', '(2x−5)²', '(4x−25)(x+1)'],
    correctIndex: 0,
    explanation: '4x² − 25 = (2x)² − 5² = (2x+5)(2x−5). Fark alma özdeşliği: a²−b²=(a+b)(a−b).',
  },
  {
    id: 'mat_2023_dogrusal_grafik',
    year: 2023,
    subject: 'matematik',
    unit: 'Doğrusal İlişkiler',
    difficulty: 'orta',
    question: 'y = 2x − 4 doğrusunun x-eksenini kestiği nokta hangisidir?',
    options: ['(2, 0)', '(0, 2)', '(4, 0)', '(0, −4)'],
    correctIndex: 0,
    explanation: 'x-ekseninde y=0: 0 = 2x−4 → x = 2. Nokta: (2, 0).',
  },
  {
    id: 'mat_2024_esitsizlik',
    year: 2024,
    subject: 'matematik',
    unit: 'Denklem ve Eşitsizlikler',
    difficulty: 'orta',
    question: '3x − 5 < x + 7 eşitsizliğini sağlayan tam sayıların en büyüği hangisidir?',
    options: ['5', '6', '4', '3'],
    correctIndex: 0,
    explanation: '3x−x < 7+5 → 2x < 12 → x < 6. En büyük tam sayı: 5.',
  },
  {
    id: 'mat_2023_pisagor_dik_ucgen',
    year: 2023,
    subject: 'matematik',
    unit: 'Üçgenler',
    difficulty: 'kolay',
    question: 'Dik kenarları 5 cm ve 12 cm olan bir dik üçgenin hipotenüsü kaç cm\'dir?',
    options: ['13', '15', '17', '10'],
    correctIndex: 0,
    explanation: '5² + 12² = 25 + 144 = 169 = 13². Hipotenüs 13 cm. (5-12-13 Pisagor üçlüsü)',
  },
  {
    id: 'mat_2024_hacim_silindir',
    year: 2024,
    subject: 'matematik',
    unit: 'Geometrik Cisimler',
    difficulty: 'orta',
    question: 'Taban yarıçapı 3 cm ve yüksekliği 5 cm olan silindirin hacmi kaç π cm³\'tür?',
    options: ['45π', '30π', '15π', '90π'],
    correctIndex: 0,
    explanation: 'V = πr²h = π · 3² · 5 = 45π cm³.',
  },
  {
    id: 'mat_2023_olasilik2',
    year: 2023,
    subject: 'matematik',
    unit: 'Olasılık',
    difficulty: 'orta',
    question: 'Bir sınıfta 12 kız, 8 erkek öğrenci vardır. Rastgele seçilen öğrencinin erkek OLMAMA olasılığı nedir?',
    options: ['3/5', '2/5', '1/2', '4/5'],
    correctIndex: 0,
    explanation: 'Toplam: 20 öğrenci. Kız sayısı: 12. P(erkek değil) = 12/20 = 3/5.',
  },
  {
    id: 'mat_2024_veri_ortalama',
    year: 2024,
    subject: 'matematik',
    unit: 'Veri Analizi',
    difficulty: 'kolay',
    question: '5 öğrencinin sınav notu: 60, 70, 80, 90, 100. Bu notların ortalaması kaçtır?',
    options: ['80', '75', '85', '70'],
    correctIndex: 0,
    explanation: '(60+70+80+90+100)/5 = 400/5 = 80.',
  },

  // ===== TÜRKÇE — EK SORULAR =====

  {
    id: 'tur_2023_fiil_zamani',
    year: 2023,
    subject: 'turkce',
    unit: 'Fiil ve Fiil Zamanları',
    difficulty: 'kolay',
    question: '"Yarın okula gideceğim." cümlesindeki fiilin zamanı hangisidir?',
    options: ['Gelecek zaman', 'Geniş zaman', 'Geçmiş zaman', 'Şimdiki zaman'],
    correctIndex: 0,
    explanation: '"Gideceğim" fiili −(y)ecek/−(y)acak ekiyle çekilmiş olup gelecek zamana işaret eder.',
  },
  {
    id: 'tur_2024_isim_fiil',
    year: 2024,
    subject: 'turkce',
    unit: 'Fiilimsiler',
    difficulty: 'orta',
    question: '"Uyumak istiyorum." cümlesindeki isim-fiil (mastar) hangisidir?',
    options: ['uyumak', 'istiyorum', 'uyumak istiyorum', 'istiy-'],
    correctIndex: 0,
    explanation: '"Uyumak" sözcüğü "−mak/−mek" ekiyle yapılmış, cümlede isim görevi yapan isim-fiildir.',
  },
  {
    id: 'tur_2023_mecaz_anlam',
    year: 2023,
    subject: 'turkce',
    unit: 'Anlam Bilgisi',
    difficulty: 'orta',
    question: '"Sınav salonunda çıt çıkmıyordu." cümlesinde "çıt çıkmak" ifadesi hangi anlamda kullanılmıştır?',
    options: ['En ufak bir ses gelmemek', 'Küçük sesler duymak', 'Kapı gıcırdamak', 'Müzik çalmak'],
    correctIndex: 0,
    explanation: '"Çıt çıkmamak" deyimi "en ufak bir ses olmaması, tam sessizlik" anlamında kullanılmıştır.',
  },
  {
    id: 'tur_2024_sozcuk_turu',
    year: 2024,
    subject: 'turkce',
    unit: 'Sözcük Türleri',
    difficulty: 'kolay',
    question: '"Güzel bir gün geçirdik." cümlesinde "güzel" sözcüğü hangi türdedir?',
    options: ['Sıfat', 'Zarf', 'İsim', 'Zamir'],
    correctIndex: 0,
    explanation: '"Güzel" sözcüğü "bir gün" isim tamlamasındaki ismi (gün) nitelediğinden sıfattır.',
  },
  {
    id: 'tur_2023_paragraf_ana_dusunce',
    year: 2023,
    subject: 'turkce',
    unit: 'Paragraf',
    difficulty: 'orta',
    question: 'Bir paragrafın ana düşüncesi için aşağıdakilerden hangisi doğrudur?',
    options: [
      'Paragrafın bütününe egemen olan temel fikirdir.',
      'Yalnızca son cümlede bulunur.',
      'Her paragrafta birden fazla ana düşünce vardır.',
      'Örnekler ana düşüncedir.',
    ],
    correctIndex: 0,
    explanation: 'Ana düşünce, paragrafın tamamını kapsayan temel fikirdir; herhangi bir cümlede açıkça verilmiş ya da ima edilmiş olabilir.',
  },
  {
    id: 'tur_2024_yazim_kurali',
    year: 2024,
    subject: 'turkce',
    unit: 'Yazım Kuralları',
    difficulty: 'kolay',
    question: 'Aşağıdaki cümlelerin hangisinde yazım yanlışı vardır?',
    options: [
      'Kitabı okuyup okumadığını söyle.',
      'Herşey yolunda gidiyordu.',
      'Bu sabah erken kalktım.',
      'Seninle konuşmak güzeldi.',
    ],
    correctIndex: 1,
    explanation: '"Her şey" ayrı yazılır. "Herşey" biçimi yazım yanlışıdır.',
  },
  {
    id: 'tur_2023_cumle_ogesi',
    year: 2023,
    subject: 'turkce',
    unit: 'Cümle Bilgisi',
    difficulty: 'orta',
    question: '"Zeynep, dün kütüphanede kitap okudu." cümlesinde yüklem hangisidir?',
    options: ['okudu', 'Zeynep', 'kütüphanede', 'dün'],
    correctIndex: 0,
    explanation: 'Yüklem, cümlede "ne yaptı, ne oldu, nedir" sorularının cevabını veren öğedir. Burada "okudu" sorusunun cevabıdır.',
  },
  {
    id: 'tur_2024_anlatim_bicimi',
    year: 2024,
    subject: 'turkce',
    unit: 'Anlatım Biçimleri',
    difficulty: 'orta',
    question: '"Fen bilimleri sınavından herkes yüksek not aldı, çünkü konu gerçekten zordu." cümlesinde hangi anlatım yanlışı vardır?',
    options: [
      'Çelişki (anlam bozukluğu)',
      'Gereksiz sözcük kullanımı',
      'Özne-yüklem uyumsuzluğu',
      'Yanlış ek kullanımı',
    ],
    correctIndex: 0,
    explanation: '"Herkes yüksek not aldı" ile "konu gerçekten zordu" ifadeleri birbirine çelişmektedir; zor konudan herkesin yüksek not alması çelişkidir.',
  },

  // ===== FEN BİLİMLERİ — EK SORULAR =====

  {
    id: 'fen_2023_basinc_hesap',
    year: 2023,
    subject: 'fen',
    unit: 'Basınç',
    difficulty: 'orta',
    question: '300 N ağırlığındaki bir cisim 0,5 m² taban alana sahiptir. Bu cismin zemine uyguladığı basınç kaç Pa\'dır?',
    options: ['600', '150', '300', '750'],
    correctIndex: 0,
    explanation: 'P = F/A = 300 N / 0,5 m² = 600 Pa.',
  },
  {
    id: 'fen_2024_siyi_basinci',
    year: 2024,
    subject: 'fen',
    unit: 'Basınç',
    difficulty: 'orta',
    question: 'Yoğunluğu 1000 kg/m³ olan suyun 4 m derinliğindeki basıncı kaç Pa\'dır? (g = 10 m/s²)',
    options: ['40 000', '4 000', '400', '400 000'],
    correctIndex: 0,
    explanation: 'P = ρgh = 1000 × 10 × 4 = 40 000 Pa.',
  },
  {
    id: 'fen_2023_dna_baz',
    year: 2023,
    subject: 'fen',
    unit: 'DNA ve Genetik Kod',
    difficulty: 'kolay',
    question: 'DNA\'da adenin (A) ile hangi baz eşleşir?',
    options: ['Timin (T)', 'Guanin (G)', 'Sitozin (C)', 'Urasil (U)'],
    correctIndex: 0,
    explanation: 'DNA\'da baz eşleşme kuralına göre A-T ve G-C çiftleri oluşur. Urasil yalnızca RNA\'da bulunur.',
  },
  {
    id: 'fen_2024_fotosentes',
    year: 2024,
    subject: 'fen',
    unit: 'Enerji Dönüşümleri',
    difficulty: 'kolay',
    question: 'Fotosentez sırasında bitkiler güneş enerjisini hangi enerji türüne dönüştürür?',
    options: ['Kimyasal enerji', 'Isı enerjisi', 'Elektrik enerjisi', 'Ses enerjisi'],
    correctIndex: 0,
    explanation: 'Fotosentezde bitkiler güneş (ışık) enerjisini kimyasal enerjiye (glikoz) dönüştürür. Bu enerji besin zinciriyle diğer canlılara aktarılır.',
  },
  {
    id: 'fen_2023_hal_degisimi',
    year: 2023,
    subject: 'fen',
    unit: 'Madde ve Endüstri',
    difficulty: 'kolay',
    question: 'Suyun 100°C\'de buharlaşması hangi hal değişimidir?',
    options: ['Buharlaşma', 'Erime', 'Donma', 'Yoğuşma'],
    correctIndex: 0,
    explanation: 'Sıvı hâlden gaz hâline geçiş "buharlaşma"dır. 100°C su için bu değişime kaynama da denir.',
  },
  {
    id: 'fen_2024_elektrik_yuk',
    year: 2024,
    subject: 'fen',
    unit: 'Elektrik',
    difficulty: 'kolay',
    question: 'Sürtünme yoluyla elektron kazanan cisim hangi yükle yüklenir?',
    options: ['Negatif yük', 'Pozitif yük', 'Nötr kalır', 'İkisi birden'],
    correctIndex: 0,
    explanation: 'Elektron kazanan cisim fazladan negatif yük taşır → negatif yüklenir. Elektron kaybeden cisim pozitif yüklenir.',
  },
  {
    id: 'fen_2023_is_hesabi',
    year: 2023,
    subject: 'fen',
    unit: 'Basit Makineler',
    difficulty: 'orta',
    question: '40 N kuvvetle 3 m yol alındığında yapılan iş kaç J\'dir?',
    options: ['120', '43', '37', '13'],
    correctIndex: 0,
    explanation: 'W = F × d = 40 N × 3 m = 120 J.',
  },
  {
    id: 'fen_2024_asit_baz',
    year: 2024,
    subject: 'fen',
    unit: 'Madde ve Endüstri',
    difficulty: 'orta',
    question: 'pH değeri 3 olan bir çözelti için aşağıdakilerden hangisi doğrudur?',
    options: ['Asidiktir, H⁺ iyonu fazladır.', 'Baziktir, OH⁻ iyonu fazladır.', 'Nötrdür.', 'pH 7\'ye eşittir.'],
    correctIndex: 0,
    explanation: 'pH < 7 → asidik çözelti. pH = 7 → nötr. pH > 7 → bazik. pH 3, kuvvetli bir asidi gösterir.',
  },

  // ===== T.C. İNKILAP TARİHİ — EK SORULAR =====

  {
    id: 'ink_2023_tbmm_acilis',
    year: 2023,
    subject: 'inkilap',
    unit: 'Milli Uyanış: Bağımsızlık Yolunda Atılan Adımlar',
    difficulty: 'kolay',
    question: 'Türkiye Büyük Millet Meclisi hangi tarihte açılmıştır?',
    options: ['23 Nisan 1920', '29 Ekim 1923', '30 Ekim 1918', '19 Mayıs 1919'],
    correctIndex: 0,
    explanation: 'TBMM, 23 Nisan 1920\'de Ankara\'da açılmıştır. Bu tarih, millî egemenliğin simgesi olarak Ulusal Egemenlik ve Çocuk Bayramı olarak kutlanmaktadır.',
  },
  {
    id: 'ink_2024_ataturk_ilkeleri',
    year: 2024,
    subject: 'inkilap',
    unit: 'Atatürkçülük ve Çağdaşlaşan Türkiye',
    difficulty: 'orta',
    question: 'Atatürk\'ün altı ilkesinden "devletçilik" ile doğrudan ilgili olan uygulama hangisidir?',
    options: [
      'Devlet eliyle sanayi tesisleri kurulması',
      'Harf inkılabının yapılması',
      'Hilafetin kaldırılması',
      'Milletvekili seçimlerinin yapılması',
    ],
    correctIndex: 0,
    explanation: 'Devletçilik ilkesi gereği özel sermayenin yetersiz olduğu alanlarda devlet ekonomiye bizzat katılır. Sümerbank, Etibank gibi kuruluşlar bu ilkenin ürünüdür.',
  },
  {
    id: 'ink_2023_harf_inkilabi',
    year: 2023,
    subject: 'inkilap',
    unit: 'Atatürkçülük ve Çağdaşlaşan Türkiye',
    difficulty: 'kolay',
    question: 'Harf İnkılabı hangi yılda gerçekleştirilmiş ve hangi alfabeye geçilmiştir?',
    options: ['1928 — Latin alfabesi', '1923 — Arap alfabesi', '1932 — Kiril alfabesi', '1926 — Latin alfabesi'],
    correctIndex: 0,
    explanation: '1928\'de Arap harfleri terk edilerek Latin kökenli Türk alfabesi kabul edildi. Bu değişim okuryazarlık oranını önemli ölçüde artırdı.',
  },
  {
    id: 'ink_2024_lozan',
    year: 2024,
    subject: 'inkilap',
    unit: 'Milli Bir Destan: Ya İstiklal Ya Ölüm',
    difficulty: 'orta',
    question: 'Lozan Antlaşması\'nın önemi için aşağıdakilerden hangisi söylenemez?',
    options: [
      'Türkiye\'nin sınırlarını uluslararası alanda tanıttı.',
      'Kapitülasyonları kaldırdı.',
      'Osmanlı Devleti\'nin uluslararası tanınmasını sağladı.',
      'Türkiye Cumhuriyeti\'nin bağımsızlığını güvence altına aldı.',
    ],
    correctIndex: 2,
    explanation: 'Lozan, Osmanlı\'nın değil Türkiye Cumhuriyeti\'nin antlaşmasıdır. Osmanlı Devleti fiilen sona ermişti; Lozan yeni cumhuriyeti tanıttı.',
  },
  {
    id: 'ink_2023_kadin_haklari',
    year: 2023,
    subject: 'inkilap',
    unit: 'Atatürkçülük ve Çağdaşlaşan Türkiye',
    difficulty: 'kolay',
    question: 'Türk kadını milletvekili seçme ve seçilme hakkını hangi yılda kazanmıştır?',
    options: ['1934', '1930', '1923', '1938'],
    correctIndex: 0,
    explanation: '1930\'da belediye seçimlerine, 1934\'te ise milletvekili seçimlerine katılma hakkı tanındı. Bu tarih pek çok Avrupa ülkesinden önceye denk gelmektedir.',
  },
  {
    id: 'ink_2024_mondros',
    year: 2024,
    subject: 'inkilap',
    unit: 'Bir Kahraman Doğuyor',
    difficulty: 'orta',
    question: 'Mondros Mütarekesi\'nin imzalanmasından sonra yaşanan gelişmelerden hangisi Millî Mücadele\'nin başlamasında doğrudan etkili olmuştur?',
    options: [
      'İzmir\'in Yunan kuvvetlerince işgal edilmesi',
      'Osmanlı Meclis-i Mebusanı\'nın toplanması',
      'Trablusgarp Savaşı\'nın başlaması',
      'Balkan Savaşlarının patlak vermesi',
    ],
    correctIndex: 0,
    explanation: '15 Mayıs 1919\'da Yunanistan\'ın İzmir\'i işgal etmesi halkta büyük tepkiye yol açtı ve Millî Mücadele hareketini fiilen başlattı.',
  },

  // ===== DİN KÜLTÜRÜ — EK SORULAR =====

  {
    id: 'din_2023_iman_sartlari',
    year: 2023,
    subject: 'din',
    unit: 'Kader İnancı',
    difficulty: 'kolay',
    question: 'İslam\'a göre imanın şartları kaç tanedir ve kader bu şartlar arasında kaçıncı sıradadır?',
    options: ['6 şart — 6. sıra', '5 şart — 5. sıra', '6 şart — 4. sıra', '7 şart — 6. sıra'],
    correctIndex: 0,
    explanation: 'İmanın 6 şartı vardır: Allah\'a iman, meleklere, kitaplara, peygamberlere, ahirete ve kadere iman. Kader sonuncu yani 6. şarttır.',
  },
  {
    id: 'din_2024_zekat_nisap',
    year: 2024,
    subject: 'din',
    unit: 'Paylaşmak ve Yardımlaşmak',
    difficulty: 'orta',
    question: 'Zekât yükümlülüğü için nisap şartının yanı sıra aşağıdakilerden hangisi de gereklidir?',
    options: [
      'Malın üzerinden bir yıl geçmesi (havl)',
      'Malın çalışarak kazanılması',
      'Kişinin 18 yaşından büyük olması',
      'Şehirde ikamet etmesi',
    ],
    correctIndex: 0,
    explanation: 'Zekât farz olabilmesi için kişinin nisap miktarı mala sahip olması VE bu malın üzerinden bir yılın (havl) geçmesi gerekir.',
  },
  {
    id: 'din_2023_hz_peygamber',
    year: 2023,
    subject: 'din',
    unit: 'Hz. Muhammed\'in Kişiliği',
    difficulty: 'kolay',
    question: '"El-Emin" lakabı ne anlama gelir ve bu lakap kime verilmiştir?',
    options: [
      'Güvenilir — Hz. Muhammed\'e',
      'Cesur — Hz. Ömer\'e',
      'Bilge — Hz. Ali\'ye',
      'Merhametli — Hz. Ebubekir\'e',
    ],
    correctIndex: 0,
    explanation: '"El-Emin" Arapçada güvenilir anlamına gelir. Hz. Muhammed, peygamberliğinden önce de bu lakabı hak etmişti; bu özelliği İslam\'ın kabulünde belirleyici oldu.',
  },
  {
    id: 'din_2024_kuran_sure',
    year: 2024,
    subject: 'din',
    unit: 'İslam\'ın Temel Kaynakları',
    difficulty: 'kolay',
    question: 'Kur\'an-ı Kerim kaç sure ve kaç ayetten oluşmaktadır?',
    options: ['114 sure — 6236 ayet', '112 sure — 6000 ayet', '120 sure — 6500 ayet', '114 sure — 7000 ayet'],
    correctIndex: 0,
    explanation: 'Kur\'an-ı Kerim 114 sure ve 6236 ayetten oluşmaktadır. En uzun sure Bakara (286 ayet), en kısa sure Kevser\'dir (3 ayet).',
  },
  {
    id: 'din_2023_hac_sartlari',
    year: 2023,
    subject: 'din',
    unit: 'Hac',
    difficulty: 'orta',
    question: 'Hac ibadetinin farz olabilmesi için aşağıdaki şartlardan hangisi gerekli DEĞİLDİR?',
    options: [
      'Haccı her yıl tekrar etmek',
      'Akıl sağlığı',
      'Erginlik (buluğ)',
      'Mali ve bedeni güce sahip olmak',
    ],
    correctIndex: 0,
    explanation: 'Hac ömürde yalnızca bir kez farzdır; her yıl tekrarlama zorunluluğu yoktur. Şartları: akıl, erginlik, hürriyet, mali-bedeni güç.',
  },

  // ===== İNGİLİZCE — EK SORULAR =====

  {
    id: 'ing_2023_present_perfect',
    year: 2023,
    subject: 'ingilizce',
    unit: 'The Internet / Present Perfect',
    difficulty: 'orta',
    question: 'Which sentence is in the Present Perfect Tense?',
    options: [
      'She has already finished her homework.',
      'She finished her homework yesterday.',
      'She is finishing her homework now.',
      'She finishes her homework every day.',
    ],
    correctIndex: 0,
    explanation: 'Present Perfect: have/has + V3. "Has finished" = have/has + past participle. "Yesterday" → Simple Past, "now" → Present Continuous, "every day" → Simple Present.',
  },
  {
    id: 'ing_2024_passive_voice',
    year: 2024,
    subject: 'ingilizce',
    unit: 'Science / Passive Voice',
    difficulty: 'orta',
    question: '"Scientists discovered penicillin in 1928." cümlesinin pasif hâli hangisidir?',
    options: [
      'Penicillin was discovered by scientists in 1928.',
      'Penicillin is discovered by scientists in 1928.',
      'Penicillin discovered by scientists in 1928.',
      'Penicillin has been discovered by scientists in 1928.',
    ],
    correctIndex: 0,
    explanation: 'Simple Past Passive: was/were + V3. "Discovered" → "was discovered". By + özne pasif cümlede tutulabilir.',
  },
  {
    id: 'ing_2023_conditional_1',
    year: 2023,
    subject: 'ingilizce',
    unit: 'Natural Forces / Conditionals',
    difficulty: 'orta',
    question: 'Choose the correct form: "If it _____ tomorrow, we will cancel the match."',
    options: ['rains', 'rained', 'will rain', 'is raining'],
    correctIndex: 0,
    explanation: 'Type 1 Conditional (gerçek olası durum): If + Simple Present, … will + V1. If-clause\'da "will" kullanılmaz.',
  },
  {
    id: 'ing_2024_comparatives',
    year: 2024,
    subject: 'ingilizce',
    unit: 'Friendship / Comparatives',
    difficulty: 'kolay',
    question: 'Which sentence uses the comparative correctly?',
    options: [
      'This book is more interesting than that one.',
      'This book is interestinger than that one.',
      'This book is most interesting than that one.',
      'This book is the most interesting than that one.',
    ],
    correctIndex: 0,
    explanation: 'Uzun sıfatların karşılaştırmasında "more + adjective" kullanılır. "Interestinger" yanlış; "most" üstünlük derecesidir.',
  },
  {
    id: 'ing_2023_quantifiers',
    year: 2023,
    subject: 'ingilizce',
    unit: 'In the Kitchen / Quantifiers',
    difficulty: 'kolay',
    question: 'Choose the correct quantifier: "There isn\'t _____ milk in the fridge."',
    options: ['any', 'some', 'many', 'a few'],
    correctIndex: 0,
    explanation: '"Any" sayılamayan isimlerin olumsuz ve soru cümlelerinde kullanılır. "Some" olumlu cümlelerde; "many/a few" sayılabilen isimler için kullanılır.',
  },
  {
    id: 'ing_2024_modal_obligation',
    year: 2024,
    subject: 'ingilizce',
    unit: 'Tourism / Modals',
    difficulty: 'orta',
    question: 'What is the difference between "mustn\'t" and "don\'t have to"?',
    options: [
      '"Mustn\'t" yasağı, "don\'t have to" zorunluluk olmadığını ifade eder.',
      'İkisi de aynı anlama gelir.',
      '"Mustn\'t" zorunluluk olmadığını, "don\'t have to" yasağı ifade eder.',
      '"Don\'t have to" daha güçlü bir yasak bildirir.',
    ],
    correctIndex: 0,
    explanation: '"Mustn\'t": yapmamalısın, yasak. "Don\'t have to": yapmak zorunda değilsin, serbestsin. Örnek: "You mustn\'t smoke here." vs "You don\'t have to come early."',
  },
];

export function getQuestionById(id: string): LgsQuestion | undefined {
  return LGS_QUESTIONS.find((q) => q.id === id);
}

export function getQuestionsBySubject(subject: string): LgsQuestion[] {
  return LGS_QUESTIONS.filter((q) => q.subject === subject);
}

// Bir karakter için uygun bir LGS sorusu seç.
// Henüz cevaplanmamışları öncelikle döner; hepsi cevaplandıysa rastgele.
export function pickQuestionForCharacter(
  characterId: string,
  excludeIds: string[] = [],
): LgsQuestion | undefined {
  const subjectMap: Record<string, string> = {
    ataturk: 'inkilap',
    cahit_arf: 'matematik',
    aziz_sancar: 'fen',
    yunus_emre: 'turkce',
    mevlana: 'din',
    shakespeare: 'ingilizce',
  };
  const subject = subjectMap[characterId];
  if (!subject) return undefined;

  const pool = LGS_QUESTIONS.filter((q) => q.subject === subject);
  const unanswered = pool.filter((q) => !excludeIds.includes(q.id));
  const candidates = unanswered.length > 0 ? unanswered : pool;
  return candidates[Math.floor(Math.random() * candidates.length)];
}
