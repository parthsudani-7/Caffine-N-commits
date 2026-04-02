import { motion } from "framer-motion";
import { styles } from "../styles/dashboardStyles";

const Header = ({ user, getGreeting }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={styles.headerWrapper}
    >
      <h1 className={styles.headerTitle}>
        {getGreeting()} {user?.name || "Rider"} 👋
      </h1>

      <p className={styles.headerSub}>
        AI is protecting your income in real-time
      </p>

      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className={styles.aiBadge}
      >
        🤖 AI Monitoring Active
      </motion.div>
    </motion.div>
  );
};

export default Header;