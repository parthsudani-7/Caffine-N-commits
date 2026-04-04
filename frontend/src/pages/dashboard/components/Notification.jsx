import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../styles/dashboardStyles";

const Notification = ({ show = true, type = "high" }) => {
  
  const getColor = () => {
    if (type === "high") return "#F58A07"; 
    return "#00B8A0"; // teal
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={`${styles.notificationWrapper} relative z-50`}
        >

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`${styles.notificationBox} relative overflow-hidden backdrop-blur-xl border`}
            style={{
              borderColor: `${getColor()}40`,
              background: "rgba(3,21,42,0.8)",
            }}
          >

            {/* 🌈 GLOW BACKGROUND */}
            <motion.div
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 blur-2xl"
              style={{
                background: getColor(),
                opacity: 0.15,
              }}
            />

            <div className="flex items-start gap-3 relative z-10">

              {/* 🔥 ICON PULSE */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="text-xl"
                style={{ color: getColor() }}
              >
                ⚠️
              </motion.div>

              <div>
                <p className={`${styles.notificationTitle} text-white`}>
                  High Risk Alert
                </p>

                <p className={`${styles.notificationText} text-gray-300`}>
                  Rain detected in your area. Income may be affected.
                </p>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;