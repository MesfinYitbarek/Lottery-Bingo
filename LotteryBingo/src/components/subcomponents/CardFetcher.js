// components/CardFetcher.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import BingoCard from "./BingoCard";



const CardFetcher = ({selectedCards}) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("selected", selectedCards);
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/card/getCards"
        );
        setCards(response.data);
      } catch (error) {
        setError("Failed to fetch cards");
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [cards]);

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/card/deletecard/${userId}`);

      
    } catch (err) {
      
      setError("Error deleting User");
    }
  };

  if (loading) return <p>Loading cards...</p>;
  if (error) return <p>{error}</p>;

  return (
    
    <div className="row card-block justify-center margin-vertical-lg">
      <div className="col text-center">
        {cards.map((cardData, index) => (
          <div  key={index} className="card blue">
            <h3>Card ID: {cardData.id}</h3>
            <h3>Branch: {cardData.branch}</h3>
            <button onClick={() => handleDeleteUser(cardData._id)} className='tw-border-red-600  tw-px-1 tw-rounded-none ' >
                  Delete
                </button>
            <BingoCard card={cardData.card} color="blue" />
          </div>

        ))}
                <button  className="altBtn" onClick={() => {window.print();return false;}}>Print Cards</button>

      </div>
    </div>
  );
};



export default CardFetcher;
