import Sales from "../models/Sales.js";
import errorHandler from "../Utils/error.js";
export const sales = async (req, res) => {
  const { winners } = req.body;

  if (!Array.isArray(winners) || winners.length === 0) {
    return res.status(400).json({ message: "No winners provided" });
  }

  const newSales = new Sales({
    winners: winners.map(winner => ({
      bet: winner.bet,
      player: winner.player,
      total: winner.total,
      cut: winner.cut,
      won: winner.won,
      branch: winner.branch,
      call: winner.call,
      winner: winner.winner, // This should be an array of winner card IDs
      cashier: winner.cashier,
      createdAt: new Date(),
    })),
  });

  try {
    await newSales.save();
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

export const getSalesByCasheir = async (req, res) => {
  try {
    const users = await Sales.find({cashier : req.params.cashier});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Sales' });
  }
};

export const deleteBranch = async (req, res, next) => {
  try {
    const sales = await Sales.findById(req.params.id);

    if (!sales) {
      return next(errorHandler(404, "Sales not found!"));
    }

    await Sales.findByIdAndDelete(req.params.id);
    res.status(200).json("Sales has been deleted!");
  } catch (error) {
    next(error);
  }
};

// Endpoint to get aggregated sales data over different time periods
export const salesTime = async (req, res) => {
  try {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const dailyTotal = await Sales.aggregate([
      { $unwind: '$winners' },
      { $match: { 'winners.createdAt': { $gte: startOfDay } } },
      { $group: { _id: null, total: { $sum: '$winners.total' } } }
    ]);

    const weeklyTotal = await Sales.aggregate([
      { $unwind: '$winners' },
      { $match: { 'winners.createdAt': { $gte: startOfWeek } } },
      { $group: { _id: null, total: { $sum: '$winners.total' } } }
    ]);

    const monthlyTotal = await Sales.aggregate([
      { $unwind: '$winners' },
      { $match: { 'winners.createdAt': { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: '$winners.total' } } }
    ]);

    const yearlyTotal = await Sales.aggregate([
      { $unwind: '$winners' },
      { $match: { 'winners.createdAt': { $gte: startOfYear } } },
      { $group: { _id: null, total: { $sum: '$winners.total' } } }
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

export const salesBranch = async (req, res) => {
  try {
    const salesByBranch = await Sales.aggregate([
      { $unwind: '$winners' },
      { $group: { _id: '$winners.branch', total: { $sum: '$winners.total' } } }
    ]);

    const salesByCashier = await Sales.aggregate([
      { $unwind: '$winners' },
      { $group: { _id: '$winners.cashier', total: { $sum: '$winners.total' } } }
    ]);

    res.json({ salesByBranch, salesByCashier });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch grouped sales data' });
  }
}

export const salesTimeByBranch = async (req, res) => {
  try {
    const { branch } = req.query;
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const matchStage = branch ? { $match: { 'winners.branch': branch, 'winners.createdAt': { $gte: startOfDay } } } : { $match: { 'winners.createdAt': { $gte: startOfDay } } };

    const dailyTotal = await Sales.aggregate([
      { $unwind: '$winners' },
      matchStage,
      { $group: { _id: null, total: { $sum: '$winners.total' } } }
    ]);

    matchStage.$match['winners.createdAt'] = { $gte: startOfWeek };
    const weeklyTotal = await Sales.aggregate([
      { $unwind: '$winners' },
      matchStage,
      { $group: { _id: null, total: { $sum: '$winners.total' } } }
    ]);

    matchStage.$match['winners.createdAt'] = { $gte: startOfMonth };
    const monthlyTotal = await Sales.aggregate([
      { $unwind: '$winners' },
      matchStage,
      { $group: { _id: null, total: { $sum: '$winners.total' } } }
    ]);

    matchStage.$match['winners.createdAt'] = { $gte: startOfYear };
    const yearlyTotal = await Sales.aggregate([
      { $unwind: '$winners' },
      matchStage,
      { $group: { _id: null, total: { $sum: '$winners.total' } } }
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

export const salesBranchByBranch = async (req, res) => {
  try {
    const { branch } = req.query;
    const matchStage = branch ? { $match: { 'winners.branch': branch } } : {};

    const salesByBranch = await Sales.aggregate([
      { $unwind: '$winners' },
      matchStage,
      { $group: { _id: '$winners.branch', total: { $sum: '$winners.total' } } }
    ]);

    const salesByCashier = await Sales.aggregate([
      { $unwind: '$winners' },
      matchStage,
      { $group: { _id: '$winners.cashier', total: { $sum: '$winners.total' } } }
    ]);

    res.json({ salesByBranch, salesByCashier });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch grouped sales data' });
  }
}