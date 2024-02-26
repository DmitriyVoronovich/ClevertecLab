import { Button } from 'antd';
import './error-login.css'
import fon from "../../../accets/login-page/image/fon.png";
import attention from "../../../accets/login-page/svg-icon/attention.svg";
import {useNavigate} from "react-router-dom";

export const ErrorLogin = () => {
    const navigation = useNavigate();

    const redirectToRegistration = () => {
        navigation('/auth');
    }

    return (
        <div className={'log_error_login_container'} style={{backgroundImage: `url(${fon})`}}>
            <div className={'form_fon'}></div>
            <div className={'error_login_container'}>
                <div className={'error_login_wrapper'}>
                    <img className={'error_login_img'} alt={'error'} src={attention}/>
                    <h5 className={'error_login_title'}>Вход не выполнен</h5>
                    <p className={'error_login_description'}>Что-то пошло не так. Попробуйте еще раз</p>
                    <Button type="primary" className={'error_login_button'} onClick={redirectToRegistration}>Повторить</Button>
                </div>
            </div>
        </div>
    );
};
