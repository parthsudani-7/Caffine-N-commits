import { motion } from "framer-motion";
import { styles } from "../../styles/dashboardStyles";

const RiskCard = ({ risk, displayRisk }) => {

  // 🎨 COLOR LOGIC
  const getColor = () => {
    if (risk < 30) return "#00B8A0";   // green/teal
    if (risk < 70) return "#F59E0B";   // orange
    return "#EF4444";                  // red
  };

  // 🧠 LABEL LOGIC
  const getLabel = () => {
    if (risk < 30) return "Low Risk";
    if (risk < 70) return "Moderate Risk";
    return "High Risk";
  };

  const color = getColor();
  const label = getLabel();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className={`${styles.card} relative overflow-hidden`}
    >

      {/* 🏷️ TITLE */}
      <h3 className={styles.cardTitle}>AI Risk Score</h3>

      {/* 🌈 GLOW BACKGROUND */}
      <motion.div
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute inset-0 blur-2xl"
        style={{
          background: color,
          opacity: risk > 70 ? 0.25 : 0.1,
        }}
      />

      {/* 🔥 PROGRESS BAR */}
      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden relative mt-2">
        <motion.div
          animate={{ width: `${risk}%` }}
          transition={{ duration: 0.8 }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, #ffffff20)`,
          }}
        />
      </div>

      {/* 🔢 RISK VALUE */}
      <motion.p
        key={displayRisk}
        initial={{ scale: 0.85 }}
        animate={{
          scale: risk > 70 ? [1, 1.2, 1] : 1,
        }}
        transition={{
          duration: 0.4,
          repeat: risk > 70 ? Infinity : 0,
          repeatDelay: 1,
        }}
        className="mt-3 font-bold text-2xl relative z-10"
        style={{ color }}
      >
        {displayRisk}%
      </motion.p>

      {/* 🧠 RISK LABEL */}
      <p className="text-sm opacity-80 relative z-10">
        {label}
      </p>

      {/* ⚠️ ALERT BADGE */}
      {risk > 70 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded-md w-fit"
        >
          🚨 High Risk Detected
        </motion.div>
      )}

      {/* 🟡 MEDIUM WARNING */}
      {risk >= 30 && risk <= 70 && (
        <div className="mt-2 text-xs text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded-md w-fit">
          ⚠️ Moderate Conditions
        </div>
      )}

      {/* 🟢 SAFE STATE */}
      {risk < 30 && (
        <div className="mt-2 text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-md w-fit">
          ✅ Safe Conditions
        </div>
      )}

    </motion.div>
  );
};

export default RiskCard;