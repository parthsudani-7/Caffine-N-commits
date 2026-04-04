const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    policyNumber: {
      type: String,
      required: true,
      unique: true,
    },

    type: {
      type: String,
      enum: ["health", "vehicle", "life"],
      required: true,
    },

    basePrice: {
      type: Number,
      required: true,
    },

    riskScore: {
      type: Number,
      required: true,
    },

    premium: {
      type: Number,
      required: true,
    },

    coverage: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "cancelled"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Policy", policySchema);