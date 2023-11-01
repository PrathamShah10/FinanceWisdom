import React, { FC, ReactNode } from 'react';
interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    children: ReactNode;
  }
const Modal: FC<ModalProps> = ({ isOpen, onRequestClose, children }) => {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 bg-white p-4 rounded-md shadow-lg">
              {children}
              <button
                onClick={onRequestClose}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default Modal;