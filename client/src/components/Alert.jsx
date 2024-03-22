import React, { useState } from 'react';
import Star from './Star';

const Alert = ({ message, action, success, onConfirm, rating, rateValue }) => {
  const [show, setShow] = useState(false);

  const handleConfirm = () => {
    setShow(true); // Show the alert
    onConfirm(); // Call the onConfirm function
  };

  return (
    <div className={`${show ? '' : 'fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50'}`}>
      <div className='flex flex-col w-full mx-4 max-w-[500px] border-[0.2px] border-slate-300 bg-slate-200 duration-200 shadow-2xl py-5 dark:bg-slate-800 text-slate-800 dark:text-white rounded-lg items-center p-5'>
        <p className='text-2xl font-bold'>{message}</p>
        {rating && <Star val={rateValue} />}
        <button
          onClick={handleConfirm}
          className={`${success ? 'bg-green-500' : 'bg-red-500'} text-white p-2 px-16 m-5 rounded-lg`}
        >
          {action}
        </button>
      </div>
    </div>
  );
};

export default Alert;