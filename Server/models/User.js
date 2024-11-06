// User Schema (models/User.js)
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    userRef: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/bingo-5a330.appspot.com/o/Images%2FlogoImagelast.jpg?alt=media&token=9551c268-8625-4dc3-8705-721a3f947c99",
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
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
    // String type - will store multiple branches as comma-separated for admin
    branch: {
      type: String,
      required: true,
      get: function(data) {
        return data ? data.split(',') : [];
      },
      set: function(data) {
        if (Array.isArray(data)) {
          return data.join(',');
        }
        return data;
      }
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    role: {
      type: String,
      default: "employee",
    },
  },
  { timestamps: true ,
    toJSON: { getters: true }, // Enable getters when converting to JSON
    toObject: { getters: true } // Enable getters when converting to object
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("Users", userSchema);

export default User;