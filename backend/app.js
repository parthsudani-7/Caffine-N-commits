const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// ✅ LOAD ENV FIRST
dotenv.config();

const app = express();

// =========================
// ✅ MIDDLEWARE
// =========================

// CORS (allow frontend)
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true,
}));

// Body parser
app.use(express.json());

// =========================
// ✅ ROUTES IMPORT
// =========================

const authRoutes = require("./routes/authRoutes");
const claimRoutes = require("./routes/claimRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const policyRoutes = require("./routes/policyRoutes");

// =========================
// ✅ API ROUTES
// =========================

app.use("/api/auth", authRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/dashboard", dashboardRoutes);

// 🔥 MOST IMPORTANT (YOUR FEATURE)
app.use("/api/policies", policyRoutes);

// =========================
// ✅ HEALTH CHECK
// =========================

app.get("/", (req, res) => {
  res.send("✅ API Running...");
});

// =========================
// ❌ ERROR HANDLER
// =========================

app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err.stack);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;