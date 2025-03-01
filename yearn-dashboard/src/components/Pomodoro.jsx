import React, { useState, useEffect } from 'react';

const Pomodoro = () => {
  const workTime = 25 * 60; // 25 minutes in seconds
  const breakTime = 5 * 60; // 5 minutes in seconds

  const [secondsLeft, setSecondsLeft] = useState(workTime);
  const [isActive, setIsActive] = useState(false);
  const [isWork, setIsWork] = useState(true);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSecondsLeft((seconds) => {
          if (seconds > 0) return seconds - 1;
          else {
            setIsWork((prev) => !prev);
            return isWork ? breakTime : workTime;
          }
        });
      }, 1000);
    } else if (!isActive && secondsLeft !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, isWork, breakTime, workTime, secondsLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      secs < 10 ? '0' : ''
    }${secs}`;
  };

  const startTimer = () => setIsActive(true);
  const pauseTimer = () => setIsActive(false);
  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(isWork ? workTime : breakTime);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">
        {isWork ? 'Work Time' : 'Break Time'}
      </h2>
      <p className="text-4xl mb-4">{formatTime(secondsLeft)}</p>
      <div className="space-x-4">
        <button
          onClick={startTimer}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Start
        </button>
        <button
          onClick={pauseTimer}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Pause
        </button>
        <button
          onClick={resetTimer}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
