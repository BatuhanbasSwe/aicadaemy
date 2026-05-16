import { NextResponse } from 'next/server';
import { SchemaType, type Schema } from '@google/generative-ai';
import { getGemini, GEMINI_MODEL } from '@/lib/gemini/client';
import {
  buildHistoryContents,
  buildSystemInstruction,
} from '@/lib/gemini/buildPrompt';
import { getCharacter } from '@/lib/content/characters';
import { getAdventureByCharacter } from '@/lib/content/adventures';
import { pickQuestionForCharacter } from '@/lib/content/lgs-questions';
import type {
  ChatApiRequest,
  ChatApiResponse,
  ClassLevel,
} from '@/lib/types';

export const runtime = 'nodejs';

const RESPONSE_SCHEMA: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    answer: { type: SchemaType.STRING },
    followUpQuestions: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      minItems: 3,
      maxItems: 3,
    },
    shouldInjectLgsQuestion: { type: SchemaType.BOOLEAN },
  },
  required: ['answer', 'followUpQuestions', 'shouldInjectLgsQuestion'],
} as Schema;

export async function POST(req: Request) {
  let body: ChatApiRequest;
  try {
    body = (await req.json()) as ChatApiRequest;
  } catch {
    return NextResponse.json(
      { error: 'Geçersiz istek gövdesi.' },
      { status: 400 },
    );
  }

  const { characterId, classLevel, history, userMessage } = body;
  if (!characterId || !userMessage) {
    return NextResponse.json(
      { error: 'characterId ve userMessage zorunlu.' },
      { status: 400 },
    );
  }

  const character = getCharacter(characterId);
  if (!character) {
    return NextResponse.json(
      { error: `Bilinmeyen karakter: ${characterId}` },
      { status: 400 },
    );
  }

  const adventure = getAdventureByCharacter(characterId);
  const level: ClassLevel = (classLevel ?? 8) as ClassLevel;
  const systemInstruction = buildSystemInstruction(character, level, adventure);
  const contents = buildHistoryContents(history ?? [], userMessage);

  try {
    const model = getGemini().getGenerativeModel({
      model: GEMINI_MODEL,
      systemInstruction,
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: RESPONSE_SCHEMA,
        temperature: 0.85,
      },
    });

    const result = await model.generateContent({ contents });
    const text = result.response.text();

    let parsed: {
      answer: string;
      followUpQuestions: string[];
      shouldInjectLgsQuestion: boolean;
    };
    try {
      parsed = JSON.parse(text);
    } catch {
      console.error('[api/chat] JSON parse fail. Raw:', text);
      return NextResponse.json(
        {
          error:
            'Karakterimiz biraz dalmış görünüyor, bir daha sorar mısın? 🙂',
        },
        { status: 502 },
      );
    }

    // followUpQuestions'in 3 elemanlı olduğundan emin ol
    const fu = (parsed.followUpQuestions ?? []).slice(0, 3);
    while (fu.length < 3) fu.push('Bunu biraz daha açıklar mısın?');

    // Server tarafında LGS sorusu seç (Gemini ID'leri bilmiyor)
    let suggestedLgsQuestionId: string | null = null;
    if (parsed.shouldInjectLgsQuestion) {
      const askedIds = (history ?? [])
        .map((m) => (m as unknown as { lgsQuestionId?: string }).lgsQuestionId)
        .filter((x): x is string => Boolean(x));
      const q = pickQuestionForCharacter(characterId, askedIds);
      suggestedLgsQuestionId = q?.id ?? null;
    }

    const payload: ChatApiResponse = {
      answer: parsed.answer,
      followUpQuestions: [fu[0], fu[1], fu[2]],
      shouldInjectLgsQuestion: Boolean(
        parsed.shouldInjectLgsQuestion && suggestedLgsQuestionId,
      ),
      suggestedLgsQuestionId,
    };

    return NextResponse.json(payload);
  } catch (err) {
    console.error('[api/chat] Gemini error:', err);
    return NextResponse.json(
      {
        error:
          'Karakterimiz şu an düşüncelere daldı. Birazdan tekrar dene 🙂',
      },
      { status: 502 },
    );
  }
}

// LGS sorusunu getir (UI'dan id ile çağırır)
export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get('lgsId');
  if (!id) {
    return NextResponse.json({ error: 'lgsId gerekli' }, { status: 400 });
  }
  const { getQuestionById } = await import('@/lib/content/lgs-questions');
  const q = getQuestionById(id);
  if (!q) {
    return NextResponse.json({ error: 'Soru bulunamadı' }, { status: 404 });
  }
  return NextResponse.json(q);
}
