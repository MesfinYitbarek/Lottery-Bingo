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
        
        // Sort cartelas by ID in ascending order
        const sortedCartelas = data.sort((a, b) => a.id - b.id);
        setCartelas(sortedCartelas);
      } catch (error) {
        alert('Error fetching cartelas:', error);
      }
    };

    fetchCartelas();
  }, [searchParams]);

  // Handle card selection
  const handleCardSelect = (card) => {
    const newCard = {
      ...card,
      card: {
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
    if (!selectedCard) return;

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
            <div className="grid-row grid-header">
              <div className="grid-cell header-cell">B</div>
              <div className="grid-cell header-cell">I</div>
              <div className="grid-cell header-cell">N</div>
              <div className="grid-cell header-cell">G</div>
              <div className="grid-cell header-cell">O</div>
            </div>
            {/* Create the grid vertically */}
            {Array.from({ length: 5 }, (_, rowIndex) => (
              <div key={rowIndex} className="grid-row">
                <div
                  className={`grid-cell ${selectedCard.card.B[rowIndex].selected ? 'selected' : ''}`}
                  onClick={() => handleCellClick('B', rowIndex)}
                >
                  {selectedCard.card.B[rowIndex].value}
                </div>
                <div
                  className={`grid-cell ${selectedCard.card.I[rowIndex].selected ? 'selected' : ''}`}
                  onClick={() => handleCellClick('I', rowIndex)}
                >
                  {selectedCard.card.I[rowIndex].value}
                </div>
                <div
                  className={`grid-cell ${selectedCard.card.N[rowIndex].selected ? 'selected' : ''}`}
                  onClick={() => handleCellClick('N', rowIndex)}
                >
                  {selectedCard.card.N[rowIndex].value}
                </div>
                <div
                  className={`grid-cell ${selectedCard.card.G[rowIndex].selected ? 'selected' : ''}`}
                  onClick={() => handleCellClick('G', rowIndex)}
                >
                  {selectedCard.card.G[rowIndex].value}
                </div>
                <div
                  className={`grid-cell ${selectedCard.card.O[rowIndex].selected ? 'selected' : ''}`}
                  onClick={() => handleCellClick('O', rowIndex)}
                >
                  {selectedCard.card.O[rowIndex].value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gaming;