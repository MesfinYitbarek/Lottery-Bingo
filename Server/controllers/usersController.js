import errorHandler from "../Utils/error.js";
import Agent from "../models/Branch.js";
import Branch from "../models/Branch.js";
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
  const { name,username, phone, password,balance,cut,branch,role } = req.body;
  
  // Create new User
  const newUser = new User({ name,username, phone, password,balance,cut,branch,role,userRef: req.params.id  });

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
    // Find user or branch by username
    const user = await User.findOne({ username });
    const branch = await Agent.findOne({ username });

    // Check if either user or branch exists
    const validAccount = user || branch;
    if (!validAccount) return next(errorHandler(404, 'User or Branch not found!'));

    // Validate Password
    const validPassword = bcryptjs.compareSync(password, validAccount.password);
    if (!validPassword) return next(errorHandler(401, 'Invalid password!'));

    // Generate JWT token
    const token = jwt.sign({ id: validAccount._id }, 'ecgfhufsdjkx634', { expiresIn: '1h' });

    const { password: pass, ...rest } = validAccount._doc;
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
    const users = await User.find({userRef: req.params.id});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getusers = async (req, res) => {
  try {
    const users = await User.find({branch: req.params.id,  role: "employee"});
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
          phone: req.body.phone,
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

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const userId = req.params.userId;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'New Password and Confirm Password do not match' });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcryptjs.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Old Password is incorrect' });
    }

    const salt = await bcryptjs.genSalt(10);
    user.password = newPassword;

    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// branch

export const branch = async (req, res, next) => {
  try {
    const branch = await Agent.find();
    res.json(branch);
  } catch (error) {
    next(error);
  }
};

// catagory display for edit
export const branchEdit = async (req, res, next) => {
  const { id } = req.params; 

  try {
    const user = await Agent.findById(id); 
    if (!user) {
      return res.status(404).json({ message: "Branch not found" }); 
    }
    res.status(200).json(user); 
  } catch (error) {
    console.error("Error fetching Branch:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//catagory creation
export const createBranch = async (req, res, next) => {
  const { name,username, phone, password,balance,cut,role } = req.body;
  const {userRef} = req.params.id;
  const newCatagory = new Agent({
    name,username, phone, password,balance,cut,role,userRef: req.params.id
  });
  try {
    await newCatagory.save();
    res.status(201).json("Catagory created successfull");
  } catch (error) {
    next(error);
  }
};

//delete catagory
export const deleteBranch = async (req, res, next) => {
  const users = await Agent.findById(req.params.id);

  if (!users) {
    return next(errorHandler(404, "Branch not found!"));
  }

  try {
    await Agent.findByIdAndDelete(req.params.id);
    res.status(200).json("Branch has been deleted!");
  } catch (error) {
    next(error);
  }
};

// update catagory
export const updateBranch = async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await Agent.findByIdAndUpdate(
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
         
        },
      },
      { new: true }
    );

    const { passowrd, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const cutBalance = async (req, res) => {
  const { userId } = req.params;
  const { balance } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.balance = balance;
    await user.save();

    res.json({ balance: user.balance });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}