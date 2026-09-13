import React, { useState } from 'react';
import { WeatherService } from '../services/weatherApi';

/**
 * WeatherCard Component
 * Fetches live weather data from Open-Meteo Public API and logs network activity.
 * 
 * Props:
 *  - onLogEvent (function): Sends network log entries to NetworkInspector
 */
export default function WeatherCard({ onLogEvent }) {
  const [city, setCity] = useState('London');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);

    try {
      const data = await WeatherService.getWeather(city.trim());
      setWeather(data);
      
      // Log event to Network Inspector
      if (onLogEvent) {
        onLogEvent('GET (External API)', 'Open-Meteo Weather', data.status, null, data);
      }
    } catch (err) {
      setWeather({ error: err.message });
      if (onLogEvent) {
        onLogEvent('GET (External API)', 'Open-Meteo Weather', 'FAILED', null, { error: err.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card weather-card">
      <div className="card-header">
        <h2><i className="fa-solid fa-cloud-sun"></i> Live Weather API</h2>
      </div>
      
      <div className="weather-search">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City name..."
          onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
        />
        <button onClick={fetchWeather} className="btn btn-accent" title="Fetch weather">
          <i className="fa-solid fa-search"></i>
        </button>
      </div>

      <div className="weather-display-box">
        {loading ? (
          <p className="text-muted text-center">
            <i className="fa-solid fa-spinner fa-spin"></i> Fetching weather...
          </p>
        ) : weather?.error ? (
          <p style={{ color: 'var(--danger)', fontSize: '0.85rem' }}>❌ {weather.error}</p>
        ) : weather ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem' }}>
                  <i className="fa-solid fa-location-dot" style={{ color: 'var(--primary)', marginRight: '4px' }}></i>
                  {weather.name}, {weather.country}
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Live Open-Meteo API</span>
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                {weather.temp}°C
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              <i className="fa-solid fa-wind"></i> Wind: {weather.wind} km/h
            </p>
          </div>
        ) : (
          <p className="text-muted text-center">Click search to fetch live weather data</p>
        )}
      </div>
    </div>
  );
}