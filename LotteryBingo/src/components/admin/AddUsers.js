
import React, { useState } from "react";

const AddUsers = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('http://localhost:4000/api/user/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
    
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="  h-screen flex justify-center bg-slate-100 items-center">
      <div className=" border-t-8 border-t-blue-500    dark:bg-gray-400 bg-white p-[5%] rounded-2xl sm:w-[650px]    border border-slate-300  m-[5%]">
       

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
            type="email"
            placeholder="Email"
            id="email"
            required
            onChange={handleChange}
            className=" dark:bg-slate-100 sm:w-[450px] h-10 rounded-lg border border-slate-300 p-3"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            required
            onChange={handleChange}
            className=" dark:bg-slate-100 sm:w-[450px] h-10 rounded-lg border border-slate-300 p-3"
          />
          <div className=" flex  gap-5">
            <label htmlFor="role" className=" text-lg font-bold">
              {" "}
              Role:{" "}
            </label>
            <select
              id="role"
              onChange={handleChange}
              className=" dark:bg-slate-100  sm:w-[390px] rounded-lg border border-slate-300 p-2.5 "
            >
              <option value={"customer"}>Customer</option>
              <option value={"admin"}>Admin</option>
            </select>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="sm:w-[450px]  font-semibold hover:bg-white hover:text-blue-600 hover:border hover:border-blue-400  p-2 px-6 rounded-lg text-white bg-blue-600"
          >
            {loading ? "Loading..." : "Create User"}
          </button>
        </form>

        {error && <p className=" text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
};

export default AddUsers;
