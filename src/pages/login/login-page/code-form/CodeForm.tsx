import './code-form.css'
import fon from "../../../../accets/login-page/image/fon.png";
import attention from '../../../../accets/login-page/svg-icon/info.svg';
import VerificationInput from "react-verification-input";
import {useAppSelector} from "@hooks/typed-react-redux-hooks.ts";

export const CodeForm = () => {
    const email = useAppSelector(state => state.auth.email);

    return (
        <div className={'code_form_container'} style={{backgroundImage: `url(${fon})`}}>
            <div className={'form_fon'}></div>
            <div className={'code_container'}>
                <div className={'code_wrapper'}>
                    <img className={'error_img'} alt={'error'} src={attention}/>
                    <h5 className={'code_title'}>Введите код<br/> для восстановления аккауанта</h5>
                    <p className={'code_description'}>Мы отправили вам на e-mail
                        {email} <br/> шестизначный код. Введите его в поле ниже.</p>
                    <VerificationInput
                        classNames={{
                            container: "container",
                            character: "character",
                            characterInactive: "character--inactive",
                            characterSelected: "character--selected",
                            characterFilled: "character--filled",
                        }}
                    />
                    <p className={'code_description'}>Не пришло письмо? Проверьте папку Спам.</p>
                </div>
            </div>
        </div>
    );
}
