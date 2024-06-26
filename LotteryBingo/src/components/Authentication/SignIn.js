import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";


const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('http://localhost:4000/api/user/signin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className=" dark:bg-gray-800 bg-slate-50">
      
      <div className=" flex justify-center items-center">
        <div className="  shadow-sm flex flex-col justify-center items-center dark:bg-gray-400  p-[2%] rounded-2xl sm:w-[650px] bg-slate-50  border border-slate-300  m-[3%]">
          <h1 className=" m-3  font-serif sm:text-[22px] text-sky-900">
            Hi, Welcome back!
          </h1>
          <form
            onSubmit={handleSubmit}
            action=""
            className="  flex flex-col justify-between items-center gap-6 "
          >
            <input
              type="text"
              placeholder="Username"
              id="username"
              required
              onChange={handleChange}
              className=" dark:bg-slate-100 sm:w-[450px] h-10 rounded-lg border border-slate-300 p-3  focus:outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              id="password"
              required
              onChange={handleChange}
              className=" dark:bg-slate-100 sm:w-[450px] h-10 rounded-lg border border-slate-300 p-3"
            />
            <button
              disabled={loading}
              type="submit"
              className="sm:w-[450px]  font-semibold hover:bg-white hover:text-blue-600 hover:border hover:border-blue-400  p-2 px-6 rounded-lg text-white bg-blue-600"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
           
          </form>
          
          <div className="">{error && <p className=" text-red-500 ">{error}</p>}</div>
        </div>
      </div>
      
    </div>
  );
};

export default SignIn;
