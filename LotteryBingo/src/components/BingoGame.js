// Dependencies
import React, { Component } from "react";
import { useBalance } from "./BalanceContext.js";
import './Gaming.css';
import { connect } from "react-redux";
import withBalance from "./WithBalance.js";
import Slider from "rc-slider";
import Select from "react-select";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";
import {
  FaBell,
  FaRunning,
  FaSearch,
  FaPause,
  FaStepForward,
} from "react-icons/fa";
import { SiFastapi } from "react-icons/si";
import { SlGameController } from "react-icons/sl";
import { BiReset } from "react-icons/bi";
import { PiShuffleDuotone } from "react-icons/pi";
import { VscDebugStart } from "react-icons/vsc";
import { FcSpeaker } from "react-icons/fc";
import { RiPaintBrushFill, RiSpeakFill } from "react-icons/ri";
import { MdOutlinePattern } from "react-icons/md";

// Custom Components
import BingoBoard from "./subcomponents/BingoBoard.js";
import Pattern from "./subcomponents/Pattern.js";
import CallHistory from "./subcomponents/CallHistory.js";

import { MdOutlineAssistWalker } from "react-icons/md";

// Utilities
import {
  generateBingoBoard,
  getRandomBingoNumber,
  getBallDisplay,
  getLogoBallDisplay,
  // getLanguageText,
} from "../utils.js";

// Chimes
import {
  onefa,
  twofa,
  threefa,
  fourfa,
  fivefa,
  sixfa,
  sevenfa,
  eightfa,
  ninefa,
  tenfa,
  elevenfa,
  twelvefa,
  thirteenfa,
  fourteenfa,
  fifteenfa,
  sixteenfa,
  seventeenfa,
  eighteenfa,
  nineteenfa,
  twentyfa,
  twentyonefa,
  twenttwofa,
  twentythreefa,
  twentyfourfa,
  twentyfivefa,
  twentysixfa,
  twentysevenfa,
  twentyeightfa,
  twentyninefa,
  thirtyfa,
  thirtyonefa,
  thirtytwofa,
  thirtythreefa,
  thirtyfourfa,
  thirtyfivefa,
  thirtysixfa,
  thirtysevenfa,
  thirtyeightfa,
  thirtyninefa,
  fortyfa,
  fortyonefa,
  fortytwoa,
  fortythreefa,
  fortyfourfa,
  fortyfivefa,
  fortysixfa,
  fortysevenfa,
  fortyeightfa,
  fortyninefa,
  fiftyfa,
  fiftyonefa,
  fiftytwofa,
  fiftythreefa,
  fiftyfourfa,
  fiftyfivefa,
  fiftysixfa,
  fiftysevenfa,
  fiftyeightfa,
  fiftyninefa,
  sixtyfa,
  sixtyonefa,
  sixtytwofa,
  sixtythreefa,
  sixtyfourfa,
  sixtyfivefa,
  sixtysixfa,
  sixtysevenfa,
  sixtyeightfa,
  sixtyninefa,
  seventyfa,
  seventyonefa,
  seventytwofa,
  seventythreefa,
  seventyfourfa,
  seventyfivefa,
  onefw,
  twofw,
  threefw,
  fourfw,
  fivefw,
  sixfw,
  sevenfw,
  eightfw,
  ninefw,
  tenfw,
  elevenfw,
  twelvefw,
  thirteenfw,
  fourteenfw,
  fifteenfw,
  sixteenfw,
  seventeenfw,
  eighteenfw,
  nineteenfw,
  twentyfw,
  twentyonefw,
  twentytwofw,
  twentythreefw,
  twentyfourfw,
  twentyfivefw,
  twentysixfw,
  twentysevenfw,
  twentyeightfw,
  twentyninefw,
  thirtyfw,
  thirtyonefw,
  thirtytwofw,
  thirtythreefw,
  thirtyfourfw,
  thirtyfivefw,
  thirtysixfw,
  thirtysevenfw,
  thirtyeightfw,
  thirtyninefw,
  fortyfw,
  fortyonefw,
  fortytwofw,
  fortythreefw,
  fortyfourfw,
  fortyfivefw,
  fortysixfw,
  fortysevenfw,
  fortyeightfw,
  fortyninefw,
  fiftyfw,
  fiftyonefw,
  fiftytwofw,
  fiftythreefw,
  fiftyfourfw,
  fiftyfivefw,
  fiftysixfw,
  fiftysevenfw,
  fiftyeightfw,
  fiftyninefw,
  sixtyfw,
  sixtyonefw,
  sixtytwofw,
  sixtythreefw,
  sixtyfourfw,
  sixtyfivefw,
  sixtysixfw,
  sixtysevenfw,
  sixtyeightfw,
  sixtyninefw,
  seventyfw,
  seventyonefw,
  seventytwofw,
  seventythreefw,
  seventyfourfw,
  seventyfivefw,
  wolplaystart,
  oneft,
  twoft,
  threeft,
  fourft,
  fiveft,
  sixft,
  sevenft,
  eightft,
  nineft,
  tenft,
  elevenft,
  twelveft,
  thirteenft,
  fourteenft,
  fifteenft,
  sixteenft,
  seventeenft,
  eighteenft,
  nineteenft,
  twentyft,
  twentyoneft,
  twentytwoft,
  twentythreeft,
  twentyfourft,
  twentyfiveft,
  twentysixtft,
  twentysevenft,
  twentyeightft,
  twentynineft,
  thirtyft,
  thirtyoneft,
  thirtytwoft,
  thirtythreeft,
  thirtyfourft,
  thirtyfiveft,
  thirtysixtft,
  thirtysevenft,
  thirtyeightft,
  thirtynineft,
  fortyft,
  fortyoneft,
  fortytwoft,
  fortythreeft,
  fortyfourft,
  fortyfiveft,
  fortysixtft,
  fortysevenft,
  fortyeightft,
  fortynineft,
  fiftyft,
  fiftyoneft,
  fiftytwoft,
  fiftythreeft,
  fiftyfourft,
  fiftyfiveft,
  fiftysixtft,
  fiftysevenft,
  fiftyeightft,
  fiftynineft,
  sixtyft,
  sixtyoneft,
  sixtytwoft,
  sixtythreeft,
  sixtyfourft,
  sixtyfiveft,
  sixtysixtft,
  sixtysevenft,
  sixtyeightft,
  sixtynineft,
  seventyft,
  seventyoneft,
  seventytwoft,
  seventythreeft,
  seventyfourft,
  seventyfiveft,
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
  onefo,
  twofo,
  threefo,
  fourfo,
  fivefo,
  sixfo,
  sevenfo,
  eightfo,
  ninefo,
  tenfo,
  elevenfo,
  twelvefo,
  thirteenfo,
  fourteenfo,
  fifteenfo,
  sixteenfo,
  seventeenfo,
  eighteenfo,
  nineteenfo,
  twentyfo,
  twentyonefo,
  twentytwofo,
  twentythreefo,
  twentyfourfo,
  twentyfivefo,
  twentysixfo,
  twentysevenfo,
  twentyeightfo,
  twentyninefo,
  thirtyfo,
  thirtyonefo,
  thirtytwofo,
  thirtythreefo,
  thirtyfourfo,
  thirtyfivefo,
  thirtysixfo,
  thirtysevenfo,
  thirtyeightfo,
  thirtyninefo,
  fortyfo,
  fortyonefo,
  fortytwofo,
  fortythreefo,
  fortyfourfo,
  fortyfivefo,
  fortysixfo,
  fortysevenfo,
  fortyeightfo,
  fortyninefo,
  fiftyfo,
  fiftyonefo,
  fiftytwofo,
  fiftythreefo,
  fiftyfourfo,
  fiftyfivefo,
  fiftysixfo,
  fiftysevenfo,
  fiftyeightfo,
  fiftyninefo,
  sixtyfo,
  sixtyonefo,
  sixtytwofo,
  sixtythreefo,
  sixtyfourfo,
  sixtyfivefo,
  sixtysixfo,
  sixtysevenfo,
  sixtyeightfo,
  sixtyninefo,
  seventyfo,
  seventyonefo,
  seventytwofo,
  seventythreefo,
  seventyfourfo,
  seventyfivefo,
  amharicmaleplaystart,
  tigplaystart,
  oroplaystart,
  amharicfemaleplaystart,
  verticalLine,
  any2horizontalLine ,
  any2verticalLine,
  a4cornerSquare ,
  a4middleCornerSquare ,
  a4middleSquare,
  anytwoLine,
  diagonalLine,
  fullHouse , 
  onemo,
  twomo,
  threemo,
  fourmo,
  fivemo,
  sixmo,
  sevenmo,
  eightmo,
  ninemo,
  tenmo,
  elevenmo,
  twelvemo,
  thirteenmo,
  fourteenmo,
  fifteenmo,
  sixteenmo,
  seventeenmo,
  eighteenmo,
  nineteenmo,
  twentymo,
  twentyonemo,
  twentytwomo,
  twentythreemo,
  twentyfourmo,
  twentyfivemo,
  twentysixmo,
  twentysevenmo,
  twentyeightmo,
  twentyninemo,
  thirtymo,
  thirtyonemo,
  thirtytwomo,
  thirtythreemo,
  thirtyfourmo,
  thirtyfivemo,
  thirtysixmo,
  thirtysevenmo,
  thirtyeightmo,
  thirtyninemo,
  fortymo,
  fortyonemo,
  fortytwomo,
  fortythreemo,
  fortyfourmo,
  fortyfivemo,
  fortysixmo,
  fortysevenmo,
  fortyeightmo,
  fortyninemo,
  fiftymo,
  fiftyonemo,
  fiftytwomo,
  fiftythreemo,
  fiftyfourmo,
  fiftyfivemo,
  fiftysixmo,
  fiftysevenmo,
  fiftyeightmo,
  fiftyninemo,
  sixtymo,
  sixtyonemo,
  sixtytwomo,
  sixtythreemo,
  sixtyfourmo,
  sixtyfivemo,
  sixtysixmo,
  sixtysevenmo,
  sixtyeightmo,
  sixtyninemo,
  seventymo,
  seventyonemo,
  seventytwomo,
  seventythreemo,
  seventyfourmo,
  seventyfivemo,
} from "../chimes";

import Header from "./common/Header.js";

import axios from "axios";

class BingoGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      showFullCallHistory: false,
      availableCartellas: [],
    };
    // -------------------------- Set properties ----- //
    // Balls display pieces
    //  this. winAmountBox = document.querySelector('.win-amount-box');

    // this.totalBalance =1000;
    this.enteredCartella = "";
    this.isLoading = false;
    this.amount = 0;
    this.doubleTalk= false;
    this.betAmount = 0;
    this.showModal = false;
    this.disableReset =false;
    this.cutBalance = 0;
    this.manualEnteredCut = 0;
    this.balance = 0;
    this.balanceNew=0;
    this.startButton = 0;
    this.totalBallsCalled = 0;
    this.previousBall = null;
    this.currentBall = null;
    this.interval = null;
    this.selectedCards = [];
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
      { label: "amharic-male", value: "amh-male" },
      { label: "amharic-female", value: "amh-fem" },
      { label: "oromigna-female", value: "oro-fem" },
      { label: "wolaytgna-female", value: "wol-fem" },
      { label: "tigrigna-female", value: "tig-fem" },
      { label: "oromigna-male", value: "maleOromic" },

    ];

    this.colors = [
      { label: "orange", value: "red" },
      { label: "blue", value: "blue" },
      { label: "darkGrey", value: "darkGrey" },
      { label: "dark-red", value: "darkRed" },
      { label: "default", value: "default" },
    ];
    this.Pattern1 = [
      { label: "defaultPattern", value: "defaultPattern" },

      { label: "anydiagonal", value: "anydiagonal" },
      { label: "Any horizontal", value: "anyhorizontal" },
      { label: "Any vertical", value: "anyvertical" },
      { label: "Any Two Lines", value: "anyTwoLines" },
      { label: "Any Two Vertical", value: "anyTwoVertical" },
      { label: "Any Two Horizontal", value: "anyTwoHorizontal" },
      { label: "AHADU", value: "letterA" },
      { label: "4 middle & corner square", value: "FMC" },
      { label: "Full-House(BlackOut)", value: "FullHouse" },
      { label: "4 corner square(single)", value: "CS" },
      { label: "4 middle square", value: "MS" },
      { label: "Any one corner square ", value: "aos" },
      { label: "Any two corner square ", value: "ats" },


    ];

    this.Pattern2 = [
     

      { label: "anydiagonal", value: "anydiagonal2" },
      { label: "default 2", value: "defaultpattern2" },
      { label: "Any horizontal", value: "anyhorizontal2" },
      { label: "Any vertical", value: "anyvertical2" },
     
      { label: "Any Two Vertical", value: "anyTwoVertical2" },
      { label: "Any Two Horizontal", value: "anyTwoHorizontal2" },
    
      { label: "4 middle & corner square", value: "FMC2" },
      
      { label: "4 corner square", value: "CS2" },
      { label: "4 middle square", value: "MS2" },


    ];

    this.shuffleSound = shuffle;

    // Patterns
    // this.patternPlaceholder = "Choose a pattern";
    // this.presets = getPresetPatterns();

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
      delay: 3500,
      manualCut: false,
      enteredCartella: "",
      betAmount: 0,
      amount: "",
    balanceNew:0,
      running: false,
      showModal: false,
      disableReset:false,
      startButton: 0,
      enableCaller: true,
      isLoading: false,
      isRed: {
        isRed1: false,
        isRed2: false,
        isRed3: false,
        isRed4: false,
        isRed5: false,
        isRed6: false,
        isRed7: false,
        isRed8: false,
        isRed9: false,
        isRed10: false,
        isRed11: false,
        isRed12: false,
        isRed13: false,
        isRed14: false,
        isRed15: false,
        isRed16: false,
        isRed17: false,
        isRed18: false,
        isRed19: false,
        isRed20: false,
        isRed21: false,
        isRed22: false,
        isRed23: false,
        isRed24: false,
        isRed25: false,
        isRed26: false,
        isRed27: false,
        isRed28: false,
        isRed29: false,
        isRed30: false,
        isRed31: false,
        isRed32: false,
        isRed33: false,
        isRed34: false,
        isRed35: false,
        isRed36: false,
        isRed37: false,
        isRed38: false,
        isRed39: false,
        isRed40: false,
        isRed41: false,
        isRed42: false,
        isRed43: false,
        isRed44: false,
        isRed45: false,
        isRed46: false,
        isRed47: false,
        isRed48: false,
        isRed49: false,
        isRed50: false,
        isRed51: false,
        isRed52: false,
        isRed53: false,
        isRed54: false,
        isRed55: false,
        isRed56: false,
        isRed57: false,
        isRed58: false,
        isRed59: false,
        isRed60: false,
        isRed61: false,
        isRed62: false,
        isRed63: false,
        isRed64: false,
        isRed65: false,
        isRed66: false,
        isRed67: false,
        isRed68: false,
        isRed69: false,
        isRed70: false,
        isRed71: false,
        isRed72: false,
        isRed73: false,
        isRed74: false,
        isRed75: false,
        isRed76: false,
        isRed77: false,
        isRed78: false,
        isRed79: false,
        isRed80: false,
        isRed81: false,
        isRed82: false,
        isRed83: false,
        isRed84: false,
        isRed85: false,
        isRed86: false,
        isRed87: false,
        isRed88: false,
        isRed89: false,
        isRed90: false,
        isRed91: false,
        isRed92: false,
        isRed93: false,
        isRed94: false,
        isRed95: false,
        isRed96: false,
        isRed97: false,
        isRed98: false,
        isRed99: false,
        isRed100: false,
      },

      skipUnused: false,
      wildBingo: false,
maleOromic:false,
      tigrigna: false,
      wolayta:false,
      doubleCall: false,
      extraTalk: false,
      doubleTalk: false,
      chime: false,
      red: false,
      default: true,
      darkGrey: false,
      blue: false,
      darkRed: false,
      anydiagonal: false,
      anyvertical: false,
      anyhorizontal: false,
      CS: false,
      MS: false,
      FullHouse: false,
      FMC: false,
      anyTwoHorizontal: false,
      letterA: false,
      aos:false,
      ats:false,
      anyTwoLines: false,
      anyTwoVertical: false,

      defaultPattern: false,
      anydiagonal2: false,
      anyvertical2: false,
      anyhorizontal2: false,
      CS2: false,
      MS2: false,
     
      FMC2: false,
      anyTwoHorizontal2: false,
     
    
      anyTwoVertical2: false,
     
      cutBalance: 0,

      cardCount: 0,

      selectedChime: this.chimes[0],
      selectedCaller: this.callers[0],
      selectedColor: this.colors[0],
      selectedPattern1: this.Pattern1[0],
      selectedPattern2: this.Pattern2[0],

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
      showstartModal: false,
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
    this.fetchAvailableCartellas();
    //  let running = this.state.running;
    if (this.totalBallsCalled > 0) {
      this.startButton = 1;
    } else {
      this.startButton = 0;
    }
    this.amount = this.state.cutBalance;
    // this.setState({sales:this.state.sales});
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
      selectedCards: this.selectedCards,
      enteredCartella: this.enteredCartella,
      //  sales:this.sales,
      //  totalBalance:this.totalBalance,
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
   * 
   * 
   */

  handleDoubleTalkChange = (event) => {
    this.setState({ doubleTalk: event.target.checked });
};

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
    if (this.state.doubleCall) {
      const femaleamharic = [
        chime1,
        onefa,
        twofa,
        threefa,
        fourfa,
        fivefa,
        sixfa,
        sevenfa,
        eightfa,
        ninefa,
        tenfa,
        elevenfa,
        twelvefa,
        thirteenfa,
        fourteenfa,
        fifteenfa,
        sixteenfa,
        seventeenfa,
        eighteenfa,
        nineteenfa,
        twentyfa,
        twentyonefa,
        twenttwofa,
        twentythreefa,
        twentyfourfa,
        twentyfivefa,
        twentysixfa,
        twentysevenfa,
        twentyeightfa,
        twentyninefa,
        thirtyfa,
        thirtyonefa,
        thirtytwofa,
        thirtythreefa,
        thirtyfourfa,
        thirtyfivefa,
        thirtysixfa,
        thirtysevenfa,
        thirtyeightfa,
        thirtyninefa,
        fortyfa,
        fortyonefa,
        fortytwoa,
        fortythreefa,
        fortyfourfa,
        fortyfivefa,
        fortysixfa,
        fortysevenfa,
        fortyeightfa,
        fortyninefa,
        fiftyfa,
        fiftyonefa,
        fiftytwofa,
        fiftythreefa,
        fiftyfourfa,
        fiftyfivefa,
        fiftysixfa,
        fiftysevenfa,
        fiftyeightfa,
        fiftyninefa,
        sixtyfa,
        sixtyonefa,
        sixtytwofa,
        sixtythreefa,
        sixtyfourfa,
        sixtyfivefa,
        sixtysixfa,
        sixtysevenfa,
        sixtyeightfa,
        sixtyninefa,
        seventyfa,
        seventyonefa,
        seventytwofa,
        seventythreefa,
        seventyfourfa,
        seventyfivefa,
      ];
      if (ball.number >= 0 && ball.number <= 75) {
        let sound = new Audio(femaleamharic[ball.number]);
        sound.play();
      

      if (this.state.doubleTalk) {
        // Play the sound again
        setTimeout(() => {
            let sound3Again = new Audio(femaleamharic[ball.number]);
            sound3Again.play();
        }, 2000); // Delay before playing the sound again
    }}
    } else if (this.state.extraTalk) {
      const femaleoromic = [
        chime1,
        onefo,
        twofo,
        threefo,
        fourfo,
        fivefo,
        sixfo,
        sevenfo,
        eightfo,
        ninefo,
        tenfo,
        elevenfo,
        twelvefo,
        thirteenfo,
        fourteenfo,
        fifteenfo,
        sixteenfo,
        seventeenfo,
        eighteenfo,
        nineteenfo,
        twentyfo,
        twentyonefo,
        twentytwofo,
        twentythreefo,
        twentyfourfo,
        twentyfivefo,
        twentysixfo,
        twentysevenfo,
        twentyeightfo,
        twentyninefo,
        thirtyfo,
        thirtyonefo,
        thirtytwofo,
        thirtythreefo,
        thirtyfourfo,
        thirtyfivefo,
        thirtysixfo,
        thirtysevenfo,
        thirtyeightfo,
        thirtyninefo,
        fortyfo,
        fortyonefo,
        fortytwofo,
        fortythreefo,
        fortyfourfo,
        fortyfivefo,
        fortysixfo,
        fortysevenfo,
        fortyeightfo,
        fortyninefo,
        fiftyfo,
        fiftyonefo,
        fiftytwofo,
        fiftythreefo,
        fiftyfourfo,
        fiftyfivefo,
        fiftysixfo,
        fiftysevenfo,
        fiftyeightfo,
        fiftyninefo,
        sixtyfo,
        sixtyonefo,
        sixtytwofo,
        sixtythreefo,
        sixtyfourfo,
        sixtyfivefo,
        sixtysixfo,
        sixtysevenfo,
        sixtyeightfo,
        sixtyninefo,
        seventyfo,
        seventyonefo,
        seventytwofo,
        seventythreefo,
        seventyfourfo,
        seventyfivefo,
      ];
      if (ball.number >= 0 && ball.number <= 75) {
        let sound2 = new Audio(femaleoromic[ball.number]);
        sound2.play();
      

      if (this.state.doubleTalk) {
        // Play the sound again
        setTimeout(() => {
            let sound3Again = new Audio(femaleoromic[ball.number]);
            sound3Again.play();
        }, 2000); // Delay before playing the sound again
    }}
    } else if (this.state.maleOromic) {
      const maleoromic = [
        chime1,
        onemo,
        twomo,
        threemo,
        fourmo,
        fivemo,
        sixmo,
        sevenmo,
        eightmo,
        ninemo,
        tenmo,
        elevenmo,
        twelvemo,
        thirteenmo,
        fourteenmo,
        fifteenmo,
        sixteenmo,
        seventeenmo,
        eighteenmo,
        nineteenmo,
        twentymo,
        twentyonemo,
        twentytwomo,
        twentythreemo,
        twentyfourmo,
        twentyfivemo,
        twentysixmo,
        twentysevenmo,
        twentyeightmo,
        twentyninemo,
        thirtymo,
        thirtyonemo,
        thirtytwomo,
        thirtythreemo,
        thirtyfourmo,
        thirtyfivemo,
        thirtysixmo,
        thirtysevenmo,
        thirtyeightmo,
        thirtyninemo,
        fortymo,
        fortyonemo,
        fortytwomo,
        fortythreemo,
        fortyfourmo,
        fortyfivemo,
        fortysixmo,
        fortysevenmo,
        fortyeightmo,
        fortyninemo,
        fiftymo,
        fiftyonemo,
        fiftytwomo,
        fiftythreemo,
        fiftyfourmo,
        fiftyfivemo,
        fiftysixmo,
        fiftysevenmo,
        fiftyeightmo,
        fiftyninemo,
        sixtymo,
        sixtyonemo,
        sixtytwomo,
        sixtythreemo,
        sixtyfourmo,
        sixtyfivemo,
        sixtysixmo,
        sixtysevenmo,
        sixtyeightmo,
        sixtyninemo,
        seventymo,
        seventyonemo,
        seventytwomo,
        seventythreemo,
        seventyfourmo,
        seventyfivemo,
      ];
      if (ball.number >= 0 && ball.number <= 75) {
        let soundmo = new Audio(maleoromic[ball.number]);
        soundmo.play();

        if (this.state.doubleTalk) {
          // Play the sound again
          setTimeout(() => {
              let sound3Again = new Audio(maleoromic[ball.number]);
              sound3Again.play();
          }, 2000); // Delay before playing the sound again
      }
      }
    } else if (this.state.wolayta) {
      const femalewolayta = [
          chime1,
          onefw,
          twofw,
          threefw,
          fourfw,
          fivefw,
          sixfw,
          sevenfw,
          eightfw,
          ninefw,
          tenfw,
          elevenfw,
          twelvefw,
          thirteenfw,
          fourteenfw,
          fifteenfw,
          sixteenfw,
          seventeenfw,
          eighteenfw,
          nineteenfw,
          twentyfw,
          twentyonefw,
          twentytwofw,
          twentythreefw,
          twentyfourfw,
          twentyfivefw,
          twentysixfw,
          twentysevenfw,
          twentyeightfw,
          twentyninefw,
          thirtyfw,
          thirtyonefw,
          thirtytwofw,
          thirtythreefw,
          thirtyfourfw,
          thirtyfivefw,
          thirtysixfw,
          thirtysevenfw,
          thirtyeightfw,
          thirtyninefw,
          fortyfw,
          fortyonefw,
          fortytwofw,
          fortythreefw,
          fortyfourfw,
          fortyfivefw,
          fortysixfw,
          fortysevenfw,
          fortyeightfw,
          fortyninefw,
          fiftyfw,
          fiftyonefw,
          fiftytwofw,
          fiftythreefw,
          fiftyfourfw,
          fiftyfivefw,
          fiftysixfw,
          fiftysevenfw,
          fiftyeightfw,
          fiftyninefw,
          sixtyfw,
          sixtyonefw,
          sixtytwofw,
          sixtythreefw,
          sixtyfourfw,
          sixtyfivefw,
          sixtysixfw,
          sixtysevenfw,
          sixtyeightfw,
          sixtyninefw,
          seventyfw,
          seventyonefw,
          seventytwofw,
          seventythreefw,
          seventyfourfw,
          seventyfivefw,
      ];
      
      if (ball.number >= 0 && ball.number <= 75) {
          let sound3 = new Audio(femalewolayta[ball.number]);
          sound3.play();
  
          // Check if double talk is enabled
          if (this.state.doubleTalk) {
              // Play the sound again
              setTimeout(() => {
                  let sound3Again = new Audio(femalewolayta[ball.number]);
                  sound3Again.play();
              }, 2000); // Delay before playing the sound again
          }
      }
  } else if (this.state.tigrigna) {
      const femaletigrigna = [
        chime1,
        oneft,
        twoft,
        threeft,
        fourft,
        fiveft,
        sixft,
        sevenft,
        eightft,
        nineft,
        tenft,
        elevenft,
        twelveft,
        thirteenft,
        fourteenft,
        fifteenft,
        sixteenft,
        seventeenft,
        eighteenft,
        nineteenft,
        twentyft,
        twentyoneft,
        twentytwoft,
        twentythreeft,
        twentyfourft,
        twentyfiveft,
        twentysixtft,
        twentysevenft,
        twentyeightft,
        twentynineft,
        thirtyft,
        thirtyoneft,
        thirtytwoft,
        thirtythreeft,
        thirtyfourft,
        thirtyfiveft,
        thirtysixtft,
        thirtysevenft,
        thirtyeightft,
        thirtynineft,
        fortyft,
        fortyoneft,
        fortytwoft,
        fortythreeft,
        fortyfourft,
        fortyfiveft,
        fortysixtft,
        fortysevenft,
        fortyeightft,
        fortynineft,
        fiftyft,
        fiftyoneft,
        fiftytwoft,
        fiftythreeft,
        fiftyfourft,
        fiftyfiveft,
        fiftysixtft,
        fiftysevenft,
        fiftyeightft,
        fiftynineft,
        sixtyft,
        sixtyoneft,
        sixtytwoft,
        sixtythreeft,
        sixtyfourft,
        sixtyfiveft,
        sixtysixtft,
        sixtysevenft,
        sixtyeightft,
        sixtynineft,
        seventyft,
        seventyoneft,
        seventytwoft,
        seventythreeft,
        seventyfourft,
        seventyfiveft,
      ];
      if (ball.number >= 0 && ball.number <= 75) {
        let sound4 = new Audio(femaletigrigna[ball.number]);
        sound4.play();
        if (this.state.doubleTalk) {
          // Play the sound again
          setTimeout(() => {
              let sound3Again = new Audio(femaletigrigna[ball.number]);
              sound3Again.play();
          }, 2000); // Delay before playing the sound again
      }
      }
    } else if (this.state.enableCaller) {
      //   let sound2 = new Audio(two);
      //   sound2.play();
      const maleamharic = [
        chime1,
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
      ];
      if (ball.number >= 0 && ball.number <= 75) {
        let sound1 = new Audio(maleamharic[ball.number]);
        sound1.play();
        if (this.state.doubleTalk) {
          // Play the sound again
          setTimeout(() => {
              let sound3Again = new Audio(maleamharic[ball.number]);
              sound3Again.play();
          }, 2000); // Delay before playing the sound again
      }
      }
    } else {
      this.say([ball.letter, " ", ball.number]);
    }
  };

  startNewAutoplayGame = async () => {
    this.setState({ isLoading: true });

    const { currentUser, updateUserStart, updateUserSuccess } = this.props;
    // const { balance } = this.props;

    if (this.state.balanceNew < this.state.amount) {
      alert("Insufficent balance", currentUser, this.state.balanceNew);
    } else if (this.state.manualCut) {updateUserStart();
    
try {
  // Fetch current balance before updating
  const response = await axios.get(`/api/credit/${currentUser._id}/balance`);
  const currentBalance = response.data.balance; // Adjust based on your API response structure
  
  // Calculate the new balance based on the fetched current balance
  const newBalance =
    currentBalance - (this.state.amount * this.state.manualEnteredCut) / 10;

  // Update the balance in the database
  await axios.put(`/api/user/${currentUser._id}/balance`, {
    balance: newBalance,
  });

  updateUserSuccess({ ...currentUser, balance: newBalance });

  this.setState({
    board: generateBingoBoard(),
    showstartModal: false,
  });
} catch (err) {
  alert("Error updating balance");
  this.setState({ isLoading: false });
}
      for (let i = 1; i <= 100; i++) {
        const isRedState = this.state.isRed[`isRed${i}`];

        if (isRedState) {
          this.selectedCards.push(i);
        }
      }

      if (this.state.doubleCall) {
        // First sound
        let firstSound = new Audio(amharicfemaleplaystart);

        // Play the first sound
        firstSound.play();

        // Add an event listener for when the first sound ends
        firstSound.addEventListener("ended", () => {
          let secondSound;

          // Check the state to determine which sound to play
         if (this.state.CS) {
            secondSound = new Audio(a4cornerSquare); 
          }
          else if (this.state.MS) {
            secondSound = new Audio(a4middleSquare,); // Sound for other pattern
          }
          else if (this.state.FCS) {
            secondSound = new Audio(a4middleCornerSquare); // Sound for other pattern
          }
          else if (this.state.FullHouse) {
            secondSound = new Audio(fullHouse); // Sound for other pattern
          }
          else if (this.state.anyvertical) {
            secondSound = new Audio(verticalLine); // Sound for other pattern
          }
          else if (this.state.anyTwoVertical) {
            secondSound = new Audio(any2verticalLine); // Sound for other pattern
          }
          else if (this.state.anyTwoLines) {
            secondSound = new Audio(anytwoLine); // Sound for other pattern
          }
          else if (this.state.anyTwoHorizontal) {
            secondSound = new Audio(any2horizontalLine); // Sound for other pattern
          }
          else if (this.state.anydiagonal) {
            secondSound = new Audio(diagonalLine); // Sound for other pattern
          }
          else  {
            this.toggleGame();
            this.setState({ isLoading: false });
          }

          // Play the second sound
          secondSound.play();

          // Add an event listener for when the second sound ends
          secondSound.addEventListener("ended", () => {
            // Start the game after the second sound ends
            this.toggleGame();
            this.setState({ isLoading: false });
          });
        });
      } else if (this.state.extraTalk) {
        let firstSound = new Audio(oroplaystart);

        // Play the first sound
        firstSound.play();

        // Add an event listener for when the first sound ends
        firstSound.addEventListener("ended", () => {
          let secondSound;

          // Check the state to determine which sound to play
          if (this.state.CS) {
            secondSound = new Audio(a4cornerSquare); 
          }
          else if (this.state.MS) {
            secondSound = new Audio(a4middleSquare,); // Sound for other pattern
          }
          else if (this.state.FCS) {
            secondSound = new Audio(a4middleCornerSquare); // Sound for other pattern
          }
          else if (this.state.FullHouse) {
            secondSound = new Audio(fullHouse); // Sound for other pattern
          }
          else if (this.state.anyvertical) {
            secondSound = new Audio(verticalLine); // Sound for other pattern
          }
          else if (this.state.anyTwoVertical) {
            secondSound = new Audio(any2verticalLine); // Sound for other pattern
          }
          else if (this.state.anyTwoLines) {
            secondSound = new Audio(anytwoLine); // Sound for other pattern
          }
          else if (this.state.anyTwoHorizontal) {
            secondSound = new Audio(any2horizontalLine); // Sound for other pattern
          }
          else if (this.state.anydiagonal) {
            secondSound = new Audio(diagonalLine); // Sound for other pattern
          }
          else  {
            this.toggleGame();
            this.setState({ isLoading: false });
          }

          // Play the second sound
          secondSound.play();

          // Add an event listener for when the second sound ends
          secondSound.addEventListener("ended", () => {
            // Start the game after the second sound ends
            this.toggleGame();
            this.setState({ isLoading: false });
          });
        });
      } else if (this.state.enableCaller) {
        let firstSound = new Audio(amharicmaleplaystart);

        // Play the first sound
        firstSound.play();

        // Add an event listener for when the first sound ends
        firstSound.addEventListener("ended", () => {
          let secondSound;

          // Check the state to determine which sound to play
          if (this.state.CS) {
            secondSound = new Audio(a4cornerSquare); 
          }
          else if (this.state.MS) {
            secondSound = new Audio(a4middleSquare,); // Sound for other pattern
          }
          else if (this.state.FCS) {
            secondSound = new Audio(a4middleCornerSquare); // Sound for other pattern
          }
          else if (this.state.FullHouse) {
            secondSound = new Audio(fullHouse); // Sound for other pattern
          }
          else if (this.state.anyvertical) {
            secondSound = new Audio(verticalLine); // Sound for other pattern
          }
          else if (this.state.anyTwoVertical) {
            secondSound = new Audio(any2verticalLine); // Sound for other pattern
          }
          else if (this.state.anyTwoLines) {
            secondSound = new Audio(anytwoLine); // Sound for other pattern
          }
          else if (this.state.anyTwoHorizontal) {
            secondSound = new Audio(any2horizontalLine); // Sound for other pattern
          }
          else if (this.state.anydiagonal) {
            secondSound = new Audio(diagonalLine); // Sound for other pattern
          }
          else  {
            this.toggleGame();
            this.setState({ isLoading: false });
          }

          // Play the second sound
          secondSound.play();

          // Add an event listener for when the second sound ends
          secondSound.addEventListener("ended", () => {
            // Start the game after the second sound ends
            this.toggleGame();
            this.setState({ isLoading: false });
          });
        });
      } else if (this.state.wolayta) {
        let firstSound = new Audio(wolplaystart);

        // Play the first sound
        firstSound.play();

        // Add an event listener for when the first sound ends
        firstSound.addEventListener("ended", () => {
          let secondSound;

          // Check the state to determine which sound to play
          if (this.state.CS) {
            secondSound = new Audio(a4cornerSquare); 
          }
          else if (this.state.MS) {
            secondSound = new Audio(a4middleSquare,); // Sound for other pattern
          }
          else if (this.state.FCS) {
            secondSound = new Audio(a4middleCornerSquare); // Sound for other pattern
          }
          else if (this.state.FullHouse) {
            secondSound = new Audio(fullHouse); // Sound for other pattern
          }
          else if (this.state.anyvertical) {
            secondSound = new Audio(verticalLine); // Sound for other pattern
          }
          else if (this.state.anyTwoVertical) {
            secondSound = new Audio(any2verticalLine); // Sound for other pattern
          }
          else if (this.state.anyTwoLines) {
            secondSound = new Audio(anytwoLine); // Sound for other pattern
          }
          else if (this.state.anyTwoHorizontal) {
            secondSound = new Audio(any2horizontalLine); // Sound for other pattern
          }
          else if (this.state.anydiagonal) {
            secondSound = new Audio(diagonalLine); // Sound for other pattern
          }
          else  {
            this.toggleGame();
            this.setState({ isLoading: false });
          }

          // Play the second sound
          secondSound.play();

          // Add an event listener for when the second sound ends
          secondSound.addEventListener("ended", () => {
            // Start the game after the second sound ends
            this.toggleGame();
            this.setState({ isLoading: false });
          });
        });
      }
      else if (this.state.maleOromic) {
        let firstSound = new Audio(oroplaystart);

        // Play the first sound
        firstSound.play();

        // Add an event listener for when the first sound ends
        firstSound.addEventListener("ended", () => {
          let secondSound;

          // Check the state to determine which sound to play
          if (this.state.CS) {
            secondSound = new Audio(a4cornerSquare); 
          }
          else if (this.state.MS) {
            secondSound = new Audio(a4middleSquare,); // Sound for other pattern
          }
          else if (this.state.FCS) {
            secondSound = new Audio(a4middleCornerSquare); // Sound for other pattern
          }
          else if (this.state.FullHouse) {
            secondSound = new Audio(fullHouse); // Sound for other pattern
          }
          else if (this.state.anyvertical) {
            secondSound = new Audio(verticalLine); // Sound for other pattern
          }
          else if (this.state.anyTwoVertical) {
            secondSound = new Audio(any2verticalLine); // Sound for other pattern
          }
          else if (this.state.anyTwoLines) {
            secondSound = new Audio(anytwoLine); // Sound for other pattern
          }
          else if (this.state.anyTwoHorizontal) {
            secondSound = new Audio(any2horizontalLine); // Sound for other pattern
          }
          else if (this.state.anydiagonal) {
            secondSound = new Audio(diagonalLine); // Sound for other pattern
          }
          else  {
            this.toggleGame();
            this.setState({ isLoading: false });
          }

          // Play the second sound
          secondSound.play();

          // Add an event listener for when the second sound ends
          secondSound.addEventListener("ended", () => {
            // Start the game after the second sound ends
            this.toggleGame();
            this.setState({ isLoading: false });
          });
        });
      }
      else if (this.state.tigrigna) {
        let firstSound = new Audio(tigplaystart);

        // Play the first sound
        firstSound.play();

        // Add an event listener for when the first sound ends
        firstSound.addEventListener("ended", () => {
          let secondSound;

          // Check the state to determine which sound to play
          if (this.state.CS) {
            secondSound = new Audio(a4cornerSquare); 
          }
          else if (this.state.MS) {
            secondSound = new Audio(a4middleSquare,); // Sound for other pattern
          }
          else if (this.state.FCS) {
            secondSound = new Audio(a4middleCornerSquare); // Sound for other pattern
          }
          else if (this.state.FullHouse) {
            secondSound = new Audio(fullHouse); // Sound for other pattern
          }
          else if (this.state.anyvertical) {
            secondSound = new Audio(verticalLine); // Sound for other pattern
          }
          else if (this.state.anyTwoVertical) {
            secondSound = new Audio(any2verticalLine); // Sound for other pattern
          }
          else if (this.state.anyTwoLines) {
            secondSound = new Audio(anytwoLine); // Sound for other pattern
          }
          else if (this.state.anyTwoHorizontal) {
            secondSound = new Audio(any2horizontalLine); // Sound for other pattern
          }
          else if (this.state.anydiagonal) {
            secondSound = new Audio(diagonalLine); // Sound for other pattern
          }
          else  {
            this.toggleGame();
            this.setState({ isLoading: false });
          }

          // Play the second sound
          secondSound.play();

          // Add an event listener for when the second sound ends
          secondSound.addEventListener("ended", () => {
            // Start the game after the second sound ends
            this.toggleGame();
            this.setState({ isLoading: false });
          });
        });
      } else {
        this.toggleGame();
      }
    } else {
     
      updateUserStart();
try {
  // Fetch current balance before updating
  const response = await axios.get(`/api/credit/${currentUser._id}/balance`);
  const currentBalance = response.data.balance; // Adjust based on your API response structure

  // Calculate the new balance based on the fetched current balance
  const newBalance =
    currentBalance - (this.state.amount * currentUser.cut) / 100;

  // Update the balance in the database
  await axios.put(`/api/user/${currentUser._id}/balance`, {
    balance: newBalance,
  });

  updateUserSuccess({ ...currentUser, balance: newBalance });

  this.setState({
    board: generateBingoBoard(),
    showstartModal: false,
  });
} catch (err) {
  alert("Error updating balance");
  this.setState({ isLoading: false });
}
      for (let i = 1; i <= 100; i++) {
        const isRedState = this.state.isRed[`isRed${i}`];

        if (isRedState) {
          this.selectedCards.push(i);
        }
      }
if (this.state.doubleCall) {
        // First sound
        let firstSound = new Audio(amharicfemaleplaystart);

        // Play the first sound
        firstSound.play();

        // Add an event listener for when the first sound ends
        firstSound.addEventListener("ended", () => {
          let secondSound;

          // Check the state to determine which sound to play
         if (this.state.CS) {
            secondSound = new Audio(a4cornerSquare); 
          }
          else if (this.state.MS) {
            secondSound = new Audio(a4middleSquare,); // Sound for other pattern
          }
          else if (this.state.FCS) {
            secondSound = new Audio(a4middleCornerSquare); // Sound for other pattern
          }
          else if (this.state.FullHouse) {
            secondSound = new Audio(fullHouse); // Sound for other pattern
          }
          else if (this.state.anyvertical) {
            secondSound = new Audio(verticalLine); // Sound for other pattern
          }
          else if (this.state.anyTwoVertical) {
            secondSound = new Audio(any2verticalLine); // Sound for other pattern
          }
          else if (this.state.anyTwoLines) {
            secondSound = new Audio(anytwoLine); // Sound for other pattern
          }
          else if (this.state.anyTwoHorizontal) {
            secondSound = new Audio(any2horizontalLine); // Sound for other pattern
          }
          else if (this.state.anydiagonal) {
            secondSound = new Audio(diagonalLine); // Sound for other pattern
          }
          else  {
            this.toggleGame();
            this.setState({ isLoading: false });
          }

          // Play the second sound
          secondSound.play();

          // Add an event listener for when the second sound ends
          secondSound.addEventListener("ended", () => {
            // Start the game after the second sound ends
            this.toggleGame();
            this.setState({ isLoading: false });
          });
        });
      } else if (this.state.extraTalk) {
        let firstSound = new Audio(oroplaystart);

        // Play the first sound
        firstSound.play();

        // Add an event listener for when the first sound ends
        firstSound.addEventListener("ended", () => {
          let secondSound;

          // Check the state to determine which sound to play
          if (this.state.CS) {
            secondSound = new Audio(a4cornerSquare); 
          }
          else if (this.state.MS) {
            secondSound = new Audio(a4middleSquare,); // Sound for other pattern
          }
          else if (this.state.FCS) {
            secondSound = new Audio(a4middleCornerSquare); // Sound for other pattern
          }
          else if (this.state.FullHouse) {
            secondSound = new Audio(fullHouse); // Sound for other pattern
          }
          else if (this.state.anyvertical) {
            secondSound = new Audio(verticalLine); // Sound for other pattern
          }
          else if (this.state.anyTwoVertical) {
            secondSound = new Audio(any2verticalLine); // Sound for other pattern
          }
          else if (this.state.anyTwoLines) {
            secondSound = new Audio(anytwoLine); // Sound for other pattern
          }
          else if (this.state.anyTwoHorizontal) {
            secondSound = new Audio(any2horizontalLine); // Sound for other pattern
          }
          else if (this.state.anydiagonal) {
            secondSound = new Audio(diagonalLine); // Sound for other pattern
          }
          else  {
            this.toggleGame();
            this.setState({ isLoading: false });
          }

          // Play the second sound
          secondSound.play();

          // Add an event listener for when the second sound ends
          secondSound.addEventListener("ended", () => {
            // Start the game after the second sound ends
            this.toggleGame();
            this.setState({ isLoading: false });
          });
        });
      } else if (this.state.enableCaller) {
        let firstSound = new Audio(amharicmaleplaystart);

        // Play the first sound
        firstSound.play();

        // Add an event listener for when the first sound ends
        firstSound.addEventListener("ended", () => {
          let secondSound;

          // Check the state to determine which sound to play
          if (this.state.CS) {
            secondSound = new Audio(a4cornerSquare); 
          }
          else if (this.state.MS) {
            secondSound = new Audio(a4middleSquare,); // Sound for other pattern
          }
          else if (this.state.FCS) {
            secondSound = new Audio(a4middleCornerSquare); // Sound for other pattern
          }
          else if (this.state.FullHouse) {
            secondSound = new Audio(fullHouse); // Sound for other pattern
          }
          else if (this.state.anyvertical) {
            secondSound = new Audio(verticalLine); // Sound for other pattern
          }
          else if (this.state.anyTwoVertical) {
            secondSound = new Audio(any2verticalLine); // Sound for other pattern
          }
          else if (this.state.anyTwoLines) {
            secondSound = new Audio(anytwoLine); // Sound for other pattern
          }
          else if (this.state.anyTwoHorizontal) {
            secondSound = new Audio(any2horizontalLine); // Sound for other pattern
          }
          else if (this.state.anydiagonal) {
            secondSound = new Audio(diagonalLine); // Sound for other pattern
          }
          else  {
            this.toggleGame();
            this.setState({ isLoading: false });
          }

          // Play the second sound
          secondSound.play();

          // Add an event listener for when the second sound ends
          secondSound.addEventListener("ended", () => {
            // Start the game after the second sound ends
            this.toggleGame();
            this.setState({ isLoading: false });
          });
        });
      } else if (this.state.wolayta) {
        let firstSound = new Audio(wolplaystart);

        // Play the first sound
        firstSound.play();

        // Add an event listener for when the first sound ends
        firstSound.addEventListener("ended", () => {
          let secondSound;

          // Check the state to determine which sound to play
          if (this.state.CS) {
            secondSound = new Audio(a4cornerSquare); 
          }
          else if (this.state.MS) {
            secondSound = new Audio(a4middleSquare,); // Sound for other pattern
          }
          else if (this.state.FCS) {
            secondSound = new Audio(a4middleCornerSquare); // Sound for other pattern
          }
          else if (this.state.FullHouse) {
            secondSound = new Audio(fullHouse); // Sound for other pattern
          }
          else if (this.state.anyvertical) {
            secondSound = new Audio(verticalLine); // Sound for other pattern
          }
          else if (this.state.anyTwoVertical) {
            secondSound = new Audio(any2verticalLine); // Sound for other pattern
          }
          else if (this.state.anyTwoLines) {
            secondSound = new Audio(anytwoLine); // Sound for other pattern
          }
          else if (this.state.anyTwoHorizontal) {
            secondSound = new Audio(any2horizontalLine); // Sound for other pattern
          }
          else if (this.state.anydiagonal) {
            secondSound = new Audio(diagonalLine); // Sound for other pattern
          }
          else  {
            this.toggleGame();
            this.setState({ isLoading: false });
          }

          // Play the second sound
          secondSound.play();

          // Add an event listener for when the second sound ends
          secondSound.addEventListener("ended", () => {
            // Start the game after the second sound ends
            this.toggleGame();
            this.setState({ isLoading: false });
          });
        });
      }
      else if (this.state.maleOromic) {
        let firstSound = new Audio(oroplaystart);

        // Play the first sound
        firstSound.play();

        // Add an event listener for when the first sound ends
        firstSound.addEventListener("ended", () => {
          let secondSound;

          // Check the state to determine which sound to play
          if (this.state.CS) {
            secondSound = new Audio(a4cornerSquare); 
          }
          else if (this.state.MS) {
            secondSound = new Audio(a4middleSquare,); // Sound for other pattern
          }
          else if (this.state.FCS) {
            secondSound = new Audio(a4middleCornerSquare); // Sound for other pattern
          }
          else if (this.state.FullHouse) {
            secondSound = new Audio(fullHouse); // Sound for other pattern
          }
          else if (this.state.anyvertical) {
            secondSound = new Audio(verticalLine); // Sound for other pattern
          }
          else if (this.state.anyTwoVertical) {
            secondSound = new Audio(any2verticalLine); // Sound for other pattern
          }
          else if (this.state.anyTwoLines) {
            secondSound = new Audio(anytwoLine); // Sound for other pattern
          }
          else if (this.state.anyTwoHorizontal) {
            secondSound = new Audio(any2horizontalLine); // Sound for other pattern
          }
          else if (this.state.anydiagonal) {
            secondSound = new Audio(diagonalLine); // Sound for other pattern
          }
          else  {
            this.toggleGame();
            this.setState({ isLoading: false });
          }

          // Play the second sound
          secondSound.play();

          // Add an event listener for when the second sound ends
          secondSound.addEventListener("ended", () => {
            // Start the game after the second sound ends
            this.toggleGame();
            this.setState({ isLoading: false });
          });
        });
      }
      else if (this.state.tigrigna) {
        let firstSound = new Audio(tigplaystart);

        // Play the first sound
        firstSound.play();

        // Add an event listener for when the first sound ends
        firstSound.addEventListener("ended", () => {
          let secondSound;

          // Check the state to determine which sound to play
          if (this.state.CS) {
            secondSound = new Audio(a4cornerSquare); 
          }
          else if (this.state.MS) {
            secondSound = new Audio(a4middleSquare,); // Sound for other pattern
          }
          else if (this.state.FCS) {
            secondSound = new Audio(a4middleCornerSquare); // Sound for other pattern
          }
          else if (this.state.FullHouse) {
            secondSound = new Audio(fullHouse); // Sound for other pattern
          }
          else if (this.state.anyvertical) {
            secondSound = new Audio(verticalLine); // Sound for other pattern
          }
          else if (this.state.anyTwoVertical) {
            secondSound = new Audio(any2verticalLine); // Sound for other pattern
          }
          else if (this.state.anyTwoLines) {
            secondSound = new Audio(anytwoLine); // Sound for other pattern
          }
          else if (this.state.anyTwoHorizontal) {
            secondSound = new Audio(any2horizontalLine); // Sound for other pattern
          }
          else if (this.state.anydiagonal) {
            secondSound = new Audio(diagonalLine); // Sound for other pattern
          }
          else  {
            this.toggleGame();
            this.setState({ isLoading: false });
          }

          // Play the second sound
          secondSound.play();

          // Add an event listener for when the second sound ends
          secondSound.addEventListener("ended", () => {
            // Start the game after the second sound ends
            this.toggleGame();
            this.setState({ isLoading: false });
          });
        });
      } else {
        this.toggleGame();
      }
      
    }
  };

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
  toggleModal = () => {
    if (this.state.running || this.state.showModal === true) {
      this.setState((prevState) => ({
        showModal: !prevState.showModal,
      }));
    } else {
      // do nothing
    }
  };

  toggleEnd = () => {
    
      this.setState((prevState) => ({
        disableReset: !prevState.disableReset,
      }));
  
  };

  toggleResetModal = () => {
    const currentState = this.state.showResetModal;
    this.setState({ showResetModal: !currentState });
  };
  togglestartModal = async () => {
    const { currentUser } = this.props;
    const resetIsRed = {};
    const { availableCartellas } = this.state;

    // Set all isRed states to false
    availableCartellas.forEach(cartella => {
        resetIsRed[`isRed${cartella.id}`] = false;
    });

    // Update state with the new isRed values
   
    const currentState1 = this.state.showstartModal;
    this.setState({showstartModal: !currentState1,
      isRed: resetIsRed,
      cardCount: 0, // Reset card count
      selectedCards: [],
      amount:0,
  
  });
   
      const res = await axios.get( `/api/credit/${currentUser._id}/balance`);
      const balanceNeww=res.data.balance;
    
    this.setState({balanceNew:balanceNeww});
  };


  togglestartModal2 = async () => {
    const { currentUser } = this.props;


    // Set all isRed states to false
    

    // Update state with the new isRed values
   
    const currentState1 = this.state.showstartModal;
    this.setState({showstartModal: !currentState1,
      
  
  });
   
      const res = await axios.get( `/api/credit/${currentUser._id}/balance`);
      const balanceNeww=res.data.balance;
    
    this.setState({balanceNew:balanceNeww});
  };

  confirmResetGame = () => {
    // Clear out local storage
    localStorage.removeItem("lpb-gameData");
    localStorage.removeItem("lpb-gameState");
    // reset everything with the board
    // const resetIsRed = {};

    // for (let i = 1; i <= 100; i++) {
    //   resetIsRed[`isRed${i}`] = false; // Set each isRed property to false
    // }
    clearInterval(this.interval);

    this.cancelSpeech();
    this.totalBallsCalled = 0;

    this.selectedCards = [];
     this.enteredCartella = "";
  
    this.previousBall = null;
    this.currentBall = null;
    this.startButton = 0;
    this.setState({
      board: generateBingoBoard(),
      // cardCount: 0,
      wildBall: null,
      running: false,
      showResetModal: false,
      manualCut: false,
      manualEnteredCut:'',
      disableReset:false,
      previousCallList: [],
      balance: 0,
      // amount: 0,
      isLoading: false,
      // isRed: resetIsRed,
    });
  };

  confirmstartGame = async () => {
    const { currentUser } = this.props;
    const { balance } = this.props;

    if (balance < this.state.amount || this.state.betAmount < 10) {
      alert(
        "Insufficent balance or minimum bet amount entered(minimum amount is 10 birr)",
        currentUser,
        balance
      );
    } else {
      if (this.state.manualCut) {
        this.state.balance =
          this.state.amount -
          (this.state.amount * this.state.manualEnteredCut) / 10;
        this.startButton = 1;
       
        this.setState({
          board: generateBingoBoard(),
          showstartModal: false,
          isLoading: false,
        });
      } else {
        this.state.balance =
          this.state.amount - (this.state.amount * currentUser.cut) / 100;

        this.startButton = 1;

        this.setState({
          board: generateBingoBoard(),
          showstartModal: false,
          isLoading: false

          // selectedCards:this.selectedCards,
        });
      }
    }
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

      this.previousBall = this.currentBall;
      this.currentBall = null;
    }
  };

  shuffleBalls = () => {
    let balls = generateBingoBoard();
    let letters = ["B", "I", "N", "G", "O"];
    let sound = new Audio(this.shuffleSound);
    let duration = 1000;
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
          // this.confirmResetGame();
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
      case "enable-chime":
        this.setState({ chime: e.currentTarget.checked });
        break;
      default:
        break;
    }
  };

  handleCheckboxPat = (e) => {
    let gamemode = e.currentTarget.dataset.gamemode;
    const isChecked = e.currentTarget.checked;
  
    switch (gamemode) {
      case '2nd patt':
        this.setState((prevState) => ({
          showPat: isChecked,
          anyhorizontal2: isChecked ? prevState.anyhorizontal2 : false,
          anyvertical2: isChecked ? prevState.anyvertical2 : false,
          anydiagonal2: isChecked ? prevState.anydiagonal2 : false,
          anyTwoVertical2: isChecked ? prevState.anyTwoVertical2 : false,
          anyTwoHorizontal2: isChecked ? prevState.anyTwoHorizontal2 : false,
          FMC2: isChecked ? prevState.FMC2 : false,
          CS2: isChecked ? prevState.CS2 : false,
          MS2: isChecked ? prevState.MS2 : false,
          selectedPattern2: isChecked ? prevState.selectedPattern2 : null
        }));
        break;
      default:
        break;
    }
  }
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
          <div className='modal'>
            <h4>Reset Game</h4>
            <p>Are you sure you want to reset the game?</p>
            {/* <p className="red-text">
              This action <strong>cannot</strong> be undone.
            </p> */}
            <p>
              <button onClick={this.toggleResetModal}>Cancel</button>
              <button className='primaryBtn' onClick={this.confirmResetGame}>
                yes
              </button>
            </p>
          </div>
          <div
            className='modal-backdrop'
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

  handleEnterCartella = (e) => {
    const value = e.target.value;
    const cartellaNumber = parseInt(value, 10);

    // Prevent updating if the entered value is '0'
    if (value === '0') {
        e.preventDefault(); // Prevent default behavior
        return; // Exit if value is '0'
    }

    // Update the enteredCartella state
    this.setState({ enteredCartella: value });

    // Check if Enter key is pressed
    if (e.key === "Enter") {
        // Update isRed state for the entered number
        this.setState((prevState) => ({
            isRed: {
                ...prevState.isRed,
                [`isRed${cartellaNumber}`]: true, // Set isRed state for the entered number
            },
        }));

        // Call the function to add the cartella
        this.addEnteredCartella();
    }
};

  incrementCard = (number) => {
    // const currentState2 = this.state.isRed;
    // const stateKey = `isRed${number}`;
    // this.setState({ [stateKey]: true });
    // this.setState({isRed1:true}),
    this.setState((prevState) => ({
      isRed: { ...prevState.isRed, [`isRed${number}`]: true },
      cardCount: prevState.cardCount + 1,
      amount: prevState.betAmount * (prevState.cardCount + 1),
    }));
  };

  decrementCard = (number) => {
    if (this.state.cardCount > 0) {
      // const stateKey = `isRed${number}`;
      // this.setState({ [stateKey]: false });
      this.setState((prevState) => ({
        isRed: { ...prevState.isRed, [`isRed${number}`]: false },
        cardCount: prevState.cardCount - 1,
        amount: prevState.betAmount * (prevState.cardCount - 1),
      }));
    }
  };

  get startConfirmationModalDisplay() {
    if (this.state.showstartModal === true) {
      let balance = this.totalBalance;
      const { availableCartellas } = this.state;
      return (
        <div className='notranslate'>
  <div className='modal'>

   <h4> <marquee direction="right " > win additional 15% of won amount by winning 500 birr and higher with minumum of 20 players !!</marquee></h4>
    <h2>Place Your Bet</h2>

    <div className='input-container'>
      <div className='input-group'>
        <fieldset className='input-group-fieldset'>
          <legend className='input-group-legend'>Bet Amount</legend>
          <div className='form-group'>
            <input
              type='number'
              id='betAmount'
              placeholder='Bet Amount'
              required
              onChange={this.handleBetAmountChange}
              value={this.state.betAmount}
              className='input-box'
            />
          </div>
        </fieldset>
      </div>
      <div className='input-group'>
      <fieldset className='input-group-fieldset'>
          <legend className='input-group-legend'>Game Type</legend>
          <div className='form-group'>
            <input
            type="checkbox" id="myCheckbox" class="invisible-checkbox"
              checked={this.state.manualCut} // Controlled checkbox
              onChange={this.handleChechbx} // Event handler
            />
            <label>Game Type</label>
            <input
              type='number'
              id='cutAmount'
              placeholder='Game Type'
              value={this.state.manualEnteredCut} // Controlled input
              onChange={this.handleCutChange} // Event handler
              className='input-box'
            />
          </div>
        </fieldset>
      </div>
      <div className='input-group'>
        <fieldset className='input-group-fieldset'>
          <legend className='input-group-legend'>Enter Cartella Manual</legend>
          <div className='form-group'>
            <input
              type='number'
              id='cartellaManual'
              placeholder='Enter Cartella'
              value={this.state.enteredCartella}
              onChange={this.handleEnterCartella}
              onKeyDown={this.handleEnterCartella}
              className='input-box'
              
            />
          </div>
        </fieldset>
      </div>
    </div>

    <span className='notranslate'>
      {/* <p>Total Amount: {this.state.amount}</p> */}
    </span>
    <p>
      <button onClick={this.togglestartModal}>Cancel</button>
      <button
        className='primaryBtn'
        onClick={this.confirmstartGame}
        disabled={
          this.state.amount === 0 ||
          balance <= 0 ||
          this.state.betAmount === ""
        }
      >
        Done
      </button>
   
      <button
    className='clearBtn'
    onClick={this.resetButtonStates}
>
    Clear
</button>
            </p>
            <h2>select cartela</h2>
            <span className='notranslate'>
              {availableCartellas.length > 0 ? (
                availableCartellas.map((cartella) => (
                  <button
                    key={cartella._id}
                    onClick={() => {
                      const currentNumber = cartella.id;
                      const isRedState =
                        this.state.isRed[`isRed${currentNumber}`];

                      if (isRedState) {
                        this.decrementCard(currentNumber);
                      } else {
                      
                        this.incrementCard(currentNumber);

                      }
                    }}
                    className={
                      this.state.isRed[`isRed${cartella.id}`] ? "red" : "bt"
                    }
                  >
                    {cartella.id}
                  </button>
                ))
              ) : (
                <div>Loading...</div>
              )}
            </span>
          </div>

          <div
            className='modal-backdrop2'
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

  resetButtonStates = () => {
    const resetIsRed = {};
    const { availableCartellas } = this.state;

    // Set all isRed states to false
    availableCartellas.forEach(cartella => {
        resetIsRed[`isRed${cartella.id}`] = false;
    });

    // Update state with the new isRed values
    this.setState({
        isRed: resetIsRed,
        cardCount: 0, // Reset card count
        selectedCards: [],
        amount:0,
        enteredCartella :"",
    
    });
};
  fetchAvailableCartellas = async () => {
    const { currentUser } = this.props;
    const branch = currentUser.branch;

    try {
      const response = await axios.get(`/api/card/getCards?branch=${branch}`);
      // Sort the available cartellas by id in ascending order
      const sortedCartellas = response.data.sort((a, b) => a.id - b.id);
      this.setState({ availableCartellas: sortedCartellas, error: null });
    } catch (error) {
      this.setState({
        error:
          "An error occurred while fetching available cartellas. Please try again later.",
      });
    }
  };
  addEnteredCartella = () => {
    
    // const enteredCartella = parseInt(this.state.enteredCartella);
    const enteredCartella = Number(this.state.enteredCartella);
    
  
    // Check if the entered cartella is a valid number
    if (!isNaN(enteredCartella)) {
      
      // Check if the entered cartella is already in the selectedCards array
      if (this.selectedCards.includes(enteredCartella)||this.state.isRed[`isRed${enteredCartella}`]
     ) {
        alert('Duplicate cartella number not allowed.' );
        return; // Exit the function if it's a duplicate
      }
    
  
      // Add the entered cartella to the selectedCards array
      this.selectedCards.push(enteredCartella);
  
      // Increment the cardCount
      this.setState((prevState) => ({
        cardCount: prevState.cardCount + 1,
        amount: prevState.betAmount * (prevState.cardCount + 1),
      }));
    } else {
      alert('Please enter a valid number.'); // Optional: Alert for invalid input
    }
  
    // Clear the input field
    this.setState({
      enteredCartella: "",
    });
  };
  handleChechbx = (e) => {
    if (e.target.type === "checkbox") {
      this.setState({
        manualCut: e.target.checked, // Set state based on checkbox checked state
      });
    }
  };
  handleCutChange = (e) => {
    const cutamount = e.target.value;

    // Update state with the new cut amount
    this.setState((prevState) => ({
      manualEnteredCut: cutamount,
      manualCut: cutamount !== '' // Automatically check the box if input is not empty
    }));
  };
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

  /*
   *  Choose Caller Function
   *  This sets the selected caller
   */
  handleChooseCaller = (e) => {
    this.setState({ selectedCaller: e });

    switch (e.value) {
      case "amh-male":
        this.setState({
          enableCaller: true,
          maleOromic:false,
          doubleCall: false,
          tigrigna: false,
          wolayta: false,
          extraTalk: false,
        });
        break;
      case "amh-fem":
        this.setState({
          doubleCall: true,
          enableCaller: false,
          tigrigna: false,
          wolayta: false,
          extraTalk: false,
          maleOromic:false,
        });
        break;
      case "oro-fem":
        this.setState({
          extraTalk: true,
          enableCaller: false,
          doubleCall: false,
          tigrigna: false,
          wolayta: false,
          maleOromic:false,
        });
        break;
      case "wol-fem":
        this.setState({
          wolayta: true,
          enableCaller: false,
          doubleCall: false,
          extraTalk: false,
          tigrigna: false,
          maleOromic:false,
        });
        break;
      case "tig-fem":
        this.setState({
          tigrigna: true,
          wolayta: false,
          enableCaller: false,
          doubleCall: false,
          extraTalk: false,
          maleOromic:false,
        });
        break;

        case "maleOromic":
          this.setState({
            tigrigna: false,
            wolayta: false,
            enableCaller: false,
            doubleCall: false,
            extraTalk: false,
            maleOromic:true,
          });
          break;

      default:
        break;
    }
  };

  handleColorchooser = (e) => {
    this.setState({ selectedColor: e });

    switch (e.value) {
      case "red":
        this.setState({
          red: true,

          blue: false,
          darkGrey: false,
          darkRed: false,
          default: false,
        });
        break;
      case "blue":
        this.setState({
          red: false,
          default: false,
          blue: true,
          darkGrey: false,
          darkRed: false,
        });
        break;
      case "darkGrey":
        this.setState({
          red: false,
          default: false,
          blue: false,
          darkGrey: true,
          darkRed: false,
        });
        break;
      case "darkRed":
        this.setState({
          red: false,

          blue: false,
          darkGrey: false,
          darkRed: true,
          default: false,
        });
        break;

      case "default":
        this.setState({
          red: false,
          default: true,
          blue: false,
          darkGrey: false,
          darkRed: false,
        });
        break;

      default:
        break;
    }
  };

  handlePatternChooser = (e) => {
    this.setState({ selectedPattern1: e });

    switch (e.value) {
      case "anyTwoVertical":
        this.setState({
          anyhorizontal: false,
          anyvertical: false,
          anydiagonal: false,
          defaultPattern: false,
          anyTwoLines: false,
          anyTwoVertical: true,
          anyTwoHorizontal: false,
          letterA: false,
          FMC: false,
          FullHouse: false,
          CS: false,
          MS: false,
          aos:false,
          ats:false,
        });
        break;
      case "FullHouse":
        this.setState({
          FullHouse: true,
          anyhorizontal: false,
          anyvertical: false,
          anydiagonal: false,
          defaultPattern: false,
          anyTwoLines: false,
          anyTwoVertical: false,
          anyTwoHorizontal: false,
          letterA: false,
          FMC: false,
          CS: false,
          MS: false,
          aos:false,
          ats:false,
        });
        break;
      case "CS":
        this.setState({
          FullHouse: false,
          anyhorizontal: false,
          anyvertical: false,
          anydiagonal: false,
          defaultPattern: false,
          anyTwoLines: false,
          anyTwoVertical: false,
          anyTwoHorizontal: false,
          letterA: false,
          FMC: false,
          CS: true,
          aos:false,
          ats:false,
          MS: false,
        });
        break;
      case "MS":
        this.setState({
          FullHouse: false,
          CS: false,
          anyhorizontal: false,
          anyvertical: false,
          anydiagonal: false,
          defaultPattern: false,
          anyTwoLines: false,
          anyTwoVertical: false,
          anyTwoHorizontal: false,
          letterA: false,
          FMC: false,
          MS: true,
          aos:false,
          ats:false,
        });
        break;
      case "anyTwoHorizontal":
        this.setState({
          anyhorizontal: false,
          FullHouse: false,
          anyvertical: false,
          anydiagonal: false,
          defaultPattern: false,
          anyTwoLines: false,
          anyTwoVertical: false,
          anyTwoHorizontal: true,
          FMC: false,
          letterA: false,
          CS: false,
          MS: false,
          aos:false,
          ats:false,
        });
        break;
      case "letterA":
        this.setState({
          anyhorizontal: false,
          FullHouse: false,
          anyvertical: false,
          anydiagonal: false,
          defaultPattern: false,
          anyTwoLines: false,
          anyTwoVertical: false,
          anyTwoHorizontal: false,
          letterA: true,
          FMC: false,
          CS: false,
          MS: false,
          aos:false,
          ats:false,
        });
        break;
      case "defaultPattern":
        this.setState({
          anyhorizontal: false,
          FullHouse: false,
          anyvertical: false,
          anydiagonal: false,
          defaultPattern: true,
          anyTwoLines: false,
          anyTwoVertical: false,
          anyTwoHorizontal: false,
          letterA: false,
          FMC: false,
          CS: false,
          MS: false,
          aos:false,
          ats:false,
        });
        break;

      case "anyhorizontal":
        this.setState({
          anyhorizontal: true,
          FullHouse: false,
          anyvertical: false,
          anydiagonal: false,
          defaultPattern: false,
          anyTwoLines: false,
          anyTwoVertical: false,
          anyTwoHorizontal: false,
          letterA: false,
          FMC: false,
          CS: false,
          MS: false,
          aos:false,
          ats:false,
        });
        break;
      case "anyvertical":
        this.setState({
          anyhorizontal: false,
          FullHouse: false,
          anyvertical: true,
          anydiagonal: false,
          defaultPattern: false,
          anyTwoLines: false,
          anyTwoVertical: false,
          anyTwoHorizontal: false,
          letterA: false,
          FMC: false,
          CS: false,
          MS: false,
          aos:false,
          ats:false,
        });
        break;

      case "anydiagonal":
        this.setState({
          defaultPattern: false,
          FullHouse: false,
          anyhorizontal: false,
          anyvertical: false,
          anydiagonal: true,
          anyTwoLines: false,
          anyTwoVertical: false,
          anyTwoHorizontal: false,
          letterA: false,
          FMC: false,
          CS: false,
          MS: false,
          aos:false,
          ats:false,
        });
        break;
      case "anyTwoLines":
        this.setState({
          defaultPattern: false,
          FullHouse: false,
          anyhorizontal: false,
          anyvertical: false,
          anydiagonal: false,
          anyTwoLines: true,
          anyTwoVertical: false,
          anyTwoHorizontal: false,
          letterA: false,
          FMC: false,
          CS: false,
          MS: false,
          aos:false,
          ats:false,
        });
        break;

      case "FMC":
        this.setState({
          defaultPattern: false,
          FullHouse: false,
          anyhorizontal: false,
          anyvertical: false,
          anydiagonal: false,
          anyTwoLines: false,
          anyTwoVertical: false,
          anyTwoHorizontal: false,
          letterA: false,
          FMC: true,
          CS: false,
          MS: false,
          aos:false,
          ats:false,
        });
        break;

        case "aos":
          this.setState({
            defaultPattern: false,
            FullHouse: false,
            anyhorizontal: false,
            anyvertical: false,
            anydiagonal: false,
            anyTwoLines: false,
            anyTwoVertical: false,
            anyTwoHorizontal: false,
            letterA: false,
            FMC:false,
            CS: false,
            MS: false,
            aos:true,
            ats:false,
          });
          break;

          case "ats":
            this.setState({
              defaultPattern: false,
              FullHouse: false,
              anyhorizontal: false,
              anyvertical: false,
              anydiagonal: false,
              anyTwoLines: false,
              anyTwoVertical: false,
              anyTwoHorizontal: false,
              letterA: false,
              FMC: false,
              CS: false,
              MS: false,
              ats:true,
              aos:false,
            });
            break;

        default:
          break;
      }
    };

        handlePatternChooser2 = (e) => {
          this.setState({ selectedPattern2: e });
      
          switch (e.value) {

        case "anyTwoVertical2":
          this.setState({
           
            anyhorizontal2: false,
            anyvertical2: false,
            anydiagonal2: false,
            defaultPattern2: false,
            anyTwoLines2: false,
            anyTwoVertical2: true,
            anyTwoHorizontal2: false,
            letterA2: false,
            FMC2: false,
            FullHouse2: false,
            CS2: false,
            MS2: false,
          });
          break;
        case "FullHouse2":
          this.setState({
          
            FullHouse2: true,
            anyhorizontal2: false,
            anyvertical2: false,
            anydiagonal2: false,
            defaultPattern2: false,
            anyTwoLines2: false,
            anyTwoVertical2: false,
            anyTwoHorizontal2: false,
            letterA2: false,
            FMC2: false,
            CS2: false,
            MS2: false,
          });
          break;





          case "defaultpattern2":
            this.setState({
            
              FullHouse2: false,
              anyhorizontal2: false,
              anyvertical2: false,
              anydiagonal2: false,
              defaultPattern2: true,
              anyTwoLines2: false,
              anyTwoVertical2: false,
              anyTwoHorizontal2: false,
              letterA2: false,
              FMC2: false,
              CS2: false,
              MS2: false,
            });
            break;






        case "CS2":
          this.setState({
            
            FullHouse2: false,
            anyhorizontal2: false,
            anyvertical2: false,
            anydiagonal2: false,
            defaultPattern2: false,
            anyTwoLines2: false,
            anyTwoVertical2: false,
            anyTwoHorizontal2: false,
            letterA2: false,
            FMC2: false,
            CS2: true,
  
            MS2: false,
          });
          break;
        case "MS2":
          this.setState({
            
            FullHouse2: false,
            CS2: false,
            anyhorizontal2: false,
            anyvertical2: false,
            anydiagonal2: false,
            defaultPattern2: false,
            anyTwoLines2: false,
            anyTwoVertical2: false,
            anyTwoHorizontal2: false,
            letterA2: false,
            FMC2: false,
            MS2: true,
          });
          break;
        case "anyTwoHorizontal2":
          this.setState({
           
            anyhorizontal2: false,
            FullHouse2: false,
            anyvertical2: false,
            anydiagonal2: false,
            defaultPattern2: false,
            anyTwoLines2: false,
            anyTwoVertical2: false,
            anyTwoHorizontal2: true,
            FMC2: false,
            letterA2: false,
            CS2: false,
            MS2: false,
          });
          break;
        case "letterA2":
          this.setState({
         
            anyhorizontal2: false,
            FullHouse2: false,
            anyvertical2: false,
            anydiagonal2: false,
            defaultPattern2: false,
            anyTwoLines2: false,
            anyTwoVertical2: false,
            anyTwoHorizontal2: false,
            letterA2: true,
            FMC2: false,
            CS2: false,
            MS2: false,
          });
          break;
        case "defaultPattern2":
          this.setState({
            
            anyhorizontal2: false,
            FullHouse2: false,
            anyvertical2: false,
            anydiagonal2: false,
            defaultPattern2: true,
            anyTwoLines2: false,
            anyTwoVertical2: false,
            anyTwoHorizontal2: false,
            letterA2: false,
            FMC2: false,
            CS2: false,
            MS2: false,
          });
          break;
  
        case "anyhorizontal2":
          this.setState({
           
            anyhorizontal2: true,
            FullHouse2: false,
            anyvertical2: false,
            anydiagonal2: false,
            defaultPattern2: false,
            anyTwoLines2: false,
            anyTwoVertical2: false,
            anyTwoHorizontal2: false,
            letterA2: false,
            FMC2: false,
            CS2: false,
            MS2: false,
          });
          break;
        case "anyvertical2":
          this.setState({
            
            anyhorizontal2: false,
            FullHouse2: false,
            anyvertical2: true,
            anydiagonal2: false,
            defaultPattern2: false,
            anyTwoLines2: false,
            anyTwoVertical2: false,
            anyTwoHorizontal2: false,
            letterA2: false,
            FMC2: false,
            CS2: false,
            MS2: false,
          });
          break;
  
        case "anydiagonal2":
          this.setState({
            
            defaultPattern2: false,
            FullHouse2: false,
            anyhorizontal2: false,
            anyvertical2: false,
            anydiagonal2: true,
            anyTwoLines2: false,
            anyTwoVertical2: false,
            anyTwoHorizontal2: false,
            letterA2: false,
            FMC2: false,
            CS2: false,
            MS2: false,
          });
          break;
        case "anyTwoLines2":
          this.setState({
           
            defaultPattern2: false,
            FullHouse2: false,
            anyhorizontal2: false,
            anyvertical2: false,
            anydiagonal2: false,
            anyTwoLines2: true,
            anyTwoVertical2: false,
            anyTwoHorizontal2: false,
            letterA2: false,
            FMC2: false,
            CS2: false,
            MS2: false,
          });
          break;
  
        case "FMC2":
          this.setState({
            defaultPattern2: false,
            FullHouse2: false,
            anyhorizontal2: false,
            anyvertical2: false,
            anydiagonal2: false,
            anyTwoLines2: false,
            anyTwoVertical2: false,
            anyTwoHorizontal2: false,
            letterA2: false,
            FMC2: true,
            CS2: false,
            MS2: false,
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

  BalanceDisplay = () => {
    const balance = useBalance();

    this.balance = balance;
  };

  /* ------------------- Render */
  render() {
    const { balance } = this.props;

    let colorClasses;
    if (this.state.blue) {
      colorClasses = "dark-blue-bg light-links";
    } else if (this.state.red) {
      colorClasses = "red-bg light-links";
    } else if (this.state.darkGrey) {
      colorClasses = "dark-gray-bg light-links";
    } else if (this.state.darkRed) {
      colorClasses = "dark-red-bg light-links";
    } else if (this.state.default) {
      colorClasses = "dark-bg light-links";
    } else {
      colorClasses = "dark-bg light-links";
    }

    // colorClasses= this.state.enableCaller? "dark-bg light-links": "red-bg light-links";
    return (
      <div>
        <div>
        <Header balancewon={this.state.balance} cardCount={this.state.cardCount} />{" "}
        </div>
        <div className={colorClasses}>
          {/* ----------- Bingo Board ------------- */}
          <section className='board-block'>
            <div className='container row no-wrap align-stretch'>
              {/* ------ Board ------- */}
              <div className='col pattern-side shrink padding-xlg'>
                {/* -------- Digital Displays --------- */}
                <div className='row no-wrap margin-bottom-lg justify-space-between white-text'>
                  <div className='col text-center margin-sm'>
                    <div className='callNumber notranslate'>
                      {this.numberDisplay}
                    </div>
                    <div className='callNumber-text uppercase'>Total Calls</div>
                  </div>
                  <div className='col text-center margin-sm'>
                    <div className='callNumber notranslate'>
                      {this.previousCallDisplay}
                    </div>
                    <div className='callNumber-text uppercase'>
                      Previous Call
                    </div>
                  </div>
                </div>

                {/* -------- Pattern --------- */}

              
                <Pattern selectedPattern={this.state.selectedPattern1?.value}
                selectedPattern2={this.state.selectedPattern2?.value} 
                
                />
                {/* <Pattern selectedPattern2={this.state.selectedPattern2.value}  /> */}
              
              </div>

              <div className='col board-side'>
                <BingoBoard
                  board={this.state.board}
                  // manualMode={this.state.displayBoardOnly}
                  manualCall={this.manualCall}
                />
              </div>
            </div>
          </section>

          {/* ----------- BOTTOM SECTION ------------- */}
          <section className='game-controls new-bg'>
            <div className='container row justify-start align-start'>
              {/* ----------- Current Ball Display ------------- */}
              <div className='col min-size-250 padding-vertical-xxlg padding-horizontal-md notranslate'>
                {this.currentBallDisplay}

                <CallHistory
                  calledBalls={this.state.previousCallList}
                  betAmount={this.state.betAmount}
                  cardCount={this.state.cardCount}
                  totalAmount={this.state.amount}
                  selectedCards={this.selectedCards}
                  selectedPattern={this.state.selectedPattern1}
                  selectedPattern2={this.state.selectedPattern2}
                  manualCut={this.state.manualCut}
                  manualEnteredCut={this.state.manualEnteredCut}
                  showModal={this.state.showModal}
                  showModal2={this.state.showModal2}
                  toggleModal={this.toggleModal}
                  disableReset={this.state.disableReset}
                  toggleEnd={this.toggleEnd}
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
              <div className='col shrink padding-vertical-xxlg padding-horizontal-md'>
                <section className='gameplay-controls'>
                  <div >
                    <button
                      data-disabled={this.state.displayBoardOnly}
                      onClick={
                        this.totalBallsCalled === 0
                          ? // ? this.startNewGame
                            this.togglestartModal2
                          : this.callBingoNumber
                      }
                      className='notranslate'
                      disabled={this.state.running || balance <= 0}
                    >
                      {this.totalBallsCalled === 0 ? (
                        <>
                          {balance
                            ? "Start New Game"
                            : `Your balance is ${balance}`}{" "}
                          <SlGameController />
                        </>
                      ) : (
                        <>
                          Next <FaStepForward />
                        </>
                      )}
                    </button>

                    <button
                      data-disabled={this.state.displayBoardOnly}
                      data-newgame={this.totalBallsCalled === 0}
                      className={
                        this.state.running
                          ? "pause-button notranslate"
                          : "play-button notranslate"
                      }
                      disabled={this.state.isLoading || this.startButton === 0} // Disable if loading
                      onClick={
                        this.totalBallsCalled === 0 && !this.state.isLoading // Prevent clicks during loading
                          ? this.startNewAutoplayGame
                          : () => {
                              this.toggleGame();
                              this.toggleModal(); // Toggle the modal visibility
                            }
                      }
                    >
                      {this.state.isLoading ? (
                        <>Loading...</> // Show loading text or spinner
                      ) : this.state.running ? (
                        <>
                          Pause <FaPause />
                        </>
                      ) : (
                        <>
                          Start <VscDebugStart />
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={this.toggleResetModal}
                    disabled={this.totalBallsCalled === 0 || this.state.disableReset === false}
                  >
                    Reset Board <BiReset />
                  </button>

                  <button
                    onClick={this.shuffleBalls}
                    disabled={this.state.running}
                  >
                    Shuffle Board <PiShuffleDuotone />
                  </button>
                </section>
                {this.resetConfirmationModalDisplay}
                {this.startConfirmationModalDisplay}
              </div>

              {/* ----------- Game Settings ------------- */}
              <div className='col grow no-wrap padding-vertical-xxlg padding-horizontal-md white-text'>
                <section className='game-settings'>
                  {/* ----------- Settings when using generation ---------- */}
                  <div
                  //  data-visibility={
                  //   this.state.displayBoardOnly === false ? "show" : "hide"
                  // }
                  
                  >
                    {/* ----------- Autoplay Settings ---------- */}
                    <div className='row no-wrap align-center justify-start'>
                      <div className='col shrink min-size-80 padding-horizontal-lg'>
                        <h6>
                          Speed: <SiFastapi />{" "}
                        </h6>
                      </div>
                      <div className='col shrink text-center padding-vertical-lg padding-horizontal-lg'>
                        <div
                          className='row no-wrap align-center slider'
                          data-disabled={this.state.displayBoardOnly}
                        >
                          <div className='col shrink padding-right-lg white-text'>
                            Slow
                            <span>&nbsp;</span>
                            <MdOutlineAssistWalker />
                          </div>
                          <div className='col'>
                            <Slider
                              min={2500}
                              max={6500}
                              step={500}
                              value={this.state.delay}
                              onChange={this.handleDelayChange}
                              reverse={true}
                            />
                          </div>
                          <div className='col shrink padding-left-lg white-text'>
                            Fast <span>&nbsp;</span>
                            <FaRunning />
                          </div>
                        </div>
                      </div>





                      <span>  &nbsp;</span>
                      <span>  &nbsp;</span>
                      <span>  &nbsp;</span>


                      <div className='row no-wrap align-start justify-start'>
                      <div className='col shrink min-size-80 padding-vertical-md padding-horizontal-lg'>
                        <h6>
                          Secondary Pattern: <MdOutlinePattern />
                        </h6>
                      </div>

                      <div className='col grow padding-horizontal-lg'>
                        <label
                          className={
                            this.state.showPat ? "toggle checked" : "toggle"
                          }
                        >
                          <span className='toggle-span'></span>
                          <span>Add</span>
                          <input
                            type='checkbox'
                            data-gamemode='2nd patt'
                            onChange={this.handleCheckboxPat}
                            checked={this.state.showpat}
                          ></input>
                        </label>
                      </div>
                    </div>







<span>  &nbsp;</span>
<span>  &nbsp;</span>
<span>  &nbsp;</span>




                    <div className='row no-wrap align-start justify-start'>
                      <div className='col shrink min-size-80 padding-vertical-md padding-horizontal-lg'>
                        <h6>
                          bell: <FaBell />
                        </h6>
                      </div>

                      <div className='col grow padding-horizontal-lg'>
                        <label
                          className={
                            this.state.chime ? "toggle checked" : "toggle"
                          }
                        >
                          <span className='toggle-span'></span>
                          <span>enable</span>
                          <input
                            type='checkbox'
                            data-gamemode='enable-chime'
                            onChange={this.handleCheckbox}
                            checked={this.state.chime}
                          ></input>
                        </label>
                      </div>
                    </div>

                    </div>














                   





                    {/* ----------- Caller ---------- */}
                    

                    <div className='row align-start justify-start'>
                      <div className='col shrink min-size-100 padding-vertical-md padding-horizontal-lg'>
                        <h6>
                          {" "}
                          color: <RiPaintBrushFill />{" "}
                        </h6>
                      </div>
                      <div className='col grow padding-horizontal-lg'>
                        <Select
                          className='select-input'
                          placeholder='Choose colors'
                          menuPlacement='auto'
                          value={this.state.selectedColor}
                          onChange={this.handleColorchooser}
                          options={this.colors}
                        />
                      </div>
                      <div className='row align-start justify-start'>
                       
                    </div>








                    <div className='row align-start justify-start'>
                      <div className='col shrink min-size-80 padding-vertical-md padding-horizontal-lg'>
                        <h6>
                          {" "}
                          speaker: <RiSpeakFill /> <FcSpeaker />{" "}
                        </h6>
                      </div>
                      <div className='col grow min-size-80 padding-horizontal-lg'>
                        {/* Disabled if manual calling mode is on */}
                        <div
                          className='row no-wrap justify-start'
                          data-visibility={
                            this.speechEnabled === true ? "show" : "hide"
                          }
                        >
                          <div className='col grow padding-horizontal-lg'>
                            <Select
                              className='select-input'
                              placeholder='Choose callers'
                              menuPlacement='auto'
                              value={this.state.selectedCaller}
                              onChange={this.handleChooseCaller}
                              options={this.callers}
                            />
                          </div>
                        </div>
                        <label>
                <input
                    type="checkbox"
                    checked={this.state.doubleTalk}
                    onChange={this.handleDoubleTalkChange}
                />
                Double Talk
            </label>
                        {/* Only shown if speech is DISABLED by the browser */}
                        <div
                          className='row no-wrap'
                          data-visibility={
                            this.speechEnabled === true ? "hide" : "show"
                          }
                        ></div>
                      </div>
                    </div>





















                    <div className='col shrink min-size-100 padding-vertical-md padding-horizontal-lg'>
                          <h6>
                            {" "}
                            pattern: <MdOutlinePattern />{" "}
                          </h6>
                        </div>
                        <div className='col grow padding-horizontal-lg'>
                          <Select
                            className='select-input'
                            placeholder='Choose pattern'
                            menuPlacement='auto'
                            value={this.state.selectedPattern1}
                            onChange={this.handlePatternChooser}
                            options={this.Pattern1}
                          />
                        </div>
                      </div>



                  

                    {/* ----------- Chime Selection ----------- */}
                    <div
                      className='row no-wrap align-start justify-start'
                      data-visibility={this.state.showPat ? "show" : "hide"}
                    >
                      <div className='col shrink min-size-80 padding-vertical-md padding-horizontal-lg'>
                        <h6>
                          Secondary Pattern: <MdOutlinePattern />
                        </h6>
                      </div>

                      <div className='col grow padding-horizontal-lg'>
                      <Select
                            className='select-input'
                            placeholder='Choose secondary pattern'
                            menuPlacement='auto'
                            value={this.state.selectedPattern2}
                            onChange={this.handlePatternChooser2}
                            options={this.Pattern2}
                          />
                      </div>





                      <div
                      className='row no-wrap align-start justify-start'
                      data-visibility={this.state.chime ? "show" : "hide"}
                    >
                      <div className='col shrink min-size-80 padding-vertical-md padding-horizontal-lg'>
                        <h6>
                          bell Selection: <FaSearch />
                        </h6>
                      </div>

                      <div className='col grow padding-horizontal-lg'>
                        <Select
                          className='select-input'
                          placeholder='Choose Chime'
                          menuPlacement='auto'
                          value={this.state.selectedChime}
                          onChange={this.handleChooseChime}
                          options={this.chimes}
                        />
                      </div>
                    </div>



                    </div>
                 


                    {/* ----------- Chime ----------- */}
                    

                    {/* ----------- Chime Selection ----------- */}
                   
                  </div>
                </section>
              </div>

              
            </div>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  balance: state.user.currentUser ? state.user.currentUser.balance : 0,
});

const mapDispatchToProps = {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withBalance(BingoGame));
