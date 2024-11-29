import Header from './Header';
import InfoTooltip from './InfoTooltip';

export default function Test(props) {

 
    return (
        <div >
            <Header headerTitle={props.headerTitle} onClick={props.onClick}/>
            <p className="auth__title" >{props.authTitle}</p>
            <form
                className='auth__form'
                onSubmit={props.onSubmit}>
                <div>
                    <fieldset className="popup__container popup__container-input">
                        {props.children}
                    </fieldset>
                    <button className="popup__button-save popup__button-save-auth" type="submit" value="Crear" >{props.buttonText}</button>
                    
                    <p className="auth__footer" >{props.authFooter}</p>
                </div>
            </form>
            <InfoTooltip />
        </div>
    )
}
