"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/lib/store/useGameStore";
import { Compass } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const user = useGameStore((s) => s.user);

  useEffect(() => {
    if (user) {
      router.replace("/chat");
    } else {
      router.replace("/onboarding");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
          <Compass className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <p className="text-sm text-ink-400 font-medium">Yükleniyor…</p>
      </div>
    </div>
  );
}
