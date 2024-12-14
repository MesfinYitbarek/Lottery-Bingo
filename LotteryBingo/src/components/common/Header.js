import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { RiFullscreenLine, RiFullscreenExitLine } from "react-icons/ri";
import { BiShoppingBag } from "react-icons/bi";
// import { FcMoneyTransfer} from "react-icons/fc";



import SignOut from "../admin/SignOut";
import ChangePassword from "../Authentication/ChangePassword";
import "./Header.css";

const Header =({ balancewon, cardCount,selectedCards }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedMarquee, setIsCheckedMarquee] = useState(false);

  // Function to handle checkbox change
  const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
  };

  const handleCheckboxChangeMarquee = () => {
    setIsCheckedMarquee(!isCheckedMarquee); // Toggle the checked state
};
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await axios.get(`/api/credit/${currentUser._id}/balance`);
        setBalance(res.data.balance);
      } catch (err) {
        alert("Error fetching balance");
      }
    };

    if (currentUser) {
      fetchBalance();
    }
  }, [currentUser]);

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <header className="header">
      <div className="container">
        <div className="left-section">
          <Link to="/">
          <div className=" tw-flex-col tw-gap-0 tw-items-center tw-text-center">
            {/* <h1 className=" tw-text-green-800 tw-font-extrabold tw-text-4xl ">
             <span className=" tw-text-blue-800">Bingo</span> Lottery
            </h1> */}
           
            <img src={currentUser.imageUrl} className="logo" alt="logoImage"></img>
          </div>
            
          </Link>
        </div>

        
        <div className="pose">
            <fieldset className="win-amount-fieldset">
                <legend>Win Amount</legend>
                
                <span className="money-icon">
                    <label>
                        <input 
                            type="checkbox" 
                            checked={isChecked} 
                            onChange={handleCheckboxChange} 
                            // className="invisible-checkbox" // Hide default checkbox appearance
                        />
                        total
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={isCheckedMarquee} 
                            onChange={handleCheckboxChangeMarquee} 
                        />
                        cards
                    </label>
                    {isChecked && ( // Display player count if checked
                       <div className="newclass">
                        Players: {cardCount}
                       </div>
                            
                     
                    )}
                    <p className="balance-text">{balancewon} ETB</p>
                </span>
              
            </fieldset>
            {isCheckedMarquee && (
                    <div className="marquee">
                        <div className="marquee-content">
                            {selectedCards.map((number) => (
                                <span key={number} className="marquee-item">{number}</span>
                            ))}
                        </div>
                    </div>
                )}
        </div>
   

        <div className="right-section">
          <button onClick={toggleFullScreen} className="fullscreen-button">
            {isFullScreen ? <RiFullscreenExitLine /> : <RiFullscreenLine />}
          </button>
          {currentUser ? (
            <UserMenu
              currentUser={currentUser}
              balance={balance}
              openModal={openModal}
            />
          ) : (
            <Link to="/sign-in" className="sign-in-button">
              Sign In
            </Link>
          )}
          <LanguageSwitcher />
        </div>
      </div>

      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <ChangePassword />
        </Modal>
      )}
    </header>
  );
};

const UserMenu = ({ currentUser, balance, openModal }) => (
  <div className="user-menu">
    <div className="profile-section">
      <img
        className="profile-avatar"
        src={currentUser.avatar}
        alt="profile"
      />
      <div className="profile-dropdown">
        <h1 className="username">{currentUser.username}</h1>
        <button onClick={openModal} className="change-password-button">
          Change Password
        </button>
        <hr />
        <SignOut />
      </div>
    </div>
    <div className="balance-section">
      <BiShoppingBag className="shopping-icon" />
      <div className="balance-info notranslate">Your balance is {balance}</div>
      <Link to="/casheir" className="dashboard-button">
        Dashboard
      </Link>
    </div>
  </div>
);

const LanguageSwitcher = () => {
  useEffect(() => {
    const languageSelect = document.querySelector("select.goog-te-combo");
    
    // Set the initial value based on the current language
    if (languageSelect) {
      const currentLang = languageSelect.value;
      const flags = document.querySelectorAll(".flag-link");
      flags.forEach(flag => {
        if (flag.getAttribute("data-lang") === currentLang) {
          flag.classList.add("active"); // Optional: Highlight the active language
        }
      });
    }
  }, []);

  const handleLanguageChange = (event) => {
    const lang = event.target.value;
    const languageSelect = document.querySelector("select.goog-te-combo");
    
    if (languageSelect) {
      languageSelect.value = lang;
      languageSelect.dispatchEvent(new Event("change"));
    }
  };

  return (
    <div className="language-switcher">
      <select className="language-dropdown" onChange={handleLanguageChange}>

        <option value="en" data-lang="en">english</option>
        <option value="am" data-lang="am">amharic</option>
        <option value="ti" data-lang="ti">tigrigna</option>
        <option value="om" data-lang="om">oromigna</option>
        <option value="so" data-lang="so">somali</option>
      </select>
    </div>
  );
};

const Modal = ({ children, closeModal }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="close-button" onClick={closeModal}>
        X
      </button>
      {children}
    </div>
  </div>
);

export default Header;