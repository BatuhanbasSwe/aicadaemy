import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  // Throw at first use, not at import time, so build doesn't fail without env.
  console.warn('[gemini] GEMINI_API_KEY not set');
}

let cached: GoogleGenerativeAI | null = null;

export function getGemini(): GoogleGenerativeAI {
  if (!apiKey) throw new Error('GEMINI_API_KEY missing');
  if (!cached) cached = new GoogleGenerativeAI(apiKey);
  return cached;
}

export const GEMINI_MODEL = 'gemini-2.5-flash';
