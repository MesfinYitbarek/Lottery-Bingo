import React, { useState, useEffect } from 'react';
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
  }, [currentUser,balance]);

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

  const { amount, toPhoneNumber } = credit;

  const onChange = (e) => setCredit({ ...credit, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (parseFloat(amount) > balance) {
      alert('Insufficient balance');
    } else {
      try {
        await axios.post('http://localhost:4000/api/credit/transfer', {
          amount,
          receiver: toPhoneNumber,
          sender: currentUser.phone,
        });
        alert('Credit transferred successfully');
        setCredit({ amount: '', toPhoneNumber: '' });
       // To refresh the user's credit balance
      } catch (err) {
        alert('Error transferring credit');
      }
    }
  };

  return (
    <div className="tw-form-container">
        <div className='tw-text-blue-800 tw-px-10 tw-rounded-md tw-font-semibold tw-mt-10 tw-p-4 tw-mb-10 tw-bg-white tw-shadow-lg'>
            <h1 className='tw-text-blue-800 '>Current Balance</h1>
            <h1 className='tw-text-green-800 tw-font-bold'>&#36; {balance} <span>Birr</span></h1>
            
        </div>
     <div className='tw-rounded-md tw-bg-white tw-p-4 tw-px-10 tw-shadow-lg'>
       <form className='tw-flex tw-flex-col tw-gap-4' onSubmit={onSubmit}>
          <div className='tw-flex tw-flex-col'>
              <label htmlFor='amount' className='tw-text-blue-800 tw-font-bold'>Amount</label>
              <input 
                type='number' 
                id='amount'
                name='amount'
                className='tw-border tw-border-slate-300 tw-rounded-lg tw-py-2 tw-px-3'
                value={amount}
                onChange={onChange} 
                required 
              />
          </div>
          <div className='tw-flex tw-flex-col'>
              <label htmlFor='toPhoneNumber' className='tw-text-blue-800 tw-font-bold'>To Phone Number</label>
              <input 
                type='text' 
                id='toPhoneNumber'
                name='toPhoneNumber'
                className='tw-border tw-border-slate-300 tw-rounded-lg tw-py-2 tw-px-3'
                value={toPhoneNumber}
                onChange={onChange} 
                required 
              />
          </div>
          <button type='submit' className='tw-bg-blue-800 tw-text-white tw-rounded-lg tw-p-2 tw-hover:bg-blue-700 tw-cursor-pointer'>Transfer Credit</button>
       </form>
     </div>
    </div>
  )
}

export default TransferCredit
