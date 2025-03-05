// /src/components/Quote.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quote = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);

  // Use environment variable for the backend proxy URL
  const apiUrl = import.meta.env.VITE_QUOTE_API_URL;

  const fetchQuote = async () => {
    try {
      const response = await axios.get(apiUrl);
      // Assuming your backend returns an array with one object that has "q" and "a" keys:
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
      setQuote(localStorage.getItem('quote'));
      setAuthor(localStorage.getItem('author'));
    } else {
      fetchQuote();
    }
  }, [apiUrl]);

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
