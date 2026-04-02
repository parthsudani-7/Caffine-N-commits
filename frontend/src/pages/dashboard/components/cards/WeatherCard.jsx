import { motion } from "framer-motion";

const WeatherCard = ({ weather, loading }) => {

  // 🌡️ TEMP COLOR LOGIC
  const getTempColor = (temp) => {
    if (temp < 15) return "text-blue-400";
    if (temp < 30) return "text-green-400";
    return "text-red-400";
  };

  if (loading) {
    return (
      <div className="bg-white/10 p-5 rounded-2xl text-white backdrop-blur-lg">
        Loading weather...
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="bg-red-500/20 p-5 rounded-2xl text-white">
        Weather not available
      </div>
    );
  }

  const temp = weather.main.temp;
  const color = getTempColor(temp);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-gradient-to-br from-blue-500/20 to-cyan-400/10 backdrop-blur-lg p-5 rounded-2xl shadow-lg text-white flex flex-col items-center relative overflow-hidden"
    >

      {/* 🌈 GLOW BACKGROUND */}
      <motion.div
        animate={{ opacity: [0.1, 0.25, 0.1] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute inset-0 blur-2xl"
        style={{ background: "#3B82F6" }}
      />

      {/* 📍 CITY */}
      <h2 className="text-lg font-semibold relative z-10">
        {weather.name}
      </h2>

      {/* 🌦️ ICON */}
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
        className="relative z-10"
      />

      {/* 🌡️ TEMPERATURE */}
      <p className={`text-3xl font-bold ${color} relative z-10`}>
        {temp}°C
      </p>

      {/* 🌤 DESCRIPTION */}
      <p className="capitalize text-sm opacity-80 relative z-10">
        {weather.weather[0].description}
      </p>

      {/* 📊 EXTRA INFO */}
      <div className="flex gap-4 mt-3 text-xs opacity-90 relative z-10">
        <div className="bg-white/10 px-2 py-1 rounded-md">
          💧 {weather.main.humidity}%
        </div>
        <div className="bg-white/10 px-2 py-1 rounded-md">
          🌬 {weather.wind.speed} m/s
        </div>
      </div>

      {/* 🔥 CONDITION TAG */}
      <div className="mt-3 text-xs bg-white/10 px-3 py-1 rounded-full relative z-10">
        {weather.weather[0].main}
      </div>

    </motion.div>
  );
};

export default WeatherCard;