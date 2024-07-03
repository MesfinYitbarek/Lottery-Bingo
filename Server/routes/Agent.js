
import express from "express"
import { branch, branchEdit, createBranch, deleteBranch, updateBranch } from "../controllers/branchControllers.js";


const branchRouter = express.Router();
branchRouter.post("/createbranch/:id", createBranch);
branchRouter.get("/branch", branch);
branchRouter.get("/branch/:id", branchEdit);
branchRouter.delete("/deletebranch/:id", deleteBranch);
branchRouter.post("/updatebranch/:id", updateBranch);
export default branchRouter
