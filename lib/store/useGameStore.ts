import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  CharacterId,
  ChatMessage,
  LgsDifficulty,
  ScoreState,
  TreeNode,
  TreeNodeType,
  User,
} from '@/lib/types';

const emptyByDifficulty: ScoreState['byDifficulty'] = {
  kolay: { answered: 0, correct: 0 },
  orta: { answered: 0, correct: 0 },
  zor: { answered: 0, correct: 0 },
};

interface GameState {
  user: User | null;
  selectedCharacter: CharacterId | null;
  messages: ChatMessage[];
  tree: { nodes: TreeNode[] };
  score: ScoreState;

  // ---- actions (iskelet — implementasyon Faz 2-4 ----
  setUser: (user: User) => void;
  setCharacter: (id: CharacterId) => void;

  addMessage: (msg: ChatMessage) => void;
  resetConversation: () => void;

  addNode: (node: Omit<TreeNode, 'id' | 'createdAt'>) => string;
  promoteSuggested: (nodeId: string) => void;

  recordLgsAnswer: (
    difficulty: LgsDifficulty,
    correct: boolean,
  ) => void;

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
    (set) => ({
      user: null,
      selectedCharacter: null,
      messages: [],
      tree: { nodes: [] },
      score: initialScore,

      setUser: (user) => set({ user }),
      setCharacter: (id) => set({ selectedCharacter: id }),

      addMessage: (msg) =>
        set((s) => ({ messages: [...s.messages, msg] })),
      resetConversation: () => set({ messages: [] }),

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

      reset: () =>
        set({
          user: null,
          selectedCharacter: null,
          messages: [],
          tree: { nodes: [] },
          score: initialScore,
        }),
    }),
    { name: 'lgs-kasifi-store' },
  ),
);
