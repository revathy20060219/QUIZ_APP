import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  showResult: boolean;
  onAnswerSelect: (answerIndex: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  showResult,
  onAnswerSelect
}) => {
  const getOptionClass = (index: number) => {
    let baseClass = "w-full p-4 text-left bg-white/30 backdrop-blur-sm rounded-lg border border-white/40 transition-all duration-200 hover:bg-white/40 cursor-pointer";
    
    if (showResult) {
      if (index === question.correctAnswer) {
        baseClass += " bg-green-100/70 border-green-300 text-green-800";
      } else if (index === selectedAnswer && index !== question.correctAnswer) {
        baseClass += " bg-red-100/70 border-red-300 text-red-800";
      }
    } else if (selectedAnswer === index) {
      baseClass += " bg-teal-100/70 border-teal-300 text-teal-800 transform scale-105";
    }

    return baseClass;
  };

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 bg-teal-100/70 text-teal-800 rounded-full text-sm font-medium">
            Question {questionNumber} of {totalQuestions}
          </span>
          {showResult && (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              selectedAnswer === question.correctAnswer 
                ? 'bg-green-100/70 text-green-800' 
                : 'bg-red-100/70 text-red-800'
            }`}>
              {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Incorrect!'}
            </span>
          )}
        </div>
        <h2 className="text-xl font-semibold text-gray-800 leading-relaxed">
          {question.question}
        </h2>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            disabled={showResult}
            className={getOptionClass(index)}
          >
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/50 flex items-center justify-center text-sm font-medium">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-gray-700">{option}</span>
            </div>
          </button>
        ))}
      </div>

      {showResult && question.explanation && (
        <div className="mt-6 p-4 bg-blue-50/70 backdrop-blur-sm rounded-lg border border-blue-200/50">
          <h3 className="font-semibold text-blue-800 mb-2">Explanation:</h3>
          <p className="text-blue-700 text-sm">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;