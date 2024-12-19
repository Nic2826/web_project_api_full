import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useNavigate } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';
import Test from './Test';
import { login, checkToken } from '../utils/auth';


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isHeaderClicked, setIsHeaderClicked] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const [error, setError] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() =>{

    async function reviewToken() {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) {
          console.log('No hay token disponible');
          return; // No hace nada si no hay token
        }
  
        const response = await checkToken(token);
        console.log('Usuario validado:', response);
        if (response.user) {
          navigate('/');
        }
      } catch (error) {
        console.error('Error validando el token:', error.message);
        // Puedes redirigir al usuario al inicio de sesión si el token no es válido
        navigate('/signin');
      }
    }
    
    reviewToken();
  },[navigate]);

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  useEffect(() => {
    if (currentUser.email !== undefined && currentUser.password !== undefined) {
      setEmail(currentUser.email);
      setPassword(currentUser.password);
      console.log("estos son los DATOS",currentUser.email, currentUser.password);
    }
  }, [currentUser]);

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function closePopup() {
    setIsInfoTooltipOpen(false);
   }

  async function handleSubmit(e) {
    // Evita que el navegador navegue hacia la dirección del formulario
    e.preventDefault();

    try {
      await login(email, password);
      navigate('/');
      setIsInfoTooltipOpen(false);
    }
    catch (err) {
      setError(false);
  setIsInfoTooltipOpen(true);
    }
  }
  
  function handleChangeRoute() {
    navigate('/signup');
    setIsHeaderClicked(true);
    console.log('clicked Register');
  }

  return (
    <Test
      headerTitle="Regístrate"
      authTitle="Inicia Sesión"
      onSubmit={handleSubmit}
      buttonText="Inicia sesión"
      authFooter="¿Aún no eres miembro? Regístrate aquí"
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
      {error && <span className="error-message">El correo o la contraseña son incorrectos</span>}

      <InfoTooltip 
        isOpen={isInfoTooltipOpen} 
        onClose={closePopup}
        name="error"
        text="Uy, algo salió mal. Por favor inténtalo de nuevo."/>
    </Test>
  )
}