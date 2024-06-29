import express from "express"
import { getSales, sales } from "../controllers/salesController.js";
const salesRouter = express.Router();

salesRouter.get("/getSales", getSales);
salesRouter.post("/sales", sales);
export default salesRouter