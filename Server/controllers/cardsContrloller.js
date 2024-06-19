// routes/cards.js

import getNextId from "../Utils/getNextId.js";
import Card from "../models/Card.js";


// Route to save generated cards
export const cards = async (req, res) => {
  try {
    const cards = req.body.cards;

    // Add unique IDs to each card
    for (let card of cards) {
      card.id = await getNextId();
    }

    // Save cards to the database
    const savedCards = await Card.insertMany(cards);
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