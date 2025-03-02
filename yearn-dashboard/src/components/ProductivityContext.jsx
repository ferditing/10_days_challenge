// /src/components/ProductivityContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const ProductivityContext = createContext();

export const ProductivityProvider = ({ children }) => {
  const [hasCompletedToday, setHasCompletedToday] = useState(false);

  // Reset daily completion at the start of a new day
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const storedDate = localStorage.getItem('productiveDate');
    if (storedDate !== today) {
      setHasCompletedToday(false);
      localStorage.setItem('productiveDate', today);
    }
  }, []);

  return (
    <ProductivityContext.Provider value={{ hasCompletedToday, setHasCompletedToday }}>
      {children}
    </ProductivityContext.Provider>
  );
};
