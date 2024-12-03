import close from '../images/close.png';

export default function PopUpWithForm(props) {
    return (
        <div className={`popup popup-${props.name} ${props.isOpen ? "popup_open" : ""}`}>
            <div className="popup__overlay"></div>
            <div className="popup__content">
                <form 
                    onSubmit={props.onSubmit}
                    name={`${props.name}-form`} 
                    className="popup__admin">
                    <img 
                        src={close} 
                        alt="Close icon" 
                        className={`popup__close-icon popup__close-icon-${props.name}`} 
                        onClick={props.onClose}
                    />
                    <div>
                        <fieldset className="popup__container popup__container-input">
                            <h2 className="popup__heading">{props.title}</h2>
                            {props.children}
                            <button 
                                className={`popup__button-save popup__button-save-profile ${!props.isValid ? 'popup__button-save_disabled' : ''}`}
                                type="submit"
                                disabled={!props.isValid}
                            >
                                {props.buttonText || 'Guardar'}
                            </button>
                        </fieldset>
                    </div>
                </form>
            </div>
        </div>
    )
}