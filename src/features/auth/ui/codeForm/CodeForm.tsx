import {useState} from "react";
import fon from "../../../../accets/login-page/image/fon.png";
import attention from '../../../../accets/login-page/svg-icon/info.svg';
import VerificationInput from "react-verification-input";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";
import {authThunks} from "../../model/authSlice.ts";
import './codeForm.css';


export const CodeForm = () => {
    const dispatch = useAppDispatch();
    const [isFormCorrect, setIsFormCorrect] = useState(true);
    const [isFormValue, setIsFormValue] = useState('');

    let email = ''

    const jsonEmail = localStorage.getItem('email')
    if (jsonEmail !== null) {
        email = JSON.parse(jsonEmail)
    }

    const onChangeValue = (e: string) => setIsFormValue(e);

    const onFormComplete = (value: string) => {
        dispatch(authThunks.confirmEmail({email, code: value}))
        setIsFormCorrect(false)
        setIsFormValue('')
    }

    return (
        <div className={'code_form_container'} style={{backgroundImage: `url(${fon})`}}>
            <div className={'form_fon'}></div>
            <div className={'code_container'}>
                <div className={'code_wrapper'}>
                    <img className={'error_img'} alt={'error'} src={attention}/>
                    <h5 className={'code_title'}>Введите код<br/> для восстановления аккауанта</h5>
                    <p className={'code_description'}>Мы отправили вам на e-mail {email}
                        <br/> шестизначный код. Введите его в поле ниже.</p>
                    <VerificationInput
                        inputProps={{
                            'data-test-id': 'verification-input'
                        }}
                        value={isFormValue}
                        onChange={onChangeValue}
                        onComplete={onFormComplete}
                        classNames={{
                            container: "container",
                            character: `character ${isFormCorrect ? '' : 'wrong_value'}`,
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
};
