import type { Adventure } from '@/lib/types';

// Maceralar, sohbet başlamadan önce karaktere "açılış sahnesi" verir.
// Karakter ilk mesajı atarken bu opening'i kullanır, milestones onun
// içinden geçeceği konu noktalarıdır. lgsQuestionTriggers, hangi milestone
// üzerinde LGS sorusu enjekte etmenin doğal olacağını söyler.

export const ADVENTURES: Adventure[] = [
  // ----- Tam dolu (showcase) -----

  {
    id: 'kurtulus_savasi',
    characterId: 'ataturk',
    mebUnit: 'Bir Kahraman Doğuyor / Milli Uyanış: Bağımsızlık Yolunda Atılan Adımlar',
    title: 'Samsun\'dan Sakarya\'ya: Bir Milletin Uyanışı',
    openingPrompt: `
19 Mayıs 1919. Bandırma Vapuru'ndayım, Samsun'a yaklaşıyoruz. Cebimde
sadece bir görev yazısı: "Karadeniz bölgesinde asayişi sağla." Ama içimde
çok başka bir şey var. Ülkem işgal altında. İstanbul'da padişah çaresiz.
Anadolu'da halk dağınık.

Sana bir soru sormak istiyorum, evladım: Sen olsan, elinde bu kâğıt, ufukta
Samsun limanı görünürken — ilk işin ne olurdu? Verilen göreve mi sadık
kalırdın, yoksa kalbinde yatan bambaşka bir planı mı izlerdin?
`.trim(),
    milestones: [
      'Samsun çıkışı ve görevin gerçek anlamı',
      'Amasya Genelgesi: "Milletin bağımsızlığını yine milletin azim ve kararı kurtaracaktır"',
      'Erzurum ve Sivas Kongreleri: Anadolu\'nun ortak sesi',
      'TBMM\'nin açılışı (23 Nisan 1920) ve egemenliğin millete geçişi',
      'Sakarya Meydan Muharebesi (1921): "Hattı müdafaa yoktur, sathı müdafaa vardır"',
      'Büyük Taarruz ve Başkomutanlık Meydan Muharebesi (30 Ağustos 1922)',
      'Mudanya Ateşkesi ve Lozan Antlaşması: yeni devletin tapusu',
    ],
    lgsQuestionTriggers: [
      'amasya_genelgesi',
      'tbmm_acilis',
      'sakarya_savasi',
      'lozan',
    ],
  },

  {
    id: 'geometride_bulmaca',
    characterId: 'cahit_arf',
    mebUnit: 'Üçgenler / Dönüşüm Geometrisi / Geometrik Cisimler',
    title: 'Üçgenin Sırrı: Bir Kâğıttan Çıkan Evren',
    openingPrompt: `
Önünde bir A4 kâğıt olduğunu düşün. Sıradan bir kâğıt. Şimdi onu bir
köşesinden tut, karşı kenarına doğru katla. Açtığında bir çizgi göreceksin.

İşte bu çizgi — bu basit, sıradan çizgi — binlerce yıldır insanlığın
peşinden koştuğu en güzel sırlardan birini saklıyor. Üçgenler dünyasının
kapısı bu kâğıtta açılıyor.

Söyle bakalım dostum: Bir üçgenin üç açısının toplamı kaçtır biliyor
musun? Cevabı söyleme hemen — önce şunu düşün: NEDEN öyledir? Bu sayı
neden 180? 200 değil, 150 değil, tam 180?
`.trim(),
    milestones: [
      'Üçgenin iç açıları toplamı = 180° (kanıt: paralel doğrular)',
      'Üçgen eşitsizliği: iki kenarın toplamı üçüncüden büyük olmalı',
      'Pisagor bağıntısı: a² + b² = c² (dik üçgen)',
      'Üçgen çeşitleri: kenarlarına göre (eşkenar, ikizkenar, çeşitkenar), açılarına göre',
      'Dönüşüm geometrisi: öteleme, yansıma, dönme — üçgenle uygulamalı',
      'Geometrik cisimlere geçiş: üçgen → piramit (dikdörtgenler prizmasıyla kıyas)',
    ],
    lgsQuestionTriggers: [
      'pisagor',
      'ucgen_esitsizligi',
      'donusum_geometrisi',
    ],
  },

  // ----- Minimal (iskelet) -----

  {
    id: 'dna_kesfi',
    characterId: 'aziz_sancar',
    mebUnit: 'DNA ve Genetik Kod',
    title: 'Hücrenin İçindeki Kütüphane',
    openingPrompt: `
Bir hücreyi düşün — gözle göremezsin ama içinde 2 metrelik bir DNA dizisi
var. Hem de katlanmış, sığdırılmış. Sen tek bir hücresin, ama içinde tüm
ailenin hikâyesi yazılı. Bunu hiç düşünmüş müydün?
`.trim(),
    milestones: [
      'DNA nedir, nereden geliyor',
      'Genetik kod ve protein üretimi',
      'Kalıtım ve aileden gelen özellikler',
    ],
    lgsQuestionTriggers: ['dna_yapisi'],
  },

  {
    id: 'kelimenin_hikayesi',
    characterId: 'yunus_emre',
    mebUnit: 'Sözcükte Anlam / Fiilimsiler',
    title: 'Bir Kelimenin Yolculuğu',
    openingPrompt: `
"Sevgi" desem, aklında ne canlanır? Sıcaklık mı, bir yüz mü, bir kelimenin
sesi mi? Her sözcük bir yolculuk taşır. Gel bugün bir kelimenin peşine
düşelim de, dilin ne kadar büyük bir hazine olduğunu görelim.
`.trim(),
    milestones: [
      'Gerçek anlam, mecaz anlam, terim anlam',
      'Fiilimsiler: isim-fiil, sıfat-fiil, zarf-fiil',
      'Anlatım bozuklukları',
    ],
    lgsQuestionTriggers: ['sozcukte_anlam', 'fiilimsiler'],
  },

  {
    id: 'kıssadan_hisse',
    characterId: 'mevlana',
    mebUnit: 'Kader İnancı / Ahlak',
    title: 'Kuyudan Çıkan Ay',
    openingPrompt: `
Sana bir kıssa anlatayım, dost. Bir adam varmış, bir kuyuya bakmış,
ayın suya düştüğünü sanmış. "Ay düştü!" diye haykırmış. Sen ne dersin —
ay gerçekten kuyuya mı düşmüş, yoksa adam mı yanlış görmüş? Ve bu hikâye
bize "bakmak" ile "görmek" arasındaki farkı anlatabilir mi acaba?
`.trim(),
    milestones: [
      'Kader inancı ve insanın sorumluluğu',
      'Tasavvufta sevgi ve hoşgörü',
      'Ahlak ilkeleri ve günlük hayat',
    ],
    lgsQuestionTriggers: ['kader_inanci'],
  },

  {
    id: 'kelime_sahnesi',
    characterId: 'shakespeare',
    mebUnit: 'Friendship / Teen Life',
    title: 'A Friend in Need / Dosta İhtiyaç Anı',
    openingPrompt: `
"A friend in need is a friend indeed" — duydun mu hiç bu cümleyi?
Anlamı: gerçek dost, ihtiyaç anında belli olur. Şimdi seninle bir sahne
kuralım: en iyi arkadaşın bir sorunla geldi sana. Sen ona İngilizce
hangi cümleyi kurarak destek olurdun? Birlikte bulalım!
`.trim(),
    milestones: [
      'Friendship vocabulary',
      'Simple past tense (was/were, did)',
      'Modals: should, could (advice)',
    ],
    lgsQuestionTriggers: ['friendship_vocab', 'simple_past'],
  },
];

export function getAdventureByCharacter(characterId: string): Adventure | undefined {
  return ADVENTURES.find((a) => a.characterId === characterId);
}
