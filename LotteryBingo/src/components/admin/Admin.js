import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Users from "./Users";
import Cartela from "./Cartela";
import CreateCredit from "./CreateCredit";
import { useSelector } from "react-redux";

import TransferCredit from "./TransferCredit";
import DashboardHeader from "./DashboardHeader";
import Sales from "./Sales";

const navigationItems = [
  { name: "Dashboard", isActive: true },
  { name: "Cartela" },
  { name: "Credit" },
  { name: "Sales" },
  { name: "Users" },
];

const AdminContainer = () => {
  const [activeItem, setActiveItem] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  const handleClick = (index) => {
    setActiveItem(index);
  };

  var condtion = "";

  return (
    <div className=" tw-bg-gray-100 tw-pb-12 tw-min-h-screen ">
      <div >
        <div>
          <DashboardHeader/>
        </div>
        <div>
          <div className=" tw-bg-blue-800 tw-h-screen tw-fixed tw-w-[280px] tw-top-0 tw-p-5 tw-text-center tw-flex tw-flex-col tw-gap-4">
            <div className="tw-font-bold tw-mt-10  tw-text-white tw-leading-10  tw-text-lg tw-mb-10">
              <Link to={"/"} className=" tw-text-3xl tw-font-bold ">
                Lottery<span>Bingo</span>
              </Link>
            </div>
            <div className=" tw-text-start tw-flex p-2 tw-flex-col tw-gap-2">
              {navigationItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => handleClick(index)}
                  className={`
            tw-bg-blue-500 tw-flex tw-gap-3 tw-text-sm tw-border-blue-800  tw-cursor-pointer   tw-py-4 tw-px-3 tw-rounded-md
            ${
              index === activeItem
                ? `tw-text-white ${(condtion = item.name)} tw-bg-blue-700 tw-hover:bg-blue-950 tw-hover:text-white  `
                : `tw-bg-white  tw-text-gray-500 tw-hover:bg-gray-200`
            } 
          `}
                >
                  {item.name}
                </button>
              ))}
             {/* <Link
                
                className=" opacity-60 pl-3 py-1 rounded-md text-white hover:bg-slate-300"
              >
                {" "}
                My account
              </Link>
            */}
            </div>
          </div>
        </div>
      </div>
      <div className=" tw-flex tw-justify-center tw-items-center">
      {condtion == "Dashboard" ? (
        <p className=" tw-pl-72">home</p>
      ) : condtion == "Cartela" ? (
        <p className=" tw-pl-72"><Cartela/></p>
      ): condtion == "Credit" ? (
        <p className=" pl-72">{currentUser.role == 'superadmin' ? <CreateCredit/> : <TransferCredit/>}</p>
      ) : condtion == "Sales" ? (
        <p className=" tw-pl-72"><Sales/></p>
      ) : condtion == "Users" ? (
        <p className=" tw-pl-72"><Users/></p>
      ) : condtion == "Log Out" ? (
        <p>lo</p>
      ) : (
        ""
      )}
      </div>
      
    </div>
  );
};

export default AdminContainer;
