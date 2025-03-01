import React from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import TodoList from './components/todo';
import Pomodoro from './components/Pomodoro';
import Weather from './components/Weather';
import Quote from './components/Quote'

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Ferdinands Dashboard</h1>
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
  );
}

export default App;
