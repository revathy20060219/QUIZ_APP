import React from 'react';
import { Trophy, Award, RotateCcw, Users, Home, Download } from 'lucide-react';
import { QuizResult, Student } from '../types';
import { saveQuizResult } from '../utils/dataStorage';
import CertificateGenerator from './CertificateGenerator';

interface ResultsPageProps {
  result: QuizResult;
  student: Student;
  onRetakeQuiz: () => void;
  onViewLeaderboard: () => void;
  onBackToLogin: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({
  result,
  student,
  onRetakeQuiz,
  onViewLeaderboard,
  onBackToLogin
}) => {
  React.useEffect(() => {
    saveQuizResult(result);
  }, [result]);

  const getPerformanceColor = () => {
    if (result.percentage >= 90) return 'text-green-600';
    if (result.percentage >= 75) return 'text-blue-600';
    if (result.percentage >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getPerformanceMessage = () => {
    if (result.percentage >= 90) return 'Excellent! Outstanding performance!';
    if (result.percentage >= 75) return 'Great job! Well done!';
    if (result.percentage >= 60) return 'Good work! You passed!';
    return 'Keep studying and try again!';
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 shadow-lg mb-4">
            {result.passed ? (
              <Trophy className="w-12 h-12 text-yellow-600" />
            ) : (
              <Award className="w-12 h-12 text-gray-600" />
            )}
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Quiz Complete!
          </h1>
          <p className={`text-xl font-semibold ${getPerformanceColor()}`}>
            {getPerformanceMessage()}
          </p>
        </div>

        {/* Results Card */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {result.correctAnswers}/{result.totalQuestions}
              </div>
              <div className="text-gray-600">Score</div>
            </div>
            
            <div className="text-center">
              <div className={`text-3xl font-bold mb-1 ${getPerformanceColor()}`}>
                {result.percentage}%
              </div>
              <div className="text-gray-600">Percentage</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {formatTime(result.timeSpent)}
              </div>
              <div className="text-gray-600">Time Taken</div>
            </div>
            
            <div className="text-center">
              <div className={`text-2xl font-bold mb-1 ${result.passed ? 'text-green-600' : 'text-red-600'}`}>
                {result.passed ? 'PASS' : 'FAIL'}
              </div>
              <div className="text-gray-600">Status</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Performance</span>
              <span>{result.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200/50 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all duration-1000 ease-out ${
                  result.percentage >= 60 
                    ? 'bg-gradient-to-r from-green-400 to-green-600' 
                    : 'bg-gradient-to-r from-red-400 to-red-600'
                }`}
                style={{ width: `${result.percentage}%` }}
              ></div>
            </div>
          </div>

          {/* Student Info */}
          <div className="bg-white/30 backdrop-blur-sm rounded-lg p-4 border border-white/40">
            <h3 className="font-semibold text-gray-800 mb-2">Student Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Name: </span>
                <span className="font-medium">{student.name}</span>
              </div>
              <div>
                <span className="text-gray-600">Roll Number: </span>
                <span className="font-medium">{student.rollNumber}</span>
              </div>
              <div>
                <span className="text-gray-600">Date: </span>
                <span className="font-medium">
                  {new Date(result.date).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Time: </span>
                <span className="font-medium">
                  {new Date(result.date).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Section */}
        {result.passed && (
          <CertificateGenerator result={result} student={student} />
        )}

        {/* Action Buttons */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onRetakeQuiz}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              <RotateCcw className="w-5 h-5" />
              Retake Quiz
            </button>
            
            <button
              onClick={onViewLeaderboard}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              <Users className="w-5 h-5" />
              View Leaderboard
            </button>
            
            <button
              onClick={onBackToLogin}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              <Home className="w-5 h-5" />
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;