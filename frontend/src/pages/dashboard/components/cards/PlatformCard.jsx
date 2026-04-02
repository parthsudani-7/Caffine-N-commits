import { motion } from "framer-motion";
import { styles } from "../../styles/dashboardStyles";

const PlatformCard = ({ user, weather }) => {
  const getZone = () => {
    if (!weather) return "Loading...";
    return weather?.name || weather?.location?.name || "Unknown";
  };

  const zone = getZone();

  const getRiskTag = () => {
    if (!weather) return "Analyzing...";
    const temp = weather?.main?.temp;
    if (temp > 35) return "High Heat";
    if (temp < 15) return "Cold Risk";
    return "Normal Conditions";
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={styles.card}
    >
      <h3 className={styles.cardTitle}>Platform</h3>

      <p className="text-xl font-semibold">
        {user?.platform || "Blinkit"}
      </p>

      <p className="text-gray-400 mt-2">
        Zone: {zone}
      </p>

      <p className="text-sm mt-2 text-[#00B8A0]">
        {getRiskTag()}
      </p>
    </motion.div>
  );
};

export default PlatformCard;