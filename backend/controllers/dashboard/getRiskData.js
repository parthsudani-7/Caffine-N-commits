const Claim = require("../../models/Claim");
const axios = require("axios");

const getRiskData = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    const claims = await Claim.find({ user: req.user._id });

    let riskScore = claims.length * 5;

    let weatherType = "Clear";
    let aqi = 80;
    let zone = "Your Area";

    try {
      if (lat && lon) {

        const weatherRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API}`
        );

        weatherType = weatherRes.data.weather[0].main;

        const aqiRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API}`
        );

        aqi = aqiRes.data.list[0].main.aqi * 50;

        const geoRes = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
        );

        const address = geoRes.data.address || {};

        zone =
          address.suburb ||
          address.neighbourhood ||
          address.village ||
          address.town ||
          address.city ||
          address.county ||
          address.state_district ||
          "Your Area";

        if (weatherType === "Rain") riskScore += 25;
        if (aqi > 120) riskScore += 20;

      }
    } catch (err) {
      console.log("External API failed, fallback used");
    }

    if (riskScore > 100) riskScore = 100;

    res.json({
      riskScore,
      weatherType,
      aqi,
      zone,
      history: claims.map(c => ({
        amount: c.amount,
        status: c.status,
      })),
    });

  } catch (error) {
    res.status(500).json({ error: "Risk error" });
  }
};

module.exports = { getRiskData };