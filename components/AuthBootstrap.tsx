"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { fetchProfile } from "@/lib/supabase/auth";
import { useGameStore } from "@/lib/store/useGameStore";
import { useSupabaseSync } from "@/lib/store/useSupabaseSync";

/**
 * Mount'da:
 * 1. Supabase oturumu var mı bak, varsa profili çek + store'a yükle
 * 2. Auth değişikliklerini dinle (logout, token refresh)
 * 3. useSupabaseSync ile store -> Supabase debounced sync
 */
export default function AuthBootstrap() {
  const loadFromProfile = useGameStore((s) => s.loadFromProfile);
  const signOutLocal = useGameStore((s) => s.signOutLocal);
  useSupabaseSync();

  useEffect(() => {
    let cancelled = false;

    // Signout sürecinde (localStorage temizlenmiş) yeniden yükleme yapmayı engelle
    const storeKey = "lgs-kasifi-store";
    const hasStore = () => {
      try { return !!localStorage.getItem(storeKey); } catch { return false; }
    };

    (async () => {
      const { data } = await supabase.auth.getSession();
      const userId = data.session?.user?.id;
      // Session var ama store yoksa → logout süreci, yeniden yükleme
      if (!userId || cancelled || !hasStore()) return;
      try {
        const profile = await fetchProfile(userId);
        if (profile && !cancelled) loadFromProfile(profile);
      } catch (e) {
        console.warn("[auth bootstrap] fetchProfile failed", e);
      }
    })();

    const { data: sub } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT" || !session?.user?.id) {
        signOutLocal();
        return;
      }
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        if (!hasStore()) return; // logout sürecinde yeniden bağlama
        try {
          const profile = await fetchProfile(session.user.id);
          if (profile) loadFromProfile(profile);
        } catch (e) {
          console.warn("[auth bootstrap] state change fetchProfile failed", e);
        }
      }
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [loadFromProfile, signOutLocal]);

  return null;
}
