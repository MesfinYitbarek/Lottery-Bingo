import mongoose from 'mongoose';

const SalesSchema = new mongoose.Schema({
  bet: { type: Number},
  player: { type: Number },
  total: { type: Number },
  cut: { type: Number },
  won: { type: Number },
  branch: { type: String },
  call: { type: Number },
  winner: { type: String },
  cashier: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Sales = mongoose.model('Sales', SalesSchema);
export default Sales