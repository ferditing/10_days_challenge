// src/components/Quote.jsx
import { useState, useEffect } from "react";

const Quote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Helper function to get the current date as YYYY-MM-DD
  const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString().split("T")[0];
  };

  // Check localStorage for a saved quote and date
  const loadStoredQuote = () => {
    const savedQuote = localStorage.getItem("quote");
    const savedAuthor = localStorage.getItem("author");
    const savedDate = localStorage.getItem("quoteDate");

    if (savedQuote && savedAuthor && savedDate === getCurrentDate()) {
      setQuote(savedQuote);
      setAuthor(savedAuthor);
      setLoading(false);
      return true;
    }
    return false;
  };

  const fetchQuote = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/quote");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      const newQuote = data[0].q;
      const newAuthor = data[0].a;

      // Save the quote and the date in localStorage
      localStorage.setItem("quote", newQuote);
      localStorage.setItem("author", newAuthor);
      localStorage.setItem("quoteDate", getCurrentDate());

      setQuote(newQuote);
      setAuthor(newAuthor);
    } catch (err) {
      console.error("Error fetching quote:", err);
      setError("Failed to load quote. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load the stored quote if it's from today, otherwise fetch a new one
    if (!loadStoredQuote()) {
      fetchQuote();
    }
  }, []);

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 text-center max-w-md mx-auto">
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <p className="text-xl font-semibold mb-4">"{quote}"</p>
          <p className="text-gray-600 text-sm">- {author}</p>
          <button
            onClick={fetchQuote}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition"
          >
            New Quote
          </button>
        </>
      )}
    </div>
  );
};

export default Quote;
