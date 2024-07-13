import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const AddUsers = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = React.useState([]);
  const navigate = useNavigate();
  console.log(formData);
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/branch/getbranch/${currentUser.username}`
        );
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError("Error fetching User");
      }
    };

    fetchUsers();
  }, [users]);

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
      const res = await fetch(
        `http://localhost:4000/api/user/signup/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      alert("User successfully created!")
      setLoading(false);
      setError(null);
      navigate("/admin");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="  tw-flex tw-justify-center tw-bg-slate-100 tw-items-center">
      <div className=" tw-border-t-8 tw-border-t-blue-500     tw-bg-white tw-p-[5%] tw-rounded-2xl sm:tw-w-[650px]   tw-border tw-border-slate-300  tw-m-[5%]">
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
            placeholder="Username"
            id="username"
            required
            onChange={handleChange}
            className=" tw-dark:bg-slate-100 sm:tw-w-[450px] tw-h-10 tw-rounded-lg tw-border tw-border-slate-300 p-3  focus:tw-outline-none"
          />

          <input
            type="number"
            placeholder="Phone number"
            id="phone"
            required
            onChange={handleChange}
            className=" tw-dark:bg-slate-100 sm:tw-w-[450px] tw-h-10 tw-rounded-lg tw-border tw-border-slate-300 tw-p-3"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            required
            onChange={handleChange}
            className=" tw-dark:bg-slate-100 sm:tw-w-[450px] tw-h-10 rounded-lg tw-border tw-border-slate-300 tw-p-3"
          />
          <input
            type="text"
            placeholder="Cut"
            id="cut"
            required
            onChange={handleChange}
            className=" tw-dark:bg-slate-100 sm:tw-w-[450px] tw-h-10 tw-rounded-lg tw-border tw-border-slate-300 tw-p-3  tw-focus:outline-none"
          />
          <div className=" tw-flex  tw-gap-5">
            <label htmlFor="branch" className=" tw-text-lg tw-font-bold">
              {" "}
              Branch:{" "}
            </label>

            <select
              id="branch"
              onChange={handleChange}
              className=" tw-dark:bg-slate-100  sm:tw-w-[390px] tw-rounded-lg tw-border tw-border-slate-300 tw-p-2.5 "
            >
              <option value="">Select Branch</option>
              {["admin", "employee"].includes(currentUser.role) ? (
                <option value={currentUser.branch}>{currentUser.branch}</option>
              ) : (
                users &&
                users.map((users) => (
                  <option value={users.name}>{users.name}</option>
                ))
              )}
            </select>
          </div>
          <div className=" tw-flex  tw-gap-5">
            <label htmlFor="role" className=" tw-text-lg tw-font-bold">
              {" "}
              Role:{" "}
            </label>

            <select
              id="role"
              onChange={handleChange}
              className=" tw-dark:bg-slate-100  sm:tw-w-[390px] tw-rounded-lg tw-border tw-border-slate-300 tw-p-2.5 "
            >
              <option value={"employee"}>Employee</option>
              {currentUser.role == "agent" ? (
                <option value={"admin"}>Admin</option>
              ) : (
                ""
              )}
            </select>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="sm:tw-w-[450px]  tw-font-semibold tw-hover:bg-white tw-hover:text-blue-600 tw-hover:border tw-hover:border-blue-400  tw-p-2 tw-px-6 tw-rounded-lg tw-text-white tw-bg-blue-600"
          >
            {loading ? "Loading..." : "Create User"}
          </button>
        </form>

        {error && <p className=" tw-text-red-500 tw-mt-5">{error}</p>}
      </div>
    </div>
  );
};

export default AddUsers;
