// src/components/Weather.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('Nairobi');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async (cityName) => {
    try {
      setError('');
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=34419b8a216cc80efa427d4f9ccd2e75`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError('City not found. Please try again.');
      setWeatherData(null);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim() !== '') fetchWeather(city);
  };

  return (
    <div className="bg-blue-500  rounded-lg p-6 shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Weather in {city}</h2>
      <form onSubmit={handleSearch} className="mb-4 text-center">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 rounded-md text-black"
          placeholder="Enter city name"
        />
        <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white p-2 ml-2 rounded-md">Search</button>
      </form>

      {error && <p className="text-red-400 text-center">{error}</p>}

      {weatherData && (
        <div className="text-center">
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="Weather Icon"
            className="mx-auto"
          />
          <p className="text-4xl font-semibold">{weatherData.main.temp}°C</p>
          <p className="text-lg">{weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
