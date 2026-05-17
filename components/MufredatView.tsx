"use client";
import { useState } from "react";
import { ArrowRight, ArrowLeft, BookOpen, ChevronRight, Sprout, FileQuestion, Check, HelpCircle } from "lucide-react";
import type { CharacterId } from "@/lib/types";
import { MUFREDAT, type MufredatSubject, type MufredatUnit, type MufredatTopic } from "@/lib/content/mufredat";
import { useGameStore } from "@/lib/store/useGameStore";
import TopicMarkdown from "@/components/TopicMarkdown";

const GUIDE_NAME: Record<CharacterId, string> = {
  ataturk:     "Mustafa Kemal Atatürk",
  cahit_arf:   "Cahit Arf",
  aziz_sancar: "Aziz Sancar",
  yunus_emre:  "Yunus Emre",
  mevlana:     "Mevlana",
  shakespeare: "William Shakespeare",
};

/* ── Question card ───────────────────────────────────────── */
function QuestionCard({
  question,
  num,
  color,
  onAskTeacher,
}: {
  question: string;
  num: number;
  color: string;
  onAskTeacher: () => void;
}) {
  const [state, setState] = useState<"idle" | "know" | "skip">("idle");
  return (
    <div className={`border rounded-2xl p-4 transition ${
      state === "know"  ? "bg-mint-50/50 border-mint-300" :
      state === "skip"  ? "bg-brand-50/60 border-brand-300" :
                          "bg-white border-ink-200"
    }`}>
      <div className="flex gap-2.5 items-start mb-3">
        <span
          className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5"
          style={{ backgroundColor: state === "know" ? "#3FAE82" : color }}
        >
          {state === "know" ? "✓" : num}
        </span>
        <p className="text-[13px] text-ink-800 leading-relaxed flex-1">{question}</p>
      </div>

      {state === "idle" && (
        <div className="flex gap-2">
          <button
            onClick={() => setState("know")}
            className="flex-1 py-2 rounded-xl text-[12px] font-semibold bg-mint-100 text-mint-700 hover:bg-mint-200 transition flex items-center justify-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" /> Bunu biliyorum
          </button>
          <button
            onClick={() => { setState("skip"); onAskTeacher(); }}
            className="flex-1 py-2 rounded-xl text-[12px] font-semibold bg-brand-50 text-brand-700 hover:bg-brand-100 transition flex items-center justify-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5" /> Anlayamadım
          </button>
        </div>
      )}
      {state === "know" && (
        <p className="text-[11.5px] text-mint-600 font-semibold">Harika! Bu soruyu biliyorsun.</p>
      )}
      {state === "skip" && (
        <div className="flex items-center justify-between">
          <p className="text-[11.5px] text-brand-600 font-semibold">Öğretmen sana yardım edecek!</p>
          <button onClick={onAskTeacher} className="text-[11px] underline text-brand-500 hover:text-brand-700">Tekrar sor →</button>
        </div>
      )}
    </div>
  );
}

/* ── Subject questions view ──────────────────────────────── */
function SubjectQuestionsView({
  subject,
  onBack,
  onAskTeacher,
}: {
  subject: MufredatSubject;
  onBack: () => void;
  onAskTeacher: (characterId: CharacterId, q: string) => void;
}) {
  const totalQs = subject.units.reduce((acc, u) => acc + (u.questions?.length ?? 0), 0);

  return (
    <div className="h-full overflow-y-auto nice-scroll px-6 py-4">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-[13px] font-semibold text-ink-600 hover:text-ink-900 transition mb-5"
      >
        <ArrowLeft className="w-4 h-4" /> Dersler
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-xl ${subject.bg} flex items-center justify-center text-xl`}>
          {subject.emoji}
        </div>
        <div>
          <h2 className="font-display font-bold text-[18px] text-ink-900 tracking-tight">{subject.name} — Alıştırmalar</h2>
          <div className="text-[12px] text-ink-500">
            {totalQs} soru · Anlayamadıkların {GUIDE_NAME[subject.id]}&apos;a yönlenecek
          </div>
        </div>
      </div>

      {totalQs === 0 ? (
        <div className="max-w-3xl">
          <div className="bg-ink-50 border border-ink-200 rounded-2xl p-10 text-center">
            <div className="text-4xl mb-3">🚧</div>
            <h3 className="font-display font-bold text-[16px] text-ink-900 mb-2">Yakında Geliyor!</h3>
            <p className="text-[13px] text-ink-500 max-w-xs mx-auto">
              {subject.name} dersi için sorular hazırlanıyor. Çok yakında burada olacak!
            </p>
            <button
              onClick={onBack}
              className="mt-6 px-5 py-2.5 rounded-xl text-white text-[13px] font-semibold transition hover:opacity-90"
              style={{ backgroundColor: subject.color }}
            >
              Dersler&apos;e Dön
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-10 max-w-3xl pb-8">
          {subject.units.map((unit) => {
            const qs = unit.questions ?? [];
            if (qs.length === 0) return null;
            return (
              <div key={unit.id}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-5 rounded-full shrink-0" style={{ backgroundColor: subject.color }} />
                  <h3 className="font-display font-bold text-[14px] text-ink-900 tracking-tight">{unit.title}</h3>
                  <span className="text-[11px] text-ink-400 ml-auto">{qs.length} soru</span>
                </div>
                <div className="space-y-3">
                  {qs.map((q, i) => (
                    <QuestionCard
                      key={i}
                      question={q}
                      num={i + 1}
                      color={subject.color}
                      onAskTeacher={() => onAskTeacher(subject.id, q)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── Level 1: Subject grid ───────────────────────────────── */
function SubjectGrid({
  onSelectTopics,
  onSelectQuestions,
  onContinue,
}: {
  onSelectTopics:   (s: MufredatSubject) => void;
  onSelectQuestions: (s: MufredatSubject) => void;
  onContinue: (characterId: CharacterId, topicName: string, nextUnit: string) => void;
}) {
  const studiedUnitIds = useGameStore((s) => s.studiedUnitIds);

  return (
    <div className="h-full overflow-y-auto nice-scroll px-6 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl">
        {MUFREDAT.map((subject) => {
          const totalUnits = subject.units.length;
          const doneUnits  = subject.units.filter(u => studiedUnitIds.includes(u.id)).length;
          const progress   = totalUnits > 0 ? Math.round((doneUnits / totalUnits) * 100) : 0;
          const nextUnit   = subject.units.find(u => !studiedUnitIds.includes(u.id));
          const nextLabel  = nextUnit?.title ?? subject.units[subject.units.length - 1]?.title ?? "—";
          const totalQs    = subject.units.reduce((acc, u) => acc + (u.questions?.length ?? 0), 0);
          const r = 22;
          const c = 2 * Math.PI * r;

          return (
            <div
              key={subject.id}
              className="bg-white border border-ink-200 rounded-2xl shadow-card p-5 hover:shadow-pop hover:border-ink-300 transition flex flex-col"
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

              <div className="mt-3 text-[11px] text-ink-500">
                <span className="font-semibold text-ink-900 tabular-nums">{doneUnits}</span> / {totalUnits} ünite
                {totalQs > 0 && (
                  <span className="ml-2 text-ink-400">· {totalQs} soru</span>
                )}
              </div>

              {/* 3 action buttons */}
              <div className="mt-4 pt-4 border-t border-ink-200 flex items-center gap-3 flex-wrap">
                <button
                  onClick={() => onSelectTopics(subject)}
                  className="text-[12px] font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 transition"
                >
                  <BookOpen className="w-3.5 h-3.5" /> Konu Anlatımı
                </button>
                <span className="text-ink-300 text-[11px]">·</span>
                <button
                  onClick={() => onSelectQuestions(subject)}
                  className="text-[12px] font-semibold text-sun-600 hover:text-sun-700 flex items-center gap-1 transition"
                  style={{ color: subject.color }}
                >
                  <FileQuestion className="w-3.5 h-3.5" /> Sorular
                </button>
                <span className="text-ink-300 text-[11px]">·</span>
                <button
                  onClick={() => onContinue(subject.id, subject.name, nextLabel)}
                  className="text-[12px] font-semibold flex items-center gap-1 transition hover:opacity-80"
                  style={{ color: "#3a8c3f" }}
                >
                  <Sprout className="w-3.5 h-3.5" /> Merak Ağacı
                </button>
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
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-[13px] font-semibold text-ink-600 hover:text-ink-900 transition mb-5"
      >
        <ArrowLeft className="w-4 h-4" />
        {subject.name}
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-xl ${subject.bg} flex items-center justify-center text-xl`}>
          {subject.emoji}
        </div>
        <div>
          <h2 className="font-display font-bold text-[18px] text-ink-900 tracking-tight">{subject.name}</h2>
          <div className="text-[12px] text-ink-500">{subject.units.length} ünite</div>
        </div>
      </div>

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

/* ── Topic card (no embedded questions) ─────────────────── */
function TopicCard({
  topic,
  subject,
  index,
}: {
  topic: MufredatTopic;
  subject: MufredatSubject;
  index: number;
}) {
  return (
    <div className="bg-white border border-ink-200 rounded-2xl shadow-card p-5 hover:shadow-pop hover:border-ink-300 transition">
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
      <TopicMarkdown content={topic.explanation} />
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
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-[13px] font-semibold text-ink-600 hover:text-ink-900 transition mb-5"
      >
        <ArrowLeft className="w-4 h-4" />
        {unit.title}
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-xl ${subject.bg} flex items-center justify-center text-xl`}>
          {subject.emoji}
        </div>
        <div>
          <h2 className="font-display font-bold text-[18px] text-ink-900 tracking-tight">{unit.title}</h2>
          <div className="text-[12px] text-ink-500">{subject.name} · {unit.topics.length} konu</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mb-8">
        {unit.topics.map((topic, index) => (
          <TopicCard key={topic.id} topic={topic} subject={subject} index={index} />
        ))}
      </div>

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
  const [selectedUnit,    setSelectedUnit]    = useState<MufredatUnit | null>(null);
  const [mode, setMode] = useState<"topics" | "questions">("topics");

  function goHome() {
    setSelectedSubject(null);
    setSelectedUnit(null);
    setMode("topics");
  }

  /* Questions view */
  if (mode === "questions" && selectedSubject) {
    return (
      <SubjectQuestionsView
        subject={selectedSubject}
        onBack={goHome}
        onAskTeacher={(characterId, q) => onStudyWithTeacher(characterId, q)}
      />
    );
  }

  /* Unit detail */
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

  /* Unit list */
  if (selectedSubject) {
    return (
      <UnitList
        subject={selectedSubject}
        onBack={goHome}
        onSelectUnit={(unit) => setSelectedUnit(unit)}
      />
    );
  }

  /* Subject grid */
  return (
    <SubjectGrid
      onSelectTopics={(s)    => { setSelectedSubject(s); setSelectedUnit(null); setMode("topics"); }}
      onSelectQuestions={(s) => { setSelectedSubject(s); setSelectedUnit(null); setMode("questions"); }}
      onContinue={onContinue}
    />
  );
}
