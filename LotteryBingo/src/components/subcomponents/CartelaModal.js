import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import logoImage from "./winnerimg.jpg";

const CartelaModal = ({ calledBalls, onClose, betAmount, cardCount, totalAmount, selectedCards ,manualEnteredCut,manualCut}) => {
  const [cartelaId, setCartelaId] = useState('');
  const [cartela, setCartela] = useState(null);
  const [matchedNumbers, setMatchedNumbers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [isBingo, setIsBingo] = useState(false);
  const [bingoNumbers, setBingoNumbers] = useState([]);
  const [winnerCards, setWinnerCards] = useState([]);
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
      const response = await fetch(`/api/card/cartela/${currentUser.branch}/${cartelaId}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch cartela');
      }
      const data = await response.json();
      
      setCartela(data);
    } catch (error) {
      setFetchError(error.message);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (cartela && cartela.length > 0) {
      
      checkCartelaNumbers(cartela[0]);
    }
  }, [cartela]);

  const checkCartelaNumbers = (cartela) => {
    if (cartela && cartela.card) {
      const allNumbers = Object.values(cartela.card).flat();
      const matched = calledBalls.filter((call) =>
        allNumbers.includes(call.number)
      );

      // Always include the middle "Free" space as matched
      const freeSpace = { number: "Free", column: "N", index: 2 };
      matched.push(freeSpace);

      setMatchedNumbers(matched);
      checkBingo(cartela.card, matched);
    }
  };

  const checkBingo = (card, matched) => {
    const rows = [...Array(5)].map((_, i) => Object.keys(card).map(col => card[col][i]));
    const columns = Object.values(card);
    const diagonals = [
      [card.B[0], card.I[1], "Free", card.G[3], card.O[4]],
      [card.O[0], card.G[1], "Free", card.I[3], card.B[4]]
    ];

    const lines = [...rows, ...columns, ...diagonals];

    let bingoLine = null;
    for (const line of lines) {
      if (line.every(num => matched.some(call => call.number === num || num === "Free"))) {
        bingoLine = line;
        break;
      }
    }

    if (bingoLine) {
      saveBingoData();
    }

    setIsBingo(!!bingoLine);
    setBingoNumbers(bingoLine || []);
  };

  

  const saveBingoData = () => {
    setWinnerCards((prevWinnerCards) => [...prevWinnerCards, cartelaId]);
  };

  const handleEndGame = async () => {
    if (winnerCards.length === 0) {
      alert('No winners to save');
      return;
    }
  // console.log('manualcut is '+ manualCut);
  const total = totalAmount;
  let cut,won;


    const bingoData = {
      bet: betAmount,
      player: cardCount,
      total: totalAmount,
      call: calledBalls.length,
      winner: winnerCards,
      branch: currentUser.branch,
      cashier: currentUser.username,
      date: new Date().toISOString(),
    
      // cut: total * (currentUser.cut / 100),
      // won: total - (total * (currentUser.cut / 100)),
    };

    if (manualCut) {
      cut = total * (manualEnteredCut / 100);
       won = total - total * (manualEnteredCut / 100);
       bingoData.cut = cut;
       bingoData.won = won;
    } else {
      cut = total * (currentUser.cut / 100);
      won = total - total * (currentUser.cut / 100);
      bingoData.cut = cut;
      bingoData.won = won;
    }
    try {
      const response = await axios.post('/api/sales/sales', { winners: [bingoData] });
      if (response.status === 200) {
        
        alert('Sales data saved successfully');
        setWinnerCards([]); // Clear winner cards after saving
        onClose(); // Close the modal
      } else {
        alert('Failed to save bingo data');
      }
    } catch (error) {
      alert('Error saving bingo data:', error);
    }
  };

  useEffect(() => {
    
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
                  {numbers.map((number, index) => {
                    const isMatched = matchedNumbers.some(
                      (call) => call.number === number
                    );
                    const isBingoNumber = bingoNumbers.includes(number);
                    const isFreeSpace = column === 'N' && index === 2;
                    return (
                      <div
                        key={number}
                        className={`${isMatched || isFreeSpace ? 'matched' : ''} ${
                          isBingoNumber || isFreeSpace ? 'bingo-number' : ''
                        } ${isFreeSpace ? 'free-space' : ''}`}
                      >
                        {isFreeSpace ? "Free" : number}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            {isBingo && (
              <div className="bingo-message tw-text-4xl tw-font-bold tw-text-red-600">
                <img src={logoImage} alt="bingo!" className='logo2' />
              </div>
            )}
          </div>
        )}
        <p>
          <button onClick={onClose}>Close</button>
          <button onClick={handleEndGame} disabled={winnerCards.length === 0}>End Game</button>
        </p>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default CartelaModal;