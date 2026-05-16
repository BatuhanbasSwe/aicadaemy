"use client";
import { useState } from "react";
import { useGameStore } from "@/lib/store/useGameStore";
import type { LgsQuestion } from "@/lib/types";
import { CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import confetti from "canvas-confetti";

interface Props {
  question: LgsQuestion;
  onDone?: () => void;
}

export default function LgsQuestionCard({ question, onDone }: Props) {
  const recordLgsAnswer = useGameStore((s) => s.recordLgsAnswer);
  const addNode         = useGameStore((s) => s.addNode);
  const tree            = useGameStore((s) => s.tree);

  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = submitted && selected === question.correctIndex;
  const isWrong   = submitted && selected !== question.correctIndex;

  function handleSubmit() {
    if (selected === null) return;
    const correct = selected === question.correctIndex;
    setSubmitted(true);
    recordLgsAnswer(question.difficulty, correct);

    if (correct) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ["#6B57DC", "#E8B83A", "#3FAE82"] });
      const rootId = tree.nodes[0]?.id ?? null;
      addNode({
        parentId: rootId,
        type: "lgs_correct",
        content: `✓ LGS ${question.year} — ${question.unit}`,
      });
    }
  }

  const diffLabel: Record<string, string> = { kolay: "Kolay", orta: "Orta", zor: "Zor" };
  const diffColor: Record<string, string> = {
    kolay: "bg-mint-100 text-mint-500",
    orta:  "bg-sun-100 text-sun-500",
    zor:   "bg-coral-100 text-coral-600",
  };

  return (
    <div className="rounded-2xl border border-brand-300 bg-brand-50 shadow-card overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3 bg-brand-500 flex items-center gap-3">
        <span className="text-white font-display font-bold text-[13px]">
          📝 LGS {question.year} · {question.subject === "matematik" ? "Matematik" : "İnkılap Tarihi"}
        </span>
        <span className={`ml-auto text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${diffColor[question.difficulty]}`}>
          {diffLabel[question.difficulty]}
        </span>
      </div>

      <div className="p-5 space-y-4">
        {/* Question text */}
        <div className="text-[14px] text-ink-900 font-medium leading-relaxed">{question.question}</div>

        {/* Options */}
        <div className="space-y-2">
          {question.options.map((opt, idx) => {
            let style = "border-ink-200 bg-white text-ink-900 hover:border-ink-300";
            if (submitted) {
              if (idx === question.correctIndex) style = "border-mint-500 bg-mint-100 text-mint-500";
              else if (idx === selected) style = "border-coral-500 bg-coral-100 text-coral-600";
              else style = "border-ink-200 bg-white/60 text-ink-400";
            } else if (selected === idx) {
              style = "border-brand-500 bg-brand-50 text-brand-700";
            }
            return (
              <button
                key={idx}
                disabled={submitted}
                onClick={() => setSelected(idx)}
                className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition ${style}`}
              >
                <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center shrink-0 text-xs font-bold">
                  {submitted && idx === question.correctIndex ? (
                    <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
                  ) : submitted && idx === selected ? (
                    <XCircle className="w-4 h-4" strokeWidth={2.5} />
                  ) : (
                    String.fromCharCode(65 + idx)
                  )}
                </span>
                <span className="text-[13.5px] font-medium">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {submitted && (
          <div
            className={`rounded-xl p-4 text-[13px] leading-relaxed fade-up ${
              isCorrect ? "bg-mint-100 text-mint-500" : "bg-coral-100 text-coral-600"
            }`}
          >
            {isCorrect ? (
              <div className="font-semibold">🎉 Harika! Doğru cevap!</div>
            ) : (
              <div className="font-semibold mb-1">
                Doğru cevap: <strong>{String.fromCharCode(65 + question.correctIndex)}</strong>
              </div>
            )}
            <div className="mt-1 text-ink-600">{question.explanation}</div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={selected === null}
              className="flex-1 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-40 text-white text-sm font-semibold transition"
            >
              Cevapla
            </button>
          ) : (
            <button
              onClick={onDone}
              className="flex-1 py-2.5 rounded-xl bg-ink-900 hover:bg-ink-700 text-white text-sm font-semibold flex items-center justify-center gap-2 transition"
            >
              Sohbete Dön <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
