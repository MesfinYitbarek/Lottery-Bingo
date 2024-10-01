import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreateCredit from "./CreateCredit";
import { useSelector } from "react-redux";

import { SiCashapp } from "react-icons/si"; // Importing Cashapp icon
import { FcSalesPerformance } from "react-icons/fc"; // Importing Sales Performance icon
import { AiOutlineMenu } from "react-icons/ai"; // Importing Menu icon

import TransferCredit from "./TransferCredit";
import DashboardHeader from "./DashboardHeader";

import Users from "./CasheirSales";

// Updated navigationItems with letters
const navigationItems = [
  { name: "Credit", letter: "C", icon: <SiCashapp /> },
  { name: "Sales", letter: "S", icon: <FcSalesPerformance /> },
];

const CaheirContainer = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // New state for sidebar
  const { currentUser } = useSelector((state) => state.user);

  const handleClick = (index) => {
    setActiveItem(index);
  };

  let condition = navigationItems[activeItem].name; // Initialize condition based on active item

  return (
    <div className="tw-bg-gray-100 tw-pb-12 tw-min-h-screen notranslate">
      <div>
        <DashboardHeader />
      </div>
      <div className="tw-flex">
        {/* Sidebar */}
        <div className={`tw-bg-blue-800 tw-h-screen tw-fixed ${isSidebarCollapsed ? 'tw-w-[80px]' : 'tw-w-[280px]'} tw-top-0 tw-p-5 tw-text-center tw-flex tw-flex-col tw-gap-4`}>
          {/* Toggle Button for Sidebar */}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="tw-text-white tw-mb-4">
            <AiOutlineMenu /> {/* Changed to Menu Icon */}
          </button>

          <div className="tw-font-bold tw-mt-10 tw-text-white tw-leading-10 tw-text-lg tw-mb-10">
            {!isSidebarCollapsed && ( // Conditionally render the text
              <Link to={"/"} className="tw-text-3xl tw-font-bold tw-text-white">
                Lottery<span>Bingo</span>
              </Link>
            )}
          </div>
          
          {/* Back button text changes based on sidebar state */}
          <Link to="/" className="dashboard-button">
            {!isSidebarCollapsed ? "Back to Bingo Game" : "Back"}
          </Link>

          <div className="tw-text-start tw-flex tw-p-2 tw-flex-col tw-gap-2">
            {navigationItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => {
                  handleClick(index);
                  condition = item.name; // Update condition based on clicked item
                }}
                className={`
                  tw-bg-blue-500 tw-flex tw-gap-3 tw-text-sm 
                  ${index === activeItem ? 'tw-text-white' : 'tw-text-gray-500'} 
                  ${index === activeItem ? 'tw-bg-blue-700' : 'tw-bg-white'} 
                  ${index === activeItem ? 'tw-hover:bg-blue-950' : 'tw-hover:bg-gray-200'}
                  tw-cursor-pointer tw-py-4 tw-px-3 tw-rounded-md
                `}
              >
                {/* Show letter if sidebar is collapsed, otherwise show full name */}
                {!isSidebarCollapsed ? item.name : item.letter}
                {item.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className={`tw-flex-grow ml-auto ${isSidebarCollapsed ? 'tw-pl-[80px]' : 'tw-pl-[280px]'} transition-all duration-300`}>
          <div className="tw-flex tw-justify-center tw-items-center">
            {/* Conditional rendering based on selected item */}
            {condition === "Credit" ? (
              <p className="tw-pl-72">
                {currentUser.role === "superadmin" ? (
                  <CreateCredit />
                ) : currentUser.role === "agent" ? (
                  <TransferCredit />
                ) : (
                  <TransferCredit />
                )}
              </p>
            ) : condition === "Sales" ? (
              <p className="tw-pl-72">
                <Users />
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaheirContainer;