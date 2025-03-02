// /src/components/ProductivityTracker.jsx
import React, { useState, useEffect, useContext } from 'react';
import { ProductivityContext } from './ProductivityContext';

const ProductivityTracker = () => {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [lastDate, setLastDate] = useState(null);
  const { hasCompletedToday } = useContext(ProductivityContext);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load values from localStorage
    const storedCurrent = parseInt(localStorage.getItem('currentStreak')) || 0;
    const storedLongest = parseInt(localStorage.getItem('longestStreak')) || 0;
    const storedDate = localStorage.getItem('lastCompletionDate') || null;

    setCurrentStreak(storedCurrent);
    setLongestStreak(storedLongest);
    setLastDate(storedDate);
  }, []);

  useEffect(() => {
    // If a task was completed today and not yet recorded, update the streak.
    if (hasCompletedToday) {
      const today = new Date().toISOString().slice(0, 10);
      if (lastDate !== today) {
        let newStreak = 1;
        if (lastDate) {
          const last = new Date(lastDate);
          const todayDate = new Date(today);
          const diffDays = Math.floor((todayDate - last) / (1000 * 60 * 60 * 24));
          newStreak = diffDays === 1 ? currentStreak + 1 : 1;
        }
        setCurrentStreak(newStreak);
        localStorage.setItem('currentStreak', newStreak);
        localStorage.setItem('lastCompletionDate', today);

        if (newStreak > longestStreak) {
          setLongestStreak(newStreak);
          localStorage.setItem('longestStreak', newStreak);
        }
        setMessage('Productivity for today recorded!');
      }
    }
  }, [hasCompletedToday]);

  return (
    <div className="bg-green-100 dark:bg-green-800 text-gray-800 dark:text-gray-200 rounded-lg p-6 shadow-md w-full max-w-md mx-auto mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Productivity Tracker</h2>
      <div className="mb-4 text-center">
        <p>Current Streak: {currentStreak} day{currentStreak === 1 ? '' : 's'}</p>
        <p>Longest Streak: {longestStreak} day{longestStreak === 1 ? '' : 's'}</p>
      </div>
      {message && <p className="text-center text-sm">{message}</p>}
    </div>
  );
};

export default ProductivityTracker;
