import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CardForm from './Card';


const Cartela = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='tw-flex tw-justify-center tw-items-center'>
      <div className='tw-mt-20 tw-rounded-md tw-bg-white tw-shadow-lg tw-p-4 tw-px-10 '>
        <div>
          <h1 className='tw-text-blue-800 tw-font-semibold tw-text-3xl tw-text-center'>Cartela Board Generator</h1>
        </div>
        <div className='tw-flex tw-gap-7 tw-mt-10'>
          <Link to={'/card'} className='tw-border-2 tw-p-1 tw-px-4 tw-border-blue-800 tw-text-blue-800'>Show Cards</Link>
          <Link to={'/generator'} className='tw-border-2 tw-p-1 tw-px-4 tw-border-blue-800 tw-text-blue-800'>Create New Board</Link>
          <button onClick={openModal} className='tw-border-2 tw-p-1 tw-px-4 tw-border-blue-800 tw-text-blue-800'>Create New Board Manually</button>
        </div>
      </div>
      {isModalOpen && (
        <div className='tw-fixed tw-inset-0 tw-flex tw-justify-center tw-items-center tw-bg-gray-800 tw-bg-opacity-50'>
          <div className='tw-bg-white tw-p-4 tw-rounded-md tw-shadow-lg tw-relative'>
            <button className='tw-absolute tw-top-2 tw-right-2 tw-text-gray-800' onClick={closeModal}>X</button>
            <CardForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cartela;