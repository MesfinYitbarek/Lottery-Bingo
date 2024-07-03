import express from "express"
import { cards, deleteBranch, getCardById, getCards } from "../controllers/cardsContrloller.js";


const cardRouter = express.Router();

cardRouter.get("/getCards", getCards);
cardRouter.get("/cartela/:id", getCardById);
cardRouter.post("/cards", cards);
cardRouter.delete("/deletecard/:id", deleteBranch);
export default cardRouter