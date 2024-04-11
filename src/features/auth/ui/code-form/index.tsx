import { useState } from 'react';
import VerificationInput from 'react-verification-input';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import attention from '@image/login-page/svg-icon/info.svg';

import fon from '../../../../assets/login-page/image/fon.png';
import { authThunks } from '../../model/auth-slice.ts';

import './code-form.css';
import {getEmailFromLocalStorage} from './utils/get-email-from-local-storage.ts';

export const CodeForm = () => {
    const dispatch = useAppDispatch();
    const [isFormCorrect, setIsFormCorrect] = useState(true);
    const [isFormValue, setIsFormValue] = useState('');

    const email = getEmailFromLocalStorage();

    const onChangeValue = (e: string) => setIsFormValue(e);

    const onFormComplete = (value: string) => {
        dispatch(authThunks.confirmEmail({ email, code: value }));
        setIsFormCorrect(false);
        setIsFormValue('');
    };

    return (
        <div className="code_form_container" style={{ backgroundImage: `url(${fon})` }}>
            <div className="form_fon" />
            <div className="code_container">
                <div className="code_wrapper">
                    <img className="error_img" alt="error" src={attention} />
                    <h5 className="code_title">
                        Введите код
                        <br /> для восстановления аккауанта
                    </h5>
                    <p className="code_description">
                        Мы отправили вам на e-mail {email}
                        <br /> шестизначный код. Введите его в поле ниже.
                    </p>
                    <VerificationInput
                        inputProps={{
                            'data-test-id': 'verification-input',
                        }}
                        value={isFormValue}
                        onChange={onChangeValue}
                        onComplete={onFormComplete}
                        classNames={{
                            container: 'container',
                            character: `character ${isFormCorrect ? '' : 'wrong_value'}`,
                            characterInactive: 'character--inactive',
                            characterSelected: 'character--selected',
                            characterFilled: 'character--filled',
                        }}
                    />
                    <p className="code_description">Не пришло письмо? Проверьте папку Спам.</p>
                </div>
            </div>
        </div>
    );
};
