import { motion } from "framer-motion";
import { styles } from "../styles/dashboardStyles";

const AlertsSection = ({ alerts }) => {

  // 🎨 ALERT TYPE DETECTION
  const getAlertStyle = (alert) => {
    if (alert.includes("High") || alert.includes("🚨")) {
      return "bg-red-500/20 text-red-400";
    }
    if (alert.includes("Poor") || alert.includes("⚠")) {
      return "bg-yellow-500/20 text-yellow-400";
    }
    if (alert.includes("Rain")) {
      return "bg-blue-500/20 text-blue-400";
    }
    return "bg-white/10 text-white";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className={styles.section}
    >
      {/* 🏷️ TITLE */}
      <h2 className="mb-3 font-semibold">Live Alerts</h2>

      {/* 🧠 EMPTY STATE */}
      {alerts.length === 0 ? (
        <div className="text-green-400 bg-green-500/10 p-3 rounded-lg text-sm">
          ✅ All conditions normal
        </div>
      ) : (
        <div className="space-y-3">

          {alerts.map((alert, i) => (
            <motion.div
              key={i}
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className={`${styles.alertItem} ${getAlertStyle(alert)} flex items-center gap-2`}
            >

              {/* 🔔 ICON BASED ON TYPE */}
              <span className="text-lg">
                {alert.includes("High") ? "🚨" :
                 alert.includes("Poor") ? "🌫" :
                 alert.includes("Rain") ? "🌧" :
                 "⚠"}
              </span>

              {/* 📢 TEXT */}
              <span className="text-sm">{alert}</span>

            </motion.div>
          ))}

        </div>
      )}
    </motion.div>
  );
};

export default AlertsSection;