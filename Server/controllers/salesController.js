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

export const salesTime = async (req, res) => {
  try {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const dailyTotal = await Sales.aggregate([
      { $match: { createdAt: { $gte: startOfDay } } },
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);

    const weeklyTotal = await Sales.aggregate([
      { $match: { createdAt: { $gte: startOfWeek } } },
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);

    const monthlyTotal = await Sales.aggregate([
      { $match: { createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);

    const yearlyTotal = await Sales.aggregate([
      { $match: { createdAt: { $gte: startOfYear } } },
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);

    res.json({
      dailyTotal: dailyTotal[0]?.total || 0,
      weeklyTotal: weeklyTotal[0]?.total || 0,
      monthlyTotal: monthlyTotal[0]?.total || 0,
      yearlyTotal: yearlyTotal[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch aggregated sales data' });
  }
}

// Endpoint to get sales data grouped by branch and cashier
export const salesBranch =  async (req, res) => {
  try {
    const salesByBranch = await Sales.aggregate([
      { $group: { _id: "$branch", total: { $sum: "$total" } } }
    ]);

    const salesByCashier = await Sales.aggregate([
      { $group: { _id: "$cashier", total: { $sum: "$total" } } }
    ]);

    res.json({ salesByBranch, salesByCashier });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch grouped sales data' });
  }
}