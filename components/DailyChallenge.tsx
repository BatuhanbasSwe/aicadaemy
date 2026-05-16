"use client";
import { useEffect, useState } from "react";
import { LGS_QUESTIONS } from "@/lib/content/lgs-questions";
import { useGameStore } from "@/lib/store/useGameStore";
import { Trophy, Clock, Crown, X, Flame } from "lucide-react";

const DAILY_QUESTIONS = LGS_QUESTIONS.slice(0, 5);

type Mode = "idle" | "playing" | "done";

interface ChallengeResult {
  date: string;
  correctCount: number;
  totalSeconds: number;
  score: number;
  finishedAt: number;
}

interface FakeScore {
  name: string;
  avatar: string;
  color: string;
  correct: number;
  time: number;
  score: number;
  isMe?: boolean;
}

/** Aynı gün için deterministik sahte rakipler — herkese aynı 5 soru sorulduğu için. */
const FAKE_SCORES: FakeScore[] = [
  { name: "Defne",  avatar: "D", color: "#E8B83A", correct: 5, time: 38, score: 4620 },
  { name: "Yiğit",  avatar: "Y", color: "#5E8BC3", correct: 4, time: 42, score: 3580 },
  { name: "Zeynep", avatar: "Z", color: "#3FAE82", correct: 5, time: 51, score: 4490 },
  { name: "Mert",   avatar: "M", color: "#E58A5A", correct: 3, time: 33, score: 2670 },
  { name: "Burak",  avatar: "B", color: "#6B57DC", correct: 4, time: 56, score: 3440 },
];

function computeScore(correctCount: number, totalSeconds: number) {
  return Math.max(0, correctCount * 1000 - totalSeconds * 10);
}

function todayKey() {
  return new Date().toDateString();
}

export default function DailyChallenge({
  username,
}: {
  username: string;
}) {
  const [mode, setMode] = useState<Mode>("idle");
  const [qIdx, setQIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsed, setElapsed] = useState(0);
  const [answers, setAnswers] = useState<{ correct: boolean; seconds: number }[]>([]);
  const [todayResult, setTodayResult] = useState<ChallengeResult | null>(null);

  const recordLgsAnswer = useGameStore((s) => s.recordLgsAnswer);

  // İlk render'da kullanıcı bugün çözmüş mü kontrolü
  useEffect(() => {
    try {
      const raw = localStorage.getItem("lgs-kasifi-daily-challenge");
      if (!raw) return;
      const r: ChallengeResult = JSON.parse(raw);
      if (r.date === todayKey()) {
        setTodayResult(r);
        setMode("done");
      }
    } catch { /* */ }
  }, []);

  // Playing modunda her saniye tick
  useEffect(() => {
    if (mode !== "playing") return;
    const id = setInterval(() => setElapsed(Math.round((Date.now() - startTime) / 1000)), 250);
    return () => clearInterval(id);
  }, [mode, startTime]);

  function start() {
    setMode("playing");
    setQIdx(0);
    setSelectedIdx(null);
    setStartTime(Date.now());
    setElapsed(0);
    setAnswers([]);
  }

  function submitAnswer() {
    if (selectedIdx === null) return;
    const q = DAILY_QUESTIONS[qIdx];
    const correct = selectedIdx === q.correctIndex;
    const seconds = Math.max(1, Math.round((Date.now() - startTime) / 1000));
    const newAnswers = [...answers, { correct, seconds }];
    setAnswers(newAnswers);
    recordLgsAnswer(q.difficulty, correct);

    if (qIdx + 1 >= DAILY_QUESTIONS.length) {
      const correctCount = newAnswers.filter((a) => a.correct).length;
      const totalSeconds = newAnswers.reduce((s, a) => s + a.seconds, 0);
      const score = computeScore(correctCount, totalSeconds);
      const result: ChallengeResult = {
        date: todayKey(),
        correctCount,
        totalSeconds,
        score,
        finishedAt: Date.now(),
      };
      try {
        localStorage.setItem("lgs-kasifi-daily-challenge", JSON.stringify(result));
      } catch { /* */ }
      setTodayResult(result);
      setMode("done");
    } else {
      setQIdx(qIdx + 1);
      setSelectedIdx(null);
      setStartTime(Date.now());
      setElapsed(0);
    }
  }

  function reset() {
    try {
      localStorage.removeItem("lgs-kasifi-daily-challenge");
    } catch { /* */ }
    setTodayResult(null);
    setMode("idle");
    setQIdx(0);
    setAnswers([]);
  }

  const leaderboard: FakeScore[] = [
    ...FAKE_SCORES,
    ...(todayResult
      ? [{
          name: username ?? "Sen",
          avatar: (username?.[0] ?? "S").toUpperCase(),
          color: "#6B57DC",
          correct: todayResult.correctCount,
          time: todayResult.totalSeconds,
          score: todayResult.score,
          isMe: true,
        }]
      : []),
  ].sort((a, b) => b.score - a.score);

  /* ─── IDLE ────────────────────────────── */
  if (mode === "idle" && !todayResult) {
    return (
      <div className="bg-gradient-to-br from-brand-500 to-brand-700 text-white rounded-2xl shadow-card p-6 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-3xl shrink-0">
            🏁
          </div>
          <div className="flex-1">
            <div className="text-[10.5px] uppercase tracking-widest text-white/70 font-semibold mb-1">
              Günün Yarışması
            </div>
            <h3 className="font-display font-bold text-[19px] tracking-tight leading-snug">
              5 soru. Herkese aynı. En hızlı + en doğru kazanır.
            </h3>
            <p className="text-[12px] text-white/75 mt-1">
              Doğru: <strong>+1000</strong> · Her saniye: <strong>-10</strong>
            </p>
          </div>
          <button
            onClick={start}
            className="shrink-0 px-5 py-3 rounded-xl bg-white text-brand-700 font-display font-bold text-[13px] hover:bg-sun-100 transition shadow-pop"
          >
            BAŞLA →
          </button>
        </div>
      </div>
    );
  }

  /* ─── PLAYING ─────────────────────────── */
  if (mode === "playing") {
    const q = DAILY_QUESTIONS[qIdx];
    return (
      <div className="bg-white border-2 border-brand-500 rounded-2xl shadow-pop overflow-hidden">
        <div className="px-5 py-3 bg-brand-50 border-b border-brand-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-brand-500 text-white font-bold text-[12px] flex items-center justify-center">
              {qIdx + 1}
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest text-brand-700 font-semibold">
                Yarışma sorusu {qIdx + 1}/{DAILY_QUESTIONS.length}
              </div>
              <div className="text-[10.5px] text-ink-500">
                {q.year} · {q.subject} · {q.unit}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-brand-100">
            <Clock className="w-3.5 h-3.5 text-coral-600" strokeWidth={2.5} />
            <span className="font-mono tabular-nums font-bold text-[13px] text-ink-900">{elapsed}s</span>
          </div>
        </div>

        <div className="px-5 py-5">
          <p className="text-[14.5px] text-ink-900 leading-relaxed mb-4">{q.question}</p>
          <div className="space-y-2 mb-5">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelectedIdx(i)}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 text-[13px] transition flex items-start gap-3 ${
                  selectedIdx === i
                    ? "border-brand-500 bg-brand-50 text-brand-700 font-semibold"
                    : "border-ink-200 hover:border-ink-300 bg-white text-ink-900"
                }`}
              >
                <span className={`shrink-0 w-6 h-6 rounded-md flex items-center justify-center font-bold text-[11px] ${
                  selectedIdx === i ? "bg-brand-500 text-white" : "bg-ink-100 text-ink-700"
                }`}>{String.fromCharCode(65 + i)}</span>
                <span className="flex-1">{opt}</span>
              </button>
            ))}
          </div>
          <button
            onClick={submitAnswer}
            disabled={selectedIdx === null}
            className="w-full py-3 rounded-xl bg-ink-900 hover:bg-ink-700 disabled:bg-ink-200 disabled:text-ink-400 disabled:cursor-not-allowed text-white font-display font-bold text-[13.5px] transition"
          >
            {qIdx + 1 < DAILY_QUESTIONS.length ? "Sıradaki Soru →" : "Yarışmayı Bitir 🏁"}
          </button>
        </div>
      </div>
    );
  }

  /* ─── DONE ────────────────────────────── */
  const myRank = leaderboard.findIndex((r) => r.isMe) + 1;
  return (
    <div className="bg-white border border-ink-200 rounded-2xl shadow-card overflow-hidden">
      <div className="px-5 py-4 border-b border-ink-200 flex items-center justify-between bg-gradient-to-r from-sun-100 to-coral-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
            <Trophy className="w-5 h-5 text-sun-500" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-display font-bold text-[15px] text-ink-900 tracking-tight">
              Günün Yarışı Tamamlandı 🎉
            </h3>
            <div className="text-[11px] text-ink-700">
              Yarın 5 yeni soru hazır olacak
            </div>
          </div>
        </div>
        <button
          onClick={reset}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-ink-100 text-ink-700 text-[11.5px] font-semibold transition border border-ink-200"
          title="Sıfırla (demo için)"
        >
          <X className="w-3 h-3" />
          Sıfırla
        </button>
      </div>

      <div className="px-5 py-4 grid grid-cols-3 gap-3 border-b border-ink-200">
        <div className="bg-mint-100/60 border border-mint-500/30 rounded-xl p-3 text-center">
          <div className="font-display font-bold text-[24px] text-mint-500 tabular-nums leading-none">
            {todayResult?.correctCount}<span className="text-ink-400 text-[14px]">/5</span>
          </div>
          <div className="text-[10.5px] text-ink-500 mt-1.5 font-semibold uppercase tracking-wider">Doğru</div>
        </div>
        <div className="bg-brand-50 border border-brand-300/40 rounded-xl p-3 text-center">
          <div className="font-display font-bold text-[24px] text-brand-700 tabular-nums leading-none">
            {todayResult?.totalSeconds}s
          </div>
          <div className="text-[10.5px] text-ink-500 mt-1.5 font-semibold uppercase tracking-wider">Toplam süre</div>
        </div>
        <div className="bg-sun-100 border border-sun-500/30 rounded-xl p-3 text-center">
          <div className="font-display font-bold text-[24px] text-sun-500 tabular-nums leading-none">
            {todayResult?.score}
          </div>
          <div className="text-[10.5px] text-ink-500 mt-1.5 font-semibold uppercase tracking-wider">Puan</div>
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="text-[10.5px] uppercase tracking-widest text-ink-500 font-semibold mb-3 flex items-center gap-2">
          <Flame className="w-3.5 h-3.5 text-coral-500" />
          Bugünün Liderlik Tablosu
        </div>
        <div className="space-y-1.5">
          {leaderboard.map((u, i) => (
            <div
              key={u.name + i}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${u.isMe ? "bg-brand-50 border border-brand-300/40" : "bg-paper/60"}`}
            >
              <div className={`w-7 h-7 rounded-md flex items-center justify-center font-display font-bold text-[12px] ${
                i === 0 ? "bg-sun-500 text-white" :
                i === 1 ? "bg-ink-300 text-ink-900" :
                i === 2 ? "bg-coral-500 text-white" :
                "bg-ink-100 text-ink-500"
              }`}>{i + 1}</div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-[13px]" style={{ background: u.color }}>
                {u.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className={`text-[13px] font-semibold truncate ${u.isMe ? "text-brand-700" : "text-ink-900"}`}>
                    {u.name}
                  </span>
                  {u.isMe && <span className="text-[9px] uppercase font-bold bg-brand-500 text-white px-1.5 py-0.5 rounded">SEN</span>}
                  {i === 0 && <Crown className="w-3.5 h-3.5 text-sun-500 shrink-0" strokeWidth={2.5} />}
                </div>
                <div className="text-[10.5px] text-ink-500 tabular-nums">
                  {u.correct}/5 doğru · {u.time}s
                </div>
              </div>
              <div className="font-mono font-bold text-[14px] tabular-nums text-ink-900">{u.score}</div>
            </div>
          ))}
        </div>
        {myRank > 0 && (
          <div className="mt-4 text-center text-[12.5px] text-ink-700 bg-paper/60 py-2.5 rounded-lg">
            🏆 Bugünkü sıralaman: <strong className="text-ink-900">#{myRank} / {leaderboard.length}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
