import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Gaming.css';

const Gaming = () => {
  const [searchParams] = useSearchParams();
  const [cartelas, setCartelas] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  // Fetch available cartelas from the API
  useEffect(() => {
    const fetchCartelas = async () => {
      try {
        const branch = searchParams.get('branch');
        const response = await fetch(`/api/card/getCards?branch=${branch}`);
        const data = await response.json();
        setCartelas(data);
      } catch (error) {
        alert('Error fetching cartelas:', error);
      }
    };

    fetchCartelas();
  }, [searchParams]);

  // Handle card selection
  const handleCardSelect = (card) => {
    // Create a new card object with selected states initialized
    const newCard = {
      ...card,
      card: {
        ...card.card,
        B: card.card.B.map((num) => ({ value: num, selected: false })),
        I: card.card.I.map((num) => ({ value: num, selected: false })),
        N: card.card.N.map((num) => ({ value: num, selected: false })),
        G: card.card.G.map((num) => ({ value: num, selected: false })),
        O: card.card.O.map((num) => ({ value: num, selected: false })),
      },
    };
    setSelectedCard(newCard);
  };

  // Handle cell click
  const handleCellClick = (columnKey, index) => {
    if (!selectedCard) return; // Ensure selectedCard is defined

    // Create a copy of the selected card
    const newCard = { ...selectedCard };
    // Toggle the selected state of the clicked cell
    newCard.card[columnKey][index].selected = !newCard.card[columnKey][index].selected;
    setSelectedCard(newCard);
  };

  return (
    <div className="gaming-container">
      <h1>Select a Cartela</h1>
      <div className="cartela-buttons">
        {cartelas.map((cartela) => (
          <button key={cartela._id} onClick={() => handleCardSelect(cartela)}>
            {cartela.id}
          </button>
        ))}
      </div>

      {selectedCard && (
        <div className="grid-container">
          <h2>Selected Cartela: {selectedCard.id}</h2>
          <div className="grid">
            {Object.keys(selectedCard.card).map((key) => (
              <div key={key} className="grid-row">
                {selectedCard.card[key].map((cell, index) => (
                  <div
                    key={index}
                    className={`grid-cell ${cell.selected ? 'selected' : ''}`}
                    onClick={() => handleCellClick(key, index)} // Pass column key and index
                  >
                    {cell.value}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gaming;