import React, { useEffect, useState } from 'react';

interface TimerProps {
  isRunning: boolean;
  reset: boolean;
}

const Timer: React.FC<TimerProps> = ({ isRunning, reset }) => {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    if (reset) {
      setSeconds(0);
    }
  }, [reset]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return (
    <div className="flex flex-col items-center justify-center">
      <span>Timer: {seconds}</span>
    </div>
  );
};

export default Timer;
