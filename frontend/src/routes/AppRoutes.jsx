import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Auth from "../pages/auth/Auth";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";

import PolicyManagement from "../pages/policy/PolicyManagement";
import BuyPolicy from "../pages/policy/BuyPolicy";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/register" element={<Register />} />

      {/* PROTECTED */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* ✅ POLICY ROUTES (FIXED) */}
      <Route
        path="/policy"
        element={
          <ProtectedRoute>
            <PolicyManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/buy-policy"
        element={
          <ProtectedRoute>
            <BuyPolicy />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;