import React, { useState } from 'react';
import { BookOpen, GraduationCap, User, Hash, Settings } from 'lucide-react';
import { Student } from '../types';

interface LoginPageProps {
  onLogin: (student: Student) => void;
  onAdminAccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onAdminAccess }) => {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [errors, setErrors] = useState<{ name?: string; rollNumber?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { name?: string; rollNumber?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!rollNumber.trim()) {
      newErrors.rollNumber = 'Roll number is required';
    } else if (rollNumber.trim().length < 3) {
      newErrors.rollNumber = 'Roll number must be at least 3 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onLogin({
        name: name.trim(),
        rollNumber: rollNumber.trim().toUpperCase()
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Admin Access Button */}
      <button
        onClick={onAdminAccess}
        className="fixed top-4 right-4 p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full border border-white/30 shadow-lg transition-all duration-200 group"
        title="Admin Panel"
      >
        <Settings className="w-5 h-5 text-gray-600 group-hover:text-gray-800 group-hover:rotate-90 transition-all duration-200" />
      </button>
      
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 shadow-lg mb-4">
            <div className="relative">
              <BookOpen className="w-8 h-8 text-teal-600" />
              <GraduationCap className="w-6 h-6 text-blue-600 absolute -top-1 -right-1" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Blockchain Quiz
          </h1>
          <p className="text-gray-600">
            Test your knowledge on blockchain technology
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className={`w-full pl-11 pr-4 py-3 bg-white/50 backdrop-blur-sm rounded-lg border ${
                    errors.name ? 'border-red-300' : 'border-white/30'
                  } focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 placeholder-gray-500`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Roll Number
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="rollNumber"
                  value={rollNumber}
                  onChange={(e) => {
                    setRollNumber(e.target.value);
                    if (errors.rollNumber) setErrors({ ...errors, rollNumber: undefined });
                  }}
                  className={`w-full pl-11 pr-4 py-3 bg-white/50 backdrop-blur-sm rounded-lg border ${
                    errors.rollNumber ? 'border-red-300' : 'border-white/30'
                  } focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 placeholder-gray-500`}
                  placeholder="Enter your roll number"
                />
              </div>
              {errors.rollNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.rollNumber}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Start Quiz
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Ready to test your blockchain knowledge? Let's begin!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;