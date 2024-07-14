import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BiPlus } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useBalance } from "../BalanceContext";
import AddUsers from "./AddUsers";
const Users = () => {
  const balance = useBalance();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [users, setUsers] = React.useState([]);
  const [error, setError] = React.useState(null);
  const { currentUser } = useSelector((state) => state.user);
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/sales/getSales/${currentUser.username}`
        );
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError("Error fetching User");
      }
    };

    fetchUsers();
  }, [users]);

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/sales/deletesales/${userId}`
      );

      if (response.data.success) {
        setUsers([...users.filter((users) => users._id !== userId)]);
      } 
    } catch (err) {
      setError("Error deleting User");
    }
  };

  return (
    <div className="tw-mt-10 ">
      <table className="tw-text-[16px] tw-text-sky-900 tw-bg-white tw-px-10 tw-py-4 tw-border-separate tw-border-spacing-y-2 tw-min-w-[800px] ">
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
          {users &&
            users.map((data) => (
              <tr key={data._id} className="tw-hover:bg-slate-100">
                <td className="tw-p-2 tw-px-4">
                  {new Date(data.createdAt).toLocaleDateString()}
                </td>
                <td className="tw-p-2 tw-px-4">&#36;{data.winners[0].bet}</td>
                <td className="tw-p-2 tw-px-4">{data.winners[0].player}</td>
                <td className="tw-p-2 tw-px-4">&#36;{data.winners[0].total}</td>
                <td className="tw-p-2 tw-px-4">&#36;{data.winners[0].cut}</td>
                <td className="tw-p-2 tw-px-4">&#36;{data.winners[0].won}</td>
                <td className="tw-p-2 tw-px-4">{data.winners[0].call}</td>
                <td className="tw-p-2 tw-px-4">{data.winners[0].winner ? data.winners[0].winner.join(", "): "-"}</td>
                <td className="tw-p-2 tw-px-4">{data.winners[0].branch}</td>
                <td className="tw-p-2 tw-px-4">{data.winners[0].cashier}</td>
                <td className="tw-p-2 tw-px-4">
                  <button
                    onClick={() => handleDeleteUser(data._id)}
                    className="tw-bg-red-500 tw-text-white tw-px-2 tw-py-1 tw-rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {error && <p className="tw-text-red-500 ">{error}</p>}
    </div>
  );
};

export default Users;
