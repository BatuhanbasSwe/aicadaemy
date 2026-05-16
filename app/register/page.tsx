"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Compass, Mail, Lock, User as UserIcon, Loader2, ArrowRight, Check } from "lucide-react";
import { signUp, isUsernameAvailable, AuthError } from "@/lib/supabase/auth";
import { useGameStore } from "@/lib/store/useGameStore";
import type { ClassLevel } from "@/lib/types";

const CLASSES: { value: ClassLevel; label: string }[] = [
  { value: 5, label: "5. Sınıf" },
  { value: 6, label: "6. Sınıf" },
  { value: 7, label: "7. Sınıf" },
  { value: 8, label: "8. Sınıf" },
];

export default function RegisterPage() {
  const router = useRouter();
  const user = useGameStore((s) => s.user);
  const loadFromProfile = useGameStore((s) => s.loadFromProfile);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [classLevel, setClassLevel] = useState<ClassLevel>(8);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [usernameCheck, setUsernameCheck] = useState<"idle" | "checking" | "ok" | "taken">("idle");

  // Zaten giriş yapmışsa /chat'e yönlendir
  useEffect(() => {
    if (user) router.replace("/chat");
  }, [user, router]);

  // Debounced username availability check
  useEffect(() => {
    const u = username.trim();
    if (u.length < 2) {
      setUsernameCheck("idle");
      return;
    }
    setUsernameCheck("checking");
    const t = setTimeout(async () => {
      try {
        const ok = await isUsernameAvailable(u);
        setUsernameCheck(ok ? "ok" : "taken");
      } catch {
        setUsernameCheck("idle");
      }
    }, 500);
    return () => clearTimeout(t);
  }, [username]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password || !username.trim()) {
      setError("Tüm alanları doldur.");
      return;
    }
    if (password.length < 6) {
      setError("Parola en az 6 karakter olmalı.");
      return;
    }
    if (usernameCheck === "taken") {
      setError("Bu kullanıcı adı alınmış, başka birini seç.");
      return;
    }
    setLoading(true);
    try {
      const profile = await signUp({ email, password, username, classLevel });
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
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-card mb-3">
            <Compass className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="font-display font-bold text-[24px] text-ink-900 tracking-tight">
            Hesap Oluştur
          </h1>
          <p className="text-sm text-ink-500 mt-1">30 saniyede başla, ücretsiz</p>
        </div>

        <div className="bg-white rounded-2xl shadow-card border border-ink-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Username */}
            <label className="block">
              <span className="text-[12px] font-semibold text-ink-700 mb-1.5 block">
                Kullanıcı Adın
              </span>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.trim())}
                  placeholder="batuhan_k"
                  maxLength={20}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-ink-200 bg-paper text-ink-900 text-[14px] focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition"
                />
                {usernameCheck === "checking" && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-ink-400" />
                )}
                {usernameCheck === "ok" && (
                  <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-600" strokeWidth={3} />
                )}
                {usernameCheck === "taken" && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-coral-600">
                    ALINMIŞ
                  </span>
                )}
              </div>
            </label>

            {/* Email */}
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

            {/* Password */}
            <label className="block">
              <span className="text-[12px] font-semibold text-ink-700 mb-1.5 block">
                Parola <span className="text-ink-400 font-normal">(en az 6)</span>
              </span>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-ink-200 bg-paper text-ink-900 text-[14px] focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition"
                />
              </div>
            </label>

            {/* Class level */}
            <div>
              <span className="text-[12px] font-semibold text-ink-700 mb-1.5 block">
                Sınıfın
              </span>
              <div className="grid grid-cols-4 gap-2">
                {CLASSES.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setClassLevel(c.value)}
                    className={`py-2.5 rounded-xl border text-[13px] font-semibold transition ${
                      classLevel === c.value
                        ? "bg-brand-500 border-brand-500 text-white"
                        : "bg-paper border-ink-200 text-ink-700 hover:border-brand-500"
                    }`}
                  >
                    {c.value}.
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="px-3 py-2 rounded-xl bg-coral-500/10 border border-coral-500/30 text-[12.5px] text-coral-600 font-semibold">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || usernameCheck === "taken" || usernameCheck === "checking"}
              className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-semibold text-[14px] flex items-center justify-center gap-2 transition shadow-card"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Hesap Oluştur <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-ink-200 text-center text-[13px] text-ink-500">
            Zaten hesabın var mı?{" "}
            <Link href="/login" className="text-brand-600 font-semibold hover:underline">
              Giriş Yap
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
