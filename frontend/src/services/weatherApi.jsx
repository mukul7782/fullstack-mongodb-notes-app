/**
 * --------------------------------------------------------------------------
 * EXTERNAL WEATHER API SERVICE (src/services/weatherApi.js)
 * --------------------------------------------------------------------------
 * Fetches live weather data from the public Open-Meteo API (No API key needed).
 */

export const WeatherService = {

  /**
   * Fetches weather metrics for a given city name
   * @param {string} cityName - Name of the city (e.g. "London", "Tokyo")
   */
  getWeather: async (cityName) => {
    // Step 1: Call Geocoding API to convert city name into Latitude & Longitude
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error(`City "${cityName}" not found`);
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // Step 2: Call Weather API using the coordinates
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherRes.json();

    return {
      name,
      country,
      temp: weatherData.current_weather.temperature,
      wind: weatherData.current_weather.windspeed,
      status: weatherRes.status
    };
  }
};