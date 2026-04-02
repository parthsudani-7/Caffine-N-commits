import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

import GlassContainer from "./components/GlassContainer";
import LoginPanel from "./components/LoginPanel";
import SignupPanel from "./components/SignupPanel";
import TogglePanel from "./components/TogglePanel";
import useAuthLogic from "./hooks/useAuthLogic";

function Auth() {
  const logic = useAuthLogic();

  const location = useLocation();
  const navigate = useNavigate();

  // 🔥 SAFELY DETERMINE REDIRECT PATH
  const getRedirectPath = () => {
    // Case 1: ProtectedRoute passed full location object
    if (location.state?.from?.pathname) {
      return location.state.from.pathname;
    }

    // Case 2: manually passed string
    if (typeof location.state?.from === "string") {
      return location.state.from;
    }

    // Default fallback
    return "/dashboard";
  };

  const redirectPath = getRedirectPath();

  // ✅ LOGIN / SIGNUP SUCCESS HANDLER
  const handleAuthSuccess = (userData) => {
    if (!userData) return;

    console.log("✅ Auth success, redirecting to:", redirectPath);

    // 🔥 DELAY SLIGHTLY to ensure state is updated
    setTimeout(() => {
      navigate(redirectPath, { replace: true });
    }, 50);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#03152A]">
      <GlassContainer>

        <div className="absolute inset-0 flex z-20">

          {/* LOGIN */}
          <motion.div
            animate={{
              opacity: logic.isLogin ? 1 : 0,
              x: logic.isLogin ? 0 : -40,
            }}
            className="w-1/2 flex justify-center items-center"
          >
            <LoginPanel
              {...logic}
              onLoginSuccess={handleAuthSuccess}
            />
          </motion.div>

          {/* SIGNUP */}
          <motion.div
            animate={{
              opacity: !logic.isLogin ? 1 : 0,
              x: !logic.isLogin ? 0 : 40,
            }}
            className="w-1/2 flex justify-center items-center"
          >
            <SignupPanel
              {...logic}
              onSignupSuccess={handleAuthSuccess} // 🔥 ADD THIS
            />
          </motion.div>

        </div>

        {/* 🔁 TOGGLE PANEL */}
        <TogglePanel
          isLogin={logic.isLogin}
          setIsLogin={logic.setIsLogin}
        />

      </GlassContainer>
    </div>
  );
}

export default Auth;