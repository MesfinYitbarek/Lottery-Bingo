import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Users from "./Users";
import Cartela from "./Cartela";
import CreateCredit from "./CreateCredit";
import { useSelector } from "react-redux";

import TransferCredit from "./TransferCredit";
import DashboardHeader from "./DashboardHeader";

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
    <div className="   bg-gray-100 pb-12 min-h-screen ">
      <div >
        <div>
          <DashboardHeader/>
        </div>
        <div>
          <div className=" bg-blue-800 h-screen fixed w-[280px] top-0 p-5 text-center flex flex-col gap-4">
            <div className="font-bold mt-10  text-white leading-10  text-lg mb-10">
              <Link to={"/"} className=" text-3xl font-bold ">
                Lottery<span>Bingo</span>
              </Link>
            </div>
            <div className=" text-start flex p-2 flex-col gap-2">
              {navigationItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => handleClick(index)}
                  className={`
            bg-blue-500 flex gap-3 text-sm border-blue-800  cursor-pointer   py-4 px-3 rounded-md
            ${
              index === activeItem
                ? `text-white ${(condtion = item.name)} bg-blue-700 hover:bg-blue-950 hover:text-white  `
                : `bg-white  text-gray-500 hover:bg-gray-200`
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
      <div className=" flex justify-center items-center">
      {condtion == "Dashboard" ? (
        <p className=" pl-72">home</p>
      ) : condtion == "Cartela" ? (
        <p className=" pl-72"><Cartela/></p>
      ): condtion == "Credit" ? (
        <p className=" pl-72">{currentUser.role == 'superadmin' ? <CreateCredit/> : <TransferCredit/>}</p>
      ) : condtion == "Sales" ? (
        <p className=" pl-72">Sales</p>
      ) : condtion == "Users" ? (
        <p className=" pl-72"><Users/></p>
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
