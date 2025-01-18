import express from "express";
import { 
  branch, 
  branchEdit, 
  changePassword, 
  createBranch, 
  cutBalance, 
  deleteAdmin, 
  deleteBranch, 
  getusers, 
  signin, 
  signout, 
  signup, 
  test, 
  updateAdmin, 
  updateBranch, 
  userEdit, 
  users 
} from "../controllers/usersController.js";
import { getBranch } from "../controllers/branchControllers.js";
import MinUser from "../models/MinUser.js"; // Import MinUser model

const userRouter = express.Router();

userRouter.get("/test", test);
userRouter.get("/users/:id", users);
userRouter.get("/getusers/:id", getusers);
userRouter.delete('/delete/:id', deleteAdmin);
userRouter.post("/signup/:id", signup);
userRouter.post("/signin", signin);
userRouter.post('/update/:id', updateAdmin);
userRouter.get("/userEdit/:id", userEdit);
userRouter.get("/signout", signout);
userRouter.put('/:userId/change-password', changePassword);
userRouter.post("/createbranch/:id", createBranch);
userRouter.get("/branch", branch);
userRouter.put('/:userId/balance', cutBalance);
userRouter.get("/branch/:id", branchEdit);
userRouter.delete("/deletebranch/:id", deleteBranch);
userRouter.post("/updatebranch/:id", updateBranch);

// Add a new route for updating minBetAmount
userRouter.post("/updateMinBet/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { minBetAmount } = req.body;

    // Check if a MinUser document exists for this user
    let minUser = await MinUser.findOne({ userId });

    if (minUser) {
      // Update existing minBetAmount
      minUser.minBetAmount = minBetAmount;
      await minUser.save();
    } else {
      // Create a new MinUser document if it doesn't exist
      minUser = new MinUser({ userId, minBetAmount });
      await minUser.save();
    }

    res.status(200).json(minUser); // Return updated or created MinUser data
  } catch (error) {
    console.error("Error updating minimum bet amount:", error);
    res.status(500).json({ message: "Error updating minimum bet amount" });
  }
});

userRouter.get("/minBet/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      const minUser = await MinUser.findOne({ userId });
  
      if (!minUser) {
        return res.status(404).json({ message: "Minimum bet amount not found" });
      }
  
      res.status(200).json(minUser); // Return the found MinUser data
    } catch (error) {
      console.error("Error fetching minimum bet amount:", error);
      res.status(500).json({ message: "Error fetching minimum bet amount" });
    }
  });

export default userRouter;
