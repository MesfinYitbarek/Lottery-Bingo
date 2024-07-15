
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
  const [branch, setBranch] = useState([]);
  const [getbranch, setgetBranch] = useState([]);
  const [branchCashiers, setBranchCashiers] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const [superBranch, setSuperBranch] = React.useState([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/branch/branch`);
        const data = await response.json();
        setSuperBranch(data);
      } catch (err) {
        setError("Error fetching User");
      }
    };

    fetchUsers();
  }, [superBranch]);

  useEffect(() => {
    const fetchgetBranches = async () => {
      try {
        const response = await fetch(
          `/api/branch/getbranch/${currentUser.username}`
        );
        const data = await response.json();
        setgetBranch(data);
      } catch (err) {
        setError("Error fetching branches");
      }
    };

    fetchgetBranches();
  }, [currentUser.username, branch]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch("/api/branch/branch");
        const data = await response.json();
        setBranch(data);
      } catch (err) {
        setError("Error fetching branches");
      }
    };

    fetchBranches();
  }, []);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch(
          "/api/sales/getSales"
        );
        const data = await response.json();
        const expandedSales = data.flatMap((sale) => sale.winners);
        setSales(expandedSales);
      } catch (err) {
        setError("Error fetching sales");
      }
    };

    fetchSales();
  }, []);

 

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `/api/user/users/${currentUser._id}`
        );
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError("Error fetching users");
      }
    };

    fetchUsers();
  }, [currentUser._id],users);

  useEffect(() => {
    const fetchCashiersByBranch = async () => {
      if (selectedBranch) {
        try {
          const response = await fetch(
            `/api/user/getusers/${selectedBranch}`
          );
          const data = await response.json();
          setBranchCashiers(data);
        } catch (err) {
          setError("Error fetching cashiers for branch");
        }
      } else {
        setBranchCashiers([]);
      }
    };

    fetchCashiersByBranch();
  }, [selectedBranch]);

  const handleFilter = () => {
    let filtered = sales;

    // Check if all the filters are applied
    const isAllFilterApplied =
      startDate && endDate && selectedBranch && selectedCashier;

    if (!isAllFilterApplied) {
      setFilteredSales([]);
      setIsFiltered(false);
      return;
    }

    if (startDate) {
      filtered = filtered.filter(
        (sale) => new Date(sale.createdAt) >= new Date(startDate)
      );
    }

    if (endDate) {
      const filterEndDate = new Date(endDate);
      filterEndDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(
        (sale) => new Date(sale.createdAt) <= filterEndDate
      );
    }

    if (selectedBranch) {
      filtered = filtered.filter((sale) => sale.branch === selectedBranch);
    }

    if (selectedCashier) {
      filtered = filtered.filter((sale) => sale.cashier === selectedCashier);
    }

    setFilteredSales(filtered);
    setCurrentPage(1);
    setIsFiltered(true);
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
      <div className="tw-text-green-700 tw-pl-10 tw-font-bold tw-text-3xl">
        Sales <span className="tw-text-pink-600">(${currentUser.balance})</span>
      </div>

      <div className="tw-mb-5 tw-text-end tw-font-bold tw-text-xl tw-text-purple-600 tw-pr-12">
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
          {["admin", "employee"].includes(currentUser.role) ? (
            <option value={currentUser.branch}>{currentUser.branch}</option>
          ) : currentUser.role == "superadmin" ? (
            superBranch.map((branch) => (
              <option key={branch.id} value={branch.name}>
                {branch.name}
              </option>
            ))
          ) : (
            getbranch.map((branch) => (
              <option key={branch.id} value={branch.name}>
                {branch.name}
              </option>
            ))
          )}
        </select>

        <select
          value={selectedCashier}
          onChange={(e) => setSelectedCashier(e.target.value)}
          className="tw-mr-2 tw-px-2 tw-py-1 tw-border"
        >
          <option value="">Select Cashier</option>
          {branchCashiers.map((cashier) => (
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

      {isFiltered && filteredSales.length > 0 && (
        <>
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
                  <td className="tw-p-2 tw-px-4">{data.winner.join(", ")}</td>
                  <td className="tw-p-2 tw-px-4">{data.branch}</td>
                  <td className="tw-p-2 tw-px-4">{data.cashier}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>

          <div className="tw-mt-4 tw-flex tw-justify-center">
            <nav>
              <ul className="tw-flex tw-list-none">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index} className="tw-mx-1">
                    <a
                      href="#"
                      onClick={(event) => handleClick(event, index + 1)}
                      className={`tw-px-3 tw-py-1 tw-border tw-rounded ${
                        currentPage === index + 1
                          ? "tw-bg-blue-500 tw-text-white"
                          : "tw-bg-white tw-text-blue-500"
                      }`}
                    >
                      {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}

      {error && <div className="tw-text-red-500">{error}</div>}
    </div>
  );
};

export default Sales;
