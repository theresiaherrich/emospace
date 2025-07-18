import { useEffect, useState } from 'react';

const useCountdown = (minutes = 30) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const minutesLeft = Math.floor(timeLeft / 60);
  const secondsLeft = timeLeft % 60;
  return `${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
};

export default useCountdown;