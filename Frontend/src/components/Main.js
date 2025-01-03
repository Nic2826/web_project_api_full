import close from '../images/close.png';
import { useContext, useState } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Header from './Header.js';
import { useNavigate } from 'react-router-dom';


export default function Main(props) {

  const navigate = useNavigate();
  const [isHeaderClicked, setIsHeaderClicked] = useState(false);
  const [isTopHeaderVisible, setIsTopHeaderVisible] = useState(false); 
  const currentUser = useContext(CurrentUserContext);

  function handleChangeRoute() {
    localStorage.removeItem('jwt');
    navigate('/signin');
    setIsHeaderClicked(true);
    console.log('clicked on cerrar sesion');
  }

  function handleTopHeaderClick() {
    setIsTopHeaderVisible(!isTopHeaderVisible);
  }


  if (props.isLoading) {
    return <div className="loader-container">
      <div className="loader"></div>
    </div>;
  }
  
if (!currentUser || !currentUser.name) {
    return <div className="loader-container">
      <div className="loader"></div>
    </div>;
  }

  return (
    <main className="content">

      <Header
        onClick={handleChangeRoute}
        onTopHeaderClick={handleTopHeaderClick}
        isHeaderClicked={isHeaderClicked}
        isVisible={isTopHeaderVisible}
        headerTitle="Cerrar sesión"
        headerEmail={currentUser.name}
        isMainPage={true} />

      <section className="profile">
        <div className="profile__image" onClick={props.onEditAvatarClick}>
          <img className="profile__avatar"
            alt="foto de perfil"
            name="avatar"
            src={currentUser.avatar}  
          />
          <div className="profile__avatar-edit"></div>
        </div>

        <div className="profile__info">
          <h1 className="profile__info-name">{currentUser.name}</h1>
          <p className="profile__info-description">{currentUser.about}</p>
          <button id="edit-button" className="profile__edit-button" type="button" onClick={props.onEditProfileClick}></button>
        </div>

        <button onClick={props.onAddPlaceClick} id="add-button" className="profile__add-button" type="button"></button>
      </section>

      <section id="cards-section" className="cards"></section>

      {/* <!-- ------------------------CONFIRMACIÓN---------------------- --> */}
      <div className="popup popup-confirm">
        <div className="popup__overlay"></div>
        <div className="popup__content popup__content-confirm">
          <form name="confirm-form" className="popup__admin" noValidate>
            <img src={close} alt="Close icon" className="popup__close-icon popup__close-icon-place" />
            <h2 className="popup__heading">¿Estás seguro/a?</h2>
            <button className="popup__button-save popup__button-save-confirm" type="button" value="Crear" id="saveButton"
            >Sí</button>
          </form>
        </div>
      </div>
      {/* <!-- ------------------------CONTENEDOR LOADER---------------------- --> */}
      <div className="loader-container">
        <div
          className="loader">
        </div>
      </div>

      <div className="cards">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            name={card.name}
            link={card.link}
            likes={card.likes}
            onCardClick={props.onCardClick}
            card={card}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </div>

    </main>
  );
}