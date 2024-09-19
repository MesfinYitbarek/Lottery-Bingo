import mongoose from 'mongoose';

const WinnerSchema = new mongoose.Schema({
  bet: { type: Number },
  player: { type: Number },
  total: { type: Number },
  cut: { type: Number },
  won: { type: Number },
  branch: { type: String },
  call: { type: Number },
  winner: { type: [String] }, // Array of winner card IDs
  cashier: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bonus: {
    type:Number
  },
});

const SalesSchema = new mongoose.Schema({
  winners: [WinnerSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Sales = mongoose.model('Sales', SalesSchema);
export default Sales;