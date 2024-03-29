import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import error from '@image/login-page/svg-icon/error.svg';
import { pushWithFlow } from '@utils/pushWithFlow.ts';
import { Button } from 'antd';

import fon from '../../../../../assets/login-page/image/fon.png';
import { authThunks } from '../../../model/auth-slice.ts';

import './error-change-password.css';

export const ErrorChangePassword = () => {
    const dispatch = useAppDispatch();

    const redirectToChangePassword = () => {
        dispatch(pushWithFlow('/result/error-changePassword'));
        const data = sessionStorage.getItem('changePassword');

        if (data) {
            dispatch(authThunks.changePassword(JSON.parse(data)));
        }
    };

    return (
        <div className="log_change_error_container" style={{ backgroundImage: `url(${fon})` }}>
            <div className="form_fon" />
            <div className="change_error_container">
                <div className="change_error_wrapper">
                    <img className="change_error_img" alt="change_error" src={error} />
                    <h5 className="change_error_title">Данные не сохранились</h5>
                    <p className="change_error_description">
                        Что-то пошло не так. Попробуйте ещё раз
                    </p>
                    <Button
                        data-test-id='change-retry-button'
                        type='primary'
                        className="change_error_button"
                        onClick={redirectToChangePassword}
                    >
                        Повторить
                    </Button>
                </div>
            </div>
        </div>
    );
};
