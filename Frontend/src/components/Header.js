import logo from '../images/logo.svg';
export default function Header(props) {

  return (
    <header className="header">
      

      <div className="header__container-top">
 {/* div que sale cuando se da click */}
        <div className="header__container-text-hidden" >
          <p className={`header__title-email-hidden  ${props.isVisible ? "header__title-email-visible" : ""}`}>{props.headerEmail}</p>
          <button className={`header__title  ${props.isVisible ? "header__title-visible" : ""}`} onClick={props.onClick}>{props.headerTitle}</button>
        </div>

        <span className={`header__divider-top ${props.isVisible ? "header__divider header__divider-top-visible" : ""}`}></span>
{/* div PERMANENTE*/}
        <div className="header__container">

          <img className="header__logo" src={logo} alt="logo Around the U.S." />

          <div className={`header__container-text  ${props.isVisible ? "header__container-text-close" : ""}`} onClick={props.onTopHeaderClick}>
            <p className="header__title-email">{props.headerEmail}</p>
            <button className="header__title" onClick={props.onClick} >{props.headerTitle}</button>
          </div>

        </div>

      </div>
      <span className="header__divider"></span>
    </header>
  );
}