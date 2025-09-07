# Blockchain Quiz Web Application

A comprehensive, modern web-based quiz application for testing blockchain knowledge with admin panel for question management.

## 🚀 Features

### Student Features
- **Secure Login**: Name and roll number validation
- **Dynamic Quiz**: 8 randomized multiple-choice blockchain questions
- **Real-time Timer**: 10-minute countdown with visual indicators
- **Instant Feedback**: Color-coded answer highlighting (green/red)
- **Progress Tracking**: Visual progress bar during quiz
- **Results Dashboard**: Comprehensive performance metrics
- **Certificate Generation**: Downloadable certificates for passing students
- **Leaderboard**: Top 5 performers with rankings

### Admin Features
- **Question Management**: Full CRUD operations for quiz questions
- **Question Categories**: Organize questions by blockchain topics
- **Difficulty Levels**: Easy, Medium, Hard classification
- **Bulk Operations**: Import/Export questions in JSON and CSV formats
- **Question Bank**: Manage multiple question sets
- **Real-time Updates**: Questions immediately available in quiz

### Technical Features
- **Glassmorphism UI**: Modern semi-transparent design with backdrop blur
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Local Storage**: Persistent data without backend requirements
- **Data Export**: CSV and JSON export for results and questions
- **Performance Tracking**: Detailed analytics and scoring

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism components
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Storage**: Browser LocalStorage
- **State Management**: React Hooks

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Quick Start
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blockchain-quiz-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 🎯 Usage Guide

### For Students
1. **Login**: Enter your full name and roll number
2. **Take Quiz**: Answer 8 randomized blockchain questions
3. **View Results**: See your score, percentage, and pass/fail status
4. **Download Certificate**: Get your achievement certificate (if passed)
5. **Check Leaderboard**: Compare your performance with others

### For Administrators
1. **Access Admin Panel**: Click the settings icon on the login page
2. **Manage Questions**: Add, edit, or delete quiz questions
3. **Organize Content**: Categorize questions and set difficulty levels
4. **Import/Export**: Bulk manage questions using JSON/CSV files
5. **Monitor Performance**: Export quiz results and leaderboard data

## 📊 Question Management

### Adding Questions
- Navigate to Admin Panel
- Click "Add Question"
- Fill in question details:
  - Question text
  - Four multiple-choice options
  - Correct answer selection
  - Explanation (optional)
  - Category and difficulty
  - Tags for organization

### Question Categories
- Blockchain Basics
- Cryptocurrency
- Smart Contracts
- Mining
- Security

### Import/Export Formats

#### JSON Format
```json
[
  {
    "id": 1,
    "question": "What is a blockchain?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 1,
    "explanation": "Detailed explanation here",
    "category": "Blockchain Basics",
    "difficulty": "medium",
    "tags": ["basics", "definition"]
  }
]
```

#### CSV Format
```csv
ID,Question,Option A,Option B,Option C,Option D,Correct Answer,Explanation,Category,Difficulty,Tags
1,"What is a blockchain?","Option A","Option B","Option C","Option D",1,"Explanation","Blockchain Basics","medium","basics, definition"
```

## 🎨 Design System

### Color Palette
- **Primary**: Teal (#0F766E) - Main brand color
- **Secondary**: Blue (#1E40AF) - Accent color
- **Success**: Green (#10B981) - Correct answers, achievements
- **Error**: Red (#EF4444) - Wrong answers, warnings
- **Warning**: Orange (#F59E0B) - Timer alerts
- **Neutral**: Gray shades for text and backgrounds

### UI Components
- **Glassmorphism Cards**: Semi-transparent with backdrop blur
- **Smooth Animations**: Hover effects and transitions
- **Responsive Grid**: Adaptive layouts for all screen sizes
- **Accessibility**: High contrast ratios and keyboard navigation

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── AdminPanel.tsx   # Question management interface
│   ├── LoginPage.tsx    # Student login form
│   ├── QuizPage.tsx     # Main quiz interface
│   ├── ResultsPage.tsx  # Score display and certificate
│   ├── Leaderboard.tsx  # Top performers list
│   └── ...
├── types/               # TypeScript type definitions
│   ├── index.ts         # Main application types
│   └── admin.ts         # Admin-specific types
├── utils/               # Utility functions
│   ├── questionBank.ts  # Question management logic
│   ├── dataStorage.ts   # LocalStorage operations
│   └── adminStorage.ts  # Admin data management
└── App.tsx             # Main application component
```

## 🔧 Configuration

### Quiz Settings
- **Question Count**: 8 questions per quiz (configurable)
- **Time Limit**: 10 minutes (600 seconds)
- **Passing Score**: 60% (configurable)
- **Question Pool**: Dynamic based on admin-managed questions

### Storage Keys
- `adminQuestions`: Question bank storage
- `questionBanks`: Question set management
- `blockchainQuizResults`: Student results
- `blockchainQuizCSV`: CSV export data

## 🚀 Deployment Options

### Static Hosting
Deploy to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

### Build Command
```bash
npm run build
```
Output directory: `dist/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments for implementation details

## 🔮 Future Enhancements

- **Multi-language Support**: Internationalization
- **Advanced Analytics**: Detailed performance metrics
- **Question Scheduling**: Time-based question releases
- **User Roles**: Different permission levels
- **API Integration**: Backend database connectivity
- **Mobile App**: React Native version

---

**Built with ❤️ for blockchain education**