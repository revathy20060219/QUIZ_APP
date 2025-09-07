import React, { useRef } from 'react';
import { Download, Award } from 'lucide-react';
import { QuizResult, Student } from '../types';

interface CertificateGeneratorProps {
  result: QuizResult;
  student: Student;
}

const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({ result, student }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (certificateRef.current) {
      try {
        // Create a simple HTML certificate for download
        const certificateContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>Certificate of Achievement</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 40px;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  min-height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                .certificate {
                  background: white;
                  padding: 60px;
                  border-radius: 20px;
                  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                  text-align: center;
                  max-width: 800px;
                  border: 8px solid #f8f9fa;
                }
                .header { border-bottom: 3px solid #0f766e; padding-bottom: 20px; margin-bottom: 30px; }
                .title { font-size: 48px; color: #0f766e; margin: 0; font-weight: bold; }
                .subtitle { font-size: 24px; color: #6b7280; margin: 10px 0; }
                .student-name { font-size: 36px; color: #1f2937; margin: 30px 0; font-weight: bold; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
                .details { font-size: 18px; color: #4b5563; margin: 15px 0; }
                .score { font-size: 32px; color: #059669; font-weight: bold; margin: 20px 0; }
                .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; }
                .date { color: #6b7280; margin-bottom: 20px; }
                .signature-line { border-top: 2px solid #9ca3af; width: 300px; margin: 20px auto; }
                .signature-label { color: #6b7280; font-size: 14px; margin-top: 5px; }
              </style>
            </head>
            <body>
              <div class="certificate">
                <div class="header">
                  <h1 class="title">Certificate of Achievement</h1>
                  <p class="subtitle">Blockchain Technology Quiz</p>
                </div>
                
                <p style="font-size: 20px; margin: 30px 0;">This is to certify that</p>
                
                <h2 class="student-name">${student.name}</h2>
                
                <p class="details">Roll Number: <strong>${student.rollNumber}</strong></p>
                
                <p style="font-size: 18px; margin: 25px 0;">has successfully completed the Blockchain Technology Quiz with a score of</p>
                
                <div class="score">${result.correctAnswers}/${result.totalQuestions} (${result.percentage}%)</div>
                
                <p style="font-size: 16px; margin: 20px 0; color: #059669; font-weight: bold;">PASSED</p>
                
                <div class="footer">
                  <p class="date">Date: ${new Date(result.date).toLocaleDateString()}</p>
                  <div class="signature-line"></div>
                  <p class="signature-label">Authorized Signature</p>
                </div>
              </div>
            </body>
          </html>
        `;

        const blob = new Blob([certificateContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `certificate_${student.rollNumber}_${new Date().getTime()}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error generating certificate:', error);
        alert('Error generating certificate. Please try again.');
      }
    }
  };

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-6 mb-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100/70 rounded-full mb-4">
          <Award className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          🎉 Congratulations!
        </h2>
        <p className="text-gray-600">
          You've passed the quiz! Download your certificate below.
        </p>
      </div>

      {/* Certificate Preview */}
      <div 
        ref={certificateRef}
        className="bg-white rounded-xl p-8 border-4 border-teal-200 shadow-lg mb-6 mx-auto max-w-2xl"
      >
        <div className="text-center">
          <div className="border-b-2 border-teal-600 pb-4 mb-6">
            <h1 className="text-4xl font-bold text-teal-600 mb-2">
              Certificate of Achievement
            </h1>
            <p className="text-lg text-gray-600">Blockchain Technology Quiz</p>
          </div>
          
          <p className="text-lg mb-4">This is to certify that</p>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">
            {student.name}
          </h2>
          
          <p className="text-gray-600 mb-4">
            Roll Number: <span className="font-semibold">{student.rollNumber}</span>
          </p>
          
          <p className="text-lg mb-4">
            has successfully completed the Blockchain Technology Quiz with a score of
          </p>
          
          <div className="text-3xl font-bold text-green-600 mb-4">
            {result.correctAnswers}/{result.totalQuestions} ({result.percentage}%)
          </div>
          
          <p className="text-lg font-semibold text-green-600 mb-6">PASSED</p>
          
          <div className="border-t-2 border-gray-200 pt-4">
            <p className="text-gray-600 mb-4">
              Date: {new Date(result.date).toLocaleDateString()}
            </p>
            <div className="border-t-2 border-gray-400 w-64 mx-auto mb-2"></div>
            <p className="text-sm text-gray-500">Authorized Signature</p>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="text-center">
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <Download className="w-5 h-5" />
          Download Certificate
        </button>
      </div>
    </div>
  );
};

export default CertificateGenerator;