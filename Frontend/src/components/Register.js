import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import InfoTooltip from './InfoTooltip';
import Test from './Test';
import { register } from '../utils/auth';

export default function Register() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isHeaderClicked, setIsHeaderClicked] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  useEffect(() => {
    if (currentUser.email !== undefined && currentUser.password !== undefined) {
      setEmail(currentUser.email);
      setPassword(currentUser.password);
    }
  }, [currentUser]);

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function closePopup() {
   setIsInfoTooltipOpen(false);
   navigate('/');
  }
  
  async function handleSubmit(e) {
    // Evita que el navegador navegue hacia la dirección del formulario
    e.preventDefault();

    try {
      await register(email, password);
      setError(false);
      setIsInfoTooltipOpen(true);
    }
    catch (err) {
      setError(true);
    }
  }

  function handleChangeRoute() {
    navigate('/signin');
    setIsHeaderClicked(true);
    console.log('clicked on login');
  }

  return (
    <Test
      headerTitle="Iniciar Sesión"
      authTitle="Regístrate"
      onSubmit={handleSubmit}
      buttonText="Regístrate"
      authFooter="¿Ya eres miembro? Inicia sesión aquí"
      onClick={handleChangeRoute}
      isHeaderClicked={isHeaderClicked}
    >

      <input
        className="auth__label"
        type="email"
        placeholder="Correo Electrónico"
        name="email"
        value={email}
        onChange={handleChangeEmail}
        required
      />

      <div className="popup__line"></div>
      <span className="popup__input-error text-input-name-error"></span>

      <input
        className="auth__label"
        type="text"
        placeholder="Contraseña"
        name="contraseña"
        value={password}
        onChange={handleChangePassword}
        required
      />
      <div className="popup__line"></div>
      <span className="popup__input-error text-input-name-error"></span>

      {error && <span className="error-message">Este usuario ya existe</span>}

      <InfoTooltip 
        isOpen={isInfoTooltipOpen} 
        onClose={closePopup}
        name="correct"
        text="¡Correcto! ya estás registrado."/>
                
    </Test>
  )
}