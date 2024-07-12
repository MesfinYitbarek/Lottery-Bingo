// routes/cards.js

import errorHandler from "../Utils/error.js";
import getNextId from "../Utils/getNextId.js";
import Card from "../models/Card.js";


export const create  =  async (req, res) => {
  const { id, branch, card } = req.body;
  try {
    const newCard = new Card({ id, branch, card });
    await newCard.save();
    res.status(201).json(newCard);
  } catch (err) {
    res.status(500).json({ error: 'Error creating card' });
  }
}
// Route to save generated cards
export const cards = async (req, res) => {
  try {
    const { branch, cards } = req.body;

    // Validate input
    if (!branch || !cards || !Array.isArray(cards)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    // Add branch name to each card (IDs are already assigned by the frontend)
    const cardsWithBranch = cards.map((card) => ({
      ...card,
      branch,
    }));

    // Save cards to the database
    const savedCards = await Card.insertMany(cardsWithBranch);
    res.status(201).json(savedCards);
  } catch (error) {
    res.status(500).json({ error: "Failed to save cards" });
  }
};
// Route to fetch cards
export const getCards = async (req, res) => {
  const { branch } = req.query;
  try {
    const query = branch ? { branch } : {};
    const cards = await Card.find(query);
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cards" });
  }
};

export const getCardById = async (req, res) => {

  try {
    const cards = await Card.find({id : req.params.id});
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
};

export const getCardByBranch = async (req, res) => {

  try {
    const cards = await Card.find({id : req.params.id, branch : req.params.branch});
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
};

export const deleteBranch = async (req, res, next) => {
  const users = await Card.findById(req.params.id);

  if (!users) {
    return next(errorHandler(404, "Card not found!"));
  }

  try {
    await Card.findByIdAndDelete(req.params.id);
    res.status(200).json("Card has been deleted!");
  } catch (error) {
    next(error);
  }
};