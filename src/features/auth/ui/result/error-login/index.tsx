import { push } from 'redux-first-history';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import fon from '@image/login-page/image/fon.png';
import attention from '@image/login-page/svg-icon/attention.svg';
import { Button } from 'antd';

import './error-login.css';

export const ErrorLogin = () => {
    const dispatch = useAppDispatch();

    const redirectToRegistration = () => dispatch(push('/auth'));

    return (
        <div className="log_error_login_container" style={{ backgroundImage: `url(${fon})` }}>
            <div className="form_fon" />
            <div className="error_login_container">
                <div className="error_login_wrapper">
                    <img className="error_login_img" alt="error" src={attention} />
                    <h5 className="error_login_title">Вход не выполнен</h5>
                    <p className="error_login_description">
                        Что-то пошло не так. Попробуйте ещё раз
                    </p>
                    <Button
                        data-test-id='login-retry-button'
                        type='primary'
                        className="error_login_button"
                        onClick={redirectToRegistration}
                    >
                        Повторить
                    </Button>
                </div>
            </div>
        </div>
    );
};
