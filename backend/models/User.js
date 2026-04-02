const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    policies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Policy",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);