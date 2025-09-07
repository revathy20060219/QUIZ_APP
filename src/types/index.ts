export interface Student {
  name: string;
  rollNumber: string;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizAnswer {
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
}

export interface QuizResult {
  student: Student;
  answers: QuizAnswer[];
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  percentage: number;
  timeSpent: number;
  date: string;
  passed: boolean;
}
