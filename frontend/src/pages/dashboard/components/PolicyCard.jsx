import { motion } from "framer-motion";
import { styles } from "../styles/dashboardStyles";

const PolicyCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className={`${styles.card} ${styles.section}`}
    >
      <h2 className="mb-4 font-semibold">Active Policy</h2>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-bold">Standard Plan</p>
          <p className="text-gray-400">₹49/week</p>
        </div>

        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-green-400 font-bold"
        >
          ACTIVE
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PolicyCard;