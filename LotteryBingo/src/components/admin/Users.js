import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BiPlus } from "react-icons/bi";
import { useSelector } from "react-redux";
import AddUsers from "./AddUsers";

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/user/users/${currentUser._id}`);
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError("Error fetching User");
      }
    };

    fetchUsers();
  }, [currentUser._id]); // Only re-run when currentUser._id changes

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`/api/user/delete/${userId}`);
      if (response.data) {
        setUsers(users.filter((user) => user._id !== userId));
      } else {
        setError("Error filtering User");
      }
    } catch (err) {
      setError("Error deleting User");
    }
  };

  return (
    <div className="tw-mt-10">
      <table className="tw-text-[16px] tw-text-sky-900 tw-bg-white tw-px-10 tw-py-4 tw-border-separate tw-border-spacing-y-2 tw-min-w-[800px]">
        <thead>
          <tr>
            <th colSpan="8" className="tw-text-center">
              <button
                onClick={openModal}
                className="tw-border-2 tw-p-1 tw-px-4 tw-border-blue-800 tw-text-blue-800"
              >
                <BiPlus /> Add User
              </button>
            </th>
          </tr>
          <tr className="tw-bg-blue-800 tw-font-semibold tw-text-white">
            <th className="tw-p-2 tw-px-4">Name</th>
            <th className="tw-p-2 tw-px-4">Username</th>
            <th className="tw-p-2 tw-px-4">Phone</th>
            <th className="tw-p-2 tw-px-4">Balance</th>
            <th className="tw-p-2 tw-px-4">Cut</th>
            <th className="tw-p-2 tw-px-4">Role</th>
            <th className="tw-p-2 tw-px-4">Branch</th>
            <th className="tw-p-2 tw-px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((data) => (
              <tr key={data._id} className="tw-hover:bg-slate-100">
                <td className="tw-flex tw-gap-3 tw-items-center">
                  <img
                    src={data.avatar}
                    alt="profile"
                    className="tw-rounded-md tw-w-8 tw-h-8"
                  />
                  {data.name}
                </td>
                <td className="tw-p-2 tw-px-4">{data.username}</td>
                <td className="tw-p-2 tw-px-4">{data.phone}</td>
                <td className="tw-p-2 tw-px-4">{data.balance}</td>
                <td className="tw-p-2 tw-px-4">{data.cut}%</td>
                <td className="tw-p-2 tw-px-4">{data.role}</td>
                <td className="tw-p-2 tw-px-4">{data.branch}</td>
                <td className="tw-p-2 tw-px-4 tw-text-center">
                  <button
                    onClick={() => handleDeleteUser(data._id)}
                    className="tw-border-red-600 tw-px-1 tw-rounded-none tw-text-red-600"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/update-user/${data._id}`}
                    className="tw-text-purple-600 tw-ml-2"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {error && <p className="tw-text-red-500">{error}</p>}
      {isModalOpen && (
        <div className="tw-absolute tw-top-4 tw-inset-0 tw-flex tw-justify-center tw-items-center tw-bg-gray-800 tw-bg-opacity-50">
          <div className="tw-bg-white tw-p-4 tw-rounded-md tw-shadow-lg tw-relative">
            <button
              className="tw-absolute tw-top-2 tw-right-2 tw-text-gray-800"
              onClick={closeModal}
            >
              X
            </button>
            <AddUsers />
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;