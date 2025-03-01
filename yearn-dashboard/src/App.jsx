// /src/App.jsx
import React from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import TodoList from './components/TodoList';
import Pomodoro from './components/Pomodoro';
import Weather from './components/Weather';
import Quote from './components/Quotes';
import { ThemeProvider } from './components/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <ThemeProvider>
      <div className="bg-white-100 dark:bg-black-800 dark-text-white min-h-screen">
        <Navbar />
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold mb-6">Ferdinands Dashboard</h1>
            <ThemeToggle />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Card 1" content="Content for Card 1" />
            <Card title="Card 2" content="Content for Card 2" />
            <TodoList />
            <Pomodoro />
            <Weather />
            <Quote />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
