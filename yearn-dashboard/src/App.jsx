// /src/App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import TodoList from './components/TodoList';
import Pomodoro from './components/Pomodoro';
import Weather from './components/Weather';
import Quote from './components/Quote';
import ProductivityTracker from './components/ProductivityTracker';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './components/ThemeContext';
import { ProductivityProvider } from './components/ProductivityContext';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);

  // If the user is not logged in, show the login screen.
  if (!user) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-6">Ferdinands Dashboard</h1>
          <Login onLogin={setUser} />
        </div>
      </ThemeProvider>
    );
  }

  // Once logged in, display the personalized dashboard.
  return (
    <ThemeProvider>
      <ProductivityProvider>
        <div className="bg-gray-100 dark:bg-gray-800 min-h-screen">
          <Navbar />
          <div className="p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold mb-6">Welcome, {user.displayName}</h1>
              <ThemeToggle />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Card 1" content="Content for Card 1" />
              <Card title="Card 2" content="Content for Card 2" />
              <TodoList />
              <Pomodoro />
              <Weather />
              <Quote />
              <ProductivityTracker />
            </div>
          </div>
        </div>
      </ProductivityProvider>
    </ThemeProvider>
  );
}

export default App;
