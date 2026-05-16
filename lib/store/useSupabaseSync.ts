"use client";
import { useEffect, useRef } from "react";
import { useGameStore } from "./useGameStore";
import { saveGameState } from "@/lib/supabase/auth";
import type { ProfileGameState } from "@/lib/supabase/types";

/**
 * Store değişikliklerini Supabase'e debounced (2sn) upsert eder.
 * Root layout'a bir kez monte edilir.
 */
export function useSupabaseSync() {
  const userId = useGameStore((s) => s.userId);
  const selectedCharacter = useGameStore((s) => s.selectedCharacter);
  const messages = useGameStore((s) => s.messages);
  const tree = useGameStore((s) => s.tree);
  const score = useGameStore((s) => s.score);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastJson = useRef<string>("");
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (!userId) return;

    // İlk render'da yazma — login'de zaten profile load edildi
    if (isFirstRun.current) {
      isFirstRun.current = false;
      lastJson.current = JSON.stringify({ selectedCharacter, messages, tree, score });
      return;
    }

    const snapshot: ProfileGameState = {
      selectedCharacter,
      messages,
      tree,
      score,
    };
    const json = JSON.stringify(snapshot);
    if (json === lastJson.current) return;
    lastJson.current = json;

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      saveGameState(userId, snapshot).catch((e) => {
        console.warn("[supabase sync] save failed:", e);
      });
    }, 2000);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [userId, selectedCharacter, messages, tree, score]);
}
