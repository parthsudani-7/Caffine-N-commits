// 🌦️ Risk Calculation Logic

const calculateRisk = (weather, aqi) => {
  let risk = 0;

  // 🌧️ Rain risk
  if (weather.weather[0].main === "Rain") {
    risk += 30;
  }

  // 🌡️ Temperature risk
  const temp = weather.main.temp;
  if (temp > 40) risk += 20;
  else if (temp < 5) risk += 15;

  // 🌬️ Wind risk
  const wind = weather.wind.speed;
  if (wind > 10) risk += 15;

  // 🌫️ AQI risk
  if (aqi > 150) risk += 25;
  else if (aqi > 100) risk += 15;

  // 🔒 Clamp to 100
  if (risk > 100) risk = 100;

  return risk;
};

module.exports = { calculateRisk };