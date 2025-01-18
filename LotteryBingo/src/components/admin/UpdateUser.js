import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditUser = () => {
  const { id } = useParams();

  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const { currentUser } = useSelector((state) => state.user);
  const [minBetAmount, setMinBetAmount] = useState(10); // Default value set to 10

  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `/api/branch/getbranch/${currentUser.username}`
        );
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError("Error fetching User");
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/user/userEdit/${id}`);
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

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedFields = { 
        ...user,
        minBetAmount,
     // Include minBetAmount in updatedFields
      };
      // Check if the password field has been updated
      if (!updatedFields.password) {
        delete updatedFields.password; // If password is empty, remove it from the updatedFields object
      }
  
      if (imageFile) {
        const userImageRef = ref(storage, `Images/${imageFile.name}`);
        await uploadBytes(userImageRef, imageFile);
        updatedFields.imageUrl = await getDownloadURL(userImageRef);
      }
  
      const response = await axios.post(
        `/api/user/update/${id}`,
        updatedFields
      );
      if (response.data) {
        setError(response.data.message || "Update successfully.");
        await axios.post(`/api/user/updateMinBet/${id}`, { minBetAmount });
      } else {
        setError(response.data.message || "Update failed. Please try again.");
      }
    } catch (err) {
      setError("Error updating user. Please try again.");
    }
  };
  

  const renderBranchOptions = (branchString) => {
    return branchString.split(",").map((branch, index) => (
      <option key={index} value={branch}>
        {branch}
      </option>
    ));
  };

  return (
    <div className=" tw-bg-slate-100 tw-flex tw-justify-center tw-items-center tw-min-h-screen">
      <div className="tw-w-full tw-max-w-md tw-p-8 tw-rounded-md tw-shadow-md tw-border-l-8 tw-border-l-blue-600 tw-bg-white">
        <h2 className="tw-text-lg tw-font-semibold tw-mb-4">Edit User</h2>
        {error && <p className="tw-text-red-500 tw-mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="tw-mb-4">
            <label
              className="tw-block tw-text-gray-700 tw-mb-2"
              htmlFor="username"
            >
              Name
            </label>
            <input
              className="tw-w-full tw-px-3 tw-py-2 tw-rounded-md tw-border tw-border-gray-300 tw-focus:outline-none tw-focus:ring tw-focus:ring-purple-500 tw-focus:ring-opacity-50"
              type="text"
              name="name"
              value={user.name || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="tw-mb-4">
            <label
              className="tw-block tw-text-gray-700 tw-mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="tw-w-full tw-px-3 tw-py-2 tw-rounded-md tw-border tw-border-gray-300 tw-focus:outline-none tw-focus:ring tw-focus:ring-purple-500 tw-focus:ring-opacity-50"
              type="text"
              name="username"
              value={user.username || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="tw-mb-4">
            <label
              className="tw-block tw-text-gray-700 tw-mb-2"
              htmlFor="username"
            >
              Phone
            </label>
            <input
              className="tw-w-full tw-px-3 tw-py-2 tw-rounded-md tw-border tw-border-gray-300 tw-focus:outline-none tw-focus:ring tw-focus:ring-purple-500 tw-focus:ring-opacity-50"
              type="number"
              name="phone"
              value={user.phone || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="tw-mb-4">
            <label
              className="tw-block tw-text-gray-700 tw-mb-2"
              htmlFor="username"
            >
              Branch
            </label>
            <select
              id="branch"
              name="branch"
              onChange={handleChange}
              className="tw-dark:bg-slate-100 sm:tw-w-[390px] tw-rounded-lg tw-border tw-border-slate-300 tw-p-2.5"
            >
              <option value="">Select Branch</option>
              {["admin", "employee"].includes(currentUser.role)
                ? renderBranchOptions(currentUser.branch)
                : users &&
                  users.map((user) => (
                    <option key={user.name} value={user.name}>
                      {user.name}
                    </option>
                  ))}
            </select>
          </div>
          <div className="tw-mb-4">
            <label
              className="tw-block tw-text-gray-700 tw-mb-2"
              htmlFor="username"
            >
              Cut
            </label>
            <input
              className="tw-w-full tw-px-3 tw-py-2 tw-rounded-md tw-border tw-border-gray-300 tw-focus:outline-none tw-focus:ring tw-focus:ring-purple-500 tw-focus:ring-opacity-50"
              type="text"
              name="cut"
              value={user.cut || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="tw-mb-4">
            <label
              className="tw-block tw-text-gray-700 tw-mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="tw-w-full tw-px-3 tw-py-2 tw-rounded-md tw-border tw-border-gray-300 tw-focus:outline-none tw-focus:ring tw-focus:ring-purple-500 tw-focus:ring-opacity-50"
              type="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="tw-mb-4">
            <label className="tw-block tw-text-gray-700 tw-mb-2" htmlFor="role">
              Role
            </label>
            <select
              name="role"
              value={user.role || ""}
              onChange={handleChange}
              className=" tw-dark:bg-slate-100  tw-sm:w-[390px] tw-rounded-lg tw-border tw-border-slate-300 tw-p-2.5 "
            >
              <option value={"employee"}>Employee</option>
              {currentUser.role === "agent" && (
                <option value={"admin"}>Admin</option>
              )}
            </select>
          </div>
          <div className="tw-mb-4">
            <label
              className="tw-block tw-text-gray-700 tw-mb-2"
              htmlFor="imageUrl"
            >
              Logo Image
            </label>
            <input
              type="file"
              id="imageUrl"
              onChange={handleFileChange}
              className="tw-w-full tw-px-3 tw-py-2 tw-rounded-md tw-border tw-border-gray-300 tw-focus:outline-none tw-focus:ring tw-focus:ring-purple-500 tw-focus:ring-opacity-50"
            />
          </div>
          <div className="tw-mb-4">
  <label className="tw-block tw-text-gray-700 tw-mb-2" htmlFor="minBetAmount">
    Minimum Bet Amount: {minBetAmount}
  </label>
  <input
    type="range"
    id="minBetAmount"
    min="10"
    max="100"
    step="5" // Set step to 10
    value={minBetAmount}
    onChange={(e) => setMinBetAmount(e.target.value)}
    className="tw-w-full"
  />
</div>

          <div className="tw-flex tw-justify-end tw-mt-4">
            
            <button
              type="submit"
              className="tw-px-4 tw-py-2 tw-bg-blue-600 tw-text-white tw-rounded-md tw-hover:bg-blue-700 tw-focus:outline-none tw-focus:ring tw-focus:ring-purple-500 tw-focus:ring-opacity-50"
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
