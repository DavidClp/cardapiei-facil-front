import React from 'react';
import './modal.scss';
import { AiOutlineClose } from 'react-icons/ai'

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={() => closeModal()}>
          <AiOutlineClose className='icon'/>
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal