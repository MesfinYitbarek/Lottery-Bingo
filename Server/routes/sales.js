import express from "express"
import { deleteBranch, getSales, getSalesByCasheir, sales, salesBranch, salesBranchByBranch, salesTime, salesTimeByBranch } from "../controllers/salesController.js";
const salesRouter = express.Router();

salesRouter.get("/getSales", getSales);
salesRouter.get("/getSales/:casheir", getSalesByCasheir);

salesRouter.post("/sales", sales);
salesRouter.get("/salesBranch", salesBranch);
salesRouter.get("/salesTimeByBranch", salesTimeByBranch);
salesRouter.get("/salesBranchByBranch", salesBranchByBranch);
salesRouter.get("/salesTime", salesTime);
salesRouter.delete("/deletesales/:id", deleteBranch);
export default salesRouter