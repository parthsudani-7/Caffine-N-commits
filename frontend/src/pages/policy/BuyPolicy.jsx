import API from "@/config/api";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/layout/PageWrapper";
import axios from "axios";
import { showToast } from "../../utils/toast";

const tiers = [
  { name: "Basic", basePrice: 29, coverage: "Weather only", type: "health" },
  { name: "Standard", basePrice: 49, coverage: "Weather + Civic", type: "vehicle" },
  { name: "Premium", basePrice: 79, coverage: "All coverage", type: "life" }
];

const BuyPolicy = ({ direction }) => {
  const [selected, setSelected] = useState(1);
  const [risk, setRisk] = useState(0);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const token =
    user?.token ||
    (localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null);

  const getUserLocation = () => {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          }),
        () => resolve({ lat: 19.076, lon: 72.8777 })
      );
    });
  };

  useEffect(() => {
    const fetchRisk = async () => {
      try {
        const location = await getUserLocation();

        const res = await axios.get(
          `${API}/dashboard/risk?lat=${location.lat}&lon=${location.lon}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setRisk(res.data.riskScore);
      } catch (err) {
        console.error(err);
        setRisk(50);
      }
    };

    if (token) fetchRisk();
  }, [token]);

  const handleCreatePolicy = async () => {
    try {
      const chosen = tiers[selected];

      if (!token) {
        navigate("/auth");
        return;
      }

      setLoading(true);

      await axios.post(
        `${API}/policies/create`,
        {
          type: chosen.type,
          basePrice: chosen.basePrice,
          premium: chosen.basePrice,
          coverage: 10000,
          riskScore: risk,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showToast("✅ Policy Created");
      navigate("/policy");
    } catch (err) {
      console.error(err);
      showToast("❌ Failed to create policy");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper direction={direction}>
      <div className="min-h-screen bg-[#03152A] text-white p-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-6"
        >
          AI Premium Calculator
        </motion.h1>

        <div className="mb-10">
          <div className="text-sm mb-2 text-gray-400">
            Zone Risk Score
          </div>

          <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${risk}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-[#00B8A0]"
            />
          </div>

          <div className="mt-2 text-[#00B8A0] font-bold">
            {risk}% RISK
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelected(index)}
              className={`p-6 rounded-xl cursor-pointer border ${
                selected === index
                  ? "border-[#00B8A0] bg-[#06263d]"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <h2 className="text-xl font-semibold mb-2">
                {tier.name}
              </h2>

              <p className="text-sm text-gray-400 mb-4">
                {tier.coverage}
              </p>

              <div className="text-3xl font-bold text-[#00B8A0]">
                ₹{tier.basePrice}
              </div>

              <div className="text-xs text-gray-400 mt-1">
                per week
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10"
        >
          <button
            onClick={handleCreatePolicy}
            disabled={loading}
            className="w-full py-4 rounded-xl text-lg font-bold bg-[#F58A07] hover:bg-[#d97706] transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Policy 🚀"}
          </button>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default BuyPolicy;