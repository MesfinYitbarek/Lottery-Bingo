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
      bonus:winner.bonus,
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



export const getSalesByCashier = async (req, res) => {
  try {
    const sales = await Sales.find({ 'winners.cashier': req.params.cashier });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sales' });
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

    // Calculate start of the week (Sunday)
    const startOfWeek = new Date(startOfDay);
    startOfWeek.setDate(startOfDay.getDate() - startOfDay.getDay());

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    // Aggregate sales data
    const aggregateSales = async (startDate) => {
      return await Sales.aggregate([
        { $unwind: '$winners' },
        { $match: { 'winners.createdAt': { $gte: startDate } } },
        { $group: { _id: null, total: { $sum: '$winners.cut' } } }
      ]);
    };

    // Aggregate sales data for each time period
    const dailyTotal = await aggregateSales(startOfDay);
    const weeklyTotal = await aggregateSales(startOfWeek);
    const monthlyTotal = await aggregateSales(startOfMonth);
    const yearlyTotal = await aggregateSales(startOfYear);

    // Send the response with summed totals
    res.json({
      dailyTotal: dailyTotal[0]?.total || 0,
      weeklyTotal: weeklyTotal[0]?.total || 0,
      monthlyTotal: monthlyTotal[0]?.total || 0,
      yearlyTotal: yearlyTotal[0]?.total || 0,
    });
  } catch (error) {
    console.error('Error fetching aggregated sales data:', error);
    res.status(500).json({ error: 'Failed to fetch aggregated sales data' });
  }
};

export const salesBranch = async (req, res) => {
  try {
    const salesByBranch = await Sales.aggregate([
      { $unwind: '$winners' },
      { $group: { _id: '$winners.branch', total: { $sum: '$winners.cut' } } }
    ]);

    const salesByCashier = await Sales.aggregate([
      { $unwind: '$winners' },
      { $group: { _id: '$winners.cashier', total: { $sum: '$winners.cut' } } }
    ]);

    res.json({ salesByBranch, salesByCashier });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch grouped sales data' });
  }
}



export const salesTimeByBranch = async (req, res) => {
  try {
    const { branch } = req.query;
    const branches = branch ? branch.split(',') : [];
    const now = new Date();

    // Set dates without hours to ensure day-level granularity
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Calculate start of the week (Sunday)
    const startOfWeek = new Date(startOfDay);
    startOfWeek.setDate(startOfDay.getDate() - startOfDay.getDay());

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    // Function to get the match stage for aggregation pipeline
    const getMatchStage = (date, branch) => 
      branch
        ? { $match: { 'winners.branch': branch, 'createdAt': { $gte: date } } }
        : { $match: { 'createdAt': { $gte: date } } };

    // Function to aggregate sales data
    const aggregateSales = async (branch, startDate) => {
      return await Sales.aggregate([
        { $unwind: '$winners' },
        getMatchStage(startDate, branch),
        { $group: { _id: null, total: { $sum: '$winners.cut' } } }
      ]);
    };

    // Function to sum totals
    const sumTotals = (totals) => totals.reduce((acc, total) => acc + (total[0]?.total || 0), 0);

    // If no branches are provided, handle it gracefully
    if (branches.length === 0) {
      branches.push(null); // Add a null branch to handle the case with no specific branches
    }

    // Aggregate sales data for each time period
    const dailyTotals = await Promise.all(branches.map(branch => aggregateSales(branch, startOfDay)));
    const weeklyTotals = await Promise.all(branches.map(branch => aggregateSales(branch, startOfWeek)));
    const monthlyTotals = await Promise.all(branches.map(branch => aggregateSales(branch, startOfMonth)));
    const yearlyTotals = await Promise.all(branches.map(branch => aggregateSales(branch, startOfYear)));

    // Send the response with summed totals
    res.json({
      dailyTotal: sumTotals(dailyTotals),
      weeklyTotal: sumTotals(weeklyTotals),
      monthlyTotal: sumTotals(monthlyTotals),
      yearlyTotal: sumTotals(yearlyTotals),
    });
  } catch (error) {
    console.error('Error fetching aggregated sales data:', error);
    res.status(500).json({ error: 'Failed to fetch aggregated sales data' });
  }
};

export const salesBranchByBranch = async (req, res) => {
  try {
    const { branch } = req.query;
    const branches = branch ? branch.split(',') : [];
    const matchStage = (branch) => (branch ? { $match: { 'winners.branch': branch } } : {});

    console.log('Branch:', branch);
    console.log('Branches array:', branches);

    const aggregateBranchSales = async (branch) => {
      return await Sales.aggregate([
        { $unwind: '$winners' },
        matchStage(branch),
        { $group: { _id: '$winners.branch', total: { $sum: '$winners.cut' } } }
      ]);
    };

    console.log('Aggregate Branch Sales function:', aggregateBranchSales);

    const aggregateCashierSales = async (branch) => {
      return await Sales.aggregate([
        { $unwind: '$winners' },
        matchStage(branch),
        { $group: { _id: '$winners.cashier', total: { $sum: '$winners.cut' } } }
      ]);
    };

    const salesByBranchPromises = branches.map(branch => aggregateBranchSales(branch));
    const salesByCashierPromises = branches.map(branch => aggregateCashierSales(branch));

    const salesByBranchResults = await Promise.all(salesByBranchPromises);
    const salesByCashierResults = await Promise.all(salesByCashierPromises);

    console.log('Sales by Branch Results:', salesByBranchResults);
    console.log('Sales by Cashier Results:', salesByCashierResults);

    const mergeResults = (results) => {
      const merged = {};
      results.flat().forEach(item => {
        if (merged[item._id]) {
          merged[item._id] += item.total;
        } else {
          merged[item._id] = item.total;
        }
      });
      return Object.entries(merged).map(([id, total]) => ({ _id: id, total }));
    };

    const salesByBranch = mergeResults(salesByBranchResults);
    const salesByCashier = mergeResults(salesByCashierResults);

    res.json({ salesByBranch, salesByCashier });
  } catch (error) {
    console.error('Error fetching grouped sales data:', error);
    res.status(500).json({ error: 'Failed to fetch grouped sales data' });
  }
};