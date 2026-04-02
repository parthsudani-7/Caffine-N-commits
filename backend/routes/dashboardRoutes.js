const express = require("express");
const axios = require("axios");
const { calculateRisk } = require("../services/riskService");

const router = express.Router();

// 🌦️ WEATHER ROUTE
router.post("/weather", async (req, res) => {
  try {
    const { lat, lon } = req.body;

    const weatherRes = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat,
          lon,
          appid: process.env.WEATHER_API,
          units: "metric",
        },
      }
    );

    res.json({
      success: true,
      data: weatherRes.data,
    });

  } catch (error) {
    console.log("❌ WEATHER ERROR:", error.message);
    res.status(500).json({ error: "Weather fetch failed" });
  }
});

// ⚠️ REAL RISK ROUTE
router.get("/risk", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    // 🌦️ WEATHER DATA
    const weatherRes = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat,
          lon,
          appid: process.env.WEATHER_API,
          units: "metric",
        },
      }
    );

    // 🌫️ AQI DATA
    const aqiRes = await axios.get(
      "https://api.openweathermap.org/data/2.5/air_pollution",
      {
        params: {
          lat,
          lon,
          appid: process.env.WEATHER_API,
        },
      }
    );

    const weather = weatherRes.data;
    const aqi = aqiRes.data.list[0].main.aqi * 50; // scale AQI

    // 🧠 CALCULATE RISK
    const riskScore = calculateRisk(weather, aqi);

    // 📊 HISTORY (mock trend)
    const history = [
      riskScore - 10,
      riskScore - 5,
      riskScore,
    ];

    res.json({
      success: true,
      riskScore,
      history,
      weatherType: weather.weather[0].main,
      aqi,
    });

  } catch (error) {
    console.log("❌ RISK ERROR:", error.message);
    res.status(500).json({ error: "Risk fetch failed" });
  }
});

module.exports = router;