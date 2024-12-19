import React, { useState, useEffect, useRef } from 'react';
import PopUpWithForm from './PopUpWithForm';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = useRef();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (isOpen) {
      inputRef.current.value = '';  // Limpiar el campo cuando se abra el modal
      setError('');  // Limpiar cualquier error previo
      setIsSubmitting(false);  // Deshabilitar estado de envío
      setIsValid(false);  // Deshabilitar el botón al abrir el modal
    }
  }, [isOpen]);

  const validateUrl = (url) => {
    if (!url || url.trim() === '') {
      return 'La URL es obligatoria.';
    }

    try {
      const urlObject = new URL(url);
      const validImageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
      const hasValidExtension = validImageExtensions.some(ext => 
        urlObject.pathname.toLowerCase().endsWith(ext)
      );
      
      if (!hasValidExtension) {
        return 'La URL debe ser un enlace directo a una imagen (jpg, jpeg, png, gif, webp).';
      }
      
      return '';  // Si la URL es válida, no hay error
    } catch (e) {
      return 'Por favor, introduce una URL válida.';
    }
  };

  const handleInputChange = (e) => {
    const url = e.target.value;
    const validationError = validateUrl(url);
    setError(validationError);

    // Actualizar el estado isValid solo si no hay error de validación
    setIsValid(validationError === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = inputRef.current.value.trim();
    const validationError = validateUrl(url);
    
    if (validationError) {
      setError(validationError);  // Establecer el error si la URL no es válida
      return;
    }

    try {
      setIsSubmitting(true);  // Activar estado de envío
      setError('');  // Limpiar cualquier error previo
      
      // Enviar la URL como una cadena simple
      await onUpdateAvatar(url);
      onClose();
    } catch (err) {
      console.error('Error updating avatar:', err);
      setError('Hubo un error al actualizar el avatar. Asegúrate de que la URL sea válida y accesible.');
    } finally {
      setIsSubmitting(false);  // Deshabilitar estado de envío
    }
  };

  return (
    <PopUpWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="avatar-form"
      title="Cambiar Foto de Perfil"
      buttonText={isSubmitting ? "Guardando..." : "Guardar"}
      isValid={isValid && !isSubmitting}  // El botón solo estará habilitado si es válido y no se está enviando
    >
      <input 
        id="url-avatar-input" 
        className={`popup__input popup__input-avatar ${error ? 'popup__input-error' : ''}`}
        type="url"
        placeholder="Enlace a la imagen de perfil" 
        ref={inputRef}
        onChange={handleInputChange}
        required 
        name="avatarLink"
      />

      <div className="popup__line"></div>
      <span className="popup__input-error url-input-error">
        {error}
      </span>
    </PopUpWithForm>
  );
}
