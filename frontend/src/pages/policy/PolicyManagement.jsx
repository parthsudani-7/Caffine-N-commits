import API from "@/config/api";
import { showToast } from "../../utils/toast";
import PageWrapper from "../../components/layout/PageWrapper";
import GlowBackground from "../dashboard/components/GlowBackground";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PolicyManagement = ({ direction }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const token = user?.token;

  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFixedPrice = (type) => {
    if (type === "health") return 29;
    if (type === "vehicle") return 49;
    if (type === "life") return 79;
    return 29;
  };

  const getEvent = (policy) => {
    if (policy.status === "cancelled") return "CANCELLED";
    const created = new Date(policy.createdAt).getTime();
    const updated = new Date(policy.updatedAt).getTime();
    if (updated > created) return "UPDATED";
    return "CREATED";
  };

  const fetchPolicies = async () => {
    try {
      const res = await axios.get(
        `${API}/policies`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPolicies(res.data.policies || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchPolicies();
    const interval = setInterval(fetchPolicies, 3000);
    return () => clearInterval(interval);
  }, [token]);

  const handleCancel = async (id) => {
    try {
      setLoading(true);

      await axios.put(
        `${API}/policies/cancel/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showToast("❌ Policy Cancelled");
      await fetchPolicies();
    } catch (err) {
      console.error(err);
      showToast("Error cancelling policy");
    }
    setLoading(false);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const goToBuyPolicy = () => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    if (!parsedUser || !parsedUser.token) {
      navigate("/auth", { state: { from: "/buy-policy" }, replace: true });
      return;
    }
    navigate("/buy-policy");
  };

  if (!user) {
    return <div className="text-white p-6">User not logged in</div>;
  }

  return (
    <PageWrapper direction={direction}>
      <div className="relative min-h-screen bg-[#03152A] text-white overflow-hidden">
        <GlowBackground />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto p-6 relative z-10">

          <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span>Policy Management</span>
            <span className="text-[#00B8A0]">🛡️</span>
          </h1>

          {policies.length === 0 ? (
            <div className="text-center mt-16">
              <p className="text-gray-400 mb-6 text-lg">No policy found 📭</p>
              <button onClick={goToBuyPolicy} className="bg-[#F58A07] px-6 py-3 rounded-xl text-white font-bold hover:bg-[#d97706]">
                Buy Policy 🚀
              </button>
            </div>
          ) : (
            <div className="space-y-6">

              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4">Active Policy</h2>

                {policies.filter(p => p.status === "active").slice(0,1).map((policy) => (
                  <div key={policy._id}>
                    <div className="grid grid-cols-2 gap-4 text-gray-300">

                      <p>Policy No:<span className="text-white ml-1">{policy.policyNumber}</span></p>
                      <p>Type:<span className="text-white ml-1">{policy.type}</span></p>
                      <p>Coverage:<span className="text-white ml-1">₹{policy.coverage}</span></p>
                      <p>Premium:<span className="text-[#00B8A0] ml-1">₹{getFixedPrice(policy.type)}</span></p>
                      <p>Risk:<span className="text-white ml-1">{policy.riskScore}%</span></p>
                      <p>Created:<span className="text-white ml-1">{formatDate(policy.createdAt)}</span></p>

                    </div>

                    <p className="mt-4 font-bold text-[#00B8A0]">
                      ● {policy.status.toUpperCase()}
                    </p>

                    <div className="flex gap-4 mt-4">
                      <button
                        onClick={() => handleCancel(policy._id)}
                        disabled={loading}
                        className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50"
                      >
                        {loading ? "Processing..." : "Cancel"}
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h2 className="text-lg font-semibold">Policy History</h2>

                {policies.map((policy, i) => (
                  <motion.div
                    key={policy._id}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex justify-between bg-white/5 px-4 py-3 rounded-lg"
                  >
                    <div>
                      <p className="text-white text-sm">{policy.type}</p>
                      <p className="text-gray-400 text-xs">{formatDate(policy.updatedAt)}</p>
                    </div>
                    <span className="text-[#00B8A0]">
                      ₹{policy.premium}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-6">
                <button
                  onClick={goToBuyPolicy}
                  className="bg-[#F58A07] px-6 py-3 rounded-xl font-bold hover:bg-[#d97706]"
                >
                  Buy New Policy
                </button>
              </div>

            </div>
          )}

        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default PolicyManagement;