import User from "../models/User.js";

export const test = (req, res) => {
    res.json({
      message: "Hello World!",
    });
  };


export const signup = async (req, res, next) => {
  const { username, email, password,role } = req.body;

  // Check for existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json("Email already exists");

  // Create new User
  const newUser = new User({ username, email, password, role });

  try {
    await newUser.save();
    res.status(201).json("User created successfull");
  } catch (error) {
    next(error);
  }
};