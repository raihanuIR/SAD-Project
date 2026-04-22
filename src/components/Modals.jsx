import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-md p-4 mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
          <button 
            type="button" 
            className="text-gray-400 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" 
            onClick={onClose}
          >
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {/* Body */}
        <div className="pt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
