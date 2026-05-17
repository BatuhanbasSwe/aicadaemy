"use client";
import { useGameStore } from "@/lib/store/useGameStore";
import { Crown, UserPlus, X, Check, Flame, MessageCircle, Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import {
  FAKE_FRIENDS,
  simulateFriendProgress,
  buildLeaderboardLine,
} from "@/lib/content/fake-friends";

function calcScore(nodes: number, lgsCorrect: number) {
  return nodes + lgsCorrect * 2;
}

interface RowData {
  id: string;
  username: string;
  avatar: string;
  nodes: number;
  lgsCorrect: number;
  streak: number;
  isMe: boolean;
}

interface ChatMsg { text: string; fromMe: boolean; ts: number; }

const FAKE_OPENERS: Record<string, string> = {
  f1: "Selamm! Bugün nasıl çalıştın? 📚",
  f2: "Seni liderlik tablosunda az fark geçtim 😄 Dikkat et!",
  f3: "Merak Ağacın ne kadar büyüdü?",
  f4: "Bugün LGS soruları çözdüm, sen neredeydin?",
  f5: "Kahit Arf'la çalıştım bugün, inanılmazdı!",
};
const DEFAULT_OPENER = "Selam! Bugün çalıştın mı? 👋";

const FAKE_REPLIES = [
  "Harika! Ben de az önce çalışmayı bitirdim 📚",
  "Üslü sayılardan çok soru çözdüm bugün!",
  "Seninle yarışmak çok motive edici 😊",
  "Hocayla ders anlatımı çok işime yaradı.",
  "Bugün matematik ünitesinde 8/10 yaptım!",
  "Sen kaç soru çözdün?",
  "LGS'ye birlikte hazırlanmak çok daha kolay!",
  "Merak Ağacım da büyüyor yavaş yavaş 🌱",
  "Aziz Sancar basıncı çok güzel anlattı!",
  "Sıralamada yakında seni geçeceğim 😏",
];

/* ── Chat panel ──────────────────────────────────────────── */
function ChatPanel({
  friend,
  messages,
  input,
  onInput,
  onSend,
  onClose,
}: {
  friend: RowData;
  messages: ChatMsg[];
  input: string;
  onInput: (v: string) => void;
  onSend: () => void;
  onClose: () => void;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white rounded-2xl shadow-pop border border-ink-200 z-50 flex flex-col" style={{ maxHeight: 440 }}>
      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 py-3 bg-ink-900 rounded-t-2xl shrink-0">
        <div className="w-8 h-8 rounded-xl bg-ink-700 flex items-center justify-center text-lg shrink-0">
          {friend.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[13px] text-white truncate">{friend.username}</div>
          <div className="text-[10px] text-ink-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-mint-500 inline-block" /> Çevrimiçi
          </div>
        </div>
        <button onClick={onClose} className="text-ink-400 hover:text-white transition ml-1">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 nice-scroll" style={{ minHeight: 220, maxHeight: 300 }}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.fromMe ? "justify-end" : "justify-start"}`}>
            {!m.fromMe && (
              <div className="w-6 h-6 rounded-lg bg-ink-100 flex items-center justify-center text-sm shrink-0 mr-1.5 mt-0.5">
                {friend.avatar}
              </div>
            )}
            <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-[12.5px] leading-relaxed ${
              m.fromMe
                ? "bg-brand-500 text-white rounded-tr-sm"
                : "bg-ink-100 text-ink-900 rounded-tl-sm"
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-t border-ink-200 shrink-0">
        <input
          value={input}
          onChange={e => onInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && onSend()}
          placeholder="Mesaj yaz..."
          className="flex-1 px-3 py-2 rounded-xl border border-ink-200 text-[12px] text-ink-900 bg-paper focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 transition"
        />
        <button
          onClick={onSend}
          disabled={!input.trim()}
          className="w-8 h-8 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-40 flex items-center justify-center text-white transition"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ── Friend row ──────────────────────────────────────────── */
function FriendRow({
  f,
  rank,
  onChat,
}: {
  f: RowData;
  rank: number;
  onChat?: () => void;
}) {
  const rankColor =
    rank === 1 ? "bg-sun-500 text-white" :
    rank === 2 ? "bg-ink-300 text-ink-900" :
    rank === 3 ? "bg-coral-500 text-white" :
    "bg-ink-100 text-ink-500";

  return (
    <div className={`px-4 py-3 flex items-center gap-3 transition ${f.isMe ? "bg-brand-50/50" : "hover:bg-paper/60"}`}>
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-display font-bold text-[12px] shrink-0 ${rankColor}`}>
        {rank}
      </div>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl shrink-0 bg-ink-100">
        {f.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className={`font-semibold text-[13px] truncate ${f.isMe ? "text-brand-700" : "text-ink-900"}`}>
            {f.username}
          </span>
          {f.isMe && (
            <span className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-brand-500 text-white">SEN</span>
          )}
          {rank === 1 && <Crown className="w-3.5 h-3.5 text-sun-500 shrink-0" strokeWidth={2.5} />}
        </div>
        <div className="flex items-center gap-1 text-[10.5px] text-ink-400 mt-0.5">
          <Flame className="w-2.5 h-2.5 text-coral-500" strokeWidth={2.5} />
          <span>{f.streak} gün</span>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <div className="text-right">
          <div className="font-display font-bold text-[14px] text-ink-900 tabular-nums">
            {calcScore(f.nodes, f.lgsCorrect)}
          </div>
          <div className="text-[10px] text-ink-400">{f.nodes}🌿 {f.lgsCorrect}✓</div>
        </div>
        {!f.isMe && onChat && (
          <button
            onClick={onChat}
            className="w-7 h-7 rounded-lg hover:bg-brand-50 flex items-center justify-center text-ink-400 hover:text-brand-600 transition"
            title="Mesaj gönder"
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

const INVITE_RE = /^KAS-[A-Z0-9]{6}$/;

const EXTRA_AVATARS = ["🐶","🐱","🦊","🐸","🦋","🐝","🌟","🎯","🦄","🐧","🦁","🐯"];
const EXTRA_NAMES   = ["Yıldız","Kaplan","Kartal","Aslan","Panda","Koala","Şimşek","Fırtına","Bulut","Deniz","Çınar","Bahar"];

function codeToFriend(code: string): RowData {
  const hash = code.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return {
    id: code,
    username: EXTRA_NAMES[hash % EXTRA_NAMES.length] + "_" + code.slice(-3),
    avatar: EXTRA_AVATARS[hash % EXTRA_AVATARS.length],
    nodes: 3 + (hash % 28),
    lgsCorrect: 1 + (hash % 14),
    streak: 1 + (hash % 10),
    isMe: false,
  };
}

export default function FriendList() {
  const user      = useGameStore((s) => s.user);
  const gameScore = useGameStore((s) => s.score);

  const [friendScores, setFriendScores] = useState<
    Record<string, { nodes: number; lgsCorrect: number }>
  >(Object.fromEntries(FAKE_FRIENDS.map((f) => [f.id, { ...f.baseScore }])));

  useEffect(() => {
    const id = setInterval(() => {
      setFriendScores((prev) => simulateFriendProgress(prev));
    }, 30_000);
    return () => clearInterval(id);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [codeErr,   setCodeErr]   = useState<string | null>(null);
  const [toast,     setToast]     = useState<string | null>(null);
  const [addedFriends, setAddedFriends] = useState<RowData[]>([]);

  /* ── Chat state ── */
  const [chatFriendId, setChatFriendId] = useState<string | null>(null);
  const [allMessages,  setAllMessages]  = useState<Record<string, ChatMsg[]>>({});
  const [chatInput,    setChatInput]    = useState("");

  const meScore = { nodes: gameScore.nodesOpened, lgsCorrect: gameScore.lgsCorrect };

  const rows: RowData[] = [
    ...FAKE_FRIENDS.map((f) => {
      const sc = friendScores[f.id] ?? f.baseScore;
      return { id: f.id, username: f.username, avatar: f.avatar, nodes: sc.nodes, lgsCorrect: sc.lgsCorrect, streak: 12, isMe: false };
    }),
    ...addedFriends,
    { id: "me", username: user?.username ?? "Sen", avatar: "⭐", nodes: meScore.nodes, lgsCorrect: meScore.lgsCorrect, streak: 1, isMe: true },
  ].sort((a, b) => calcScore(b.nodes, b.lgsCorrect) - calcScore(a.nodes, a.lgsCorrect));

  const motivationMsg = buildLeaderboardLine(meScore, friendScores);

  function openChat(friendId: string) {
    setChatFriendId(friendId);
    setChatInput("");
    if (!allMessages[friendId]) {
      const opener = FAKE_OPENERS[friendId] ?? DEFAULT_OPENER;
      setAllMessages(prev => ({
        ...prev,
        [friendId]: [{ text: opener, fromMe: false, ts: Date.now() }],
      }));
    }
  }

  function sendMessage() {
    if (!chatFriendId || !chatInput.trim()) return;
    const text = chatInput.trim();
    setChatInput("");
    setAllMessages(prev => ({
      ...prev,
      [chatFriendId]: [...(prev[chatFriendId] ?? []), { text, fromMe: true, ts: Date.now() }],
    }));
    const delay = 800 + Math.random() * 1200;
    const reply = FAKE_REPLIES[Math.floor(Math.random() * FAKE_REPLIES.length)];
    setTimeout(() => {
      setAllMessages(prev => ({
        ...prev,
        [chatFriendId!]: [...(prev[chatFriendId!] ?? []), { text: reply, fromMe: false, ts: Date.now() }],
      }));
    }, delay);
  }

  function handleAdd() {
    const code = codeInput.trim().toUpperCase();
    if (!INVITE_RE.test(code)) { setCodeErr("Geçersiz format. KAS-XXXXXX şeklinde olmalı."); return; }
    if (code === user?.inviteCode) { setCodeErr("Kendi davet kodunu giremezsin!"); return; }
    if (addedFriends.some(f => f.id === code)) { setCodeErr("Bu kodu daha önce ekledin."); return; }
    const newFriend = codeToFriend(code);
    setAddedFriends(prev => [...prev, newFriend]);
    setShowModal(false);
    setCodeInput("");
    setCodeErr(null);
    setToast(`${newFriend.username} eklendi! 🎉`);
    setTimeout(() => setToast(null), 3000);
  }

  const chatFriend = rows.find(r => r.id === chatFriendId);

  return (
    <div className="bg-white border border-ink-200 rounded-2xl shadow-card overflow-hidden">
      <div className="px-5 py-4 border-b border-ink-200 flex items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-[14px] text-ink-900 tracking-tight">👥 Arkadaşlarım</h3>
          <div className="text-[11px] text-ink-500">Haftalık liderlik · 30sn güncelleniyor</div>
        </div>
        <button
          onClick={() => { setShowModal(true); setCodeErr(null); }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ink-900 hover:bg-ink-700 text-white text-[12px] font-semibold transition"
        >
          <UserPlus className="w-3.5 h-3.5" /> Ekle
        </button>
      </div>

      <div className="divide-y divide-ink-200">
        {rows.map((f, i) => (
          <FriendRow
            key={f.id}
            f={f}
            rank={i + 1}
            onChat={!f.isMe ? () => openChat(f.id) : undefined}
          />
        ))}
      </div>

      {motivationMsg && (
        <div className="mx-4 mb-4 mt-3 px-3 py-2.5 rounded-xl bg-sun-100 border border-sun-500/30 text-[11.5px] text-ink-800 font-medium">
          🚀 {motivationMsg}
        </div>
      )}

      {/* Invite modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-pop border border-ink-200 w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-[16px] text-ink-900">Arkadaş Ekle</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg hover:bg-ink-100 flex items-center justify-center text-ink-500">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[13px] text-ink-500 mb-3">Arkadaşının davet kodunu gir (örn: KAS-AB3XY7)</p>
            <input
              value={codeInput}
              onChange={(e) => { setCodeInput(e.target.value.toUpperCase()); setCodeErr(null); }}
              placeholder="KAS-······"
              maxLength={10}
              className="w-full px-4 py-3 rounded-xl border border-ink-200 bg-paper text-ink-900 font-mono font-bold text-center text-lg tracking-widest focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition"
            />
            {codeErr && <p className="mt-2 text-[11.5px] text-coral-600 font-semibold">{codeErr}</p>}
            <div className="flex gap-2 mt-4">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-ink-200 text-ink-700 text-sm font-semibold hover:bg-ink-100 transition">
                İptal
              </button>
              <button
                onClick={handleAdd}
                disabled={codeInput.length < 3}
                className="flex-1 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-40 text-white text-sm font-semibold flex items-center justify-center gap-2 transition"
              >
                <Check className="w-4 h-4" /> Ekle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat panel */}
      {chatFriend && (
        <ChatPanel
          friend={chatFriend}
          messages={allMessages[chatFriend.id] ?? []}
          input={chatInput}
          onInput={setChatInput}
          onSend={sendMessage}
          onClose={() => setChatFriendId(null)}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-ink-900 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-pop z-50 fade-up">
          {toast}
        </div>
      )}
    </div>
  );
}
