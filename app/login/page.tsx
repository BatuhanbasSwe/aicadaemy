"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Compass, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { signIn, AuthError } from "@/lib/supabase/auth";
import { useGameStore } from "@/lib/store/useGameStore";

export default function LoginPage() {
  const router = useRouter();
  const user = useGameStore((s) => s.user);
  const loadFromProfile = useGameStore((s) => s.loadFromProfile);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Zaten giriş yapmışsa /chat'e yönlendir
  useEffect(() => {
    if (user) router.replace("/chat");
  }, [user, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password) {
      setError("E-posta ve parolayı doldur.");
      return;
    }
    setLoading(true);
    try {
      const profile = await signIn({ email, password });
      loadFromProfile(profile);
      router.replace("/chat");
    } catch (e) {
      if (e instanceof AuthError) setError(e.message);
      else setError("Beklenmedik bir hata oldu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo + tagline */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-card mb-3">
            <Compass className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="font-display font-bold text-[24px] text-ink-900 tracking-tight">
            LGS Kâşifi
          </h1>
          <p className="text-sm text-ink-500 mt-1">Türk dahileriyle LGS'ye hazırlan</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-card border border-ink-200 p-6">
          <h2 className="font-display font-bold text-[18px] text-ink-900 mb-1">
            Tekrar hoş geldin 👋
          </h2>
          <p className="text-[13px] text-ink-500 mb-5">Kaldığın yerden devam et.</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block">
              <span className="text-[12px] font-semibold text-ink-700 mb-1.5 block">
                E-posta
              </span>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@mail.com"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-ink-200 bg-paper text-ink-900 text-[14px] focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-[12px] font-semibold text-ink-700 mb-1.5 block">
                Parola
              </span>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-ink-200 bg-paper text-ink-900 text-[14px] focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition"
                />
              </div>
            </label>

            {error && (
              <div className="px-3 py-2 rounded-xl bg-coral-500/10 border border-coral-500/30 text-[12.5px] text-coral-600 font-semibold">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-semibold text-[14px] flex items-center justify-center gap-2 transition shadow-card"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Giriş Yap <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-ink-200 text-center text-[13px] text-ink-500">
            Hesabın yok mu?{" "}
            <Link href="/register" className="text-brand-600 font-semibold hover:underline">
              Hesap Oluştur
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
