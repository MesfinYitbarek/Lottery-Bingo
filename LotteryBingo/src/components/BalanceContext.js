import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const BalanceContext = createContext();

export const useBalance = () => useContext(BalanceContext);

export const BalanceProvider = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/credit/${currentUser._id}/balance`
        );
        setBalance(res.data.balance);
      } catch (err) {
        alert('Error fetching balance');
      }
    };

    if (currentUser) {
      fetchBalance();
    }
  }, [currentUser]);

  return (
    <BalanceContext.Provider value={balance}>
      {children}
    </BalanceContext.Provider>
  );
};