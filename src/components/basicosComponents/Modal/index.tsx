import React, {ReactNode} from 'react';
import './modal.scss';
import { AiOutlineClose } from 'react-icons/ai'
import { XCircle } from 'lucide-react';

interface Props{
  isOpen: boolean,
  closeModal: Function
  children?: ReactNode
}

const Modal = ({ isOpen, closeModal, children }: Props) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={() => closeModal()}>
          <XCircle className='icon'/>
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal