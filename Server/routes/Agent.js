import express from "express"
import { branch, branchEdit, createBranch, deleteBranch, getBranch, updateBranch } from "../controllers/branchControllers.js";


const branchRouter = express.Router();
branchRouter.post("/createbranch/:id", createBranch);
branchRouter.get("/branch", branch);
branchRouter.get("/getbranch/:id", getBranch);
branchRouter.get("/branch/:id", branchEdit);
branchRouter.delete("/deletebranch/:id", deleteBranch);
branchRouter.post("/updatebranch/:id", updateBranch);
export default branchRouter
