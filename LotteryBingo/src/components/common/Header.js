import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "../../images/logoImage.svg";
import { useSelector } from "react-redux";
import { RiFullscreenLine, RiFullscreenExitLine} from "react-icons/ri";
import axios from "axios";
import SignOut from "../admin/SignOut";
import { BiShoppingBag } from "react-icons/bi";
import BingoGame from "../BingoGame";
import CallHistory from "../subcomponents/CallHistory";
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [balance, setBalance] = useState(0);
console.log(balance)
  useEffect(() => {
    const fetchBalance = async () => {
      try {
               const res = await axios.get(`http://localhost:4000/api/credit/${currentUser._id}/balance`);
        setBalance(res.data.balance);
      } catch (err) {
        alert('Error fetching balance');
      }
    };

    if (currentUser) {
      fetchBalance();
    }
  }, [currentUser,balance]);

   const toggleFullScreen = () => {
    if (!isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div>
      <header>
        <div className=" tw-flex tw-items-center tw-container tw-row tw-align-center">
          <div className="tw-col tw-shrink tw-flex">
            <Link to="/">
              <img src={logoImage} alt="Let's Play Bingo!" className="logo" />
            </Link>
            <button
                    onClick={toggleFullScreen}
                    className="tw-border-none "
                  >
                    {isFullScreen ? <RiFullscreenExitLine /> : <RiFullscreenLine />}
                  </button>
          </div>
          <div className="tw-col tw-grow tw-padding-md tw-no-text-wrap tw-text-right">
            <ul className="tw-menu"></ul>

            <div className="  tw-pt-3 tw-flex tw-justify-end">
              {currentUser ? (
                <div className="tw-flex tw-gap-1">
                  <div className="tw-group tw-mr-10 tw-relative">
                    <img
                      className="tw-rounded-full tw-h-9 tw-w-9 tw-object-cover"
                      src={currentUser.avatar}
                      alt="profile"
                    />
                    <div
                      className="tw-absolute tw-z-[9999] 
                         tw-right-1   tw-hidden
                         group-hover:tw-block tw-w-[200px] 
                        tw-bg-white  tw-text-black tw-shadow-sm  "
                    >
                      <ul className=" tw-flex-col tw-justify-start   tw-text-blue-800 ">
                        <h1 className=" tw-text-lg tw-text-center tw-text-blue-800 tw-font-bold">
                          {currentUser.username}
                        </h1>
                        <Link to={""} className="  ">
                          <h3 className="tw-text-lg tw-text-center tw-hover:bg-slate-200 ">
                            Change Password
                          </h3>
                        </Link>{" "}
                        <hr />
                        <h2 className="tw-text-blue-800 tw-text-center tw-hover:bg-slate-200 tw-text-lg  ">
                          <SignOut />
                        </h2>
                      </ul>
                    </div>
                  </div>
                  <div className="tw-group">
                    <div className="tw-text-3xl tw-text-blue-800 tw-mr-12">
                      {" "}
                      <BiShoppingBag />{" "}
                    </div>
                    <div className="tw-text-blue-800 tw-font-semibold tw-hidden tw-mr-6 tw-absolute tw-top-14 tw-right-4 group-hover:tw-block">
                      Your balance is {balance}
                   
                    </div>
                   
                  </div>
                
                </div>
              ) : (
                <div className="tw-mr-10">
                  <Link
                    to={"/sign-in"}
                    className="tw-bg-blue-800 tw-p-1.5 hover:tw-text-white tw-px-4 tw-text-white tw-rounded-md "
                  >
                    SignIn
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="tw-col tw-shrink tw-text-right tw-margin-left-lg">
            <div id="google_translate_element"></div>
          </div>
        </div>
        <div className=' tw-hidden'>
    <CallHistory balance={currentUser.balance} />
    <BingoGame balance={currentUser.balance} />
    </div>
      </header>
    </div>
  );
};

export default Header;
