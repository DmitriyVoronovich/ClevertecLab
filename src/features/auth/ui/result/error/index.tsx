import { push } from 'redux-first-history';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import error from '@image/login-page/svg-icon/error.svg';
import { Button } from 'antd';

import fon from '../../../../../assets/login-page/image/fon.png';
import { authThunks } from '../../../model/auth-slice.ts';

import './error.css';

export const Error = () => {
    const dispatch = useAppDispatch();

    const redirectToRegistration = () => {
        dispatch(push('/auth/registration'));
        const data = sessionStorage.getItem('data-registration');

        if (data !== null) {
            dispatch(authThunks.registration(JSON.parse(data)));
        }
    };

    return (
        <div className="log_error_container" style={{ backgroundImage: `url(${fon})` }}>
            <div className="form_fon" />
            <div className="error_container">
                <div className="error_wrapper">
                    <img className="error_img" alt="error" src={error} />
                    <h5 className="error_title">Данные не сохранились</h5>
                    <p className="error_description">
                        Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.
                    </p>
                    <Button
                        data-test-id='registration-retry-button'
                        type='primary'
                        className="error_button"
                        onClick={redirectToRegistration}
                    >
                        Повторить
                    </Button>
                </div>
            </div>
        </div>
    );
};
