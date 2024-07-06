// components/CardFetcher.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import BingoCard from "./BingoCard";

const CardFetcher = ({ selectedCards }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [branch, setBranch] = useState("");

  const fetchCards = async (branch) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:4000/api/card/getCards?branch=${branch}`);
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
    fetchCards(branch);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/api/card/deletecard/${userId}`);
      fetchCards(branch); // Refetch cards after deleting
    } catch (err) {
      setError("Error deleting card");
    }
  };

  return (
    <div className=" tw-bg-gray-100  tw-min-h-screen">
      <div className=" tw-pt-7  tw-items-center tw-flex-col tw-justify-center tw-text-center branch-input">
        <input
          type="text"
          value={branch}
          onChange={handleBranchChange}
          placeholder="Enter branch"
          className=" tw-p-2 tw-border-blue-800 "
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading cards...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div className="row card-block justify-center margin-vertical-lg">
          <div className="col text-center">
            {cards.map((cardData, index) => (
              <div key={index} className="card blue tw-text-blue-800">
                <h3>Card ID: {cardData.id}</h3>
                <h3>Branch: {cardData.branch}</h3>
                <button
                  onClick={() => handleDeleteUser(cardData._id)}
                  className="tw-border-red-600 tw-text-red-600 tw-px-1 tw-rounded-none"
                >
                  Delete
                </button>
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