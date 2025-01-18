import mongoose from "mongoose";

const MinUserSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
  minBetAmount: { type: Number, required: true, default: 10 }, // Default minimum bet amount
});

const MinUser = mongoose.model("MinUser", MinUserSchema);

export default MinUser;
