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

  const { amount, receiver } = credit;

  const onChange = (e) => setCredit({ ...credit, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:4000/api/credit/create/${currentUser._id}`, {
        amount,
        receiver,
      });
      alert('Credit created successfully');
      setCredit({ amount: '', receiver: '' });
    } catch (err) {
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
        const res = await axios.get(`http://localhost:4000/api/credit/getCredit/${currentUser.phone}`);
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
        `http://localhost:4000/api/credit/deletecredit/${userId}`
      );
    } catch (err) {
      setError("Error deleting User");
    }
  };

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
                      
          {getcredit ? getcredit.map((getcredit) =>  (
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
          )):(<div>not found</div>)}
        </table>
      </div>
    </div>
  );
};

export default CreateCredit;