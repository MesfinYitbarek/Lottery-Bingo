import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [filteredSales, setFilteredSales] = useState([]);
  const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
  
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `/api/sales/getSales/${currentUser.username}`
        );
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError("Error fetching User");
      }
    };

    fetchUsers();
  }, [currentUser.username]);

  const clearSelections = () => {
   
    setStartDate("");
    setEndDate("");
    // setFilteredSales(sales); // Reset to show all sales
  };

  const handleFilter = () => {
    let filtered = users;


    // Initialize the filter to check if at least the date is specified
    const isDateSpecified = startDate || endDate;
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
    if (!isDateSpecified ) {
      setFilteredSales(users); // Show all sales if no filters are applied
    } else {
      setFilteredSales(filtered);
    }
  };

  // Calculate totals
  const totalWinning = filteredSales.reduce(
    (sum, sale) => sum + (sale.winners[0]?.won || 0),
    0
  );
  const totalCut = filteredSales.reduce(
    (sum, sale) => sum + (sale.winners[0]?.cut || 0),
    0
  );
  const totalTransactions = filteredSales.length;

  return (
    <div className="tw-mt-10 ">
      <div className="tw-text-green-700 tw-pl-10 tw-font-bold tw-text-3xl">
        Balance <span className="tw-text-pink-600">(${currentUser.balance})</span>
      </div>

      <div className="tw-mb-5 tw-text-end tw-font-bold tw-text-xl tw-text-purple-600 tw-pr-12">
        <div>Total Winning: ${totalWinning}</div>
        <div>Total Cut: ${totalCut}</div>
        <div>Total Transactions: {totalTransactions}</div>
      </div>
      
      <div>
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
        <button
          onClick={handleFilter}
          className="tw-px-4 tw-py-2 tw-bg-blue-600 tw-text-white tw-rounded"
        >
          Find
        </button>
        <button onClick={clearSelections}>Clear</button>
      </div>

      <table className="tw-text-[16px] tw-text-sky-900 tw-bg-white tw-px-4 tw-py-4 tw-border-separate tw-border-spacing-y-2 tw-min-w-[800px] ">
        <thead>
          <tr className="tw-bg-blue-800 tw-font-semibold tw-text-white">
            <th className="tw-p-2 tw-px-3">Date</th>
            <th className="tw-p-2 tw-px-3">Time</th> {/* New Time Column */}
            <th className="tw-p-2 tw-px-3">Bet</th>
            <th className="tw-p-2 tw-px-3">Player#</th>
            <th className="tw-p-2 tw-px-3">Total Won</th>
            <th className="tw-p-2 tw-px-3">Cut</th>
            <th className="tw-p-2 tw-px-3">Won</th>
            <th className="tw-p-2 tw-px-3">#Call</th>
            <th className="tw-p-2 tw-px-3">Winners</th>
            <th className="tw-p-2 tw-px-3">Branch</th>
            <th className="tw-p-2 tw-px-3">Cashier</th>
            <th className="tw-p-2 tw-px-3">Balance</th> {/* New Balance Column */}

          </tr>
        </thead>
        <tbody>
          {filteredSales.length > 0 &&
            filteredSales.map((data) => (
              <tr key={data._id} className="tw-hover:bg-slate-100">
                <td className="tw-p-2 tw-px-3">
                  {new Date(data.createdAt).toLocaleDateString()}
                </td>
                <td className="tw-p-2 tw-px-3">
  {new Date(data.createdAt).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', // Include seconds
    hour12: true 
  })}
</td>


                <td className="tw-p-2 tw-px-3">&#36;{data.winners[0]?.bet}</td>
                <td className="tw-p-2 tw-px-3">{data.winners[0]?.player}</td>
                <td className="tw-p-2 tw-px-3">
                  &#36;{data.winners[0]?.total}
                </td>
                <td className="tw-p-2 tw-px-3">&#36;{data.winners[0]?.cut}</td>
                <td className="tw-p-2 tw-px-3">&#36;{data.winners[0]?.won}</td>
                <td className="tw-p-2 tw-px-3">{data.winners[0]?.call}</td>
                <td className="tw-p-2 tw-px-3">
                  {data.winners[0]?.winner
                    ? data.winners[0].winner.join(", ")
                    : "-"}
                </td>
                <td className="tw-p-2 tw-px-3">{data.winners[0]?.branch}</td>
                <td className="tw-p-2 tw-px-3">{data.winners[0]?.cashier}</td> 
                <td className="tw-p-2 tw-px-3">&#36;{data.winners[0]?.balance}</td> {/* Display Balance */}
      
              </tr>
              
            ))}
        </tbody>
      </table>

      {error && <p className="tw-text-red-500 ">{error}</p>}
    </div>
  );
};

export default Users;
