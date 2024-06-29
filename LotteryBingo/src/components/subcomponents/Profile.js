import React from 'react'
import { BiShoppingBag } from 'react-icons/bi';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import SignOut from '../admin/SignOut';
const Profile = () => {
    const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <div className=' tw-absolute tw-top-96 tw-right-1 tw-pt-3 tw-flex tw-justify-end'>
      {currentUser ? (
        <div className='tw-flex  tw-gap-1'>
              <div className="tw-group tw-mr-10 tw-relative">
                <div className=' tw-bg-white tw-flex-col tw-justify-center tw-items-center tw-shadow-lg tw-p-10 tw-text-blue-800 tw-font-bold'>
                <img
                  className="tw-rounded-full tw-h-9 tw-w-9 tw-object-cover"
                  src={currentUser.avatar}
                  alt="profile"
                />
                <div className=' tw-text-2xl'>{currentUser.username} </div>
                <h2 className="tw-text-blue-800 tw-text-2xl tw-hover:bg-slate-200 tw-py-1 tw-px-3"><SignOut/></h2>
                </div>
                
              </div>
             
              
              </div>
            ) : (
              <div className="tw-mr-10">
                <Link to={'/sign-in'} className='tw-bg-blue-800 tw-p-1.5 hover:tw-text-white tw-px-4 tw-text-white tw-rounded-md '>
                  SignIn
                </Link>
              </div>
            )}
    </div>
    </div>
  )
}

export default Profile
