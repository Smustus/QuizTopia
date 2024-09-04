import React from 'react';
import './ConfirmModal.css'

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const ConfirmModal: React.FC<ConfirmDeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this quiz?</p>
        <section>
          <button onClick={onClose}>Cancel</button>
          <button className='modalDeleteBtn' onClick={onConfirm}>Delete</button>
        </section>
      </div>
    </div>
  );
};