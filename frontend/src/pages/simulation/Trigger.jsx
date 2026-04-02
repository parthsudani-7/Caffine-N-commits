import API from "@/config/api";
import PageWrapper from "../../components/layout/PageWrapper";
import GlowBackground from "../dashboard/components/GlowBackground";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const Trigger = ({ direction }) => {
const { user } = useAuth();
const token = user?.token;

const [risk, setRisk] = useState(0);
const [weather, setWeather] = useState(null);
const [aqi, setAqi] = useState(0);
const [loading, setLoading] = useState(false);
const [result, setResult] = useState(null);

const getLocation = () => {
return new Promise((resolve) => {
navigator.geolocation.getCurrentPosition(
(pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
() => resolve({ lat: 19.076, lon: 72.8777 })
);
});
};

const getZone = () => {
if (!weather) return "Loading...";
return weather?.name || "Unknown";
};

const getRiskLevel = () => {
if (risk > 75) return "EXTREME";
if (risk > 60) return "HIGH";
if (risk > 40) return "MEDIUM";
return "LOW";
};

const getSuggestion = () => {
if (risk > 70) return "🚨 Claim earnings now";
if (risk > 50) return "⚠ Avoid risky zones";
return "✅ Safe to work";
};

useEffect(() => {
const fetchData = async () => {
try {
const loc = await getLocation();

const weatherRes = await axios.post(
`${API}/dashboard/weather`,
{ lat: loc.lat, lon: loc.lon },
{ headers: { Authorization: `Bearer ${token}` } }
);

const riskRes = await axios.get(
`${API}/dashboard/risk?lat=${loc.lat}&lon=${loc.lon}`,
{ headers: { Authorization: `Bearer ${token}` } }
);

setWeather(weatherRes.data.data);
setRisk(riskRes.data.riskScore);
setAqi(riskRes.data.aqi);

} catch {
setRisk(50);
setAqi(70);
}
};

if (token) fetchData();
}, [token]);

const handleSimulate = async () => {
setLoading(true);
setResult(null);

setTimeout(async () => {
const approved = risk > 60;
const payout = approved ? Math.floor(200 + risk * 3) : 0;

setResult({
status: approved ? "HIGH RISK EVENT" : "SAFE ZONE",
payout,
suggestion: getSuggestion(),
nextRisk: risk + Math.floor(Math.random() * 10)
});

if (approved) {
try {
await axios.post(
`${API}/api/claims`,
{
amount: payout,
reason: "Simulation Auto Claim"
},
{ headers: { Authorization: `Bearer ${token}` } }
);
} catch {}
}

setLoading(false);
}, 1200);
};

return (
<PageWrapper direction={direction}>
<div className="relative min-h-screen bg-[#03152A] text-white overflow-hidden">
<GlowBackground />

<div className="p-6 relative z-10">

<h1 className="text-3xl font-bold mb-6">
Live AI Simulation ⚡
</h1>

<div className="grid md:grid-cols-4 gap-4 mb-6">

<div className="bg-white/5 p-4 rounded-xl text-center">
<p className="text-gray-400">Zone</p>
<p className="font-bold">{getZone()}</p>
</div>

<div className="bg-white/5 p-4 rounded-xl text-center">
<p className="text-gray-400">Weather</p>
<p className="font-bold">{weather?.weather?.[0]?.main || "Loading"}</p>
</div>

<div className="bg-white/5 p-4 rounded-xl text-center">
<p className="text-gray-400">AQI</p>
<p className="font-bold">{aqi}</p>
</div>

<div className="bg-white/5 p-4 rounded-xl text-center">
<p className="text-gray-400">Risk</p>
<p className="font-bold">{risk}%</p>
<p className="text-xs">{getRiskLevel()}</p>
</div>

</div>

<div className="mb-6 text-center text-sm text-gray-400">
Real-time AI analyzing your delivery risk based on live environment
</div>

<div className="text-center mb-6 text-yellow-300 font-semibold">
{getSuggestion()}
</div>

<motion.button
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
onClick={handleSimulate}
className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00B8A0] to-[#F58A07] font-bold mb-8"
>
Run AI Simulation 🚀
</motion.button>

{loading && (
<div className="text-center text-[#00B8A0] text-xl font-bold">
⚡ Processing live environment...
</div>
)}

{result && (
<motion.div
initial={{ scale: 0, rotate: -3 }}
animate={{ scale: 1, rotate: 0 }}
className="p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 text-center shadow-2xl"
>
<p className="text-2xl font-bold mb-2">
{result.status}
</p>

<p className="text-3xl font-bold text-[#00B8A0] mb-2">
₹{result.payout}
</p>

<p className="text-gray-400 mb-2">
{result.suggestion}
</p>

<div className="text-xs text-gray-500">
AI Confidence: {Math.min(95, risk + 10)}%
</div>
</motion.div>
)}

</div>
</div>
</PageWrapper>
);
};

export default Trigger;