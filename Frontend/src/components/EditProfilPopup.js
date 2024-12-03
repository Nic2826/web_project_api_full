import React, { useState, useContext, useEffect } from 'react';
import PopUpWithForm from './PopUpWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilPopup({ isOpen, onClose, onUpdateUser }) {
  const [formData, setFormData] = useState({
    name: '',
    about: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (isOpen && currentUser?.name && currentUser?.about) {
      setFormData({
        name: currentUser.name,
        about: currentUser.about
      });
      setErrors({});
    }
  }, [isOpen, currentUser]);

  const validateField = (name, value) => {
    if (!value || value.trim() === '') {
      return 'Este campo es obligatorio.';
    }
    if (value.length < 2) {
      return `El campo ${name} debe tener al menos 2 caracteres.`;
    }
    if (value.length > 30) {
      return `El campo ${name} no puede tener más de 30 caracteres.`;
    }

    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {
      name: validateField('name', formData.name),
      about: validateField('about', formData.about)
    };
    
    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onUpdateUser(formData);
      onClose();
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'Hubo un error al actualizar el perfil. Por favor, inténtelo de nuevo.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = !Object.values(errors).some(error => error) && 
                 formData.name.length >= 2 && 
                 formData.about.length >= 2;

  return (
    <PopUpWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      name="profile-form"
      title="Editar Perfil"
      buttonText={isSubmitting ? "Guardando..." : "Guardar"}
      isValid={isValid}
    >
      <input 
        id="text-input-name" 
        className={`popup__input popup__input-name ${errors.name ? 'popup__input-error' : ''}`}
        type="text" 
        placeholder="Nombre"
        required 
        minLength="2" 
        maxLength="40" 
        name="name" 
        onChange={handleChange}
        value={formData.name}
      />
      <div className="popup__line"></div>
      <span className="popup__input-error text-input-name-error">
        {errors.name}
      </span>

      <input 
        id="text-input-about" 
        className={`popup__input popup__input-about ${errors.about ? 'popup__input-error' : ''}`} 
        type="text" 
        placeholder="Acerca de mí"
        required 
        minLength="2" 
        maxLength="200" 
        name="about" 
        onChange={handleChange}
        value={formData.about}
      />
      <div className="popup__line"></div>
      <span className="popup__input-error">
        {errors.about}
      </span>

      {errors.submit && (
        <span className="popup__input-error popup__submit-error">
          {errors.submit}
        </span>
      )}
    </PopUpWithForm>
  );
}