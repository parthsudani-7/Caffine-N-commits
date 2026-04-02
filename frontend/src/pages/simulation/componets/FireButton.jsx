import { motion } from "framer-motion";

const FireButton = ({ handleFire, firing }) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.08,
        boxShadow: "0px 0px 30px rgba(245,138,7,0.7)",
      }}
      whileTap={{ scale: 0.9 }}
      onClick={handleFire}
      className="w-full py-4 rounded-xl bg-[#F58A07] text-black font-bold mb-8"
    >
      {firing ? "Processing..." : "Fire Trigger 🚀"}
    </motion.button>
  );
};

export default FireButton;