import React, { useState, useEffect } from 'react';

interface TimerProps {
  onTimeUp: () => void;
  duration?: number; // in seconds
}

const Timer: React.FC<TimerProps> = ({ onTimeUp, duration = 600 }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const getColorClass = () => {
    if (timeLeft <= 60) return 'text-red-600';
    if (timeLeft <= 180) return 'text-orange-600';
    return 'text-gray-700';
  };

  return (
    <div className={`font-mono font-bold ${getColorClass()}`}>
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
};

export default Timer;