import logo from '../images/logo.svg';
export default function Header(props) {

    return (
        <header className="header">
          <div className="header__container">
          <img className="header__logo" src={logo} alt="logo Around the U.S." />
          <div className="header__container-text">
          <p className="header__title-email">{props.headerEmail}</p>
          <button className="header__title" onClick={props.onClick} >{props.headerTitle}</button>
          </div>      
          </div>
        <span className="header__divider"></span>
      </header>
    );
}
