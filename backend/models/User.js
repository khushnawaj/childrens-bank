const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  city: String,
  country: String,
  profilePic: String, // Optional profile picture URL
  balance: { type: Number, default: 5000 },
  transactions: [
    {
      type: { type: String, enum: ["credit", "debit"], required: true },
      amount: { type: Number, required: true },
      date: { type: Date, default: Date.now },
      description: String,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
