// routes/cards.js

import getNextId from "../Utils/getNextId.js";
import Card from "../models/Card.js";


// Route to save generated cards
export const cards = async (req, res) => {
  try {
    const { branch, cards } = req.body;

    // Validate input
    if (!branch || !cards || !Array.isArray(cards)) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Add unique IDs and branch name to each card
    const cardsWithIds = await Promise.all(
      cards.map(async (card) => ({
        ...card,
        id: await getNextId(),
        branch,
      }))
    );

    // Save cards to the database
    const savedCards = await Card.insertMany(cardsWithIds);
    res.status(201).json(savedCards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save cards' });
  }
};

// Route to fetch cards
export const getCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cards' });
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