import { motion, useMotionValue, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { clickSound } from "../utils/sound";
import PageWrapper from "../components/layout/PageWrapper";

const Landing = ({ direction }) => {
  const navigate = useNavigate();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const handleClick = () => {
    clickSound();
    if (navigator.vibrate) navigator.vibrate(50);
    navigate("/auth");
  };

  return (
    <PageWrapper direction={direction}>
    <div className="min-h-screen bg-[#03152A] text-white flex flex-col items-center justify-center relative overflow-hidden">

      {/* 🔥 CURSOR GLOW */}
      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="pointer-events-none fixed w-[300px] h-[300px] bg-[#00B8A0]/20 rounded-full blur-3xl z-0"
      />

      {/* 🔥 PARALLAX BLOBS */}
      <motion.div
        style={{
          x: useSpring(mouseX, { stiffness: 50 }),
          y: useSpring(mouseY, { stiffness: 50 }),
        }}
        className="absolute w-[600px] h-[600px] bg-[#00B8A0] opacity-20 rounded-full blur-3xl"
      />

      <motion.div
        style={{
          x: useSpring(mouseX, { stiffness: 30 }),
          y: useSpring(mouseY, { stiffness: 30 }),
        }}
        className="absolute w-[400px] h-[400px] bg-[#F58A07] opacity-20 rounded-full blur-3xl bottom-[-100px] right-[-100px]"
      />

      {/* 🛡️ TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-bold mb-4 z-10 text-center"
      >
        <span className="bg-gradient-to-r from-[#00B8A0] to-white bg-clip-text text-transparent">
          GigShield
        </span>{" "}
        🛡️
      </motion.h1>

      {/* 📊 STATS (NEW 🔥) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex gap-6 mb-6 z-10"
      >
        {[
          { label: "Riders Protected", value: "10K+" },
          { label: "Claims Processed", value: "5K+" },
          { label: "Avg Payout", value: "₹1200" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.2 }}
            className="text-center"
          >
            <p className="text-2xl font-bold text-[#00B8A0]">{item.value}</p>
            <p className="text-xs text-gray-400">{item.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* 📄 SUBTEXT */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-gray-400 mb-8 z-10 text-center"
      >
        AI-powered income protection for delivery riders
      </motion.p>

      {/* 🚀 BUTTON */}
      <motion.button
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 0px 40px rgba(0,184,160,0.8)",
        }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        className="relative px-10 py-3 rounded-xl z-10 font-semibold text-black bg-[#00B8A0] overflow-hidden"
      >
        {/* SHIMMER */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
        <span className="relative z-10">Get Started 🚀</span>
      </motion.button>

    </div>
    </PageWrapper>
  );
};

export default Landing;