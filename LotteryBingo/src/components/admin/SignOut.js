import React from "react";
import {
  signoutUserFailure,
  signoutUserStart,
  signoutUserSuccess,
} from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";

const SignOut = () => {
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch("http://localhost:4000/api/user/signout/");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutUserFailure(data.message));
        return;
      }

      dispatch(signoutUserSuccess(data));
    } catch (error) {
      dispatch(signoutUserFailure(error.message));
    }
  };
  return (
    <div>
      <span onClick={handleSignout} className=" tw-cursor-pointer  ">
        Log Out 
      </span>
    </div>
  );
};

export default SignOut;
