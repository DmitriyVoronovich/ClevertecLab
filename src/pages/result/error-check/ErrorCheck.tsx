import './error-check.css'
import fon from "../../../accets/login-page/image/fon.png";
import error from "../../../accets/login-page/svg-icon/error_check.svg";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";
import {authThunks} from "../../../features/auth/auth.reducer.ts";

export const ErrorCheck = () => {
    const navigation = useNavigate();
    const dispatch = useAppDispatch();


    const redirectToLogin = () => {
        navigation('/auth');
        const email  = localStorage.getItem('email');
        if (email !== null) {
            dispatch(authThunks.checkEmail(JSON.parse(email)));
        } else {
            console.log('error');
        }
    }
    return (
        <div className={'log_error_container'} style={{backgroundImage: `url(${fon})`}}>
            <div className={'form_fon'}></div>
            <div className={'error_check_container'}>
                <div className={'error_check_wrapper'}>
                    <img className={'error_check_img'} alt={'error'} src={error}/>
                    <h5 className={'error_title'}>Что-то пошло не так</h5>
                    <p className={'error_check_description'}>Произошла ошибка, попробуйте отправить форму ещё раз.</p>
                    <Button data-test-id='check-back-button' type="primary" className={'error_check_button'} onClick={redirectToLogin}>Назад</Button>
                </div>
            </div>
        </div>
    );
};
