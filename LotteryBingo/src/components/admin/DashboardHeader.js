import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BiShoppingBag } from 'react-icons/bi';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import SignOut from './SignOut';

const DashboardHeader = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [balance, setBalance] = useState(0);

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
  return (
    <div >
      <div>
      <div className=' pt-3 flex justify-end'>
      {currentUser ? (
        <div className=' flex gap-1'>
              <div className="group mr-10 relative">
                <img
                  className=" rounded-full h-9 w-9 object-cover"
                  src={currentUser.avatar}
                  alt="profile"
                />
                <div
                  className="absolute z-[9999] 
                         right-3  hidden
                        group-hover:block w-[160px] 
                        bg-white p-2 text-black shadow-sm  "
                >
                  <ul className=" flex flex-col gap-3 py-2 text-sm text-blue-800 ">
                    <h1 className=' text-center text-blue-800 font-bold'>{currentUser.username}</h1>
                    <Link to={""} className=" hover:bg-slate-200 py-1 px-3" ><h3>Change Password</h3></Link>  <hr />

                    <h2 className="text-blue-800 hover:bg-slate-200 py-1 px-3"><SignOut/></h2>
                    
                  </ul>
                </div>
              </div>
              <div className=' group'>
              <div className=' text-3xl text-blue-800 mr-12'> <BiShoppingBag/>  </div>
              <div className=' text-blue-800 font-semibold hidden mr-6 absolute top-14 right-4 group-hover:block'>Your balance is {balance}</div>
              </div>
              </div>
            ) : (
              <div className=" mr-10">
                <Link to={'/sign-in'} className=' bg-blue-800 p-1.5 hover:text-white px-4 text-white rounded-md '>
                  SignIn
                </Link>
              </div>
            )}
    </div>
      </div>
    </div>
  )
}

export default DashboardHeader
