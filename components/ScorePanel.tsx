"use client";
import { useGameStore } from "@/lib/store/useGameStore";
import { GitBranch, FileQuestion, CheckCircle2, Flame, Copy, Check } from "lucide-react";
import { useState } from "react";

function StatRing({
  icon: Icon,
  value,
  target,
  label,
  hint,
  colorClass,
  strokeClass,
}: {
  icon: React.ElementType;
  value: number;
  target: number;
  label: string;
  hint: string;
  colorClass: string;
  strokeClass: string;
}) {
  const pct = Math.min(100, Math.round((value / target) * 100));
  const r = 18;
  const c = 2 * Math.PI * r;
  return (
    <div className="bg-white border border-ink-200 rounded-2xl p-4 shadow-card flex items-center gap-3">
      <div className="relative w-12 h-12 shrink-0">
        <svg viewBox="0 0 48 48" className="w-full h-full -rotate-90">
          <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(15,17,21,0.06)" strokeWidth="3.5" />
          <circle
            cx="24" cy="24" r={r} fill="none"
            className={strokeClass} strokeWidth="3.5" strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c}
          />
        </svg>
        <div className={`absolute inset-1.5 rounded-full ${colorClass} flex items-center justify-center`}>
          <Icon className="w-4 h-4" strokeWidth={2.2} />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] text-ink-500 font-medium">{label}</div>
        <div className="flex items-baseline gap-1 mt-0.5">
          <span className="font-display font-bold text-[22px] tracking-tight text-ink-900 tabular-nums leading-none">{value}</span>
          <span className="text-[12px] text-ink-400 font-medium">/ {target}</span>
        </div>
        <div className="text-[10.5px] text-ink-500 mt-0.5">{hint}</div>
      </div>
    </div>
  );
}

export default function ScorePanel() {
  const score = useGameStore((s) => s.score);
  const user  = useGameStore((s) => s.user);
  const [copied, setCopied] = useState(false);

  const accuracy = score.lgsAnswered > 0
    ? Math.round((score.lgsCorrect / score.lgsAnswered) * 100)
    : 0;

  const copyCode = () => {
    if (!user?.inviteCode) return;
    navigator.clipboard.writeText(user.inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-3">
      {/* Stat rings */}
      <StatRing
        icon={GitBranch}
        value={score.nodesOpened}
        target={10}
        label="Açılan düğüm"
        hint={`${Math.max(0, 10 - score.nodesOpened)} düğüm daha → +50 XP`}
        colorClass="bg-brand-50"
        strokeClass="stroke-brand-500"
      />
      <StatRing
        icon={FileQuestion}
        value={score.lgsAnswered}
        target={20}
        label="LGS sorusu"
        hint="Günlük hedef"
        colorClass="bg-sky-100"
        strokeClass="stroke-sky-500"
      />
      <StatRing
        icon={CheckCircle2}
        value={score.lgsCorrect}
        target={score.lgsAnswered || 1}
        label="Doğru cevap"
        hint={`%${accuracy} başarı oranı`}
        colorClass="bg-mint-100"
        strokeClass="stroke-mint-500"
      />

      {/* Streak card */}
      <div className="bg-white border border-ink-200 rounded-2xl p-4 shadow-card">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-coral-100 flex items-center justify-center">
            <Flame className="w-3.5 h-3.5 text-coral-500" strokeWidth={2.5} />
          </div>
          <span className="text-[12px] text-ink-700 font-semibold">Günlük seri</span>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full ${i < (score.nodesOpened > 0 ? 1 : 0) ? "bg-coral-500" : "bg-ink-100"}`}
            />
          ))}
        </div>
        <div className="mt-1.5 text-[10px] text-ink-400 font-mono">Bugün aktif 🔥</div>
      </div>

      {/* Veli paneli notu — sunum kartı */}
      <div className="rounded-2xl border border-brand-300 bg-brand-50 p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-brand-600 font-bold text-[12px] uppercase tracking-wider">🗺️ Yol Haritası</span>
        </div>
        <p className="text-[12px] text-brand-700 leading-relaxed">
          <strong>Veli paneli</strong> — ebeveynler çocuğunun merak haritasını ve LGS gelişimini takip edecek.
          <span className="text-brand-500"> Yakında.</span>
        </p>
      </div>

      {/* Invite code */}
      {user?.inviteCode && (
        <div className="bg-ink-950 rounded-2xl p-4 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-brand-500/20 blur-2xl" />
          <div className="relative">
            <div className="text-[10px] uppercase tracking-widest text-white/50 font-semibold mb-1">
              Davet kodun
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 font-mono font-bold text-white text-lg tracking-widest">
                {user.inviteCode}
              </code>
              <button
                onClick={copyCode}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
