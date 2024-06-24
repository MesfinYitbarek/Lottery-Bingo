import mongoose from 'mongoose';

const CreditSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  credit: { type: Number, required: true },
  birr: { type: Number, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Credit = mongoose.model('Credit', CreditSchema);
export default Credit