import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';

const CreateCredit = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const [credit, setCredit] = useState({
    amount: '',
    receiver: '',
  });

 
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { amount, receiver } = credit;

  const onChange = (e) => setCredit({ ...credit, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`/api/credit/create/${currentUser._id}`, {
        amount,
        receiver,
      });
      setLoading(false);
      alert('Credit created successfully');
      setCredit({ amount: '', receiver: '' });
    } catch (err) {
      setLoading(false);
      alert('Error creating credit');
    }
  };

  if (currentUser && currentUser.role !== 'superadmin') {
    return <h1>Unauthorized</h1>;
  }

  const [getcredit, setCreditget] = useState([]);

  useEffect(() => {
    const fetchgetCredit = async () => {
      try {
        const res = await axios.get(`/api/credit/getCredit/${currentUser.phone}`);
        setCreditget(res.data);
        
      } catch (err) {
        alert('Error fetching credit');
      }
    };

    if (currentUser) {
        fetchgetCredit();
    }
  }, [currentUser,getcredit]);

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `/api/credit/deletecredit/${userId}`
      );
    } catch (err) {
      setError("Error deleting User");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = getcredit.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(getcredit.length / itemsPerPage);

  return (
    <div className="tw-form-container ">
      <div className='tw-mb-5  tw-bg-white tw-p-6 tw-shadow-md '>
      <h1 className=' tw-text-2xl tw-text-blue-800 '>Create <span className="tw-text-primary">Credit</span></h1>
      <form onSubmit={onSubmit} className=' tw-flex tw-flex-col tw-gap-3  '>
        <div className="tw-form-group ">
          <label htmlFor="amount" className='tw-text-blue-800  '>Amount</label>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={onChange}
            required
            className='tw-ml-3 tw-p-1 '
          />
        </div>
        <div className="tw-form-group">
          <label htmlFor="toPhoneNumber" className='tw-text-blue-800 '>Recipient Phone Number</label>
          <input
            type="number"
            name="receiver"
            value={receiver}
            onChange={onChange}
            required
            className='tw-ml-3 tw-p-1 '
          />
        </div>
        <button type="submit"  className=" tw-border-none btn btn-primary btn-block tw-bg-blue-800 tw-text-white tw-p-1 tw-w-[30%] tw-px-3" disabled={loading} >{loading ? "Loading..." : "Create Credit"} </button>
      </form>
      </div>
      <div className=' mt-8'>
      <table className=" tw-rounded-md tw-text-[16px]  tw-text-sky-800 tw-bg-white   tw-px-10 tw-py-4 tw-shadow-lg  tw-border-separate tw-border-spacing-y-2 tw-min-w-[800px] ">
          
          <tr className=" tw-bg-blue-800 tw-font-semibold tw-text-white ">
            <td className="tw-p-2 tw-px-4 ">Sender </td>
            <td className="tw-p-2 tw-px-4 ">Receiver</td>
            <td className="tw-p-2 tw-px-4 ">Amount in Credit</td>
            <td className="tw-p-2 tw-px-4 ">Date</td>
           
          </tr>
                      
          {currentItems.length > 0 ? currentItems.map((getcredit) =>  (
            <tr className=" tw-hover:bg-slate-100"> 
              <td className="tw-p-2 tw-px-4 ">
                {getcredit.sender}
              </td>
              <td className="tw-p-2 tw-px-4  ">{getcredit.receiver}</td>
              <td className="tw-p-2 tw-px-4  ">{getcredit.amount}</td>
              <td className="tw-p-2 tw-px-4  ">{getcredit.createdAt}</td>
              

              <td className=" tw-p-2 tw-px-4     tw-text-red-600    tw-text-center">
                 <button
                  onClick={() => handleDeleteUser(getcredit._id)}
                  className="tw-border-red-600  tw-px-1 tw-rounded-none "
                >
                  Delete
                </button>
              </td>
              
            </tr>
          )):(
            <tr>
              <td colSpan="5" className="tw-text-center tw-p-4">No records found</td>
            </tr>
          )}
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

export default CreateCredit;