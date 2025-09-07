export interface AdminQuestion extends Question {
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface QuestionBank {
  id: string;
  name: string;
  description: string;
  questions: AdminQuestion[];
  createdAt: string;
  updatedAt: string;
}

export interface AdminState {
  questions: AdminQuestion[];
  questionBanks: QuestionBank[];
  selectedBank: string | null;
}

export type AppState = 'login' | 'quiz' | 'results' | 'leaderboard' | 'admin';