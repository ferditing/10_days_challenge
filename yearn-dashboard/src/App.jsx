// /src/App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import TodoList from './components/TodoList';
import Pomodoro from './components/Pomodoro';
import Weather from './components/Weather';
import Quote from './components/Quote';
import ProductivityTracker from './components/ProductivityTracker';
import ThemeToggle from './components/ThemeToggle';
import Login from './components/Login';
import WidgetSettings from './components/WidgetSettings';
import { ThemeProvider } from './components/ThemeContext';
import { ProductivityProvider } from './components/ProductivityContext';

function App() {
  const [user, setUser] = useState(null);

  // Default widget settings – all widgets are visible initially.
  const defaultSettings = {
    card1: true,
    card2: true,
    todoList: true,
    pomodoro: true,
    weather: true,
    quote: true,
    productivityTracker: true,
  };

  const [widgetSettings, setWidgetSettings] = useState(defaultSettings);

  // Load widget settings from localStorage on mount.
  useEffect(() => {
    const storedSettings = localStorage.getItem('widgetSettings');
    if (storedSettings) {
      setWidgetSettings(JSON.parse(storedSettings));
    }
  }, []);

  // If user is not logged in, show login screen.
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

  // Once logged in, display the personalized dashboard with widget customization.
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
            {/* Widget settings panel */}
            <WidgetSettings settings={widgetSettings} updateSettings={setWidgetSettings} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {widgetSettings.card1 && <Card title="Card 1" content="Content for Card 1" />}
              {widgetSettings.card2 && <Card title="Card 2" content="Content for Card 2" />}
              {widgetSettings.todoList && <TodoList />}
              {widgetSettings.pomodoro && <Pomodoro />}
              {widgetSettings.weather && <Weather />}
              {widgetSettings.quote && <Quote />}
              {widgetSettings.productivityTracker && <ProductivityTracker />}
            </div>
          </div>
        </div>
      </ProductivityProvider>
    </ThemeProvider>
  );
}

export default App;
