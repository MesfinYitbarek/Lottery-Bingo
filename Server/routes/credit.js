import express from "express"
import { credit, deleteCredit, getCredit } from "../controllers/creditController.js";



const creditRouter = express.Router();

creditRouter.get("/getCredit", getCredit);
creditRouter.get("/delete/:id", deleteCredit);
creditRouter.post("/credit", credit);
export default creditRouter