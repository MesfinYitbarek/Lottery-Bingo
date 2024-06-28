import React, { useState, useEffect } from 'react';

const CartelaModal = ({ calledBalls, onClose }) => {
  const [cartelaId, setCartelaId] = useState('');
  const [cartela, setCartela] = useState(null);
  const [matchedNumbers, setMatchedNumbers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const fetchCartela = async () => {
    setIsFetching(true);
    setFetchError(null);
    try {
      const response = await fetch(
        `http://localhost:4000/api/card/cartela/${cartelaId}`,
        {
          method: 'GET',
        }
      );
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
      // Flatten the card numbers into a single array
      const allNumbers = Object.values(cartela.card).flat();
      const matched = calledBalls.filter((call) =>
        allNumbers.includes(call.number)
      );
      setMatchedNumbers(matched);
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
                    return (
                      <div key={number} className={isMatched ? 'matched' : ''}>
                        {number}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
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
