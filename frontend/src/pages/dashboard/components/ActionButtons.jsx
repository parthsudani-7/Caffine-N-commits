import { motion } from "framer-motion";
import { styles } from "../styles/dashboardStyles";

const ActionButtons = ({ handleClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className={styles.buttonGrid}
    >

      {/* 🚀 BUY POLICY */}
      <motion.div
        whileHover={{ y: -5 }}
        className={styles.buttonCard}
      >
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleClick("/policy")}
          className={styles.btnPrimary}
        >
          Buy Policy
        </motion.button>
      </motion.div>

      {/* ⚡ RUN SIMULATION */}
      <motion.div
        whileHover={{ y: -5 }}
        className={styles.buttonCard}
      >
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleClick("/simulation")}
          className={styles.btnAction}
        >
          Run Simulation
        </motion.button>
      </motion.div>

      {/* 📄 CLAIMS */}
      <motion.div
        whileHover={{ y: -5 }}
        className={styles.buttonCard}
      >
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleClick("/claims")}
          className={styles.btnSecondary}
        >
          Claims
        </motion.button>
      </motion.div>

    </motion.div>
  );
};

export default ActionButtons;