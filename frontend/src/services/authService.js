import axios from "axios";
import API from "@/config/api";

// 🔹 SEND OTP
export const sendOTP = async (phone) => {
  try {
    const res = await axios.post(`${API}/api/auth/send-otp`, {
      phone,
    });

    return res.data;
  } catch (error) {
    console.error("Send OTP error:", error);
    return { success: false };
  }
};

// 🔹 VERIFY OTP
export const verifyOTP = async (phone, otp) => {
  try {
    const res = await axios.post(`${API}/api/auth/verify-otp`, {
      phone,
      otp,
    });

    return res.data;
  } catch (error) {
    console.error("Verify OTP error:", error);
    return { success: false };
  }
};