import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BiPlus } from "react-icons/bi";
import CreateAgent from "./CreateAgent";
import CreateBranch from "./CreateBranch";

const Branch = () => {
  const [users, setUsers] = useState([]);
  const [branch, setBranch] = useState([]);
  const [error, setError] = useState(null);
  const [userPage, setUserPage] = useState(1);
  const [branchPage, setBranchPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/user/branch`);
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError("Error fetching User");
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch(`/api/branch/branch`);
        const data = await response.json();
        setBranch(data);
      } catch (err) {
        setError("Error fetching Branch");
      }
    };

    fetchBranches();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`/api/user/deletebranch/${userId}`);
      if (response.data.success) {
        setUsers(users.filter((user) => user._id !== userId));
      } else {
        setError("Error deleting User");
      }
    } catch (err) {
      setError("Error deleting User");
    }
  };

  const handleDeleteBranch = async (userId) => {
    try {
      const response = await axios.delete(`/api/branch/deletebranch/${userId}`);
      if (response.data) {
        setBranch(branch.filter((branch) => branch._id !== userId));
      } else {
        setError("Error deleting Branch");
      }
    } catch (err) {
      setError("Error deleting Branch");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalBranchOpen, setIsModalBranchOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openBranchModal = () => setIsModalBranchOpen(true);
  const closeBranchModal = () => setIsModalBranchOpen(false);

  // Pagination logic for users
  const userStartIndex = (userPage - 1) * itemsPerPage;
  const userEndIndex = userStartIndex + itemsPerPage;
  const paginatedUsers = users.slice(userStartIndex, userEndIndex);

  // Pagination logic for branches
  const branchStartIndex = (branchPage - 1) * itemsPerPage;
  const branchEndIndex = branchStartIndex + itemsPerPage;
  const paginatedBranches = branch.slice(branchStartIndex, branchEndIndex);

  return (
    <div className="tw-container tw-mx-auto tw-p-4">
      <div className="tw-mt-10">
        <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
          <h2 className="tw-text-2xl tw-font-bold">Agent</h2>
          <button
            onClick={openModal}
            className="tw-flex tw-items-center tw-border-2 tw-p-1 tw-px-4 tw-border-blue-800 tw-text-blue-800"
          >
            <BiPlus className="tw-mr-1" /> Add User
          </button>
        </div>
        <table className="tw-w-full tw-bg-white tw-p-8 tw-shadow-lg">
          <thead>
            <tr className="tw-bg-blue-800 tw-text-white">
              <th className="tw-p-2 tw-text-left">Name</th>
              <th className="tw-p-2 tw-text-left">Username</th>
              <th className="tw-p-2 tw-text-left">Phone</th>
              <th className="tw-p-2 tw-text-left">Balance</th>
              <th className="tw-p-2 tw-text-left">Cut</th>
              <th className="tw-p-2 tw-text-left">Role</th>
              <th className="tw-p-2 tw-text-center">Delete</th>
              <th className="tw-p-2 tw-text-center">Edit</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((data) => (
              <tr className="tw-border-b tw-hover:bg-slate-100" key={data._id}>
                <td className="tw-p-2 tw-flex tw-items-center">
                  <img
                    src={data.avatar}
                    alt="profile"
                    className="tw-rounded-md tw-w-8 tw-h-8 tw-mr-2"
                  />
                  {data.name}
                </td>
                <td className="tw-p-2">{data.username}</td>
                <td className="tw-p-2">{data.phone}</td>
                <td className="tw-p-2">{data.balance}</td>
                <td className="tw-p-2">{data.cut}%</td>
                <td className="tw-p-2">{data.role}</td>
                <td className="tw-p-2 tw-text-center">
                  <button
                    onClick={() => handleDeleteUser(data._id)}
                    className="tw-text-red-600"
                  >
                    Delete
                  </button>
                </td>
                <td className="tw-p-2 tw-text-center">
                  <Link to={`/updateagent/${data._id}`} className="tw-text-purple-600">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="tw-flex tw-justify-center tw-mt-4">
          <button
            onClick={() => setUserPage(userPage - 1)}
            disabled={userPage === 1}
            className="tw-mr-2 tw-px-3 tw-py-1 tw-border tw-border-blue-800 tw-text-blue-800"
          >
            Previous
          </button>
          <button
            onClick={() => setUserPage(userPage + 1)}
            disabled={userEndIndex >= users.length}
            className="tw-px-3 tw-py-1 tw-border tw-border-blue-800 tw-text-blue-800"
          >
            Next
          </button>
        </div>
        {error && <p className="tw-text-red-500 tw-mt-4">{error}</p>}
      </div>

      <div className="tw-mt-10">
        <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
          <h2 className="tw-text-2xl tw-font-bold">Branch</h2>
          <button
            onClick={openBranchModal}
            className="tw-flex tw-items-center tw-border-2 tw-p-1 tw-px-4 tw-border-blue-800 tw-text-blue-800"
          >
            <BiPlus className="tw-mr-1" /> Add Branch
          </button>
        </div>
        <table className="tw-w-full tw-bg-white tw-p-8 tw-shadow-lg">
          <thead>
            <tr className="tw-bg-blue-800 tw-text-white">
              <th className="tw-p-2 tw-text-left">Name</th>
              <th className="tw-p-2 tw-text-left">Agent</th>
              <th className="tw-p-2 tw-text-left">Location</th>
              <th className="tw-p-2 tw-text-center">Delete</th>
              <th className="tw-p-2 tw-text-center">Edit</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBranches.map((data) => (
              <tr className="tw-border-b tw-hover:bg-slate-100" key={data._id}>
                <td className="tw-p-2">{data.name}</td>
                <td className="tw-p-2">{data.agent}</td>
                <td className="tw-p-2">{data.location}</td>
                <td className="tw-p-2 tw-text-center">
                  <button
                    onClick={() => handleDeleteBranch(data._id)}
                    className="tw-text-red-600"
                  >
                    Delete
                  </button>
                </td>
                <td className="tw-p-2 tw-text-center">
                  <Link to={`/updatebranch/${data._id}`} className="tw-text-purple-600">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="tw-flex tw-justify-center tw-mt-4">
          <button
            onClick={() => setBranchPage(branchPage - 1)}
            disabled={branchPage === 1}
            className="tw-mr-2 tw-px-3 tw-py-1 tw-border tw-border-blue-800 tw-text-blue-800"
          >
            Previous
          </button>
          <button
            onClick={() => setBranchPage(branchPage + 1)}
            disabled={branchEndIndex >= branch.length}
            className="tw-px-3 tw-py-1 tw-border tw-border-blue-800 tw-text-blue-800"
          >
            Next
          </button>
        </div>
        {error && <p className="tw-text-red-500 tw-mt-4">{error}</p>}
      </div>

      {isModalOpen && (
        <div className="tw-fixed tw-inset-0 tw-flex tw-justify-center tw-items-center tw-bg-gray-800 tw-bg-opacity-50">
          <div className="tw-bg-white tw-p-4 tw-rounded-md tw-shadow-lg tw-relative">
            <button
              className="tw-absolute tw-top-2 tw-right-2 tw-text-gray-800"
              onClick={closeModal}
            >
              X
            </button>
            <CreateAgent />
          </div>
        </div>
      )}

      {isModalBranchOpen && (
        <div className="tw-fixed tw-inset-0 tw-flex tw-justify-center tw-items-center tw-bg-gray-800 tw-bg-opacity-50">
          <div className="tw-bg-white tw-p-4 tw-rounded-md tw-shadow-lg tw-relative">
            <button
              className="tw-absolute tw-top-2 tw-right-2 tw-text-gray-800"
              onClick={closeBranchModal}
            >
              X
            </button>
            <CreateBranch />
          </div>
        </div>
      )}
    </div>
  );
};

export default Branch;