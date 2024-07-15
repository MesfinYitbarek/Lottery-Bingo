import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SignOut from "./SignOut";
import ChangePassword from "../Authentication/ChangePassword";

const DashboardHeader = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [balance, setBalance] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
  }, [currentUser, balance]);
  return (
    <div>
      <div>
        <div className="tw-pt-3 tw-flex tw-justify-end">
          {currentUser ? (
            <div className="tw-flex tw-gap-1">
              <div className="tw-group tw-mr-10 tw-relative">
                <img
                  className="tw-rounded-full tw-h-9 tw-w-9 tw-object-cover"
                  src={currentUser.avatar}
                  alt="profile"
                />
                <div className="tw-absolute tw-z-[9999] tw-right-3 tw-hidden group-hover:tw-block tw-w-[200px] tw-bg-white tw-text-black tw-shadow-sm">
                  <ul className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-blue-800">
                    <h1 className="tw-text-lg tw-text-blue-800 tw-font-bold">
                      {currentUser.username}
                    </h1>
                    <button
                      onClick={openModal}
                      className="tw-border-none tw-bg-none hover:tw-bg-none"
                    >
                      <h3 className="tw-text-lg tw-text-center hover:tw-bg-slate-200">
                        Change Password
                      </h3>
                    </button>
                    <hr className="tw-w-full" />
                    <h2 className="tw-text-blue-800 hover:tw-bg-slate-200 tw-text-lg tw-py-1">
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
      {isModalOpen && (
        <div className="tw-absolute tw-top-2 tw-inset-0 tw-flex tw-justify-center tw-items-center tw-bg-gray-800 tw-bg-opacity-50">
          <div className="tw-bg-white tw-p-4 tw-rounded-md tw-shadow-lg tw-relative">
            <button
              className="tw-absolute tw-top-2 tw-right-2 tw-text-gray-800"
              onClick={closeModal}
            >
              X
            </button>
            <ChangePassword />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
