const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    action: {
      type: String,
    },
    details: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", historySchema);