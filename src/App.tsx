import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import QuizPage from './components/QuizPage';
import ResultsPage from './components/ResultsPage';
import Leaderboard from './components/Leaderboard';
import AdminPanel from './components/AdminPanel';
import { Student, QuizResult, AppState } from './types';

function App() {
  const [appState, setAppState] = useState<AppState>('login');
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [currentResult, setCurrentResult] = useState<QuizResult | null>(null);

  const handleLogin = (student: Student) => {
    setCurrentStudent(student);
    setAppState('quiz');
  };

  const handleQuizComplete = (result: QuizResult) => {
    setCurrentResult(result);
    setAppState('results');
  };

  const handleRetakeQuiz = () => {
    setCurrentResult(null);
    setAppState('quiz');
  };

  const handleViewLeaderboard = () => {
    setAppState('leaderboard');
  };

  const handleBackToLogin = () => {
    setCurrentStudent(null);
    setCurrentResult(null);
    setAppState('login');
  };

  const handleAdminAccess = () => {
    setAppState('admin');
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-100">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22m36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      {appState === 'login' && (
        <LoginPage onLogin={handleLogin} onAdminAccess={handleAdminAccess} />
      )}
      
      {appState === 'quiz' && currentStudent && (
        <QuizPage 
          student={currentStudent} 
          onQuizComplete={handleQuizComplete} 
        />
      )}
      
      {appState === 'results' && currentResult && currentStudent && (
        <ResultsPage 
          result={currentResult}
          student={currentStudent}
          onRetakeQuiz={handleRetakeQuiz}
          onViewLeaderboard={handleViewLeaderboard}
          onBackToLogin={handleBackToLogin}
        />
      )}
      
      {appState === 'leaderboard' && (
        <Leaderboard 
          onBackToLogin={handleBackToLogin}
          onBackToResults={() => setAppState('results')}
        />
      )}
      
      {appState === 'admin' && (
        <AdminPanel onBackToLogin={handleBackToLogin} />
      )}
    </div>
  );
}

export default App;