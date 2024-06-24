import React from "react";
import { useState } from "react";
import {Link} from 'react-router-dom'


const navigationItems = [
  { name: "Dashboard", isActive: true }, 
  { name: "Courses " },
  { name: "Categories" },
  { name: "Messages"},
  { name: "Users" },
  { name: "Enrolled Students" },
  
];


const AdminContainer = () => {
  const [activeItem, setActiveItem] = useState(0); 

  const handleClick = (index) => {
    setActiveItem(index);
  };

  var condtion = "";

  return (
    <div className="  bg-gray-100 pb-12 min-h-screen ">
      <div>
        <div>
          
          <div className=" bg-white h-screen fixed w-[230px] top-0 p-5 text-center flex flex-col gap-4">
            <div className="font-bold  text-blue-500 leading-10  text-lg">
              <Link to={'/'}>
                
                Lottery<span>Bingo</span>
              </Link>
            </div>
            <div className=" text-start flex p-2 flex-col gap-2">
              {navigationItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => handleClick(index)}
                  className={`
            bg-blue-500 flex gap-3 text-sm  cursor-pointer   py-2 px-3 rounded-md
            ${
              index === activeItem
                ? `text-white ${(condtion = item.name)} `
                : `bg-white  text-gray-500 hover:bg-gray-200`
            } 
          `}
                >
                  
                  {item.name}
                </button>
              ))}
              <Link to={'/profile'} className=" opacity-60 pl-3 py-1 rounded-md hover:bg-slate-300"> My account</Link>
            </div>
          </div>
        </div>
      </div>
      {condtion == "Dashboard" ? (
<p>home</p>
      ) : condtion == "Courses" ? (
        <p>c</p>
      ) : condtion == "Categories" ? (
        <p>about</p>
      ) : condtion == "Messages" ? (
        <p>menuPlacement</p>
      ) : condtion == "Users" ? (
        <p>u</p>
      )  : condtion == "Enrolled Students" ? (
        <p>e</p>
      )  : condtion == "Log Out" ? (
        <p>lo</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default AdminContainer;
