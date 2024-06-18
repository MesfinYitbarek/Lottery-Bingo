
import Counter from '../models/Counter.js';
const getNextId = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: 'cardCounter' },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );

  return counter.value;
};

export default getNextId