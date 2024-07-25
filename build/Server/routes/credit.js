import express from "express"
import { balance, credit, deleteCredit, deleteTransfer, getCredit, transfer  } from "../controllers/creditController.js";



const creditRouter = express.Router();

creditRouter.get("/getCredit/:id", getCredit);
//creditRouter.get("/delete/:id", deleteCredit);
creditRouter.post("/create/:id", credit);
creditRouter.post("/transfer", transfer);
creditRouter.get("/:id/balance", balance);
creditRouter.delete("/delete/:id", deleteTransfer);
creditRouter.delete("/deletecredit/:id", deleteCredit);
export default creditRouter