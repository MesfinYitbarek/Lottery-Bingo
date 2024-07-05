import express from "express"
import { deleteBranch, getSales, sales, salesBranch, salesTime } from "../controllers/salesController.js";
const salesRouter = express.Router();

salesRouter.get("/getSales", getSales);
salesRouter.post("/sales", sales);
salesRouter.get("/salesBranch", salesBranch);
salesRouter.get("/salesTime", salesTime);
salesRouter.delete("/deletesales/:id", deleteBranch);
export default salesRouter