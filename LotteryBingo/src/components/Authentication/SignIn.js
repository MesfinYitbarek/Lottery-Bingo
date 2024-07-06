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
    <div className="tw-dark:bg-gray-800 tw-h-screen tw-pt-28 tw-bg-slate-50">
      
      <div className="tw-flex tw-justify-center tw-items-center">
        <div className="tw-shadow-sm tw-flex tw-flex-col tw-justify-center tw-items-center tw-dark:bg-gray-400 tw-p-[2%] tw-rounded-2xl tw-sm:w-[650px] tw-bg-slate-50 tw-border tw-border-slate-300 tw-m-[3%]">
          <h1 className="tw-m-3 tw-font-serif tw-text-4xl tw-text-sky-900">
            Hi, Welcome back!
          </h1>
          <form
            onSubmit={handleSubmit}
            action=""
            className="tw-flex tw-flex-col tw-justify-between tw-items-center tw-gap-6 "
          >
            <input
              type="text"
              placeholder="Username"
              id="username"
              required
              onChange={handleChange}
              className="tw-dark:bg-slate-100 tw-sm:w-[450px] tw-h-10 tw-rounded-lg tw-border tw-border-slate-300 tw-p-3  tw-focus:outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              id="password"
              required
              onChange={handleChange}
              className="tw-dark:bg-slate-100 tw-sm:w-[450px] tw-h-10 tw-rounded-lg tw-border tw-border-slate-300 tw-p-3"
            />
            <button
              disabled={loading}
              type="submit"
              className="tw-sm:w-[450px]  tw-font-semibold tw-hover:bg-white tw-hover:text-blue-600 tw-hover:border tw-hover:border-blue-400  tw-p-2 tw-px-6 tw-rounded-lg tw-text-white tw-bg-blue-600"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
           
          </form>
          
          <div className="">{error && <p className="tw-text-red-500 ">{error}</p>}</div>
        </div>
      </div>
      
    </div>
  );
};

export default SignIn;
