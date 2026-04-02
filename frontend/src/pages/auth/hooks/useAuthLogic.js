import API from "@/config/api";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const useAuthLogic = () => {

  const [isLogin, setIsLogin] = useState(true);

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("PHONE");

  const [name, setName] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupOtp, setSignupOtp] = useState("");
  const [signupStep, setSignupStep] = useState("PHONE");

  const [platform, setPlatform] = useState("Blinkit");
  const [zone, setZone] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  // =========================
  // 🔐 LOGIN FLOW
  // =========================

  const handleSendOTP = async () => {
    setError("");

    if (!phone || phone.length !== 10 || !/^\d+$/.test(phone)) {
      setError("Enter valid 10-digit mobile number");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${API}/auth/send-otp`, {
        phone,
        type: "login",
      });

      console.log("OTP RESPONSE:", res.data);

      setError(`OTP (Demo): ${res.data.otp}`);
      setStep("OTP");

    } catch (err) {
      const msg = err.response?.data?.error;

      if (msg === "User not found. Please sign up.") {
        setIsLogin(false);
        setSignupPhone(phone);
        setSignupStep("PHONE");
      }

      setError(msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${API}/auth/verify-otp`, {
        phone,
        otp,
        type: "login",
      });

      const data = res.data;

      console.log("VERIFY RESPONSE:", data);

      // ✅ IMPORTANT FIX (no dependency on success flag)
      if (data && data.token) {
        const userData = {
          ...data.user,
          token: data.token,
        };

        login(userData);
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
      const res = await axios.post(`${API}/auth/send-otp`, {
        phone: signupPhone,
        type: "signup",
      });

      console.log("SIGNUP OTP RESPONSE:", res.data);

      setError(`OTP (Demo): ${res.data.otp}`);
      setSignupStep("OTP");

    } catch (err) {
      const msg = err.response?.data?.error;

      if (msg === "User already exists. Please login.") {
        setIsLogin(true);
        setPhone(signupPhone);
        setStep("PHONE");
      }

      setError(msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSignupVerifyOTP = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${API}/auth/verify-otp`, {
        phone: signupPhone,
        otp: signupOtp,
        type: "signup",
      });

      const data = res.data;

      console.log("SIGNUP VERIFY RESPONSE:", data);

      if (data && data.message) {
        setSignupStep("VERIFIED");
      } else {
        setError("Invalid OTP");
      }

    } catch (err) {
      setError(err.response?.data?.error || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setError("");

    if (!name || !signupPhone || !zone) {
      setError("Fill all fields");
      return;
    }

    try {
      const res = await axios.post(`${API}/auth/complete-profile`, {
        phone: signupPhone,
        name,
        platform,
        zone,
      });

      const userData = {
        ...res.data.user,
        token: res.data.token,
      };

      login(userData);
      return userData;

    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return {
    isLogin,
    setIsLogin,

    phone,
    setPhone,
    otp,
    setOtp,
    step,

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

    loading,
    error,

    handleSendOTP,
    handleVerifyOTP,
    handleSignupSendOTP,
    handleSignupVerifyOTP,
    handleSignup,
  };
};

export default useAuthLogic;