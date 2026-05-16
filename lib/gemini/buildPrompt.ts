import type { Character, ClassLevel, ChatMessage, Adventure } from '@/lib/types';

// Geçmiş + kullanıcı mesajından, karakterin sistem prompt'u ile birleşmiş
// Gemini contents dizisi üret. Gemini "user" ve "model" rolleri kullanır.

export function buildHistoryContents(
  history: { role: 'user' | 'character'; content: string }[],
  userMessage: string,
) {
  const turns = history.map((m) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }],
  }));
  turns.push({ role: 'user', parts: [{ text: userMessage }] });
  return turns;
}

export function buildSystemInstruction(
  character: Character,
  classLevel: ClassLevel,
  adventure?: Adventure,
) {
  const adventureBlock = adventure
    ? `
MEVCUT MACERA: "${adventure.title}"
MEB ÜNİTESİ: ${adventure.mebUnit}
Bu maceranın milestone'ları (hangi noktalardan geçmen umulur):
${adventure.milestones.map((m, i) => `  ${i + 1}. ${m}`).join('\n')}

Konuyu doğal bir akışla bu noktalar arasında dolaştır. Çocuğu zorlamadan
milestone'lara çek, ama sıkı sıkı bir sırada gitme. Çocuk konu dışına
çıkarsa nazikçe geri getir.
`.trim()
    : '';

  return `
ROL: ${character.name} (${character.subjectLabel})
SINIF SEVİYESİ: ${classLevel}. sınıf öğrencisi

${character.systemPrompt}

${adventureBlock}

ÇIKTI FORMAT KURALI (KRİTİK):
Yanıtın MUTLAKA verilen JSON şemasına uymalı:
- answer: senin sözel cevabın (kendi karakterinden)
- followUpQuestions: çocuğun "şimdi şunu da merak etsem" diyebileceği 3 farklı, kısa, başlangıçta soru işareti ile biten merak sorusu (her biri 8-15 kelime)
- shouldInjectLgsQuestion: SADECE şu durumlardan birinde true yap:
   (a) Çocuk son 3-4 mesajdır bir kavramı yeterince eşeledi, pekiştirme zamanı
   (b) Çocuk doğrudan "bana soru sor" / "test et" gibi bir şey istedi
   (c) Doğal bir test anı geldi
   Aksi halde false.
`.trim();
}
