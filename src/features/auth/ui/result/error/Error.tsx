import { Button } from 'antd';

import './error.css';
import { push } from 'redux-first-history';
import fon from '../../../../../accets/login-page/image/fon.png';
import error from '../../../../../accets/login-page/svg-icon/error.svg';
import { authThunks } from '../../../model/authSlice.ts';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';

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
        <div className={'log_error_container'} style={{ backgroundImage: `url(${fon})` }}>
            <div className={'form_fon'}></div>
            <div className={'error_container'}>
                <div className={'error_wrapper'}>
                    <img className={'error_img'} alt={'error'} src={error} />
                    <h5 className={'error_title'}>Данные не сохранились</h5>
                    <p className={'error_description'}>
                        Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.
                    </p>
                    <Button
                        data-test-id='registration-retry-button'
                        type='primary'
                        className={'error_button'}
                        onClick={redirectToRegistration}
                    >
                        Повторить
                    </Button>
                </div>
            </div>
        </div>
    );
};
