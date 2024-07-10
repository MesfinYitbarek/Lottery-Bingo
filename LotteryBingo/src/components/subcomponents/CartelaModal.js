import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import logoImage from "./winnerimg.jpg";


const CartelaModal = ({ calledBalls, onClose, betAmount, cardCount, totalAmount, selectedCards }) => {
  const [cartelaId, setCartelaId] = useState('');
  const [cartela, setCartela] = useState(null);
  const [matchedNumbers, setMatchedNumbers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [isBingo, setIsBingo] = useState(false);
  const [bingoNumbers, setBingoNumbers] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  
  const fetchCartela = async () => {
    const cartelaIdNumber = Number(cartelaId);

    if (!selectedCards.includes(cartelaIdNumber)) {
      alert('Cartela ID is not in the selected cards');
      return;
    }
    setIsFetching(true);
    setFetchError(null);
    try {
      const response = await fetch(`http://localhost:4000/api/card/cartela/${currentUser.branch}/${cartelaId}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch cartela');
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      setCartela(data);
    } catch (error) {
      setFetchError(error.message);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (cartela && cartela.length > 0) {
      console.log('Cartela state updated:', cartela);
      checkCartelaNumbers(cartela[0]);
    }
  }, [cartela]);

  const checkCartelaNumbers = (cartela) => {
    if (cartela && cartela.card) {
      const allNumbers = Object.values(cartela.card).flat();
      const matched = calledBalls.filter((call) =>
        allNumbers.includes(call.number)
      );
      setMatchedNumbers(matched);
      checkBingo(cartela.card, matched);
    }
  };

  const checkBingo = (card, matched) => {
    const rows = [...Array(5)].map((_, i) => Object.keys(card).map(col => card[col][i]));
    const columns = Object.values(card);
    const diagonals = [
      [card.B[0], card.I[1], card.N[2], card.G[3], card.O[4]],
      [card.O[0], card.G[1], card.N[2], card.I[3], card.B[4]]
    ];

    const lines = [...rows, ...columns, ...diagonals];

    let bingoLine = null;
    for (const line of lines) {
      if (line.every(num => matched.some(call => call.number === num))) {
        bingoLine = line;
        break;
      }
    }

    if (bingoLine) {
      saveBingoData(bingoLine);
    }

    setIsBingo(!!bingoLine);
    setBingoNumbers(bingoLine || []);
  };
console.log('cartelamodel', betAmount, cardCount, totalAmount,selectedCards)
  const saveBingoData = async (bingoLine) => {
    const total = totalAmount;
    const bingoData = {
      bet: betAmount,
      player: cardCount,
      total: totalAmount,
      call: calledBalls.length,
      winner: cartelaId,
      branch: currentUser.branch,
      cashier: currentUser.username,
      date: new Date().toISOString(),
      cut: total * (currentUser.cut / 100),
      won: total - (total * (currentUser.cut / 100)),
    };

    try {
      const response = await axios.post('http://localhost:4000/api/sales/sales', bingoData);
      if (response.status === 200) {
        console.log('Bingo data saved successfully');
      } else {
        console.error('Failed to save bingo data');
      }
    } catch (error) {
      console.error('Error saving bingo data:', error);
    }
  };

  useEffect(() => {
    console.log('Matched numbers updated:', matchedNumbers);
  }, [matchedNumbers]);

  return (
    <div>
      <div className="modal">
        <h4 className="margin-md">Enter Cartela ID</h4>
        <input
          type="text"
          placeholder="Enter cartela id"
          value={cartelaId}
          onChange={(e) => setCartelaId(e.target.value)}
        />
        <button onClick={fetchCartela} disabled={isFetching}>
          {isFetching ? 'Checking...' : 'Check'}
        </button>

        {fetchError && <div className="error">{fetchError}</div>}
        {cartela && cartela.length > 0 && cartela[0].card && (
          <div>
            <h4 className="margin-md">Cartela Numbers</h4>
            <div className="cartela-grid">
              {Object.entries(cartela[0].card).map(([column, numbers]) => (
                <div key={column} className="cartela-column">
                  <h5>{column}</h5>
                  {numbers.map((number) => {
                    const isMatched = matchedNumbers.some(
                      (call) => call.number === number
                    );
                    const isBingoNumber = bingoNumbers.includes(number);
                    return (
                      <div
                        key={number}
                        className={`${isMatched ? 'matched' : ''} ${
                          isBingoNumber ? 'bingo-number' : ''
                        }`}
                      >
                        {number}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            {isBingo && (
              // <div className="bingo-message tw-text-4xl tw-font-bold tw-text-red-600">
              //   Bingo!
              // </div>
              <div className="bingo-message tw-text-4xl tw-font-bold tw-text-red-600">
          <img src= {logoImage} alt="bingo!"  className='logo2'/>
        </div>
            )}
          </div>
        )}
        <p>
          <button onClick={onClose}>Close</button>
        </p>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default CartelaModal;