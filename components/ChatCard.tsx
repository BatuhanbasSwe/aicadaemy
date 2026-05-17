"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { useGameStore } from "@/lib/store/useGameStore";
import type { ChatApiRequest, ChatApiResponse, CharacterId, LgsQuestion, TreeNodeType } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp, Paperclip, Volume2, StopCircle, RefreshCw,
  Lightbulb, ThumbsUp, Bookmark, Copy, Info,
} from "lucide-react";
import LgsQuestionCard from "./LgsQuestionCard";
import { CHARACTERS } from "@/lib/content/characters";
import { getAdventureByCharacter } from "@/lib/content/adventures";

/* ── Character display meta ───────────────────────────────── */
const CHAR_META: Record<CharacterId, { initials: string; from: string; to: string }> = {
  ataturk:     { initials: "MK", from: "#DC2626", to: "#7F1D1D" },
  cahit_arf:   { initials: "CA", from: "#6B57DC", to: "#4A38AE" },
  aziz_sancar: { initials: "AS", from: "#3FAE82", to: "#5E8BC3" },
  yunus_emre:  { initials: "YE", from: "#E8B83A", to: "#D97706" },
  mevlana:     { initials: "MR", from: "#6366F1", to: "#4F46E5" },
  shakespeare: { initials: "WS", from: "#a21caf", to: "#be185d" },
};

/* ── Typing indicator ─────────────────────────────────────── */
function TypingIndicator({ meta }: { meta: { initials: string; from: string; to: string } }) {
  return (
    <div className="flex gap-2.5">
      <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-white text-[12px]"
        style={{ background: `linear-gradient(135deg, ${meta.from}, ${meta.to})` }}>
        {meta.initials}
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-tl-md flex items-center gap-1.5" style={{ background: "#EFECE4" }}>
        <span className="w-1.5 h-1.5 rounded-full bg-ink-400 typing-dot" />
        <span className="w-1.5 h-1.5 rounded-full bg-ink-400 typing-dot" style={{ animationDelay: ".15s" }} />
        <span className="w-1.5 h-1.5 rounded-full bg-ink-400 typing-dot" style={{ animationDelay: ".3s" }} />
      </div>
    </div>
  );
}

/* ── Message bubble ───────────────────────────────────────── */
function Bubble({
  role, content, followUpQuestions, isLast, meta, username, onFollowUp,
}: {
  role: "user" | "character";
  content: string;
  followUpQuestions?: string[];
  isLast?: boolean;
  meta: { initials: string; from: string; to: string };
  username: string;
  onFollowUp: (q: string) => void;
}) {
  const isUser = role === "user";
  return (
    <div className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}>
      {isUser ? (
        <div className="shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-[12.5px]">
          {username?.[0]?.toUpperCase() ?? "S"}
        </div>
      ) : (
        <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-white text-[12px]"
          style={{ background: `linear-gradient(135deg, ${meta.from}, ${meta.to})` }}>
          {meta.initials}
        </div>
      )}

      <div className={`max-w-[78%] flex flex-col ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`px-3.5 py-2.5 text-[13.5px] leading-relaxed whitespace-pre-wrap rounded-2xl ${isUser ? "rounded-tr-md" : "rounded-tl-md"}`}
          style={isUser ? { background: "#0E1015", color: "#fff" } : { background: "#EFECE4", color: "#16181F" }}
        >
          {content}
        </div>

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

/* ── Stub fallback cevaplar (API yokken) ─────────────────── */
const FALLBACKS: Record<string, { answer: string; followUps: [string, string, string] }> = {
  ataturk:     { answer: "Gençler, merak etmek vatana hizmetin ilk adımıdır! Tarihin derinliklerine inelim — neyi merak ediyorsunuz?", followUps: ["Kurtuluş Savaşı nasıl başladı?", "Trablusgarp neden önemliydi?", "Atatürk Samsun'da ne yaptı?"] },
  cahit_arf:   { answer: "Çok güzel bir soru! Matematik evreni anlamamızın dilidir. Devam edelim!", followUps: ["Arf sayıları nedir?", "Üçgenler nasıl çalışır?", "LGS'de hangi konular çıkıyor?"] },
  aziz_sancar: { answer: "Harika bir merak! Fen bilimleri gözlem ve soru sormakla başlar.", followUps: ["DNA nasıl çalışır?", "Hücre bölünmesi nedir?", "Nobel Ödülü neye verilir?"] },
  yunus_emre:  { answer: "Hoş bir soru sordun! Türkçemiz binlerce yıllık bir birikimin ürünüdür.", followUps: ["Paragrafta ana düşünce nasıl bulunur?", "Fiilimsiler nelerdir?", "Şiir analizi nasıl yapılır?"] },
  mevlana:     { answer: "Güzel soru, güzel gönül! Her sorunun içinde bir cevap gizlidir.", followUps: ["Kader inancı nedir?", "Zekât ne anlama gelir?", "Ahlakın önemi nedir?"] },
  shakespeare: { answer: "What a wonderful question! Let's explore English together, shall we?", followUps: ["What are modal verbs?", "How to write a paragraph?", "What is simple past tense?"] },
};

/* ── ChatCard ─────────────────────────────────────────────── */
interface ChatCardProps {
  externalMessage?: string | null;
  onExternalSent?: () => void;
}

export default function ChatCard({ externalMessage, onExternalSent }: ChatCardProps) {
  const messages          = useGameStore((s) => s.messages);
  const selectedCharacter = useGameStore((s) => s.selectedCharacter);
  const user              = useGameStore((s) => s.user);
  const { addMessage, resetConversation, ingestChatTurn } = useGameStore();

  const [input, setInput]           = useState("");
  const [isTyping, setIsTyping]     = useState(false);
  const [pendingLgs, setPendingLgs] = useState<LgsQuestion | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const charId   = selectedCharacter ?? "ataturk";
  const charDef  = CHARACTERS[charId];
  const meta     = CHAR_META[charId];
  const openingAddedRef = useRef(false);

  /* Auto-scroll */
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping, pendingLgs]);

  /* Adventure opening message — sadece sohbet tamamen boşken, bir kez */
  useEffect(() => {
    if (openingAddedRef.current || messages.length > 0) return;
    openingAddedRef.current = true;
    const adventure = getAdventureByCharacter(charId);
    const opening   = adventure?.openingPrompt ?? charDef?.greeting ?? "Merhaba! Seni bekliyordum. Ne öğrenmek istiyorsun?";
    addMessage({
      id:        `opening-${charId}`,
      role:      "character",
      content:   opening,
      createdAt: Date.now(),
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charId]);

  /* Tree → Chat: dış mesajı otomatik gönder (suggested düğüm tıklandığında) */
  const sentExternalRef = useRef<string | null>(null);
  useEffect(() => {
    if (!externalMessage) { sentExternalRef.current = null; return; }
    if (externalMessage === sentExternalRef.current) return;
    sentExternalRef.current = externalMessage;
    sendMessage(externalMessage, { fromFollowUp: true });
    onExternalSent?.();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalMessage]);

  /* Sesli okuma */
  const speak = useCallback(() => {
    if (typeof window === "undefined") return;
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const target = [...messages].reverse().find((m) => m.role === "character");
    if (!target) return;
    const u = new SpeechSynthesisUtterance(target.content);
    u.lang  = "tr-TR";
    u.rate  = 1.0;
    const voices = synth.getVoices();
    const trVoice = voices.find((v) => v.lang?.startsWith("tr"));
    if (trVoice) u.voice = trVoice;
    u.onstart = () => setIsSpeaking(true);
    u.onend   = () => setIsSpeaking(false);
    u.onerror = () => setIsSpeaking(false);
    synth.speak(u);
  }, [messages]);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, []);

  /* Yeni sohbet */
  const handleNewConversation = useCallback(() => {
    resetConversation();
    useGameStore.setState({ tree: { nodes: [] } });
    setPendingLgs(null);
    stopSpeaking();
    openingAddedRef.current = false; // yeni sohbette opening tekrar gösterilsin
  }, [resetConversation, stopSpeaking]);

  /* ── Yardımcı: ingestChatTurn sonrası opened düğümü starred'a çevir ── */
  function promoteToStarred(openedId: string) {
    useGameStore.setState((s) => ({
      tree: {
        nodes: s.tree.nodes.map((n) =>
          n.id === openedId ? { ...n, type: "starred" as TreeNodeType } : n
        ),
      },
    }));
  }

  /* ── Ana mesaj gönderme fonksiyonu ─────────────────────── */
  // Her mesaj için ingestChatTurn kullanılır — tek kök garantisi.
  // Kullanıcının kendi yazdığı soru (fromFollowUp=false) → opened düğüm
  // retroaktif olarak starred'a çevrilir (pembe yıldız).
  async function sendMessage(text: string, opts: { fromFollowUp?: boolean } = {}) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    setInput("");
    setIsTyping(true);
    setPendingLgs(null);

    addMessage({ id: `${Date.now()}-u`, role: "user", content: trimmed, createdAt: Date.now() });

    const history = messages.slice(-16).map((m) => ({ role: m.role, content: m.content }));
    const reqBody: ChatApiRequest = {
      characterId: charId,
      classLevel:  user?.classLevel ?? 8,
      history,
      userMessage: trimmed,
    };

    try {
      const res = await fetch("/api/chat", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(reqBody),
      });
      if (!res.ok) throw new Error("api_error");

      const data: ChatApiResponse = await res.json();
      addMessage({
        id:                `${Date.now()}-c`,
        role:              "character",
        content:           data.answer,
        followUpQuestions: data.followUpQuestions,
        createdAt:         Date.now(),
      });

      // Her durumda ingestChatTurn → tek kök, temiz hiyerarşi
      const { openedId } = ingestChatTurn(trimmed, data);
      // Kullanıcının kendi yazdığı soru → pembe yıldız
      if (!opts.fromFollowUp) promoteToStarred(openedId);

      // LGS sorusu enjeksiyonu
      if (data.shouldInjectLgsQuestion && data.suggestedLgsQuestionId) {
        try {
          const lgsRes = await fetch(`/api/chat?lgsId=${encodeURIComponent(data.suggestedLgsQuestionId)}`);
          if (lgsRes.ok) setPendingLgs(await lgsRes.json());
        } catch { /* sessizce geç */ }
      }
    } catch {
      // Stub fallback (API hazır değilken)
      const fb = FALLBACKS[charId] ?? FALLBACKS.ataturk;
      const fakeResponse: ChatApiResponse = {
        answer:                  fb.answer,
        followUpQuestions:       fb.followUps,
        shouldInjectLgsQuestion: false,
        suggestedLgsQuestionId:  null,
      };
      addMessage({
        id:                `${Date.now()}-c`,
        role:              "character",
        content:           fb.answer,
        followUpQuestions: fb.followUps,
        createdAt:         Date.now(),
      });
      const { openedId } = ingestChatTurn(trimmed, fakeResponse);
      if (!opts.fromFollowUp) promoteToStarred(openedId);

      // 3 mesajda bir stub LGS sorusu göster
      if (messages.length > 0 && messages.length % 3 === 0) {
        const { LGS_QUESTIONS } = await import("@/lib/content/lgs-questions");
        const subjectMap: Record<string, string> = {
          ataturk: "inkilap", cahit_arf: "matematik", aziz_sancar: "fen",
          yunus_emre: "turkce", mevlana: "din", shakespeare: "ingilizce",
        };
        const subj = subjectMap[charId];
        const pool = LGS_QUESTIONS.filter((q) => q.subject === subj);
        if (pool.length > 0) setPendingLgs(pool[Math.floor(Math.random() * pool.length)]);
      }
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="bg-white border border-ink-200 rounded-2xl shadow-card flex flex-col overflow-hidden h-full">
      {/* Character header */}
      <div className="px-5 py-3.5 border-b border-ink-200 flex items-center gap-3 bg-white shrink-0">
        <div className="relative shrink-0">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: `linear-gradient(135deg, ${meta.from}22, ${meta.to}22)` }}
          >
            {charDef?.avatarEmoji ?? "🎓"}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-mint-500 border-2 border-white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[14px] text-ink-900 truncate">
              {charDef?.name ?? "Rehber"}
            </span>
            <span className="px-1.5 py-0.5 rounded-md bg-brand-50 text-brand-700 text-[10px] font-bold uppercase tracking-wider">
              Rehber
            </span>
          </div>
          <div className="text-[11.5px] text-ink-500 truncate">{charDef?.subjectLabel}</div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {isSpeaking ? (
            <button
              onClick={stopSpeaking}
              className="w-9 h-9 rounded-lg hover:bg-ink-100 flex items-center justify-center text-coral-500"
              title="Sesli okumayı durdur"
            >
              <StopCircle className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={speak}
              className="w-9 h-9 rounded-lg hover:bg-ink-100 flex items-center justify-center text-ink-500"
              title="Son mesajı sesli oku"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleNewConversation}
            className="w-9 h-9 rounded-lg hover:bg-ink-100 flex items-center justify-center text-ink-500"
            title="Yeni sohbet başlat"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto nice-scroll px-5 py-5 space-y-4">
        <div className="flex items-center gap-3 text-[10.5px] text-ink-400 uppercase tracking-[0.16em] font-semibold">
          <div className="flex-1 h-px bg-ink-200" />
          <span>Bugün</span>
          <div className="flex-1 h-px bg-ink-200" />
        </div>

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
                  meta={meta}
                  username={user?.username ?? "Sen"}
                  onFollowUp={(q) => sendMessage(q, { fromFollowUp: true })}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isTyping && <TypingIndicator meta={meta} />}

        {pendingLgs && !isTyping && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div className="pl-11">
              <p className="text-[12px] text-ink-500 mb-2 italic">
                {charDef?.name.split(" ")[0]} bir soru sormak istiyor…
              </p>
              <LgsQuestionCard question={pendingLgs} onDone={() => setPendingLgs(null)} />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
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
