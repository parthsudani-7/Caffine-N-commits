import API from "@/config/api";
import PageWrapper from "../../components/layout/PageWrapper";
import GlowBackground from "../dashboard/components/GlowBackground";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import claimSound from "../../assets/sounds/claim.mp3";
import { showToast } from "../../utils/toast";

const ClaimResult = ({ direction }) => {
  const { user } = useAuth();
  const token = user?.token;

  const [claims, setClaims] = useState([]);
  const [displayTotal, setDisplayTotal] = useState(0);

  const fetchClaims = async () => {
    try {
      const res = await axios.get(
        `${API}/api/claims`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const data = res.data.claims || [];

      if (data.length > claims.length) {
        const audio = new Audio(claimSound);
        audio.volume = 0.6;
        audio.play().catch(() => {});
        showToast("💰 New earning added");
      }

      setClaims(data);

    } catch (err) {
      console.log("Claim fetch error", err);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchClaims();
  }, [token]);

  useEffect(() => {
    const total = claims.reduce((acc, c) => acc + (c.amount || 0), 0);

    let start = 0;
    const increment = total / 40;

    const counter = setInterval(() => {
      start += increment;
      if (start >= total) {
        setDisplayTotal(total);
        clearInterval(counter);
      } else {
        setDisplayTotal(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [claims]);

  const today = new Date().toDateString();

  const todayAmount = claims
    .filter(c => new Date(c.createdAt).toDateString() === today)
    .reduce((sum, c) => sum + c.amount, 0);

  return (
    <PageWrapper direction={direction}>
      <div className="relative min-h-screen bg-[#03152A] text-white overflow-hidden">
        <GlowBackground />

        <div className="p-6 relative z-10">

          <h1 className="text-3xl font-bold mb-6">
            Claims Dashboard 💰
          </h1>

          <div className="mb-6 p-5 rounded-xl bg-white/5 text-center">
            <p className="text-gray-400 text-sm">Today's Earnings</p>
            <p className="text-2xl font-bold text-[#F58A07]">
              ₹{todayAmount}
            </p>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {claims.map((claim, i) => (
                <motion.div
                  key={claim._id}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="p-5 rounded-xl bg-white/5 flex justify-between"
                >
                  <div>
                    <p className="text-sm text-gray-400">
                      {new Date(claim.createdAt).toLocaleDateString("en-IN")}
                    </p>
                    <p className="text-lg font-semibold">
                      {claim.reason}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[#00B8A0] font-bold">
                      {claim.status.toUpperCase()}
                    </p>
                    <p className="text-xl font-bold">
                      ₹{claim.amount}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-10 p-6 rounded-xl bg-[#00B8A0]/10 border border-[#00B8A0]/30 text-center">
            <h2 className="text-xl font-bold">
              Total Protected Earnings
            </h2>
            <p className="text-3xl font-bold mt-2 text-[#00B8A0]">
              ₹{displayTotal}
            </p>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
};

export default ClaimResult;