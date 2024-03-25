import React, { useState } from 'react';
import Star from './Star';
import { MdOutlineCancel } from 'react-icons/md';

const Alert = ({ message, action, success, onConfirm, rating, rateValue }) => {
  const [show, setShow] = useState(false);

  const handleConfirm = () => {
    setShow(true); // Show the alert
    onConfirm(); // Call the onConfirm function
  };

  return (
    <div className={`${show ? 'hidden' : 'fixed inset-0 flex z-50 items-center justify-center bg-gray-500 bg-opacity-50'}`}>
      <div className='flex relative flex-col w-full items-center justify-center mx-4 max-w-[500px] border-[0.2px] border-slate-300 bg-slate-200 duration-200 shadow-2xl py-5 dark:bg-slate-800 text-slate-800 dark:text-white rounded-lg  p-5'>
        {success ? " " : (
          <button className='absolute right-2 top-2 text-slate-800 dark:text-slate-200' onClick={()=>setShow(true)}><MdOutlineCancel size={30}/></button>
        )}
        <p className='text-2xl font-bold text-center'>{message}</p>
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