import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { updateUserStart, updateUserSuccess } from '../../redux/user/userSlice';

const TransferCredit = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
 
  const [credit, setCredit] = useState({
    amount: '',
    receiver: '',
  });

  const [balance, setBalance] = useState(0);
  const [getCredit, setGetCredit] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await axios.get(`/api/credit/${currentUser._id}/balance`);
        setBalance(res.data.balance);
      } catch (err) {
        alert('Error fetching balance');
      }
    };

    if (currentUser) {
      fetchBalance();
    }
  }, [currentUser, balance]);

  useEffect(() => {
    const fetchGetCredit = async () => {
      try {
        const res = await axios.get(`/api/credit/getCredit/${currentUser.phone}`);
        setGetCredit(res.data);
      } catch (err) {
        alert('Error fetching credit');
      }
    };

    if (currentUser) {
      fetchGetCredit();
    }
  }, [currentUser, getCredit]);

  const { amount, receiver } = credit;

  const onChange = (e) => setCredit({ ...credit, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (parseFloat(amount) > balance) {
      alert('Insufficient balance');
    } else {
      dispatch(updateUserStart());
      setLoading(true);
      try {
        await axios.post("/api/credit/transfer", {
          amount,
          receiver: receiver,
          sender: currentUser.phone,
        });
        dispatch(updateUserSuccess({ ...currentUser, balance: balance - amount }));
        alert('Credit transferred successfully');
        setCredit({ amount: '', receiver: '' });
        setLoading(false);
      } catch (err) {
        setLoading(false);
        
        const errorMessage = 'Error transferring credit: ' + (err.response ? err.response.data : 'Unknown error');
        
        // Display an alert modal
        showAlertModal(errorMessage);
      }
      
      // Function to display the alert modal
      const showAlertModal = (message) => {
        // Create the modal element
        const modal = document.createElement('div');
        modal.classList.add('modal');
        
        // Create the modal content
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        
        // Create the message element
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        
        // Create the close button
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.addEventListener('click', () => {
          modal.remove();
        });
        
        // Append the message and close button to the modal content
        modalContent.appendChild(messageElement);
        modalContent.appendChild(closeButton);
        
        // Append the modal content to the modal
        modal.appendChild(modalContent);
        
        // Append the modal to the document body
        document.body.appendChild(modal);
      };
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/credit/delete/${userId}`);
      setGetCredit(getCredit.filter((credit) => credit._id !== userId));
    } catch (err) {
      alert("Error deleting User");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = getCredit.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(getCredit.length / itemsPerPage);

  return (
    <div className="tw-px-4 tw-py-2 tw-mt-10">
      <div className='tw-text-blue-800 tw-px-10 tw-rounded-md tw-font-semibold tw-mt-10 tw-p-4 tw-mb-10 tw-bg-white tw-shadow-lg'>
        <h1 className='tw-text-blue-800 tw-text-2xl'>Current Balance</h1>
        <h1 className='tw-text-green-800 tw-text-2xl tw-font-bold'>&#36; {balance} <span>Birr</span></h1>
      </div>
      <div className='tw-rounded-md tw-bg-white tw-p-4 tw-px-10 tw-shadow-lg'>
        <h1 className='tw-font-semibold tw-mb-5 tw-text-2xl tw-text-blue-800'>Transfer <span className="text-primary">Credit</span></h1>
        <form onSubmit={onSubmit} className='tw-flex tw-flex-col tw-gap-3'>
          <div className="">
            <input
              type="number"
              name="amount"
              placeholder='Amount in Credit'
              value={amount}
              onChange={onChange}
              className='tw-rounded-md tw-border-2 tw-p-2.5 tw-border-gray-400 focus:border-blue-800 tw-px-3 tw-text-md'
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="receiver"
              placeholder='Receiver Phone'
              className='tw-rounded-md tw-border-2 tw-p-2.5 tw-border-gray-400 active:border-blue-800 tw-px-3 tw-text-md'
              value={receiver}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="tw-text-white tw-bg-blue-800 tw-p-0.5 tw-px-4 tw-rounded-md"
              disabled={loading}
            >
              {loading ? "Loading..." : "Transfer"}
            </button>
          </div>
        </form>
      </div>
      <div className='tw-mt-8'>
        <table className="tw-rounded-md tw-text-[16px] tw-text-sky-800 tw-bg-white tw-px-10 tw-py-4 tw-shadow-lg tw-border-separate tw-border-spacing-y-2 tw-min-w-[800px]">
          <thead>
            <tr className="tw-bg-blue-800 tw-font-semibold tw-text-white">
              <th className="tw-p-2 tw-px-4">Sender</th>
              <th className="tw-p-2 tw-px-4">Receiver</th>
              <th className="tw-p-2 tw-px-4">Amount in Credit</th>
              <th className="tw-p-2 tw-px-4">Date</th>
              <th className="tw-p-2 tw-px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((credit) => (
                <tr key={credit._id} className="tw-hover:bg-slate-100">
                  <td className="tw-p-2 tw-px-4">{credit.sender}</td>
                  <td className="tw-p-2 tw-px-4">{credit.receiver}</td>
                  <td className="tw-p-2 tw-px-4">{credit.amount}</td>
                  <td className="tw-p-2 tw-px-4">{new Date(credit.createdAt).toLocaleString()}</td>
                  <td className="tw-p-2 tw-px-4 tw-text-center">
                    <button
                      onClick={() => handleDeleteUser(credit._id)}
                      className="tw-border-red-600 tw-px-1 tw-rounded-none tw-text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="tw-text-center tw-p-4">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="tw-flex tw-justify-center tw-mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`tw-px-3 tw-py-1 tw-mx-1 ${currentPage === index + 1 ? 'tw-bg-blue-800 tw-text-white' : 'tw-bg-gray-200 tw-text-gray-800'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransferCredit;