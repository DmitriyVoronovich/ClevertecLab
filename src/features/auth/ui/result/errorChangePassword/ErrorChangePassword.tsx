import {Button} from 'antd';
import './errorChangePassword.css'
import fon from "../../../../../accets/login-page/image/fon.png";
import error from "../../../../../accets/login-page/svg-icon/error.svg";
import {authThunks} from "../../../model/authSlice.ts";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";
import {pushWithFlow} from "../../../model/utils/pushWithFlow.ts";

export const ErrorChangePassword = () => {
    const dispatch = useAppDispatch();

    const redirectToChangePassword = () => {
        dispatch(pushWithFlow('/result/error-changePassword'));
        const data = sessionStorage.getItem('changePassword');

        if (data !== null) {
            dispatch(authThunks.changePassword(JSON.parse(data)));
        }
    }

    return (
        <div className={'log_change_error_container'} style={{backgroundImage: `url(${fon})`}}>
            <div className={'form_fon'}></div>
            <div className={'change_error_container'}>
                <div className={'change_error_wrapper'}>
                    <img className={'change_error_img'} alt={'change_error'} src={error}/>
                    <h5 className={'change_error_title'}>Данные не сохранились</h5>
                    <p className={'change_error_description'}>Что-то пошло не так. Попробуйте еще
                        раз</p>
                    <Button data-test-id='change-retry-button' type="primary"
                            className={'change_error_button'}
                            onClick={redirectToChangePassword}>Повторить</Button>
                </div>
            </div>
        </div>
    );
};
