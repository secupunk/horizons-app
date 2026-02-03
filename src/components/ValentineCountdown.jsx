import React, { useState, useEffect } from 'react';

export default function ValentineCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let targetDate = new Date(`${currentYear}-02-14T00:00:00`);

      // If Valentine's Day has passed this year, target next year
      if (now > targetDate) {
        targetDate = new Date(`${currentYear + 1}-02-14T00:00:00`);
      }

      const difference = targetDate - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto text-center px-4 py-6">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 drop-shadow-md">
        ❤️ Valentine's Day in <span className="text-[#FF1493]">{timeLeft.days}</span> days
      </h2>
      
      <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-lg mx-auto">
        <div className="flex flex-col items-center bg-[#FF1493]/20 rounded-lg p-3 md:p-4 backdrop-blur-sm border border-[#FF1493]/30">
          <span className="text-2xl md:text-4xl font-bold text-[#FF1493] tabular-nums">
            {timeLeft.days}
          </span>
          <span className="text-xs md:text-sm text-pink-200 uppercase tracking-wider mt-1">Days</span>
        </div>
        
        <div className="flex flex-col items-center bg-[#FF1493]/20 rounded-lg p-3 md:p-4 backdrop-blur-sm border border-[#FF1493]/30">
          <span className="text-2xl md:text-4xl font-bold text-[#FF1493] tabular-nums">
            {timeLeft.hours}
          </span>
          <span className="text-xs md:text-sm text-pink-200 uppercase tracking-wider mt-1">Hours</span>
        </div>
        
        <div className="flex flex-col items-center bg-[#FF1493]/20 rounded-lg p-3 md:p-4 backdrop-blur-sm border border-[#FF1493]/30">
          <span className="text-2xl md:text-4xl font-bold text-[#FF1493] tabular-nums">
            {timeLeft.minutes}
          </span>
          <span className="text-xs md:text-sm text-pink-200 uppercase tracking-wider mt-1">Mins</span>
        </div>
        
        <div className="flex flex-col items-center bg-[#FF1493]/20 rounded-lg p-3 md:p-4 backdrop-blur-sm border border-[#FF1493]/30">
          <span className="text-2xl md:text-4xl font-bold text-[#FF1493] tabular-nums">
            {timeLeft.seconds}
          </span>
          <span className="text-xs md:text-sm text-pink-200 uppercase tracking-wider mt-1">Secs</span>
        </div>
      </div>
    </div>
  );
}