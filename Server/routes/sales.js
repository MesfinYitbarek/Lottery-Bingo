import express from "express"
import { deleteBranch, getSales, sales } from "../controllers/salesController.js";
const salesRouter = express.Router();

salesRouter.get("/getSales", getSales);
salesRouter.post("/sales", sales);
salesRouter.delete("/deletesales/:id", deleteBranch);
export default salesRouter