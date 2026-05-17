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
