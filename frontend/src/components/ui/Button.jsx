import { motion } from "framer-motion";

const Button = ({ children, className = "", ...props }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`bg-gradient-to-r from-[#00B8A0] to-[#F58A07] text-white px-4 py-2 rounded-xl font-semibold shadow-md active:scale-90 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;