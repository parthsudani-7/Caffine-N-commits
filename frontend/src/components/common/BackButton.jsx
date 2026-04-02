import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { clickSound } from "../../utils/sound";

const BackButton = ({ label = "Back" }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    clickSound?.(); // safe call
    navigate(-1);
  };

  return (
    <motion.button
      onClick={handleBack}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{
        scale: 1.08,
        backgroundColor: "rgba(255,255,255,0.15)",
      }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="flex items-center gap-2 px-4 py-2 mb-6 rounded-lg 
      bg-white/10 backdrop-blur-md text-sm font-medium 
      border border-white/10 hover:border-white/20 transition"
    >
      ← {label}
    </motion.button>
  );
};

export default BackButton;