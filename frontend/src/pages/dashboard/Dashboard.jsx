import API from "@/config/api";
import PageWrapper from "../../components/layout/PageWrapper";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { styles } from "./styles/dashboardStyles";
import GlowBackground from "./components/GlowBackground";
import Header from "./components/Header";
import PlatformCard from "./components/cards/PlatformCard";
import WeatherCard from "./components/cards/WeatherCard";
import RiskCard from "./components/cards/RiskCard";
import AlertsSection from "./components/AlertsSection";
import RiskTrendChart from "./components/RiskTrendChart";
import ActionButtons from "./components/ActionButtons";

const Dashboard = ({ direction }) => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [weather, setWeather] = useState(null);
  const [risk, setRisk] = useState(0);
  const [riskHistory, setRiskHistory] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [policies, setPolicies] = useState([]);

  const [weatherLoading, setWeatherLoading] = useState(true);
  const [error, setError] = useState("");

  const token = user?.token;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const getUserLocation = () => {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        () => resolve({ lat: 19.076, lon: 72.8777 })
      );
    });
  };

  const getFixedPrice = (type) => {
    if (type === "health") return 29;
    if (type === "vehicle") return 49;
    if (type === "life") return 79;
    return 29;
  };

  useEffect(() => {
    if (authLoading) return;

    const fetchData = async () => {
      try {
        if (!token) return;

        const headers = { Authorization: `Bearer ${token}` };

        const location = await getUserLocation();

        const weatherRes = await axios.post(
          `${API}/api/dashboard/weather`,
          { lat: location.lat, lon: location.lon },
          { headers }
        );

        const riskRes = await axios.get(
          `${API}/api/dashboard/risk?lat=${location.lat}&lon=${location.lon}`,
          { headers }
        );

        const policyRes = await axios.get(
          `${API}/api/policies`,
          { headers }
        );

        setWeather(weatherRes.data.data);
        setRisk(riskRes.data.riskScore);
        setRiskHistory(riskRes.data.history);
        setPolicies(policyRes.data.policies || []);
        setWeatherLoading(false);

        const newAlerts = [];
        if (riskRes.data.riskScore > 70) newAlerts.push("🚨 High environmental risk!");
        if (riskRes.data.aqi > 120) newAlerts.push("🌫 Poor air quality detected");
        if (riskRes.data.weatherType === "Rain") newAlerts.push("🌧 Rain may affect deliveries");
        setAlerts(newAlerts);

      } catch {
        setError("Failed to load dashboard data");
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [token, authLoading]);

  const handleClick = (path) => {
    navigate(path);
  };

  if (error) {
    return <div className="text-red-400 p-6">{error}</div>;
  }

  if (!user) {
    return <div className="text-white p-6">User not logged in</div>;
  }

  const activePolicy = policies.find(p => p.status === "active");

  return (
    <PageWrapper direction={direction}>
      <div className={styles.page}>
        <GlowBackground />

        <Header user={user} getGreeting={getGreeting} />

        <div className={styles.grid}>
          <PlatformCard user={user} weather={weather} />
          <WeatherCard weather={weather} loading={weatherLoading} />
          <RiskCard risk={risk} displayRisk={risk} />
        </div>

        {activePolicy && (
          <div className="mt-6 bg-white/10 p-5 rounded-xl">
            <h2 className="text-lg font-semibold mb-3">Active Policy</h2>
            <p className="text-white text-xl font-bold">
              ₹{getFixedPrice(activePolicy.type)} per week
            </p>
            <p className="text-gray-400 text-sm">{activePolicy.type}</p>
            <p className="text-[#00B8A0] font-bold mt-2">
              {activePolicy.status.toUpperCase()}
            </p>
          </div>
        )}

        <AlertsSection alerts={alerts} />

        <RiskTrendChart riskHistory={riskHistory} />

        <ActionButtons handleClick={handleClick} />
      </div>
    </PageWrapper>
  );
};

export default Dashboard;