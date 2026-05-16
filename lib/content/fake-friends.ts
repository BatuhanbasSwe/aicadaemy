import type { FakeFriend } from '@/lib/types';

// Supabase yerine hard-coded arkadaş listesi (hackathon demo modu).
// useGameStore içindeki simülasyon tick'i bu skorları zamanla artırır,
// böylece "Ayşe seni geçti!" anı demo'da CANLI görünür.

export const FAKE_FRIENDS: FakeFriend[] = [
  {
    id: 'ayse',
    username: 'Ayşe',
    avatar: '👧',
    baseScore: { nodes: 9, lgsCorrect: 3 },
  },
  {
    id: 'ahmet',
    username: 'Ahmet',
    avatar: '👦',
    baseScore: { nodes: 6, lgsCorrect: 2 },
  },
  {
    id: 'mert',
    username: 'Mert',
    avatar: '🧒',
    baseScore: { nodes: 11, lgsCorrect: 4 },
  },
];

// Demo sırasında ilerleme tick'i: her N saniyede bir bu sahte arkadaşlar
// puan kazanır. UI'dan setInterval ile çağrılır.
export function simulateFriendProgress(
  current: Record<string, { nodes: number; lgsCorrect: number }>,
): Record<string, { nodes: number; lgsCorrect: number }> {
  const next = { ...current };
  for (const friend of FAKE_FRIENDS) {
    const cur = next[friend.id] ?? { ...friend.baseScore };
    // %70 ihtimalle 1 düğüm aç, %25 ihtimalle 1 LGS doğru ekle, %5 hiçbir şey
    const r = Math.random();
    if (r < 0.7) {
      next[friend.id] = { nodes: cur.nodes + 1, lgsCorrect: cur.lgsCorrect };
    } else if (r < 0.95) {
      next[friend.id] = {
        nodes: cur.nodes,
        lgsCorrect: cur.lgsCorrect + 1,
      };
    } else {
      next[friend.id] = cur;
    }
  }
  return next;
}

// Kullanıcı puanını alıp arkadaşlarla karşılaştır, motivasyon mesajı üret.
export function buildLeaderboardLine(
  userScore: { nodes: number; lgsCorrect: number },
  friendScores: Record<string, { nodes: number; lgsCorrect: number }>,
): string | null {
  const score = (s: { nodes: number; lgsCorrect: number }) =>
    s.nodes + s.lgsCorrect * 2;
  const me = score(userScore);
  const ahead = FAKE_FRIENDS.filter((f) => {
    const fs = friendScores[f.id] ?? f.baseScore;
    return score(fs) > me;
  });
  if (ahead.length === 0) return null;
  const leader = ahead.reduce((a, b) => {
    const sa = score(friendScores[a.id] ?? a.baseScore);
    const sb = score(friendScores[b.id] ?? b.baseScore);
    return sb > sa ? b : a;
  });
  const fs = friendScores[leader.id] ?? leader.baseScore;
  const diff = score(fs) - me;
  return `${leader.username} ${diff} puan öndesin! ${leader.avatar} Hızlanma zamanı 🚀`;
}
