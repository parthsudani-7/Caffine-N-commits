import { useState } from "react";
import { sendOTP, verifyOTP } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("PHONE");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSendOTP = async () => {
    if (!phone) return alert("Enter phone number");

    setLoading(true);
    await sendOTP(phone);
    setStep("OTP");
    setLoading(false);
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    const res = await verifyOTP(phone, otp);

    if (res.success) {
      login(res.user);
      if (res.isNewUser) navigate("/register");
      else navigate("/dashboard");
    } else {
      alert("Invalid OTP");
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-sm mx-auto px-4 space-y-6">

      <h2 className="text-xl md:text-2xl font-bold text-center">
        Login
      </h2>

      {step === "PHONE" && (
        <div className="space-y-4">

          <input
            className="w-full p-3 rounded-lg bg-gray-800 text-sm md:text-base 
            focus:outline-none focus:ring-2 focus:ring-[#00B8A0] transition"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            onClick={handleSendOTP}
            disabled={loading}
            className="w-full bg-blue-500 py-3 rounded-lg text-sm md:text-base 
            active:scale-95 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>

        </div>
      )}

      {step === "OTP" && (
        <div className="space-y-4">

          <input
            className="w-full p-3 rounded-lg bg-gray-800 text-sm md:text-base 
            focus:outline-none focus:ring-2 focus:ring-[#00B8A0] transition"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            onClick={handleVerifyOTP}
            disabled={loading}
            className="w-full bg-green-500 py-3 rounded-lg text-sm md:text-base 
            active:scale-95 transition disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

        </div>
      )}

    </div>
  );
};

export default Login;