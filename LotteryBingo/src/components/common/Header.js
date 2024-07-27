import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { RiFullscreenLine, RiFullscreenExitLine } from "react-icons/ri";
import { BiShoppingBag } from "react-icons/bi";

import headerlogo from "./logoImagelast.jpg";
import SignOut from "../admin/SignOut";
import ChangePassword from "../Authentication/ChangePassword";
import "./Header.css";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <img src={headerlogo} className="logo"></img>
          </div>
            
          </Link>
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
    const flags = document.getElementsByClassName("flag-link");

    Array.prototype.forEach.call(flags, function (e) {
      e.addEventListener("click", function () {
        var lang = e.getAttribute("data-lang");
        var languageSelect = document.querySelector("select.goog-te-combo");
        languageSelect.value = lang;
        languageSelect.dispatchEvent(new Event("change"));
      });
    });
  }, []);

  return (
    <div className="language-switcher">
      <button className="header-button">
        <a href="#" className="flag-link" data-lang="am">
          amh
        </a>
      </button>
      <button className="header-button">
        <a href="#" className="flag-link" data-lang="ti">
          tig
        </a>
      </button>
      <button className="header-button">
        <a href="#" className="flag-link" data-lang="om">
          oro
        </a>
      </button>
      <button className="header-button">
        <a href="#" className="flag-link" data-lang="so">
          som
        </a>
      </button>
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