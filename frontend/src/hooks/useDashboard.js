import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { clickSound } from "../utils/sound";
import alertSound from "../assets/alert.mp3";
import { useAuth } from "../context/AuthContext";

export const useDashboard = () => {
  const navigate = useNavigate();

  // ✅ FIXED AUTH (no try-catch)
  const { user } = useAuth();

  const [risk, setRisk] = useState(50);
  const [displayRisk, setDisplayRisk] = useState(0);
  const [alerts, setAlerts] = useState(["Monitoring your zone..."]);
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [riskHistory, setRiskHistory] = useState([]);

  // 👋 GREETING
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // 📍 LOCATION
  useEffect(() => {
    let timeout = setTimeout(() => {
      // fallback if user doesn't allow
      setLocation({ lat: 22.3072, lon: 73.1812 });
    }, 5000);

    if (!navigator.geolocation) {
      setLocation({ lat: 22.3072, lon: 73.1812 });
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        clearTimeout(timeout);
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      () => {
        clearTimeout(timeout);
        setLocation({ lat: 22.3072, lon: 73.1812 });
      }
    );
  }, []);

  // 🌦️ WEATHER
  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `/api/weather?lat=${location.lat}&lon=${location.lon}`
        );

        if (!res.ok) throw new Error("Weather failed");

        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.log("Weather error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  // ⚠️ RISK ENGINE
  useEffect(() => {
    if (!weather) return;

    let interval;

    const updateRisk = (value) => {
      setRisk(value);

      setRiskHistory((prev) => [
        ...prev.slice(-9),
        {
          time: new Date().toLocaleTimeString(),
          risk: value,
        },
      ]);

      if (value >= 80) {
        setAlerts([
          "⚠️ High risk detected",
          "Income disruption probability is high",
        ]);

        setShowNotification(true);

        const audio = new Audio(alertSound);
        audio.play().catch(() => {});

        setTimeout(() => setShowNotification(false), 4000);
      } else {
        setAlerts(["Stable working conditions"]);
      }
    };

    const fetchRisk = async () => {
      try {
        const res = await fetch("/api/risk");
        const data = await res.json();

        if (res.ok && data?.risk !== undefined) {
          updateRisk(data.risk);
          return;
        }
      } catch {
        console.log("Backend risk failed → fallback");
      }

      // 🔁 FALLBACK
      const condition = weather.weather?.[0]?.main?.toLowerCase() || "";

      let calculatedRisk = 30;

      if (condition.includes("rain")) calculatedRisk = 90;
      else if (condition.includes("cloud")) calculatedRisk = 65;
      else if (condition.includes("clear")) calculatedRisk = 20;

      updateRisk(calculatedRisk);
    };

    fetchRisk();
    interval = setInterval(fetchRisk, 5000);

    return () => clearInterval(interval);
  }, [weather]);

  // 🔢 SMOOTH COUNTER
  useEffect(() => {
    let start = displayRisk;
    const end = risk;

    if (start === end) return;

    const increment = (end - start) / 20;

    const timer = setInterval(() => {
      start += increment;

      if (
        (increment > 0 && start >= end) ||
        (increment < 0 && start <= end)
      ) {
        start = end;
        clearInterval(timer);
      }

      setDisplayRisk(Math.round(start));
    }, 16);

    return () => clearInterval(timer);
  }, [risk]);

  // 🔘 CLICK
  const handleClick = (path) => {
    clickSound();
    navigate(path);
  };

  return {
    user,
    risk,
    displayRisk,
    alerts,
    weather,
    loading,
    showNotification,
    riskHistory,
    getGreeting,
    handleClick,
  };
};