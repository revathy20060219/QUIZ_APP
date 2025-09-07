import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Download, Upload, ArrowLeft, Save, X } from 'lucide-react';
import { AdminQuestion } from '../types/admin';
import {
  getAdminQuestions,
  addAdminQuestion,
  updateAdminQuestion,
  deleteAdminQuestion,
  exportQuestionsAsJSON,
  exportQuestionsAsCSV,
  importQuestionsFromJSON
} from '../utils/adminStorage';

interface AdminPanelProps {
  onBackToLogin: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToLogin }) => {
  const [questions, setQuestions] = useState<AdminQuestion[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<AdminQuestion | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
    category: 'Blockchain Basics',
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    tags: ''
  });

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = () => {
    const loadedQuestions = getAdminQuestions();
    setQuestions(loadedQuestions);
  };

  const resetForm = () => {
    setFormData({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
      category: 'Blockchain Basics',
      difficulty: 'medium',
      tags: ''
    });
    setShowAddForm(false);
    setEditingQuestion(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.question.trim() || formData.options.some(opt => !opt.trim())) {
      alert('Please fill in all required fields');
      return;
    }

    const questionData = {
      question: formData.question.trim(),
      options: formData.options.map(opt => opt.trim()),
      correctAnswer: formData.correctAnswer,
      explanation: formData.explanation.trim(),
      category: formData.category,
      difficulty: formData.difficulty,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    if (editingQuestion) {
      updateAdminQuestion(editingQuestion.id, questionData);
    } else {
      addAdminQuestion(questionData);
    }

    loadQuestions();
    resetForm();
  };

  const handleEdit = (question: AdminQuestion) => {
    setEditingQuestion(question);
    setFormData({
      question: question.question,
      options: [...question.options],
      correctAnswer: question.correctAnswer,
      explanation: question.explanation || '',
      category: question.category || 'Blockchain Basics',
      difficulty: question.difficulty || 'medium',
      tags: (question.tags || []).join(', ')
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      deleteAdminQuestion(id);
      loadQuestions();
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const importedQuestions = await importQuestionsFromJSON(file);
      
      // Add imported questions to existing ones
      importedQuestions.forEach(q => addAdminQuestion(q));
      loadQuestions();
      
      alert(`Successfully imported ${importedQuestions.length} questions!`);
    } catch (error) {
      alert('Error importing questions. Please check the file format.');
      console.error('Import error:', error);
    }
    
    // Reset file input
    e.target.value = '';
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBackToLogin}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-700 rounded-lg transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Quiz
            </button>
            
            <h1 className="text-3xl font-bold text-gray-800">
              🔧 Admin Panel
            </h1>
            
            <div className="flex gap-2">
              <button
                onClick={() => exportQuestionsAsJSON(questions)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                Export JSON
              </button>
              <button
                onClick={() => exportQuestionsAsCSV(questions)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Manage quiz questions and question banks
            </p>
            
            <div className="flex gap-2">
              <label className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200 cursor-pointer">
                <Upload className="w-4 h-4" />
                Import JSON
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
              
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                Add Question
              </button>
            </div>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editingQuestion ? 'Edit Question' : 'Add New Question'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-gray-500/20 rounded-lg transition-all duration-200"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Blockchain Basics">Blockchain Basics</option>
                    <option value="Cryptocurrency">Cryptocurrency</option>
                    <option value="Smart Contracts">Smart Contracts</option>
                    <option value="Mining">Mining</option>
                    <option value="Security">Security</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as 'easy' | 'medium' | 'hard' })}
                    className="w-full p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="bitcoin, ethereum, mining"
                    className="w-full p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question *
                </label>
                <textarea
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="Enter your question here..."
                  rows={3}
                  className="w-full p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.options.map((option, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Option {String.fromCharCode(65 + index)} *
                      {formData.correctAnswer === index && (
                        <span className="text-green-600 ml-2">✓ Correct Answer</span>
                      )}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...formData.options];
                          newOptions[index] = e.target.value;
                          setFormData({ ...formData, options: newOptions });
                        }}
                        placeholder={`Option ${String.fromCharCode(65 + index)}`}
                        className="flex-1 p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, correctAnswer: index })}
                        className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                          formData.correctAnswer === index
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                        }`}
                      >
                        ✓
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Explanation (Optional)
                </label>
                <textarea
                  value={formData.explanation}
                  onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                  placeholder="Explain why this is the correct answer..."
                  rows={2}
                  className="w-full p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200"
                >
                  <Save className="w-4 h-4" />
                  {editingQuestion ? 'Update Question' : 'Add Question'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Questions List */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-white/20">
            <h2 className="text-xl font-bold text-gray-800">
              Questions ({questions.length})
            </h2>
          </div>
          
          {questions.length === 0 ? (
            <div className="p-12 text-center">
              <Plus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Questions Yet
              </h3>
              <p className="text-gray-500 mb-4">
                Start by adding your first blockchain question!
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200"
              >
                Add First Question
              </button>
            </div>
          ) : (
            <div className="divide-y divide-white/20">
              {questions.map((question, index) => (
                <div key={question.id} className="p-6 hover:bg-white/10 transition-all duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-teal-100/70 text-teal-800 rounded text-xs font-medium">
                          #{index + 1}
                        </span>
                        <span className="px-2 py-1 bg-blue-100/70 text-blue-800 rounded text-xs font-medium">
                          {question.category}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          question.difficulty === 'easy' ? 'bg-green-100/70 text-green-800' :
                          question.difficulty === 'medium' ? 'bg-yellow-100/70 text-yellow-800' :
                          'bg-red-100/70 text-red-800'
                        }`}>
                          {question.difficulty}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {question.question}
                      </h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {question.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className={`p-2 rounded ${
                              optIndex === question.correctAnswer
                                ? 'bg-green-100/70 text-green-800 font-medium'
                                : 'bg-gray-100/50 text-gray-700'
                            }`}
                          >
                            {String.fromCharCode(65 + optIndex)}. {option}
                          </div>
                        ))}
                      </div>
                      {question.explanation && (
                        <p className="text-sm text-gray-600 mt-2 italic">
                          💡 {question.explanation}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(question)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(question.id)}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Created: {new Date(question.createdAt).toLocaleDateString()} | 
                    Updated: {new Date(question.updatedAt).toLocaleDateString()}
                    {question.tags && question.tags.length > 0 && (
                      <span className="ml-2">
                        Tags: {question.tags.join(', ')}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;