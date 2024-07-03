import Sales from "../models/Sales.js";

export const sales = async (req, res) => {
  const { bet, player, total,cut,won, branch, call, winner, cashier } =
    req.body;

  const newBingo = new Sales({
    bet,
    player,
    total,
    cut,
    won,
    branch,
    call,
    winner,
    cashier,
  });

  try {
    await newBingo.save();
    res.status(200).json({ message: "Bingo data saved successfully" });
  } catch (error) {
    console.error("Error saving bingo data:", error);
    res.status(500).json({ message: "Failed to save bingo data" });
  }
};

export const getSales = async (req, res) => {
  try {
    const users = await Sales.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Sales' });
  }
};

export const deleteBranch = async (req, res, next) => {
  const users = await Sales.findById(req.params.id);

  if (!users) {
    return next(errorHandler(404, "Sales not found!"));
  }

  try {
    await Sales.findByIdAndDelete(req.params.id);
    res.status(200).json("Sales has been deleted!");
  } catch (error) {
    next(error);
  }
};