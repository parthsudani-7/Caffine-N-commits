const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    policy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Policy",
    },
    amount: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Claim", claimSchema);