import express from "express"
import { cards, create, deleteBranch, getCardByBranch, getCardById, getCards } from "../controllers/cardsContrloller.js";


const cardRouter = express.Router();

cardRouter.get("/getCards", getCards);
cardRouter.get("/cartela/:id", getCardById);
cardRouter.get("/cartela/:branch/:id", getCardByBranch);
cardRouter.post("/cards", cards);
cardRouter.post("/create", create);
cardRouter.delete("/deletecard/:id", deleteBranch);
export default cardRouter