import mongoose from 'mongoose';

const CreditSchema = new mongoose.Schema({
  sender: { type: String},
  receiver: { type: String },
  amount: { type: Number },
  birr: { type: Number },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Credit = mongoose.model('Credit', CreditSchema);
export default Credit