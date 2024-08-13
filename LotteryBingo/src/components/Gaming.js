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
        B: card.card.B.map((num, index) => ({ value: num, selected: false })), // Set all cells to false
        I: card.card.I.map((num, index) => ({ value: num, selected: false })),
        N: card.card.N.map((num, index) => ({ value: num, selected: index === 2 ? 'green' : false })), // Set only the free cell as green
        G: card.card.G.map((num, index) => ({ value: num, selected: false })),
        O: card.card.O.map((num, index) => ({ value: num, selected: false })),
      },
    };
    setSelectedCard(newCard);
  };

  // Handle cell click
  const handleCellClick = (columnKey, index) => {
    if (!selectedCard) return;

    // Create a copy of the selected card
    const newCard = { ...selectedCard };
    // Toggle the selected state of the clicked cell, except for the free cell
    if (columnKey !== 'N' || index !== 2) {
      newCard.card[columnKey][index].selected = !newCard.card[columnKey][index].selected;
    }

    // Update the selected card state
    setSelectedCard(newCard);
    
    // Check for completed lines
    checkCompletedLines(newCard);
  };

  // Check for completed lines
  const checkCompletedLines = (card) => {
    const lines = [
      // Horizontal lines
      ...Array.from({ length: 5 }, (_, rowIndex) => ({
        cells: ['B', 'I', 'N', 'G', 'O'].map(col => card.card[col][rowIndex]),
        type: 'horizontal',
      })),
      // Vertical lines
      ...Array.from({ length: 5 }, (_, colIndex) => ({
        cells: ['B', 'I', 'N', 'G', 'O'].map(row => card.card[row][colIndex]),
        type: 'vertical',
      })),
      // Diagonal lines
      {
        cells: ['B', 'I', 'N', 'G', 'O'].map((col, index) => card.card[col][index]),
        type: 'diagonal-right',
      },
      {
        cells: ['B', 'I', 'N', 'G', 'O'].map((col, index) => card.card[col][4 - index]),
        type: 'diagonal-left',
      },
    ];

    lines.forEach(line => {
      // Check if all cells are selected or green
      if (line.cells.every(cell => cell.selected === true || cell.selected === 'green')) {
        line.cells.forEach(cell => {
          cell.selected = 'green'; // Mark the completed cells as green
        });
      }
    });

    setSelectedCard({ ...card }); // Update the selected card state to trigger re-render
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
                {['B', 'I', 'N', 'G', 'O'].map((columnKey, colIndex) => {
                  const cell = selectedCard.card[columnKey][rowIndex];
                  return (
                    <div
                      key={`${columnKey}-${rowIndex}`}
                      className={`grid-cell ${cell.selected === true ? 'selected' : ''} ${cell.selected === 'green' ? 'completed' : ''}`}
                      onClick={() => handleCellClick(columnKey, rowIndex)}
                    >
                      {cell.value}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gaming;