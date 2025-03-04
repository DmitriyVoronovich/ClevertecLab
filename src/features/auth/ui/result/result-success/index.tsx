import { useNavigate } from 'react-router-dom';
import suc from '@image/login-page/svg-icon/success.svg';
import { Button } from 'antd';

import fon from '../../../../../assets/login-page/image/fon.png';

import './success.css';

export const Success = () => {
    const navigation = useNavigate();

    const redirectToLogin = () => navigation('/auth');

    return (
        <div className="success_fon_container" style={{ backgroundImage: `url(${fon})` }}>
            <div className="form_fon" />
            <div className="success_container">
                <div className="success_wrapper">
                    <img className="success_img" alt="error" src={suc} />
                    <h5 className="success_title">Регистрация успешна</h5>
                    <p className="success_description">
                        Регистрация прошла успешно. Зайдите <br />в приложение, используя свои
                        e-mail и пароль.
                    </p>
                    <Button
                        data-test-id='registration-enter-button'
                        type='primary'
                        className="success_button"
                        onClick={redirectToLogin}
                    >
                        Войти
                    </Button>
                </div>
            </div>
        </div>
    );
};
