"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus, X, Check } from "lucide-react";

/* ── Types ─────────────────────────────────────────────── */
interface CalEvent {
  id: string;
  title: string;
  time: string; // "HH:MM"
  subject: string;
  color: string; // hex
  date?: string; // "YYYY-MM-DD" for one-time events
  dayOfWeek?: number; // 0=Mon … 6=Sun for recurring
  recurrence: "once" | "weekly" | "daily";
}

/* ── Constants ──────────────────────────────────────────── */
const STORAGE_KEY = "lgs-kasifi-calendar";

const SUBJECT_COLORS: Record<string, string> = {
  "Matematik":            "#5E8BC3",
  "T.C. İnkılap Tarihi": "#6B57DC",
  "Fen Bilimleri":        "#3FAE82",
  "Türkçe":               "#E8B83A",
  "Din Kültürü":          "#6366F1",
  "İngilizce":            "#E58A5A",
  "Genel":                "#9CA3AF",
};

const SUBJECTS = Object.keys(SUBJECT_COLORS);

const WEEKDAY_LABELS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

/* Sample recurring events (Mon=0 … Sun=6 matching JS getDay()-adjusted) */
const SAMPLE_EVENTS: CalEvent[] = [
  { id: "sample-0", title: "Matematik",            time: "09:00", subject: "Matematik",            color: SUBJECT_COLORS["Matematik"],            dayOfWeek: 0, recurrence: "weekly" },
  { id: "sample-1", title: "Türkçe",               time: "12:00", subject: "Türkçe",               color: SUBJECT_COLORS["Türkçe"],               dayOfWeek: 1, recurrence: "weekly" },
  { id: "sample-2", title: "Fen Bilimleri",        time: "10:00", subject: "Fen Bilimleri",        color: SUBJECT_COLORS["Fen Bilimleri"],        dayOfWeek: 2, recurrence: "weekly" },
  { id: "sample-3", title: "T.C. İnkılap Tarihi", time: "11:00", subject: "T.C. İnkılap Tarihi", color: SUBJECT_COLORS["T.C. İnkılap Tarihi"], dayOfWeek: 3, recurrence: "weekly" },
  { id: "sample-4", title: "İngilizce",            time: "13:00", subject: "İngilizce",            color: SUBJECT_COLORS["İngilizce"],            dayOfWeek: 4, recurrence: "weekly" },
];

/* ── Helpers ────────────────────────────────────────────── */

/** Convert JS getDay() (0=Sun) → Mon-based index (0=Mon…6=Sun) */
function jsDayToMon(jsDay: number): number {
  return (jsDay + 6) % 7;
}

/** "YYYY-MM-DD" for a given Date */
function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** All events that fall on a specific date */
function eventsForDate(events: CalEvent[], dateStr: string): CalEvent[] {
  const d = new Date(dateStr + "T12:00:00");
  const monDay = jsDayToMon(d.getDay());

  return events.filter((ev) => {
    if (ev.recurrence === "once") return ev.date === dateStr;
    if (ev.recurrence === "weekly") return ev.dayOfWeek === monDay;
    if (ev.recurrence === "daily") return true;
    return false;
  }).sort((a, b) => a.time.localeCompare(b.time));
}

/** Build the grid of Date objects for a month view (always 6 rows × 7 cols) */
function buildMonthGrid(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1);
  const startOffset = jsDayToMon(firstDay.getDay()); // how many blanks before day 1
  const cells: Date[] = [];
  const start = new Date(year, month, 1 - startOffset);
  for (let i = 0; i < 42; i++) {
    cells.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
  }
  return cells;
}

/* ── Component ──────────────────────────────────────────── */
export default function CalendarView() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth()); // 0-based
  const [selectedDate, setSelectedDate] = useState<string>(toDateStr(today));
  const [events, setEvents] = useState<CalEvent[]>([]);

  // Add-form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formTime, setFormTime] = useState("09:00");
  const [formSubject, setFormSubject] = useState("Matematik");
  const [formRecurrence, setFormRecurrence] = useState<"once" | "weekly" | "daily">("once");
  const [savedFlash, setSavedFlash] = useState(false);

  /* Load from localStorage (or seed with samples on first visit) */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setEvents(JSON.parse(raw) as CalEvent[]);
      } else {
        setEvents(SAMPLE_EVENTS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_EVENTS));
      }
    } catch {
      setEvents(SAMPLE_EVENTS);
    }
  }, []);

  const persist = (next: CalEvent[]) => {
    setEvents(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* */ }
  };

  /* Navigation */
  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else { setViewMonth(m => m - 1); }
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else { setViewMonth(m => m + 1); }
  };

  const grid = buildMonthGrid(viewYear, viewMonth);
  const todayStr = toDateStr(today);
  const monthNames = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];

  /* Events for the selected day panel */
  const selectedEvents = eventsForDate(events, selectedDate);

  /* Save new event */
  const handleSave = () => {
    if (!formTitle.trim()) return;
    const color = SUBJECT_COLORS[formSubject] ?? "#9CA3AF";
    const sel = new Date(selectedDate + "T12:00:00");
    const monDay = jsDayToMon(sel.getDay());

    const ev: CalEvent = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      title: formTitle.trim(),
      time: formTime,
      subject: formSubject,
      color,
      recurrence: formRecurrence,
      ...(formRecurrence === "once"   ? { date: selectedDate } : {}),
      ...(formRecurrence === "weekly" ? { dayOfWeek: monDay }  : {}),
    };

    persist([...events, ev]);
    setFormTitle("");
    setFormTime("09:00");
    setFormSubject("Matematik");
    setFormRecurrence("once");
    setShowAddForm(false);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1500);
  };

  const handleDelete = (id: string) => {
    persist(events.filter(e => e.id !== id));
  };

  /* ── Render ── */
  return (
    <div className="h-full overflow-y-auto nice-scroll px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-4 flex-col lg:flex-row">

          {/* ══ LEFT: Calendar Grid (2/3) ══════════════════════════════ */}
          <div className="lg:w-2/3 bg-white border border-ink-200 rounded-2xl shadow-card overflow-hidden flex flex-col">

            {/* Month header */}
            <div className="px-5 py-4 border-b border-ink-200 flex items-center justify-between">
              <button
                onClick={prevMonth}
                className="w-8 h-8 rounded-lg hover:bg-ink-100 flex items-center justify-center transition text-ink-500"
                aria-label="Önceki ay"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
              </button>
              <h2 className="font-display font-bold text-[16px] text-ink-900 tracking-tight select-none">
                {monthNames[viewMonth]} {viewYear}
              </h2>
              <button
                onClick={nextMonth}
                className="w-8 h-8 rounded-lg hover:bg-ink-100 flex items-center justify-center transition text-ink-500"
                aria-label="Sonraki ay"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>

            {/* Weekday labels */}
            <div className="grid grid-cols-7 border-b border-ink-200">
              {WEEKDAY_LABELS.map((lbl) => (
                <div key={lbl} className="py-2 text-center text-[10px] uppercase tracking-widest font-semibold text-ink-400 select-none">
                  {lbl}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 flex-1">
              {grid.map((cellDate, idx) => {
                const cellStr   = toDateStr(cellDate);
                const isToday   = cellStr === todayStr;
                const isSelected = cellStr === selectedDate;
                const inMonth   = cellDate.getMonth() === viewMonth;
                const dayEvs    = eventsForDate(events, cellStr);
                const dotsToShow = dayEvs.slice(0, 3);
                const overflow   = dayEvs.length - 3;

                return (
                  <button
                    key={cellStr + idx}
                    onClick={() => setSelectedDate(cellStr)}
                    className={[
                      "min-h-[72px] p-1.5 flex flex-col items-start border-b border-r border-ink-200/60 transition focus:outline-none",
                      !inMonth ? "bg-paper/40" : "hover:bg-brand-50/40",
                      isSelected && !isToday ? "ring-2 ring-inset ring-brand-500" : "",
                    ].join(" ")}
                  >
                    {/* Day number */}
                    <span
                      className={[
                        "w-7 h-7 flex items-center justify-center rounded-lg text-[13px] font-semibold mb-1 leading-none select-none",
                        isToday    ? "bg-ink-900 text-white font-display font-bold" :
                        isSelected ? "bg-brand-50 text-brand-600 font-bold" :
                        inMonth    ? "text-ink-900" : "text-ink-400",
                      ].join(" ")}
                    >
                      {cellDate.getDate()}
                    </span>

                    {/* Event dots */}
                    <div className="w-full space-y-0.5">
                      {dotsToShow.map((ev) => (
                        <div
                          key={ev.id}
                          className="w-full flex items-center gap-1 px-1 py-0.5 rounded text-[9px] font-semibold truncate"
                          style={{ background: ev.color + "22", color: ev.color }}
                          title={ev.title}
                        >
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ev.color }} />
                          <span className="truncate leading-tight">{ev.title}</span>
                        </div>
                      ))}
                      {overflow > 0 && (
                        <div className="w-full px-1 text-[9px] font-bold text-ink-400">
                          +{overflow} daha
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ══ RIGHT: Day Panel (1/3) ══════════════════════════════════ */}
          <div className="lg:w-1/3 flex flex-col gap-3">

            {/* Header card */}
            <div className="bg-white border border-ink-200 rounded-2xl shadow-card p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-[10px] uppercase tracking-widest font-semibold text-ink-400 mb-0.5">
                    Seçili Gün
                  </div>
                  <h3 className="font-display font-bold text-[15px] text-ink-900 tracking-tight">
                    {(() => {
                      const d = new Date(selectedDate + "T12:00:00");
                      const dayNames = ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"];
                      return `${d.getDate()} ${monthNames[d.getMonth()]} · ${dayNames[d.getDay()]}`;
                    })()}
                  </h3>
                </div>
                {savedFlash && (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-mint-500/10 text-mint-500 text-[11px] font-semibold">
                    <Check className="w-3 h-3" strokeWidth={2.5} /> Kaydedildi
                  </div>
                )}
              </div>

              {/* Event list */}
              {selectedEvents.length === 0 ? (
                <p className="text-[12px] text-ink-400 py-2">Bu gün için etkinlik yok.</p>
              ) : (
                <div className="space-y-2">
                  {selectedEvents.map((ev) => (
                    <div
                      key={ev.id}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-ink-200/60 group hover:border-ink-300 transition"
                      style={{ borderLeftColor: ev.color, borderLeftWidth: 3 }}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-semibold text-ink-900 truncate">{ev.title}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-ink-500 font-mono tabular-nums">{ev.time}</span>
                          <span className="text-[10px] text-ink-400">{ev.subject}</span>
                          {ev.recurrence !== "once" && (
                            <span
                              className="text-[9px] px-1.5 py-0.5 rounded font-semibold"
                              style={{ background: ev.color + "22", color: ev.color }}
                            >
                              {ev.recurrence === "weekly" ? "Her Hafta" : "Her Gün"}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(ev.id)}
                        className="w-6 h-6 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-coral-100 text-ink-400 hover:text-coral-500 transition"
                        aria-label="Etkinliği sil"
                      >
                        <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add button */}
              {!showAddForm && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="mt-3 w-full py-2 rounded-xl border border-dashed border-ink-300 text-ink-500 hover:border-brand-500 hover:text-brand-600 hover:bg-brand-50/40 text-[12px] font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5" strokeWidth={2.5} /> Etkinlik Ekle
                </button>
              )}
            </div>

            {/* Inline Add Form */}
            {showAddForm && (
              <div className="bg-white border border-ink-200 rounded-2xl shadow-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-[13px] text-ink-900">Yeni Etkinlik</h4>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="w-6 h-6 rounded-md flex items-center justify-center text-ink-400 hover:bg-ink-100 transition"
                  >
                    <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </button>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-semibold text-ink-400 mb-1">Başlık</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Ders adı veya konu…"
                    className="w-full px-3 py-2 rounded-lg border border-ink-200 bg-paper text-[13px] text-ink-900 placeholder-ink-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition"
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-semibold text-ink-400 mb-1">Saat</label>
                  <input
                    type="time"
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-ink-200 bg-paper text-[13px] text-ink-900 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-semibold text-ink-400 mb-1">Ders</label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-ink-200 bg-paper text-[13px] text-ink-900 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition"
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {/* Color preview */}
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ background: SUBJECT_COLORS[formSubject] }}
                    />
                    <span className="text-[10px] text-ink-400">Renk otomatik atanır</span>
                  </div>
                </div>

                {/* Recurrence */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-semibold text-ink-400 mb-1">Tekrar</label>
                  <div className="flex gap-1.5">
                    {(["once","weekly","daily"] as const).map((r) => {
                      const labels: Record<string, string> = { once: "Tek Sefer", weekly: "Her Hafta", daily: "Her Gün" };
                      const active = formRecurrence === r;
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setFormRecurrence(r)}
                          className={[
                            "flex-1 py-1.5 rounded-lg text-[11px] font-semibold transition border",
                            active
                              ? "bg-brand-500 text-white border-brand-500"
                              : "bg-paper text-ink-600 border-ink-200 hover:border-brand-400 hover:text-brand-600",
                          ].join(" ")}
                        >
                          {labels[r]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Save */}
                <button
                  onClick={handleSave}
                  disabled={!formTitle.trim()}
                  className="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-40 text-white text-[13px] font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <Check className="w-3.5 h-3.5" strokeWidth={2.5} /> Kaydet
                </button>
              </div>
            )}

            {/* Legend */}
            <div className="bg-white border border-ink-200 rounded-2xl shadow-card p-4">
              <div className="text-[10px] uppercase tracking-widest font-semibold text-ink-400 mb-2.5">Ders Renkleri</div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                {SUBJECTS.map((s) => (
                  <div key={s} className="flex items-center gap-1.5 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: SUBJECT_COLORS[s] }} />
                    <span className="text-[11px] text-ink-600 truncate">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
