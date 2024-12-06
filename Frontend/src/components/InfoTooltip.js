import close from '../images/close.png';
import correct from '../images/correct.png';
import error from '../images/error.png';
// import PopUpWithForm from './PopUpWithForm';
export default function InfoTooltip(props) {

    
    return (

        <div className={`popup  ${props.isOpen ? "popup_open" : ""}`} id="tooltip">
            <div className="popup__overlay"></div>
            <div className="popup__content-tool">
            <img 
            src={close} alt="Close icon" 
            className="popup__close-icon" 
            onClick={props.onClose}/>
            <img 
            alt={`icon-${props.name}`} 
            className="popup__icon"
            src={`${props.name === "correct" ? correct : error}`}
            onClick={props.onClose}/>
            <p className="popup__text popup__text-tool">{props.text}</p>
            </div>           
        </div>
    )
}
