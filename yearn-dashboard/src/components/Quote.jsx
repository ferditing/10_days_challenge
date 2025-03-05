// /src/components/Quote.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quote = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    try {
      // Directly call ZenQuotes API
      const response = await axios.get('https://zenquotes.io/api/random');
      // Assume response.data is an array with an object that contains:
      // q: the quote, and a: the author.
      const data = response.data[0];
      setQuote(data.q);
      setAuthor(data.a);
      localStorage.setItem('quote', data.q);
      localStorage.setItem('author', data.a);
      localStorage.setItem('quoteDate', new Date().toDateString());
    } catch (err) {
      console.error('Error fetching quote:', err);
      setError('Failed to fetch quote');
    }
  };

  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('quoteDate');
    if (storedDate === today) {
      // Use the cached quote if it's been fetched today
      setQuote(localStorage.getItem('quote'));
      setAuthor(localStorage.getItem('author'));
    } else {
      fetchQuote();
    }
  }, []);

  return (
    <div className="bg-yellow-100 dark:bg-yellow-700 text-gray-800 dark:text-gray-200 rounded-lg p-6 shadow-md w-full max-w-md mx-auto mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Motivational Quote</h2>
      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : quote ? (
        <>
          <p className="text-lg italic text-center">"{quote}"</p>
          <p className="text-right mt-2">- {author}</p>
        </>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default Quote;
