import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const variants = {
  initial: (direction) => ({
    x: direction === 1 ? 120 : -120,
    opacity: 0,
    scale: 0.96,
    filter: "blur(6px)",
  }),
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (direction) => ({
    x: direction === 1 ? -120 : 120,
    opacity: 0,
    scale: 0.96,
    filter: "blur(6px)",
  }),
};

const PageWrapper = ({ children, direction = 1 }) => {
  const location = useLocation(); // ✅ ADDED

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="min-h-screen bg-[#03152A] text-white"
    >
      {/* ✅ SHOW NAVBAR EXCEPT LANDING */}
      {location.pathname !== "/" && <Navbar />}

      {/* CONTENT */}
      <div className="pt-2">
        {children}
      </div>
    </motion.div>
  );
};

export default PageWrapper;