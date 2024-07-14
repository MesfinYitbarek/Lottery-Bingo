import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Users from "./Users";
import Cartela from "./Cartela";
import CreateCredit from "./CreateCredit";
import { useSelector } from "react-redux";

import { TfiDashboard } from "react-icons/tfi";
import { PiCardsThreeLight } from "react-icons/pi";
import { SiCashapp } from "react-icons/si";
import { FcSalesPerformance } from "react-icons/fc";
import { FaUsers } from "react-icons/fa6";

import TransferCredit from "./TransferCredit";
import DashboardHeader from "./DashboardHeader";
import Sales from "./Sales";
import CreateBranch from "./CreateBranch";
import SuperAdmin from "./SuperAdmin";
import Branch from "./branch";
import AdminDashboard from "./Home";
import AdminDashboardHome from "./AdminHome";

const navigationItems = [
  { name: "Dashboard", isActive: true, icon:<TfiDashboard />  },
  { name: "Cartela", icon:<PiCardsThreeLight /> },
  { name: "Credit", icon: <SiCashapp/>},
  { name: "Sales", icon:<FcSalesPerformance/>},
  { name: "Users",  icon:<FaUsers />},
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
              <Link to={"/"} className=" tw-text-3xl tw-font-bold tw-text-white ">
                Lottery<span>Bingo</span>
              </Link>
            </div>
            <div className=" tw-text-start tw-flex tw-p-2 tw-flex-col tw-gap-2">
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
                  {item.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className=" tw-flex tw-justify-center tw-items-center">
      {condtion == "Dashboard" ? (
        <p className=" tw-pl-72">{currentUser.role == 'superadmin' ? <AdminDashboard/> :currentUser.role == 'agent' ? " " :currentUser.role == 'admin' ?<AdminDashboardHome/> : ""}</p>
      ) : condtion == "Cartela" ? (
        <p className=" tw-pl-72"><Cartela/></p>
      ): condtion == "Credit" ? (
        <p className=" tw-pl-72">{currentUser.role == 'superadmin' ? <CreateCredit/> :currentUser.role == 'agent' ?<TransferCredit/>: <TransferCredit/>}</p>
      ) : condtion == "Sales" ? (
        <p className=" tw-pl-72"><Sales/></p>
      ) : condtion == "Users" ? (
        <p className=" tw-pl-72">{currentUser.role == 'superadmin' ? <Branch/> : <Users/>}</p>
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




