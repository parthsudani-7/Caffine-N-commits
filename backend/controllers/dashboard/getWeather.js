const axios = require("axios");

const getWeather = async (req, res) => {
  try {
    const { lat, lon } = req.body;

    // 🔥 VALIDATION
    if (!lat || !lon) {
      return res.status(400).json({
        error: "Latitude and Longitude required",
      });
    }

    const apiKey = process.env.WEATHER_API;

    if (!apiKey) {
      console.log("❌ WEATHER_API_KEY missing in .env");
      return res.status(500).json({
        error: "Weather API key not configured",
      });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat,
          lon,
          appid: apiKey,
          units: "metric",
        },
      }
    );

    const data = response.data;

    res.json({
      temp: data.main?.temp,
      condition: data.weather?.[0]?.main,
      city: data.name,
    });

  } catch (error) {
    console.log("🔥 WEATHER ERROR FULL:", error.response?.data || error.message);

    res.status(500).json({
      error: "Weather fetch failed",
    });
  }
};

module.exports = { getWeather };