const FetchWeather = require('../Utils/FetchWeather');

const getWeatherData = async (req, res) => {
  const { city } = req.params;
  try {
    const weatherInfo = await FetchWeather(city);
    console.log("fetch back call");
    res.json(weatherInfo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data' });
  }
};

module.exports = { getWeatherData };