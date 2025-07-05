import { useState } from 'react';

function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/weather/${city}`);
      const data = await response.json();
      console.log("Fetched weather:", data);
      setWeather(data);
      setError('');
      alert(`Temperature: ${data.temperature}°C\n💡 Suggestion: ${data.suggestion}`);
    } catch (err) {
      console.error("Fetch error:", err);
      setWeather(null);
      setError('City not found or API error.');
    }
  };

  return (
    <>
    <div className="ban-bag">
      <section className="banner">
        <h1>Welcome to ENV-Sense</h1>
        <p>Leave Happy, Stay Alert! Stay Safe!</p>
      </section>
    </div>
    <div className="env-home container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">🌦️</h1>
      <h2 className="text-3xl font-bold mb-4">Hye Dude(^‿^)!! </h2>

      <input
        type="text"
        placeholder="Enter your city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="env-city-input p-2 border border-gray-400 rounded-md w-64"
      />

      <button
        onClick={fetchWeather}
        className="env-weather-btn mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Get Weather
      </button>

      {error && <p className="env-error text-red-600 mt-3">{error}</p>}

      {weather && (
        <div className="env-weather-box mt-6 p-4 bg-white rounded shadow-md text-center w-72">
          <h2 className="text-xl font-semibold">{weather.location}</h2>
          <p className="text-lg">🌡️ {weather.temperature}°C</p>
          <p className="capitalize">☁️ {weather.condition}</p>
          <p className="mt-2 italic">💡 {weather.suggestion}</p>
        </div>
      )}
    </div>
    </>
  );
}

export default Home;
