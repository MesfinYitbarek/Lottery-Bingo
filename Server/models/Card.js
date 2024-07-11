// server/models/Card.js
import mongoose from 'mongoose';


const cardSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  branch: { type: String },
  card: {
    B: [Number],
    I: [Number],
    N: [Number],
    G: [Number],
    O: [Number],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Card = mongoose.model('Cards', cardSchema);
export default Card