"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, X, Flame, Trophy, Lightbulb, Users, Sparkles } from "lucide-react";

interface NotificationItem {
  id: string;
  Icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  title: string;
  body: string;
  time: string;
  unread?: boolean;
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    Icon: Trophy,
    iconBg: "bg-sun-100",
    iconColor: "text-sun-500",
    title: "Ayşe seni geçti! 🚀",
    body: "Ayşe bu hafta senden 3 düğüm daha fazla açmış. Liderliği geri almak ister misin?",
    time: "Az önce",
    unread: true,
  },
  {
    id: "n2",
    Icon: Flame,
    iconBg: "bg-coral-100",
    iconColor: "text-coral-600",
    title: "Günlük serini kaybetme",
    body: "Bugün hâlâ çalışmadın. Sadece 5 dk yetiyor, serini koru!",
    time: "1 saat önce",
    unread: true,
  },
  {
    id: "n3",
    Icon: Users,
    iconBg: "bg-brand-50",
    iconColor: "text-brand-700",
    title: "Yeni arkadaş daveti",
    body: "Mert (KAS-2X7Q) seni arkadaş listesine ekledi.",
    time: "3 saat önce",
  },
  {
    id: "n4",
    Icon: Sparkles,
    iconBg: "bg-mint-100",
    iconColor: "text-mint-500",
    title: "Tebrikler — 10. düğümü açtın!",
    body: "Bu hafta açtığın düğüm sayısı 10'a çıktı. +50 XP kazandın.",
    time: "Dün",
  },
  {
    id: "n5",
    Icon: Lightbulb,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-500",
    title: "Yeni macera hazır: Trablusgarp",
    body: "Atatürk seni yeni bir maceraya çağırıyor — başlamaya hazır mısın?",
    time: "Dün",
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function NotificationsDrawer({ open, onClose }: Props) {
  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink-950/40 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-paper shadow-pop z-50 flex flex-col"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-ink-200 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center">
                  <Bell className="w-[18px] h-[18px] text-brand-600" strokeWidth={2.2} />
                </div>
                <div>
                  <div className="font-display font-bold text-[15px] text-ink-900 tracking-tight leading-none">
                    Bildirimler
                  </div>
                  <div className="text-[11px] text-ink-500 mt-0.5">
                    {unreadCount > 0 ? `${unreadCount} yeni bildirim` : "Hepsi okundu"}
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-lg hover:bg-ink-100 flex items-center justify-center text-ink-500"
                aria-label="Kapat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto nice-scroll px-3 py-3 space-y-2">
              {NOTIFICATIONS.map((n) => (
                <button
                  key={n.id}
                  className={`w-full text-left p-3 rounded-xl border transition flex items-start gap-3 ${
                    n.unread
                      ? "bg-white border-brand-100 hover:border-brand-300"
                      : "bg-white/60 border-ink-200 hover:bg-white"
                  }`}
                >
                  <div className={`shrink-0 w-9 h-9 rounded-lg ${n.iconBg} flex items-center justify-center`}>
                    <n.Icon className={`w-[17px] h-[17px] ${n.iconColor}`} strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[13px] text-ink-900 truncate">
                        {n.title}
                      </span>
                      {n.unread && (
                        <span className="w-1.5 h-1.5 rounded-full bg-coral-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-[12px] text-ink-500 mt-0.5 leading-snug">{n.body}</p>
                    <div className="text-[10.5px] text-ink-400 mt-1.5 font-mono">{n.time}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-ink-200 bg-white flex items-center justify-between">
              <button className="text-[12px] text-ink-500 hover:text-ink-900 font-semibold">
                Hepsini okundu işaretle
              </button>
              <button className="text-[12px] text-brand-600 hover:text-brand-700 font-semibold">
                Ayarlar
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
