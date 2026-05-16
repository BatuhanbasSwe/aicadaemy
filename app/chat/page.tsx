"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/lib/store/useGameStore";
import type { CharacterId } from "@/lib/types";
import ChatCard from "@/components/ChatCard";
import CuriosityTree from "@/components/CuriosityTree";
import TasksCard from "@/components/TasksCard";
import FriendList from "@/components/FriendList";
import {
  Compass, Home, ListChecks, BookOpen, Trophy, Users, User,
  Search, Bell, Mail, Flame, Target, Calendar,
  Plus, Check, Clock, Timer, Zap, ArrowRight,
  Crown, Lightbulb, FileQuestion, GitBranch,
} from "lucide-react";

/* ── Character info ─────────────────────────────────────── */
const CHAR_META: Record<CharacterId, { name: string; subject: string }> = {
  ataturk:     { name: "Mustafa Kemal Atatürk",    subject: "T.C. İnkılap Tarihi" },
  cahit_arf:   { name: "Cahit Arf",                 subject: "Matematik" },
  aziz_sancar: { name: "Aziz Sancar",               subject: "Fen Bilimleri" },
  yunus_emre:  { name: "Yunus Emre",                subject: "Türkçe" },
  mevlana:     { name: "Mevlana",                   subject: "Din Kültürü" },
  shakespeare: { name: "William Shakespeare",        subject: "İngilizce" },
};

type PageId = "home" | "tasks" | "topics" | "league" | "friends" | "profile";

const NAV: { id: PageId; label: string; Icon: React.ElementType; badge?: number }[] = [
  { id: "home",    label: "Anasayfa",   Icon: Home },
  { id: "tasks",   label: "Görevler",   Icon: ListChecks },
  { id: "topics",  label: "Konular",    Icon: BookOpen },
  { id: "league",  label: "Lig",        Icon: Trophy },
  { id: "friends", label: "Arkadaşlar", Icon: Users, badge: 2 },
  { id: "profile", label: "Profil",     Icon: User },
];

const PAGE_META: Record<PageId, { title: string; subtitle: string }> = {
  home:    { title: "Anasayfa",   subtitle: "Bugün ne keşfedeceğiz?" },
  tasks:   { title: "Görevler",   subtitle: "Günlük planını yap, XP'yi topla" },
  topics:  { title: "Konular",    subtitle: "LGS 8. sınıf müfredatı · 6 ders" },
  league:  { title: "Lig",        subtitle: "Altın Lig · Haftalık sıralama" },
  friends: { title: "Arkadaşlar", subtitle: "Birlikte çalış, birlikte yüksel" },
  profile: { title: "Profil",     subtitle: "Hesabın ve istatistiklerin" },
};

/* ══════════════════════════════════════════════════════════
   SIDEBAR
   ══════════════════════════════════════════════════════════ */
function Sidebar({
  active, onChange, taskCount,
}: { active: PageId; onChange: (p: PageId) => void; taskCount: number }) {
  return (
    <aside className="w-[244px] shrink-0 bg-ink-950 text-white/85 flex flex-col h-full">
      <div className="px-5 pt-5 pb-4 flex items-center gap-2.5 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
          <Compass className="w-[18px] h-[18px] text-white" strokeWidth={2.5} />
        </div>
        <div className="leading-tight">
          <div className="font-display font-bold text-[17px] tracking-tight text-white">LGS Kâşifi</div>
          <div className="text-[10px] uppercase tracking-[0.16em] text-white/40 font-medium">merak et</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto sidebar-scroll px-3 pt-2 pb-4 min-h-0">
        <div className="px-2 mb-1.5 text-[10.5px] uppercase tracking-[0.18em] text-white/35 font-semibold">Menü</div>
        <div className="space-y-0.5">
          {NAV.map(({ id, label, Icon, badge }) => {
            const isActive = id === active;
            const dynBadge = id === "tasks" && taskCount ? taskCount : badge;
            return (
              <button
                key={id}
                onClick={() => onChange(id)}
                className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] transition relative ${
                  isActive
                    ? "bg-white/8 text-white font-semibold"
                    : "text-white/65 hover:text-white hover:bg-white/5 font-medium"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-coral-500" />
                )}
                <Icon className="w-[17px] h-[17px] shrink-0" strokeWidth={isActive ? 2.5 : 2} />
                <span className="flex-1 text-left">{label}</span>
                {dynBadge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${id === "tasks" ? "bg-white/10 text-white/90" : "bg-coral-500 text-white"}`}>
                    {dynBadge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="px-2 mt-6 mb-1.5 text-[10.5px] uppercase tracking-[0.18em] text-white/35 font-semibold">Genel</div>
        <div className="space-y-0.5">
          {[
            { label: "Hedeflerim", Icon: Target },
            { label: "Takvim",     Icon: Calendar },
            { label: "Bildirimler",Icon: Bell },
          ].map(({ label, Icon }) => (
            <button key={label} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] text-white/55 hover:text-white hover:bg-white/5 font-medium">
              <Icon className="w-[17px] h-[17px]" strokeWidth={2} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="m-3 p-3 rounded-xl bg-white/5 border border-white/8 shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-coral-500/15 flex items-center justify-center">
            <Flame className="w-4 h-4 text-coral-500" strokeWidth={2.5} />
          </div>
          <div className="text-[12px] text-white/85 font-semibold">Günlük seri devam ediyor</div>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className={`flex-1 h-1.5 rounded-full ${i < 1 ? "bg-coral-500" : "bg-white/10"}`} />
          ))}
        </div>
        <div className="mt-1.5 text-[10.5px] text-white/45 font-mono">1 / 7 gün bu hafta</div>
      </div>
    </aside>
  );
}

/* ══════════════════════════════════════════════════════════
   TOPBAR
   ══════════════════════════════════════════════════════════ */
function Topbar({
  title, subtitle, username,
}: { title: string; subtitle: string; username: string }) {
  const initial = username?.[0]?.toUpperCase() ?? "S";
  return (
    <header className="h-14 px-6 flex items-center justify-between border-b border-ink-200 bg-paper/80 backdrop-blur-sm shrink-0">
      <div>
        <h1 className="font-display font-bold text-[18px] tracking-tight text-ink-900 leading-none">{title}</h1>
        {subtitle && <div className="text-[11px] text-ink-500 mt-0.5">{subtitle}</div>}
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-ink-200 text-ink-500 w-56">
          <Search className="w-4 h-4" />
          <input className="flex-1 bg-transparent focus:outline-none text-[12px] text-ink-900 placeholder-ink-400" placeholder="Konu, soru ara…" />
        </div>
        <button className="w-9 h-9 rounded-xl bg-white border border-ink-200 hover:bg-ink-100 transition flex items-center justify-center text-ink-700">
          <Mail className="w-4 h-4" />
        </button>
        <button className="relative w-9 h-9 rounded-xl bg-white border border-ink-200 hover:bg-ink-100 transition flex items-center justify-center text-ink-700">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-coral-500" />
        </button>
        <button className="ml-1 flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl bg-white border border-ink-200 hover:bg-ink-100 transition">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-xs">{initial}</div>
          <div className="text-left leading-tight hidden sm:block">
            <div className="text-[11.5px] font-semibold text-ink-900">{username}</div>
            <div className="text-[9.5px] text-ink-500">Kâşif</div>
          </div>
        </button>
      </div>
    </header>
  );
}

/* ══════════════════════════════════════════════════════════
   COMPACT STAT CARD (for home view)
   ══════════════════════════════════════════════════════════ */
function CompactStatCard({
  Icon, value, target, label, hint, bg, stroke,
}: {
  Icon: React.ElementType; value: number; target: number;
  label: string; hint: string; bg: string; stroke: string;
}) {
  const pct = Math.min(100, Math.round((value / target) * 100));
  const r = 16; const c = 2 * Math.PI * r;
  return (
    <div className="bg-white border border-ink-200 rounded-xl p-3 shadow-card flex items-center gap-3">
      <div className="relative w-11 h-11 shrink-0">
        <svg viewBox="0 0 40 40" className="w-full h-full -rotate-90">
          <circle cx="20" cy="20" r={r} fill="none" stroke="rgba(15,17,21,0.06)" strokeWidth="3" />
          <circle cx="20" cy="20" r={r} fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c} />
        </svg>
        <div className={`absolute inset-1.5 rounded-full ${bg} flex items-center justify-center`}>
          <Icon className="w-4 h-4" strokeWidth={2.2} style={{ color: stroke }} />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[10.5px] text-ink-500 font-medium leading-none">{label}</div>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="font-display font-bold text-[20px] tracking-tight text-ink-900 tabular-nums leading-none">{value}</span>
          <span className="text-[11px] text-ink-400 font-medium">/ {target}</span>
        </div>
        <div className="text-[9.5px] text-ink-500 mt-0.5 truncate">{hint}</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   HOME VIEW — fits in viewport, no scroll
   ══════════════════════════════════════════════════════════ */
function HomeView({ onGoToTasks }: { onGoToTasks: () => void }) {
  const score = useGameStore((s) => s.score);
  const accuracy = score.lgsAnswered > 0
    ? Math.round((score.lgsCorrect / score.lgsAnswered) * 100) : 0;

  const [treeMsg, setTreeMsg] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col px-6 py-3 gap-3 overflow-hidden">
      {/* Compact stat cards */}
      <div className="grid grid-cols-3 gap-3 shrink-0">
        <CompactStatCard Icon={GitBranch} value={score.nodesOpened} target={10}
          label="Açılan düğüm" hint={`${Math.max(0, 10 - score.nodesOpened)} daha → +50 XP`}
          bg="bg-brand-50" stroke="#6B57DC" />
        <CompactStatCard Icon={FileQuestion} value={score.lgsAnswered} target={20}
          label="LGS sorusu" hint="Günlük hedef"
          bg="bg-sky-100" stroke="#5E8BC3" />
        <CompactStatCard Icon={Check} value={score.lgsCorrect} target={Math.max(score.lgsAnswered, 1)}
          label="Doğru cevap" hint={`%${accuracy} başarı`}
          bg="bg-mint-100" stroke="#3FAE82" />
      </div>

      {/* Main grid - fills remaining height */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-3 min-h-0">
        {/* Chat — 60% */}
        <div className="lg:col-span-3 min-h-0 flex flex-col">
          <ChatCard
            externalMessage={treeMsg}
            onExternalSent={() => setTreeMsg(null)}
          />
        </div>
        {/* Right panel — 40% : Tasks + Tree (fit in viewport) */}
        <div className="lg:col-span-2 flex flex-col gap-3 min-h-0">
          <TasksCard onSeeAll={onGoToTasks} />
          <div className="flex-1 min-h-0">
            <CuriosityTree onNodeClick={(node) => setTreeMsg(node.content)} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   TASKS VIEW — full task list
   ══════════════════════════════════════════════════════════ */
const FULL_TASKS = [
  { id: 1, title: "10 Türkçe paragraf sorusu çöz", subject: "Türkçe", chip: "bg-mint-100 text-mint-500", xp: 50, due: "17:00", est: "15 dk", done: false, priority: "high", day: "today" },
  { id: 2, title: "Trablusgarp düğümünü aç", subject: "İnkılap Tarihi", chip: "bg-brand-50 text-brand-700", xp: 30, due: null, est: "10 dk", done: true, priority: "med", day: "today" },
  { id: 3, title: "Üslü ifadeler · kavram tekrarı", subject: "Matematik", chip: "bg-sky-100 text-sky-500", xp: 40, due: "19:30", est: "20 dk", done: false, priority: "med", day: "today" },
  { id: 4, title: "DNA ve Genetik · özet videosu", subject: "Fen Bilimleri", chip: "bg-sun-100 text-sun-500", xp: 25, due: null, est: "8 dk", done: false, priority: "low", day: "today" },
  { id: 5, title: "Atatürk ile sohbet · 5 mesaj", subject: "Günlük seri", chip: "bg-coral-100 text-coral-600", xp: 20, due: null, est: "5 dk", done: true, priority: "low", day: "today" },
  { id: 6, title: "Geometri · Üçgenler denemesi", subject: "Matematik", chip: "bg-sky-100 text-sky-500", xp: 80, due: "Yarın", est: "40 dk", done: false, priority: "high", day: "week" },
  { id: 7, title: "İngilizce · 30 yeni kelime", subject: "İngilizce", chip: "bg-coral-100 text-coral-600", xp: 35, due: "Çar", est: "15 dk", done: false, priority: "med", day: "week" },
  { id: 8, title: "Balkan Savaşları haritası incele", subject: "İnkılap Tarihi", chip: "bg-brand-50 text-brand-700", xp: 45, due: "Per", est: "20 dk", done: false, priority: "med", day: "week" },
];

function TasksView() {
  const [tasks, setTasks] = useState(FULL_TASKS);
  const [tab, setTab] = useState<"today" | "week" | "all">("today");
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");
  const [newTitle, setNewTitle] = useState("");

  const toggleTask = (id: number) =>
    setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const filtered = tasks
    .filter((t) => (tab === "all" ? true : t.day === tab))
    .filter((t) => (filter === "all" ? true : filter === "active" ? !t.done : t.done));

  const today    = tasks.filter((t) => t.day === "today");
  const done     = today.filter((t) => t.done).length;
  const total    = today.length;
  const pct      = total ? Math.round((done / total) * 100) : 0;
  const xpEarned = today.filter((t) => t.done).reduce((s, t) => s + t.xp, 0);
  const xpLeft   = today.filter((t) => !t.done).reduce((s, t) => s + t.xp, 0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setTasks((ts) => [
      ...ts,
      { id: Date.now(), title: newTitle.trim(), subject: "Genel", chip: "bg-brand-50 text-brand-700", xp: 20, due: null, est: "10 dk", done: false, priority: "med" as const, day: "today" },
    ]);
    setNewTitle("");
  };

  return (
    <div className="h-full overflow-y-auto nice-scroll px-6 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-3">
          {/* Tabs + filter */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1 bg-white border border-ink-200 rounded-xl p-1">
              {[
                { id: "today", label: "Bugün", count: tasks.filter((t) => t.day === "today").length },
                { id: "week",  label: "Bu hafta", count: tasks.filter((t) => t.day === "week").length },
                { id: "all",   label: "Tümü", count: tasks.length },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id as typeof tab)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition ${
                    tab === t.id ? "bg-ink-900 text-white" : "text-ink-500 hover:text-ink-900"
                  }`}
                >
                  {t.label}
                  <span className={`text-[10px] tabular-nums px-1.5 rounded-full ${tab === t.id ? "bg-white/20" : "bg-ink-100 text-ink-500"}`}>
                    {t.count}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 text-[11px]">
              {(["all", "active", "done"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-2.5 py-1 rounded-md transition ${
                    filter === f ? "text-ink-900 font-semibold bg-ink-100" : "text-ink-500 hover:text-ink-900"
                  }`}
                >
                  {f === "all" ? "Hepsi" : f === "active" ? "Aktif" : "Tamamlanan"}
                </button>
              ))}
            </div>
          </div>

          {/* Add task form */}
          <form onSubmit={submit} className="bg-white border border-ink-200 rounded-xl p-2 flex items-center gap-2 shadow-card">
            <div className="w-9 h-9 rounded-lg bg-ink-100 flex items-center justify-center text-ink-500 shrink-0">
              <Plus className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Yeni görev ekle…"
              className="flex-1 bg-transparent text-[13px] text-ink-900 placeholder-ink-400 focus:outline-none px-1"
            />
            <button
              type="submit"
              disabled={!newTitle.trim()}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition ${
                newTitle.trim() ? "bg-ink-900 hover:bg-ink-700 text-white" : "bg-ink-100 text-ink-400 cursor-not-allowed"
              }`}
            >
              Ekle
            </button>
          </form>

          {/* Task list */}
          <div className="bg-white border border-ink-200 rounded-2xl shadow-card divide-y divide-ink-200">
            {filtered.length === 0 ? (
              <div className="py-12 text-center">
                <div className="text-[14px] font-semibold text-ink-900">Hepsi temiz! 🎉</div>
                <div className="text-[12px] text-ink-500 mt-1">Bu filtrede görev kalmadı.</div>
              </div>
            ) : (
              filtered.map((t) => (
                <div key={t.id} className="px-5 py-3 flex items-start gap-3 group">
                  <button
                    onClick={() => toggleTask(t.id)}
                    className={`mt-0.5 w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition ${
                      t.done ? "bg-ink-900 border-ink-900 text-white" : "border-ink-300 hover:border-ink-900 bg-white"
                    }`}
                  >
                    {t.done && <Check className="w-3 h-3" strokeWidth={3} />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className={`text-[13.5px] font-semibold ${t.done ? "text-ink-400 line-through" : "text-ink-900"}`}>
                      {t.title}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-ink-500">
                      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md font-semibold ${t.chip}`}>
                        {t.subject}
                      </span>
                      {t.due && (
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {t.due}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1">
                        <Timer className="w-3 h-3" /> {t.est}
                      </span>
                    </div>
                  </div>
                  <span className={`shrink-0 inline-flex items-center gap-1 text-[11.5px] font-bold font-mono tabular-nums ${t.done ? "text-ink-400" : "text-sun-500"}`}>
                    <Zap className="w-3 h-3" strokeWidth={2.5} /> +{t.xp}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right rail */}
        <div className="space-y-4">
          <div className="bg-white border border-ink-200 rounded-2xl shadow-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
                <Target className="w-4 h-4 text-brand-600" strokeWidth={2.2} />
              </div>
              <h3 className="font-display font-bold text-[14px] text-ink-900 tracking-tight">Bugünkü Hedef</h3>
            </div>
            <div className="flex items-end gap-2 mb-3">
              <span className="font-display font-bold text-[32px] text-ink-900 tracking-tight tabular-nums leading-none">
                {done}<span className="text-ink-400 text-[16px]">/{total}</span>
              </span>
              <span className="text-[11px] text-ink-500 mb-1">görev</span>
            </div>
            <div className="h-2 rounded-full bg-ink-100 overflow-hidden mb-3">
              <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-mint-500 transition-all" style={{ width: `${pct}%` }} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-mint-100/60 p-2.5">
                <div className="text-[9.5px] uppercase tracking-wider text-mint-500 font-bold">Kazanılan</div>
                <div className="font-display font-bold text-[16px] text-ink-900 tabular-nums">+{xpEarned} <span className="text-[10px] text-ink-500">XP</span></div>
              </div>
              <div className="rounded-lg bg-sun-100/60 p-2.5">
                <div className="text-[9.5px] uppercase tracking-wider text-sun-500 font-bold">Bekleyen</div>
                <div className="font-display font-bold text-[16px] text-ink-900 tabular-nums">+{xpLeft} <span className="text-[10px] text-ink-500">XP</span></div>
              </div>
            </div>
          </div>

          <div className="bg-ink-950 text-white rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-sun-500/20 blur-3xl" />
            <div className="relative">
              <div className="text-[10px] uppercase tracking-widest text-white/60 font-semibold mb-1">Sonraki Ödül</div>
              <div className="font-display font-bold text-[15px] tracking-tight">Gümüş Pusula rozeti</div>
              <p className="text-[11px] text-white/55 mt-1 mb-3">Bugünkü görevlerin hepsini bitir.</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-sun-500" style={{ width: `${pct}%` }} />
                </div>
                <span className="font-mono text-[10.5px] text-white/75 tabular-nums">{done}/{total}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-ink-200 rounded-2xl p-4 shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-sun-500" strokeWidth={2.5} />
              <div className="text-[10px] uppercase tracking-widest text-ink-500 font-semibold">İpucu</div>
            </div>
            <p className="text-[12px] text-ink-700 leading-relaxed">
              <strong className="text-ink-900">25 dk çalış, 5 dk dinlen.</strong> Pomodoro tekniği ile odaklanmak kolaylaşır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   TOPICS VIEW — 6 subject cards
   ══════════════════════════════════════════════════════════ */
const TOPICS = [
  { name: "T.C. İnkılap Tarihi", guide: "Mustafa Kemal Atatürk", progress: 62, units: 14, done: 9, next: "Trablusgarp Savaşı", ringStroke: "#6B57DC", bg: "bg-brand-50", emoji: "🇹🇷" },
  { name: "Türkçe", guide: "Yunus Emre", progress: 48, units: 18, done: 8, next: "Paragraf · Ana Düşünce", ringStroke: "#3FAE82", bg: "bg-mint-100", emoji: "📜" },
  { name: "Matematik", guide: "Cahit Arf", progress: 35, units: 20, done: 7, next: "Üslü İfadeler", ringStroke: "#5E8BC3", bg: "bg-sky-100", emoji: "🧮" },
  { name: "Fen Bilimleri", guide: "Aziz Sancar", progress: 71, units: 16, done: 11, next: "DNA ve Genetik", ringStroke: "#E8B83A", bg: "bg-sun-100", emoji: "🔬" },
  { name: "İngilizce", guide: "William Shakespeare", progress: 55, units: 12, done: 6, next: "Modal verbs", ringStroke: "#E58A5A", bg: "bg-coral-100", emoji: "🎭" },
  { name: "Din Kültürü", guide: "Mevlana", progress: 80, units: 10, done: 8, next: "Zekât ve sadaka", ringStroke: "#6B57DC", bg: "bg-brand-50", emoji: "🕊️" },
];

function TopicsView() {
  return (
    <div className="h-full overflow-y-auto nice-scroll px-6 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl">
        {TOPICS.map((t) => {
          const r = 22; const c = 2 * Math.PI * r;
          return (
            <div key={t.name} className="bg-white border border-ink-200 rounded-2xl shadow-card p-5 hover:shadow-pop hover:border-ink-300 transition">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl ${t.bg} flex items-center justify-center text-2xl`}>
                  {t.emoji}
                </div>
                <div className="relative w-12 h-12">
                  <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
                    <circle cx="28" cy="28" r={r} fill="none" stroke="rgba(15,17,21,0.06)" strokeWidth="4" />
                    <circle cx="28" cy="28" r={r} fill="none" stroke={t.ringStroke} strokeWidth="4" strokeLinecap="round"
                      strokeDasharray={c} strokeDashoffset={c - (t.progress / 100) * c} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-ink-900 font-mono">
                    %{t.progress}
                  </div>
                </div>
              </div>
              <h4 className="font-display font-bold text-[15px] text-ink-900 tracking-tight">{t.name}</h4>
              <div className="text-[11.5px] text-ink-500 mt-0.5">Rehber: {t.guide}</div>
              <div className="mt-4 pt-4 border-t border-ink-200">
                <div className="text-[10px] uppercase tracking-wider text-ink-500 font-semibold mb-1">Sıradaki</div>
                <div className="text-[12.5px] font-semibold text-ink-900">{t.next}</div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="text-[11px] text-ink-500">
                  <span className="font-semibold text-ink-900 tabular-nums">{t.done}</span> / {t.units} ünite
                </div>
                <button className="text-[12px] font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                  Devam et <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   LEAGUE VIEW — weekly leaderboard
   ══════════════════════════════════════════════════════════ */
const LEAGUE_USERS = [
  { rank: 1, name: "Defne Karaca",  avatar: "D", color: "#E8B83A", xp: 4820, delta: 340, streak: 31, online: true, me: false },
  { rank: 3, name: "Yiğit Arslan",  avatar: "Y", color: "#5E8BC3", xp: 4290, delta: 180, streak: 14, online: false, me: false },
  { rank: 4, name: "Zeynep Bilir",  avatar: "Z", color: "#3FAE82", xp: 3950, delta: 95,  streak: 9,  online: true, me: false },
  { rank: 5, name: "Mert Çelik",    avatar: "M", color: "#E58A5A", xp: 3710, delta: 220, streak: 7,  online: false, me: false },
  { rank: 6, name: "Ayşe Demir",    avatar: "A", color: "#E8B83A", xp: 3540, delta: 50,  streak: 18, online: false, me: false },
];

function LeagueView() {
  const user = useGameStore((s) => s.user);
  const score = useGameStore((s) => s.score);
  const meXp = score.nodesOpened * 50 + score.lgsCorrect * 100;

  const rows = [
    ...LEAGUE_USERS,
    { rank: 2, name: user?.username ?? "Sen", avatar: (user?.username?.[0] ?? "S").toUpperCase(), color: "#6B57DC", xp: 4615 + meXp, delta: 520, streak: 1, online: true, me: true },
  ].sort((a, b) => b.xp - a.xp).map((u, i) => ({ ...u, rank: i + 1 }));

  return (
    <div className="h-full overflow-y-auto nice-scroll px-6 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl">
        <div className="lg:col-span-2 bg-white border border-ink-200 rounded-2xl shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-ink-200 flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-[15px] text-ink-900 tracking-tight">Altın Lig · Bu Hafta</h3>
              <div className="text-[11px] text-ink-500">İlk 3 bir sonraki lige yükselir · 3 gün 14 saat kaldı</div>
            </div>
          </div>
          <div className="px-5 py-2 grid grid-cols-12 gap-2 text-[10px] uppercase tracking-widest text-ink-400 font-semibold border-b border-ink-200/60 bg-paper/50">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Arkadaş</div>
            <div className="col-span-2">Seri</div>
            <div className="col-span-2 text-right">Bu hafta</div>
            <div className="col-span-2 text-right">Toplam XP</div>
          </div>
          <div className="divide-y divide-ink-200">
            {rows.map((u) => {
              const rankColor =
                u.rank === 1 ? "bg-sun-500 text-white" :
                u.rank === 2 ? "bg-ink-300 text-ink-900" :
                u.rank === 3 ? "bg-coral-500 text-white" :
                "bg-ink-100 text-ink-500";
              return (
                <div key={u.name} className={`px-5 py-3 grid grid-cols-12 gap-2 items-center transition ${u.me ? "bg-brand-50/60" : "hover:bg-paper/60"}`}>
                  <div className="col-span-1">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-display font-bold text-[12px] ${rankColor}`}>{u.rank}</div>
                  </div>
                  <div className="col-span-5 flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-white text-base" style={{ background: u.color }}>{u.avatar}</div>
                      {u.online && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-mint-500 border-2 border-white" />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-semibold text-[13px] truncate ${u.me ? "text-brand-700" : "text-ink-900"}`}>{u.name}</span>
                        {u.me && <span className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-brand-500 text-white">SEN</span>}
                        {u.rank === 1 && <Crown className="w-3.5 h-3.5 text-sun-500" strokeWidth={2.5} />}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center gap-1 text-[12px] text-ink-700">
                    <Flame className="w-3.5 h-3.5 text-coral-500" strokeWidth={2.5} />
                    <span className="font-semibold tabular-nums">{u.streak}</span>
                    <span className="text-ink-400 text-[10px]">gün</span>
                  </div>
                  <div className="col-span-2 text-right text-[12px] font-semibold text-mint-500 tabular-nums font-mono">+{u.delta}</div>
                  <div className="col-span-2 text-right font-display font-bold text-[14px] text-ink-900 tabular-nums">
                    {u.xp.toLocaleString("tr-TR")}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Promotion + invite */}
        <div className="space-y-4">
          <div className="bg-white border border-ink-200 rounded-2xl shadow-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-sun-100 flex items-center justify-center">
                <Trophy className="w-4 h-4 text-sun-500" strokeWidth={2.2} />
              </div>
              <h3 className="font-display font-bold text-[14px] text-ink-900 tracking-tight">Yükselme Sıran</h3>
            </div>
            <div className="text-[12px] text-ink-500 mb-3">Lider ile aradaki fark:</div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-display font-bold text-[28px] text-brand-600 tracking-tight tabular-nums">
                {Math.max(0, rows[0].xp - (rows.find((r) => r.me)?.xp ?? 0))}
              </span>
              <span className="text-[12px] text-ink-500">XP</span>
            </div>
            <div className="h-2 rounded-full bg-ink-100 overflow-hidden mb-3">
              <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-coral-500" style={{ width: "76%" }} />
            </div>
            <button className="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-[12px] font-semibold flex items-center justify-center gap-1.5">
              <Zap className="w-3.5 h-3.5" strokeWidth={2.5} /> Hızlı soru çözmeye başla
            </button>
          </div>

          <div className="bg-ink-950 text-white rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-brand-500/30 blur-3xl" />
            <div className="relative">
              <div className="text-[10px] uppercase tracking-widest text-white/60 font-semibold mb-1">Davet et, kazan</div>
              <h3 className="font-display font-bold text-[15px] tracking-tight mb-1">Arkadaşını çağır, 200 XP kazan</h3>
              <p className="text-[11px] text-white/55 mb-3">Kayıt olan her arkadaş için ikiniz de bonus alırsınız.</p>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg p-1.5">
                <code className="flex-1 px-2 font-mono text-[12px] text-white truncate">{user?.inviteCode ?? "KAS-XXXXXX"}</code>
                <button className="px-3 py-1.5 rounded-md bg-sun-500 text-ink-900 text-[11px] font-bold">Kopyala</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   FRIENDS VIEW — uses FriendList component
   ══════════════════════════════════════════════════════════ */
function FriendsView() {
  return (
    <div className="h-full overflow-y-auto nice-scroll px-6 py-4">
      <div className="max-w-2xl">
        <FriendList />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PROFILE VIEW
   ══════════════════════════════════════════════════════════ */
function ProfileView({ user, charInfo }: {
  user: { username: string; classLevel: number; inviteCode: string };
  charInfo: { name: string; subject: string };
}) {
  const score = useGameStore((s) => s.score);
  return (
    <div className="h-full overflow-y-auto nice-scroll px-6 py-4">
      <div className="max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border border-ink-200 rounded-2xl shadow-card p-6 sm:col-span-2">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-display font-bold text-2xl">
              {user.username[0].toUpperCase()}
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-ink-900">{user.username}</h2>
              <div className="text-sm text-ink-500">{user.classLevel}. Sınıf Kâşifi</div>
              <div className="text-xs font-mono text-brand-600 mt-1">{user.inviteCode}</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-ink-200 rounded-2xl shadow-card p-5">
          <h3 className="font-display font-bold text-[14px] text-ink-900 tracking-tight mb-3">Mevcut Rehber</h3>
          <div className="text-[13px] text-ink-700"><strong>{charInfo.name}</strong></div>
          <div className="text-[12px] text-ink-500 mt-0.5">{charInfo.subject}</div>
        </div>

        <div className="bg-white border border-ink-200 rounded-2xl shadow-card p-5">
          <h3 className="font-display font-bold text-[14px] text-ink-900 tracking-tight mb-3">İstatistikler</h3>
          <div className="space-y-1.5 text-[12.5px]">
            <div className="flex justify-between"><span className="text-ink-500">Açılan düğüm</span><span className="font-bold text-ink-900">{score.nodesOpened}</span></div>
            <div className="flex justify-between"><span className="text-ink-500">LGS sorusu çözüldü</span><span className="font-bold text-ink-900">{score.lgsAnswered}</span></div>
            <div className="flex justify-between"><span className="text-ink-500">Doğru cevap</span><span className="font-bold text-mint-500">{score.lgsCorrect}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   DASHBOARD SHELL
   ══════════════════════════════════════════════════════════ */
export default function ChatPage() {
  const router = useRouter();
  const user   = useGameStore((s) => s.user);
  const selectedCharacter = useGameStore((s) => s.selectedCharacter);

  const [page, setPage] = useState<PageId>("home");

  useEffect(() => {
    if (user === null) {
      router.replace("/onboarding");
    }
  }, [user, router]);

  if (!user) return null;

  const charId = selectedCharacter ?? "ataturk";
  const charInfo = CHAR_META[charId];
  const meta = PAGE_META[page];
  const todayLeft = 3;

  return (
    <div className="flex h-screen overflow-hidden bg-paper">
      <div className="hidden md:flex h-full">
        <Sidebar active={page} onChange={setPage} taskCount={todayLeft} />
      </div>

      <main className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <Topbar title={meta.title} subtitle={meta.subtitle} username={user.username} />

        {/* Each view manages its own scroll (or none for home) */}
        <div className="flex-1 min-h-0 overflow-hidden pb-14 md:pb-0">
          {page === "home"    && <HomeView onGoToTasks={() => setPage("tasks")} />}
          {page === "tasks"   && <TasksView />}
          {page === "topics"  && <TopicsView />}
          {page === "league"  && <LeagueView />}
          {page === "friends" && <FriendsView />}
          {page === "profile" && <ProfileView user={user} charInfo={charInfo} />}
        </div>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-ink-950 border-t border-white/10 flex items-center justify-around py-2 z-40">
          {NAV.slice(0, 5).map(({ id, label, Icon }) => {
            const isActive = id === page;
            return (
              <button
                key={id}
                onClick={() => setPage(id as PageId)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition ${
                  isActive ? "text-white" : "text-white/40"
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[9px] font-medium">{label}</span>
              </button>
            );
          })}
        </nav>
      </main>
    </div>
  );
}
