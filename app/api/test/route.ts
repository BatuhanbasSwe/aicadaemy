import { NextResponse } from 'next/server';
import { getGemini, GEMINI_MODEL } from '@/lib/gemini/client';

export async function GET() {
  try {
    const model = getGemini().getGenerativeModel({ model: GEMINI_MODEL });
    const result = await model.generateContent(
      'Türkçe bir cümleyle kendini tanıt: "Merhaba ben Gemini..."',
    );
    const text = result.response.text();
    return NextResponse.json({ ok: true, text });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
