// /src/components/Weather.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Nairobi'); // Default city

  const apiUrl = import.meta.env.VITE_WEATHER_API_URL;
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}?q=${city}&units=metric&appid=${apiKey}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [city, apiUrl, apiKey]);

  return (
    <div className="bg-blue-300 dark:bg-blue-900 text-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-2">Weather in {city}</h2>
      {weatherData ? (
        <div>
          <p className="text-lg">Temperature: {weatherData.main.temp}°C</p>
          <p className="text-md">Condition: {weatherData.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt="Weather Icon"
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weather;
