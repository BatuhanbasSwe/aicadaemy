// LGS Kâşifi — Paylaşılan tipler
// Bu dosya iki tarafın (Backend + Frontend) ortak sözleşmesidir.
// Faz 0'da donduruldu — değişiklik gerekirse takım onayı şart.

export type ClassLevel = 5 | 6 | 7 | 8;

export type SubjectId =
  | 'matematik'
  | 'inkilap'
  | 'fen'
  | 'turkce'
  | 'din'
  | 'ingilizce';

export type CharacterId =
  | 'ataturk'
  | 'cahit_arf'
  | 'aziz_sancar'
  | 'yunus_emre'
  | 'mevlana'
  | 'shakespeare';

export interface Character {
  id: CharacterId;
  name: string;
  subject: SubjectId;
  subjectLabel: string;
  avatarEmoji: string;
  gradientFrom: string;
  gradientTo: string;
  greeting: string;
  systemPrompt: string;
  detailLevel: 'full' | 'minimal';
}

export interface Adventure {
  id: string;
  characterId: CharacterId;
  mebUnit: string;
  title: string;
  openingPrompt: string;
  milestones: string[];
  lgsQuestionTriggers: string[];
}

export type TreeNodeType =
  | 'root'
  | 'opened'
  | 'suggested'
  | 'starred'
  | 'lgs_correct';

export interface TreeNode {
  id: string;
  parentId: string | null;
  type: TreeNodeType;
  content: string;
  createdAt: number;
}

export type LgsDifficulty = 'kolay' | 'orta' | 'zor';

export interface LgsQuestion {
  id: string;
  year: number;
  subject: SubjectId;
  unit: string;
  difficulty: LgsDifficulty;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export type ChatRole = 'user' | 'character';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  followUpQuestions?: string[];
  lgsQuestionId?: string;
  createdAt: number;
}

export interface User {
  username: string;
  classLevel: ClassLevel;
  inviteCode: string;
}

export interface UserStats {
  nodesOpened: number;
  lgsAnswered: number;
  lgsCorrect: number;
  streak: number;
  lastActiveAt: number;
}

export interface ScoreState {
  nodesOpened: number;
  lgsAnswered: number;
  lgsCorrect: number;
  byDifficulty: Record<LgsDifficulty, { answered: number; correct: number }>;
}

// ---- Chat API sözleşmesi ----

export interface ChatApiRequest {
  characterId: CharacterId;
  classLevel: ClassLevel;
  history: { role: ChatRole; content: string }[];
  userMessage: string;
}

export interface ChatApiResponse {
  answer: string;
  followUpQuestions: [string, string, string];
  shouldInjectLgsQuestion: boolean;
  suggestedLgsQuestionId: string | null;
}

// ---- Fake friends (Faz 4.5 — Supabase yerine) ----

export interface FakeFriend {
  id: string;
  username: string;
  avatar: string;
  baseScore: { nodes: number; lgsCorrect: number };
}
