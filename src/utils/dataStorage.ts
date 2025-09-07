import { QuizResult } from '../types';

const STORAGE_KEY = 'blockchainQuizResults';

export const saveQuizResult = (result: QuizResult): void => {
  try {
    const existingResults = getQuizResults();
    const newResults = [...existingResults, result];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newResults));
    
    // Also save as CSV format
    saveAsCSV(result);
  } catch (error) {
    console.error('Error saving quiz result:', error);
  }
};

export const getQuizResults = (): QuizResult[] => {
  try {
    const results = localStorage.getItem(STORAGE_KEY);
    return results ? JSON.parse(results) : [];
  } catch (error) {
    console.error('Error getting quiz results:', error);
    return [];
  }
};

export const getLeaderboardData = (): QuizResult[] => {
  const results = getQuizResults();
  
  // Sort by percentage (descending), then by date (latest first)
  return results
    .sort((a, b) => {
      if (b.percentage !== a.percentage) {
        return b.percentage - a.percentage;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 5); // Top 5 results
};

const saveAsCSV = (result: QuizResult): void => {
  try {
    const existingCSV = localStorage.getItem('blockchainQuizCSV');
    let csvContent = '';
    
    // Add header if this is the first entry
    if (!existingCSV) {
      csvContent = 'Name,Roll Number,Score,Percentage,Date,Time,Status\n';
    } else {
      csvContent = existingCSV;
    }
    
    // Add the new result
    const date = new Date(result.date);
    const row = [
      `"${result.student.name}"`,
      `"${result.student.rollNumber}"`,
      `${result.correctAnswers}/${result.totalQuestions}`,
      `${result.percentage}%`,
      date.toLocaleDateString(),
      date.toLocaleTimeString(),
      result.passed ? 'PASS' : 'FAIL'
    ].join(',');
    
    csvContent += row + '\n';
    localStorage.setItem('blockchainQuizCSV', csvContent);
  } catch (error) {
    console.error('Error saving CSV:', error);
  }
};

export const exportLeaderboardCSV = (leaderboardData: QuizResult[]): void => {
  try {
    let csvContent = 'Rank,Name,Roll Number,Score,Percentage,Date,Time,Status\n';
    
    leaderboardData.forEach((result, index) => {
      const date = new Date(result.date);
      const row = [
        index + 1,
        `"${result.student.name}"`,
        `"${result.student.rollNumber}"`,
        `${result.correctAnswers}/${result.totalQuestions}`,
        `${result.percentage}%`,
        date.toLocaleDateString(),
        date.toLocaleTimeString(),
        result.passed ? 'PASS' : 'FAIL'
      ].join(',');
      
      csvContent += row + '\n';
    });
    
    // Create and download the CSV file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `blockchain-quiz-leaderboard-${new Date().getTime()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting CSV:', error);
  }
};

export const exportAllResultsJSON = (): void => {
  try {
    const results = getQuizResults();
    const jsonContent = JSON.stringify(results, null, 2);
    
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `blockchain-quiz-results-${new Date().getTime()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting JSON:', error);
  }
};