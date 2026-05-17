"use client";
import { useState } from "react";
import { ArrowRight, ArrowLeft, BookOpen, ChevronRight } from "lucide-react";
import type { CharacterId } from "@/lib/types";
import { MUFREDAT, type MufredatSubject, type MufredatUnit } from "@/lib/content/mufredat";
import { useGameStore } from "@/lib/store/useGameStore";

const GUIDE_NAME: Record<CharacterId, string> = {
  ataturk:     "Mustafa Kemal Atatürk",
  cahit_arf:   "Cahit Arf",
  aziz_sancar: "Aziz Sancar",
  yunus_emre:  "Yunus Emre",
  mevlana:     "Mevlana",
  shakespeare: "William Shakespeare",
};

/* ── Level 1: Subject grid ───────────────────────────────── */
function SubjectGrid({
  onSelectSubject,
  onContinue,
}: {
  onSelectSubject: (s: MufredatSubject) => void;
  onContinue: (characterId: CharacterId, topicName: string, nextUnit: string) => void;
}) {
  const studiedUnitIds = useGameStore((s) => s.studiedUnitIds);

  return (
    <div className="h-full overflow-y-auto nice-scroll px-6 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl">
        {MUFREDAT.map((subject) => {
          const totalUnits = subject.units.length;
          const doneUnits = subject.units.filter(u => studiedUnitIds.includes(u.id)).length;
          const progress = totalUnits > 0 ? Math.round((doneUnits / totalUnits) * 100) : 0;
          const nextUnit = subject.units.find(u => !studiedUnitIds.includes(u.id));
          const nextLabel = nextUnit?.title ?? subject.units[subject.units.length - 1]?.title ?? "—";
          const r = 22;
          const c = 2 * Math.PI * r;
          return (
            <div
              key={subject.id}
              className="bg-white border border-ink-200 rounded-2xl shadow-card p-5 hover:shadow-pop hover:border-ink-300 transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl ${subject.bg} flex items-center justify-center text-2xl`}>
                  {subject.emoji}
                </div>
                <div className="relative w-12 h-12">
                  <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
                    <circle cx="28" cy="28" r={r} fill="none" stroke="rgba(15,17,21,0.06)" strokeWidth="4" />
                    <circle
                      cx="28" cy="28" r={r}
                      fill="none" stroke={subject.color} strokeWidth="4" strokeLinecap="round"
                      strokeDasharray={c}
                      strokeDashoffset={c - (progress / 100) * c}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-ink-900 font-mono">
                    %{progress}
                  </div>
                </div>
              </div>

              <h4 className="font-display font-bold text-[15px] text-ink-900 tracking-tight">{subject.name}</h4>
              <div className="text-[11.5px] text-ink-500 mt-0.5">Rehber: {GUIDE_NAME[subject.id]}</div>

              <div className="mt-4 pt-4 border-t border-ink-200">
                <div className="text-[10px] uppercase tracking-wider text-ink-500 font-semibold mb-1">Sıradaki</div>
                <div className="text-[12.5px] font-semibold text-ink-900 truncate">{nextLabel}</div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-[11px] text-ink-500">
                  <span className="font-semibold text-ink-900 tabular-nums">{doneUnits}</span> / {totalUnits} ünite
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectSubject(subject)}
                    className="text-[12px] font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 cursor-pointer transition"
                  >
                    Müfredatı Gör <BookOpen className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-ink-300">·</span>
                  <button
                    onClick={() => onContinue(subject.id, subject.name, nextLabel)}
                    className="text-[12px] font-semibold text-ink-500 hover:text-ink-700 flex items-center gap-1 cursor-pointer transition"
                  >
                    Devam et <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Level 2: Unit list ──────────────────────────────────── */
function UnitList({
  subject,
  onBack,
  onSelectUnit,
}: {
  subject: MufredatSubject;
  onBack: () => void;
  onSelectUnit: (u: MufredatUnit) => void;
}) {
  const studiedUnitIds = useGameStore((s) => s.studiedUnitIds);
  return (
    <div className="h-full overflow-y-auto nice-scroll px-6 py-4">
      {/* Back header */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-[13px] font-semibold text-ink-600 hover:text-ink-900 transition mb-5"
      >
        <ArrowLeft className="w-4 h-4" />
        {subject.name}
      </button>

      {/* Subject badge */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-xl ${subject.bg} flex items-center justify-center text-xl`}>
          {subject.emoji}
        </div>
        <div>
          <h2 className="font-display font-bold text-[18px] text-ink-900 tracking-tight">{subject.name}</h2>
          <div className="text-[12px] text-ink-500">{subject.units.length} ünite</div>
        </div>
      </div>

      {/* Unit grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl">
        {subject.units.map((unit, index) => {
          const studied = studiedUnitIds.includes(unit.id);
          return (
            <div
              key={unit.id}
              className={`bg-white border rounded-2xl shadow-card p-5 hover:shadow-pop transition flex flex-col ${studied ? "border-mint-300 bg-mint-50/40" : "border-ink-200 hover:border-ink-300"}`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-display font-bold text-white shrink-0"
                  style={{ backgroundColor: studied ? "#3FAE82" : subject.color }}
                >
                  {studied ? "✓" : index + 1}
                </div>
                <h4 className="font-display font-bold text-[14px] text-ink-900 tracking-tight leading-snug flex-1">
                  {unit.title}
                </h4>
              </div>

              <div className="text-[11.5px] text-ink-500 mt-auto pt-3 border-t border-ink-200 flex items-center justify-between">
                <span>
                  <span className="font-semibold text-ink-900">{unit.topics.length}</span> konu
                  {studied && <span className="ml-2 text-mint-600 font-semibold">· Çalışıldı</span>}
                </span>
                <button
                  onClick={() => onSelectUnit(unit)}
                  className="flex items-center gap-1 text-[12px] font-semibold hover:text-ink-900 transition"
                  style={{ color: subject.color }}
                >
                  İncele <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Level 3: Unit detail ────────────────────────────────── */
function UnitDetail({
  subject,
  unit,
  onBack,
  onStudyWithTeacher,
}: {
  subject: MufredatSubject;
  unit: MufredatUnit;
  onBack: () => void;
  onStudyWithTeacher: (characterId: CharacterId, unitTitle: string) => void;
}) {
  const markUnitStudied = useGameStore((s) => s.markUnitStudied);
  const studiedUnitIds  = useGameStore((s) => s.studiedUnitIds);
  const isStudied = studiedUnitIds.includes(unit.id);

  return (
    <div className="h-full overflow-y-auto nice-scroll px-6 py-4">
      {/* Back header */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-[13px] font-semibold text-ink-600 hover:text-ink-900 transition mb-5"
      >
        <ArrowLeft className="w-4 h-4" />
        {unit.title}
      </button>

      {/* Unit header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-xl ${subject.bg} flex items-center justify-center text-xl`}>
          {subject.emoji}
        </div>
        <div>
          <h2 className="font-display font-bold text-[18px] text-ink-900 tracking-tight">{unit.title}</h2>
          <div className="text-[12px] text-ink-500">{subject.name} · {unit.topics.length} konu</div>
        </div>
      </div>

      {/* Topic cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mb-8">
        {unit.topics.map((topic, index) => (
          <div
            key={topic.id}
            className="bg-white border border-ink-200 rounded-2xl shadow-card p-5 hover:shadow-pop hover:border-ink-300 transition"
          >
            <div className="flex items-start gap-2.5 mb-3">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold text-white shrink-0 mt-0.5"
                style={{ backgroundColor: subject.color }}
              >
                {index + 1}
              </div>
              <h4 className="font-display font-bold text-[14px] text-ink-900 tracking-tight leading-snug">
                {topic.title}
              </h4>
            </div>
            <p className="text-[12.5px] text-ink-600 leading-relaxed">{topic.explanation}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="max-w-7xl">
        <div className="bg-white border border-ink-200 rounded-2xl shadow-card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <div className="font-display font-bold text-[15px] text-ink-900 tracking-tight">
              Bu üniteyi hocamla çalış
              {isStudied && <span className="ml-2 text-[11px] font-bold text-mint-500 bg-mint-100 px-2 py-0.5 rounded-md">✓ Çalışıldı</span>}
            </div>
            <div className="text-[12px] text-ink-500 mt-0.5">
              {unit.title} ünitesini {GUIDE_NAME[subject.id]} ile birlikte keşfet.
            </div>
          </div>
          <button
            onClick={() => { markUnitStudied(unit.id); onStudyWithTeacher(subject.id, unit.title); }}
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-[13px] font-semibold transition hover:opacity-90"
            style={{ backgroundColor: subject.color }}
          >
            {isStudied ? "Tekrar çalış" : "Hocamla çalış"} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────── */
export default function MufredatView({
  onContinue,
  onStudyWithTeacher,
}: {
  onContinue: (characterId: CharacterId, topicName: string, nextUnit: string) => void;
  onStudyWithTeacher: (characterId: CharacterId, unitTitle: string) => void;
}) {
  const [selectedSubject, setSelectedSubject] = useState<MufredatSubject | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<MufredatUnit | null>(null);

  /* Level 3 */
  if (selectedSubject && selectedUnit) {
    return (
      <UnitDetail
        subject={selectedSubject}
        unit={selectedUnit}
        onBack={() => setSelectedUnit(null)}
        onStudyWithTeacher={onStudyWithTeacher}
      />
    );
  }

  /* Level 2 */
  if (selectedSubject) {
    return (
      <UnitList
        subject={selectedSubject}
        onBack={() => setSelectedSubject(null)}
        onSelectUnit={(unit) => setSelectedUnit(unit)}
      />
    );
  }

  /* Level 1 */
  return (
    <SubjectGrid
      onSelectSubject={(subject) => { setSelectedSubject(subject); setSelectedUnit(null); }}
      onContinue={onContinue}
    />
  );
}
