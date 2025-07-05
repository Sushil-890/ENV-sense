const axios = require('axios');
const path = require('path');
const fs = require('fs');

const FetchWeather = async (city) => {
  console.log("Fetching weather data for:", city);

  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await axios.get(url);
  const { main, weather, name } = response.data;

  const condition = weather[0].description;

  // Read suggestions from Note.json
  const dataPath = path.join(__dirname, 'Note.json');
  const rawData = fs.readFileSync(dataPath);
  const suggestions = JSON.parse(rawData);

  // Match condition
  const match = suggestions.find(item => item.condition === condition);
  const suggestion = match ? match.suggestion : "No specific suggestion available. Stay safe!";

  return {
    location: name,
    temperature: main.temp,
    condition,
    suggestion // ✅ include in return
  };
};

module.exports = FetchWeather;
