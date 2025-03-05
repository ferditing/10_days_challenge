// /src/App.jsx
import React, { Suspense, lazy, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider } from './components/ThemeContext';
import { ProductivityProvider } from './components/ProductivityContext';

// Lazy load components
const Navbar = lazy(() => import('./components/Navbar'));
const Card = lazy(() => import('./components/Card'));
const TodoList = lazy(() => import('./components/TodoList'));
const Pomodoro = lazy(() => import('./components/Pomodoro'));
const Weather = lazy(() => import('./components/Weather'));
const Quote = lazy(() => import('./components/Quote'));
const ProductivityTracker = lazy(() => import('./components/ProductivityTracker'));
const ThemeToggle = lazy(() => import('./components/ThemeToggle'));
const Login = lazy(() => import('./components/Login'));
const WidgetSettings = lazy(() => import('./components/WidgetSettings'));

function App() {
  const [user, setUser] = useState(null);

  // Default widget settings: all widgets visible initially.
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

  // If user is not logged in, show the login screen.
  if (!user) {
    return (
      <ThemeProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center"
          >
            <h1 className="text-3xl font-bold mb-6">Ferdinands Dashboard</h1>
            <Login onLogin={setUser} />
          </motion.div>
        </Suspense>
      </ThemeProvider>
    );
  }

  // Once logged in, display the personalized dashboard with animations.
  return (
    <ThemeProvider>
      <ProductivityProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-gray-100 dark:bg-gray-800 min-h-screen"
          >
            <Navbar />
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold mb-6">Welcome, {user.displayName}</h1>
                <ThemeToggle />
              </div>
              {/* Widget Settings Panel */}
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
          </motion.div>
        </Suspense>
      </ProductivityProvider>
    </ThemeProvider>
  );
}

export default App;
