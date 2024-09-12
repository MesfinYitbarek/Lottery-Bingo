import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import logoImage from "./winnerimg.jpg";
import { ImExit } from "react-icons/im";
import { FaLock } from "react-icons/fa6";
import { winsound } from '../../chimes';
import { notwinsound } from '../../chimes';

const CartelaModal = ({ calledBalls, onClose,onReset, betAmount, cardCount, totalAmount, selectedCards, manualEnteredCut, manualCut, selectedPattern ,selectedPattern2 }) => {
  const [cartelaId, setCartelaId] = useState('');
  const [cartela, setCartela] = useState(null);
  const [matchedNumbers, setMatchedNumbers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [isBingo, setIsBingo] = useState(false);
  const [bingoNumbers, setBingoNumbers] = useState([]);
  const [winnerCards, setWinnerCards] = useState([]);
  const [lockedCards, setLockedCards] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const audioRef = useRef(new Audio(winsound));
  const loseAudioRef = useRef(new Audio(notwinsound));
  const inputRef = useRef(null);
  useEffect(() => {
    const storedLockedCards = JSON.parse(localStorage.getItem('lockedCards')) || [];
    setLockedCards(storedLockedCards);
  }, []);
  useEffect(() => {
    // Focus on the input field when the component mounts
    inputRef.current.focus();
  }, []);

  const fetchCartela = async () => {
    const cartelaIdNumber = Number(cartelaId);
    if (!selectedCards.includes(cartelaIdNumber)) {
      alert('Cartela ID is not in the selected cards');
      return;
    }
    if (lockedCards.includes(cartelaIdNumber)) {
      alert('This card is locked and cannot be checked again 😭😭.');
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
      const matched = calledBalls.filter((call) => allNumbers.includes(call.number));
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
      [card.B[0], card.I[1], "Free", card.G[3], card.O[4]], // Main diagonal
      [card.O[0], card.G[1], "Free", card.I[3], card.B[4]]  // Secondary diagonal
    ];
  
    const lines = [...rows, ...columns, ...diagonals];
    let bingoLine = null;
  
    const isWinningPattern = (line) => {
      return line.every(num => matched.some(call => call.number === num || num === "Free"));
    };
    const letterA = [
      [card.B[0],card.B[1], card.B[2],card.B[3],card.B[4],card.I[2],  card.B[4], 
      card.O[0], card.I[0],card.N[0],  card.G[0], card.O[3], card.O[2], card.O[1],  card.O[4],card.N[2],card.G[2],   ], //a
  
      [card.B[0], card.B[1],  card.B[4], card.B[3],card.B[2],
      card.O[0],  card.O[3], card.O[2], card.O[1],  card.O[4],card.I[2],card.N[2],card.G[2],   ], //H
  
      [card.B[0], card.B[1],  card.B[4], card.B[3],card.B[2],
       card.I[0],card.N[0],  card.G[0], card.O[3], card.O[2], card.O[1],  card.I[4],card.N[4],card.G[4]], //D
      
       [card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
       card.O[0],  card.O[3], card.O[2], card.O[1],  card.O[4],card.I[4],card.N[4],card.G[4],   ], //U
      
  ];

  const FMCC = [
    [card.B[0], card.I[1],  card.B[4], card.I[3],card.G[1],
    card.O[0], card.G[3],  card.O[4]], 
    
];

const MS4 = [
  [ card.I[1],   card.I[3],card.G[1],
  card.G[3]], 
  
];

const CS4 = [
  [card.B[0],  card.B[4], 
  card.O[0],   card.O[4]], 
  
];
const FH = [
  [card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],], 
  
];
  const ATH = [
    [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
    card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2]],

    [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
    card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1]], 

    [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
    card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3]], 

    [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
    card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4]], 

    [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
    card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1]], 

    [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
    card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1]], 

    [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
    card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1]], 

    [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
    card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3]], 

    [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
    card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4]], 

    [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
    card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4]], 


];

const ATV = [
  [card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]], 

  [card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4]], 

  [card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4]], 

  [card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]], 
  
  [ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]], 
  
  [  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]], 

  [ card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]], 

  [ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],], 

  [ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]], 

  [ card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]], 
];

const ATL = [
  [card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]], 

  [card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4]], 

  [card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4], 
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4]], 

  [card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]], 
  
  [ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]], 
  
  [  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]], 

  [ card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]], 

  [ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],], 

  [ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]], 

  [ card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]], 

  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
    card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2]],

    [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
    card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1]], 

    [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
    card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3]], 

    [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
    card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4]], 

    [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
    card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1]], 

    [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
    card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1]], 

    [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
    card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1]], 

    [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
    card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3]], 

    [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
    card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4]], 

    [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
    card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4]], 

    [card.B[0], card.I[1], "Free", card.G[3], card.O[4],
  card.O[0], card.G[1], "Free", card.I[3], card.B[4]],

  [card.N[0], card.N[1], "Free", card.N[3], card.N[4],
  card.O[2], card.G[2], "Free", card.I[2], card.B[2]],

  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4]],

  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]],
  
  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]],

  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]],

  [card.B[0], card.I[1],  card.N[2], card.G[3],card.O[4],
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]],

  [card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.B[0], card.I[1], "Free", card.G[3], card.O[4]],

  [card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
  card.B[0], card.I[1], "Free", card.G[3], card.O[4]],

  [card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
  card.B[0], card.I[1], "Free", card.G[3], card.O[4]],

  [card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4],
  card.B[0], card.I[1], "Free", card.G[3], card.O[4]],

  [card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],
  card.B[0], card.I[1], "Free", card.G[3], card.O[4]],

  [card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.B[4], card.I[3], "Free", card.G[1], card.O[0]],

  [card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
  card.B[4], card.I[3], "Free", card.G[1], card.O[0]],

  [card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
  card.B[4], card.I[3], "Free", card.G[1], card.O[0]],

  [card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4],
  card.B[4], card.I[3], "Free", card.G[1], card.O[0]],

  [card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],
  card.B[4], card.I[3], "Free", card.G[1], card.O[0]],



  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.B[4], card.I[3], "Free", card.G[1], card.O[0]],

  [card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.B[4], card.I[3], "Free", card.G[1], card.O[0]],

  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[4], card.I[3], "Free", card.G[1], card.O[0]],

  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[4], card.I[3], "Free", card.G[1], card.O[0]],

  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[4], card.I[3], "Free", card.G[1], card.O[0]],


  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.B[0], card.I[1], "Free", card.G[3], card.O[4]],

  [card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.B[0], card.I[1], "Free", card.G[3], card.O[4]],

  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[0], card.I[1], "Free", card.G[3], card.O[4]],

  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[0], card.I[1], "Free", card.G[3], card.O[4]],

  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[0], card.I[1], "Free", card.G[3], card.O[4]],

  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.N[0], card.N[1], "Free", card.N[3], card.N[4]],

  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.N[0], card.N[1], "Free", card.N[3], card.N[4]],

  [card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.N[0], card.N[1], "Free", card.N[3], card.N[4]],

  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.N[0], card.N[1], "Free", card.N[3], card.N[4]],

  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4]],


  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]],

   
  [card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]],


  [card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4]],

  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4]],

  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4]],

  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4]],

  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4]],

  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]],

  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]],

  [card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]],
  
  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]],

  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]],



  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4]],

  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4]],

  [card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4]],
  
  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4]],

  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4]],

];
const AHORAVER=[
  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4]],

  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]],

  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4]],

  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4]],

  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]],


  [card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4]],

  [card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]],

  [card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4]],

  [card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4]],

  [card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]],


  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4]],

  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]],

  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4]],

  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4]],

  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]],


  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4]],

  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]],

  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4]],

  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4]],

  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]],



  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4]],

  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]],

  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4]],

  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4]],

  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]],
];




const AHORADIA=[
  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.B[0], card.I[1],  card.N[2], card.G[3],card.O[4]],

  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.B[4], card.I[3],  card.N[2], card.G[1],card.O[0]],


  [card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.B[0], card.I[1],  card.N[2], card.G[3],card.O[4]],

  [card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.B[4], card.I[3],  card.N[2], card.G[1],card.O[0]],


  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[0], card.I[1],  card.N[2], card.G[3],card.O[4]],

  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[4], card.I[3],  card.N[2], card.G[1],card.O[0]],


  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[0], card.I[1],  card.N[2], card.G[3],card.O[4]],

  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[4], card.I[3],  card.N[2], card.G[1],card.O[0]],


  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[0], card.I[1],  card.N[2], card.G[3],card.O[4]],

  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[4], card.I[3],  card.N[2], card.G[1],card.O[0]],
];


const AHORATV=[
  [card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
  card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],

], 
[card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],

],

[card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
  card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],

],

[card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
  card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],

],

[card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],

],



[card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4],
card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
],

[card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4],
card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
],


[card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4],
card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
],

[card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
],

  [card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
], 



[card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],
card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
],

[card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],
card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
],


[card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],
card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
],

[card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
],

  [card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
], 



[card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
], 


[card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
], 


[card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
], 

[card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
], 

  [card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
], 



[ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
], 


[ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
], 

[ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
], 

[ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
], 
  
  [ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
], 



  

[  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
  card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
],


[  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
],

[  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
  card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
],

[  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
  card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
],

  [  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
], 



[ card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
], 


[ card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
], 

[ card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
], 

[ card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
], 

  [ card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
], 


[ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],
  card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
],

[ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
],

[ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],
  card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
],

[ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],
  card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
],

  [ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
], 





[ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
], 

[ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
], 

[ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
], 
[ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
], 

  [ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
], 


[ card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
],

[ card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
],

[ card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
],

[ card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
],

  [ card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
],
];

const AHORMS=[
  [ card.I[1],   card.I[3],card.G[1],
  card.G[3],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
],

[ card.I[1],   card.I[3],card.G[1],
card.G[3],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
],

[ card.I[1],   card.I[3],card.G[1],
card.G[3],
card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
],

[ card.I[1],   card.I[3],card.G[1],
card.G[3],
card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
],

[ card.I[1],   card.I[3],card.G[1],
card.G[3],
card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
],

];


const AHORCS=[
  [card.B[0],  card.B[4], 
  card.O[0],   card.O[4],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
],

[ card.B[0],  card.B[4], 
card.O[0],   card.O[4],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
],

[ card.B[0],  card.B[4], 
card.O[0],   card.O[4],
card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
],

[ card.B[0],  card.B[4], 
card.O[0],   card.O[4],
card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
],

[ card.B[0],  card.B[4], 
card.O[0],   card.O[4],
card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
],

];

const AHORFMC=[
  [  card.B[0], card.I[1],  card.B[4], card.I[3],card.G[1],
  card.O[0], card.G[3],  card.O[4], 
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
],

[  card.B[0], card.I[1],  card.B[4], card.I[3],card.G[1],
card.O[0], card.G[3],  card.O[4], 
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
],

[  card.B[0], card.I[1],  card.B[4], card.I[3],card.G[1],
card.O[0], card.G[3],  card.O[4], 
card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
],

[  card.B[0], card.I[1],  card.B[4], card.I[3],card.G[1],
card.O[0], card.G[3],  card.O[4], 
card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
],

[   card.B[0], card.I[1],  card.B[4], card.I[3],card.G[1],
card.O[0], card.G[3],  card.O[4], 
card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
],

];




// Anyvertical






const AVERADIA=[
  [card.B[0],card.B[1],card.B[2],card.B[3],card.B[4],
  card.B[0], card.I[1],  card.N[2], card.G[3],card.O[4]],

  [card.B[0],card.B[1],card.B[2],card.B[3],card.B[4],
  card.B[4], card.I[3],  card.N[2], card.G[1],card.O[0]],


  [card.I[0],card.I[1],card.I[2],card.I[3],card.I[4],
  card.B[0], card.I[1],  card.N[2], card.G[3],card.O[4]],

  [card.I[0],card.I[1],card.I[2],card.I[3],card.I[4],
  card.B[4], card.I[3],  card.N[2], card.G[1],card.O[0]],


  [card.N[0],card.N[1],card.N[2],card.N[3],card.N[4],
  card.B[0], card.I[1],  card.N[2], card.G[3],card.O[4]],

  [card.N[0],card.N[1],card.N[2],card.N[3],card.N[4],
  card.B[4], card.I[3],  card.N[2], card.G[1],card.O[0]],


  [card.G[0],card.G[1],card.G[2],card.G[3],card.G[4],
  card.B[0], card.I[1],  card.N[2], card.G[3],card.O[4]],

  [card.G[0],card.G[1],card.G[2],card.G[3],card.G[4],
  card.B[4], card.I[3],  card.N[2], card.G[1],card.O[0]],


  [card.O[0],card.O[1],card.O[2],card.O[3],card.O[4],
  card.B[0], card.I[1],  card.N[2], card.G[3],card.O[4]],

  [card.O[0],card.O[1],card.O[2],card.O[3],card.O[4],
  card.B[4], card.I[3],  card.N[2], card.G[1],card.O[0]],
];



const AVERMS=[
  [ card.I[1],   card.I[3],card.G[1],
  card.G[3],
  card.O[0],card.O[1],card.O[2],card.O[3],card.O[4],
],

[ card.I[1],   card.I[3],card.G[1],
card.G[3],
card.G[0],card.G[1],card.G[2],card.G[3],card.G[4],
],

[ card.I[1],   card.I[3],card.G[1],
card.G[3],
card.N[0],card.N[1],card.N[2],card.N[3],card.N[4],
],

[ card.I[1],   card.I[3],card.G[1],
card.G[3],
card.I[0],card.I[1],card.I[2],card.I[3],card.I[4],
],

[ card.I[1],   card.I[3],card.G[1],
card.G[3],
card.B[0],card.B[1],card.B[2],card.B[3],card.B[4],
],

];


const AVERCS=[
  [card.B[0],  card.B[4], 
  card.O[0],   card.O[4],
  card.O[0],card.O[1],card.O[2],card.O[3],card.O[4],
],

[ card.B[0],  card.B[4], 
card.O[0],   card.O[4],
card.I[0],card.I[1],card.I[2],card.I[3],card.I[4],
],

[ card.B[0],  card.B[4], 
card.O[0],   card.O[4],
card.N[0],card.N[1],card.N[2],card.N[3],card.N[4],
],

[ card.B[0],  card.B[4], 
card.O[0],   card.O[4],
card.G[0],card.G[1],card.G[2],card.G[3],card.G[4],
],

[ card.B[0],  card.B[4], 
card.O[0],   card.O[4],
card.B[0],card.B[1],card.B[2],card.B[3],card.B[4],
],

];

const AVERFMC=[
  [  card.B[0], card.I[1],  card.B[4], card.I[3],card.G[1],
  card.O[0], card.G[3],  card.O[4], 
  card.B[0],card.B[1],card.B[2],card.B[3],card.B[4],
],

[  card.B[0], card.I[1],  card.B[4], card.I[3],card.G[1],
card.O[0], card.G[3],  card.O[4], 
card.I[0],card.I[1],card.I[2],card.I[3],card.I[4],
],

[  card.B[0], card.I[1],  card.B[4], card.I[3],card.G[1],
card.O[0], card.G[3],  card.O[4], 
card.N[0],card.N[1],card.N[2],card.N[3],card.N[4],
],

[  card.B[0], card.I[1],  card.B[4], card.I[3],card.G[1],
card.O[0], card.G[3],  card.O[4], 
card.G[0],card.G[1],card.G[2],card.G[3],card.G[4],
],

[   card.B[0], card.I[1],  card.B[4], card.I[3],card.G[1],
card.O[0], card.G[3],  card.O[4], 
card.O[0],card.O[1],card.O[2],card.O[3],card.O[4],
],

];



const AVERATH = [
  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2]
  ,card.B[0],card.B[1],card.B[2],card.B[3],card.B[4],],

  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2]
  ,card.I[0],card.I[1],card.I[2],card.I[3],card.I[4],],

  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2]
  ,card.N[0],card.N[1],card.N[2],card.N[3],card.N[4],],

  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2]
  ,card.G[0],card.G[1],card.G[2],card.G[3],card.G[4],],

  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2]
  ,card.O[0],card.O[1],card.O[2],card.O[3],card.O[4],],




  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.B[0],card.B[1],card.B[2],card.B[3],card.B[4],
], 
[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.I[0],card.I[1],card.I[2],card.I[3],card.I[4],
],
[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.N[0],card.N[1],card.N[2],card.N[3],card.N[4],
],
[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.G[0],card.G[1],card.G[2],card.G[3],card.G[4],
],
[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.O[0],card.O[1],card.O[2],card.O[3],card.O[4],
],


  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[0],card.B[1],card.B[2],card.B[3],card.B[4],
],

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.I[0],card.I[1],card.I[2],card.I[3],card.I[4],
],

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.N[0],card.N[1],card.N[2],card.N[3],card.N[4],
],

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.G[0],card.G[1],card.G[2],card.G[3],card.G[4],
],

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.O[0],card.O[1],card.O[2],card.O[3],card.O[4],
],
  





  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[0],card.B[1],card.B[2],card.B[3],card.B[4],
], 

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
card.I[0],card.I[1],card.I[2],card.I[3],card.I[4],
], 

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
card.N[0],card.N[1],card.N[2],card.N[3],card.N[4],
], 

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
card.G[0],card.G[1],card.G[2],card.G[3],card.G[4],
],
[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
card.O[0],card.O[1],card.O[2],card.O[3],card.O[4],
],



  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.B[0],card.B[1],card.B[2],card.B[3],card.B[4],
], 
[card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.I[0],card.I[1],card.I[2],card.I[3],card.I[4],
], 
[card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.N[0],card.N[1],card.N[2],card.N[3],card.N[4],
], 
[card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.G[0],card.G[1],card.G[2],card.G[3],card.G[4],
], 
[card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.O[0],card.O[1],card.O[2],card.O[3],card.O[4],
], 

 


  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.B[0],card.B[1],card.B[2],card.B[3],card.B[4],
], 

[card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.I[0],card.I[1],card.I[2],card.I[3],card.I[4],
],

[card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.N[0],card.N[1],card.N[2],card.N[3],card.N[4],
],

[card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.G[0],card.G[1],card.G[2],card.G[3],card.G[4],
],

[card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.O[0],card.O[1],card.O[2],card.O[3],card.O[4],
],


  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.B[0],card.B[1],card.B[2],card.B[3],card.B[4],],
  
  
  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.I[0],card.I[1],card.I[2],card.I[3],card.I[4],],
  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.N[0],card.N[1],card.N[2],card.N[3],card.N[4],],
  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.G[0],card.G[1],card.G[2],card.G[3],card.G[4],],
  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.O[0],card.O[1],card.O[2],card.O[3],card.O[4],],




  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[0],card.B[1],card.B[2],card.B[3],card.B[4],
], 

[card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.I[0],card.I[1],card.I[2],card.I[3],card.I[4],
], 

[card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.N[0],card.N[1],card.N[2],card.N[3],card.N[4],
], 

[card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.G[0],card.G[1],card.G[2],card.G[3],card.G[4],
], 

[card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.O[0],card.O[1],card.O[2],card.O[3],card.O[4],
], 





  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[0],card.B[1],card.B[2],card.B[3],card.B[4],], 

  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.I[0],card.I[1],card.I[2],card.I[3],card.I[4],], 

  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.N[0],card.N[1],card.N[2],card.N[3],card.N[4],], 

  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.G[0],card.G[1],card.G[2],card.G[3],card.G[4],], 

  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.O[0],card.O[1],card.O[2],card.O[3],card.O[4],], 

 // card.O[0],card.O[1],card.O[2],card.O[3],card.O[4],
// card.G[0],card.G[1],card.G[2],card.G[3],card.G[4],
// card.N[0],card.N[1],card.N[2],card.N[3],card.N[4],
// card.I[0],card.I[1],card.I[2],card.I[3],card.I[4],
// card.B[0],card.B[1],card.B[2],card.B[3],card.B[4],





  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[0],card.B[1],card.B[2],card.B[3],card.B[4],
], 
[card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
card.I[0],card.I[1],card.I[2],card.I[3],card.I[4],
], 
[card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
card.N[0],card.N[1],card.N[2],card.N[3],card.N[4],
], 
[card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
card.G[0],card.G[1],card.G[2],card.G[3],card.G[4],
], 
[card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
card.O[0],card.O[1],card.O[2],card.O[3],card.O[4],
], 


];

/// DIAGONAL

// [card.B[0], card.I[1], "Free", card.G[3], card.O[4]], 
//[card.O[0], card.G[1], "Free", card.I[3], card.B[4]] 
const ADATH=[

  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2]
  ,card.B[0], card.I[1], "Free", card.G[3], card.O[4]],

  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2]
  ,card.O[0], card.G[1], "Free", card.I[3], card.B[4]],

  




  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.B[0], card.I[1], "Free", card.G[3], card.O[4]
], 
[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.O[0], card.G[1], "Free", card.I[3], card.B[4]
],



  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[0], card.I[1], "Free", card.G[3], card.O[4]
],

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.O[0], card.G[1], "Free", card.I[3], card.B[4]
],


  





  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[0], card.I[1], "Free", card.G[3], card.O[4]
], 

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
card.O[0], card.G[1], "Free", card.I[3], card.B[4]
], 





  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.B[0], card.I[1], "Free", card.G[3], card.O[4]
], 
[card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.O[0], card.G[1], "Free", card.I[3], card.B[4]
], 


 


  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.B[0], card.I[1], "Free", card.G[3], card.O[4]
], 

[card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.O[0], card.G[1], "Free", card.I[3], card.B[4]
],




  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.B[0], card.I[1], "Free", card.G[3], card.O[4]],
  
  
  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.O[0], card.G[1], "Free", card.I[3], card.B[4]],
  




  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[0], card.I[1], "Free", card.G[3], card.O[4]
], 

[card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.O[0], card.G[1], "Free", card.I[3], card.B[4]
], 






  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[0], card.I[1], "Free", card.G[3], card.O[4]], 

  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.O[0], card.G[1], "Free", card.I[3], card.B[4]], 

  

  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[0], card.I[1], "Free", card.G[3], card.O[4]
], 
[card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
card.O[0], card.G[1], "Free", card.I[3], card.B[4]
], 


];
//    card.B[0], card.I[1], "Free", card.G[3], card.O[4] 
//    card.O[0], card.G[1], "Free", card.I[3], card.B[4]
const ADATV=[
  [card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
  card.B[0], card.I[1], "Free", card.G[3], card.O[4] 

], 
[card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
  card.O[0], card.G[1], "Free", card.I[3], card.B[4]

],





[card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4],
card.B[0], card.I[1], "Free", card.G[3], card.O[4] 
],

[card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4],
card.O[0], card.G[1], "Free", card.I[3], card.B[4]
],


 



[card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],
card.B[0], card.I[1], "Free", card.G[3], card.O[4] 
],

[card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],
card.O[0], card.G[1], "Free", card.I[3], card.B[4]
],






[card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
card.B[0], card.I[1], "Free", card.G[3], card.O[4] 
], 


[card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
card.O[0], card.G[1], "Free", card.I[3], card.B[4]
], 






[ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
card.B[0], card.I[1], "Free", card.G[3], card.O[4] 
], 


[ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
card.O[0], card.G[1], "Free", card.I[3], card.B[4]
], 





  

[  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
  card.B[0], card.I[1], "Free", card.G[3], card.O[4] 
],


[  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
  card.O[0], card.G[1], "Free", card.I[3], card.B[4]
],





[ card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
card.B[0], card.I[1], "Free", card.G[3], card.O[4] 
], 


[ card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4],
card.O[0], card.G[1], "Free", card.I[3], card.B[4]
], 




[ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],
  card.B[0], card.I[1], "Free", card.G[3], card.O[4] 
],

[ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],
  card.O[0], card.G[1], "Free", card.I[3], card.B[4]
],







[ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
card.B[0], card.I[1], "Free", card.G[3], card.O[4] 
], 

[ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
card.O[0], card.G[1], "Free", card.I[3], card.B[4]
], 




[ card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
card.B[0], card.I[1], "Free", card.G[3], card.O[4] 
],

[ card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
card.O[0], card.G[1], "Free", card.I[3], card.B[4]
],

];
//card.O[0], card.G[1], "Free", card.I[3], card.B[4]
//card.B[0], card.I[1], "Free", card.G[3], card.O[4] 
const ADMS=[
  [ card.I[1],   card.I[3],card.G[1],
  card.G[3],
  card.O[0], card.G[1], "Free", card.I[3], card.B[4]
], 
[ card.I[1],   card.I[3],card.G[1],
  card.G[3],
  card.B[0], card.I[1], "Free", card.G[3], card.O[4] 
], 

];


const ADCS=[
  [ card.B[0],  card.B[4], 
  card.O[0],   card.O[4],
  card.O[0], card.G[1], "Free", card.I[3], card.B[4]
], 
[ card.B[0],  card.B[4], 
card.O[0],   card.O[4],
  card.B[0], card.I[1], "Free", card.G[3], card.O[4] 
], 

];


const ADFMC=[
  [ card.B[0], card.I[1],  card.B[4], card.I[3],card.G[1],
  card.O[0], card.G[3],  card.O[4],
  card.O[0], card.G[1], "Free", card.I[3], card.B[4]
], 
[ card.B[0], card.I[1],  card.B[4], card.I[3],card.G[1],
card.O[0], card.G[3],  card.O[4],
  card.B[0], card.I[1], "Free", card.G[3], card.O[4] 
], 

];



// [card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
//   card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]], 

//   [card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
///   card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4]], 

//   [card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
// /  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4]], 

//   [card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
///   card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]], 
  
//   [ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
///   card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]], 
  
//   [  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
///  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]], 

//   [ card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
///  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]], 

//   [ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
//   card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],], 

//   [ card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
//   card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]], 

//   [ card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],1 
//   card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]], 



const ATHATV=[
  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
  card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
   card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
],
[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
],
[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
   card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],
],
[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
 card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
],

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
 card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
],

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
 card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
   card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
],


[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
   card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
],

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
   card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4]
],

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4]
],

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
],




  

  [card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
   card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
   card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
],
[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
 card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
],
[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
 card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
   card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],
],
[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
 card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
 card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
],

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
 card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
 card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
],

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
 card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
 card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
   card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
],


[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
 card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
   card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
],

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
 card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
   card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4]
],

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
 card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4]
],

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
],






[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
],
[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
],
[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],
],
[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
],

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
],

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
],


[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
],

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4]
],

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4]
],

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
],









[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
],
[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
],
[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],
],
[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
],

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
],

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
],


[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
],

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4]
],

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4]
],

[card.B[0], card.I[0],  card.N[0], card.G[0],card.O[0],
card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
],
  

 




[card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
   card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
],
[card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
   card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
],
[card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
   card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],
],
[card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
   card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
],

[card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
   card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
],

[card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
   card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
],


[card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
   card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
],

[card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
   card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4]
],

[card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
   card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4]
],

[card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
   card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
],

   /////////////////// 
  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
  ],
  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
  ],
  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],
  ],
  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
  ],
  
  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
  ],
  
  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
  ],
  
  
  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
  ],
  
  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4]
  ],
  
  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4]
  ],
  
  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
  ],
  // [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  // card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1]], 
  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
  ],
  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
  ],
  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],
  ],
  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
  ],
  
  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
  ],
  
  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
  ],
  
  
  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
  ],
  
  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4]
  ],
  
  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4]
  ],
  
  [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
  ],
  // [card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  // card.B[1], card.I[1],  card.N[1], card.G[1],card.O[1]], 
  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
  ],
  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
  ],
  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],
  ],
  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
  ],
  
  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
  ],
  
  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
  ],
  
  
  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
  ],
  
  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4]
  ],
  
  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4]
  ],
  
  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
  ],
  // [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  // card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3]], 
  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
  ],
  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
  ],
  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],
  ],
  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
  ],
  
  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
  ],
  
  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
  ],
  
  
  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
  ],
  
  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4]
  ],
  
  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4]
  ],
  
  [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
  ],
  // [card.B[2], card.I[2],  card.N[2], card.G[2],card.O[2],
  // card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4]], 
  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
  ],
  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
  ],
  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4],
  ],
  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
  ],
  
  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4], 
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
  ],
  
  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4], 
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
  ],
  
  
  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.O[0], card.O[1],  card.O[2], card.O[3],card.O[4]
  ],
  
  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.G[0], card.G[1],  card.G[2], card.G[3],card.G[4]
  ],
  
  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.N[0], card.N[1],  card.N[2], card.N[3],card.N[4]
  ],
  
  [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4],
  card.B[0], card.B[1],  card.B[2], card.B[3],card.B[4],
  card.I[0], card.I[1],  card.I[2], card.I[3],card.I[4]
  ],
  // [card.B[3], card.I[3],  card.N[3], card.G[3],card.O[3],
  // card.B[4], card.I[4],  card.N[4], card.G[4],card.O[4]],

];


if ((selectedPattern.value === 'anyhorizontal'  && selectedPattern2.value ==='anyvertical2')||(selectedPattern.value === 'anyvertical'  && selectedPattern2.value ==='anyhorizontal2')){
  for(const ahoraver of AHORAVER){
    if (isWinningPattern(ahoraver)) {
      bingoLine = ahoraver;
      break;
    }

  }

}


else if ((selectedPattern.value === 'anyhorizontal'  && selectedPattern2.value ==='anydiagonal2')||(selectedPattern.value === 'anydiagonal'  && selectedPattern2.value ==='anyhorizontal2')){
  for(const ahoradia of AHORADIA){
    if (isWinningPattern(ahoradia)) {
      bingoLine = ahoradia;
      break;
    }

  }

}


else if ((selectedPattern.value === 'anyhorizontal'  && selectedPattern2.value ==='anyTwoVertical2')||(selectedPattern.value === 'anyTwoVertical'  && selectedPattern2.value ==='anyhorizontal2')){
  for(const ahoratv of AHORATV){
    if (isWinningPattern(ahoratv)) {
      bingoLine = ahoratv;
      break;
    }

  }

}

else if ((selectedPattern.value === 'anyhorizontal'  && selectedPattern2.value ==='MS2')||(selectedPattern.value === 'MS'  && selectedPattern2.value ==='anyhorizontal2')){
  for(const ahorms of AHORMS){
    if (isWinningPattern(ahorms)) {
      bingoLine = ahorms;
      break;
    }

  }

}

else if ((selectedPattern.value === 'anyhorizontal'  && selectedPattern2.value ==='FMC2')||(selectedPattern.value === 'FMC'  && selectedPattern2.value ==='anyhorizontal2')){
  for(const ahorfmc of AHORFMC){
    if (isWinningPattern(ahorfmc)) {
      bingoLine = ahorfmc;
      break;
    }

  }

}

else if ((selectedPattern.value === 'anyhorizontal'  && selectedPattern2.value ==='CS2')||(selectedPattern.value === 'CS'  && selectedPattern2.value ==='anyhorizontal2')){
  for(const ahorcs of AHORCS){
    if (isWinningPattern(ahorcs)) {
      bingoLine = ahorcs;
      break;
    }

  }

}


//VERTICAL
else if ((selectedPattern.value === 'anyvertical'  && selectedPattern2.value ==='MS2')||(selectedPattern.value === 'MS'  && selectedPattern2.value ==='anyvertical2')){
  for(const averms of AVERMS){
    if (isWinningPattern(averms)) {
      bingoLine = averms;
      break;
    }

  }

}

else if ((selectedPattern.value === 'anyvertical'  && selectedPattern2.value ==='FMC2')||(selectedPattern.value === 'FMC'  && selectedPattern2.value ==='anyvertical2')){
  for(const averfmc of AVERFMC){
    if (isWinningPattern(averfmc)) {
      bingoLine = averfmc;
      break;
    }

  }

}

else if ((selectedPattern.value === 'anyvertical'  && selectedPattern2.value ==='CS2')||(selectedPattern.value === 'CS'  && selectedPattern2.value ==='anyvertical2')){
  for(const avercs of AVERCS){
    if (isWinningPattern(avercs)) {
      bingoLine = avercs;
      break;
    }

  }

}

else if ((selectedPattern.value === 'anyvertical'  && selectedPattern2.value ==='anydiagonal2')||(selectedPattern.value === 'anydiagonal'  && selectedPattern2.value ==='anyvertical2')){
  for(const averadia of AVERADIA){
    if (isWinningPattern(averadia)) {
      bingoLine = averadia;
      break;
    }

  }

}


else if ((selectedPattern.value === 'anyvertical'  && selectedPattern2.value ==='anyTwoHorizontal2')||(selectedPattern.value === 'anyTwoHorizontal'  && selectedPattern2.value ==='anyvertical2')){
  for(const averath of AVERATH){
    if (isWinningPattern(averath)) {
      bingoLine = averath;
      break;
    }

  }

}

//diagonal
else if ((selectedPattern.value === 'anydiagonal'  && selectedPattern2.value ==='anyTwoHorizontal2')||(selectedPattern.value === 'anyTwoHorizontal'  && selectedPattern2.value ==='anydiagonal2')){
  for(const adath of ADATH){
    if (isWinningPattern(adath)) {
      bingoLine = adath;
      break;
    }

  }

}

else if ((selectedPattern.value === 'anydiagonal'  && selectedPattern2.value ==='anyTwoVertical2')||(selectedPattern.value === 'anyTwoVertical'  && selectedPattern2.value ==='anydiagonal2')){
  for(const adatv of ADATV){
    if (isWinningPattern(adatv)) {
      bingoLine = adatv;
      break;
    }

  }

}

else if ((selectedPattern.value === 'anydiagonal'  && selectedPattern2.value ==='FMC2')||(selectedPattern.value === 'FMC'  && selectedPattern2.value ==='anydiagonal2')){
  for(const adfmc of ADFMC){
    if (isWinningPattern(adfmc)) {
      bingoLine = adfmc;
      break;
    }

  }

}

else if ((selectedPattern.value === 'anydiagonal'  && selectedPattern2.value ==='MS2')||(selectedPattern.value === 'MS'  && selectedPattern2.value ==='anydiagonal2')){
  for(const adms of ADMS){
    if (isWinningPattern(ADMS)) {
      bingoLine = adms;
      break;
    }

  }

}

else if ((selectedPattern.value === 'anydiagonal'  && selectedPattern2.value ==='CS2')||(selectedPattern.value === 'CS'  && selectedPattern2.value ==='anydiagonal2')){
  for(const adcs of ADCS){
    if (isWinningPattern(adcs)) {
      bingoLine = adcs;
      break;
    }

  }

}

else if ((selectedPattern.value === 'anyTwoHorizontal'  && selectedPattern2.value ==='anyTwoVertical2')||(selectedPattern.value === 'anyTwoVertical'  && selectedPattern2.value ==='anyTwoHorizontal2')){
  for(const athatv of ATHATV){
    if (isWinningPattern(athatv)) {
      bingoLine = athatv;
      break;
    }

  }

}



else{
    switch (selectedPattern.value) {
      case "defaultPattern":
        // Check if any line matches the default winning pattern
        for (const line of lines) {
          if (isWinningPattern(line)) {
            bingoLine = line;
            break;
          }
        }
        break;
  
      case "anyhorizontal":
        // Check only horizontal lines
        for (const row of rows) {
          if (isWinningPattern(row)) {
            bingoLine = row;
            break;
          }
        }
        break;

        
      case "MS":
        // Check only horizontal lines
        for (const ms4 of MS4) {
          if (isWinningPattern(ms4)) {
            bingoLine = ms4;
            break;
          }
        }
        break;

        case "CS":
          // Check only horizontal lines
          for (const cs4 of CS4) {
            if (isWinningPattern(cs4)) {
              bingoLine = cs4;
              break;
            }
          }
          break;
  
      case "anyvertical":
        // Check only vertical lines
        for (const column of columns) {
          if (isWinningPattern(column)) {
            bingoLine = column;
            break;
          }
        }
        break;
  
      case "anydiagonal":
        // Check only diagonal lines
        for (const diagonal of diagonals) {
          if (isWinningPattern(diagonal)) {
            bingoLine = diagonal;
            break;
          }
        }
        break;
  
      case "anyTwoLines":
        for (const atl of ATL) {
          if (isWinningPattern(atl)) {
            bingoLine = atl;
            break;
          }}
       
        break;
        case "anyTwoVertical": // New case for any two vertical lines
        for (const atv of ATV) {
          if (isWinningPattern(atv)) {
            bingoLine = atv;
            break;
          }}
       
        break;

        case "FMC": // New case for any two vertical lines
        for (const fmc of FMCC) {
          if (isWinningPattern(fmc)) {
            bingoLine = fmc;
            break;
          }}
       
        break;

        case "FullHouse": // New case for any two vertical lines
        for (const fh of FH) {
          if (isWinningPattern(fh)) {
            bingoLine = fh;
            break;
          }}
       
        break;
         // for (let i = 0; i < columns.length; i++) {
        //     for (let j = i + 1; j < columns.length; j++) {
        //         if (isWinningPattern(columns[i]) && isWinningPattern(columns[j])) {
        //             bingoLine = [columns[i], columns[j]];
        //             break;
        //         }
        //     }
        //     if (bingoLine) break;
        // }
        case "anyTwoHorizontal": // New case for any two horizontal lines
        for (const ath of ATH) {
          if (isWinningPattern(ath)) {
            bingoLine = ath;
            break;
          }}

    // for (let i = 0; i < rows.length; i++) {
    //     for (let j = i + 1; j < rows.length; j++) {
    //         if (isWinningPattern(rows[i]) && isWinningPattern(rows[j])) {
    //             bingoLine = [rows[i], rows[j]];
    //             break;
    //         }
    //     }
    //     if (bingoLine) break;
    // }
    break;
    case "letterA": // New case for letter A pattern
    for (const letterr of letterA) {
      if (isWinningPattern(letterr)) {
        bingoLine = letterr;
        break;
      }
    }
    
    // if (isWinningPattern(letterA[0]) && isWinningPattern(letterA[1])  
    //    ) {
    //     bingoLine = letterA;
    // }
    break;
  
      default:
        break;
    }
  }
    if (bingoLine) {
      saveBingoData();
      setIsBingo(true); // Set isBingo to true when a bingo is found
      playAudio(); // Play winning audio
    } else {
      setIsBingo(false); // Reset isBingo if no bingo is found
      playLoseAudio(); // Play losing audio
    }
    setBingoNumbers(bingoLine || []);
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const playLoseAudio = () => {
    if (loseAudioRef.current) {
      loseAudioRef.current.currentTime = 0;
      loseAudioRef.current.play();
    }
  };

  const saveBingoData = () => {
    setWinnerCards((prevWinnerCards) => [...prevWinnerCards, cartelaId]);
  };
  // const handleRefund=()=>{
  //   if(manualCut){
  //     alert('you have refunded '+totalAmount * (manualEnteredCut / 10)+'birr')
  //   }
  //   else{
  //     alert('you have refunded '+totalAmount * (manualEnteredCut / 100)+'birr')
  //   }
    
  // }



const handleRefund = async () => {
  // Calculate the refund amount
  const cutValue = manualCut ? Number(manualEnteredCut) :Number(currentUser.cut); // Default to 0 if undefined
  const amountRefunded = manualCut ? totalAmount * (cutValue / 10) : totalAmount * (cutValue / 100);

  // Check if the calculated amount is valid
  if (!isNaN(amountRefunded) && amountRefunded > 0) {
    alert('this match doesnot count and is cancelled due to ' + cardCount + ' players salva!!!,You have refunded ' + amountRefunded + ' birr' );

    // Calculate the new balance
    const newBalance = currentUser.balance + amountRefunded; // Assuming balance is stored in currentUser

    // Update the balance in the database
    try {
      await axios.put(`/api/user/${currentUser._id}/balance`, {
        balance: newBalance,
      });

      // Optionally, update the currentUser state with the new balance
      // setCurrentUser({ ...currentUser, balance: newBalance });

      alert(`Balance updated successfully! New balance: ${newBalance} birr`);
    } catch  {
      
      alert('There was an error updating the balance. Please try again.');
    }
  } else {
    alert('Invalid refund amount.');
  }
};

  const handleEndGame = async () => {
    if (winnerCards.length === 0) {
      alert('No winners to save');
      return;
    }
    setIsSaving(true);
    const total = totalAmount;
    let cut, won;
    const bingoData = {
      bet: betAmount,
      player: cardCount,
      total: totalAmount,
      call: calledBalls.length,
      winner: winnerCards,
      branch: currentUser.branch,
      cashier: currentUser.username,
      date: new Date().toISOString(),
    };
    if (manualCut) {
      cut = total * (manualEnteredCut / 10);
      won = total - total * (manualEnteredCut / 10);
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
        setWinnerCards([]);
        resetLockedCards();
        onReset();
        onClose();
      } else {
        alert('Failed to save bingo data');
      }
    } catch (error) {
      alert('Error saving bingo data:', error);
    }
    finally {
      setIsSaving(false);
    }
  };

  const handleLockCard = () => {
    const cartelaIdNumber = Number(cartelaId);
    
    // Check if the card is already locked
    if (lockedCards.includes(cartelaIdNumber)) {
      alert("This card is already locked.");
      return;
    }
  
    // Allow locking of the card if it's not already locked
    const newLockedCards = [...lockedCards, cartelaIdNumber];
    setLockedCards(newLockedCards);
    localStorage.setItem('lockedCards', JSON.stringify(newLockedCards));
    alert(`Card ${cartelaIdNumber} has been locked.`);
  };

  const resetLockedCards = () => {
    setLockedCards([]);
    localStorage.removeItem('lockedCards');
  };

  const handleCartelaIdChange = (event) => {
    setCartelaId(event.target.value);
  };

  // Handle key down events
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetchCartela();
    }
  };

  return (
    <div>
      <div className="modal">
        <h4 className="margin-md">Enter Cartela ID</h4>
        <input
          type="text"
          placeholder="Enter cartela id"
          value={cartelaId}
          onChange={handleCartelaIdChange} // This updates the cartelaId state
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        <button onClick={fetchCartela} disabled={isFetching}>
          {isFetching ? 'Checking...' : 'Check'}
        </button>
        <button onClick={handleLockCard} disabled={!cartela }>Lock <FaLock /> </button>

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
                <img src={logoImage} alt="bingo!" className='logo2'/>
              </div>
            )}
          </div>
        )}
        <p>
          <button onClick={onClose} > continue <ImExit/></button>
          <button onClick={handleEndGame} disabled={winnerCards.length === 0 || isSaving}>{isSaving? 'saving data...' : 'EndGame'} </button>
          <button onClick={handleRefund} disabled={winnerCards.length <3}>Refund </button>
        </p>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default CartelaModal;