import React, { useState,  useEffect } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
//import { BiCheckbox } from 'react-icons/bi';

const TransferCredit = () => {

  const { currentUser } = useSelector((state) => state.user);

  const [credit, setCredit] = useState({
    amount: '',
    toPhoneNumber: '',
  });

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/credit/${currentUser._id}/balance`);
        setBalance(res.data.balance);
      } catch (err) {
        alert('Error fetching balance');
      }
    };

    if (currentUser) {
      fetchBalance();
    }
  }, [balance,currentUser]);

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

  const { amount, receiver } = credit;

  const onChange = (e) => setCredit({ ...credit, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (parseFloat(amount) > balance) {
      alert('Insufficient balance');
    } else {
      try {
        await axios.post('http://localhost:4000/api/credit/transfer', {
          amount,
          receiver,
          sender: currentUser.phone,
        });
        alert('Credit transferred successfully');
        setCredit({ amount: '', receiver: '' });
       // To refresh the user's credit balance
      } catch (err) {
        alert('Error transferring credit');
      }
    }
  };

  return (
    <div className="form-container">
        <div className=' text-blue-800 px-10 rounded-md font-semibold mt-10 p-4 mb-10 bg-white shadow-lg'>
            <h1 className='text-blue-800 '>Current Balance</h1>
            <h1 className=' text-green-800 font-bold'>&#36; {balance} <span>Birr</span></h1>
            
        </div>
     <div className=' rounded-md bg-white p-4 px-10 shadow-lg'>

     
      <h1 className='font-semibold mb-5 text-blue-800 '>Transfer <span className="text-primary">Credit</span></h1>
      <form onSubmit={onSubmit} className=' flex flex-col gap-3'>
        <div className="form-group">
          
          <input
            type="number"
            name="amount"
            placeholder='Amount in Credit'
            value={amount}
            onChange={onChange}
            className=' rounded-md border-2 p-2.5 border-gray-400 focus:border-blue-800 px-3 text-md'
            required
          />
        </div>
        <div className="form-group">
          
          <input
            type="number"
            name="receiver"
            placeholder='Receiver Phone'
            className=' rounded-md border-2 p-2.5 border-gray-400 active:border-blue-800 px-3 text-md'
            value={receiver}
            onChange={onChange}
            required
          />
        </div>
        <div > <input  type="submit" value="Transfer" className="btn btn-primary btn-block text-white bg-blue-800 p-0.5 px-4 rounded-md" /></div>
       
      </form>
      </div>
      <div className=' mt-8'>
      <table className=" rounded-md text-[16px]  text-sky-800 bg-white   px-10 py-4 shadow-lg  border-separate border-spacing-y-2 min-w-[800px] ">
          
          <tr className=" bg-blue-800 font-semibold text-white ">
            <td className="p-2 px-4 ">Sender </td>
            <td className="p-2 px-4 ">Receiver</td>
            <td className="p-2 px-4 ">Amount in Credit</td>
            <td className="p-2 px-4 ">Date</td>
           
          </tr>
                      
          {getcredit ? getcredit.map((getcredit) =>  (
            <tr className=" hover:bg-slate-100"> 
              <td className="p-2 px-4 ">
                {getcredit.sender}
              </td>
              <td className="p-2 px-4 ">{getcredit.receiver}</td>
              <td className="p-2 px-4 ">{getcredit.amount}</td>
              <td className="p-2 px-4 ">{getcredit.createdAt}</td>
              

              <td className=" p-2 px-4    text-red-600    text-center">
                <button  >
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