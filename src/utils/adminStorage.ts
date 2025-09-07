import { AdminQuestion, QuestionBank } from '../types/admin';

const ADMIN_QUESTIONS_KEY = 'adminQuestions';
const QUESTION_BANKS_KEY = 'questionBanks';

// Question Management
export const saveAdminQuestions = (questions: AdminQuestion[]): void => {
  try {
    localStorage.setItem(ADMIN_QUESTIONS_KEY, JSON.stringify(questions));
  } catch (error) {
    console.error('Error saving admin questions:', error);
  }
};

export const getAdminQuestions = (): AdminQuestion[] => {
  try {
    const questions = localStorage.getItem(ADMIN_QUESTIONS_KEY);
    return questions ? JSON.parse(questions) : [];
  } catch (error) {
    console.error('Error getting admin questions:', error);
    return [];
  }
};

export const addAdminQuestion = (question: Omit<AdminQuestion, 'id' | 'createdAt' | 'updatedAt'>): AdminQuestion => {
  const newQuestion: AdminQuestion = {
    ...question,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  const questions = getAdminQuestions();
  questions.push(newQuestion);
  saveAdminQuestions(questions);
  
  return newQuestion;
};

export const updateAdminQuestion = (id: number, updates: Partial<AdminQuestion>): void => {
  const questions = getAdminQuestions();
  const index = questions.findIndex(q => q.id === id);
  
  if (index !== -1) {
    questions[index] = {
      ...questions[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    saveAdminQuestions(questions);
  }
};

export const deleteAdminQuestion = (id: number): void => {
  const questions = getAdminQuestions();
  const filtered = questions.filter(q => q.id !== id);
  saveAdminQuestions(filtered);
};

// Question Bank Management
export const saveQuestionBanks = (banks: QuestionBank[]): void => {
  try {
    localStorage.setItem(QUESTION_BANKS_KEY, JSON.stringify(banks));
  } catch (error) {
    console.error('Error saving question banks:', error);
  }
};

export const getQuestionBanks = (): QuestionBank[] => {
  try {
    const banks = localStorage.getItem(QUESTION_BANKS_KEY);
    return banks ? JSON.parse(banks) : [];
  } catch (error) {
    console.error('Error getting question banks:', error);
    return [];
  }
};

export const createQuestionBank = (name: string, description: string): QuestionBank => {
  const newBank: QuestionBank = {
    id: Date.now().toString(),
    name,
    description,
    questions: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  const banks = getQuestionBanks();
  banks.push(newBank);
  saveQuestionBanks(banks);
  
  return newBank;
};

// Export Functions
export const exportQuestionsAsJSON = (questions: AdminQuestion[]): void => {
  try {
    const jsonContent = JSON.stringify(questions, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `blockchain-questions-${new Date().getTime()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting JSON:', error);
  }
};

export const exportQuestionsAsCSV = (questions: AdminQuestion[]): void => {
  try {
    let csvContent = 'ID,Question,Option A,Option B,Option C,Option D,Correct Answer,Explanation,Category,Difficulty,Tags,Created At,Updated At\n';
    
    questions.forEach(q => {
      const row = [
        q.id,
        `"${q.question.replace(/"/g, '""')}"`,
        `"${q.options[0]?.replace(/"/g, '""') || ''}"`,
        `"${q.options[1]?.replace(/"/g, '""') || ''}"`,
        `"${q.options[2]?.replace(/"/g, '""') || ''}"`,
        `"${q.options[3]?.replace(/"/g, '""') || ''}"`,
        q.correctAnswer,
        `"${(q.explanation || '').replace(/"/g, '""')}"`,
        `"${q.category || ''}"`,
        q.difficulty || '',
        `"${(q.tags || []).join(', ')}"`,
        new Date(q.createdAt).toLocaleDateString(),
        new Date(q.updatedAt).toLocaleDateString()
      ].join(',');
      
      csvContent += row + '\n';
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `blockchain-questions-${new Date().getTime()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting CSV:', error);
  }
};

export const importQuestionsFromJSON = (file: File): Promise<AdminQuestion[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const questions = JSON.parse(content);
        
        // Validate and convert to AdminQuestion format
        const validQuestions: AdminQuestion[] = questions.map((q: any) => ({
          id: q.id || Date.now() + Math.random(),
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          category: q.category || 'General',
          difficulty: q.difficulty || 'medium',
          tags: q.tags || [],
          createdAt: q.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }));
        
        resolve(validQuestions);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};