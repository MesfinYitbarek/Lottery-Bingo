import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { useSelector } from "react-redux";
import AddUsers from "./AddUsers";

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/user/users/${currentUser._id}`);
        const data = await response.json();
        // alert(JSON.stringify(data, null, 2)); // This will format the JSON nicely

        setUsers(data);
      } catch (err) {
        setError("Error fetching Users");
      }
    };

    fetchUsers();
  }, [currentUser._id]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="tw-mt-10 tw-px-4 tw-py-2">
      <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
        <h2 className="tw-text-2xl tw-font-semibold tw-text-sky-900">User Management</h2>
        <button
          onClick={openModal}
          className="tw-flex tw-items-center tw-border-2 tw-p-2 tw-border-blue-800 tw-text-blue-800"
        >
          <BiPlus className="tw-mr-2" /> Add User
        </button>
      </div>
      <div className="tw-overflow-x-auto">
        <table className="tw-text-[16px] tw-text-sky-900 tw-bg-white tw-px-10 tw-py-4 tw-border-separate tw-border-spacing-y-2 tw-min-w-[800px] tw-w-full">
          <thead>
            <tr className="tw-bg-blue-800 tw-font-semibold tw-text-white">
              <th className="tw-p-2 tw-px-4">Name</th>
              <th className="tw-p-2 tw-px-4">Username</th>
              <th className="tw-p-2 tw-px-4">Phone</th>
              <th className="tw-p-2 tw-px-4">Balance</th>
              <th className="tw-p-2 tw-px-4">Cut</th>
              <th className="tw-p-2 tw-px-4">Role</th>
              <th className="tw-p-2 tw-px-4">Branch</th>
              <th className="tw-p-2 tw-px-4">Actions</th>
              <th className="tw-p-2 tw-px-4">Min Bet Amount</th>

            </tr>
          </thead>
          <tbody>
            {currentUsers.map((data) => (
              <tr key={data._id} className="tw-hover:bg-slate-100">
                <td className="tw-flex tw-gap-3 tw-items-center tw-p-2 tw-px-4">
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
                <td className="tw-p-2 tw-px-4">
                  {Array.isArray(data.branch) ? data.branch.join(", ") : data.branch}
                </td>
                <td className="tw-p-2 tw-px-4 tw-text-center">
                  <Link
                    to={`/update-user/${data._id}`}
                    className="tw-text-purple-600"
                  >
                    Edit
                  </Link>
                </td>
                <td className="tw-p-2 tw-px-4">{data.minBetAmount}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error && <p className="tw-text-red-500 tw-mt-4">{error}</p>}
      <div className="tw-flex tw-justify-center tw-items-center tw-my-4">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`tw-px-3 tw-py-1 tw-mx-1 tw-border tw-border-blue-800 tw-rounded-md ${
              currentPage === index + 1 ? "tw-bg-blue-800 tw-text-white" : "tw-bg-white tw-text-blue-800"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {isModalOpen && (
        <div className="tw-fixed tw-inset-0 tw-flex tw-justify-center tw-items-center tw-bg-gray-800 tw-bg-opacity-50 tw-z-50">
          <div className="tw-bg-white tw-p-6 tw-rounded-md tw-shadow-lg tw-relative tw-max-h-[90vh] tw-overflow-y-auto">
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