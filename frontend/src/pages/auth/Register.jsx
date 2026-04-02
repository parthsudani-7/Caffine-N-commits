import API from "@/config/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("Blinkit");
  const [zone, setZone] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!phone) {
      alert("Enter phone number");
      return;
    }

    await axios.post(`${API}/api/auth/send-otp`, {
      phone,
    });

    setOtpSent(true);
  };

  const handleVerifyOtp = async () => {
    const res = await axios.post(`${API}/api/auth/verify-otp`, {
      phone,
      otp,
    });

    if (res.data.success) {
      console.log({ name, platform, zone, phone });

      localStorage.setItem(
        "user",
        JSON.stringify({ name, phone, platform, zone })
      );

      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="bg-gray-900 p-6 md:p-8 rounded-xl w-full max-w-sm space-y-5">
        <h2 className="text-xl md:text-2xl font-bold text-center">Register</h2>

        <input
          className="w-full p-3 rounded-lg bg-gray-800 text-sm md:text-base"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {!otpSent ? (
          <button
            onClick={handleSendOtp}
            className="w-full bg-blue-500 py-3 rounded-lg text-sm md:text-base active:scale-95 transition"
          >
            Send OTP
          </button>
        ) : (
          <>
            <input
              className="w-full p-3 rounded-lg bg-gray-800 text-sm md:text-base"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-500 py-3 rounded-lg text-sm md:text-base active:scale-95 transition"
            >
              Verify OTP & Continue
            </button>
          </>
        )}

        <input
          className="w-full p-3 rounded-lg bg-gray-800 text-sm md:text-base"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="w-full p-3 rounded-lg bg-gray-800 text-sm md:text-base"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option>Blinkit</option>
          <option>Zepto</option>
          <option>Swiggy</option>
        </select>

        <input
          className="w-full p-3 rounded-lg bg-gray-800 text-sm md:text-base"
          placeholder="Zone"
          value={zone}
          onChange={(e) => setZone(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Register;