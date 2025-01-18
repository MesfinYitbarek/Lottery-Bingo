import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddUsers = () => {
  const [formData, setFormData] = useState({
    role: "employee",
    branch: []
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = React.useState([]);
  const [minBetAmount, setMinBetAmount] = useState(10); // Default value set to 10

  const navigate = useNavigate();

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
  }, [currentUser.username]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleBranchChange = (branchName) => {
    if (formData.role === 'admin') {
      setFormData(prev => ({
        ...prev,
        branch: prev.branch.includes(branchName)
          ? prev.branch.filter(b => b !== branchName)
          : [...prev.branch, branchName]
      }));
    } else {
      setFormData({
        ...formData,
        branch: branchName
      });
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleRoleChange = (e) => {
    setFormData({
      ...formData,
      role: e.target.value,
      branch: e.target.value === 'admin' ? [] : ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
      if (imageFile) {
        const courseImageRef = ref(storage, `Images/${imageFile.name}`);
        await uploadBytes(courseImageRef, imageFile);
        formData.imageUrl = await getDownloadURL(courseImageRef);
      }
  
      // Convert branch array to string if role is admin
      const dataToSend = {
        ...formData,
        branch: formData.role === 'admin' ? formData.branch.join(',') : formData.branch,
        minBetAmount // Include minBetAmount in the data sent
      };
      
  
      const res = await fetch(
        `/api/user/signup/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      alert("User successfully created!");
      setLoading(false);
      setError(null);
      navigate("/admin");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  

  return (
    <div className="tw-flex tw-justify-center tw-bg-slate-100 tw-items-center">
      <div className="tw-border-t-8 tw-border-t-blue-500 tw-bg-white tw-p-[5%] tw-rounded-2xl sm:tw-w-[650px] tw-border tw-border-slate-300 tw-m-[5%]">
        <form
          onSubmit={handleSubmit}
          className="tw-flex tw-flex-col tw-justify-between tw-items-center tw-gap-6"
        >
          <input
            type="text"
            placeholder="Full Name"
            id="name"
            required
            onChange={handleChange}
            className="tw-dark:bg-slate-100 sm:tw-w-[450px] tw-h-10 tw-rounded-lg tw-border tw-border-slate-300 p-3 focus:tw-outline-none"
          />
          
          <input
            type="text"
            placeholder="Username"
            id="username"
            required
            onChange={handleChange}
            className="tw-dark:bg-slate-100 sm:tw-w-[450px] tw-h-10 tw-rounded-lg tw-border tw-border-slate-300 p-3 focus:tw-outline-none"
          />

          <input
            type="number"
            placeholder="Phone number"
            id="phone"
            required
            onChange={handleChange}
            className="tw-dark:bg-slate-100 sm:tw-w-[450px] tw-h-10 tw-rounded-lg tw-border tw-border-slate-300 tw-p-3"
          />

          <input
            type="password"
            placeholder="Password"
            id="password"
            required
            onChange={handleChange}
            className="tw-dark:bg-slate-100 sm:tw-w-[450px] tw-h-10 rounded-lg tw-border tw-border-slate-300 tw-p-3"
          />

          <input
            type="text"
            placeholder="Cut"
            id="cut"
            required
            onChange={handleChange}
            className="tw-dark:bg-slate-100 sm:tw-w-[450px] tw-h-10 tw-rounded-lg tw-border tw-border-slate-300 tw-p-3 tw-focus:outline-none"
          />

          <div className="tw-w-full tw-flex tw-flex-col tw-items-center">
            <label className="tw-block tw-text-gray-700 tw-mb-2" htmlFor="imageUrl">
              Logo Image
            </label>
            <input 
              type="file"
              id="imageUrl"
              onChange={handleFileChange}
              className="tw-w-full sm:tw-w-[450px]"
            />
          </div>

          <div className="tw-flex tw-gap-5 tw-w-full sm:tw-w-[450px]">
            <label htmlFor="role" className="tw-text-lg tw-font-bold">
              Role:
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={handleRoleChange}
              className="tw-dark:bg-slate-100 tw-flex-grow tw-rounded-lg tw-border tw-border-slate-300 tw-p-2.5"
            >
              <option value="employee">Employee</option>
              {currentUser.role === "agent" && (
                <option value="admin">Admin</option>
              )}
            </select>
          </div>

          <div className="tw-flex tw-gap-5 tw-w-full sm:tw-w-[450px]">
            <label className="tw-text-lg tw-font-bold">
              Branch:
            </label>
            <div className="tw-flex-grow">
              {formData.role === 'admin' && currentUser.role === 'agent' ? (
                <div className="tw-grid tw-grid-cols-2 tw-gap-2">
                  {users && users.map((user) => (
                    <div key={user._id} className="tw-flex tw-items-center tw-gap-2">
                      <input
                        type="checkbox"
                        id={`branch-${user._id}`}
                        checked={formData.branch.includes(user.name)}
                        onChange={() => handleBranchChange(user.name)}
                        className="tw-w-4 tw-h-4"
                      />
                      <label htmlFor={`branch-${user._id}`}>{user.name}</label>
                    </div>
                  ))}
                </div>
              ) : (
                <select
                  id="branch"
                  onChange={(e) => handleBranchChange(e.target.value)}
                  className="tw-dark:bg-slate-100 tw-w-full tw-rounded-lg tw-border tw-border-slate-300 tw-p-2.5"
                  value={formData.branch}
                >
                  <option value="">Select Branch</option>
                  {["admin", "employee"].includes(currentUser.role) && currentUser.branch ? (
                    currentUser.branch.split(',').map((branch, index) => (
                      <option key={index} value={branch}>
                        {branch}
                      </option>
                    ))
                  ) : (
                    users && users.map((user) => (
                      <option key={user._id} value={user.name}>
                        {user.name}
                      </option>
                    ))
                  )}
                </select>
              )}
            </div>

            
          </div>
          <div className="tw-flex tw-flex-col tw-items-center tw-w-full sm:tw-w-[450px]">
  <label className="tw-block tw-text-gray-700 tw-mb-2" htmlFor="minBetAmount">
    Minimum Bet Amount: {minBetAmount}
  </label>
  <input
    type="range"
    id="minBetAmount"
    min="10"
    max="100"
    step="10" // Set step to 10
    value={minBetAmount}
    onChange={(e) => setMinBetAmount(e.target.value)}
    className="tw-w-full"
  />
</div>

          <button
            disabled={loading}
            type="submit"
            className="sm:tw-w-[450px] tw-font-semibold tw-hover:bg-white tw-hover:text-blue-600 tw-hover:border tw-hover:border-blue-400 tw-p-2 tw-px-6 tw-rounded-lg tw-text-white tw-bg-blue-600"
          >
            {loading ? "Loading..." : "Create User"}
          </button>
        </form>

        {error && <p className="tw-text-red-500 tw-mt-5">{error}</p>}
      </div>
    </div>
  );
};

export default AddUsers;