const express = require('express');
const router = express.Router();
const { getWeatherData } = require('../Controllers/WeatherControl');

router.get('/:city', getWeatherData);

module.exports = router;