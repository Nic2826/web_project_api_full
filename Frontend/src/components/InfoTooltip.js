import close from '../images/close.png';
// import PopUpWithForm from './PopUpWithForm';
export default function InfoTooltip(props) {

    
    return (


        <div className={`popup-tool  ${props.isOpen ? "popup-tool_open" : ""}`} id="tooltip">
            <div className="popup__overlay-tool"></div>
            <div className="popup__content-tool">
            <img 
            src={close} alt="Close icon" 
            className="popup__close-icon popup__close-icon-place" 
            onClick={props.onClose}/>
            <img 
            alt={`icon-${props.name}`} 
            className={`popup__icon  popup__icon-${props.name}`}
            onClick={props.onClose}/>
            <p className="popup__text">{props.text}</p>
            </div>           
        </div>
    )
}
