import errorHandler from "../Utils/error.js";
import User from "../models/User.js";
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'
//import errorHandler from "../Utils/error.js";
export const test = (req, res) => {
    res.json({
      message: "Hello World!",
    });
  };


export const signup = async (req, res, next) => {
  const { name,username,email, phone, password,balance,cut,branch,role } = req.body;

  // Create new User
  const newUser = new User({ name,username,email, phone, password,balance,cut,branch,role  });

  try {
    await newUser.save();
    res.status(201).json("User created successfull");
  } catch (error) {
    next(error);
  }
};
export const signin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // Find user by username
    const validUser = await User.findOne({ username });
    if (!validUser) return next(errorHandler(404, 'User not found!'));

    // Validate Password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Invalid password!'));
  
    // Generate JWT token
    const token = jwt.sign({ id: validUser._id }, 'ecgfhufsdjkx634', { expiresIn: '1h' });

    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
export const users = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const deleteAdmin = async (req, res, next) => {
  const users = await User.findById(req.params.id);

  if (!users) {
    return next(errorHandler(404, "User not found!"));
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
}

export const updateAdmin = async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          phone: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
          role: req.body.role,
          name: req.body.name,
          balance: req.body.balance,
          cut: req.body.cut,
          branch: req.body.branch,
        },
      },
      { new: true }
    );

    const { passowrd, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
}

export const userEdit = async (req, res, next) => {
  const { id } = req.params; 

  try {
    const user = await User.findById(id); 
    if (!user) {
      return res.status(404).json({ message: "User not found" }); 
    }
    res.status(200).json(user); 
  } catch (error) {
    console.error("Error fetching User:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};