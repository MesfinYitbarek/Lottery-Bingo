// components/CardFetcher.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import BingoCard from "./BingoCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Import Link
const CardFetcher = ({ selectedCards }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [branch, setBranch] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `/api/branch/getbranch/${currentUser.username}`
        );
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError("Error fetching User");
      }
    };

    fetchUsers();
  }, [currentUser.username]);
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
  const fetchCards = async (branch) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/card/getCards?branch=${branch}`);
      setCards(response.data);
    } catch (error) {
      setError("Failed to fetch cards");
    } finally {
      setLoading(false);
    }
  };

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  const handleSearch = () => {
    if (branch) {
      fetchCards(branch);
    } else {
      setError("Please select a branch");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/card/deletecard/${userId}`);
      fetchCards(branch); // Refetch cards after deleting
    } catch (err) {
      setError("Error deleting card");
    }
  };

  return (
    <div className="tw-bg-gray-100 tw-min-h-screen">
      <div className="tw-pt-7 tw-items-center tw-flex-col tw-justify-center tw-text-center branch-input">
      <Link to="/admin" className="tw-border-2 tw-p-1 tw-px-4 tw-border-blue-800 tw-text-blue-800">
        Back 
      </Link>
        <label htmlFor="branch" className="tw-text-lg tw-font-bold">
          Branch:{" "}
        </label>
        <select
          id="branch"
          onChange={handleBranchChange}
          className="tw-dark:bg-slate-100 sm:tw-w-[390px] tw-rounded-lg tw-border tw-border-slate-300 tw-p-2.5"
        >
          <option value="">Select Branch</option>
          {["admin", "employee"].includes(currentUser.role) ? (
            <option value={currentUser.branch}>{currentUser.branch}</option>
          ): currentUser.role == "superadmin" ? (
            superBranch.map((branch) => (
              <option key={branch.id} value={branch.name}>
                {branch.name}
              </option>
            ))
          ) : (
            users &&
            users.map((user) => (
              <option key={user.id} value={user.name}>{user.name}</option>
            ))
          )}
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading cards...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div className="row card-block justify-center margin-vertical-lg">
          <div className="col text-center">
            {cards.map((cardData, index) => (
              <div key={index} className="card blue tw-text-blue-800">
                <button
                  onClick={() => handleDeleteUser(cardData._id)}
                  className="tw-border-red-600 tw-text-red-600 tw-px-1 tw-rounded-none"
                >
                  Delete
                </button>
                <h3>Branch: {cardData.branch}</h3>
                <h3>Card ID: {cardData.id}</h3>
                <BingoCard card={cardData.card} color="blue" />
              </div>
            ))}
            <button className="altBtn" onClick={() => { window.print(); return false; }}>
              Print Cards
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardFetcher;