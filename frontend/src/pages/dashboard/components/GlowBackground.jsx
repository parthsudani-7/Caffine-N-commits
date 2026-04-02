import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const GlowBackground = () => {

  // 🔥 CURSOR TRACKING
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <>
      {/* 🔥 CURSOR GLOW (MAIN EFFECT) */}
      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="pointer-events-none fixed w-[300px] h-[300px] 
        bg-[#00B8A0]/20 rounded-full blur-3xl z-0"
      />

      {/* 🌊 MAIN FLOATING GLOW */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.25, 0.1, 0.25],
        }}
        transition={{ repeat: Infinity, duration: 12 }}
        className="absolute w-[700px] h-[700px] 
        bg-[#00B8A0]/20 rounded-full blur-3xl 
        top-[-200px] left-[-200px]"
      />

      {/* ⚡ SECONDARY ORANGE GLOW */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.05, 0.15],
        }}
        transition={{ repeat: Infinity, duration: 14 }}
        className="absolute w-[500px] h-[500px] 
        bg-[#F58A07]/20 rounded-full blur-3xl 
        bottom-[-150px] right-[-150px]"
      />

      {/* 🧠 DEPTH LIGHT (CENTER FADE) */}
      <motion.div
        animate={{
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute inset-0 
        bg-[radial-gradient(circle_at_center,rgba(0,184,160,0.12),transparent_70%)]"
      />
    </>
  );
};

export default GlowBackground;