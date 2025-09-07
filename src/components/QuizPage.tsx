import React, { useState, useEffect } from 'react';
import { Clock, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { Student, Question, QuizAnswer, QuizResult } from '../types';
import { getRandomQuestions } from '../utils/questionBank';
import Timer from './Timer';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';

interface QuizPageProps {
  student: Student;
  onQuizComplete: (result: QuizResult) => void;
}

const QuizPage: React.FC<QuizPageProps> = ({ student, onQuizComplete }) => {
  const [questions] = useState<Question[]>(() => getRandomQuestions(8));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [startTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [timeUp, setTimeUp] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const hasAnswered = selectedAnswer !== null;

  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const timeSpent = Date.now() - questionStartTime;
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
      timeSpent
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    setShowResult(true);
    setTimeout(() => {
      if (isLastQuestion) {
        completeQuiz(updatedAnswers);
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 2000);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0 && !showResult) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(null);
    }
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    completeQuiz(answers);
  };

  const completeQuiz = (finalAnswers: QuizAnswer[]) => {
    const totalTimeSpent = Date.now() - startTime;
    const correctAnswers = finalAnswers.filter(answer => answer.isCorrect).length;
    const score = correctAnswers;
    const percentage = Math.round((correctAnswers / questions.length) * 100);
    const passed = percentage >= 60;

    const result: QuizResult = {
      student,
      answers: finalAnswers,
      totalQuestions: questions.length,
      correctAnswers,
      score,
      percentage,
      timeSpent: totalTimeSpent,
      date: new Date().toISOString(),
      passed
    };

    onQuizComplete(result);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                Blockchain Quiz
              </h1>
              <p className="text-gray-600">
                Student: <span className="font-semibold">{student.name}</span> | 
                Roll: <span className="font-semibold">{student.rollNumber}</span>
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="w-5 h-5" />
                <Timer onTimeUp={handleTimeUp} />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <ProgressBar 
              current={currentQuestionIndex + 1} 
              total={questions.length} 
            />
          </div>
        </div>

        {/* Question Card */}
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          selectedAnswer={selectedAnswer}
          showResult={showResult}
          onAnswerSelect={handleAnswerSelect}
        />

        {/* Navigation */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-6 mt-6">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0 || showResult}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500/20 hover:bg-gray-500/30 disabled:bg-gray-300/20 disabled:cursor-not-allowed text-gray-700 disabled:text-gray-400 rounded-lg transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>

            <button
              onClick={handleNextQuestion}
              disabled={!hasAnswered || showResult}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none"
            >
              {isLastQuestion ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Complete Quiz
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;