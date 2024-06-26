import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams(); 
  
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/user/userEdit/${id}`);
        setUser(response.data);
      } catch (err) {
      
        setError("Error fetching user details");
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post(`http://localhost:4000/api/user/update/${id}`, user);
        if (response.data) {
          setError(response.data.message || "Update successfully.");
        } else {
          setError(response.data.message || "Update failed. Please try again.");
        }
      } catch (err) {
       
        setError("Error updating user. Please try again."); 
      }
  };

  return (
    <div className=" bg-slate-100 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 rounded-md shadow-md border-l-8 border-l-blue-600 bg-white">
        <h2 className="text-lg font-semibold mb-4">Edit User</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Name
            </label>
            <input
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              type="text"
              name="name"
              value={user.name || ""} 
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              type="text"
              name="username"
              value={user.username || ""} 
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              type="email"
              name="email"
              value={user.email || ""} 
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
            Phone
            </label>
            <input
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              type="text"
              name="phone"
              value={user.phone || ""} 
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
            Branch
            </label>
            <input
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              type="text"
              name="branch"
              value={user.branch || ""} 
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
            Cut
            </label>
            <input
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              type="text"
              name="cut"
              value={user.cut || ""} 
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              type="password"
              name="password"
              
              onChange={handleChange}
              
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="role">
            Role
            </label>
            <select
              name="role"
              value={user.role || ""} 
              onChange={handleChange}
              className=" dark:bg-slate-100  sm:w-[390px] rounded-lg border border-slate-300 p-2.5 "
            >
              <option value={"student"}>Student</option>
              <option value={"instructor"}>Instructor</option>
              <option value={"admin"}>Admin</option>
            </select>
          </div>
          
          
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-50"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
