import React from 'react';

const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white flex flex-col gap-2 p-6 rounded-lg shadow-lg w-4/6 max-w-lg transform transition-transform duration-500 ease-out animate-slideIn">
            {children}
        </div>
    </div>
  );
};

export default Modal;
