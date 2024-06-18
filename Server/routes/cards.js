import express from "express"
import { cards, getCards } from "../controllers/cardsContrloller.js";


const cardRouter = express.Router();

cardRouter.get("/getCards", getCards);
cardRouter.post("/cards", cards);
export default cardRouter