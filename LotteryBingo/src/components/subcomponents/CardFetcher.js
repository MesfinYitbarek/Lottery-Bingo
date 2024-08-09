// components/CardFetcher.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import BingoCard from "./BingoCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import QRCode from "qrcode.react";
import { storage } from '../../firebase'; // Import Firebase storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CardFetcher = ({ selectedCards }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState(null);
  const [branch, setBranch] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showQRModal, setShowQRModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [file, setFile] = useState(null);
  const qrRef = useRef(); // Reference to the QR code component

  useEffect(() => {
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

  const [superBranch, setSuperBranch] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch(`/api/branch/branch`);
        const data = await response.json();
        setSuperBranch(data);
      } catch (err) {
        setError("Error fetching Branches");
      }
    };

    fetchBranches();
  }, []);

  const fetchCards = async (branch) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/card/getCards?branch=${branch}`);
      setCards(response.data);
    } catch (error) {
      setError("Failed to fetch cards");
    } finally {
      setLoading(false);
    }
  };

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  const handleSearch = () => {
    if (branch) {
      fetchCards(branch);
    } else {
      setError("Please select a branch");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/card/deletecard/${userId}`);
      fetchCards(branch); // Refetch cards after deleting
    } catch (err) {
      setError("Error deleting card");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleGenerateQR = async () => {
    if (file) {
      setLoading2(true);
    
      try {
        const storageRef = ref(storage, `${file.name}`); // Create a reference for the file
        await uploadBytes(storageRef, file); // Upload the file to Firebase Storage

        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);
        setPdfUrl(downloadURL); // Set the PDF URL for the QR code
        setShowQRModal(true);
        setLoading2(false); // Show the QR modal
      } catch (error) {
        setError("Failed to generate QR code");
        setLoading2(false);
      }
    } else {
      setError("Please upload a PDF file");
      setLoading2(false);
    }
  };

  const handleCloseQRModal = () => {
    setShowQRModal(false);
    setFile(null); // Reset file state
  };

  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const pngUrl = canvas.toDataURL("image/png");

    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "QRCode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="tw-bg-gray-100 tw-min-h-screen">
      <div className="tw-pt-7 tw-items-center tw-flex-col tw-justify-center tw-text-center branch-input">
        <Link to="/admin" className="tw-border-2 tw-p-1 tw-px-4 tw-border-blue-800 tw-text-blue-800">
          Back 
        </Link>
        <label htmlFor="branch" className="tw-text-lg tw-font-bold">
          Branch:{" "}
        </label>
        <select
          id="branch"
          onChange={handleBranchChange}
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
              <option key={user.id} value={user.name}>{user.name}</option>
            ))
          )}
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading cards...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div className="row card-block justify-center margin-vertical-lg">
          <div className="col text-center">
            {cards.map((cardData, index) => (
              <div key={index} className="card blue tw-text-blue-800">
                <button
                  onClick={() => handleDeleteUser(cardData._id)}
                  className="tw-border-red-600 tw-text-red-600 tw-px-1 tw-rounded-none"
                >
                  Delete
                </button>
                <h3>Branch: {cardData.branch}</h3>
                <h3>Card ID: {cardData.id}</h3>
                <BingoCard card={cardData.card} color="blue" />
              </div>
            ))}
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button onClick={handleGenerateQR} >{loading2 ? "generating..." : "generate"}</button>
          </div>
        </div>
      )}

      {showQRModal && (
        <div className="modal">
          <div className="modal-content" ref={qrRef}>
            <button className="close" onClick={handleCloseQRModal}>
              close
            </button>
            <h2>Scan the QR code to access the PDF</h2>
            <QRCode value={pdfUrl} />
            <button onClick={downloadQRCode}>Download QR Code</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardFetcher;
