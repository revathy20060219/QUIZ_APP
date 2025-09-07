import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, ArrowLeft, Download } from 'lucide-react';
import { QuizResult } from '../types';
import { getLeaderboardData, exportLeaderboardCSV } from '../utils/dataStorage';

interface LeaderboardProps {
  onBackToLogin: () => void;
  onBackToResults: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ onBackToLogin, onBackToResults }) => {
  const [leaderboardData, setLeaderboardData] = useState<QuizResult[]>([]);

  useEffect(() => {
    const data = getLeaderboardData();
    setLeaderboardData(data);
  }, []);

  const handleExportCSV = () => {
    exportLeaderboardCSV(leaderboardData);
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />;
    return <span className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold">#{rank}</span>;
  };

  const getRankBadgeClass = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500';
    if (rank === 3) return 'bg-gradient-to-r from-amber-400 to-amber-600';
    return 'bg-gradient-to-r from-blue-400 to-blue-600';
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBackToResults}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-700 rounded-lg transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            
            <h1 className="text-3xl font-bold text-gray-800">
              🏆 Leaderboard
            </h1>
            
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
          
          <p className="text-gray-600 text-center">
            Top performers in the Blockchain Quiz
          </p>
        </div>

        {/* Leaderboard */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl overflow-hidden">
          {leaderboardData.length === 0 ? (
            <div className="p-12 text-center">
              <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Results Yet
              </h3>
              <p className="text-gray-500">
                Be the first to take the quiz and appear on the leaderboard!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/20">
              {leaderboardData.map((result, index) => {
                const rank = index + 1;
                return (
                  <div
                    key={`${result.student.rollNumber}-${result.date}`}
                    className={`p-6 ${rank <= 3 ? 'bg-white/10' : ''} hover:bg-white/15 transition-all duration-200`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full ${getRankBadgeClass(rank)} flex items-center justify-center shadow-lg`}>
                          {getRankIcon(rank)}
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-gray-800 text-lg">
                            {result.student.name}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            Roll: {result.student.rollNumber}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-right">
                        <div>
                          <div className="text-2xl font-bold text-gray-800">
                            {result.percentage}%
                          </div>
                          <div className="text-sm text-gray-600">
                            {result.correctAnswers}/{result.totalQuestions} correct
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm text-gray-600">
                            {new Date(result.date).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(result.date).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {rank <= 3 && (
                      <div className="mt-3 text-center">
                        <span className={`inline-px px-3 py-1 rounded-full text-xs font-medium ${
                          rank === 1 ? 'bg-yellow-100/70 text-yellow-800' :
                          rank === 2 ? 'bg-gray-100/70 text-gray-800' :
                          'bg-amber-100/70 text-amber-800'
                        }`}>
                          {rank === 1 ? '🥇 Champion' : rank === 2 ? '🥈 Runner-up' : '🥉 Third Place'}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <button
            onClick={onBackToLogin}
            className="px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Start New Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;