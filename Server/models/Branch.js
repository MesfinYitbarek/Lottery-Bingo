import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const BranchSchema = new mongoose.Schema(
  {
    userRef: {
      type: String,
      required: true,
      
    },
     name: {
        type: String,
        required: true,
       
      },
      username: {
        type: String,
        required: true,
        unique: true,
      },
      
      phone: {
        type: Number,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      balance: {
        type: Number,
        default: 0,
        
      },
      cut: {
        type: String,
        
      },
      
      avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" ,
      },
      role: {
        type: String,
        default:"admin",
      },
    },
    { timestamps: true }
);

BranchSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
  
    const salt = await bcrypt.genSalt(10); // Adjust cost factor as needed
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

const Branch = mongoose.model("Branch", BranchSchema);
export default Branch;
