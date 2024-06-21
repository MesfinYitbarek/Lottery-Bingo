/*
 * Let's Play Bingo
 * Version 3.0
 * App written by Karol Brennan
 * https://karol.dev
 * http://github.com/karolbrennan
 */
// Dependencies
import React, { Component} from "react";



import Slider from "rc-slider";
import Select from "react-select";
import { FaVolumeUp,FaBell,FaRunning ,FaSearch,FaPause ,FaStepForward} from 'react-icons/fa';
import { SiFastapi } from "react-icons/si";
import { SlGameController } from "react-icons/sl";
import { BiReset } from "react-icons/bi";
import { PiShuffleDuotone } from "react-icons/pi";
import { VscDebugStart } from "react-icons/vsc";
import { FcMoneyTransfer } from "react-icons/fc";
import { GiPodiumWinner } from "react-icons/gi";


// Custom Components
import BingoBoard from "./subcomponents/BingoBoard.js";
import Pattern from "./subcomponents/Pattern.js";
import CallHistory from "./subcomponents/CallHistory.js";
import { MdOutlineAssistWalker } from "react-icons/md";

// Utilities
import {
  generateBingoBoard,
  getRandomBingoNumber,
  getPresetPatterns,
  getBallDisplay,
  getLogoBallDisplay,
  getLanguageText,
} from "../utils.js";

// Chimes
import {
  onefa,twofa,threefa,fourfa,fivefa,sixfa,sevenfa,eightfa,ninefa,tenfa,elevenfa,twelvefa,thirteenfa,fourteenfa,fifteenfa,sixteenfa,
  seventeenfa,eighteenfa,nineteenfa,twentyfa,twentyonefa,twenttwofa,twentythreefa,twentyfourfa,twentyfivefa,twentysixfa,twentysevenfa,twentyeightfa,twentyninefa,thirtyfa,thirtyonefa,thirtytwofa,thirtythreefa,thirtyfourfa,thirtyfivefa,thirtysixfa,thirtysevenfa,thirtyeightfa,thirtyninefa,fortyfa,fortyonefa,fortytwoa,fortythreefa,fortyfourfa,
  fortyfivefa,fortysixfa,fortysevenfa,fortyeightfa,fortyninefa,fiftyfa,fiftyonefa,fiftytwofa,fiftythreefa,fiftyfourfa,fiftyfivefa,fiftysixfa,fiftysevenfa,fiftyeightfa,fiftyninefa,sixtyfa,sixtyonefa,sixtytwofa,sixtythreefa,sixtyfourfa,sixtyfivefa,sixtysixfa,sixtysevenfa,sixtyeightfa,sixtyninefa,seventyfa,
  seventyonefa,seventytwofa,seventythreefa,seventyfourfa,seventyfivefa,
  onefw,twofw,threefw,fourfw,fivefw,sixfw,sevenfw,eightfw,ninefw,tenfw,
  elevenfw,twelvefw,thirteenfw,fourteenfw,fifteenfw,sixteenfw,seventeenfw,eighteenfw,nineteenfw,twentyfw,
  twentyonefw,twentytwofw,twentythreefw,twentyfourfw,twentyfivefw,twentysixfw,twentysevenfw,twentyeightfw,twentyninefw,thirtyfw,
  thirtyonefw,thirtytwofw,thirtythreefw,thirtyfourfw,thirtyfivefw,thirtysixfw,thirtysevenfw,thirtyeightfw,thirtyninefw,fortyfw,
  fortyonefw,fortytwofw,fortythreefw,fortyfourfw,fortyfivefw,fortysixfw,fortysevenfw,fortyeightfw,fortyninefw,fiftyfw,fiftyonefw,
  fiftytwofw,fiftythreefw,fiftyfourfw,fiftyfivefw,fiftysixfw,fiftysevenfw,fiftyeightfw,fiftyninefw,sixtyfw,sixtyonefw,sixtytwofw,sixtythreefw,sixtyfourfw,sixtyfivefw,sixtysixfw,
  sixtysevenfw,sixtyeightfw,sixtyninefw,seventyfw,seventyonefw,seventytwofw,seventythreefw,seventyfourfw,seventyfivefw,  wolplaystart,
  oneft,twoft,threeft,fourft,fiveft,sixft,sevenft,eightft,nineft,tenft,elevenft,twelveft,thirteenft,fourteenft,fifteenft,sixteenft,seventeenft,eighteenft,nineteenft,twentyft,twentyoneft,twentytwoft,twentythreeft,twentyfourft,twentyfiveft,twentysixtft,twentysevenft,twentyeightft,twentynineft,thirtyft,thirtyoneft,thirtytwoft,thirtythreeft,thirtyfourft,thirtyfiveft,thirtysixtft,
  thirtysevenft,thirtyeightft,thirtynineft,fortyft,fortyoneft,fortytwoft,
  fortythreeft,fortyfourft,fortyfiveft,fortysixtft,fortysevenft,fortyeightft,fortynineft,fiftyft,fiftyoneft,fiftytwoft,fiftythreeft,fiftyfourft,fiftyfiveft,fiftysixtft,fiftysevenft,fiftyeightft,fiftynineft,sixtyft,sixtyoneft,sixtytwoft,sixtythreeft,sixtyfourft,sixtyfiveft,sixtysixtft,
  sixtysevenft,sixtyeightft,sixtynineft,seventyft,seventyoneft,seventytwoft,seventythreeft,seventyfourft,seventyfiveft,


  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
  eleven,
  twelve,
  thirteen,
  fourteen,
  fifteen,
  sixteen,
  seventeen,
  eighteen,
  nineteen,
  twenty,
  twentyone,
  twentytwo,
  twentythree,
  twentyfour,
  twentyfive,
  twentysix,
  twentyseven,
  twentyeight,
  twentynine,
  thirty,
  thirtyone,
  thirtytwo,
  thirtythree,
  thirtyfour,
  thirtyfive,
  thirtysix,
  thirtyseven,
  thirtyeight,
  thirtynine,
  fourty,
  fourtyone,
  fourtytwo,
  fourtythree,
  fourtyfour,
  fourtyfive,
  fourtysix,
  fourtyseven,
  fourtyeight,
  fourtynine,
  fifty,
  fiftyone,
  fiftytwo,
  fiftythree,
  fiftyfour,
  fiftyfive,
  fiftysix,
  fiftyseven,
  fiftyeight,
  fiftynine,
  sixty,
  sixtyone,
  sixtytwo,
  sixtythree,
  sixtyfour,
  sixtyfive,
  sixtysix,
  sixtyseven,
  sixtyeight,
  sixtynine,
  seventy,
  seventyone,
  seventytwo,
  seventythree,
  seventyfour,
  seventyfive,
  chime1,
  chime2,
  chime3,
  chime4,
  chime5,
  chime6,
  chime7,
  chime8,
  chime9,
  chime10,
  chime11,
  chime12,
  pop1,
  pop2,
  pop3,
  pop4,
  shuffle,
} from "../chimes";
class BingoGame extends Component {
  constructor(props) {
    super(props);
    // -------------------------- Set properties ----- //
    // Balls display pieces
  //  this. winAmountBox = document.querySelector('.win-amount-box');

 
this.totalBalance=1000;
  this.amount=0;
  this.startButton=0;
    this.totalBallsCalled = 0;
    this.previousBall = null;
    this.currentBall = null;
    this.interval = null;
    this.chimes = [
      { label: "Chime 1", value: chime1 },
      { label: "Chime 2", value: chime2 },
      { label: "Chime 3", value: chime3 },
      { label: "Chime 4", value: chime4 },
      { label: "Chime 5", value: chime5 },
      { label: "Chime 6", value: chime6 },
      { label: "Chime 7", value: chime7 },
      { label: "Chime 8", value: chime8 },
      { label: "Chime 9", value: chime9 },
      { label: "Chime 10", value: chime10 },
      { label: "Chime 11", value: chime11 },
      { label: "Chime 12", value: chime12 },
      { label: "Pop 1", value: pop1 },
      { label: "Pop 2", value: pop2 },
      { label: "Pop 3", value: pop3 },
      { label: "Pop 4", value: pop4 },
    ];
    this.callers = [
      { label: "amharic-male", value:"amh-male" },
      { label: "amharic-female",  value:"amh-fem"  },
      { label: "oromigna-female", value:"oro-fem"   },
      { label: "wolaytgna-female", value:"wol-fem"  },
      { label: "tigrigna-female", value:"tig-fem"  },
   
    ];
   
    
    this.shuffleSound = shuffle;
    

    // Patterns
    this.patternPlaceholder = "Choose a pattern";
    this.presets = getPresetPatterns();

    // Speech Synthesis
    this.speechEnabled = Object.prototype.hasOwnProperty.call(
      window,
      "speechSynthesis"
    );

    // if speech is enabled, initialize other speech properties
    if (this.speechEnabled === true) {
      this.synth = window.speechSynthesis;
      this.synth.onvoiceschanged = this.loadVoices;
      this.voices = this.synth.getVoices();
    } else {
      this.synth = null;
      this.voices = [];
    }

    let gameData = JSON.parse(localStorage.getItem("lpb-gameData"));
    let gameState = JSON.parse(localStorage.getItem("lpb-gameState"));

    if (gameData && gameState) {
      for (let key in gameData) {
        this[key] = gameData[key];
      }
      this.state = gameState;
    } else {
      // Set initial state
      this.state = this.getInitialStateData();
    }
  }

  getInitialStateData() {
    return {
      board: generateBingoBoard(),
      previousCallList: [],
      // displayBoardOnly: false,
      delay: 1000,
      running: false,
      startButton:false,
      enableCaller: false,
      skipUnused: false,
      wildBingo: false,
      wolatya:false,
      tigrigna:false,
      evensOdds: false,
      doubleCall: false,
      extraTalk: false,
      chime: false,
     
      selectedChime: this.chimes[0],
      selectedCaller: this.callers[0],
      selectedPattern: {
        value: this.patternPlaceholder,
        label: this.patternPlaceholder,
        pattern: {
          B: [false, false, false, false, false],
          I: [false, false, false, false, false],
          N: [false, false, false, false, false],
          G: [false, false, false, false, false],
          O: [false, false, false, false, false],
        },
      },
      showResetModal: false,
      showstartModal:false,
      isRed:false,
      isRed3:false,
      isRed4:false,
      isRed5:false,
      isRed6:false,
      isRed7:false,
      isRed8:false,
      isRed9:false,
      isRed10:false,
      isRed11:false,
      isRed12:false,
      isRed13:false,
      isRed14:false,
      isRed15:false,
      isRed16:false,
      isRed17:false,
      isRed18:false,
      isRed19:false,
      isRed20:false,
      isRed21:false,
      isRed22:false,
      isRed23:false,
      isRed24:false,
      isRed25:false,
      isRed26:false,
      isRed27:false,
      isRed28:false,
      isRed29:false,
      isRed30:false,
      isRed31:false,
      isRed32:false,
      isRed33:false,

    };
  }

  /**
   * In case of going from one page to another, when we return
   * and the component has mounted reinitialize the game from
   * local storage.
   *
   */
  componentDidMount() {
    this.loadVoices();
    // ensure the reset modal doesn't show at initial load
    this.setState({ showResetModal: false });
    // let running = this.state.running;
    if (this.totalBallsCalled > 0) {
      this.startButton=1;
    }
    else{
    this.startButton=0;
    }
   this.amount=this.state.amount;
  }

  /**
   * [componentDidUpdate description]
   *
   * @param   {[type]}  prevProps  [prevProps description]
   * @param   {[type]}  state      [state description]
   *
   * @return  {[type]}             [return description]
   */
  componentDidUpdate(prevProps, state) {
    let gameData = {
      totalBallsCalled: this.totalBallsCalled,
      previousBall: this.previousBall,
      currentBall: this.currentBall,
      interval: this.interval,
    };
    localStorage.setItem("lpb-gameData", JSON.stringify(gameData));
    localStorage.setItem("lpb-gameState", JSON.stringify(this.state));
  }

  /**
   * [initializeFromLocalStorage description]
   *
   * @return  {[type]}  [return description]
   */
  initializeFromLocalStorage = () => {
    let gameData = JSON.parse(localStorage.getItem("lpb-gameData"));
    let gameState = JSON.parse(localStorage.getItem("lpb-gameState"));
    if (gameData && gameState) {
      for (let key in gameData) {
        this[key] = gameData[key];
      }
      this.setState(...gameState);
    }
  };

  /* ------------------- Speech Synthesis Functions */
  /*
   *  Load Voices Function
   *  Will load voices as they change within the browser
   */
  loadVoices = () => {
    this.voices = this.synth.getVoices();
    if (this.voices.length > 0) {
      let selectedCaller = this.state.selectedCaller;
      if (!selectedCaller) {
        // if the selected caller is STILL null, set to the first voice available.
        // this is a one off that really would only happen if the user's browser
        // has a language that doesn't have a caller available for it.
        selectedCaller = this.voices[0];
      }
      let userLanguage =
        window.navigator.userLanguage || window.navigator.language;
      // loop through voices and either choose the one that matches the selection or choose the first one that matches user's language
      this.voices.forEach((voice) => {
        if (Object.prototype.hasOwnProperty.call(selectedCaller, "value")) {
          if (voice.name === selectedCaller.value) {
            this.setState({ selectedCaller: voice });
          }
        } else {
          if (voice.lang === userLanguage) {
            selectedCaller = voice;
          }
        }
      });
      this.setState({ selectedCaller: selectedCaller });
    }
  };

  /*
   *  Say Function
   *  Will speak any string that is passed in
   */
  say = (text) => {
    if (this.speechEnabled === true && this.state.enableCaller === true) {
      // Create a new instance of SpeechSynthesisUtterance.
      let msg = new SpeechSynthesisUtterance();
      msg.text = text;
      msg.volume = 1;
      if (Object.prototype.hasOwnProperty.call(this.state, "selectedCaller")) {
        this.voices.forEach((caller) => {
          if (caller.value === this.state.selectedCaller.value) {
            msg.voice = caller;
          }
        });
      }
      this.cancelSpeech();
      this.synth.speak(msg);
    }
  };

  /**
   * Cancel speech function
   * Will cancel any existing speech
   */
  cancelSpeech = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  };

  /**
   * Handles the audible call of the ball
   *
   * @param   {Object}  ball  Object representing a ball
   */
  voiceCall = (ball) => {
    // call the new ball, first call it all together, then call each character individually
    // let ballstring = ball.number.toString();
    if(this.state.wildBall){
console.log("hi");
    }
    else if (this.state.doubleCall) {
      const femaleamharic = [ chime1,onefa,twofa,threefa,fourfa,fivefa,sixfa,sevenfa,eightfa,ninefa,tenfa,elevenfa,twelvefa,thirteenfa,fourteenfa,fifteenfa,sixteenfa,
        seventeenfa,eighteenfa,nineteenfa,twentyfa,twentyonefa,twenttwofa,twentythreefa,twentyfourfa,twentyfivefa,twentysixfa,twentysevenfa,twentyeightfa,twentyninefa,thirtyfa,thirtyonefa,thirtytwofa,thirtythreefa,thirtyfourfa,thirtyfivefa,thirtysixfa,thirtysevenfa,thirtyeightfa,thirtyninefa,fortyfa,fortyonefa,fortytwoa,fortythreefa,fortyfourfa,fortyfivefa,fortysixfa,fortysevenfa,fortyeightfa,fortyninefa,fiftyfa,fiftyonefa,fiftytwofa,fiftythreefa,fiftyfourfa,fiftyfivefa,fiftysixfa,fiftysevenfa,fiftyeightfa,fiftyninefa,sixtyfa,sixtyonefa,sixtytwofa,sixtythreefa,sixtyfourfa,sixtyfivefa,sixtysixfa,sixtysevenfa,sixtyeightfa,sixtyninefa,seventyfa,
        seventyonefa,seventytwofa,seventythreefa,seventyfourfa,seventyfivefa]
      if (ball.number >= 0 && ball.number <= 75) {
        
        let sound = new Audio(femaleamharic[ball.number]);  
        sound.play();
        }
    }
    else if(this.state.extraTalk){
      const femaleoromic = [ chime1, one,
        // two,
        three,
        four,
        five,
        six,
        seven,
        eight,
        nine,
        ten,
        eleven,
        twelve,
        thirteen,
        fourteen,
        fifteen,
        sixteen,
        seventeen,
        eighteen,
        nineteen,
        twenty,
        twentyone,
        twentytwo,
        twentythree,
        twentyfour,
        twentyfive,
        twentysix,
        twentyseven,
        twentyeight,
        twentynine,
        thirty,
        thirtyone,
        thirtytwo,
        thirtythree,
        thirtyfour,
        thirtyfive,
        thirtysix,
        thirtyseven,
        thirtyeight,
        thirtynine,
        fourty,
        fourtyone,
        fourtytwo,
        fourtythree,
        fourtyfour,
        fourtyfive,
        fourtysix,
        fourtyseven,
        fourtyeight,
        fourtynine,
        fifty,
        fiftyone,
        fiftytwo,
        fiftythree,
        fiftyfour,
        fiftyfive,
        fiftysix,
        fiftyseven,
        fiftyeight,
        fiftynine,
        sixty,
        sixtyone,
        sixtytwo,
        sixtythree,
        sixtyfour,
        sixtyfive,
        sixtysix,
        sixtyseven,
        sixtyeight,
        sixtynine,
        seventy,
        seventyone,
        seventytwo,
        seventythree,
        seventyfour,
        seventyfive]
      if (ball.number >= 0 && ball.number <= 75) {
        
        let sound2 = new Audio(femaleoromic [ball.number]);  
        sound2.play();
        }


    }
    else if(this.state.wolayta){
      const femalewolayta  = [ chime1,onefw,twofw,threefw,fourfw,fivefw,
        sixfw,sevenfw,eightfw,ninefw,tenfw,elevenfw,twelvefw,thirteenfw,fourteenfw,
        fifteenfw,sixteenfw,seventeenfw,eighteenfw,nineteenfw,twentyfw,twentyonefw,twentytwofw,
        twentythreefw,twentyfourfw,twentyfivefw,twentysixfw,twentysevenfw,twentyeightfw,twentyninefw,thirtyfw,
        thirtyonefw,thirtytwofw,thirtythreefw,thirtyfourfw,thirtyfivefw,thirtysixfw,thirtysevenfw,thirtyeightfw,thirtyninefw,
        fortyfw,fortyonefw,fortytwofw,fortythreefw,fortyfourfw,fortyfivefw,fortysixfw,fortysevenfw,fortyeightfw,fortyninefw,
        fiftyfw,fiftyonefw,fiftytwofw,fiftythreefw,fiftyfourfw,fiftyfivefw,fiftysixfw,fiftysevenfw,fiftyeightfw,fiftyninefw,
        sixtyfw,sixtyonefw,sixtytwofw,sixtythreefw,sixtyfourfw,sixtyfivefw,sixtysixfw,sixtysevenfw,sixtyeightfw,sixtyninefw,
        seventyfw,seventyonefw,seventytwofw,seventythreefw,seventyfourfw,seventyfivefw
      ]
      if (ball.number >= 0 && ball.number <= 75) {
        
        let sound3 = new Audio(femalewolayta [ball.number]);  
        sound3.play();
        }


    }
    else if(this.state.tigrigna){
      const femaletigrigna = [ chime1,oneft,twoft,threeft,fourft,fiveft,sixft,sevenft,eightft,nineft,tenft,elevenft,twelveft,thirteenft,fourteenft,fifteenft,sixteenft,seventeenft,
        eighteenft,nineteenft,twentyft,twentyoneft,twentytwoft,twentythreeft,twentyfourft,twentyfiveft,twentysixtft,twentysevenft,twentyeightft,twentynineft,thirtyft,thirtyoneft,
        thirtytwoft,thirtythreeft,thirtyfourft,thirtyfiveft,thirtysixtft,thirtysevenft,thirtyeightft,thirtynineft,fortyft,fortyoneft,fortytwoft,fortythreeft,fortyfourft,fortyfiveft,
        fortysixtft,fortysevenft,fortyeightft,fortynineft,fiftyft,fiftyoneft,fiftytwoft,fiftythreeft,fiftyfourft,fiftyfiveft,fiftysixtft,fiftysevenft,fiftyeightft,fiftynineft,sixtyft,sixtyoneft,
        sixtytwoft,sixtythreeft,sixtyfourft,sixtyfiveft,sixtysixtft,sixtysevenft,sixtyeightft,sixtynineft,seventyft,seventyoneft,seventytwoft,seventythreeft,seventyfourft,seventyfiveft
      ]
      if (ball.number >= 0 && ball.number <= 75) {
        
        let sound4 = new Audio(femaletigrigna [ball.number]);  
        sound4.play();
        }


    }
    
    else if(this.state.enableCaller) {
    //   let sound2 = new Audio(two);
    //   sound2.play();
	const maleamharic = [ chime1, one,
		two,
		three,
		four,
		five,
		six,
		seven,
		eight,
		nine,
		ten,
		eleven,
		twelve,
		thirteen,
		fourteen,
		fifteen,
		sixteen,
		seventeen,
		eighteen,
		nineteen,
		twenty,
		twentyone,
		twentytwo,
		twentythree,
		twentyfour,
		twentyfive,
		twentysix,
		twentyseven,
		twentyeight,
		twentynine,
		thirty,
		thirtyone,
		thirtytwo,
		thirtythree,
		thirtyfour,
		thirtyfive,
		thirtysix,
		thirtyseven,
		thirtyeight,
		thirtynine,
		fourty,
		fourtyone,
		fourtytwo,
		fourtythree,
		fourtyfour,
		fourtyfive,
		fourtysix,
		fourtyseven,
		fourtyeight,
		fourtynine,
		fifty,
		fiftyone,
		fiftytwo,
		fiftythree,
		fiftyfour,
		fiftyfive,
		fiftysix,
		fiftyseven,
		fiftyeight,
		fiftynine,
		sixty,
		sixtyone,
		sixtytwo,
		sixtythree,
		sixtyfour,
		sixtyfive,
		sixtysix,
		sixtyseven,
		sixtyeight,
		sixtynine,
		seventy,
		seventyone,
		seventytwo,
		seventythree,
		seventyfour,
		seventyfive]
	if (ball.number >= 0 && ball.number <= 75) {
		
		let sound1 = new Audio(maleamharic[ball.number]);  
		sound1.play();
	  }
    //  else if(this.state.doubleCall&& ball.number<=75) {
    //   let sound = new Audio(array[ball.number]);  
    //   sound.play();
	  // }
    }
  };

  /**
   * Handles a wild ball call when the wild bingo game mode is active
   *
    * @param   {Object}  ball  Object representing a ball
   */
  // wildBallCall = (ball) => {
  //   // call the wild ball,
  //   let ballstring = ball.number.toString();
  //   if (this.state.extraTalk) {
  //     if (this.state.evensOdds) {
  //       window.setTimeout(() => {
  //         this.say([
  //           "The wild number ",
  //           " ",
  //           ball.letter,
  //           " ",
  //           ball.number,
  //           " ",
  //           " ",
  //           ` mark every ${
  //             ball.number % 2 === 1 ? "odd number" : "even number"
  //           }`,
  //         ]);
  //       }, 2000);
  //     } else {
  //       window.setTimeout(() => {
  //         this.say([
  //           "The wild number ",
  //           " ",
  //           ball.letter,
  //           " ",
  //           ball.number,
  //           " ",
  //           " ",
  //           ` mark every number ending in ${ballstring.substr(-1)}`,
  //         ]);
  //       }, 2000);
  //     }
  //   } else {
  //     if (this.state.doubleCall) {
  //       this.say([
  //         ball.letter,
  //         ball.number,
  //         " ",
  //         " ",
  //         ball.letter,
  //         " ",
  //         ballstring.length === 2
  //           ? [ballstring.charAt(0), " ", ballstring.charAt(1)]
  //           : ball.number,
  //       ]);
  //     } else {
  //       this.say([ball.letter, " ", ball.number]);
  //     }
  //   }
  // };

  /* ------------------- Gameplay Functions */

  // startNewGame = () => {

  //  this.setState(this.startButton:startButton+1);
  


    // Obtain all randomized balls
    // let byteArray = new Uint8Array(1);
    // let randomVals = [];

    // while (randomVals.length < 75) {
    //   let randomVal = window.crypto.getRandomValues(byteArray)[0];
    //   if (randomVal > 0 && randomVal <= 75 && !randomVals.includes(randomVal)) {
    //     randomVals.push(randomVal);
    //   }
    // }

    // Start with the Let's Play Bingo call out
    // (the .say method will not run if caller is not enabled)
    // if (this.state.wildBingo) {
    //   if (this.state.enableCaller && this.state.extraTalk) {
    //     this.say("Let's Play Wild Bingo!");
    //     window.setTimeout(() => {
    //       this.startWildBingo();
    //     }, 2000);
    //   } else {
    //     this.startWildBingo();
    //   }
    // } else {
    //   if (this.state.enableCaller) {
    //     if (this.state.extraTalk) {
    //       this.say("Let's Play Bingo!");
    //       window.setTimeout(() => {
    //         this.callBingoNumber();
    //       }, 2000);
    //     } else {
    //       this.callBingoNumber();
    //     }
    //   } else {
    //     this.callBingoNumber();
    //   }
    // }
  // };

  startNewAutoplayGame = () => {
    // if (this.state.wildBingo) {
    //   this.startNewGame();
    // } if {
      if (this.state.doubleCall) {
       
          // this.say("Let's Play Bingo!");
          let soundstartfa = new Audio(seventeenfa);  
          soundstartfa.play();
          window.setTimeout(() => {
            this.toggleGame();
          }, 3000);
        } else if(this.state.extraTalk){
          let soundstartfo = new Audio(seventyfa);  
          soundstartfo.play();
          window.setTimeout(() => {
            this.toggleGame();
          }, 3000);
        }
        else if(this.state.enableCaller){
          let soundstartma = new Audio(seventyfa);  
          soundstartma.play();
          window.setTimeout(() => {
            this.toggleGame();
          }, 3000);
        }
        else if(this.state.wolayta){
          let soundstartfw = new Audio( wolplaystart);  
          soundstartfw.play();
          window.setTimeout(() => {
            this.toggleGame();
          }, 3000);
        }

       else if(this.state.tigrigna){
        let soundstartft = new Audio(seventyfa);  
        soundstartft.play();
        window.setTimeout(() => {
          this.toggleGame();
        }, 3000);
        // this.toggleGame();
      }
      else{
        this.toggleGame();
      }
    // }
  };

  // startWildBingo = () => {
  //   // Variables used for wild bingo
  //   let randomBingoNumber = getRandomBingoNumber();
  //   let wildNumber = randomBingoNumber.toString().slice(-1);
  //   let odd = wildNumber % 2 === 1;
  //   let wildBall = null;
  //   let lastBall = null;
  //   let board = this.state.board;
  //   let totalBallsCalled = this.totalBallsCalled;
  //   let previousCallList =
  //     this.state.previousCallList.length > 0
  //       ? [...this.state.previousCallList]
  //       : [];

  //   Object.keys(board).forEach((letter) => {
  //     board[letter].forEach((number) => {
  //       if (!number.called) {
  //         if (number.number === randomBingoNumber) {
  //           this.setState({ wildBall: letter + " " + randomBingoNumber });
  //           number.called = true;
  //           number.active = true;
  //           wildBall = number;
  //           if (this.state.enableCaller) {
  //             this.wildBallCall(number);
  //           }
  //           totalBallsCalled++;
  //           previousCallList.push(number);
  //         } else if (
  //           !this.state.evensOdds &&
  //           number.number.toString().slice(-1) === wildNumber
  //         ) {
  //           lastBall = number;
  //           number.called = true;
  //           totalBallsCalled++;
  //           previousCallList.push(number);
  //         } else if (
  //           this.state.evensOdds &&
  //           (number.number % 2 === 1) === odd
  //         ) {
  //           lastBall = number;
  //           number.called = true;
  //           totalBallsCalled++;
  //           previousCallList.push(number);
  //         }
  //       }
  //       return number;
  //     });
  //     return letter;
  //   });

  //   this.totalBallsCalled = totalBallsCalled;
  //   this.previousBall = lastBall;
  //   this.currentBall = wildBall;
  //   this.setState({ board: board, previousCallList: [...previousCallList] });
  // };

  toggleGame = () => {
    let running = this.state.running;
    if (running === true) {
      clearInterval(this.interval);
    } else {
      this.callBingoNumber();
      this.interval = setInterval(this.callBingoNumber, this.state.delay);
    }
    this.setState({ running: !running });
  };

  toggleResetModal = () => {
    const currentState = this.state.showResetModal;
    this.setState({ showResetModal: !currentState });
  };
  togglestartModal = () => {
    const currentState1 = this.state.showstartModal;
    this.setState({ showstartModal: !currentState1 });
  };


  confirmResetGame = () => {
    // Clear out local storage
    localStorage.removeItem("lpb-gameData");
    localStorage.removeItem("lpb-gameState");
    // reset everything with the board
    clearInterval(this.interval);
    this.cancelSpeech();
    this.totalBallsCalled = 0;
    this.amount=0;
    this.previousBall = null;
    this.currentBall = null;
    this.startButton=0;
    this.setState({
      board: generateBingoBoard(),
      wildBall: null,
      running: false,
      showResetModal: false,
      previousCallList: [],
     
    });
  };

  confirmstartGame = () => {
    // Clear out local storage
    // localStorage.removeItem("lpb-gameData");
    // localStorage.removeItem("lpb-gameState");
    // reset everything with the board
    // clearInterval(this.interval);
    // this.cancelSpeech();
    // this.totalBallsCalled = 0;
    // this.amount=0;
    // this.previousBall = null;
    // this.currentBall = null;
    this.startButton=1;
    this.amount=this.state.amount;
    this.totalBalance=this.totalBalance-this.amount;
    console.log(this.totalBalance);
    this.setState({
      board: generateBingoBoard(),
      // wildBall: null,
      // running: false,
      showstartModal: false,
      // previousCallList: [],
     
    });
  };

  callBingoNumber = () => {
    let totalBallsCalled = this.totalBallsCalled;
    let selectedPattern = this.state.selectedPattern;
    let totalPossibleBalls = 75;
    if (
      this.state.skipUnused === true &&
      selectedPattern.value !== this.patternPlaceholder
    ) {
      totalPossibleBalls = 75 - selectedPattern.unusedLetters.length * 15;
    }
    if (totalBallsCalled < totalPossibleBalls) {
      let board = this.state.board;
      let currentBall = null;
      let previousBall = this.currentBall;
      let randomBingoNumber = getRandomBingoNumber();
      let callAgain = false;
      let updateState = false;
      let previousCallList = [...this.state.previousCallList];

      // Map through the letters on the board
      Object.keys(board).map((letter) => {
        // Map through each number 1-15 under each letter on the board
        board[letter].map((number) => {
          // automatically set the number as not active (this will clear any previously active numbers)
          number.active = false;
          // If this is the match to the random number we called, do logic
          if (number.number === randomBingoNumber) {
            // if the number was not called, do logic. Else call again
            if (!number.called) {
              // set to called and add to previously called numbers
              number.called = true;
              previousCallList.push(number);

              currentBall = number;
              // if we are skipping unused numbers, a pattern has been selected, and this letter is not in use, we want to call a new number when
              // we are done here.
              if (
                this.state.skipUnused &&
                selectedPattern.value !== this.patternPlaceholder &&
                selectedPattern.unusedLetters.indexOf(letter) >= 0
              ) {
                callAgain = true;
              } else {
                // increment the total balls called.
                totalBallsCalled++;
                // set ball to active since we won't be calling again
                number.active = true;

                //If chime is enabled, play the chime
                if (this.state.chime) {
                  let chime = new Audio(this.state.selectedChime.value);
                  chime.play();
                }
                // if caller is enabled AND chimes are enabled, wait a sec to trigger the voice
                // else just call the voice right away
                if (this.state.chime && this.state.enableCaller) {
                  setTimeout(() => {
                    this.voiceCall(number);
                  }, 1000);
                } else {
                  this.voiceCall(number);
                }
              }
              updateState = true;
              this.totalBallsCalled = totalBallsCalled;
            } else {
              // call again cause we got a ball we already called
              callAgain = true;
            }
          }
          return number;
        });
        return letter;
      });

      if (updateState) {
        this.previousBall = previousBall;
        this.currentBall = currentBall;
        this.setState({ board: board, previousCallList: previousCallList });
      }
      if (callAgain && totalBallsCalled < 75) {
        this.callBingoNumber();
      }
    } else {
      clearInterval(this.interval);
      this.totalBallsCalled = totalPossibleBalls;
      this.say(
        "ere jemru!"
      );
      this.previousBall = this.currentBall;
      this.currentBall = null;
      this.setState({ running: false });
    }
  };
// winnerCheck=()=>{
//  <div className="modal">
//  <h1>enter cardId</h1>
//  <button>check</button>
//  </div>

// }
  shuffleBalls = () => {
    let balls = generateBingoBoard();
    let letters = ["B", "I", "N", "G", "O"];
    let sound = new Audio(this.shuffleSound);
    let duration = 800;
    for (let i = 0; i <= duration; i++) {
      window.setTimeout(() => {
        if (i === 0) {
          sound.play();
        }
        if (i > 0 && i <= duration) {
          flashRandomBall();
          this.setState({ board: balls });
        }
        if (i === duration) {
          sound.pause();
          this.confirmResetGame();
        }
      }, duration);
    }

    function flashRandomBall() {
      let randomLetter = letters[Math.floor(Math.random() * 5)];
      let randomNumber = Math.floor(Math.random() * 15);
      Object.keys(balls).forEach((letter) => {
        Object.values(balls[letter]).forEach((ball) => {
          if (ball.letter === randomLetter) {
            balls[randomLetter][randomNumber].active =
              !balls[randomLetter][randomNumber].active;
            balls[randomLetter][randomNumber].called =
              !balls[randomLetter][randomNumber].called;
          }
          return ball;
        });
      });
    }
  };


  /* ------------------ Handlers */
  handleDelayChange = (e) => {
    if (this.state.running === true) {
      clearInterval(this.interval);
      this.interval = setInterval(this.callBingoNumber, e);
    }
    this.setState({ delay: e });
  };

  handleCheckbox = (e) => {
    let gamemode = e.currentTarget.dataset.gamemode;
    switch (gamemode) {
//       case "skip-unused":
//         this.setState({ skipUnused: e.currentTarget.selected });
//         break;
//       case "enable-doublecall":
//         this.setState({ doubleCall: e.currentTarget.selected });
      
//           // this.setState({ extraTalk: e.currentTarget.unchecked,wolatya: e.currentTarget.unchecked ,tigrigna: e.currentTarget.unchecked});
        

//         break;
//       case "enable-extratalk":
//         this.setState({ extraTalk: e.currentTarget.selected });
//         // if (true) {
//         // this.setState({ doubleCall: e.currentTarget.unchecked ,wolayta: e.currentTarget.unchecked,tigrigna: e.currentTarget.unchecked });
//         // }
       
//         break;
//       case "wolayta":
//         this.setState({ wolayta: e.currentTarget.checked });
//         if(true){
// this.setState({ extraTalk: e.currentTarget.unchecked ,doubleCall: e.currentTarget.unchecked,tigrigna: e.currentTarget.unchecked});
//         }
      
//         break;
//         case "tigrigna":
//           this.setState({ tigrigna: e.currentTarget.checked });
          
//   this.setState({ wolayta: e.currentTarget.unchecked ,doubleCall: e.currentTarget.unchecked,extraTalk: e.currentTarget.unchecked});
          
        
//           break;
//       case "evens-odds":
//         this.setState({ evensOdds: e.currentTarget.checked });
//         break;
//       // case "enable-caller":
//       //   if (true) {
//       //   this.setState({doublecall: e.currentTarget.unchecked,wolayta: e.currentTarget.unchecked ,tigrigna: e.currentTarget.unchecked ,extraTalk: e.currentTarget.unchecked })
          
//       //   }
//       //   this.setState({ enableCaller: e.currentTarget.checked });
        

       
//         // break;
//       case "display-board":
//         if (e.currentTarget.checked && this.state.running) {
//           clearInterval(this.interval);
//         }
//         this.setState({
//           displayBoardOnly: e.currentTarget.checked,
//           running: false,
//         });
//         break;
      case "enable-chime":
        this.setState({ chime: e.currentTarget.checked });
        break;
      default:
        break;
    }
  };

  handleUpdatePattern = (pattern, letter, index, slot) => {
    pattern[letter][index] = !slot;
    let unusedLetters = [];
    Object.keys(pattern).map((letter) => {
      // Check for free space ONLY first. If it's not the letter N, check for any used spaces.
      if (letter === "N") {
        let markedSpaces = [];
        // loop through each space in the pattern for the letter N
        pattern[letter].forEach((space, index) => {
          // if the space is marked, push the index of the space into markedSpaces array
          if (space) {
            markedSpaces.push(index);
          }
        });
        // if no spaces are marked, OR ONLY the free space is marked - push N to unused letters.
        if (
          markedSpaces.length === 0 ||
          (markedSpaces.length === 1 && markedSpaces[0] === 2)
        ) {
          unusedLetters.push(letter);
        }
      } else {
        if (pattern[letter].indexOf(true) < 0) {
          unusedLetters.push(letter);
        }
      }
      return letter;
    });
    let customPattern = {
      value: "Custom",
      label: "Custom",
      unusedLetters: unusedLetters,
      pattern: pattern,
    };
    this.setState({ selectedPattern: customPattern });
  };

  /* ------------------- JSX Display Functions */

  /**
   * Returns a JSX element to display the current ball
   *
   * @return  {JSX}  JSX Element
   */
  get currentBallDisplay() {
    return this.currentBall !== null
      ? getBallDisplay(this.currentBall)
      : getLogoBallDisplay();
  }

  /**
   * Get Number Display shown above the pattern display
   *
   * @return  {JSX}  html element
   */
  get numberDisplay() {
    let numbers = this.totalBallsCalled.toString().split("");
    if (numbers.length === 1) {
      return (
        <div>
          <span>&nbsp;</span>
          <span>{numbers[0]}</span>
        </div>
      );
    } else {
      return numbers.map((number, index) => (
        <span key={"numDisplay" + number + index}>{number}</span>
      ));
    }
  }

  /**
   * Get the current call display
   *
   * @return  {JSX}  html element
   */
  get currentCallDisplay() {
    const currentCall = this.currentBall;
    if (currentCall) {
      let numbers = ["0"];
      if (Object.prototype.hasOwnProperty.call(currentCall, "number")) {
        numbers = currentCall.number.toString().split("");
      }
      if (numbers.length === 1) {
        return (
          <div>
            <span>&nbsp;</span>
            <span>{numbers[0]}</span>
          </div>
        );
      } else {
        return numbers.map((number, index) => (
          <span key={"call" + number + index}>{number}</span>
        ));
      }
    } else {
      return (
        <div>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
        </div>
      );
    }
  }

  /**
   * Get the previous call display
   *
   * @return  {JSX}  html element
   */
  get previousCallDisplay() {
    const previousCall = this.previousBall;
    if (previousCall) {
      let numbers = ["0"];
      if (Object.prototype.hasOwnProperty.call(previousCall, "number")) {
        numbers = previousCall.number.toString().split("");
      }
      if (numbers.length === 1) {
        return (
          <div>
            <span>&nbsp;</span>
            <span>{numbers[0]}</span>
          </div>
        );
      } else {
        return numbers.map((number, index) => (
          <span key={"call" + number + index}>{number}</span>
        ));
      }
    } else {
      return (
        <div>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
        </div>
      );
    }
  }

  /**
   * Reset confirmation modal display
   *
   * @return  {[JSX]}  Return modal or empty div
   */
  get resetConfirmationModalDisplay() {
    if (this.state.showResetModal === true) {
      return (
        <div>
          <div className="modal">
            <h4>Reset Game</h4>
            <p>Are you sure you want to reset the game?</p>
            {/* <p className="red-text">
              This action <strong>cannot</strong> be undone.
            </p> */}
            <p>
              <button onClick={this.toggleResetModal}>Cancel</button>
              <button className="primaryBtn" onClick={this.confirmResetGame}>
                yes
              </button>
            </p>
          </div>
          <div
            className="modal-backdrop"
            onClick={(e) => {
              e.preventDefault();
            }}
          ></div>
        </div>
      );
    } else {
      return null;
    }
  }






  // getstartConfirmationModalDisplay = () => {
  //   if (showStartModal) {
  //     return (
  //       <div>
  //         <div className="modal">
  //           <h4>Enter bet amount</h4>
  //           <input
  //             type="number"
  //             placeholder="Bet Amount"
  //             required
  //             value={betAmount}
  //             onChange={handleBetAmountChange}
  //           />
  //           <div className="ball-grid">
  //             {/* Generate 100 balls with numbers 1-100 */}
  //             {Array.from({ length: 100 }, (_, i) => i + 1).map((number) => (
  //               <div
  //                 key={number}
  //                 className={ball ${selectedBalls.includes(number) ? 'selected' : ''}}
  //                 onClick={() => handleBallClick(number)}
  //               >
  //                 {number}
  //               </div>
  //             ))}
  //           </div>
  //           <p>Total Amount: {betAmount * selectedBalls.length}</p>
  //           <p>Are you sure you want to reset the game?</p>
  //           <p>
  //             <button onClick={togglestartModal}>Cancel</button>
  //             <button className="primaryBtn" onClick={confirmstartGame}>
  //               Done
  //             </button>
  //           </p>
  //         </div>
  //         <div
  //           className="modal-backdrop"
  //           onClick={(e) => {
  //             e.preventDefault();
  //           }}
  //         ></div>
  //       </div>
  //     );
  //   } else {
  //     return null;
  //   }
  // };

  get startConfirmationModalDisplay() {
    
    if (this.state.showstartModal === true) {
      let balance =this.totalBalance;
        return (
            <div>
                <div className="modal">
                 
                  <div>
                <h5>Enter bet amount</h5>  <input type="number" placeholder="Bet Amount" required onChange={this.handleBetAmountChange} />
                </div> <label>Number of Cards:</label>
                    <div className="number-input">
                        <button onClick={this.decrementCards}>-</button>
                        <input type="number" value={this.state.cardCount} onChange={this.handleCardCountChange} />
                        <button onClick={this.incrementCards}>+</button>
                    </div>
                    <p>Total Amount: {this.state.amount}</p>
                    
                    {/* <p className="red-text">
                        This action <strong>cannot</strong> be undone.
                    </p> */}
                    <p>
              
                        <button onClick={this.togglestartModal}>Cancel</button>
                        <button className="primaryBtn" onClick={this.confirmstartGame} disabled={this.state.amount  === 0 || balance===0}>Done</button>
                    </p>
                    <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'}>
      1
    </button>
                <button onClick={this.state.isRed2 ? this.decrementCards2 :this.incrementCards2}  className={ this.state.isRed2 ? 'red' : 'bt'}>2</button>
                <button onClick={this.state.isRed3 ? this.decrementCards3 :this.incrementCards3} className={ this.state.isRed3 ? 'red' : 'bt'} >3</button>
                <button onClick={this.state.isRed4 ? this.decrementCards4 :this.incrementCards4} className={ this.state.isRed4 ? 'red' : 'bt'} >4</button>
                <button onClick={this.state.isRed5 ? this.decrementCards5 :this.incrementCards5} className={ this.state.isRed5 ? 'red' : 'bt'} >5</button>
                <button onClick={this.state.isRed6 ? this.decrementCards6 :this.incrementCards6} className={ this.state.isRed6 ? 'red' : 'bt'} >6</button>
                <button onClick={this.state.isRed7 ? this.decrementCards7 :this.incrementCards7} className={ this.state.isRed7 ? 'red' : 'bt'} >7</button>
                <button onClick={this.state.isRed8 ? this.decrementCards8 :this.incrementCards8} className={ this.state.isRed8? 'red' : 'bt'} >8</button>
                <button onClick={this.state.isRed9 ? this.decrementCards9 :this.incrementCards9} className={ this.state.isRed9 ? 'red' : 'bt'} >9</button>
                <button onClick={this.state.isRed10 ? this.decrementCards10 :this.incrementCards10} className={ this.state.isRed10? 'red' : 'bt'} >10</button>
                <button onClick={this.state.isRed11 ? this.decrementCards11 :this.incrementCards11} className={ this.state.isRed11 ? 'red' : 'bt'} >11</button>
                <button onClick={this.state.isRed12 ? this.decrementCards12 :this.incrementCards12} className={ this.state.isRed12 ? 'red' : 'bt'} >12</button>
                <button onClick={this.state.isRed13 ? this.decrementCards13 :this.incrementCards13} className={ this.state.isRed13 ? 'red' : 'bt'} >13</button>
                <button onClick={this.state.isRed14 ? this.decrementCards14 :this.incrementCards14} className={ this.state.isRed14 ? 'red' : 'bt'} >14</button>
                <button onClick={this.state.isRed15 ? this.decrementCards15 :this.incrementCards15} className={ this.state.isRed15 ? 'red' : 'bt'} >15</button>
                <button onClick={this.state.isRed16 ? this.decrementCards16 :this.incrementCards16} className={ this.state.isRed16 ? 'red' : 'bt'} >16</button>
                <button onClick={this.state.isRed17 ? this.decrementCards17 :this.incrementCards17} className={ this.state.isRed17 ? 'red' : 'bt'} >17</button>
                <button onClick={this.state.isRed18 ? this.decrementCards18 :this.incrementCards18} className={ this.state.isRed18 ? 'red' : 'bt'} >18</button>
                <button onClick={this.state.isRed19 ? this.decrementCards19 :this.incrementCards19} className={ this.state.isRed19 ? 'red' : 'bt'} >19</button>
                <button onClick={this.state.isRed20 ? this.decrementCards20 :this.incrementCards20} className={ this.state.isRed20 ? 'red' : 'bt'} >20</button>
                <button onClick={this.state.isRed21 ? this.decrementCards21 :this.incrementCards21} className={ this.state.isRed21 ? 'red' : 'bt'} >21</button>
                <button onClick={this.state.isRed22 ? this.decrementCards22 :this.incrementCards22} className={ this.state.isRed22 ? 'red' : 'bt'} >22</button>
                <button onClick={this.state.isRed23 ? this.decrementCards23 :this.incrementCards23} className={ this.state.isRed23 ? 'red' : 'bt'} >23</button>
                <button onClick={this.state.isRed24 ? this.decrementCards24 :this.incrementCards24} className={ this.state.isRed24 ? 'red' : 'bt'} >24</button>
                <button onClick={this.state.isRed25 ? this.decrementCards25 :this.incrementCards25} className={ this.state.isRed25 ? 'red' : 'bt'} >25</button>
                <button onClick={this.state.isRed26 ? this.decrementCards26 :this.incrementCards26} className={ this.state.isRed26 ? 'red' : 'bt'} >26</button>
                <button onClick={this.state.isRed27 ? this.decrementCards27 :this.incrementCards27} className={ this.state.isRed27 ? 'red' : 'bt'} >27</button>
                <button onClick={this.state.isRed28 ? this.decrementCards28 :this.incrementCards28} className={ this.state.isRed28 ? 'red' : 'bt'} >28</button>
                <button onClick={this.state.isRed29 ? this.decrementCards29 :this.incrementCards29} className={ this.state.isRed29 ? 'red' : 'bt'} >29</button>
                <button onClick={this.state.isRed30 ? this.decrementCards30 :this.incrementCards30} className={ this.state.isRed30 ? 'red' : 'bt'} >30</button>
                <button onClick={this.state.isRed31 ? this.decrementCards31 :this.incrementCards31} className={ this.state.isRed31 ? 'red' : 'bt'} >31</button>
                <button onClick={this.state.isRed32 ? this.decrementCards32 :this.incrementCards32} className={ this.state.isRed32 ? 'red' : 'bt'} >32</button>
                <button onClick={this.state.isRed33 ? this.decrementCards33 :this.incrementCards33} className={ this.state.isRed33 ? 'red' : 'bt'} >33</button>
                {/* <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >34</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >35</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >36</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >37</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >38</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >39</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >40</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >41</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >42</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >43</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >44</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >45</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >46</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >47</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >48</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >49</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >50</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >51</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >52</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >53</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >54</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >55</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >56</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >57</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >58</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >59</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >60</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >61</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >62</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >63</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >64</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >65</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >66</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >67</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >68</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >69</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >70</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >71</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >72</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >73</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >74</button>
                <button onClick={this.state.isRed ? this.decrementCards :this.incrementCards} className={ this.state.isRed ? 'red' : 'bt'} >75</button>
                */}
                </div>
              
                
                

                <div
                    className="modal-backdrop"
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                ></div>
            </div>
        );
    } else {
        return null;
    }
}

handleBetAmountChange = (e) => {
    const betAmount = e.target.value;
    this.setState({
        betAmount,
        amount: betAmount * this.state.cardCount,
    });
};

handleCardCountChange = (e) => {
    const cardCount = parseInt(e.target.value) || 0;
    this.setState({
        cardCount,
        amount: this.state.betAmount * cardCount,
    });
};

incrementCards = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};
incrementCards2 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed2: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};

decrementCards = () => {
  const currentState01 = this.state.isRed;
  this.setState({ isRed: !currentState01 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
decrementCards2 = () => {
  const currentState2 = this.state.isRed2;
  this.setState({ isRed2: !currentState2 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
incrementCards3 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed3: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};

decrementCards3 = () => {
  const currentState01 = this.state.isRed3;
  this.setState({ isRed3: !currentState01 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
decrementCards4 = () => {
  const currentState2 = this.state.isRed4;
  this.setState({ isRed4: !currentState2 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
incrementCards4 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed4: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};

decrementCards5 = () => {
  const currentState01 = this.state.isRed5;
  this.setState({ isRed5: !currentState01 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
decrementCards6= () => {
  const currentState2 = this.state.isRed6;
  this.setState({ isRed6: !currentState2 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
incrementCards5 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed5: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};

decrementCards7 = () => {
  const currentState01 = this.state.isRed7;
  this.setState({ isRed7: !currentState01 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
decrementCards8 = () => {
  const currentState2 = this.state.isRed8;
  this.setState({ isRed8: !currentState2 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
incrementCards6 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed6: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};

decrementCards9 = () => {
  const currentState01 = this.state.isRed9;
  this.setState({ isRed9: !currentState01 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
decrementCards10 = () => {
  const currentState2 = this.state.isRed10;
  this.setState({ isRed10: !currentState2 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
incrementCards7 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed7: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};

decrementCards11 = () => {
  const currentState01 = this.state.isRed11;
  this.setState({ isRed11: !currentState01 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
decrementCards12 = () => {
  const currentState2 = this.state.isRed12;
  this.setState({ isRed12: !currentState2 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
incrementCards8= () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed8: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};

decrementCards13 = () => {
  const currentState01 = this.state.isRed13;
  this.setState({ isRed13: !currentState01 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
decrementCards14 = () => {
  const currentState2 = this.state.isRed14;
  this.setState({ isRed14: !currentState2 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
incrementCards9 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed9: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};

decrementCards15 = () => {
  const currentState01 = this.state.isRed15;
  this.setState({ isRed15: !currentState01 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
decrementCards16 = () => {
  const currentState2 = this.state.isRed16;
  this.setState({ isRed16: !currentState2 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
incrementCards10 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed10: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};

decrementCards17 = () => {
  const currentState01 = this.state.isRed17;
  this.setState({ isRed17: !currentState01 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
decrementCards18 = () => {
  const currentState2 = this.state.isRed18;
  this.setState({ isRed18: !currentState2 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
incrementCards11 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed11: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};

decrementCards19 = () => {
  const currentState01 = this.state.isRed19;
  this.setState({ isRed19: !currentState01 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
decrementCards20 = () => {
  const currentState2 = this.state.isRed20;
  this.setState({ isRed20: !currentState2 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
incrementCards12 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed12: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};

decrementCards21 = () => {
  const currentState01 = this.state.isRed21;
  this.setState({ isRed21: !currentState01 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
decrementCards22 = () => {
  const currentState2 = this.state.isRed22;
  this.setState({ isRed22: !currentState2 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};

incrementCards13 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed13: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};

decrementCards23 = () => {
  const currentState01 = this.state.isRed23;
  this.setState({ isRed23: !currentState01 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
decrementCards24 = () => {
  const currentState2 = this.state.isRed24;
  this.setState({ isRed24: !currentState2 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
incrementCards14 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed14: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};

decrementCards25 = () => {
  const currentState01 = this.state.isRed25;
  this.setState({ isRed25: !currentState01 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
decrementCards26 = () => {
  const currentState2 = this.state.isRed26;
  this.setState({ isRed26: !currentState2 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
incrementCards15 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed15: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};

decrementCards27 = () => {
  const currentState01 = this.state.isRed27;
  this.setState({ isRed27: !currentState01 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
decrementCards28 = () => {
  const currentState2 = this.state.isRed28;
  this.setState({ isRed28: !currentState2 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
incrementCards16 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed16: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};

decrementCards29 = () => {
  const currentState01 = this.state.isRed29;
  this.setState({ isRed29: !currentState01 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
decrementCards30 = () => {
  const currentState2 = this.state.isRed30;
  this.setState({ isRed30: !currentState2 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
incrementCards17 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed17: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};

decrementCards31 = () => {
  const currentState01 = this.state.isRed31;
  this.setState({ isRed31: !currentState01 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
decrementCards32 = () => {
  const currentState2 = this.state.isRed32;
  this.setState({ isRed32: !currentState2 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};
incrementCards18 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed18: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};

decrementCards33 = () => {
  const currentState01 = this.state.isRed33;
  this.setState({ isRed33: !currentState01 });

    if (this.state.cardCount > 0) {
        this.setState((prevState) => ({
            cardCount: prevState.cardCount - 1,
            amount: prevState.betAmount * (prevState.cardCount - 1),
        }));
    }
};

incrementCards19 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed19: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};


incrementCards20 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed20: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};
incrementCards21 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed21: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};
incrementCards22 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed22: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};
incrementCards23 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed23: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};
incrementCards24 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed24: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};
incrementCards25 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed25: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};
incrementCards26 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed26: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};
incrementCards27 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed27: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};
incrementCards28 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed28: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};
incrementCards29 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed29: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};
incrementCards30 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed30: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};
incrementCards31 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed31: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};incrementCards32 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed32: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};incrementCards33 = () => {
  // const currentState2 = this.state.isRed;
    this.setState({ isRed33: true });
    this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
};




  /* ------------------- Speech Synthesis */

  /**
   * Returns the options for the voice selection menu
   *
   * @return  {Array}  Options array
   */
  get voiceOptions() {
    let voiceOptions = [];
    if (this.speechEnabled === true) {
      this.voices.forEach((voice) => {
        let voiceObj = voice;
        voiceObj.value = voice.name;
        voiceObj.label = voice.name + " / " + getLanguageText(voice.lang);
        voiceOptions.push(voiceObj);
      });
    }
    return voiceOptions;
  }

  /*
   *  Choose Caller Function
   *  This sets the selected caller
   */
  handleChooseCaller = (e) => {
    this.setState({ selectedCaller: e });
    
    switch(e.value){
      case "amh-male":
        this.setState({ 
          enableCaller: true,
          doubleCall: false,
          tigrigna: false,
          wolayta: false,
          extraTalk: false
        });
        break;
      case "amh-fem":
        this.setState({ 
          doubleCall: true,
          enableCaller: false,
          tigrigna: false,
          wolayta: false,
          extraTalk: false
        });
        break;
      case "oro-fem":
        this.setState({ 
          extraTalk: true,
          enableCaller: false,
          doubleCall: false,
          tigrigna: false,
          wolayta: false
        });
        break;
      case "wol-fem":
        this.setState({ 
          wolayta: true,
          enableCaller: false,
          doubleCall: false,
          extraTalk: false,
          tigrigna: false
        });
        break;
      case "tig-fem":
        this.setState({ 
          tigrigna: true,
          wolayta: false,
          enableCaller: false,
          doubleCall: false,
          extraTalk: false
        });
        break;
    
    default:
          break;
    }
  };

  /**
   * Choose Chime Function
   * Sets the selected chime audible
   *
   * @param   {event}  e  Event
   */
  handleChooseChime = (e) => {
    let chime = new Audio(e.value);
    chime.play();
    this.setState({ selectedChime: e });
  };

  /* ------------------- Display Board Only Mode */
  manualCall = (ball) => {
    let board = this.state.board;
    let currentBall = null;
    let previousBall = this.currentBall;
    let totalBallsCalled = this.totalBallsCalled;
    let previousCallList = [...this.state.previousCallList];
    Object.keys(board).forEach((letter) => {
      board[letter].forEach((number) => {
        number.active = false;
        if (ball.number === number.number) {
          if (number.called) {
            number.called = false;
            totalBallsCalled--;
            previousCallList = previousCallList.map((previousBall) => {
              return previousBall !== ball;
            });
            previousBall = previousCallList[previousCallList.length - 1];
          } else {
            previousCallList.push(number);
            number.called = true;
            number.active = true;
            totalBallsCalled++;
            currentBall = number;
          }
        }
        return number;
      });
      return letter;
    });
    this.totalBallsCalled = totalBallsCalled;
    this.previousBall = previousBall;
    this.currentBall = currentBall;
    this.setState({ board: board, previousCallList });
  };

  /**
   * Sends an email that contains game
   * settings and device info to help with
   * replicating user issues
   */
  handleBugReport = () => {
    let subject = "Let's Play Bingo bug report";
    let body = `Thank you for playing let's play bingo and for taking the time to report a bug! Please describe what is happening to you so I may fix it ASAP.`;
    body += `%0D%0A%0D%0A%0D%0A -------------------------------- PLEASE LEAVE EVERYTHING BELOW THIS LINE IN TACT --------------------------------`;
    body += `%0D%0A%0D%0A The data below includes information about your device and your game settings. This information will help me replicate your issue so I can fix it.`;
    body += `%0D%0A%0D%0A----- Browser/Device Info ------ %0D%0A`;
    const { userAgent } = navigator;
    body += JSON.stringify(userAgent);
    body += `%0D%0A%0D%0A----- Game State ------ %0D%0A`;
    let gameData = this.state;
    body += JSON.stringify(gameData);
    window.open(
      `mailto:hello@letsplaybingo.io?subject=${subject}&body=${body}`
    );
  };

  /* ------------------- Render */
  render() {
    return (
      <div className="dark-bg light-links">
        {/* ----------- Bingo Board ------------- */}
        <section className="board-block">
          <div className="container row no-wrap align-stretch">
            {/* ------ Board ------- */}
            <div className="col pattern-side shrink padding-xlg">
              {/* -------- Digital Displays --------- */}
              <div className="row no-wrap margin-bottom-lg justify-space-between white-text">
                <div className="col text-center margin-sm">
                  <div className="callNumber notranslate">
                    {this.numberDisplay}
                  </div>
                  <div className="callNumber-text uppercase">Total Calls</div>
                </div>
                <div className="col text-center margin-sm">
                  <div className="callNumber notranslate">
                    {this.previousCallDisplay}
                  </div>
                  <div className="callNumber-text uppercase">Previous Call</div>
                </div>
              </div>

              {/* -------- Pattern --------- */}
              <Pattern
                pattern={this.state.selectedPattern}
                update={this.handleUpdatePattern}
              />
              {/* <div className="padding-vertical-lg">
                <Select
                  className="pattern-select"
                  placeholder="Choose Pattern"
                  value={this.state.selectedPattern}
                  onChange={(e) => {
                    this.setState({ selectedPattern: e });
                  }}
                  options={this.presets}
                />
              </div> */}
            </div>
            <div className="col board-side">
              <BingoBoard
                board={this.state.board}
                manualMode={this.state.displayBoardOnly}
                manualCall={this.manualCall}
              />
            </div>
          </div>
        </section>

        {/* ----------- BOTTOM SECTION ------------- */}
        <section className="game-controls new-bg">
          <div className="container row justify-start align-start">
            {/* ----------- Current Ball Display ------------- */}
            <div className="col min-size-250 padding-vertical-xxlg padding-horizontal-md notranslate">
              {this.currentBallDisplay}

              <CallHistory
                calledBalls={this.state.previousCallList}
              ></CallHistory>
{/* 
              <div
                data-visibility={this.state.wildBingo ? "show" : "hide"}
                className="white-text text-center margin-top-lg"
              >
                <strong>Wild Ball: </strong> {this.state.wildBall}
              </div> */}
            </div>

            {/* ----------- Gameplay Controls ------------- */}
            <div className="col shrink padding-vertical-xxlg padding-horizontal-md">
              <section className="gameplay-controls">
                <div data-disabled={this.totalBallsCalled >= 75}>
                  <button
                    data-disabled={this.state.displayBoardOnly}
                    onClick={
                      this.totalBallsCalled === 0
                        // ? this.startNewGame
                        ?this.togglestartModal
                        : this.callBingoNumber
                    }
                    disabled={this.state.running}
                  >
                   {this.totalBallsCalled === 0 ? (
    <>
      Start New Game <SlGameController />
    </>
  ) : (
    <>
      Call Next Number <FaStepForward />
    </>
  )}
                  </button>

                  <button
                    data-disabled={this.state.displayBoardOnly}
                    data-newgame={this.totalBallsCalled === 0}
                    className={
                      this.state.running ? "pause-button" : "play-button"
                    }
                     disabled={this.startButton===0 }
                    onClick={
                      this.totalBallsCalled === 0
                        ? this.startNewAutoplayGame      
                        : this.toggleGame
                    }
                  >
                     {this.state.running ? (
    <>
      Pause Autoplay <FaPause />
    </>
  ) : (
    <>
      Start Autoplay  <VscDebugStart />
   
    </>
  )}
                  </button>
                </div>

                <button
                  onClick={this.toggleResetModal}
                  disabled={this.state.running || this.totalBallsCalled === 0}
                >
                  Reset Board    <BiReset/>
                </button>

                <button
                  onClick={this.shuffleBalls}
                  disabled={this.state.running || this.totalBallsCalled > 0}
                >
                  Shuffle Board     <PiShuffleDuotone />
                </button>
               
              </section>
              {this.resetConfirmationModalDisplay}
              {this.startConfirmationModalDisplay}
            </div>

            {/* ----------- Game Settings ------------- */}
            <div className="col grow no-wrap padding-vertical-xxlg padding-horizontal-md white-text">
              <section className="game-settings">
                {/* ----------- Gameplay Settings ---------- */}
                {/* <div className="row align-top justify-start">
                  <div className="col shrink min-size-150 padding-horizontal-lg padding-vertical-md">
                    <h6>Gameplay Settings:</h6>
                  </div>
                  <div className="col grow min-size-150 padding-horizontal-lg">
                    <div className="row">
                      <div
                        className="col grow"
                        data-disabled={this.totalBallsCalled > 0}
                      >
                        <label
                          className={
                            this.state.displayBoardOnly
                              ? "toggle checked"
                              : "toggle"
                          }
                        >
                          <span className="toggle-span"></span>
                          <span>Manual Calling Mode</span>
                          <input
                            type="checkbox"
                            data-gamemode="display-board"
                            onChange={this.handleCheckbox}
                            checked={this.state.displayBoardOnly}
                          ></input>
                        </label>
                      </div>
                    </div>
                    <div
                      className="row justify-start"
                      data-visibility={
                        this.state.displayBoardOnly === false ? "show" : "hide"
                      }
                    >
                     
                    
                      
                     
                  
                    
                   
                    </div>
                  </div>
                </div> */}

                {/* ----------- Settings when using generation ---------- */}
                <div
                  data-visibility={
                    this.state.displayBoardOnly === false ? "show" : "hide"
                  }
                >
                  {/* ----------- Autoplay Settings ---------- */}
                  <div className="row no-wrap align-center justify-start">
                    <div className="col shrink min-size-150 padding-horizontal-lg">
                      <h6>Autoplay Speed: <SiFastapi /> </h6>
                    </div>
                    <div className="col shrink text-center padding-vertical-lg padding-horizontal-lg">
                      <div
                        className="row no-wrap align-center slider"
                        data-disabled={this.state.displayBoardOnly}
                      >
                        <div className="col shrink padding-right-lg white-text">
                        
                          Slower
                          <span>&nbsp;</span>
                          <MdOutlineAssistWalker />
                        </div>
                        <div className="col">
                          <Slider
                            min={3500}
                            max={30000}
                            step={500}
                            value={this.state.delay}
                            onChange={this.handleDelayChange}
                            reverse={true}
                          />
                        </div>
                        <div className="col shrink padding-left-lg white-text">
                          Faster <span>&nbsp;</span>
                          <FaRunning />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ----------- Caller ---------- */}
                  <div className="row align-start justify-start">
                    <div className="col shrink min-size-150 padding-vertical-md padding-horizontal-lg">
                      <h6> Audible Caller: <FaVolumeUp/>  </h6>
                     
                    </div>
                    <div className="col grow min-size-150 padding-horizontal-lg">
                      {/* Disabled if manual calling mode is on */}
                      <div
                        className="row no-wrap justify-start"
                        data-visibility={
                          this.speechEnabled === true ? "show" : "hide"
                        }
                      >


                        {/* Only shown if speech is enabled by the browser */}
                        {/* <div className="col shrink padding-right-xlg"> */}
                          {/* <label
                            className={
                              this.state.enableCaller
                                ? "toggle checked"
                                : "toggle"
                            }
                          >
                            <span className="toggle-span"></span>
                            <span>amharic-male</span>
                            <input
                              type="checkbox"
                              data-gamemode="enable-caller"
                              onChange={this.handleCheckbox}
                              checked={this.state.enableCaller}
                            ></input>
                          </label> */}
                        {/* </div>
                        <div
                          className="col shrink padding-right-xlg mobile-no-horizontal-padding"
                          // data-visibility={
                          //   this.state.enableCaller ? "show" : "hide"
                          // }
                        > */}
                          {/* <label
                            className={
                              this.state.doubleCall
                                ? "toggle checked"
                                : "toggle"
                            }
                          >
                            <span className="toggle-span"></span>
                            <span>amharic-female</span>
                            <input
                              type="checkbox"
                              data-gamemode="enable-doublecall"
                              onChange={this.handleCheckbox}
                              checked={this.state.doubleCall}
                            ></input>
                          </label>
                        </div>
                        <div
                          // className="col shrink padding-right-xlg mobile-no-horizontal-padding"
                          // data-visibility={
                          //   this.state.enableCaller ? "show" : "hide"
                          // }
                        >
                          <label
                            className={
                              this.state.extraTalk ? "toggle checked" : "toggle"
                            }
                          >
                            <span className="toggle-span"></span>
                            <span>oromigna-female</span>
                            <input
                              type="checkbox"
                              data-gamemode="enable-extratalk"
                              onChange={this.handleCheckbox}
                              checked={this.state.extraTalk}
                            ></input>
                          </label>
                          <label
                            className={
                              this.state.wolayta ? "toggle checked" : "toggle"
                            }
                          >

                            <span className="toggle-span"></span>
                            <span>wolaytigna-female</span>
                            <input
                              type="checkbox"
                              data-gamemode="wolayta"
                              onChange={this.handleCheckbox}
                              checked={this.state.wolayta}
                            ></input>
                          </label>
                          <label
                            className={
                              this.state.tigrigna ? "toggle checked" : "toggle"
                            }
                          >

                            <span className="toggle-span"></span>
                            <span>tigrigna-female</span>
                            <input
                              type="checkbox"
                              data-gamemode="tigrigna"
                              onChange={this.handleCheckbox}
                              checked={this.state.tigrigna}
                            ></input>
                          </label>

                        </div>*/}
                         <div className="col grow padding-horizontal-lg">
                      <Select
                        className="select-input"
                        placeholder="Choose callers"
                        menuPlacement="auto"
                        value={this.state.selectedCaller}
                        onChange={this.handleChooseCaller}
                        options={this.callers}
                      />
                    </div>
                      </div> 

                      {/* Only shown if speech is DISABLED by the browser */}
                      <div
                        className="row no-wrap"
                        data-visibility={
                          this.speechEnabled === true ? "hide" : "show"
                        }
                      >
                        <div className="col grow">
                          Sorry, but your browser does not support the audible
                          bingo caller.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ----------- Caller Selection ----------- */}
                  {/* <div
                    className="row align-start justify-start"
                    data-visibility={
                      this.speechEnabled === true &&
                      this.state.enableCaller === true
                        ? "show"
                        : "hide"
                    }
                  >
                    <div className="col shrink min-size-150 padding-vertical-md padding-horizontal-lg">
                      <h6>Caller Selection:</h6>
                    </div>
                    <div className="col grow min-size-150 padding-horizontal-lg">
                      <Select
                        className="select-input"
                        placeholder="Choose Caller"
                        menuPlacement="auto"
                        value={this.state.selectedCaller}
                        onChange={this.handleChooseCaller}
                        options={this.voiceOptions}
                      />
                    </div>
                  </div> */}

                  {/* ----------- Chime ----------- */}
                  <div className="row no-wrap align-start justify-start">
                    <div className="col shrink min-size-150 padding-vertical-md padding-horizontal-lg">
                      <h6>Audible Chime:  <FaBell /></h6>
                    </div>

                    <div className="col grow padding-horizontal-lg">
                      <label
                        className={
                          this.state.chime ? "toggle checked" : "toggle"
                        }
                      >
                        <span className="toggle-span"></span>
                        <span>enable</span>
                        <input
                          type="checkbox"
                          data-gamemode="enable-chime"
                          onChange={this.handleCheckbox}
                          checked={this.state.chime}
                        ></input>
                      </label>
                    </div>
                  </div>

                  {/* ----------- Chime Selection ----------- */}
                  <div
                    className="row no-wrap align-start justify-start"
                    data-visibility={this.state.chime ? "show" : "hide"}
                  >
                    <div className="col shrink min-size-150 padding-vertical-md padding-horizontal-lg">
                      <h6>Chime Selection:  <FaSearch /></h6>
                    </div>

                    <div className="col grow padding-horizontal-lg">
                      <Select
                        className="select-input"
                        placeholder="Choose Chime"
                        menuPlacement="auto"
                        value={this.state.selectedChime}
                        onChange={this.handleChooseChime}
                        options={this.chimes}
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* ----------- Mini Updates ------------- */}
            {/* <div className="col grow min-size-350 padding-vertical-xxlg padding-horizontal-xxlg white-text">
              <h4 className="margin-vertical-md">Retired Edition</h4>
              <p className="wrap-text small-text">
                This edition of Let's Play Bingo has been retired. Please try
                the latest edition that has many improvements at{" "}
                <a
                  href="https://letsplaybingo.io/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Let's Play Bingo
                </a>
                !
              </p>  
              <p className="wrap-text small-text">
                You can also check out these other editions:
                <br />
                <a
                  href="https://classic.letsplaybingo.io/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Let's Play Bingo - Classic
                </a>
                <br />
                <a
                  href="https://90ball.letsplaybingo.io/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Let's Play Bingo - 90 Ball
                </a>
                <br />
              </p>
             */}
             
        
             <div className="col grow min-size-350 padding-vertical-xxlg padding-horizontal-xxlg white-text">
<h2> win amount   <FcMoneyTransfer /> : </h2>  <div className="win-amount-box"><h1>{this.amount}Br.</h1> </div>



<h2>  winnerCheck <GiPodiumWinner /> : <span className="check-win-box"> <input type="text" placeholder="Enter cartela id to check"  /><button>Check</button></span></h2>


             </div>
          </div>
        </section>
      </div>
    );
  
             
  }
 
}

export default BingoGame;
