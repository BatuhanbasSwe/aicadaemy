import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  ChatApiResponse,
  CharacterId,
  ChatMessage,
  LgsDifficulty,
  ScoreState,
  TreeNode,
  TreeNodeType,
  User,
} from '@/lib/types';
import type { ProfileRow, ProfileGameState } from '@/lib/supabase/types';
import { saveGameState, inviteCodeFor } from '@/lib/supabase/auth';

const emptyByDifficulty: ScoreState['byDifficulty'] = {
  kolay: { answered: 0, correct: 0 },
  orta: { answered: 0, correct: 0 },
  zor: { answered: 0, correct: 0 },
};

interface GameState {
  user: User | null;
  userId: string | null;          // Supabase auth.users.id
  selectedCharacter: CharacterId | null;
  messages: ChatMessage[];
  tree: { nodes: TreeNode[] };
  score: ScoreState;
  studiedUnitIds: string[];

  // ---- actions (iskelet — implementasyon Faz 2-4 ----
  setUser: (user: User) => void;
  setCharacter: (id: CharacterId) => void;

  // Supabase profil yükle (login/refresh sonrası)
  loadFromProfile: (profile: ProfileRow) => void;
  // Çıkış: state'i sıfırla, persist'i de temizle
  signOutLocal: () => void;

  addMessage: (msg: ChatMessage) => void;
  resetConversation: () => void;

  addNode: (node: Omit<TreeNode, 'id' | 'createdAt'>) => string;
  promoteSuggested: (nodeId: string) => void;

  // Sohbet turunun sonucunu ağaca işle:
  // - root yoksa root (kullanıcı sorusu) oluştur
  // - userMessage için "opened" düğüm (parent: lastOpened veya root)
  // - response.followUpQuestions için 3 "suggested" düğüm (parent: yeni opened)
  ingestChatTurn: (
    userMessage: string,
    response: ChatApiResponse,
  ) => { openedId: string; suggestedIds: string[] };

  // Çocuğun kendi yazdığı sorusu olarak "starred" düğüm ekle
  addStarred: (content: string, parentId?: string | null) => string;

  recordLgsAnswer: (
    difficulty: LgsDifficulty,
    correct: boolean,
  ) => void;

  // LGS doğru cevap için ağaca özel altın yıldız düğüm
  addLgsCorrectNode: (question: string, parentId?: string | null) => string;

  markUnitStudied: (unitId: string) => void;

  reset: () => void;
}

const initialScore: ScoreState = {
  nodesOpened: 0,
  lgsAnswered: 0,
  lgsCorrect: 0,
  byDifficulty: emptyByDifficulty,
};

const genId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      user: null,
      userId: null,
      selectedCharacter: null,
      messages: [],
      tree: { nodes: [] },
      score: initialScore,
      studiedUnitIds: [],

      setUser: (user) => set({ user }),
      setCharacter: (id) => set({ selectedCharacter: id }),

      loadFromProfile: (profile) => {
        const gs = profile.game_state;
        set({
          userId: profile.id,
          user: {
            username: profile.username,
            classLevel: profile.class_level,
            inviteCode: inviteCodeFor(profile.username),
          },
          selectedCharacter: gs?.selectedCharacter ?? null,
          messages: gs?.messages ?? [],
          tree: gs?.tree ?? { nodes: [] },
          score: gs?.score ?? initialScore,
        });
      },

      signOutLocal: () => {
        set({
          user: null,
          userId: null,
          selectedCharacter: null,
          messages: [],
          tree: { nodes: [] },
          score: initialScore,
          studiedUnitIds: [],
        });
      },

      addMessage: (msg) =>
        set((s) => ({ messages: [...s.messages, msg] })),
      resetConversation: () => set({ messages: [], tree: { nodes: [] } }),

      addNode: (partial) => {
        const id = genId();
        const node: TreeNode = {
          ...partial,
          id,
          createdAt: Date.now(),
        };
        set((s) => {
          const isNewOpen =
            node.type === 'opened' || node.type === 'starred';
          return {
            tree: { nodes: [...s.tree.nodes, node] },
            score: isNewOpen
              ? { ...s.score, nodesOpened: s.score.nodesOpened + 1 }
              : s.score,
          };
        });
        return id;
      },

      promoteSuggested: (nodeId) =>
        set((s) => {
          let promoted = false;
          const nodes = s.tree.nodes.map((n) => {
            if (n.id === nodeId && n.type === 'suggested') {
              promoted = true;
              return { ...n, type: 'opened' as TreeNodeType };
            }
            return n;
          });
          return {
            tree: { nodes },
            score: promoted
              ? { ...s.score, nodesOpened: s.score.nodesOpened + 1 }
              : s.score,
          };
        }),

      ingestChatTurn: (userMessage, response) => {
        const openedId = genId();
        const suggestedIds = [genId(), genId(), genId()];
        set((s) => {
          const existing = s.tree.nodes;
          const hasRoot = existing.some((n) => n.type === 'root');
          const now = Date.now();
          const newNodes: TreeNode[] = [];

          let rootId: string | null = null;
          if (!hasRoot) {
            rootId = genId();
            newNodes.push({
              id: rootId,
              parentId: null,
              type: 'root',
              content: userMessage,
              createdAt: now,
            });
          }

          const lastOpened = [...existing]
            .reverse()
            .find((n) => n.type === 'opened' || n.type === 'root');
          const parentForOpened =
            (lastOpened?.id ?? rootId) ?? null;

          newNodes.push({
            id: openedId,
            parentId: hasRoot ? parentForOpened : rootId,
            type: 'opened',
            content: userMessage,
            createdAt: now + 1,
          });

          response.followUpQuestions.forEach((q, i) => {
            newNodes.push({
              id: suggestedIds[i],
              parentId: openedId,
              type: 'suggested',
              content: q,
              createdAt: now + 2 + i,
            });
          });

          return {
            tree: { nodes: [...existing, ...newNodes] },
            score: {
              ...s.score,
              nodesOpened: s.score.nodesOpened + 1,
            },
          };
        });
        return { openedId, suggestedIds };
      },

      addStarred: (content, parentId = null) => {
        const id = genId();
        set((s) => {
          const lastOpened = [...s.tree.nodes]
            .reverse()
            .find((n) => n.type === 'opened' || n.type === 'root');
          return {
            tree: {
              nodes: [
                ...s.tree.nodes,
                {
                  id,
                  parentId: parentId ?? lastOpened?.id ?? null,
                  type: 'starred',
                  content,
                  createdAt: Date.now(),
                },
              ],
            },
            score: {
              ...s.score,
              nodesOpened: s.score.nodesOpened + 1,
            },
          };
        });
        return id;
      },

      addLgsCorrectNode: (question, parentId = null) => {
        const id = genId();
        set((s) => {
          const lastOpened = [...s.tree.nodes]
            .reverse()
            .find((n) => n.type === 'opened');
          return {
            tree: {
              nodes: [
                ...s.tree.nodes,
                {
                  id,
                  parentId: parentId ?? lastOpened?.id ?? null,
                  type: 'lgs_correct',
                  content: question,
                  createdAt: Date.now(),
                },
              ],
            },
          };
        });
        return id;
      },

      recordLgsAnswer: (difficulty, correct) =>
        set((s) => {
          const bucket = s.score.byDifficulty[difficulty];
          return {
            score: {
              ...s.score,
              lgsAnswered: s.score.lgsAnswered + 1,
              lgsCorrect: s.score.lgsCorrect + (correct ? 1 : 0),
              byDifficulty: {
                ...s.score.byDifficulty,
                [difficulty]: {
                  answered: bucket.answered + 1,
                  correct: bucket.correct + (correct ? 1 : 0),
                },
              },
            },
          };
        }),

      markUnitStudied: (unitId) =>
        set((s) => ({
          studiedUnitIds: s.studiedUnitIds.includes(unitId)
            ? s.studiedUnitIds
            : [...s.studiedUnitIds, unitId],
        })),

      reset: () =>
        set({
          user: null,
          selectedCharacter: null,
          messages: [],
          tree: { nodes: [] },
          score: initialScore,
          studiedUnitIds: [],
        }),
    }),
    { name: 'lgs-kasifi-store' },
  ),
);
