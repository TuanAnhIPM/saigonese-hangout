import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ endDate, theme }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      // Parse endDate with timezone awareness (assume local timezone if not specified)
      const end = new Date(endDate).getTime();
      const difference = end - now;

      if (difference <= 0) {
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setIsExpired(false);
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (isExpired) {
    return null; // Don't show timer if promotion has ended
  }

  const isMorning = theme === "morning";

  return (
    <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold ${
      isMorning 
        ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md" 
        : "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md"
    }`}>
      <span className="animate-pulse">⏰</span>
      <span className="hidden sm:inline">Promo ends in:</span>
      <span className="sm:hidden">Ends:</span>
      <div className="flex items-center gap-1 sm:gap-1.5">
        {timeLeft.days > 0 && (
          <>
            <span className="font-bold">{timeLeft.days}d</span>
            <span className="opacity-70">:</span>
          </>
        )}
        <span className="font-bold">{String(timeLeft.hours).padStart(2, '0')}h</span>
        <span className="opacity-70">:</span>
        <span className="font-bold">{String(timeLeft.minutes).padStart(2, '0')}m</span>
        <span className="opacity-70">:</span>
        <span className="font-bold">{String(timeLeft.seconds).padStart(2, '0')}s</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
