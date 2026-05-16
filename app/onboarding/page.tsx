"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/lib/store/useGameStore";
import type { ClassLevel, SubjectId, CharacterId } from "@/lib/types";
import { Compass, ArrowRight, ArrowLeft, Check } from "lucide-react";

/* ── Character stubs (Batuhan'ın characters.ts'i hazır olunca import edilecek) */
const CHAR_STUBS: Record<
  CharacterId,
  { name: string; emoji: string; greeting: string; from: string; to: string }
> = {
  ataturk: {
    name: "Mustafa Kemal Atatürk",
    emoji: "🇹🇷",
    greeting: "Merhaba genç Türk! İnkılap tarihimizi birlikte keşfedelim. Bilgi en büyük silâhtır.",
    from: "#DC2626",
    to: "#7F1D1D",
  },
  cahit_arf: {
    name: "Cahit Arf",
    emoji: "🧮",
    greeting: "Matematiğin güzelliğini birlikte keşfedeceğiz! Her problem bir bulmaca, her çözüm bir keşif.",
    from: "#6B57DC",
    to: "#4A38AE",
  },
  aziz_sancar: {
    name: "Aziz Sancar",
    emoji: "🔬",
    greeting: "Fen bilimlerinin kapısını birlikte aralayalım. Merak en büyük bilim insanının sırrıdır.",
    from: "#3FAE82",
    to: "#5E8BC3",
  },
  yunus_emre: {
    name: "Yunus Emre",
    emoji: "📜",
    greeting: "Hoş geldin dosta! Türkçenin güzelliklerini birlikte keşfedelim. Söz var söz içinde gizli.",
    from: "#E8B83A",
    to: "#D97706",
  },
  mevlana: {
    name: "Mevlana Celaleddin Rumi",
    emoji: "🕊️",
    greeting: "Bil ki gönül güzel işlerle açılır. Her sorunun cevabı merakın içindedir.",
    from: "#6366F1",
    to: "#4F46E5",
  },
  shakespeare: {
    name: "William Shakespeare",
    emoji: "🎭",
    greeting: "Welcome, young scholar! Together we shall master the English language. The play's the thing!",
    from: "#475569",
    to: "#1E293B",
  },
};

const SUBJECT_TO_CHAR: Record<SubjectId, CharacterId> = {
  matematik: "cahit_arf",
  inkilap: "ataturk",
  fen: "aziz_sancar",
  turkce: "yunus_emre",
  din: "mevlana",
  ingilizce: "shakespeare",
};

const SUBJECTS: { id: SubjectId; label: string; emoji: string; desc: string }[] = [
  { id: "matematik",  label: "Matematik",             emoji: "🧮", desc: "Sayılar, cebir, geometri" },
  { id: "inkilap",   label: "T.C. İnkılap Tarihi",   emoji: "🇹🇷", desc: "Osmanlı'dan Cumhuriyet'e" },
  { id: "fen",       label: "Fen Bilimleri",          emoji: "🔬", desc: "Fizik, kimya, biyoloji" },
  { id: "turkce",    label: "Türkçe",                 emoji: "📜", desc: "Paragraf, yazım, dil bilgisi" },
  { id: "din",       label: "Din Kültürü",             emoji: "🕊️", desc: "Değerler ve inanç" },
  { id: "ingilizce", label: "İngilizce",              emoji: "🎭", desc: "Grammar, vocabulary, reading" },
];

const CLASS_LEVELS: ClassLevel[] = [5, 6, 7, 8];

function genInviteCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return `KAS-${code}`;
}

/* ── Step progress dots */
function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i === current
              ? "w-6 h-2 bg-brand-500"
              : i < current
              ? "w-2 h-2 bg-brand-300"
              : "w-2 h-2 bg-ink-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const { setUser, setCharacter } = useGameStore();

  const [step, setStep] = useState(0);
  const [username, setUsername] = useState("");
  const [classLevel, setClassLevel] = useState<ClassLevel | null>(null);
  const [subject, setSubject] = useState<SubjectId | null>(null);

  const charId = subject ? SUBJECT_TO_CHAR[subject] : null;
  const char = charId ? CHAR_STUBS[charId] : null;

  const canNext0 = username.trim().length >= 2 && classLevel !== null;
  const canNext1 = subject !== null;

  function handleStart() {
    if (!username || !classLevel || !charId) return;
    const inviteCode = genInviteCode();
    setUser({ username: username.trim(), classLevel, inviteCode });
    setCharacter(charId);
    router.push("/chat");
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-4">
      {/* Card */}
      <div className="w-full max-w-lg bg-white border border-ink-200 rounded-3xl shadow-pop overflow-hidden">
        {/* Header bar */}
        <div className="px-8 pt-8 pb-6 border-b border-ink-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <Compass className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-display font-bold text-lg text-ink-900 leading-none">LGS Kâşifi</div>
              <div className="text-[11px] uppercase tracking-widest text-ink-400 font-medium mt-0.5">
                merak et · keşfet · kazan
              </div>
            </div>
          </div>
          <StepDots current={step} total={4} />
        </div>

        {/* Step content */}
        <div className="px-8 py-7">
          {/* ── STEP 0: İsim + Sınıf ── */}
          {step === 0 && (
            <div className="fade-up space-y-6">
              <div>
                <h2 className="font-display font-bold text-2xl text-ink-900 tracking-tight">
                  Seni tanıyalım 👋
                </h2>
                <p className="text-sm text-ink-500 mt-1">Adını ve sınıfını seç, hemen başlayalım.</p>
              </div>

              {/* Username input */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-ink-500 mb-2">
                  Kullanıcı adın
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="örn: elif_y"
                  maxLength={20}
                  className="w-full px-4 py-3 rounded-xl border border-ink-200 bg-paper focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-ink-900 font-medium text-sm placeholder-ink-400 transition"
                />
              </div>

              {/* Class selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-ink-500 mb-2">
                  Kaçıncı sınıftasın?
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {CLASS_LEVELS.map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setClassLevel(lvl)}
                      className={`py-3 rounded-xl border-2 font-display font-bold text-xl transition ${
                        classLevel === lvl
                          ? "border-brand-500 bg-brand-50 text-brand-700"
                          : "border-ink-200 bg-paper text-ink-700 hover:border-ink-300"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 1: Ders Seçimi ── */}
          {step === 1 && (
            <div className="fade-up space-y-5">
              <div>
                <h2 className="font-display font-bold text-2xl text-ink-900 tracking-tight">
                  Hangi dersi çalışacaksın? 📚
                </h2>
                <p className="text-sm text-ink-500 mt-1">Sana özel bir rehber atanacak.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {SUBJECTS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSubject(s.id)}
                    className={`flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition ${
                      subject === s.id
                        ? "border-brand-500 bg-brand-50"
                        : "border-ink-200 hover:border-ink-300 bg-paper"
                    }`}
                  >
                    <span className="text-2xl mt-0.5">{s.emoji}</span>
                    <div className="min-w-0">
                      <div
                        className={`font-semibold text-sm leading-tight ${
                          subject === s.id ? "text-brand-700" : "text-ink-900"
                        }`}
                      >
                        {s.label}
                      </div>
                      <div className="text-xs text-ink-400 mt-0.5">{s.desc}</div>
                    </div>
                    {subject === s.id && (
                      <div className="ml-auto shrink-0 w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 2: Rehber Kartı ── */}
          {step === 2 && char && charId && (
            <div className="fade-up space-y-5">
              <div>
                <h2 className="font-display font-bold text-2xl text-ink-900 tracking-tight">
                  Rehberin hazır! 🎉
                </h2>
                <p className="text-sm text-ink-500 mt-1">Bu dahi seninle çalışacak.</p>
              </div>

              <div className="rounded-2xl overflow-hidden border border-ink-200 shadow-card">
                {/* Gradient banner */}
                <div
                  className="h-24 flex items-center justify-center text-6xl"
                  style={{ background: `linear-gradient(135deg, ${char.from}, ${char.to})` }}
                >
                  {char.emoji}
                </div>
                <div className="p-5 bg-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-display font-bold text-lg text-ink-900">{char.name}</span>
                    <span className="px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 text-[10px] font-bold uppercase tracking-wider">
                      Rehber
                    </span>
                  </div>
                  <p className="text-sm text-ink-600 leading-relaxed italic">"{char.greeting}"</p>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 3: Başla ── */}
          {step === 3 && (
            <div className="fade-up space-y-5">
              <div>
                <h2 className="font-display font-bold text-2xl text-ink-900 tracking-tight">
                  Her şey hazır, {username}! 🚀
                </h2>
                <p className="text-sm text-ink-500 mt-1">
                  Macera başlıyor. Arkadaşlarını davet etmek için kodunu paylaş.
                </p>
              </div>

              <div className="rounded-2xl bg-ink-950 p-5 relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-brand-500/20 blur-3xl" />
                <div className="relative">
                  <div className="text-[10px] uppercase tracking-widest text-white/50 font-semibold mb-1">
                    Davet kodun
                  </div>
                  <div className="font-mono font-bold text-2xl text-white tracking-widest">
                    {/* We generate on start click; show placeholder */}
                    KAS-••••••
                  </div>
                  <p className="text-xs text-white/50 mt-2">
                    Macera başlayınca kodun skor panelinde görünür.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-ink-200 p-4 bg-paper flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${char?.from ?? "#6B57DC"}, ${char?.to ?? "#4A38AE"})`,
                  }}
                >
                  {char?.emoji}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm text-ink-900">{char?.name}</div>
                  <div className="text-xs text-ink-500 truncate">{char?.greeting?.slice(0, 60)}…</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer nav */}
        <div className="px-8 pb-8 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-ink-200 bg-white hover:bg-paper text-ink-700 text-sm font-semibold transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Geri
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={
                (step === 0 && !canNext0) ||
                (step === 1 && !canNext1)
              }
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition"
            >
              Devam et
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-ink-900 hover:bg-ink-700 text-white text-sm font-bold transition"
            >
              Maceraya Başla!
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
