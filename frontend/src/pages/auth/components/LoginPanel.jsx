import { motion } from "framer-motion";

const LoginPanel = ({
  step,
  phone,
  setPhone,
  otp,
  setOtp,
  loading,
  error,
  handleSendOTP,
  handleVerifyOTP,
  onLoginSuccess,
}) => {

  const handleVerify = async () => {
    try {
      const userData = await handleVerifyOTP();

      console.log("VERIFY RESPONSE:", userData);

      if (userData && userData.token) {
        if (onLoginSuccess) {
          onLoginSuccess(userData);
        }
      } else {
        console.log("❌ No valid userData received");
      }

    } catch (err) {
      console.log("❌ Login failed:", err);
    }
  };

  return (
    <div className="text-white flex flex-col items-center">

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl mb-6 font-semibold"
      >
        Login
      </motion.h2>

      {step === "PHONE" && (
        <>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-3 mb-4 w-64 rounded bg-white text-black"
            placeholder="Phone"
          />

          <button
            onClick={async () => {
              try {
                await handleSendOTP(); 
              } catch (err) {
                console.error(err);
              }
            }}
            className="bg-[#00B8A0] px-6 py-2 rounded text-black font-medium hover:scale-105 transition"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </>
      )}

      {step === "OTP" && (
        <>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="p-3 mb-4 w-64 rounded bg-white text-black"
            placeholder="Enter OTP"
          />

          <button
            onClick={handleVerify}
            className="bg-[#F58A07] px-6 py-2 rounded text-black font-medium hover:scale-105 transition"
          >
            {loading ? "Verifying..." : "Verify OTP"}
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

export default LoginPanel;