import mongoose from 'mongoose';
const cardSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  branch: {
    type: String
  },
  card: {
    B: [Number],
    I: [Number],
    N: {
      type: [mongoose.Schema.Types.Mixed],
      // To handle 'Free' string and numbers
      validate: {
        validator: function (v) {
          // Ensure the middle cell of 'N' is 'Free'
          return v[2] === 'Free';
        },
        message: props => `The middle cell of 'N' column must be 'Free'.`
      }
    },
    G: [Number],
    O: [Number]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const Card = mongoose.model('Cards', cardSchema);
export default Card;