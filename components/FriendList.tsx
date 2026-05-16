"use client";
import { useGameStore } from "@/lib/store/useGameStore";
import { Trophy, Flame, Crown, UserPlus, X, Check } from "lucide-react";
import { useState, useEffect } from "react";

/* Fake friends base scores — Batuhan'ın fake-friends.ts'i hazır olunca replace edilir */
const BASE_FRIENDS = [
  { id: "f1", username: "Defne K.", avatar: "D", color: "#E8B83A", nodes: 12, lgsCorrect: 8, streak: 31 },
  { id: "f2", username: "Yiğit A.", avatar: "Y", color: "#5E8BC3", nodes: 9,  lgsCorrect: 6, streak: 14 },
  { id: "f3", username: "Zeynep B.", avatar: "Z", color: "#3FAE82", nodes: 7,  lgsCorrect: 5, streak: 9  },
  { id: "f4", username: "Mert Ç.",  avatar: "M", color: "#E58A5A", nodes: 5,  lgsCorrect: 3, streak: 7  },
];

function score(nodes: number, lgsCorrect: number) {
  return nodes + lgsCorrect * 2;
}

export default function FriendList() {
  const user  = useGameStore((s) => s.user);
  const gameScore = useGameStore((s) => s.score);

  const [showModal, setShowModal] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  // 30s polling: arkadaş skorlarını hafifçe değiştir (Supabase'e kadar simüle)
  const [fakeFriends, setFakeFriends] = useState(BASE_FRIENDS);
  useEffect(() => {
    const id = setInterval(() => {
      setFakeFriends((prev) =>
        prev.map((f) => ({
          ...f,
          nodes: f.nodes + (Math.random() < 0.25 ? 1 : 0),
          lgsCorrect: f.lgsCorrect + (Math.random() < 0.1 ? 1 : 0),
        }))
      );
    }, 30_000);
    return () => clearInterval(id);
  }, []);

  const meScore = score(gameScore.nodesOpened, gameScore.lgsCorrect);

  const allRows = [
    ...fakeFriends.map((f) => ({
      ...f,
      score: score(f.nodes, f.lgsCorrect),
      isMe: false,
    })),
    {
      id: "me",
      username: user?.username ?? "Sen",
      avatar: (user?.username?.[0] ?? "S").toUpperCase(),
      color: "#6B57DC",
      nodes: gameScore.nodesOpened,
      lgsCorrect: gameScore.lgsCorrect,
      streak: 1,
      score: meScore,
      isMe: true,
    },
  ].sort((a, b) => b.score - a.score);

  function handleAddFriend() {
    if (!codeInput.trim()) return;
    const name = codeInput.startsWith("KAS-") ? "Arkadaşın" : "Kullanıcı";
    setShowModal(false);
    setCodeInput("");
    setToast(`${name} eklendi! 🎉`);
    setTimeout(() => setToast(null), 3000);
  }

  return (
    <div className="bg-white border border-ink-200 rounded-2xl shadow-card overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-ink-200 flex items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-[14px] text-ink-900 tracking-tight">
            👥 Arkadaşlarım
          </h3>
          <div className="text-[11px] text-ink-500">Haftalık liderlik tablosu</div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ink-900 hover:bg-ink-700 text-white text-[12px] font-semibold transition"
        >
          <UserPlus className="w-3.5 h-3.5" />
          Ekle
        </button>
      </div>

      {/* Rows */}
      <div className="divide-y divide-ink-200">
        {allRows.map((f, i) => {
          const rank = i + 1;
          const rankColor =
            rank === 1 ? "bg-sun-500 text-white" :
            rank === 2 ? "bg-ink-300 text-ink-900" :
            rank === 3 ? "bg-coral-500 text-white" :
            "bg-ink-100 text-ink-500";
          return (
            <div
              key={f.id}
              className={`px-4 py-3 flex items-center gap-3 ${f.isMe ? "bg-brand-50/50" : "hover:bg-paper/60"}`}
            >
              {/* Rank */}
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-display font-bold text-[12px] shrink-0 ${rankColor}`}>
                {rank}
              </div>

              {/* Avatar */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-sm text-white shrink-0"
                style={{ background: f.color }}
              >
                {f.avatar}
              </div>

              {/* Name + streak */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className={`font-semibold text-[13px] truncate ${f.isMe ? "text-brand-700" : "text-ink-900"}`}>
                    {f.username}
                  </span>
                  {f.isMe && (
                    <span className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-brand-500 text-white">
                      SEN
                    </span>
                  )}
                  {rank === 1 && <Crown className="w-3.5 h-3.5 text-sun-500 shrink-0" strokeWidth={2.5} />}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-ink-400 mt-0.5">
                  <Flame className="w-3 h-3 text-coral-500" strokeWidth={2.5} />
                  <span>{f.streak} gün</span>
                </div>
              </div>

              {/* Score */}
              <div className="text-right shrink-0">
                <div className="font-display font-bold text-[14px] text-ink-900 tabular-nums">{f.score}</div>
                <div className="text-[10px] text-ink-400">{f.nodes}🌿 {f.lgsCorrect}✓</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Motivation banner if behind leader */}
      {meScore < allRows[0]?.score && (
        <div className="mx-4 mb-4 mt-3 px-3 py-2 rounded-xl bg-sun-100 border border-sun-500/30 text-[11.5px] text-ink-700 font-medium">
          🚀 <strong>{allRows[0].username}</strong> seni{" "}
          <strong>{allRows[0].score - meScore}</strong> puan geçti! Düğüm aç, öne geç!
        </div>
      )}

      {/* Add friend modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-pop border border-ink-200 w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-[16px] text-ink-900">Arkadaş Ekle</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg hover:bg-ink-100 flex items-center justify-center text-ink-500">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[13px] text-ink-500 mb-4">Arkadaşının davet kodunu gir (örn: KAS-AB3XY7)</p>
            <input
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
              placeholder="KAS-······"
              className="w-full px-4 py-3 rounded-xl border border-ink-200 bg-paper text-ink-900 font-mono font-bold text-center text-lg focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 tracking-widest transition"
              maxLength={10}
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-ink-200 text-ink-700 text-sm font-semibold hover:bg-ink-100 transition"
              >
                İptal
              </button>
              <button
                onClick={handleAddFriend}
                disabled={codeInput.length < 3}
                className="flex-1 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-40 text-white text-sm font-semibold flex items-center justify-center gap-2 transition"
              >
                <Check className="w-4 h-4" />
                Ekle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-ink-900 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-pop z-50 fade-up">
          {toast}
        </div>
      )}
    </div>
  );
}
