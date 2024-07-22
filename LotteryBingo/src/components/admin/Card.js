import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const CardForm = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const initialFormData = {
    id: "",
    branch: "",
    B: ["", "", "", "", ""],
    I: ["", "", "", "", ""],
    N: ["", "", "Free", "", ""],
    G: ["", "", "", "", ""],
    O: ["", "", "", "", ""],
  };
  const [formData, setFormData] = useState(initialFormData);

  const [superBranch, setSuperBranch] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch("/api/branch/branch");
        const data = await response.json();
        setSuperBranch(data);
      } catch (err) {
        setError("Error fetching branches");
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/branch/getbranch/${currentUser.username}`);
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError("Error fetching users");
      }
    };

    fetchBranches();
    fetchUsers();
  }, [currentUser.username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleArrayChange = (e, column, index) => {
    const { value } = e.target;
    
    // Check if the value is a valid two-digit number
    if (value !== "" && (isNaN(value) || value < 1 || value > 99)) {
      return;
    }

    const updatedColumn = [...formData[column]];
    if (column === "N" && index === 2) {
      updatedColumn[index] = "Free";
    } else {
      // Check for duplicates
      if (value !== "" && updatedColumn.includes(value)) {
        alert("This number is already used in this column!");
        return;
      }
      updatedColumn[index] = value;
    }
    setFormData({
      ...formData,
      [column]: updatedColumn,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cardData = {
      id: formData.id,
      branch: formData.branch,
      card: {
        B: formData.B.map(Number),
        I: formData.I.map(Number),
        N: formData.N.map((val) => (val === "Free" ? val : Number(val))),
        G: formData.G.map(Number),
        O: formData.O.map(Number),
      },
    };
    setLoading(true);
    try {
      await axios.post("/api/card/create", cardData);
      alert("Card created!!");
      setLoading(false);
      // Reset form after successful creation, but keep the branch
      setFormData({
        ...initialFormData,
        branch: formData.branch
      });
    } catch (error) {
      setLoading(false);
      alert("Error creating card:");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        margin: "20px",
        marginTop: "30px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "500px",
        padding: "20px",
        border: "2px solid #2a2df5",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div style={{ marginBottom: "15px" }}>
        <label style={{ marginRight: "10px" }}>ID:</label>
        <input
          type="number"
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            width: "calc(100% - 22px)",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="branch" className="tw-text-lg tw-font-bold">
          Branch:
        </label>
        <select
          name="branch"
          onChange={handleChange}
          value={formData.branch}
          className="tw-dark:bg-slate-100 sm:tw-w-[390px] tw-rounded-lg tw-border tw-border-slate-300 tw-p-2.5"
        >
          <option value="">Select Branch</option>
          {["admin", "employee"].includes(currentUser.role) ? (
            <option value={currentUser.branch}>{currentUser.branch}</option>
          ) : currentUser.role === "superadmin" ? (
            superBranch.map((branch) => (
              <option key={branch.id} value={branch.name}>
                {branch.name}
              </option>
            ))
          ) : (
            users &&
            users.map((user) => (
              <option key={user.name} value={user.name}>
                {user.name}
              </option>
            ))
          )}
        </select>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "15px",
        }}
      >
        {["B", "I", "N", "G", "O"].map((column) => (
          <div
            key={column}
            style={{ textAlign: "center", flex: "1", margin: "0 5px" }}
          >
            <label
              style={{
                fontSize: "18px",
                marginBottom: "10px",
                display: "block",
                color: "#2a2df5",
              }}
            >
              {column}
            </label>
            {formData[column].map((val, index) => (
              <input
                key={index}
                type={column === "N" && index === 2 ? "text" : "number"}
                value={column === "N" && index === 2 ? "Free" : val}
                onChange={(e) => handleArrayChange(e, column, index)}
                required
                readOnly={column === "N" && index === 2}
                min="1"
                max="99"
                style={{
                  padding: "10px",
                  marginBottom: "5px",
                  width: "100%",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  backgroundColor:
                    column === "N" && index === 2 ? "#e0e0e0" : "white",
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <button
        disabled={loading}
        type="submit"
        style={{
          padding: "10px 20px",
          backgroundColor: "#2a2df5",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          width: "100%",
          fontSize: "16px",
        }}
      >
        {loading ? "Loading..." : "Create Card"}
      </button>
      {error && <p className="tw-text-red-500 tw-mt-5">{error}</p>}
    </form>
  );
};

export default CardForm;