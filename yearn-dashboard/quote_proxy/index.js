const fetchQuote = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/quote");
      const data = await response.json();
      setQuote(data[0].q);      // ZenQuotes uses data[0].q for quote text
      setAuthor(data[0].a);     // ZenQuotes uses data[0].a for author
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };
  