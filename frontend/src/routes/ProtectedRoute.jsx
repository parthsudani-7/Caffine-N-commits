import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // =========================
  // ⏳ WAIT FOR AUTH TO LOAD
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  // =========================
  // 🔥 FALLBACK CHECK FROM LOCAL STORAGE (IMPORTANT FIX)
  // =========================
  let storedUser = null;

  try {
    const data = localStorage.getItem("user");
    if (data) {
      storedUser = JSON.parse(data);
    }
  } catch (err) {
    console.log("❌ Storage parse error:", err);
  }

  // =========================
  // 🔐 PROTECT ROUTE
  // =========================
  if (!user && !storedUser) {
    return (
      <Navigate
        to="/auth"
        state={{ from: location.pathname }} // 🔥 SAFE REDIRECT
        replace
      />
    );
  }

  // =========================
  // ✅ ALLOW ACCESS
  // =========================
  return children;
};

export default ProtectedRoute;