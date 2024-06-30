import express from "express"
import { branch, branchEdit, changePassword, createBranch, deleteAdmin, deleteBranch, signin, signout, signup, test, updateAdmin, updateBranch, userEdit, users } from "../controllers/usersController.js";

const userRouter = express.Router();

userRouter.get("/test", test);
userRouter.get("/users", users);
userRouter.delete('/delete/:id', deleteAdmin)
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.post('/update/:id', updateAdmin)
userRouter.get("/userEdit/:id", userEdit);
userRouter.get("/signout", signout);
userRouter.put('/:userId/change-password', changePassword);
userRouter.post("/createbranch", createBranch);
userRouter.get("/branch", branch);
userRouter.get("/branch/:id", branchEdit);
userRouter.delete("/deletebranch/:id", deleteBranch);
userRouter.post("/updatebranch/:id", updateBranch);
export default userRouter