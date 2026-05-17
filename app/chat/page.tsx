"use client";
import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/lib/store/useGameStore";
import { supabase } from "@/lib/supabase/client";
import type { CharacterId, TreeNode } from "@/lib/types";
import ChatCard from "@/components/ChatCard";
import TasksCard from "@/components/TasksCard";
import FriendList from "@/components/FriendList";
import NotificationsDrawer from "@/components/NotificationsDrawer";
import DailyChallenge from "@/components/DailyChallenge";
import CuriosityTree from "@/components/CuriosityTree";
import {
  Compass, Home, ListChecks, BookOpen, Trophy, Users, User,
  Search, Bell, Mail, Flame, Target, Calendar,
  Plus, Check, Clock, Timer, Zap, ArrowRight,
  Crown, Lightbulb, FileQuestion, GitBranch,
  Sparkles, Copy, RefreshCw, LogOut, Maximize2, X, Network,
} from "lucide-react";
import { signOut as supabaseSignOut } from "@/lib/supabase/auth";
import { LGS_QUESTIONS } from "@/lib/content/lgs-questions";
import LgsQuestionCard from "@/components/LgsQuestionCard";

/* ── Tree node colors (sidebar version — muted for dark bg) */
const TREE_DOT: Record<string, string> = {
  root:        "#E8B83A",
  opened:      "#5E8BC3",
  suggested:   "#6B6B6B",
  starred:     "#EC4899",
  lgs_correct: "#3FAE82",
};

const CHAR_META_MINI: Record<CharacterId, string> = {
  ataturk:     "T.C. İnkılap Tarihi",
  cahit_arf:   "Matematik",
  aziz_sancar: "Fen Bilimleri",
  yunus_emre:  "Türkçe",
  mevlana:     "Din Kültürü",
  shakespeare: "İngilizce",
};

/* ── Character info ─────────────────────────────────────── */
const CHAR_META: Record<CharacterId, { name: string; subject: string }> = {
  ataturk:     { name: "Mustafa Kemal Atatürk",    subject: "T.C. İnkılap Tarihi" },
  cahit_arf:   { name: "Cahit Arf",                 subject: "Matematik" },
  aziz_sancar: { name: "Aziz Sancar",               subject: "Fen Bilimleri" },
  yunus_emre:  { name: "Yunus Emre",                subject: "Türkçe" },
  mevlana:     { name: "Mevlana",                   subject: "Din Kültürü" },
  shakespeare: { name: "William Shakespeare",        subject: "İngilizce" },
};

type PageId = "home" | "tasks" | "topics" | "tree" | "league" | "friends" | "profile" | "goals" | "takvim" | "lgs";

const NAV: { id: PageId; label: string; Icon: React.ElementType; badge?: number }[] = [
  { id: "home",    label: "Anasayfa",     Icon: Home },
  { id: "tasks",   label: "Görevler",     Icon: ListChecks },
  { id: "topics",  label: "Dersler",      Icon: BookOpen },
  { id: "lgs",     label: "LGS Soruları", Icon: FileQuestion },
  { id: "tree",    label: "Merak Ağacı",  Icon: Network },
  { id: "league",  label: "Lig",          Icon: Trophy },
  { id: "friends", label: "Arkadaşlar",   Icon: Users, badge: 2 },
  { id: "profile", label: "Profil",       Icon: User },
];

const PAGE_META: Record<PageId, { title: string; subtitle: string }> = {
  home:    { title: "Anasayfa",     subtitle: "Bugün ne keşfedeceğiz?" },
  tasks:   { title: "Görevler",     subtitle: "Günlük planını yap, XP'yi topla" },
  topics:  { title: "Dersler",      subtitle: "LGS 8. sınıf müfredatı · 6 ders" },
  lgs:     { title: "LGS Soruları", subtitle: "Geçmiş yıl sorularını çöz, puanını artır" },
  tree:    { title: "Merak Ağacı",  subtitle: "Keşfettiğin kavramlar ve bağlantılar" },
  league:  { title: "Lig",          subtitle: "Altın Lig · Haftalık sıralama" },
  friends: { title: "Arkadaşlar",   subtitle: "Birlikte çalış, birlikte yüksel" },
  profile: { title: "Profil",       subtitle: "Hesabın ve istatistiklerin" },
  goals:   { title: "Hedeflerim",   subtitle: "Günlük ve haftalık hedefler" },
  takvim:  { title: "Takvim",       subtitle: "Mayıs 2026 · Ders programı ve sınavlar" },
};

/* ══════════════════════════════════════════════════════════
   SIDEBAR
   ══════════════════════════════════════════════════════════ */
function Sidebar({
  active, onChange, taskCount, onOpenNotifications,
  treeNodes, treeCharId, onTreeNodeClick, onOpenTreeFullscreen,
}: {
  active: PageId;
  onChange: (p: PageId) => void;
  taskCount: number;
  onOpenNotifications: () => void;
  treeNodes: TreeNode[];
  treeCharId: CharacterId | null;
  onTreeNodeClick: (msg: string) => void;
  onOpenTreeFullscreen: () => void;
}) {
  return (
    <aside className="w-[260px] shrink-0 bg-ink-950 text-white/85 flex flex-col h-full">
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
              <Fragment key={id}>
                <button
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
              </Fragment>
            );
          })}
        </div>

        <div className="px-2 mt-6 mb-1.5 text-[10.5px] uppercase tracking-[0.18em] text-white/35 font-semibold">Genel</div>
        <div className="space-y-0.5">
          {[
            { label: "Hedeflerim", Icon: Target,   onClick: () => onChange("goals") },
            { label: "Takvim",     Icon: Calendar, onClick: () => onChange("takvim") },
            { label: "Bildirimler",Icon: Bell,     onClick: onOpenNotifications },
          ].map(({ label, Icon, onClick }) => (
            <button
              key={label}
              onClick={onClick}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] text-white/55 hover:text-white hover:bg-white/5 font-medium transition"
            >
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
  title, subtitle, username, onOpenNotifications, onOpenProfile,
}: {
  title: string;
  subtitle: string;
  username: string;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
}) {
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
        <button
          onClick={onOpenNotifications}
          title="Mesajlar (yakında)"
          className="w-9 h-9 rounded-xl bg-white border border-ink-200 hover:bg-ink-100 transition flex items-center justify-center text-ink-700"
        >
          <Mail className="w-4 h-4" />
        </button>
        <button
          onClick={onOpenNotifications}
          title="Bildirimler"
          className="relative w-9 h-9 rounded-xl bg-white border border-ink-200 hover:bg-ink-100 transition flex items-center justify-center text-ink-700"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-coral-500" />
        </button>
        <button
          onClick={onOpenProfile}
          className="ml-1 flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl bg-white border border-ink-200 hover:bg-ink-100 transition"
        >
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
function HomeView({
  onGoToTasks,
  externalMessage,
  onExternalSent,
}: {
  onGoToTasks: () => void;
  externalMessage: string | null;
  onExternalSent: () => void;
}) {
  const score = useGameStore((s) => s.score);
  const accuracy = score.lgsAnswered > 0
    ? Math.round((score.lgsCorrect / score.lgsAnswered) * 100) : 0;

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
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-3 min-h-0">
        {/* Chat — 2/3 */}
        <div className="lg:col-span-2 min-h-0 flex flex-col">
          <ChatCard
            externalMessage={externalMessage}
            onExternalSent={onExternalSent}
          />
        </div>
        {/* Right panel — 1/3 : Tasks */}
        <div className="lg:col-span-1 flex flex-col gap-3 min-h-0">
          <TasksCard onSeeAll={onGoToTasks} />
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
  const [newDueDate, setNewDueDate] = useState("");
  const [newDueTime, setNewDueTime] = useState("");

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

    // Tarih+saat formatla
    let dueLabel: string | null = null;
    let dayBucket: "today" | "week" = "today";
    if (newDueDate) {
      const d = new Date(newDueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const endOfWeek = new Date(today);
      endOfWeek.setDate(today.getDate() + 7);

      if (d.toDateString() === today.toDateString()) {
        dueLabel = newDueTime || "Bugün";
        dayBucket = "today";
      } else if (d.toDateString() === tomorrow.toDateString()) {
        dueLabel = newDueTime ? `Yarın ${newDueTime}` : "Yarın";
        dayBucket = "week";
      } else if (d <= endOfWeek) {
        const dayNames = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
        dueLabel = newDueTime ? `${dayNames[d.getDay()]} ${newDueTime}` : dayNames[d.getDay()];
        dayBucket = "week";
      } else {
        dueLabel = d.toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit" });
        dayBucket = "week";
      }
    } else if (newDueTime) {
      dueLabel = newDueTime;
    }

    setTasks((ts) => [
      ...ts,
      {
        id: Date.now(),
        title: newTitle.trim(),
        subject: "Genel",
        chip: "bg-brand-50 text-brand-700",
        xp: 20,
        due: dueLabel,
        est: "10 dk",
        done: false,
        priority: "med" as const,
        day: dayBucket,
      },
    ]);
    setNewTitle("");
    setNewDueDate("");
    setNewDueTime("");
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
          <form onSubmit={submit} className="bg-white border border-ink-200 rounded-xl p-2 shadow-card flex flex-col sm:flex-row sm:items-center gap-2">
            <div className="flex items-center gap-2 flex-1">
              <div className="w-9 h-9 rounded-lg bg-ink-100 flex items-center justify-center text-ink-500 shrink-0">
                <Plus className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Yeni görev ekle…"
                className="flex-1 bg-transparent text-[13px] text-ink-900 placeholder-ink-400 focus:outline-none px-1 min-w-0"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 text-[11px] text-ink-500" title="Son tarih">
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="bg-ink-100/60 hover:bg-ink-100 px-2 py-1 rounded-md text-[12px] text-ink-900 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                />
              </label>
              <label className="flex items-center gap-1.5 text-[11px] text-ink-500" title="Son saat">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <input
                  type="time"
                  value={newDueTime}
                  onChange={(e) => setNewDueTime(e.target.value)}
                  className="bg-ink-100/60 hover:bg-ink-100 px-2 py-1 rounded-md text-[12px] text-ink-900 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/30 w-[88px]"
                />
              </label>
              <button
                type="submit"
                disabled={!newTitle.trim()}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition shrink-0 ${
                  newTitle.trim() ? "bg-ink-900 hover:bg-ink-700 text-white" : "bg-ink-100 text-ink-400 cursor-not-allowed"
                }`}
              >
                Ekle
              </button>
            </div>
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
const TOPICS: {
  name: string;
  guide: string;
  characterId: CharacterId;
  progress: number;
  units: number;
  done: number;
  next: string;
  ringStroke: string;
  bg: string;
  emoji: string;
}[] = [
  { name: "T.C. İnkılap Tarihi", guide: "Mustafa Kemal Atatürk", characterId: "ataturk", progress: 62, units: 14, done: 9, next: "Trablusgarp Savaşı", ringStroke: "#6B57DC", bg: "bg-brand-50", emoji: "🇹🇷" },
  { name: "Türkçe", guide: "Yunus Emre", characterId: "yunus_emre", progress: 48, units: 18, done: 8, next: "Paragraf · Ana Düşünce", ringStroke: "#3FAE82", bg: "bg-mint-100", emoji: "📜" },
  { name: "Matematik", guide: "Cahit Arf", characterId: "cahit_arf", progress: 35, units: 20, done: 7, next: "Üslü İfadeler", ringStroke: "#5E8BC3", bg: "bg-sky-100", emoji: "🧮" },
  { name: "Fen Bilimleri", guide: "Aziz Sancar", characterId: "aziz_sancar", progress: 71, units: 16, done: 11, next: "DNA ve Genetik", ringStroke: "#E8B83A", bg: "bg-sun-100", emoji: "🔬" },
  { name: "İngilizce", guide: "William Shakespeare", characterId: "shakespeare", progress: 55, units: 12, done: 6, next: "Modal verbs", ringStroke: "#E58A5A", bg: "bg-coral-100", emoji: "🎭" },
  { name: "Din Kültürü", guide: "Mevlana", characterId: "mevlana", progress: 80, units: 10, done: 8, next: "Zekât ve sadaka", ringStroke: "#6B57DC", bg: "bg-brand-50", emoji: "🕊️" },
];

function TopicsView({ onContinue }: { onContinue: (characterId: CharacterId, topicName: string, nextUnit: string) => void }) {
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
                <button
                  onClick={() => onContinue(t.characterId, t.name, t.next)}
                  className="text-[12px] font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 cursor-pointer transition"
                >
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

function LeagueView({ onStartQuickLgs }: { onStartQuickLgs: () => void }) {
  const user = useGameStore((s) => s.user);
  const score = useGameStore((s) => s.score);
  const meXp = score.nodesOpened * 50 + score.lgsCorrect * 100;

  const [copied, setCopied] = useState(false);
  const copyCode = async () => {
    if (!user?.inviteCode) return;
    try {
      await navigator.clipboard.writeText(user.inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API blocked; fallback: select-and-copy via textarea
      const ta = document.createElement("textarea");
      ta.value = user.inviteCode;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const rows = [
    ...LEAGUE_USERS,
    { rank: 2, name: user?.username ?? "Sen", avatar: (user?.username?.[0] ?? "S").toUpperCase(), color: "#6B57DC", xp: 4615 + meXp, delta: 520, streak: 1, online: true, me: true },
  ].sort((a, b) => b.xp - a.xp).map((u, i) => ({ ...u, rank: i + 1 }));

  return (
    <div className="h-full overflow-y-auto nice-scroll px-6 py-4">
      {/* Günün Yarışması — herkese aynı 5 soru */}
      <div className="max-w-7xl mb-4">
        <DailyChallenge username={user?.username ?? "Sen"} />
      </div>

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
            <button
              onClick={onStartQuickLgs}
              className="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 transition"
            >
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
                <button
                  onClick={copyCode}
                  className={`px-3 py-1.5 rounded-md text-[11px] font-bold transition ${
                    copied ? "bg-mint-500 text-white" : "bg-sun-500 text-ink-900 hover:bg-sun-500/90"
                  }`}
                >
                  {copied ? "Kopyalandı ✓" : "Kopyala"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   GOALS VIEW — Hedeflerim
   ══════════════════════════════════════════════════════════ */
function GoalProgressBar({
  label, value, target, accent,
}: { label: string; value: number; target: number; accent: string }) {
  const pct = Math.min(100, Math.round((value / target) * 100));
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[12.5px] font-semibold text-ink-700">{label}</span>
        <span className="text-[11.5px] text-ink-500 tabular-nums">
          <strong className="text-ink-900">{value}</strong> / {target}
        </span>
      </div>
      <div className="h-2 rounded-full bg-ink-100 overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: accent }}
        />
      </div>
      <div className="text-[10.5px] text-ink-400 mt-1 font-mono">%{pct}</div>
    </div>
  );
}

function GoalsView() {
  const score = useGameStore((s) => s.score);
  const user = useGameStore((s) => s.user);
  const xpDaily = score.nodesOpened * 30 + score.lgsCorrect * 50;

  const [customGoal, setCustomGoal] = useState("");
  const [customGoals, setCustomGoals] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("lgs-kasifi-goals") ?? "[]");
    } catch {
      return [];
    }
  });

  const addCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoal.trim()) return;
    const next = [customGoal.trim(), ...customGoals].slice(0, 10);
    setCustomGoals(next);
    setCustomGoal("");
    try {
      localStorage.setItem("lgs-kasifi-goals", JSON.stringify(next));
    } catch { /* */ }
  };

  const removeCustom = (idx: number) => {
    const next = customGoals.filter((_, i) => i !== idx);
    setCustomGoals(next);
    try {
      localStorage.setItem("lgs-kasifi-goals", JSON.stringify(next));
    } catch { /* */ }
  };

  return (
    <div className="h-full overflow-y-auto nice-scroll px-6 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl">
        {/* Daily goals */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-ink-200 rounded-2xl shadow-card p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center">
                <Target className="w-[18px] h-[18px] text-brand-600" strokeWidth={2.2} />
              </div>
              <div>
                <h3 className="font-display font-bold text-[15px] text-ink-900 tracking-tight">Bugünkü Hedeflerin</h3>
                <p className="text-[11px] text-ink-500">Her gün sıfırlanır</p>
              </div>
            </div>
            <div className="space-y-4">
              <GoalProgressBar label="🌿 Düğüm aç" value={score.nodesOpened} target={10} accent="#6B57DC" />
              <GoalProgressBar label="📝 LGS sorusu çöz" value={score.lgsAnswered} target={20} accent="#5E8BC3" />
              <GoalProgressBar label="✅ Doğru cevap"  value={score.lgsCorrect} target={15} accent="#3FAE82" />
              <GoalProgressBar label="⚡ Günlük XP"    value={xpDaily}            target={500} accent="#E8B83A" />
            </div>
          </div>

          {/* Weekly */}
          <div className="bg-white border border-ink-200 rounded-2xl shadow-card p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-coral-100 flex items-center justify-center">
                <Calendar className="w-[18px] h-[18px] text-coral-600" strokeWidth={2.2} />
              </div>
              <div>
                <h3 className="font-display font-bold text-[15px] text-ink-900 tracking-tight">Bu Haftanın Hedefleri</h3>
                <p className="text-[11px] text-ink-500">Pazar gece sıfırlanır</p>
              </div>
            </div>
            <div className="space-y-4">
              <GoalProgressBar label="🔥 7 gün üst üste çalış" value={1} target={7} accent="#E58A5A" />
              <GoalProgressBar label="🌳 50 düğüm aç" value={score.nodesOpened} target={50} accent="#6B57DC" />
              <GoalProgressBar label="🏆 Lig'te ilk 3'e gir"   value={2} target={3} accent="#E8B83A" />
            </div>
          </div>

          {/* Custom goals */}
          <div className="bg-white border border-ink-200 rounded-2xl shadow-card p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-sun-100 flex items-center justify-center">
                <Lightbulb className="w-[18px] h-[18px] text-sun-500" strokeWidth={2.2} />
              </div>
              <div>
                <h3 className="font-display font-bold text-[15px] text-ink-900 tracking-tight">Kişisel Hedeflerin</h3>
                <p className="text-[11px] text-ink-500">Sen ekle, sen takip et</p>
              </div>
            </div>
            <form onSubmit={addCustom} className="flex items-center gap-2 mb-3">
              <input
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
                placeholder="Örn: Hafta sonu 30 paragraf çöz"
                className="flex-1 px-3 py-2 rounded-lg border border-ink-200 bg-paper text-[13px] text-ink-900 placeholder-ink-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              />
              <button
                type="submit"
                disabled={!customGoal.trim()}
                className="px-3 py-2 rounded-lg bg-ink-900 text-white text-[12px] font-semibold disabled:opacity-40 hover:bg-ink-700 transition"
              >
                Ekle
              </button>
            </form>
            {customGoals.length === 0 ? (
              <div className="text-[12px] text-ink-500 italic py-2">Henüz kişisel hedef eklemedin.</div>
            ) : (
              <ul className="space-y-2">
                {customGoals.map((g, i) => (
                  <li key={`${i}-${g}`} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-ink-100/60 group">
                    <span className="flex-1 text-[13px] text-ink-900">{g}</span>
                    <button
                      onClick={() => removeCustom(i)}
                      className="text-[11px] text-ink-400 hover:text-coral-600 opacity-0 group-hover:opacity-100 transition"
                      title="Sil"
                    >
                      Sil
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right rail */}
        <div className="space-y-4">
          <div className="bg-ink-950 text-white rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-sun-500/20 blur-3xl" />
            <div className="relative">
              <div className="text-[10px] uppercase tracking-widest text-white/60 font-semibold mb-1">Bu hafta</div>
              <h3 className="font-display font-bold text-[15px] tracking-tight mb-1">Sıradaki ödülün</h3>
              <p className="text-[11px] text-white/55 mb-3">Hedeflerinin %{Math.round((score.nodesOpened / 50) * 100)}'ini tamamladın.</p>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-sun-500" strokeWidth={2.5} />
                <span className="font-display font-bold text-[14px]">Altın Pusula</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-ink-200 rounded-2xl shadow-card p-5">
            <h3 className="font-display font-bold text-[14px] text-ink-900 tracking-tight mb-3">İpucu</h3>
            <p className="text-[12.5px] text-ink-700 leading-relaxed">
              Günlük küçük hedefler, büyük başarılar getirir.{" "}
              <strong className="text-ink-900">{user?.username ?? "Kâşif"}</strong>, her gün 1 saat odaklan, ay sonunda farkı göreceksin.
            </p>
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
   PROFILE VIEW — anime avatar + streak + zengin istatistikler
   ══════════════════════════════════════════════════════════ */
const AVATAR_STYLES = [
  { id: "lorelei",          label: "Lorelei",       hint: "Şirin manga" },
  { id: "adventurer",       label: "Adventurer",    hint: "Macera kahramanı" },
  { id: "big-smile",        label: "Big Smile",     hint: "Güleryüz" },
  { id: "fun-emoji",        label: "Fun Emoji",     hint: "Eğlenceli" },
  { id: "miniavs",          label: "Mini Avatar",   hint: "Minik" },
  { id: "notionists",       label: "Notion-stil",   hint: "Soft" },
  { id: "personas",         label: "Persona",       hint: "Karakter" },
  { id: "thumbs",           label: "Başparmak",     hint: "Quirky" },
];

function dicebearUrl(style: string, seed: string) {
  // SVG, ücretsiz, hesap gerekmez
  return `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
}

function SignOutButton() {
  const router = useRouter();
  const signOutLocal = useGameStore((s) => s.signOutLocal);
  const [busy, setBusy] = useState(false);

  async function handleSignOut() {
    if (busy) return;
    setBusy(true);
    try {
      await supabaseSignOut();
    } catch {
      /* yine de local'i temizle */
    }
    signOutLocal();
    router.replace("/login");
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={busy}
      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white hover:bg-coral-50 border border-ink-200 hover:border-coral-500/40 text-coral-600 font-semibold text-[13px] transition shadow-card disabled:opacity-50"
    >
      <LogOut className="w-4 h-4" />
      Hesaptan Çık
    </button>
  );
}

function ProfileView({ user, charInfo }: {
  user: { username: string; classLevel: number; inviteCode: string };
  charInfo: { name: string; subject: string };
}) {
  const score = useGameStore((s) => s.score);

  // Avatar tercihi localStorage'da: {style, seed}
  type AvatarPref = { style: string; seed: string };
  const defaultPref: AvatarPref = { style: "lorelei", seed: user.username };
  const [avatar, setAvatar] = useState<AvatarPref>(() => {
    if (typeof window === "undefined") return defaultPref;
    try {
      const raw = localStorage.getItem("lgs-kasifi-avatar");
      if (raw) {
        const p = JSON.parse(raw);
        if (p?.style && p?.seed) return p;
      }
    } catch { /* */ }
    return defaultPref;
  });

  const [pickerOpen, setPickerOpen] = useState(false);

  const updateAvatar = (next: AvatarPref) => {
    setAvatar(next);
    try {
      localStorage.setItem("lgs-kasifi-avatar", JSON.stringify(next));
    } catch { /* */ }
  };

  const rerollSeed = () => {
    updateAvatar({ ...avatar, seed: Math.random().toString(36).slice(2, 10) });
  };

  // Streak: localStorage'da son ziyaret günü saklanır
  const [streak, setStreak] = useState<number>(() => {
    if (typeof window === "undefined") return 1;
    try {
      const raw = localStorage.getItem("lgs-kasifi-streak");
      const today = new Date().toDateString();
      if (!raw) {
        localStorage.setItem("lgs-kasifi-streak", JSON.stringify({ last: today, count: 1 }));
        return 1;
      }
      const { last, count } = JSON.parse(raw);
      if (last === today) return count;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const newCount = last === yesterday.toDateString() ? count + 1 : 1;
      localStorage.setItem("lgs-kasifi-streak", JSON.stringify({ last: today, count: newCount }));
      return newCount;
    } catch {
      return 1;
    }
  });
  // unused setter warning'i susturmak için no-op
  void setStreak;

  const totalXP = score.nodesOpened * 30 + score.lgsCorrect * 50;
  const accuracy = score.lgsAnswered > 0
    ? Math.round((score.lgsCorrect / score.lgsAnswered) * 100) : 0;
  const rank =
    totalXP > 3000 ? { name: "Altın Pusula", color: "#E8B83A", bg: "bg-sun-100", icon: Crown } :
    totalXP > 1500 ? { name: "Gümüş Pusula", color: "#9CA3AF", bg: "bg-ink-100", icon: Trophy } :
    totalXP > 500  ? { name: "Bronz Pusula", color: "#E58A5A", bg: "bg-coral-100", icon: Trophy } :
                     { name: "Yeni Kâşif",   color: "#6B57DC", bg: "bg-brand-50", icon: Compass };
  const RankIcon = rank.icon;

  const copyCode = async () => {
    try { await navigator.clipboard.writeText(user.inviteCode); } catch { /* */ }
  };

  return (
    <div className="h-full overflow-y-auto nice-scroll px-6 py-4">
      <div className="max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* HEADER CARD */}
        <div className="lg:col-span-3 bg-white border border-ink-200 rounded-2xl shadow-card p-6 relative overflow-hidden">
          <div className="absolute -right-24 -top-24 w-64 h-64 rounded-full bg-brand-500/8 blur-3xl" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="relative shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dicebearUrl(avatar.style, avatar.seed)}
                alt="Avatar"
                className="w-24 h-24 rounded-2xl bg-paper border-4 border-white shadow-pop"
              />
              <button
                onClick={() => setPickerOpen((s) => !s)}
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-ink-900 hover:bg-ink-700 text-white flex items-center justify-center shadow-pop transition"
                title="Avatarını değiştir"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            </div>

            {/* Identity */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-display font-bold text-2xl text-ink-900 tracking-tight">{user.username}</h2>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold ${rank.bg}`} style={{ color: rank.color }}>
                  <RankIcon className="w-3 h-3" strokeWidth={2.5} />
                  {rank.name}
                </span>
              </div>
              <div className="text-[13px] text-ink-500 mt-0.5">{user.classLevel}. Sınıf Kâşifi · Rehber: {charInfo.name}</div>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-coral-100 border border-coral-500/30">
                  <Flame className="w-4 h-4 text-coral-600" strokeWidth={2.5} />
                  <div className="text-[12px]">
                    <strong className="font-display font-bold text-ink-900 tabular-nums">{streak}</strong>
                    <span className="text-ink-700 ml-1">günlük seri</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sun-100 border border-sun-500/30">
                  <Zap className="w-4 h-4 text-sun-500" strokeWidth={2.5} />
                  <div className="text-[12px]">
                    <strong className="font-display font-bold text-ink-900 tabular-nums">{totalXP}</strong>
                    <span className="text-ink-700 ml-1">XP</span>
                  </div>
                </div>
                <button
                  onClick={copyCode}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-50 border border-brand-300/40 hover:bg-brand-100 transition group"
                  title="Davet kodunu kopyala"
                >
                  <Copy className="w-3.5 h-3.5 text-brand-700" />
                  <span className="text-[12px] font-mono font-bold text-brand-700">{user.inviteCode}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Avatar picker (collapsible) */}
          {pickerOpen && (
            <div className="relative mt-5 pt-5 border-t border-ink-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-display font-bold text-[14px] text-ink-900">Avatarını seç</div>
                  <div className="text-[11px] text-ink-500">Bir stil seç, sonra "rastgele yeniden" ile yüzünü değiştir.</div>
                </div>
                <button
                  onClick={rerollSeed}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ink-900 hover:bg-ink-700 text-white text-[12px] font-semibold transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Rastgele yeniden
                </button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {AVATAR_STYLES.map((s) => {
                  const selected = s.id === avatar.style;
                  return (
                    <button
                      key={s.id}
                      onClick={() => updateAvatar({ style: s.id, seed: avatar.seed })}
                      className={`p-2 rounded-xl border-2 transition text-center ${
                        selected ? "border-brand-500 bg-brand-50" : "border-ink-200 hover:border-ink-300 bg-white"
                      }`}
                      title={s.hint}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={dicebearUrl(s.id, avatar.seed)}
                        alt={s.label}
                        className="w-full aspect-square rounded-lg bg-paper"
                      />
                      <div className="text-[10px] text-ink-700 font-semibold mt-1 truncate">{s.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* STATS - main column */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <div className="bg-white border border-ink-200 rounded-2xl shadow-card p-5">
            <div className="flex items-center gap-2 mb-2">
              <GitBranch className="w-4 h-4 text-brand-600" strokeWidth={2.5} />
              <div className="text-[11px] uppercase tracking-widest text-ink-500 font-semibold">Düğüm</div>
            </div>
            <div className="font-display font-bold text-[32px] text-ink-900 tabular-nums leading-none">{score.nodesOpened}</div>
            <div className="text-[11.5px] text-ink-500 mt-1">açılan düğüm sayısı</div>
          </div>

          <div className="bg-white border border-ink-200 rounded-2xl shadow-card p-5">
            <div className="flex items-center gap-2 mb-2">
              <FileQuestion className="w-4 h-4 text-sky-500" strokeWidth={2.5} />
              <div className="text-[11px] uppercase tracking-widest text-ink-500 font-semibold">LGS</div>
            </div>
            <div className="font-display font-bold text-[32px] text-ink-900 tabular-nums leading-none">{score.lgsAnswered}</div>
            <div className="text-[11.5px] text-ink-500 mt-1">çözülen soru</div>
          </div>

          <div className="bg-white border border-ink-200 rounded-2xl shadow-card p-5">
            <div className="flex items-center gap-2 mb-2">
              <Check className="w-4 h-4 text-mint-500" strokeWidth={2.5} />
              <div className="text-[11px] uppercase tracking-widest text-ink-500 font-semibold">Doğruluk</div>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="font-display font-bold text-[32px] text-ink-900 tabular-nums leading-none">%{accuracy}</div>
              <div className="text-[11px] text-ink-500 tabular-nums">{score.lgsCorrect}/{Math.max(score.lgsAnswered, 1)}</div>
            </div>
            <div className="text-[11.5px] text-ink-500 mt-1">doğru cevap oranı</div>
          </div>

          <div className="bg-white border border-ink-200 rounded-2xl shadow-card p-5">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-coral-600" strokeWidth={2.5} />
              <div className="text-[11px] uppercase tracking-widest text-ink-500 font-semibold">Seri</div>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="font-display font-bold text-[32px] text-ink-900 tabular-nums leading-none">{streak}</div>
              <div className="text-[11px] text-ink-500">gün</div>
            </div>
            <div className="flex gap-1 mt-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className={`flex-1 h-1.5 rounded-full ${i < streak ? "bg-coral-500" : "bg-ink-100"}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Right rail */}
        <div className="space-y-4">
          <div className="bg-white border border-ink-200 rounded-2xl shadow-card p-5">
            <h3 className="font-display font-bold text-[14px] text-ink-900 tracking-tight mb-3">Mevcut Rehber</h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-display font-bold">
                {charInfo.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </div>
              <div>
                <div className="text-[13.5px] text-ink-900 font-semibold">{charInfo.name}</div>
                <div className="text-[11.5px] text-ink-500">{charInfo.subject}</div>
              </div>
            </div>
          </div>

          <SignOutButton />

          <div className="bg-ink-950 text-white rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-brand-500/30 blur-3xl" />
            <div className="relative">
              <div className="text-[10px] uppercase tracking-widest text-white/60 font-semibold mb-1">Bir sonraki rütbe</div>
              <h3 className="font-display font-bold text-[15px] tracking-tight mb-1">
                {totalXP < 500 ? "Bronz Pusula" : totalXP < 1500 ? "Gümüş Pusula" : totalXP < 3000 ? "Altın Pusula" : "Elmas Pusula"}
              </h3>
              <p className="text-[11px] text-white/55 mb-3">
                {totalXP < 500
                  ? `${500 - totalXP} XP kaldı`
                  : totalXP < 1500
                  ? `${1500 - totalXP} XP kaldı`
                  : totalXP < 3000
                  ? `${3000 - totalXP} XP kaldı`
                  : "Maks. rütbedesin 🏆"}
              </p>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-sun-500"
                  style={{
                    width: `${Math.min(100, (totalXP / (totalXP < 500 ? 500 : totalXP < 1500 ? 1500 : 3000)) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   TREE VIEW — Full screen curiosity tree
   ══════════════════════════════════════════════════════════ */
function TreeView({
  externalMessage,
  onExternalSent,
  onNodeClick,
}: {
  externalMessage: string | null;
  onExternalSent: () => void;
  onNodeClick: (msg: string) => void;
}) {
  return (
    <div className="h-full flex flex-col px-6 py-3 gap-3 overflow-hidden">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-3 min-h-0 max-w-7xl w-full mx-auto">
        {/* Sol panel - Merak Ağacı (2/3) */}
        <div className="lg:col-span-2 min-h-0 flex flex-col">
          <CuriosityTree onNodeClick={(node) => onNodeClick(node.content)} />
        </div>
        
        {/* Sağ panel - Sohbet (1/3) */}
        <div className="lg:col-span-1 min-h-0 flex flex-col">
          <ChatCard
            externalMessage={externalMessage}
            onExternalSent={onExternalSent}
          />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   LGS SORULARI VIEW — tüm sorular, filtrelenebilir, çözülebilir
   ══════════════════════════════════════════════════════════ */

const SUBJECT_LABELS: Record<string, string> = {
  matematik: "Matematik",
  inkilap:   "T.C. İnkılap Tarihi",
  fen:       "Fen Bilimleri",
  turkce:    "Türkçe",
  din:       "Din Kültürü",
  ingilizce: "İngilizce",
};

const DIFFICULTY_LABEL: Record<string, string> = { kolay: "Kolay", orta: "Orta", zor: "Zor" };
const DIFFICULTY_COLOR: Record<string, string> = {
  kolay: "bg-mint-100 text-mint-500",
  orta:  "bg-sun-100 text-sun-500",
  zor:   "bg-coral-100 text-coral-600",
};

function LgsQuizView() {
  const score          = useGameStore((s) => s.score);
  const [filter, setFilter] = useState<string>("all");
  const [active, setActive] = useState<string | null>(null); // soru id
  const [solved, setSolved] = useState<Set<string>>(new Set());

  const subjects = ["all", ...Object.keys(SUBJECT_LABELS)];

  const visible = filter === "all"
    ? LGS_QUESTIONS
    : LGS_QUESTIONS.filter((q) => q.subject === filter);

  function handleDone(id: string) {
    setSolved((prev) => new Set([...prev, id]));
    setActive(null);
  }

  return (
    <div className="h-full overflow-y-auto nice-scroll px-6 py-4">
      <div className="max-w-5xl">
        {/* Üst özet */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Toplam Soru",   value: LGS_QUESTIONS.length, color: "text-ink-900" },
            { label: "Çözülen",       value: score.lgsAnswered,    color: "text-mint-500" },
            { label: "Doğru Cevap",   value: score.lgsCorrect,     color: "text-brand-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-ink-200 rounded-2xl shadow-card p-4 text-center">
              <div className={`font-display font-bold text-[28px] tabular-nums ${s.color}`}>{s.value}</div>
              <div className="text-[11.5px] text-ink-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Ders filtresi */}
        <div className="flex flex-wrap gap-2 mb-4">
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => { setFilter(s); setActive(null); }}
              className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold transition ${
                filter === s
                  ? "bg-brand-500 text-white"
                  : "bg-white border border-ink-200 text-ink-700 hover:border-brand-500"
              }`}
            >
              {s === "all" ? "Tümü" : SUBJECT_LABELS[s]}
              <span className={`ml-1.5 text-[10px] tabular-nums font-bold px-1.5 py-0.5 rounded-full ${
                filter === s ? "bg-white/20 text-white" : "bg-ink-100 text-ink-500"
              }`}>
                {s === "all" ? LGS_QUESTIONS.length : LGS_QUESTIONS.filter((q) => q.subject === s).length}
              </span>
            </button>
          ))}
        </div>

        {/* Soru listesi */}
        <div className="space-y-3">
          {visible.map((q) => {
            const isSolved  = solved.has(q.id);
            const isActive  = active === q.id;

            return (
              <div key={q.id} className={`bg-white border rounded-2xl shadow-card overflow-hidden transition ${
                isSolved ? "border-mint-300" : "border-ink-200"
              }`}>
                {/* Soru başlığı */}
                <div className="px-5 py-4 flex items-start gap-4">
                  {/* Yıl + ders badge */}
                  <div className="shrink-0 text-center mt-0.5">
                    <div className="font-mono font-bold text-[13px] text-ink-900">{q.year}</div>
                    <div className="text-[9.5px] text-ink-400 uppercase tracking-wider">{SUBJECT_LABELS[q.subject]?.split(" ")[0]}</div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`text-[13.5px] leading-relaxed font-medium ${isSolved ? "text-ink-400" : "text-ink-900"}`}>
                      {q.question}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-semibold ${DIFFICULTY_COLOR[q.difficulty]}`}>
                        {DIFFICULTY_LABEL[q.difficulty]}
                      </span>
                      <span className="text-[11px] text-ink-400">{q.unit}</span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {isSolved ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-mint-100 text-mint-500 text-[12px] font-semibold">
                        ✓ Çözüldü
                      </span>
                    ) : (
                      <button
                        onClick={() => setActive(isActive ? null : q.id)}
                        className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold transition ${
                          isActive
                            ? "bg-ink-100 text-ink-700"
                            : "bg-brand-500 hover:bg-brand-600 text-white"
                        }`}
                      >
                        {isActive ? "Kapat" : "Çöz →"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Soru kartı (açık ise) */}
                {isActive && !isSolved && (
                  <div className="px-5 pb-5 border-t border-ink-100 pt-4">
                    <LgsQuestionCard
                      question={q}
                      onDone={() => handleDone(q.id)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   TAKVİM VIEW — Mayıs 2026 + Ders Programı
   ══════════════════════════════════════════════════════════ */

// Mayıs 2026: 1 Mayıs = Perşembe (Mon=0 … Sun=6 ⇒ Thu=3)
const MAY_START_DOW = 3;
const MAY_DAYS      = 31;
const TODAY_DAY     = 17; // Bugün: 17 Mayıs 2026 (Cumartesi)

const EXAM_DATES: { day: number; label: string; chip: string }[] = [
  { day: 5,  label: "Türkçe Sınavı",          chip: "bg-coral-100 text-coral-600 border-coral-500/30" },
  { day: 8,  label: "Matematik Sınavı",        chip: "bg-coral-100 text-coral-600 border-coral-500/30" },
  { day: 12, label: "Fen Bilimleri Sınavı",    chip: "bg-coral-100 text-coral-600 border-coral-500/30" },
  { day: 15, label: "T.C. İnkılap Tarihi Sınavı", chip: "bg-coral-100 text-coral-600 border-coral-500/30" },
  { day: 20, label: "İngilizce Sınavı",        chip: "bg-coral-100 text-coral-600 border-coral-500/30" },
  { day: 27, label: "LGS Genel Sınavı",        chip: "bg-coral-600 text-white border-coral-600"        },
];

const HOLIDAY_DATES: { day: number; label: string }[] = [
  { day: 1,  label: "İşçi ve Emekçi Bayramı" },
  { day: 19, label: "Gençlik ve Spor Bayramı" },
];

const WEEK_DAYS_SHORT = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

// Ders saatleri (40 dk ders, 10 dk teneffüs, 40 dk öğle)
const PERIODS: { label: string; start: string; end: string; isBreak?: boolean; isLunch?: boolean }[] = [
  { label: "1. Ders",       start: "09:00", end: "09:40" },
  { label: "Teneffüs",      start: "09:40", end: "09:50", isBreak: true },
  { label: "2. Ders",       start: "09:50", end: "10:30" },
  { label: "Teneffüs",      start: "10:30", end: "10:40", isBreak: true },
  { label: "3. Ders",       start: "10:40", end: "11:20" },
  { label: "Teneffüs",      start: "11:20", end: "11:30", isBreak: true },
  { label: "4. Ders",       start: "11:30", end: "12:10" },
  { label: "Öğle Tatili",   start: "12:10", end: "12:50", isBreak: true, isLunch: true },
  { label: "5. Ders",       start: "12:50", end: "13:30" },
  { label: "Teneffüs",      start: "13:30", end: "13:40", isBreak: true },
  { label: "6. Ders",       start: "13:40", end: "14:20" },
  { label: "Teneffüs",      start: "14:20", end: "14:30", isBreak: true },
  { label: "7. Ders",       start: "14:30", end: "15:10" },
  { label: "Teneffüs",      start: "15:10", end: "15:20", isBreak: true },
  { label: "8. Ders",       start: "15:20", end: "16:00" },
];

// Ders programı — yalnızca 8 ders satırı, break satırları hariç
// SCHEDULE[dersIndex][günIndex] = ders adı   (günler: Pzt Sal Çar Per Cum)
const SCHEDULE_DATA: string[][] = [
  ["Türkçe",             "Matematik",           "Fen Bilimleri",       "İngilizce",           "Türkçe"             ],
  ["Türkçe",             "Matematik",           "Fen Bilimleri",       "İngilizce",           "Türkçe"             ],
  ["Matematik",          "T.C. İnkılap",        "Matematik",           "Matematik",           "T.C. İnkılap"       ],
  ["Matematik",          "T.C. İnkılap",        "Matematik",           "Matematik",           "T.C. İnkılap"       ],
  ["T.C. İnkılap",       "Fen Bilimleri",       "Türkçe",              "Fen Bilimleri",       "Matematik"          ],
  ["T.C. İnkılap",       "Fen Bilimleri",       "Türkçe",              "Fen Bilimleri",       "Matematik"          ],
  ["İngilizce",          "Din Kültürü",         "İngilizce",           "Din Kültürü",         "İngilizce"          ],
  ["Beden Eğitimi",      "Müzik",               "Rehberlik",           "Beden Eğitimi",       "Teknoloji Tasarım"  ],
];

const SUBJECT_COLOR: Record<string, string> = {
  "Türkçe":           "bg-mint-100 text-mint-500",
  "Matematik":        "bg-sky-100 text-sky-500",
  "Fen Bilimleri":    "bg-sun-100 text-sun-500",
  "T.C. İnkılap":     "bg-brand-50 text-brand-700",
  "İngilizce":        "bg-coral-100 text-coral-600",
  "Din Kültürü":      "bg-indigo-50 text-indigo-600",
  "Beden Eğitimi":    "bg-green-50 text-green-600",
  "Müzik":            "bg-purple-50 text-purple-600",
  "Rehberlik":        "bg-teal-50 text-teal-600",
  "Teknoloji Tasarım":"bg-orange-50 text-orange-600",
};

function TakvimView() {
  // Build calendar cells
  const cells: (number | null)[] = [
    ...Array(MAY_START_DOW).fill(null),
    ...Array.from({ length: MAY_DAYS }, (_, i) => i + 1),
  ];
  // Pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null);

  const examMap = new Map(EXAM_DATES.map((e) => [e.day, e]));
  const holidayMap = new Map(HOLIDAY_DATES.map((h) => [h.day, h]));

  // Lesson period index tracker
  let lessonIdx = 0;

  return (
    <div className="h-full overflow-y-auto nice-scroll px-6 py-4 space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-7xl">

        {/* ── Sol: Takvim ──────────────────────────────────── */}
        <div className="lg:col-span-1 space-y-4">

          {/* Mayıs 2026 takvimi */}
          <div className="bg-white border border-ink-200 rounded-2xl shadow-card overflow-hidden">
            <div className="px-5 py-4 border-b border-ink-200 bg-gradient-to-r from-brand-500 to-brand-700">
              <div className="font-display font-bold text-[17px] text-white tracking-tight">Mayıs 2026</div>
              <div className="text-[11px] text-white/70 mt-0.5">LGS hazırlık takvimi</div>
            </div>

            {/* Gün başlıkları */}
            <div className="grid grid-cols-7 border-b border-ink-200">
              {WEEK_DAYS_SHORT.map((d) => (
                <div key={d} className={`py-2 text-center text-[10px] font-bold uppercase tracking-wider ${
                  d === "Cmt" || d === "Paz" ? "text-ink-400" : "text-ink-500"
                }`}>
                  {d}
                </div>
              ))}
            </div>

            {/* Günler */}
            <div className="grid grid-cols-7">
              {cells.map((day, i) => {
                if (!day) return <div key={i} className="aspect-square" />;
                const exam    = examMap.get(day);
                const holiday = holidayMap.get(day);
                const isToday = day === TODAY_DAY;
                const isWeekend = i % 7 >= 5;
                return (
                  <div
                    key={i}
                    className={`aspect-square flex flex-col items-center justify-center gap-0.5 border-b border-r border-ink-100 relative ${
                      isToday  ? "bg-brand-500" :
                      exam     ? "bg-coral-100" :
                      holiday  ? "bg-sky-100" :
                      isWeekend ? "bg-paper" : ""
                    }`}
                  >
                    <span className={`text-[12px] font-semibold tabular-nums ${
                      isToday   ? "text-white" :
                      exam      ? "text-coral-600" :
                      holiday   ? "text-sky-500" :
                      isWeekend ? "text-ink-400" :
                      "text-ink-900"
                    }`}>
                      {day}
                    </span>
                    {exam && (
                      <span className="w-1.5 h-1.5 rounded-full bg-coral-600 shrink-0" />
                    )}
                    {holiday && !exam && (
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Lejant */}
            <div className="px-4 py-3 border-t border-ink-100 flex flex-wrap gap-3 text-[10.5px] text-ink-500">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-brand-500 shrink-0" /> Bugün</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-coral-600 shrink-0" /> Sınav</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-500 shrink-0" /> Tatil</div>
            </div>
          </div>

          {/* Sınav listesi */}
          <div className="bg-white border border-ink-200 rounded-2xl shadow-card overflow-hidden">
            <div className="px-5 py-3.5 border-b border-ink-200">
              <div className="font-display font-bold text-[14px] text-ink-900 tracking-tight">📋 Mayıs Sınavları</div>
              <div className="text-[11px] text-ink-500">Öğretmen tarafından eklendi</div>
            </div>
            <div className="divide-y divide-ink-100">
              {EXAM_DATES.map((e) => {
                const isPast   = e.day < TODAY_DAY;
                const isToday  = e.day === TODAY_DAY;
                return (
                  <div key={e.day} className={`px-5 py-3 flex items-center gap-3 ${isPast ? "opacity-60" : ""}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-[15px] shrink-0 ${
                      isToday ? "bg-brand-500 text-white" : "bg-paper border border-ink-200 text-ink-900"
                    }`}>
                      {e.day}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-semibold text-[12.5px] ${isToday ? "text-brand-700" : "text-ink-900"}`}>
                        {e.label}
                      </div>
                      <div className="text-[10.5px] text-ink-400 mt-0.5">
                        {isPast ? "✓ Tamamlandı" : isToday ? "Bugün!" : `${e.day} Mayıs 2026`}
                      </div>
                    </div>
                    {isToday && (
                      <span className="px-2 py-0.5 rounded-full bg-brand-500 text-white text-[9px] font-bold uppercase tracking-wider">
                        Bugün
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Sağ: Ders Programı ──────────────────────────── */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-ink-200 rounded-2xl shadow-card overflow-hidden">
            <div className="px-5 py-4 border-b border-ink-200 flex items-center justify-between">
              <div>
                <div className="font-display font-bold text-[15px] text-ink-900 tracking-tight">📚 Haftalık Ders Programı</div>
                <div className="text-[11px] text-ink-500 mt-0.5">8. Sınıf · 09:00–16:00 · 8 ders saati</div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 text-[10.5px] font-bold">2025–2026</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="bg-paper border-b border-ink-200">
                    <th className="py-2.5 px-3 text-left font-semibold text-ink-500 w-28 text-[10.5px] uppercase tracking-wider">Saat</th>
                    {["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"].map((d) => (
                      <th key={d} className="py-2.5 px-2 text-center font-semibold text-ink-700 text-[11px]">{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PERIODS.map((p, pi) => {
                    if (p.isBreak) {
                      return (
                        <tr key={pi} className={`border-b border-ink-100 ${p.isLunch ? "bg-amber-50" : "bg-paper"}`}>
                          <td className="py-1.5 px-3">
                            <div className={`text-[10px] font-semibold ${p.isLunch ? "text-amber-600" : "text-ink-400"}`}>
                              {p.start}–{p.end}
                            </div>
                          </td>
                          <td colSpan={5} className="py-1.5 px-2 text-center">
                            <span className={`text-[10.5px] font-semibold ${p.isLunch ? "text-amber-600" : "text-ink-400"}`}>
                              {p.isLunch ? "🍽 Öğle Tatili (40 dk)" : `☕ ${p.label} (10 dk)`}
                            </span>
                          </td>
                        </tr>
                      );
                    }

                    const subjects = SCHEDULE_DATA[lessonIdx];
                    lessonIdx++;

                    return (
                      <tr key={pi} className="border-b border-ink-100 hover:bg-paper/60 transition">
                        <td className="py-2 px-3 align-top">
                          <div className="font-semibold text-ink-900 text-[11.5px]">{p.label}</div>
                          <div className="text-[10px] text-ink-400 font-mono mt-0.5">{p.start}–{p.end}</div>
                        </td>
                        {subjects.map((subj, di) => {
                          const color = SUBJECT_COLOR[subj] ?? "bg-ink-100 text-ink-700";
                          return (
                            <td key={di} className="py-2 px-2 text-center">
                              <span className={`inline-block px-2 py-1 rounded-lg text-[10.5px] font-semibold ${color}`}>
                                {subj}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Renk lejantı */}
            <div className="px-5 py-3 border-t border-ink-100 flex flex-wrap gap-2">
              {Object.entries(SUBJECT_COLOR).map(([subj, color]) => (
                <span key={subj} className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold ${color}`}>
                  {subj}
                </span>
              ))}
            </div>
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
  const setCharacter      = useGameStore((s) => s.setCharacter);
  const resetConversation = useGameStore((s) => s.resetConversation);
  const treeNodes         = useGameStore((s) => s.tree.nodes);

  const [page, setPage] = useState<PageId>("home");
  const [externalMessage, setExternalMessage] = useState<string | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    if (user !== null) return;
    let cancelled = false;
    // Store boş — gerçekten oturum yok mu, yoksa AuthBootstrap profili çekiyor mu?
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      if (!data.session?.user) {
        router.replace("/login");
      }
      // Session varsa AuthBootstrap profile'i yükleyecek, store güncellenince bu effect tekrar tetiklenecek.
    })();
    return () => {
      cancelled = true;
    };
  }, [user, router]);

  if (!user) return null;

  const charId = selectedCharacter ?? "ataturk";
  const charInfo = CHAR_META[charId];
  const meta = PAGE_META[page];
  const todayLeft = 3;

  /** Konular > "Devam et" tıklanınca: karakteri seç, gerekirse konuşmayı sıfırla, home'a git ve mesaj yolla */
  const handleTopicContinue = (
    nextCharacterId: CharacterId,
    topicName: string,
    nextUnit: string,
  ) => {
    if (selectedCharacter !== nextCharacterId) {
      resetConversation();
      setCharacter(nextCharacterId);
    }
    setExternalMessage(`Merhaba, "${nextUnit}" konusuna geçmek istiyorum. Beni biraz hazırlar mısın?`);
    setPage("home");
  };

  /** Lig > "Hızlı soru çözmeye başla" → ChatCard'a "bana bir LGS sorusu sor" mesajı */
  const handleStartQuickLgs = () => {
    setExternalMessage("Hızlı bir LGS sorusu çözmek istiyorum, bana bir tane sorar mısın?");
    setPage("home");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-paper">
      <div className="hidden md:flex h-full">
        <Sidebar
          active={page}
          onChange={setPage}
          taskCount={todayLeft}
          onOpenNotifications={() => setNotificationsOpen(true)}
          treeNodes={treeNodes}
          treeCharId={selectedCharacter}
          onTreeNodeClick={(msg) => { setExternalMessage(msg); setPage("home"); }}
          onOpenTreeFullscreen={() => setPage("tree")}
        />
      </div>

      <main className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <Topbar
          title={meta.title}
          subtitle={meta.subtitle}
          username={user.username}
          onOpenNotifications={() => setNotificationsOpen(true)}
          onOpenProfile={() => setPage("profile")}
        />

        {/* Each view manages its own scroll (or none for home) */}
        <div className="flex-1 min-h-0 overflow-hidden pb-14 md:pb-0">
          {page === "home"    && (
            <HomeView
              onGoToTasks={() => setPage("tasks")}
              externalMessage={externalMessage}
              onExternalSent={() => setExternalMessage(null)}
            />
          )}
          {page === "tasks"   && <TasksView />}
          {page === "topics"  && <TopicsView onContinue={handleTopicContinue} />}
          {page === "tree"    && (
            <TreeView
              externalMessage={externalMessage}
              onExternalSent={() => setExternalMessage(null)}
              onNodeClick={(msg) => setExternalMessage(msg)}
            />
          )}
          {page === "lgs"     && <LgsQuizView />}
          {page === "league"  && <LeagueView onStartQuickLgs={handleStartQuickLgs} />}
          {page === "goals"   && <GoalsView />}
          {page === "takvim"  && <TakvimView />}
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

      <NotificationsDrawer
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </div>
  );
}
