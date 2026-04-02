import API from "@/config/api";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const useAuthLogic = () => {

  // 🔁 TOGGLE
  const [isLogin, setIsLogin] = useState(true);

  // 🔐 LOGIN STATES
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("PHONE");

  // 🆕 SIGNUP STATES
  const [name, setName] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupOtp, setSignupOtp] = useState("");
  const [signupStep, setSignupStep] = useState("PHONE");

  // 🆕 EXTRA SIGNUP DATA
  const [platform, setPlatform] = useState("Blinkit");
  const [zone, setZone] = useState("");

  // ⚙️ COMMON STATES
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, user } = useAuth();
  const handleSendOTP = async () => {
    setError("");

    if (!phone || phone.length !== 10 || !/^\d+$/.test(phone)) {
      setError("Enter valid 10-digit mobile number");
      return;
    }

    setLoading(true);

    try {
  const res = await axios.post(`${API}/api/auth/send-otp`, {
  phone,
  type: "login",
});

setError(`OTP (Demo): ${res.data.otp}`); // 🔥 SHOW IN UI

  setStep("OTP");

} catch (err) {
  const msg = err.response?.data?.error;

  if (msg === "User not found. Please sign up.") {
    setIsLogin(false);               // 🔥 SWITCH TO SIGNUP
    setSignupPhone(phone);           // 🔥 PASS PHONE
    setSignupStep("PHONE");
  }

  setError(msg || "Something went wrong");
}

    setLoading(false);
  };

const handleVerifyOTP = async () => {
  setError("");
  setLoading(true);

  try {
    const res = await axios.post(
      `${API}/api/auth/verify-otp`,
      {
        phone,
        otp,
        type: "login",
      }
    );

    const data = res.data;

    if (data.success) {
      const userData = {
        ...data.user,
        token: data.token,
      };

      // ✅ SAVE USER
      login(userData);

      // 🔥 IMPORTANT: RETURN DATA (NOT navigate)
      return userData;

    } else {
      setError("Invalid OTP");
      return null;
    }

  } catch (err) {
    setError(err.response?.data?.error || "Verification failed");
    return null;
  } finally {
    setLoading(false);
  }
};

  // =========================
  // 🆕 SIGNUP FLOW
  // =========================

  const handleSignupSendOTP = async () => {
    setError("");

    if (!signupPhone || signupPhone.length !== 10 || !/^\d+$/.test(signupPhone)) {
      setError("Enter valid 10-digit mobile number");
      return;
    }

    setLoading(true);

    try {
    const res = await axios.post(`${API}/api/auth/send-otp`, {
    phone: signupPhone,
    type: "signup",
    });

    setError(`OTP (Demo): ${res.data.otp}`); // 🔥 SHOW IN UI

  setSignupStep("OTP");

} catch (err) {
  const msg = err.response?.data?.error;

  if (msg === "User already exists. Please login.") {
    setIsLogin(true);              // 🔥 SWITCH TO LOGIN
    setPhone(signupPhone);         // 🔥 PASS PHONE
    setStep("PHONE");
  }

  setError(msg || "Something went wrong");
}

    setLoading(false);
  };

  const handleSignupVerifyOTP = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${API}/api/auth/verify-otp`,
        {
          phone: signupPhone,
          otp: signupOtp,
          type: "signup", // 🔥 IMPORTANT
        }
      );

      const data = res.data;

      if (data.success) {
        setSignupStep("VERIFIED");   // ✅ ONLY move to form
      } else {
        setError("Invalid OTP");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Verification failed");
    }

    setLoading(false);
  };

  const handleSignup = async () => {
  setError("");

  if (!name || !signupPhone || !zone) {
    setError("Fill all fields");
    return;
  }

  try {
    const res = await axios.post(
      `${API}/api/auth/complete-profile`,
      {
        phone: signupPhone,
        name,
        platform,
        zone,
      }
    );

    const userData = {
        ...res.data.user,
        token: res.data.token, // 🔥 IMPORTANT
      };

      login(userData);

      // 🔥 RETURN DATA (LIKE LOGIN FLOW)
      return userData;

  } catch (err) {
    setError(err.response?.data?.error || "Signup failed");
  }
};

  // =========================
  // 📦 RETURN ALL
  // =========================

  return {

    // toggle
    isLogin,
    setIsLogin,

    // login
    phone,
    setPhone,
    otp,
    setOtp,
    step,

    // signup
    name,
    setName,
    signupPhone,
    setSignupPhone,
    signupOtp,
    setSignupOtp,
    signupStep,
    platform,
    setPlatform,
    zone,
    setZone,

    // states
    loading,
    error,

    // handlers
    handleSendOTP,
    handleVerifyOTP,
    handleSignupSendOTP,
    handleSignupVerifyOTP,
    handleSignup,
  };
};

export default useAuthLogic;