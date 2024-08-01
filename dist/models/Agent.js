import mongoose from "mongoose";
const BranchSchema = new mongoose.Schema({
  userRef: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  agent: {
    type: String
  },
  location: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
const Branch = mongoose.model("Branchees", BranchSchema);
export default Branch;