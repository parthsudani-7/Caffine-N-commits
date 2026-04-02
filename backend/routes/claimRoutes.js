const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  createClaim,
} = require("../controllers/claim/createClaim");

const {
  getClaims,
} = require("../controllers/claim/getClaims");

const {
  updateStatus,
} = require("../controllers/claim/updateStatus");

const router = express.Router();

router.post("/", protect, createClaim);
router.get("/", protect, getClaims);
router.put("/:id", protect, updateStatus);

module.exports = router;