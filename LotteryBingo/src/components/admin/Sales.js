import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedCashier, setSelectedCashier] = useState("");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/sales/getSales"
        );
        const data = await response.json();
        setSales(data);
        setFilteredSales(data);
      } catch (err) {
        setError("Error fetching Sales");
      }
    };

    fetchSales();
  }, []);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/user/users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError("Error fetching User");
      }
    };

    fetchUsers();
  }, []);

  const handleFilter = () => {
    console.log("Filtering with:", { startDate, endDate, selectedBranch, selectedCashier });

    let filtered = sales;

    if (startDate) {
      filtered = filtered.filter(sale => {
        const saleDate = new Date(sale.createdAt);
        const filterStartDate = new Date(startDate);
        console.log(`Comparing saleDate: ${saleDate} with startDate: ${filterStartDate}`);
        return saleDate >= filterStartDate;
      });
    }

    if (endDate) {
      filtered = filtered.filter(sale => {
        const saleDate = new Date(sale.createdAt);
        const filterEndDate = new Date(endDate);
        filterEndDate.setHours(23, 59, 59, 999); // Set end date to end of the day
        console.log(`Comparing saleDate: ${saleDate} with endDate: ${filterEndDate}`);
        return saleDate <= filterEndDate;
      });
    }

    if (selectedBranch) {
      filtered = filtered.filter(sale => sale.branch === selectedBranch);
    }

    if (selectedCashier) {
      filtered = filtered.filter(sale => sale.cashier === selectedCashier);
    }

    console.log("Filtered results:", filtered);
    setFilteredSales(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredSales.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredSales.length / rowsPerPage);

  const handleClick = (event, number) => {
    event.preventDefault();
    setCurrentPage(number);
  };

  // Calculate totals
  const totalWinning = filteredSales.reduce((sum, sale) => sum + sale.won, 0);
  const totalCut = filteredSales.reduce((sum, sale) => sum + sale.cut, 0);
  const totalTransactions = filteredSales.length;

  return (
    <div className="tw-mt-10">
      <div className="tw-text-green-700 tw-font-bold tw-text-3xl">
        Sales (${currentUser.balance})
      </div>

      <div className="tw-mb-5 tw-font-bold tw-text-xl">
        <div>Total Winning: ${totalWinning}</div>
        <div>Total Cut: ${totalCut}</div>
        <div>Total Transactions: {totalTransactions}</div>
      </div>

      <div className="tw-mb-5">
      <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="tw-mr-2 tw-px-2 tw-py-1 tw-border"
          placeholder="Start Date"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="tw-mr-2 tw-px-2 tw-py-1 tw-border"
          placeholder="End Date"
        />
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="tw-mr-2 tw-px-2 tw-py-1 tw-border"
        >
          <option value="">Select Branch</option>
          {users.map((branch) => (
            <option key={branch.id} value={branch.branch}>
              {branch.branch}
            </option>
          ))}
        </select>
        <select
          value={selectedCashier}
          onChange={(e) => setSelectedCashier(e.target.value)}
          className="tw-mr-2 tw-px-2 tw-py-1 tw-border"
        >
          <option value="">Select Cashier</option>
          {users.map((cashier) => (
            <option key={cashier.id} value={cashier.username}>
              {cashier.username}
            </option>
          ))}
        </select>
        <button
          onClick={handleFilter}
          className="tw-px-4 tw-py-2 tw-bg-blue-600 tw-text-white tw-rounded"
        >
          Find
        </button>
      </div>

      <table className="tw-text-[16px] tw-text-sky-900 tw-bg-white tw-px-10 tw-py-4 tw-border-separate tw-border-spacing-y-2 tw-min-w-[800px]">
        <thead>
          <tr className="tw-bg-blue-800 tw-font-semibold tw-text-white">
            <th className="tw-p-2 tw-px-4">Date</th>
            <th className="tw-p-2 tw-px-4">Bet</th>
            <th className="tw-p-2 tw-px-4">Player#</th>
            <th className="tw-p-2 tw-px-4">Total Won</th>
            <th className="tw-p-2 tw-px-4">Cut</th>
            <th className="tw-p-2 tw-px-4">Won</th>
            <th className="tw-p-2 tw-px-4">#Call</th>
            <th className="tw-p-2 tw-px-4">Winners</th>
            <th className="tw-p-2 tw-px-4">Branch</th>
            <th className="tw-p-2 tw-px-4">Cashier</th>
            <th className="tw-p-2 tw-px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((data) => (
            <tr key={data._id} className="tw-hover:bg-slate-100">
              <td className="tw-p-2 tw-px-4">
                {new Date(data.createdAt).toLocaleDateString()}
              </td>
              <td className="tw-p-2 tw-px-4">&#36;{data.bet}</td>
              <td className="tw-p-2 tw-px-4">{data.player}</td>
              <td className="tw-p-2 tw-px-4">&#36;{data.total}</td>
              <td className="tw-p-2 tw-px-4">&#36;{data.cut}</td>
              <td className="tw-p-2 tw-px-4">&#36;{data.won}</td>
              <td className="tw-p-2 tw-px-4">{data.call}</td>
              <td className="tw-p-2 tw-px-4">{data.winner}</td>
              <td className="tw-p-2 tw-px-4">{data.branch}</td>
              <td className="tw-p-2 tw-px-4">{data.cashier}</td>
              <td className="tw-p-2 tw-px-4 tw-text-red-600 tw-text-center">
                <button className="tw-border-red-600 tw-px-1 tw-rounded-none">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="tw-flex tw-justify-center tw-mt-4">
        {[...Array(totalPages).keys()].map((number) => (
          <button
            key={number + 1}
            onClick={(event) => handleClick(event, number + 1)}
            className={`tw-px-4 tw-py-2 tw-mx-1 tw-border ${
              currentPage === number + 1
                ? "tw-bg-blue-600 tw-text-white"
                : "tw-bg-white tw-text-blue-600"
            }`}
          >
            {number + 1}
          </button>
        ))}
      </div>

      {error && <p className="tw-text-red-500">{error}</p>}
    </div>
  );
};

export default Sales;
