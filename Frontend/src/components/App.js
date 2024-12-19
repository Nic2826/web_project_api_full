

import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmDeletePopup from './ConfirmDeletePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import ErrorBoundary from './ErrorBoundary.js';


function App() {
  const [cards, setCards] = useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState({});
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState({});
  const [currentUser, setCurrentUser] = useState({
    email:'',
    password:'',
    name: '',
    about: '',
    avatar: ''
  });

  useEffect(() => {
    async function getCards() {
      const initialCards = await api.getInitialCards();
      setCards(initialCards);
    }
    getCards();
  }, []);


  // Abrir el popup de confirmación para eliminar
  function handleDeleteClick(card) {
    setCardToDelete(card); // Guardamos la tarjeta que se quiere eliminar
    setIsDeleteCardPopupOpen(true); // Abrimos el popup de confirmación
  }

  // Confirmar eliminación
  function handleConfirmDelete() {
    if (cardToDelete) {
      api.deleteCard(cardToDelete._id)
        .then(() => {
          // Filtrar las tarjetas para eliminar la seleccionada
          setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
          setIsDeleteCardPopupOpen(false); // Cierra el popup
          setCardToDelete(null); // Limpia la tarjeta seleccionada
          console.log('Tarjeta eliminada', cardToDelete._id );
        })
        .catch((err) => {
          console.error('Error al eliminar la tarjeta:', err);
        });
    }
  }

  function handleCardLike(card) {
    // Verifica una vez más si a esta tarjeta ya le han dado like
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Envía una petición a la API y obtén los datos actualizados de la tarjeta
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  useEffect(() => {
    async function getValues() {
      try {
        setIsLoading(true);
        const response = await api.getUserInfo();
        setCurrentUser(response);
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        setIsLoading(false);
      }
    }
    getValues();
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard (card);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
  }


  async function handleUpdateUser(userData) {
    try {
      const newUser = await api.updateUserInfo(userData);
      console.log('Usuario actualizado:', newUser);
      if (newUser) {
        setCurrentUser(prevUser => ({
          ...prevUser,
          ...newUser
        }));
        closeAllPopups();
      }
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  }

  function handleUpdateAvatar(avatar) {
    console.log('handleUpdateAvatar recibió:', avatar);
    
    return api.updateAvatar(avatar)
      .then((newUser) => {
        console.log('Respuesta de la API:', newUser);
        setCurrentUser(newUser);
        closeAllPopups();
        return newUser;
      })
      .catch((error) => {
        console.error('Error detallado en handleUpdateAvatar:', error);
        throw error;
      });
  }

  function handleAddPlace(data) {
    api.postCards(data).then((card) => {
      setCards([card, ...cards]);
      closeAllPopups();
    })
  }

  return (
    <div className="body">
      <div className="page__container">
        
        <CurrentUserContext.Provider value={currentUser}>
          <BrowserRouter>
          <ErrorBoundary>
            <Routes>   
              <Route path="/signin" element={<Login />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/" element={<ProtectedRoute component={Main}
               onEditAvatarClick={handleEditAvatarClick}
               onEditProfileClick={handleEditProfileClick}
               onAddPlaceClick={handleAddPlaceClick}
               onCardClick={handleCardClick}
               isLoading={isLoading}
               cards={cards}
               onCardLike={handleCardLike}
               onCardDelete={handleDeleteClick} />
               } />
          
            </Routes>
            </ErrorBoundary>
          </BrowserRouter>

          <Footer />

          {/* ---------------------AVATAR--------------------- */}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          {/* ---------------------PROFILE--------------------- */}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          {/* ---------------------PLACE--------------------- */}
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />

          <ImagePopup
            link={selectedCard.link}
            title={selectedCard.name}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />

          {/* Popup de confirmación de eliminación */}
          <ConfirmDeletePopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onConfirm={handleConfirmDelete} // Confirmar eliminación al hacer clic en el botón "Eliminar"
          />

        </CurrentUserContext.Provider>

      </div>
    </div>
  );
}

export default App;
