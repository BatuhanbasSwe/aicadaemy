"use client";
import { useState } from "react";
import {
  FileQuestion, GitBranch, MessageCircle, Microscope,
  Plus, ArrowRight, Check, Clock, Timer, Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Task {
  id: string;
  title: string;
  subject: string;
  Icon: LucideIcon;
  chipCls: string;
  xp: number;
  due: string | null;
  estimate: string;
  done: boolean;
  priority: "high" | "med" | "low";
}

const PRIORITY_CLS = {
  high: "bg-coral-100 text-coral-600 border-coral-500/30",
  med:  "bg-ink-100 text-ink-700 border-ink-200",
  low:  "bg-ink-100 text-ink-500 border-ink-200",
};

const INIT_TASKS: Task[] = [
  {
    id: "t1", title: "10 Türkçe paragraf sorusu çöz",
    subject: "Türkçe", Icon: FileQuestion,
    chipCls: "bg-mint-100 text-mint-500",
    xp: 50, due: "17:00", estimate: "15 dk", done: false, priority: "high",
  },
  {
    id: "t2", title: "Trablusgarp düğümünü aç",
    subject: "İnkılap Tarihi", Icon: GitBranch,
    chipCls: "bg-brand-50 text-brand-700",
    xp: 30, due: null, estimate: "10 dk", done: true, priority: "med",
  },
  {
    id: "t3", title: "Üslü ifadeler · kavram tekrarı",
    subject: "Matematik", Icon: FileQuestion,
    chipCls: "bg-sky-100 text-sky-500",
    xp: 40, due: "19:30", estimate: "20 dk", done: false, priority: "med",
  },
  {
    id: "t4", title: "DNA ve Genetik · özet videosu",
    subject: "Fen Bilimleri", Icon: Microscope,
    chipCls: "bg-sun-100 text-sun-500",
    xp: 25, due: null, estimate: "8 dk", done: false, priority: "low",
  },
  {
    id: "t5", title: "Atatürk ile sohbet · 5 mesaj",
    subject: "Günlük seri", Icon: MessageCircle,
    chipCls: "bg-coral-100 text-coral-600",
    xp: 20, due: null, estimate: "5 dk", done: true, priority: "low",
  },
];

function TaskRow({ task, onToggle }: { task: Task; onToggle: () => void }) {
  const { Icon } = task;
  return (
    <div className="group flex items-center gap-2.5 py-2">
      {/* Checkbox */}
      <button
        onClick={onToggle}
        className={`w-4 h-4 rounded-md border-2 shrink-0 flex items-center justify-center transition ${
          task.done
            ? "bg-ink-900 border-ink-900 text-white"
            : "border-ink-300 hover:border-ink-900 bg-white"
        }`}
      >
        {task.done && <Check className="w-2.5 h-2.5" strokeWidth={3} />}
      </button>

      <div className="flex-1 min-w-0">
        <div
          className={`text-[12.5px] font-semibold leading-tight truncate ${
            task.done ? "text-ink-400 line-through" : "text-ink-900"
          }`}
        >
          {task.title}
        </div>
        <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-ink-500">
          <span className={`inline-flex items-center gap-1 px-1 py-0.5 rounded font-semibold ${task.chipCls}`}>
            <Icon className="w-2.5 h-2.5" strokeWidth={2.2} />
            {task.subject}
          </span>
          <span className="inline-flex items-center gap-0.5">
            <Timer className="w-2.5 h-2.5" /> {task.estimate}
          </span>
        </div>
      </div>

      <span className={`shrink-0 inline-flex items-center gap-0.5 text-[10.5px] font-bold font-mono tabular-nums ${task.done ? "text-ink-400" : "text-sun-500"}`}>
        <Zap className="w-2.5 h-2.5" strokeWidth={2.5} /> +{task.xp}
      </span>
    </div>
  );
}

interface Props {
  onSeeAll?: () => void;
}

export default function TasksCard({ onSeeAll }: Props) {
  const [tasks, setTasks] = useState<Task[]>(INIT_TASKS);

  const today    = tasks;
  const done     = today.filter((t) => t.done).length;
  const total    = today.length;
  const pct      = total ? Math.round((done / total) * 100) : 0;
  const xpEarned = today.filter((t) => t.done).reduce((s, t) => s + t.xp, 0);
  const xpLeft   = today.filter((t) => !t.done).reduce((s, t) => s + t.xp, 0);

  const toggleTask = (id: string) =>
    setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  // Show undone first, then done; max 3 visible (compact)
  const visible = [...today]
    .sort((a, b) => Number(a.done) - Number(b.done))
    .slice(0, 3);

  return (
    <div className="bg-white border border-ink-200 rounded-2xl shadow-card overflow-hidden shrink-0">
      {/* Header */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-[13px] text-ink-900 tracking-tight">
              Görevlerim
            </h3>
            <span className="text-[9.5px] uppercase tracking-[0.14em] text-ink-500 font-semibold">
              Bugün
            </span>
          </div>
          <div className="text-[10.5px] text-ink-500 mt-0.5">
            <span className="font-semibold text-ink-900 tabular-nums">{done}/{total}</span>{" "}
            tamamlandı ·
            <span className="text-mint-500 font-semibold"> +{xpEarned} XP</span>
          </div>
        </div>
        <button className="w-7 h-7 rounded-lg hover:bg-ink-100 flex items-center justify-center text-ink-500 transition shrink-0">
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="px-4">
        <div className="h-1 rounded-full bg-ink-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-mint-500 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Task rows */}
      <div className="px-4 mt-0.5 divide-y divide-ink-200">
        {visible.map((t) => (
          <TaskRow key={t.id} task={t} onToggle={() => toggleTask(t.id)} />
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-ink-200 flex items-center justify-between bg-paper/40">
        <span className="text-[10px] text-ink-500">{total - done} görev kaldı</span>
        <button
          onClick={onSeeAll}
          className="text-[11px] font-semibold text-ink-900 hover:text-brand-600 flex items-center gap-1 transition"
        >
          Tümü <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
