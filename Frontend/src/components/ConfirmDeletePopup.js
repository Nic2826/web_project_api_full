import React from 'react'
import PopUpWithForm from './PopUpWithForm';

export default function ConfirmDeletePopup({ isOpen, onClose, onConfirm, card }) {
  
  function handleSubmit(e) {
    e.preventDefault();
    onConfirm(); 
  }


  return (
    <PopUpWithForm
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    name="confirm-delete"
    title="¿Estás seguro?"
    buttonText="Sí"
  >
  </PopUpWithForm>
  );
}

