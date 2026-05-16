import type { ClassLevel, ChatMessage, TreeNode, ScoreState, CharacterId } from "@/lib/types";

export interface ProfileGameState {
  selectedCharacter: CharacterId | null;
  messages: ChatMessage[];
  tree: { nodes: TreeNode[] };
  score: ScoreState;
}

export interface ProfileRow {
  id: string;
  username: string;
  class_level: ClassLevel;
  game_state: ProfileGameState | null;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: Omit<ProfileRow, "created_at" | "updated_at">;
        Update: Partial<Omit<ProfileRow, "id" | "created_at">>;
      };
    };
  };
}
