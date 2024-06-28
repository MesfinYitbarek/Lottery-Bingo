import React, { useState } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';

const CreateCredit = () => {

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

  return (
    <div className="tw-form-container">
      <h1>Create <span className="tw-text-primary">Credit</span></h1>
      <form onSubmit={onSubmit}>
        <div className="tw-form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={onChange}
            required
          />
        </div>
        <div className="tw-form-group">
          <label htmlFor="toPhoneNumber">Recipient Phone Number</label>
          <input
            type="number"
            name="receiver"
            value={receiver}
            onChange={onChange}
            required
          />
        </div>
        <input type="submit" value="Create Credit" className="btn btn-primary btn-block" />
      </form>
    </div>
  );
};

export default CreateCredit;