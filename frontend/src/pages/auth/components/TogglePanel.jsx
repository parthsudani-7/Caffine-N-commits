import { motion, AnimatePresence } from "framer-motion";

const TogglePanel = ({ isLogin, setIsLogin }) => {
  return (
    <motion.div
      animate={{ x: isLogin ? "100%" : "0%" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="absolute top-0 left-0 w-1/2 h-full z-30 
      bg-gradient-to-br from-[#00B8A0]/80 to-[#03152A] 
      backdrop-blur-xl flex items-center justify-center text-white"
    >
      <div className="text-center px-6 pointer-events-auto">

        <AnimatePresence mode="wait">

          {isLogin ? (
            <motion.div
              key="signupText"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl mb-2">New here?</h2>
              <p className="mb-6">Create your account</p>

              <button
                onClick={() => setIsLogin(false)}
                className="border border-white px-6 py-2 rounded hover:bg-white/20 transition"
              >
                Sign Up
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="loginText"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl mb-2">Welcome Back</h2>
              <p className="mb-6">Already have an account?</p>

              <button
                onClick={() => setIsLogin(true)}
                className="border border-white px-6 py-2 rounded hover:bg-white/20 transition"
              >
                Login
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TogglePanel;