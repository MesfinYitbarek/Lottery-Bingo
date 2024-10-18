import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Gaming.css';

const Gaming = () => {
  const [searchParams] = useSearchParams();
  const [cartelas, setCartelas] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

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
    if (selectedCards.some(selectedCard => selectedCard._id === card._id)) {
      // If already selected, remove it
      setSelectedCards(selectedCards.filter(selectedCard => selectedCard._id !== card._id));
    } else {
      // Otherwise, add it to the selection
      const newCard = {
        ...card,
        card: {
          B: card.card.B.map(num => ({ value: num, selected: false })),
          I: card.card.I.map(num => ({ value: num, selected: false })),
          N: card.card.N.map((num, index) => ({ value: num, selected: index === 2 ? 'green' : false })),
          G: card.card.G.map(num => ({ value: num, selected: false })),
          O: card.card.O.map(num => ({ value: num, selected: false })),
        },
      };
      setSelectedCards([...selectedCards, newCard]);
    }
  };

  // Handle cell click
  const handleCellClick = (columnKey, index, cardId) => {
    const newCards = selectedCards.map(card => {
      if (card._id === cardId) {
        const newCard = { ...card };
        if (columnKey !== 'N' || index !== 2) {
          newCard.card[columnKey][index].selected = !newCard.card[columnKey][index].selected;
        }
        return newCard;
      }
      return card;
    });

    setSelectedCards(newCards);
    
    // Check for completed lines for this specific card
    checkCompletedLines(newCards.find(card => card._id === cardId));
  };

  // Check for completed lines
  const checkCompletedLines = (card) => {
    ['B', 'I', 'N', 'G', 'O'].forEach(col => {
      const allSelectedOrGreen = card.card[col].every(cell => cell.selected === true || cell.selected === 'green');
      if (allSelectedOrGreen) {
        card.card[col].forEach(cell => cell.selected = 'green'); // Mark as completed
      }
    });

    Array.from({ length: 5 }, (_, rowIndex) => ({
      cells: ['B', 'I', 'N', 'G', 'O'].map(col => card.card[col][rowIndex]),
      type: 'horizontal',
    })).forEach(line => {
      const allSelectedOrGreen = line.cells.every(cell => cell.selected === true || cell.selected === 'green');
      if (allSelectedOrGreen) {
        line.cells.forEach(cell => cell.selected = 'green'); // Mark as completed
      }
    });

    [
      ['B', 'I', 'N', 'G', 'O'].map((col, index) => card.card[col][index]), // Top-left to bottom-right
      ['B', 'I', 'N', 'G', 'O'].map((col, index) => card.card[col][4 - index]), // Top-right to bottom-left
    ].forEach(diagonalLine => {
      const allSelectedOrGreen = diagonalLine.every(cell => cell.selected === true || cell.selected === 'green');
      if (allSelectedOrGreen) {
        diagonalLine.forEach(cell => cell.selected = 'green'); // Mark as completed
      }
    });

    setSelectedCards(prevCards =>
      prevCards.map(prevCard =>
        prevCard._id === card._id ? { ...card } : prevCard
      )
    );
  };

  return (
    <div className="gaming-container">
      <h1>Select Cartelas</h1>
      <div className="cartela-buttons">
        {cartelas.map((cartela) => (
          <button key={cartela._id} onClick={() => handleCardSelect(cartela)}>
            {cartela.id}
          </button>
        ))}
      </div>

      {selectedCards.length > 0 && (
        <div className="grid-container">
          {selectedCards.map(selectedCard => (
            <div key={selectedCard._id} className="grid-wrapper">
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
                    {['B', 'I', 'N', 'G', 'O'].map((columnKey) => {
                      const cell = selectedCard.card[columnKey][rowIndex];
                      return (
                        <div
                          key={`${columnKey}-${rowIndex}`}
                          className={`grid-cell ${cell.selected ? 'selected' : ''} ${cell.selected === 'green' ? 'completed' : ''}`}
                          onClick={() => handleCellClick(columnKey, rowIndex, selectedCard._id)}
                        >
                          {cell.value}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gaming;