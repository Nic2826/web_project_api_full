import React, { useState, useEffect } from 'react';
import PopUpWithForm from './PopUpWithForm';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [formData, setFormData] = useState({
    name: '',
    link: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', link: '' });
      setErrors({});
      setIsSubmitting(false);
      setIsValid(false);
    }
  }, [isOpen]);

  // Validation functions remain the same as in your original code
  const validateTitle = (title) => {
    if (!title || title.trim() === '') {
      return 'El título es obligatorio.';
    }
    if (title.length < 2) {
      return 'El título debe tener al menos 2 caracteres.';
    }
    if (title.length > 30) {
      return 'El título no puede tener más de 30 caracteres.';
    }
    return '';
  };

  const validateUrl = (url) => {
    if (!url || url.trim() === '') {
      return 'La URL es obligatoria.';
    }
    try {
      new URL(url);
      const validImageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
      const hasValidExtension = validImageExtensions.some(ext => 
        url.toLowerCase().endsWith(ext)
      );
      
      if (!hasValidExtension) {
        return 'La URL debe ser un enlace directo a una imagen (jpg, jpeg, png, gif, webp).';
      }
      return '';
    } catch (e) {
      return 'Por favor, introduce una URL válida.';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value
    };
    setFormData(updatedFormData);

    // Validate the changed field
    const validationError = name === 'name' 
      ? validateTitle(value)
      : validateUrl(value);

    const updatedErrors = {
      ...errors,
      [name]: validationError
    };
    setErrors(updatedErrors);

    // Check if the entire form is valid
    const formIsValid = 
      validateTitle(updatedFormData.name) === '' &&
      validateUrl(updatedFormData.link) === '';

    setIsValid(formIsValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const titleError = validateTitle(formData.name);
    const linkError = validateUrl(formData.link);

    if (titleError || linkError) {
      setErrors({
        name: titleError,
        link: linkError
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await onAddPlace({
        name: formData.name.trim(),
        link: formData.link.trim()
      });
      onClose();  // Close the modal after sending
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        submit: 'Hubo un error al crear el lugar. Por favor, inténtelo de nuevo.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PopUpWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="place-form"
      title="Nuevo Lugar"
      buttonText={isSubmitting ? "Creando..." : "Crear"}
      isValid={isValid && !isSubmitting}
    >
      <input 
        id="text-input-place" 
        className={`popup__input popup__input-place ${errors.name ? 'popup__input-error' : ''}`}
        type="text" 
        placeholder="Título"
        required 
        minLength="2" 
        maxLength="30"
        value={formData.name}
        onChange={handleInputChange}
        name="name" 
      />

      <div className="popup__line"></div>
      <span className="popup__input-error text-input-place-error">
        {errors.name}
      </span>

      <input 
        id="url-input" 
        className={`popup__input popup__input-link popup__input-place ${errors.link ? 'popup__input-error' : ''}`}
        type="url"
        placeholder="Enlace a la imagen" 
        required 
        name="link" 
        value={formData.link}
        onChange={handleInputChange}
      />

      <div className="popup__line"></div>
      <span className="popup__input-error url-input-error">
        {errors.link}
      </span>

      {errors.submit && (
        <span className="popup__input-error popup__submit-error">
          {errors.submit}
        </span>
      )}
    </PopUpWithForm>
  );
}