import { motion } from "framer-motion";

const SignupPanel = ({
  signupStep,
  signupPhone,
  setSignupPhone,
  signupOtp,
  setSignupOtp,
  name,
  setName,
  platform,
  setPlatform,
  zone,
  setZone,
  loading,
  error,
  handleSignupSendOTP,
  handleSignupVerifyOTP,
  handleSignup,
  onSignupSuccess, // 🔥 IMPORTANT PROP
}) => {

  // 🔥 HANDLE FINAL SIGNUP FLOW
  const handleFinalSignup = async () => {
    try {
      const userData = await handleSignup();

      console.log("SIGNUP RESPONSE:", userData);

      if (userData && onSignupSuccess) {
        onSignupSuccess(userData); // ✅ TRIGGER REDIRECT
      }

    } catch (err) {
      console.log("❌ Signup failed:", err);
    }
  };

  return (
    <div className="text-white flex flex-col items-center">

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl mb-6 font-semibold"
      >
        Sign Up
      </motion.h2>

      {signupStep === "PHONE" && (
        <>
          <input
            value={signupPhone}
            onChange={(e) => setSignupPhone(e.target.value)}
            className="p-3 mb-4 w-64 rounded bg-white text-black"
            placeholder="Phone"
          />

          <button
            onClick={handleSignupSendOTP}
            className="bg-[#00B8A0] px-6 py-2 rounded text-black font-medium"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </>
      )}

      {signupStep === "OTP" && (
        <>
          <input
            value={signupOtp}
            onChange={(e) => setSignupOtp(e.target.value)}
            className="p-3 mb-4 w-64 rounded bg-white text-black"
            placeholder="Enter OTP"
          />

          <button
            onClick={handleSignupVerifyOTP}
            className="bg-[#F58A07] px-6 py-2 rounded text-black font-medium"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </>
      )}

      {signupStep === "VERIFIED" && (
        <>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 mb-3 w-64 rounded bg-white text-black"
            placeholder="Name"
          />

          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="p-3 mb-3 w-64 rounded bg-white text-black"
          >
            <option>Blinkit</option>
            <option>Zepto</option>
            <option>Swiggy</option>
          </select>

          <input
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="p-3 mb-4 w-64 rounded bg-white text-black"
            placeholder="Zone"
          />

          <button
            onClick={handleFinalSignup} // 🔥 FIXED HERE
            className="bg-[#F58A07] px-6 py-2 rounded text-black font-semibold hover:scale-105 transition"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </>
      )}

      {error && (
        <p className="text-red-400 mt-3 text-sm text-center">
          {error}
        </p>
      )}
    </div>
  );
};

export default SignupPanel;