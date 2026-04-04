// 🌦️ Risk Calculation Logic

const calculateRisk = (weather, aqi) => {
  let risk = 0;

  if (weather.weather[0].main === "Rain") {
    risk += 30;
  }

  const temp = weather.main.temp;
  if (temp > 40) risk += 20;
  else if (temp < 5) risk += 15;

  const wind = weather.wind.speed;
  if (wind > 10) risk += 15;

  if (aqi > 150) risk += 25;
  else if (aqi > 100) risk += 15;

  if (risk > 100) risk = 100;

  return risk;
};

module.exports = { calculateRisk };