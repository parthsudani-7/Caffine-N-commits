import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigationType,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Suspense, lazy } from "react";
import Navbar from "./components/layout/Navbar";

const Landing = lazy(() => import("./pages/Landing"));
const Auth = lazy(() => import("./pages/auth/Auth"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const BuyPolicy = lazy(() => import("./pages/policy/BuyPolicy"));
const Trigger = lazy(() => import("./pages/simulation/Trigger"));
const ClaimResult = lazy(() => import("./pages/claims/ClaimResult"));
const PolicyManagement = lazy(() => import("./pages/policy/PolicyManagement"));

import ProtectedRoute from "./routes/ProtectedRoute";

const Loader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#03152A] text-white">
    <div className="text-4xl font-bold text-[#00B8A0] mb-4">
      ⚡ InsureTech AI
    </div>
    <p className="text-gray-400 animate-pulse">
      ⚡ Fetching live risk data...
    </p>
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();
  const navigationType = useNavigationType();

  let direction = navigationType === "POP" ? -1 : 1;

  return (
    <>
      {location.pathname !== "/" }

      <AnimatePresence mode="wait">
        <Suspense fallback={<Loader />}>
          <Routes location={location} key={location.pathname}>

            <Route path="/" element={<Landing direction={direction} />} />
            <Route path="/auth" element={<Auth direction={direction} />} />

            <Route
              path="/buy-policy"
              element={
                <ProtectedRoute>
                  <BuyPolicy direction={direction} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/simulation"
              element={
                <ProtectedRoute>
                  <Trigger direction={direction} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard direction={direction} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/policy"
              element={
                <ProtectedRoute>
                  <PolicyManagement direction={direction} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/claims"
              element={
                <ProtectedRoute>
                  <ClaimResult direction={direction} />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;