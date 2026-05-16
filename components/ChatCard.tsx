"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { useGameStore } from "@/lib/store/useGameStore";
import type { ChatApiRequest, ChatApiResponse, CharacterId, LgsQuestion } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp, Paperclip, Volume2, RefreshCw, MoreVertical,
  Lightbulb, ThumbsUp, Bookmark, Copy, Info,
} from "lucide-react";
import LgsQuestionCard from "./LgsQuestionCard";

/* ── Character stubs ─────────────────────────────────────── */
const CHAR_META: Record<CharacterId, { name: string; initials: string; from: string; to: string; subject: string }> = {
  ataturk:     { name: "Mustafa Kemal Atatürk",      initials: "MK", from: "#DC2626", to: "#7F1D1D", subject: "T.C. İnkılap Tarihi" },
  cahit_arf:   { name: "Cahit Arf",                   initials: "CA", from: "#6B57DC", to: "#4A38AE", subject: "Matematik" },
  aziz_sancar: { name: "Aziz Sancar",                 initials: "AS", from: "#3FAE82", to: "#5E8BC3", subject: "Fen Bilimleri" },
  yunus_emre:  { name: "Yunus Emre",                  initials: "YE", from: "#E8B83A", to: "#D97706", subject: "Türkçe" },
  mevlana:     { name: "Mevlana Celaleddin Rumi",     initials: "MR", from: "#6366F1", to: "#4F46E5", subject: "Din Kültürü" },
  shakespeare: { name: "William Shakespeare",          initials: "WS", from: "#475569", to: "#1E293B", subject: "İngilizce" },
};

/* ── Stub LGS questions (Batuhan'ın lgs-questions.ts'i hazır olunca replace) */
const STUB_LGS_QUESTIONS: LgsQuestion[] = [
  {
    id: "lgs-stub-1",
    year: 2023,
    subject: "matematik",
    unit: "Üslü İfadeler",
    difficulty: "orta",
    question: "2³ × 2² ifadesinin sonucu aşağıdakilerden hangisidir?",
    options: ["16", "32", "64", "128"],
    correctIndex: 1,
    explanation: "Üslü çarpımda üsler toplanır: 2³ × 2² = 2⁵ = 32.",
  },
  {
    id: "lgs-stub-2",
    year: 2022,
    subject: "inkilap",
    unit: "Kurtuluş Savaşı",
    difficulty: "kolay",
    question: "Kurtuluş Savaşı'nın başlangıcı olarak kabul edilen olay hangisidir?",
    options: [
      "İstanbul'un işgali",
      "Atatürk'ün Samsun'a çıkışı",
      "Mondros Ateşkesi",
      "Lozan Antlaşması",
    ],
    correctIndex: 1,
    explanation: "19 Mayıs 1919'da Atatürk'ün Samsun'a çıkışı Kurtuluş Savaşı'nın başlangıcı kabul edilir.",
  },
];

/* ── Typing indicator */
function TypingIndicator({ charMeta }: { charMeta: { initials: string; from: string; to: string } }) {
  return (
    <div className="flex gap-2.5">
      <div
        className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-white text-[12px]"
        style={{ background: `linear-gradient(135deg, ${charMeta.from}, ${charMeta.to})` }}
      >
        {charMeta.initials}
      </div>
      <div className="px-4 py-3 bg-ink-100 rounded-2xl rounded-tl-md flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-ink-400 typing-dot" />
        <span className="w-1.5 h-1.5 rounded-full bg-ink-400 typing-dot" style={{ animationDelay: ".15s" }} />
        <span className="w-1.5 h-1.5 rounded-full bg-ink-400 typing-dot" style={{ animationDelay: ".3s" }} />
      </div>
    </div>
  );
}

/* ── Single message bubble */
function Bubble({
  role, content, followUpQuestions, isLast, charMeta, username, onFollowUp,
}: {
  role: "user" | "character";
  content: string;
  followUpQuestions?: string[];
  isLast?: boolean;
  charMeta: { initials: string; from: string; to: string };
  username: string;
  onFollowUp: (q: string) => void;
}) {
  const isUser = role === "user";
  const userInitial = username?.[0]?.toUpperCase() ?? "S";

  return (
    <div className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}>
      {/* Avatar */}
      {isUser ? (
        <div className="shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-[12.5px]">
          {userInitial}
        </div>
      ) : (
        <div
          className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-white text-[12px]"
          style={{ background: `linear-gradient(135deg, ${charMeta.from}, ${charMeta.to})` }}
        >
          {charMeta.initials}
        </div>
      )}

      <div className={`max-w-[78%] flex flex-col ${isUser ? "items-end" : "items-start"}`}>
        {/* Bubble */}
        <div
          className={`px-3.5 py-2.5 text-[13.5px] leading-relaxed whitespace-pre-wrap rounded-2xl ${
            isUser ? "rounded-tr-md" : "rounded-tl-md"
          }`}
          style={
            isUser
              ? { background: "#0E1015", color: "#ffffff" }
              : { background: "#EFECE4", color: "#16181F" }
          }
        >
          {content}
        </div>

        {/* Timestamp + actions */}
        <div className={`flex items-center gap-2 mt-1 px-1 text-[10.5px] text-ink-400 ${isUser ? "flex-row-reverse" : ""}`}>
          {!isUser && isLast && (
            <>
              <button className="hover:text-ink-700"><ThumbsUp className="w-3 h-3" /></button>
              <button className="hover:text-ink-700"><Bookmark className="w-3 h-3" /></button>
              <button onClick={() => navigator.clipboard.writeText(content)} className="hover:text-ink-700">
                <Copy className="w-3 h-3" />
              </button>
            </>
          )}
        </div>

        {/* Follow-up questions */}
        {!isUser && isLast && followUpQuestions && followUpQuestions.length > 0 && (
          <div className="mt-3">
            <div className="text-[11px] uppercase tracking-[0.14em] text-ink-500 font-semibold mb-2">
              Sıradaki Merak
            </div>
            <div className="flex flex-wrap gap-2">
              {followUpQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => onFollowUp(q)}
                  className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-sun-100 hover:bg-sun-500 hover:text-white text-ink-900 border border-sun-500/40 transition text-[12.5px] font-semibold"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-sun-500 group-hover:text-white" strokeWidth={2.5} />
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main chat component ────────────────────────────────── */
interface ChatCardProps {
  externalMessage?: string | null;
  onExternalSent?: () => void;
}

export default function ChatCard({ externalMessage, onExternalSent }: ChatCardProps) {
  const messages          = useGameStore((s) => s.messages);
  const selectedCharacter = useGameStore((s) => s.selectedCharacter);
  const user              = useGameStore((s) => s.user);
  const { addMessage, addNode, resetConversation } = useGameStore();

  const [input, setInput]         = useState("");
  const [isTyping, setIsTyping]   = useState(false);
  const [pendingLgs, setPendingLgs] = useState<LgsQuestion | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const charId   = selectedCharacter ?? "ataturk";
  const charMeta = CHAR_META[charId];

  /* Scroll to bottom on new message */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, pendingLgs]);

  /* Add root node when first message is sent */
  const rootInitialised = useRef(false);
  const ensureRootNode = useCallback(() => {
    if (rootInitialised.current) return;
    rootInitialised.current = true;
    addNode({ parentId: null, type: "root", content: charMeta.subject });
  }, [addNode, charMeta.subject]);

  /* Tree → Chat: ağaçtan gelen mesajı otomatik gönder */
  const sentExternalRef = useRef<string | null>(null);
  useEffect(() => {
    if (!externalMessage) { sentExternalRef.current = null; return; }
    if (externalMessage === sentExternalRef.current) return;
    sentExternalRef.current = externalMessage;
    sendMessage(externalMessage);
    onExternalSent?.();
  // sendMessage intentionally omitted — it's defined below in the same closure
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalMessage]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    ensureRootNode();
    setInput("");
    setIsTyping(true);
    setPendingLgs(null);

    const userMsgId = `${Date.now()}-u`;
    addMessage({ id: userMsgId, role: "user", content: trimmed, createdAt: Date.now() });

    const history = messages.slice(-16).map((m) => ({ role: m.role, content: m.content }));
    const reqBody: ChatApiRequest = {
      characterId: charId,
      classLevel:  user?.classLevel ?? 8,
      history,
      userMessage: trimmed,
    };

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      });

      if (!res.ok) {
        // API henüz hazır değil — stub yanıt göster
        throw new Error("api_not_ready");
      }

      const data: ChatApiResponse = await res.json();
      const charMsgId = `${Date.now()}-c`;

      addMessage({
        id: charMsgId,
        role: "character",
        content: data.answer,
        followUpQuestions: data.followUpQuestions,
        createdAt: Date.now(),
      });

      // Tree: 1 opened node + 3 suggested
      const lastRootId = useGameStore.getState().tree.nodes[0]?.id ?? null;
      const openedId = addNode({ parentId: lastRootId, type: "opened", content: trimmed.slice(0, 30) });
      data.followUpQuestions.forEach((q) => {
        addNode({ parentId: openedId, type: "suggested", content: q.slice(0, 30) });
      });

      // LGS inject — gerçek soruyu /api/chat?lgsId=... ile çek
      if (data.shouldInjectLgsQuestion && data.suggestedLgsQuestionId) {
        try {
          const lgsRes = await fetch(
            `/api/chat?lgsId=${encodeURIComponent(data.suggestedLgsQuestionId)}`,
          );
          if (lgsRes.ok) {
            const lgsQ: LgsQuestion = await lgsRes.json();
            setPendingLgs(lgsQ);
          } else {
            setPendingLgs(STUB_LGS_QUESTIONS[Math.floor(Math.random() * STUB_LGS_QUESTIONS.length)]);
          }
        } catch {
          setPendingLgs(STUB_LGS_QUESTIONS[Math.floor(Math.random() * STUB_LGS_QUESTIONS.length)]);
        }
      } else if (data.shouldInjectLgsQuestion) {
        // shouldInject true ama id yoksa stub'a düş
        setPendingLgs(STUB_LGS_QUESTIONS[Math.floor(Math.random() * STUB_LGS_QUESTIONS.length)]);
      }
    } catch {
      // Stub fallback when /api/chat not yet implemented
      const fallbacks: Record<string, { answer: string; followUps: [string, string, string] }> = {
        ataturk: {
          answer: "Gençler, merak etmek vatana hizmetin ilk adımıdır! Sorularınız beni çok mutlu etti. Şimdi tarihin derinliklerine inelim — neyi merak ediyorsunuz?",
          followUps: ["Kurtuluş Savaşı nasıl başladı?", "Trablusgarp neden önemliydi?", "Atatürk Samsun'da ne yaptı?"],
        },
        cahit_arf: {
          answer: "Çok güzel bir soru! Matematik, evreni anlamamızın dilidir. Her sayının arkasında muhteşem bir hikâye vardır. Devam edelim!",
          followUps: ["Arf sayıları nedir?", "Geometride üçgenler nasıl kullanılır?", "LGS'de hangi konular çıkıyor?"],
        },
        aziz_sancar: {
          answer: "Harika bir merak! Fen bilimleri gözlem ve soru sormakla başlar. Şimdi bu konuyu daha derine inceleyelim.",
          followUps: ["DNA nasıl çalışır?", "Hücre bölünmesi nedir?", "Nobel Ödülü neye verilir?"],
        },
        yunus_emre: {
          answer: "Hoş bir soru sordun! Türkçemiz binlerce yıllık bir birikimin ürünüdür. Kelimeler gönle kapı açar.",
          followUps: ["Paragrafta ana düşünce nasıl bulunur?", "Yazım kuralları nelerdir?", "Şiir analizi nasıl yapılır?"],
        },
        mevlana: {
          answer: "Güzel soru, güzel gönül! Her sorunun içinde bir cevap gizlidir. Birlikte arayalım.",
          followUps: ["Ahlakın önemi nedir?", "Mesnevi hakkında ne biliyorsun?", "Din ve bilim nasıl bir arada olur?"],
        },
        shakespeare: {
          answer: "What a wonderful question! Language is the mirror of the mind. Let's explore English together, shall we?",
          followUps: ["What are modal verbs?", "How to write a good paragraph?", "What is passive voice?"],
        },
      };
      const fb = fallbacks[charId] ?? fallbacks.ataturk;
      const charMsgId = `${Date.now()}-c`;
      addMessage({
        id: charMsgId,
        role: "character",
        content: fb.answer,
        followUpQuestions: fb.followUps,
        createdAt: Date.now(),
      });
      const lastRootId = useGameStore.getState().tree.nodes[0]?.id ?? null;
      const openedId = addNode({ parentId: lastRootId, type: "opened", content: trimmed.slice(0, 30) });
      fb.followUps.forEach((q) => addNode({ parentId: openedId, type: "suggested", content: q.slice(0, 30) }));

      // Occasionally show a stub LGS question
      if (messages.length > 0 && messages.length % 3 === 0) {
        setPendingLgs(STUB_LGS_QUESTIONS[0]);
      }
    } finally {
      setIsTyping(false);
    }
  }

  const lastCharMsg = [...messages].reverse().find((m) => m.role === "character");

  return (
    <div className="bg-white border border-ink-200 rounded-2xl shadow-card flex flex-col overflow-hidden h-full">
      {/* Character header */}
      <div className="px-5 py-3.5 border-b border-ink-200 flex items-center gap-3 bg-white shrink-0">
        <div className="relative shrink-0">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center font-display font-bold text-white text-[14px]"
            style={{ background: `linear-gradient(135deg, ${charMeta.from}, ${charMeta.to})` }}
          >
            {charMeta.initials}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-mint-500 border-2 border-white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[14px] text-ink-900 truncate">{charMeta.name}</span>
            <span className="px-1.5 py-0.5 rounded-md bg-brand-50 text-brand-700 text-[10px] font-bold uppercase tracking-wider">
              Rehber
            </span>
          </div>
          <div className="text-[11.5px] text-ink-500 truncate">{charMeta.subject}</div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => {
              if (typeof window === "undefined") return;
              const synth = window.speechSynthesis;
              if (!synth) {
                alert("Tarayıcın sesli okumayı desteklemiyor.");
                return;
              }
              // Konuşmayı sıfırla, son karakter mesajını oku
              synth.cancel();
              const target = [...messages].reverse().find((m) => m.role === "character");
              if (!target) {
                alert("Henüz okunacak bir mesaj yok. Önce karakterle bir sohbet başlat.");
                return;
              }
              const u = new SpeechSynthesisUtterance(target.content);
              u.lang = "tr-TR";
              u.rate = 1.0;
              u.pitch = 1.0;
              // tr-TR sesi varsa onu kullan
              const voices = synth.getVoices();
              const tr = voices.find((v) => v.lang?.startsWith("tr"));
              if (tr) u.voice = tr;
              synth.speak(u);
            }}
            className="w-9 h-9 rounded-lg hover:bg-ink-100 flex items-center justify-center text-ink-500"
            title="Son karakter mesajını sesli oku"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => { resetConversation(); rootInitialised.current = false; }}
            className="w-9 h-9 rounded-lg hover:bg-ink-100 flex items-center justify-center text-ink-500"
            title="Yeni sohbet"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              if (typeof window !== "undefined") window.speechSynthesis?.cancel();
            }}
            title="Sesli okumayı durdur"
            className="w-9 h-9 rounded-lg hover:bg-ink-100 flex items-center justify-center text-ink-500"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto nice-scroll px-5 py-5 space-y-4">
        {/* Date separator */}
        <div className="flex items-center gap-3 text-[10.5px] text-ink-400 uppercase tracking-[0.16em] font-semibold">
          <div className="flex-1 h-px bg-ink-200" />
          <span>Bugün</span>
          <div className="flex-1 h-px bg-ink-200" />
        </div>

        {messages.length === 0 && !isTyping && (
          <div className="py-10 flex flex-col items-center text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-3"
              style={{ background: `linear-gradient(135deg, ${charMeta.from}22, ${charMeta.to}22)` }}
            >
              {charId === "ataturk" ? "🇹🇷" : charId === "cahit_arf" ? "🧮" : charId === "aziz_sancar" ? "🔬" : charId === "yunus_emre" ? "📜" : charId === "mevlana" ? "🕊️" : "🎭"}
            </div>
            <p className="text-[13px] text-ink-500">
              <strong className="text-ink-900">{charMeta.name}</strong> seni bekliyor.<br />
              Bir şey merak ediyor musun? Yaz!
            </p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg, i) => {
            const isLast = i === messages.length - 1;
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Bubble
                  role={msg.role}
                  content={msg.content}
                  followUpQuestions={isLast ? msg.followUpQuestions : undefined}
                  isLast={isLast}
                  charMeta={charMeta}
                  username={user?.username ?? "Sen"}
                  onFollowUp={(q) => sendMessage(q)}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isTyping && <TypingIndicator charMeta={charMeta} />}

        {/* LGS Question inject */}
        {pendingLgs && !isTyping && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div className="pl-11">
              <p className="text-[12px] text-ink-500 mb-2 italic">
                {charMeta.name.split(" ")[0]} bir soru sormak istiyor…
              </p>
              <LgsQuestionCard
                question={pendingLgs}
                onDone={() => setPendingLgs(null)}
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input area */}
      <div className="px-4 pt-3 pb-4 border-t border-ink-200 bg-white shrink-0">
        <div className="flex items-end gap-2 bg-ink-100/60 rounded-xl p-1.5 border border-ink-200">
          <button className="w-9 h-9 rounded-lg hover:bg-white flex items-center justify-center text-ink-500 shrink-0">
            <Paperclip className="w-[17px] h-[17px]" />
          </button>
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder="Sen ne merak ediyorsun?"
            className="flex-1 bg-transparent resize-none px-1 py-2 text-[14px] text-ink-900 placeholder-ink-400 focus:outline-none"
            style={{ maxHeight: 120 }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition ${
              input.trim() && !isTyping
                ? "bg-ink-900 text-white hover:bg-ink-700"
                : "bg-ink-200 text-ink-400 cursor-not-allowed"
            }`}
          >
            <ArrowUp className="w-[17px] h-[17px]" strokeWidth={2.5} />
          </button>
        </div>
        <div className="flex items-center justify-between mt-2 px-1 text-[10.5px] text-ink-400">
          <div className="flex items-center gap-1.5">
            <Info className="w-3 h-3" /> Yanıtlar yapay zekâ tarafından üretilir.
          </div>
          <div className="font-mono">↵ gönder · ⇧↵ yeni satır</div>
        </div>
      </div>
    </div>
  );
}
