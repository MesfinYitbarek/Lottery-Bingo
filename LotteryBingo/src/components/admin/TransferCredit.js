import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import { updateUserStart, updateUserSuccess } from '../../redux/user/userSlice';


const TransferCredit = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
 
  const [credit, setCredit] = useState({
    amount: '',
    receiver: '',
  });

  const [balance, setBalance] = useState(0);

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
  }, [currentUser,balance]);

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

  const { amount, receiver } = credit;

  const onChange = (e) => setCredit({ ...credit, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (parseFloat(amount) > balance) {
      alert('Insufficient balance');
    } else {
      updateUserStart();
      setLoading(true);
      try {
        await axios.post("/api/credit/transfer", {
          amount,
          receiver: receiver,
          sender: currentUser.phone,
        });
        updateUserSuccess({ ...currentUser, balance: balance - amount });
        alert('Credit transferred successfully');
        setCredit({ amount: '', receiver: '' });
        setLoading(false);// To refresh the user's credit balance
      } catch (err) {
        setLoading(false);
        alert('Error transferring credit');
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `/api/credit/delete/${userId}`
      );
    } catch (err) {
      alert("Error deleting User");
    }
  };

  return (
    <div className="">
        <div className='tw-text-blue-800 tw-px-10 tw-rounded-md tw-font-semibold tw-mt-10 tw-p-4 tw-mb-10 tw-bg-white tw-shadow-lg'>
            <h1 className='tw-text-blue-800 tw-text-2xl '>Current Balance</h1>
            <h1 className='tw-text-green-800 tw-text-2xl tw-font-bold'>&#36; {balance} <span>Birr</span></h1>
            
        </div>
     <div className=' tw-rounded-md tw-bg-white tw-p-4 tw-px-10 tw-shadow-lg'>

     
      <h1 className='tw-font-semibold tw-mb-5 tw-text-2xl tw-text-blue-800 '>Transfer <span className="text-primary">Credit</span></h1>
      <form onSubmit={onSubmit} className=' tw-flex tw-flex-col tw-gap-3'>
        <div className="">
          
          <input
            type="number"
            name="amount"
            placeholder='Amount in Credit'
            value={amount}
            onChange={onChange}
            className=' tw-rounded-md tw-border-2 tw-p-2.5 tw-border-gray-400 focus:border-blue-800 tw-px-3 tw-text-md'
            required
          />
        </div>
        <div className="form-group">
          
          <input
            type="number"
            name="receiver"
            placeholder='Receiver Phone'
            className=' tw-rounded-md tw-border-2 tw-p-2.5 tw-border-gray-400 active:border-blue-800 tw-px-3 tw-text-md'
            value={receiver}
            onChange={onChange}
            required
          />
        </div>
        <div > <button  type="submit" className="btn btn-primary btn-block tw-text-white tw-bg-blue-800 tw-p-0.5 tw-px-4 tw-rounded-md" disabled={loading} >{loading ? "Loading..." : "Transfer"}  </button></div>
       
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
  )
}

export default TransferCredit
