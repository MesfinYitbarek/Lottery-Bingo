import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { updateUserStart, updateUserSuccess } from '../../redux/user/userSlice';

// InvoiceModal Component
const InvoiceModal = ({ amount, onDone, onClose }) => {
  const [cutPercentage, setCutPercentage] = useState(0);
  const [modalAmount, setModalAmount] = useState(amount);
  const [calculatedInvoiceAmount, setCalculatedInvoiceAmount] = useState(0);

  const handleGenerate = () => {
    const calculatedInvoice = (parseFloat(modalAmount) / (cutPercentage / 100)).toFixed(2);
    setCalculatedInvoiceAmount(calculatedInvoice);
  };

  const handleDone = () => {
    onDone(calculatedInvoiceAmount);
  };

  return (
    <div className="modal">
      <h2>Generate Invoice</h2>
      <div>
        <label>Cut Percentage:</label>
        <input
          type="number"
          value={cutPercentage}
          onChange={(e) => setCutPercentage(e.target.value)}
          placeholder="Enter cut percentage"
        />
      </div>
      <div>
        <label>cash:</label>
        <input
          type="number"
          value={modalAmount}
          onChange={(e) => setModalAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>
      <button onClick={handleGenerate}>Generate</button>
      <button onClick={handleDone}>Done</button>
      <button onClick={onClose}>Close</button>
      {calculatedInvoiceAmount > 0 && (
        <p>Calculated Invoice Amount: &#36; {calculatedInvoiceAmount}</p>
      )}
    </div>
  );
};

// TransferCredit Component
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
  const [showModal, setShowModal] = useState(false);

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
  }, [currentUser]);

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
  }, [currentUser]);

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
        alert('Error transferring credit');
      }
    }
  };

  const handleDoneInModal = (calculatedAmount) => {
    setCredit({ ...credit, amount: calculatedAmount });
    setShowModal(false);
  };

  // const handleDeleteUser = async (userId) => {
  //   try {
  //     await axios.delete(`/api/credit/delete/${userId}`);
  //     setGetCredit(getCredit.filter((credit) => credit._id !== userId));
  //   } catch (err) {
  //     alert("Error deleting User");
  //   }
  // };

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
            <span className="tw-mx-2">or</span>
            <button
              type="button" // Change to button type
              onClick={() => setShowModal(true)}
              className="tw-text-white tw-bg-blue-800 tw-p-0.5 tw-px-4 tw-rounded-md"
            >
              Generate Invoice
            </button>
          </div>
        </form>
      </div>
      {showModal && (
        <InvoiceModal
          amount={amount}
          onDone={handleDoneInModal}
          onClose={() => setShowModal(false)}
        />
      )}
      <div className='tw-mt-8'>
        <table className="tw-rounded-md tw-text-[16px] tw-text-sky-800 tw-bg-white tw-px-10 tw-py-4 tw-shadow-lg tw-border-separate tw-border-spacing-y-2 tw-min-w-[800px]">
          <thead>
            <tr className="tw-bg-blue-800 tw-font-semibold tw-text-white">
              <th className="tw-p-2 tw-px-4">Sender</th>
              <th className="tw-p-2 tw-px-4">Receiver</th>
              <th className="tw-p-2 tw-px-4">Amount in Credit</th>
              <th className="tw-p-2 tw-px-4">Date</th>
              {/* <th className="tw-p-2 tw-px-4">Actions</th> */}
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
                    {/* <button
                      onClick={() => handleDeleteUser(credit._id)}
                      className="tw-border-red-600 tw-px-1 tw-rounded-none tw-text-red-600"
                    >
                      Delete
                    </button> */}
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