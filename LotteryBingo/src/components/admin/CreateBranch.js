import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CreateBranch = () => {
  const [users, setUsers] = React.useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.id]: e.target.value,
    });
  };

  React.useEffect(() => {
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
  }, [users]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(
        `/api/branch/createbranch/${currentUser._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData }),
        }
      );

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      alert("Branch is successfully created!")
      setLoading(false);
      setError(null);
      navigate("/admin");
    } catch (error) {
      alert("Branch is not created!")
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className=" tw-flex tw-justify-center tw-items-center tw-pt-10  bg-slate-100 items-center h-screen">
      <form
        onSubmit={handleSubmit}
        action=""
        className="  tw-flex tw-flex-col tw-justify-between tw-items-center tw-gap-6 "
      >
        <input
          type="text"
          placeholder="Full Name"
          id="name"
          required
          onChange={handleChange}
          className=" tw-dark:bg-slate-100 sm:tw-w-[450px] tw-h-10 tw-rounded-lg tw-border tw-border-slate-300 p-3 focus: tw-outline-none"
        />

        <input
          type="text"
          placeholder="location"
          id="location"
          required
          onChange={handleChange}
          className=" tw-dark:bg-slate-100 sm:tw-w-[450px] tw-h-10 tw-rounded-lg tw-border tw-border-slate-300 tw-p-3  tw-focus:outline-none"
        />

        <div className=" tw-flex  tw-gap-5">
          <label htmlFor="agent" className=" tw-text-lg tw-font-bold">
            {" "}
            Agent:{" "}
          </label>
          <select
            id="agent"
        
            onChange={handleChange}
            className=" tw-dark:bg-slate-100  sm:tw-w-[390px] tw-rounded-lg tw-border tw-border-slate-300 tw-p-2.5 "
          >
            <option value="">Select Agent</option>
            {users &&
              users.map((users) => (
                <option value={users.username}>{users.username}</option>
              ))}
          </select>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="sm:tw-w-[450px]  tw-font-semibold tw-hover:bg-white tw-hover:text-blue-600 tw-hover:border tw-hover:border-blue-400  tw-p-2 tw-px-6 tw-rounded-lg tw-text-white tw-bg-blue-600"
        >
          {loading ? "Loading..." : "Create Branch"}
        </button>
      </form>
      {error && <p className=" text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default CreateBranch;
