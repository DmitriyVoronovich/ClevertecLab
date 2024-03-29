import { useNavigate } from 'react-router-dom';
import error from '@image/login-page/svg-icon/error.svg';
import { Button } from 'antd';

import fon from '../../../../../assets/login-page/image/fon.png';

import './error-registration.css';

export const ErrorRegistration = () => {
    const navigation = useNavigate();

    const redirectToRegistration = () => navigation('/auth/registration');

    return (
        <div className="log_error_reg_container" style={{ backgroundImage: `url(${fon})` }}>
            <div className="form_fon" />
            <div className="error_reg_container">
                <div className="error_reg_wrapper">
                    <img className="error_reg_img" alt="error" src={error} />
                    <h5 className="error_reg_title">Данные не сохранились</h5>
                    <p className="error_reg_description">
                        Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому
                        e-mail.
                    </p>
                    <Button
                        data-test-id='registration-back-button'
                        type='primary'
                        className="error_reg_button"
                        onClick={redirectToRegistration}
                    >
                        Назад к регистрации
                    </Button>
                </div>
            </div>
        </div>
    );
};
