import React from 'react';
import picture from "./logoImagelast.jpg"
// import SantaHAt from "./images/sant2.png"
/**
 * Generates the needed bingo balls
 *
 * @var  {Object}
 */
export const generateBingoBoard = () => {
  let board = {};
  let letters = ["B", "I", "N", "G", "O"];
  let count = 1;
  letters.forEach(letter => {
    board[letter] = [];
    for(let i = 1; i <= 15; i++) {
      let obj = {
        letter: letter,
        color: getColor(letter),
        number: count,
        display: letter + count,
        called: false,
        active: false
      }
      board[letter].push(obj);
      count++;
    }
  })

  function getColor(letter) {
    switch(letter){
      case "B":
        return 'blue';
      case "I": 
        return 'red';
      case "N": 
        return 'white';
      case "G":
        return 'green';
      case "O":
        return 'yellow';
      default:
        return 'white';
    }
  }
  return board;
}

/**
 * Generates a random number between 1-75
 *
 * @var  {Integer}
 */
export const getRandomBingoNumber = () => {
  return Math.floor(Math.random() * 75) + 1; // Now generates a number between 1 and 80
}

/**
 * Returns language code for use with the speech synthesis api
 *
 * @var  {String}
 */



/**
 * Returns the default bingo ball display
 *
 * @return  {JSX}  JSX element
 */
export const getLogoBallDisplay = () => {
  return (
    <div className="ball-display white relative notranslate">
      <div className="content">
        <div className="ball-content">
          <img src={picture} alt="Lets Play Bingo" className='logobl' />
        </div>
      </div>
    </div>
  )
}
  
/**
 * Returns a bingo ball display using the selected ball object
 *
 * @return  {JSX}  JSX element
 */
export const getBallDisplay = (ball) => {
  return (
    <div className={"ball-display " + ball.color + " relative notranslate"}>
      {/* <img src={SantaHAt} alt="santa" className="santa-hat" /> */}
      <div className="content">
        <div className="ball-content">
          <div className="ball-letter">{ball.letter}</div>
          <div className="ball-number">{ball.number}</div>
        </div>
        {/* Add the Santa hat image */}
      </div>
    </div>
  );
};

